# Castaway Interactive (WebApp + Telegram Bot)

Repositorio con:
- **webapp/**: React (Vite) que muestra la escena animada (nubes, sol según hora, hojas meciéndose, agua).
- **bot/**: Bot de Telegram (Node.js + telegraf) que abre la Web App como Telegram Web App.

## Cómo probar localmente

### Web App
1. `cd webapp`
2. `npm install`
3. `npm run dev`
4. Abrir la URL que Vite muestre (por defecto `http://localhost:5173`).

### Bot (pruebas)
1. `cd bot`
2. `npm install`
3. Exporta variables:
   - `export BOT_TOKEN="TU_BOT_TOKEN"`
   - `export WEBAPP_URL="http://localhost:5173"` (para pruebas locales)
4. `npm start`
5. En Telegram, abre tu bot y usa `/start` o `/jugar`.

> Para probar la Web App dentro de Telegram en el móvil necesitas una URL pública HTTPS. Usa `ngrok`:
> `ngrok http 5173` y pon la URL `https://xxxx.ngrok.io` en `WEBAPP_URL`.

## Despliegue en Render

### 1) Web App (Static Site)
- En Render crea un **Static Site**.
- Conecta tu repo y en **Build Command** pon: `npm install && npm run build`
- **Publish Directory**: `webapp/dist`
- Deploy; Render te dará una URL pública HTTPS (ej: `https://castaway-webapp.onrender.com`).

### 2) Bot (Web Service)
- En Render crea un **Web Service** (Node).
- Conecta tu repo y en **Build Command**: `cd bot && npm install`
- **Start Command**: `cd bot && npm start`
- Añade variable de entorno `BOT_TOKEN` con el token de @BotFather.
- Añade variable `WEBAPP_URL` con la URL pública de la Web App (la que te dio Render).
- Deploy.

## Notas
- El bot usa polling (fácil de desplegar). Para producción puedes cambiar a webhooks si prefieres.
- Si quieres que la Web App envíe datos al bot, usa `window.Telegram.WebApp.sendData(...)` desde la Web App y procesa `web_app_data` en el bot.
