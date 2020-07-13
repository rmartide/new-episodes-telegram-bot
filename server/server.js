process.env.NTBA_FIX_319 = 1;
require("./mongoose/connect");
const TelegramBot = require("node-telegram-bot-api");
const schedule = require("node-schedule");
require("dotenv").config();
const { scrape } = require("../service/scrap");

const botapi = process.env.BOT_API;
const chatid = process.env.CHAT_ID;
const url = process.env.URL;

const bot = new TelegramBot(botapi, { polling: true });

const rule = new schedule.RecurrenceRule();

const opts = {
	parse_mode: "Markdown"
};

rule.hour = new schedule.Range(16, 22);
rule.minute = [0, 15, 30, 45];

const Episode = require("./models/Episode");

schedule.scheduleJob(rule, () => {
	scrape().then(({ data: { episodes } }) => {
		episodes.forEach((episode) => {
			Episode.alreadyExists(episode).then((exists) => {
				if (!exists) {
					Episode.add(episode);
					bot.sendMessage(
						chatid,
						`*Nuevo episodio:*[ ](${url}${episode.image})
						[${episode.title} ${episode.number}](${url}${episode.url})`,
						opts
					);
				}
			});
		});
	});
});
