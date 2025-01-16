"use client";
import { useContext, useEffect } from "react";
import MessageContext from "./message-context";
import loadData from "./data-loader";
import { DateTime } from "luxon";
import Link from "next/link";
import { LuEye } from "react-icons/lu";

function MessageList() {
	const { state, dispatch } = useContext(MessageContext);

	useEffect(() => {
		async function getData() {
			const res = await loadData();
			dispatch({ type: "LOADING" });
			if (res.status) {
				dispatch({ type: "LOAD_ITEMS", data: res.data });
			} else {
				dispatch({ type: "ERROR", data: res.data.message });
			}
		}

		getData();
	}, []);

	return (
		<tbody>
			{/* row 1 */}
			{/* {state.isLoading ? (
				<tr colSpan={5}>
					<span className="loading loading-dots"></span>
				</tr>
			) : state.data.length > 0 ? (
				
			) : (
				<tr colSpan={5}>No Messages</tr>
			)} */}

			{state.data.map((d) => (
				<tr key={d._id}>
					<td>
						<input
							type="checkbox"
							name="mark"
							id="mark"
							className="checkbox"
							checked={state?.mark?.includes(d._id)}
							onChange={() =>
								dispatch({ type: "MARK", data: d._id })
							}
						/>
					</td>
					<td>
						{!d.read && (
							<span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
						)}
						{d.name}
					</td>
					<td className="truncate">{d.email}</td>
					<td>
						{DateTime.fromISO(d.created_at).toLocaleString(
							DateTime.DATETIME_MED
						)}
					</td>
					<td>
						<Link
							className="btn btn-sm btn-primary"
							href={`/admin/messages/${d._id}`}
						>
							<LuEye />
						</Link>
					</td>
				</tr>
			))}
		</tbody>
	);
}

export default MessageList;
