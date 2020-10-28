import { MdLocalPizza as icon } from 'react-icons/md'; // https://react-icons.github.io/react-icons/
// https://www.sanity.io/docs/reference
import PriceInput from '../components/PriceInput';

export default {
  name: 'pizza',
  title: 'Pizzas',
  type: 'document',
  icon, // shorthand for variable and propety name the same
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      inputComponent: PriceInput,
      description: 'Price of the Pizza in cents',
      validation: (Rule) => Rule.min(1000).max(50000),
      // todo add custom input component
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
      // check docs on rules here
    },
  ],
  // this controls how the data is previewed within the Sanity CMS interface
  preview: {
    select: {
      title: 'name',
      media: 'image',
      toppings0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
    },
    prepare: ({ title, media, ...toppings }) => {
      const tops = Object.values(toppings).filter(Boolean); // check Wes Bos tweet on this re: why to use 'Boolean'
      return {
        title,
        media,
        subtitle: tops.join(', '),
      };
    },
  },
};
