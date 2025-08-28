import { useEffect, useState } from 'react';
import type { Order } from '../types';

export default function BartenderQueue() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);

  // Apply the queue theme background while this page is mounted
  useEffect(() => {
    document.body.classList.add('theme-queue');
    return () => document.body.classList.remove('theme-queue');
  }, []);

  const load = () => {
    setLoading(true);
    fetch('/api/orders')
      .then(r => r.json() as Promise<Order[]>)
      .then(setOrders)
      .catch(() => setErr('Failed to load'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const ready = async (id: number) => {
    setErr('');
    const res = await fetch(`/api/orders/${id}/ready`, { method: 'POST' });
    if (!res.ok) { setErr('Update failed'); return; }
    load();
  };

  if (loading) return <div className="page container">Loading…</div>;

  return (
    <div className="page">
      <div className="container glass" style={{ padding: '1.25rem' }}>
        <h2 style={{ marginTop: 0 }}>Order Queue</h2>
        {err && <p className="error">{err}</p>}

        <table className="table glass">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patron</th>
              <th>Cocktail</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.patronName}</td>
                <td>{o.cocktailName}</td>
                <td>{o.status}</td>
                <td>
                  {o.status !== 'ready_for_pickup'
                    ? <button onClick={() => ready(o.id)}>Mark Ready</button>
                    : 'Ready ✅'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
