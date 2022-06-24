export const formatCurrency = (amount: number): string => {
  if (typeof amount !== 'number') return '';

  const formatter = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

  return formatter.format(amount);
};
