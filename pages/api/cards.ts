// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs').promises;

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const file = await fs.readFile('./data/cards.json');
  res.status(200).json(JSON.parse(file));
}
