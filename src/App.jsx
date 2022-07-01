import { lazy, Suspense } from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './app.theme';
import { AppBody, AppHeader } from './layout';

const GameProfile = lazy(() => import('./containers/GameProfile'));
const GamesDisplay = lazy(() => import('./containers/GamesDisplay'));

export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <AppHeader />
      <AppBody>
        <Suspense fallback={<h1>Loading...</h1>}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<GamesDisplay />} />
              <Route path="/game/:id" element={<GameProfile />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </AppBody>
    </ThemeProvider>
  );
}
