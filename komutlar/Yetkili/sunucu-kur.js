const Discord = require('discord.js');
const db = require('quick.db');
const {stripIndents} = require('common-tags');

exports.run = async (client, message, args) => {
  var p24 = client.ws.ping
  try {
	const embed = new Discord.MessageEmbed()
	.setColor('RANDOM')
	.setDescription('Sunucunuzdaki kanallarÄ±n, kategorilerin ve rollerin hepsinin silinip botun yeni bir sunucu kurmasÄ±nÄ± onaylÄ±yor musunuz?')
	.setFooter('10 saniye iÃ§inde "evet" yazarsanÄ±z onaylamÄ±ÅŸ olursunuz. 10 saniye iÃ§inde yazmazsanÄ±z iÅŸlem iptal edilir')
	message.channel.send({embed: embed})
	 message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.guild.channels.cache.forEach((kanal) => {
          	kanal.delete()
          })
           setTimeout(() => {
          message.guild.roles.cache.forEach((rol) => {
          	rol.delete()
          })
      }, 5000)
     
     const embedd = new Discord.MessageEmbed()
	.setColor('RANDOM')
	.setDescription('Sunucunuzdaki kanallarÄ±n, kategorilerin ve rollerin hepsinin silinip botun yeni bir sunucu kurmasÄ±nÄ± onayladÄ±nÄ±z! Sunucu kuruluyor bu iÅŸlem biraz zaman alabilir.')
	message.author.send({embed: embedd})

    let every = message.guild.roles.cache.find(r => r.name === '@everyone')

    //Kategoriler
    message.guild.channels.create('Bilgilendirme', 'category').then(bilgi => {
    message.guild.channels.create('Toplum', 'category').then(toplum => {
    message.guild.channels.create('KayÄ±tlar', 'category').then(kayitlar => {
    message.guild.channels.create('Sesli Kanallar', 'category').then(sesli => {

    //Kanallar
    setTimeout(() => {
    	message.guild.channels.create('kurallar', 'text').then(kurallar => {
    	kurallar.createOverwrite(every, {
    		SEND_MESSAGES: false
    	})
    	kurallar.setParent(bilgi.id)
    	kurallar.send(stripIndents`
    	\`\`\`md
> Kurallar
1. KÃ¼fÃ¼r etmek, hakaretlerde bulunmak yasaktÄ±r!
2. Reklam yapmak, link atmak sunucu iÃ§ersin de de, sunucudaki bir Ã¼yeye Ã¶zelden mesaj olarak ta kesinlikle yasaktÄ±r!
3. #komutlar kanalÄ± dÄ±ÅŸÄ±nda bir kanalda komut kullanmak yasaktÄ±r!
4. Sesli kanallarda bas aÃ§mak vb. hareketler yapmak yasaktÄ±r!
5. Din, dil, Ä±rk ayrÄ±mÄ± yapmak yasaktÄ±r!
6. Siyaset hakkÄ±nda tartÄ±ÅŸmak, konuÅŸmak yasaktÄ±r!
7. Spam ve flood yapmak yasaktÄ±r!
8. Uygunsuz davranÄ±ÅŸlarda bulunmak, uygunsuz paylaÅŸÄ±mlar yapmak yasaktÄ±r!
9. Yetkilileri sebesiz, saÃ§ma sebepler yÃ¼zÃ¼nden rahatsÄ±z etmek yasaktÄ±r!
- KurallarÄ± okumamak kesinlikle yasaktÄ±r!
> Ãœyelerin bu kanalda konuÅŸmalarÄ± yasaklanmÄ±ÅŸtÄ±r.
\`\`\`
    	`)
    	kurallar.send(stripIndents`
    		\`\`\`md
[NOT]: Sunucudaki her Ã¼ye *yetkili dahil* kurallarÄ± okumuÅŸ olarak kabul edilir. Buradaki maddelere herhangi bir karÅŸÄ± gelme olayÄ± olduÄŸu an "bilmiyordum, okumamÄ±ÅŸtÄ±m" gibi bahanelerin *hiÃ§ biri* umursanmaz ve gerekli iÅŸlem yapÄ±lÄ±r!
\`\`\`
    	`)
    })
    	message.guild.channels.create('duyurular', 'text').then(duyurular => {
         duyurular.send(stripIndents`
    		\`\`\`md
# Merhaba! 
> BurasÄ± duyurular. Burda Ã¶nemli bilgiler verilir.
> Ãœyelerin bu kanalda konuÅŸmalarÄ± yasaklanmÄ±ÅŸtÄ±r.
- ${client.user.username} -
\`\`\`
    	`)
    
    	duyurular.createOverwrite(every, {
    		SEND_MESSAGES: false
    	})
    	duyurular.setParent(bilgi.id)
    })
    	message.guild.channels.create('sohbet', 'text').then(sohbet => {
    	sohbet.setParent(toplum.id)
         sohbet.send(stripIndents`
    		\`\`\`md
# Merhaba! 
> BurasÄ± sohbet. Burdan arkadaÅŸlarÄ±nla vb sohbet etmek iÃ§in kuruldu. Uygunsuz konuÅŸmalara izinli deÄŸildir.
- ${client.user.username} -
\`\`\`
    	`)
    })
     message.guild.channels.create('destek', 'text').then(destek => {
    	destek.setParent(toplum.id)
    	destek.send(stripIndents`
    		\`\`\`md
# Merhaba! 
> Bu kanal destek sistemi kanalÄ±dÄ±r! Buraya bir mesaj yazÄ±ldÄ±ÄŸÄ±nda otomatik olarak bir Destek Talebi aÃ§Ä±lÄ±r ve yetkililerimiz aÃ§Ä±lan talep kanalÄ±nda size yardÄ±mcÄ± olurlar. 
[UyarÄ±!]: Gereksiz yere kullanmak yasaktÄ±r!
- ${client.user.username} GeliÅŸmiÅŸ Destek Sistemi -
\`\`\`
    	`)
    	db.set(`destekK_${message.guild.id}`, destek.id)
    })
    }, 5000)

    setTimeout(() => {
    	message.guild.channels.create('komut-kullanÄ±m', 'text').then(komutlar => {
           komutlar.send(stripIndents`
    		\`\`\`md
# Merhaba! 
> BurasÄ± komutlar odasÄ±. !!yardÄ±m yazarak Vortex'in komutlarÄ±nÄ± gÃ¶rebilirsiniz.
- ${client.user.username} -
\`\`\`
    	`)
           	db.set(`ktr_${message.guild.id}`, komutlar.id)
    	komutlar.setParent(toplum.id)
    })
      
    }, 5000)

    setTimeout(() => {
    	message.guild.channels.create('gelen-giden', 'text').then(gc => {
    	gc.setParent(kayitlar.id)
    	gc.createOverwrite(every, {
    		SEND_MESSAGES: false
    	})
         gc.send(stripIndents`
    		\`\`\`md
# Merhaba! 
> Bu kanal yeni gelen Ã¼yeleri yazÄ±lÄ± bir ÅŸekilde karÅŸÄ±lar. 
> Ãœyelerin bu kanalda konuÅŸmalarÄ± yasaklanmÄ±ÅŸtÄ±r.
- ${client.user.username} GeliÅŸmiÅŸ Gelen-Giden Sistemi -
\`\`\`
    	`)
        
    	db.set(`gc_${message.guild.id}`, gc.id)
    })
      
    	message.guild.channels.create('sayaÃ§', 'text').then(sayac => {
    	sayac.setParent(kayitlar.id)
        sayac.send(stripIndents`
    		\`\`\`md
# Merhaba! 
> Bu kanal yeni gelen Ã¼yelerle birlikte belirtilen sayÄ±ya ne kadar kaldÄ±ÄŸÄ±nÄ± sÃ¶yler.
> Ãœyelerin bu kanalda konuÅŸmalarÄ± yasaklanmÄ±ÅŸtÄ±r.
- ${client.user.username} GeliÅŸmiÅŸ SayaÃ§ Sistemi -
\`\`\`
    	`)
          sayac.createOverwrite(every, {
    		SEND_MESSAGES: false
    	})
    	db.set(`sKanal_${message.guild.id}`, sayac.id)
    	db.set(`sayac_${message.guild.id}`, message.guild.members.cache.size+100)
    })
      message.guild.channels.create('oto-rol', 'text').then(otor => {
    	otor.setParent(kayitlar.id)
        otor.send(stripIndents`
    		\`\`\`md
# Merhaba! 
> Bu kanal yeni gelen Ã¼yelere belirtilen rolÃ¼ verir.
> Ãœyelerin bu kanalda konuÅŸmalarÄ± yasaklanmÄ±ÅŸtÄ±r.
- ${client.user.username} GeliÅŸmiÅŸ Oto-Rol Sistemi -
\`\`\`
    	`)
          otor.createOverwrite(every, {
    		SEND_MESSAGES: false
    	})
    	db.set(`otoRK_${message.guild.id}`, otor.id)
    	db.set(`otoR_${message.guild.id}`, otor.id)
      
    })
   	message.guild.channels.create('resimli-hoÅŸgeldin', 'text').then(gcc => {
    	gcc.setParent(kayitlar.id)
      gcc.send(stripIndents`
    		\`\`\`md
# Merhaba! 
> Bu kanal yeni gelen Ã¼yeleri resimli bir ÅŸekilde karÅŸÄ±lar. 
> Ãœyelerin bu kanalda konuÅŸmalarÄ± yasaklanmÄ±ÅŸtÄ±r.
- ${client.user.username} GeliÅŸmiÅŸ Resim-Kanal Sistemi -
\`\`\`
    	`)
    	db.set(`gcc_${message.guild.id}`, gcc.id)
         gcc.createOverwrite(every, {
           
    		SEND_MESSAGES: false
    	})
    })
      
    	message.guild.channels.create('moderasyon-kayıtları', 'text').then(log => {
    	log.setParent(kayitlar.id)
        log.send(stripIndents`
    		\`\`\`md
# Merhaba! 
> Bu kanal sunucuda geçen olayları söyler. 
> Üyelerin bu kanalda konuşmaları yasaklanmıştır..
> Üyelerin bu kanalı görmeleri yasaklanmıştır.
- ${client.user.username} Mod-Log Sistemi -
\`\`\`
    	`)
    	db.set(`log_${message.guild.id}`, log.id)
             log.createOverwrite(every, {
                VIEW_CHANNEL: false,
                		SEND_MESSAGES: false
               
    	
    	})
       
    })
      	message.guild.channels.create('gÃ¼venlik', 'text').then(guvenlik => {
    	guvenlik.setParent(kayitlar.id)
               guvenlik.send(stripIndents`
    		\`\`\`md
# Merhaba! 
> Bu kanal yeni gelen üyeleri güvenilir olup olmadıklarını tespit eder. 
> Üyelerin bu kanalda konuşları yasaklanmıştır.
- ${client.user.username} Güvenlik Sistemi -
\`\`\`
    	`)
    	db.set(`guvenlik3_${message.guild.id}`, guvenlik.id)
          guvenlik.createOverwrite(every, {
    		SEND_MESSAGES: false
    	})
          
    })
    }, 10000)

    setTimeout(() => {
    	message.guild.channels.create('Sohbet Odası', 'voice').then(shbt => {
    	shbt.setParent(sesli.id)
    })
    	message.guild.channels.create('Sohbet Odası - 2', 'voice').then(shbt2 => {
    	shbt2.setParent(sesli.id)
    })
    	message.guild.channels.create('Oyun Odası', 'voice').then(oyn => {
    	oyn.setParent(sesli.id)
    })
    	message.guild.channels.create('Oyun Odası - 2', 'voice').then(oyn2 => {
    	oyn2.setParent(sesli.id)
    })
 
    }, 15000)

    })})})})
      
    setTimeout(() => {
      	message.guild.roles.create({
        name: 'ğŸ”‘',
        color: '#EFEBE9',
        permissions: [
          
            "ADMINISTRATOR",
           "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS"
    ],
   
      }).then(d =>  message.guild.owner.roles.add(d.id))
    	message.guild.roles.create({
        name: 'Kurucu',
        color: 'BLACK',
        permissions: [
          
            "ADMINISTRATOR",
    ],
    hoist: true
      }).then(d =>  message.guild.owner.roles.add(d.id))
      message.guild.roles.create({
        name: 'Yönetici',
        color: '00bdff',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS"
    ],
    hoist: true
      })
      message.guild.roles.create({
        name: 'Moderator',
        color: '00ff08',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
    ],
    hoist: true
      })
       message.guild.roles.create({
      	name: 'Destek Ekibi',
      	color: 'RED',
      	mentionable: true,
         hoist: true
      }).then(d => {
      db.set(`destekR_${message.guild.id}`, d.id)
    })
      message.guild.roles.create({
        name: 'V.I.P',
        color: '00ffb6',
        hoist: true,
      })


      message.guild.roles.create({
        name: 'Üye',
        color: 'caf7fc',
        hoist: true,
      }).then(d =>  db.set(`otoR_${message.guild.id}`, d.id,    message.guild.members.cache.forEach(async (every) => {
 every.roles.add(d.id)})))
                                                                                              
      
    
message.guild.roles.create({
        name: 'Bot',
        color: 'ff8100',
         hoist: true,
      })
    const embed = new Discord.MessageEmbed()
	.setColor('RANDOM')
	.setDescription('Sunucunuzdaki kanalların, kategorilerin ve rollerin hepsi başarıyla silindi! Ve sunucu kurulumu tamamlandı!')
	message.author.send({embed: embed})
    }, 20000)
        })
        .catch(() => {
        	message.channel.send('`10 saniye` geçtiği için işlem iptal edildi!')
        });
    
  } catch (err) {
    
  }
  
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['sunucukurulum', 'sunucu-kur', 'sunucukur'],
	permLevel: 8,
	
};

exports.help = {
	name: 'sunucu-kur',
	description: '',
	usage: ''
};