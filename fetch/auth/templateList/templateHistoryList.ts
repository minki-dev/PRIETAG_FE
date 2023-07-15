import { BASE_URL } from './../../const';
import { getAccessToken } from "@/fetch/const";

export async function deleteVersionHistories(id: number[]) {
  try {
		const token = getAccessToken();
		if (token) {
			const res = await fetch(
				`${BASE_URL}template/history`,
				{
					method: 'PATCH',
					credentials: 'include',
					headers: {
						Authorization: token,
						'Content-type': 'application/json'
					},
          body: JSON.stringify({id})
				},
			);
			const response = await res.json();
      console.log(response)
		}
	} catch (err) {
		console.log(err);
	}
}