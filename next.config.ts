import type { NextConfig } from "next";
const path = require("path");

module.exports = {
  turbopack: {
    root: path.join(__dirname, ".."),
  },
};

const nextConfig: NextConfig = {};
export default nextConfig;
