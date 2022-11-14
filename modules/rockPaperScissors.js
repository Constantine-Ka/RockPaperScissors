// Подключения
const Discord 	= require('discord.js');
const fs		= require('fs')
const rpsTolal	= require('./rps.json')
const jimp 		= require('jimp');


//-----------------------------------------//
// Начальные переменные
var randomColor     	= '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6); // generate random hex color
var answer          	= "Выберите действие";
let anserDescription	= `просто кликните на значек ниже.`
let result          	= [0,0]
let wordArr				= ['Камень', 'Ножницы', 'Бумага']
let symbolArr			= ['794933561739706408', '794933561337184277','794933561685835806', '794954406747439135']
let pictureArr			= ["./img/stone.png", "./img/scissors.png", "./img/paper.png", "./img/reset.png"]
//-----------------------------------------//
// Процессы
async function main(client, message,result){		//Процесс отправки сообщения
	result = (!result)?[0,0]:result

	var randomColor = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6); // generate random hex color
	const embed = new Discord.MessageEmbed() 	//Собираем сообщение
		.setColor(randomColor)					//Указываем случайный цвет левой вертикальной полоски
		.setTitle('Камень, ножницы, бумага')	//Заголовок, описание и картинка
		.setDescription('Вы под этим сообщением выбираете предмет, бот в ответ выдаёт такой же случайный предмет, победител насчисляется один бал.')
		.setThumbnail('https://avatars.mds.yandex.net/get-dialogs/758954/2fa17e69fbe35a68007f/orig')
		.addFields(								//Небольшими колонками я хочу показать счет игр после сбрасывания счета
			{ name: result[0], value: 'Вы' , inline: true },
			{ name: result[1], value: 'Бот', inline: true }
		)
		.addField(answer, anserDescription, false)	//Результат последней игры, и кто что выбрал.
	const newMess= await message.channel.send(embed)//отправляю сформированное выше сообщение
								//Добавляю реакциями эмодзи, чтобы пользователю не приходилось самому их искать
	client.channels.cache.get(message.channel.id).messages.cache.get(newMess.id).react(client.emojis.cache.get(symbolArr[0]));
	client.channels.cache.get(message.channel.id).messages.cache.get(newMess.id).react(client.emojis.cache.get(symbolArr[1]));
	client.channels.cache.get(message.channel.id).messages.cache.get(newMess.id).react(client.emojis.cache.get(symbolArr[2]));
	client.channels.cache.get(message.channel.id).messages.cache.get(newMess.id).react(client.emojis.cache.get(symbolArr[3]));
	id = message.channel.id
	


}
const rand = ()=>{return Math.floor(Math.random()*3)};	//Генерирую случайное число от нуля до двух
function useBot(client, react){
	var random = rand()
	random=random++
	(random==3)?random=0:random
	const startM = (react.message.embeds.length==1)?main:canv
	if(symbolArr.indexOf(react._emoji.id)==-1){		//Если реакция не из требуемых
		console.log("лишняя реакция");
		return
	}else if(react._emoji.id == symbolArr[3]){		//Если нажали на сброс
		result          = [0,0]						//Обнуляем переменные
		answer = "Счет сброшен";
		anserDescription=`просто кликните на значек ниже.`
		console.log(answer);
		saveTotal(react.message.channel.id, result)
		startM(client, react.message)					//вызываем процесс, для отправки сообщения
	}else{											//Главная обработка
		resultShort = react._emoji.name[1]+client.emojis.cache.get(symbolArr[random]).name[1];	//Получаем имя выбранных эмодзи 
		// console.log("🚀 ~ file: rockPaperScissors.js ~ line 58 ~ useBot ~ resultShort", resultShort)
																								//пользователем и ботом, 
																								//берем значение второго символа, 
																								//соединяем
		anserDescription = `Вы выбрали **${wordArr[symbolArr.indexOf(react._emoji.id)]}**. Бот выбрал **${wordArr[random]}**` //Указываем в описании, что они выбрали
		// youSymbol =((wordArr[symbolArr.indexOf(react._emoji.id)])*2)-1
		// botSymbol = (wordArr[random])-1
		anserArrSymbol= [pictureArr[symbolArr.indexOf(react._emoji.id)],(pictureArr[random])]
        // console.log("🚀 ~ file: rockPaperScissors.js ~ line 66 ~ useBot ~ anserArrSymbol", anserArrSymbol)
		var mapIter = react.users.cache.entries()
		mapIter.next().value
		// console.log("🚀 ~ file: rockPaperScissors.js ~ line 75 ~ useBot ~ 		react.users.cache.entries().next().value",mapIter.next().value[1].username)
		username = mapIter.next().value[1].username
		winner(resultShort, username);		//Вызываем switch-процесс, для получения переменных в зависимости от совпадения вариантов.
		result = (!rpsTolal.channel[react.message.channel.id])?[0,0]:rpsTolal.channel[react.message.channel.id]
		result[0]=result[0]+winArr[0];				//Плюсуем 0 или 1 к старому результату
		result[1]=result[1]+winArr[1]
		saveTotal(react.message.channel.id, result)
		startM(client, react.message, result)
		// canv(client, react.message, result)
		// main(client, react.message, result)					//Вызываем тотже процесс, но уже с новыми (не нулевыми) результатами.
	}
		
}
function winner(r, author){
	winArr = [];
	answer = ""
	switch (r) {
		case "tt":
		case "cc":
		case "aa":
			winArr=[0,0]
			answer = "Ничья"
			break;
		case "tc":
		case "ca":
		case "at":
			winArr=[1,0]
			answer = "Побеждает "+author
			break;
		case "ct":
		case "ac":
		case "ta":
			winArr=[0,1]
			answer = "Побеждает Компьютер"
			break;
		default:
			break;
	}
}
function saveTotal(id, result){
	if(!rpsTolal.channel[id]){
		result = [0,0]
		rpsTolal.channel[id]=[0,0]
		fs.writeFile("rps.json",JSON.stringify(rpsTolal),function(err){ 
			if(err) console.log(err)
		})
	}else{
		rpsTolal.channel[id] =result
		fs.writeFile("rps.json",JSON.stringify(rpsTolal),function(err){ 
			if(err) console.log(err)
		})
	}

}

