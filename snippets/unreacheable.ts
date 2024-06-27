const companies = ["Google", "Facebook", "Apple"] as const;

type Companies = (typeof companies)[number];

function unreacheable(_: never): never {
  throw new Error("unreacheable");
}

declare const x: Companies;

switch (x) {
  case "Google":
    // do something
    break;
  case "Apple":
    // do something
    break;
  case "Facebook":
    // do something
    break;
  default:
    unreacheable(x);
}

switch (x) {
  case "Google":
    // do something
    break;
  case "Apple":
    // do something
    break;
  default:
    // @ts-expect-error Argument of type `"Facebook"` is not assignable to type `never`
    unreacheable(x);
}
