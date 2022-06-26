// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GetGoals, GoalSQLData } from '@/data/database';
import { GoalData } from '@/pages/goals';
import type { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs').promises;

export default async function handler(req: NextApiRequest, res: NextApiResponse<GoalData[]>) {

  if (process.env.USE_SQL === 'true') {
    GetGoals()
      .then((rows: GoalSQLData[]) => {
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
          result.data = JSON.parse(row.data)

          return result
        });
        res.status(200).json(goals);
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  } else {
    const file = await fs.readFile('./data/goals.json');
    res.status(200).json(JSON.parse(file));
  }
}

