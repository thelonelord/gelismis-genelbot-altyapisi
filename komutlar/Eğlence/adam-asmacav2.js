const { stripIndents } = require('common-tags');
let oyndurum = new Set();

const a = require("../../ayarlar.json")
const random = require("../../jsonlar/kategoriler.json")
exports.run = async (bot, message, args) => {
    const discord = require("discord.js");
const Discord = require("discord.js")
    
 const msg = message;
  const db = require("quick.db");
  var en = require("../../language/english");
  var tr = require("../../language/turkish");
  var de = require("../../language/deutch");

  var dil = db.fetch(`language_${msg.guild.id}`);

  if (dil == "en") {
    var lang = en;
  }
    
     if (dil == "de") {
    var lang = en;
  }
    
  if (!dil) {
    var lang = tr;
  }

if(!args[0]) return message.channel.send(
    new discord.MessageEmbed()
                                        .setColor(a.renk)
                                         .setDescription(`Bir kategori girmelisin. Örnek isim/bitki/hayvan/şehir`)
                                        )
let arg = ['isim', 'bitki', 'hayvan', 'şehir' ]
if(!arg.includes(args[0])) return message.channel.send(new discord.MessageEmbed()
                                        .setColor(a.renk)
                                         .setDescription(`Bir kategori girmelisin. Örnek isim/bitki/hayvan/şehir`))
  
if(args[0] === 'isim') {
  let isimkelime = random.isim

 
        if (oyndurum.has(message.channel.id)) return message.reply('Kanal başına sadece bir adam asmaca oyunu meydana gelebilir.');

        try {
            const cevap = isimkelime[Math.floor(Math.random() * isimkelime.length)].toLowerCase();
            let point = 0;
            let displayText = null;
            let tahmin = false;
            const confirmation = [];
            const yanlış = [];
            const display = new Array(cevap.length).fill('_');
            while (cevap.length !== confirmation.length && point < 6) {
                await message.channel.send(
                new Discord.MessageEmbed().setColor(a.renk)
       .setTitle(`:levitate: ${lang.dil.adam}`)
        .setDescription(`${
displayText === null
? `**${lang.dil.iyi}**`
: `**${lang.dil.daat}**`}
**${lang.dil.kelime}**:    \`${display.join(" ")}\`
**${lang.dil.yanlisharf}** ${yanlış.join(", ") ||
`${lang.dil.yokk}`}
\`\`\`
╔═════╗
║     ${point > 0 ? "😵" : ""}
║    ${point > 2 ? "┌" : " "}${point > 1 ? "()" : ""}${point > 3 ? "┐" : ""}
║     ${point > 4 ? "/" : ""} ${point > 5 ? "\\" : ""}
║
║
\`\`\``));
                const filter = res => {
                    const choice = res.content.toLowerCase();
                    return res.author.id === message.author.id && !confirmation.includes(choice) && !yanlış.includes(choice);
                };
                const guess = await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 300000
                });
                if (!guess.size) {
                    await message.channel.send('Zamanın doldu!');
                    break;
                }
                const choice = guess.first().content.toLowerCase();
                if (choice === 'end') break;
                if (choice.length > 1 && choice === cevap) {
                    tahmin = true;
                    break;
                } else if (cevap.includes(choice)) {
                    displayText = true;
                    for (let i = 0; i < cevap.length; i++) {
                        if (cevap.charAt(i) !== choice) continue;
                        confirmation.push(cevap.charAt(i));
                        display[i] = cevap.charAt(i);
                    }
                } else {
                    displayText = false;
                    if (choice.length === 1) yanlış.push(choice);
                    point++;
                }
            }
            oyndurum.delete(message.channel.id);
            if (cevap.length === confirmation.length || tahmin) return message.channel.send(new discord.MessageEmbed()
                                        .setColor(a.renk)
                                         .setDescription(`:trophy: Tebrikler kelimeyi buldun! **${cevap}**`)
                                                                                           );
            return message.channel.send(new discord.MessageEmbed()
                                        .setColor(a.renk)
                                         .setDescription(`:confused: Maalesef bilemedin kelime buydu, **${cevap}**`));
        } catch (err) {
            oyndurum.delete(message.channel.id);
            return message.reply(`Olamaz! Bir Hata Verdi: \`${err.message}\``);
        }
 }  
