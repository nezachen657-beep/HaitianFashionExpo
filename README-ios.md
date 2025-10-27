# Construir para iOS (desde Windows usando Expo EAS)

Este documento explica cómo generar una build iOS (.ipa) para el proyecto `HaitianFashionExpo` sin necesidad de un Mac, usando Expo EAS Build (servicio en la nube).

Requisitos previos
- Cuenta de Expo (https://expo.dev) con acceso a EAS (la cuenta gratuita permite builds, pero revisa límites y plan si es necesario).
- Cuenta de Apple Developer (obligatoria para subir a App Store o instalar en dispositivos físicos fuera de TestFlight).
- En tu máquina Windows: Node.js y npm instalados.

Pasos rápidos (local, desde tu máquina Windows)
1. Instalar EAS CLI (global o usar npx):

```powershell
npm install -g eas-cli
# o usando npx: npx eas-cli --version
```

2. Inicia sesión en Expo/EAS:

```powershell
eas login
# o con token: setx EAS_TOKEN "<tu_token>"  # (opcional, para CI)
```

3. Verifica `app.json`:
- Ya existe `ios.bundleIdentifier` en `app.json` (ej: `com.haitianfashion.app`). Si deseas cambiarlo, edítalo antes de build.

4. Ejecutar build iOS (EAS cloud):

```powershell
cd "c:\Users\15457\AndroidStudioProjects\shengdong_android\HaitianFashionExpo"
eas build -p ios --profile production --non-interactive
# o desde npm script
npm run eas:build:ios
```

5. Gestionar credenciales:
- EAS te preguntará si quieres que gestione certificados/provisioning profiles automáticamente. Selecciona "Let EAS handle the credentials" para simplificar (recomendado si no tienes experiencia con certificados iOS).

6. Descargar el artefacto:
- Al terminar, EAS te dará una URL para descargar el .ipa o instalar en TestFlight.

Opcional — Automatizar en CI (GitHub Actions)
- Si prefieres no ejecutar builds manuales, puedes usar la acción que incluí en `.github/workflows/eas-build-ios.yml`. Para usarla necesitas crear el secreto `EAS_TOKEN` en GitHub (Settings → Secrets) con un token EAS generado por `eas token:create` o usando tu login.

Notas importantes
- Publicar en App Store requiere una cuenta Apple Developer y (si lo deseas) acceso a App Store Connect para pruebas con TestFlight.
- Las builds de iOS no pueden ejecutarse localmente en Windows: EAS Build hace el trabajo en la nube.
- Si tienes integraciones nativas que no están soportadas por Expo Managed workflow, puede que necesites ejecutar `expo prebuild` (o usar Bare workflow) y ajustar native code; actualmente el proyecto usa dependencias compatibles con Expo listadas en `app.json`.

Si quieres, puedo:
- Añadir más perfiles en `eas.json` (por ejemplo, `staging`) con configuraciones específicas.
- Crear un workflow de GitHub Actions (lo añadí en el repo) para automatizar builds on push.
- Guiarte paso a paso para generar el `EAS_TOKEN` y configurar secretos en GitHub.

Dime si quieres que proceda con la automatización completa (añadir workflow — ya incluida) y que cree instrucciones para generar el token y conectar la cuenta Apple.
