<script>
  export let title = '';
</script>

<div class="mb-4 p-3 bg-[#1b252c] border border-white/10 rounded">
  {#if title}
    <div class="font-medium mb-2">{title}</div>
  {/if}
  <slot />
</div>
