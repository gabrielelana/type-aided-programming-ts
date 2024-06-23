type User = { name: string; age: number; isAdmin: boolean };

type Age = User["age"]; // => number
type Role = User["isAdmin"]; // => boolean

type NameOrAge = User["name" | "age"]; // => string | number

type Keys = keyof User; // "name" | "age" | "isAdmin"

type Values = User[keyof User]; // string | number | boolean

export { Age, Role, NameOrAge, Keys, Values };
