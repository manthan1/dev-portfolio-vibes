
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { GoogleGenerativeAI } from "npm:@google/generative-ai";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const businessInfo = `
You're a direct, solution-focused chatbot for MJ AI - an AI agency building custom AI solutions for businesses.

ABOUT MJ AI:
- Custom AI Agents that automate business operations
- Solutions for marketing, support, lead generation
- Built for startups and SMEs
- Free consultation calls with Manthan

YOUR STYLE:
- Very brief, direct responses (max 2-3 short sentences)
- Friendly but not overly enthusiastic
- Focus on solutions, not questions
- Use an emoji occasionally but sparingly

YOUR APPROACH:
1. When users describe a problem, immediately suggest a specific AI solution
2. Always follow up with offering a call with Manthan: "Want a free call with Manthan to discuss this?"
3. Don't ask users multiple questions - focus on giving solutions

IMPORTANT: Keep your responses very short and solution-focused. Don't ask multiple questions.
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
