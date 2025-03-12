# Ruta del archivo que contiene el código como texto
$archivoPaquetes = ".\codigoPaquetesPS1.txt"

# Verificar si el archivo existe
if (-not (Test-Path $archivoPaquetes)) {
    Write-Host "[ERROR] No se encontró el archivo $archivoPaquetes" -ForegroundColor Red
    Read-Host "Presiona ENTER para salir"
    Exit
}

# Leer el contenido del archivo (como texto)
$contenido = Get-Content -Path $archivoPaquetes -Raw

# Simular pegar y ejecutar en la terminal
Write-Host "[INFO] Pegando y ejecutando el código de $archivoPaquetes..." -ForegroundColor Cyan
$contenido | Out-String | Invoke-Expression