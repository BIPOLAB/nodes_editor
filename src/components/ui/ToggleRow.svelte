<script>
  export let title = '';
  export let checked = false;
</script>

<label class="flex items-center justify-between p-3 bg-[#1b252c] border border-white/10 rounded mb-2">
  <span>{title}</span>
  <input type="checkbox" class="accent-emerald-500" bind:checked />
</label>
