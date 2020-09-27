<script>
	import Grid from './grid/Grid.svelte';

	let rowCount = 20;
	let cellCount = 52;
	let startCellSelected = false;
	let endCellSelected = false;

	function cellClick_handler(e) {
		if(!e.detail.target.dataset.cellidx) return; // check that clicked cell has a cell index
		if(!startCellSelected) { // select start cell first if havent selected
			e.detail.target.classList.toggle('cell--start');
			startCellSelected = true;
			console.log('start');
			return;
		}
		else if(e.detail.target.classList.contains('cell--start') && startCellSelected) {
			e.detail.target.classList.toggle('cell--start');
			startCellSelected = false;
			return;
		}
		if(!endCellSelected) { // select end cell if havent selected
			e.detail.target.classList.toggle('cell--end');
			endCellSelected = true;
			console.log('end')
			return;
		}
		else if(e.detail.target.classList.contains('cell--end') && endCellSelected) {
			e.detail.target.classList.toggle('cell--end');
			endCellSelected = false;
			return;
		}
		
		e.detail.target.classList.toggle('cell--wall');
	}
</script>

<main>
	<h1>A* Search Visualizer </h1>
	<p id='instructions'>1. Select start node</p>
	<p id='instructions'>2. Select end node</p>
	<p id='instructions'>3. Draw walls</p>
	<p id='instructions'>4. Click visualize</p>
	<div class="center">
		<table>
			<Grid rowCount={rowCount} cellCount={cellCount} on:cellClick={cellClick_handler}/>
		</table>
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
	table {
		border-spacing: 0;
	}
</style>