const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const token = process.env.BOT_API;
const chatid = process.env.CHAT_ID;
const bot = new TelegramBot(token, {polling: true});

bot.sendMessage(chatid, "Yo wadup");