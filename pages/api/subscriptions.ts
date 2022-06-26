// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSubscriptions, SubscriptionSQLData } from '@/data/database';
import type { NextApiRequest, NextApiResponse } from 'next'
import { SubscriptionData } from '../subscriptions';
const fs = require('fs').promises;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubscriptionData[]>
) {
  if(process.env.USE_SQL==='true'){    
    getSubscriptions().then((rows: SubscriptionSQLData[])=>{
      const Subscriptions = rows.map((row) =>{
        let subscription = {} as SubscriptionData;
        subscription.id = row.id;
        subscription.name = row.name;
        subscription.amount = row.amount;
        subscription.categoryId = row.category_id;
        subscription.bankAccountId = row.bank_account_id;
        subscription.interval = row.interval
        return subscription 
      })
      res.status(200).json(Subscriptions) 
    }).catch((err)=>{
      res.status(401).json(err)
    })
  }else{
    const file = await fs.readFile('./data/subscriptions.json');
    res.status(200).json(JSON.parse(file))
  }  

}
