// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GetSubscriptionsWithCategory, SubscriptionWithCategorySQLData } from '@/data/database';
import type { NextApiRequest, NextApiResponse } from 'next';
import { CategoryData, SubscriptionData } from '../subscriptions';
const fs = require('fs').promises;

export default async function handler(req: NextApiRequest, res: NextApiResponse<[SubscriptionData, CategoryData][]>) {
  if (process.env.USE_SQL === 'true') {
    GetSubscriptionsWithCategory()
      .then((rows: SubscriptionWithCategorySQLData[]) => {
        const tuples: [SubscriptionData, CategoryData][] = rows.map((row) => {
          let subscription = {} as SubscriptionData;
          let category = {} as CategoryData;

          subscription.id = row.id;
          subscription.name = row.name;
          subscription.amount = row.amount;
          subscription.categoryId = row.category_id;
          subscription.bankAccountId = row.bank_account_id;
          subscription.interval = row.interval;

          category.id = row.cat_id;
          category.name = row.cat_name;
          return [subscription, category];
        });
        res.status(200).json(tuples);
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  } else {
    res.status(404);
  }
}
