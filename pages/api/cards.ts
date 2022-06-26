// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import BankCard, { BankCardData } from '@/components/common/BankCard';
import { BankCardSQLData, getAccounts } from '@/data/database';
import type { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs').promises;

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if(process.env.USE_SQL==='true'){
    getAccounts().then((rows: BankCardSQLData[])=>{
      const Accounts = rows.map((row) =>{
        let account = {} as BankCardData
        account.id               = row.id
        account.bank             = row.bank
        account.bankName         = row.bank_name
        account.holder           = row.holder
        account.iban             = row.iban
        account.balance          = row.balance
        account.effectiveBalance = row.effective_balance
        return account
      })
      
      res.status(200).json(Accounts)
    }).catch((err)=>{
      res.status(401).json(err)
    })

  }else{
    const file = await fs.readFile('./data/cards.json');
    console.log('aaaaa');
    
    res.status(200).json(JSON.parse(file));
  }
}
