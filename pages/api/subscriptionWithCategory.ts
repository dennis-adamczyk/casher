// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSubscriptionsWithCategory } from '@/data/database';
import { apiError } from '@/helpers/api-error-handler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { CategoryData, SubscriptionData } from '../subscriptions';

export default async function handler(req: NextApiRequest, res: NextApiResponse<[SubscriptionData, CategoryData][]>) {
  if (process.env.USE_SQL === 'true') {
    try {
      let rows = await getSubscriptionsWithCategory()
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
    } catch (error) {
      apiError(error, res)
    }
  } else {
    res.status(404);
  }
}
