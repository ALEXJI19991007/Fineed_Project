import { atom, selector } from 'recoil';

export const BarrageSnapShotSelector = selector({
    key: "barrageSnapShotSelector",
    get: async ({ get }) => {
      return []
    },
  });