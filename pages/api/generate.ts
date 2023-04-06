import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";
import axios from "axios";
import cheerio from "cheerio";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const getTextFromUrl = async (prompt: string): Promise<string> => {
  const response = await axios.get(prompt);
  const $ = cheerio.load(response.data);
  return $("body").text().trim();
};

const handler = async (req: Request): Promise<Response> => {
  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  let text = "";
  if (prompt) {
    text += await getTextFromUrl(prompt);
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: text }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
