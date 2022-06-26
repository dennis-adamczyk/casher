import { NextApiResponse } from "next/types";

export function apiError(error:any, res: NextApiResponse) {
    console.log(`Error happen during API-Call ${error}`)
    res.status(400).send(error)
}