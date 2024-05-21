import { SIZE } from "./constants.ts";

export const getPosition = (point: number) => {
    // [x, y]
    return [point % SIZE, Math.floor(point / SIZE)];
}