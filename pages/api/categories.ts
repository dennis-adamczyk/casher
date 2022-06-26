import { getCategories } from '@/data/database';
import { apiError } from '@/helpers/api-error-handler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { CategoryData } from '../subscriptions';
const fs = require('fs').promises;

export default async function handler(req: NextApiRequest, res: NextApiResponse<CategoryData[]>) {
  if (process.env.USE_SQL === 'true') {
    try {
      let rows = await getCategories()
      const Categories = rows.map((row) => row as CategoryData);
      res.status(200).json(Categories);
    } catch (error) {
      apiError(error, res)
    }
 
  } else {
    const file = await fs.readFile('./data/categories.json');
    res.status(200).json(JSON.parse(file));
  }
}
