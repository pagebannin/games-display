import { lazy, Suspense } from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './app.theme';
import { AppLayout } from './layout';

const GameProfile = lazy(() => import('./containers/GameProfile'));
const GamesList = lazy(() => import('./containers/GamesList'));

export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route path="" element={<GamesList />} />
              <Route path="game/:id" element={<GameProfile />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}
