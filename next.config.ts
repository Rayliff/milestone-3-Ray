// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// images: {
//     remotePatterns: [
//       // {
//       //   protocol: "https",
//       //   hostname: "i.imgur.com",
//       //   port: "",
//       //   pathname: "/**",
//       // },
//       {
//         protocol: "https",
//         hostname: "placehold.co",
//         port: "",
//         pathname: "/**",
//       },
//       // {
//       //   protocol: "https",
//       //   hostname: "api.lorem.space",
//       //   port: "",
//       //   pathname: "/**",
//       // },
//       // {
//       //   protocol: "https",
//       //   hostname: "placeimg.com",
//       //   port: "",
//       //   pathname: "/**",
//       // },
//       {
//         protocol: "https",
//         hostname: "api.escuelajs.co",
//         port: "",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "picsum.photos",
//         port: "",
//         pathname: "/**",
//       },
//       {
//       protocol: "https",
//       hostname: "loremflickr.com",  // <== tambahkan ini
//       port: "",
//       pathname: "/**",
//     },
//     ],
//   },
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.escuelajs.co", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      { protocol: "https", hostname: "loremflickr.com", pathname: "/**" },
      { protocol: "https", hostname: "i.imgur.com", pathname: "/**" },
      { protocol: "https", hostname: "placeimg.com", pathname: "/**" },
      { protocol: "https", hostname: "images.samsung.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
