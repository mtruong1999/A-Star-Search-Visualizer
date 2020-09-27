<script>

    import Row from './Row.svelte';

    export let rowCount;
    export let cellCount;

</script>

{#each Array(rowCount) as row, rowIdx}
    <Row cellCount={cellCount} rowIdx={rowIdx} on:gridCreated on:cellClick/>
{/each}