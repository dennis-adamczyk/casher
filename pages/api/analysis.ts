import { DBClient } from '@/data/database';
import { apiError } from '@/helpers/apiErrorHandler';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Analysis, Analysis_Data } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<(Analysis & { data: Analysis_Data })[]>,
) {
  try {
    const analyses = await DBClient.analysis.findMany({ include: { data: true } });
    res.status(200).json(analyses);
  } catch (error) {
    apiError(error, res);
  }
});
