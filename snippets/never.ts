// @ts-expect-error only never can be assigned to never
const x: never = null;

// never can be assigned to eveyrhing
// ...but you have to cheat to create a value of type never
const y: string = undefined as never;

export { x, y };
