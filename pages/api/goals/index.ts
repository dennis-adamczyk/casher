import { getGoals, GoalSQLData } from '@/data/database';
import { apiError } from '@/helpers/api-error-handler';
import { GoalData } from '@/pages/goals';
import type { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs').promises;

export default async function handler(req: NextApiRequest, res: NextApiResponse<GoalData[]>) {

  if (process.env.USE_SQL === 'true') {
    try {
      let rows = await getGoals();
      
      const goals: GoalData[] = rows.map((row: GoalSQLData) => {
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
  
        return result
      });
      res.status(200).json(goals);
    } catch (error) {
      apiError(error, res)
    }
  } else {
    const file = await fs.readFile('./data/goals.json');
    res.status(200).json(JSON.parse(file));
  }
}

