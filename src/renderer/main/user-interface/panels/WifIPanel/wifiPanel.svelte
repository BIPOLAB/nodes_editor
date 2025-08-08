<script>
  import { onMount } from 'svelte';

  let ssid = '';
  let pass = '';
  let log = '';
  let ssidList = [];
  let selectedSSID = '';

  function conectar() {
    const ssidToUse = selectedSSID || ssid;
    if (!ssidToUse) {
      log += '⚠️ Debes ingresar o seleccionar un SSID.\n';
      return;
    }
    if (window.electronAPI?.enviarComando) {
      window.electronAPI.enviarComando(`connect,${ssidToUse},${pass}`);
    } else {
      log += '⚠️ electronAPI no disponible.\n';
    }
  }

  function olvidar() {
    if (window.electronAPI?.enviarComando) {
      window.electronAPI.enviarComando('forget');
    } else {
      log += '⚠️ electronAPI no disponible.\n';
    }
  }

  function verEstado() {
    if (window.electronAPI?.enviarComando) {
      window.electronAPI.enviarComando('status');
    } else {
      log += '⚠️ electronAPI no disponible.\n';
    }
  }

  function test() {
    if (window.electronAPI?.test) {
      window.electronAPI.test();
    } else {
      log += '⚠️ electronAPI.test no disponible.\n';
    }
  }

  // Si tu backend soporta escanear redes, las cargamos al montar
  async function cargarRedes() {
    if (window.electronAPI?.getWifiNetworks) {
      try {
        ssidList = await window.electronAPI.getWifiNetworks();
      } catch (error) {
        log += '❌ Error al obtener redes WiFi: ' + error + '\n';
      }
    }
  }

  onMount(() => {
    if (window.electronAPI?.onSerialData) {
      window.electronAPI.onSerialData((msg) => {
        log += msg + '\n';
      });
    }
    cargarRedes();
  });
</script>

<div class="p-4 flex bg-gray-500 dark:bg-gray-800 text-gray-900">
  <h1 class="text-amber-800">Conexión - WIFI</h1>
</div>
<div class="p-4">
  {#if ssidList.length > 0}
    <label class="block mb-2">SSID:
      <select bind:value={selectedSSID} class="block w-full p-2 border rounded">
        <option value="">-- Selecciona una red --</option>
        {#each ssidList as red}
          <option value={red}>{red}</option>
        {/each}
      </select>
    </label>
    <div class="mb-2 text-xs text-gray-500">O escribe manualmente si tu red no aparece:</div>
  {/if}

  <label class="block mb-2">SSID manual:
    <input bind:value={ssid} class="w-full p-2 border rounded" placeholder="SSID personalizado" />
  </label>

  <label class="block mb-4">Password:
    <input type="password" bind:value={pass} class="w-full p-2 border rounded" />
  </label>

  <div class="space-x-2 space-y-2">
    <button type="button" on:click={conectar} class="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium text-neutral-100 transition-all [box-shadow:0px_4px_1px_#a3a3a3] active:translate-y-[2px] active:shadow-none">Connect</button>    
    <button type="button" on:click={olvidar} class="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium text-neutral-100 transition-all [box-shadow:0px_4px_1px_#a3a3a3] active:translate-y-[2px] active:shadow-none">Forget</button>    
    <button type="button" on:click={verEstado} class="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium text-neutral-100 transition-all [box-shadow:0px_4px_1px_#a3a3a3] active:translate-y-[2px] active:shadow-none">Status</button>    
    </div>

  <pre class="mt-4 p-2 bg-black text-white rounded">{log}</pre>
</div>
