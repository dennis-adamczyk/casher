import { BankName } from "@/components/common/BankCard";
import { interval } from "@/constants/interval";
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

export interface CategorySQLData {
    id: number;
    name: string;
}

export function getCategories(): Promise<CategorySQLData[]>{
    return new Promise((resolve, reject)=>{
        db.all("SELECT * FROM CATEGORIES;", ((err, rows)=>{
            if(err){
                reject(err)
            }else{
                resolve(rows)
            }
        })) 
    })
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
    return new Promise((resolve, reject)=>{
        db.all("SELECT * FROM SUBSCRIPTIONS;", ((err, rows)=>{
            if(err){
                reject(err)
            }else{
                resolve(rows)
            }
        })) 
    })
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

export function GetSubscriptionsWithCategory(): Promise<SubscriptionWithCategorySQLData[]> {
    return new Promise((resolve, reject)=>{
        db.all(`SELECT s.id, s.name, s.amount, s.category_id, s.bank_account_id, s."interval", c.id as cat_id, c.name as cat_name 
                FROM Subscriptions s 
                JOIN Categories c ON s.category_id =c.id;`, ((err, rows)=>{
            if(err){
                reject(err)
            }else{
                resolve(rows)
            }
        })) 
    })
} 

export interface AnalysisSQLData {
    id: number;
    type: string;
    bank_account_id: number;
    name: string;
    data: string;
}

export function GetAnalyses(): Promise<AnalysisSQLData[]> {
    return new Promise((resolve, reject)=>{
        db.all(`SELECT a.id, a.bank_account_id, a."type", a.name, ad."data" from Analyses a JOIN Analyses_Data ad ON a.analysis_data_id = ad.id;`, ((err, rows)=>{
            if(err){
                reject(err)
            }else{                
                resolve(rows)
            }
        })) 
    })
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
}

export function GetGoals(): Promise<GoalSQLData[]>{
    return new Promise((resolve, reject)=>{
        db.all(`SELECT g.id, g.bank_account_id, g.name, g.emojiIcon, g.target_amount, g.amount, g.savings_amount, g.savings_interval, ad."data" FROM Goals g JOIN Analyses_Data ad ON g.analysis_data_id = ad.id;`, ((err, rows)=>{
            if(err){
                reject(err)
            }else{                
                resolve(rows)
            }
        })) 
    })
}

export function GetGoal(pId: number): Promise<GoalSQLData>{
    return new Promise((resolve, reject)=>{
        db.all(`SELECT g.id, g.bank_account_id, g.name, g.emojiIcon, g.target_amount, g.amount, g.savings_amount, g.savings_interval, ad."data" FROM Goals g JOIN Analyses_Data ad ON g.analysis_data_id = ad.id WHERE g.id = ${pId};`, ((err, rows)=>{
            if(err){
                reject(err)
            }else{                
                resolve(rows[0])
            }
        })) 
    })
}