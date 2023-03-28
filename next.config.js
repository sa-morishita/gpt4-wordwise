/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	eslint: {
		dirs: ['pages', 'components', 'common'],
	},
	images: {
		domains: ['placehold.jp'],
	},
	compiler: {
		removeConsole:
			process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
	},
	env: {
		REVALIDATE_TOKEN: process.env.REVALIDATE_TOKEN,
	},
};

module.exports = nextConfig;
