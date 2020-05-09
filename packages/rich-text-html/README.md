# rich-text-html

Render a Plateo Rich Text Field into an HTML string.

# Installation

```console
yarn add @plateo/rich-text-html
```

```console
npm install @plateo/rich-text-html
```

# Usage

```js
import { convertDocumentToHtmlString } from '@plateo/rich-text-html';

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

convertDocumentToHtmlString(document);

// <p>some text</p>
```

With marks like bold, underline.

```js
import { convertDocumentToHtmlString } from '@plateo/rich-text-html';

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

convertDocumentToHtmlString(document);

// <p><strong><u>some text</u></strong></p>
```

Using custom renderes for either a node or mark.

```js
import { convertDocumentToHtmlString } from '@plateo/rich-text-html';
import { BLOCKS } from '@plateo/rich-text-types';

const renderOptions = {
  node: {
    [BLOCKS.Paragraph]: (node, nested) => {
      return `<div>${nested(node.children)}</div>`;
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

convertDocumentToHtmlString(document, renderOptions);

// <div>some text</div>
```

# Inspiration

API is inspired by the great work of Contentful at https://github.com/contentful/rich-text
