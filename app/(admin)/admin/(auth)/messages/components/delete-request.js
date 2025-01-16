import axios from "axios";

async function deleteMessage(ids) {
	try {
		const response = await axios.delete(`/api/admin/message`, {
			data: { ids },
		});

		if (response.data.status) {
			return response.data;
		} else {
			throw new Error(response.data.message);
		}
	} catch (error) {
		return { status: false, message: error.message };
	}
}

export default deleteMessage;
