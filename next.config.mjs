/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["api.glassworld06.com"],  // ✅ Allow external image loading
  },
};

export default nextConfig;
