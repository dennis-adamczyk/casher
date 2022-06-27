export enum interval {
    undefined = -1,
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
        case interval.undefined:
            return 'fehler'
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

export function getIntervalMonthlyFactor(pInterval: interval): number{
    switch(pInterval){
        case interval.undefined:
            return 0
        case interval.daily:
            return 30.42
        case interval.weekly:
            return 4.33
        case interval.biweekly:
            return 2.17
        case interval.monthly:
            return 1
        case interval.quarterly:
            return 1/3
        case interval.halfyearly:
            return 0.5
        case interval.yearly:
            return 1/12
    }
}

export function getSelectOptionFromInterval(pInterval: interval): {value: number, label: string} {
    return {value: pInterval, label: getIntervalCaption(pInterval)}
}