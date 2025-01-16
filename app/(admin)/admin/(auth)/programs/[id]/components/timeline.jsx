import { Suspense } from "react";
import TimelineContainer from "./timeline-container";
import TimelineForm from "./timeline-form";
import TimelineLoading from "./timeline-loader";

function TimelineDisplay({ id }) {
	return (
		<>
			<TimelineForm id={id} />
			<div className="divider mt-10">Summary</div>
			<Suspense fallback={<TimelineLoading />}>
				<TimelineContainer id={id} />
			</Suspense>
		</>
	);
}

export default TimelineDisplay;
