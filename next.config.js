/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    KEY_CRYPTO: process.env.NEXT_PUBLIC_KEY_CRYPTO,
    KEY_AUTH: process.env.NEXT_PUBLIC_KEY_AUTH,
    SECONDS_AUTH: process.env.NEXT_PUBLIC_SECONDS_AUTH,
  },
}
