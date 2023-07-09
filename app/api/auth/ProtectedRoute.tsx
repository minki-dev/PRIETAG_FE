'use client';

import { updateAuthState, useAuth } from '@/store/slice/authSlice';
import { useRouter, usePathname } from 'next/navigation';

import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const pathName = usePathname();
	const [cookie] = useCookies();
	const {
		auth: { authenticated, userInfo },
		dispatch,
	} = useAuth();

	useEffect(() => {
		const token = cookie['accessToken'];

		if (token) {
			const userInfoFromLocal = localStorage.getItem('userInfo');
			const userInfo = JSON.parse(userInfoFromLocal || '');
			dispatch(updateAuthState({ authenticated: 'AUTHENTICATED', userInfo }));
		} else {
			dispatch(
				updateAuthState({ authenticated: 'UNAUTHENTICATED', userInfo: null }),
			);
			localStorage.removeItem('userInfo');
			router.push('/');
		}
	}, []);
	useEffect(() => {
		console.log(authenticated);
	}, [authenticated]);
	return authenticated === 'AUTHENTICATED' ? <>{children}</> : null;
};

export default ProtectedRoute;
