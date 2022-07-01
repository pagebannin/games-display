import React from 'react'
import styled from 'styled-components'

const Card = styled.article`
  background-color: ${props => props.theme.light};
  border-radius: 0.25rem;
  overflow: hidden;
  transition: transform .25s ease-out;
  height: max-content;
  :hover {
    transform: scale(1.05);
  }
  @media only screen and (min-width: 768px) {
    border-radius: 0.5rem;
  }
`;

const CardBody = styled.div`
  padding: 0.2rem 0.25rem;
  color: #fff;
  @media only screen and (min-width: 768px) {
    padding: 0.4em 0.5rem;
  }
`;

const ReleaseDate = styled.h4`
  font-weight: 500;
`;

const Rating = styled.h4`
  font-weight: 500;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 12rem;
  @media only screen and (min-width: 1024px) {
    max-height: 10rem;
  }
  object-fit: cover;
`;

export function GameCard({ name = "", backgroundSrc = "", releaseDate = null, rating = 0  }) {
  return (
    <Card>
      <BackgroundImage src={backgroundSrc} alt="game background image" />
      <CardBody>
        <h3>{name}</h3>
        <ReleaseDate>Release date: {releaseDate}</ReleaseDate>
        <Rating>Rating: {rating}</Rating>
      </CardBody>
    </Card>
  )
}
