'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { RxHamburgerMenu } from 'react-icons/rx';
import { signIn, signOut } from 'next-auth/react';
import { login } from '@/app/api/api';
import { useCookies } from 'react-cookie';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function HomeHeader() {
	const [cookie, setCookie] = useCookies();
	const [isLogin, setIsLogin] = useState(false);

	const router = useRouter();
	const params = useSearchParams();

	const userSignIn = async () => {
		signIn('kakao', { callbackUrl: 'http://localhost:3000/' });
	};
	const userSignOut = async () => {
		const data = await signOut({
			redirect: false,
			callbackUrl: 'http://localhost:3000/',
		});

		router.push(data.url);

		//authorization cookie 삭제
		router.replace('/');
		setCookie('authorizationToken', '', { path: '/' });
		setIsLogin(false);
		if (window !== undefined) {
			localStorage.removeItem('email');
		}
	};
	// const queryString = window.location.search;
	// const urlParams = new URLSearchParams(queryString);
	// const code = urlParams.get('code') || '';
	const code = params.get('code') || '';
	const fetchData = async () => {
		try {
			const res = await login(code);

			if (window !== undefined) {
				if (res.data.email !== null) {
					localStorage.setItem('email', res.data.email);
					console.log('이메일 설정');
				}
			}

			const authToken = getAuthorizationTokenFromCookie();

			if (authToken !== '') {
				setIsLogin(true);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const getAuthorizationTokenFromCookie = () => {
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			if (cookie.startsWith('authorizationToken=')) {
				return cookie.substring('authorizationToken='.length);
			}
		}
		return '';
	};
	useEffect(() => {
		if (code !== '') {
			if (window !== undefined) {
				if (localStorage.getItem('email') === null) {
					fetchData();
				}
			}
			setIsLogin(true);
		} else {
			return;
		}
	}, []);
	const movePage = (url: string) => {
		if (isLogin === false) {
			alert('로그인이 필요합니다.');
			return;
		} else {
			router.push(`/${url}`);
		}
	};

	const pathname = usePathname();
	const underline = 'border-opacity-1 border-b-2 border-b-black';
	const noUnderline = 'border-opacity-0';

	return (
		<div className="relative h-[72px] w-full sm:w-screen">
			<div className="h-[44px] w-full sm:hidden">
				{' '}
				<Image
					src="/img/iphone_notch.svg"
					alt="로고 이미지"
					width={355}
					height={44}
				/>{' '}
			</div>
			<div className="shadow-[0_1px_3px_rgba(0, 0, 0, 0.15)] absolute z-20 flex h-[72px] w-full items-center justify-center bg-[#FFF] shadow">
				<div className="flex h-full w-full items-center justify-between px-[20px] sm:w-[calc(100%-240px)] sm:px-0 xl:w-[calc(100%-80px)]  ">
					<Link href="/">
						<div className=" relative h-[18px] w-[53px] sm:h-[32px] sm:w-[93px] xl:h-[32px] xl:w-[94px]  ">
							{' '}
							<Image src="/img/ezfee.svg" alt="로고 이미지" fill={true} />{' '}
						</div>
					</Link>{' '}
					<div className=" h-[72px] min-w-[240px] shrink-0">
						<nav className="h-full">
							<ul className="flex h-full cursor-pointer  justify-between text-[16px]">
								<Link href="/">
									<div
										className={`hover:border-opacity-1 hidden h-full w-[92px] items-center justify-center  hover:border-b-2 hover:border-b-black sm:flex ${
											pathname === '/' ? underline : noUnderline
										}`}
									>
										{' '}
										<li className=" hover:font-medium">홈</li>
									</div>
								</Link>{' '}
								<div
									className={`hover:border-opacity-1 hidden  h-full w-[92px] items-center justify-center hover:border-b-2 hover:border-b-black xl:mx-[67px]  xl:flex ${
										pathname === '/templateList' ? underline : noUnderline
									}`}
								>
									<li
										className=" hover:font-medium"
										onClick={() => movePage('editTemplate')}
									>
										템플릿 편집
									</li>
								</div>
								<div
									className={`hover:border-opacity-1 hidden h-full w-[92px] items-center justify-center hover:border-b-2 hover:border-b-black sm:flex ${
										pathname === '/dashboard' ? underline : noUnderline
									}`}
								>
									<li
										className=" hover:font-medium"
										onClick={() => movePage('dashboard')}
									>
										대시 보드
									</li>
								</div>
							</ul>
						</nav>
					</div>
					<div className="flex gap-2">
						<button className=" hidden h-[34px] min-w-[135px]  items-center text-[#989898] sm:flex">
							<Image
								src="/img/icon_account.svg"
								alt="유저프로필"
								width={32}
								height={32}
								className="mr-[8px]"
							/>
							{window !== undefined && localStorage.getItem('email') !== null
								? localStorage.getItem('email')
								: '로그인을 진행해주세요'}
						</button>
						<button
							className={` ${
								isLogin ? 'hidden' : ''
							}  h-[34px] w-[100px]  items-center text-[#989898] `}
							onClick={() => userSignIn()}
						>
							Sign in
						</button>
						<button
							className={` ${
								isLogin ? '' : 'hidden'
							}  h-[34px] w-[100px]  items-center text-[#989898] `}
							onClick={() => userSignOut()}
						>
							Sign out
						</button>
						<RxHamburgerMenu className=" absolute right-[20px] top-[calc(50%-18px/2)]  h-[24px] w-[24px] cursor-pointer rounded-[3px] hover:text-[#00A3FF] sm:hidden" />{' '}
					</div>
				</div>
			</div>
		</div>
	);
}
