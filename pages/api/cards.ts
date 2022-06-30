import { DBClient } from '@/data/database';
import { apiError } from '@/helpers/apiErrorHandler';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Bank_Account } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Bank_Account[] | null>,
) {
  try {
    if (req.method == 'GET') {
      let accounts = await DBClient.bank_Account.findMany();
      res.status(200).json(accounts);
    } else if (req.method == 'POST') {
      const newBankAccount = JSON.parse(req.body) as Bank_Account;
      console.log(newBankAccount);

      console.log(
        await DBClient.bank_Account.create({
          data: newBankAccount,
        }),
      );
      res.status(200).json(null);
    }
  } catch (error) {
    apiError(error, res);
  }
});
