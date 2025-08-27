import { orders, nextOrderId, cocktails } from '../database/data.js';

export const allOrders = () => [...orders].sort((a, b) => b.id - a.id);

export const createOrder = ({ patronName, cocktailId }) => {
  const c = cocktails.find(x => x.id === Number(cocktailId));
  if (!c) throw new Error('Invalid cocktailId');
  const order = {
    id: nextOrderId(),
    patronName: patronName || 'Anonymous',
    cocktailId: c.id,
    cocktailName: c.name,
    status: 'placed', 
    createdAt: new Date().toISOString()
  };
  orders.push(order);
  return order;
};

export const markOrderReady = (id) => {
  const o = orders.find(x => x.id === Number(id));
  if (!o) throw new Error('Order not found');
  o.status = 'ready_for_pickup';
  o.readyAt = new Date().toISOString();
  return o;
};
