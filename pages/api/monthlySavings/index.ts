import type { NextApiRequest, NextApiResponse } from 'next';
import { GoalData } from '@/pages/goals';
import { getGoals } from '@/data/database';
import { getIntervalMonthlyFactor } from '@/constants/interval';
import { apiError } from '@/helpers/api-error-handler';
const fs = require('fs').promises;

export default async function handler(req: NextApiRequest, res: NextApiResponse<number>) {
  if(process.env.USE_SQL === 'true'){
    try {
      let rows = await getGoals()
      const totalBalance = rows.reduce((total, current) => total + current.savings_amount * getIntervalMonthlyFactor(current.savings_interval), 0);
      res.status(200).json(totalBalance);   
    } catch (error) {
      apiError(error, res)
    }
  }else{
    const file = await fs.readFile('./data/goals.json');
    let goals: GoalData[] = JSON.parse(file);
    const monthlySavings = goals.reduce((total, current) => total + current.savingAmount, 0);
    res.status(200).json(monthlySavings)  
  }
}
