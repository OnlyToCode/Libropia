#!/bin/bash

# Definir la ruta del archivo de texto
ARCHIVO="codigoPaquetesSH.txt"

# Verificar si el archivo existe
if [[ ! -f "$ARCHIVO" ]]; then
    echo "[ERROR] No se encontró el archivo $ARCHIVO"
    exit 1
fi

# Leer y ejecutar el contenido como si estuviera pegado en la terminal
echo "[INFO] Pegando y ejecutando el contenido de $ARCHIVO..."
bash <(cat "$ARCHIVO")