import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "userInfo-persist",
  storage: sessionStorage,
});

export const curUserInfoAtom = atom({
  key: "curUserInfoAtom",
  default: {
    username: "",
    lastName: "",
    firstName: "",
    email: "",
  },
  effects_UNSTABLE: [persistAtom],
});
