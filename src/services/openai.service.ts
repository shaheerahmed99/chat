import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat";
import * as dotenv from "dotenv";
import { saveChatMessage } from "./chat.service";
import { Request } from "express";
dotenv.config();

export interface ChatResponse {
  role: "assistant";
  content: string;
  id: string;
}
const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

export const getChatResponse = async (
  messages: ChatCompletionMessageParam[],
  req: Request
): Promise<ChatResponse> => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: messages,
    temperature: 1,
    max_tokens: 2048,
    top_p: 1,
  });

  const assistantMessage = completion.choices[0].message.content as string;

  const clientIP = req.ip || req.headers["x-forwarded-for"] || "";

  await saveChatMessage(
    completion.id,
    clientIP,
    "armash",
    completion.choices?.[0]?.message
  );

  return {
    role: "assistant",
    content: assistantMessage,
    id: completion.id,
  };
};
