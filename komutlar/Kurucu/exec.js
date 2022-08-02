const exec = require('child_process').exec;
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    if (!args.join(" ")) return message.channel.send("Lütfen komutu boş bırakmayın.")
    exec(`${args.join(' ')}`, (error, stdout) => {
        const response = (error || stdout);
        let embed = new Discord.MessageEmbed()
            .setTitle(`Exec`)
            .addField("Giriş", `\`\`\`asciidoc\n${args.join(" ")}\n\`\`\``)
            .addField("Çıkış", `\`\`\`js\n${response}\n\`\`\``)
            .setColor('RED');

        message.channel.send(embed);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['execute', 'ex'],
    permLevel: 5
};

exports.help = {
    name: "exec"
};