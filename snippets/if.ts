type If<C, X, Y> = C extends true ? X : Y;

type X = If<true, number, string>; // number
type Y = If<false, number, string>; // string
type Z = If<boolean, number, string>; // string | number

// Exercise: change the `If` defintion so that the following line will give a
// type error because we want to accept only booleans as first type parameter.
type W = If<[], number, string>; // string

export { X, Y, Z, W };
