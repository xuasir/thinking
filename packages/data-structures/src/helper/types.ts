export enum Compare {
  EQUAL = 'equal',
  LARGE = 'large',
  SMALL = 'small'
}
export type CompareFn<T> = (l: T, r: T) => 'equal' | 'large' | 'small'
