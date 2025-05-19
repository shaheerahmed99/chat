import Chat from "../database/models/chats";

const saveChatMessage = async (
  conversationId: string,
  ip: string | string[],
  user: string,
  choices: object
) => {
  try {
    let chat = await Chat.findOne({ ip: ip });

    if (!chat) {
      chat = new Chat({
        ip: ip,
        user: user,
        chatId: conversationId,
        choices: choices,
      });
    } else {
      chat.choices && chat.choices.push({ choices });
      chat.updatedAt = new Date();
    }
    await chat.save();
  } catch (error) {
    console.error("Error saving chat message:", error);
    throw error;
  }
};

export { saveChatMessage };
