import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// TODO: Modify this API as needed to fit your use case
export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = await streamText({
    model: openai("gpt-4o-mini"),
    system: "Parse user input and give array list of choices back",
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
