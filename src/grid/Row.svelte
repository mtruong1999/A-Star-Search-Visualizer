<script>
    import { createEventDispatcher, onMount} from 'svelte';

    export let cellCount;
    export let rowIdx;
    const dispatch = createEventDispatcher();

    onMount(() => {
        dispatch('gridCreated');
    });

    let onCellClicked = (e) => {
        dispatch('cellClick', e);
    };
    
    // maybe refactor the styles below and instead of using global, use a prop on this child component
    // to determine whether or not to add the class and conditionally add the class in this markup?
    // Otherwise, Svelte will remove unused styles...
</script>

<style>
    .cell {
        height: 20px;
        width: 20px;
        cursor: pointer;
        border: 1px solid gray;
    }

    :global(.cell--wall) {
        background-color: black;
    }
    :global(.cell--start) {
        background-color: green;
    }
    :global(.cell--end) {
        background-color: red;
    }
    :global(.cell--discovered) {
        background-color: aqua;
    }
    :global(.cell--visited) {
        background-color: mediumblue;
    }
    :global(.cell--path) {
        background-color: darkorange;
    }
    :global(.cell--highlighted) {
        border: 2px solid green;
    }
</style>

<tr class='row'>
    {#each Array(cellCount) as columnCell, columnIdx}
        <td class='cell'
            on:click={onCellClicked}
            id={`${rowIdx},${columnIdx}`}
            data-cellidx={`${rowIdx},${columnIdx}`}
            on:mouseover
            on:mouseup
            on:mousedown
        ></td>
    {/each}
</tr>