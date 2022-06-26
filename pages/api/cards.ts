import { BankCardData } from '@/components/common/BankCard';
import { getAccounts } from '@/data/database';
import { apiError } from '@/helpers/api-error-handler';
import type { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs').promises;

export default async function handler(req: NextApiRequest, res: NextApiResponse<BankCardData[]>) {
  if (process.env.USE_SQL === 'true') {
    try {
      let rows = await getAccounts ()
      const Accounts = rows.map((row) => {
        let account = {} as BankCardData;
        account.id = row.id;
        account.bank = row.bank;
        account.bankName = row.bank_name;
        account.holder = row.holder;
        account.iban = row.iban;
        account.balance = row.balance;
        account.effectiveBalance = row.effective_balance;
        return account;
      });
      res.status(200).json(Accounts);
    } catch (error) {
      apiError(error, res)
    }
  } else {
    const file = await fs.readFile('./data/cards.json');
    res.status(200).json(JSON.parse(file));
  }
}
