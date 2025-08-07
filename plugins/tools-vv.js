const handler = async (m, { conn }) => {
  if (!m.quoted || m.quoted.mtype !== 'viewOnceMessageV2') {
    return m.reply('📹 Réponds à une *vidéo vue unique* avec la commande `.vv`.');
  }

  try {
    const viewOnceMsg = m.quoted.message;
    const type = Object.keys(viewOnceMsg.viewOnceMessage.message)[0];

    if (type !== 'videoMessage') {
      return m.reply('❌ Le message ciblé n\'est pas une *vidéo vue unique*.');
    }

    const media = viewOnceMsg.viewOnceMessage.message.videoMessage;

    await conn.sendMessage(m.chat, {
      video: media.url || media,
      caption: '🎥 Voici la vidéo (vue unique débloquée).',
      mimetype: media.mimetype,
      fileName: 'video.mp4'
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply('❌ Une erreur est survenue en extrayant la vidéo.');
  }
};

handler.command = /^vv$/i;
handler.private = false;
handler.group = true;
handler.admin = false;

export default handler;
