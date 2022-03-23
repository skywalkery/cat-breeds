declare type Await<P> = P extends Promise<infer A> ? A : P;
declare type Optional<P> = P | null;
declare type Consumer<P> = (arg: P) => {};

declare const VERSION: string;
