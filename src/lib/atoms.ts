import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface Todo {
    id: string;
    date: string;
    content: string;
    completed: boolean;
}

export const todosState = atom<Todo[]>({
    key: "todosState",
    default: [],
    effects_UNSTABLE: [persistAtom],
});
