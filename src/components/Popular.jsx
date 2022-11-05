import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'

const Popular = () => {

  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, [])

  const getPopular = async () => {

    const check = localStorage.getItem('popular');

    if(check) {
        setPopular(JSON.parse(check));
    } else {
        const api = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`
        );
        const data = await api.json();
        localStorage.setItem('popular', JSON.stringify(data.recipes));
        setPopular(data.recipes);
        console.log(data.recipes);
    }
  }

  return (
    <div>
        <Wrapper>
            <h3>Popular Picks</h3>
            <Splide options={{
              perPage: 4,
              arrows : false,
              pagination : false,
              drag : 'free',
              gap : "2rem",
            }}>
              {popular.map((recipe) => {
                return (
                  <SplideSlide key={recipe.id}>
                    <Card>
                        <p>{recipe.title}</p>
                        <img src={recipe.image} alt={recipe.title} />
                        <Gradient/>
                    </Card>
                  </SplideSlide>
                );
              })}
            </Splide>
        </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
    // margin : 1rem 2rem;

`;

const Card = styled.div`
    min-height : 14rem;
    border-radius : 2rem;
    overflow : hidden;
    cursor : grab;

    img {
      border-radius : 2rem;
      width : 100%;
      position : absolute;
      left : 0;
      height : 100%;
      object-fit : cover;
    }
    p {
      position : absolute;
      z-index:10;
      // left : 50%;
      bottom : -10%;
      transform : translate (-50%, 0%);
      color : white;
      width : 100%;
      text-align: center;
      font-weight : 600;
      font-size : 1rem;
      height : 40%;
      display : flex;
      justify-content : center;
      align-items: center;
      overflow : hidden;
    }
`;

const Gradient = styled.div`
  z-index : 3;
  position : absolute;
  bottom : 0;
  top : 0;
  width : 100%;
  // height : 25rem;

  
  background:linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 188, 212, 0) 40%, rgba(238, 130, 238, 0) 100%);

  border-radius : 2rem;
  `

export default Popular