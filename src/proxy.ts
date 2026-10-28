import { NextRequest, NextResponse } from "next/server";
export function proxy(req: NextRequest) {
  const host = req.headers.get("host")?.split(":")[0];
  if (host === (process.env.STUDIO_HOST || "studio.callwowzer.com")) {
    const response =
      req.nextUrl.pathname === "/"
        ? NextResponse.redirect(new URL("/admin", req.url))
        : NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }
  if (
    req.nextUrl.pathname.startsWith("/admin") ||
    req.nextUrl.pathname.startsWith("/api")
  ) {
    const r = NextResponse.next();
    r.headers.set("X-Robots-Tag", "noindex, nofollow");
    return r;
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!_next/static|_next/image|images|icon.svg).*)"],
};
