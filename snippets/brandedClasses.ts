class Foo {
  private readonly __brand = "Foo";
  constructor(public readonly id: string) {}
}

class Bar {
  private readonly __brand = "Bar";
  constructor(public readonly id: string) {}
}

// @ts-expect-error type Foo is not assignable to type Bar
const x: Bar = new Foo("123");

export { x };
