import NextAuth from 'next-auth/next';
import KakaoProvider from 'next-auth/providers/kakao';
import process from 'process';

const handler = NextAuth({
	providers: [
		KakaoProvider({
			clientId: `${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}` || '',
			clientSecret: `${process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET}` || '',
			authorization: {
				params: {
					redirect_uri: `https://prietag-fe-minki-dev.vercel.app/`,
				},
			},
		}),
	],
});

export { handler as GET, handler as POST };
