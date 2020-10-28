import { object } from 'prop-types';
import { MdPerson as icon } from 'react-icons/md'; // https://react-icons.github.io/react-icons/
// https://www.sanity.io/docs/reference
export default {
  name: 'person',
  title: 'Slicemasters',
  type: 'document',
  icon, // shorthand for variable and propety name the same
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Tell us about them',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  // this controls how the data is previewed within the Sanity CMS interface
};
