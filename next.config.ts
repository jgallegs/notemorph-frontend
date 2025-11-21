import type { NextConfig } from "next";

// next.config.js
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
};

module.exports = withNextIntl(nextConfig);


export default nextConfig;
