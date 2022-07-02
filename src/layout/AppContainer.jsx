import styled from "styled-components"

const Main = styled.section`
  padding: 0.3rem;
  overflow-x: hidden;
  @media only screen and (min-width: 480px) {
    padding: 0.5rem 1rem 0 1rem;
  }

  @media only screen and (min-width: 1024px) {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
    margin-bottom: 0;
  }

  @media only screen and (min-width: 1200px) {
    max-width: 1000px;
  }
`;

export function AppContainer({ children }) {
  return (
    <Main>{children}</Main>
  )
}
