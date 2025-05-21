function addDecimals(num) {
  return Math.round(num * 100) / 100;
}

export function calcPrices(orderItems) {
  const itemsPrice = addDecimals(
    orderItems.reduce(
      (acc, item) =>
        acc +
        item.price *
          item.bookings.reduce((a, c) => a + Number(c.reservationSeats.qty), 0),
      0
    )
  );
  // Calculate the shipping price
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
  // Calculate the tax price
  const taxPrice = addDecimals(Number(0.15 * itemsPrice));
  // Calculate the total price
  const totalPrice = addDecimals(
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
  );
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
}
