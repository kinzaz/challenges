type Unshift<T extends Array<unknown>, U extends unknown> = [U, ...T];

type Result = Unshift<[1, 2], 0>; // [0, 1, 2]

export {};
