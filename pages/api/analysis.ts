import { DBClient } from '@/data/database';
import { apiError } from '@/helpers/api-error-handler';
import { Analysis, Analysis_Data } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<(Analysis & { data: Analysis_Data })[]>,
) {
  try {
    const analyses = await DBClient.analysis.findMany({ include: { data: true } });
    res.status(200).json(analyses);
  } catch (error) {
    apiError(error, res);
  }
}
