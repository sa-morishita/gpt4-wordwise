/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

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
};

module.exports = withBundleAnalyzer(nextConfig);
