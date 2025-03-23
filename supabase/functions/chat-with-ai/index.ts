
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

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

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY') || "sk-..."; // Fallback is just for development

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

    // Format messages for OpenAI
    const formattedMessages = [
      { role: "system", content: businessInfo },
      ...messages.map(msg => ({
        role: msg.role === 'system' && messages.indexOf(msg) !== 0 ? 'assistant' : msg.role,
        content: msg.content
      }))
    ];

    console.log('Sending conversation history to OpenAI:', JSON.stringify(formattedMessages));
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using a recommended model
        messages: formattedMessages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`API returned ${response.status}: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const responseText = data.choices[0].message.content;

    console.log('OpenAI response received:', responseText);

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
