// stores related to app state, auth state
import Cookies from 'js-cookie';

export async function authGuard({ url, session }) {
	const userSession = session.user;
	if (url.pathname === '/signin') return false;
	if (!userSession?.isLogin || !userSession.email) return true;
	return false;
}
export const authGuardRedirect = { status: 302, redirect: '/signin' };
