export const cocktails = [
  { id: 1, name: "margarita", ingredients: "tequila, triple sec lime juice salt", price: 11.99 },
  { id: 2, name: "old fashioned", ingredients: "bourbon or rye whiskey sugar bitters water", price: 12.99 },
  { id: 3, name: "martini", ingredients: "gin or vodka, dry vermouth olive or lemon twist", price: 14.99 }
];

export const orders = [];
let _nextId = 1;
export const nextOrderId = () => _nextId++;
