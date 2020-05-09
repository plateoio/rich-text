# rich-text-react

Render a Plateo Rich Text Field into React components.

# Installation

```console
yarn add @plateo/rich-text-react
```

```console
npm install @plateo/rich-text-react
```

# Usage

```js
import { convertDocumentToReactComponents } from '@plateo/rich-text-react';

const document = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'some text',
      },
    ],
  },
];

convertDocumentToReactComponents(document);

// <p>some text</p>
```

With marks like bold, underline.

```js
import { convertDocumentToReactComponents } from '@plateo/rich-text-react';

const document = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'some text',
        bold: true,
        underline: true,
      },
    ],
  },
];

convertDocumentToReactComponents(document);

// <p><strong><u>some text</u></strong></p>
```

Using custom renderes for either a node or mark.

```js
import { convertDocumentToReactComponents } from '@plateo/rich-text-react';
import { BLOCKS } from '@plateo/rich-text-types';

const Paragraph = ({ children }) => <p>{children}</p>;

const renderOptions = {
  node: {
    [BLOCKS.Paragraph]: (node, nested) => {
      return <Paragraph>nested(children)</Paragraph>;
    },
  },
};

const document = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'some text',
      },
    ],
  },
];

convertDocumentToReactComponents(document, renderOptions);

// <div>some text</div>
```

# Inspiration

API is inspired by the great work of Contentful at https://github.com/contentful/rich-text
