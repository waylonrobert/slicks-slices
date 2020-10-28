import path, { resolve } from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. get a template for this pages
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. query all pizzas - await is used because we need to wait for the data
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  console.log(data);
  // 3. loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        wes: 'is cool',
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // get the template; we're not creating a new one because we want to use the same template used on the pizzas page (due to the toppings filter UI we're using)
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // query all the toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // createPage for that toppings
  data.toppings.nodes.forEach((topping) => {
    console.log(`creating page for toppings`, topping.name);
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // todo regex for topping
      },
    });
  });
  // pass topping data to pizzas.js
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // fetch list of beers
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();
  console.log(beers);
  // loop over each one - could also do forEach()
  for (const beer of beers) {
    // create a node for that beer
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`), // internal to Gatsby
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json', // this is here for other plugins
        contentDigest: createContentDigest(beer), // internal to Gatsby
      },
    };
    actions.createNode({
      ...beer, // ... is a spread
      ...nodeMeta,
    });
  }
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  // TODO: turn each slicemaster into their own page

  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      component: resolve('./src/templates/Slicemaster.js'),
      path: `/slicemaster/${slicemaster.slug.current}`,
      context: {
        name: slicemaster.person,
        slug: slicemaster.slug.current,
      },
    });
  });

  // figure out how many pages based on slicemasters and # per pg
  // use javascript math.ceil to calculate a value
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  console.log(
    `There are ${data.slicemasters.totalCount} total people. And we have ${pageCount} pages with ${pageSize} per page`
  );
  // loop from 1 to n  and create pages
  Array.from({ length: pageCount }).forEach((_, i) => {
    console.log(`Creating page ${i}`);
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // this data is passed to the template when we create it
      // any context declared here is available to the graphql query on the page
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

// sourceNodes happens before createPages
// check Gatsby docs for more info
export async function sourceNodes(params) {
  // fetch list of beers from sampleapis.com into Gatsby API
  await Promise.all([await fetchBeersAndTurnIntoNodes(params)]);
}

// use Gatsby createPages API
export async function createPages(params) {
  // when needing to do more than 1, use a promise so that Gatsby builds the pages concurrently. Way better for performance. this will process all before finishing the function
  await Promise.all([
    await turnPizzasIntoPages(params),
    await turnToppingsIntoPages(params),
    await turnSlicemastersIntoPages(params),
  ]);
  // create pages dynamically
  // pizzas
  // toppings
  // slicemasters
}
