import { graphql } from 'gatsby';
import { useEffect, useState } from 'react';

const gql = String.raw; // hack for VS code to forma GQL
const deets = `
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }

`;
export default function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemasters
  const [slicemasters, setSlicemasters] = useState();
  // use a side effect to fetch data from Sanity graphql endpoint
  // useEffect is a react hook that runs the code inside when the component is mounted; will also re-run if data changes
  useEffect(function () {
    // when component loads, fetch DATA
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // gql is only for VS code so it formats it
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // todo check for errors
        // set data to stat
        // console.log(res.data);
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemaster);
      })
      .catch((err) => {
        console.log('SHOOOT');
        console.log(err);
      });
  }, []);
  return {
    hotSlices,
    slicemasters,
  };
}
