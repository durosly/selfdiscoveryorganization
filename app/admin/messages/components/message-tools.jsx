"use client";
import {
	LuChevronLeft,
	LuChevronRight,
	LuMailOpen,
	LuRotateCw,
	LuTrash2,
} from "react-icons/lu";
import MessageContext from "./message-context";
import { useContext, useState } from "react";
import loadData from "./data-loader";
import deleteMessage from "./delete-request";
import toast from "react-hot-toast";
import markMessagesAsRead from "./read-request";

function MessageTools() {
	const { state, dispatch } = useContext(MessageContext);

	const [isDeleting, setIsDeleting] = useState(false);
	const [isMarking, setIsMarking] = useState(false);

	async function getData(current) {
		const res = await loadData(current, state.search);
		dispatch({ type: "LOADING" });
		if (res.status) {
			dispatch({ type: "LOAD_ITEMS", data: res.data });
		} else {
			dispatch({ type: "ERROR", data: res.data.message });
		}
	}

	async function markMessage() {
		if (isMarking) return;
		setIsMarking(true);
		const toastId = toast.loading("Marking as read...");
		try {
			const res = await markMessagesAsRead(state.mark);
			if (res.status) {
				toast.success("Done", { id: toastId });
				getData(state.page);
				dispatch({ type: "EMPTY_MARK" });
			} else {
				throw new Error(res.message);
			}
		} catch (error) {
			toast.error(error.message, { id: toastId });
		} finally {
			setIsMarking(false);
		}
	}

	async function deleteItem() {
		if (isDeleting) return;
		setIsDeleting(true);
		const toastId = toast.loading("Deleting");
		try {
			const res = await deleteMessage(state.mark);
			if (res.status) {
				toast.success("Done", { id: toastId });
				getData(state.page);
				dispatch({ type: "EMPTY_MARK" });
			} else {
				throw new Error(res.message);
			}
		} catch (error) {
			toast.error(error.message, { id: toastId });
		} finally {
			setIsDeleting(false);
		}
	}

	return (
		<>
			<div className="flex flex-wrap justify-between items-center mt-5">
				<div className="flex items-center gap-1">
					<input
						className="checkbox checkbox-sm"
						type="checkbox"
						name="mark-all"
						id="mark-all"
						checked={
							state.mark.length !== 0 &&
							state.mark.length === state.data.length
						}
						onChange={() => dispatch({ type: "MARK_ALL" })}
					/>
					<button
						title="Refresh messages"
						className="btn btn-ghost btn-sm"
						onClick={() => getData(state.page)}
					>
						<LuRotateCw />
					</button>
					{state.mark.length > 0 && (
						<>
							<button
								title="Delete selected messages"
								className="btn btn-ghost btn-sm"
								onClick={deleteItem}
								disabled={isDeleting}
							>
								<LuTrash2 />
							</button>
							<button
								title="Mark as open"
								className="btn btn-ghost btn-sm"
								onClick={markMessage}
								disabled={isMarking}
							>
								<LuMailOpen />
							</button>
						</>
					)}
				</div>
				<div className="flex gap-5 items-center">
					<p className="text-sm text-slate-500">
						{state.page} of {state.totalPages}
					</p>
					<div>
						<button
							disabled={!state.hasPrevPage}
							className="btn btn-sm btn-ghost"
							onClick={() => getData(state.prevPage)}
						>
							<LuChevronLeft />
						</button>
						<button
							disabled={!state.hasNextPage}
							className="btn btn-sm btn-ghost"
							onClick={() => getData(state.nextPage)}
						>
							<LuChevronRight />
						</button>
					</div>
				</div>
			</div>
			{state.isLoading && (
				<div className="text-center space-y-4 mt-12">
					{new Array(8).fill(4).map((_, i) => (
						<div
							key={i}
							className="bg-base-200 animate-pulse"
						>
							&nbsp;
						</div>
					))}
				</div>
			)}
		</>
	);
}

export default MessageTools;
