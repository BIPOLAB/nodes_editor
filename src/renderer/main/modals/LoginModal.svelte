<script>
  import { onMount, onDestroy } from 'svelte';
  import {
    auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
  } from '../../lib/firebase';
  import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

  export let open = false;

  let email = '';
  let password = '';
  let loading = false;
  let error = '';

  function close() {
    if (loading) return;
    open = false;
  }

  function onKey(e) {
    if (e.key === 'Escape' && open) close();
  }

  onMount(() => window.addEventListener('keydown', onKey));
  onDestroy(() => window.removeEventListener('keydown', onKey));

  async function login() {
    error = '';
    if (!email || !password) {
      error = 'Please enter e-mail and password.';
      return;
    }
    loading = true;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      close();
    } catch (e) {
      console.error(e);
      error = 'Login failed.';
    } finally {
      loading = false;
    }
  }

  async function register() {
    error = '';
    if (!email || !password) {
      error = 'Please enter e-mail and password.';
      return;
    }
    loading = true;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      close();
    } catch (e) {
      console.error(e);
      error = 'Register failed.';
    } finally {
      loading = false;
    }
  }

  async function resetPassword() {
    error = '';
    if (!email) {
      error = 'Enter your e-mail to reset password.';
      return;
    }
    loading = true;
    try {
      await sendPasswordResetEmail(auth, email);
      error = 'We sent a reset link if the e-mail exists.';
    } catch (e) {
      console.error(e);
      error = 'Could not send reset link.';
    } finally {
      loading = false;
    }
  }

  async function loginWithGoogle() {
    error = '';
    loading = true;
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      close();
    } catch (e) {
      console.error(e);
      error = 'Google sign-in failed.';
    } finally {
      loading = false;
    }
  }
</script>

{#if open}
  <!-- Overlay -->
  <div class="fixed inset-0 z-50 bg-black/60 flex items-center justify-center" on:click|self={close}>
    <!-- Panel -->
    <div class="w-[520px] max-w-[92vw] bg-[#1e2a31] text-gray-200 rounded-lg shadow-xl border border-white/10 p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold">Login to profile cloud</h3>
        <button class="text-gray-400 hover:text-gray-200" on:click={close}>✕</button>
      </div>

      <div class="space-y-3">
        <div>
          <label class="block text-sm mb-1">e-mail</label>
          <input
            type="email"
            placeholder="email@example.com"
            bind:value={email}
            class="w-full bg-[#1b252c] border border-white/15 rounded px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label class="block text-sm mb-1">password</label>
          <input
            type="password"
            placeholder="********"
            bind:value={password}
            class="w-full bg-[#1b252c] border border-white/15 rounded px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <button type="button" class="text-emerald-400 text-sm hover:underline" on:click={resetPassword}>
          Forgot password?
        </button>

        {#if error}
          <div class="text-rose-400 text-xs">{error}</div>
        {/if}

        <div class="pt-2 grid gap-3">
          <button
            class="w-full py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50"
            on:click={login}
            disabled={loading}
          >
            login
          </button>

          <button
            class="w-full py-2 rounded bg-transparent border border-white/15 hover:bg-white/10 text-gray-200 disabled:opacity-50"
            on:click={register}
            disabled={loading}
          >
            register
          </button>

          <!-- Divider -->
          <div class="relative py-2">
            <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/10"></div>
          </div>

          <button
            class="w-full py-2 rounded bg-transparent border border-white/15 hover:bg-white/10 text-gray-200"
            on:click={() => window.open('https://tu-sitio.com/register', '_blank')}
          >
            register on website
          </button>

          <button
            class="w-full py-2 rounded bg-white text-gray-800 hover:bg-gray-100 flex items-center justify-center gap-3"
            on:click={loginWithGoogle}
            disabled={loading}
          >
            <!-- Google logo -->
            <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,16.108,18.961,13,24,13c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.196-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.539,5.036C9.5,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.236-2.231,4.166-3.894,5.57 c0.002-0.001,0.003-0.003,0.005-0.004l6.196,5.238C36.947,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
