<script>
	import Grid from './grid/Grid.svelte';

	

	
</script>

<main>
	<h1>A* Search Visualizer </h1>
	<p id='instructions'>1. Select start node</p>
	<p id='instructions'>2. Select end node</p>
	<p id='instructions'>3. Draw walls</p>
	<p id='instructions'>4. Click visualize</p>
	<div class="center">
			<!---<Grid rowCount={rowCount} cellCount={cellCount} on:cellClick={cellClick_handler}/>--->
			<Grid/>
	</div>

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	#instructions {
		color: #ff3e00;
		text-transform: uppercase;
	}
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	.center {
		margin: auto;
		width: 80%;
		border: 3px solid green;
		padding: 10px;
	}
	
</style>