import { DBClient } from '@/data/database';
import { apiError } from '@/helpers/api-error-handler';
import { Bank_Account } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Bank_Account[]>) {
  try {
    let accounts = await DBClient.bank_Account.findMany()
    res.status(200).json(accounts)
  } catch (error) {
    apiError(error, res)
  }
}
