<form class="flex flex-col   md:pr-[35%] lg:pr-0">
	<label class="p-4" for="username">Username</label>
	<input
		class="p-4 mx-4 border-2 border-transparent 
	              border-solid rounded-md bg-[#f7f7f7]"
		placeholder="johndoe_91"
		type="text"
		name="username"
		id="username"
	/>
	<label class="p-4 mt-4" for="password">Password</label>
	<input
		class="p-4 mx-4 border-2 border-transparent 
	border-solid rounded-md bg-[#f7f7f7]"
		type="password"
		name="password"
		id="password"
		placeholder="Enter Your Password"
	/>
	<input
		class="bg-black border-2 border-solid 
	border-transparent rounded-md 
	text-white  p-4 mx-4 mt-8 md:mt-6
	 lg:text-3xl lg:p-6"
		type="button"
		value="Login"
		name="submit"
	/>
	<p class="p-4">
		Not a user yet?<a
			class="underline font-bold text-[#3d9ec9] visited:text-[#551A8B]"
			href="/signup">Create an account</a
		>
	</p>
</form>
