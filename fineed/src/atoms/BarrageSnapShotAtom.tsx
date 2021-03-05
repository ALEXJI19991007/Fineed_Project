import { atom, selector } from 'recoil';

export type Barrage = {
    uid: string,
    content: string,
    time: number,
    tag: string
}


export const BarrageSnapShotAtom = atom<Barrage[]>({
    key: 'BarrageSnapShotAtom',
    default: []
  });