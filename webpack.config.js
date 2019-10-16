module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    output: { filename: "bundle.js" },
    resolve: { extensions: [".ts", ".js", '.tsx'] },
    module: {
        rules: [
            { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ }
        ]
    },
    devServer: {
        contentBase: "./webapp/assets",
        port: 4500
    }
};