/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    KEY_CRYPTO: process.env.KEY_CRYPTO,
    KEY_AUTH: process.env.KEY_AUTH,
    SECONDS_AUTH: process.env.SECONDS_AUTH,
  },
}
