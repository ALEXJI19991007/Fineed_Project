import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "userInfo-persist",
  storage: sessionStorage,
});

const emptyList: string[] = [];
const emptyJson = {};
export const curUserInfoAtom = atom({
  key: "curUserInfoAtom",
  default: {
    username: "",
    lastName: "",
    firstName: "",
    email: "",
    favorite: emptyList,
    history: emptyList,
    subscription: emptyJson,
    verified: false,
  },
  effects_UNSTABLE: [persistAtom],
});
