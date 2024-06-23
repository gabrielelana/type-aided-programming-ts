type IsTrue<X> = X extends true ? true : false;

type X = IsTrue<true>; // true
type Y = IsTrue<false>; // false
type Z = IsTrue<number>; // false
type W = IsTrue<never>; // never, why?

export { X, Y, Z, W };
