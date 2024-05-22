import { SIZE } from "./constants.ts";

export const getPosition = (point: number): [number, number] => {
    // [x, y]
    return [Math.floor(point / SIZE), point % SIZE];
}