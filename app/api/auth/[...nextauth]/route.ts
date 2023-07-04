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
					redirect_uri: `http://localhost:3000`,
				},
			},
		}),
	],
	callbacks: {
		async redirect({ url, baseUrl }) {
			if (url.startsWith('/')) {
				return `${baseUrl}${url}`;
			} else if (new URL(url).origin === baseUrl) {
				return url;
			}

			return baseUrl;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
