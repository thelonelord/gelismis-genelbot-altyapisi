const Discord = require("discord.js");
const ayarlar = require("../../ayarlar.json")

var speedTest = require('speedtest-net');

const osu = require("node-os-utils")

var netstat = osu.netstat
const moment = require("moment");
const os = require("os");
require("moment-duration-format");
exports.run = async (client, message, args) => {
    const notSupported = "The operating system used to host this bot is not supported for this command."

      const full = '█'

      const empty = '░'
    const precision = 20
      const freeRAM = os.freemem()

  const usedRAM = os.totalmem() - freeRAM;

  

  const diagramMaker = (used, free) => {

    const total = used + free;

    used = Math.round((used / total) * precision)

    free = Math.round((free / total) * precision)

    return full.repeat(used) + empty.repeat(free)

  }

  

  let cpuUsage;

  

  const p1 = osu.cpu.usage().then(cpuPercentage => {

    cpuUsage = cpuPercentage;

  })

  

  let processes;

  

  const p2 = osu.proc.totalProcesses().then(process => {

    processes = process;

  })

  

  let driveUsed, driveFree;

  

  const p3 = osu.drive.info().then(i => {

    driveUsed = i.usedPercentage;

    driveFree = i.freePercentage;

  }).catch(() => {

    driveUsed = false;

  })

  

  let networkUsage, networkUsageIn, networkUsageOut;

  

  const p4 = osu.netstat.inOut().then(i => {

    networkUsage = i.total;

    networkUsageIn = networkUsage.inputMb;

    networkUsageOut = networkUsage.outputMb;

  }).catch(() => {

    networkUsage = false;

  })

  

  await Promise.all([p1, p2, p3, p4]);

  

  

netstat.stats()

  .then(ninfo => {

    console.log(ninfo)

  })
    
  const uptime = moment
    .duration(client.uptime)
    .format(" D [gün], H [saat], m [dakika], s [saniye]");
    var test = speedTest({maxTime: 5000});

    test.on('data', data => {
  const istatistikler = new Discord.MessageEmbed()
    .setColor(ayarlar.renk)

    .addField("»**Botun Sahibi**","<@idniz>")
    .addField("» **Gecikme süreleri**","Mesaj Gecikmesi: {ping1} ms \nBot Gecikmesi: {ping2} ms"
        .replace("{ping1}", new Date().getTime() - message.createdTimestamp)
        .replace("{ping2}", client.ws.ping),true)
    .addField(`Used:`,(`RAM: ${diagramMaker(usedRAM, freeRAM)} [${Math.round(100 * usedRAM / (usedRAM + freeRAM))}%]\n`+

    `CPU: ${diagramMaker(cpuUsage, 100-cpuUsage)} [${Math.round(cpuUsage)}%]\n`+

    `HEXX PROCESS: ${(process.memoryUsage().heapUsed / 1000000).toFixed(2)}MB\n`+

    `STORAGE: ${driveUsed ? `${diagramMaker(driveUsed, driveFree)} [${Math.round(driveUsed)}%]` : notSupported}\n`+

    `PROCESSES: ${processes != 'not supported'? processes : notSupported}`).trim())

    

 

.addField(`:arrow_down: İndirme: **${data.speeds.download}**    :arrow_up: Yükleme: **${data.speeds.upload} **`)
    .addField("» **Çalışma süresi**", uptime, true)
    .addField("» **Kullanıcılar**",client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
    .addField("» **Sunucular**", client.guilds.cache.size.toLocaleString(), true)
    .addField("» **Kanallar**", client.channels.cache.size.toLocaleString(), true)
    .addField("» **Discord.js Sürümü**", "v" + Discord.version, true)
    .addField("» **Node.JS sürüm**", `${process.version}`, true)
    .addField("» **CPU**",`\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``,true)
    .addField("» **Bit**", `\`${os.arch()}\``, true)
    .addField("» **İşletim Sistemi**", `\`\`${os.platform()}\`\``, true)
    .addField("**» Bot Davet**"," [Davet Et](https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=8)");
  return message.channel.send(istatistikler);})
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["stats"],
  permLevel: 0
};

exports.help = {
  name: "istatistik",
  description: "Botun istatistiklerini gösterir",
  usage: "istatistik"
};
