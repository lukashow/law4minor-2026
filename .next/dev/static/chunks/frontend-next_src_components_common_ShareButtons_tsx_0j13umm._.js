(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend-next/src/components/common/ShareButtons.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShareButtons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-next/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f40$iconify$2f$react$2f$dist$2f$iconify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-next/node_modules/@iconify/react/dist/iconify.js [app-client] (ecmascript)");
"use client";
;
;
function openPopup(url) {
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
}
function ShareButtons({ url, title }) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title || "");
    const share = {
        facebook: ()=>openPopup(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`),
        messenger: ()=>{
            // Try native messenger scheme (mobile); fallback to Facebook sharer
            const native = `fb-messenger://share?link=${encodedUrl}`;
            const fallback = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            const w = window.open(native, "_blank", "noopener,noreferrer");
            setTimeout(()=>{
                // If native didn't open, fallback to web sharing
                try {
                    if (!w || w.closed) openPopup(fallback);
                } catch (e) {
                    openPopup(fallback);
                }
            }, 500);
        },
        twitter: ()=>openPopup(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`),
        linkedin: ()=>openPopup(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`),
        whatsapp: ()=>openPopup(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`),
        email: ()=>openPopup(`mailto:?subject=${encodedTitle}&body=${encodedUrl}`),
        copy: async ()=>{
            try {
                await navigator.clipboard.writeText(url);
                // Small user feedback; apps can replace this with a toast
                // eslint-disable-next-line no-alert
                alert("Link copied to clipboard");
            } catch (e) {
                // Fallback: prompt so user can manually copy
                // eslint-disable-next-line no-alert
                prompt("Copy this link", url);
            }
        }
    };
    const btnCls = "inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm border bg-white hover:bg-primary hover:text-white transition-colors";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                className: "font-semibold text-accent mb-3",
                children: "Share This Page"
            }, void 0, false, {
                fileName: "[project]/frontend-next/src/components/common/ShareButtons.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: share.facebook,
                        "aria-label": "Share to Facebook",
                        className: btnCls,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f40$iconify$2f$react$2f$dist$2f$iconify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                                icon: "mdi:facebook",
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/frontend-next/src/components/common/ShareButtons.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            " Facebook"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-next/src/components/common/ShareButtons.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: share.messenger,
                        "aria-label": "Share to Messenger",
                        className: btnCls,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f40$iconify$2f$react$2f$dist$2f$iconify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                                icon: "mdi:facebook-messenger",
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/frontend-next/src/components/common/ShareButtons.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            " Messenger"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-next/src/components/common/ShareButtons.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: share.twitter,
                        "aria-label": "Share to Twitter",
                        className: btnCls,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f40$iconify$2f$react$2f$dist$2f$iconify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                                icon: "mdi:twitter",
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/frontend-next/src/components/common/ShareButtons.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this),
                            " Twitter"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-next/src/components/common/ShareButtons.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: share.linkedin,
                        "aria-label": "Share to LinkedIn",
                        className: btnCls,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f40$iconify$2f$react$2f$dist$2f$iconify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                                icon: "mdi:linkedin",
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/frontend-next/src/components/common/ShareButtons.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            " LinkedIn"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-next/src/components/common/ShareButtons.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: share.whatsapp,
                        "aria-label": "Share to WhatsApp",
                        className: btnCls,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f40$iconify$2f$react$2f$dist$2f$iconify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                                icon: "mdi:whatsapp",
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/frontend-next/src/components/common/ShareButtons.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            " WhatsApp"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-next/src/components/common/ShareButtons.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: share.email,
                        "aria-label": "Share via Email",
                        className: btnCls,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f40$iconify$2f$react$2f$dist$2f$iconify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                                icon: "mdi:email",
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/frontend-next/src/components/common/ShareButtons.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this),
                            " Email"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-next/src/components/common/ShareButtons.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: share.copy,
                        "aria-label": "Copy link",
                        className: btnCls,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f40$iconify$2f$react$2f$dist$2f$iconify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                                icon: "mdi:link-variant",
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/frontend-next/src/components/common/ShareButtons.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            " Copy Link"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend-next/src/components/common/ShareButtons.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend-next/src/components/common/ShareButtons.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend-next/src/components/common/ShareButtons.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_c = ShareButtons;
var _c;
__turbopack_context__.k.register(_c, "ShareButtons");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend-next_src_components_common_ShareButtons_tsx_0j13umm._.js.map