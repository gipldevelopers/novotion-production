import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export async function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('auth_token')?.value;

    // Define route groups
    const isAdminRoute = pathname.startsWith('/admin');
    const isAuthRoute = pathname.startsWith('/auth') || pathname.startsWith('/api/auth');
    const isStaticFile = pathname.includes('.') || pathname.startsWith('/_next');

    if (isStaticFile) return NextResponse.next();

    let user = null;
    if (token) {
        try {
            const secret = new TextEncoder().encode(JWT_SECRET);
            const { payload } = await jwtVerify(token, secret);
            user = payload;
        } catch (error) {
            console.error('JWT verification failed:', error);
        }
    }

    // 1. Case: Admin logged in
    if (user?.role === 'ADMIN') {
        // Only allow access to /admin routes and /api/auth routes
        if (!isAdminRoute && !pathname.startsWith('/api/auth')) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return NextResponse.next();
    }

    // 2. Case: Not an admin, trying to access /admin
    if (isAdminRoute && user?.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 3. Case: Guest trying to access protected user routes (if you have them)
    // For now, only /admin is explicitly protected against non-admins.
    // If you want to protect /profile or /my-services:
    const isProtectedRoute = pathname.startsWith('/profile') || pathname.startsWith('/my-services');
    if (isProtectedRoute && !user) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
