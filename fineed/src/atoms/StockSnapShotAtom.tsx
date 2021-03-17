import { atom, selector } from "recoil";

export type StockData = {
    price:number,
    time:number,
}

export const StockSnapShotAtom = atom<StockData[]>({
  key: "StockSnapShotAtom",
  default: [],
});
