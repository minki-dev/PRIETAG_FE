import { useCookies } from 'react-cookie';

import jwt from 'jsonwebtoken';

export interface SetCookieOption {
	path: string;
	maxAge: number;
	sameSite: string;
}

export const login = async (code: string) => {
	try {
		const res = await fetch(`https://ezfee.site/api/callback?code=${code}`, {
			method: 'GET',
			credentials: 'include',
		});
		// header 값에서 bearer를 뜯은 문자열을 가져오기

		const authorizationToken =
			res.headers.get('authorization')?.slice('bearer '.length) || '';
		document.cookie = `authorizationToken=${authorizationToken}; path=/; max-age=3600; sameSite=Strict`;

		return res.json();
	} catch (err) {
		console.error('API 요청 실패:', err);
		throw err;
	}
};
