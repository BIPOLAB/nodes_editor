<script>
  let email = '';
  let password = '';
  let loading = false;
  let error = '';

  async function submit() {
    error = '';
    if (!email || !password) {
      error = 'Completa email y password.';
      return;
    }
    loading = true;
    try {
      // Aquí podrías llamar a tu API / Firebase auth / IPC
      await new Promise(r => setTimeout(r, 700)); // simula delay
      // success -> puedes cerrar panel desde App si quieres mandar un evento
      // dispatch('logged', { email })
    } catch (e) {
      error = 'Error al iniciar sesión.';
    } finally {
      loading = false;
    }
  }
</script>

<div class="p-4 text-sm">
  <h2 class="text-gray-200 font-semibold mb-3">Login</h2>

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
    on:click={submit}
    disabled={loading}
  >
    {loading ? 'Ingresando…' : 'Ingresar'}
  </button>
</div>
