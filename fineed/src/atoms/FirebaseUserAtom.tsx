import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: sessionStorage,
});

export const curUserUidAtom = atom({
  key: "curUserUidAtom",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// export const curUsernameAtom = atom({
//   key: "curUsernameAtom",
//   default: "",
//   effects_UNSTABLE: [persistAtom],
// })