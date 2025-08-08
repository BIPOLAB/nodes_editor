<script>
  import { auth, signInWithEmailAndPassword, signOut } from '../lib/firebase';
  import { currentUser } from '@/stores/auth';
  import { get } from 'svelte/store';

  let email = '';
  let password = '';
  let loading = false;
  let error = '';

  async function login() {
    error = '';
    if (!email || !password) {
      error = 'Completa email y password.';
      return;
    }
    loading = true;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Éxito: currentUser se actualizará por onAuthStateChanged en App.svelte
      email = '';
      password = '';
    } catch (e) {
      console.error(e);
      error = 'No se pudo iniciar sesión.';
    } finally {
      loading = false;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
  }
</script>

<div class="p-4 text-sm">
  <h2 class="text-gray-200 font-semibold mb-3">Login</h2>

  {#if $currentUser}
    <div class="mb-3 text-gray-300">
      Sesión iniciada como <span class="font-medium">{$currentUser.email}</span>
    </div>
    <button
      class="w-full py-2 rounded bg-rose-600 hover:bg-rose-500 text-white"
      on:click={logout}
    >
      Cerrar sesión
    </button>
  {:else}
    <label class="block text-gray-400 mb-1">Email</label>
    <input
      class="w-full mb-3 px-3 py-2 rounded bg-[#1b252c] border border-white/10 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
      type="email"
      placeholder="nombre@ejemplo.com"
      bind:value={email}
    />

    <label class="block text-gray-400 mb-1">Password</label>
    <input
      class="w-full mb-3 px-3 py-2 rounded bg-[#1b252c] border border-white/10 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
      type="password"
      placeholder="********"
      bind:value={password}
    />

    {#if error}
      <div class="text-red-400 text-xs mb-2">{error}</div>
    {/if}

    <button
      class="w-full py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50"
      on:click={login}
      disabled={loading}
    >
      {loading ? 'Ingresando…' : 'Ingresar'}
    </button>
  {/if}
</div>
