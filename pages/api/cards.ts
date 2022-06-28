import { BankCardData } from '@/components/common/BankCard';
import { getAccounts, getSubscriptionsForBankAccount } from '@/data/database';
import { apiError } from '@/helpers/api-error-handler';
import type { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs').promises;
import { Bank_Account, PrismaClient } from '@prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Bank_Account[]>) {
  
  const prisma = new PrismaClient()  
  let accounts = await prisma.bank_Account.findMany()
  res.status(200).json(accounts)
}
