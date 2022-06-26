export enum interval {
    daily = 0,
    weekly = 1,
    biweekly = 2,
    monthly = 3,
    quarterly = 4,
    halfyearly = 5,
    yearly = 6
}

export function getIntervalCaption(pInterval: interval): string {
    switch(pInterval){
        case interval.daily:
            return 'täglich'
        case interval.weekly:
            return 'wöchentlich'
        case interval.biweekly:
            return 'alle zwei Wochen'
        case interval.monthly:
            return 'monatlich'
        case interval.quarterly:
            return 'vierteljährlich'
        case interval.halfyearly:
            return 'halbjährlich'
        case interval.yearly:
            return 'jährlich'
    }
}