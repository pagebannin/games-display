import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

const CarouselWrapper = styled.div`
  display: grid;
`;

const CarouselImage = styled.img`  
  max-height: 100%;
  width: 100%;
  opacity: 0;
  visibility: hidden;
  transition: visibility 0.5s, opacity 0.5s linear;
  object-fit: contain;
  grid-row: 1;
  grid-column: 1;
  &.show {
    visibility: visible;
    opacity: 1;
    display: block;
  }
`;

const ButtonsWrapper = styled.div`
  z-index: 150;
  position: relative;
  bottom: -50%;
  height: fit-content;
  transform: translateY(-50%);
  margin-bottom: 0.5rem;
  grid-row: 1;
  grid-column: 1;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  color: white;
  background: none;
  width min(100%, 5rem);
  border: 0;
  font-size: 1.75em;
  font-weight: bold;
  cursor: pointer;
  opacity: 0.7;
  border-radius: 0.75rem;
  padding-bottom: 0.3rem;
  height: fit-content;
  &:hover {
    opacity: 1;
    background: #00000087;
  }
`;


export function ImageCarousel({ images = [] }) {

  const [currentImage, setCurrentImage] = useState(0);

  const onPreviousButtonClick = useCallback(() => {
    setCurrentImage((prev => prev - 1 >= 0 ? prev - 1 : images.length - 1));
  }, [images]);

  const onNextButtonClick = useCallback(() => {
    setCurrentImage((prev => prev + 1 < images.length ? prev + 1 : 0));
  }, [images]);

  useEffect(() => {
    let timeout;
    if (images.length > 0) {
      timeout = setTimeout(() => {
        setCurrentImage(currentImage + 1 < images.length ? currentImage + 1 : 0);
      }, 5000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  }, [images, currentImage]);

  return (
    <CarouselWrapper>
      <ButtonsWrapper>
        {images?.length > 0 && <Button onClick={onPreviousButtonClick}>&#8592;</Button>}
        {images?.length > 0 && <Button onClick={onNextButtonClick}>&#8594;</Button>}
      </ButtonsWrapper>
      {images?.map((src, index) => (
        <CarouselImage src={src} alt="game screenshot" className={index === currentImage ? 'show' : ''} key={src} />
      ))}
    </CarouselWrapper>
  );
}
