import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';
export default function isFormValid(formData) {

	const { email, password } = formData;
	if (typeof password != 'string' || typeof email != 'string') return false;
	if (isEmail(email) && isStrongPassword(password)) {
		return true;
	}
	return false;
}
