import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

// Anything under /admin (and the admin API) requires authentication.
const isProtectedRoute = createRouteMatcher(["/admin(.*)", "/api/admin(.*)"]);

// Optional allow-list: only these Clerk user ids may enter /admin.
const adminIds = (process.env.ADMIN_USER_IDS ?? "")
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const withClerk = clerkMiddleware(async (auth, req) => {
  if (!isProtectedRoute(req)) return;

  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // If an allow-list is configured, enforce it.
  if (adminIds.length > 0 && !adminIds.includes(userId)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

// When Clerk isn't configured, run a no-op so the app works locally
// (open /admin). With keys present, enforce auth via clerkMiddleware.
export default function middleware(req: NextRequest, event: any) {
  if (!clerkEnabled) return NextResponse.next();
  return withClerk(req, event);
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless found in search params.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes.
    "/(api|trpc)(.*)",
  ],
};
