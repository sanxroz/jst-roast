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

  axios
    .get(prompt)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const allText = $("body").text();
      console.log(allText);
    })
    .catch((error) => {
      console.log(error);
    });

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Generate a humorous and entertaining roast of the text of a website that I provide, a roast that will make me laugh out loud!. No more than 400 characters. Give me 1 recommendation to improve the website",
      },
      { role: "user", content: prompt },
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
};

export default handler;
