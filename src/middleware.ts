import jwt, { VerifyErrors, verify } from 'jsonwebtoken';
import { headers } from 'next/headers';
import { usePathname } from 'next/navigation';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, response: NextResponse) {
	//Differentiate between server and client page request

	const path = request.nextUrl.pathname;

	const isClient = !path.startsWith('/api');

	const token = request.cookies.get('token')?.value || '';

	if (isClient) {
		const isPublic = path === '/auth/login' || path === '/auth/signup';

		const isBase = path === '/';

		if (isPublic && token) {
			return NextResponse.redirect(
				new URL('/dashboard', request.nextUrl)
			);
		}

		if (isBase && token) {
			return NextResponse.redirect(
				new URL('/dashboard', request.nextUrl)
			);
		}

		if (!isPublic && !token) {
			return NextResponse.redirect(
				new URL('/auth/login', request.nextUrl)
			);
		}

		if (isBase && !token) {
			return NextResponse.redirect(
				new URL('/auth/login', request.nextUrl)
			);
		}
	} else {
		if (!token) {
			return NextResponse.json(
				{ error: 'Unauthorized to access resource' },
				{ status: 401 }
			);
		}

		const signature = headers().get('stripe-signature')!;

		console.log('signature==>', signature);

		// const requestHeaders = new Headers(request.headers);

		// requestHeaders.set('Authorization', `Bearer ${token}`);

		// You can also set request headers in NextResponse.rewrite
		// const response = NextResponse.next({
		// 	request: {
		// 		// New request headers
		// 		headers: requestHeaders
		// 	}
		// });

		// Set a new response header `x-hello-from-middleware2`
		// response.headers.set('Authorization', `Bearer ${token}`);

		const twoMinutes = 30 * 60 * 1000; // 2 minutes in milliseconds
		const expires = new Date(Date.now() + twoMinutes);
		response.cookies.set('token', token, {
			httpOnly: true,
			expires
		});

		return response;
	}

	//How use middleware for server requests

	// return NextResponse.redirect(new URL('/home', request.url));
}
// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		'/',
		'/dashboard/:path*',
		'/signup',
		'/auth/login',
		'/api/users'
		// '/^/api((?!/auth/(login|register))/?.*',
		// '/(^/api(/(?!auth/(login|register)))?.*$',
		// '/((?!api|auth/login|auth/register).*)',
		// '/((?!/api/auth/login|/api/auth/register)|/api))'

		// '/((?!api|_next/static|_next/image|favicon.ico).*)'
	]
};

// function addBearerToken(request: any, pathName: string) {
// 	const notProtected = ['/api/auth/login', '/api/auth/signup'];

// 	console.log('checks');
// 	console.log(
// 		'protected routes',
// 		pathName.startsWith('/api') && !notProtected.includes(pathName)
// 	);

// 	if (pathName.startsWith('/api') && !notProtected.includes(pathName)) {
// 		const requestHeaders = new Headers(request.headers);

// 		console.log('got here');

// 		console.log('header', request.headers);
// 		requestHeaders.set('x-hello-from-middleware1', 'hello');

// 		// You can also set request headers in NextResponse.rewrite
// 		const response = NextResponse.next({
// 			request: {
// 				// New request headers
// 				headers: requestHeaders
// 			}
// 		});

// 		// Set a new response header `x-hello-from-middleware2`
// 		response.headers.set('x-hello-from-middleware2', 'hello');
// 		return response;
// 	}
// }

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
// 	// Clone the request headers and set a new header `x-hello-from-middleware1`
// 	const requestHeaders = new Headers(request.headers);
// 	requestHeaders.set('x-hello-from-middleware1', 'hello');

// 	// You can also set request headers in NextResponse.rewrite
// 	const response = NextResponse.next({
// 		request: {
// 			// New request headers
// 			headers: requestHeaders
// 		}
// 	});

// 	// Set a new response header `x-hello-from-middleware2`
// 	response.headers.set('x-hello-from-middleware2', 'hello');
// 	return response;
// }

// function jwtVerifyPromisified(token: string) {
// 	try {
// 		const decodedToken: any = verify(token, process.env.JWT_SECRET!);
// 		console.log(decodedToken);
// 		console.log('I got here');
// 		return decodedToken;
// 	} catch (err: any) {
// 		throw new Error(err.message);
// 	}
// }
// return new Promise((resolve, reject) => {
// 	verify(token, process.env.JWT_SECRET!, {}, (err, payload) => {
// 		if (err) {
// 			console.log('Mhy Jwt error', err);
// 			return reject(false);
// 		} else {
// 			console.log('I resolved');
// 			// NextResponse.next();
// 			return resolve(true);
// 		}
// 	});
// });

// async function authenticateRequest(cookie: string) {
// 	// Load public key from authentication provider
// 	// const jwks = jose.createRemoteJWKSet(new URL(process.env.AUTH0_JWKS_URI!));
// 	try {
// 		// Verify the given token

// 		const waitAsync = util.promisify(wait);

// 		waitAsync(1000);

// 		const decode = promisify(verify);

// 		decode(cookie, process.env.JWT_SECRET!);

// 		const result = await promisify(
// 			jwt.verify(cookie, process.env.JWT_SECRET!)
// 		);
// 		return NextResponse.next();
// 	} catch (e) {
// 		console.error('Authentication failed: Token could not be verified');
// 		return new NextResponse(
// 			JSON.stringify({
// 				success: false,
// 				message: 'Authentication failed: Token could not be verified'
// 			}),
// 			{ status: 401, headers: { 'content-type': 'application/json' } }
// 		);
// 	}
// }
