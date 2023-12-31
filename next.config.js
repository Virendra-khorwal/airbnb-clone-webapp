/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		// Enables the styled-components SWC transform
		styledComponents: true,
	},

	images: {
		domains: [
			"avatars.githubusercontent.com",
			"lh3.googleusercontent.com",
			"res.cloudinary.com",
		],
	},
};

module.exports = nextConfig
