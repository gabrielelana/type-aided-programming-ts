type SomeTuple = ["Bob", 28];

type Name = SomeTuple[0]; // "Bob"
type Age = SomeTuple[1]; // 28
type NameOrAge = SomeTuple[0 | 1]; // => "Bob" | 28
type Values = SomeTuple[number]; // "Bob" | 28 | true

// Can be concatenated
type Tuple1 = [4, 5];
type Tuple2 = [1, 2, 3, ...Tuple1]; // [1, 2, 3, 4, 5]
type Tuple3 = [...Tuple1, ...Tuple2]; // [4, 5, 1, 2, 3, 4, 5]

export { SomeTuple, Name, Age, NameOrAge, Values, Tuple1, Tuple2, Tuple3 };
