import { invalidate } from '$app/navigation';
export function getFormBody(body) {
	return [...body.entries()].reduce((data, [k, v]) => {
		let value = v;
		if (value === 'true') value = true;
		if (value === 'false') value = false;
		if (k in data) data[k] = Array.isArray(data[k]) ? [...data[k], value] : [data[k], value];
		else data[k] = value;
		return data;
	}, {});
}
const shouldRedirect = (res) => {
	const contentType = res.headers.get('content-type');

	return (
		contentType?.toLowerCase().includes('text/html') ||
		contentType?.toLowerCase().includes('text/plain')
	);
};
const extractErrors = ({ inner }) => {
	return inner.reduce((acc, err) => {
		return { ...acc, [err.path]: err.message };
	}, {});
};
export async function enhance(form, { done, error }) {
	const onSubmit = async (e) => {
		e.preventDefault();
		const payload = new FormData(form);
		try {
			const res = await fetch(form.action, {
				method: form.method,
				headers: {
					accept: 'application/json'
				},
				body: payload
			});

			if (res.ok) {
				// get response payload
				if (shouldRedirect) {
					document.location = res.url;
				}
				const resp = await res.json();
				// pass response to done handler
				done(resp, form);
			} else {
				const body = await res.text();
				// return error as error object
				error(new Error(body), form);
			}
		} catch (e) {
			error(e, form);
		}
	};

	form.addEventListener('submit', onSubmit);

	return {
		destroy() {
			form.removeEventListener('submit', onSubmit);
		}
	};
}
