import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const curUserUidAtom = atom({
  key: "curUserUidAtom",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const curUsernameAtom = atom({
  key: "curUsernameAtom",
  default: "",
  effects_UNSTABLE: [persistAtom],
})