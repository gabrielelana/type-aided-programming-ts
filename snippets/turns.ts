type Turns = "left" | "right";
type Directions = "up" | "down" | "left" | "right";

// Directions is a subtype of Turns
const t: Turns = "left";
const d: Directions = t;
