import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/","/signup","/api/webhooks/user"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"],
};
