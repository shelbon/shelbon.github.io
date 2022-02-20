import connectDB from '$lib/db.js';
import Cookie from '$lib/models/cookie.js';
import * as cookieHttp from 'cookie';
// Sets context in endpoints
// Try console logging context in your endpoints' HTTP methods to understand the structure
export const handle = async ({ event, resolve }) => {
	await connectDB();
	// Getting cookies from request headers - all requests have cookies on them
	const cookies = cookieHttp.parse(event.request.headers.get('cookie') || '');
	event.locals.user = cookies;
	// If there are no cookies, the user is not authenticated
	if (!cookies.session_id) {
		event.locals.user.isLogin = false;
	}
	// Searching DB for the user with the right cookie
	const userSession = await Cookie.findOne({ cookieId: cookies.session_id });

	// If there is that user, authenticate him and pass his email to context
	if (userSession?.cookieId) {
		event.locals.user.isLogin = true;
		event.locals.user.email = userSession.email;
	} else {
		event.locals.user.isLogin = false;
	}

	return resolve(event);
};

// This function takes the request object and returns a session object that is accessible
// on the client and therefore must be safe to expose to users. It runs whenever
// SvelteKit server-renders a page.
// Sets session on client-side
// try console logging session in routes' load({ session }) functions
export const getSession = async (request) => {
	// Pass cookie with authenticated & email properties to session
	return request.locals.user
		? {
				user: {
					isLogin: true,
					email: request.locals.user.email
				}
		  }
		: {};
};
