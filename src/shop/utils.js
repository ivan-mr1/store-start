export const priceFormatter = new Intl.NumberFormat('uk-UA');

export const formatPrice = (price) => priceFormatter.format(price);
