import { createSlice } from '@reduxjs/toolkit';

const initialState = [
	{
		id: 1,
		title: 'Gitbook 요금제 ',
		date: '2023.05.31.15:00',
		moreIsClicked: false,
	},
	{
		id: 2,
		title: 'Gitbook 요금제_2',
		date: '2023.06.01.12:00',
		moreIsClicked: false,
	},
	{
		id: 3,
		title: 'Swit 플랜',
		date: '2023.05.29.11:20',
		moreIsClicked: false,
	},
	{
		id: 4,
		title: '패스트캠퍼스 최종요금제',
		date: '2023.05.28.05:50',
		moreIsClicked: false,
	},
	{
		id: 5,
		title: 'INHR 서비스 요금제 ',
		date: '2023.05.27.08:30',
		moreIsClicked: false,
	},
	{
		id: 6,
		title: '채널톡 가격 서비스 정책표',
		date: '2023.05.21.10:14',
		moreIsClicked: false,
	},
	{
		id: 7,
		title: '라이너 요금 정책표',
		date: '2023.05.17.16:26',
		moreIsClicked: false,
	},
	{
		id: 8,
		title: '플렉스 요금제',
		date: '2023.05.15.15:24',
		moreIsClicked: false,
	},
	{
		id: 9,
		title: '클로바인 요금제',
		date: '2023.05.11.09:43',
		moreIsClicked: false,
	},
];

const templateSlice = createSlice({
	name: 'template',
	initialState,
	reducers: {
		toggleMoreIsClicked: (state, action) => {
			const { id } = action.payload;
			const item = state.find((item) => item.id === id);
			if (item) {
				item.moreIsClicked = !item.moreIsClicked;
			}
		},
	},
});
export const { toggleMoreIsClicked } = templateSlice.actions;

export default templateSlice.reducer;
