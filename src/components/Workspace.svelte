<div class="flex-1 overflow-auto">
  <div class="h-full w-full flex items-center justify-center">
    <div class="bg-[#1b252c] border border-white/10 rounded-lg shadow-lg w-[360px] px-5 py-4">
      <div class="text-center mb-3">
        <div class="text-gray-300 font-semibold mb-1">No connected modules!</div>
        <div class="text-gray-400 text-xs">Try reconnecting your module by unplugging and plugging it in.</div>
      </div>
      <div class="grid gap-2">
        <button class="w-full px-3 py-2 rounded bg-[#202a31] border border-white/10 hover:bg-white/10 text-sm">Troubleshooting</button>
        <button class="w-full px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-sm text-white">Add Virtual Module</button>
      </div>
    </div>
  </div>

  <!-- barra inferior flotante del centro (Track/Event...) -->
  <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#1b252c] border border-white/10 rounded px-3 py-2 text-sm">
    <span class="text-gray-400">Track:</span>
    <select class="bg-transparent border border-white/10 rounded px-2 py-1">
      <option>Event</option>
      <option>State</option>
    </select>
    <button class="px-3 py-1 rounded bg-[#202a31] border border-white/10 hover:bg-white/10">Reset View</button>
  </div>
</div>
