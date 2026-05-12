import axios from "axios";

async function loadData(current = 1, search = "") {
	try {
		const response = await axios(
			`/api/admin/message?page=${current}&q=${search}`
		);

		if (response.data.status) {
			return response.data;
		} else {
			throw new Error(response.data.message);
		}
	} catch (error) {
		return { status: false, message: error.message };
	}
}

export default loadData;
