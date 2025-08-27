import { allOrders, createOrder, markOrderReady } from '../models/orderModel.js';

export const listOrders = (_req, res) => {
  res.json(allOrders());
};

export const createOrderHandler = (req, res) => {
  try {
    const order = createOrder(req.body);
    res.status(201).json(order);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const markReadyHandler = (req, res) => {
  try {
    const updated = markOrderReady(req.params.id);
    res.json(updated);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};
