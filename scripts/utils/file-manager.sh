#!/bin/bash

setup_configs() {
  echo "⚙️ Configurando archivos..."
  setup_tailwind
  setup_eslint
  setup_postcss
  setup_css
}

setup_css() {
  if [ -f "./app/globals.css" ]; then
    update_css_utilities
  else
    create_css_file
  fi
}

setup_tailwind() {
  if [ ! -f tailwind.config.js ]; then
    echo "⚙️ Generando tailwind.config.js..."
    $EXEC_CMD tailwindcss init
    cat > tailwind.config.js <<EOT
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: '#e5e7eb',
      },
    },
  },
  plugins: [],
};
EOT
  fi
}

setup_postcss() {
  if [ ! -f postcss.config.js ]; then
    echo "module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };" > postcss.config.js
  fi
}

setup_eslint() {
  if [ ! -f ".eslintrc.json" ]; then
    echo '{ "extends": "next/core-web-vitals" }' > .eslintrc.json
  fi
}

update_css_utilities() {
  echo "🔧 Actualizando utilities en globals.css..."
  TEMP_FILE=$(mktemp)
  
  # Nueva lógica que preserva todo excepto el bloque @layer utilities
  awk '
    BEGIN { in_utilities = 0; utilities_printed = 0 }
    
    # Si encontramos @layer utilities, marcamos que estamos dentro
    /@layer utilities/ {
      if (!utilities_printed) {
        print "@layer utilities {"
        print "  .bg-background {"
        print "    background-color: hsl(var(--background));"
        print "  }"
        print "  .text-foreground {"
        print "    color: hsl(var(--foreground));"
        print "  }"
        print "  .text-balance {"
        print "    text-wrap: balance;"
        print "  }"
        print "}"
        utilities_printed = 1
      }
      in_utilities = 1
      next
    }
    
    # Si encontramos un cierre de bloque y estamos en utilities, lo ignoramos
    /^}/ && in_utilities {
      in_utilities = 0
      next
    }
    
    # Si no estamos en utilities o no es una línea de utilidad, imprimimos
    !in_utilities && !/\.bg-background|\.text-foreground|\.text-balance/ {
      print
    }
  ' "./app/globals.css" > "$TEMP_FILE"

  if [ ! -s "$TEMP_FILE" ]; then
    echo "❌ Error al actualizar globals.css"
    return 1
  fi

  mv "$TEMP_FILE" "./app/globals.css"
  echo "✅ Clases personalizadas actualizadas en globals.css"
}

create_css_file() {
  echo "⚙️ Creando globals.css..."
  mkdir -p ./app
  cat > ./app/globals.css <<EOT
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .bg-background {
    background-color: hsl(var(--background));
  }
  .text-foreground {
    color: hsl(var(--foreground));
  }
  .text-balance {
    text-wrap: balance;
  }
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
  }
}

body {
  font-family: Arial, Helvetica, sans-serif;
  @apply bg-background text-foreground;
}
EOT
}

repair_project_issues() {
  echo "🔧 Reparando errores comunes del proyecto..."

  # Eliminar dependencias duplicadas
  if [ "$PACKAGE_MANAGER" = "pnpm" ]; then
    echo "🔍 Eliminando dependencias duplicadas..."
    pnpm dedupe || {
      echo "⚠️ Error al deduplicar dependencias con pnpm."
    }

    # Actualizar dependencias desactualizadas
    echo "🔍 Actualizando dependencias desactualizadas..."
    pnpm update date-fns react react-dom || {
      echo "⚠️ Error al actualizar dependencias."
    }
  fi

  # Verificar y reparar archivos esenciales
  setup_eslint
  setup_tailwind
  setup_postcss
  setup_css

  echo "✅ Reparaciones completadas."
}
