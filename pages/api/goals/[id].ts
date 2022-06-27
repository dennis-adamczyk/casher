import { getGoal } from '@/data/database';
import { apiError } from '@/helpers/api-error-handler';
import { GoalData } from '@/pages/goals';
import type { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs').promises;

export default async function handler(req: NextApiRequest, res: NextApiResponse<GoalData>) {
  const { id } = req.query;
  if (process.env.USE_SQL === 'true') {
    try {
      let row = await getGoal(parseInt(id as string, 10))
      let result = {} as GoalData
      result.id = row.id
      result.bankAccountId = row.bank_account_id
      result.name = row.name
      result.amount = row.amount
      result.emojiIcon = row.emojiIcon
      result.savingAmount = row.savings_amount
      result.savingIntervall = row.savings_interval
      result.targetAmount = row.target_amount
      result.historyId = row.history_id
  
      result.data = JSON.parse(row.data)
      res.status(200).json(result);
    } catch (error) {
      apiError(error, res)
    }
  }else{
    const file = await fs.readFile('./data/goals.json');
    const goals: GoalData[] = JSON.parse(file);
    let goal: GoalData | undefined = goals.find((pGoal) => pGoal.id == parseInt(id as string, 10));
    if (goal != undefined) {
      res.status(200).json(goal);
    } else {
      res.status(404);
    }
  }
}
