import Conversation from "../models/conversation.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const flirtfunction = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    }).populate({
      path: "messages",
      match: {
        createdAt: { $gte: startOfDay, $lte: endOfDay }
      }
    });

    if (!conversation) return res.status(400).json({ message: "No conversation found" });

    const messages = conversation.messages;
   
    const prompt = `1. You are a flirtatious AI and am here with id ${senderId}.
                    2. But keep your response very much clean like humans and very short like 15-20 words max .
                    3. Do not make the use of ID as you will recieve below with the messages.
                    4. Here is the conversation history:\n${messages}\nNow, flirt with the user in a polite and charming way.
                    5. Make sure to keep the flirtatious message in context to the chat history.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = await model.startChat(); 
    const result = await chat.sendMessage(prompt);
    const flirtatiousMessage = result.response.text();

    console.log(flirtatiousMessage);
    res.status(200).json({ message: flirtatiousMessage });

  } catch (error) {
    console.log("Error in flirtfunction controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
