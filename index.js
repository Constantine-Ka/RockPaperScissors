// Подключения
const Discord   = require('discord.js');
const client    = new Discord.Client();
const token 	= require('./config.json').token
const rPS		= require('./modules/rockPaperScissors')
const rpsTolal 	= require('./rps.json')

//-------------------------------------------------------------------
//События дискорд бота
// //Действие при запуске
client.on('ready', () => {			
	console.log(`Бот для чат-игр запущен ${client.user.tag}!`);
	
});
// //----------------------------------------------------------------
// //Действия при получении реакции
client.on('messageReactionAdd', (react, user)=>{
	var messID = (rPS.id)?rPS.id:null
	if((react.count ==2)&&(messID = react.message.id )) {	//Если один, кроме бота откликнулся на последнее сообщение, то
		rPS.useBot(client,react)
		react.message.delete()
	}
	else{return}
})
//	//---------------------------------------------------------------
//	//Действия при получении сообщения
client.on('message', async message => {
  if (message.content === 'ping') {
	message.reply('Pong!');
  }
  if (message.content === 'k') {			//Первый запуск процесса
	await rPS.main(client, message)
	// await rPS.canv(client, message)
  }
  if (message.content === 'c') {			//Первый запуск процесса
	rPS.canv(client, message, false)
  }
});
//	//-----------------------------------------------------
client.login(token);	//	//Авторизация
//-------------------------------------------------------------------