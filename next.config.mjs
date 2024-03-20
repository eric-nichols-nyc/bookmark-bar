/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'img.clerk.com',
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
      ],
      domains: ['res.cloudinary.com']
    },
  };

export default nextConfig;

    