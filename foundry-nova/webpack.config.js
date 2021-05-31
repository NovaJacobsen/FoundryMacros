const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const out =
  process.env.FOUNDRY_NOVA_OUT_LOCATION || path.resolve(__dirname, "dist");
const mode = process.env.MODE || "development";

fs.rmSync(out, { recursive: true, force: true });

if (mode === "development") console.log(`creating development build in ${out}`);

module.exports = {
  entry: "./src/index.ts",
  mode,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(txt|html)$/,
        use: "raw-loader",
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "lang",
          to: "lang",
        },
      ],
    }),
  ],

  output: {
    publicPath: "",
    filename: "index.js",
    path: out,
  },
};
