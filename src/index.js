import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'; // Impor BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Bungkus aplikasi dengan BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Jika Anda ingin memulai mengukur kinerja aplikasi Anda, serahkan fungsi
// untuk mencatat hasilnya (misalnya: reportWebVitals(console.log))
// atau kirim ke endpoint analitik. Pelajari lebih lanjut: https://bit.ly/CRA-vitals
reportWebVitals();
