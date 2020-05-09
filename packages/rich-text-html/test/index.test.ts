import {
  BLOCKS,
  Document,
  Block,
  Inline,
  MARKS,
  INLINES,
} from '@plateo/rich-text-types';

import { convertDocumentToHtmlString, Nested } from '../src/index';

describe('convertDocumentToHtmlString', () => {
  it('returns empty string when given an empty document', () => {
    const document: unknown = [];

    expect(convertDocumentToHtmlString(document as Document)).toEqual('');
  });

  it('can handle undefined documents', () => {
    const document: unknown = undefined;
    expect(convertDocumentToHtmlString(document as Document)).toEqual('');
  });

  it('can handle empty documents', () => {
    const document: unknown = {};
    expect(convertDocumentToHtmlString(document as Document)).toEqual('');
  });

  it('renders document with default node renderer', () => {
    const document: Array<{ node: Document; expected: string }> = [
      {
        node: [
          {
            type: BLOCKS.HeadingOne,
            children: [
              {
                text: 'I work',
              },
            ],
          },
        ],
        expected: `<h1>I work</h1>`,
      },
      {
        node: [
          {
            type: BLOCKS.Paragraph,
            children: [
              {
                text: 'Nice Paragraph',
              },
            ],
          },
        ],
        expected: `<p>Nice Paragraph</p>`,
      },
    ];

    document.forEach(({ node, expected }) => {
      expect(convertDocumentToHtmlString(node)).toEqual(expected);
    });
  });

  it('renders document with default mark renderer', () => {
    const document: Array<{ node: Document; expected: string }> = [
      {
        node: [
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
        expected: `<p><strong>Nice Paragraph</strong></p>`,
      },
      {
        node: [
          {
            type: BLOCKS.Paragraph,
            children: [
              {
                text: 'Nice Paragraph',
                italic: true,
              },
            ],
          },
        ],
        expected: `<p><i>Nice Paragraph</i></p>`,
      },
      {
        node: [
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
        expected: `<p><u>Nice Paragraph</u></p>`,
      },
      {
        node: [
          {
            type: BLOCKS.Paragraph,
            children: [
              {
                text: 'Nice Paragraph',
                code: true,
              },
            ],
          },
        ],
        expected: `<p><code>Nice Paragraph</code></p>`,
      },
    ];

    document.forEach(({ node, expected }) => {
      expect(convertDocumentToHtmlString(node)).toEqual(expected);
    });
  });

  it('renders document with a custom node renderer', () => {
    const renderOptions = {
      node: {
        [BLOCKS.Paragraph]: (node: Block | Inline, nestedNodes: Nested) =>
          `<div>${nestedNodes(node.children)}</div>`,
      },
    };

    const document: Array<{ node: Document; expected: string }> = [
      {
        node: [
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
        expected: `<div><strong>Nice Paragraph</strong></div>`,
      },
    ];

    document.forEach(({ node, expected }) => {
      expect(convertDocumentToHtmlString(node, renderOptions)).toEqual(
        expected
      );
    });
  });

  it('renders document with a custom mark renderer', () => {
    const renderOptions = {
      mark: {
        [MARKS.Underline]: (text: string) => `<strong>${text}</strong>`,
      },
    };

    const document: Array<{ node: Document; expected: string }> = [
      {
        node: [
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
        expected: `<p><strong>Nice Paragraph</strong></p>`,
      },
    ];

    document.forEach(({ node, expected }) => {
      expect(convertDocumentToHtmlString(node, renderOptions)).toEqual(
        expected
      );
    });
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
    const expected = `<span>${BLOCKS.Image} id: 070fec38-1038-4b2d-ae67-06208c2dee50</span>`;

    expect(convertDocumentToHtmlString(document)).toEqual(expected);
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
    const expected = `<p>on this page: <a href="https://google.com">Google</a> some text</p>`;

    expect(convertDocumentToHtmlString(document)).toEqual(expected);
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
    const expected = `<ul><li>some text</li></ul>`;

    expect(convertDocumentToHtmlString(document)).toEqual(expected);
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
    const expected = `<ol><li>some text</li></ol>`;

    expect(convertDocumentToHtmlString(document)).toEqual(expected);
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
    const expected = `<blockquote>some quote</blockquote>`;

    expect(convertDocumentToHtmlString(document)).toEqual(expected);
  });
});
