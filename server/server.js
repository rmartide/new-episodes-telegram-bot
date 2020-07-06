process.env.NTBA_FIX_319 = 1;

const TelegramBot = require("node-telegram-bot-api");
const schedule = require("node-schedule");
require("dotenv").config();

const botapi = process.env.BOT_API;
const chatid = process.env.CHAT_ID;

const bot = new TelegramBot(botapi, { polling: true });

const rule = new schedule.RecurrenceRule();

rule.hour = new schedule.Range(16, 22);
rule.minute = [0, 15, 30, 45];

schedule.scheduleJob(rule, () => {
	bot.sendMessage(
		chatid,
		`Yo wadup, it should be between 16:00 and 22:00 and a multiple of 15 minutes ${new Date().getHours()}:${new Date().getMinutes()}`
	);
});
