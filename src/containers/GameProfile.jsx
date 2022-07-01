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
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setLoading(true);
    api(`/api/games/${id}`)
      .then((res) => {
        setGame(res.data);
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
      {game && <GameDetails game={game} />}
    </article>
  )
}

export default GameProfile;
