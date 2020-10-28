import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// build a custom sidebar
export default function Sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // make a new subitem
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🔥</strong>)
        .child(
          // create an editor for the schema type and link to document ID
          S.editor()
            .schemaType('storeSettings')
            // make a new documentID so we don't have a random string of #s
            .documentId('downtown')
        ),
      // add in the rest of the document items
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
