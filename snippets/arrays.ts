type Tags = string[];

type User = { firstName: string; lastName: string };
type Users = Array<User>; // same as `User[]`

type Bits = (0 | 1)[];

type Content = Tags[number]; // string

export { Tags, Users, Bits, Content };
