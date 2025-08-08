<!-- App.svelte o tu Layout principal -->
<script>
  import Titlebar from "../../components/Titlebar.svelte";
  import LeftPanel from "../../renderer/main/user-interface/leftPanel.svelte";
  import WifiPanel from "../../renderer/main/user-interface/panels/WifIPanel/wifiPanel.svelte";
</script>

<div class="flex flex-col h-screen">
  <Titlebar />

  <div class="flex flex-1 overflow-hidden">
    <aside class="w-16 bg-[#12161d] text-white flex flex-col items-center py-4">
      <LeftPanel />
    </aside>

    <main class="flex-1 overflow-auto bg-white dark:bg-[#0f141b]">
      <WifiPanel />
    </main>

    <aside class="w-64 bg-[#12161d] text-white hidden md:block">
      <!-- sidebar derecho opcional -->
    </aside>
  </div>

  <footer class="h-10 bg-[#0c1016] text-white/70 text-xs flex items-center px-3">
    © {new Date().getFullYear()} Nodes Editor
  </footer>
</div>
