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

validate_package_json() {
  echo "🔎 Validando package.json..."
  
  # Verificar que el archivo existe
  if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json no encontrado"
    return 1
  fi

  # Verificar que es un JSON válido
  if ! jq empty package.json 2>/dev/null; then
    echo "❌ Error: package.json no es un JSON válido"
    return 1
  fi

  # Limpiar dependencias problemáticas
  if grep -q "\"shadcn/ui\"" package.json; then
    jq 'del(.dependencies["shadcn/ui"])' package.json > package.tmp.json && mv package.tmp.json package.json
  fi

  # Verificar y añadir dependencias necesarias
  if ! grep -q "\"@shadcn/ui\"" package.json; then
    jq '.dependencies["@shadcn/ui"] = "latest"' package.json > package.tmp.json && mv package.tmp.json package.json
  fi

  echo "✅ package.json validado correctamente"
  return 0
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
