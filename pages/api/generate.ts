import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";
import axios from "axios";
import cheerio from "cheerio";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  try {
    const response = await axios.get(prompt);
    const $ = cheerio.load(response.data);
    const text = $("body").text().trim();

    const payload: OpenAIStreamPayload = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Generate a humorous and entertaining roas of the text of a website that I provide, a roast that will make me laugh out loud!. No more than 400 characters. Give me 1 recommendation to improve the website",
        },
        { role: "user", content: text },
      ],
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
  } catch (error) {
    return new Response("Error getting text from URL", { status: 500 });
  }
};
