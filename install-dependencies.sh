#!/bin/bash

check_node_npm() {
  if command -v node >/dev/null 2>&1; then
    NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
      echo "Node.js debe ser >= 18. Versión actual: $NODE_VERSION"
      exit 1
    fi
  else
    echo "Instalando Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
  fi
}

detect_package_manager() {
  if [ -f "pnpm-lock.yaml" ]; then
    if (! command -v pnpm >/dev/null 2>&1); then
      echo "Instalando pnpm..."
      npm install -g pnpm
    fi
    PACKAGE_MANAGER="pnpm"
    EXEC_CMD="pnpm exec"
    rm -f package-lock.json yarn.lock
  elif [ -f "yarn.lock" ]; then
    if (! command -v yarn >/dev/null 2>&1); then
      echo "Instalando yarn..."
      npm install -g yarn
    fi
    PACKAGE_MANAGER="yarn"
    EXEC_CMD="yarn"
    rm -f package-lock.json pnpm-lock.yaml
  else
    PACKAGE_MANAGER="npm"
    EXEC_CMD="npx"
    rm -f pnpm-lock.yaml yarn.lock
  fi
  echo "📦 Gestor detectado: $PACKAGE_MANAGER"
}

add_to_package_json() {
  PKG=$1
  VERSION=$2
  TYPE=$3

  if [ -z "$VERSION" ]; then
    VERSION="latest"
  fi

  if grep -q "\"$PKG\"" package.json; then
    echo "🔵 $PKG ya está en package.json"
  else
    if [ "$TYPE" == "dev" ]; then
      npm pkg set "devDependencies.$PKG=$VERSION"
    else
      npm pkg set "dependencies.$PKG=$VERSION"
    fi
    echo "🟢 Añadido $PKG@$VERSION a package.json"
  fi
}

install_dependencies() {
  echo "📦 Agregando dependencias..."
  add_to_package_json "next" "14" "prod"
  add_to_package_json "react" "18" "prod"
  add_to_package_json "react-dom" "18" "prod"
  add_to_package_json "typescript" "^5" "prod"
  add_to_package_json "tailwindcss" "^3.3" "prod"
  add_to_package_json "postcss" "" "prod"
  add_to_package_json "autoprefixer" "" "prod"
  add_to_package_json "lucide-react" "" "prod"
  add_to_package_json "react-hook-form" "" "prod"
  add_to_package_json "jsonwebtoken" "^9" "prod"
  add_to_package_json "date-fns" "" "prod"
  add_to_package_json "clsx" "" "prod"
  # Eliminado @shadcn/ui debido a problemas de instalación
}

install_dev_dependencies() {
  echo "🛠️ Agregando devDependencies..."
  add_to_package_json "eslint" "" "dev"
  add_to_package_json "eslint-config-next" "" "dev"
  add_to_package_json "prettier" "" "dev"
  add_to_package_json "@types/node" "" "dev"
  add_to_package_json "@types/react" "" "dev"
  add_to_package_json "@types/react-dom" "" "dev"
}

install_all() {
  echo "🔄 Ejecutando instalación final..."
  if [ "$PACKAGE_MANAGER" = "pnpm" ]; then
    pnpm install --no-optional || {
      echo "❌ Error durante la instalación con pnpm."
      exit 1
    }
    validate_node_modules
    check_peer_dependencies
  elif [ "$PACKAGE_MANAGER" = "yarn" ]; then
    yarn install || {
      echo "❌ Error durante la instalación con yarn."
      exit 1
    }
  else
    npm install --legacy-peer-deps || {
      echo "❌ Error durante la instalación con npm."
      exit 1
    }
  fi
}

validate_node_modules() {
  echo "🔎 Validando node_modules..."
  if [ ! -d "node_modules" ]; then
    echo "❌ node_modules no fue creado correctamente."
    exit 1
  fi
  if [ "$PACKAGE_MANAGER" = "pnpm" ] && [ ! -d "node_modules/.pnpm" ]; then
    echo "❌ Faltan carpetas internas de pnpm (/.pnpm)."
    echo "⚠️ Intenta limpiar la caché de pnpm con 'pnpm store prune' y reinstalar manualmente."
    exit 1
  fi
  echo "✅ node_modules verificado correctamente."
}

check_peer_dependencies() {
  echo "🔎 Revisando peerDependencies no resueltas..."
  if pnpm list | grep "UNMET"; then
    echo "⚠️ Hay peerDependencies no resueltas."
  else
    echo "✅ Todas las peerDependencies están satisfechas."
  fi
}

validate_package_json() {
  echo "🔎 Validando package.json..."
  
  # Eliminar dependencias duplicadas o incorrectas
  if grep -q "\"shadcn/ui\"" package.json; then
    echo "❌ Eliminando dependencia duplicada o incorrecta: 'shadcn/ui'."
    npm pkg delete dependencies["shadcn/ui"]
  fi

  if grep -q "\"@shadcn/ui\"" package.json; then
    echo "✅ Dependencia '@shadcn/ui' está correctamente configurada."
  else
    echo "🟢 Reparando dependencia '@shadcn/ui'."
    npm pkg set dependencies["@shadcn/ui"]="latest"
  fi
}

