const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // 💡 disables in dev
});

const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "api.cloudinary.com",
      "cdn-icons-png.flaticon.com",
      "api.dicebear.com",
      "i.pravatar.cc",
      "https://res.cloudinary.com/dsndcjfwh/image/"
    ],
  },
};

module.exports = withPWA(nextConfig);
