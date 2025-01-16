import _ from "lodash";

export const initialState = {
	mark: [],
	data: [],
	search: "",
	isLoading: true,
	totalDocs: 0,
	limit: 10,
	totalPages: 0,
	page: 0,
	pagingCounter: 0,
	hasPrevPage: false,
	hasNextPage: false,
	prevPage: null,
	nextPage: null,
};

function reducer(state, action) {
	switch (action.type) {
		case "LOAD_ITEMS":
			const newData = action.data.docs.map((d) => ({
				...d,
			}));

			const entries = _.omit(action.data, "docs");
			return {
				...state,
				data: [...newData],
				...entries,
				isLoading: false,
			};

		case "LOADING":
			return { ...state, isLoading: true };

		case "ERROR":
			return {
				...state,
				isLoading: false,
				error: { status: true, message: action.data },
			};

		case "MARK":
			let newMarkData = [];
			if (state.mark.includes(action.data)) {
				newMarkData = state.mark.filter((d) => d !== action.data);
			} else {
				newMarkData = [...state.mark, action.data];
			}

			return { ...state, mark: [...newMarkData] };

		case "MARK_ALL":
			let newMarkList = [];
			if (state.mark.length !== state.data.length) {
				newMarkList = state.data.map((d) => d._id);
				newMarkList = [...new Set(newMarkList)];
			}
			return { ...state, mark: [...newMarkList] };
		case "EMPTY_MARK":
			return { ...state, mark: [] };

		default:
			return state;
	}
}

export default reducer;
