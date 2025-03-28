#!/bin/bash

source ./scripts/utils/validators.sh

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
      jq --arg pkg "$PKG" --arg ver "$VERSION" '.devDependencies[$pkg] = $ver' package.json > package.tmp.json && mv package.tmp.json package.json
    else
      jq --arg pkg "$PKG" --arg ver "$VERSION" '.dependencies[$pkg] = $ver' package.json > package.tmp.json && mv package.tmp.json package.json
    fi
    echo "🟢 Añadido $PKG@$VERSION a package.json"
  fi
}

fix_package_versions() {
  echo "🔧 Reparando versiones en package.json..."
  
# Verificar si jq está instalado
  # Verificar si jq está instalado
  if ! command -v jq >/dev/null 2>&1; then
    echo "Instalando jq para manipular package.json..."
    sudo apt-get update && sudo apt-get install -y jq
  fi

  # Actualizar versiones específicas en package.json
  jq '.dependencies.react = "18.2.0" |
      .dependencies["react-dom"] = "18.2.0" |
      .dependencies["date-fns"] = "2.30.0" |
      .dependencies.next = "14.0.4"' package.json > package.tmp.json && mv package.tmp.json package.json

  echo "✅ Versiones reparadas en package.json"
}

install_prod_dependencies() {
  echo "📦 Agregando dependencias..."
  source ./scripts/configs/dependencies.conf  # Corregir ruta
  for dep in "${PROD_DEPS[@]}"; do
    IFS=: read -r name version <<< "$dep"
    add_to_package_json "$name" "$version" "prod"
  done
}

install_dev_dependencies() {
  echo "🛠️ Agregando devDependencies..."
  source ./scripts/configs/dependencies.conf  # Corregir ruta
  for dep in "${DEV_DEPS[@]}"; do
    IFS=: read -r name version <<< "$dep"
    add_to_package_json "$name" "$version" "dev"
  done
}

install_all() {
  echo "🔄 Ejecutando instalación final..."
  
  if [ "$PACKAGE_MANAGER" = "pnpm" ]; then
    echo "🧹 Limpiando node_modules..."
    rm -rf node_modules
    pnpm store prune
    
    # Instalar todo excepto builds nativos
    pnpm install --shamefully-hoist --ignore-scripts || {
      fix_package_versions
      pnpm install --shamefully-hoist --ignore-scripts || exit 1
    }
    
    echo "⚠️ Algunas dependencias requieren instalación manual con sus scripts:"
    echo "   Ejecuta: pnpm add <dependencia> --ignore-scripts=false"
    echo "   - @prisma/client"
    echo "   - @prisma/engines"
    echo "   - esbuild"
    echo "   - prisma"
    echo "   - sharp"
    
    validate_node_modules
    check_peer_dependencies
  else
    $PACKAGE_MANAGER install --legacy-peer-deps || {
      fix_package_versions
      $PACKAGE_MANAGER install --legacy-peer-deps || exit 1
    }
  fi
}
