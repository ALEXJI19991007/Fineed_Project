import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "userInfo-persist",
  storage: sessionStorage,
});

export type userInfoAtom = {
  username: string,
  lastName: string,
  firstName: string,
  email: string,
  favorite: string[];
  history: string[];
  verified: boolean;
};

const emptyList: string[] = [];
export const curUserInfoAtom = atom({
  key: "curUserInfoAtom",
  default: {
    username: "",
    lastName: "",
    firstName: "",
    email: "",
    favorite: emptyList,
    history: emptyList,
    verified: false,
  },
  effects_UNSTABLE: [persistAtom],
});
