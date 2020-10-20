<script>
import { element } from 'svelte/internal';

	import Grid from './grid/Grid.svelte';
	import GridClass from './classes/GridClass';
	let table;
	let rowCount = 20;
	let cellCount = 52;
	function getGrid() {
		let walls = table.getElementsByClassName('cell--wall');
		let start = table.getElementsByClassName('cell--start');
		let end = table.getElementsByClassName('cell--end');
		return [walls, start, end];
	}

	function getCellIdx(elem) {
		const cellIdx = element.dataset.cellidx.split(',');
		return [parseInt(cellIdx,10), parseInt(cellIdx, 10)];
	}

	function onRunAlgorithm() {
		const gridInfo = getGrid();
		console.log(gridInfo[1].length);
		console.log(gridInfo);
		if(gridInfo[1].length === 1 && gridInfo[2].length === 1) {
			let wallIndices = [];
			const walls = [...gridInfo[0]].forEach((e) => {
				wallIndices.push(getCellIdx(e));
			});
			const startIdx = getCellIdx(gridInfo[1]);
			const endIdx = getCellIdx(gridInfo[2]);

			const grid = new GridClass();
		}
	}
	
</script>

<main>
	<h1>A* Search Visualizer </h1>
	<p id='instructions'>1. Select start node</p>
	<p id='instructions'>2. Select end node</p>
	<p id='instructions'>3. Draw walls</p>
	<p id='instructions'>4. Click visualize</p>
	<!---Fancy button animation from https://dev.to/webdeasy/top-20-css-buttons-animations-f41 --->
	<button class="glow" on:click={onRunAlgorithm}>Play</button>
	<div class="center">
			<!---<Grid rowCount={rowCount} cellCount={cellCount} on:cellClick={cellClick_handler}/>--->
			<Grid bind:table={table} bind:rowCount={rowCount} bind:cellCount={cellCount}/>
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
	
	.glow {
		width: 220px;
		height: 50px;
		border: none;
		outline: none;
		color: #fff;
		background: #111;
		cursor: pointer;
		position: relative;
		z-index: 0;
		border-radius: 10px;
	}

	.glow:before {
		content: '';
		background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
		position: absolute;
		top: -2px;
		left:-2px;
		background-size: 400%;
		z-index: -1;
		filter: blur(5px);
		width: calc(100% + 4px);
		height: calc(100% + 4px);
		animation: glowing 20s linear infinite;
		opacity: 0;
		transition: opacity .3s ease-in-out;
		border-radius: 10px;
	}

	.glow:active {
		color: #000
	}

	.glow:active:after {
		background: transparent;
	}

	.glow:hover:before {
		opacity: 1;
	}

	.glow:after {
		z-index: -1;
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background: #111;
		left: 0;
		top: 0;
		border-radius: 10px;
	}

	@keyframes glowing {
		0% { background-position: 0 0; }
		50% { background-position: 400% 0; }
		100% { background-position: 0 0; }
	}
	
</style>