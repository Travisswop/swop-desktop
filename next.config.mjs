// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack: (config) => {
//     config.externals.push("pino-pretty", "lokijs", "encoding");
//     return config;
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "lh3.googleusercontent.com",
//       },
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com",
//       },
//       {
//         protocol: "http",
//         hostname: "localhost",
//       },
//       {
//         protocol: "https",
//         hostname: "app.apiswop.co",
//       },
//       {
//         protocol: "http",
//         hostname: "app.apiswop.co",
//       },
//       {
//         protocol: "https",
//         hostname: "crossmint.myfilebase.com",
//       },
//     ],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Allow any protocol
        hostname: '*', // Allow any hostname
      },
      {
        protocol: 'http', // Allow any protocol
        hostname: '*', // Allow any hostname
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Set your origin
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
