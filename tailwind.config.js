/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			fontFamily: {
				ptBold: ['Pretendard-Bold'],
				ptMedium: ['Pretendard-Medium'],
				ptRegular: ['Pretendard-Regular'],
				ptLight: ['Pretendard-Light'],
			},
			width: {
				priceModal: '832px',
				tableDataPc: '264px',
				tableDataTablet: '232px',
				tableData: '216px',
				87: '328px',
				74: '296px',
			},
			height: {
				priceModal: '596px',
				tableDataPc: '32px',
				tableDataTablet: '26px',
				tableData: '20px',
				21: '84px',
			},
			borderColor: {
				'gray-700': '#747474',
			},
			borderWidth: {
				1: '1px',
			},

			textColor: {
				borderGray: '#747474',
			},
			boxShadow: {
        'outer': 'inset 0 0 1px 16px #DCFBD9',
        'inner': 'inset 0 0 1px 16px #ebf2ff',
      }
		},
	},
	plugins: [],
};
