// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { GoalData } from '@/pages/goals';
const fs = require('fs').promises;

export type monthlySavingsData = {
  monthlySavings: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<monthlySavingsData>
) {

    const file = await fs.readFile('./data/goals.json');
    let goals: GoalData[] = JSON.parse(file);
    const monthlySavings = goals.reduce((total, current) => total + current.savingAmount, 0);
    res.status(200).json({monthlySavings})
}
