import styled from "styled-components"

const Main = styled.main`
  padding: 0.3rem;
  @media only screen and (min-width: 480px) {
    padding: 0.5rem 1rem;
  }

  @media only screen and (min-width: 1024px) {
    max-width: 800px;
    margin: auto;
    margin-top: 0;
  }

  @media only screen and (min-width: 1200px) {
    max-width: 1000px;
  }
`;

export function AppBody({ children }) {
  return (
    <Main>{children}</Main>
  )
}
