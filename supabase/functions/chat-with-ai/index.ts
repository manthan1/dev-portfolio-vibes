
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { GoogleGenerativeAI } from "npm:@google/generative-ai";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const businessInfo = `
You're a friendly, focused chatbot for **MJ AI** — an AI agency that builds custom AI agents for businesses.

### 🧠 About MJ AI:
- Builds AI agents to automate business operations
- Solutions for marketing, support, lead generation & more
- Designed for startups and SMEs
- Offers **free consultation calls** with Manthan (the founder)

### 💬 Your Style:
- Friendly, calm, and confident
- Responses are short (2–4 short sentences max)
- Ask **1–2 smart, relevant questions** to understand the user's problem
- Use emojis **sparingly** to add warmth
- Always lead to offering a call with Manthan

### 🎯 Your Approach:
1. Greet the user casually
2. Ask what their business does + what challenge they're facing
3. Based on their answer, suggest a specific AI solution  
4. Then say: **"Want a free call with Manthan to go over this?"**
5. Keep replies focused. No rambling, no fluff.

You're not just chatting — you're here to connect users with real solutions, fast. Help them feel heard, then show them the value MJ AI can bring.
`;

const API_KEY = "AIzaSyBtKiun9KwLOPXQgBqosO9dHFuIIrisSXA";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid request: messages array is required');
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      systemInstruction: businessInfo
    });

    // Convert the format to match what Gemini expects
    const geminiHistory = messages
      .filter(msg => msg.role !== 'system') // Filter out system messages
      .map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

    const chat = model.startChat({ history: geminiHistory });
    
    // Get the last user message to respond to
    const lastUserMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastUserMessage);
    const response = await result.response;
    const responseText = response.text();

    console.log('Gemini response received:', responseText);

    return new Response(JSON.stringify({
      message: responseText,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-with-ai function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
