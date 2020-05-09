import escapeHtml from 'escape-html';

import {
  Block,
  BLOCKS,
  Document,
  Text,
  Inline,
  INLINES,
  MARKS,
  Link,
  Image,
} from '@plateo/rich-text-types';

import { isText } from './utils';

/**
 * Union type of the different types
 */
export type NodeElement = Text | Block | Inline;

export interface Nested {
  (nodes: NodeElement[]): string;
}

export interface Renderer {
  (node: Block | Inline, nested: Nested): string;
}

export interface NodeRenderer {
  [key: string]: Renderer;
}

export interface MarkRenderer {
  [key: string]: (text: string) => string;
}

export interface RenderOptions {
  /**
   * Node renderers
   */
  node?: NodeRenderer;
  /**
   * Mark renderers
   */
  mark?: MarkRenderer;
}

interface Renderers {
  node: NodeRenderer;
  mark: MarkRenderer;
}

const defaultNodeRenderer: NodeRenderer = {
  [BLOCKS.Paragraph]: (node, nested) => {
    return `<p>${nested(node.children)}</p>`;
  },
  [BLOCKS.HeadingOne]: (node, nested) => {
    return `<h1>${nested(node.children)}</h1>`;
  },
  [BLOCKS.HeadingTwo]: (node, nested) => {
    return `<h2>${nested(node.children)}</h2>`;
  },
  [BLOCKS.HeadingThree]: (node, nested) => {
    return `<h3>${nested(node.children)}</h3>`;
  },
  [BLOCKS.HeadingFour]: (node, nested) => {
    return `<h4>${nested(node.children)}</h4>`;
  },
  [BLOCKS.HeadingFive]: (node, nested) => {
    return `<h5>${nested(node.children)}</h5>`;
  },
  [BLOCKS.HeadingSix]: (node, nested) => {
    return `<h6>${nested(node.children)}</h6>`;
  },
  [BLOCKS.BulletedList]: (node, nested) => {
    return `<ul>${nested(node.children)}</ul>`;
  },
  [BLOCKS.NumberedList]: (node, nested) => {
    return `<ol>${nested(node.children)}</ol>`;
  },
  [BLOCKS.ListItem]: (node, nested) => {
    return `<li>${nested(node.children)}</li>`;
  },
  [BLOCKS.Quote]: (node, nested) => {
    return `<blockquote>${nested(node.children)}</blockquote>`;
  },
  [BLOCKS.Image]: node => {
    return imageBlock(node as Image);
  },
  [INLINES.Link]: (node, nested) => {
    return inlineLink(node as Link, nested);
  },
};

const defaultMarkRenderer: MarkRenderer = {
  [MARKS.Bold]: text => `<strong>${text}</strong>`,
  [MARKS.Italic]: text => `<i>${text}</i>`,
  [MARKS.Underline]: text => `<u>${text}</u>`,
  [MARKS.Code]: text => `<code>${text}</code>`,
};

function imageBlock(node: Image) {
  return `<span>${node.type} id: ${node.target.id}</span>`;
}

function inlineLink(node: Link, nested: Nested) {
  return `<a href="${escapeHtml(node.url)}">${nested(node.children)}</a>`;
}

// TODO: Support multiple marks on a single text block.
function renderText(node: Text, mark: MarkRenderer) {
  const textValue = escapeHtml(node.text);
  let value = textValue;

  if (node.bold) {
    value = mark[MARKS.Bold](textValue);
  }

  if (node.italic) {
    value = mark[MARKS.Italic](textValue);
  }

  if (node.underline) {
    value = mark[MARKS.Underline](textValue);
  }

  if (node.code) {
    value = mark[MARKS.Code](textValue);
  }

  return value;
}

function serializeRichText(node: NodeElement, renderers: Renderers) {
  if (isText(node)) {
    return renderText(node, renderers.mark);
  }

  const nested: Nested = nodes => {
    return nodesToHtmlString(nodes, renderers);
  };

  if (!node.type || !renderers.node[node.type]) {
    return '';
  }

  return renderers.node[node.type](node, nested);
}

function nodesToHtmlString(nodes: NodeElement[], renderers: Renderers): string {
  return nodes
    .map((node: NodeElement) => serializeRichText(node, renderers))
    .join('');
}

/**
 * Serialize a Plateo Rich Text Document into an html string.
 */
export function convertDocumentToHtmlString(
  richTextJSON: Document,
  renderOptions: RenderOptions = {}
) {
  if (!richTextJSON || !Array.isArray(richTextJSON)) {
    return '';
  }

  return nodesToHtmlString(richTextJSON, {
    node: {
      ...defaultNodeRenderer,
      ...renderOptions.node,
    },
    mark: {
      ...defaultMarkRenderer,
      ...renderOptions.mark,
    },
  });
}
