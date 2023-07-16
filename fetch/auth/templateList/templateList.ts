import { getAccessToken } from '../../const';

export type Template = {
	id: number;
	title: string;
	updated_at: string;
	image: string;
	isPublished: boolean;
};

export interface TemplateResponse {
	totalCount: number;
	template: Template[];
}

export async function getTemplateList({
	pageNumber,
	pageSize,
}: {
	pageNumber: number;
	pageSize: number;
}) {
	try {
		const token = getAccessToken();

		if (token) {
			const res = await fetch(
				`https://ezfee.site/api/templates?page=${pageNumber}&pageSize=${pageSize}`,
				{
					method: 'GET',
					credentials: 'include',
					headers: {
						Authorization: token,
					},
				},
			);
			const json = await res.json();
			if (res.status === 200 ) {				
				return json.data
			}
			// else {
			// 	throw new Error()
			// }
		}
	} catch (err) {
		console.log(err);
	}
}

export async function getVersionTemplateList({
	templateId,
	pageNumber,
	pageSize,
	searchTerm,
}: {
	templateId: number;
	pageNumber: number;
	pageSize: number;
	searchTerm: string;
}) {
	try {
		const token = getAccessToken();
		if (token) {
			const res = await fetch(
				`https://ezfee.site/api/templates/${templateId}?page=${pageNumber}&pageSize=${pageSize}${
					searchTerm ? '&search=' + searchTerm : ''
				}`,
				{
					method: 'GET',
					credentials: 'include',
					headers: {
						Authorization: token,
					},
				},
			);
			const { data } = await res.json();
			return data;
		}
	} catch (err) {
		console.log(err);
	}
}

export async function deleteTemplate({ templateId }: { templateId: number }) {
	try {
		const token = getAccessToken();
		if (token) {
			const res = await fetch(`https://ezfee.site/api/${templateId}`, {
				method: 'PATCH',
				credentials: 'include',
				headers: {
					Authorization: token,
				},
			});
		}
	} catch (err) {
		console.log(err);
	}
}
export async function deleteTemplateHistory({
	templateId,
}: {
	templateId: number[];
}) {
	try {
		const token = getAccessToken();
		if (token) {
		const res = await fetch(`https://ezfee.site/api/template/history`, {
			method: 'PATCH',
			credentials: 'include',
			headers: {
				Authorization: token
			},
			body: JSON.stringify({ id: templateId }),
		});
	}
	} catch (err) {
		console.log(err);
	}
}
