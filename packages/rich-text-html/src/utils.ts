import { Text } from '@plateo/rich-text-types';

export function isObject(val: any) {
  return val && typeof val === 'object';
}

export function isText(value: any): value is Text {
  return isObject(value) && typeof value.text === 'string';
}
