import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        frontpage: resolve(__dirname, 'src/index.html'),
        login: resolve(__dirname, 'src/register.html'),
        signup: resolve(__dirname, 'src/accsignup.html'),
        dashboard: resolve(__dirname, 'src/home.html'),
        adminbooking: resolve(__dirname, 'src/adminbooking.html'),
        adminprofile: resolve(__dirname, 'src/adminprofile.html'),
        customer: resolve(__dirname, 'src/customer.html'),
        catalog: resolve(__dirname, 'src/gallery.html'),
        booking: resolve(__dirname, 'src/booking.html'),
        notification: resolve(__dirname, 'src/notif.html'),
        profile: resolve(__dirname, 'src/profile.html'),
      },
    }
  },
});
