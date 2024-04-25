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
        {
          protocol: 'https',
          hostname: 'images.google.com',
        },
      ],
      domains: ['res.cloudinary.com','asset.cloudinary.com','www.google.com']
    },
  };

export default nextConfig;

    