if(args[0] === 'bitki') {
  let bitkikelime = random.bitki

 
        if (oyndurum.has(message.channel.id)) return message.reply('Kanal başına sadece bir adam asmaca oyunu meydana gelebilir.');

        try {
            const cevap = bitkikelime[Math.floor(Math.random() * bitkikelime.length)].toLowerCase();
            let point = 0;
            let displayText = null;
            let tahmin = false;
            const confirmation = [];
            const yanlış = [];
            const display = new Array(cevap.length).fill('_');
            while (cevap.length !== confirmation.length && point < 6) {
                await message.channel.send(new Discord.MessageEmbed().setColor(a.renk)
       .setTitle(`:levitate: ${lang.dil.adam}`)
        .setDescription(`${
displayText === null
? `**${lang.dil.iyi}**`
: `**${lang.dil.daat}**`}
**${lang.dil.kelime}**:    \`${display.join(" ")}\`
**${lang.dil.yanlisharf}** ${yanlış.join(", ") ||
`${lang.dil.yokk}`}
\`\`\`
╔═════╗
║     ${point > 0 ? "😵" : ""}
║    ${point > 2 ? "┌" : " "}${point > 1 ? "()" : ""}${point > 3 ? "┐" : ""}
║     ${point > 4 ? "/" : ""} ${point > 5 ? "\\" : ""}
║
║
\`\`\``));
                const filter = res => {
                    const choice = res.content.toLowerCase();
                    return res.author.id === message.author.id && !confirmation.includes(choice) && !yanlış.includes(choice);
                };
                const guess = await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 300000
                });
                if (!guess.size) {
                    await message.channel.send('Zamanın doldu!');
                    break;
                }
                const choice = guess.first().content.toLowerCase();
                if (choice === 'end') break;
                if (choice.length > 1 && choice === cevap) {
                    tahmin = true;
                    break;
                } else if (cevap.includes(choice)) {
                    displayText = true;
                    for (let i = 0; i < cevap.length; i++) {
                        if (cevap.charAt(i) !== choice) continue;
                        confirmation.push(cevap.charAt(i));
                        display[i] = cevap.charAt(i);
                    }
                } else {
                    displayText = false;
                    if (choice.length === 1) yanlış.push(choice);
                    point++;
                }
            }
            oyndurum.delete(message.channel.id);
            if (cevap.length === confirmation.length || tahmin) return message.channel.send(new discord.MessageEmbed()
                                        .setColor(a.renk)
                                         .setDescription(`:trophy: Tebrikler kelimeyi buldun! **${cevap}**`));
            return message.channel.send(new discord.MessageEmbed()
                                        .setColor(a.renk)
                                         .setDescription(`:confused: Maalesef bilemedin kelime buydu, **${cevap}**`));
        } catch (err) {
            oyndurum.delete(message.channel.id);
            return message.reply(`Olamaz! Bir Hata Verdi: \`${err.message}\``);
        }
 } 
