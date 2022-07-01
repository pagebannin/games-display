import { useCallback, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import api from '../axios';
import { GameCard } from "../components/GameCard";

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-row-gap: 0.2rem;
  grid-column-gap: 0.25rem;

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 0.4rem;
    grid-column-gap: 0.5rem;
  }

  @media only screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 0.5rem;
    grid-column-gap: 0.6rem;
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 0.5rem;
    grid-column-gap: 0.6rem;
  }

`;

export function GamesDisplay() {

  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {

    api('/api/games', { params: { page, pageSize: 30, } })
      .then((res) => {
        console.log(res.data?.results);
        setGames((prevState) => [...prevState, ...res.data?.results]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page]);

  const handlePageChange = useCallback(() => {
    setPage((prevState) => prevState + 1);
  }, []);

  return (
    <InfiniteScroll dataLength={games.length} next={handlePageChange} hasMore loader={<h1>Loading...</h1>}>
      <Grid>
        {games?.map((game) => (
          <Link to={`/game/${game.id}`} key={game.id}>
            <GameCard
              name={game.name}
              backgroundSrc={game.background_image}
              releaseDate={game.released}
              rating={game.rating}
            />
          </Link>
        ))}
      </Grid>
    </InfiniteScroll>
  );
};

export default GamesDisplay;
