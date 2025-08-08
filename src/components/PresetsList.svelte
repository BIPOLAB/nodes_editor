<script>
  import { onMount } from 'svelte';
  import { buscarPresets,obtenerPresetsPrueba } from '../lib/presets.js';
  import BotonCargarMas from './BotonCargarMas.svelte';

  export let titulo = "🎼 Buscar presets";

  let presets = [];
  let filtro = '';
  let cargando = false;
  let paginaAnterior = null;
  let ultimaBusqueda = '';
  let sinMasResultados = false;

  async function cargarPresets(nuevaBusqueda = false) {
    cargando = true;
    console.log("Ejecutando cargarPresets()...");
    console.log(presets)

    if (nuevaBusqueda) {
      paginaAnterior = null;
      presets = [];
      sinMasResultados = false;
    }

    try {
      const { docs, lastVisible } = await buscarPresets({
        filtro,
        paginaAnterior,
        pageSize: 4
      });

      if (docs.length === 0) {
        sinMasResultados = true;
      } else {
        presets = [...presets, ...docs];
        paginaAnterior = lastVisible;
      }

      ultimaBusqueda = filtro;
    } catch (e) {
      console.error("Error al obtener presets:", e);
    }

    cargando = false;
  }

  function buscar() {
    if (filtro !== ultimaBusqueda) {
      cargarPresets(true);
    }
  }

  onMount(() => cargarPresets(true));
  console.log("Presets obtenidos:",  presets);
</script>

<section>
  <h2>{titulo}</h2>
  
  <p>Presets encontrados: {presets.length}</p>

  <input
    type="text"
    bind:value={filtro}
    placeholder="Buscar por nombre (ej: jazz, rock...)"
    on:input={buscar}
  />

  {#if presets.length > 0}
    <ul>
      {#each presets as preset}
        <li>
          <strong>{preset.nombre}</strong>: {preset.acordes?.join(', ')}
        </li>
      {/each}
    </ul>
  {:else if !cargando}
    <p>No se encontraron presets.</p>
  {/if}

  <BotonCargarMas
    {cargando}
    {sinMasResultados}
    onClick={() => cargarPresets(false)}
  />
</section>

<style>
  section {
    padding: 1rem;
  }

  input {
    width: 100%;
    max-width: 400px;
    padding: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  ul {
    margin-top: 1rem;
    padding-left: 1rem;
  }

  li {
    margin-bottom: 0.5rem;
  }
</style>
