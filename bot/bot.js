const express = require("express");
const { Telegraf } = require("telegraf");

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL || "https://example.com/castaway";

if (!BOT_TOKEN) {
  console.error("Por favor configura BOT_TOKEN en las variables de entorno.");
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

// /start
bot.start((ctx) => {
  return ctx.reply("Bienvenido. Pulsa el botón para abrir la isla interactiva.", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Abrir isla interactiva",
            web_app: { url: WEBAPP_URL }
          }
        ]
      ]
    }
  });
});

bot.command("jugar", (ctx) => {
  ctx.reply("Abrir escena interactiva", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Abrir isla interactiva",
            web_app: { url: WEBAPP_URL }
          }
        ]
      ]
    }
  });
});

// Recibir datos desde WebApp (opcional)
bot.on("message", (ctx) => {
  if (ctx.message && ctx.message.web_app_data) {
    const data = ctx.message.web_app_data.data;
    console.log("Datos recibidos desde WebApp:", data);
    ctx.reply("Datos recibidos. Gracias!");
  }
});

bot.launch().then(() => console.log("Bot lanzado con polling"));

const app = express();
app.get("/", (req, res) => res.send("Bot running"));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
