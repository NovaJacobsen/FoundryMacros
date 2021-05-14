const path = require("path")
const ISO6391 = require('iso-639-1');
const fs = require("fs")
const CreateFileWebpack = require('create-file-webpack')
const CopyPlugin = require("copy-webpack-plugin");
const ZipPlugin = require('zip-webpack-plugin');

const languages = fs.readdirSync(path.resolve(__dirname, "lang")).map(x => {
    let lang = x.split(".")[0];
    let name = ISO6391.getName(lang)
    let path = "lang/" + x
    return {
        lang,
        name,
        path
    }
})

const manifest = {
    title: "Nova's Foundry module",
    version: "1.0.0",
    minimumCoreVersion: "0.5.0",
    dependencies: [
        {
            name: "dnd5e",
            type: "system"
        }
    ],
    languages,
    esmodules: "main.js"
}

const addToManifest = (() => {
    const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, "package.json")));
    return (...prop) => {
        prop.forEach(x => {
            manifest[x] = packageJson[x]
        })
    }
})()

addToManifest("name", "author", "description", "version")

module.exports = {
    entry: "./src/index.ts",

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    plugins: [
        new CreateFileWebpack({
            path: "./dist",
            fileName: "module.json",
            content: JSON.stringify(manifest)
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "lang",
                    to: "lang"
                }
            ]
        }),
        new ZipPlugin({
            filename: "dist.zip"
        })
    ],

    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    }
}