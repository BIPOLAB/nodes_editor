<script>
  let maximized = false;
  async function toggleMax() {
    const w = window.electronAPI?.window;
    if (!w) return;
    if (await w.isMaximized()) { await w.restore(); maximized = false; }
    else { await w.maximize(); maximized = true; }
  }
</script>

<header class="h-8 bg-[#12171b] border-b border-white/5 text-gray-300 select-none flex items-center titlebar-drag">
  <div class="w-24 titlebar-no-drag pl-2 text-xs opacity-60">Nodes Editor</div>
  <div class="flex-1 text-center text-xs opacity-80">Workspace</div>
  <div class="w-24 pr-1 gap-1 titlebar-no-drag flex justify-end">
    <!-- Botones opcionales -->
    <!-- <button class="w-6 h-6 hover:bg-white/10 rounded" on:click={toggleMax}>{maximized ? '▢' : '⬜'}</button> -->
  </div>
</header>

<style>
  .titlebar-drag { -webkit-app-region: drag; }
  .titlebar-no-drag, .titlebar-no-drag * { -webkit-app-region: no-drag; }
</style>
