import { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../axios';

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
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media only screen and (min-width: 768px) {
    justify-content: space-between;
    flex-direction: row;
  }

  @media only screen and (min-width: 1024px) {
    max-width: 800px;
    margin: auto;
  }

  @media only screen and (min-width: 1200px) {
    max-width: 1000px;
  }
`;

export function GameFilters({ setSearchText = function () { }, setPlatform = function () { }, }) {

  const [platformsList, setPlatformsList] = useState([]);

  useEffect(() => {
    api('/api/platforms')
      .then((res) => {
        console.log(res.data);
        setPlatformsList(res.data?.results?.map((platform) => ({
          name: platform.name,
          id: platform.id,
        })));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <FilterBar>
      <Content>
        {platformsList.length > 0 ? (
          <select onInput={(e) => setPlatform(e.target.value)}>
            <option></option>
            {platformsList.map((platform) => (
              <option key={platform.id} value={platform.id}>{platform.name}</option>
            ))}
          </select>
        ) : <div/>}
        <input type="text" onInput={(e) => setSearchText(e.target.value)} placeholder="search game" />
      </Content>
    </FilterBar>
  )
}
