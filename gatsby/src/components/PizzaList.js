import { Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px; /* title, ingredients, picture */
`;

const PizzaStyles = styled.div`
  display: grid;
  /* take your row sizing not from the PizzaStyles div, but from the PizaGridStyles grid */
  /* subgrid is still new; check browser compatability. use this supports variable for regression */
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--row, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

// not exporting this function because i'm only using it here. export would make ti accessible to Gatsby in other pages and comps. on another note, create a comp when you;re going to using it more than once. if not, consider keeping it all-in-one where necessary. chunk if you need to.

// in ES6 you need to use dollar sign before reading data

// this data from graphql is being called on the pizza page

// for toppings, took the list, and mapped over it, then returned the name. .join appends to the returned result

function SinglePizza({ pizza }) {
  return (
    <PizzaStyles>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
    </PizzaStyles>
  );
}
// youll get a key error for data within .map if you use .map. each ind item needs a uniquekey so react keeps track of it. this is why we query the id using graphql in the page.

// uses SinglePizza and prop of pizza since we defined it earlier
export default function PizzaList({ pizzas }) {
  // loop through using .map; creates a p tag for each one
  return (
    <PizzaGridStyles>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </PizzaGridStyles>
  );
}
