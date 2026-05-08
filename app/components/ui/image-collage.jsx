import { cn } from "@/lib/utils";
import roundImg from "@/public/images/banner-round.png";
import Image from "next/image";

function ImageCollage({
	primarySrc,
	secondarySrc,
	primaryAlt = "",
	secondaryAlt = "",
	className,
	withSpinner = true,
}) {
	return (
		<div className={cn("relative w-full max-w-md mx-auto", className)}>
			<div className="relative">
				<div className="relative overflow-hidden w-full rounded-full aspect-square ring-8 ring-base-200/60">
					<Image
						fill
						src={primarySrc}
						alt={primaryAlt}
						className="object-cover"
						sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 90vw"
					/>
				</div>
				{secondarySrc ? (
					<div className="absolute w-2/5 aspect-square rounded-full border-4 border-base-100 overflow-hidden bottom-0 right-2 shadow-xl">
						<Image
							fill
							src={secondarySrc}
							alt={secondaryAlt}
							className="object-cover"
							sizes="(min-width: 1024px) 11vw, (min-width: 640px) 18vw, 36vw"
						/>
					</div>
				) : null}
			</div>
			{withSpinner ? (
				<div className="absolute -top-6 -left-6 w-2/3 pointer-events-none opacity-90">
					<Image
						src={roundImg}
						alt=""
						className="animate-[spin_22s_linear_infinite] object-contain"
					/>
				</div>
			) : null}
		</div>
	);
}

export default ImageCollage;
