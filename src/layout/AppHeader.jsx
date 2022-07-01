import styled from 'styled-components';

const Header = styled.header`
  background-color: ${props => props.theme.dark};
  margin: 0;
  color: #fff;
  padding: 0.3rem;
  @media only screen and (min-width: 480px) {
    padding: 0.5rem 1rem;
  }
  
`;

const HeaderContent = styled.div`
  @media only screen and (min-width: 1024px) {
    max-width: 800px;
    margin: auto;
  }

  @media only screen and (min-width: 1200px) {
    max-width: 1000px;
  }
`;

export function AppHeader() {
  return (
    <Header>
      <HeaderContent>
        <h2>Games Display</h2>
      </HeaderContent>
    </Header>
  )
}
