/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
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
			backgroundColor: {
				mainColor: '#00A3FF',
				optionColor: '#DDF3FF',
				disabledGray: '#BCBCBC',
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
				outer: 'inset 0 0 1px 16px #DCFBD9',
				inner: 'inset 0 0 1px 16px #ebf2ff',
			},
			screens: {
				xl: '1281px',
				mobile: '376px',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
