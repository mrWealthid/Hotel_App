import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				primary: {
					lighter: '#d3f2f7',
					light: '#65d1e4',
					100: '#20aac3',
					200: '#1c97ae',
					300: '#198498',
					400: '#157182',
					DEFAULT: 'var(--primary-color)'
				},
				secondary: 'var(--secondary-color)',
				'base-color': 'var(--color-text-base)',
				success: 'var(--success-color)',
				error: 'var(--error-color)',
				'label-color': 'var(--input-label)',
				pending: 'var(--pending-color)',
				'light-blue': 'var(--light-blue)'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
export default config;
