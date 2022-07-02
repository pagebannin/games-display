import { AppContainer } from '../layout';
import { GameFilters } from './GameFilters';
import { GamesDisplay } from './GamesDisplay';

export default function GamesList() {
  return (
    <>
      <GameFilters />
      <AppContainer>
        <GamesDisplay />
      </AppContainer>
    </>
  );
}
