const formatCurrency = (price: number, currency: string) => {
  const locale = window.navigator.language

  const currencySymbols: { [key: string]: string } = {
    DOLLAR: "USD",
    EURO: "EUR",
    POUND: "GBP",
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencySymbols[currency],
  }).format(price)
}

export default formatCurrency
