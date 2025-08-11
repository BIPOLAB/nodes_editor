<script>
  import { onMount } from 'svelte';
  import { currentUser } from '../renderer/stores/auth';
  import { signOut } from '../renderer/lib/firebase';
  import LoginModal from '../renderer/main/modals/LoginModal.svelte';

  let open = false;

  async function logout() {
    try { await signOut(); } catch (e) { console.error(e); }
  }
</script>

<div class="p-4 text-sm">
  <h2 class="text-gray-200 font-semibold mb-3">Profile Cloud</h2>

  {#if $currentUser}
    <div class="mb-3 text-gray-300">
      Logged in as <span class="font-medium">{$currentUser.email}</span>
    </div>
    <button
      class="w-full py-2 rounded bg-rose-600 hover:bg-rose-500 text-white"
      on:click={logout}
    >
      Logout
    </button>
  {:else}
    <button
      class="w-full py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white"
      on:click={() => (open = true)}
    >
      Login
    </button>
  {/if}

  <!-- Modal -->
  <LoginModal bind:open />
</div>
