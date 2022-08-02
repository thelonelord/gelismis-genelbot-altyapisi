const Discord = require('discord.js');// gerekli yerleri doldurun.
const client = new Discord.Client()
const config = require("./ayarlar.json")
const Shard = new Discord.ShardingManager('./index.js', {// main dosyanız
totalShards: 1,//shard sayısı
token: (config.token)
}); Shard.on('shardCreate', shard => { console.log(`${shard.id+1} IDli Shard Başlatıldı ve Kullanıma Hazır.`)
const webhook = new Discord.WebhookClient("webhookid","webhooktoken") //burayı doldurun
let embed = new Discord.MessageEmbed()
.setDescription(`${shard.id+1}. shard yeniden başlatılıyor..`)
.setColor("RED")
webhook.send(embed)
setTimeout(() => {
const webhook = new Discord.WebhookClient("webhookid","webhooktoken") //burayı doldurun
let embed = new Discord.MessageEmbed()
.setDescription(`${shard.id+1}.shard bağlandı ve kullanıma hazır.`)
.setColor("GREEN")
webhook.send(embed)
}, 9000)
});

setTimeout(() => {
Shard.broadcastEval("process.exit()");
}, 860000);
Shard.spawn();
