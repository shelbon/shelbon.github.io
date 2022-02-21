<script context="module">
	import Banner from '../lib/components/Banner.svelte';
	import Features from '../lib/components/Features.svelte';
	import bannerItems from '../banner.json';
	export const prerender = true;
</script>

<svelte:head>
	<title>Yelp Camp</title>
</svelte:head>
<section
	class="grid grid-rows-[8vh_min-content_max-content] 
	       lg:grid-rows-[8vh_min-content_max-content] 
		   lg:grid-cols-[60vw_40vw]"
>
	<header
		class="flex justify-start items-center 
	               row-start-1 row-end-1 
				   lg:col-start-1 lg:col-end-1
				   lg:pl-24"
	>
		<img class="ml-4" src="/assets/Logo.svg" alt="logo" />
	</header>
	<picture class="row-start-2 row-end-2 lg:row-span-3 lg:col-start-2 lg:col-end-2">
		<source media="(min-width:1024px)" srcset="/assets/Hero_Image.jpg" />
		<img
			class="w-full  lg:h-screen"
			src="/assets/Hero Image (Tablet and Mobile).jpg"
			alt="camping "
		/>
	</picture>
	<section
		class="row-start-3 row-end-3
	           space-y-6 pt-12 pl-6
			   lg:col-start-1 lg:col-end-1
			   lg:row-start-2 lg:row-end-3
			   lg:pl-24 lg:pt-24
			   lg:space-y-8"
	>
		<h1 class="font-bold tracking-wider text-5xl md:text-7xl lg:text-9xl">
			Explore the best camps on Earth.
		</h1>
		<p class="text-md opacity-70 md:text-3xl tracking-wide leading-relaxed">
			YelpCamp is a curated list of the best camping spots on Earth.Unfiltered and unbiased reviews
		</p>
		<Features />
		<button
			class="bg-black border-2 border-solid 
		                 border-transparent rounded-md 
						 text-white  p-4
						  lg:text-3xl lg:p-6 "
			on:click={() => (window.location.href = '/campgrounds')}>View Campgrounds</button
		>
		<div>
			<p>Partnered with:</p>
			<Banner {bannerItems} />
		</div>
	</section>
</section>
