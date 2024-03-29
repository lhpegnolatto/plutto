import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routes } from "constants/routes";
import { getAuthSession } from "services/auth/getSession";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  if (
    req.nextUrl.pathname.includes(routes.SIGN_IN) ||
    req.nextUrl.pathname.startsWith("/_next")
  ) {
    return res;
  }

  const hasEnglishLocalePath = req.nextUrl.href
    .replace(req.nextUrl.origin, "")
    .startsWith("/en");
  const localePathPrefix = hasEnglishLocalePath ? "/en" : "";

  const supabaseClient = createMiddlewareSupabaseClient({ req, res });

  const session = await getAuthSession(supabaseClient);

  if (session) {
    if (req.nextUrl.pathname === "/") {
      const homeUrl = new URL(
        `${localePathPrefix}${routes.HOME}`,
        req.nextUrl.origin
      );
      return NextResponse.redirect(homeUrl);
    }

    return res;
  }

  const signInUrl = new URL(
    `${localePathPrefix}${routes.SIGN_IN}`,
    req.nextUrl.origin
  );
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: ["/((?!api|_next|favicon.svg).*)"],
};
