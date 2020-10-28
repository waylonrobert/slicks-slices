// This file is empty, but some people were reporting that it would not start unless they had an empty file. So here it is! You can delete the comment. Or replace it with your favourite shania twain lyrics.
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: `Slick's Slices`,
    siteUrl: 'https://gatsby.pizza',
    description: 'The best pizza place in Hamilton!',
    twitter: '@SlicksSlices',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      // this is the name of the plugin youre adding
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'lwh9oyot',
        dataset: 'production',
        watchMode: true,
        // watchMode note: in dev, any changes in Sanity CMS will automatically update in Gatsby; no rebuild necessary; realtime editing exp in gatsby develop watch
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
