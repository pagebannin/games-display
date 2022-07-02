import React from 'react'
import styled from 'styled-components';

const FilterBar = styled.header`
background-color: ${props => props.theme.light2};
margin: 0;
color: #fff;
padding: 0.3rem;
@media only screen and (min-width: 480px) {
  padding: 0.5rem 1rem;
}

`;

const Content = styled.div`
@media only screen and (min-width: 1024px) {
  max-width: 800px;
  margin: auto;
}

@media only screen and (min-width: 1200px) {
  max-width: 1000px;
}
`;

export function GameFilters() {
  return (
    <FilterBar>
      <Content>
        GameFilters
      </Content>
    </FilterBar>
  )
}