if(args[0] === 'hayvan') {
  let hayvankelime = random.hayvan

 
        if (oyndurum.has(message.channel.id)) return message.reply('Kanal başına sadece bir adam asmaca oyunu meydana gelebilir.');

        try {
            const cevap = hayvankelime[Math.floor(Math.random() * hayvankelime.length)].toLowerCase();
            let point = 0;
            let displayText = null;
            let tahmin = false;
            const confirmation = [];
            const yanlış = [];
            const display = new Array(cevap.length).fill('_');
            while (cevap.length !== confirmation.length && point < 6) {
                await message.channel.send(new Discord.MessageEmbed().setColor(a.renk)
       .setTitle(`:levitate: ${lang.dil.adam}`)
        .setDescription(`${
displayText === null
? `**${lang.dil.iyi}**`
: `**${lang.dil.daat}**`}
**${lang.dil.kelime}**:    \`${display.join(" ")}\`
**${lang.dil.yanlisharf}** ${yanlış.join(", ") ||
`${lang.dil.yokk}`}
\`\`\`
╔═════╗
║     ${point > 0 ? "😵" : ""}
║    ${point > 2 ? "┌" : " "}${point > 1 ? "()" : ""}${point > 3 ? "┐" : ""}
║     ${point > 4 ? "/" : ""} ${point > 5 ? "\\" : ""}
║
║
\`\`\``));
                const filter = res => {
                    const choice = res.content.toLowerCase();
                    return res.author.id === message.author.id && !confirmation.includes(choice) && !yanlış.includes(choice);
                };
                const guess = await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 300000
                });
                if (!guess.size) {
                    await message.channel.send('Zamanın doldu!');
                    break;
                }
                const choice = guess.first().content.toLowerCase();
                if (choice === 'end') break;
                if (choice.length > 1 && choice === cevap) {
                    tahmin = true;
                    break;
                } else if (cevap.includes(choice)) {
                    displayText = true;
                    for (let i = 0; i < cevap.length; i++) {
                        if (cevap.charAt(i) !== choice) continue;
                        confirmation.push(cevap.charAt(i));
                        display[i] = cevap.charAt(i);
                    }
                } else {
                    displayText = false;
                    if (choice.length === 1) yanlış.push(choice);
                    point++;
                }
            }
            oyndurum.delete(message.channel.id);
            if (cevap.length === confirmation.length || tahmin) return message.channel.send(new discord.MessageEmbed()
                                        .setColor(a.renk)
                                         .setDescription(`:trophy: Tebrikler kelimeyi buldun! **${cevap}**`));
            return message.channel.send(new discord.MessageEmbed()
                                        .setColor(a.renk)
                                         .setDescription(`:confused: Maalesef bilemedin kelime buydu, **${cevap}**`));
        } catch (err) {
            oyndurum.delete(message.channel.id);
            return message.reply(`Olamaz! Bir Hata Verdi: \`${err.message}\``);
        }
 }      
  if(args[0] === 'şehir') {
  let şehirkelime = random.şehir

 
        if (oyndurum.has(message.channel.id)) return message.reply('Kanal başına sadece bir adam asmaca oyunu meydana gelebilir.');

        try {
            const cevap = şehirkelime[Math.floor(Math.random() * şehirkelime.length)].toLowerCase();
            let point = 0;
            let displayText = null;
            let tahmin = false;
            const confirmation = [];
            const yanlış = [];
            const display = new Array(cevap.length).fill('_');
            while (cevap.length !== confirmation.length && point < 6) {
                await message.channel.send(new Discord.MessageEmbed().setColor(a.renk)
       .setTitle(`:levitate: ${lang.dil.adam}`)
        .setDescription(`${
displayText === null
? `**${lang.dil.iyi}**`
: `**${lang.dil.daat}**`}
**${lang.dil.kelime}**:    \`${display.join(" ")}\`
**${lang.dil.yanlisharf}** ${yanlış.join(", ") ||
`${lang.dil.yokk}`}
\`\`\`
╔═════╗
║     ${point > 0 ? "😵" : ""}
║    ${point > 2 ? "┌" : " "}${point > 1 ? "()" : ""}${point > 3 ? "┐" : ""}
║     ${point > 4 ? "/" : ""} ${point > 5 ? "\\" : ""}
║
║
\`\`\``));
                const filter = res => {
                    const choice = res.content.toLowerCase();
                    return res.author.id === message.author.id && !confirmation.includes(choice) && !yanlış.includes(choice);
                };
                const guess = await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 300000
                });
                if (!guess.size) {
                    await message.channel.send('Zamanın doldu!');
                    break;
                }
                const choice = guess.first().content.toLowerCase();
                if (choice === 'end') break;
                if (choice.length > 1 && choice === cevap) {
                    tahmin = true;
                    break;
                } else if (cevap.includes(choice)) {
                    displayText = true;
                    for (let i = 0; i < cevap.length; i++) {
                        if (cevap.charAt(i) !== choice) continue;
                        confirmation.push(cevap.charAt(i));
                        display[i] = cevap.charAt(i);
                    }
                } else {
                    displayText = false;
                    if (choice.length === 1) yanlış.push(choice);
                    point++;
                }
            }
            oyndurum.delete(message.channel.id);
            if (cevap.length === confirmation.length || tahmin) return message.channel.send(new discord.MessageEmbed()
                                        .setColor(a.renk)
                                         .setDescription(`:trophy: Tebrikler kelimeyi buldun! **${cevap}**`));
            return message.channel.send(new discord.MessageEmbed()
                                        .setColor(a.renk)
                                         .setDescription(`:confused: Maalesef bilemedin kelime buydu, **${cevap}**`));
        } catch (err) {
            oyndurum.delete(message.channel.id);
            return message.reply(`Olamaz! Bir Hata Verdi: \`${err.message}\``);
        }
 }    
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['adamasmacav2'],
  permlevel: 0
};

exports.help = {
  name: 'adamasmaca-v2',
  description: 'Adam asmaca oynarsınız.',
  usage: 'adamasmaca <kategori>'
};