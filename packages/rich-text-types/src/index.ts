/**
 * Map of all Plate Rich Text Blocks.
 */
export enum BLOCKS {
  Paragraph = 'paragraph',

  HeadingOne = 'heading-one',
  HeadingTwo = 'heading-two',
  HeadingThree = 'heading-three',
  HeadingFour = 'heading-four',
  HeadingFive = 'heading-five',
  HeadingSix = 'heading-six',

  BulletedList = 'bulleted-list',
  NumberedList = 'numbered-list',
  ListItem = 'list-item',

  Quote = 'quote',

  Image = 'image',
}

/**
 * Map of all Plateo Rich Text Inlines.
 */
export enum INLINES {
  Link = 'link',
}

/**
 * Map of all Plateo Rich Text Marks.
 */
export enum MARKS {
  Bold = 'bold',
  Italic = 'italic',
  Underline = 'underline',
  Code = 'code',
}

/**
 * Element are a type af Nodes in a Plateo document. Element can contain other nodes
 * or text nodes. Element nodes can either be `Blocks` or `Inlines`.
 */
export interface Element {
  children: Array<Text | Block | Inline>;
}

/**
 * Text represent the node that can contain actual text along with formatting properties like bold, underline etc.
 */
export interface Text {
  text: string;
  [MARKS.Bold]?: boolean;
  [MARKS.Italic]?: boolean;
  [MARKS.Underline]?: boolean;
  [MARKS.Code]?: boolean;
}

export interface Block extends Element {
  type: BLOCKS;
}

export interface Inline extends Element {
  type: INLINES;
}

export type Document = Array<Text | Block | Inline>;

export interface Paragraph extends Block {
  type: BLOCKS.Paragraph;
}

export interface HeadingOne extends Block {
  type: BLOCKS.HeadingOne;
}

export interface HeadingTwo extends Block {
  type: BLOCKS.HeadingTwo;
}

export interface HeadingThree extends Block {
  type: BLOCKS.HeadingThree;
}

export interface HeadingFour extends Block {
  type: BLOCKS.HeadingFour;
}

export interface HeadingFive extends Block {
  type: BLOCKS.HeadingFive;
}

export interface HeadingSix extends Block {
  type: BLOCKS.HeadingSix;
}

export interface BulletedList extends Block {
  type: BLOCKS.BulletedList;
}

export interface NumberedList extends Block {
  type: BLOCKS.NumberedList;
}

export interface ListItem extends Block {
  type: BLOCKS.ListItem;
}

export interface Image extends Block {
  type: BLOCKS.Image;
  target: {
    id: string;
    linkType: 'Asset';
    type: 'Link';
  };
  children: Text[];
}

export interface Link extends Inline {
  type: INLINES.Link;
  url: string;
  children: Text[];
}
