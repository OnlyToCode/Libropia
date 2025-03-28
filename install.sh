#!/bin/bash

source ./scripts/utils/package-manager.sh
source ./scripts/utils/file-manager.sh
source ./scripts/utils/validators.sh

setup_workspace() {
  mkdir -p ./scripts/configs ./scripts/configs/css-templates
  # Eliminamos la línea de backup innecesaria
  # cp ./app/globals.css ./app/globals.css.bak 2>/dev/null || true
}

cleanup() {
  rm -f *.tmp.json
  rm -f ./app/globals.css.tmp
}

main() {
  # Preparar workspace
  setup_workspace
  trap cleanup EXIT

  # Validaciones iniciales
  check_node_npm || exit 1
  detect_package_manager || exit 1
  validate_package_json || exit 1

  # Instalación de dependencias
  install_prod_dependencies
  install_dev_dependencies
  install_all

  # Configuración del proyecto
  setup_configs
  repair_project_issues
  
  echo "🎉 Instalación completada correctamente con $PACKAGE_MANAGER"
}

main
