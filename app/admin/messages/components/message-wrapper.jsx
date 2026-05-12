"use client";
import { useReducer } from "react";
import MessageContext from "./message-context";
import reducer, { initialState } from "./message-reducer";

function MessageWrapper({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<MessageContext.Provider value={{ state, dispatch }}>
			{children}
		</MessageContext.Provider>
	);
}

export default MessageWrapper;
