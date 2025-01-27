import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from 'src/pages/Home/';
import reportWebVitals from 'src/reportWebVitals';

import { setupAxiosInterceptor } from './api/useAxiosInterceptor';

import 'src/assets/styles/index.css';

setupAxiosInterceptor();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <CookiesProvider
      defaultSetOptions={{
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
      }}
    >
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </CookiesProvider>
  </React.StrictMode>,
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
