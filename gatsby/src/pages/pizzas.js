import React from 'react';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';
import SEO from '../components/SEO';
// good to keep pages as thin and light as possible - use components!
// anything within {} is destructuring todo: look up this concept

export default function PizzasPage({ data, pageContext }) {
  console.log(data); // confirm you get your data
  const pizzas = data.pizzas.nodes; // you can create a const to shorthand this
  // using a prop here
  return (
    // pageContext refers back to the function in gatsby-node
    <>
      <SEO
        title={
          pageContext.topping // this injects title information based on whether the page is loading the topping information or the pizzas
            ? `Pizzas with ${pageContext.topping}`
            : `All Pizzas`
        }
      />
      <ToppingsFilter activeTopping={pageContext.topping} />
      <PizzaList pizzas={pizzas} />
    </>
  );
}
// use react fragments below starting with ... so you save time and not have to repeat fields. Fragment comes with Sanity package

// Use "pizzas:" to rename it it
// graphql filter in = is not
export const query = graphql`
  query PizzaQuery($topping: [String]) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { in: $topping } } } }
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
