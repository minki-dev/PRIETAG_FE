import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '..';
import { useCookies } from 'react-cookie';
import { AppDispatch } from '../ReduxProvider';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export interface Template {
	id: number;
	title: string;
	updated_at: string;
	moreIsClicked: boolean;
	titleChangeIsClicked: boolean;
	image: string;
}

interface Entities {
	templateList: Template[];
	totalCount: number;
}

interface TemplateList {
	entities: Entities;
	loading: boolean;
	error: boolean;
}

const initialState: TemplateList = {
	entities: { templateList: [], totalCount: 0 },
	loading: false,
	error: false,
};

export interface getTemplateType {
	currentPage: number;
	token: string;
}

export const getTemplateList = createAsyncThunk<
	Entities,
	getTemplateType,
	{
		dispatch: AppDispatch;
	}
>('templateList/getTemplateList', async ({ currentPage, token }) => {
	const res = await fetch(
		`https://ezfee.site/api/templates?page=${currentPage}&pageSize=9`,
		{
			method: 'GET',
			credentials: 'include',
			headers: {
				Authorization: token,
			},
		},
	);
	const {
		data: { totalCount, template },
	} = await res.json();
	if (template.length > 0) {
		const templateData: Template[] = template.map(
			(template: {
				id: number;
				title: string;
				updated_at: string;
				image: string;
			}) => {
				return {
					...template,
					moreIsClicked: false,
					titleChangeIsClicked: false,
				};
			},
		);
		return { templateList: templateData, totalCount };
	} else return { templateList: [], totalCount: 0 };
});

export const copyTemplate = createAsyncThunk(
	'templateList/copyTemplate',
	async ({ tid, token }: { tid: number; token: string }) => {
		const res = await fetch(`https://ezfee.site/api/template/copy/${tid}`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				Authorization: token,
			},
		});
	},
);

const templateListSlice = createSlice({
	name: 'templateList',
	initialState,
	reducers: {
		/** 이름 재설정 클릭 */
		titleChangeClick: (state: TemplateList, action: PayloadAction<number>) => {
			const index = state.entities.templateList.map((item, idx) => {
				if (item.id === action.payload) return idx;
			});
			if (typeof index === 'number') {
				state.entities.templateList[index].titleChangeIsClicked = true;
			}
		},

		/** 이름 재설정 완료 */
	},
	extraReducers: (builder) => {
		/** 템플릿 리스트 가져오기 */
		builder.addCase(getTemplateList.pending, (state: TemplateList) => {
			state.loading = true;
			state.error = false;
		});
		builder.addCase(
			getTemplateList.fulfilled,
			(state: TemplateList, action: PayloadAction<Entities>) => {
				state.loading = false;
				state.entities = action.payload;
			},
		);
		builder.addCase(getTemplateList.rejected, (state: TemplateList) => {
			state.error = true;
		});
		/** 템플릿 복제 */
		builder.addCase(copyTemplate.pending, (state: TemplateList) => {
			state.loading = true;
			state.error = false;
		});
		builder.addCase(copyTemplate.fulfilled, (state: TemplateList) => {
			state.loading = false;
		});
		builder.addCase(copyTemplate.rejected, (state: TemplateList) => {
			state.error = true;
		});
	},
});

export const { titleChangeClick } = templateListSlice.actions;

export function useTemplateList() {
	const templateList = useSelector((state: RootState) => state.templateList);
	const dispatch = useAppDispatch();

	return {
		templateList,
		dispatch,
	};
}

export default templateListSlice.reducer;
