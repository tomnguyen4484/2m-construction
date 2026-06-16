'use client';
import { useEffect } from 'react';

export default function OAuthCallback() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    if (accessToken && window.opener) {
      window.opener.postMessage({ access_token: accessToken }, window.location.origin);
      window.close();
    }
  }, []);

  return (
    <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0F2542', color: '#fff', fontFamily: 'sans-serif' }}>
      <p>Đang kết nối Google Analytics…</p>
    </main>
  );
}
