import { Fragment, useCallback, useEffect, useState, useMemo } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import api from '../axios';
import { GameCard } from "../components/GameCard";
import { useRef } from "react";

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

`;

const ScrollArea = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  height: calc(100vh - 1.2rem - 2em);
  @media only screen and (min-width: 480px) {
    height: calc(100vh - 4rem - 2em);
  }
`;

export function GamesDisplay({ platform = null, search = null }) {

  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [showPage, setShowPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const bottomLoader = useRef(null);
  const topLoader = useRef(null);
  const isLoading = useRef(false);

  const list = useMemo(() => games?.slice(20 * (showPage - 1), (20 * (showPage + 1)) + 1), [games, showPage]);

  const handleBottomObserver = useCallback((entries) => {
    const target = entries[0];
    if (!isLoading.current && target.isIntersecting) {
      setShowPage((prev) => {
        const prevShowPage = prev;
        setPage((prevPage) => {
          console.log('setPage', prevShowPage, prevPage);
          if (prevShowPage + 1 === prevPage) {
            return prevPage + 1
          }
          return prevPage;
        });
        return prev + 1;
      });
    }
  }, []);

  const handleTopObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setShowPage((prev) => prev - 1);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    setGames([]);
  }, [search, platform]);

  useEffect(() => {
    isLoading.current = true;
    setLoading(true);
    const controller = new AbortController();
    api('/api/games', { params: { page, platforms: platform, search }, signal: controller.signal })
      .then((res) => {
        console.log(res.data?.results);
        setGames((prevState) => [...prevState, ...res.data?.results?.map((game) => ({
          slug: game.slug,
          name: game.name,
          background_image: game.background_image,
          released: game.released,
          rating: game.rating,
        }))]);
        if (page === 1) {
          setShowPage(0);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        isLoading.current = false;
        setLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, [page, platform, search]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "50px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleBottomObserver, option);
    let target = bottomLoader.current;
    if (target) {
      observer.observe(target)
    }
    return () => {
      if (target) {
        observer.disconnect(target);
      }
    }
  }, [handleBottomObserver, list]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "50px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleTopObserver, option);
    let target = topLoader.current;
    if (target) {
      observer.observe(target)
    }
    return () => {
      if (target) {
        observer.disconnect(target);
      }
    }
  }, [handleTopObserver, showPage]);

  return (
    <>
      <Grid>
        {list?.map((game, index, self) => (
          <Fragment key={game.slug}>
            <Link to={`/game/${game.slug}`}>
              <GameCard
                name={game.name}
                backgroundSrc={game.background_image}
                releaseDate={game.released}
                rating={game.rating}
              />
              {index === 1 && showPage > 1 && <div id="observerPointTop" ref={topLoader} />}
              {index === self.length - 4 && <div id="observerPointBottom" ref={bottomLoader} />}
            </Link>
          </Fragment>
        ))}
      </Grid>
      {loading && <h2>Loading...</h2>}
    </>
  );
};

export default GamesDisplay;
