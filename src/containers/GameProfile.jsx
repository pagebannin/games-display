import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import api from '../axios';
import { GameDetails } from '../components';

const ErrorDisplay = styled.h1`
  color: red;
  text-align: center;
`;

export function GameProfile() {

  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api(`/api/games/${id}`),
      api(`/api/games/${id}/screenshots`, { params: { page_size: 20 } }),
    ])
      .then(([resGame, resScreens]) => {
        setGame(resGame.data);
        setScreenshots(resScreens.data?.results);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(err?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <article>
      {loading && <h1>Loading...</h1>}
      {errorMessage && <ErrorDisplay>{errorMessage}</ErrorDisplay>}
      {game && <GameDetails game={game} screenshots={screenshots} />}
    </article>
  )
}

export default GameProfile;
