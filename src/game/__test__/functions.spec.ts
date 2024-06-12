import { getChessBoardIndex } from "../../common/functions";
import { findAvailableSpots, findEnemiesPath } from "../functions";

// describe("canMoveBlackChecker", () => {
//   let blackChecker;
//   let blackCheckers;

//   beforeAll(() => {
//     blackChecker = [3, 2];
//     blackCheckers = [getChessBoardIndex(blackChecker)];
//   });

//   it("square is on the left top corner", () => {});

//   it("it cannot eat enemy if there is empty space between enemy and moving item", () => {});

//   it("square is on the left bottom corner", () => {});

//   it("square cannot reach corner because there are 2 empty spaces", () => {});

//   it("the space needs to jump over 1 white space to reach target - from right bottom", () => {});

//   it("the space needs to jump over 1 white space to reach target - from left top", () => {});

//   it("the space needs to jump over multiple white space to reach target", () => {});

//   it("more checkers on the board", () => {});
// });

describe("findAvailableSpots", () => {
  const whiteCheckers = [1, 3, 5, 7, 8, 10, 12, 17, 19, 23, 37, 21];
  const blackCheckers = [40, 44, 49, 51, 55, 56, 58, 60, 62, 35, 39, 46];
  it("find an enemy path during multiple white checkers and black checkers - 2 enemies", () => {
    const result = findAvailableSpots({
      to: 46,
      whiteCheckers,
      blackCheckers,
      upgraded: true,
    });
    console.log(result);
    expect(result).toStrictEqual([46, 37, 28, 21, 14]);
  });

  it("find an enemy path during multiple white checkers and black checkers - 1 enemy", () => {
    const result = findAvailableSpots({
      to: 44,
      whiteCheckers,
      blackCheckers,
      upgraded: true,
    });
    console.log(result);
    expect(result).toStrictEqual([44, 37, 30]);
  });

  it("find an enemy path during multiple white checkers and black checkers - no enemy", () => {
    const result = findAvailableSpots({
      to: 40,
      whiteCheckers,
      blackCheckers,
      upgraded: true,
    });
    console.log(result);
    expect(result).toStrictEqual([33]);
  });
});

describe("findEnemiesPath", () => {
  const whiteCheckers = [1, 3, 5, 7, 8, 10, 12, 17, 19, 23, 37, 21];
  const blackCheckers = [40, 44, 49, 51, 55, 56, 58, 60, 62, 35, 39, 46];

  it("find an enemy path during multiple white checkers and black checkers", () => {
    const result = findEnemiesPath({
      whiteCheckers,
      blackCheckers,
      path: [46, 37, 28],
    });
    console.log(result);
    expect(result).toStrictEqual([46, 37, 28, 21, 14]);
  });
});
