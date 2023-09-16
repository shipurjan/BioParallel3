<script>
  import '../app.css';
  import { appWindow, PhysicalSize } from '@tauri-apps/api/window';
  void appWindow.setMinSize(new PhysicalSize(1280, 720));
</script>

<slot />
