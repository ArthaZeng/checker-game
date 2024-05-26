export type BoardObserver =
  | [
      (count: number) => void,
      (checkers: number[]) => void,
      (checkers: number[]) => void
    ]
  | null;
