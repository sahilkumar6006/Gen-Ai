// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// import { HumanMessage } from "@langchain/core/messages";
// import { createReactAgent } from "@langchain/langgraph/prebuilt";
// import { MemorySaver } from "@langchain/langgraph";
// import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
// import dotenv from "dotenv";

// import { runChatbot, visualizeGraph } from "./BasicIntegrations/ChatBot.js";

// const model = new ChatGoogleGenerativeAI({
//   model: "gemini-1.5-pro",
//   temperature: 0.1,
//   apiKey: process.env.GEMINI_API_KEY!,
// });

// const tools = [
//   new TavilySearchResults({
//     maxResults: 3,
//     apiKey: process.env.TAVILY_API_KEY!,
//   }),
// ];

// const checkpointSaver = new MemorySaver();

// const agent = createReactAgent({
//   llm: model,
//   tools,
//   checkpointSaver,
// });

// async function runAgent() {
//   console.log("in the run Agent checkit it is working or not");
//   try {
//     const response = await agent.invoke(
//       {
//         messages: [new HumanMessage("What's the latest news about AI?")],
//       },
//       {
//         configurable: { thread_id: "conversation-1" },
//       }
//     );

//     console.log(
//       "Agent Response:",
//       response.messages[response.messages.length - 1]!.content
//     );
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// runAgent();

// import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// import { MemorySaver } from "@langchain/langgraph";
// import { HumanMessage } from "@langchain/core/messages";
// import { createReactAgent } from "@langchain/langgraph/prebuilt";
// import dotenv from "dotenv";

// dotenv.config();

// process.env.TAVILY_API_KEY = process.env.TAVILY_API_KEY;
// const agentTools = [new TavilySearchResults({ maxResults: 3 })];

// const agentModel = new ChatGoogleGenerativeAI({
//   model: "gemini-2.0-flash",
//   temperature: 0,
//   apiKey: process.env.GEMINI_API_KEY!,
// });

// const agentCheckpointer = new MemorySaver();
// const agent = createReactAgent({
//   llm: agentModel,
//   tools: agentTools,
//   checkpointSaver: agentCheckpointer,
// });

// // Now use the agent
// const agentFinalState = await agent.invoke(
//   { messages: [new HumanMessage("latest about ai")] },
//   { configurable: { thread_id: "42" } }
// );

// console.log(
//   agentFinalState.messages[agentFinalState.messages.length - 1]!.content
// );

// const agentNextState = await agent.invoke(
//   { messages: [new HumanMessage("what about ny")] },
//   { configurable: { thread_id: "42" } }
// );

// console.log(
//   agentNextState.messages[agentNextState.messages.length - 1]!.content
// );

// import { tavily } from "@tavily/core";
// import dotenv from "dotenv";

// dotenv.config();

// async function main() {
//   const tvly = tavily({
//     apiKey: process.env.TAVILY_API_KEY!,
//   });

//   const response = await tvly.search("who is leon messi");

//   console.log("Search response:", response);
// }

// main().catch(console.error);

// Auto-run if this is the main module
// if (import.meta.url === `file://${process.argv[1]}`) {
// Show the theory visualization
//   visualizeGraph();

// Start interactive chatbot
//   runChatbot();

// Or run single interaction (comment out runChatbot() above):
// singleInteraction();
// }

// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// import { HumanMessage } from "@langchain/core/messages";
// import { createReactAgent } from "@langchain/langgraph/prebuilt";
// import { MemorySaver } from "@langchain/langgraph";
// import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
// import dotenv from "dotenv";

// const model = new ChatGoogleGenerativeAI({
//   model: "gemini-1.5-pro",
//   temperature: 0.1,
//   apiKey: "AIzaSyAj9Px9MSZH3SBerJUSPDCxYC4EUVyZLws",
// });

// const generateImage = async (prompt: string) => {
//   console.log("in the generate image");

//   const reponse = await model;
// };

// generateImage("a cute cat");
