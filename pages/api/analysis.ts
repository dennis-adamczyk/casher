// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AnalysisSQLData, GetAnalyses } from '@/data/database';
import type { NextApiRequest, NextApiResponse } from 'next';
import { AnalysisData, AnalysisDataLine, AnalysisDataPie } from '../analysis';
const fs = require('fs').promises;


export default async function handler(req: NextApiRequest, res: NextApiResponse<AnalysisData[]>) {
  if (process.env.USE_SQL === 'true') {
    GetAnalyses().then((rows: AnalysisSQLData[])=>{
      const Anlyses: AnalysisData[] = rows.map((row:AnalysisSQLData)=>{
        let res: AnalysisData
        
        if(row.type==='line'){
          res = {} as AnalysisDataLine;
          res.type = 'line'
        }else if(row.type==='pie'){
          res = {} as AnalysisDataPie;
          res.type = 'pie'
        }else{
          throw new Error("incorrect analsistype found");
        }

        
        res.id = row.id
        res.bankAccountId = row.bank_account_id
        res.name = row.name
        res.data = JSON.parse(row.data);
        return res;
      })
      res.status(200).json(Anlyses)
    }).catch((err) => {
      console.log(err);
      res.status(401).json(err);
    });
  }else{
    const file = await fs.readFile('./data/analysis.json');
    res.status(200).json(JSON.parse(file));
  }
}
