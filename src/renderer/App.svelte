<script>
  import Titlebar from '../components/Titlebar.svelte';
  import IconRail from '../components/IconRail.svelte';
  import LeftExplorer from './main/user-interface/panels/LeftExplorer/LeftExplorer.svelte';
  import TopCommandBar from '../components/TopCommandBar.svelte';
  import Workspace from '../components/Workspace.svelte';
  import RightInspector from './main/user-interface/panels/RightInspector/RightInspector.svelte';
  import StatusBar from '../components/StatusBar.svelte';
  import LoginForm from '../components/LoginForm.svelte';
  import { auth, onAuthStateChanged } from '../lib/firebase';
  import { currentUser } from '@/stores/auth';

// Estado del panel derecho
  let rightOpen = false;
  let rightPanel = null; // 'login' | 'inspector' | null

  // Cuando se hace click en un item del rail
  function handleRailAction(e) {
    const { id } = e.detail; // 'home','configs','profile','cloud','wifi'...
    if (id === 'profile') {
      // toggle del panel de login
      if (rightOpen && rightPanel === 'login') {
        rightOpen = false;
        rightPanel = null;
      } else {
        rightOpen = true;
        rightPanel = 'login';
      }
    } else {
      // Ejemplo: si haces click en otro (configs), podrías abrir inspector
      if (id === 'configs') {
      // toggle del panel de login
      if (rightOpen && rightPanel === 'inspector') {
        rightOpen = false;
        rightPanel = null;
      } else {
        rightOpen = true;
        rightPanel = 'inspector';
      }
    }
      // o dejarlo como no hace nada por ahora
    }
  }
</script>

<div class="flex flex-col h-screen bg-[#1f2a32] text-gray-200">
  <Titlebar/>

  <div class="flex flex-1 min-h-0">
    <!-- Rail de iconos -->
    <aside class="w-14 bg-[#171e24] border-r border-white/5">
      <IconRail on:action={handleRailAction}/>
    </aside>

    <!-- Sidebar izquierda -->
    <aside class="w-72 bg-[#202a31] border-r border-white/5 min-w-[260px] max-w-[360px] overflow-auto">
      <LeftExplorer/>
    </aside>

    <!-- Centro -->
    <section class="flex-1 flex flex-col min-w-0 bg-[#24323a]">
      <TopCommandBar/>
      <Workspace/>
    </section>

    <!-- Sidebar derecha: colapsable -->
    <aside
      class="border-l border-white/5 overflow-hidden transition-all duration-300 bg-[#202a31]"
      class:w-0={!rightOpen}
      class:w-[360px]={rightOpen}
    >
      {#if rightOpen}
        {#if rightPanel === 'login'}
          <LoginForm />
        {:else if rightPanel === 'inspector'}
          <RightInspector />
        {/if}
      {/if}
    </aside>
  </div>

  <StatusBar/>
</div>
