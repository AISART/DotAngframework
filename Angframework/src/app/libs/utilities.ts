/**
 *
 */
export function NotDefined(value: any) {
    return typeof value === 'undefined';
}

/**
 *
 */
export function Defined(value: any) {
    return !NotDefined(value);
}
