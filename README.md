# Aplicación Full-Stack: Dashboard Analítico y Pasarela de Pagos

Este proyecto es una solución Full-Stack desarrollada con React, Express y TypeScript. Incluye un sistema de autenticación persistente, un dashboard de análisis de datos y la simulación de una pasarela de pagos (SnailPay).

## Requisitos Previos
- Node.js (v18 o superior recomendado)
- npm (Node Package Manager)

## 1. Instrucciones de Ejecución Local

El proyecto está dividido en dos directorios principales: `frontend` y `backend`. Debes ejecutar ambos servidores simultáneamente en terminales separadas.

### Backend (API Express)
1. Abre una terminal y navega al directorio del servidor:
   ```bash
   cd backend

2. Instala las dependencias:
   npm install

3. Inicia el servidor en modo desarrollo:
   npm run dev
    El servidor se ejecutará en http://localhost:3001
   
### Frontend (React + Vite)
1. Abre una nueva terminal y navega al directorio del cliente:
   cd frontend

2. Instala las dependencias:
   npm install

3. Inicia la aplicación:
   npm run dev
   La aplicación estará disponible en http://localhost:5173

## 2. Instrucciones para Ejecutar las Pruebas
Se ha implementado una suite de pruebas unitarias automatizadas utilizando Vitest y jsdom para evaluar la lógica de negocio y la persistencia de datos.

Para ejecutarlas, abre una terminal en el directorio frontend y corre el siguiente comando:
    npm test
    Se mostrará el reporte en consola validando el registro, inicio de sesión, bloqueo de duplicados y actualización matemática del saldo.

## 3. Guía de Simulación de la Pasarela de Pagos (SnailPay)
El sistema incluye una pasarela simulada que procesa recargas de saldo. Para probar los distintos escenarios y respuestas de la API, utiliza los siguientes datos en el formulario de recarga:
    
1. Escenario 1: Cobro Exitoso
   Para aprobar la transacción y aumentar el saldo, introduce exactamente los siguientes datos:

   Número de tarjeta: 1234123412341234

   Fecha de vencimiento: 12/26

   CVV: 543

   Nombre: (Cualquier valor de texto no vacío)

   Monto: (Cualquier cantidad numérica mayor a 0, excepto 9999)

2. Escenario 2: Error del Sistema
   Para simular una caída o error interno de los servidores de SnailPay (Status 500):

   Monto de recarga: Escribe exactamente $9999.

   Resto de los datos: Puedes ingresar cualquier información en la tarjeta. La transacción será bloqueada y no se modificará el saldo.

3. Escenario 3: Error de Transacción
   Para simular una tarjeta rechazada o datos inválidos (Status 400):

   Ingresa cualquier número de tarjeta, CVV o fecha que no coincida con los datos estrictos del Escenario 1. El sistema devolverá un detalle de rechazo y el saldo se mantendrá intacto.