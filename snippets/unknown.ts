declare const x: unknown;

// @ts-expect-error `unknown` cannot be assigned to type `string` (downcast)
const y: string = x;

const z: unknown = "anything";
