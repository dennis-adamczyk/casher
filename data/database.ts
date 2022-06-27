import { BankName } from "@/components/common/BankCard";
import { interval } from "@/constants/interval";
import { Database } from "sqlite3";

const sqlite3 = require('sqlite3').verbose();
const db: Database  = new sqlite3.Database('./casher.db');

function promisifySQL<T>(sql: string){
    return new Promise<T[]>((resolve, reject)=>{
        db.all(sql,((err: any, rows: T[])=>{
            if(err){
                reject(err)
            }else{
                resolve(rows)
            }
        }))
    })
}

function promisifySQLSingleRow<T>(sql: string){
    return new Promise<T>((resolve, reject)=>{
        db.all(sql,((err: any, rows: T[])=>{
            if(err){
                reject(err)
            }else{
                resolve(rows[0])
            }
        }))
    })
}
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
    return promisifySQL("SELECT * FROM ACCOUNTS;")
}

export interface CategorySQLData {
    id: number;
    name: string;
}

export function getCategories(): Promise<CategorySQLData[]>{
    return promisifySQL("SELECT * FROM CATEGORIES;")
}

export interface SubscriptionSQLData {
    id: number;
    name: string;
    amount: number;
    category_id: number;
    bank_account_id: number;
    interval: interval;
}

export function getSubscriptions(): Promise<SubscriptionSQLData[]>{
    return promisifySQL("SELECT * FROM SUBSCRIPTIONS;")
}

export function getSubscriptionsForBankAccount(pBankAccountId: number): Promise<SubscriptionSQLData[]>{
    return promisifySQL(`SELECT * FROM SUBSCRIPTIONS WHERE bank_account_id=${pBankAccountId};`)
}



export interface SubscriptionWithCategorySQLData{
    id: number;
    name: string;
    amount: number;
    category_id: number;
    bank_account_id: number;
    interval: interval;
    cat_id: number;
    cat_name: string;
}

export function getSubscriptionsWithCategory(): Promise<SubscriptionWithCategorySQLData[]> {
    return promisifySQL(`SELECT s.id, s.name, s.amount, s.category_id, s.bank_account_id, 
                        s."interval", c.id as cat_id, c.name as cat_name 
                            FROM Subscriptions s 
                            JOIN Categories c 
                            ON s.category_id =c.id;`)
} 

export interface AnalysisSQLData {
    id: number;
    type: string;
    bank_account_id: number;
    name: string;
    data: string;
}

export function getAnalyses(): Promise<AnalysisSQLData[]> {
    return promisifySQL(`SELECT a.id, a.bank_account_id, a."type", a.name, ad."data" 
                            FROM Analyses a 
                            JOIN Analyses_Data ad 
                            ON a.analysis_data_id = ad.id;`)
}

export interface GoalSQLData {
    id: number;
    bank_account_id: number;
    name: string;
    emojiIcon: string;
    target_amount: number;
    amount: number;
    savings_amount: number;
    savings_interval: number;
    data: string;
    history_id: number
}

export function getGoals(): Promise<GoalSQLData[]>{
    return promisifySQL(`SELECT g.id, g.bank_account_id, g.name, g.emojiIcon, g.target_amount, 
                         g.amount, g.savings_amount, g.savings_interval, g.history_id, ad."data" 
                            FROM Goals g 
                            JOIN Analyses_Data ad 
                            ON g.analysis_data_id = ad.id;`)
}

export function getGoal(pId: number): Promise<GoalSQLData>{
    return promisifySQLSingleRow(`SELECT g.id, g.bank_account_id, g.name, g.emojiIcon, g.target_amount, 
                                 g.amount, g.savings_amount, g.savings_interval, g.history_id, ad."data" 
                                    FROM Goals g 
                                    JOIN Analyses_Data ad 
                                    ON g.analysis_data_id = ad.id WHERE g.id = ${pId};`);
}

export function getGoalsForBankAccount(pBankAccountId: number): Promise<GoalSQLData[]>{
    return promisifySQL(`SELECT g.id, g.bank_account_id, g.name, g.emojiIcon, g.target_amount, 
                        g.amount, g.savings_amount, g.savings_interval, g.history_id, ad."data" 
                            FROM Goals g 
                            JOIN Analyses_Data ad 
                            ON g.analysis_data_id = ad.id 
                            WHERE g.bank_account_id = ${pBankAccountId};`)
}

export interface GoalHistorySQLData {
    values: string
}

export function getGoalHistory(pGoalId: number): Promise<GoalHistorySQLData>{
    return promisifySQLSingleRow(`SELECT * FROM Goal_History gh WHERE gh.id = ${pGoalId};`);
}