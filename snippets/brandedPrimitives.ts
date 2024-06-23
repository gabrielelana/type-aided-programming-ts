const __brand = Symbol("__brand");

type Brand<B> = { readonly [__brand]: B };

type Branded<T, B> = T & Brand<B>;

const makeBrand =
  <const B>(_b: B) =>
  <T>(t: T): Branded<T, B> =>
    t as unknown as Branded<T, B>;

type UserID = Branded<string, "UserID">;
const makeUserID = makeBrand("UserID");
type User = { id: UserID };

const user: User = { id: makeUserID("123") };

type CompanyID = Branded<string, "CompanyID">;
const makeCompanyID = makeBrand("CompanyID");
type Company = { id: CompanyID };

const company: Company = { id: makeCompanyID("123") };

function joinCompany(_user: UserID, _company: CompanyID): void {
  // irrelevant
}

joinCompany(user.id, company.id);

// @ts-expect-error Argument of type 'CompanyID' is not assignable to parameter of type 'UserID'
joinCompany(company.id, user.id);

console.log(user);
// {
//   "id": "123"
// }

console.log(company);
// {
//   "id": "123"
// }
