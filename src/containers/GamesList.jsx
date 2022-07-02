import { useState, useDeferredValue } from 'react';
import { AppContainer } from '../layout';
import { GameFilters } from './GameFilters';
import { GamesDisplay } from './GamesDisplay';

export default function GamesList() {

  const [searchText, setSearchText] = useState('');
  const [platform, setPlatform] = useState(null);
  const defferedSearch = useDeferredValue(searchText); 

  return (
    <>
      <GameFilters setPlatform={setPlatform} setSearchText={setSearchText} />
      <AppContainer>
        <GamesDisplay search={defferedSearch} platform={platform} />
      </AppContainer>
    </>
  );
}
