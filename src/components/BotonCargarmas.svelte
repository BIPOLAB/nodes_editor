<script>
  export let cargando = false;
  export let sinMasResultados = false;
  export let onClick = () => {};
</script>

<button
  on:click={onClick}
  disabled={cargando || sinMasResultados}
>
  {#if cargando}
    Cargando más...
  {:else if sinMasResultados}
    No hay más resultados
  {:else}
    ⬇ Cargar más
  {/if}
</button>

<style>
  button {
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    font-size: 1rem;
    background-color: #444;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.6;
    cursor: wait;
  }
</style>
