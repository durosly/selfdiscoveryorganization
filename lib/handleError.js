import { isAxiosError } from "axios";

export function handleError(error) {
	let message = "Something went wrong";
	if (error instanceof Error) {
		if (isAxiosError(error)) {
			message = error.response?.data.message;
		} else {
			message = error?.message;
		}
	}

	return message;
}
