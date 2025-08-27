import { getAllCocktails } from '../models/cocktailModel.js';

export const getMenu = (_req, res) => {
  const data = getAllCocktails();
  res.json({ ok: true, cocktails: data });
};
