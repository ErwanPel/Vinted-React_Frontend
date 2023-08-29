const intl = new Intl.NumberFormat(window.navigator.language, {
  style: "currency",
  currency: window.navigator.language === "fr-FR" ? "EUR" : "USD",
});

export default intl;
