export function formatAmount(amount) {
  const formatter = new Intl.NumberFormat("en-ZM", {
    style: "currency",
    currency: "ZMW",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}
