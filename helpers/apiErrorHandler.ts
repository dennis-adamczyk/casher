import { NextApiResponse } from 'next/types';

export type SuccessResponse = { success: boolean };

export function apiError(error: any, res: NextApiResponse) {
  console.error(`Error happen during API-Call ${error}`);
  res.status(400).send({ success: false, error });
}
