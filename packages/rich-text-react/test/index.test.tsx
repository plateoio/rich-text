import * as React from 'react';

import {
  Document,
  BLOCKS,
  Block,
  Inline,
  MARKS,
  INLINES,
} from '@plateo/rich-text-types';

import { convertDocumentToReactComponents, Nested } from '../src/index';

describe('convertDocumentToReactComponents', () => {
  it('returns empty array when given an empty document', () => {
    const document: unknown = [];

    expect(convertDocumentToReactComponents(document as Document)).toEqual([]);
  });

  it('can handle undefined documents', () => {
    const document: unknown = undefined;
    expect(convertDocumentToReactComponents(document as Document)).toEqual(
      null
    );
  });

  it('renders document with default node renderer', () => {
    const documents: Document[] = [
      [
        {
          type: BLOCKS.HeadingOne,
          children: [
            {
              text: 'I work',
            },
          ],
        },
      ],
      [
        {
          type: BLOCKS.Paragraph,
          children: [
            {
              text: 'Nice Paragraph',
            },
          ],
        },
      ],
    ];

    documents.forEach(node => {
      expect(convertDocumentToReactComponents(node)).toMatchSnapshot();
    });
  });

  it('renders document with default mark renderer', () => {
    const document: Document = [
      {
        type: BLOCKS.Paragraph,
        children: [
          {
            text: 'Nice Paragraph',
            bold: true,
          },
        ],
      },
      {
        type: BLOCKS.Paragraph,
        children: [
          {
            text: 'Nice Paragraph',
            italic: true,
          },
        ],
      },
      {
        type: BLOCKS.Paragraph,
        children: [
          {
            text: 'Nice Paragraph',
            underline: true,
          },
        ],
      },
      {
        type: BLOCKS.Paragraph,
        children: [
          {
            text: 'Nice Paragraph',
            code: true,
          },
        ],
      },
    ];

    expect(convertDocumentToReactComponents(document)).toMatchSnapshot();
  });

  it('renders document with a custom node renderer', () => {
    const renderOptions = {
      node: {
        [BLOCKS.Paragraph]: (node: Block | Inline, nested: Nested) => (
          <div>{nested(node.children)}</div>
        ),
      },
    };

    const documents: Document[] = [
      [
        {
          type: BLOCKS.Paragraph,
          children: [
            {
              text: 'Nice Paragraph',
              bold: true,
            },
          ],
        },
      ],
      [
        {
          type: BLOCKS.Paragraph,
          children: [
            {
              text: 'Nice Paragraph',
              underline: true,
            },
          ],
        },
      ],
    ];

    documents.forEach(node => {
      expect(
        convertDocumentToReactComponents(node, renderOptions)
      ).toMatchSnapshot();
    });
  });

  it('renders document with a custom mark renderer', () => {
    const renderOptions = {
      mark: {
        [MARKS.Underline]: (text: string) => <strong>{text}</strong>,
      },
    };

    const document: Document = [
      {
        type: BLOCKS.Paragraph,
        children: [
          {
            text: 'Nice Paragraph',
            underline: true,
          },
        ],
      },
    ];

    expect(
      convertDocumentToReactComponents(document, renderOptions)
    ).toMatchSnapshot();
  });

  it('renders asset link', () => {
    const document = [
      {
        type: BLOCKS.Image,
        children: [
          {
            text: '',
          },
        ],
        target: {
          id: '070fec38-1038-4b2d-ae67-06208c2dee50',
          linkType: 'Asset',
          type: 'Link',
        },
      },
    ];

    expect(convertDocumentToReactComponents(document)).toMatchSnapshot();
  });

  it('renders link', () => {
    const document = [
      {
        type: BLOCKS.Paragraph,
        children: [
          {
            text: 'on this page: ',
          },
          {
            type: INLINES.Link,
            children: [
              {
                text: 'Google',
              },
            ],
            url: 'https://google.com',
          },
          {
            text: ' some text',
          },
        ],
      },
    ];

    expect(convertDocumentToReactComponents(document)).toMatchSnapshot();
  });

  it('renders bulleted list', () => {
    const document = [
      {
        type: BLOCKS.BulletedList,
        children: [
          {
            type: BLOCKS.ListItem,
            children: [
              {
                text: 'some text',
              },
            ],
          },
        ],
      },
    ];

    expect(convertDocumentToReactComponents(document)).toMatchSnapshot();
  });

  it('renders numbered list', () => {
    const document = [
      {
        type: BLOCKS.NumberedList,
        children: [
          {
            type: BLOCKS.ListItem,
            children: [
              {
                text: 'some text',
              },
            ],
          },
        ],
      },
    ];

    expect(convertDocumentToReactComponents(document)).toMatchSnapshot();
  });

  it('renders block quote', () => {
    const document = [
      {
        type: BLOCKS.Quote,
        children: [
          {
            text: 'some quote',
          },
        ],
      },
    ];

    expect(convertDocumentToReactComponents(document)).toMatchSnapshot();
  });
});
