const TelegramBot = require('node-telegram-bot-api');
const axios = require("axios");

const token = '5918776926:AAFcY510Icy_wNBAcdkKBg9qhyYy8wNpZqw';
const newsToken = '15535cf0094c42cb9aa6d1b4c4b375f8'

const bot = new TelegramBot(token, {polling: true});
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



const getNewsTopHeadlines = async (q) => {
    return await axios.get(`https://newsapi.org/v2/top-headlines?country=ru&apiKey=15535cf0094c42cb9aa6d1b4c4b375f8`).then(res => res.data)
}

bot.on('message',  async (msg) => {
    const chatId = msg.chat.id;
    console.log(msg.text)
    try {
        const results = await getNewsTopHeadlines(msg.text)
        results.articles.map((news) => {
            bot.sendMessage(chatId, "" +
                `<b>${news.title}</b> \n ` +
                `\n<code>${news.description ? news.description : ''}</code>` +
                `<a href='${news.url}'>Источник</a> \n ` ,
                {parse_mode : "HTML"});
        })

    } catch  {
        await bot.sendMessage(chatId, 'Ничего не найдено');
    }

});
