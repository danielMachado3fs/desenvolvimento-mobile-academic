import currencyFormatter from 'currency-formatter';

export function formatCurrency(value) {
  const formattedValue =  currencyFormatter.format(value, { code: 'BRL' });
  return formattedValue;
}
