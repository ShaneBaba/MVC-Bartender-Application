import { useEffect } from 'react';

export default function Home() {
  // Give the home page the aurora theme
  useEffect(() => {
    document.body.classList.add('theme-menu');
    return () => document.body.classList.remove('theme-menu');
  }, []);

  return null;
  /*return (
    <div className="page">
      <div className="container glass" style={{ padding: '1.25rem' }}>
        <h2 style={{ marginTop: 0 }}>Welcome</h2>
        <p>Choose <strong>Menu</strong> or <strong>Order Queue</strong> from the header.</p>
      </div>
    </div> 
  );
  */
}
