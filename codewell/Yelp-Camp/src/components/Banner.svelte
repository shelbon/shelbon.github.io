<script>
	export let bannerItems = [];
</script>

<ul class="flex ">
	{#each bannerItems as bannerItem}
		<li class="item">
			<img src={bannerItem.src} alt="logo of {bannerItem.name}" />
		</li>
	{/each}
</ul>
