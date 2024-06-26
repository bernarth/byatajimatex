const CURRENCY_FORMATTER = new Intl.NumberFormat("es-BO", {
  currency: "BOB",
  style: "currency",
  minimumFractionDigits: 0
});

export function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount / 10);
}

const NUMBER_FORMATTER = new Intl.NumberFormat("es-BO");

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}