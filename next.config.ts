import type { NextConfig } from "next";

const nextConfig: NextConfig = {
};

module.exports = {
	images: {
		domains: ["www.pngfind.com", "rdaniellesmith.wordpress.com"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "media.nbcsandiego.com",
			},
		]
	}
}


export default nextConfig;
