import {
	LuChevronLeft,
	LuChevronRight,
	LuMailOpen,
	LuTrash2,
} from "react-icons/lu";
import MessageWrapper from "./components/message-wrapper";
import MessageList from "./components/message-list";
import MessageTools from "./components/message-tools";

function AdminMessages() {
	return (
		<>
			<div>
				<h1 className="text-2xl font-bold mb-2">Messages</h1>
			</div>
			<form action="/search">
				<div className="form-control max-[350px]:flex-col flex-row ">
					<input
						type="search"
						name="search"
						id="search"
						className="input input-bordered input-sm sm:input-md"
					/>
					<button className="btn btn-primary btn-sm sm:btn-md">
						Search
					</button>
				</div>
			</form>
			<MessageWrapper>
				<div className="">
					<MessageTools />
					<div className="overflow-x-auto mt-10">
						<table className="table table-xs sm:table-md min-w-[500px]">
							{/* head */}
							<thead className="hidden">
								<tr>
									<th></th>
									<th>Name</th>
									<th>Email</th>
									<td>Date/time</td>
									<th></th>
								</tr>
							</thead>
							<MessageList />
						</table>
					</div>
				</div>
			</MessageWrapper>
		</>
	);
}

export default AdminMessages;
