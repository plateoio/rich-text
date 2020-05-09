import * as React from 'react';
import { Text } from '@plateo/rich-text-types';

export function isObject(val: any) {
  return val && typeof val === 'object';
}

export function isText(value: any): value is Text {
  return isObject(value) && typeof value.text === 'string';
}

export function addKeyToElement(element: React.ReactNode, key: number) {
  if (React.isValidElement(element) && element.key === null) {
    return React.cloneElement(element, { key });
  }

  return element;
}
