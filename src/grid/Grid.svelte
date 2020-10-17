<script>

    import Row from './Row.svelte';

    let rowCount = 20;
	let cellCount = 52;
	let startCellSelected = false;
	let endCellSelected = false;
	let clickDown = false;
	let readyToBuildWalls = false;
    
    function cellClick_handler(e) {
		//clickDown = true;
		if(!e.detail.target.dataset.cellidx) return; // check that clicked cell has a cell index
		if(!startCellSelected) { // select start cell first if havent selected
			e.detail.target.classList.toggle('cell--start');
			e.detail.target.classList.remove('cell--wall'); // doesnt throw error if there is no wall
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
			e.detail.target.classList.remove('cell--wall'); // doesnt throw error if there is no wall
			endCellSelected = true;
			console.log('end')
			readyToBuildWalls = true;
			return;
		}
		else if(e.detail.target.classList.contains('cell--end') && endCellSelected) {
			e.detail.target.classList.toggle('cell--end');
			endCellSelected = false;
			readyToBuildWalls = false;
			return;
		}
		
		e.detail.target.classList.toggle('cell--wall');
	}
	function handleMouseover(event) {
		if(!clickDown) return;
		// need to add check if we are already in this cell? Unless mouse over is only triggered once per cell hover?
		if(!readyToBuildWalls) return;
		let classList_ = event.target.classList;
		if(classList_.contains('cell--start') || classList_.contains('cell--end')) return;

		event.target.classList.toggle('cell--wall');

	}
	function handleMouseDown(event) {
		if(event.button != 0) return; // if not left click
		clickDown = true;
	}
	function handleMouseup(event) {
		clickDown = false;
		console.log(clickDown)
	}
</script>
<table>
    {#each Array(rowCount) as row, rowIdx}
		<Row 
			cellCount={cellCount}
			rowIdx={rowIdx}
			on:gridCreated
			on:cellClick={cellClick_handler}
			on:mouseover={handleMouseover}
			on:mouseup={handleMouseup}
			on:mousedown={handleMouseDown}
		/>
    {/each}
</table>

<style>
    table {
		border-spacing: 0;
	}
</style>
