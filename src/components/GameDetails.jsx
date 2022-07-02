import { AppContainer } from '../layout';
import styled from 'styled-components'
import { ImageCarousel } from './ImageCarousel';

const Header = styled.section`
  background-color: ${props => props.theme.light2};
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

const CarouselContainer = styled.section`
  background-color: ${props => props.theme.dark2};
  width: 100%;
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

const BackgroundFlexItem = styled.div`
  flex: 2;
`;

const FlexItem = styled.div`
  flex: 1;
`;

const DescriptionContainer = styled.section`
  p {
    margin-bottom: 0.5rem;
  }
`;

const WebsiteLink = styled.a`
  margin-top: 1rem;
  color: #fff;
  &:hover {
    color: #dbcfcf;
  }
`;

export function GameDetails({
  game: {
    name = "",
    background_image = "",
    platforms = [],
    released = "",
    description = "",
    website = "",
  },
  screenshots = [],
}) {
  return (
    <div>
      <Header>
        <FlexRow>
          <BackgroundFlexItem>
            <BackgroundImage src={background_image} />
          </BackgroundFlexItem>
          <FlexItem>
            <h1>{name}</h1>
            <h3>Release date: {released}</h3>
            <h3>Available on:</h3>
            <p>
              {platforms?.map((p) => p.platform.name)?.join(', ')}
            </p>
            <WebsiteLink href={website} target="_blank"><h3>Go to website</h3></WebsiteLink>
          </FlexItem>
        </FlexRow>
      </Header>
      <AppContainer>
        <h2>Game Description</h2>
        <DescriptionContainer dangerouslySetInnerHTML={{ __html: description }} />
      </AppContainer>
      <CarouselContainer>
        <AppContainer>
          <ImageCarousel images={screenshots.map((screen) => screen.image)} />
        </AppContainer>
      </CarouselContainer>
    </div>
  )
}
