module.exports = [
"[turbopack-node]/transforms/postcss.ts?config=[project]/frontend-next/postcss.config.js { CONFIG => \"[project]/frontend-next/postcss.config.js_.loader.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "chunks/0quo_194p2h0._.js",
  "chunks/[root-of-the-server]__1fg538r._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts?config=[project]/frontend-next/postcss.config.js { CONFIG => \"[project]/frontend-next/postcss.config.js_.loader.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];