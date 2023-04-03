/** @type {import('next').NextConfig} */
const { parsed: localEnv } = require('dotenv').config()

module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_URL: localEnv.NEXT_PUBLIC_URL,
  },
};
