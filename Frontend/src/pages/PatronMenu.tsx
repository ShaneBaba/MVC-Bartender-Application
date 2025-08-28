import { useEffect, useState } from 'react';
import type { Cocktail, Order } from '../types';

type MenuResponse = { ok: boolean; cocktails: Cocktail[] };

export default function PatronMenu() {
  const [menu, setMenu] = useState<Cocktail[]>([]);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);

  // Ensure the aurora theme is active on this page
  useEffect(() => {
    document.body.classList.add('theme-menu');
    return () => document.body.classList.remove('theme-menu');
  }, []);

  useEffect(() => {
    fetch('/api/menu')
      .then(r => r.json() as Promise<MenuResponse>)
      .then(d => setMenu(d.cocktails ?? []))
      .finally(() => setLoading(false));
  }, []);

  const order = async (cocktailId: number) => {
    setMsg('');
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patronName: name, cocktailId })
    });
    const data = (await res.json()) as Order | { error: string };
    if (!res.ok || 'error' in data) {
      setMsg(('error' in data && data.error) || 'Order failed');
      return;
    }
    setMsg(`Order #${(data as Order).id} placed for ${(data as Order).cocktailName}!`);
  };

  if (loading) return <div className="page container">Loading…</div>;

  return (
    <div className="page">
      <div className="container glass" style={{ padding: '1.25rem' }}>
        <h2 style={{ marginTop: 0 }}>Cocktail Menu</h2>
        <label>
          Your name:{' '}
          <input value={name} onChange={e => setName(e.target.value)} />
        </label>
        {msg && <p className="msg">{msg}</p>}
      </div>

      <div className="container" style={{ marginTop: '1rem' }}>
        <ul className="cards">
          {menu.map(c => (
            <li key={c.id} className="card glass">
              <h3>{c.name}</h3>
              <p>
                Ingredients:{' '}
                {Array.isArray(c.ingredients) ? c.ingredients.join(', ') : c.ingredients}
              </p>
              <p>${c.price.toFixed(2)}</p>
              <button onClick={() => order(c.id)}>Order</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
