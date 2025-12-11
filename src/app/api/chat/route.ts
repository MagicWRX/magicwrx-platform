import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    system: `You are the MagicWRX AI Assistant. You help users build websites, manage their business, and optimize their content.
    
    Your capabilities:
    1. Content Generation: Write blog posts, hero text, and descriptions.
    2. SEO Advice: Suggest meta tags, titles, and keywords.
    3. Platform Support: Explain how to use MagicWRX features (Templates, Dashboard, Site Builder).
    
    Keep answers concise and helpful. If asked about code, provide clean, standard HTML/CSS/JS or React code compatible with the platform.`,
  });

  return result.toDataStreamResponse();
}
