type Block<B extends string> = `${B}`;
type Element<E extends string[]> = E[number] extends never
  ? ``
  : `__${E[number]}`;
type Modifier<M extends string[]> = M[number] extends never
  ? ``
  : `--${M[number]}`;

type BEM<
  B extends string,
  E extends string[],
  M extends string[]
> = `${Block<B>}${Element<E>}${Modifier<M>}`;

type test = BEM<"dfwfds", ["dfsds", "dsds"], ["qwqqw", "wqwq"]>;

export {};
