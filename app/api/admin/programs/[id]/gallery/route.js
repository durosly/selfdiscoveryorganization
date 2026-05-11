import createUpdateGallery from "./add-image-to-gallery";
import deleteGalleryImage from "./delete-image-from-gallery";
import { requirePermission } from "@/lib/guard-permission";

export async function POST(request, ctx) {
	const guard = await requirePermission("events");
	if (!guard.ok) return guard.response;
	return createUpdateGallery(request, ctx);
}

export async function DELETE(request, ctx) {
	const guard = await requirePermission("events");
	if (!guard.ok) return guard.response;
	return deleteGalleryImage(request, ctx);
}
