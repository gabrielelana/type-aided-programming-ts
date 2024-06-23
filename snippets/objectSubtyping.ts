type FirstName = { firstName: string };
type LastName = { lastName: string };

type AllOf = FirstName & LastName;
type OneOf = FirstName | LastName;

const r01: AllOf = { firstName: "Gabriele", lastName: "Lana" };

const r02: OneOf = { firstName: "Gabriele" };
const r03: OneOf = { lastName: "Lana" };

// FirstName & LastName is subtype of FirstName | LastName
const r04: OneOf = r01;
// FirstName & LastName is subtype of FristName
const r05: FirstName = r01;
// FirstName & LastName is subtype of LastName
const r06: LastName = r01;

export { r02, r03, r04, r05, r06 };
