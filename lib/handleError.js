import { isAxiosError } from "axios";

/**
 * Handle error message
 * @param {Error} error
 */
export function handleError(error) {
	let message = "Something went wrong";

	if (error instanceof Error) {
		if (isAxiosError(error)) {
			message = error.response?.data.message;

			if (!message && error.response?.statusText) {
				message = error.response?.statusText;
			}
		} else {
			message = error?.message;
		}
	}

	return message;
}
