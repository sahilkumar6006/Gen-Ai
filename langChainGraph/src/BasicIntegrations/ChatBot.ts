//Chat bot
import { StateGraph, START, END } from "@langchain/langgraph";
import { HumanMessage, BaseMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import readline from "readline";
import dotenv from "dotenv";
import { stat } from "fs";

interface ChatbotState {
  messages: BaseMessage[];
}
dotenv.config();

interface ChatbotConfig {
  modelName: string;
  temperature: number;
  apiKey?: string;
}

/**
 * STATE THEORY:
 * The State represents the current "snapshot" of our conversation.
 * It flows through each node in the graph, carrying all the context needed.
 *
 * Key concepts:
 * - State is immutable - nodes return updates, don't modify directly
 * - Reducer functions control how state updates are merged
 * - Each key in state can have its own reducer logic
 */

/**
 * Message Reducer Function
 * This is the core of state management - it defines HOW messages are combined
 *
 * Theory: Instead of replacing messages, we want to append them to build
 * a conversation history. This preserves context for the LLM.
 */

function addMessages(
  left: BaseMessage[] = [],
  right: BaseMessage[] = []
): BaseMessage[] {
  const leftMessages = Array.isArray(left) ? left : [];
  const rightMessages = Array.isArray(right) ? right : [];

  // Combine arrays preserving conversation history
  return [...leftMessages, ...rightMessages];
}
interface ChatbotNodeResult {
  messages: BaseMessage[];
}

/**
 * MODEL INITIALIZATION
 * Theory: We need a language model that can understand conversation context
 * and generate appropriate responses. The model is stateless - it only
 * knows what we pass in the messages array.
 */

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0,
  apiKey: process.env.GEMINI_API_KEY!,
});

/**
 * CHATBOT NODE FUNCTION
 * Theory: This is where the actual "intelligence" happens.
 *
 * Node functions follow a specific pattern:
 * 1. Receive current state
 * 2. Perform some operation (LLM call, database query, etc.)
 * 3. Return state updates
 *
 * The LLM receives the entire conversation history and generates
 * a contextually appropriate response.
 */

async function Chatbot(state: any) {
  try {
    console.log(`🤖 Processing ${state.messages.length} messages...`);
    const response = await llm.invoke(state.messages);
    console.log("in the response ", response);

    return {
      messages: [response],
    };
  } catch (error) {
    console.log("i am getting the error that ui changes");
    return {
      messages: [
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again.",
        },
      ],
    };
  }
}

/**
 * GRAPH CONSTRUCTION
 * Theory: We're building a directed graph that represents our workflow.
 *
 * The StateGraph is like a blueprint that defines:
 * - What state looks like (channels)
 * - How state updates work (reducers)
 * - What nodes exist and how they connect
 */

const graphBuilder = new StateGraph<ChatbotState>({
  channels: {
    messages: {
      reducer: addMessages,
      default: (): BaseMessage[] => [],
    },
  },
});

graphBuilder.addNode("chatbot" as any, Chatbot);
graphBuilder.addEdge(START, "chatbot" as any);
graphBuilder.addEdge("chatbot" as any, END);
const graph = graphBuilder.compile();

/**
 * EXECUTION & STREAMING
 * Theory: When we run the graph, it executes our defined workflow.
 * Streaming allows us to get intermediate results as they happen,
 * rather than waiting for the entire execution to complete.
 */

async function streamGraphUpdates(userInput: any) {
  // Create initial state with user's message
  const initialState = {
    messages: [new HumanMessage(userInput)],
  };

  console.log(`\n🚀 Starting graph execution...`);

  try {
    // Stream the graph execution
    const stream = await graph.stream(initialState);

    // Process each event as it comes
    for await (const event of stream) {
      const eventEntries = Object.entries(event) as unknown as [
        string,
        ChatbotNodeResult
      ][];
      for (const [nodeName, nodeOutput] of eventEntries) {
        console.log(nodeOutput.messages); // TypeScript now knows messages exist
      }
    }
  } catch (error: any) {
    console.error("❌ Graph execution error:", error.message);
  }
}

async function runChatbot() {
  console.log("🎯 LangGraph Chatbot Started!");
  console.log(
    "📝 Theory: Each message becomes part of the conversation context"
  );
  console.log("🔄 Type 'quit', 'exit', or 'q' to end\n");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function askQuestion() {
    rl.question("👤 User: ", async (userInput) => {
      const trimmedInput = userInput.toLowerCase().trim();

      if (["quit", "exit", "q"].includes(trimmedInput)) {
        console.log("👋 Goodbye! Graph execution complete.");
        rl.close();
        return;
      }

      if (userInput.trim()) {
        await streamGraphUpdates(userInput);
      }

      askQuestion(); // Continue the conversation
    });
  }

  askQuestion();
}

/**
 * SINGLE INTERACTION DEMO
 * Theory: Sometimes you want to test a single interaction without
 * the full chat loop. This is useful for debugging and testing.
 */
async function singleInteraction(
  userInput = "Explain how LangGraph state management works"
) {
  console.log("👤 User:", userInput);
  await streamGraphUpdates(userInput);
}

/**
 * GRAPH VISUALIZATION (Optional)
 * Theory: Complex graphs benefit from visualization to understand
 * the flow and identify potential issues.
 */
function visualizeGraph() {
  try {
    // This would require additional dependencies for visualization
    console.log("📊 Graph Structure:");
    console.log("START → chatbot → END");
    console.log("\nState Flow:");
    console.log("messages: [] → [HumanMessage] → [HumanMessage, AIMessage]");
  } catch (error) {
    console.log("📊 Visualization requires additional dependencies");
  }
}

export {
  graph,
  streamGraphUpdates,
  runChatbot,
  singleInteraction,
  Chatbot,
  visualizeGraph,
};
