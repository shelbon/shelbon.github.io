<script>
	import { enhance } from '$lib/utils/form.js';
	export let error = undefined;
	export let success = false;
	const onDone = (resp, form) => {
		success = resp.success;
		error = undefined;
		form.reset();
	};
	const onError = (err, form) => {
		const text = JSON.parse(err.message).message;
		console.log(text);
		error = text;
		success = false;
		form.reset();
	};

	const reset = () => {
		error = undefined;
		success = false;
	};
</script>

{#if error}
	<p class="p-4 mx-4 text-[#F03434]">{error}</p>
{/if}
<form
	class="flex flex-col   md:pr-[35%] lg:pr-0"
	action="/endpoints/signup.json"
	use:enhance={{ done: onDone, error: onError }}
	method="post"
>
	<fieldset class="flex flex-col">
		<label class="p-4" for="username">Username</label>
		<input
			class="form-input peer p-4 mx-4 border-2 border-transparent 
	              border-solid rounded-md bg-[#f7f7f7]
				  invalid:border-[#F03434] invalid:text-[#F03434]
	focus:invalid:border-[#F03434]-500 focus:invalid:ring-[#F03434]
	placeholder:text-2xl"
			placeholder="johndoe@example.com"
			maxlength="320"
			type="email"
			name="email"
			id="email"
		/>
		<p class="hidden p-4 mx-4   text-red-600 peer-invalid:block">
			E-mail invalid, should be in this format:john@example.com
		</p>
	</fieldset>

	<fieldset class="flex flex-col	">
		<label class="p-4 mt-4" for="password">Password</label>
		<input
			class="form-input peer p-4 mx-4 border-2 border-transparent 
	border-solid rounded-md bg-[#f7f7f7] 
	invalid:border-[#F03434] invalid:text-[#F03434]
	focus:invalid:border-[#F03434]-500 focus:invalid:ring-[#F03434]
	placeholder:text-2xl"
			type="password"
			name="password"
			minlength="8"
			id="password"
			placeholder="Enter Your Password"
		/>

		<p class="invisible p-4 mx-4   text-[#F03434] peer-invalid:visible">
			Password should be at least 8 characters,1 Uppercase,1 lowercase,1 digits and 1 special
			characters.
		</p>
	</fieldset>

	<input
		class="cursor-pointer bg-black border-2 border-solid 
	border-transparent rounded-md 
	text-white  p-4 mx-4 mt-8 md:mt-6
	 lg:text-3xl lg:p-6"
		type="submit"
		value="Login"
		name="submit"
	/>
	<p class="p-4">
		Already a user?<a
			class="underline font-bold text-[#3d9ec9] visited:text-[#551A8B]"
			href="/signin">Sign in</a
		>
	</p>
</form>
