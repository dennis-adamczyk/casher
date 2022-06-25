export const formatCurrency = (amount: number): string => {
  if (typeof amount !== 'number') return '';

  const formatter = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

  return formatter.format(amount);
};

export const formatMonth = (month: Date): string => {
  if (!(month instanceof Date)) return '';

  const formatter = Intl.DateTimeFormat('de-DE', { month: 'long' });

  return formatter.format(month);
};
