import { AppContainer } from '../layout';
import styled from 'styled-components'

const Header = styled.section`
  background-color: ${props => props.theme.dark2};
  width: 100%;
`;

const BackgroundImage = styled.img`
  width: 100%;
  object-fit: contain;

  @media only screen and (min-width: 768px) {
    max-height: 50vh;
  }

  @media only screen and (min-width: 1024px) {
    max-height: 60vh;
  }

  @media only screen and (min-width: 1024px) {
    max-height: 70vh;
  }
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  padding: 0.3rem;
  @media only screen and (min-width: 480px) {
    padding: 0.5rem 1rem;
    gap: 1rem;
  }

  @media only screen and (min-width: 1024px) {
    gap: 3rem;
    flex-direction: row;
    max-width: 800px;
    margin: auto;
  }

  @media only screen and (min-width: 1200px) {
    max-width: 1000px;
  }
`;

const FlexItem = styled.div`
  flex: 1;
`;

const DescriptionContainer = styled.section`
  p {
    margin-bottom: 0.5rem;
  }
`;

export function GameDetails({ game: {
  name = "",
  background_image = "",
  platforms = [],
  released = "",
  metacritic = "",
  description = "",
} }) {
  return (
    <div>
      <Header>
        <FlexRow>
          <FlexItem>
            <BackgroundImage src={background_image} />
          </FlexItem>
          <FlexItem>
            <h1>{name}</h1>
            <h3>Release date: {released}</h3>
            <h3>Available on:</h3>
            <p>
              {platforms?.map((p) => p.platform.name)?.join(', ')}
            </p>
            <h3>Metacritic Score: {metacritic}</h3>
          </FlexItem>
        </FlexRow>
      </Header>
      <AppContainer>
        <h2>Game Description</h2>
        <DescriptionContainer dangerouslySetInnerHTML={{ __html: description }} />
      </AppContainer>
    </div>
  )
}
