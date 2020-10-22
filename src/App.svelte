<script>
import { element } from 'svelte/internal';

	import Grid from './grid/Grid.svelte';
	import GridClass from './classes/GridClass';
	import {a_star} from './classes/AStarSearch.js';
	let table;
	let rowCount = 20;
	let cellCount = 52;
	let fail = false;
	function getGrid() {
		let walls = table.getElementsByClassName('cell--wall');
		let start = table.getElementsByClassName('cell--start');
		let end = table.getElementsByClassName('cell--end');
		return [walls, start, end];
	}

	function getCellIdx(elem) {
		const cellIdx = elem.dataset.cellidx.split(',');
		return [parseInt(cellIdx[0],10), parseInt(cellIdx[1], 10)];
	}

	function onRunAlgorithm() {
		const gridInfo = getGrid();

		if(gridInfo[1].length === 1 && gridInfo[2].length === 1) {
			let wallIndices = [];

			const walls = [...gridInfo[0]].forEach((e) => {
				wallIndices.push(getCellIdx(e));
			});
			const startIdx = getCellIdx(gridInfo[1][0]);
			const endIdx = getCellIdx(gridInfo[2][0]);
			
			const grid = new GridClass(cellCount, rowCount, startIdx, endIdx, wallIndices);
			let result = a_star(grid);
			if (result == false) fail = true;

			//let drawVisitedLoop = i => {
			//	if(result[0][i]) {
			//		let node = result[0][i];
			//		let element = document.getElementById(node.id);
			//		if(!element.classList.contains('cell--start') && !element.classList.contains('cell--end')){
			//			element.classList.toggle('cell--visited');	
			//		}
			//		setTimeout(function(){drawVisitedLoop(i+1)}, 70);
			//	} else {
			//		drawPathLoop(result[1].length - 1);
			//	}
			//}
			let drawPathLoop = i => {
				if(result[1][i]) {
					let node = result[1][i];
					let element = document.getElementById(node.id);
					if(!element.classList.contains('cell--start') && !element.classList.contains('cell--end')){
						element.classList.remove('cell--visited');
						element.classList.toggle('cell--path');	
					}
					setTimeout(function(){drawPathLoop(i-1)}, 70);
				}
			}
			let drawFullThing = i => {
				if(result[2][i]) {
					let node = result[2][i];
					let element = document.getElementById(node.node.id);
					if(!element.classList.contains('cell--start') && !element.classList.contains('cell--end')){
						if(node.type == "neighbor"){
							element.classList.add('cell--discovered');
						} else if(node.type == "visited") {
							element.classList.add('cell--visited');
						}
					}
					setTimeout(function(){drawFullThing(i+1)}, 40);
				} else {
					drawPathLoop(result[1].length - 1);
				}
			}

			//drawVisitedLoop(0);
			drawFullThing(0);
		}
	}
</script>

<main>
	<h1>A* Search Visualizer </h1>
	<p id='instructions'>1. Select start node</p>
	<p id='instructions'>2. Select end node</p>
	<p id='instructions'>3. Draw walls</p>
	<p id='instructions'>4. Click visualize</p>
	{#if fail}
		<p id='failed'>NO SOLUTION!</p>
	{/if}
	<!---Fancy button animation from https://dev.to/webdeasy/top-20-css-buttons-animations-f41 --->
	<button class="glow" on:click={onRunAlgorithm}>Visualize</button>
	<div class="center">
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
		color: #000000;
		text-transform: uppercase;
	}
	#failed {
		color: red;
		font-weight: bold;
	}
	h1 {
		color: #000000;
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