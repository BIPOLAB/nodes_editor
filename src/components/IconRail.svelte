<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const items = [
    { id: 'home',    icon: 'fa-solid fa-house',   label: 'Home' },
    { id: 'configs', icon: 'fa-solid fa-sliders', label: 'Configs' },
    { id: 'cloud',   icon: 'fa-solid fa-cloud',   label: 'Cloud' },
    { id: 'profile', icon: 'fa-solid fa-user',    label: 'Profile' },
    { id: 'wifi',    icon: 'fa-solid fa-wifi',    label: 'WiFi' },
  ];

  let active = null;

  function clickItem(it) {
    // Emitimos siempre, y dejamos que el padre haga el toggle
    dispatch('action', { id: it.id });

    // (Opcional) marcar activo visualmente
    active = active === it.id ? null : it.id;
  }
</script>

<nav class="flex flex-col items-center py-3 gap-2">
  {#each items as it}
    <button
      class="w-10 h-10 grid place-items-center rounded-md transition
             hover:bg-white/10 {active === it.id ? 'bg-white/10 text-white' : 'text-gray-400'}"
      title={it.label}
      on:click={() => clickItem(it)}
    >
      <i class={it.icon + ' text-[18px]'}></i>
    </button>
  {/each}

</nav>
