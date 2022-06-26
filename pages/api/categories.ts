// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CategorySQLData, getCategories } from '@/data/database';
import type { NextApiRequest, NextApiResponse } from 'next';
import { CategoryData } from '../subscriptions';
const fs = require('fs').promises;

export default async function handler(req: NextApiRequest, res: NextApiResponse<CategoryData[]>) {
  if (process.env.USE_SQL === 'true') {
    getCategories()
      .then((rows: CategorySQLData[]) => {
        const Categories = rows.map((row) => row as CategoryData);
        res.status(200).json(Categories);
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  } else {
    const file = await fs.readFile('./data/categories.json');
    res.status(200).json(JSON.parse(file));
  }
}
