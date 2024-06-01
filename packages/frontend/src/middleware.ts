import { NextResponse, type NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const url = new URL(`/auth/sign-up`, request.url)

    const authCookie = request.cookies.get('Authorization')
    if (!authCookie) {

        return NextResponse.redirect(url)
    }
    return NextResponse.next();
}

export const config = {
    matcher: [`/`, `/chat`],
};
