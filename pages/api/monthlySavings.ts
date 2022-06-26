// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { GoalData } from '@/pages/goals';
import { GetGoals, GoalSQLData } from '@/data/database';
import { getIntervalMonthlyFactor } from '@/constants/interval';
const fs = require('fs').promises;

export default async function handler(req: NextApiRequest, res: NextApiResponse<number>) {
  if(process.env.USE_SQL === 'true'){
    GetGoals()
    .then((rows: GoalSQLData[]) => {
      const totalBalance = rows.reduce((total, current) => total + current.savings_amount * getIntervalMonthlyFactor(current.savings_interval), 0);
      res.status(200).json(totalBalance);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
  }else{
    const file = await fs.readFile('./data/goals.json');
    let goals: GoalData[] = JSON.parse(file);
    const monthlySavings = goals.reduce((total, current) => total + current.savingAmount, 0);
    res.status(200).json(monthlySavings)  
  }
}
