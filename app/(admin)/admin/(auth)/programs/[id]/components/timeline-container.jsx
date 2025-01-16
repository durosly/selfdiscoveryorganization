import TimelineModel from "@/models/timeline";
import TimelineItem from "./timeline-item";

async function TimelineContainer({ id }) {
	const list = await TimelineModel.find({ program_id: id });
	return (
		<>
			{!list || list.length === 0 ? (
				<div className="text-center">No timeline yet</div>
			) : (
				<div className="-my-6">
					{list.map((item) => (
						<TimelineItem
							timeline={item}
							key={item._id}
						/>
					))}
				</div>
			)}
		</>
	);
}

export default TimelineContainer;
