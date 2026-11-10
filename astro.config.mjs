import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  base: '/flyers',
  server: {
    port: 4321,
    host: true
  }
});
