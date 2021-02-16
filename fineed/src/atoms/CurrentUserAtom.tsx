import { atom, RecoilState } from "recoil";

// haven't decided yet
type User ={
    name: string
}

export const currentUserAtom: RecoilState<User|any> = atom({
    key: "currentUserAtom",
    default: null,
  });