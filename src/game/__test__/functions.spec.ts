import { getChessBoardIndex } from "../../common/functions";
import { canMoveBlackChecker } from "../functions";

describe("canMoveBlackChecker", () => {
  let blackChecker;
  let blackCheckers;

  beforeAll(() => {
    blackChecker = [3, 2];
    blackCheckers = [getChessBoardIndex(blackChecker)];
  });

  it("square is on the left top corner", () => {
    expect(
      canMoveBlackChecker({
        from: [2, 1],
        to: blackChecker,
        whiteCheckers: [],
        blackCheckers,
      })
    ).toStrictEqual({ ableToMove: true, enemies: [] });
  });

  it("it cannot eat enemy if there is empty space between enemy and moving item", () => {
    expect(
      canMoveBlackChecker({
        from: [1, 0],
        to: [4, 3],
        whiteCheckers: [2, 1],
        blackCheckers: [getChessBoardIndex([4, 3])],
      })
    ).toStrictEqual({ ableToMove: false, enemies: [] });
  });

  it("square is on the left bottom corner", () => {
    expect(
      canMoveBlackChecker({
        from: [4, 1],
        to: blackChecker,
        whiteCheckers: [],
        blackCheckers,
      })
    ).toStrictEqual({ ableToMove: true, enemies: [] });
  });

  it("square cannot reach corner because there are 2 empty spaces", () => {
    expect(
      canMoveBlackChecker({
        from: [1, 5],
        to: blackChecker,
        whiteCheckers: [],
        blackCheckers,
      })
    ).toStrictEqual({ ableToMove: false, enemies: [] });
  });

  it("the space needs to jump over 1 white space to reach target - from right bottom", () => {
    const whiteCheckerIndex = getChessBoardIndex([4, 3]);
    expect(
      canMoveBlackChecker({
        from: [5, 4],
        to: blackChecker,
        whiteCheckers: [whiteCheckerIndex],
        blackCheckers,
      })
    ).toStrictEqual({ ableToMove: true, enemies: [whiteCheckerIndex] });
  });

  it("the space needs to jump over 1 white space to reach target - from left top", () => {
    const whiteCheckerIndex = getChessBoardIndex([2, 1]);
    expect(
      canMoveBlackChecker({
        from: [1, 0],
        to: blackChecker,
        whiteCheckers: [whiteCheckerIndex],
        blackCheckers,
      })
    ).toStrictEqual({ ableToMove: true, enemies: [whiteCheckerIndex] });
  });

  it("the space needs to jump over multiple white space to reach target", () => {
    const whiteCheckerIndex1 = getChessBoardIndex([4, 3]);
    const whiteCheckerIndex2 = getChessBoardIndex([6, 5]);
    const whiteCheckerIndex3 = getChessBoardIndex([6, 1]);
    expect(
      canMoveBlackChecker({
        from: [7, 6],
        to: blackChecker,
        whiteCheckers: [
          whiteCheckerIndex1,
          whiteCheckerIndex2,
          whiteCheckerIndex3,
        ],
        blackCheckers,
      })
    ).toStrictEqual({
      ableToMove: true,
      enemies: [whiteCheckerIndex2, whiteCheckerIndex1],
    });
  });

  it("more checkers on the board", () => {
    const boardMap = new Map();
    expect(
      canMoveBlackChecker({
        from: [2, 3],
        to: [4, 5],
        whiteCheckers: [1, 3, 5, 7, 8, 10, 12, 14, 17, 23, 28, 26],
        blackCheckers: [40, 46, 49, 51, 53, 55, 56, 58, 60, 62, 37, 35],
        boardMap,
      })
    ).toStrictEqual({
      ableToMove: true,
      enemies: [getChessBoardIndex([3, 4])],
    });
  });
});
