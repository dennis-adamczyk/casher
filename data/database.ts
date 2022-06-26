import { BankName } from "@/components/common/BankCard";
import { Database } from "sqlite3";

const sqlite3 = require('sqlite3').verbose();
const db: Database  = new sqlite3.Database('./casher.db');

export interface BankCardSQLData {
    id: number;
    user_id: number;
    bank: BankName;
    bank_name: string;
    holder: string;
    iban: string;
    balance: number;
    effective_balance: number;
}

export function getAccounts(): Promise<BankCardSQLData[]>{
    return new Promise((resolve, reject)=>{
        db.all("SELECT * FROM ACCOUNTS;", ((err, rows)=>{
            if(err){
                reject(err)
            }else{
                resolve(rows)
            }
        })) 
    })
    
    
}