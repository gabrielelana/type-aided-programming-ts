declare const x: unknown;

// @ts-expect-error
const y: string = x;

const z: unknown = "anything";
