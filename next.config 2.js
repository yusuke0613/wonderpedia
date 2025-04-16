/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },

  // 開発サーバーの設定
  // 注意: output: exportを使用しているため、rewritesは使用できません
};

module.exports = nextConfig;
