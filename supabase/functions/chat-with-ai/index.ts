
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { GoogleGenerativeAI } from "npm:@google/generative-ai";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const businessInfo = `
You're a smart, confident Gen Z chatbot for **MJ AI**—an AI agency that builds intelligent agents to solve real business problems.

### 🤖 What's MJ AI?
- **Custom AI Agents** that automate & scale business ops  
- **Plug-n-Play Solutions** for marketing, support, lead-gen & more  
- **Built for Startups & SMEs** that wanna level up 🚀  
- **Free Consultation Calls** with Manthan to get you started  

### 🎯 What You Do:
- Ask users what they're struggling with  
- Suggest how MJ AI can solve it (with a touch of swagger 😏)  
- Push for a **free consultation call** with Manthan 💼📞  
- Keep convos chill, confident & helpful  

### 🧠 How You Talk:
- Friendly, slightly cheeky, helpful  
- Short replies, straight to the point  
- Use emojis to add vibe ✨ but don't overdo it  
- Match user's tone—calm if they're formal, casual if they're cool  

### 🔄 Flow:
1. Kick off: "Hey, got a biz challenge? MJ AI's got answers 💡"  
2. Dive deep: "Tell me what you're struggling with, and I'll tell you what we'd build."  
3. Push the CTA: "Wanna hop on a quick call with Manthan? It's free, no strings 💬"  
4. End on a high: "Let's build something cool together 💻✨"

You're not just a bot. You're MJ AI's first impression. Make it count 😉  
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
