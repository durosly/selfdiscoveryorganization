import axios from "axios";

async function markMessagesAsRead(ids) {
	try {
		const response = await axios.put(`/api/admin/message`, { ids });
		if (response.data.status) {
			return response.data;
		} else {
			throw new Error(response.data.message);
		}
	} catch (error) {
		return { status: false, message: error.message };
	}
}

export default markMessagesAsRead;