async function canv(client, message, result) {
	const font25 = await jimp.loadFont('./modules/fonts/font25/font.fnt'); 
	const font20 = await jimp.loadFont('./modules/fonts/font20/font20.fnt');
	const font15 = await jimp.loadFont('./modules/fonts/font15/font15.fnt'); 
	const font42 = await jimp.loadFont('./modules/fonts/font42/font.fnt');
	if(!result){
		// console.log(1);
		result = [0,0]; 
		anserDescription = "Просто кликните на значек ниже.\r Камень, ножницы или бумага."
		const bg0 = await jimp.read(`./img/alert-background.jpg`) 
		// const font25 = await jimp.loadFont('./modules/fonts/font25/font.fnt'); 
		// const font20 = await jimp.loadFont('./modules/fonts/font20/font20.fnt');
		// const font15 = await jimp.loadFont('./modules/fonts/font15/font15.fnt'); 
		// const font42 = await jimp.loadFont('./modules/fonts/font42/font.fnt'); 

		bg0.print(font25,275,170,{text: answer});
		bg0.print(font20,165,203,{text: "Просто кликните на значек ниже. Камень, ножницы "});
		bg0.print(font20,220,226,{text: "или бумага. Как только бот получит ответ, "});
		bg0.print(font20,135,249,{text: "Бот выберет свой вариант и выдаст новое сообщение"});
		bg0.print(font20,255,272,{text: "с результатом игры на этом канале."});
		bg0.print(font15,180,310,{text: "(Это просто игра. Никакой подкрутки нет, т.к. просто незачем))))"});
		// bg.print(font42,200,365,{text: String(result[0])});
		// bg.print(font42,565,365,{text: String(result[1])});  
		bg0.write(`result.jpg`);
		// bg0.getBuffer(jimp.AUTO , cb=>console.log(cb))
		// console.log(bg);
		// result = bg0.getBuffer(jimp.AUTO , cb=>console.log(cb))

	}else{
		const bg = await jimp.read(`./img/total-background.jpg`)
		const youSym= await jimp.read(anserArrSymbol[0])
		const botSym= await jimp.read(anserArrSymbol[1])
		bg.composite(youSym,195, 230)
		bg.composite(botSym,555, 230)
		// answer = "Побеждает Компьютер"//Незабыть убрать
		bg.print(font25,275,160,{text: answer});
		
		bg.print(font42,200,365,{text: String(result[0])});
		bg.print(font42,565,365,{text: String(result[1])});
		bg.write(`result.jpg`);  
		result = bg.getBuffer(jimp.AUTO , cb=>console.log(cb))
	}
	message.channel.send({
		files: [{
		  attachment: 'result.jpg',
		  name: 'result.jpg'
		}]
	}).then(m=>{
		m.react(client.emojis.cache.get(symbolArr[0]));
		m.react(client.emojis.cache.get(symbolArr[1]));
		m.react(client.emojis.cache.get(symbolArr[2]));
		m.react(client.emojis.cache.get(symbolArr[3]));
	})
}
// await canv();
//----------------------------------------//
// Экспорты
module.exports.main 	= main
module.exports.useBot 	= useBot
module.exports.canv 	= canv


//----------------------------------------//
