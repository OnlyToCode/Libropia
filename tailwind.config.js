/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Escanea todos los archivos en la carpeta `app`
    "./components/**/*.{js,ts,jsx,tsx}", // Escanea la carpeta `components` si existe
    "./pages/**/*.{js,ts,jsx,tsx}", // Escanea la carpeta `pages` si existe
  ],
  theme: {
    extend: {
      colors: {
        border: "#e5e7eb", // Define el color para la clase `border-border`
      },
    },
  },
  plugins: [],
};

