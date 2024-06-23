class Foo {
  constructor(public readonly id: string) {}
}

class Bar {
  constructor(public readonly id: string) {}
}

// Probably not what you want
const x: Bar = new Foo("123");

export { x };
