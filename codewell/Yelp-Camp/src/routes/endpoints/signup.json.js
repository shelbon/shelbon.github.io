import Cookie from '$lib/models/cookie';
import User from '$lib/models/user';
import { getFormBody } from '$lib/utils/form.js';
import isFormValid from '$lib/utils/formValidation';
import * as cookieHttp from 'cookie';
import { v4 as uuidv4 } from 'uuid';
export async function post({ request }) {
	const formData = getFormBody(await request.formData());
	if (isFormValid(formData)) {
		const userInDB = await User.findOne({ email: formData.email });
		//if user found return  email already used
		if (userInDB != null) {
			return {
				status: 409,
				body: JSON.stringify({
					message: 'Email is already in use'
				})
			};
		}
		const newUser = await User.create({ email: formData.email, password: formData.password });
		const cookieId = uuidv4();
		const sessionCookie = cookieHttp.serialize('session_id', cookieId, {
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7,
			path: '/'
		});
		await Cookie.create({
			cookieId,
			userId: newUser.id,
			email: newUser.email
		});
		return {
			status: 303,
			headers: {
				location: '/campgrounds',
				'set-cookie': [sessionCookie]
			}
		};
	} else {
		return {
			status: 401,
			body: JSON.stringify({
				message: 'username or password are invalid'
			})
		};
	}
}
