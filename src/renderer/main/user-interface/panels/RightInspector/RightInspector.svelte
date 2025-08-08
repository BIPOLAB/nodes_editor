<script>
  import Card from './../../../../../components/ui/Card.svelte';
  import ToggleRow from './../../../../../components/ui/ToggleRow.svelte';
</script>

<div class="p-3 text-sm">
  <div class="flex items-center justify-between mb-2">
    <div class="font-semibold">General settings</div>
    <i class="fa-solid fa-caret-down text-gray-500"></i>
  </div>

  <Card title="Control surface rotation">
    <div class="text-xs text-gray-400 mb-2">
      Changes how controllers are rotated in the application.
    </div>
    <div class="flex gap-2">
      {#each [0, 90, 180, 270] as deg}
        <label class="px-2 py-1 rounded bg-[#1b252c] border border-white/10 hover:bg-white/10 cursor-pointer">
          <input type="radio" name="rot" class="hidden" />
          {deg}°
        </label>
      {/each}
    </div>
  </Card>

  <Card title="Controller scaling">
    <div class="flex items-center gap-3">
      <input type="range" min="0" max="100" class="w-full accent-emerald-500" />
      <button class="px-2 py-1 rounded bg-[#202a31] border border-white/10 hover:bg-white/10 text-xs">
        Reset
      </button>
    </div>
  </Card>

  <ToggleRow title="Action Block Helpers" />
  <ToggleRow title="Colorful Toolbar" />
  <ToggleRow title="Enabled" />
</div>
