/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    imageSizes: [24, 45, 128, 375],
    deviceSizes: [512, 768, 1280, 2560],
    domains: ["alyhbogvmpckksxjiubn.supabase.co", "k.kakaocdn.net"],
  },
};

export default nextConfig;
