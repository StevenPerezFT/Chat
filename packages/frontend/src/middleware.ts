import { NextResponse, type NextRequest } from "next/server"
import { Route } from "@chat/core/routes/frontend"

export function middleware(request: NextRequest) {
    const url = new URL(`/${Route.Auth}/sign-in`, request.url)

    const authCookie = request.cookies.get('Authorization')
    if (!authCookie) {

        return NextResponse.redirect(url)
    }
    return NextResponse.next();
}

export const config = {
    matcher: [`${Route.Slash}`, `/${Route.Chat}`],
};
