import { atom, selector } from "recoil";

export type Barrage = {
  uid: string;
  content: string;
  NBImgUrl: string | null;
  NBTitle: string | null;
  NBcontent: string | null;
  time: number;
  tag: string;
  userName: string;
};

export const BarrageSnapShotAtom = atom<Barrage[]>({
  key: "BarrageSnapShotAtom",
  default: [],
});
