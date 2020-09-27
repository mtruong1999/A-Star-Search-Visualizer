<script>

    import Row from './Row.svelte';

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
<table>
    {#each Array(rowCount) as row, rowIdx}
        <Row cellCount={cellCount} rowIdx={rowIdx} on:gridCreated on:cellClick={cellClick_handler}/>
    {/each}
</table>

<style>
    table {
		border-spacing: 0;
	}
</style>
