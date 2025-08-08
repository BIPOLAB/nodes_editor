import { mount } from 'svelte';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App.svelte';
import './app.css'; // o el nombre correcto del archivo
mount(App, {
  target: document.body,
});
