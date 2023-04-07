import axios from "axios";
import cheerio from "cheerio";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;

  try {
    const response = await axios.get(url as string);
    const html = response.data;
    const $ = cheerio.load(html);
    const prompt = $("body").text().replace(/\n/g, " ");
    res.status(200).json({ prompt });
  } catch (error) {
    res.status(500).json({ message: "Error scraping website" });
  }
}
