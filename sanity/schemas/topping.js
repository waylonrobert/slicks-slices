import { FaPepperHot as icon } from 'react-icons/fa'; // https://react-icons.github.io/react-icons/
// https://www.sanity.io/docs/reference
export default {
  name: 'topping',
  title: 'Toppings',
  type: 'document',
  icon, // shorthand for variable and propety name the same
  fields: [
    {
      name: 'name',
      title: 'Topping Name',
      type: 'string',
      description: 'Name of the topping',
    },
    {
      name: 'vegetarian',
      title: 'Vegetarian',
      type: 'boolean',
      description: 'For vegetarians',
      options: {
        layout: 'checkbox',
      },
    },
  ],
  preview: {
    select: {
      name: 'name',
      vegetarian: 'vegetarian',
    },
    prepare: ({ name, vegetarian }) => ({
      title: `${name} ${vegetarian ? '🥦' : ''}`,
    }),
  },
};
