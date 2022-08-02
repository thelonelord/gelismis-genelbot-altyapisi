const Discord = require("discord.js");
const { randomRange, verify } = require("../../util/Util");
const { stripIndents } = require("common-tags");
this.games = new Set();
exports.run = async (client, msg, args) => {
  //this.games = new Set();

  this.verifyWin = sides => {
    return (
      (sides[0] === sides[1] && sides[0] === sides[2]) ||
      (sides[0] === sides[3] && sides[0] === sides[6]) ||
      (sides[3] === sides[4] && sides[3] === sides[5]) ||
      (sides[1] === sides[4] && sides[1] === sides[7]) ||
      (sides[6] === sides[7] && sides[6] === sides[8]) ||
      (sides[2] === sides[5] && sides[2] === sides[8]) ||
      (sides[0] === sides[4] && sides[0] === sides[8]) ||
      (sides[2] === sides[4] && sides[2] === sides[6])
    );
  };

 const opponent = msg.mentions.users.first();
  if (!opponent)
    return msg.reply("Oynamak istediğiniz kullanıcıyı etiketleyin.");
  if (opponent.bot) return msg.reply("Botlar ile oyun oynayamazsın.");
  if (opponent.id === msg.author.id)
    return msg.reply("Oynamak istediğiniz kullanıcıyı etiketleyin.");
  if (this.games.has(msg.channel.id))
    return msg.reply("Kanal başına bir oyun oynanabilir.");
  this.games.add(msg.channel.id);
  try {
    await msg.channel.send(`${opponent}, xox oyununu kabul ediyor musun?`);
    const verification = await verify(msg.channel, opponent);
    if (!verification) {
      this.games.delete(msg.channel.id);
      return msg.channel.send("📧 İstek kabul edilmedi.");
    }
    const sides = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const sayi = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣"];
    const taken = [];
    let userTurn = true;
    let winner = null;
    while (!winner && taken.length < 9) {
      const user = userTurn ? msg.author : opponent;
      const sign = userTurn ? "𝗫" : "𝗢";
      await msg.channel.send(stripIndents`
                    ${user}, hangi tarafı almak istersin?
                    \`\`\`
                    ${sayi[0]} | ${sayi[1]} | ${sayi[2]}
                    —————————
                    ${sayi[3]} | ${sayi[4]} | ${sayi[5]}
                    —————————
                    ${sayi[6]} | ${sayi[7]} | ${sayi[8]}
                    \`\`\`
                `);
      const filter = res => {
        const choice = res.content;
        return (
          res.author.id === user.id &&
          sides.includes(choice) &&
          !taken.includes(choice)
        );
      };
      const turn = await msg.channel.awaitMessages(filter, {
        max: 1,
        time: 35000
      });
      if (!turn.size) {
        await msg.channel.reply("Süren doldu");
        userTurn = !userTurn;
        continue;
      }
      const choice = turn.first().content;
      /**/ sayi[Number.parseInt(choice, 10)] = sign;
      taken.push(choice);
      if (this.verifyWin(sayi)) winner = userTurn ? msg.author : opponent;
      userTurn = !userTurn;
    }
    this.games.delete(msg.channel.id);
    return msg.channel.send(
      winner ? `🏆 Tebrikler, ${winner}!` : ":confused: Kimse kazanamadı."
    );
  } catch (err) {
    this.games.delete(msg.channel.id);
    throw err;
  }
};

exports.conf = {
  enabled: false,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "xox",
  description: "xox oyunu",
  usage: "xox oyunu"
};
