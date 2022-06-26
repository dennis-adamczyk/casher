// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GoalData } from '@/pages/goals';
import type { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs').promises;

type Data = {
  goal: GoalData;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const file = await fs.readFile('./data/goals.json');
  const { id } = req.query;

  const goals: GoalData[] = JSON.parse(file);
  let goal: GoalData | undefined = goals.find((pGoal) => pGoal.id == parseInt(id as string, 10));
  if (goal != undefined) {
    res.status(200).json({ goal });
  } else {
    res.status(404);
  }
}
