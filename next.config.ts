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
      { protocol: "https", hostname: "api.escuelajs.co" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "cdn.discordapp.com" },
      // OPTIONAL (kompat untuk data lama)
      { protocol: "https", hostname: "placeimg.com" },
    ],
  },
};

export default nextConfig;
