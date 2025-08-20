import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
   esbuild: {
    // Tell esbuild to treat .js files (and the usual JSX/TSX files) as JSX.
    // This allows JSX syntax to exist in .js files.
    include: [/\.(js|jsx|ts|tsx)$/],
    exclude: [],
    loader: 'jsx' // use 'jsx' or 'tsx' depending on your needs
  }
});
