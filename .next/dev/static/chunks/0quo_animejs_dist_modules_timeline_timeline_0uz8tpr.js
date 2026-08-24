(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend-next/node_modules/animejs/dist/modules/timeline/timeline.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Timeline",
    ()=>Timeline,
    "createTimeline",
    ()=>createTimeline
]);
/**
 * Anime.js - timeline - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$globals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-next/node_modules/animejs/dist/modules/core/globals.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$consts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-next/node_modules/animejs/dist/modules/core/consts.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-next/node_modules/animejs/dist/modules/core/helpers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$values$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-next/node_modules/animejs/dist/modules/core/values.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$targets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-next/node_modules/animejs/dist/modules/core/targets.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-next/node_modules/animejs/dist/modules/core/render.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-next/node_modules/animejs/dist/modules/core/styles.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$timer$2f$timer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-next/node_modules/animejs/dist/modules/timer/timer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$animation$2f$composition$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-next/node_modules/animejs/dist/modules/animation/composition.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$animation$2f$animation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-next/node_modules/animejs/dist/modules/animation/animation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$easings$2f$eases$2f$parser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-next/node_modules/animejs/dist/modules/easings/eases/parser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$timeline$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend-next/node_modules/animejs/dist/modules/timeline/position.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
/**
 * @import {
 *   TargetsParam,
 *   Callback,
 *   Tickable,
 *   TimerParams,
 *   AnimationParams,
 *   Target,
 *   Renderable,
 *   TimelineParams,
 *   DefaultsParams,
 *   TimelinePosition,
 *   StaggerFunction,
 *   TargetsArray,
 *   TweakRegister,
 * } from '../types/index.js'
*/ /**
 * @import {
 *   WAAPIAnimation,
 * } from '../waapi/waapi.js'
*/ /**
 * @param {Timeline} tl
 * @return {Number}
 */ function getTimelineTotalDuration(tl) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clampInfinity"])((tl.iterationDuration + tl._loopDelay) * tl.iterationCount - tl._loopDelay) || __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$consts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["minValue"];
}
/**
 * @overload
 * @param  {TimerParams} childParams
 * @param  {Timeline} tl
 * @param  {Number} timePosition
 * @return {Timeline}
 *
 * @overload
 * @param  {AnimationParams} childParams
 * @param  {Timeline} tl
 * @param  {Number} timePosition
 * @param  {TargetsParam} targets
 * @param  {Number} [index]
 * @param  {TargetsArray} [allTargets]
 * @return {Timeline}
 *
 * @param  {TimerParams|AnimationParams} childParams
 * @param  {Timeline} tl
 * @param  {Number} timePosition
 * @param  {TargetsParam} [targets]
 * @param  {Number} [index]
 * @param  {TargetsArray} [allTargets]
 */ function addTlChild(childParams, tl, timePosition, targets, index, allTargets) {
    const isSetter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNum"])(childParams.duration) && /** @type {Number} */ childParams.duration <= __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$consts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["minValue"];
    // Offset the tl position with -minValue for 0 duration animations or .set() calls in order to align their end value with the defined position
    const adjustedPosition = isSetter ? timePosition - __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$consts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["minValue"] : timePosition;
    if (tl.composition) (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$render$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tick"])(tl, adjustedPosition, 1, 1, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$consts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tickModes"].AUTO);
    const tlChild = targets ? new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$animation$2f$animation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JSAnimation"](targets, childParams, tl, adjustedPosition, false, index, allTargets) : new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$timer$2f$timer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Timer"](childParams, tl, adjustedPosition);
    if (tl.composition) tlChild.init(true);
    // TODO: Might be better to insert at a position relative to startTime?
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addChild"])(tl, tlChild);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forEachChildren"])(tl, (/** @type {Renderable} */ child)=>{
        const childTLOffset = child._offset + child._delay;
        const childDur = childTLOffset + child.duration;
        if (childDur > tl.iterationDuration) tl.iterationDuration = childDur;
    });
    tl.duration = getTimelineTotalDuration(tl);
    return tl;
}
let TLId = 0;
class Timeline extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$timer$2f$timer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Timer"] {
    /**
   * @param {TimelineParams} [parameters]
   */ constructor(parameters = {}){
        super(parameters, null, 0);
        ++TLId;
        /** @type {String|Number} */ this.id = !(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUnd"])(parameters.id) ? parameters.id : TLId;
        /** @type {Number} */ this.duration = 0; // TL duration starts at 0 and grows when adding children
        /** @type {Record<String, Number>} */ this.labels = {};
        const defaultsParams = parameters.defaults;
        const globalDefaults = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$globals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globals"].defaults;
        /** @type {DefaultsParams} */ this.defaults = defaultsParams ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeObjects"])(defaultsParams, globalDefaults) : globalDefaults;
        /** @type {Boolean} */ this.composition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$values$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setValue"])(parameters.composition, true);
        /** @type {Callback<this>} */ this.onRender = parameters.onRender || globalDefaults.onRender;
        const tlPlaybackEase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$values$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setValue"])(parameters.playbackEase, globalDefaults.playbackEase);
        this._ease = tlPlaybackEase ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$easings$2f$eases$2f$parser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEase"])(tlPlaybackEase) : null;
        /** @type {Number} */ this.iterationDuration = 0;
    }
    /**
   * @overload
   * @param {TargetsParam} a1
   * @param {AnimationParams} a2
   * @param {TimelinePosition|StaggerFunction<Number|String>|TweakRegister} [a3]
   * @return {this}
   *
   * @overload
   * @param {TimerParams} a1
   * @param {TimelinePosition} [a2]
   * @return {this}
   *
   * @param {TargetsParam|TimerParams} a1
   * @param {TimelinePosition|AnimationParams} a2
   * @param {TimelinePosition|StaggerFunction<Number|String>|TweakRegister} [a3]
   */ add(a1, a2, a3) {
        const isAnim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isObj"])(a2);
        const isTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isObj"])(a1);
        if (isAnim || isTimer) {
            this._hasChildren = true;
            if (isAnim) {
                const childParams = a2;
                const editorHook = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$globals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globals"].editor && __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$globals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globals"].editor.addTimelineChild;
                const isStaggerType = a3 && /** @type {TweakRegister} */ a3.type === 'Stagger' && __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$globals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globals"].editor;
                // Check for function or Stagger type children positions
                const staggeredPosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFnc"])(a3) ? a3 : null;
                if (staggeredPosition || isStaggerType) {
                    const parsedTargetsArray = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$targets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseTargets"])(a1);
                    // Store initial duration before adding new children that will change the duration
                    const tlDuration = this.duration;
                    // Store initial _iterationDuration before adding new children that will change the duration
                    const tlIterationDuration = this.iterationDuration;
                    // Store the original id in order to add specific indexes to the new animations ids
                    const id = childParams.id;
                    let i = 0;
                    /** @type {Number} */ const parsedLength = parsedTargetsArray.length;
                    // Call editor hook once for the entire stagger group instead of per target
                    const resolvedParams = editorHook ? editorHook(a1, childParams, this.id, a3, parsedLength) : null;
                    // Resolve stagger AFTER editor hook so tweaked position value (a3.defaultValue) is used
                    const staggerFn = staggeredPosition || __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$globals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globals"].editor.resolveStagger(/** @type {TweakRegister} */ a3.defaultValue);
                    parsedTargetsArray.forEach((/** @type {Target} */ target)=>{
                        // Create a new parameter object for each staggered children
                        const staggeredChildParams = {
                            ...resolvedParams || childParams
                        };
                        // Reset the duration of the timeline iteration before each stagger to prevent wrong start value calculation
                        this.duration = tlDuration;
                        this.iterationDuration = tlIterationDuration;
                        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUnd"])(id)) staggeredChildParams.id = id + '-' + i;
                        const staggeredTimePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$timeline$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseTimelinePosition"])(this, staggerFn(target, i, parsedTargetsArray, null, this));
                        addTlChild(staggeredChildParams, this, staggeredTimePosition, target, i, parsedTargetsArray);
                        i++;
                    });
                } else {
                    // Call editor hook before resolving position so tweaked values are applied
                    const resolvedChildParams = editorHook ? editorHook(a1, childParams, this.id, a3) : childParams;
                    const resolvedPosition = a3 && /** @type {*} */ a3.type ? /** @type {*} */ a3.defaultValue : a3;
                    addTlChild(resolvedChildParams, this, (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$timeline$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseTimelinePosition"])(this, resolvedPosition), a1);
                }
            } else {
                // It's a Timer
                addTlChild(a1, this, (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$timeline$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseTimelinePosition"])(this, a2));
            }
            if (this.composition) this.init(true);
            return this;
        }
    }
    /**
   * @overload
   * @param {Tickable} [synced]
   * @param {TimelinePosition} [position]
   * @return {this}
   *
   * @overload
   * @param {globalThis.Animation} [synced]
   * @param {TimelinePosition} [position]
   * @return {this}
   *
   * @overload
   * @param {WAAPIAnimation} [synced]
   * @param {TimelinePosition} [position]
   * @return {this}
   *
   * @param {Tickable|WAAPIAnimation|globalThis.Animation} [synced]
   * @param {TimelinePosition} [position]
   */ sync(synced, position) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUnd"])(synced) || synced && (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUnd"])(synced.pause)) return this;
        synced.pause();
        const duration = +(/** @type {globalThis.Animation} */ synced.effect ? /** @type {globalThis.Animation} */ synced.effect.getTiming().duration : /** @type {Tickable} */ synced.duration);
        // Forces WAAPI Animation to persist; otherwise, they will stop syncing on finish.
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUnd"])(synced) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUnd"])(/** @type {WAAPIAnimation} */ synced.persist)) {
            /** @type {WAAPIAnimation} */ synced.persist = true;
        }
        const editor = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$globals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globals"].editor;
        const childHook = editor && editor.addTimelineChild;
        if (editor && editor.addTimelineSync) {
            position = editor.addTimelineSync(synced, position, this.id);
            editor.addTimelineChild = null; // Suppress the per-child hook for the internal .add, sync already registered.
        }
        const result = this.add(synced, {
            currentTime: [
                0,
                duration
            ],
            duration,
            delay: 0,
            ease: 'linear',
            playbackEase: 'linear'
        }, position);
        if (editor) editor.addTimelineChild = childHook;
        return result;
    }
    /**
   * @param  {TargetsParam} targets
   * @param  {AnimationParams} parameters
   * @param  {TimelinePosition|StaggerFunction<Number|String>|TweakRegister} [position]
   * @return {this}
   */ set(targets, parameters, position) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUnd"])(parameters)) return this;
        parameters.duration = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$consts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["minValue"];
        parameters.composition = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$consts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compositionTypes"].replace;
        return this.add(targets, parameters, position);
    }
    /**
   * @param {Callback<Timer>} callback
   * @param {TimelinePosition} [position]
   * @return {this}
   */ call(callback, position) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUnd"])(callback) || callback && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFnc"])(callback)) return this;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$globals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globals"].editor && __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$globals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globals"].editor.addTimelineCall) position = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$globals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globals"].editor.addTimelineCall(callback, position, this.id);
        return this.add({
            duration: 0,
            delay: 0,
            onComplete: ()=>callback(this)
        }, position);
    }
    /**
   * @param {String} labelName
   * @param {TimelinePosition} [position]
   * @return {this}
   *
   */ label(labelName, position) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUnd"])(labelName) || labelName && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isStr"])(labelName)) return this;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$globals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globals"].editor && __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$globals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globals"].editor.addTimelineLabel) position = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$globals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globals"].editor.addTimelineLabel(labelName, position, this.id);
        this.labels[labelName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$timeline$2f$position$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseTimelinePosition"])(this, position);
        return this;
    }
    /**
   * @param  {TargetsParam} targets
   * @param  {String} [propertyName]
   * @return {this}
   */ remove(targets, propertyName) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$animation$2f$composition$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeTargetsFromRenderable"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$targets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseTargets"])(targets), this, propertyName);
        return this;
    }
    /**
   * @param  {Number} newDuration
   * @return {this}
   */ stretch(newDuration) {
        const currentDuration = this.duration;
        if (currentDuration === (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeTime"])(newDuration)) return this;
        const timeScale = newDuration / currentDuration;
        const labels = this.labels;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forEachChildren"])(this, (/** @type {JSAnimation} */ child)=>child.stretch(child.duration * timeScale));
        for(let labelName in labels)labels[labelName] *= timeScale;
        return super.stretch(newDuration);
    }
    /**
   * @return {this}
   */ refresh() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forEachChildren"])(this, (/** @type {JSAnimation|Timer} */ child)=>{
            if (/** @type {JSAnimation} */ child.refresh) /** @type {JSAnimation} */ child.refresh();
        });
        return this;
    }
    /**
   * @return {this}
   */ revert() {
        super.revert();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forEachChildren"])(this, (/** @type {JSAnimation|Timer} */ child)=>child.revert, true);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$styles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["revertValues"])(this);
    }
    /**
   * @typedef {this & {then: null}} ResolvedTimeline
   */ /**
   * @param  {Callback<ResolvedTimeline>} [callback]
   * @return Promise<this>
   */ then(callback) {
        return super.then(callback);
    }
}
/**
 * @param {TimelineParams} [parameters]
 * @return {Timeline}
 */ const createTimeline = (parameters)=>{
    if (__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$globals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globals"].editor) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2d$next$2f$node_modules$2f$animejs$2f$dist$2f$modules$2f$core$2f$globals$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["globals"].editor.addTimeline(parameters);
    }
    return new Timeline(parameters).init();
};
;
}),
]);

//# sourceMappingURL=0quo_animejs_dist_modules_timeline_timeline_0uz8tpr.js.map