setup_tailwind() {
  if [ ! -f tailwind.config.js ]; then
    echo "⚙️ Generando tailwind.config.js..."
    $EXEC_CMD tailwindcss init
    echo "module.exports = {
      content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
      theme: {
        extend: {
          colors: {
            border: '#e5e7eb',
          },
        },
      },
      plugins: [],
    };" > tailwind.config.js
  else
    echo "🔵 tailwind.config.js ya existe."
  fi

  if [ ! -f postcss.config.js ]; then
    echo "⚙️ Generando postcss.config.js..."
    echo "module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };" > postcss.config.js
  else
    echo "🔵 postcss.config.js ya existe."
  fi
}

repair_project_issues() {
  echo "🔧 Reparando errores comunes del proyecto..."

  # Eliminar dependencias duplicadas
  echo "🔍 Eliminando dependencias duplicadas..."
  pnpm dedupe || {
    echo "⚠️ Error al deduplicar dependencias con pnpm."
  }

  # Actualizar dependencias desactualizadas
  echo "🔍 Actualizando dependencias desactualizadas..."
  pnpm update date-fns react react-dom || {
    echo "⚠️ Error al actualizar dependencias."
  }

  # Verificar y reparar archivos esenciales
  echo "🔍 Verificando archivos esenciales..."
  if [ ! -f ".eslintrc.json" ]; then
    echo "🛠️ Creando .eslintrc.json..."
    echo '{ "extends": "next/core-web-vitals" }' > .eslintrc.json
  fi

  if [ ! -f "tailwind.config.js" ]; then
    echo "🛠️ Creando tailwind.config.js..."
    $EXEC_CMD tailwindcss init
  fi

  if [ ! -f "postcss.config.js" ]; then
    echo "🛠️ Creando postcss.config.js..."
    echo "module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };" > postcss.config.js
  fi

  # Validar y reparar package.json
  echo "🔍 Validando y reparando package.json..."
  if ! grep -q '"next"' package.json; then
    echo "🟢 Añadiendo 'next' a las dependencias..."
    npm pkg set dependencies.next="latest"
  fi

  if ! grep -q '"react"' package.json; then
    echo "🟢 Añadiendo 'react' a las dependencias..."
    npm pkg set dependencies.react="latest"
  fi

  if ! grep -q '"react-dom"' package.json; then
    echo "🟢 Añadiendo 'react-dom' a las dependencias..."
    npm pkg set dependencies.react-dom="latest"
  fi

  # Reparar scripts en package.json
  echo "🔍 Reparando scripts en package.json..."
  npm pkg set scripts.dev="next dev"
  npm pkg set scripts.build="next build"
  npm pkg set scripts.start="next start"
  npm pkg set scripts.lint="next lint"

  echo "✅ Reparaciones completadas."
}

verify_and_repair_files() {
  echo "🔍 Verificando y reparando archivos necesarios para pnpm dev..."

  # Verificar y reparar .eslintrc.json
  if [ ! -f ".eslintrc.json" ]; then
    echo "🛠️ Creando .eslintrc.json..."
    echo '{ "extends": "next/core-web-vitals" }' > .eslintrc.json
  else
    echo "✅ .eslintrc.json ya existe."
  fi

  # Verificar y reparar tailwind.config.js
  if [ ! -f "tailwind.config.js" ]; then
    echo "🛠️ Creando tailwind.config.js..."
    $EXEC_CMD tailwindcss init
    echo "module.exports = {
      content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
      theme: {
        extend: {
          colors: {
            border: '#e5e7eb',
          },
        },
      },
      plugins: [],
    };" > tailwind.config.js
  else
    echo "✅ tailwind.config.js ya existe."
  fi

  # Verificar y reparar postcss.config.js
  if [ ! -f "postcss.config.js" ]; then
    echo "🛠️ Creando postcss.config.js..."
    echo "module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };" > postcss.config.js
  else
    echo "✅ postcss.config.js ya existe."
  fi

  # Verificar y reparar globals.css
  if [ ! -f "./app/globals.css" ]; then
    echo "🛠️ Creando app/globals.css..."
    mkdir -p ./app
    echo "@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: Arial, Helvetica, sans-serif;
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  .bg-background {
    background-color: hsl(var(--background));
  }
  .text-foreground {
    color: hsl(var(--foreground));
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
  @apply bg-background text-foreground;
}" > ./app/globals.css
  else
    echo "✅ app/globals.css ya existe."
  fi

  echo "✅ Verificación y reparación de archivos completada."
}

check_node_npm
detect_package_manager
validate_package_json
install_dependencies
install_dev_dependencies
install_all
setup_tailwind
verify_and_repair_files
repair_project_issues

echo "🎉 Instalación y reparaciones completadas correctamente con $PACKAGE_MANAGER."
