<script>
  let query = '';
  const sections = [
    "Community Configs (185)",
    "My Configs (0)",
    "Recommended Configs (172)",
  ];

  function toggle(idx) {
    // lógica de toggle (por ejemplo)
  }
</script>

<div class="p-3 text-sm">
  <!-- Buscador -->
  <div class="flex items-center gap-2 mb-3">
    <input
      type="text"
      bind:value={query}
      placeholder="Find…"
      class="flex-1 bg-[#1b252c] border border-white/10 rounded px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
    />
    <button class="w-8 h-8 grid place-items-center rounded bg-[#1b252c] border border-white/10 hover:bg-white/10">
      <i class="fa-solid fa-plus text-gray-300"></i>
    </button>
  </div>

  <!-- Sort / filtro -->
  <div class="flex items-center justify-between text-xs text-gray-400 mb-2">
    <div class="flex items-center gap-2">
      <span>SORT BY</span>
      <button class="px-2 py-1 bg-[#1b252c] rounded border border-white/10 hover:bg-white/10">
        Date <i class="fa-solid fa-arrow-down-wide-short ml-1"></i>
      </button>
    </div>
    <label class="flex items-center gap-2">
      <input type="checkbox" class="accent-emerald-500" />
      <span>Only show supported</span>
    </label>
  </div>

  <!-- Secciones -->
  <div class="divide-y divide-white/10 rounded overflow-hidden mb-4">
    {#each sections as title, idx}
      <div
        class="px-3 py-2 flex items-center justify-between cursor-default hover:bg-white/5"
        on:click={() => toggle(idx)}
      >
        <span>{title}</span>
        <i class="fa-solid fa-caret-right text-gray-500"></i>
      </div>
    {/each}
  </div>

  <!-- Contenido abajo (placeholders) -->
  <div class="grid gap-3">
    <div class="bg-[#1b252c] border border-white/10 rounded h-24 flex items-center justify-center">
      <span class="text-gray-400">No configuration is selected</span>
    </div>
    <div class="bg-[#1b252c] border border-white/10 rounded h-20 flex items-center justify-center">
      <span class="text-gray-400">Watched values:</span>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div class="bg-[#1b252c] border border-white/10 rounded h-16 flex items-center justify-center">
        <span class="text-gray-400">NaN kbps (TX)</span>
      </div>
      <div class="bg-[#1b252c] border border-white/10 rounded h-16 flex items-center justify-center">
        <span class="text-gray-400">0 kbps (RX)</span>
      </div>
    </div>
  </div>
</div>
