import { NextResponse, type NextRequest } from "next/server";

const ALLOWLIST = [
  "/maintenance",
  "/sitemap.xml",
  "/robots.txt",
  "/favicon.ico",
  "/favicon.svg",
];

export function middleware(req: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "1") {
    return NextResponse.next();
  }
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/fonts/") ||
    ALLOWLIST.some((p) => pathname === p || pathname.startsWith(p + "/"))
  ) {
    return NextResponse.next();
  }
  const url = req.nextUrl.clone();
  url.pathname = "/maintenance";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: "/((?!_next/static|_next/image).*)",
};
