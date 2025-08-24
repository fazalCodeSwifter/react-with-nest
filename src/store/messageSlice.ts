import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IMessage {
    id: number;
    senderId: number;
    reciverId: number;
    message: string;
}

export interface IMessages {
    messages: IMessage[];
}

const initialState: IMessages = {
    messages: []
}

const messageSlice = createSlice({

    name: "messages",
    initialState,
    reducers: {
        setMessages: (state, actions: PayloadAction<IMessage[]>) => {
            state.messages = actions.payload
        },
        addMessage: (state, action:PayloadAction<IMessage>) => {
            state.messages.push(action.payload)
        }
    }
});

export const { setMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;