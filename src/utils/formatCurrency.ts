const currencySymbols: { [key: string]: string } = {
  DOLLAR: "USD",
  EURO: "EUR",
  POUND: "GBP",
}

const formatCurrency = (price: number, currency: string) => {
  const locale = window.navigator.language

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencySymbols[currency] || currencySymbols.DOLLAR,
  }).format(price)
}

export default formatCurrency
