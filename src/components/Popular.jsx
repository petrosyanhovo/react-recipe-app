import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const Popular = () => {

  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, [])

  const getPopular = async () => {
    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`);
    const data = await api.json();
    setPopular(data.recipes);
  }

  return (
    <div>
        {popular.map((recipe) => {
            return (
              <div>
                  <p>{recipe.title}</p>
              </div>
            )
        })}
    </div>
  )
}

export default Popular