process.env.NTBA_FIX_319 = 1;
require("dotenv").config();
require("./mongoose/connect");
const TelegramBot = require("node-telegram-bot-api");
const schedule = require("node-schedule");
const { scrape } = require("../service/scrap");
const url = process.env.URL;

const botapi = process.env.BOT_API;

const bot = new TelegramBot(botapi, { polling: true });

const rule = new schedule.RecurrenceRule();

const opts = {
	parse_mode: "Markdown"
};

rule.hour = new schedule.Range(14, 0);
rule.minute = [0, 15, 30, 45];

const Episode = require("./models/Episode");
const User = require("./models/User");

bot.onText(/\/help/, (msg) => {
	bot.sendMessage(
		msg.chat.id,
		`*Opciones: (Pulse en la opción deseada) *
		- /subscribe
		- /unsubscribe
		`,
		opts
	);
});

bot.onText(/\/subscribe/, async ({ chat: { id } }) => {
	const exists = await User.alreadyExists(id);
	if (exists) {
		bot.sendMessage(id, `*Ansias!* Ya estabas suscrito.`, opts);
		bot.sendPhoto(id, "https://i.imgbox.com/55ByXaNZ.png");
	} else {
		User.add(id);
		await bot.sendMessage(
			id,
			`*Enhorabuena, tienes el COVID-19...*
				Ejem! Mensaje equivocado, mi no saber español.
				Bienvenido al club de los cinco.
				コメディクラブへようこそ.
				Herzlich Wilkommen bei uns.
				Espanya ens roba.
				`,
			opts
		);
		bot.sendPhoto(
			id,
			"https://i.pinimg.com/236x/a0/13/03/a01303eea1a355b356de96265508cab6--tsundere-kawaii-stuff.jpg"
		);
	}
});

bot.onText(/\/unsubscribe/, async ({ chat: { id } }) => {
	await User.remove({ chat_id: id });
	await bot.sendMessage(id, '*F*', opts);
	bot.sendPhoto(id , 'https://i.imgur.com/ofipUKr.jpg');

});

schedule.scheduleJob(rule, async () => {
	const { data: { episodes } } = await scrape();
	const users = await User.getAll();

	episodes.reverse().forEach(async (episode) => {
		const exists = await Episode.alreadyExists(episode);
		if (!exists) {
			Episode.add(episode);
			users.forEach(({chat_id}) => {
				bot.sendMessage(
					chat_id,
					`*Nuevo episodio:*[ ](${url}${episode.image})
					[${episode.title} ${episode.number}](${url}${episode.url})`,
					opts
				);
			})
		}
	});
});
