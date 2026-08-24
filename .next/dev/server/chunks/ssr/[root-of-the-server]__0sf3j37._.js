module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/frontend-next/src/app/articles/[slug]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ArticlePage,
    "generateMetadata",
    ()=>generateMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-next/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-next/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend-next/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-next/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f40$iconify$2f$react$2f$dist$2f$iconify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-next/node_modules/@iconify/react/dist/iconify.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-next/src/lib/api.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$src$2f$components$2f$common$2f$ShareButtons$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-next/src/components/common/ShareButtons.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
// Server-side data fetching using WordPress REST API
async function getArticle(slug) {
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchPostBySlug"])(slug);
    } catch (err) {
        console.error("[SSR] Article fetch failed:", err);
        return null;
    }
}
async function generateMetadata({ params }) {
    const { slug } = await params;
    const article = await getArticle(slug);
    if (!article) {
        return {
            title: "Article Not Found"
        };
    }
    return {
        title: article.title,
        description: article.excerpt || `Read ${article.title} on Law4Minor`,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            images: article.image ? [
                article.image
            ] : undefined,
            url: `https://law4minor.org/articles/${slug}`,
            type: 'article'
        }
    };
}
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}
async function ArticlePage({ params }) {
    const { slug } = await params;
    const article = await getArticle(slug);
    if (!article) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "pt-24 pb-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-paper py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container max-w-4xl",
                    children: [
                        article.category && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-primary text-sm font-medium uppercase tracking-wider",
                            children: article.category.name
                        }, void 0, false, {
                            fileName: "[project]/frontend-next/src/app/articles/[slug]/page.tsx",
                            lineNumber: 62,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-accent mt-4 mb-6",
                            children: article.title
                        }, void 0, false, {
                            fileName: "[project]/frontend-next/src/app/articles/[slug]/page.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4 text-gray-500 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: formatDate(article.createdAt)
                                }, void 0, false, {
                                    fileName: "[project]/frontend-next/src/app/articles/[slug]/page.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this),
                                article.author && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "•"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend-next/src/app/articles/[slug]/page.tsx",
                                            lineNumber: 74,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "By ",
                                                article.author.name
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend-next/src/app/articles/[slug]/page.tsx",
                                            lineNumber: 75,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend-next/src/app/articles/[slug]/page.tsx",
                                    lineNumber: 73,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend-next/src/app/articles/[slug]/page.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend-next/src/app/articles/[slug]/page.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend-next/src/app/articles/[slug]/page.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            article.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "container max-w-4xl -mt-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "aspect-video rounded-2xl overflow-hidden shadow-xl",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        src: article.image,
                        alt: article.title,
                        width: 900,
                        height: 506,
                        className: "w-full h-full object-cover"
                    }, void 0, false, {
                        fileName: "[project]/frontend-next/src/app/articles/[slug]/page.tsx",
                        lineNumber: 86,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/frontend-next/src/app/articles/[slug]/page.tsx",
                    lineNumber: 85,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend-next/src/app/articles/[slug]/page.tsx",
                lineNumber: 84,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "container max-w-4xl py-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "prose prose-lg max-w-none",
                        dangerouslySetInnerHTML: {
                            __html: article.content
                        }
                    }, void 0, false, {
                        fileName: "[project]/frontend-next/src/app/articles/[slug]/page.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$src$2f$components$2f$common$2f$ShareButtons$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        url: `https://law4minor.org/articles/${slug}`,
                        title: article.title
                    }, void 0, false, {
                        fileName: "[project]/frontend-next/src/app/articles/[slug]/page.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    article.tags && article.tags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-12 pt-8 border-t",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "font-semibold text-primary mb-4",
                                children: "Tags"
                            }, void 0, false, {
                                fileName: "[project]/frontend-next/src/app/articles/[slug]/page.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: article.tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: `/articles?tag=${tag.slug}`,
                                        className: "px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-primary hover:text-white transition-colors",
                                        children: tag.name
                                    }, tag.id, false, {
                                        fileName: "[project]/frontend-next/src/app/articles/[slug]/page.tsx",
                                        lineNumber: 112,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/frontend-next/src/app/articles/[slug]/page.tsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-next/src/app/articles/[slug]/page.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-12",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "/articles",
                            className: "btn btn-outline",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f40$iconify$2f$react$2f$dist$2f$iconify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Icon"], {
                                    icon: "mdi:arrow-left",
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/frontend-next/src/app/articles/[slug]/page.tsx",
                                    lineNumber: 129,
                                    columnNumber: 13
                                }, this),
                                "Back to Articles"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend-next/src/app/articles/[slug]/page.tsx",
                            lineNumber: 128,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend-next/src/app/articles/[slug]/page.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-next/src/app/articles/[slug]/page.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend-next/src/app/articles/[slug]/page.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
}),
"[project]/frontend-next/src/app/articles/[slug]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/frontend-next/src/app/articles/[slug]/page.tsx [app-rsc] (ecmascript)"));
}),
"[project]/frontend-next/src/components/common/ShareButtons.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-next/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/frontend-next/src/components/common/ShareButtons.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/frontend-next/src/components/common/ShareButtons.tsx", "default");
}),
"[project]/frontend-next/src/components/common/ShareButtons.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-next/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/frontend-next/src/components/common/ShareButtons.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/frontend-next/src/components/common/ShareButtons.tsx <module evaluation>", "default");
}),
"[project]/frontend-next/src/components/common/ShareButtons.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$src$2f$components$2f$common$2f$ShareButtons$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/frontend-next/src/components/common/ShareButtons.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$src$2f$components$2f$common$2f$ShareButtons$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/frontend-next/src/components/common/ShareButtons.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$src$2f$components$2f$common$2f$ShareButtons$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/frontend-next/src/lib/api.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// WordPress REST API integration for law4minor.org
__turbopack_context__.s([
    "BACKEND_URL",
    ()=>BACKEND_URL,
    "WP_API_URL",
    ()=>WP_API_URL,
    "fetchCategories",
    ()=>fetchCategories,
    "fetchPage",
    ()=>fetchPage,
    "fetchPostBySlug",
    ()=>fetchPostBySlug,
    "fetchPosts",
    ()=>fetchPosts,
    "fetchTeamMembers",
    ()=>fetchTeamMembers,
    "processImageUrl",
    ()=>processImageUrl
]);
const WP_API_URL = "https://admin.law4minor.org/wp-json/wp/v2";
// ===== Helper Functions =====
function stripHtml(html) {
    return html.replace(/<[^>]*>/g, "").replace(/&hellip;/g, "...").replace(/&nbsp;/g, " ").trim();
}
function transformPost(post) {
    const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
    const author = post._embedded?.author?.[0];
    const categories = post._embedded?.["wp:term"]?.[0] || [];
    const tags = post._embedded?.["wp:term"]?.[1] || [];
    return {
        id: String(post.id),
        slug: post.slug,
        title: post.title.rendered,
        excerpt: stripHtml(post.excerpt.rendered),
        content: post.content.rendered,
        image: featuredMedia?.source_url,
        createdAt: post.date,
        category: categories[0] ? {
            id: String(categories[0].id),
            name: categories[0].name,
            slug: categories[0].slug
        } : undefined,
        author: author ? {
            id: String(author.id),
            name: author.name,
            avatar: author.mpp_avatar?.["96"] || author.mpp_avatar?.full || author.avatar_urls?.["96"]
        } : undefined,
        tags: tags.map((tag)=>({
                id: String(tag.id),
                name: tag.name,
                slug: tag.slug
            }))
    };
}
function transformCategory(cat) {
    return {
        id: String(cat.id),
        name: cat.name,
        slug: cat.slug,
        count: cat.count
    };
}
function transformUser(user) {
    // Get avatar - prefer mpp_avatar if available
    let avatar;
    if (user.mpp_avatar && !user.mpp_avatar.errors) {
        avatar = user.mpp_avatar["300"] || user.mpp_avatar.full || user.mpp_avatar["150"];
    } else {
        avatar = user.avatar_urls?.["96"];
    }
    return {
        id: String(user.id),
        name: user.name,
        displayName: user.name,
        avatar,
        description: user.description || undefined,
        link: user.link
    };
}
async function fetchPosts(options = {}) {
    const params = new URLSearchParams();
    params.set("_embed", "true");
    if (options.perPage) params.set("per_page", String(options.perPage));
    if (options.page) params.set("page", String(options.page));
    if (options.category) params.set("categories", String(options.category));
    if (options.search) params.set("search", options.search);
    if (options.slug) params.set("slug", options.slug);
    try {
        const res = await fetch(`${WP_API_URL}/posts?${params.toString()}`, {
            next: {
                revalidate: 60
            }
        });
        if (!res.ok) {
            console.error(`[WP API] Posts fetch failed: ${res.status}`);
            return [];
        }
        const posts = await res.json();
        return posts.map(transformPost);
    } catch (err) {
        console.error("[WP API] Posts fetch error:", err);
        return [];
    }
}
async function fetchPostBySlug(slug) {
    const posts = await fetchPosts({
        slug,
        perPage: 1
    });
    return posts[0] || null;
}
async function fetchCategories() {
    try {
        const res = await fetch(`${WP_API_URL}/categories?per_page=100`, {
            next: {
                revalidate: 300
            }
        });
        if (!res.ok) {
            console.error(`[WP API] Categories fetch failed: ${res.status}`);
            return [];
        }
        const categories = await res.json();
        // Filter out "Uncategorized" and categories with no posts
        return categories.filter((cat)=>cat.slug !== "uncategorized" && cat.count > 0).map(transformCategory);
    } catch (err) {
        console.error("[WP API] Categories fetch error:", err);
        return [];
    }
}
async function fetchTeamMembers() {
    try {
        const res = await fetch(`${WP_API_URL}/users?per_page=100`, {
            next: {
                revalidate: 300
            }
        });
        if (!res.ok) {
            console.error(`[WP API] Users fetch failed: ${res.status}`);
            return [];
        }
        const users = await res.json();
        console.log("Fetched users:", users);
        // Filter out admin users and transform
        return users.filter((user)=>user.slug !== "admin" && user.name !== "admin").map(transformUser);
    } catch (err) {
        console.error("[WP API] Users fetch error:", err);
        return [];
    }
}
async function fetchPage(slug) {
    try {
        const res = await fetch(`${WP_API_URL}/pages?slug=${encodeURIComponent(slug)}`, {
            next: {
                revalidate: 300
            }
        });
        if (!res.ok) {
            console.error(`[WP API] Page fetch failed: ${res.status}`);
            return null;
        }
        const pages = await res.json();
        return pages[0] || null;
    } catch (err) {
        console.error("[WP API] Page fetch error:", err);
        return null;
    }
}
const BACKEND_URL = WP_API_URL;
function processImageUrl(url) {
    return url;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0sf3j37._.js.map