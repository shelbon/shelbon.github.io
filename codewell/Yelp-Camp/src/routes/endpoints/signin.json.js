import Cookie from '$lib/models/cookie';
import User from '$lib/models/user';
import { getFormBody } from '$lib/utils/form.js';
import isFormValid from '$lib/utils/formValidation';
import * as cookieHttp from 'cookie';
import { v4 as uuidv4 } from 'uuid';
export async function post({ request }) {
	let result = {};
	let formData;

	formData = getFormBody(await request.formData());
	//user
	if (isFormValid(formData)) {
		const user = await User.findOne({ email: formData.email });
		const isMatch = await user.comparePassword(formData.password);
		if (isMatch) {
			const cookieId = uuidv4();
			const sessionCookie = cookieHttp.serialize('session_id', cookieId, {
				sameSite: 'lax',
				maxAge: 60 * 60 * 24 * 7,
				path: '/'
			});

			const duplicateUser = await Cookie.findOne({ email: user.email });

			if (duplicateUser) {
				await Cookie.updateOne({ email: user.email }, { $set: { cookieId } });
			} else {
				await Cookie.create({
					cookieId,
					userId: user.id,
					email: user.email
				});
			}
			result = {
				headers: {
					location: '/campgrounds',
					'set-cookie': [sessionCookie]
				},
				success: true
			};
		} else {
			result = {
				status: 400,
				message: 'User not found with the information provided'
			};
		}
	} else {
		result = {
			status: 401,
			message: 'Please check your credentials'
		};
	}
	if (result.success) {
		return {
			status: 303,
			headers: result.headers
		};
	}
	return {
		status: result.status,
		body: JSON.stringify(result)
	};
}
