import { SelectOption } from './selectOptions';

export enum Interval {
  undefined = -1,
  daily = 0,
  weekly = 1,
  biweekly = 2,
  monthly = 3,
  quarterly = 4,
  halfyearly = 5,
  yearly = 6,
}

export function getIntervalCaption(pInterval: Interval): string {
  switch (pInterval) {
    case Interval.undefined:
      return 'fehler';
    case Interval.daily:
      return 'täglich';
    case Interval.weekly:
      return 'wöchentlich';
    case Interval.biweekly:
      return 'alle zwei Wochen';
    case Interval.monthly:
      return 'monatlich';
    case Interval.quarterly:
      return 'vierteljährlich';
    case Interval.halfyearly:
      return 'halbjährlich';
    case Interval.yearly:
      return 'jährlich';
  }
}

export function getIntervalMonthlyFactor(pInterval: Interval): number {
  switch (pInterval) {
    case Interval.undefined:
      return 0;
    case Interval.daily:
      return 30.42;
    case Interval.weekly:
      return 4.33;
    case Interval.biweekly:
      return 2.17;
    case Interval.monthly:
      return 1;
    case Interval.quarterly:
      return 1 / 3;
    case Interval.halfyearly:
      return 0.5;
    case Interval.yearly:
      return 1 / 12;
  }
}

export function getSelectOptionFromInterval(pInterval: Interval): SelectOption {
  return { value: pInterval.toString(), label: getIntervalCaption(pInterval) };
}

export function getAllSelectOptions(): SelectOption[] {
  let options = [];
  for (let val in Interval) {
    let intId = parseInt(val, 10);
    if (intId < 0 || isNaN(intId)) continue;
    options.push(getSelectOptionFromInterval(intId as Interval));
  }
  return options;
}
