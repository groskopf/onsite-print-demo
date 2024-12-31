/* ------------------------------------------------------------------------
 *  DataGridXL
 *  v2.22.12.02
 *  (c) Vanilla Components
 *  https://datagridxl.com/buy
 ?	Updated: 2024-12-31 - 05:17 (Y:M:D - H:M) - Niels Gerdes (#NG)
 ?  Info: Removed the "fullscreenButton".
--------------------------------------------------------------------------- */

var DataGridXL = function () {
    "use strict";
    var t = ["optimizeSpeed", "-moz-crisp-edges", "-webkit-optimize-contrast", "optimize-contrast", "pixelated"];

    function e(t) {
        return Array.isArray(t)
    }

    function i(t) {
        return e(t) && e(t[0])
    }

    function o(t) {
        for (var e, i = 0; i < t.length; i++) e = 1 + i, this._rows.store.push({
            id: e,
            title: void 0,
            _hide: !1,
            _pass: !0
        }), this._rows.indexList.push(e);
        this._rows.store._lastId = e
    }

    function s(t) {
        return t instanceof Object && t.constructor === Object
    }

    function n(t) {
        return e(t) && s(t[0])
    }

    function r(t, e) {
        void 0 === e && (e = null), null != e && n(e) ? h.call(this, t, e) : i(t) ? a.call(this, t) : n(t) && c.call(this, t)
    }
    var l = function (t, e, i) {
            void 0 === e && (e = null), void 0 === i && (i = 0);
            for (var o = !1, s = i, n = 0; n < t.length; n++) {
                s += 1;
                var r = void 0,
                    l = void 0;
                null != e && ("source" in t[n] ? t[n].source in e && (r = t[n].source, l = t[n].source) : (r = e[n] || void 0, l = e[n] || void 0));
                var h = t[n].field || r,
                    a = t[n].title || l,
                    c = t[n]._hide || !1;
                this._cols.store.push({
                    id: s,
                    field: h,
                    title: a,
                    width: t[n].width || this.colWidth,
                    align: t[n].align || this.colAlign,
                    _hide: c,
                    level: 0,
                    parent_id: void 0,
                    _role: "data"
                }), c || (o = !0)
            }
            return o || (this._cols.store[this._cols.store.length - 1]._hide = !1), s
        },
        h = function (t, e) {
            if (n(t)) var i = Object.keys(t[0]);
            else i = null;
            l.call(this, e, i);
            for (var o = [], s = 0; s < this._cols.store.length; s++) o.push(this._cols.store[s].id);
            this._cols.indexList = o, this._cols.store._lastId = this._cols.store[this._cols.store.length - 1].id
        },
        a = function (t) {
            for (var e, i = 0; i < t[0].length; i++) e = 1 + i, this._cols.store.push({
                id: e,
                field: void 0,
                title: void 0,
                width: this.colWidth,
                align: this.colAlign,
                _hide: !1,
                level: 0,
                parent_id: void 0,
                _role: "data"
            }), this._cols.indexList.push(e);
            this._cols.store._lastId = e
        },
        c = function (t) {
            var e, i = 0;
            for (var o in t[0]) {
                e = 1 + i;
                var s = o,
                    n = o;
                this._cols.store.push({
                    id: e,
                    field: s,
                    title: n,
                    width: this.colWidth,
                    align: this.colAlign,
                    _hide: !1,
                    level: 0,
                    parent_id: void 0,
                    _role: "data"
                }), this._cols.indexList.push(e), i++
            }
            this._cols.store._lastId = e
        };

    function d(t) {
        return null !== t && "" !== t && !isNaN(t)
    }

    function u(t, e) {
        void 0 === e && (e = null), this._cellStore = [], null != e && n(e) ? i(t) ? p.call(this, t, e) : n(t) && g.call(this, t, e) : i(t) ? f.call(this, t) : n(t) && _.call(this, t)
    }
    var p = function (t, e) {
            for (var i = 0; i < this._rows.store.length; i++) {
                this._cellStore[this._rows.store[i].id - 1] = [];
                for (var o = 0; o < this._cols.store.length; o++) {
                    if ("source" in e[o] && d(e[o].source)) var s = Number(e[o].source);
                    else s = o;
                    this._cellStore[this._rows.store[i].id - 1][this._cols.store[o].id - 1] = {
                        value: t[i][s],
                        _found: !1
                    }
                }
            }
        },
        f = function (t) {
            for (var e = 0; e < this._rows.store.length; e++) {
                this._cellStore[this._rows.store[e].id - 1] = [];
                for (var i = 0; i < this._cols.store.length; i++) this._cellStore[this._rows.store[e].id - 1][this._cols.store[i].id - 1] = {
                    value: t[e][i],
                    _found: !1
                }
            }
        },
        g = function (t, e) {
            for (var i = 0; i < this._rows.store.length; i++) {
                this._cellStore[this._rows.store[i].id - 1] = [];
                for (var o = 0; o < this._cols.store.length; o++) {
                    if ("source" in e[o]) var s = e[o].source;
                    else s = Object.keys(t[0])[o];
                    this._cellStore[this._rows.store[i].id - 1][this._cols.store[o].id - 1] = {
                        value: t[i][s],
                        _found: !1
                    }
                }
            }
        },
        _ = function (t) {
            for (var e = 0; e < this._rows.store.length; e++) {
                this._cellStore[this._rows.store[e].id - 1] = [];
                for (var i = 0; i < this._cols.store.length; i++) this._cellStore[this._rows.store[e].id - 1][this._cols.store[i].id - 1] = {
                    value: t[e][this._cols.store[i].field],
                    _found: !1
                }
            }
        };

    function y(t, e) {
        void 0 === t && (t = null), void 0 === e && (e = null), this._dataFormat = i(t) ? "arrayCollection" : "objectCollection", o.call(this, t), r.call(this, t, e), u.call(this, t, e)
    }

    function v(t) {
        "data" in t && e(t.data) ? y.call(this, t.data, t.columns || null) : "columns" in t && e(t.columns) ? y.call(this, m(t.columns), t.columns) : y.call(this, this.constructor.createEmptyData(3, 3))
    }
    var m = function (t) {
        for (var e = [], i = 0; i < 3; i++) {
            e.push([]);
            for (var o = 0; o < t.length; o++) e[i].push(null)
        }
        return e
    };

    function x() {
        var t = [],
            e = 0,
            i = [],
            o = -1,
            s = [],
            n = !1,
            r = [
                [],
                [],
                []
            ],
            l = [
                [],
                [],
                []
            ];
        if (null != this._freezeLineColAfterId) var h = 0;
        else h = 1;
        for (var a = 0; a < this._cols.indexList.length; a++) {
            this._cols.store[this._cols.indexList[a] - 1]._hide ? (n ? i[o].push(this._cols.indexList[a]) : (i[++o] = [this._cols.indexList[a]], e > 0 && (s[e - 1][1] = o)), n = !0) : (t.push(this._cols.indexList[a]), r[h].push(this._cols.indexList[a]), n ? s.push([o, null]) : s.push([null, null]), e++, n = !1), l[h].push(this._cols.indexList[a]), this._cols.indexList[a] == this._freezeLineColAfterId && (h = 1)
        }
        this._cols.hiddenGroups = i, this._cols.iconList = s, this._cols.coordList = t, this._cols.coordSections = r, this._cols.indexSections = l
    }

    function w() {
        var t = [],
            e = 0,
            i = [],
            o = -1,
            s = [],
            n = !1,
            r = [
                [],
                [],
                []
            ],
            l = [
                [],
                [],
                []
            ];
        if (null != this._freezeLineRowAfterId) var h = 0;
        else h = 1;
        for (var a = 0; a < this._rows.indexList.length; a++) {
            var c = this._rows.store[this._rows.indexList[a] - 1];
            c._hide ? (n ? i[o].push(this._rows.indexList[a]) : (i[++o] = [this._rows.indexList[a]], e > 0 && (s[e - 1][1] = o)), n = !0) : c._pass && (t.push(this._rows.indexList[a]), r[h].push(this._rows.indexList[a]), n ? s.push([o, null]) : s.push([null, null]), e++, n = !1), l[h].push(this._rows.indexList[a]), this._rows.indexList[a] == this._freezeLineRowAfterId && (h = 1)
        }
        this._rows.hiddenGroups = i, this._rows.iconList = s, this._rows.coordList = t, this._rows.coordSections = r, this._rows.indexSections = l
    }

    function C(t) {
        for (var e = [], i = 0; i < t.length; i++) "string" == typeof t[i] ? !(t[i] in this._presetParts) || "include" in this._presetParts[t[i]] && !this._presetParts[t[i]].include.call(this) || e.push(this._presetParts[t[i]]) : e.push(t[i]);
        return e
    }

    function b(t) {
        S.call(this, t), v.call(this, t), I.call(this), x.call(this), w.call(this), this._validatedTopBar = C.call(this, this.topBar), this._validatedBottomBar = C.call(this, this.bottomBar)
    }
    var S = function (t) {
            for (var e in t) e in this && (this[e] = t[e])
        },
        I = function () {
            var t = this.frozenCols,
                e = this.frozenRows;
            this.frozenCols >= this._cols.indexList.length && (t = 0), this.frozenRows >= this._rows.indexList.length && (e = 0), this._freezeLineColAfterId = this._cols.indexList[t - 1] || null, this._freezeLineRowAfterId = this._rows.indexList[e - 1] || null
        };

    function R(t) {
        return "function" == typeof t
    }

    function L(t, e) {
        void 0 === t && (t = {}), void 0 === e && (e = {});
        var i = {};
        if (null != t && Object.keys(t).length)
            for (var o in t) i[o] = t[o];
        if (null != e && Object.keys(e).length)
            for (var o in e) i[o] = e[o];
        return i
    }

    function P(t, e, i) {
        void 0 === t && (t = null), void 0 === e && (e = {}), void 0 === i && (i = !1);
        i && (e = L({
            margin: 0,
            padding: 0,
            "font-weight": "normal",
            "font-size": "100%",
            "font-family": "inherit",
            "vertical-align": "baseline",
            "list-style": "none",
            "box-sizing": "border-box",
            "text-align": "left"
        }, e)), N(t, e)
    }
    var N = function (t, e) {
        var i = ["user-select", "user-drag", "touch-callout"],
            o = ["-ktml", "-moz-", "-ms-", "-webkit-", "-o-"];
        for (var s in e) {
            if (i.indexOf(s) > -1)
                for (var n = 0; n < o.length; n++) o[n] + s in e || (t.style[o[n] + s] = e[s]);
            null !== e[s] && (t.style[s] = e[s])
        }
    };

    function k(t, i) {
        void 0 === i && (i = !1);
        var o = "";
        for (var s in t) {
            if (e(t[s]))
                for (var n = 0; n < t[s].length; n++) o += s + ": " + t[s][n] + ";";
            else i && (o += "\t"), o += s + ": " + t[s] + ";";
            i && (o += "\n")
        }
        return o
    }

    function H(t, e) {
        void 0 === t && (t = "div"), void 0 === e && (e = {});
        var i = document.createElement(t);
        for (var o in e)
            if ("name" != o && "tag" != o && "domNodes" != o && "children" != o)
                if ("text" == o) i.textContent = e.text;
                else if ("html" == o) i.innerHTML = e.html;
        else if ("style" == o) {
            var s = !0;
            "_reset" in e && (s = e._reset), P(i, e.style, s)
        } else "noCSS" == o ? P(i, e.noCSS, !1) : "styleText" == o ? i.style.cssText = k(e.styleText) : o.startsWith("_") ? i[o] = e[o] : ("string" == typeof e[o] || d(e[o])) && i.setAttribute(o, e[o]);
        return i
    }

    function z() {
        return document.createDocumentFragment()
    }

    function A(t, e) {
        void 0 === t && (t = null), void 0 === e && (e = []);
        for (var i = z(), o = 0; o < e.length; o++) null != e[o] && i.appendChild(e[o]);
        return t.appendChild(i), t
    }

    function T(t, e) {
        return void 0 === e && (e = this._domNodes), F.call(this, t, e)
    }
    var F = function (t, e) {
        if (void 0 === e && (e = null), null == t) return null;
        var i = "",
            o = [];
        if ("name" in t) {
            o = t.name.split(" ");
            for (var s = 0; s < o.length; s++) i += "dgxl-" + o[s].replace(".", "-"), s < o.length - 1 && (i += " ");
            t.class = i
        }
        var n = H(t.tag || "div", t);
        if ("domNodes" in t && t.domNodes.length && A(n, t.domNodes), "children" in t && t.children.length) {
            var r = [];
            for (s = 0; s < t.children.length; s++) "_reset" in t && (t.children[s]._reset = t._reset), r.push(F.call(this, t.children[s], e));
            A(n, r)
        }
        if (null != e && o.length) {
            var l = o[0].split(".");
            l.length > 1 ? (l[0] in e || (e[l[0]] = {}), e[l[0]][l[1]] = n) : e[o[0]] = n
        }
        return n
    };

    function E() {
        return {
            name: "contextMenu theme-" + this.cssTheme,
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                "z-index": 99999,
                "-webkit-touch-callout": "none",
                "user-select": "none",
                "font-family": this.fontFamily,
                "font-size": this.fontSize,
                display: "none"
            }
        }
    }

    function M() {
        return {
            name: "contextMenuTouch theme-" + this.cssTheme,
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                padding: "0",
                "z-index": 99999,
                "-webkit-touch-callout": "none",
                "user-select": "none",
                "font-family": "sans-serif",
                "font-size": "14px",
                "overflow-x": "auto",
                visibility: "hidden"
            }
        }
    }

    function B() {
        return {
            name: "scrollbarMeter",
            style: {
                position: "absolute",
                width: "100px",
                height: "100px",
                "pointer-events": "none",
                visibility: "hidden",
                top: 0,
                left: 0,
                overflow: "scroll"
            },
            children: [{
                name: "scrollbarMeterSurface",
                style: {
                    width: "200px",
                    height: "200px"
                }
            }]
        }
    }

    function O() {
        return {
            name: "container",
            style: {
                overflow: "hidden",
                position: "relative",
                "text-align": "left",
                "touch-action": "auto"
            }
        }
    }

    function D() {
        return {
            name: "textWidthMeter",
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                "pointer-events": "none",
                visibility: "hidden"
            },
            children: [{
                tag: "canvas",
                name: "textWidthMeterCanvas"
            }]
        }
    }

    function V() {
        return {
            name: "lineHeightMeter",
            style: {
                "white-space": "pre",
                overflow: "hidden",
                position: "absolute",
                display: "inline-block",
                "z-index": 1e3,
                top: 0,
                left: 0,
                "line-height": this.rowHeight + "px",
                "font-family": this.fontFamily,
                "font-size": this.fontSize + "px",
                "pointer-events": "none",
                visibility: "hidden"
            },
            text: X()
        }
    }
    var X = function () {
            for (var t = "", e = 0; e < "abc".length; e++) t += "abc\n";
            return t.trim()
        },
        Y = {
            ".dgxl-component": function () {
                return {
                    "background-color": this.getThemeSetting("component")
                }
            },
            ".dgxl-bar": function () {
                return {
                    "column-gap": "4px", // #NG - 6px
                    padding: "0 0 4px" // #NG - 6px
                }
            },
            ".dgxl-inputWrapper": function () {
                return {
                    display: "flex",
                    "flex-grow": 1,
                    position: "relative",
                    "border-width": "1px",
                    "border-style": "solid",
                    "border-color": this.getThemeSetting("input|border"),
                    "border-radius": "4px",
                    background: this.getThemeSetting("input")
                }
            },
            ".dgxl-inputWrapper.dgxl-hasFocus": function () {
                return {
                    "box-shadow": "inset 0 0 0 1px " + this.getThemeSetting("input:focus|border"),
                    "border-color": this.getThemeSetting("input:focus|border")
                }
            },
            "reset|.dgxl-inputWrapper.dgxl-hasFocus": function () {
                return {
                    "box-shadow": "",
                    "border-color": this.getThemeSetting("input|border")
                }
            },
            ".dgxl-inputField": function () {
                return {
                    border: "none",
                    outline: "none",
                    width: "100%",
                    position: "relative",
                    "background-color": "transparent",
                    height: "100%",
                    "box-sizing": "border-box",
                    padding: "0 6px",
                    color: this.getThemeSetting("input|text")
                }
            },
            ".dgxl-part button": function () {
                var t = {
                    "box-sizing": "border-box",
                    "background-color": this.getThemeSetting("button"),
                    "border-color": "transparent",
                    "border-style": "solid",
                    "border-width": "1px",
                    "border-radius": "4px",
                    color: "#0f1111",
                    cursor: "pointer",
                    display: "flex",
                    "align-items": "center",
                    "justify-content": "center",
                    "font-family": "sans-serif",
                    overflow: "hidden",
                    padding: "0 6px",
                    "text-align": "center",
                    "text-decoration": "none",
                    "touch-action": "manipulation",
                    "white-space": "nowrap",
                    "min-width": "32px",
                    "flex-grow": 0,
                    height: "100%"
                };
                return "button" in this.theme || (t["background-image"] = "linear-gradient(#f7f8fa ,#e7e9ec)", t["border-color"] = "#adb1b8 #a2a6ac #8d9096"), t
            },
            ".dgxl-part button svg": function () {
                return {
                    fill: this.getThemeSetting("button-icon")
                }
            },
            ".dgxl-inputInfo": function () {
                return {
                    position: "absolute",
                    top: "50%",
                    right: "6px",
                    color: this.getThemeSetting("input-info"),
                    transform: "translateY(-50%)",
                    "font-size": this.fontSize + 2 + "px"
                }
            },
            ".dgxl-contextMenuItemList": function () {
                return {
                    "border-radius": "4px",
                    "list-style": "none",
                    margin: 0,
                    padding: "var(--dgxl-contextmenu-verticalpadding) 1px",
                    "background-color": this.getThemeSetting("contextmenu"),
                    color: this.getThemeSetting("contextmenu|text"),
                    "font-size": "14px",
                    "box-shadow": "0 0 4px var(--dgxl-contextmenu-shadowcolor)"
                }
            },
            ".dgxl-contextMenuItem": function () {
                return {
                    height: "var(--dgxl-contextmenu-itemheight)",
                    "line-height": "var(--dgxl-contextmenu-itemheight)",
                    padding: "0 10px",
                    position: "relative"
                }
            },
            ".dgxl-contextMenuItem-highlight": function () {
                return {
                    "background-color": this.getThemeSetting("contextmenu-item:highlight")
                }
            },
            "reset|.dgxl-contextMenuItem-highlight": function () {
                return {
                    "background-color": ""
                }
            },
            ".dgxl-contextMenuItemShortcutLabel": function () {
                return {
                    position: "absolute",
                    right: "10px",
                    top: 0,
                    color: this.getThemeSetting("contextmenu-item-shortcut"),
                    "font-size": "smaller"
                }
            }
        };

    function W(t) {
        for (var e = t.parentNode.children, i = 0; i < e.length; i++)
            if (e[i] == t) return i;
        return -1
    }

    function K(t, e) {
        for (;
            "classList" in t && !t.classList.contains(e);) t = t.parentNode;
        return "classList" in t && t.classList.contains(e) ? t : null
    }

    function j(t, e, i) {
        if (void 0 === e && (e = "#fff"), void 0 === i && (i = "#000"), "rgb" == t.substring(0, 3)) var o = t.replace(/[^\d,.]/g, "").split(","),
            s = o[0],
            n = o[1],
            r = o[2];
        else {
            var l = "#" === t.charAt(0) ? t.substring(1, 7) : t;
            s = parseInt(l.substring(0, 2), 16), n = parseInt(l.substring(2, 4), 16), r = parseInt(l.substring(4, 6), 16)
        }
        var h = [s / 255, n / 255, r / 255].map((function (t) {
            return t <= .03928 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)
        }));
        return .2126 * h[0] + .7152 * h[1] + .0722 * h[2] > .179 ? i : e
    }
    var U = function (t, e) {
        void 0 === t && (t = null), this._domNodes = {}, this._offsetX = 4, this._offsetY = 4, this._prevCursorIndex = null, this._cursorIndex = null, this._context = null, this._isOpen = !1, this.dimensions = {
            width: 240,
            verticalPadding: 6,
            itemHeight: 30
        }, this._selectItemCallback = function () {}, this._closeCallback = function () {}, this.items = [], this._domNodes.containerNode = t
    };
    U.prototype.isOpen = function () {
        return this._isOpen
    }, U.prototype.open = function (t, e, i, o, s, n) {
        this._isOpen = !0, this.items = e, this._context = t, this._selectItemCallback = s, this._closeCallback = n;
        var r = "--dgxl-contextmenu-shadowcolor: " + j(this._context.getThemeSetting("sheet"), "rgba(255,255,255,.35)", "rgba(0,0,0,.35)") + ";--dgxl-contextmenu-verticalpadding: " + this.dimensions.verticalPadding + "px;";
        r += k(Y[".dgxl-contextMenuItemList"].call(this._context));
        var l = "--dgxl-contextmenu-itemheight: " + this.dimensions.itemHeight + "px;";
        l += k(Y[".dgxl-contextMenuItem"].call(this._context));
        for (var h = k(Y[".dgxl-contextMenuItemShortcutLabel"].call(this._context)), a = '<ul class="dgxl-contextMenuItemList" style="' + r + '">', c = 0; c < this.items.length; c++) {
            var d = "dgxl-contextMenuItem",
                u = "",
                p = !1;
            "disabled" in this.items[c] && this.items[c].disabled.call(this._context) ? (d += " " + d + "-disabled", u += "opacity:0.25;", p = !0) : u += "cursor:pointer;", a += '<li class="' + d + '" style="' + (l + u) + '"', a += p ? ' data-disabled="true"' : ' data-disabled="false"', a += ">";
            var f = R(this.items[c].label) ? this.items[c].label.call(this._context) : this.items[c].label;
            a += '<div class="dgxl-contextMenuItemLabel">' + this._context.getLocaleSetting(f) + "</div>", "shortcut" in this.items[c] && (a += '<div class="dgxl-contextMenuItemShortcutLabel" style="' + h + '">' + this.items[c].shortcut + "</div>"), a += "</li>"
        }
        a += "</ul>", Q.call(this, window, i, o), this._domNodes.containerNode.innerHTML = a, this._domNodes.containerNode.style.display = "block", this.setCursor(-1), "_mouseDownListener" in this._domNodes.containerNode || (this._domNodes.containerNode._mouseDownListener = function (t) {
            if (this._domNodes.containerNode.contains(t.target)) {
                if (0 == t.button) {
                    var e = K(t.target, "dgxl-contextMenuItem");
                    if (null == e) var i = -1;
                    else i = W(e);
                    this.hit(i)
                }
            } else this.close()
        }.bind(this)), "_contextMenuListener" in this._domNodes.containerNode || (this._domNodes.containerNode._contextMenuListener = function (t) {
            t.preventDefault()
        }), document.addEventListener("mousedown", this._domNodes.containerNode._mouseDownListener), document.addEventListener("contextmenu", this._domNodes.containerNode._contextMenuListener), "_mouseMoveListener" in this._domNodes.containerNode || (this._domNodes.containerNode._mouseMoveListener = function (t) {
            var e = K(t.target, "dgxl-contextMenuItem");
            if (null == e || 1 == e.dataset.disabled) var i = -1;
            else i = W(e);
            this.setCursor(i)
        }.bind(this)), "_mouseLeaveListener" in this._domNodes.containerNode || (this._domNodes.containerNode._mouseLeaveListener = function (t) {
            this.setCursor(-1)
        }.bind(this)), this._domNodes.containerNode.addEventListener("mousemove", this._domNodes.containerNode._mouseMoveListener), this._domNodes.containerNode.addEventListener("mouseleave", this._domNodes.containerNode._mouseLeaveListener)
    }, U.prototype.close = function () {
        this._closeCallback.call(this._context, {
            contextMenu: this
        })
    }, U.prototype.execClose = function () {
        this._isOpen = !1, document.removeEventListener("mousedown", this._domNodes.containerNode._mouseDownListener), document.removeEventListener("contextmenu", this._domNodes.containerNode._contextMenuListener), this._domNodes.containerNode.removeEventListener("mousemove", this._domNodes.containerNode._mouseMoveListener), this._domNodes.containerNode.removeEventListener("mouseleave", this._domNodes.containerNode._mouseLeaveListener), this.setCursor(-1), this._domNodes.containerNode.innerHTML = "", this._domNodes.containerNode.style.display = "none"
    }, U.prototype.setCursor = function (t) {
        if (t !== this._prevCursorIndex) {
            var e = this._domNodes.containerNode;
            e.children.length && (null !== this._prevCursorIndex && this._prevCursorIndex > -1 && (P(e.children[0].children[this._prevCursorIndex], Y["reset|.dgxl-contextMenuItem-highlight"].call(this._context)), e.children[0].children[this._prevCursorIndex].classList.remove("dgxl-contextMenuItem-highlight")), this._cursorIndex = t, null !== this._cursorIndex && this._cursorIndex > -1 && (P(e.children[0].children[this._cursorIndex], Y[".dgxl-contextMenuItem-highlight"].call(this._context)), e.children[0].children[this._cursorIndex].classList.add("dgxl-contextMenuItem-highlight")), this._prevCursorIndex = this._cursorIndex)
        }
    }, U.prototype.moveCursorDown = function () {
        -1 == this._cursorIndex || null === this._cursorIndex || this._cursorIndex == Z.call(this) ? this.setCursor(q.call(this)) : this.setCursor(G.call(this, this._cursorIndex))
    }, U.prototype.moveCursorUp = function () {
        -1 == this._cursorIndex || null === this._cursorIndex || 0 == this._cursorIndex ? this.setCursor(Z.call(this)) : this.setCursor($.call(this, this._cursorIndex))
    }, U.prototype.moveCursorRight = function () {}, U.prototype.moveCursorLeft = function () {}, U.prototype.redrawLabels = function () {
        if (this.isOpen())
            for (var t = this._domNodes.containerNode.getElementsByClassName("dgxl-contextMenuItemList")[0], e = 0; e < this.items.length; e++) R(this.items[e].label) && (t.children[e].firstChild.innerHTML = this._context.getLocaleSetting(this.items[e].label.call(this._context)))
    }, U.prototype.triggerHit = function () {
        this.hit(this._cursorIndex)
    }, U.prototype.hit = function (t) {
        -1 != t && this.items[t] && ("disabled" in this.items[t] && this.items[t].disabled.call(this._context) || "method" in this.items[t] && this._selectItemCallback.call(this._context, {
            contextMenu: this,
            index: t,
            item: this.items[t]
        }))
    };
    var q = function () {
            return G.call(this, -1)
        },
        G = function (t) {
            if (t == this.items.length - 1) var e = 0;
            else e = t + 1;
            return "disabled" in this.items[e] && this.items[e].disabled.call(this._context) ? G.call(this, e) : e
        },
        Z = function () {
            return $.call(this, this.items.length)
        },
        $ = function (t) {
            if (0 == t) var e = this.items.length - 1;
            else e = t - 1;
            return "disabled" in this.items[e] && this.items[e].disabled.call(this._context) ? $.call(this, e) : e
        },
        Q = function (t, e, i) {
            void 0 === t && (t = window);
            var o = this._domNodes.containerNode,
                s = 2 * this.dimensions.verticalPadding + this.items.length * this.dimensions.itemHeight,
                n = this.dimensions.width;
            if (o.style.width = n + "px", t == window) var r = window.scrollY + window.innerHeight,
                l = window.scrollX + window.innerWidth;
            else if (t instanceof Element) {
                var h = t.getBoundingClientRect();
                r = Math.floor(window.scrollY + h.y + h.height), l = Math.floor(window.scrollX + h.x + h.width)
            }
            i + this._offsetY + s > r ? o._top = i - (s + this._offsetY) : o._top = i + this._offsetY, e + this._offsetX + n > l ? o._left = e - (n + this._offsetX) : o._left = e + this._offsetX, o.style.top = o._top + "px", o.style.left = o._left + "px"
        };

    function J() {
        tt.call(this), et.call(this), it.call(this), ot.call(this)
    }
    var tt = function () {
            null === this._container ? this._domNodes.container = null : this._container instanceof HTMLElement ? this._domNodes.container = this._container : this._domNodes.container = document.getElementById(this._container), null === this._container ? T.call(this, O.call(this)) : this._domNodes.container.innerHTML = ""
        },
        et = function () {
            Object.keys(this.constructor._domNodes).length || (A(document.body, [T.call(this, E.call(this), this.constructor._domNodes), T.call(this, M.call(this), this.constructor._domNodes), T.call(this, B.call(this), this.constructor._domNodes)]), this.constructor.contextMenu = new U(this.constructor._domNodes.contextMenu))
        },
        it = function () {
            A(document.body, [T.call(this, D.call(this)), T.call(this, V.call(this))]), this._textWidthMeterCanvasContext = this._domNodes.textWidthMeterCanvas.getContext("2d"), this._textWidthMeterCanvasContext.font = this.fontSize + "px " + this.fontFamily
        },
        ot = function () {
            if (this.constructor._isIOS) {
                var t = T.call(this, {
                    tag: "style",
                    html: "\n    .dgxl-ios-fullscreen {\n      width: 100vw !important;\n      height: 100vh !important;\n    }\n  "
                });
                document.head.appendChild(t)
            }
        };

    function st() {
        var t = this.constructor._domNodes.scrollbarMeter;
        this.constructor._browserScrollbarSize = t.offsetWidth - t.clientWidth
    }

    function nt() {
        var t = this._domNodes.lineHeightMeter.getBoundingClientRect(),
            e = "abc".length;
        this._actualRowHeight = Math.round(t.height / e * 100) / 100
    }

    function rt() {
        var t = !1,
            e = window.getComputedStyle(this._domNodes.container);
        this._cd.containerWidth = this._domNodes.container.clientWidth - (parseFloat(e.paddingLeft) + parseFloat(e.paddingRight)), this._cd.containerHeight = this._domNodes.container.clientHeight - (parseFloat(e.paddingTop) + parseFloat(e.paddingBottom)), 0 == this._containerHeight && (this._domNodes.container.style.height = "300px", t = !0), 0 == this._containerWidth && (this._domNodes.container.style.width = "100%"), "static" == e.position && (this._domNodes.container.style.position = "relative"), "inline" == e.display && (this._domNodes.container.style.display = "inline-block", t = !0), "hidden" != e.overflow && (this._domNodes.container.style.overflow = "hidden"), t && (e = window.getComputedStyle(this._domNodes.container), this._cd.containerWidth = this._domNodes.container.clientWidth - (parseFloat(e.paddingLeft) + parseFloat(e.paddingRight)), this._cd.containerHeight = this._domNodes.container.clientHeight - (parseFloat(e.paddingTop) + parseFloat(e.paddingBottom)))
    }

    function lt() {
        return this.topBar && this.topBar.length ? 44 : 0 // #NG - 48
    }

    function ht() {
        return this.bottomBar && this.bottomBar.length ? 44 : 0 // #NG - 48
    }

    function at() {
        return this._cd.componentWidth
    }

    function ct() {
        return this._cd.componentHeight - this._cd.topBarSpace - this._cd.bottomBarSpace
    }

    function dt() {
        return this.constructor._browserScrollbarSize || 10
    }

    function ut() {
        return this._cd.displayWidth - this._cd.scrollbarSpace
    }

    function pt() {
        return this._cd.displayHeight - this._cd.scrollbarSpace
    }

    function ft() {
        return this._rows.headerLevels.length * this.rowHeaderWidth
    }

    function gt() {
        return this._cols.headerLevels.length * this.colHeaderHeight
    }

    function _t() {
        return this._cd.colHeaderLevelsSpace + this.colHeaderHeight
    }

    function yt() {
        return this._cd.rowHeaderLevelsSpace + this.rowHeaderWidth
    }

    function vt(t) {
        for (var e = 0, i = t[0]; i <= t[1]; i++) e += this.getColWidthById(this.getColIdByCoord(i));
        return e
    }

    function mt() {
        var t = this._cd.rowHeaderSpace;
        if (this._cols.coordSections[0].length) {
            var e = 0 + this._cols.coordSections[0].length - 1;
            t += vt.call(this, [0, e])
        }
        return {
            left: t,
            center: this._cd.viewportWidth - t
        }
    }

    function xt(t) {
        for (var e = 0, i = t[0]; i <= t[1]; i++) e += this.getRowHeightById(this.getRowIdByCoord(i));
        return e
    }

    function wt() {
        var t = this._cd.colHeaderSpace;
        if (this._rows.coordSections[0].length) {
            var e = 0 + this._rows.coordSections[0].length - 1;
            t += xt.call(this, [0, e])
        }
        return {
            top: t,
            center: this._cd.viewportHeight - t
        }
    }

    function Ct() {
        for (var t = this._cd.rowHeaderSpace, e = 0; e < this._sectionsPerPaneX.left.length; e++) t += bt.call(this, this._sectionsPerPaneX.left[e]);
        var i = t;
        (t > this._cd.rowHeaderSpace || this._freezeLineColAfterId && this._sectionsPerPaneX.left.length && !this._panesXids.left.length) && (i += 6);
        var o = {
                space: t,
                outer: i
            },
            s = this._cd.viewportWidth - o.outer,
            n = {
                space: s,
                outer: s
            };
        return o.offset = 0, n.offset = o.outer, {
            left: o,
            center: n
        }
    }
    var bt = function (t) {
        for (var e = 0, i = 0; i < this._cols.coordSections.length && !(i >= t); i++) e += this._cols.coordSections[i].length;
        var o = e + this._cols.coordSections[t].length - 1;
        return vt.call(this, [e, o])
    };

    function St() {
        for (var t = this._cd.colHeaderSpace, e = 0; e < this._sectionsPerPaneY.top.length; e++) t += It.call(this, this._sectionsPerPaneY.top[e]);
        var i = t;
        (t > this._cd.colHeaderSpace || this._freezeLineRowAfterId && this._sectionsPerPaneY.top.length && !this._panesYids.top.length) && (i += 6);
        var o = {
                space: t,
                outer: i
            },
            s = this._cd.viewportHeight - o.outer,
            n = {
                space: s,
                outer: s,
                inner: s,
                innerOffset: 0
            };
        return o.offset = 0, n.offset = o.outer, {
            top: o,
            center: n
        }
    }
    var It = function (t) {
        for (var e = 0, i = 0; i < this._rows.coordSections.length && !(i >= t); i++) e += this._rows.coordSections[i].length;
        var o = e + this._rows.coordSections[t].length - 1;
        return xt.call(this, [e, o])
    };

    function Rt() {
        return {
            top: Lt.call(this, "top"),
            center: Lt.call(this, "center")
        }
    }
    var Lt = function (t) {
        for (var e = this._sectionsPerPaneY[t], i = [], o = 0; o < e.length; o++) i.push(this._rows.coordSections[e[o]]);
        return [].concat.apply([], i)
    };

    function Pt() {
        return {
            left: Nt.call(this, "left"),
            center: Nt.call(this, "center")
        }
    }
    var Nt = function (t) {
        for (var e = this._sectionsPerPaneX[t], i = [], o = 0; o < e.length; o++) i.push(this._cols.coordSections[e[o]]);
        return [].concat.apply([], i)
    };

    function kt() {
        for (var t = 0, e = 0; e < this._panesXids.center.length; e++) t += this.getColWidthById(this._panesXids.center[e]);
        return t
    }

    function Ht() {
        for (var t = 0, e = 0; e < this._panesYids.center.length; e++) t += this.getRowHeightById(this._panesYids.center[e]);
        return t
    }

    function zt() {
        for (var t, e, i = this._cd.innerDocumentWidth - this._cd.panesX.center.space, o = 0, s = 0; s < this._panesXids.center.length && (t = s, e = o, !(o >= i)); s++) o += this.getColWidthById(this._panesXids.center[s]);
        var n = e + this._cd.panesX.center.space - this._cd.innerDocumentWidth;
        return {
            startIndex: this._panesXids.left.length + t,
            blankSpace: n
        }
    }

    function At() {
        for (var t, e, i = this._cd.innerDocumentHeight - this._cd.panesY.center.space, o = 0, s = 0; s < this._panesYids.center.length && (t = s, e = o, !(o >= i)); s++) o += this.getRowHeightById(this._panesYids.center[s]);
        var n = e + this._cd.panesY.center.space - this._cd.innerDocumentHeight;
        return {
            startIndex: this._panesYids.top.length + t,
            blankSpace: n
        }
    }

    function Tt() {
        var t = this._lastColView.startIndex - this._panesXids.left.length;
        return 0 == t ? 1 : this._cd.scrollAreaWidth + 40 * t
    }

    function Ft() {
        var t = this._lastRowView.startIndex - this._panesYids.top.length;
        return 0 == t ? 1 : this._cd.scrollAreaHeight + 40 * t
    }

    function Et() {
        return Math.max(this._cd.viewportWidth, this._cd.innerDocumentWidth + this._lastColView.blankSpace)
    }

    function Mt() {
        return this._cd.innerDocumentHeight + this._lastRowView.blankSpace
    }

    function Bt() {
        if (this._isFullscreen) {
            window.getComputedStyle(this._domNodes.component);
            this._cd.componentWidth = this._domNodes.component.clientWidth, this._cd.componentHeight = this._domNodes.component.clientHeight
        } else this._cd.componentWidth = this._cd.containerWidth, this._cd.componentHeight = this._cd.containerHeight;
        this._cd.topBarSpace = lt.call(this), this._cd.bottomBarSpace = ht.call(this), this._cd.displayWidth = at.call(this), this._cd.displayHeight = ct.call(this), this._cd.scrollbarSpace = dt.call(this), this._cd.viewportWidth = ut.call(this), this._cd.viewportHeight = pt.call(this), this._cd.colHeaderLevelsSpace = gt.call(this), this._cd.rowHeaderLevelsSpace = ft.call(this), this._cd.colHeaderSpace = _t.call(this), this._cd.rowHeaderSpace = yt.call(this), this._cd.virtualPanesX = mt.call(this), this._cd.virtualPanesY = wt.call(this), this._cd.virtualPanesX.center >= 200 ? this._sectionsPerPaneX = {
            left: [0],
            center: [1]
        } : this._sectionsPerPaneX = {
            left: [],
            center: [0, 1]
        }, this._cd.virtualPanesY.center >= 120 ? this._sectionsPerPaneY = {
            top: [0],
            center: [1]
        } : this._sectionsPerPaneY = {
            top: [],
            center: [0, 1]
        }, this._panesXids = Pt.call(this), this._panesYids = Rt.call(this), this._cd.panesX = Ct.call(this), this._cd.panesY = St.call(this), this._cd.innerDocumentWidth = kt.call(this), this._cd.innerDocumentHeight = Ht.call(this), this._lastColView = zt.call(this), this._lastRowView = At.call(this), this._cd.scrollAreaWidth = this._cd.displayWidth, this._cd.scrollAreaHeight = this._cd.displayHeight, this._cd.scrollWidth = Tt.call(this), this._cd.scrollHeight = Ft.call(this), this._cd.scrollableDocumentWidth = Et.call(this), this._cd.scrollableDocumentHeight = Mt.call(this)
    }

    function Ot() {
        for (var t = this._viewportPosition.x - this._panesXids.left.length, e = [], i = 0, o = this._cd.panesX.center.space; i < o && !(t > this._panesXids.center.length - 1);) e.push(this._panesXids.center[t]), i += this.getColWidthById(this._panesXids.center[t]), t++;
        this._colViewOverflow = i - this._cd.panesX.center.space, this._colView = e
    }

    function Dt() {
        for (var t = this._viewportPosition.y - this._panesYids.top.length, e = [], i = 0, o = this._cd.panesY.center.space; i < o && !(t > this._panesYids.center.length - 1);) e.push(this._panesYids.center[t]), i += this.getRowHeightById(this._panesYids.center[t]), t++;
        this._rowViewOverflow = i - this._cd.panesY.center.space, this._rowView = e
    }

    function Vt(t, e) {
        void 0 === t && (t = !1), void 0 === e && (e = !1), null == this._viewportPosition && (this._viewportPosition = {
            x: this._panesXids.left.length,
            y: this._panesYids.top.length
        }), this._viewportPosition = {
            x: t ? this._panesXids.left.length : this._viewportPosition.x,
            y: e ? this._panesYids.top.length : this._viewportPosition.y
        }, this._viewportPosition = {
            x: Math.max(this._panesXids.left.length, this._viewportPosition.x),
            y: Math.max(this._panesYids.top.length, this._viewportPosition.y)
        }, Ot.call(this), Dt.call(this)
    }

    function Xt() {
        null == this.constructor_browserScrollbarSize && st.call(this), this._isFullscreen || rt.call(this), nt.call(this), Bt.call(this), Vt.call(this)
    }
    var Yt = function (t) {
        this.events = {}, this._anyEvent = "any", this._context = t
    };

    function Wt(t, e, i) {
        var o;
        return function () {
            var s = this,
                n = arguments,
                r = function () {
                    o = null, i || t.apply(s, n)
                },
                l = i && !o;
            clearTimeout(o), o = setTimeout(r, e), l && t.apply(s, n)
        }
    }
    Yt.prototype.on = function (t, e) {
        return "function" == typeof e && ("string" == typeof t && (void 0 === this.events[t] && (this.events[t] = {
            listeners: []
        }), !(this.events[t].listeners.indexOf(e) > -1) && void this.events[t].listeners.push(e)))
    }, Yt.prototype.off = function (t, e) {
        if (void 0 === this.events[t]) return !1;
        this.events[t].listeners = this.events[t].listeners.filter((function (t) {
            return t !== e
        }))
    }, Yt.prototype.dispatch = function (t, e, i) {
        var o = this;
        if (void 0 === e && (e = {}), void 0 === i && (i = t), t != this._anyEvent && this.dispatch(this._anyEvent, e, t), void 0 === this.events[t]) return !0;
        var s = [];
        this.events[t].listeners.forEach((function (t) {
            s.push(t.call(o._context, e, i))
        }));
        for (var n = 0; n < s.length; n++)
            if (!1 === s[n]) return !1;
        return !0
    };
    var Kt = function (t, e) {
            this._sharedSensorStyles = {
                display: "block",
                position: "absolute",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                overflow: "auto",
                "z-index": -1,
                visibility: "hidden"
            }, this._resizeSensorStyles = {
                overflow: "hidden"
            }, this._expandTriggerStyles = {
                width: "100000px",
                height: "100000px"
            }, this._shrinkTriggerStyles = {
                width: "200%",
                height: "200%"
            }, this._context = e, this._domNodes = {}, this._domNodes.container = t, this._resizeListener, this.events = new Yt(this), jt.call(this), Ut.call(this)
        },
        jt = function () {
            this._domNodes.component = H("div", {
                class: "dgxl-resizeSensor",
                style: L(this._sharedSensorStyles, this._resizeSensorStyles)
            });
            var t = z(),
                e = H("div", {
                    class: "dgxl-expandSensor",
                    style: this._sharedSensorStyles
                });
            e.appendChild(H("div", {
                class: "dgxl-expandTrigger",
                style: this._expandTriggerStyles
            }));
            var i = H("div", {
                class: "dgxl-shrinkSensor",
                style: this._sharedSensorStyles
            });
            i.appendChild(H("div", {
                class: "dgxl-shrinkTrigger",
                style: this._shrinkTriggerStyles
            })), t.appendChild(e), t.appendChild(i), this._domNodes.component.appendChild(t), this._domNodes.container.appendChild(this._domNodes.component)
        },
        Ut = function () {
            var t = this,
                e = Wt((function (e) {
                    t.events.dispatch("resize", {})
                }), 100);
            this._resizeListener = e.bind(this);
            var i = !0,
                o = !0,
                s = this._domNodes.component.children[0],
                n = this._domNodes.component.children[1],
                r = function (t) {
                    s.scrollLeft = 1e5, s.scrollTop = 1e5, n.scrollLeft = 1e5, n.scrollTop = 1e5
                },
                l = function (e) {
                    e.target == s && i ? i = !1 : e.target == n && o ? o = !1 : (t._resizeListener(), r())
                };
            r(), s.addEventListener("scroll", l), n.addEventListener("scroll", l)
        };

    function qt() {
        return {
            name: "topbar bar",
            style: {
                position: "absolute",
                height: this._cd.topBarSpace + "px",
                "line-height": this._cd.topBarSpace + "px",
                left: 0,
                top: 0,
                right: 0,
                "box-sizing": "border-box",
                display: this._cd.topBarSpace ? "flex" : "none",
                "justify-content": "space-between"
            },
            noCSS: Y[".dgxl-bar"].call(this),
            domNodes: Gt.call(this),
            _reset: !1
        }
    }
    var Gt = function () {
        for (var t, e = [], i = 0; i < this._validatedTopBar.length; i++)(t = {
            type: this._validatedTopBar[i].name,
            wrapper: void 0,
            nodes: {}
        }).wrapper = T.call(this, {
            name: "part part-" + this._validatedTopBar[i].name,
            style: {
                display: "flex",
                "flex-grow": this._validatedTopBar[i].grow || 0,
                height: "100%"
            },
            children: [this._validatedTopBar[i].node.call(this)],
            _reset: !1
        }, t.nodes), e.push(t.wrapper), this._topBarNodes.push(t);
        return e
    };

    function Zt() {
        var t = this._cd.panesY.top.space - this._cd.colHeaderSpace;
        return {
            name: "backgrounds",
            style: {
                width: this._cd.viewportWidth + "px",
                height: this._cd.viewportHeight + "px",
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden"
            },
            children: [{
                name: "background.top-left",
                style: {
                    position: "absolute",
                    top: this._cd.panesY.top.offset + this._cd.colHeaderSpace + "px",
                    left: this._cd.panesX.left.offset + this._cd.rowHeaderSpace + "px",
                    width: this._cd.panesX.left.space - this._cd.rowHeaderSpace + "px",
                    height: t + "px",
                    overflow: "hidden"
                },
                children: [$t.call(this, "top", "left")]
            }, {
                name: "background.top-center",
                style: {
                    position: "absolute",
                    width: this._cd.panesX.center.space + "px",
                    height: t + "px",
                    top: this._cd.panesY.top.offset + this._cd.colHeaderSpace + "px",
                    left: this._cd.panesX.center.offset + "px",
                    overflow: "hidden"
                },
                children: [$t.call(this, "top", "center")]
            }, {
                name: "background.center-left",
                style: {
                    position: "absolute",
                    width: this._cd.panesX.left.space - this._cd.rowHeaderSpace + "px",
                    height: this._cd.panesY.center.space + "px",
                    top: this._cd.panesY.center.offset + "px",
                    left: this._cd.panesX.left.offset + this._cd.rowHeaderSpace + "px",
                    overflow: "hidden"
                },
                children: [$t.call(this, "center", "left")]
            }, {
                name: "background.center-center",
                style: {
                    position: "absolute",
                    width: this._cd.panesX.center.space + "px",
                    height: this._cd.panesY.center.space + "px",
                    top: this._cd.panesY.center.offset + "px",
                    left: this._cd.panesX.center.offset + "px",
                    overflow: "hidden"
                },
                children: [$t.call(this, "center", "center")]
            }]
        }
    }
    var $t = function (e, i) {
        var o = this._cd.panesX[i].space,
            s = this._cd.panesY[e].space;
        "left" == i && (o -= this._cd.rowHeaderSpace), "top" == e && (s -= this._cd.colHeaderSpace);
        var n = 1 * Math.ceil(o / 1),
            r = Math.ceil(s / this.rowHeight) * this.rowHeight;
        return {
            tag: "canvas",
            name: "canvas." + e + "-" + i,
            styleText: {
                position: "absolute",
                top: 0,
                left: 0,
                width: n + "px",
                height: r + "px",
                "image-rendering": t
            },
            _panePositionY: e,
            _panePositionX: i,
            _displayWidth: n,
            _displayHeight: r
        }
    };

    function Qt() {
        return {
            name: "colHeaderBackground",
            style: {
                position: "absolute",
                left: 0,
                top: 0,
                background: this.getThemeSetting("header"),
                height: this._cd.colHeaderSpace + "px",
                width: this._cd.viewportWidth + "px"
            }
        }
    }

    function Jt() {
        return {
            name: "rowHeaderBackground",
            style: {
                position: "absolute",
                left: 0,
                top: 0,
                background: this.getThemeSetting("header"),
                height: this._cd.viewportHeight + "px",
                width: this._cd.rowHeaderSpace + "px"
            }
        }
    }

    function te(t) {
        var e = t.cloneNode(!0);
        return "_opacity" in t && (e._opacity = t._opacity), "_borderStyle" in t && (e._borderStyle = t._borderStyle), e
    }

    function ee() {
        return {
            name: "colHeaderRangeHighlightContainer",
            domNodes: [te(this._templates.colHeaderRangeHighlight)]
        }
    }

    function ie() {
        return {
            name: "colHeaderRangeSelectedContainer",
            domNodes: [te(this._templates.colHeaderRangeSelected)]
        }
    }

    function oe() {
        return {
            name: "rowHeaderRangeHighlightContainer",
            domNodes: [te(this._templates.rowHeaderRangeHighlight)]
        }
    }

    function se() {
        return {
            name: "rowHeaderRangeSelectedContainer",
            domNodes: [te(this._templates.rowHeaderRangeSelected)]
        }
    }

    function ne() {
        return {
            name: "gridLines",
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                opacity: this.getThemeSetting("gridline|opacity"),
                overflow: "hidden",
                width: this._cd.viewportWidth + "px",
                height: this._cd.viewportHeight + "px"
            },
            children: re.call(this)
        }
    }
    var re = function () {
            return [{
                name: "rowLines",
                style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: this._cd.viewportWidth + "px"
                },
                domNodes: le.call(this)
            }, {
                name: "colLines",
                style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: this._cd.viewportHeight + "px"
                },
                domNodes: ae.call(this)
            }]
        },
        le = function () {
            var t = [];
            for (var e in this._cd.panesY) t.push.apply(t, he.call(this, e));
            return t
        },
        he = function (t) {
            var e = [],
                i = this._cd.panesY[t].offset;
            if ("top" == t) {
                i += this._cd.colHeaderSpace;
                var o = T.call(this, {
                    name: "rowLine",
                    style: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 0,
                        "border-bottom": "thin solid " + this.getThemeSetting("gridline-tip"),
                        transform: "translateY(" + i + "px)",
                        opacity: 1
                    }
                });
                e.push(o)
            }
            for (var s = 0; s < this._panesYids[t].length; s++) {
                i += this.getRowHeightById(this._panesYids[t][s]);
                o = T.call(this, {
                    name: "rowLine",
                    style: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 0,
                        "border-bottom": "thin solid " + this.getThemeSetting("gridline"),
                        transform: "translateY(" + i + "px)",
                        opacity: 1
                    },
                    children: [{
                        style: {
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: this._cd.rowHeaderSpace + 1 + "px",
                            "border-bottom": "thin solid " + this.getThemeSetting("gridline-tip")
                        }
                    }]
                });
                e.push(o), this._rowLines.push({
                    node: o,
                    offset: i
                })
            }
            return e
        },
        ae = function () {
            var t = [];
            for (var e in this._cd.panesX) t.push.apply(t, ce.call(this, e));
            return t
        },
        ce = function (t) {
            var e = [],
                i = this._cd.panesX[t].offset;
            if ("left" == t) {
                i += this._cd.rowHeaderSpace;
                var o = T.call(this, {
                    name: "colLine",
                    style: {
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        width: 0,
                        transform: "translateX(" + i + "px)",
                        "border-right": "thin solid " + this.getThemeSetting("gridline-tip"),
                        opacity: 1
                    }
                });
                e.push(o)
            }
            for (var s = 0; s < this._panesXids[t].length; s++) {
                i += this.getColWidthById(this._panesXids[t][s]);
                o = T.call(this, {
                    name: "colLine",
                    style: {
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        width: 0,
                        transform: "translateX(" + i + "px)",
                        "border-right": "thin solid " + this.getThemeSetting("gridline"),
                        opacity: 1
                    },
                    children: [{
                        style: {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            height: this._cd.colHeaderSpace + 1 + "px",
                            "border-right": "thin solid " + this.getThemeSetting("gridline-tip")
                        }
                    }]
                });
                e.push(o), this._colLines.push({
                    node: o,
                    offset: i
                })
            }
            return e
        };

    function de() {
        return {
            name: "placeholderFreezeLines",
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                opacity: 1,
                overflow: "hidden",
                width: this._cd.viewportWidth + "px",
                height: this._cd.viewportHeight + "px"
            },
            children: ue.call(this)
        }
    }
    var ue = function () {
        var t = [];
        return t.push({
            name: "freezeLinePlaceholder_row",
            style: {
                position: "absolute",
                left: 0,
                width: this._cd.rowHeaderSpace + "px",
                height: "6px",
                "background-color": this.getThemeSetting("freezelineplaceholder"),
                top: 0,
                opacity: 0
            },
            _opacity: this._sectionsPerPaneY.top.length ? 0 : 1
        }), t.push({
            name: "freezeLinePlaceholder_col",
            style: {
                position: "absolute",
                top: 0,
                height: this._cd.colHeaderSpace + "px",
                left: 0,
                width: "6px",
                "background-color": this.getThemeSetting("freezelineplaceholder"),
                opacity: 0
            },
            _opacity: this._sectionsPerPaneX.left.length ? 0 : 1
        }), t
    };

    function pe() {
        return {
            name: "blankSheetContainer",
            children: [fe.call(this), ge.call(this)]
        }
    }
    var fe = function () {
            var t = 1;
            if (this._rowView.length) {
                var e = this._viewportPosition.y + (this._rowView.length - 1),
                    i = this.getRowPositionInViewport(e);
                i += this._actualRowHeight + 1, t = (this._cd.viewportHeight - i) / 100
            }
            return {
                name: "blankSheetBottom blankSheet",
                style: {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    "background-color": this.getThemeSetting("blanksheet"),
                    height: "100px",
                    "transform-origin": "center bottom",
                    transform: "scaleY(" + t + ")",
                    opacity: t > 0 ? 1 : 0
                },
                _opacity: 1
            }
        },
        ge = function () {
            var t = 1;
            if (this._colView.length) {
                var e = this._viewportPosition.x + (this._colView.length - 1),
                    i = this.getColPositionInViewport(e);
                i += this.getColWidthById(this._cols.coordList[e]) + 1, t = (this._cd.viewportWidth - i) / 100
            }
            return {
                name: "blankSheetRight blankSheet",
                style: {
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    "background-color": this.getThemeSetting("blanksheet"),
                    width: "100px",
                    "transform-origin": "top right",
                    transform: "scaleX(" + t + ")",
                    opacity: t > 0 ? 1 : 0
                },
                _opacity: 1
            }
        };

    function _e() {
        return {
            name: "cellRangeContainer",
            domNodes: [te(this._templates.cellRange)]
        }
    }

    function ye() {
        return {
            name: "panes",
            style: {
                "font-family": "sans-serif",
                "font-size": "14px",
                width: this._cd.viewportWidth + "px",
                height: this._cd.viewportHeight + "px",
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                contain: "layout style"
            },
            children: [{
                name: "pane-left",
                style: {
                    position: "absolute",
                    left: this._cd.panesX.left.offset + "px",
                    width: this._cd.panesX.left.space + "px",
                    height: this._cd.viewportHeight + "px",
                    top: 0,
                    overflow: "hidden"
                },
                domNodes: ve.call(this, "left")
            }, {
                name: "pane-center",
                style: {
                    position: "absolute",
                    left: this._cd.panesX.center.offset + "px",
                    width: this._cd.panesX.center.space + "px",
                    height: this._cd.viewportHeight + "px",
                    top: 0,
                    overflow: "hidden"
                },
                domNodes: ve.call(this, "center")
            }]
        }
    }
    var ve = function (t) {
        var e = [],
            i = 0;
        if ("left" == t && (e.push(this._domNodes.rowHeaderColumn), i += this._cd.rowHeaderSpace), "center" == t) var o = this._colView;
        else o = this._panesXids[t];
        for (var s = 0; s < o.length; s++) {
            var n = o[s] - 1,
                r = this._cols.store[n],
                l = this._columnNodes[n];
            l.column.style.transform = "translateX(" + i + "px)", i += r.width, e.push(l.column)
        }
        return e
    };

    function me() {
        return {
            name: "cellRangeForegroundContainer",
            domNodes: [te(this._templates.cellRangeForeground)]
        }
    }

    function xe() {
        return {
            name: "freezeLines",
            style: {
                overflow: "hidden",
                position: "absolute",
                top: 0,
                left: 0,
                width: this._cd.viewportWidth + "px",
                height: this._cd.viewportHeight + "px"
            },
            children: [we.call(this), Ce.call(this)]
        }
    }
    var we = function () {
            if (this._sectionsPerPaneX.left.length || null == this._freezeLineColAfterId) var t = 1;
            else t = 0;
            var e = this.getThemeSetting("freezeline-tip");
            return this.allowFreezeCols || null != this._freezeLineColAfterId || (e = "transparent"), {
                name: "freezeLine-col",
                style: {
                    position: "absolute",
                    top: 0,
                    left: (this._freezeLineColAfterId ? this._cd.panesX.left.space : this._cd.panesX.center.offset - 6) + "px",
                    bottom: 0,
                    width: "6px",
                    "background-color": this._freezeLineColAfterId ? this.getThemeSetting("freezeline") : "transparent",
                    opacity: this._cd.panesX.left.space ? t : .25
                },
                children: [{
                    style: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: this._cd.colHeaderSpace + "px",
                        width: "6px",
                        "background-color": e
                    }
                }]
            }
        },
        Ce = function () {
            if (this._sectionsPerPaneY.top.length || null == this._freezeLineRowAfterId) var t = 1;
            else t = 0;
            var e = this.getThemeSetting("freezeline-tip");
            return this.allowFreezeRows || null != this._freezeLineRowAfterId || (e = "transparent"), {
                name: "freezeLine-row",
                style: {
                    position: "absolute",
                    top: (this._freezeLineRowAfterId ? this._cd.panesY.top.space : this._cd.panesY.center.offset - 6) + "px",
                    left: 0,
                    right: 0,
                    height: "6px",
                    "background-color": this._freezeLineRowAfterId ? this.getThemeSetting("freezeline") : "transparent",
                    opacity: this._cd.panesY.top.space ? t : .25
                },
                children: [{
                    style: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: this._cd.rowHeaderSpace + "px",
                        height: "6px",
                        "background-color": e
                    }
                }]
            }
        };

    function be() {
        return {
            name: "cellCursor",
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                "box-sizing": "border-box",
                "border-width": "2px",
                "border-style": "solid",
                "border-color": this.getThemeSetting("cellcursor"),
                "transform-origin": "0 0",
                width: this.colWidth + 1 + "px",
                height: this.actualRowHeight + 1 + "px",
                opacity: 0
            },
            _opacity: 1
        }
    }

    function Se() {
        return {
            name: "searchCursor",
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                "box-sizing": "border-box",
                "border-width": "2px",
                "border-style": "solid",
                "border-color": this.getThemeSetting("searchcursor"),
                "border-radius": "4px",
                "transform-origin": "center center",
                width: this.colWidth + 1 + "px",
                height: this._actualRowHeight + 1 + "px",
                opacity: 0,
                transition: "transform 0.05s"
            },
            _opacity: 1
        }
    }

    function Ie() {
        return {
            name: "ghostsContainer",
            style: {
                overflow: "hidden",
                position: "absolute",
                top: 0,
                left: 0,
                width: this._cd.viewportWidth + "px",
                height: this._cd.viewportHeight + "px"
            },
            children: Re.call(this)
        }
    }
    var Re = function () {
        var t = {
                name: "ghostForFreezeRows",
                style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "6px",
                    "background-color": this.getThemeSetting("freeze?ghost"),
                    opacity: 0
                },
                children: [{
                    style: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: this._cd.rowHeaderSpace + "px",
                        height: "6px",
                        "background-color": "transparent"
                    }
                }],
                _opacity: this.getThemeSetting("freeze?ghost|opacity")
            },
            e = {
                name: "ghostForFreezeCols",
                style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: "6px",
                    "background-color": this.getThemeSetting("freeze?ghost"),
                    opacity: 0
                },
                children: [{
                    style: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: this._cd.colHeaderSpace + "px",
                        width: "6px",
                        "background-color": "transparent"
                    }
                }],
                _opacity: this.getThemeSetting("freeze?ghost|opacity")
            },
            i = {
                name: "ghostForMoveCols",
                style: {
                    position: "absolute",
                    left: 0,
                    width: "100px",
                    "box-sizing": "border-box",
                    "background-color": this.getThemeSetting("move?ghost"),
                    bottom: 0,
                    top: this._cd.colHeaderSpace + "px",
                    opacity: 0
                },
                _opacity: this.getThemeSetting("move?ghost|opacity")
            };
        return [{
            name: "ghostForMoveRows",
            style: {
                position: "absolute",
                left: this._cd.rowHeaderSpace + "px",
                height: "100px",
                "box-sizing": "border-box",
                "background-color": this.getThemeSetting("move?ghost"),
                right: 0,
                top: 0,
                opacity: 0
            },
            _opacity: this.getThemeSetting("move?ghost|opacity")
        }, i, t, e]
    };

    function Le() {
        return {
            name: "guidesContainer",
            style: {
                overflow: "hidden",
                position: "absolute",
                top: 0,
                left: 0,
                width: this._cd.viewportWidth + "px",
                height: this._cd.viewportHeight + "px"
            },
            children: Pe.call(this)
        }
    }
    var Pe = function () {
        return [{
            name: "guideForResizeCols",
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: "1px",
                "background-color": this.getThemeSetting("resize?guide"),
                "box-sizing": "border-box",
                opacity: 0
            },
            _opacity: this.getThemeSetting("resize?guide|opacity")
        }, {
            name: "guideForMoveCols",
            style: {
                position: "absolute",
                top: this._cd.colHeaderSpace + "px",
                left: 0,
                bottom: 0,
                width: "3px",
                "background-color": this.getThemeSetting("move?guide"),
                opacity: 0
            },
            _opacity: this.getThemeSetting("move?guide|opacity")
        }, {
            name: "guideForMoveRows",
            style: {
                position: "absolute",
                left: this._cd.rowHeaderSpace + "px",
                top: 0,
                right: 0,
                height: "3px",
                "background-color": this.getThemeSetting("move?guide"),
                opacity: 0
            },
            _opacity: this.getThemeSetting("move?guide|opacity")
        }, {
            name: "guideForFreezeRows",
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                height: "6px",
                right: 0,
                "background-color": this.getThemeSetting("freeze?guide"),
                opacity: 0
            },
            _opacity: this.getThemeSetting("freeze?guide|opacity")
        }, {
            name: "guideForFreezeCols",
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "6px",
                bottom: 0,
                "background-color": this.getThemeSetting("freeze?guide"),
                opacity: 0
            },
            _opacity: this.getThemeSetting("freeze?guide|opacity")
        }]
    };

    function Ne() {
        return {
            name: "hintsContainer",
            style: {
                overflow: "hidden",
                position: "absolute",
                top: 0,
                left: 0,
                width: this._cd.viewportWidth + "px",
                height: this._cd.viewportHeight + "px"
            },
            children: ke.call(this)
        }
    }
    var ke = function () {
        var t = '\n  <svg height="8" width="8" style="position:absolute;top:3px;right:4px;fill:' + this.getThemeSetting("header-icon") + ';">\n    <polygon points="2,4 8,0 8,8" class="triangle">\n  </svg>\n  ',
            e = '\n  <svg height="8" width="8" style="position:absolute;top:3px;left:4px;fill:' + this.getThemeSetting("header-icon") + ';">\n    <polygon points="6,4 0,0 0,8" class="triangle">\n  </svg>\n  ',
            i = '\n  <svg height="8" width="8" style="position:absolute;bottom:4px;left:3px;fill:' + this.getThemeSetting("header-icon") + ';">\n    <polygon points="4,2 0,8 8,8" class="triangle">\n  </svg>\n  ',
            o = '\n  <svg height="8" width="8" style="position:absolute;top:4px;left:3px;fill:' + this.getThemeSetting("header-icon") + ';">\n    <polygon points="4,6 0,0 8,0" class="triangle">\n  </svg>';
        return [{
            name: "hintForResizeCols",
            style: {
                overflow: "hidden",
                position: "absolute",
                top: 0,
                left: 0,
                width: "4px",
                height: this._cd.colHeaderSpace + "px",
                "background-color": this.getThemeSetting("resize?hint"),
                opacity: 0
            },
            _opacity: 1
        }, {
            name: "hintForFreezeCols",
            style: {
                overflow: "hidden",
                position: "absolute",
                top: 0,
                left: 0,
                width: "6px",
                height: this._cd.colHeaderSpace + "px",
                "background-color": this.getThemeSetting("freeze?hint"),
                opacity: 0
            },
            _opacity: 1
        }, {
            name: "hintForFreezeRows",
            style: {
                overflow: "hidden",
                position: "absolute",
                top: 0,
                left: 0,
                height: "6px",
                width: this._cd.rowHeaderSpace + "px",
                "background-color": this.getThemeSetting("freeze?hint"),
                opacity: 0
            },
            _opacity: 1
        }, {
            name: "hintForShowColsNext",
            style: {
                position: "absolute",
                top: this.colHeaderHeight / 2 - 8 + "px",
                left: 0,
                height: "16px",
                width: "14px",
                background: this.getThemeSetting("show?hint"),
                "border-radius": "2px 0 0 2px",
                "border-width": "1px",
                "border-style": "solid",
                "border-right-style": "none",
                "border-color": this.getThemeSetting("show?hint"),
                "box-shadow": "0px 0px 0px 1px " + this.getThemeSetting("show?hint|border"),
                "clip-path": "polygon(-100% -100%, 100% -100%, 100% 200%, -100% 200%)",
                "box-sizing": "border-box",
                "font-size": 10,
                "text-align": "center",
                opacity: 0
            },
            html: t,
            _opacity: 1
        }, {
            name: "hintForShowColsPrev",
            style: {
                position: "absolute",
                top: this.colHeaderHeight / 2 - 8 + "px",
                left: 0,
                height: "16px",
                width: "14px",
                background: this.getThemeSetting("show?hint"),
                "border-radius": "0 2px 2px 0",
                "border-width": "1px",
                "border-style": "solid",
                "border-left-style": "none",
                "border-color": this.getThemeSetting("show?hint"),
                "box-shadow": "0px 0px 0px 1px " + this.getThemeSetting("show?hint|border"),
                "clip-path": "polygon(0% -100%, 200% -100%, 200% 200%, 0% 200%)",
                "box-sizing": "border-box",
                "font-size": 10,
                "text-align": "center",
                opacity: 0
            },
            html: e,
            _opacity: 1
        }, {
            name: "hintForShowRowsNext",
            style: {
                position: "absolute",
                top: 0,
                left: "2px",
                height: "16px",
                width: "16px",
                background: this.getThemeSetting("show?hint"),
                "border-radius": "2px 2px 0 0",
                "border-width": "1px",
                "border-style": "solid",
                "border-bottom-style": "none",
                "border-color": this.getThemeSetting("show?hint"),
                "box-shadow": "0px 0px 0px 1px " + this.getThemeSetting("show?hint|border"),
                "clip-path": "polygon(100% -100%, 200% -100%, 200% 100%, -100% 100%)",
                "box-sizing": "border-box",
                "font-size": 10,
                "text-align": "center",
                opacity: 0
            },
            html: i,
            _opacity: 1
        }, {
            name: "hintForShowRowsPrev",
            style: {
                position: "absolute",
                top: 0,
                left: "2px",
                height: "16px",
                width: "16px",
                background: this.getThemeSetting("show?hint"),
                "border-radius": "0 0 2px 2px",
                "border-width": "1px",
                "border-style": "solid",
                "border-top-style": "none",
                "border-color": this.getThemeSetting("show?hint"),
                "box-shadow": "0px 0px 0px 1px " + this.getThemeSetting("show?hint|border"),
                "clip-path": "polygon(-100% 0%, 200% 0%, 200% 200%, 0% 200%)",
                "box-sizing": "border-box",
                "font-size": 10,
                "text-align": "center",
                opacity: 0
            },
            html: o,
            _opacity: 1
        }]
    };

    function He() {
        return {
            name: "hiddenColGroupIconContainer",
            children: [{
                name: "hiddenColGroupIconPrevContainer"
            }, {
                name: "hiddenColGroupIconNextContainer"
            }]
        }
    }

    function ze() {
        return {
            name: "hiddenRowGroupIconContainer",
            children: [{
                name: "hiddenRowGroupIconPrevContainer"
            }, {
                name: "hiddenRowGroupIconNextContainer"
            }]
        }
    }

    function Ae() {
        return {
            name: "actionRangesContainer",
            style: {
                overflow: "hidden",
                position: "absolute",
                top: 0,
                left: 0,
                width: this._cd.viewportWidth + "px",
                height: this._cd.viewportHeight + "px"
            },
            children: Te.call(this)
        }
    }
    var Te = function () {
        return [{
            name: "fillRange",
            style: {
                overflow: "hidden",
                "pointer-events": "none",
                position: "absolute",
                "box-sizing": "border-box",
                "border-width": "1px",
                "border-style": "dashed",
                "border-color": this.getThemeSetting("cellrange:fill"),
                top: 0,
                left: 0,
                opacity: 0
            },
            _extra: 0,
            _opacity: 1,
            _borderStyle: "dashed"
        }, {
            name: "copyRange",
            style: {
                overflow: "hidden",
                "pointer-events": "none",
                position: "absolute",
                "box-sizing": "border-box",
                "border-width": "2px",
                "border-style": "dashed",
                "border-color": this.getThemeSetting("cellrange:copy"),
                "background-color": "transparent",
                top: 0,
                left: 0,
                opacity: 0
            },
            _extra: 1,
            _opacity: 1,
            _borderStyle: "dashed"
        }, {
            name: "cutRange",
            style: {
                overflow: "hidden",
                "pointer-events": "none",
                position: "absolute",
                "box-sizing": "border-box",
                "border-width": "2px",
                "border-style": "dashed",
                "border-color": this.getThemeSetting("cellrange:cut"),
                "background-color": "transparent",
                top: 0,
                left: 0,
                opacity: 0
            },
            _extra: 1,
            _opacity: 1,
            _borderStyle: "dashed"
        }]
    };

    function Fe() {
        return {
            name: "fillHandle",
            style: {
                position: "absolute",
                "background-color": this.getThemeSetting("sheet"),
                width: "9px",
                height: "9px",
                left: 0,
                top: 0,
                opacity: 0,
                display: this.constructor._isTouchDevice ? "none" : "block"
            },
            children: [{
                name: "fillHandleInner",
                style: {
                    position: "absolute",
                    "background-color": this.getThemeSetting("fillhandle"),
                    width: "8px",
                    height: "8px",
                    left: "1px",
                    top: "1px"
                }
            }],
            _opacity: this.allowFillCells ? 1 : 0
        }
    }

    function Ee() {
        return {
            name: "viewport",
            style: {
                overflow: "hidden",
                position: "absolute",
                top: 0,
                left: 0,
                width: this._cd.viewportWidth + "px",
                height: this._cd.viewportHeight + "px"
            },
            children: [Zt.call(this), Qt.call(this), Jt.call(this), ee.call(this), ie.call(this), oe.call(this), se.call(this), ne.call(this), _e.call(this), ye.call(this), xe.call(this), de.call(this), me.call(this), pe.call(this), Ae.call(this), be.call(this), Se.call(this), Ie.call(this), Le.call(this), He.call(this), ze.call(this), Ne.call(this), Fe.call(this)]
        }
    }

    function Me() {
        var t = {
            eventArea: {
                position: "absolute",
                left: 0,
                top: 0,
                width: this._cd.scrollAreaWidth + "px",
                height: this._cd.scrollAreaHeight + "px",
                overflow: "hidden",
                "touch-action": "manipulation",
                "background-color": "transparent",
                cursor: this.mouseCursorStatesIdle.default
            },
            scrollArea: {
                position: "absolute",
                overflow: "scroll",
                "overflow-scrolling": "touch",
                left: 0,
                top: 0,
                width: this._cd.scrollAreaWidth + "px",
                height: this._cd.scrollAreaHeight + "px",
                "box-sizing": "border-box",
                display: "block"
            },
            scrollSurface: {
                width: this._cd.scrollWidth + "px",
                height: this._cd.scrollHeight + "px"
            }
        };
        return {
            name: "eventArea",
            style: t.eventArea,
            children: [{
                name: "scrollArea",
                style: t.scrollArea,
                children: [{
                    name: "scrollSurface",
                    style: t.scrollSurface
                }]
            }]
        }
    }

    function Be() {
        return {
            name: "scrollbars",
            children: [{
                name: "scrollbarY",
                style: {
                    position: "absolute",
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: this._cd.scrollbarSpace + "px",
                    background: this.getThemeSetting("scrollbar"),
                    "border-left": "1px solid " + this.getThemeSetting("scrollbar|border")
                }
            }, {
                name: "scrollbarX",
                style: {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: this._cd.scrollbarSpace + "px",
                    background: this.getThemeSetting("scrollbar"),
                    "border-top": "1px solid " + this.getThemeSetting("scrollbar|border")
                }
            }, {
                name: "jointScrollbar",
                style: {
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: this._cd.scrollbarSpace + "px",
                    height: this._cd.scrollbarSpace + "px",
                    background: this.getThemeSetting("header"),
                    "border-top": "1px solid " + this.getThemeSetting("scrollbar|border"),
                    "border-left": "1px solid " + this.getThemeSetting("scrollbar|border")
                }
            }]
        }
    }

    function Oe() {
        var t = j(this.getThemeSetting("sheet"), "rgba(255,255,255,.35)", "rgba(0,0,0,.35)"),
            e = {
                tag: "textarea",
                name: "cellEditorInputField",
                style: {
                    "box-sizing": "border-box",
                    background: this.getThemeSetting("sheet"),
                    color: this.getThemeSetting("sheet|text"),
                    "font-family": this.fontFamily,
                    "font-size": this.fontSize + "px",
                    "border-width": "2px",
                    "border-style": "solid",
                    "border-color": this.getThemeSetting("celleditor"),
                    "box-shadow": "1px 1px 2px " + t,
                    height: "auto",
                    "min-height": "auto",
                    resize: "none",
                    overflow: "auto",
                    outline: "none",
                    "overflow-y": "hidden",
                    "padding-left": "4px",
                    "padding-right": "4px",
                    "border-radius": 0,
                    "line-height": this.rowHeight - 4 + "px",
                    "-webkit-touch-callout": "none",
                    "user-drag": "none",
                    "user-select": "text"
                },
                tabIndex: -1,
                autoComplete: "off",
                wrap: "hard",
                value: "",
                spellcheck: !1,
                autocomplete: "off",
                _actualCommand: void 0,
                _isOpen: !1,
                _coords: null,
                _mode: null
            };
        return this.constructor._isTouchDevice && (e.readonly = !0), {
            name: "cellEditor",
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                "user-select": "none",
                height: "1px",
                opacity: 0,
                "z-index": -1
            },
            children: [e]
        }
    }

    function De() {
        return {
            name: "display",
            style: {
                position: "absolute",
                top: this._cd.topBarSpace + "px",
                left: 0,
                right: 0,
                bottom: this._cd.bottomBarSpace + "px",
                "background-color": this.getThemeSetting("sheet")
            },
            children: [Ee.call(this), Be.call(this), Me.call(this), Oe.call(this)],
            _touchStartFired: !1,
            _hasScrolled: !1,
            _hasZoomed: !1,
            _setViewportPositionOnScroll: !0
        }
    }

    function Ve() {
        return {
            name: "bottombar bar",
            style: {
                position: "absolute",
                height: this._cd.bottomBarSpace + "px",
                "line-height": this._cd.bottomBarSpace + "px",
                left: 0,
                bottom: 0,
                right: 0,
                "box-sizing": "border-box",
                display: this._cd.bottomBarSpace ? "flex" : "none",
                "justify-content": "space-between"
            },
            noCSS: Y[".dgxl-bar"].call(this),
            domNodes: Xe.call(this),
            _reset: !1
        }
    }
    var Xe = function () {
        for (var t, e = [], i = 0; i < this._validatedBottomBar.length; i++)(t = {
            type: this._validatedBottomBar[i].name,
            wrapper: void 0,
            nodes: {}
        }).wrapper = T.call(this, {
            name: "part part-" + this._validatedBottomBar[i].name,
            style: {
                display: "flex",
                "flex-grow": this._validatedBottomBar[i].grow || 0,
                height: "100%"
            },
            children: [this._validatedBottomBar[i].node.call(this)],
            _reset: !1
        }, t.nodes), e.push(t.wrapper), this._bottomBarNodes.push(t);
        return e
    };

    function Ye() {
        return {
            name: "component theme-" + this.cssTheme,
            style: {
                position: "relative",
                "user-select": "none",
                width: this._cd.componentWidth + "px",
                height: this._cd.componentHeight + "px",
                overflow: "hidden",
                "z-index": 0,
                "font-size": this.fontSize,
                "font-family": this.fontFamily
            },
            noCSS: Y[".dgxl-component"].call(this),
            id: "datagridxl_" + this._componentIndex,
            children: [qt.call(this), De.call(this), Ve.call(this)]
        }
    }

    function We(t, e) {
        if (null == t) return [];
        for (var i = [], o = 0; o < t.length; o++) {
            var s = !0;
            for (var n in e)
                if (!(n in t[o]) || t[o][n] != e[n]) {
                    s = !1;
                    break
                } s && i.push(t[o])
        }
        return i
    }

    function Ke(t) {
        var e = {};
        for (var i in this.headerLabelSeries) e[i] = this.headerLabelSeries[i].indexToLabel(t, this.headerLabelSeries[i]);
        return e
    }

    function je(t) {
        return null == t ? "" : String(t).replace(/\n/g, "↵").replace(/\t/g, " ")
    }

    function Ue(t) {
        var e = this.getRowIndexById(t),
            i = this.getRowCoordById(t),
            o = Ke.call(this, e),
            s = this._rows.store[t - 1];
        return je(this.rowHeaderLabelFunction.call(this, e, i, s, o))
    }

    function qe(t) {
        for (var e, i, o = "", s = We(this._selection, {
                type: "row"
            }), n = !1, r = 0; r < t.length; r++) {
            i = t[r], e = this.getRowCoordById(i);
            for (var l = 0; l < s.length; l++)
                if (!n && e >= s[l].range[0].y && e <= s[l].range[1].y) {
                    o += '<span style="color:' + this.getThemeSetting("header:selected|text") + ';">', n = !0;
                    break
                } o += Ue.call(this, i) + "\n";
            for (l = 0; l < s.length; l++)
                if (n && e <= s[l].range[1].y) {
                    o += "</span>", n = !1;
                    break
                }
        }
        return n && (o += "</span>"), o
    }

    function Ge() {
        return qe.call(this, this._panesYids.top)
    }

    function Ze() {
        return qe.call(this, this._rowView)
    }

    function $e() {
        T.call(this, {
            name: "rowHeaderColumn",
            style: {
                position: "absolute",
                width: this._cd.rowHeaderSpace + "px",
                height: this._cd.viewportHeight + "px",
                "line-height": this.rowHeight + "px",
                overflow: "hidden",
                contain: "strict",
                "white-space": "pre",
                "font-size": this.fontSize + "px",
                "font-family": this.fontFamily,
                color: this.getThemeSetting("sheet|text")
            },
            children: [Qe.call(this)]
        })
    }
    var Qe = function () {
        return {
            name: "innerColumn",
            style: {
                position: "relative",
                "margin-top": this._cd.colHeaderSpace + "px",
                "padding-left": "6px",
                "padding-right": "6px",
                width: this._cd.rowHeaderSpace + "px",
                "box-sizing": "border-box",
                color: this.getThemeSetting("header|text"),
                "white-space": "pre",
                "line-height": this.rowHeight + "px",
                "text-align": this.rowHeaderLabelAlign
            },
            children: [{
                name: "column-top",
                style: {
                    position: "absolute",
                    top: this._cd.panesY.top.offset + "px",
                    height: this._cd.panesY.top.space + "px",
                    width: this._cd.rowHeaderSpace - 12 + "px"
                },
                html: Ge.call(this)
            }, {
                name: "column-center",
                style: {
                    position: "absolute",
                    top: this._cd.panesY.center.offset - this._cd.colHeaderSpace + "px",
                    height: this._cd.panesY.center.space + "px",
                    width: this._cd.rowHeaderSpace - 12 + "px",
                    overflow: "hidden"
                },
                html: Ze.call(this)
            }]
        }
    };

    function Je(t) {
        var e = this.getColIndexById(t),
            i = this.getColCoordById(t),
            o = Ke.call(this, e),
            s = this._cols.store[t - 1];
        return je(this.colHeaderLabelFunction.call(this, e, i, s, o))
    }

    function ti(t) {
        for (var e = "", i = 0; i < this._panesYids.top.length; i++) e += je(this._cellStore[this._panesYids.top[i] - 1][t - 1].value) + "\n";
        return e
    }

    function ei(t) {
        for (var e = "", i = 0; i < this._rowView.length; i++) e += je(this._cellStore[this._rowView[i] - 1][t - 1].value) + "\n";
        return e
    }

    function ii(t, e) {
        var i = e - 1;
        this._columnNodes[i] = {};
        var o = this._cols.store[i];
        T.call(this, {
            name: "column",
            style: {
                position: "absolute",
                width: o.width + "px",
                height: this._cd.viewportHeight + "px",
                "line-height": this.rowHeight + "px",
                overflow: "hidden",
                contain: "layout style",
                "font-size": this.fontSize + "px",
                "font-family": this.fontFamily,
                color: this.getThemeSetting("sheet|text")
            },
            children: [oi.call(this, t, e), si.call(this, t, e)]
        }, this._columnNodes[i])._colId = o.id
    }
    var oi = function (t, e) {
            return {
                name: "columnHeader",
                style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: this._cd.colHeaderSpace + "px",
                    "line-height": this._cd.colHeaderSpace + "px"
                },
                children: [{
                    name: "columnHeaderLabel",
                    style: {
                        position: "absolute",
                        top: 0,
                        height: this._colHeaderSpace + "px",
                        "line-height": this._colHeaderSpace + "px",
                        left: "6px",
                        right: "6px",
                        color: this.getThemeSetting("header|text"),
                        "white-space": "pre",
                        "text-align": this.colHeaderLabelAlign
                    },
                    html: Je.call(this, e)
                }, {
                    name: "columnHeaderSortIndicator",
                    style: {
                        position: "absolute",
                        top: 0,
                        height: this._cd.colHeaderSpace + "px",
                        width: "12px",
                        right: "2px",
                        color: this.getThemeSetting("header|text")
                    }
                }]
            }
        },
        si = function (t, e) {
            var i = this._cols.store[e - 1],
                o = {
                    height: this._cd.panesY.top.outer - this._cd.colHeaderSpace + "px",
                    "padding-left": "6px",
                    "padding-right": "6px",
                    overflow: "hidden"
                },
                s = {
                    height: this._cd.panesY.center.space + "px",
                    "padding-left": "6px",
                    "padding-right": "6px",
                    clear: "both"
                };
            return "center" == i.align ? (o["margin-left"] = "-100%", o["margin-right"] = "-100%", o["text-align"] = "center", s["margin-left"] = "-100%", s["margin-right"] = "-100%", s["text-align"] = "center") : "right" == i.align && (o.float = "right", o["text-align"] = "right", s.float = "right", s["text-align"] = "right"), {
                name: "innerColumn",
                style: {
                    position: "relative",
                    "margin-top": this._cd.colHeaderSpace + "px",
                    color: this.getThemeSetting("sheet|text"),
                    "white-space": "pre",
                    "line-height": this.rowHeight + "px"
                },
                children: [{
                    name: "column-top",
                    style: o,
                    text: ti.call(this, e)
                }, {
                    name: "column-center",
                    style: s,
                    text: ei.call(this, e)
                }]
            }
        };

    function ni() {
        for (var t = 0; t < this._cols.store.length; t++) ii.call(this, t, this._cols.store[t].id)
    }

    function ri() {
        return {
            name: "colHeaderRangeHighlight",
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                "background-color": this.getThemeSetting("header:highlight"),
                "transform-origin": "0 0",
                width: "100px",
                height: "100px",
                opacity: 0
            },
            _opacity: 1
        }
    }

    function li() {
        return {
            name: "colHeaderRangeSelected",
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                "background-color": this.getThemeSetting("header:selected"),
                "transform-origin": "0 0",
                width: "100px",
                height: "100px",
                opacity: 0
            },
            _opacity: 1
        }
    }

    function hi() {
        return {
            name: "rowHeaderRangeHighlight",
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                "background-color": this.getThemeSetting("header:highlight"),
                "transform-origin": "0 0",
                width: "100px",
                height: "100px",
                opacity: 0
            },
            _opacity: 1
        }
    }

    function ai() {
        return {
            name: "rowHeaderRangeSelected",
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                "background-color": this.getThemeSetting("header:selected"),
                "transform-origin": "0 0",
                width: "100px",
                height: "100px",
                opacity: 0
            },
            _opacity: 1
        }
    }

    function ci() {
        return {
            name: "hiddenRowGroupIconPrev",
            style: {
                position: "absolute",
                top: 0,
                left: "2px",
                height: "16px",
                width: "16px",
                "border-radius": "0 0 2px 2px",
                "border-width": "1px",
                "border-style": "solid",
                "border-top-style": "none",
                "border-color": "transparent",
                "box-sizing": "border-box",
                "font-size": 10,
                "text-align": "center"
            },
            html: '\n  <svg height="8" width="8" style="position:absolute;top:4px;left:3px;fill:' + this.getThemeSetting("header-icon") + ';">\n    <polygon points="4,6 0,0 8,0" class="triangle">\n  </svg>'
        }
    }

    function di() {
        return {
            name: "hiddenRowGroupIconNext",
            style: {
                position: "absolute",
                top: 0,
                left: "2px",
                height: "16px",
                width: "16px",
                "border-radius": "2px 2px 0 0",
                "border-width": "1px",
                "border-style": "solid",
                "border-bottom-style": "none",
                "border-color": "transparent",
                "box-sizing": "border-box",
                "font-size": 10,
                "text-align": "center"
            },
            html: '\n  <svg height="8" width="8" style="position:absolute;bottom:4px;left:3px;fill:' + this.getThemeSetting("header-icon") + ';">\n    <polygon points="4,2 0,8 8,8" class="triangle">\n  </svg>\n  '
        }
    }

    function ui() {
        var t = '\n  <svg height="8" width="8" style="position:absolute;top:3px;left:4px;fill:' + this.getThemeSetting("header-icon") + ';">\n    <polygon points="6,4 0,0 0,8" class="triangle">\n  </svg>\n  ';
        return {
            name: "hiddenColGroupIconPrev",
            style: {
                position: "absolute",
                top: this.colHeaderHeight / 2 - 8 + "px",
                left: 0,
                height: "16px",
                width: "14px",
                "border-radius": "0 2px 2px 0",
                "border-width": "1px",
                "border-style": "solid",
                "border-left-style": "none",
                "border-color": "transparent",
                "box-sizing": "border-box",
                "font-size": 10,
                "text-align": "center"
            },
            html: t
        }
    }

    function pi() {
        var t = '\n  <svg height="8" width="8" style="position:absolute;top:3px;right:4px;fill:' + this.getThemeSetting("header-icon") + ';">\n    <polygon points="2,4 8,0 8,8" class="triangle">\n  </svg>\n  ';
        return {
            name: "hiddenColGroupIconNext",
            style: {
                position: "absolute",
                top: this.colHeaderHeight / 2 - 8 + "px",
                left: 0,
                height: "16px",
                width: "14px",
                "border-radius": "2px 0 0 2px",
                "border-width": "1px",
                "border-style": "solid",
                "border-right-style": "none",
                "border-color": "transparent",
                "box-sizing": "border-box",
                "font-size": 10,
                "text-align": "center"
            },
            html: t
        }
    }

    function fi() {
        return {
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                "background-color": this.getThemeSetting("cellrange:selected"),
                "transform-origin": "0 0",
                width: "100px",
                height: "100px",
                opacity: 0
            },
            _opacity: this.getThemeSetting("cellrange:selected|opacity")
        }
    }

    function gi() {
        return {
            name: "cellRangeForeground",
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                "border-width": "thin",
                "border-top-style": "solid",
                "border-bottom-style": "solid",
                "border-left-style": "solid",
                "border-right-style": "solid",
                "border-color": this.getThemeSetting("cellrange:selected|border"),
                "transform-origin": "0 0",
                "box-sizing": "border-box",
                width: this.colWidth + 1 + "px",
                height: this.rowHeight + 1 + "px",
                opacity: 0
            },
            _opacity: 1,
            _borderStyle: "solid"
        }
    }

    function _i() {
        return {
            name: "colLine",
            style: {
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                width: 0,
                transform: "translateX(0)",
                "border-right": "thin solid " + this.getThemeSetting("gridline"),
                opacity: 1
            },
            children: [{
                style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: this._cd.colHeaderSpace + 1 + "px",
                    "border-right": "thin solid " + this.getThemeSetting("gridline-tip")
                }
            }]
        }
    }

    function yi() {
        return {
            name: "rowLine",
            style: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 0,
                "border-bottom": "thin solid " + this.getThemeSetting("gridline"),
                transform: "translateY(0)",
                opacity: 1
            },
            children: [{
                style: {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: this._cd.rowHeaderSpace + 1 + "px",
                    "border-bottom": "thin solid " + this.getThemeSetting("gridline-tip")
                }
            }]
        }
    }

    function vi(t) {
        this.resize()
    }

    function mi(t, e) {
        if (t in this._listeners && e in this._listeners[t]) {
            if ("document" == t || "window" == t) var i = window[t];
            else i = this._domNodes[t];
            var o = e.split("_");
            1 == o.length ? i.addEventListener(e, this._listeners[t][e]) : "debounced" == o[1] ? i.addEventListener(o[0], this._listeners[t][e]) : "passive" == o[1] && i.addEventListener(o[0], this._listeners[t][e], {
                passive: !0
            })
        }
    }

    function xi(t, e) {
        if (t in this._listeners && e in this._listeners[t]) {
            if ("document" == t || "window" == t) var i = window[t];
            else i = this._domNodes[t];
            i.removeEventListener(e, this._listeners[t][e])
        }
    }

    function wi(t) {
        var e = this;
        void 0 === t && (t = !1), this.constructor._isIOS || (this.activeSheetDisplay && (this._domNodes.cellEditor.style.top = this.getRowPositionInViewport(this._cellCursorPosition.y) + "px", this._domNodes.cellEditor.style.left = this.getColPositionInViewport(this._cellCursorPosition.x) + "px"), t ? Ci.call(this, this._domNodes.cellEditorInputField) : setTimeout((function () {
            Ci.call(e, e._domNodes.cellEditorInputField)
        }), 0))
    }
    var Ci = function (t) {
        t.value = " ", t.select(), t.setSelectionRange(0, 1)
    };

    function bi() {
        "webkitCurrentFullScreenElement" in document ? Si.call(this, "webkitCurrentFullScreenElement") : Si.call(this, "fullscreenElement"), this.constructor._isTouchDevice || wi.call(this)
    }
    var Si = function (t) {
            document[t] == this._domNodes.component ? Ii.call(this) : Ri.call(this)
        },
        Ii = function () {
            var t = this;
            this.activate(), this._isFullscreen = !0, vi.call(this), setTimeout((function () {
                mi.call(t, "window", "resize"), t._domNodes.container._resizeSensor.events.off("resize", t._listeners.container.resize)
            }), 100), Li.call(this), this.events.dispatch("fullscreenenter")
        },
        Ri = function () {
            var t = this;
            (this.constructor._isMacOS || this.constructor._isIOS) && (this._domNodes.component.style.height = this._cd.containerHeight + "px", this._domNodes.component.style.width = this._cd.containerWidth + "px"), this._isFullscreen = !1, vi.call(this), setTimeout((function () {
                xi.call(t, "window", "resize"), t._domNodes.container._resizeSensor.events.on("resize", t._listeners.container.resize)
            }), 100), this._isActive && (Pi.call(this), this.events.dispatch("fullscreenleave"))
        },
        Li = function () {
            this.constructor.contextMenu.isOpen() && this.constructor.contextMenu.close(), A(this._domNodes.component, [this.constructor._domNodes.contextMenu])
        },
        Pi = function () {
            this.constructor.contextMenu.isOpen() && this.constructor.contextMenu.close(), A(document.body, [this.constructor._domNodes.contextMenu, this.constructor._domNodes.contextMenuTouch])
        };

    function Ni(t) {
        var e = this;
        setTimeout((function () {
            bi.call(e, t)
        }), 100)
    }

    function ki(t) {
        var e = this;
        setTimeout((function () {
            bi.call(e, t)
        }), 0)
    }

    function Hi(t) {
        this.hijackNativeSearchCommand && 70 == t.keyCode && t[this._commandKey] && zi.call(this, t)
    }
    var zi = function (t) {
        var e = We(this._topBarNodes, {
                type: "searchBar"
            }),
            i = We(this._bottomBarNodes, {
                type: "searchBar"
            }),
            o = e.concat(i);
        o.length && (t.preventDefault(), this.search(""), o[0].nodes.inputField.focus(), o[0].nodes.inputField.select())
    };

    function Ai(t) {
        this.deactivate()
    }

    function Ti(t) {
        if (!(this._domNodes.container.contains(t.target) || this.constructor._domNodes.contextMenu.contains(t.target) || this.constructor._domNodes.contextMenuTouch.contains(t.target))) {
            for (var e = document.getElementsByClassName("dgxl-app"), i = 0; i < e.length; i++)
                if (e[i].contains(t.target)) return;
            Ai.call(this, {
                originalEvent: t
            })
        }
    }

    function Fi(t) {
        vi.call(this, "window")
    }

    function Ei(t) {}

    function Mi(t) {
        this._isFullscreen || vi.call(this, "container")
    }

    function Bi(t) {
        "INPUT" != t.target.tagName && "TEXTAREA" != t.target.tagName && "A" != t.target.tagName && "IMG" != t.target.tagName && t.preventDefault()
    }

    function Oi(t, e) {
        "clipboardData" in t ? t.clipboardData.setData("text/plain", e) : setTimeout((function () {
            window.clipboardData.setData("text", e)
        }), 100)
    }

    function Di(t) {
        return null != t && (t[0].x == t[1].x && t[0].y == t[1].y)
    }

    function Vi(t) {
        return null == t ? null : {
            x: Xi.call(this, t),
            y: Yi.call(this, t)
        }
    }
    var Xi = function (t) {
            var e, i, o, s = !1,
                n = !1,
                r = 0,
                l = this._cd.rowHeaderSpace,
                h = 0,
                a = [];
            for (e = 0; e < this._panesXids.left.length; e++) i = e, o = this.getColWidthById(this._panesXids.left[i]), i >= t[0].x && i <= t[1].x && (a.push({
                colIndex: i,
                visibleColIndex: r,
                visibleColOffset: l
            }), h += o), l += o, r++;
            for ((this._panesXids.left.length || this._freezeLineColAfterId && this._sectionsPerPaneX.left.length && !this._panesXids.left.length) && (l += 6), e = 0; e < this._colView.length; e++) i = this._viewportPosition.x + e, o = this.getColWidthById(this._colView[e]), e == this._colView.length - 1 && (o -= Math.max(this._colViewOverflow, 0)), i >= t[0].x && i <= t[1].x && (a.push({
                colIndex: i,
                visibleColIndex: r,
                visibleColOffset: l
            }), h += o), l += o, r++;
            if (a.length) var c = a[0].visibleColOffset;
            else c = 0;
            var d = t[0].x < this._panesXids.left.length,
                u = t[0].x >= this._viewportPosition.x && t[0].x <= this._viewportPosition.x + this._colView.length - 1;
            (d || u) && (s = !0);
            var p = t[1].x < this._panesXids.left.length,
                f = t[1].x >= this._viewportPosition.x && t[1].x < this._viewportPosition.x + this._colView.length - 1 || t[1].x == this._viewportPosition.x + this._colView.length - 1 && this._colViewOverflow <= 0,
                g = t[1].x >= this._viewportPosition.x;
            return (p || f) && (n = !0), d && g && (h += 6), h && (h += 1), {
                offset: c,
                size: h,
                lineLeft: s,
                lineRight: n
            }
        },
        Yi = function (t) {
            var e, i, o, s = !1,
                n = !1,
                r = 0,
                l = this._cd.colHeaderSpace,
                h = 0,
                a = [];
            for (e = 0; e < this._panesYids.top.length; e++) i = e, o = this.getRowHeightById(this._panesYids.top[i]), i >= t[0].y && i <= t[1].y && (a.push({
                rowIndex: i,
                visibleRowIndex: r,
                visibleRowOffset: l
            }), h += o), l += o, r++;
            for ((this._panesYids.top.length || this._freezeLineRowAfterId && this._sectionsPerPaneY.top.length && !this._panesYids.top.length) && (l += 6), e = 0; e < this._rowView.length; e++) i = this._viewportPosition.y + e, o = this.getRowHeightById(this._rowView[e]), e == this._rowView.length - 1 && (o -= Math.max(this._rowViewOverflow, 0)), i >= t[0].y && i <= t[1].y && (a.push({
                rowIndex: i,
                visibleRowIndex: r,
                visibleRowOffset: l
            }), h += o), l += o, r++;
            if (a.length) var c = a[0].visibleRowOffset;
            else c = 0;
            var d = t[0].y < this._panesYids.top.length,
                u = t[0].y >= this._viewportPosition.y && t[0].y <= this._viewportPosition.y + this._rowView.length - 1;
            (d || u) && (s = !0);
            var p = t[1].y < this._panesYids.top.length,
                f = t[1].y >= this._viewportPosition.y && t[1].y < this._viewportPosition.y + this._rowView.length - 1 || t[1].y == this._viewportPosition.y + this._rowView.length - 1 && this._rowViewOverflow <= 0,
                g = t[1].y >= this._viewportPosition.y;
            return (p || f) && (n = !0), d && g && (h += 6), h && (h += 1), {
                offset: c,
                size: h,
                lineTop: s,
                lineBottom: n
            }
        };

    function Wi(t, e) {
        var i = t._borderStyle || "solid";
        if (null != e) {
            t.style.opacity = t._opacity;
            var o = Vi.call(this, e),
                s = i,
                n = i,
                r = i,
                l = i;
            o.y.lineTop && 0 != o.x.size || (s = "none"), o.y.lineBottom && 0 != o.x.size || (n = "none"), o.x.lineLeft && 0 != o.y.size || (r = "none"), o.x.lineRight && 0 != o.y.size || (l = "none"), "_actionProperties" in e && "dragDirection" in e._actionProperties && ("up" == e._actionProperties.dragDirection ? n = "none" : "right" == e._actionProperties.dragDirection ? r = "none" : "down" == e._actionProperties.dragDirection ? s = "none" : "left" == e._actionProperties.dragDirection && (l = "none")), t.style["border-top-style"] = s, t.style["border-right-style"] = l, t.style["border-bottom-style"] = n, t.style["border-left-style"] = r, o.x.size += 2 * t._extra, o.y.size += 2 * t._extra, o.x.offset -= t._extra, o.y.offset -= t._extra;
            var h = "translate(" + o.x.offset + "px," + o.y.offset + "px)";
            t.style.transform = h, t.style.width = o.x.size + "px", t.style.height = o.y.size + "px"
        } else t.style.opacity = 0
    }

    function Ki(t, e, i) {
        var o = this;
        void 0 === i && (i = {}), "cut" == t ? (this._cutRange = e, this._copyRange = null) : "copy" == t ? (this._copyRange = e, this._cutRange = null) : "fill" == t && (this._fillRange = e, null != this._fillRange && (this._fillRange._actionProperties = i)), requestAnimationFrame((function () {
            Wi.call(o, o._domNodes.copyRange, o._copyRange), Wi.call(o, o._domNodes.cutRange, o._cutRange), Wi.call(o, o._domNodes.fillRange, o._fillRange)
        }))
    }

    function ji(t, e) {
        void 0 === t && (t = {}), void 0 === e && (e = null);
        var i = this._selection[this._activeRangeIndex].range;
        if (t = {
                text: this.getCellRangeText(i),
                cellRange: i
            }, this.events.dispatch("beforecopy", t)) {
            if (null != this.constructor._clipboardObject && Ki.call(this, this.constructor._clipboardObject.type, null), Ki.call(this, "copy", t.cellRange), Di(i) && "\n" == t.text) var o = !0;
            else o = !1;
            this.constructor._clipboardObject = {
                type: "copy",
                text: t.text,
                cellRange: t.cellRange,
                isSingleEmptyCell: o,
                instance: this
            }, Oi.call(this, e, t.text), this.events.dispatch("copy", t)
        }
    }

    function Ui(t, e) {
        void 0 === t && (t = {}), void 0 === e && (e = null);
        var i = this._selection[this._activeRangeIndex].range;
        if (t = {
                text: this.getCellRangeText(i),
                cellRange: i
            }, this.events.dispatch("beforecut", t)) {
            if (null != this.constructor._clipboardObject && Ki.call(this, this.constructor._clipboardObject.type, null), this.instantCut) this.clearCellValues(t.cellRange);
            else {
                if (Ki.call(this, "cut", t.cellRange), Di(i) && "\n" == t.text) var o = !0;
                else o = !1;
                this.constructor._clipboardObject = {
                    type: "cut",
                    text: t.text,
                    cellRange: t.cellRange,
                    isSingleEmptyCell: o,
                    instance: this
                }
            }
            Oi.call(this, e, t.text), this.events.dispatch("cut", t)
        }
    }

    function qi(t) {
        t.preventDefault(), "cut" == this._domNodes.cellEditor._actualCommand ? Ui.call(this, {}, t) : ("copy" == this._domNodes.cellEditor._actualCommand || null == this._domNodes.cellEditor._actualCommand && this.allowCopy) && ji.call(this, {}, t), this._domNodes.cellEditor._actualCommand = void 0
    }

    function Gi(t) {
        return void 0 === t && (t = ""), "" == t ? [
            [null]
        ] : this.textParser.parse(t, {
            delimiter: "\t"
        }).data
    }

    function Zi(t, e) {
        if (void 0 === t && (t = {}), this.events.dispatch("beforepaste", t)) {
            var i = t.text;
            null != this.constructor._clipboardObject && "\n" == t.text && this.constructor._clipboardObject.isSingleEmptyCell && (i = ""), (i.endsWith("\n") || i.endsWith("\r")) && (i = i.replace(/(\r\n|\n|\r)+$/g, ""));
            var o = Gi.call(this, i);
            if (null != this.constructor._clipboardObject && this.constructor._clipboardObject.instance == this && "cut" == this.constructor._clipboardObject.type && i == this.constructor._clipboardObject.text) var s = !0;
            else s = !1;
            this.events.dispatch("paste", t), this.setCellValues(this._selection, o, !0, s)
        }
    }

    function $i(t) {
        t.preventDefault(), this.allowPaste && Qi.call(this, t)
    }
    var Qi = function (t) {
        if (this.constructor._isIE) var e = window.clipboardData.getData("text");
        else e = t.clipboardData.getData("text");
        Zi.call(this, {
            text: e
        }, t)
    };

    function Ji(t) {
        t.preventDefault(), this.allowCut && Ui.call(this, {}, t)
    }

    function to(t) {
        if (t in this.keyActionSets && t != this._activeKeyActionSet) {
            if (this._activeKeyActionSet)
                for (var e = 0; e < this.keyActionSets[this._activeKeyActionSet].length; e++) {
                    var i = this.keyActionSets[this._activeKeyActionSet][e],
                        o = this._presetKeyActions[i];
                    this.keyActionSets[t].indexOf(i) > -1 || this.keys.off(o.keys, o.action, o.repeat, o.target)
                }
            for (e = 0; e < this.keyActionSets[t].length; e++) {
                i = this.keyActionSets[t][e], o = this._presetKeyActions[i];
                null != this._activeKeyActionSet && this.keyActionSets[this._activeKeyActionSet].indexOf(i) > -1 || ("active" in o && !o.active.call(this) || this.keys.on(o.keys, o.action, o.repeat))
            }
            this._activeKeyActionSet = t
        }
    }

    function eo(t) {
        "edit" != this._domNodes.cellEditor._mode && (this._domNodes.cellEditor._mode = "edit", to.call(this, "inputModeEdit"))
    }

    function io() {
        var t = this.getColWidthById(this._cols.coordList[this._domNodes.cellEditor._coords.x]),
            e = Math.ceil(this._textWidthMeterCanvasContext.measureText(this._domNodes.cellEditorInputField.value).width) + 12;
        this._domNodes.cellEditorInputField.style.width = Math.max(e, t) + 1 + "px"
    }

    function oo(t) {
        if ("contextMenuOpen" != this._activeKeyActionSet && this.allowEditCells && (t.target.selectionEnd != t.target.selectionStart + 1 || t.target != document.activeElement)) {
            if (this._isUndo || this._isRedo) return this._isUndo = !1, void(this._isRedo = !1);
            this._domNodes.cellEditor._isOpen || this.openCellEditor("enter"), io.call(this), this.events.dispatch("celleditorinput", {
                value: t.target.value
            })
        }
    }

    function so() {
        this._domNodes.display._hasScrolled = !0, this._domNodes.searchCursor.style.transition = ""
    }

    function no(t, e) {
        return null == t && null == e || null != t && null != e && (s(t) && s(e) ? t.x == e.x && t.y == e.y : !(!d(t) || !d(e)) && t == e)
    }

    function ro() {
        return this._viewportPosition.y == this._panesYids.top.length
    }

    function lo() {
        return this._viewportPosition.x == this._panesXids.left.length
    }

    function ho(t, e) {
        void 0 === e && (e = {
            x: 0,
            y: 0
        }), t = co.call(this, t), ao.call(this, t, e)
    }
    var ao = function (t, e) {
            no(this._viewportPosition, t) || (this._viewportPosition = t, this._viewportOverflowPx = e, Ot.call(this), Dt.call(this), this._isViewportConnectedTo = {
                top: ro.call(this),
                left: lo.call(this)
            })
        },
        co = function (t) {
            return t.x < this._panesXids.left.length && (t.x = this._panesXids.left.length), t.y < this._panesYids.top.length && (t.y = this._panesYids.top.length), t.x > this._lastColView.startIndex && (t.x = this._lastColView.startIndex), t.y > this._lastRowView.startIndex && (t.y = this._lastRowView.startIndex), t
        };

    function uo(t) {
        this._domNodes.display._hasScrolled || so.call(this), this._scrollLeft = Math.round(t.currentTarget.scrollLeft), this._scrollTop = Math.round(t.currentTarget.scrollTop), this._domNodes.display._setViewportPositionOnScroll && (ho.call(this, {
            x: this._panesXids.left.length + Math.floor(this._scrollLeft / 40),
            y: this._panesYids.top.length + Math.floor(this._scrollTop / 40)
        }), this.redraw()), this._currentDragAction && this._domNodes.display[this._currentDragAction + "MoveFunc"].call(this), this._domNodes.display._setViewportPositionOnScroll = !0
    }

    function po() {
        this._domNodes.display._hasScrolled = !1, this._domNodes.searchCursor.style.transition = "transform 0.05s"
    }

    function fo(t) {
        po.call(this)
    }

    function go(t) {
        if (null == t) return null;
        var e = {};
        for (var i in t) e[i] = t[i];
        return e
    }

    function _o(t, e) {
        var i = this._domNodes.eventArea.getBoundingClientRect();
        return {
            x: Math.round(t - i.left),
            y: Math.round(e - i.top)
        }
    }

    function yo(t) {
        return t.y <= this._cd.scrollAreaHeight - this._cd.scrollbarSpace ? null : {
            name: "horizontalScrollbar"
        }
    }

    function vo(t) {
        return t.x <= this._cd.scrollAreaWidth - this._cd.scrollbarSpace ? null : {
            name: "verticalScrollbar"
        }
    }

    function mo(t, e) {
        void 0 === e && (e = !1);
        var i, o, s, n = null;
        if (t < this._cd.rowHeaderSpace) return -1;
        t <= this._cd.panesX.left.space ? (i = this._cd.rowHeaderSpace, o = "left", s = this._panesXids.left) : (i = this._cd.panesX.center.offset, o = "center", s = this._colView);
        for (var r = i, l = 0; r < t && !(l > s.length - 1);) r += this.getColWidthById(s[l]), l++;
        (n = l - 1, "center" == o && (n += this._viewportPosition.x), e) && (n < 0 && (n = 0), t - this.getColPositionInViewport(n) > this.getColWidthById(this.getColIdByCoord(n)) / 2 && n++);
        return n
    }

    function xo(t, e) {
        void 0 === e && (e = !1);
        var i, o, s, n = null;
        if (t < this._cd.colHeaderSpace) return -1;
        t <= this._cd.panesY.top.space ? (i = this._cd.colHeaderSpace, o = "top", s = this._panesYids.top) : (i = this._cd.panesY.center.offset, o = "center", s = this._rowView);
        for (var r = i, l = 0; r < t && !(l > s.length - 1);) r += this.getRowHeightById(s[l]), l++;
        (n = l - 1, "center" == o && (n += this._viewportPosition.y), e) && (n < 0 && (n = 0), t - this.getRowPositionInViewport(n) > this.getRowHeightById(this.getRowIdByCoord(n)) / 2 && n++);
        return n
    }

    function wo(t) {
        return {
            x: mo.call(this, t.x),
            y: xo.call(this, t.y)
        }
    }

    function Co(t) {
        return t.x <= this._cd.rowHeaderSpace && t.y <= this._cd.colHeaderSpace ? {
            name: "jointHeader",
            coords: wo.call(this, t)
        } : null
    }

    function bo(t) {
        if (!this._sectionsPerPaneX.left.length) {
            if (t.y < 0 || t.y > this._cd.colHeaderSpace) return null;
            var e = this.getColCoordById(this._freezeLineColAfterId) + 1,
                i = this.getColPositionInViewport(e);
            return t.x >= i && t.x <= i + 6 ? {
                name: "freezeLinePlaceholderCol",
                coords: {
                    x: e,
                    y: -1
                },
                objectPosition: {},
                object: this._domNodes.freezeLinePlaceholder_col
            } : null
        }
    }

    function So(t) {
        if (!this._sectionsPerPaneY.top.length) {
            if (t.x < 0 || t.x > this._cd.rowHeaderSpace) return null;
            var e = this.getRowCoordById(this._freezeLineRowAfterId) + 1,
                i = this.getRowPositionInViewport(e);
            return t.y >= i && t.y <= i + 6 ? {
                name: "freezeLinePlaceholderRow",
                coords: {
                    x: -1,
                    y: e
                },
                objectPosition: {},
                object: this._domNodes.freezeLinePlaceholder_row
            } : null
        }
    }

    function Io(t, i) {
        return null != t && null != i && (s(t) && n(i) ? t.x >= i[0].x && t.x <= i[1].x && t.y >= i[0].y && t.y <= i[1].y : d(t) && e(i) ? t >= i[0] && t <= i[1] : void 0)
    }

    function Ro(t) {
        if (t.y > this._cd.colHeaderSpace || this._colViewOverflow < 0 && t.x > this._cd.viewportWidth - Math.abs(this._colViewOverflow)) return null;
        var e = wo.call(this, t),
            i = this.getColRangesFromCoord(e.x);
        return e.x >= this._cols.coordList.length ? null : i.length ? {
            name: "selectedColHeader",
            coords: e,
            ranges: i
        } : null
    }

    function Lo(t) {
        return t.y > this._cd.colHeaderSpace ? null : {
            name: "colHeader",
            coords: wo.call(this, t)
        }
    }

    function Po(t) {
        if (t.y < 0 || t.y > this._cd.colHeaderSpace) return null;
        for (var e = wo.call(this, t), i = null, o = this._cd.rowHeaderSpace, s = 0; s < this._panesXids.left.length; s++)
            if (o += this.getColWidthById(this._panesXids.left[s]), t.x <= o) {
                t.x >= o - 4 && (e.x = s, i = {
                    name: "colHeaderEdge",
                    coords: e,
                    objectPosition: {
                        x: o - 4,
                        y: 0
                    }
                });
                break
            } this._panesXids.left.length && (o += 6);
        for (s = 0; s < this._colView.length; s++)
            if (o += this.getColWidthById(this._colView[s]), t.x <= o) {
                t.x >= o - 4 && (e.x = this._viewportPosition.x + s, i = {
                    name: "colHeaderEdge",
                    coords: e,
                    objectPosition: {
                        x: o - 4,
                        y: 0
                    }
                });
                break
            } return i
    }

    function No(t) {
        return "string" != typeof t ? "" : t.charAt(0).toUpperCase() + t.slice(1)
    }

    function ko(t) {
        var e = "allow" + No(t.slice(0, -5));
        return t.endsWith("touch") && e.slice(0, -5), this[e] || !0
    }

    function Ho(t) {
        if (!ko.call(this, "freezeCols") || this._freezeLineColAfterId && !this._sectionsPerPaneX.left.length) return null;
        var e = this._cd.panesX.center.offset - 6;
        if (t.x < e || t.x > e + 6) return null;
        var i = wo.call(this, t);
        return i.x = this._viewportPosition.x, {
            name: "freezeLineCol",
            objectPosition: {
                x: e,
                y: 0
            },
            coords: i
        }
    }

    function zo(t) {
        var e = (this.colHeaderHeight - 16) / 2;
        if (t.y < e || t.y > this.colHeaderHeight - e) return null;
        var i = null,
            o = wo.call(this, t),
            s = this.getColPositionInViewport(o.x),
            n = this.getColIdByCoord(o.x);
        if (o.x >= this._cols.iconList.length) return null;
        if (null !== this._cols.iconList[o.x][0] && t.x >= s && t.x <= s + 14) {
            var r = o.x - 1,
                l = this.getColIdByCoord(r),
                h = r < 0 ? null : {
                    x: this.getColPositionInViewport(r) + this.getColWidthById(l) - 14 + 1,
                    y: 0
                };
            i = {
                name: "hiddenColGroupIcon",
                coords: o,
                type: "prev",
                groupIndex: this._cols.iconList[o.x][0],
                objectPositionNext: h,
                objectPositionPrev: {
                    x: s,
                    y: 0
                }
            }
        } else if (null !== this._cols.iconList[o.x][1] && t.x >= s + this.getColWidthById(n) - 14 + 1 && t.x <= s + this.getColWidthById(n)) {
            var a = o.x + 1,
                c = (this.getColIdByCoord(a), a > this._cols.coordList.length - 1 ? null : {
                    x: this.getColPositionInViewport(a),
                    y: 0
                });
            i = {
                name: "hiddenColGroupIcon",
                coords: o,
                type: "next",
                groupIndex: this._cols.iconList[o.x][1],
                objectPositionNext: {
                    x: s + this.getColWidthById(n) - 14 + 1,
                    y: 0
                },
                objectPositionPrev: c
            }
        }
        return i
    }

    function Ao(t) {
        if (t.x < 2 || t.x > 18) return null;
        var e = null,
            i = wo.call(this, t),
            o = this.getRowPositionInViewport(i.y),
            s = this.getRowIdByCoord(i.y);
        if (i.y >= this._rows.iconList.length) return null;
        if (null !== this._rows.iconList[i.y][0] && t.y >= o && t.y <= o + 16) {
            var n = i.y - 1,
                r = this.getRowIdByCoord(n),
                l = n < 0 ? null : {
                    x: 0,
                    y: this.getRowPositionInViewport(n) + this.getRowHeightById(r) - 16 + 1
                };
            e = {
                name: "hiddenRowGroupIcon",
                coords: i,
                type: "prev",
                groupIndex: this._rows.iconList[i.y][0],
                objectPositionNext: l,
                objectPositionPrev: {
                    x: 0,
                    y: o
                }
            }
        } else if (null != this._rows.iconList[i.y][1] && t.y >= o + this.getRowHeightById(s) - 16 + 1 && t.y <= o + this.getRowHeightById(s)) {
            var h = i.y + 1,
                a = (this.getRowIdByCoord(h), h > this._rows.coordList.length - 1 ? null : {
                    x: 0,
                    y: this.getRowPositionInViewport(h)
                });
            e = {
                name: "hiddenRowGroupIcon",
                coords: i,
                type: "next",
                groupIndex: this._rows.iconList[i.y][1],
                objectPositionNext: {
                    x: 0,
                    y: o + this.getRowHeightById(s) - 16 + 1
                },
                objectPositionPrev: a
            }
        }
        return e
    }

    function To(t) {
        if (t.x > this._cd.rowHeaderSpace || this._rowViewOverflow < 0 && t.y > this._cd.viewportHeight - Math.abs(this._rowViewOverflow)) return null;
        var e = wo.call(this, t),
            i = this.getRowRangesFromCoord(e.y);
        return i.length ? {
            name: "selectedRowHeader",
            coords: e,
            ranges: i
        } : null
    }

    function Fo(t) {
        return t.x > this._cd.rowHeaderSpace ? null : {
            name: "rowHeader",
            coords: wo.call(this, t)
        }
    }

    function Eo(t) {
        if (!ko.call(this, "freezeRows") || this._freezeLineRowAfterId && !this._sectionsPerPaneY.top.length) return null;
        var e = this._cd.panesY.center.offset - 6;
        if (t.y < e || t.y > e + 6) return null;
        var i = wo.call(this, t);
        return i.y = this._viewportPosition.y, {
            name: "freezeLineRow",
            objectPosition: {
                x: 0,
                y: e
            },
            coords: i
        }
    }

    function Mo(t) {
        return t.x < this._cd.rowHeaderSpace || t.y < this._cd.colHeaderSpace ? null : {
            name: "cell",
            coords: wo.call(this, t)
        }
    }

    function Bo(t) {
        if (null == this._selection || 0 == this._selection.length) return null;
        var e = null,
            i = this._selection[this._selection.length - 1].range,
            o = this.getColPositionInViewport(i[1].x),
            s = this.getRowPositionInViewport(i[1].y),
            n = this.getColWidthById(this.getColIdByCoord(i[1].x)),
            r = this.getRowHeightById(this.getRowIdByCoord(i[1].y));
        if (null == o || null == s) return null;
        var l = s + r - 4,
            h = s + r + 4,
            a = o + n - 4,
            c = o + n + 4;
        return t.x >= a && t.x <= c && t.y >= l && t.y <= h && (e = {
            name: "fillHandle",
            coords: {
                x: i[1].x,
                y: i[1].y
            }
        }), e
    }

    function Oo(t, e) {
        if (void 0 === t && (t = null), void 0 === e && (e = "mouse"), null == t) return null;
        var i, o, s, n, r, l, h, a, c, d, u, p, f, g, _, y, v = null;
        return (i = yo.call(this, t)) ? v = i : (o = vo.call(this, t)) ? v = o : this.allowFillCells && (_ = Bo.call(this, t)) ? v = _ : this.allowFreezeCols && (l = Ho.call(this, t)) ? v = l : this.allowFreezeRows && (u = Eo.call(this, t)) ? v = u : this.allowFreezeCols && (n = bo.call(this, t)) ? v = n : this.allowFreezeRows && (r = So.call(this, t)) ? v = r : (s = Co.call(this, t)) ? v = s : (a = zo.call(this, t)) ? v = a : "touch" != e && this.allowResizeCols && (h = Po.call(this, t)) ? v = h : this.allowMoveCols && (c = Ro.call(this, t)) ? v = c : (d = Lo.call(this, t)) ? v = d : (p = Ao.call(this, t)) ? v = p : this.allowMoveRows && (f = To.call(this, t)) ? v = f : (g = Fo.call(this, t)) ? v = g : (y = Mo.call(this, t)) && (v = y), null != v && ("coords" in v && (v.colSection = this.getColSectionFromCellCoords(v.coords), v.rowSection = this.getRowSectionFromCellCoords(v.coords), v.paneX = this.getPanePositionXfromCellCoords(v.coords), v.paneY = this.getPanePositionYfromCellCoords(v.coords)), v.pointerPositionPx = t), v
    }

    function Do(t, e) {
        3 != t.which && this.showColsById(this._cols.hiddenGroups[e.groupIndex])
    }

    function Vo(t, e) {
        3 != t.which && this.showRowsById(this._rows.hiddenGroups[e.groupIndex])
    }

    function Xo(t, e) {
        this.selectAll()
    }

    function Yo(t) {
        return [t[0].y, t[1].y]
    }

    function Wo(t) {
        this._domNodes.ghostForMoveRows.style.transform = "translateY(" + t + "px)"
    }

    function Ko(t) {
        P(this._domNodes.ghostForMoveRows, {
            height: xt.call(this, t) + "px",
            opacity: this._domNodes.ghostForMoveRows._opacity
        }), Wo.call(this, this.getRowPositionInViewport(t[0]))
    }

    function jo() {
        this._domNodes.ghostForMoveRows.style.opacity = 0
    }

    function Uo(t) {
        if (t < this._rows.coordList.length) var e = this.getRowPositionInViewport(t);
        else {
            var i = this._rows.coordList.length - 1;
            e = this.getRowPositionInViewport.call(this, i);
            e += this.getRowHeightById(this._rows.coordList[i])
        }
        this._domNodes.guideForMoveRows.style.transform = "translateY(" + e + "px)"
    }

    function qo(t) {
        P(this._domNodes.guideForMoveRows, {
            width: this._cd.viewportWidth + "px",
            opacity: this._domNodes.guideForMoveRows._opacity
        }), Uo.call(this, t[0])
    }

    function Go() {
        this._domNodes.guideForMoveRows.style.opacity = 0
    }
    var Zo = {
        start: function (t) {
            t.pointerOffset = t.pointerPositionPx.y - this.getRowPositionInViewport(t.ranges[t.ranges.length - 1].range[0].y)
        },
        move: function (t) {
            var e, i = this,
                o = t.pointerPositionPx.y - t.pointerOffset,
                s = xt.call(this, t.range);
            o < this._cd.colHeaderSpace && (o = this._cd.colHeaderSpace), o > this._cd.viewportHeight - s && (o = this._cd.viewportHeight), (e = Io(t.pointerPosition.y, t.range) ? t.range[0] : t.pointerPosition.y < t.range[0] ? t.pointerPosition.y : t.pointerPosition.y + 1) < 0 && (e = 0), t.endCoord = e || 0, requestAnimationFrame((function () {
                Wo.call(i, o), Uo.call(i, e)
            }))
        },
        end: function (t) {
            this.moveRows(t.range, t.endCoord)
        },
        prepare: function (t) {
            var e = this,
                i = t.ranges[t.ranges.length - 1];
            t.range = Yo.call(this, i.range), requestAnimationFrame((function () {
                Ko.call(e, t.range), qo.call(e, t.range)
            }))
        },
        release: function (t) {
            var e = this;
            requestAnimationFrame((function () {
                jo.call(e), Go.call(e)
            }))
        }
    };

    function $o(t, e, i) {
        return Math.min(Math.max(t, e), i)
    }

    function Qo(t) {
        this._domNodes.ghostForFreezeRows.style.transform = "translateY(" + t + "px)"
    }

    function Jo(t) {
        P(this._domNodes.ghostForFreezeRows, {
            opacity: this._domNodes.ghostForFreezeRows._opacity
        }), Qo.call(this, t)
    }

    function ts() {
        this._domNodes.ghostForFreezeRows.style.opacity = 0
    }

    function es(t) {
        if (t < this._rows.coordList.length) var e = this.getRowPositionInViewport(t);
        0 != t && t != this._panesYids.top.length || (e -= 6), this._domNodes.guideForFreezeRows.style.transform = "translateY(" + e + "px)"
    }

    function is(t) {
        P(this._domNodes.guideForFreezeRows, {
            width: this._cd.viewportWidth + "px",
            opacity: this._domNodes.guideForFreezeRows._opacity
        }), es.call(this, t)
    }

    function os() {
        this._domNodes.guideForFreezeRows.style.opacity = 0
    }
    var ss, ns = (ss = function (t) {
        t.ghostPositionPx = t.pointerPositionPx.y - t.pointerOffset - 1, t.endCoord = $o(xo.call(this, t.pointerPositionPx.y, !0), 0, this._rows.coordList.length - 1)
    }, {
        start: function (t) {
            this._domNodes.scrollArea.scrollTop = 0
        },
        move: function (t) {
            var e = this;
            ss.call(this, t), requestAnimationFrame((function () {
                Qo.call(e, t.ghostPositionPx), es.call(e, t.endCoord)
            }))
        },
        end: function (t) {
            this.freezeRows(this.getRowIndexByCoord(t.endCoord))
        },
        prepare: function (t) {
            var e = this,
                i = t.pointerPositionPx.y;
            i -= this.getRowPositionInViewport(t.coords.y), (this._panesYids.top.length || null == this._freezeLineRowAfterId) && (i += 6), t.pointerOffset = i, ss.call(this, t), requestAnimationFrame((function () {
                Jo.call(e, t.ghostPositionPx), is.call(e, t.coords.y)
            }))
        },
        release: function (t) {
            var e = this;
            requestAnimationFrame((function () {
                ts.call(e), os.call(e)
            }))
        }
    });

    function rs(t) {
        this._domNodes.ghostForFreezeCols.style.transform = "translateX(" + t + "px)"
    }

    function ls(t) {
        P(this._domNodes.ghostForFreezeCols, {
            opacity: this._domNodes.ghostForFreezeCols._opacity
        }), rs.call(this, t)
    }

    function hs() {
        this._domNodes.ghostForFreezeCols.style.opacity = 0
    }

    function as(t) {
        if (t < this._cols.coordList.length) var e = this.getColPositionInViewport(t);
        0 != t && t != this._panesXids.left.length || (e -= 6), this._domNodes.guideForFreezeCols.style.transform = "translateX(" + e + "px)"
    }

    function cs(t) {
        P(this._domNodes.guideForFreezeCols, {
            height: this._cd.viewportHeight + "px",
            opacity: this._domNodes.guideForFreezeCols._opacity
        }), as.call(this, t)
    }

    function ds() {
        this._domNodes.guideForFreezeCols.style.opacity = 0
    }
    var us = function () {
        var t = function (t) {
            t.ghostPositionPx = t.pointerPositionPx.x - t.pointerOffset - 1, t.endCoord = $o(mo.call(this, t.pointerPositionPx.x, !0), 0, this._cols.coordList.length - 1)
        };
        return {
            start: function (t) {
                this._domNodes.scrollArea.scrollLeft = 0
            },
            move: function (e) {
                var i = this;
                t.call(this, e), requestAnimationFrame((function () {
                    rs.call(i, e.pointerPositionPx.x), as.call(i, e.endCoord)
                }))
            },
            end: function (t) {
                this.freezeCols(this.getColIndexByCoord(t.endCoord))
            },
            prepare: function (e) {
                var i = this,
                    o = e.pointerPositionPx.x;
                o -= this.getColPositionInViewport(e.coords.x), (this._panesXids.left.length || null == this._freezeLineColAfterId) && (o += 6), e.pointerOffset = o, t.call(this, e), requestAnimationFrame((function () {
                    ls.call(i, e.ghostPositionPx), cs.call(i, e.coords.x)
                }))
            },
            release: function (t) {
                var e = this;
                requestAnimationFrame((function () {
                    hs.call(e), ds.call(e)
                }))
            }
        }
    }();

    function ps(t) {
        return [t[0].x, t[1].x]
    }

    function fs(t) {
        this._domNodes.guideForResizeCols.style.transform = "translateX(" + t + "px)"
    }

    function gs(t) {
        this._domNodes.guideForResizeCols.style.opacity = this._domNodes.guideForResizeCols._opacity, fs.call(this, t)
    }

    function _s() {
        this._domNodes.guideForResizeCols.style.opacity = 0
    }

    function ys(t, e) {
        if (null == t || null == e) return !1;
        for (var i = !1, o = 0; o < e.length; o++)
            if (Io(t, e[o])) {
                i = !0;
                break
            } return i
    }
    var vs = function () {
        var t = function (t) {
            var e = t.pointerPositionPx.x - (t.pointerOffset - 1),
                i = this._cd.viewportWidth,
                o = this.getColPositionInViewport(t.coords.x) + 32 - 4;
            e < o ? e = o : e + 4 > i && (e = i - 3), e < this._cd.rowHeaderSpace && (e = this._cd.rowHeaderSpace), t.guidePositionPx = e, t.size = e - this.getColPositionInViewport(t.coords.x)
        };
        return {
            start: function (t) {},
            move: function (e) {
                var i = this;
                t.call(this, e), requestAnimationFrame((function () {
                    fs.call(i, e.guidePositionPx)
                }))
            },
            end: function (t) {
                ys(t.coords.x, this.getColSelection()) ? this.resizeCols(this.getColSelection(), t.size) : this.resizeCols(t.coords.x, t.size)
            },
            prepare: function (e) {
                var i = this,
                    o = e.pointerPositionPx.x;
                o -= this.getColPositionInViewport(e.coords.x), o -= this.getColWidthById(this._cols.coordList[e.coords.x]) - 4, e.pointerOffset = o, t.call(this, e), requestAnimationFrame((function () {
                    gs.call(i, e.guidePositionPx)
                }))
            },
            release: function (t) {
                var e = this;
                requestAnimationFrame((function () {
                    _s.call(e)
                }))
            }
        }
    }();

    function ms(t) {
        this._domNodes.ghostForMoveCols.style.transform = "translateX(" + t + "px)"
    }

    function xs(t) {
        P(this._domNodes.ghostForMoveCols, {
            width: vt.call(this, t) + "px",
            opacity: this._domNodes.ghostForMoveCols._opacity
        }), ms.call(this, this.getColPositionInViewport(t[0]))
    }

    function ws() {
        this._domNodes.ghostForMoveCols.style.opacity = 0
    }

    function Cs(t) {
        if (t < this._cols.coordList.length) var e = this.getColPositionInViewport(t);
        else {
            var i = this._cols.coordList.length - 1;
            e = this.getColPositionInViewport.call(this, i);
            e += this.getColWidthById(this._cols.coordList[i])
        }
        this._domNodes.guideForMoveCols.style.transform = "translateX(" + e + "px)"
    }

    function bs(t) {
        P(this._domNodes.guideForMoveCols, {
            height: this._cd.viewportHeight + "px",
            opacity: this._domNodes.guideForMoveCols._opacity
        }), Cs.call(this, t[0])
    }

    function Ss() {
        this._domNodes.guideForMoveCols.style.opacity = 0
    }

    function Is(t, e, i) {
        if (void 0 === e && (e = "document"), void 0 === i && (i = null), null == t) return null;
        var o = {
            x: t.x,
            y: t.y
        };
        if ("document" == e) var s = Rs.call(this);
        else if ("cellSelection" == e) {
            if (null == i) var n = this._selection[this._activeRangeIndex].range;
            else n = this._selection[i].range;
            if (null != n) s = Ls.call(this, n);
            else s = Rs.call(this, n)
        }
        var r = o.y < s.top,
            l = o.x > s.right,
            h = o.y > s.bottom,
            a = o.x < s.left;
        return r && (o.y = s.top), a && (o.x = s.left), l && (o.x = s.right), h && (o.y = s.bottom), o
    }
    var Rs = function () {
            return {
                top: 0,
                right: this._cols.coordList.length - 1,
                bottom: this._rows.coordList.length - 1,
                left: 0
            }
        },
        Ls = function (t) {
            return {
                top: t[0].y,
                right: t[1].x,
                bottom: t[1].y,
                left: t[0].x
            }
        };

    function Ps(t) {
        if (null == t) return null;
        if (e(t)) {
            if (d(t[0])) {
                var i = null,
                    o = null;
                if (1 == t.length) var s = t[0];
                else s = t[1];
                return t[0] > s ? (i = s, o = t[0]) : (i = t[0], o = s), [i, o]
            }
            var n = {
                    x: null,
                    y: null
                },
                r = {
                    x: null,
                    y: null
                };
            return t[0].x < t[1].x ? (n.x = t[0].x, r.x = t[1].x) : (n.x = t[1].x, r.x = t[0].x), t[0].y < t[1].y ? (n.y = t[0].y, r.y = t[1].y) : (n.y = t[1].y, r.y = t[0].y), [n, r]
        }
        return d(t) ? [t, t] : null
    }
    var Ns = {
            start: function (t) {},
            move: function (t) {
                var e = ks.call(this, t.pointerPosition);
                t.dragDirection = e.dragDirection, t.dragAmount = e.dragAmount, Ki.call(this, "fill", e.targetCellRange, t)
            },
            end: function (t) {
                if (null != t.dragDirection && null != t.dragAmount) {
                    var e = this._selection[this._selection.length - 1].range;
                    this.fillCells(e, t.dragDirection, t.dragAmount)
                }
            },
            prepare: function (t) {},
            release: function (t) {}
        },
        ks = function (t) {
            var e = this._selection[this._selection.length - 1].range,
                i = 0,
                o = 0,
                s = "",
                n = "";
            if (t.y < e[0].y) {
                var r = e[0].y - 1;
                i = e[0].y - t.y, n = "up"
            } else if (t.y > e[1].y) {
                r = e[1].y + 1;
                i = t.y - e[1].y, n = "down"
            }
            if (t.x < e[0].x) {
                var l = e[0].x - 1;
                o = e[0].x - t.x, s = "left"
            } else if (t.x > e[1].x) {
                l = e[1].x + 1;
                o = t.x - e[1].x, s = "right"
            }
            if ("xy" == this.fillCellsDirection) {
                if (0 == o && 0 == i) return {
                    dragDirection: void 0,
                    dragAmount: void 0,
                    targetCellRange: null
                };
                if (i >= o) {
                    var h = {
                            x: e[0].x,
                            y: r
                        },
                        a = {
                            x: e[1].x,
                            y: t.y
                        };
                    c = n, d = i
                } else {
                    h = {
                        x: l,
                        y: e[0].y
                    }, a = {
                        x: t.x,
                        y: e[1].y
                    };
                    c = s, d = o
                }
            } else if ("y" == this.fillCellsDirection) {
                if (0 == i) return {
                    dragDirection: void 0,
                    dragAmount: void 0
                };
                h = {
                    x: e[0].x,
                    y: r
                }, a = {
                    x: e[1].x,
                    y: t.y
                };
                var c = n,
                    d = i
            } else if ("x" == this.fillCellsDirection) {
                if (0 == o) return {
                    dragDirection: void 0,
                    dragAmount: void 0
                };
                h = {
                    x: l,
                    y: e[0].y
                }, a = {
                    x: t.x,
                    y: e[1].y
                }, c = s, d = o
            }
            return {
                dragDirection: c,
                dragAmount: d,
                targetCellRange: Ps([h, a = Is.call(this, a)])
            }
        },
        Hs = {
            resizeCols: {
                handler: vs,
                edgeDetection: !1
            },
            freezeCols: {
                handler: us,
                edgeDetection: !1
            },
            moveCols: {
                handler: {
                    start: function (t) {
                        t.pointerOffset = t.pointerPositionPx.x - this.getColPositionInViewport(t.ranges[t.ranges.length - 1].range[0].x)
                    },
                    move: function (t) {
                        var e, i = this,
                            o = t.pointerPositionPx.x - t.pointerOffset,
                            s = vt.call(this, t.range);
                        o < this._cd.rowHeaderSpace && (o = this._cd.rowHeaderSpace), o > this._cd.viewportWidth - s && (o = this._cd.viewportWidth - s), (e = Io(t.pointerPosition.x, t.range) ? t.range[0] : t.pointerPosition.x < t.range[0] ? t.pointerPosition.x : t.pointerPosition.x + 1) < 0 && (e = 0), t.endCoord = e || 0, requestAnimationFrame((function () {
                            ms.call(i, o), Cs.call(i, e)
                        }))
                    },
                    end: function (t) {
                        this.moveCols(t.range, t.endCoord)
                    },
                    prepare: function (t) {
                        var e = this,
                            i = t.ranges[t.ranges.length - 1];
                        t.range = ps.call(this, i.range), requestAnimationFrame((function () {
                            xs.call(e, t.range), bs.call(e, t.range)
                        }))
                    },
                    release: function (t) {
                        var e = this;
                        requestAnimationFrame((function () {
                            ws.call(e), Ss.call(e)
                        }))
                    }
                },
                edgeDetection: "x"
            },
            moveRows: {
                handler: Zo,
                edgeDetection: "y"
            },
            freezeRows: {
                handler: ns,
                edgeDetection: !1
            },
            fillCells: {
                handler: Ns,
                edgeDetection: "xy"
            },
            selectCells: {
                handler: {
                    start: function (t) {},
                    move: function (t) {
                        var e = !0;
                        "e" in t && t.e[this._commandKey] && (e = !1), this.setCellRangeExtreme(t.pointerPosition, e)
                    },
                    end: function (t) {},
                    prepare: function (t) {},
                    release: function (t) {}
                },
                edgeDetection: "xy"
            },
            selectRows: {
                handler: {
                    start: function (t) {},
                    move: function (t) {
                        var e = !0;
                        "e" in t && t.e[this._commandKey] && (e = !1), this.setRowRangeExtreme(t.pointerPosition.y, e)
                    },
                    end: function (t) {},
                    prepare: function (t) {},
                    release: function (t) {}
                },
                edgeDetection: "y"
            },
            selectCols: {
                handler: {
                    start: function (t) {},
                    move: function (t) {
                        var e = !0;
                        "e" in t && t.e[this._commandKey] && (e = !1), this.setColRangeExtreme(t.pointerPosition.x, e)
                    },
                    end: function (t) {},
                    prepare: function (t) {},
                    release: function (t) {}
                },
                edgeDetection: "x"
            }
        };

    function zs() {
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection && document.selection.empty()
    }

    function As() {}

    function Ts() {
        this._domNodes.hintForResizeCols.style.opacity = 0
    }

    function Fs() {
        this._domNodes.hintForFreezeCols.style.opacity = 0
    }

    function Es() {
        this._domNodes.hintForFreezeRows.style.opacity = 0
    }

    function Ms() {
        for (var t = ["next", "prev"], e = 0; e < t.length; e++) P(this._domNodes["hintForShowCols" + No(t[e])], {
            opacity: 0
        })
    }

    function Bs() {
        for (var t = ["next", "prev"], e = 0; e < t.length; e++) P(this._domNodes["hintForShowRows" + No(t[e])], {
            opacity: 0
        })
    }

    function Os() {
        var t = this;
        requestAnimationFrame((function () {
            Ts.call(t), Fs.call(t), Es.call(t), Ms.call(t), Bs.call(t)
        })), this._hoverArea = null
    }

    function Ds(t) {
        if (void 0 === t && (t = null), null == t) return this._domNodes.eventArea.style.cursor = "", void(this._domNodes.eventArea._mouseCursorState = null);
        var e = this.mouseCursorStatesDrag[t];
        e && (this._domNodes.eventArea.style.cursor = e)
    }

    function Vs(t, e, i, o) {
        if (-1 == o.indexOf("center")) return 0;
        var s = 0,
            n = this._cd.panesX.left.space,
            r = n + this._cd.panesX.center.space;
        return t > r ? s = t - r : t < n && (s = t - n), s
    }

    function Xs(t, e, i, o) {
        if (-1 == o.indexOf("center")) return 0;
        var s = 0,
            n = this._cd.panesY.center.offset,
            r = n + this._cd.panesY.center.space;
        return t > r ? s = t - r : t < n && (s = t - n), s
    }

    function Ys(t) {
        void 0 === t && (t = "xy");
        var e = Math.floor(this._edgeOffsetX / 2),
            i = Math.floor(this._edgeOffsetY / 2);
        this._edgeOffsetX < -40 ? e = -40 : this._edgeOffsetX > 40 && (e = 40), this._edgeOffsetY < -40 ? i = -40 : this._edgeOffsetY > 40 && (i = 40), 0 != this._edgeOffsetX && "y" != t && (this._domNodes.scrollArea.scrollLeft += e), 0 != this._edgeOffsetY && "x" != t && (this._domNodes.scrollArea.scrollTop += i), this._domNodes.display._edgeDetectTimeout = setTimeout(this._domNodes.display._edgeDetectFunction, 50)
    }

    function Ws(t) {
        void 0 === t && (t = "xy"), this._edgeOffsetX = 0, this._edgeOffsetY = 0, t && (this._domNodes.display._edgeDetectFunction = Ys.bind(this, t), this._domNodes.display._edgeDetectTimeout = setTimeout(this._domNodes.display._edgeDetectFunction, 50))
    }

    function Ks(t) {
        if (void 0 === t && (t = null), null == t) return this._domNodes.eventArea.style.cursor = "", void(this._domNodes.eventArea._mouseCursorState = null);
        var e = this.mouseCursorStatesIdle[t];
        e && (this._domNodes.eventArea.style.cursor = e)
    }

    function js(t) {
        P(this._domNodes.hintForResizeCols, {
            transform: "translateX(" + t + "px)",
            opacity: this._domNodes.hintForResizeCols._opacity
        })
    }

    function Us(t) {
        P(this._domNodes.hintForFreezeCols, {
            transform: "translateX(" + t + "px)",
            opacity: this._domNodes.hintForFreezeCols._opacity
        })
    }

    function qs(t) {
        P(this._domNodes.hintForFreezeRows, {
            transform: "translateY(" + t + "px)",
            opacity: this._domNodes.hintForFreezeRows._opacity
        })
    }

    function Gs(t) {
        for (var e, i = ["next", "prev"], o = 0; o < i.length; o++) {
            e = this._domNodes["hintForShowCols" + No(i[o])];
            var s = t["objectPosition" + No(i[o])];
            P(e, null == s ? {
                opacity: 0
            } : {
                transform: "translateX(" + s.x + "px)",
                opacity: e._opacity
            })
        }
    }

    function Zs(t) {
        for (var e, i = ["next", "prev"], o = 0; o < i.length; o++) {
            e = this._domNodes["hintForShowRows" + No(i[o])];
            var s = t["objectPosition" + No(i[o])];
            P(e, null == s ? {
                opacity: 0
            } : {
                transform: "translateY(" + s.y + "px)",
                opacity: e._opacity
            })
        }
    }

    function $s(t) {
        void 0 === t && (t = null), null == t && (t = this._pointerPositionPx);
        var e = Oo.call(this, t);
        Ts.call(this), Fs.call(this), Es.call(this), Ms.call(this), Bs.call(this), null == e ? Ks.call(this, "default") : ("hiddenRowGroupIcon" == e.name ? Zs.call(this, e) : "hiddenColGroupIcon" == e.name && Gs.call(this, e), "colHeaderEdge" == e.name ? js.call(this, e.objectPosition.x) : e.name.startsWith("freezeLineCol") ? Us.call(this, e.objectPosition.x) : e.name.startsWith("freezeLineRow") && qs.call(this, e.objectPosition.y), Ks.call(this, e.name))
    }

    function Qs() {
        null != this._domNodes.display._edgeDetectTimeout && (clearTimeout(this._domNodes.display._edgeDetectTimeout), this._domNodes.display._edgeDetectTimeout = null), this._edgeOffsetX = 0, this._edgeOffsetY = 0
    }

    function Js(t) {
        Qs.call(this), document.removeEventListener("mousemove", this._domNodes.display[t + "MoveFunc"]), document.removeEventListener("mouseup", this._domNodes.display[t + "EndFunc"]), this._currentDragAction = null, $s.call(this, this._domNodes.display[t + "Properties"].pointerPositionPx), mi.call(this, "eventArea", "mousemove"), mi.call(this, "eventArea", "mouseleave"), this.redraw()
    }

    function tn(t, e) {
        void 0 === e && (e = {
            x: 0,
            y: 0
        }), t = sn.call(this, t), en.call(this, t, e), on.call(this, t, e)
    }
    var en = function (t, e) {
            no(this._viewportPosition, t) || (this._viewportPosition = t, this._viewportOverflowPx = e, Ot.call(this), Dt.call(this), this._isViewportConnectedTo = {
                top: ro.call(this),
                left: lo.call(this)
            })
        },
        on = function (t, e) {
            this._domNodes.display._setViewportPositionOnScroll = !1;
            var i = 40 * (t.x - this._panesXids.left.length),
                o = 40 * (t.y - this._panesYids.top.length);
            this._domNodes.scrollArea.scrollLeft = i, this._domNodes.scrollArea.scrollTop = o
        },
        sn = function (t) {
            return t.x < this._panesXids.left.length && (t.x = this._panesXids.left.length), t.y < this._panesYids.top.length && (t.y = this._panesYids.top.length), t.x > this._lastColView.startIndex && (t.x = this._lastColView.startIndex), t.y > this._lastRowView.startIndex && (t.y = this._lastRowView.startIndex), t
        };

    function nn(t, e, i) {
        t in Hs && ("allow" + No(t) in this && !this["allow" + No(t)] || (i.panesY = [i.paneY], i.panesX = [i.paneX], zs.call(this), As.call(this), this._domNodes.display[t + "Properties"] = go(i), this._domNodes.display[t + "Flags"] = {
            hasMoved: !1
        }, t + "MoveFunc" in this._domNodes.display || rn.call(this, t, e, i), t + "EndFunc" in this._domNodes.display || ln.call(this, t, e, i), xi.call(this, "eventArea", "mousemove"), xi.call(this, "eventArea", "mouseleave"), Os.call(this), Ds.call(this, t), this._currentDragAction = t, Hs[t].handler.prepare.call(this, this._domNodes.display[t + "Properties"]), document.addEventListener("mousemove", this._domNodes.display[t + "MoveFunc"]), document.addEventListener("mouseup", this._domNodes.display[t + "EndFunc"])))
    }
    var rn = function (t, e, i) {
            this._domNodes.display[t + "MoveFunc"] = function (e) {
                void 0 === e && (e = null);
                var i = this._domNodes.display[t + "Properties"],
                    o = this._domNodes.display[t + "Flags"];
                if (null != e && (i.e = e), o.hasMoved || (Ws.call(this, Hs[t].edgeDetection), Hs[t].handler.start.call(this, i), o.hasMoved = !0), null == e) var s = i.pointerPositionPx;
                else s = _o.call(this, e.clientX, e.clientY);
                this._pointerPositionPx = s;
                var n = i.paneY,
                    r = i.paneX,
                    l = wo.call(this, this._pointerPositionPx),
                    h = this.getPanePositionXfromCellCoords(l),
                    a = this.getPanePositionYfromCellCoords(l),
                    c = this.getColSectionFromCellCoords(l),
                    d = this.getRowSectionFromCellCoords(l),
                    u = null,
                    p = null;
                "top" == i.paneY && "center" == a && !this._isViewportConnectedTo.top && Hs[t].edgeDetection.includes("y") && 1 == i.panesY.length && (u = this._panesYids.top.length), "left" == i.paneX && "center" == h && !this._isViewportConnectedTo.left && Hs[t].edgeDetection.includes("x") && 1 == i.panesX.length && (p = this._panesXids.left.length), i.panesY.indexOf("center") > -1 && "top" == a && !this._isViewportConnectedTo.top && (l.y = this._viewportPosition.y), i.panesX.indexOf("center") > -1 && "left" == h && !this._isViewportConnectedTo.left && (l.x = this._viewportPosition.x), null === p && null === u || tn.call(this, {
                    x: null !== p ? p : this._viewportPosition.x,
                    y: null !== u ? u : this._viewportPosition.y
                }), null !== u && (i.pointerPosition.y = xo.call(this, s.y)), null !== p && (i.pointerPosition.x = mo.call(this, s.x)), i.pointerPositionPx = s, i.pointerPosition = l, i.newPaneX = h, i.newPaneY = a, this._isViewportConnectedTo.top && "top" == a ? i.panesY = ["top"] : a != i.panesY[i.panesY.length - 1] && i.panesY.push(a), this._isViewportConnectedTo.left && "left" == h ? i.panesX = ["left"] : h != i.panesX[i.panesX.length - 1] && i.panesX.push(h), i.newColSection = c, i.newRowSection = d, Hs[t].handler.move.call(this, i), this._edgeOffsetX = Vs.call(this, s.x, r, h, i.panesX), this._edgeOffsetY = Xs.call(this, s.y, n, a, i.panesY)
            }.bind(this)
        },
        ln = function (t, e, i) {
            this._domNodes.display[t + "EndFunc"] = function (e) {
                Js.call(this, t), Hs[t].handler.release.call(this, this._domNodes.display[t + "Properties"]), this._domNodes.display[t + "Flags"].hasMoved && Hs[t].handler.end.call(this, this._domNodes.display[t + "Properties"]), delete this._domNodes.display[t + "Properties"]
            }.bind(this)
        };

    function hn(t, e) {
        3 != t.which && nn.call(this, "freezeRows", t, e)
    }

    function an(t, e) {
        3 != t.which && nn.call(this, "moveRows", t, e)
    }

    function cn(t, e) {
        3 == t.which && this.getRowRangesFromCoord(e.coords.y).length || ("mouse" == e.pointer ? (t.shiftKey ? this.setRowRangeExtreme(e.coords.y, !0) : t[this._commandKey] ? this.addRowRangeToSelection([e.coords.y, e.coords.y]) : this.setRowSelection(e.coords.y, !0, !1), nn.call(this, "selectRows", t, e)) : "touch" == e.pointer && this.setRowSelection(e.coords.y, !0, !1))
    }

    function dn(t, e) {
        3 != t.which && nn.call(this, "freezeCols", t, e)
    }

    function un(t, e) {
        3 != t.which && nn.call(this, "resizeCols", t, e)
    }

    function pn(t, e) {
        3 != t.which && nn.call(this, "moveCols", t, e)
    }

    function fn(t, e) {
        3 == t.which && this.getColRangesFromCoord(e.coords.x).length || ("mouse" == e.pointer ? (t.shiftKey ? this.setColRangeExtreme(e.coords.x, !0) : t[this._commandKey] ? this.addColRangeToSelection([e.coords.x, e.coords.x]) : this.setColSelection(e.coords.x, !0, !1), nn.call(this, "selectCols", t, e)) : "touch" == e.pointer && this.setColSelection(e.coords.x, !0, !1))
    }

    function gn(t, e) {
        3 != t.which && nn.call(this, "freezeCols", t, e)
    }

    function _n(t, e) {
        3 != t.which && nn.call(this, "freezeRows", t, e)
    }

    function yn(t, e) {
        3 == t.which && this.getAnyRangesFromCellCoords(e.coords).length || ("mouse" == e.pointer ? (t.shiftKey ? this.setCellRangeExtreme(e.coords, !0) : t[this._commandKey] ? this.addCellRangeToSelection([e.coords, e.coords]) : this.setCellSelection(e.coords), nn.call(this, "selectCells", t, e)) : this.setCellSelection(e.coords))
    }

    function vn(t, e) {
        3 == t.which && this.getAnyRangesFromCellCoords(e.coords).length || nn.call(this, "fillCells", t, e)
    }

    function mn(t) {
        var e = _o.call(this, t.clientX, t.clientY),
            i = Oo.call(this, e);
        this._domNodes.display._initialMouseHitArea = go(i), null != i && (i.pointer = "mouse", "jointHeader" == i.name ? Xo.call(this, t, i) : "fillHandle" == i.name ? vn.call(this, t, i) : "freezeLinePlaceholderCol" == i.name ? gn.call(this, t, i) : "freezeLinePlaceholderRow" == i.name ? _n.call(this, t, i) : "freezeLineRow" == i.name ? hn.call(this, t, i) : "hiddenRowGroupIcon" == i.name ? Vo.call(this, t, i) : "selectedRowHeader" == i.name ? an.call(this, t, i) : "rowHeader" == i.name ? cn.call(this, t, i) : "freezeLineCol" == i.name ? dn.call(this, t, i) : "hiddenColGroupIcon" == i.name ? Do.call(this, t, i) : "colHeaderEdge" == i.name ? un.call(this, t, i) : "selectedColHeader" == i.name ? pn.call(this, t, i) : "colHeader" == i.name ? fn.call(this, t, i) : "cell" == i.name && yn.call(this, t, i))
    }

    function xn(t) {
        this._domNodes.display._touchStartFired ? this._domNodes.display._touchStartFired = !1 : mn.call(this, t)
    }

    function wn(t) {
        this._pointerPositionPx = _o.call(this, t.clientX, t.clientY), this._pointerPosition = wo.call(this, this._pointerPositionPx), $s.call(this, this._pointerPositionPx)
    }

    function Cn(t) {
        Os.call(this)
    }

    function bn(t) {
        if (!(t.ctrlKey || t.metaKey || t.shiftKey)) {
            var e = this._domNodes.display._initialMouseHitArea;
            if (e) {
                this._pointerPositionPx = _o.call(this, t.clientX, t.clientY);
                var i = Oo.call(this, this._pointerPositionPx);
                null != i && (this.allowResizeCols && "colHeaderEdge" == i.name && "colHeaderEdge" == e.name && no(i.coords.x, e.coords.x) ? ys(i.coords.x, this.getColSelection()) ? this.resizeColsToFit(this.getColSelection()) : this.resizeColsToFit(i.coords.x) : this.allowEditCells && "cell" == i.name && "cell" == e.name && no(i.coords, e.coords) && this.openCellEditor("edit"), this._domNodes.display._initialMouseHitArea = void 0)
            }
        }
    }

    function Sn(t) {
        for (var e = [], i = 0; i < t.length; i++) "string" == typeof t[i] ? !(t[i] in this._presetContextMenuItems) || "include" in this._presetContextMenuItems[t[i]] && !this._presetContextMenuItems[t[i]].include.call(this) || e.push(this._presetContextMenuItems[t[i]]) : e.push(t[i]);
        return e
    }

    function In(t, e) {
        (void 0 === t && (t = {}), t.contextMenu = this.constructor.contextMenu, t.items = Sn.call(this, this.contextMenuItems), t.items.length) && (this.events.dispatch("beforeopencontextmenu", t) && (this.constructor.contextMenu.open(this, t.items, t.snapPointX, t.snapPointY, this._handlers.contextMenu.selectItem, this._handlers.contextMenu.close), to.call(this, "contextMenuOpen"), this.events.dispatch("opencontextmenu", t)))
    }

    function Rn(t) {
        3 == t.which && (this._pointerPositionPx = _o.call(this, t.clientX, t.clientY), null == yo.call(this, this._pointerPositionPx) && null == vo.call(this, this._pointerPositionPx) && In.call(this, {
            snapPointX: t.pageX - (this._isFullscreen ? window.scrollX : 0),
            snapPointY: t.pageY - (this._isFullscreen ? window.scrollY : 0)
        }, t))
    }

    function Ln(t) {}

    function Pn(t) {}

    function Nn(t) {}

    function kn() {
        var t = this._selection[this._activeRangeIndex].range;
        1 == this._selection.length && Di.call(this, t) ? to.call(this, "traverseSingleCell") : to.call(this, "traverseMultiCell")
    }

    function Hn(t, e) {
        void 0 === t && (t = {}), t.contextMenu.execClose(), this._isActive && kn.call(this), this.events.dispatch("closecontextmenu", t)
    }

    function zn(t) {
        void 0 === t && (t = {}), t.contextMenu.close(), t.item.method.call(this), this.events.dispatch("contextmenuselectitem", t)
    }

    function An() {
        this._handlers = {
            contextMenu: {
                open: In.bind(this),
                selectItem: zn.bind(this),
                close: Hn.bind(this)
            }
        }, this._listeners = {
            document: {
                fullscreenchange: Ni.bind(this),
                webkitfullscreenchange: ki.bind(this),
                keydown: Hi.bind(this),
                mousedown: Ti.bind(this)
            },
            window: {
                resize: Fi.bind(this)
            },
            container: {
                resize: Mi.bind(this)
            },
            lineHeightMeter: {
                resize: Ei.bind(this)
            },
            component: {
                contextmenu: Bi.bind(this)
            },
            cellEditorInputField: {
                copy: qi.bind(this),
                paste: $i.bind(this),
                cut: Ji.bind(this),
                mousedown: eo.bind(this),
                input: oo.bind(this)
            },
            scrollArea: {
                scroll: uo.bind(this),
                scroll_debounced: Wt((function (t) {
                    fo.call(this)
                }), 100).bind(this)
            },
            eventArea: {
                mousedown: xn.bind(this),
                mousemove: wn.bind(this),
                mouseleave: Cn.bind(this),
                dblclick: bn.bind(this),
                contextmenu: Rn.bind(this),
                touchstart_passive: Ln.bind(this),
                touchmove_passive: Pn.bind(this),
                touchend_passive: Nn.bind(this)
            }
        }
    }

    function Tn() {
        var t = {
            document: ["fullscreenchange", "webkitfullscreenchange", "keydown", "mousedown"],
            component: ["contextmenu"],
            cellEditorInputField: ["copy", "paste", "cut", "mousedown", "input"],
            scrollArea: ["scroll", "scroll_debounced"],
            eventArea: ["mousedown", "mousemove", "mouseleave", "dblclick", "contextmenu"]
        };
        for (var e in t)
            for (var i = 0; i < t[e].length; i++) mi.call(this, e, t[e][i]);
        this._domNodes.container._resizeSensor.events.on("resize", this._listeners.container.resize), this._domNodes.lineHeightMeter._resizeSensor.events.on("resize", this._listeners.lineHeightMeter.resize)
    }

    function Fn() {
        En.call(this, "topBar"), En.call(this, "bottomBar")
    }
    var En = function (t) {
        if ("topBar" == t) var e = this._validatedTopBar,
            i = this._topBarNodes;
        else if ("bottomBar" == t) e = this._validatedBottomBar, i = this._bottomBarNodes;
        for (var o = function (t) {
                var o = e[t].listeners;
                for (var s in o) {
                    var n = s.split("."),
                        r = n[0],
                        l = n[1],
                        h = o[s].bind(this, i[t].nodes);
                    i[t].nodes[r].addEventListener(l, h)
                }
            }, n = function (t) {
                var o = e[t].events;
                for (var s in o) {
                    var n = o[s].bind(this, i[t].nodes);
                    this.events.on(s, n)
                }
            }, r = function (t) {
                if ("keys" in e[t])
                    for (var o in e[t].keys)
                        for (var n = 0; n < e[t].keys[o].length; n++) {
                            var r = e[t].keys[o][n];
                            if (s(r)) {
                                var l = r.action.bind(this, i[t].nodes);
                                this.keys.on(r.keys, l, r.repeat, i[t].nodes[o])
                            } else {
                                var h = this._presetKeyActions[r];
                                this.keys.on(h.keys, h.action, h.repeat, i[t].nodes[o])
                            }
                        }
            }, l = 0; l < e.length; l++) o.call(this, l), n.call(this, l), r.call(this, l)
    };

    function Mn() {
        for (var t in this._domNodes.canvas) {
            var e = t.split("-"),
                i = e[0],
                o = e[1];
            On.call(this, i, o), Bn.call(this, i, o)
        }
    }
    var Bn = function (t, e) {
            var i = this._domNodes.canvas[t + "-" + e];
            i._context = i.getContext("2d", {
                alpha: !1
            }), i._context.msImageSmoothingEnabled = !1, i._context.webkitImageSmoothingEnabled = !1, i._context.imageSmoothingEnabled = !1
        },
        On = function (t, e) {
            var i = this._domNodes.canvas[t + "-" + e],
                o = i._displayWidth / 1,
                s = i._displayHeight / this.rowHeight;
            i._drawWidth = o, i._drawHeight = s, i.width = o, i.height = s
        };

    function Dn() {
        for (var t, e, i = Array.prototype.slice.call(arguments), o = [0, 0, 0, 0]; e = i.shift();) void 0 === e[3] && (e[3] = 1), o[3] && e[3] ? ((t = [0, 0, 0, 0])[3] = 1 - (1 - e[3]) * (1 - o[3]), t[0] = Math.round(e[0] * e[3] / t[3] + o[0] * o[3] * (1 - e[3]) / t[3]), t[1] = Math.round(e[1] * e[3] / t[3] + o[1] * o[3] * (1 - e[3]) / t[3]), t[2] = Math.round(e[2] * e[3] / t[3] + o[2] * o[3] * (1 - e[3]) / t[3])) : t = e || o, o = t;
        return t
    }

    function Vn(t) {
        if ("" !== t) {
            if ("transparent" === t.toLowerCase()) return [0, 0, 0, 0];
            if ("#" === t[0]) return t.length < 7 && (t = "#" + t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + (t.length > 4 ? t[4] + t[4] : "")), [parseInt(t.substr(1, 2), 16), parseInt(t.substr(3, 2), 16), parseInt(t.substr(5, 2), 16), t.length > 7 ? parseInt(t.substr(7, 2), 16) / 255 : 1];
            if (-1 === t.indexOf("rgb")) {
                var e = document.body.appendChild(document.createElement("fictum")),
                    i = "rgb(1, 2, 3)";
                if (e.style.color = i, e.style.color !== i) return;
                if (e.style.color = t, e.style.color === i || "" === e.style.color) return;
                t = getComputedStyle(e).color, document.body.removeChild(e)
            }
            return 0 === t.indexOf("rgb") ? (-1 === t.indexOf("rgba") && (t += ",1"), t.match(/[\.\d]+/g).map((function (t) {
                return +t
            }))) : void 0
        }
    }

    function Xn() {
        var t = {
            top: this._panesYids.top,
            center: this._rowView
        };
        for (var e in this._domNodes.canvas) {
            var i = this._domNodes.canvas[e];
            i._context.fillStyle = this.getThemeSetting("sheet"), i._context.fillRect(0, 0, i._drawWidth, i._drawHeight);
            for (var o = 0; o < i._drawHeight && !(o > t[i._panePositionY].length - 1); o++) Yn.call(this, i, o, t[i._panePositionY][o], i._panePositionX), o == t[i._panePositionY].length - 1 && Yn.call(this, i, o + 1, t[i._panePositionY][o], i._panePositionX)
        }
    }
    var Yn = function (t, e, i, o) {
        this.getRowCoordById(i);
        for (var s = {
                left: this._panesXids.left,
                center: this._colView
            }, n = 0, r = 0; r < s[o].length; r++) {
            this.getColCoordById(s[o][r]);
            var l = this.getColWidthById(s[o][r]),
                h = Math.ceil(l / 1);
            r == s[o].length - 1 && (h += 1);
            var a = this._cellStore[i - 1][s[o][r] - 1].color || this.getThemeSetting("sheet");
            if (this._searchCellsFound.length)
                if (this._cellStore[i - 1][s[o][r] - 1]._found === this._searchStr) {
                    var c = Vn(a),
                        d = Vn(this.getThemeSetting("cell+found"));
                    d[3] = this.getThemeSetting("cell+found|opacity");
                    var u = Dn(c, d);
                    a = "rgb(" + u[0] + "," + u[1] + "," + u[2] + ")"
                } t._context.fillStyle = a, t._context.fillRect(n, e, h, 1), n += h
        }
    };

    function Wn() {
        Kn.call(this), jn.call(this), Un.call(this)
    }
    var Kn = function () {
            this._domNodes["column-top"].innerHTML = Ge.call(this), this._domNodes["column-center"].innerHTML = Ze.call(this)
        },
        jn = function () {
            for (var t = z(), e = this._cd.rowHeaderSpace, i = 0; i < this._panesXids.left.length; i++) {
                var o = this._panesXids.left[i] - 1,
                    s = this._cols.store[o],
                    n = this._columnNodes[o];
                n["column-top"].textContent = ti.call(this, s.id), n["column-center"].textContent = ei.call(this, s.id), n.column.style.transform = "translateX(" + e + "px)", n.column.style.opacity = 1, t.appendChild(n.column), e += s.width
            }
            this._domNodes["pane-left"].insertBefore(t, this._domNodes["pane-left"].firstChild);
            for (i = 0; i < this._domNodes["pane-left"].children.length; i++) {
                var r = this._domNodes["pane-left"].children[i]._colId;
                this._domNodes["pane-left"].children[i] == this._domNodes.rowHeaderColumn || this._panesXids.left.indexOf(r) > -1 || (this._domNodes["pane-left"].children[i].style.opacity = 0)
            }
        },
        Un = function () {
            for (var t = z(), e = 0, i = 0; i < this._colView.length; i++) {
                var o = this._colView[i] - 1,
                    s = this._cols.store[o],
                    n = this._columnNodes[o];
                n["column-top"].textContent = ti.call(this, s.id), n["column-center"].textContent = ei.call(this, s.id), n.column.style.transform = "translateX(" + e + "px)", n.column.style.opacity = 1, t.appendChild(n.column), e += s.width
            }
            this._domNodes["pane-center"].insertBefore(t, this._domNodes["pane-center"].firstChild);
            for (i = 0; i < this._domNodes["pane-center"].children.length; i++) {
                var r = this._domNodes["pane-center"].children[i]._colId;
                this._colView.indexOf(r) > -1 || (this._domNodes["pane-center"].children[i].style.opacity = 0)
            }
        };

    function qn() {
        for (var t, e, i = 1 == this._selection.length, o = 0; o < this._selection.length; o++) t = Di.call(this, this._selection[o].range), e = o == this._activeRangeIndex, Gn.call(this, this._selection[o].range, o, t, i, e);
        for (; this._domNodes.cellRangeContainer.children.length > this._selection.length;) this._domNodes.cellRangeContainer.removeChild(this._domNodes.cellRangeContainer.lastChild), this._domNodes.cellRangeForegroundContainer.removeChild(this._domNodes.cellRangeForegroundContainer.lastChild)
    }
    var Gn = function (t, e, i, o, s) {
            e > this._domNodes.cellRangeContainer.children.length - 1 && (this._domNodes.cellRangeContainer.appendChild(te(this._templates.cellRange)), this._domNodes.cellRangeForegroundContainer.appendChild(te(this._templates.cellRangeForeground)));
            var n = Vi.call(this, t);
            Zn.call(this, e, n, i, o, s), $n.call(this, e, n, i, o, s)
        },
        Zn = function (t, e, i, o, s) {
            var n = this._domNodes.cellRangeContainer.children[t];
            n.style.opacity = null == e || i && o ? 0 : n._opacity;
            var r = "translate(" + (e.x.offset - 0) + "px," + (e.y.offset - 0) + "px)",
                l = "scale(" + e.x.size / 100 + "," + e.y.size / 100 + ")";
            n.style.transform = r + " " + l
        },
        $n = function (t, e, i, o, s) {
            var n = this._domNodes.cellRangeForegroundContainer.children[t],
                r = n._borderStyle || "solid";
            null == e || i && o || s && String(this._currentDragAction).startsWith("select") ? n.style.opacity = 0 : n.style.opacity = n._opacity;
            var l = "translate(" + (e.x.offset - 0) + "px," + (e.y.offset - 0) + "px)";
            n.style.transform = l, n.style.width = e.x.size + "px", n.style.height = e.y.size + "px", n.style["border-left-style"] = e.x.lineLeft ? r : "none", n.style["border-right-style"] = e.x.lineRight ? r : "none", n.style["border-top-style"] = e.y.lineTop ? r : "none", n.style["border-bottom-style"] = e.y.lineBottom ? r : "none"
        };

    function Qn(t) {
        return [t, t]
    }

    function Jn(t) {
        var e = !1,
            i = !1;
        return (t.y >= 0 && t.y < this._panesYids.top.length || t.y >= this._viewportPosition.y && t.y < this._viewportPosition.y + this._rowView.length) && (e = !0), (t.x >= 0 && t.x < this._panesXids.left.length || t.x >= this._viewportPosition.x && t.x < this._viewportPosition.x + this._colView.length) && (i = !0), !(!e || !i)
    }

    function tr() {
        var t = this._domNodes.cellCursor;
        if (this._selection.length && !this._domNodes.cellEditor._isOpen) {
            var e = Qn(this._cellCursorPosition),
                i = Vi.call(this, e),
                o = (t = this._domNodes.cellCursor)._borderStyle || "solid";
            if (null != e) {
                t.style.opacity = t._opacity || "", i.y.lineTop && 0 != i.x.size ? t.style["border-top-style"] = o : t.style["border-top-style"] = "none", i.y.lineBottom && 0 != i.x.size ? t.style["border-bottom-style"] = o : t.style["border-bottom-style"] = "none", i.x.lineLeft && 0 != i.y.size ? t.style["border-left-style"] = o : t.style["border-left-style"] = "none", i.x.lineRight && 0 != i.y.size ? t.style["border-right-style"] = o : t.style["border-right-style"] = "none";
                var s = "translate(" + i.x.offset + "px," + i.y.offset + "px)";
                t.style.transform = s, t.style.width = i.x.size + "px", t.style.height = i.y.size + "px", Jn.call(this, this._cellCursorPosition) ? this._domNodes.cellCursor.style.opacity = this._domNodes.cellCursor._opacity : this._domNodes.cellCursor.style.opacity = 0
            } else t.style.opacity = 0
        } else t.style.opacity = 0
    }

    function er() {
        var t = this._domNodes.searchCursor;
        if (this._searchCellsFound.length) {
            var e = this._searchCellsFound[this._searchCellIndex],
                i = Qn({
                    x: this.getColCoordById(e[1]),
                    y: this.getRowCoordById(e[0])
                }),
                o = Vi.call(this, i),
                s = t._borderStyle || "solid";
            if (null != i) {
                t.style.opacity = t._opacity || "", o.y.lineTop && 0 != o.x.size ? t.style["border-top-style"] = s : t.style["border-top-style"] = "none", o.y.lineBottom && 0 != o.x.size ? t.style["border-bottom-style"] = s : t.style["border-bottom-style"] = "none", o.x.lineLeft && 0 != o.y.size ? t.style["border-left-style"] = s : t.style["border-left-style"] = "none", o.x.lineRight && 0 != o.y.size ? t.style["border-right-style"] = s : t.style["border-right-style"] = "none";
                var n = "translate(" + (o.x.offset - 2) + "px," + (o.y.offset - 2) + "px)";
                t.style.transform = n, t.style.width = o.x.size + 4 + "px", t.style.height = o.y.size + 4 + "px", Jn.call(this, i[0]) ? this._domNodes.searchCursor.style.opacity = this._domNodes.searchCursor._opacity : this._domNodes.searchCursor.style.opacity = 0
            } else t.style.opacity = 0
        } else t.style.opacity = 0
    }

    function ir(t) {
        return [{
            x: t[0],
            y: 0
        }, {
            x: t[1],
            y: this._rows.coordList.length - 1
        }]
    }

    function or(t) {
        return [{
            x: 0,
            y: t[0]
        }, {
            x: this._cols.coordList.length - 1,
            y: t[1]
        }]
    }

    function sr() {
        for (var t = We(this._selection, {
                type: "col"
            }), e = We(this._selection, {
                type: "row"
            }), i = t.length, o = this._selection.length - t.length, s = e.length, n = this._selection.length - e.length, r = 0; r < t.length; r++) hr.call(this, t[r].range, r);
        var l = 0;
        for (r = 0; r < this._selection.length; r++) "col" != this._selection[r].type && (lr.call(this, this._selection[r].range, l), l++);
        for (r = 0; r < e.length; r++) rr.call(this, e[r].range, r);
        for (l = 0, r = 0; r < this._selection.length; r++) "row" != this._selection[r].type && (nr.call(this, this._selection[r].range, l), l++);
        for (; this._domNodes.colHeaderRangeHighlightContainer.children.length > o;) this._domNodes.colHeaderRangeHighlightContainer.removeChild(this._domNodes.colHeaderRangeHighlightContainer.lastChild);
        for (; this._domNodes.colHeaderRangeSelectedContainer.children.length > i;) this._domNodes.colHeaderRangeSelectedContainer.removeChild(this._domNodes.colHeaderRangeSelectedContainer.lastChild);
        for (; this._domNodes.rowHeaderRangeHighlightContainer.children.length > n;) this._domNodes.rowHeaderRangeHighlightContainer.removeChild(this._domNodes.rowHeaderRangeHighlightContainer.lastChild);
        for (; this._domNodes.rowHeaderRangeSelectedContainer.children.length > s;) this._domNodes.rowHeaderRangeSelectedContainer.removeChild(this._domNodes.rowHeaderRangeSelectedContainer.lastChild)
    }
    var nr = function (t, e) {
            var i = Vi.call(this, t);
            e > this._domNodes.rowHeaderRangeHighlightContainer.children.length - 1 && this._domNodes.rowHeaderRangeHighlightContainer.appendChild(te(this._templates.rowHeaderRangeHighlight));
            var o = this._domNodes.rowHeaderRangeHighlightContainer.children[e];
            o.style.opacity = null == i ? 0 : o._opacity;
            var s = "translate(0px," + (i.y.offset - 0) + "px)",
                n = "scale(" + this.rowHeaderWidth / 100 + "," + i.y.size / 100 + ")";
            o.style.transform = s + " " + n
        },
        rr = function (t, e) {
            var i = Vi.call(this, t);
            e > this._domNodes.rowHeaderRangeSelectedContainer.children.length - 1 && this._domNodes.rowHeaderRangeSelectedContainer.appendChild(te(this._templates.rowHeaderRangeSelected));
            var o = this._domNodes.rowHeaderRangeSelectedContainer.children[e];
            o.style.opacity = null == i ? 0 : o._opacity;
            var s = "translate(0px," + (i.y.offset - 0) + "px)",
                n = "scale(" + this.rowHeaderWidth / 100 + "," + i.y.size / 100 + ")";
            o.style.transform = s + " " + n
        },
        lr = function (t, e) {
            var i = Vi.call(this, t);
            e > this._domNodes.colHeaderRangeHighlightContainer.children.length - 1 && this._domNodes.colHeaderRangeHighlightContainer.appendChild(te(this._templates.colHeaderRangeHighlight));
            var o = this._domNodes.colHeaderRangeHighlightContainer.children[e];
            o.style.opacity = null == i ? 0 : o._opacity;
            var s = "translate(" + (i.x.offset - 0) + "px,0px)",
                n = "scale(" + i.x.size / 100 + "," + this.colHeaderHeight / 100 + ")";
            o.style.transform = s + " " + n
        },
        hr = function (t, e) {
            var i = Vi.call(this, t);
            e > this._domNodes.colHeaderRangeSelectedContainer.children.length - 1 && this._domNodes.colHeaderRangeSelectedContainer.appendChild(te(this._templates.colHeaderRangeSelected));
            var o = this._domNodes.colHeaderRangeSelectedContainer.children[e];
            o.style.opacity = null == i ? 0 : o._opacity;
            var s = "translate(" + (i.x.offset - 0) + "px,0px)",
                n = "scale(" + i.x.size / 100 + "," + this.colHeaderHeight / 100 + ")";
            o.style.transform = s + " " + n
        };

    function ar(t, e, i) {
        for (var o = 0; o < t.length; o++)
            if (t[o][e] == i) return o;
        return -1
    }

    function cr() {
        pr.call(this, "next", dr.call(this)), pr.call(this, "prev", ur.call(this))
    }
    var dr = function () {
            for (var t = [], e = 0; e < this._panesYids.top.length; e++) null !== this._rows.iconList[e][1] && t.push({
                groupIndex: this._rows.iconList[e][1],
                position: this.getRowPositionInViewport(e) + this.getRowHeightById(this._panesYids.top[e]) - 16 + 1
            });
            for (e = 0; e < this._rowView.length; e++) {
                var i = this._viewportPosition.y + e;
                null !== this._rows.iconList[i][1] && t.push({
                    groupIndex: this._rows.iconList[i][1],
                    position: this.getRowPositionInViewport(i) + this.getRowHeightById(this._rowView[e]) - 16 + 1
                })
            }
            return t
        },
        ur = function () {
            for (var t = [], e = 0; e < this._panesYids.top.length; e++) null !== this._rows.iconList[e][0] && t.push({
                groupIndex: this._rows.iconList[e][0],
                position: this.getRowPositionInViewport(e)
            });
            for (e = 0; e < this._rowView.length; e++) {
                var i = this._viewportPosition.y + e;
                null !== this._rows.iconList[i][0] && t.push({
                    groupIndex: this._rows.iconList[i][0],
                    position: this.getRowPositionInViewport(i)
                })
            }
            return t
        },
        pr = function (t, e) {
            void 0 === t && (t = "next"), void 0 === e && (e = []);
            for (var i = this._rows[t + "Nodes"], o = this._domNodes["hiddenRowGroupIcon" + No(t) + "Container"], s = this._templates["hiddenRowGroupIcon" + No(t)], n = z(), r = [], l = 0; l < i.length; l++) r.push(l);
            var h = [];
            for (l = 0; l < e.length; l++) {
                var a = ar(i, "position", e[l].position);
                a > -1 ? (r.splice(r.indexOf(a), 1), i[a].node.style.opacity = 1) : h.push(e[l].position)
            }
            for (l = 0; l < h.length; l++)
                if (r.length) {
                    var c;
                    i[c = r.shift()].node.style.transform = "translateY(" + h[l] + "px)", i[c].node.style.opacity = 1, i[c].position = h[l]
                } else {
                    var d = s.cloneNode(!0);
                    d.style.transform = "translateY(" + h[l] + "px)", i.push({
                        node: d,
                        position: h[l]
                    }), n.appendChild(d)
                } o.appendChild(n);
            for (l = 0; l < r.length; l++) i[r[l]].node.style.opacity = 0
        };

    function fr() {
        yr.call(this, "next", _r.call(this)), yr.call(this, "prev", gr.call(this))
    }
    var gr = function () {
            for (var t = [], e = 0; e < this._panesXids.left.length; e++) null !== this._cols.iconList[e][0] && t.push({
                groupIndex: this._cols.iconList[e][0],
                position: this.getColPositionInViewport(e)
            });
            for (e = 0; e < this._colView.length; e++) {
                var i = this._viewportPosition.x + e;
                null !== this._cols.iconList[i][0] && t.push({
                    groupIndex: this._cols.iconList[i][0],
                    position: this.getColPositionInViewport(i)
                })
            }
            return t
        },
        _r = function () {
            for (var t = [], e = 0; e < this._panesXids.left.length; e++) null !== this._cols.iconList[e][1] && t.push({
                groupIndex: this._cols.iconList[e][1],
                position: this.getColPositionInViewport(e) + this.getColWidthById(this._panesXids.left[e]) - 14 + 1
            });
            for (e = 0; e < this._colView.length; e++) {
                var i = this._viewportPosition.x + e;
                null !== this._cols.iconList[i][1] && t.push({
                    groupIndex: this._cols.iconList[i][1],
                    position: this.getColPositionInViewport(i) + this.getColWidthById(this._colView[e]) - 14 + 1
                })
            }
            return t
        },
        yr = function (t, e) {
            void 0 === t && (t = "next"), void 0 === e && (e = []);
            for (var i = this._cols[t + "Nodes"], o = this._domNodes["hiddenColGroupIcon" + No(t) + "Container"], s = this._templates["hiddenColGroupIcon" + No(t)], n = z(), r = [], l = 0; l < i.length; l++) r.push(l);
            var h = [];
            for (l = 0; l < e.length; l++) {
                var a = ar(i, "position", e[l].position);
                a > -1 ? (r.splice(r.indexOf(a), 1), i[a].node.style.opacity = 1) : h.push(e[l].position)
            }
            for (l = 0; l < h.length; l++)
                if (r.length) {
                    var c;
                    i[c = r.shift()].node.style.transform = "translateX(" + h[l] + "px)", i[c].node.style.opacity = 1, i[c].position = h[l]
                } else {
                    var d = s.cloneNode(!0);
                    d.style.transform = "translateX(" + h[l] + "px)", i.push({
                        node: d,
                        position: h[l]
                    }), n.appendChild(d)
                } o.appendChild(n);
            for (l = 0; l < r.length; l++) i[r[l]].node.style.opacity = 0
        };

    function vr() {
        var t = this._domNodes.fillHandle;
        if (this._selection.length && !this._domNodes.cellEditor._isOpen) {
            var e = this._selection[this._selection.length - 1].range[1],
                i = this.getColPositionInViewport(e.x),
                o = this.getRowPositionInViewport(e.y),
                s = i + this.getColWidthById(this.getColIdByCoord(e.x)) - 7,
                n = o + this.getRowHeightById(this.getRowIdByCoord(e.y)) - 7;
            t.style.transform = "translate(" + s + "px, " + n + "px)", !Jn.call(this, e) || String(this._currentDragAction).startsWith("select") ? t.style.opacity = 0 : t.style.opacity = this._domNodes.fillHandle._opacity
        } else t.style.opacity = 0
    }

    function mr() {
        Wi.call(this, this._domNodes.fillRange, this._fillRange)
    }

    function xr() {
        if (this._lastColView.startIndex > this._viewportPosition.x) this._domNodes.blankSheetRight.style.opacity = 0;
        else {
            var t = this._viewportPosition.x + (this._colView.length - 1),
                e = this.getColPositionInViewport(t);
            e += this.getColWidthById(this._cols.coordList[t]), e += 1;
            var i = (this._cd.viewportWidth - e) / 100;
            this._domNodes.blankSheetRight.style.transform = "scaleX(" + i + ")", this._domNodes.blankSheetRight.style.opacity = this._domNodes.blankSheetRight._opacity
        }
        if (this._lastRowView.startIndex > this._viewportPosition.y) this._domNodes.blankSheetBottom.style.opacity = 0;
        else {
            var o = this._viewportPosition.y + (this._rowView.length - 1),
                s = this.getRowPositionInViewport(o);
            s += this._actualRowHeight, s += 1;
            var n = (this._cd.viewportHeight - s) / 100;
            this._domNodes.blankSheetBottom.style.transform = "scaleY(" + n + ")", this._domNodes.blankSheetBottom.style.opacity = n > 0 ? 1 : 0
        }
    }

    function wr() {
        Cr.call(this), br.call(this)
    }
    var Cr = function () {
            if (null != this._prevSelection)
                for (var t, e = 0; e < this._prevSelection.selection.length; e++)
                    for (var i = 0; i < this._prevSelection.selection[e].colIds.length; i++) t = this._prevSelection.selection[e].colIds[i], this._columnNodes[t - 1].columnHeaderLabel.style.color = this.getThemeSetting("header|text")
        },
        br = function () {
            for (var t, e = We(this._selection, {
                    type: "col"
                }), i = 0; i < e.length; i++)
                for (var o = e[i].range[0].x; o <= e[i].range[1].x; o++) t = this.getColIdByCoord(o), this._columnNodes[t - 1].columnHeaderLabel.style.color = this.getThemeSetting("header:selected|text")
        };

    function Sr() {
        for (var t = [], e = 0; e < this._colLines.length; e++) t.push(e);
        var i = this._cd.rowHeaderSpace,
            o = [];
        for (e = 0; e < this._panesXids.left.length; e++) i += this.getColWidthById(this._panesXids.left[e]), (s = ar(this._colLines, "position", i)) > -1 ? (t.splice(t.indexOf(s), 1), this._colLines[s].node.style.opacity = 1) : o.push(i);
        i = this._cd.panesX.center.offset;
        for (e = 0; e < this._colView.length && !((i += this.getColWidthById(this._colView[e])) > this._cd.viewportWidth); e++) {
            var s;
            (s = ar(this._colLines, "position", i)) > -1 ? (t.splice(t.indexOf(s), 1), this._colLines[s].node.style.opacity = 1) : o.push(i)
        }
        var n = z();
        for (e = 0; e < o.length; e++)
            if (t.length) {
                var r = t.shift();
                this._colLines[r].node.style.transform = "translateX(" + o[e] + "px)", this._colLines[r].node.style.opacity = 1, this._colLines[r].offset = o[e]
            } else {
                var l = te(this._templates.colLine);
                l.style.transform = "translateX(" + o[e] + "px)", n.appendChild(l), this._colLines.push({
                    node: l,
                    offset: o[e]
                })
            } this._domNodes.colLines.appendChild(n);
        for (e = 0; e < t.length; e++) this._colLines[t[e]].node.style.opacity = 0
    }

    function Ir() {
        for (var t = [], e = 0; e < this._rowLines.length; e++) t.push(e);
        var i = this._cd.colHeaderSpace,
            o = [];
        for (e = 0; e < this._panesYids.top.length; e++) i += this.getRowHeightById(this._panesYids.top[e]), (s = ar(this._rowLines, "position", i)) > -1 ? (t.splice(t.indexOf(s), 1), this._rowLines[s].node.style.opacity = 1) : o.push(i);
        i = this._cd.panesY.center.offset;
        for (e = 0; e < this._rowView.length && !((i += this.getRowHeightById(this._rowView[e])) > this._cd.viewportHeight); e++) {
            var s;
            (s = ar(this._rowLines, "position", i)) > -1 ? (t.splice(t.indexOf(s), 1), this._rowLines[s].node.style.opacity = 1) : o.push(i)
        }
        var n = z();
        for (e = 0; e < o.length; e++)
            if (t.length) {
                var r = t.shift();
                this._rowLines[r].node.style.transform = "translateY(" + o[e] + "px)", this._rowLines[r].node.style.opacity = 1, this._rowLines[r].offset = o[e]
            } else {
                var l = te(this._templates.rowLine);
                l.style.transform = "translateY(" + o[e] + "px)", n.appendChild(l), this._rowLines.push({
                    node: l,
                    offset: o[e]
                })
            } this._domNodes.rowLines.appendChild(n);
        for (e = 0; e < t.length; e++) this._rowLines[t[e]].node.style.opacity = 0
    }

    function Rr() {
        if (this._freezeLineRowAfterId && !this._sectionsPerPaneY.top.length) {
            var t = this.getRowPositionInViewport(this.getRowCoordById(this._freezeLineRowAfterId) + 1);
            this._domNodes.freezeLinePlaceholder_row.style.transform = "translateY(" + t + "px)", this._domNodes.freezeLinePlaceholder_row.style.opacity = t ? 1 : 0
        } else this._domNodes.freezeLinePlaceholder_row.style.opacity = 0;
        if (this._freezeLineColAfterId && !this._sectionsPerPaneX.left.length) {
            var e = this.getColPositionInViewport(this.getColCoordById(this._freezeLineColAfterId) + 1);
            P(this._domNodes.freezeLinePlaceholder_col, {
                transform: "translateX(" + e + "px)",
                opacity: e ? 1 : 0
            })
        } else this._domNodes.freezeLinePlaceholder_col.style.opacity = 0
    }

    function Lr() {
        Xn.call(this), Wn.call(this), qn.call(this), tr.call(this), er.call(this), sr.call(this), cr.call(this), fr.call(this), vr.call(this), mr.call(this), xr.call(this), Wi.call(this, this._domNodes.copyRange, this._copyRange), Wi.call(this, this._domNodes.cutRange, this._cutRange), Wi.call(this, this._domNodes.fillRange, this._fillRange), Sr.call(this), Rr.call(this), wr.call(this), Ir.call(this), this.constructor.contextMenu.redrawLabels()
    }

    function Pr() {
        var t = this;
        Nr.call(this), $e.call(this), ni.call(this), kr.call(this), T.call(this, Ye.call(this)), Mn.call(this), this._domNodes.container.appendChild(this._domNodes.component), An.call(this), Tn.call(this), Fn.call(this), requestAnimationFrame((function () {
            Lr.call(t)
        })), wi.call(this), to.call(this, "traverseSingleCell"), this.instantActivate ? this.activate() : this.deactivate(), setTimeout((function () {
            t._isReady = !0, t.events.dispatch("ready", {})
        }), 0)
    }
    var Nr = function () {
            this._domNodes.container._resizeSensor = new Kt(this._domNodes.container, this), this._domNodes.lineHeightMeter._resizeSensor = new Kt(this._domNodes.lineHeightMeter, this)
        },
        kr = function () {
            this._templates = {}, this._templates.colHeaderRangeHighlight = T.call(this, ri.call(this)), this._templates.colHeaderRangeSelected = T.call(this, li.call(this)), this._templates.rowHeaderRangeHighlight = T.call(this, hi.call(this)), this._templates.rowHeaderRangeSelected = T.call(this, ai.call(this)), this._templates.cellRange = T.call(this, fi.call(this)), this._templates.cellRangeForeground = T.call(this, gi.call(this)), this._templates.hiddenRowGroupIconPrev = T.call(this, ci.call(this)), this._templates.hiddenRowGroupIconNext = T.call(this, di.call(this)), this._templates.hiddenColGroupIconPrev = T.call(this, ui.call(this)), this._templates.hiddenColGroupIconNext = T.call(this, pi.call(this)), this._templates.colLine = T.call(this, _i.call(this)), this._templates.rowLine = T.call(this, yi.call(this))
        };

    function Hr(t, e) {
        var i = this;
        void 0 === t && (t = null), void 0 === e && (e = {}), this._container = t, this._componentIndex = this.constructor.instances.length, b.call(this, e), "loading" == document.readyState ? document.addEventListener("DOMContentLoaded", (function () {
            J.call(i)
        })) : J.call(this), "complete" == document.readyState ? (Xt.call(this), Pr.call(this)) : window.addEventListener("load", (function () {
            Xt.call(i), Pr.call(i)
        })), this.constructor.instances.push(this)
    }
    var zr = function (t, e) {
        void 0 === e && (e = document), this._actionKeys = {
            backspace: 8,
            tab: 9,
            enter: 13,
            break: 19,
            pause: 19,
            esc: 27,
            escape: 27,
            space: 32,
            pageup: 33,
            pagedown: 34,
            end: 35,
            home: 36,
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            ins: 45,
            insert: 45,
            del: 46,
            delete: 46,
            plus: 61
        }, this._characterKeys = Ar(), this._lookupCharacterKeys = Or(this._characterKeys), this._modifierKeys = {
            shift: "shiftKey",
            ctrl: t.constructor._isMacOS ? "metaKey" : "ctrlKey",
            alt: "altKey"
        }, this._nonInputKeyCodes = [8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 44, 45, 46, 91, 92, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145, 182, 183], this._modifierKeyCodes = [16, 17, 18, 91, 93], this._metaKeyCodes = [91, 93], this._context = t, this.trackedActionKeys = [], this.trackedCharacterKeys = [], this.trackedModifierKeys = [], this.pressedActionKeys = {}, this.pressedCharacterKeys = {}, this.pressedModifierKeys = {}, this.identifyKeyActionTimeout = null, this.keysToPrevent = {}, this.prevKeyAction = null, this.keyActions = [], this.keys = {}, this.keyHoldDelay = 350, this.keyHoldInterval = 60, this._isSuspended = !1, this._keyDownListener = Tr.bind(this), this._keyUpListener = Fr.bind(this), this._identifyKeyAction = Mr.bind(this), this._scope = e, this._scope.addEventListener("keydown", this._keyDownListener), this._scope.addEventListener("keyup", this._keyUpListener)
    };
    zr.prototype.on = function (t, e, i, o) {
        void 0 === i && (i = !0), void 0 === o && (o = null);
        for (var s = !1, n = "", r = [], l = [], h = [], a = (t = t.split("+"), []), c = 0; c < t.length; c++) {
            var d = t[c].trim();
            d in this._modifierKeys ? r.push(d) : d in this._actionKeys ? l.push(d) : d in this._characterKeys && h.push(d), a.push(d)
        }
        if (Br({
                modifierKeys: r,
                actionKeys: l,
                characterKeys: h
            }) && (s = !0, n = a.join("+")), s) {
            if (void 0 === this.keys[n]) {
                this.keys[n] = {
                    actions: []
                }, this.keyActions.push({
                    actionKeys: l,
                    characterKeys: h,
                    modifierKeys: r,
                    keyString: n
                });
                for (c = 0; c < l.length; c++) this._actionKeys[l[c]] in this.keysToPrevent || (this.keysToPrevent[this._actionKeys[l[c]]] = []), this.keysToPrevent[this._actionKeys[l[c]]].push(n);
                for (c = 0; c < h.length; c++) this._characterKeys[h[c]] in this.keysToPrevent || (this.keysToPrevent[this._characterKeys[h[c]]] = []), this.keysToPrevent[this._characterKeys[h[c]]].push(n)
            }
            for (c = 0; c < this.keys[n].actions.length; c++)
                if (this.keys[n].actions[c].callback == e && this.keys[n].actions[c].repeatable == i && this.keys[n].actions[c].target == o) return;
            this.keys[n].actions.push({
                callback: e,
                repeatable: i,
                target: o
            });
            var u = null;
            for (c = 0; c < a.length; c++) a[c] in this._modifierKeys ? -1 == this.trackedModifierKeys.indexOf(this._modifierKeys[a[c]]) && this.trackedModifierKeys.push(this._modifierKeys[a[c]]) : a[c] in this._actionKeys ? (u = this._actionKeys[a[c]], -1 == this.trackedActionKeys.indexOf(u) && this.trackedActionKeys.push(u)) : a[c] in this._characterKeys && (u = this._characterKeys[a[c]], -1 == this.trackedCharacterKeys.indexOf(u) && this.trackedCharacterKeys.push(u))
        }
    }, zr.prototype.off = function (t, e, i, o) {
        for (var s = [], n = [], r = [], l = (t = t.split("+"), []), h = 0; h < t.length; h++) {
            var a = t[h].trim();
            a in this._modifierKeys ? r.push(a) : a in this._actionKeys ? s.push(a) : a in this._characterKeys && n.push(a), l.push(a)
        }
        if (Br({
                modifierKeys: r,
                actionKeys: s,
                characterKeys: n
            })) {
            var c = l.join("+");
            if (void 0 !== this.keys[c]) {
                var d = [];
                for (h = 0; h < this.keys[c].actions.length; h++) this.keys[c].actions[h].callback == e && this.keys[c].actions[h].repeatable == i && this.keys[c].actions[h].target == o || d.push(this.keys[c].actions[h]);
                if (this.keys[c].actions = d, !this.keys[c].actions.length) {
                    delete this.keys[c];
                    for (h = 0; h < this.keyActions.length; h++)
                        if (this.keyActions[h].keyString == c) {
                            for (var u = 0; u < this.keyActions[h].actionKeys.length; u++) {
                                if (this._actionKeys[this.keyActions[h].actionKeys[u]] in this.keysToPrevent)(p = this.keysToPrevent[this._actionKeys[this.keyActions[h].actionKeys[u]]].indexOf(c)) > -1 && this.keysToPrevent[this._actionKeys[this.keyActions[h].actionKeys[u]]].splice(p, 1), this.keysToPrevent[this._actionKeys[this.keyActions[h].actionKeys[u]]].length || delete this.keysToPrevent[this._actionKeys[this.keyActions[h].actionKeys[u]]]
                            }
                            for (u = 0; u < this.keyActions[h].characterKeys.length; u++) {
                                var p;
                                if (this._characterKeys[this.keyActions[h].characterKeys[u]] in this.keysToPrevent)(p = this.keysToPrevent[this._characterKeys[this.keyActions[h].characterKeys[u]]].indexOf(c)) > -1 && this.keysToPrevent[this._characterKeys[this.keyActions[h].characterKeys[u]]].splice(p, 1), this.keysToPrevent[this._characterKeys[this.keyActions[h].characterKeys[u]]].length || delete this.keysToPrevent[this._characterKeys[this.keyActions[h].characterKeys[u]]]
                            }
                            this.keyActions.splice(h, 1);
                            break
                        }
                }
            }
        }
    }, zr.prototype.suspend = function () {
        this._scope.removeEventListener("keydown", this._keyDownListener), this._scope.removeEventListener("keyup", this._keyUpListener)
    }, zr.prototype.resume = function () {
        this._scope.addEventListener("keydown", this._keyDownListener), this._scope.addEventListener("keyup", this._keyUpListener)
    };
    var Ar = function () {
            for (var t = {}, e = [{
                    startIndex: 65,
                    series: "abcdefghijklmnopqrstuvwxyz"
                }, {
                    startIndex: 48,
                    series: "0123456789"
                }], i = 0; i < e.length; i++)
                for (var o = 0; o < e[i].series.length; o++) t[e[i].series[o]] = e[i].startIndex + o;
            return t["\\"] = 220, t
        },
        Tr = function (t) {
            var e = t.which || t.keyCode;
            if (!(this._modifierKeyCodes.indexOf(e) > -1 && null === this.identifyKeyActionTimeout)) {
                this._scope != document || Dr.call(this) || !(e in this.keysToPrevent) || e in this._lookupCharacterKeys || t.preventDefault();
                for (var i = 0; i < this.trackedModifierKeys.length; i++) {
                    var o = this.trackedModifierKeys[i];
                    o in t && 1 == t[o] ? this.pressedModifierKeys[o] = !0 : o in this.pressedModifierKeys && delete this.pressedModifierKeys[o]
                }
                this.trackedActionKeys.indexOf(e) > -1 && !this.pressedActionKeys[e] && (this.pressedActionKeys[e] = !0), this.trackedCharacterKeys.indexOf(e) > -1 && !this.pressedCharacterKeys[e] && (this.pressedCharacterKeys[e] = !0), null === this.identifyKeyActionTimeout && Mr.call(this, t)
            }
        },
        Fr = function (t) {
            var e = t.which || t.keyCode;
            this.pressedActionKeys[e] && delete this.pressedActionKeys[e], this.pressedCharacterKeys[e] && delete this.pressedCharacterKeys[e], this._metaKeyCodes.indexOf(e) > -1 && (this.pressedCharacterKeys = {}, this.pressedActionKeys = {}), 0 == Object.keys(this.pressedActionKeys).length && 0 == Object.keys(this.pressedCharacterKeys).length && Er.call(this)
        },
        Er = function () {
            clearTimeout(this.identifyKeyActionTimeout), this.identifyKeyActionTimeout = null, this.pressedActionKeys = {}, this.pressedCharacterKeys = {}, this.pressedModifierKeys = {}, this.prevKeyAction = null
        },
        Mr = function (t) {
            var e = this;
            if (void 0 === t && (t = null), document.hasFocus()) {
                for (var i = [], o = 0; o < this.keyActions.length; o++) {
                    for (var s = 0, n = 0; n < this.keyActions[o].modifierKeys.length; n++) this.pressedModifierKeys[this._modifierKeys[this.keyActions[o].modifierKeys[n]]] && s++;
                    for (n = 0; n < this.keyActions[o].actionKeys.length; n++) this.pressedActionKeys[this._actionKeys[this.keyActions[o].actionKeys[n]]] && s++;
                    for (n = 0; n < this.keyActions[o].characterKeys.length; n++) this.pressedCharacterKeys[this._characterKeys[this.keyActions[o].characterKeys[n]]] && s++;
                    s > 0 && s == this.keyActions[o].actionKeys.length + this.keyActions[o].characterKeys.length + this.keyActions[o].modifierKeys.length && i.push(this.keyActions[o])
                }
                if (i.length > 1 && i.sort((function (t, e) {
                        return e.actionKeys.length + e.modifierKeys.length - (t.actionKeys.length + t.modifierKeys.length)
                    })), i.length ? (i[0] == this.prevKeyAction ? this.keyActionRepeatCounter++ : this.keyActionRepeatCounter = 0, this.keys[i[0].keyString].actions.forEach((function (i) {
                        null != i.target || Dr.call(e) ? i.target == t.target && document.activeElement == i.target && (0 == i.repeatable && (e.keyActionRepeatCounter = 0), 1 != i.repeatable && 0 != e.keyActionRepeatCounter || (i.callback.call(e._context, t), t.preventDefault())) : (0 == i.repeatable && (e.keyActionRepeatCounter = 0), 1 != i.repeatable && 0 != e.keyActionRepeatCounter || i.callback.call(e._context, t))
                    })), this._context.constructor._isMacOS && i[0].modifierKeys.indexOf("ctrl") > -1 && (this.pressedCharacterKeys = {}, this.pressedActionKeys = {}), this.prevKeyAction = i[0]) : (this.keyActionRepeatCounter = 0, this.prevKeyAction = null), 0 == this.keyActionRepeatCounter) var r = this.keyHoldDelay;
                else r = this.keyHoldInterval;
                this.identifyKeyActionTimeout = setTimeout((function () {
                    e._identifyKeyAction.call(e, t)
                }), r)
            }
        },
        Br = function (t) {
            var e = !0;
            return (t.modifierKeys.length && !t.actionKeys.length && !t.characterKeys.length || !t.modifierKeys.length && !t.actionKeys.length && t.characterKeys.length || t.actionKeys.length && t.characterKeys.length) && (e = !1), e
        },
        Or = function (t) {
            var e = {};
            for (var i in t) e[String(t[i])] = i;
            return e
        },
        Dr = function () {
            for (var t = ["input", "button", "img", "a"], e = !1, i = 0; i < t.length; i++)
                if (document.activeElement.tagName.toLowerCase() == t[i]) {
                    e = !0;
                    break
                } return e
        };
    zr._lastAction = null;
    var Vr = function (t) {
        this.commands = [], this.index = -1, this.limit = 0, this.isExecuting = !1, this.callback, this._context = t
    };
    Vr.prototype.add = function (t) {
        return this.isExecuting || (this.commands.splice(this.index + 1, this.commands.length - this.index), this.commands.push(t), this.limit && this.commands.length > this.limit && Yr(this.commands, 0, -(this.limit + 1)), this.index = this.commands.length - 1, this.callback && this.callback()), this
    }, Vr.prototype.setCallback = function (t) {
        this.callback = t
    }, Vr.prototype.undo = function () {
        var t = this.commands[this.index];
        return t && this._context.events.dispatch("beforeundo", {
            command: t
        }) ? (Xr.call(this, t, "undo"), this.index -= 1, this._context.events.dispatch("undo", {
            command: t
        }), this.callback && this.callback(), this) : this
    }, Vr.prototype.redo = function () {
        var t = this.commands[this.index + 1];
        return t && this._context.events.dispatch("beforeredo", {
            command: t
        }) ? (Xr.call(this, t, "redo"), this.index += 1, this._context.events.dispatch("redo", {
            command: t
        }), this.callback && this.callback(), this) : this
    }, Vr.prototype.clear = function () {
        var t = this.commands.length;
        this.commands = [], this.index = -1, this.callback && t > 0 && this.callback()
    }, Vr.prototype.hasUndo = function () {
        return -1 !== this.index
    }, Vr.prototype.hasRedo = function () {
        return this.index < this.commands.length - 1
    }, Vr.prototype.getCommands = function () {
        return this.commands
    }, Vr.prototype.getIndex = function () {
        return this.index
    }, Vr.prototype.setLimit = function (t) {
        this.limit = t
    };
    var Xr = function (t, e) {
            return t && "function" == typeof t[e] ? (this.isExecuting = !0, t[e].call(this._context), this.isExecuting = !1, this) : this
        },
        Yr = function (t, e, i) {
            return t.splice(e, !i || 1 + i - e + (!(i < 0 ^ e >= 0) && (i < 0 || -1) * t.length)), t.length
        },
        Wr = function () {
            var t = window;
            var e = !t.document && !!t.postMessage,
                i = e && /blob:/i.test((t.location || {}).protocol),
                o = {},
                s = 0,
                n = {
                    parse: function (e, i) {
                        var r = (i = i || {}).dynamicTyping || !1;
                        w(r) && (i.dynamicTypingFunction = r, r = {});
                        if (i.dynamicTyping = r, i.transform = !!w(i.transform) && i.transform, i.worker && n.WORKERS_SUPPORTED) {
                            var l = function () {
                                if (!n.WORKERS_SUPPORTED) return !1;
                                var e = function () {
                                        var e = t.URL || t.webkitURL || null,
                                            i = moduleFactory.toString();
                                        return n.BLOB_URL || (n.BLOB_URL = e.createObjectURL(new Blob(["(", i, ")();"], {
                                            type: "text/javascript"
                                        })))
                                    }(),
                                    i = new t.Worker(e);
                                return i.onmessage = _, i.id = s++, o[i.id] = i, i
                            }();
                            return l.userStep = i.step, l.userChunk = i.chunk, l.userComplete = i.complete, l.userError = i.error, i.step = w(i.step), i.chunk = w(i.chunk), i.complete = w(i.complete), i.error = w(i.error), delete i.worker, void l.postMessage({
                                input: e,
                                config: i,
                                workerId: l.id
                            })
                        }
                        var p = null;
                        if (e === n.NODE_STREAM_INPUT && "undefined" == typeof PAPA_BROWSER_CONTEXT) return (p = new u(i)).getStream();
                        "string" == typeof e ? p = i.download ? new h(i) : new c(i) : !0 === e.readable && w(e.read) && w(e.on) ? p = new d(i) : (t.File && e instanceof File || e instanceof Object) && (p = new a(i));
                        return p.stream(e)
                    },
                    unparse: function (t, e) {
                        var i = !1,
                            o = !0,
                            s = ",",
                            r = "\r\n",
                            l = '"',
                            h = l + l,
                            a = !1,
                            c = null,
                            d = !1;
                        ! function () {
                            if ("object" != typeof e) return;
                            "string" != typeof e.delimiter || n.BAD_DELIMITERS.filter((function (t) {
                                return -1 !== e.delimiter.indexOf(t)
                            })).length || (s = e.delimiter);
                            ("boolean" == typeof e.quotes || "function" == typeof e.quotes || Array.isArray(e.quotes)) && (i = e.quotes);
                            "boolean" != typeof e.skipEmptyLines && "string" != typeof e.skipEmptyLines || (a = e.skipEmptyLines);
                            "string" == typeof e.newline && (r = e.newline);
                            "string" == typeof e.quoteChar && (l = e.quoteChar);
                            "boolean" == typeof e.header && (o = e.header);
                            if (Array.isArray(e.columns)) {
                                if (0 === e.columns.length) throw new Error("Option columns is empty");
                                c = e.columns
                            }
                            void 0 !== e.escapeChar && (h = e.escapeChar + l);
                            ("boolean" == typeof e.escapeFormulae || e.escapeFormulae instanceof RegExp) && (d = e.escapeFormulae instanceof RegExp ? e.escapeFormulae : /^[=+\-@\t\r].*$/)
                        }();
                        var u = new RegExp(f(l), "g");
                        "string" == typeof t && (t = JSON.parse(t));
                        if (Array.isArray(t)) {
                            if (!t.length || Array.isArray(t[0])) return p(null, t, a);
                            if ("object" == typeof t[0]) return p(c || Object.keys(t[0]), t, a)
                        } else if ("object" == typeof t) return "string" == typeof t.data && (t.data = JSON.parse(t.data)), Array.isArray(t.data) && (t.fields || (t.fields = t.meta && t.meta.fields), t.fields || (t.fields = Array.isArray(t.data[0]) ? t.fields : "object" == typeof t.data[0] ? Object.keys(t.data[0]) : []), Array.isArray(t.data[0]) || "object" == typeof t.data[0] || (t.data = [t.data])), p(t.fields || [], t.data || [], a);
                        throw new Error("Unable to serialize unrecognized input");

                        function p(t, e, i) {
                            var n = "";
                            "string" == typeof t && (t = JSON.parse(t)), "string" == typeof e && (e = JSON.parse(e));
                            var l = Array.isArray(t) && t.length > 0,
                                h = !Array.isArray(e[0]);
                            if (l && o) {
                                for (var a = 0; a < t.length; a++) a > 0 && (n += s), n += g(t[a], a);
                                e.length > 0 && (n += r)
                            }
                            for (var c = 0; c < e.length; c++) {
                                var d = l ? t.length : e[c].length,
                                    u = !1,
                                    p = l ? 0 === Object.keys(e[c]).length : 0 === e[c].length;
                                if (i && !l && (u = "greedy" === i ? "" === e[c].join("").trim() : 1 === e[c].length && 0 === e[c][0].length), "greedy" === i && l) {
                                    for (var f = [], _ = 0; _ < d; _++) {
                                        var y = h ? t[_] : _;
                                        f.push(e[c][y])
                                    }
                                    u = "" === f.join("").trim()
                                }
                                if (!u) {
                                    for (var v = 0; v < d; v++) {
                                        v > 0 && !p && (n += s);
                                        var m = l && h ? t[v] : v;
                                        n += g(e[c][m], v)
                                    }
                                    c < e.length - 1 && (!i || d > 0 && !p) && (n += r)
                                }
                            }
                            return n
                        }

                        function g(t, e) {
                            if (null == t) return "";
                            if (t.constructor === Date) return JSON.stringify(t).slice(1, 25);
                            var o = !1;
                            d && "string" == typeof t && d.test(t) && (t = "'" + t, o = !0);
                            var r = t.toString().replace(u, h);
                            return (o = o || !0 === i || "function" == typeof i && i(t, e) || Array.isArray(i) && i[e] || function (t, e) {
                                for (var i = 0; i < e.length; i++)
                                    if (t.indexOf(e[i]) > -1) return !0;
                                return !1
                            }(r, n.BAD_DELIMITERS) || r.indexOf(s) > -1 || " " === r.charAt(0) || " " === r.charAt(r.length - 1)) ? l + r + l : r
                        }
                    }
                };
            if (n.RECORD_SEP = String.fromCharCode(30), n.UNIT_SEP = String.fromCharCode(31), n.BYTE_ORDER_MARK = "\ufeff", n.BAD_DELIMITERS = ["\r", "\n", '"', n.BYTE_ORDER_MARK], n.WORKERS_SUPPORTED = !e && !!t.Worker, n.NODE_STREAM_INPUT = 1, n.LocalChunkSize = 10485760, n.RemoteChunkSize = 5242880, n.DefaultDelimiter = ",", n.Parser = g, n.ParserHandle = p, n.NetworkStreamer = h, n.FileStreamer = a, n.StringStreamer = c, n.ReadableStreamStreamer = d, "undefined" == typeof PAPA_BROWSER_CONTEXT && (n.DuplexStreamStreamer = u), t.jQuery) {
                var r = t.jQuery;
                r.fn.parse = function (e) {
                    var i = e.config || {},
                        o = [];
                    return this.each((function (e) {
                        if (!("INPUT" === r(this).prop("tagName").toUpperCase() && "file" === r(this).attr("type").toLowerCase() && t.FileReader) || !this.files || 0 === this.files.length) return !0;
                        for (var s = 0; s < this.files.length; s++) o.push({
                            file: this.files[s],
                            inputElem: this,
                            instanceConfig: r.extend({}, i)
                        })
                    })), s(), this;

                    function s() {
                        if (0 !== o.length) {
                            var t, i, s, h, a = o[0];
                            if (w(e.before)) {
                                var c = e.before(a.file, a.inputElem);
                                if ("object" == typeof c) {
                                    if ("abort" === c.action) return t = "AbortError", i = a.file, s = a.inputElem, h = c.reason, void(w(e.error) && e.error({
                                        name: t
                                    }, i, s, h));
                                    if ("skip" === c.action) return void l();
                                    "object" == typeof c.config && (a.instanceConfig = r.extend(a.instanceConfig, c.config))
                                } else if ("skip" === c) return void l()
                            }
                            var d = a.instanceConfig.complete;
                            a.instanceConfig.complete = function (t) {
                                w(d) && d(t, a.file, a.inputElem), l()
                            }, n.parse(a.file, a.instanceConfig)
                        } else w(e.complete) && e.complete()
                    }

                    function l() {
                        o.splice(0, 1), s()
                    }
                }
            }

            function l(e) {
                this._handle = null, this._finished = !1, this._completed = !1, this._halted = !1, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = !0, this._completeResults = {
                        data: [],
                        errors: [],
                        meta: {}
                    },
                    function (t) {
                        var e = m(t);
                        e.chunkSize = parseInt(e.chunkSize), t.step || t.chunk || (e.chunkSize = null);
                        this._handle = new p(e), this._handle.streamer = this, this._config = e
                    }.call(this, e), this.parseChunk = function (e, o) {
                        if (this.isFirstChunk && w(this._config.beforeFirstChunk)) {
                            var s = this._config.beforeFirstChunk(e);
                            void 0 !== s && (e = s)
                        }
                        this.isFirstChunk = !1, this._halted = !1;
                        var r = this._partialLine + e;
                        this._partialLine = "";
                        var l = this._handle.parse(r, this._baseIndex, !this._finished);
                        if (!this._handle.paused() && !this._handle.aborted()) {
                            var h = l.meta.cursor;
                            this._finished || (this._partialLine = r.substring(h - this._baseIndex), this._baseIndex = h), l && l.data && (this._rowCount += l.data.length);
                            var a = this._finished || this._config.preview && this._rowCount >= this._config.preview;
                            if (i) t.postMessage({
                                results: l,
                                workerId: n.WORKER_ID,
                                finished: a
                            });
                            else if (w(this._config.chunk) && !o) {
                                if (this._config.chunk(l, this._handle), this._handle.paused() || this._handle.aborted()) return void(this._halted = !0);
                                l = void 0, this._completeResults = void 0
                            }
                            return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(l.data), this._completeResults.errors = this._completeResults.errors.concat(l.errors), this._completeResults.meta = l.meta), this._completed || !a || !w(this._config.complete) || l && l.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = !0), a || l && l.meta.paused || this._nextChunk(), l
                        }
                        this._halted = !0
                    }, this._sendError = function (e) {
                        w(this._config.error) ? this._config.error(e) : i && this._config.error && t.postMessage({
                            workerId: n.WORKER_ID,
                            error: e,
                            finished: !1
                        })
                    }
            }

            function h(t) {
                var i;
                (t = t || {}).chunkSize || (t.chunkSize = n.RemoteChunkSize), l.call(this, t), this._nextChunk = e ? function () {
                    this._readChunk(), this._chunkLoaded()
                } : function () {
                    this._readChunk()
                }, this.stream = function (t) {
                    this._input = t, this._nextChunk()
                }, this._readChunk = function () {
                    if (this._finished) this._chunkLoaded();
                    else {
                        if (i = new XMLHttpRequest, this._config.withCredentials && (i.withCredentials = this._config.withCredentials), e || (i.onload = x(this._chunkLoaded, this), i.onerror = x(this._chunkError, this)), i.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !e), this._config.downloadRequestHeaders) {
                            var t = this._config.downloadRequestHeaders;
                            for (var o in t) i.setRequestHeader(o, t[o])
                        }
                        if (this._config.chunkSize) {
                            var s = this._start + this._config.chunkSize - 1;
                            i.setRequestHeader("Range", "bytes=" + this._start + "-" + s)
                        }
                        try {
                            i.send(this._config.downloadRequestBody)
                        } catch (t) {
                            this._chunkError(t.message)
                        }
                        e && 0 === i.status && this._chunkError()
                    }
                }, this._chunkLoaded = function () {
                    4 === i.readyState && (i.status < 200 || i.status >= 400 ? this._chunkError() : (this._start += this._config.chunkSize ? this._config.chunkSize : i.responseText.length, this._finished = !this._config.chunkSize || this._start >= function (t) {
                        var e = t.getResponseHeader("Content-Range");
                        if (null === e) return -1;
                        return parseInt(e.substring(e.lastIndexOf("/") + 1))
                    }(i), this.parseChunk(i.responseText)))
                }, this._chunkError = function (t) {
                    var e = i.statusText || t;
                    this._sendError(new Error(e))
                }
            }

            function a(t) {
                var e, i;
                (t = t || {}).chunkSize || (t.chunkSize = n.LocalChunkSize), l.call(this, t);
                var o = "undefined" != typeof FileReader;
                this.stream = function (t) {
                    this._input = t, i = t.slice || t.webkitSlice || t.mozSlice, o ? ((e = new FileReader).onload = x(this._chunkLoaded, this), e.onerror = x(this._chunkError, this)) : e = new FileReaderSync, this._nextChunk()
                }, this._nextChunk = function () {
                    this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk()
                }, this._readChunk = function () {
                    var t = this._input;
                    if (this._config.chunkSize) {
                        var s = Math.min(this._start + this._config.chunkSize, this._input.size);
                        t = i.call(t, this._start, s)
                    }
                    var n = e.readAsText(t, this._config.encoding);
                    o || this._chunkLoaded({
                        target: {
                            result: n
                        }
                    })
                }, this._chunkLoaded = function (t) {
                    this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(t.target.result)
                }, this._chunkError = function () {
                    this._sendError(e.error)
                }
            }

            function c(t) {
                var e;
                t = t || {}, l.call(this, t), this.stream = function (t) {
                    return e = t, this._nextChunk()
                }, this._nextChunk = function () {
                    if (!this._finished) {
                        var t, i = this._config.chunkSize;
                        return i ? (t = e.substring(0, i), e = e.substring(i)) : (t = e, e = ""), this._finished = !e, this.parseChunk(t)
                    }
                }
            }

            function d(t) {
                t = t || {}, l.call(this, t);
                var e = [],
                    i = !0,
                    o = !1;
                this.pause = function () {
                    l.prototype.pause.apply(this, arguments), this._input.pause()
                }, this.resume = function () {
                    l.prototype.resume.apply(this, arguments), this._input.resume()
                }, this.stream = function (t) {
                    this._input = t, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError)
                }, this._checkIsFinished = function () {
                    o && 1 === e.length && (this._finished = !0)
                }, this._nextChunk = function () {
                    this._checkIsFinished(), e.length ? this.parseChunk(e.shift()) : i = !0
                }, this._streamData = x((function (t) {
                    try {
                        e.push("string" == typeof t ? t : t.toString(this._config.encoding)), i && (i = !1, this._checkIsFinished(), this.parseChunk(e.shift()))
                    } catch (t) {
                        this._streamError(t)
                    }
                }), this), this._streamError = x((function (t) {
                    this._streamCleanUp(), this._sendError(t)
                }), this), this._streamEnd = x((function () {
                    this._streamCleanUp(), o = !0, this._streamData("")
                }), this), this._streamCleanUp = x((function () {
                    this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError)
                }), this)
            }

            function u(t) {
                var e = require("stream").Duplex,
                    i = m(t),
                    o = !0,
                    s = !1,
                    n = [],
                    r = null;
                this._onCsvData = function (t) {
                    var e = t.data;
                    r.push(e) || this._handle.paused() || this._handle.pause()
                }, this._onCsvComplete = function () {
                    r.push(null)
                }, i.step = x(this._onCsvData, this), i.complete = x(this._onCsvComplete, this), l.call(this, i), this._nextChunk = function () {
                    s && 1 === n.length && (this._finished = !0), n.length ? n.shift()() : o = !0
                }, this._addToParseQueue = function (t, e) {
                    n.push(x((function () {
                        if (this.parseChunk("string" == typeof t ? t : t.toString(i.encoding)), w(e)) return e()
                    }), this)), o && (o = !1, this._nextChunk())
                }, this._onRead = function () {
                    this._handle.paused() && this._handle.resume()
                }, this._onWrite = function (t, e, i) {
                    this._addToParseQueue(t, i)
                }, this._onWriteComplete = function () {
                    s = !0, this._addToParseQueue("")
                }, this.getStream = function () {
                    return r
                }, (r = new e({
                    readableObjectMode: !0,
                    decodeStrings: !1,
                    read: x(this._onRead, this),
                    write: x(this._onWrite, this)
                })).once("finish", x(this._onWriteComplete, this))
            }

            function p(t) {
                var e, i, o, s = Math.pow(2, 53),
                    r = -s,
                    l = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,
                    h = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/,
                    a = this,
                    c = 0,
                    d = 0,
                    u = !1,
                    p = !1,
                    _ = [],
                    y = {
                        data: [],
                        errors: [],
                        meta: {}
                    };
                if (w(t.step)) {
                    var v = t.step;
                    t.step = function (e) {
                        if (y = e, b()) C();
                        else {
                            if (C(), 0 === y.data.length) return;
                            c += e.data.length, t.preview && c > t.preview ? i.abort() : (y.data = y.data[0], v(y, a))
                        }
                    }
                }

                function x(e) {
                    return "greedy" === t.skipEmptyLines ? "" === e.join("").trim() : 1 === e.length && 0 === e[0].length
                }

                function C() {
                    if (y && o && (I("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + n.DefaultDelimiter + "'"), o = !1), t.skipEmptyLines)
                        for (var e = 0; e < y.data.length; e++) x(y.data[e]) && y.data.splice(e--, 1);
                    return b() && function () {
                            if (!y) return;

                            function e(e, i) {
                                w(t.transformHeader) && (e = t.transformHeader(e, i)), _.push(e)
                            }
                            if (Array.isArray(y.data[0])) {
                                for (var i = 0; b() && i < y.data.length; i++) y.data[i].forEach(e);
                                y.data.splice(0, 1)
                            } else y.data.forEach(e)
                        }(),
                        function () {
                            if (!y || !t.header && !t.dynamicTyping && !t.transform) return y;

                            function e(e, i) {
                                var o, s = t.header ? {} : [];
                                for (o = 0; o < e.length; o++) {
                                    var n = o,
                                        r = e[o];
                                    t.header && (n = o >= _.length ? "__parsed_extra" : _[o]), t.transform && (r = t.transform(r, n)), r = S(n, r), "__parsed_extra" === n ? (s[n] = s[n] || [], s[n].push(r)) : s[n] = r
                                }
                                return t.header && (o > _.length ? I("FieldMismatch", "TooManyFields", "Too many fields: expected " + _.length + " fields but parsed " + o, d + i) : o < _.length && I("FieldMismatch", "TooFewFields", "Too few fields: expected " + _.length + " fields but parsed " + o, d + i)), s
                            }
                            var i = 1;
                            !y.data.length || Array.isArray(y.data[0]) ? (y.data = y.data.map(e), i = y.data.length) : y.data = e(y.data, 0);
                            t.header && y.meta && (y.meta.fields = _);
                            return d += i, y
                        }()
                }

                function b() {
                    return t.header && 0 === _.length
                }

                function S(e, i) {
                    return function (e) {
                        return t.dynamicTypingFunction && void 0 === t.dynamicTyping[e] && (t.dynamicTyping[e] = t.dynamicTypingFunction(e)), !0 === (t.dynamicTyping[e] || t.dynamicTyping)
                    }(e) ? "true" === i || "TRUE" === i || "false" !== i && "FALSE" !== i && (function (t) {
                        if (l.test(t)) {
                            var e = parseFloat(t);
                            if (e > r && e < s) return !0
                        }
                        return !1
                    }(i) ? parseFloat(i) : h.test(i) ? new Date(i) : "" === i ? null : i) : i
                }

                function I(t, e, i, o) {
                    var s = {
                        type: t,
                        code: e,
                        message: i
                    };
                    void 0 !== o && (s.row = o), y.errors.push(s)
                }
                this.parse = function (s, r, l) {
                    var h = t.quoteChar || '"';
                    if (t.newline || (t.newline = function (t, e) {
                            t = t.substring(0, 1048576);
                            var i = new RegExp(f(e) + "([^]*?)" + f(e), "gm"),
                                o = (t = t.replace(i, "")).split("\r"),
                                s = t.split("\n"),
                                n = s.length > 1 && s[0].length < o[0].length;
                            if (1 === o.length || n) return "\n";
                            for (var r = 0, l = 0; l < o.length; l++) "\n" === o[l][0] && r++;
                            return r >= o.length / 2 ? "\r\n" : "\r"
                        }(s, h)), o = !1, t.delimiter) w(t.delimiter) && (t.delimiter = t.delimiter(s), y.meta.delimiter = t.delimiter);
                    else {
                        var a = function (e, i, o, s, r) {
                            var l, h, a, c;
                            r = r || [",", "\t", "|", ";", n.RECORD_SEP, n.UNIT_SEP];
                            for (var d = 0; d < r.length; d++) {
                                var u = r[d],
                                    p = 0,
                                    f = 0,
                                    _ = 0;
                                a = void 0;
                                for (var y = new g({
                                        comments: s,
                                        delimiter: u,
                                        newline: i,
                                        preview: 10
                                    }).parse(e), v = 0; v < y.data.length; v++)
                                    if (o && x(y.data[v])) _++;
                                    else {
                                        var m = y.data[v].length;
                                        f += m, void 0 !== a ? m > 0 && (p += Math.abs(m - a), a = m) : a = m
                                    } y.data.length > 0 && (f /= y.data.length - _), (void 0 === h || p <= h) && (void 0 === c || f > c) && f > 1.99 && (h = p, l = u, c = f)
                            }
                            return t.delimiter = l, {
                                successful: !!l,
                                bestDelimiter: l
                            }
                        }(s, t.newline, t.skipEmptyLines, t.comments, t.delimitersToGuess);
                        a.successful ? t.delimiter = a.bestDelimiter : (o = !0, t.delimiter = n.DefaultDelimiter), y.meta.delimiter = t.delimiter
                    }
                    var c = m(t);
                    return t.preview && t.header && c.preview++, e = s, i = new g(c), y = i.parse(e, r, l), C(), u ? {
                        meta: {
                            paused: !0
                        }
                    } : y || {
                        meta: {
                            paused: !1
                        }
                    }
                }, this.paused = function () {
                    return u
                }, this.pause = function () {
                    u = !0, i.abort(), e = w(t.chunk) ? "" : e.substring(i.getCharIndex())
                }, this.resume = function () {
                    a.streamer._halted ? (u = !1, a.streamer.parseChunk(e, !0)) : setTimeout(a.resume, 3)
                }, this.aborted = function () {
                    return p
                }, this.abort = function () {
                    p = !0, i.abort(), y.meta.aborted = !0, w(t.complete) && t.complete(y), e = ""
                }
            }

            function f(t) {
                return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
            }

            function g(t) {
                var e, i = (t = t || {}).delimiter,
                    o = t.newline,
                    s = t.comments,
                    r = t.step,
                    l = t.preview,
                    h = t.fastMode,
                    a = e = void 0 === t.quoteChar ? '"' : t.quoteChar;
                if (void 0 !== t.escapeChar && (a = t.escapeChar), ("string" != typeof i || n.BAD_DELIMITERS.indexOf(i) > -1) && (i = ","), s === i) throw new Error("Comment character same as delimiter");
                !0 === s ? s = "#" : ("string" != typeof s || n.BAD_DELIMITERS.indexOf(s) > -1) && (s = !1), "\n" !== o && "\r" !== o && "\r\n" !== o && (o = "\n");
                var c = 0,
                    d = !1;
                this.parse = function (t, n, u) {
                    if ("string" != typeof t) throw new Error("Input must be a string");
                    var p = t.length,
                        g = i.length,
                        _ = o.length,
                        y = s.length,
                        v = w(r);
                    c = 0;
                    var m = [],
                        x = [],
                        C = [],
                        b = 0;
                    if (!t) return E();
                    if (h || !1 !== h && -1 === t.indexOf(e)) {
                        for (var S = t.split(o), I = 0; I < S.length; I++) {
                            if (C = S[I], c += C.length, I !== S.length - 1) c += o.length;
                            else if (u) return E();
                            if (!s || C.substring(0, y) !== s) {
                                if (v) {
                                    if (m = [], z(C.split(i)), M(), d) return E()
                                } else z(C.split(i));
                                if (l && I >= l) return m = m.slice(0, l), E(!0)
                            }
                        }
                        return E()
                    }
                    for (var R = t.indexOf(i, c), L = t.indexOf(o, c), P = new RegExp(f(a) + f(e), "g"), N = t.indexOf(e, c);;)
                        if (t[c] !== e)
                            if (s && 0 === C.length && t.substring(c, c + y) === s) {
                                if (-1 === L) return E();
                                c = L + _, L = t.indexOf(o, c), R = t.indexOf(i, c)
                            } else if (-1 !== R && (R < L || -1 === L)) C.push(t.substring(c, R)), c = R + g, R = t.indexOf(i, c);
                    else {
                        if (-1 === L) break;
                        if (C.push(t.substring(c, L)), F(L + _), v && (M(), d)) return E();
                        if (l && m.length >= l) return E(!0)
                    } else
                        for (N = c, c++;;) {
                            if (-1 === (N = t.indexOf(e, N + 1))) return u || x.push({
                                type: "Quotes",
                                code: "MissingQuotes",
                                message: "Quoted field unterminated",
                                row: m.length,
                                index: c
                            }), T();
                            if (N === p - 1) return T(t.substring(c, N).replace(P, e));
                            if (e !== a || t[N + 1] !== a) {
                                if (e === a || 0 === N || t[N - 1] !== a) {
                                    -1 !== R && R < N + 1 && (R = t.indexOf(i, N + 1)), -1 !== L && L < N + 1 && (L = t.indexOf(o, N + 1));
                                    var k = A(-1 === L ? R : Math.min(R, L));
                                    if (t.substr(N + 1 + k, g) === i) {
                                        C.push(t.substring(c, N).replace(P, e)), c = N + 1 + k + g, t[N + 1 + k + g] !== e && (N = t.indexOf(e, c)), R = t.indexOf(i, c), L = t.indexOf(o, c);
                                        break
                                    }
                                    var H = A(L);
                                    if (t.substring(N + 1 + H, N + 1 + H + _) === o) {
                                        if (C.push(t.substring(c, N).replace(P, e)), F(N + 1 + H + _), R = t.indexOf(i, c), N = t.indexOf(e, c), v && (M(), d)) return E();
                                        if (l && m.length >= l) return E(!0);
                                        break
                                    }
                                    x.push({
                                        type: "Quotes",
                                        code: "InvalidQuotes",
                                        message: "Trailing quote on quoted field is malformed",
                                        row: m.length,
                                        index: c
                                    }), N++
                                }
                            } else N++
                        }
                    return T();

                    function z(t) {
                        m.push(t), b = c
                    }

                    function A(e) {
                        var i = 0;
                        if (-1 !== e) {
                            var o = t.substring(N + 1, e);
                            o && "" === o.trim() && (i = o.length)
                        }
                        return i
                    }

                    function T(e) {
                        return u || (void 0 === e && (e = t.substring(c)), C.push(e), c = p, z(C), v && M()), E()
                    }

                    function F(e) {
                        c = e, z(C), C = [], L = t.indexOf(o, c)
                    }

                    function E(t) {
                        return {
                            data: m,
                            errors: x,
                            meta: {
                                delimiter: i,
                                linebreak: o,
                                aborted: d,
                                truncated: !!t,
                                cursor: b + (n || 0)
                            }
                        }
                    }

                    function M() {
                        r(E()), m = [], x = []
                    }
                }, this.abort = function () {
                    d = !0
                }, this.getCharIndex = function () {
                    return c
                }
            }

            function _(t) {
                var e = t.data,
                    i = o[e.workerId],
                    s = !1;
                if (e.error) i.userError(e.error, e.file);
                else if (e.results && e.results.data) {
                    var n = {
                        abort: function () {
                            s = !0, y(e.workerId, {
                                data: [],
                                errors: [],
                                meta: {
                                    aborted: !0
                                }
                            })
                        },
                        pause: v,
                        resume: v
                    };
                    if (w(i.userStep)) {
                        for (var r = 0; r < e.results.data.length && (i.userStep({
                                data: e.results.data[r],
                                errors: e.results.errors,
                                meta: e.results.meta
                            }, n), !s); r++);
                        delete e.results
                    } else w(i.userChunk) && (i.userChunk(e.results, n, e.file), delete e.results)
                }
                e.finished && !s && y(e.workerId, e.results)
            }

            function y(t, e) {
                var i = o[t];
                w(i.userComplete) && i.userComplete(e), i.terminate(), delete o[t]
            }

            function v() {
                throw new Error("Not implemented.")
            }

            function m(t) {
                if ("object" != typeof t || null === t) return t;
                var e = Array.isArray(t) ? [] : {};
                for (var i in t) e[i] = m(t[i]);
                return e
            }

            function x(t, e) {
                return function () {
                    t.apply(e, arguments)
                }
            }

            function w(t) {
                return "function" == typeof t
            }
            return i && (t.onmessage = function (e) {
                var i = e.data;
                void 0 === n.WORKER_ID && i && (n.WORKER_ID = i.workerId);
                if ("string" == typeof i.input) t.postMessage({
                    workerId: n.WORKER_ID,
                    results: n.parse(i.input, i.config),
                    finished: !0
                });
                else if (t.File && i.input instanceof File || i.input instanceof Object) {
                    var o = n.parse(i.input, i.config);
                    o && t.postMessage({
                        workerId: n.WORKER_ID,
                        results: o,
                        finished: !0
                    })
                }
            }), h.prototype = Object.create(l.prototype), h.prototype.constructor = h, a.prototype = Object.create(l.prototype), a.prototype.constructor = a, c.prototype = Object.create(c.prototype), c.prototype.constructor = c, d.prototype = Object.create(l.prototype), d.prototype.constructor = d, "undefined" == typeof PAPA_BROWSER_CONTEXT && (u.prototype = Object.create(l.prototype), u.prototype.constructor = u), n
        }(),
        Kr = {
            inputBar: {
                name: "inputBar",
                grow: 1,
                node: function () {
                    var t = {
                        name: "inputField",
                        tag: "input",
                        style: Y[".dgxl-inputField"].call(this),
                        type: "text"
                    };
                    return this.allowEditCells || (t.disabled = "disabled"), {
                        name: "inputWrapper",
                        style: Y[".dgxl-inputWrapper"].call(this),
                        children: [{
                            name: "inputInfo",
                            style: Y[".dgxl-inputInfo"].call(this),
                            text: ""
                        }, t]
                    }
                },
                events: {
                    ready: function (t, e) {
                        var i = this;
                        setTimeout((function () {
                            if (null != i._cellCursorPosition) {
                                i.getRowIdByCoord(i._cellCursorPosition.y), i.getColIdByCoord(i._cellCursorPosition.x);
                                t.inputField.value = i.getCellValue(i._cellCursorPosition), t.inputInfo.textContent = i.getSpreadsheetCoords(i._cellCursorPosition)
                            }
                        }), 0)
                    },
                    setselection: function (t, e) {
                        var i = this;
                        setTimeout((function () {
                            i.getRowIdByCoord(e.cellCursorPosition.y), i.getColIdByCoord(e.cellCursorPosition.x);
                            t.inputField.value = i.getCellValue(e.cellCursorPosition), t.inputInfo.textContent = i.getSpreadsheetCoords(e.cellCursorPosition)
                        }), 0)
                    },
                    closeeditor: function (t, e) {
                        t.inputField.value = this.getCellValue(this._cellCursorPosition)
                    },
                    celleditorinput: function (t, e) {
                        t.inputField.value = e.value
                    }
                },
                listeners: {
                    "inputField.input": function (t, e) {
                        this.setCellEditorValue(e.target.value)
                    },
                    "inputField.focus": function (t, e) {
                        t.inputWrapper.classList.add("dgxl-hasFocus"), P(t.inputWrapper, Y[".dgxl-inputWrapper.dgxl-hasFocus"].call(this))
                    },
                    "inputField.blur": function (t, e) {
                        t.inputWrapper.classList.remove("dgxl-hasFocus"), P(t.inputWrapper, Y["reset|.dgxl-inputWrapper.dgxl-hasFocus"].call(this))
                    }
                },
                keys: {
                    inputField: ["tab_navigateNext", "shiftTab_navigatePrev", "enter_navigateNext", "shiftEnter_navigatePrev", {
                        keys: "esc",
                        action: function (t, e) {
                            this.closeCellEditor(), t.inputField.value = "", t.inputField.blur()
                        },
                        repeat: !1
                    }]
                },
                update: function (t) {}
            },
            searchBar: {
                name: "searchBar",
                grow: 1,
                node: function () {
                    var t = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" style="' + k(Y[".dgxl-part button svg"].call(this)) + '"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z"/></svg>',
                        e = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" style="' + k(Y[".dgxl-part button svg"].call(this)) + '"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/></svg>';
                    return {
                        style: {
                            display: "flex",
                            "flex-grow": 1,
                            "grid-gap": "4px" // #NG - 2px
                        },
                        children: [{
                            name: "inputWrapper",
                            style: Y[".dgxl-inputWrapper"].call(this),
                            children: [{
                                name: "inputInfo",
                                style: Y[".dgxl-inputInfo"].call(this),
                                text: ""
                            }, {
                                name: "inputField",
                                tag: "input",
                                style: Y[".dgxl-inputField"].call(this),
                                placeholder: "Search",
                                value: ""
                            }]
                        }, {
                            name: "searchCellButtonPrev",
                            tag: "button",
                            style: Y[".dgxl-part button"].call(this),
                            html: t,
                            onclick: 'return false', // #NG
                            disabled: !0
                        }, {
                            name: "searchCellButtonNext",
                            tag: "button",
                            style: Y[".dgxl-part button"].call(this),
                            html: e,
                            onclick: 'return false', // #NG
                            disabled: !0
                        }]
                    }
                },
                listeners: {
                    "inputField.input": function (t, e) {
                        this.search(e.target.value)
                    },
                    "searchCellButtonPrev.click": function (t, e) {
                        this.searchPrev()
                    },
                    "searchCellButtonNext.click": function (t, e) {
                        this.searchNext()
                    },
                    "inputField.focus": function (t, e) {
                        t.inputWrapper.classList.add("dgxl-hasFocus"), P(t.inputWrapper, Y[".dgxl-inputWrapper.dgxl-hasFocus"].call(this))
                    },
                    "inputField.blur": function (t, e) {
                        t.inputWrapper.classList.remove("dgxl-hasFocus"), P(t.inputWrapper, Y["reset|.dgxl-inputWrapper.dgxl-hasFocus"].call(this))
                    }
                },
                keys: {
                    inputField: [{
                        keys: "enter",
                        action: function (t) {
                            this.searchNext()
                        },
                        repeat: !0
                    }, {
                        keys: "shift+enter",
                        action: function (t) {
                            this.searchPrev()
                        },
                        repeat: !0
                    }, {
                        keys: "esc",
                        action: function (t, e) {
                            this.clearSearch(), t.inputField.value = "", t.inputField.blur()
                        }
                    }]
                },
                update: function (t) {
                    t.inputField.value = this._searchStr;
                    var e = "$n=" + (this._searchCellIndex + 1) + " from $total=" + this._searchCellsFound.length;
                    this._searchCellsFound.length ? (t.inputInfo.textContent = this.getLocaleSetting(e), t.searchCellButtonNext.removeAttribute("disabled"), t.searchCellButtonPrev.removeAttribute("disabled")) : (this._searchStr ? t.inputInfo.textContent = this.getLocaleSetting(e) : t.inputInfo.textContent = "", t.searchCellButtonNext.setAttribute("disabled", !0), t.searchCellButtonPrev.setAttribute("disabled", !0))
                }
            },
            fullscreenButton: {
                name: "fullscreenButton",
                node: function () {
                    var t = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" style="' + k(Y[".dgxl-part button svg"].call(this)) + '"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',
                        e = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" style="' + k(Y[".dgxl-part button svg"].call(this)) + '"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>';
                    return {
                        tag: "button",
                        name: "fullscreenButton",
                        style: Y[".dgxl-part button"].call(this),
                        html: t,
                        onclick: 'return false', // #NG
                        _iconEnter: t,
                        _iconLeave: e
                    }
                },
                listeners: {
                    "fullscreenButton.click": function (t) {
                        this.toggleFullscreen()
                    }
                },
                events: {
                    fullscreenenter: function (t) {
                        this.constructor._isIOS && t.fullscreenButton.setAttribute("disabled", !0), t.fullscreenButton.innerHTML = t.fullscreenButton._iconLeave
                    },
                    fullscreenleave: function (t) {
                        this.constructor._isIOS && t.fullscreenButton.removeAttribute("disabled"), t.fullscreenButton.innerHTML = t.fullscreenButton._iconEnter
                    }
                }
            },
            exampleButton: {
                name: "exampleButton",
                node: function () {
                    // #NG - Added to store a Button.
                    return {
                        tag: "div",
                        name: "exampleButton",
                    }
                }
            },
            credits: {
                name: "credits",
                node: function () {
                    if (this.cacheCredits) var t = "https://resources.datagridxl.com/dgxl-logo-icon.svg";
                    else t = "data:image/svg+xml,%0A%3Csvg version='1.2' baseProfile='tiny-ps' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 179 179' width='16' height='16'%3E%3Ctitle%3ENew Project-svg%3C/title%3E%3Cstyle%3E tspan %7B white-space:pre %7D .shp0 %7B fill: %23138046 %7D .shp1 %7B fill: %23000000 %7D .shp2 %7B fill: %23ffffff %7D %3C/style%3E%3Cg id='NEW'%3E%3Cpath id='Layer 3 copy' class='shp0' d='M20 0L159 0C170.06 0 179 8.94 179 20L179 159C179 170.06 170.06 179 159 179L20 179C8.94 179 0 170.06 0 159L0 20C0 8.94 8.94 0 20 0Z' /%3E%3Cpath id='datagrid ' fill-rule='evenodd' class='shp1' d='M-582.44 64.02C-570.4 64.02 -559.34 70.18 -554.02 79L-554.02 38.4L-541.14 38.4L-541.14 142L-554.02 142L-554.02 127.58C-558.64 136.12 -568.58 143.26 -582.58 143.26C-603.16 143.26 -618.98 127.16 -618.98 103.36C-618.98 79.42 -603.16 64.02 -582.44 64.02ZM-580.06 75.08C-594.06 75.08 -605.96 85.3 -605.96 103.36C-605.96 121.42 -594.06 132.06 -580.06 132.06C-566.06 132.06 -554.02 121.56 -554.02 103.5C-554.02 85.72 -566.06 75.08 -580.06 75.08ZM-487.94 64.02C-473.66 64.02 -463.86 71.3 -459.38 79.28L-459.38 65.28L-446.5 65.28L-446.5 142L-459.38 142L-459.38 127.72C-464 135.98 -473.94 143.26 -488.08 143.26C-508.52 143.26 -524.34 127.16 -524.34 103.36C-524.34 79.42 -508.52 64.02 -487.94 64.02ZM-485.42 75.08C-499.42 75.08 -511.32 85.3 -511.32 103.36C-511.32 121.42 -499.42 132.06 -485.42 132.06C-471.42 132.06 -459.38 121.56 -459.38 103.5C-459.38 85.72 -471.42 75.08 -485.42 75.08ZM-422.14 75.78L-432.08 75.78L-432.08 65.28L-422.14 65.28L-422.14 45.96L-409.4 45.96L-409.4 65.28L-389.38 65.28L-389.38 75.78L-409.4 75.78L-409.4 121C-409.4 128.56 -406.6 131.22 -398.76 131.22L-389.38 131.22L-389.38 142L-400.86 142C-414.44 142 -422.14 136.4 -422.14 121L-422.14 75.78ZM-342.34 64.02C-328.06 64.02 -318.26 71.3 -313.78 79.28L-313.78 65.28L-300.9 65.28L-300.9 142L-313.78 142L-313.78 127.72C-318.4 135.98 -328.34 143.26 -342.48 143.26C-362.92 143.26 -378.74 127.16 -378.74 103.36C-378.74 79.42 -362.92 64.02 -342.34 64.02ZM-339.82 75.08C-353.82 75.08 -365.72 85.3 -365.72 103.36C-365.72 121.42 -353.82 132.06 -339.82 132.06C-325.82 132.06 -313.78 121.56 -313.78 103.5C-313.78 85.72 -325.82 75.08 -339.82 75.08ZM-247.7 64.02C-233.7 64.02 -223.62 71.02 -219.14 79.28L-219.14 65.28L-206.26 65.28L-206.26 143.68C-206.26 164.82 -220.4 179.8 -242.94 179.8C-263.1 179.8 -277.52 169.58 -280.04 153.2L-267.44 153.2C-264.64 162.44 -255.54 168.74 -242.94 168.74C-229.36 168.74 -219.14 160.06 -219.14 143.68L-219.14 127.58C-223.76 135.84 -233.7 143.26 -247.7 143.26C-268.28 143.26 -284.1 127.16 -284.1 103.36C-284.1 79.42 -268.28 64.02 -247.7 64.02ZM-245.18 75.08C-259.18 75.08 -271.08 85.3 -271.08 103.36C-271.08 121.42 -259.18 132.06 -245.18 132.06C-231.18 132.06 -219.14 121.56 -219.14 103.5C-219.14 85.72 -231.18 75.08 -245.18 75.08ZM-171.96 142L-184.7 142L-184.7 65.28L-171.96 65.28L-171.96 77.74C-167.62 69.2 -159.36 63.88 -147.18 63.88L-147.18 77.04L-150.54 77.04C-162.72 77.04 -171.96 82.5 -171.96 100.28L-171.96 142ZM-132.48 65.28L-119.74 65.28L-119.74 142L-132.48 142L-132.48 65.28ZM-134.58 44.14C-134.58 39.24 -130.8 35.46 -125.9 35.46C-121.28 35.46 -117.5 39.24 -117.5 44.14C-117.5 49.04 -121.28 52.82 -125.9 52.82C-130.8 52.82 -134.58 49.04 -134.58 44.14ZM-66.26 64.02C-54.22 64.02 -43.16 70.18 -37.84 79L-37.84 38.4L-24.96 38.4L-24.96 142L-37.84 142L-37.84 127.58C-42.46 136.12 -52.4 143.26 -66.4 143.26C-86.98 143.26 -102.8 127.16 -102.8 103.36C-102.8 79.42 -86.98 64.02 -66.26 64.02ZM-63.88 75.08C-77.88 75.08 -89.78 85.3 -89.78 103.36C-89.78 121.42 -77.88 132.06 -63.88 132.06C-49.88 132.06 -37.84 121.56 -37.84 103.5C-37.84 85.72 -49.88 75.08 -63.88 75.08Z' /%3E%3Cpath id='XL ' class='shp2' d='M62 79L75.5 57L95.5 57L73 92L96 127L76 127L62 105L48 127L28 127L51 92L28.5 57L48.4 57L62 79ZM119 57L119 113L155.5 113L155.5 127L101 127L101 57L119 57Z' /%3E%3C/g%3E%3C/svg%3E";
                    return {
                        name: "credits",
                        style: {
                            display: "flex",
                            "align-items": "center",
                            height: "100%",
                            "aspect-ratio": 1
                        },
                        html: '<a style="display:flex;height:100%;aspect-ratio:1;" title="Excel-like experience by DataGridXL" href="https://datagridxl.com"><img style="height:100%;aspect-ratio:1;" src="' + t + '"></a>'
                    }
                }
            }
        },
        jr = {
            tab_navigateNext: {
                keys: "tab",
                action: function () {
                    this.moveCellCursorInsideSelection({
                        x: 1,
                        y: 0
                    })
                },
                repeat: !0
            },
            shiftTab_navigatePrev: {
                keys: "shift+tab",
                action: function () {
                    this.moveCellCursorInsideSelection({
                        x: -1,
                        y: 0
                    })
                },
                repeat: !0
            },
            enter_navigateNext: {
                keys: "enter",
                action: function () {
                    this.moveCellCursorInsideSelection({
                        x: 0,
                        y: 1
                    })
                },
                repeat: !0
            },
            shiftEnter_navigatePrev: {
                keys: "shift+enter",
                action: function () {
                    this.moveCellCursorInsideSelection({
                        x: 0,
                        y: -1
                    })
                },
                repeat: !0
            },
            enter_openCellEditor: {
                keys: "enter",
                action: function () {
                    this.openCellEditor("edit")
                },
                repeat: !1,
                active: function () {
                    return this.allowEditCells
                }
            },
            pageDown_moveCellCursorOneViewportDown: {
                keys: "pagedown",
                action: function () {
                    this.moveCellCursorOneViewportDown()
                },
                repeat: !0
            },
            pageUp_moveCellCursorOneViewportUp: {
                keys: "pageup",
                action: function () {
                    this.moveCellCursorOneViewportUp()
                },
                repeat: !0
            },
            home_moveCellCursorToRowStart: {
                keys: "home",
                action: function () {
                    this.moveCellCursorToRowStart()
                },
                repeat: !1
            },
            end_moveCellCursorToRowEnd: {
                keys: "end",
                action: function () {
                    this.moveCellCursorToRowEnd()
                },
                repeat: !1
            },
            ctrlLeftArrow_moveCellCursorToRowStart: {
                keys: "ctrl+left",
                action: function () {
                    this.moveCellCursorToRowStart()
                },
                repeat: !1
            },
            ctrlRightArrow_moveCellCursorToRowEnd: {
                keys: "ctrl+right",
                action: function () {
                    this.moveCellCursorToRowEnd()
                },
                repeat: !1
            },
            ctrlUpArrow_moveCellCursorToColStart: {
                keys: "ctrl+up",
                action: function () {
                    this.moveCellCursorToColStart()
                },
                repeat: !1
            },
            ctrlDownArrow_moveCellCursorToColEnd: {
                keys: "ctrl+down",
                action: function () {
                    this.moveCellCursorToColEnd()
                },
                repeat: !1
            },
            ctrlHome_moveCellCursorToSheetStart: {
                keys: "ctrl+home",
                action: function () {
                    this.moveCellCursorToSheetStart()
                },
                repeat: !1
            },
            ctrlEnd_moveCellCursorToSheetEnd: {
                keys: "ctrl+end",
                action: function () {
                    this.moveCellCursorToSheetEnd()
                },
                repeat: !1
            },
            rightArrow_moveCellCursorRight: {
                keys: "right",
                action: function () {
                    this.moveCellCursor({
                        x: 1,
                        y: 0
                    })
                },
                repeat: !0
            },
            downArrow_moveCellCursorDown: {
                keys: "down",
                action: function () {
                    this.moveCellCursor({
                        x: 0,
                        y: 1
                    })
                },
                repeat: !0
            },
            leftArrow_moveCellCursorLeft: {
                keys: "left",
                action: function () {
                    this.moveCellCursor({
                        x: -1,
                        y: 0
                    })
                },
                repeat: !0
            },
            upArrow_moveCellCursorUp: {
                keys: "up",
                action: function () {
                    this.moveCellCursor({
                        x: 0,
                        y: -1
                    })
                },
                repeat: !0
            },
            shiftRightArrow_modifyActiveRangeRightwards: {
                keys: "shift+right",
                action: function () {
                    this.modifyActiveRange("right")
                },
                repeat: !0
            },
            shiftDownArrow_modifyActiveRangeDownwards: {
                keys: "shift+down",
                action: function () {
                    this.modifyActiveRange("down")
                },
                repeat: !0
            },
            shiftLeftArrow_modifyActiveRangeLeftwards: {
                keys: "shift+left",
                action: function () {
                    this.modifyActiveRange("left")
                },
                repeat: !0
            },
            shiftUpArrow_modifyActiveRangeUpwards: {
                keys: "shift+up",
                action: function () {
                    this.modifyActiveRange("up")
                },
                repeat: !0
            },
            ctrlZ_undo: {
                keys: "ctrl+z",
                action: function (t) {
                    this.undo(), t.preventDefault()
                },
                repeat: !1
            },
            ctrlY_redo: {
                keys: "ctrl+y",
                action: function (t) {
                    this.redo(), t.preventDefault()
                },
                repeat: !1
            },
            ctrlShiftZ_redo: {
                keys: "ctrl+shift+z",
                action: function (t) {
                    this.redo(), t.preventDefault()
                },
                repeat: !1
            },
            ctrlA_selectAll: {
                keys: "ctrl+a",
                action: function (t) {
                    this.selectAll(!1)
                },
                repeat: !1
            },
            backspace_clearCellValues: {
                keys: "backspace",
                action: function () {
                    this.clearCellValues(this._selection)
                },
                repeat: !1,
                active: function () {
                    return this.allowEditCells
                }
            },
            delete_clearCellValues: {
                keys: "delete",
                action: function () {
                    this.clearCellValues(this._selection)
                },
                repeat: !1,
                active: function () {
                    return this.allowEditCells
                }
            },
            esc_closeCellEditor: {
                keys: "esc",
                action: function () {
                    this.closeCellEditor()
                },
                repeat: !1
            },
            ctrlShiftSlash_openContextMenu: {
                keys: "ctrl+shift+\\",
                action: function () {
                    this.openContextMenu()
                },
                repeat: !1
            },
            esc_closeContextMenu: {
                keys: "esc",
                action: function () {
                    this.constructor.contextMenu.close()
                },
                repeat: !1
            },
            downArrow_moveContextMenuCursorDown: {
                keys: "down",
                action: function () {
                    this.constructor.contextMenu.moveCursorDown()
                },
                repeat: !0
            },
            upArrow_moveContextMenuCursorUp: {
                keys: "up",
                action: function () {
                    this.constructor.contextMenu.moveCursorUp()
                },
                repeat: !0
            },
            enter_hitContextMenuItem: {
                keys: "enter",
                action: function () {
                    this.constructor.contextMenu.triggerHit()
                },
                repeat: !1
            }
        };

    function Ur() {
        if (null == this._cellCursorPosition) var t = null;
        else t = [this.getRowIdByCoord(this._cellCursorPosition.y), this.getColIdByCoord(this._cellCursorPosition.x)];
        for (var e = {
                selection: [],
                cellCursorPosition: this._cellCursorPosition,
                cellCursorPositionId: t,
                activeRangeIndex: this._activeRangeIndex
            }, i = 0; i < this._selection.length; i++) {
            var o = [{
                x: this._selection[i].range[0].x,
                y: this._selection[i].range[0].y
            }, {
                x: this._selection[i].range[1].x,
                y: this._selection[i].range[1].y
            }];
            e.selection.push({
                range: o,
                type: this._selection[i].type,
                colIds: qr.call(this, o),
                rowIds: Gr.call(this, o)
            })
        }
        return e
    }
    var qr = function (t) {
            for (var e = [], i = t[0].x; i <= t[1].x; i++) e.push(this.getColIdByCoord(i));
            return e
        },
        Gr = function (t) {
            for (var e = [], i = t[0].y; i <= t[1].y; i++) e.push(this.getRowIdByCoord(i));
            return e
        },
        Zr = {
            cut: {
                label: "Cut",
                method: function () {
                    this.cut()
                },
                shortcut: "Ctrl+X",
                shortcutMac: "⌘X",
                include: function () {
                    return this.allowCut
                }
            },
            copy: {
                label: "Copy",
                method: function () {
                    this.copy()
                },
                shortcut: "Ctrl+C",
                shortcutMac: "⌘C",
                include: function () {
                    return this.allowCopy
                }
            },
            paste: {
                label: "Paste",
                method: function () {
                    this.paste()
                },
                shortcut: "Ctrl+V",
                shortcutMac: "⌘V",
                include: function () {
                    return this.allowPaste
                }
            },
            delete_rows: {
                label: "Delete Row(s)",
                method: function () {
                    this.deleteRows(this.getRowSelection())
                },
                disabled: function () {
                    return !this.getRowSelection().length
                },
                include: function () {
                    return this.allowDeleteRows
                }
            },
            insert_rows_before: {
                label: function () {
                    var t = this.getRowSelection();
                    if (!t.length) return "Insert Row (up)";
                    var e = t[0][1] - t[0][0] + 1;
                    return 1 == e ? "Insert Row (up)" : "Insert $n=" + e + " Rows (up)"
                },
                method: function () {
                    var t = this.getRowSelection(),
                        e = t[0][1] - t[0][0] + 1;
                    this.insertEmptyRows(e, this.getRowSelection()[0][0])
                },
                disabled: function () {},
                include: function () {
                    return this.allowInsertRows && 1 == this.getRowSelection().length
                }
            },
            insert_rows_after: {
                label: function () {
                    var t = this.getRowSelection();
                    if (!t.length) return "Insert Row (down)";
                    var e = t[0][1] - t[0][0] + 1;
                    return 1 == e ? "Insert Row (down)" : "Insert $n=" + e + " Rows (down)"
                },
                method: function () {
                    var t = this.getRowSelection(),
                        e = t[0][1] - t[0][0] + 1;
                    this.insertEmptyRows(e, this.getRowSelection()[0][1] + 1)
                },
                disabled: function () {},
                include: function () {
                    return this.allowInsertRows && 1 == this.getRowSelection().length
                }
            },
            hide_rows: {
                label: function () {
                    var t = this.getRowSelection();
                    if (!t.length) return "Hide Row";
                    var e = t[0][1] - t[0][0] + 1;
                    return 1 == e ? "Hide Row" : "Hide $n=" + e + " Rows"
                },
                method: function () {
                    this.hideRows(this.getRowSelection())
                },
                disabled: function () {
                    return !this.getRowSelection().length
                },
                include: function () {
                    return this.allowHideRows
                }
            },
            delete_cols: {
                label: "Delete Column(s)",
                method: function () {
                    this.deleteCols(this.getColSelection())
                },
                disabled: function () {
                    return !this.getColSelection().length
                },
                include: function () {
                    return this.allowDeleteCols
                }
            },
            insert_cols_before: {
                label: function () {
                    var t = this.getColSelection();
                    if (!t.length) return "Insert Column (left)";
                    var e = t[0][1] - t[0][0] + 1;
                    return 1 == e ? "Insert Column (left)" : "Insert $n=" + e + " Columns (left)"
                },
                method: function () {
                    var t = this.getColSelection(),
                        e = t[0][1] - t[0][0] + 1;
                    this.insertEmptyCols(e, this.getColSelection()[0][0])
                },
                disabled: function () {},
                include: function () {
                    return this.allowInsertCols && 1 == this.getColSelection().length
                }
            },
            insert_cols_after: {
                label: function () {
                    var t = this.getColSelection();
                    if (!t.length) return "Insert Column (right)";
                    var e = t[0][1] - t[0][0] + 1;
                    return 1 == e ? "Insert Column (right)" : "Insert $n=" + e + " Columns (right)"
                },
                method: function () {
                    var t = this.getColSelection(),
                        e = t[0][1] - t[0][0] + 1;
                    this.insertEmptyCols(e, this.getColSelection()[0][1] + 1)
                },
                disabled: function () {},
                include: function () {
                    return this.allowInsertCols && 1 == this.getColSelection().length
                }
            },
            hide_cols: {
                label: function () {
                    var t = this.getColSelection();
                    if (!t.length) return "Hide Column";
                    var e = t[0][1] - t[0][0] + 1;
                    return 1 == e ? "Hide Column" : "Hide $n=" + e + " Columns"
                },
                method: function () {
                    this.hideCols(this.getColSelection())
                },
                disabled: function () {
                    return !this.getColSelection().length
                },
                include: function () {
                    return this.allowHideCols
                }
            },
            sort_asc: {
                label: "Sort A to Z",
                method: function () {
                    this.sort(this._cellCursorPosition.x, "asc")
                },
                disabled: function () {
                    return !this.getColSelection().length
                },
                include: function () {
                    return this.allowSort
                }
            },
            sort_desc: {
                label: "Sort Z to A",
                method: function () {
                    this.sort(this._cellCursorPosition.x, "desc")
                },
                disabled: function () {
                    return !this.getColSelection().length
                },
                include: function () {
                    return this.allowSort
                }
            }
        },
        $r = {
            numbers: {
                indexToLabel: function (t) {
                    return String(1 + t)
                },
                labelToIndex: function (t) {
                    return Number(t) - 1
                }
            },
            letters: {
                indexToLabel: function (t) {
                    var e = "";
                    for (t++; t-- > 0; t = (t - t % 26) / 26) e = String.fromCharCode(t % 26 + 65) + e;
                    return e
                },
                labelToIndex: function (t) {
                    for (var e = 0, i = 0; i < t.length; i++) e = 26 * e + t.charCodeAt(i) - 64;
                    return e - 1
                }
            }
        },
        Qr = ["searchBar", "exampleButton"], // #NG - ["searchBar"]
        Jr = [] // #NG - ["fullscreenButton", "inputBar", "credits"]

    function tl(t, e, i, o) {
        return i.title ? i.title || "" : this.colHeaderLabelType in o ? (this.colHeaderLabelPrefix || "") + o[this.colHeaderLabelType] + (this.colHeaderLabelSuffix || "") : (this.colHeaderLabelPrefix || "") + (this.colHeaderLabelSuffix || "")
    }

    function el(t, e, i, o) {
        return i.title ? i.title || "" : this.rowHeaderLabelType in o ? (this.rowHeaderLabelPrefix || "") + o[this.rowHeaderLabelType] + (this.rowHeaderLabelSuffix || "") : (this.rowHeaderLabelPrefix || "") + (this.rowHeaderLabelSuffix || "")
    }
    var il = {
            traverseSingleCell: ["rightArrow_moveCellCursorRight", "downArrow_moveCellCursorDown", "leftArrow_moveCellCursorLeft", "upArrow_moveCellCursorUp", "tab_navigateNext", "shiftTab_navigatePrev", "enter_openCellEditor", "pageDown_moveCellCursorOneViewportDown", "pageUp_moveCellCursorOneViewportUp", "home_moveCellCursorToRowStart", "end_moveCellCursorToRowEnd", "ctrlLeftArrow_moveCellCursorToRowStart", "ctrlRightArrow_moveCellCursorToRowEnd", "ctrlUpArrow_moveCellCursorToColStart", "ctrlDownArrow_moveCellCursorToColEnd", "ctrlHome_moveCellCursorToSheetStart", "ctrlEnd_moveCellCursorToSheetEnd", "shiftRightArrow_modifyActiveRangeRightwards", "shiftDownArrow_modifyActiveRangeDownwards", "shiftLeftArrow_modifyActiveRangeLeftwards", "shiftUpArrow_modifyActiveRangeUpwards", "backspace_clearCellValues", "delete_clearCellValues", "ctrlZ_undo", "ctrlY_redo", "ctrlShiftZ_redo", "ctrlA_selectAll", "ctrlShiftSlash_openContextMenu"],
            traverseMultiCell: ["rightArrow_moveCellCursorRight", "downArrow_moveCellCursorDown", "leftArrow_moveCellCursorLeft", "upArrow_moveCellCursorUp", "tab_navigateNext", "shiftTab_navigatePrev", "enter_navigateNext", "shiftEnter_navigatePrev", "pageDown_moveCellCursorOneViewportDown", "pageUp_moveCellCursorOneViewportUp", "home_moveCellCursorToRowStart", "end_moveCellCursorToRowEnd", "ctrlLeftArrow_moveCellCursorToRowStart", "ctrlRightArrow_moveCellCursorToRowEnd", "ctrlUpArrow_moveCellCursorToColStart", "ctrlDownArrow_moveCellCursorToColEnd", "ctrlHome_moveCellCursorToSheetStart", "ctrlEnd_moveCellCursorToSheetEnd", "shiftRightArrow_modifyActiveRangeRightwards", "shiftDownArrow_modifyActiveRangeDownwards", "shiftLeftArrow_modifyActiveRangeLeftwards", "shiftUpArrow_modifyActiveRangeUpwards", "backspace_clearCellValues", "delete_clearCellValues", "ctrlZ_undo", "ctrlY_redo", "ctrlShiftZ_redo", "ctrlA_selectAll", "ctrlShiftSlash_openContextMenu"],
            inputModeEnter: ["rightArrow_moveCellCursorRight", "downArrow_moveCellCursorDown", "leftArrow_moveCellCursorLeft", "upArrow_moveCellCursorUp", "tab_navigateNext", "shiftTab_navigatePrev", "enter_navigateNext", "shiftEnter_navigatePrev", "pageDown_moveCellCursorOneViewportDown", "pageUp_moveCellCursorOneViewportUp", "home_moveCellCursorToRowStart", "end_moveCellCursorToRowEnd", "ctrlLeftArrow_moveCellCursorToRowStart", "ctrlRightArrow_moveCellCursorToRowEnd", "ctrlUpArrow_moveCellCursorToColStart", "ctrlDownArrow_moveCellCursorToColEnd", "ctrlHome_moveCellCursorToSheetStart", "ctrlEnd_moveCellCursorToSheetEnd", "esc_closeCellEditor"],
            inputModeEdit: ["tab_navigateNext", "shiftTab_navigatePrev", "enter_navigateNext", "shiftEnter_navigatePrev", "esc_closeCellEditor"],
            contextMenuOpen: ["esc_closeContextMenu", "downArrow_moveContextMenuCursorDown", "upArrow_moveContextMenuCursorUp", "enter_hitContextMenuItem", "ctrlZ_undo", "ctrlY_redo", "ctrlShiftZ_redo", "ctrlA_selectAll"]
        },
        ol = ["cut", "copy", "paste", "hide_cols", "hide_rows", "insert_cols_before", "insert_cols_after", "delete_cols", "insert_rows_before", "insert_rows_after", "delete_rows", "sort_asc", "sort_desc"],
        sl = {
            component: "#ffffff",
            button: "#e8eaed",
            "button-icon": "#5f6368",
            input: "#ffffff",
            "input|text": "#000000",
            "input|border": "#5f6368",
            "input:focus|border": "#0078ff",
            "input-info": "#5f6368",
            contextmenu: "#ffffff",
            "contextmenu|text": "#000000",
            "contextmenu-item:highlight": "#eeeeee",
            "contextmenu-item-shortcut": "#aaaaaa",
            blanksheet: "#f3f3f3",
            sheet: "#ffffff",
            "sheet|text": "#000000",
            scrollbar: "#ffffff",
            "scrollbar|border": "#999999",
            gridline: "#555555",
            "gridline-tip": "#000000",
            "gridline|opacity": .2,
            header: "#f8f9fa",
            "header|text": "#000000",
            "header:highlight": "#e8eaed",
            "header:selected": "#5f6368",
            "header:selected|text": "#ffffff",
            "header-icon": "#000000",
            "cellrange:cut": "#0078ff",
            "cellrange:copy": "#0078ff",
            "cellrange:fill": "#000000",
            cellcursor: "#0078ff",
            "cellrange:selected": "#0078ff",
            "cellrange:selected|border": "#0078ff",
            "cellrange:selected|opacity": .1,
            fillhandle: "#0078ff",
            celleditor: "#0078ff",
            searchcursor: "#000000",
            "cell+found": "#89bf71",
            "cell+found|opacity": .25,
            freezeline: "#dadfe8",
            "freezeline-tip": "#bcbcbc",
            freezelineplaceholder: "#bcbcbc",
            "move?ghost": "#000000",
            "move?ghost|opacity": .15,
            "move?guide": "#5f6368",
            "move?guide|opacity": 1,
            "freeze?hint": "#a5c6fe",
            "freeze?ghost": "#000000",
            "freeze?ghost|opacity": .15,
            "freeze?guide": "#000000",
            "freeze?guide|opacity": .3,
            "resize?hint": "#0078ff",
            "resize?guide": "#0078ff",
            "resize?guide|opacity": 1,
            "show?hint": "#ffffff",
            "show?hint-icon": "#000000",
            "show?hint|border": "#0078ff"
        },
        nl = {
            Copy: null,
            Cut: null,
            Paste: null,
            "Delete Row(s)": null,
            "Hide Row": null,
            "Hide $n Rows": null,
            "Hide Column": null,
            "Hide $n Columns": null,
            "Insert Row (up)": null,
            "Insert $n Rows (up)": null,
            "Insert Row (down)": null,
            "Insert $n Rows (down)": null,
            "Delete Column(s)": null,
            "Insert Column (left)": null,
            "Insert $n Columns (left)": null,
            "Insert Column (right)": null,
            "Insert $n Columns (right)": null,
            "$n from $total": null,
            Deselect: null,
            "Sort A to Z": null,
            "Sort Z to A": null,
            Search: null,
            "Paste not available.": null,
            "Cannot delete all columns.": null,
            "Cannot delete all rows.": null,
            "Cannot hide all columns.": null,
            "Cannot hide all rows.": null,
            "Cannot delete all non-frozen columns.": null,
            "Cannot delete all non-frozen rows.": null,
            "Cannot move columns in or out of the frozen section. Try turning off frozen columns first.": null,
            "Cannot move rows in or out of the frozen section. Try turning off frozen rows first.": null
        },
        rl = {
            default: "default",
            cell: "default",
            colHeader: "default",
            rowHeader: "default",
            jointHeader: "default",
            horizontalScrollbar: "default",
            verticalScrollbar: "default",
            hiddenColGroupIcon: "default",
            hiddenRowGroupIcon: "default",
            freezeLineCol: "grab",
            freezeLineRow: "grab",
            freezeLinePlaceholderCol: "grab",
            freezeLinePlaceholderRow: "grab",
            freezeLineColEnd: "grab",
            freezeLineRowEnd: "grab",
            selectedRowHeader: "grab",
            selectedColHeader: "grab",
            fillHandle: "crosshair",
            colHeaderEdge: "ew-resize",
            hiddenColGroupIcon: "pointer",
            hiddenRowGroupIcon: "pointer"
        },
        ll = {
            selectCells: "default",
            selectCols: "default",
            selectRows: "default",
            moveCols: "grabbing",
            moveRows: "grabbing",
            fillCells: "crosshair",
            resizeCols: "ew-resize",
            freezeCols: "grabbing"
        };

    function hl(t) {
        return null == t ? null : [Is.call(this, {
            x: t[0].x,
            y: t[0].y
        }), Is.call(this, {
            x: t[1].x,
            y: t[1].y
        })]
    }

    function al(t) {
        for (var e = [], i = 0; i < t.length; i++) e.push({
            range: hl.call(this, Ps(t[i].range)),
            type: t[i].type
        });
        return e
    }

    function cl(t) {
        if (n(t) && "range" in t[0]) return t;
        var o;
        i(t) ? o = t : e(t) ? o = [t] : s(t) && (o = [
            [{
                x: t.x,
                y: t.y
            }, {
                x: t.x,
                y: t.y
            }]
        ]);
        for (var r = [], l = 0; l < o.length; l++) r.push({
            range: o[l],
            type: "cell"
        });
        return r
    }

    function dl(t) {
        if (void 0 === t && (t = null), null != t) {
            var e = al.call(this, cl(t));
            this.setCellValues(e, null)
        }
    }

    function ul(t, e, i, o) {
        void 0 === e && (e = null), void 0 === i && (i = !1), void 0 === o && (o = null);
        var s = [],
            n = [],
            r = [],
            l = [];
        if (null != o) {
            var h = [{
                range: o
            }];
            (l = gl.call(this, h, null))[0].action = "cut"
        }
        var a = gl.call(this, t, e, i);
        l.length && a.unshift(l[0]), a.sort((function (t, e) {
            return t.range[0].y - e.range[0].y
        }));
        for (var c = 0; c < a.length; c++) {
            for (var d = n.length, u = 0; u < a[c].rowIds.length; u++) n.indexOf(a[c].rowIds[u]) > -1 ? "rowStartIndex" in a[c] || (a[c].rowStartIndex = n.indexOf(a[c].rowIds[u])) : n.push(a[c].rowIds[u]);
            "rowStartIndex" in a[c] || (a[c].rowStartIndex = d)
        }
        a.sort((function (t, e) {
            return t.range[0].x - e.range[0].x
        }));
        for (c = 0; c < a.length; c++) {
            var p = s.length;
            for (u = 0; u < a[c].colIds.length; u++) s.indexOf(a[c].colIds[u]) > -1 ? "colStartIndex" in a[c] || (a[c].colStartIndex = s.indexOf(a[c].colIds[u])) : s.push(a[c].colIds[u]);
            "colStartIndex" in a[c] || (a[c].colStartIndex = p)
        }
        for (c = 0; c < n.length; c++) {
            r.push([]);
            for (u = 0; u < s.length; u++) r[c].push(void 0)
        }
        a.sort((function (t, e) {
            return "action" in t && "cut" == t.action ? -1 : 0
        }));
        for (c = 0; c < a.length; c++)
            for (var f = a[c].rowStartIndex, g = a[c].colStartIndex, _ = 0, y = 0, v = a[c].range[0].y; v <= a[c].range[1].y; v++) {
                y = 0;
                for (var m = a[c].range[0].x; m <= a[c].range[1].x; m++) r[f + _][g + y] = a[c].values[_][y], y++;
                _++
            }
        var x = [];
        for (c = 0; c < a.length; c++) "action" in a[c] && "cut" == a[c].action || x.push({
            range: a[c].range,
            type: "cell"
        });
        return {
            rowIds: n,
            colIds: s,
            values: r,
            selection: x
        }
    }
    var pl = function (t) {
            for (var e, i = this._cols.store._lastId, o = [], s = t[0].x; s <= t[1].x; s++) null == (e = this.getColIdByCoord(s)) && i++, o.push(e || i);
            return o
        },
        fl = function (t) {
            for (var e, i = this._rows.store._lastId, o = [], s = t[0].y; s <= t[1].y; s++) null == (e = this.getRowIdByCoord(s)) && i++, o.push(e || i);
            return o
        },
        gl = function (t, i, o) {
            for (var s, n, r, l = [], h = 0; h < t.length; h++) {
                var a = [{
                    x: t[h].range[0].x,
                    y: t[h].range[0].y
                }, {
                    x: t[h].range[1].x,
                    y: t[h].range[1].y
                }];
                if (o && e(i)) {
                    var c = i.length - (1 + a[1].y - a[0].y),
                        d = i[0].length - (1 + a[1].x - a[0].x);
                    c > 0 && (a[1].y += c), d > 0 && (a[1].x += d)
                }
                this.expandSheetOnPaste || (a[1].y = Math.min(a[1].y, this._rows.coordList.length - 1), a[1].x = Math.min(a[1].x, this._cols.coordList.length - 1)), n = fl.call(this, a), r = pl.call(this, a), s = e(i) ? i.length != n.length || i[0].length != r.length ? yl(a, i) : i : _l(a, i), l.push({
                    range: a,
                    rowIds: n,
                    colIds: r,
                    values: s
                })
            }
            return l
        },
        _l = function (t, e) {
            for (var i = [], o = 0, s = t[0].y; s <= t[1].y; s++) {
                i.push([]);
                for (var n = t[0].x; n <= t[1].x; n++) i[o].push(e);
                o++
            }
            return i
        },
        yl = function (t, e) {
            for (var i = [], o = 0, s = 0, n = t[0].y; n <= t[1].y; n++) {
                i.push([]), s = 0;
                for (var r = t[0].x; r <= t[1].x; r++) {
                    var l = s % e[0].length,
                        h = o % e.length;
                    i[o].push(e[h][l]), s++
                }
                o++
            }
            return i
        };

    function vl(t, e) {
        for (var i = [], o = this._cols.store._lastId, s = 0; s < t; s++) o++, this._cols.store.push({
            id: o,
            field: void 0,
            title: void 0,
            width: this.colWidth,
            align: this.colAlign,
            _hide: !1,
            level: 0,
            parent_id: void 0,
            _role: "data"
        }), i.push(o);
        this._cols.store._lastId = o;
        for (var n = 0; n < this._rows.store.length; n++)
            for (s = 0; s < i.length; s++) this._cellStore[this._rows.store[n].id - 1][i[s] - 1] = {
                value: null
            };
        if (e) r = this._cols.indexList.indexOf(e) + 1;
        else var r = 0;
        this._cols.indexList.splice.apply(this._cols.indexList, [r, 0].concat(i));
        for (s = 0; s < i.length; s++) ii.call(this, 100, i[s]);
        return i
    }

    function ml(t, e) {
        for (var i = [], o = this._rows.store._lastId, s = 0; s < t; s++) o++, this._rows.store.push({
            id: o,
            title: void 0,
            _pass: !0
        }), i.push(o);
        this._rows.store._lastId = o;
        for (var n = 0; n < this._cols.store.length; n++)
            for (s = 0; s < i.length; s++) null == this._cellStore[i[s] - 1] && (this._cellStore[i[s] - 1] = []), this._cellStore[i[s] - 1][this._cols.store[n].id - 1] = {
                value: null
            };
        if (e) r = this._rows.indexList.indexOf(e) + 1;
        else var r = 0;
        return this._rows.indexList.splice.apply(this._rows.indexList, [r, 0].concat(i)), i
    }

    function xl(t) {
        for (var e = [], i = 0; i < t.length; i++) {
            this._cols.store[t[i] - 1]._deleted = !0;
            var o = this._cols.indexList.indexOf(t[i]);
            this._cols.indexList.splice(o, 1), e.push({
                id: t[i],
                index: o
            })
        }
        return e.reverse()
    }

    function wl(t) {
        for (var e = [], i = 0; i < t.length; i++) {
            this._rows.store[t[i] - 1]._deleted = !0;
            var o = this._rows.indexList.indexOf(t[i]);
            this._rows.indexList.splice(o, 1), e.push({
                id: t[i],
                index: o
            })
        }
        return e.reverse()
    }

    function Cl(t) {
        for (var e = 0; e < t.length; e++) delete this._cols.store[t[e].id - 1]._deleted, this._cols.indexList.splice(t[e].index, 0, t[e].id)
    }

    function bl(t) {
        for (var e = 0; e < t.length; e++) delete this._rows.store[t[e].id - 1]._deleted, this._rows.indexList.splice(t[e].index, 0, t[e].id)
    }

    function Sl(t) {
        for (var e = 0; e < t.rowIds.length; e++)
            for (var i = 0; i < t.colIds.length; i++)
                if (void 0 !== t.values[e][i]) {
                    var o = this._cellStore[t.rowIds[e] - 1][t.colIds[i] - 1];
                    o.value = t.values[e][i], o._found = !1
                }
    }

    function Il(t, e, i, o) {
        if (void 0 === i && (i = 0), null != t) {
            this._domNodes.cellEditor._isOpen && this.closeCellEditorAndSave();
            t = al.call(this, t);
            this._activeRangeIndex = Math.min(i, t.length - 1), this._cellCursorPosition = null == e ? t[this._activeRangeIndex].range[0] : Is.call(this, e), this._selection = t, this.constructor.contextMenu.isOpen() && this.constructor.contextMenu._context == this || kn.call(this), this.constructor._isTouchDevice || wi.call(this), this.activate(), this.events.dispatch("setselection", {
                selection: this._selection,
                cellCursorPosition: this._cellCursorPosition,
                _activeRangeIndex: this._activeRangeIndex
            })
        }
    }

    function Rl(t, e) {
        if (void 0 === t && (t = null), void 0 === e && (e = "xy"), null == t) return {
            x: 0,
            y: 0
        };
        var i = this._viewportPosition.x + (this._colView.length - 1);
        this._colViewOverflow > 0 && (i -= 1);
        var o = this._viewportPosition.y + (this._rowView.length - 1);
        if (this._rowViewOverflow > 0 && (o -= 1), t.x < this._viewportPosition.x) var s = t.x - this._viewportPosition.x;
        else if (t.x > i) s = t.x - i;
        if (t.y < this._viewportPosition.y) var n = t.y - this._viewportPosition.y;
        else if (t.y > o) n = t.y - o;
        return {
            x: ("xy" == e || "x" == e) && s || 0,
            y: ("xy" == e || "y" == e) && n || 0
        }
    }

    function Ll(t) {
        var e = {
                x: this._viewportPosition.x,
                y: this._viewportPosition.y
            },
            i = Rl.call(this, t);
        t.x >= this._panesXids.left.length && (e.x += i.x), t.y >= this._panesYids.top.length && (e.y += i.y), tn.call(this, e)
    }

    function Pl(t) {
        if (null != t && t.selection.length) {
            for (var e = [], i = 0; i < t.selection.length; i++) {
                var o = {
                    type: t.selection[i].type,
                    range: t.selection[i].range
                };
                e.push(o)
            }
            Il.call(this, e, t.cellCursorPosition, t.activeRangeIndex), Ll.call(this, this._cellCursorPosition)
        }
    }

    function Nl() {
        null != this.constructor._clipboardObject && Ki.call(this.constructor._clipboardObject.instance, this.constructor._clipboardObject.type, null)
    }

    function kl() {
        this._domNodes.component.style.width = this._cd.componentWidth + "px", this._domNodes.component.style.height = this._cd.componentHeight + "px", this._domNodes.display.style.width = this._cd.displayWidth + "px", this._domNodes.display.style.height = this._cd.displayHeight + "px", this._domNodes.viewport.style.width = this._cd.viewportWidth + "px", this._domNodes.viewport.style.height = this._cd.viewportHeight + "px", this._domNodes.eventArea.style.width = this._cd.scrollAreaWidth + "px", this._domNodes.eventArea.style.height = this._cd.scrollAreaHeight + "px", this._domNodes.scrollArea.style.width = this._cd.scrollAreaWidth + "px", this._domNodes.scrollArea.style.height = this._cd.scrollAreaHeight + "px", this._domNodes.scrollSurface.style.width = this._cd.scrollWidth + "px", this._domNodes.scrollSurface.style.height = this._cd.scrollHeight + "px", this._domNodes.actionRangesContainer.style.width = this._cd.viewportWidth + "px", this._domNodes.actionRangesContainer.style.height = this._cd.viewportHeight + "px", this._domNodes.panes.style.height = this._cd.viewportHeight + "px", this._domNodes.panes.style.width = this._cd.viewportWidth + "px", this._domNodes["pane-left"].style.height = this._cd.viewportHeight + "px", this._domNodes["pane-left"].style.width = this._cd.panesX.left.space + "px", this._domNodes["pane-center"].style.left = this._cd.panesX.center.offset + "px", this._domNodes["pane-center"].style.height = this._cd.viewportHeight + "px", this._domNodes["pane-center"].style.width = this._cd.panesX.center.space + "px", this._domNodes.hintsContainer.style.width = this._cd.viewportWidth + "px", this._domNodes.hintsContainer.style.height = this._cd.viewportHeight + "px", Ml.call(this), Bl.call(this), Hl.call(this), zl.call(this), Al.call(this), Tl.call(this), Fl.call(this), El.call(this)
    }
    var Hl = function () {
            P(this._domNodes.ghostsContainer, {
                width: this._cd.viewportWidth + "px",
                height: this._cd.viewportHeight + "px"
            }), P(this._domNodes.guidesContainer, {
                width: this._cd.viewportWidth + "px",
                height: this._cd.viewportHeight + "px"
            })
        },
        zl = function () {
            this._domNodes.colHeaderBackground.style.width = this._cd.viewportWidth + "px"
        },
        Al = function () {
            this._domNodes.rowHeaderBackground.style.height = this._cd.viewportHeight + "px"
        },
        Tl = function () {
            this._domNodes.gridLines.style.width = this._cd.viewportWidth + "px", this._domNodes.gridLines.style.height = this._cd.viewportHeight + "px", this._domNodes.rowLines.style.width = this._cd.viewportWidth + "px", this._domNodes.colLines.style.height = this._cd.viewportHeight + "px"
        },
        Fl = function () {
            this._domNodes.backgrounds.style.height = this._cd.viewportHeight + "px", this._domNodes.backgrounds.style.width = this._cd.viewportWidth + "px", P(this._domNodes.background["top-left"], {
                width: this._cd.panesX.left.space - this._cd.rowHeaderSpace + "px",
                height: this._cd.panesY.top.space - this._cd.colHeaderSpace + "px"
            }), P(this._domNodes.background["top-center"], {
                width: this._cd.panesX.center.space + "px",
                height: this._cd.panesY.top.space - this._cd.colHeaderSpace + "px",
                left: this._cd.panesX.center.offset + "px"
            }), P(this._domNodes.background["center-left"], {
                width: this._cd.panesX.left.space - this._cd.rowHeaderSpace + "px",
                height: this._cd.panesY.center.space + "px",
                top: this._cd.panesY.center.offset + "px"
            }), P(this._domNodes.background["center-center"], {
                width: this._cd.panesX.center.space + "px",
                height: this._cd.panesY.center.space + "px",
                top: this._cd.panesY.center.offset + "px",
                left: this._cd.panesX.center.offset + "px"
            })
        },
        El = function () {
            for (var t in this._domNodes.canvas) {
                var e = t.split("-"),
                    i = e[0],
                    o = e[1],
                    s = this._cd.panesX[o].space,
                    n = this._cd.panesY[i].space,
                    r = 1 * Math.ceil(s / 1),
                    l = Math.ceil(n / this.rowHeight) * this.rowHeight,
                    h = this._domNodes.canvas[t];
                h.style.width = r + "px", h.style.height = l + "px", h._displayWidth = r, h._displayHeight = l, h._drawWidth = h._displayWidth / 1, h._drawHeight = h._displayHeight / this.rowHeight, h.width = h._drawWidth, h.height = h._drawHeight
            }
        },
        Ml = function () {
            this._domNodes.rowHeaderColumn.style.height = this._cd.viewportHeight + "px", this._domNodes["column-center"].style.top = this._cd.panesY.center.offset - this._cd.colHeaderSpace + "px", this._domNodes["column-center"].style.height = this._cd.panesY.center.space + "px";
            for (var t = 0; t < this._columnNodes.length; t++) this._columnNodes[t].column.style.height = this._cd.viewportHeight + "px", this._columnNodes[t]["column-top"].style.height = this._cd.panesY.top.outer - this._cd.colHeaderSpace + "px", this._columnNodes[t]["column-center"].style.height = this._cd.panesY.center.space + "px"
        },
        Bl = function () {
            this._domNodes.freezeLines.style.height = this._cd.viewportHeight + "px", this._domNodes.freezeLines.style.width = this._cd.viewportWidth + "px", this._domNodes.placeholderFreezeLines.style.height = this._cd.viewportHeight + "px", this._domNodes.placeholderFreezeLines.style.width = this._cd.viewportWidth + "px", null == this._freezeLineRowAfterId ? P(this._domNodes["freezeLine-row"], {
                top: this._cd.panesY.center.offset - 6 + "px",
                "background-color": "transparent",
                opacity: 1
            }) : P(this._domNodes["freezeLine-row"], {
                top: this._cd.panesY.top.space + "px",
                "background-color": this.getThemeSetting("freezeline"),
                opacity: this._sectionsPerPaneY.top.length ? 1 : 0
            }), null == this._freezeLineColAfterId ? P(this._domNodes["freezeLine-col"], {
                left: this._cd.panesX.center.offset - 6 + "px",
                "background-color": "transparent",
                opacity: 1
            }) : P(this._domNodes["freezeLine-col"], {
                left: this._cd.panesX.left.space + "px",
                "background-color": this.getThemeSetting("freezeline"),
                opacity: this._sectionsPerPaneX.left.length ? 1 : 0
            })
        };

    function Ol(t) {
        var e = [],
            i = -1;
        if (t = t.toLowerCase()) {
            for (var o = 0; o < this._rows.coordList.length; o++)
                for (var s = 0; s < this._cols.coordList.length; s++) {
                    var n = this._cellStore[this._rows.coordList[o] - 1][this._cols.coordList[s] - 1];
                    null != n.value && String(n.value).toLowerCase().indexOf(t) > -1 && (n._found = t, e.push([this._rows.coordList[o], this._cols.coordList[s]]))
                }
            e.length && (i = 0)
        }
        this._searchStr = t, this._searchCellsFound = e, this._searchCellIndex = i
    }

    function Dl(t) {
        var e = this;
        if (void 0 === t && (t = ""), w.call(this), x.call(this), t.endsWith("Cols"))
            for (var i = 0; i < this._cols.indexList.length; i++) {
                var o = this._cols.indexList[i];
                this._columnNodes[o - 1].columnHeaderLabel.innerHTML = Je.call(this, o)
            }
        var s = !1,
            n = !1;
        ("hideCols" == t && this._viewportPosition.x == this._panesXids.left.length || "freezeCols" == t) && (s = !0), ("hideRows" == t && this._viewportPosition.y == this._panesYids.top.length || "freezeRows" == t) && (n = !0), Bt.call(this), Vt.call(this, s, n), Nl.call(this), kl.call(this), "search" != t && this._searchStr && Ol.call(this, this._searchStr);
        for (i = 0; i < this._validatedTopBar.length; i++) "update" in this._validatedTopBar[i] && this._validatedTopBar[i].update.call(this, this._topBarNodes[i].nodes);
        for (i = 0; i < this._validatedBottomBar.length; i++) "update" in this._validatedBottomBar[i] && this._validatedBottomBar[i].update.call(this, this._bottomBarNodes[i].nodes);
        setTimeout((function () {
            $s.call(e)
        }), 0)
    }

    function Vl(t, e, i) {
        void 0 === e && (e = !0), void 0 === i && (i = function () {});
        var o, s = Ur.call(this),
            n = [],
            r = [],
            l = [],
            h = [],
            a = [],
            c = function (t, e, i, s) {
                if (void 0 === t && (t = "do"), void 0 === i && (i = function () {}), void 0 === s && (s = null), this.events.dispatch("beforesetcellvalues", e)) {
                    Nl.call(this), "do" == t ? (r = Xl.call(this, e), l = Yl.call(this, e), (r.length || l.length) && Dl.call(this, "insertEmptyItems")) : "undo" == t ? (r.length && (h = xl.call(this, r)), l.length && (a = wl.call(this, l))) : "redo" == t && (h.length && Cl.call(this, h), a.length && bl.call(this, a), (r.length || l.length) && Dl.call(this, "insertEmptyItems")), i.call(this), null != s && (o = Ur.call(this));
                    var c = 0,
                        d = function () {
                            var t = performance.now(),
                                i = [],
                                o = e.colIds,
                                r = [];
                            if (null != s)
                                do {
                                    i.push(e.rowIds[c]), r.push(e.values[c]);
                                    for (var l = [], h = 0; h < o.length; h++) l.push(this._cellStore[e.rowIds[c] - 1][o[h] - 1].value || null);
                                    n.push(l), c++
                                } while (c <= e.rowIds.length - 1 && performance.now() - t < 25);
                            else
                                do {
                                    i.push(e.rowIds[c]), r.push(e.values[c]), c++
                                } while (c <= e.rowIds.length - 1 && performance.now() - t < 25);
                            Sl.call(this, {
                                rowIds: i,
                                colIds: o,
                                values: r
                            }), Dl.call(this, "setCellValues"), this.redraw(), c < e.rowIds.length - 1 ? setTimeout(d, 75) : (this.events.dispatch("setcellvalues", e), null != s && s.call(this))
                        }.bind(this);
                    d()
                }
            };
        if (e) var d = function () {
            var e = go(t);
            e.values = n, this.undoManager.add({
                desc: "setCellValues",
                undo: function () {
                    c.call(this, "undo", e, (function () {
                        Pl.call(this, s)
                    }))
                },
                redo: function () {
                    c.call(this, "redo", t, (function () {
                        Pl.call(this, o)
                    }))
                }
            })
        };
        else d = null;
        c.call(this, "do", t, i, d)
    }
    var Xl = function (t) {
            for (var e = 0, i = 0; i < t.colIds.length; i++) null == this.getColFromStore(t.colIds[i]) && e++;
            if (e) var o = vl.call(this, e, this._cols.coordList[this._cols.coordList.length - 1]);
            return o || []
        },
        Yl = function (t) {
            for (var e = 0, i = 0; i < t.rowIds.length; i++) null == this.getRowFromStore(t.rowIds[i]) && e++;
            if (e) var o = ml.call(this, e, this._rows.coordList[this._rows.coordList.length - 1]);
            return o || []
        };

    function Wl(t, e, i, o) {
        if (void 0 === t && (t = null), void 0 === e && (e = null), void 0 === i && (i = !1), void 0 === o && (o = !1), null != t) {
            var s = al.call(this, cl(t));
            if (o) var n = this.constructor._clipboardObject.cellRange,
                r = ul.call(this, s, e, i, n);
            else r = ul.call(this, s, e, i);
            if (i) var l = function () {
                Il.call(this, r.selection)
            };
            else l = function () {};
            Vl.call(this, r, !0, l)
        }
    }

    function Kl(t, e, i) {
        Ki.call(this, "fill", null);
        var o = this.getCellRangeData(t),
            n = [];
        if ("right" == e)
            for (var r = 0; r < o.length; r++) n.push({
                series: o[r]
            });
        else if ("left" == e)
            for (r = 0; r < o.length; r++) n.push({
                series: o[r].reverse()
            });
        else if ("down" == e)
            for (var l = 0; l < o[0].length; l++) {
                for (var h = [], a = 0; a < o.length; a++) h.push(o[a][l]);
                n.push({
                    series: h
                })
            } else if ("up" == e)
                for (l = 0; l < o[0].length; l++) {
                    for (h = [], a = 0; a < o.length; a++) h.push(o[a][l]);
                    n.push({
                        series: h.reverse()
                    })
                }
        if (jl(n), "right" == e) var c = [{
            x: t[1].x + 1,
            y: t[0].y
        }, {
            x: Math.min(this._cols.coordList.length - 1, t[1].x + i),
            y: t[1].y
        }];
        else if ("left" == e) c = [{
            x: Math.max(0, t[0].x - i),
            y: t[0].y
        }, {
            x: t[0].x - 1,
            y: t[1].y
        }];
        else if ("down" == e) c = [{
            x: t[0].x,
            y: t[1].y + 1
        }, {
            x: t[1].x,
            y: Math.min(this._rows.coordList.length - 1, t[1].y + i)
        }];
        else if ("up" == e) c = [{
            x: t[0].x,
            y: Math.max(0, t[0].y - i)
        }, {
            x: t[1].x,
            y: t[0].y - 1
        }];
        var d = c[1].y - c[0].y + 1,
            u = c[1].x - c[0].x + 1,
            p = [];
        if ("right" == e)
            for (a = 0; a < d; a++) {
                p.push([]);
                for (l = 0; l < u; l++) {
                    var f = 1 + Math.floor(l / n[a].groups.length),
                        g = l % n[a].groups.length;
                    if (s(n[a].groups[g])) {
                        var _ = g - n[a].groups[g].startIndex + n[a].groups[g].size * f,
                            y = n[a].groups[g].base + _ * n[a].groups[g].increment;
                        y = Math.round(100 * y) / 100, p[a].push(y)
                    } else p[a].push(n[a].groups[g])
                }
            } else if ("left" == e)
                for (a = 0; a < d; a++) {
                    p.push([]);
                    for (l = 0; l < u; l++) {
                        f = 1 + Math.floor(l / n[a].groups.length), g = l % n[a].groups.length;
                        if (s(n[a].groups[g])) {
                            _ = g - n[a].groups[g].startIndex + n[a].groups[g].size * f, y = n[a].groups[g].base + _ * n[a].groups[g].increment;
                            y = Math.round(100 * y) / 100, p[a].unshift(y)
                        } else p[a].unshift(n[a].groups[g])
                    }
                } else if ("down" == e)
                    for (a = 0; a < d; a++) {
                        p.push([]);
                        for (l = 0; l < u; l++) {
                            f = 1 + Math.floor(a / n[l].groups.length), g = a % n[l].groups.length;
                            if (s(n[l].groups[g])) {
                                _ = g - n[l].groups[g].startIndex + n[l].groups[g].size * f, y = n[l].groups[g].base + _ * n[l].groups[g].increment;
                                y = Math.round(100 * y) / 100, p[a].push(y)
                            } else p[a].push(n[l].groups[g])
                        }
                    } else if ("up" == e)
                        for (a = 0; a < d; a++) {
                            p.unshift([]);
                            for (l = 0; l < u; l++) {
                                f = 1 + Math.floor(a / n[l].groups.length), g = a % n[l].groups.length;
                                if (s(n[l].groups[g])) {
                                    _ = g - n[l].groups[g].startIndex + n[l].groups[g].size * f, y = n[l].groups[g].base + _ * n[l].groups[g].increment;
                                    y = Math.round(100 * y / 100), p[0].push(y)
                                } else p[0].push(n[l].groups[g])
                            }
                        }
        var v = [{
                type: "cell",
                range: c
            }],
            m = ul.call(this, v, p, !1);
        Vl.call(this, m, !0, (function () {
            if (Io(this._cellCursorPosition, t)) var e = this._cellCursorPosition;
            else e = null;
            var i, o;
            Il.call(this, [{
                type: "cell",
                range: (i = t, o = m.selection[0].range, [{
                    x: Math.min(i[0].x, i[1].x, o[0].x, o[1].x),
                    y: Math.min(i[0].y, i[1].y, o[0].y, o[1].y)
                }, {
                    x: Math.max(i[0].x, i[1].x, o[0].x, o[1].x),
                    y: Math.max(i[0].y, i[1].y, o[0].y, o[1].y)
                }])
            }], e)
        }))
    }
    var jl = function (t) {
        for (var e = 0; e < t.length; e++) t[e].groups = i(t[e].series);

        function i(t) {
            for (var e, i, s, n = [], r = null, l = 0; l < t.length; l++) e = "" !== (s = t[l]) && null !== s && !isNaN(s) && isFinite(s) && Math.floor(s) === Number(s) ? "number" : "string", null == r ? i = [t[l]] : e == r ? i.push(t[l]) : ("number" == r && i.length && (i = o(i, l - i.length)), Array.prototype.push.apply(n, i), i = [t[l]]), r = e;
            return i.length && ("number" == r && i.length && (i = o(i, l - i.length)), Array.prototype.push.apply(n, i)), n
        }

        function o(t, e) {
            for (var i = null, o = null, s = 0; s < t.length - 1; s++) {
                if (i = t[s + 1] - t[s], s > 0 && i != o) {
                    i = null;
                    break
                }
                o = i
            }
            if (null != i) {
                var n = {
                        base: Number(t[0]),
                        increment: i,
                        startIndex: e,
                        size: t.length
                    },
                    r = [];
                for (s = 0; s < t.length; s++) r.push(n)
            }
            return r || t
        }
    };

    function Ul(t) {
        var o;
        i(t) ? o = t : e(t) ? o = [t] : d(t) && (o = [
            [t, t]
        ]);
        for (var s = [], n = 0; n < o.length; n++) s.push({
            range: ir.call(this, o[n]),
            type: "col"
        });
        return s
    }

    function ql(t) {
        var e = this;
        if (void 0 === t && (t = null), null == t) return [];
        for (var i = al.call(this, Ul.call(this, t)), o = new Set, s = 0; s < i.length; s++)
            for (var n = this.getColIndexByCoord(i[s].range[0].x), r = this.getColIndexByCoord(i[s].range[1].x), l = n; l <= r; l++) o.add(this._cols.indexList[l]);
        return Array.from(o).sort((function (t, i) {
            return e._cols.indexList.indexOf(t) - e._cols.indexList.indexOf(i)
        }))
    }

    function Gl(t) {
        void 0 === t && (t = null), this.deleteColsById(ql.call(this, t))
    }

    function Zl(t) {
        void 0 === t && (t = 1), t = $o(t, 0, this._cols.indexList.length - 1), this.freezeColsUntilId(this.getColIdByIndex(t - 1))
    }

    function $l(t) {
        void 0 === t && (t = null), this.hideColsById(ql.call(this, t))
    }

    function Ql(t) {
        for (var e = [], i = 0; i < t.length; i++) e.push(t[i]);
        return e
    }

    function Jl(t, e, i, o) {
        void 0 === i && (i = !0), void 0 === o && (o = function () {});
        var s = {
            amount: t,
            targetId: e
        };
        if (this.events.dispatch("beforeinsertcols", s)) {
            var n = Ur.call(this),
                r = vl.call(this, s.amount, s.targetId);
            Dl.call(this, "insertEmptyCols"), o.call(this, r), this.redraw();
            var l, h = Ur.call(this);
            i && this.undoManager.add({
                desc: "insertCols",
                undo: function () {
                    l = xl.call(this, r), Dl.call(this, "deleteCols"), Pl.call(this, n), this.redraw()
                },
                redo: function () {
                    Cl.call(this, l), Dl.call(this, "restoreDeletedCols"), Pl.call(this, h), this.redraw()
                }
            }), s.insertedIds = Ql(r), this.events.dispatch("insertcols", s)
        }
    }

    function th(t) {
        e(t) || (t = [t, t]);
        var i = t[0],
            o = t[t.length - 1];
        return [this._cols.coordList.indexOf(i), this._cols.coordList.indexOf(o)]
    }

    function eh(t, e) {
        if (void 0 === t && (t = 1), void 0 === e && (e = this._cols.coordList.length), 0 == (e = $o(e, 0, this._cols.coordList.length))) var i = 0;
        else i = this._cols.coordList[Math.min(this._cols.coordList.length, e) - 1];
        Jl.call(this, t, i, !0, (function (t) {
            this.setColSelection(th.call(this, t))
        }))
    }

    function ih(t, e) {
        void 0 === t && (t = "rows");
        for (var i, o = [], s = 0; s < e.length; s++) o.push(this["_" + t].coordList.indexOf(e[s]));
        o.sort();
        var n = [],
            r = [];
        for (s = 0; s < o.length; s++) o[s] == i + 1 || 0 == s ? r.push(o[s]) : (n.push(r), r = [o[s]]), i = o[s];
        return n.push(r), n
    }

    function oh(t) {
        for (var e = [], i = 0; i < t.length; i++) e.push([t[i][0], t[i][t[i].length - 1]]);
        return e
    }

    function sh(t) {
        for (var e = [], i = 0; i < t.length; i++) {
            var o = this._cols.indexList.indexOf(t[i].id);
            if (e.push({
                    id: t[i].id,
                    afterId: this._cols.indexList[o - 1] || null
                }), this._cols.indexList.splice(o, 1), t[i].afterId) s = this._cols.indexList.indexOf(t[i].afterId) + 1;
            else var s = 0;
            this._cols.indexList.splice(s, 0, t[i].id)
        }
        return e.reverse()
    }

    function nh(t, e, i, o) {
        void 0 === i && (i = !0), void 0 === o && (o = function () {});
        var s = {
            colIds: t,
            targetId: e
        };
        if (this.events.dispatch("beforemovecols", s)) {
            var n, r = rh(s.colIds, s.targetId),
                l = Ur.call(this);
            n = sh.call(this, r), Dl.call(this, "moveCols"), o.call(this), this.redraw();
            var h = Ur.call(this);
            i && this.undoManager.add({
                desc: "moveCols",
                undo: function () {
                    sh.call(this, n), Dl.call(this, "moveCols"), Pl.call(this, l), this.redraw()
                },
                redo: function () {
                    sh.call(this, r), Dl.call(this, "moveCols"), Pl.call(this, h), this.redraw()
                }
            }), this.events.dispatch("movecols", s)
        }
    }
    var rh = function (t, e) {
        for (var i = [], o = 0; o < t.length; o++) i.push({
            id: t[o],
            afterId: e
        });
        return i.reverse()
    };

    function lh(t, e) {
        if (void 0 === t && (t = null), void 0 === e && (e = null), null != t && null != e) {
            var i = ql.call(this, t);
            if (e = $o(e, 0, this._cols.coordList.length), hh.call(this, i, e)) {
                if (0 == e) var o = 0;
                else o = this._cols.coordList[e - 1];
                i.indexOf(o) > -1 || nh.call(this, i, o, !0, (function () {
                    this.setColSelection(oh(ih.call(this, "cols", i)))
                }))
            } else this.alertUser("Cannot move columns in or out of the frozen section. Try turning off frozen columns first.")
        }
    }
    var hh = function (t, e) {
        if (this.getColCoordById(t[0]) == e) return !0;
        for (var i = !0, o = 0; o < t.length; o++) this._cols.coordSections[0].indexOf(t[o]) > -1 && (i = !1);
        return e < this._cols.coordSections[0].length && (i = !1), i
    };

    function ah(t, e) {
        for (var i = 0; i < t.length; i++) this._columnNodes[t[i] - 1].column.style.width = e[i] + "px"
    }

    function ch(t, e) {
        for (var i = 0; i < t.length; i++) void 0 !== e[i] && (this._cols.store[t[i] - 1].width = 1 * Math.round(Math.max(e[i], 32) / 1));
        ah.call(this, t, e)
    }

    function dh(t, e, i, o) {
        void 0 === i && (i = !0), void 0 === o && (o = function () {});
        var s = {
            colIds: t,
            widths: e
        };
        if (this.events.dispatch("beforeresizecols", s)) {
            for (var n = Ur.call(this), r = [], l = 0; l < s.colIds.length; l++) r.push(this._cols.store[s.colIds[l] - 1].width);
            ch.call(this, s.colIds, s.widths), Dl.call(this, "resizeCols"), o.call(this), this.redraw();
            var h = Ur.call(this);
            i && this.undoManager.add({
                desc: "resizeCols",
                undo: function () {
                    ch.call(this, s.colIds, r), Dl.call(this, "resizeCols"), Pl.call(this, n), this.redraw()
                },
                redo: function () {
                    ch.call(this, s.colIds, s.widths), Dl.call(this, "resizeCols"), Pl.call(this, h), this.redraw()
                }
            }), this.events.dispatch("resizecols", s)
        }
    }

    function uh(t, e) {
        if (void 0 === t && (t = null), void 0 === e && (e = null), null != t && null != e) {
            for (var i = ql.call(this, t), o = [], s = 2 * Math.round(Math.max(Math.round(e), 32) / 2), n = 0; n < i.length; n++) o.push(s);
            dh.call(this, i, o, !0)
        }
    }

    function ph(t) {
        if (void 0 === t && (t = null), null != t) {
            for (var e = ql.call(this, t), i = [], o = 0; o < e.length; o++) {
                for (var s, n = 0, r = 0; r < this._rows.coordList.length; r++)
                    if (null != (s = this._cellStore[this.getRowIdByCoord(r) - 1][e[o] - 1].value)) {
                        var l = String(s).replace(/\n/g, "↵").replace(/\t/g, " "),
                            h = this._textWidthMeterCanvasContext.measureText(l).width;
                        h > n && (n = h)
                    } n += 12;
                var a = 2 * Math.round(Math.max(Math.round(n), 32) / 2);
                i.push(a)
            }
            dh.call(this, e, i, !0)
        }
    }

    function fh(t, e, i) {
        void 0 === e && (e = !0), void 0 === i && (i = function () {});
        var o = {
            colIds: t
        };
        if (this.events.dispatch("beforedeletecols", o)) {
            var s = this._freezeLineColAfterId,
                n = Ur.call(this),
                r = xl.call(this, o.colIds);
            gh.call(this), Dl.call(this, "deleteCols"), i.call(this), this.redraw();
            var l = Ur.call(this);
            e && this.undoManager.add({
                desc: "deleteCols",
                undo: function () {
                    Cl.call(this, r), _h.call(this, s), Dl.call(this, "restoreDeletedCols"), Pl.call(this, n), this.redraw()
                },
                redo: function () {
                    xl.call(this, o.colIds), gh.call(this), Dl.call(this, "deleteCols"), Pl.call(this, l), this.redraw()
                }
            }), this.events.dispatch("deletecols", o)
        }
    }
    var gh = function () {
            if (this._freezeLineColAfterId && -1 == this.getColIndexById(this._freezeLineColAfterId)) {
                for (var t = null, e = this._cols.coordSections[0].slice(0, -1).reverse(); e.length;) {
                    var i = e.shift();
                    if (this.getColIndexById(i) > -1) {
                        t = i;
                        break
                    }
                }
                this._freezeLineColAfterId = t
            }
        },
        _h = function (t) {
            this._freezeLineColAfterId = t
        };

    function yh(t, e) {
        void 0 === t && (t = "rows");
        for (var i = ih.call(this, t, e), o = new Set, s = 0; s < i.length; s++) {
            var n = i[s][i[s].length - 1];
            n + 1 > this["_" + t].coordList.length - 1 ? o.add(this["_" + t].coordList[n - 1]) : o.add(this["_" + t].coordList[n + 1])
        }
        return Array.from(o)
    }

    function vh(t) {
        if (t.length != this._cols.coordList.length)
            if (JSON.stringify(t) != JSON.stringify(this._cols.indexSections[1])) {
                var e = yh.call(this, "cols", t);
                fh.call(this, t, !0, (function () {
                    for (var t = [], i = 0; i < e.length; i++) t.push({
                        range: [{
                            x: this.getColCoordById(e[i]),
                            y: 0
                        }, {
                            x: this.getColCoordById(e[i]),
                            y: this._rows.coordList.length - 1
                        }],
                        type: "col"
                    });
                    Il.call(this, t)
                }))
            } else this.alertUser("Cannot delete all non-frozen columns.");
        else this.alertUser("Cannot delete all columns.")
    }

    function mh(t) {
        this._preventFrozenCols || (this._freezeLineColAfterId = t)
    }

    function xh(t, e, i) {
        void 0 === e && (e = !0), void 0 === i && (i = function () {});
        var o = {
            colId: t
        };
        if (this.events.dispatch("beforefreezecols", o)) {
            var s = this._freezeLineColAfterId,
                n = Ur.call(this);
            mh.call(this, o.colId), Dl.call(this, "freezeCols"), i.call(this), this.redraw();
            var r = Ur.call(this);
            e && this.undoManager.add({
                desc: "freezeCols",
                undo: function () {
                    mh.call(this, s), Dl.call(this, "freezeCols"), Pl.call(this, n), this.redraw()
                },
                redo: function () {
                    mh.call(this, o.colId), Dl.call(this, "freezeCols"), Pl.call(this, r), this.redraw()
                }
            }), this.events.dispatch("freezecols", o)
        }
    }

    function wh(t) {
        void 0 === t && (t = null), xh.call(this, t, !0)
    }

    function Ch(t) {
        for (var e = 0; e < t.length; e++) this._cols.store[t[e] - 1]._hide = !0
    }

    function bh(t) {
        for (var e = 0; e < t.length; e++) this._cols.store[t[e] - 1]._hide = !1
    }

    function Sh(t, e, i) {
        void 0 === e && (e = !0), void 0 === i && (i = function () {});
        var o = {
            colIds: t
        };
        if (this.events.dispatch("beforehidecols", o)) {
            var s = Ur.call(this);
            Ch.call(this, o.colIds), Dl.call(this, "hideCols"), i.call(this), this.redraw();
            var n = Ur.call(this);
            e && this.undoManager.add({
                desc: "hideCols",
                undo: function () {
                    bh.call(this, o.colIds), Dl.call(this, "showCols"), Pl.call(this, s), this.redraw()
                },
                redo: function () {
                    Ch.call(this, o.colIds), Dl.call(this, "hideCols"), Pl.call(this, n), this.redraw()
                }
            }), this.events.dispatch("hidecols", o)
        }
    }

    function Ih(t) {
        if (t.length != this._cols.coordList.length) {
            var e = yh.call(this, "cols", t);
            Sh.call(this, t, !0, (function () {
                for (var t = [], i = 0; i < e.length; i++) t.push({
                    range: [{
                        x: this.getColCoordById(e[i]),
                        y: 0
                    }, {
                        x: this.getColCoordById(e[i]),
                        y: this._rows.coordList.length - 1
                    }],
                    type: "col"
                });
                Il.call(this, t)
            }))
        } else this.alertUser("Cannot hide all columns.")
    }

    function Rh(t, e, i) {
        void 0 === e && (e = !0), void 0 === i && (i = function () {});
        var o = {
            colIds: t
        };
        if (this.events.dispatch("beforeshowcols", o)) {
            var s = Ur.call(this);
            bh.call(this, o.colIds), Dl.call(this, "showCols"), i.call(this), this.redraw();
            var n = Ur.call(this);
            e && this.undoManager.add({
                desc: "showCols",
                undo: function () {
                    Ch.call(this, o.colIds), Dl.call(this, "hideCols"), Pl.call(this, s), this.redraw()
                },
                redo: function () {
                    bh.call(this, o.colIds), Dl.call(this, "showCols"), Pl.call(this, n), this.redraw()
                }
            }), this.events.dispatch("showcols", o)
        }
    }

    function Lh(t) {
        Rh.call(this, t, !0, (function () {
            this.setColSelection(oh(ih.call(this, "cols", t)))
        }))
    }

    function Ph(t) {
        var o;
        i(t) ? o = t : e(t) ? o = [t] : d(t) && (o = [
            [t, t]
        ]);
        for (var s = [], n = 0; n < o.length; n++) s.push({
            range: or.call(this, o[n]),
            type: "row"
        });
        return s
    }

    function Nh(t) {
        var e = this;
        if (void 0 === t && (t = null), null == t) return [];
        for (var i = al.call(this, Ph.call(this, t)), o = new Set, s = 0; s < i.length; s++)
            for (var n = this.getRowIndexByCoord(i[s].range[0].y), r = this.getRowIndexByCoord(i[s].range[1].y), l = n; l <= r; l++) o.add(this._rows.indexList[l]);
        return Array.from(o).sort((function (t, i) {
            return e._rows.indexList.indexOf(t) - e._rows.indexList.indexOf(i)
        }))
    }

    function kh(t) {
        void 0 === t && (t = null), this.deleteRowsById(Nh.call(this, t))
    }

    function Hh(t) {
        void 0 === t && (t = 1), t = $o(t, 0, this._rows.indexList.length - 1), this.freezeRowsUntilId(this.getRowIdByIndex(t - 1))
    }

    function zh(t) {
        this.hideRowsById(Nh.call(this, t))
    }

    function Ah(t, e, i, o) {
        void 0 === i && (i = !0), void 0 === o && (o = function () {});
        var s = {
            amount: t,
            targetId: e
        };
        if (this.events.dispatch("beforeinsertrows", s)) {
            var n = Ur.call(this),
                r = ml.call(this, s.amount, s.targetId);
            Dl.call(this, "insertEmptyRows"), o.call(this, r), this.redraw();
            var l, h = Ur.call(this);
            i && this.undoManager.add({
                desc: "insertRows",
                undo: function () {
                    l = wl.call(this, r), Dl.call(this, "deleteRows"), Pl.call(this, n), this.redraw()
                },
                redo: function () {
                    bl.call(this, l), Dl.call(this, "restoreDeletedRows"), Pl.call(this, h), this.redraw()
                }
            }), s.insertedIds = Ql(r), this.events.dispatch("insertrows", s)
        }
    }

    function Th(t) {
        e(t) || (t = [t, t]);
        var i = t[0],
            o = t[t.length - 1];
        return [this._rows.coordList.indexOf(i), this._rows.coordList.indexOf(o)]
    }

    function Fh(t, e) {
        if (void 0 === t && (t = 1), void 0 === e && (e = this._rows.coordList.length), 0 == (e = $o(e, 0, this._rows.coordList.length))) var i = 0;
        else i = this._rows.coordList[e - 1];
        Ah.call(this, t, i, !0, (function (t) {
            this.setRowSelection(Th.call(this, t))
        }))
    }

    function Eh(t) {
        for (var e = [], i = 0; i < t.length; i++) {
            var o = this._rows.indexList.indexOf(t[i].id);
            if (e.push({
                    id: t[i].id,
                    afterId: this._rows.indexList[o - 1] || null
                }), this._rows.indexList.splice(o, 1), t[i].afterId) s = this._rows.indexList.indexOf(t[i].afterId) + 1;
            else var s = 0;
            this._rows.indexList.splice(s, 0, t[i].id)
        }
        return e.reverse()
    }

    function Mh(t, e, i, o) {
        void 0 === i && (i = !0), void 0 === o && (o = function () {});
        var s = {
            rowIds: t,
            targetId: e
        };
        if (this.events.dispatch("beforemoverows", s)) {
            var n, r = Bh(s.rowIds, s.targetId),
                l = Ur.call(this);
            n = Eh.call(this, r), Dl.call(this, "moveRows"), o.call(this), this.redraw();
            var h = Ur.call(this);
            i && this.undoManager.add({
                desc: "moveRows",
                undo: function () {
                    Eh.call(this, n), Dl.call(this, "moveRows"), Pl.call(this, l), this.redraw()
                },
                redo: function () {
                    Eh.call(this, r), Dl.call(this, "moveRows"), Pl.call(this, h), this.redraw()
                }
            }), this.events.dispatch("moverows", s)
        }
    }
    var Bh = function (t, e) {
        for (var i = [], o = 0; o < t.length; o++) i.push({
            id: t[o],
            afterId: e
        });
        return i.reverse()
    };

    function Oh(t, e) {
        if (void 0 === t && (t = null), void 0 === e && (e = null), null != t && null != e) {
            var i = Nh.call(this, t);
            if (e = $o(e, 0, this._rows.coordList.length), Dh.call(this, i, e)) {
                if (0 == e) var o = 0;
                else o = this._rows.coordList[e - 1];
                i.indexOf(o) > -1 || Mh.call(this, i, o, !0, (function () {
                    this.setRowSelection(oh(ih.call(this, "rows", i)))
                }))
            } else this.alertUser("Cannot move rows in or out of the frozen section. Try turning off frozen rows first.")
        }
    }
    var Dh = function (t, e) {
        if (this.getRowCoordById(t[0]) == e) return !0;
        for (var i = !0, o = 0; o < t.length; o++) this._rows.coordSections[0].indexOf(t[o]) > -1 && (i = !1);
        return e < this._rows.coordSections[0].length && (i = !1), i
    };

    function Vh(t, e, i) {
        void 0 === e && (e = !0), void 0 === i && (i = function () {});
        var o = {
            rowIds: t
        };
        if (this.events.dispatch("beforedeleterows", o)) {
            var s = this._freezeLineRowAfterId,
                n = Ur.call(this),
                r = wl.call(this, o.rowIds);
            Xh.call(this), Dl.call(this, "deleteRows"), i.call(this), this.redraw();
            var l = Ur.call(this);
            e && this.undoManager.add({
                desc: "deleteRows",
                undo: function () {
                    bl.call(this, r), Yh.call(this, s), Dl.call(this, "restoreDeletedRows"), Pl.call(this, n), this.redraw()
                },
                redo: function () {
                    wl.call(this, o.rowIds), Xh.call(this), Dl.call(this, "deleteRows"), Pl.call(this, l), this.redraw()
                }
            }), this.events.dispatch("deleterows", o)
        }
    }
    var Xh = function () {
            if (this._freezeLineRowAfterId && -1 == this.getRowIndexById(this._freezeLineRowAfterId)) {
                for (var t = null, e = this._rows.coordSections[0].slice(0, -1).reverse(); e.length;) {
                    var i = e.shift();
                    if (this.getRowIndexById(i) > -1) {
                        t = i;
                        break
                    }
                }
                this._freezeLineRowAfterId = t
            }
        },
        Yh = function (t) {
            this._freezeLineRowAfterId = t
        };

    function Wh(t) {
        if (t.length != this._rows.indexList.length)
            if (JSON.stringify(t) != JSON.stringify(this._rows.indexSections[1])) {
                var e = yh.call(this, "rows", t);
                Vh.call(this, t, !0, (function () {
                    for (var t = [], i = 0; i < e.length; i++) t.push({
                        range: [{
                            x: 0,
                            y: this.getRowCoordById(e[i])
                        }, {
                            x: this._cols.coordList.length - 1,
                            y: this.getRowCoordById(e[i])
                        }],
                        type: "row"
                    });
                    Il.call(this, t)
                }))
            } else this.alertUser("Cannot delete all non-frozen rows.");
        else this.alertUser("Cannot delete all rows.")
    }

    function Kh(t) {
        this._preventFrozenRows || (this._freezeLineRowAfterId = t)
    }

    function jh(t, e, i) {
        void 0 === e && (e = !0), void 0 === i && (i = function () {});
        var o = {
            rowId: t
        };
        if (this.events.dispatch("beforefreezerows", o)) {
            var s = this._freezeLineRowAfterId,
                n = Ur.call(this);
            Kh.call(this, o.rowId), Dl.call(this, "freezeRows"), i.call(this), this.redraw();
            var r = Ur.call(this);
            e && this.undoManager.add({
                desc: "freezeRows",
                undo: function () {
                    Kh.call(this, s), Dl.call(this, "freezeRows"), Pl.call(this, n), this.redraw()
                },
                redo: function () {
                    Kh.call(this, o.rowId), Dl.call(this, "freezeRows"), Pl.call(this, r), this.redraw()
                }
            }), this.events.dispatch("freezerows", o)
        }
    }

    function Uh(t) {
        void 0 === t && (t = null), jh.call(this, t, !0)
    }

    function qh(t) {
        for (var e = 0; e < t.length; e++) this._rows.store[t[e] - 1]._hide = !0
    }

    function Gh(t) {
        for (var e = 0; e < t.length; e++) this._rows.store[t[e] - 1]._hide = !1
    }

    function Zh(t, e, i) {
        void 0 === e && (e = !0), void 0 === i && (i = function () {});
        var o = {
            rowIds: t
        };
        if (this.events.dispatch("beforehiderows", o)) {
            var s = Ur.call(this);
            qh.call(this, o.rowIds), Dl.call(this, "hideRows"), i.call(this), this.redraw();
            var n = Ur.call(this);
            e && this.undoManager.add({
                desc: "hideRows",
                undo: function () {
                    Gh.call(this, o.rowIds), Dl.call(this, "showRows"), Pl.call(this, s), this.redraw()
                },
                redo: function () {
                    qh.call(this, o.rowIds), Dl.call(this, "hideRows"), Pl.call(this, n), this.redraw()
                }
            }), this.events.dispatch("hiderows", o)
        }
    }

    function $h(t) {
        if (t.length != this._rows.coordList.length) {
            var e = yh.call(this, "rows", t);
            Zh.call(this, t, !0, (function () {
                for (var t = [], i = 0; i < e.length; i++) t.push({
                    range: [{
                        x: 0,
                        y: this.getRowCoordById(e[i])
                    }, {
                        x: this._cols.coordList.length - 1,
                        y: this.getRowCoordById(e[i])
                    }],
                    type: "row"
                });
                Il.call(this, t)
            }))
        } else this.alertUser("Cannot hide all rows.")
    }

    function Qh(t, e, i) {
        void 0 === e && (e = !0), void 0 === i && (i = function () {});
        var o = {
            rowIds: t
        };
        if (this.events.dispatch("beforeshowrows", o)) {
            var s = Ur.call(this);
            Gh.call(this, o.rowIds), Dl.call(this, "showRows"), i.call(this), this.redraw();
            var n = Ur.call(this);
            e && this.undoManager.add({
                desc: "showRows",
                undo: function () {
                    qh.call(this, o.rowIds), Dl.call(this, "hideRows"), Pl.call(this, s), this.redraw()
                },
                redo: function () {
                    Gh.call(this, o.rowIds), Dl.call(this, "showRows"), Pl.call(this, n), this.redraw()
                }
            }), this.events.dispatch("showrows", o)
        }
    }

    function Jh(t) {
        Qh.call(this, t, !0, (function () {
            this.setRowSelection(oh(ih.call(this, "rows", t)))
        }))
    }

    function ta() {
        if (this._searchCellsFound.length) {
            var t = this._searchCellsFound[this._searchCellIndex],
                e = {
                    x: this.getColCoordById(t[1]),
                    y: this.getRowCoordById(t[0])
                },
                i = cl.call(this, e);
            Il.call(this, i, e, 0)
        }
        this.search("")
    }

    function ea(t) {
        if (Ol.call(this, t), this._searchCellsFound.length) {
            var e = this._searchCellsFound[this._searchCellIndex];
            Ll.call(this, {
                x: this.getColCoordById(e[1]),
                y: this.getRowCoordById(e[0])
            })
        }
        Dl.call(this, "search"), this.redraw()
    }

    function ia(t) {
        void 0 === t && (t = ""), ea.call(this, t)
    }

    function oa() {
        if (this._searchCellsFound.length) {
            this._searchCellIndex == this._searchCellsFound.length - 1 ? this._searchCellIndex = 0 : this._searchCellIndex++;
            var t = this._searchCellsFound[this._searchCellIndex];
            Ll.call(this, {
                x: this.getColCoordById(t[1]),
                y: this.getRowCoordById(t[0])
            }), Dl.call(this, "search"), this.redraw()
        }
    }

    function sa() {
        if (this._searchCellsFound.length) {
            0 == this._searchCellIndex ? this._searchCellIndex = this._searchCellsFound.length - 1 : this._searchCellIndex--;
            var t = this._searchCellsFound[this._searchCellIndex];
            Ll.call(this, {
                x: this.getColCoordById(t[1]),
                y: this.getRowCoordById(t[0])
            }), Dl.call(this, "search"), this.redraw()
        }
    }

    function na(t) {
        if (!this._sortState.length) {
            this._rowOrderStore = [];
            for (var e = 0; e < this._rows.indexList.length; e++) this._rowOrderStore[this._rows.indexList[e] - 1] = this._rows.indexList.length - e
        }
        var i, o = [],
            s = {};
        for (e = this._rows.coordSections[0].length; e < this._rows.indexList.length; e++)
            if (this._rows.store[this._rows.indexList[e] - 1]._hide) s[e] = this._rows.indexList[e];
            else {
                for (var n = [], r = 0; r < t.length; r++) null === (i = this._cellStore[this._rows.indexList[e] - 1][t[r][0] - 1].value) && (i = ""), n.push(String(i));
                o.push([this._rows.indexList[e], n]);
                var l = "";
                for (r = 0; r < t.length; r++) l += t[r].join("-"), r < t.length - 1 && (l += "_");
                if (!(l in this._sortFunctions)) {
                    var h = ra(t);
                    this._sortFunctions[l] = new Function("a,b", h)
                }
            } o.sort(this._sortFunctions[l]);
        var a = [];
        for (r = 0; r < this._rows.coordSections[0].length; r++) a.push(this._rows.coordSections[0][r]);
        for (r = 0; r < o.length; r++) a.push(o[r][0]);
        for (var c in s) a.splice(c, 0, s[c]);
        this._rows.indexList = a, this._sortState = t
    }
    var ra = function (t) {
        for (var e = "return ", i = 0; i < t.length; i++) i > 0 && (e += "||"), e += "(\n      a[1][" + i + "] === b[1][" + i + "] ? 0 : (\n        a[1][" + i + "] == '' ? 1 : (\n          b[1][" + i + "] == '' ? -1 : (", "asc" == t[i][1] ? e += "a[1][" + i + "].localeCompare(b[1][" + i + "], undefined, { numeric: true, sensitivity: 'base' })" : "desc" == t[i][1] && (e += "b[1][" + i + "].localeCompare(a[1][" + i + "], undefined, { numeric: true, sensitivity: 'base' })"), e += "))))";
        return e += ";"
    };

    function la() {
        for (var t, e = [], i = 0; i < this._rows.indexList.length; i++) t = this._rowOrderStore[this._rows.indexList[i] - 1] || 0, e.push([this._rows.indexList[i], t]);
        e.sort(this._sortFunctions.reset);
        for (var o = [], s = 0; s < e.length; s++) o.push(e[s][0]);
        this._rows.indexList = o
    }

    function ha(t, e, i) {
        void 0 === e && (e = !0), void 0 === i && (i = function () {});
        var o = {
            sortState: t
        };
        if (this.events.dispatch("beforesort", o)) {
            var s = this._sortState.slice(0),
                n = Ur.call(this);
            na.call(this, o.sortState), Dl.call(this, "sort"), i.call(this), this.redraw();
            var r = Ur.call(this);
            e && this.undoManager.add({
                desc: "sort",
                undo: function () {
                    s.length ? na.call(this, s) : la.call(this), Dl.call(this, "sort"), Pl.call(this, n), this.redraw()
                },
                redo: function () {
                    na.call(this, o.sortState), Dl.call(this, "sort"), Pl.call(this, r), this.redraw()
                }
            }), this.events.dispatch("sort", o)
        }
    }

    function aa(t, e, i) {
        if (void 0 === t && (t = null), void 0 === e && (e = null), void 0 === i && (i = !1), null != t) {
            var o = this._cols.coordList[t],
                s = "asc";
            if (null == e ? this._sortState.length && this._sortState[0][0] == o && (s = "asc" == this._sortState[0][1] ? "desc" : "asc") : s = e, i && !ca.call(this, o)) var n = this._sortState;
            else n = [];
            n.push([o, s]), ha.call(this, n, !0, (function () {}))
        }
    }
    var ca = function (t) {
        for (var e = null, i = 0; i < this._sortState.length; i++)
            if (this._sortState[i][0] == t) {
                e = this._sortState[i][1];
                break
            } return e
    };

    function da() {
        this._isActive = !0, mi.call(this, "document", "mousedown"), this.keys.resume()
    }

    function ua() {
        this._isActive = !1, this._domNodes.cellEditor._isOpen && this.closeCellEditorAndSave(), xi.call(this, "document", "mousedown"), this.keys.suspend(), this.deselectAll()
    }

    function pa(t) {
        return this._cols.coordList.indexOf(t)
    }

    function fa(t) {
        return this._cols.coordList[t] || null
    }

    function ga(t) {
        return this._cols.indexList[t] || null
    }

    function _a(t) {
        return this.getColIndexById(this.getColIdByCoord(t))
    }

    function ya(t) {
        return this._cols.indexList.indexOf(t)
    }

    function va(t) {
        var e, i = !1;
        e = this._cd.panesX.left.offset + this._cd.rowHeaderSpace;
        for (var o = 0; o < this._panesXids.left.length; o++) {
            if (o == t) {
                i = !0;
                break
            }
            e += this.getColWidthById(this._panesXids.left[o])
        }
        if (i) return e;
        e = this._cd.panesX.center.offset;
        for (o = 0; o < this._colView.length; o++) {
            if (this.getColCoordById(this._colView[o]) == t) {
                i = !0;
                break
            }
            e += this.getColWidthById(this._colView[o])
        }
        return i ? e : null
    }

    function ma(t) {
        return null == this._cols.store[t - 1] ? null : this._cols.store[t - 1].width
    }

    function xa(t) {
        for (var e = 0, i = 0; i < this._cols.coordSections.length; i++)
            if (e += this._cols.coordSections[i].length, t.x < e) return i;
        return -1
    }

    function wa(t) {
        return t.x < this._panesXids.left.length ? "left" : "center"
    }

    function Ca(t) {
        return this._rows.coordList.indexOf(t)
    }

    function ba(t) {
        return null == this._rows.store[t - 1] ? null : this._actualRowHeight
    }

    function Sa(t) {
        return this._rows.coordList[t] || null
    }

    function Ia(t) {
        return this._rows.indexList[t] || null
    }

    function Ra(t) {
        return this.getRowIndexById(this.getRowIdByCoord(t))
    }

    function La(t) {
        return this._rows.indexList.indexOf(t)
    }

    function Pa(t) {
        var e, i = !1;
        e = this._cd.panesY.top.offset + this._cd.colHeaderSpace;
        for (var o = 0; o < this._panesYids.top.length; o++) {
            if (o == t) {
                i = !0;
                break
            }
            e += this.getRowHeightById(this._panesYids.top[o])
        }
        if (i) return e;
        e = this._cd.panesY.center.offset;
        for (o = 0; o < this._rowView.length; o++) {
            if (this.getRowCoordById(this._rowView[o]) == t) {
                i = !0;
                break
            }
            e += this.getRowHeightById(this._rowView[o])
        }
        return i ? e : null
    }

    function Na(t) {
        for (var e = 0, i = 0; i < this._rows.coordSections.length; i++)
            if (e += this._rows.coordSections[i].length, t.y < e) return i;
        return -1
    }

    function ka(t) {
        return t.y < this._panesYids.top.length ? "top" : "center"
    }

    function Ha() {
        mi.call(this, "cellEditorInputField", "copy"), mi.call(this, "cellEditorInputField", "paste"), mi.call(this, "cellEditorInputField", "cut"), this._domNodes.cellEditor._isOpen = !1, this._domNodes.cellEditor._coords = null, this._domNodes.cellEditor._mode = null, P(this._domNodes.cellEditor, {
            opacity: 0,
            height: "1px",
            "z-index": -1
        }), this.events.dispatch("closecelleditor", {})
    }

    function za() {
        this.setCellValues(this._domNodes.cellEditor._coords, this._domNodes.cellEditorInputField.value), this.closeCellEditor()
    }

    function Aa(t) {
        void 0 === t && (t = "edit"), xi.call(this, "cellEditorInputField", "copy"), xi.call(this, "cellEditorInputField", "paste"), xi.call(this, "cellEditorInputField", "cut"), Ll.call(this, this._cellCursorPosition);
        var e = this.getRowIdByCoord(this._cellCursorPosition.y),
            i = this.getColIdByCoord(this._cellCursorPosition.x);
        if (P(this._domNodes.cellEditorInputField, {
                height: this.getRowHeightById(e) + 1 + "px",
                width: this.getColWidthById(i) + "px"
            }), P(this._domNodes.cellEditor, {
                opacity: 1,
                height: "auto",
                "z-index": 100,
                top: this.getRowPositionInViewport(this._cellCursorPosition.y) + "px",
                left: this.getColPositionInViewport(this._cellCursorPosition.x) + "px"
            }), this._domNodes.cellEditor._coords = {
                x: this._cellCursorPosition.x,
                y: this._cellCursorPosition.y
            }, this._domNodes.cellEditor._mode = t, this._domNodes.cellEditor._isOpen = !0, "enter" == t ? to.call(this, "inputModeEnter") : (to.call(this, "inputModeEdit"), this._domNodes.cellEditorInputField.value = this.getCellValue(this._cellCursorPosition)), "edit" == t && (this._isIE || this._isIOS || this._isMacOS)) {
            var o = this._domNodes.cellEditorInputField.value;
            this._domNodes.cellEditorInputField.value = "", this._domNodes.cellEditorInputField.value = o
        }
        io.call(this), this.redraw()
    }

    function Ta(t) {
        this._domNodes.cellEditorInputField.value = t, this._domNodes.cellEditorInputField.dispatchEvent(new Event("input"))
    }

    function Fa() {
        var t = document.createElement("textArea");
        t.value = " all", t.setAttribute("readonly", !0), t.addEventListener("copy", this._domNodes.component._listeners.clipboardNode.events.copy), document.body.appendChild(t);
        var e = document.createRange();
        e.selectNodeContents(t);
        var i = window.getSelection();
        i.removeAllRanges(), i.addRange(e), t.setSelectionRange(0, 999999), document.execCommand("copy"), document.body.removeChild(t)
    }

    function Ea() {
        wi.call(this, !0), this._domNodes.cellEditor._actualCommand = "copy", this.constructor._isIOS ? Fa.call(this) : document.execCommand("copy")
    }

    function Ma() {
        wi.call(this, !0), this._domNodes.cellEditor._actualCommand = "cut", this.constructor._isIOS ? Fa.call(this) : document.execCommand("copy")
    }

    function Ba() {
        var t = this;
        "clipboard" in navigator && "function" == typeof navigator.clipboard.readText ? navigator.clipboard.readText().then((function (e) {
            "" != e && Zi.call(t, {
                text: e
            }, null)
        })).catch((function (t) {})) : this.isIE ? document.execCommand("paste") : this.alertUser("Paste not available.")
    }

    function Oa() {
        var t = this.getColPositionInViewport(this._cellCursorPosition.x),
            e = this.getRowPositionInViewport(this._cellCursorPosition.y),
            i = 0,
            o = this.getRowHeightById(this._rows.coordList[this._cellCursorPosition.y]),
            s = this._domNodes.display.getBoundingClientRect();
        In.call(this, {
            snapPointX: t + window.scrollX + i + s.left,
            snapPointY: e + window.scrollY + o + s.top
        }, null)
    }

    function Da(t) {
        void 0 === t && (t = {});
        L({}, t);
        for (var e = "", i = 0; i < this._rows.coordList.length; i++) {
            for (var o = 0; o < this._cols.coordList.length; o++) {
                var s = this.getCellFromStore(this._rows.coordList[i], this._cols.coordList[o]).value;
                e += null == s ? "" : s, o < this._cols.coordList.length - 1 && (e += ",")
            }
            e += "\n"
        }
        Va.call(this, e)
    }
    var Va = function (t) {
        var e = new Blob([t], {
            type: "text/csv",
            name: "datagridxl.csv"
        });
        if (this.constructor._isIE) navigator.msSaveBlob(e, "datagridxl.csv");
        else {
            var i = H("a", {
                class: "dgxl-downloadLink",
                href: URL.createObjectURL(e),
                download: "datagridxl.csv"
            });
            i.textContent = "Click here to download", this._domNodes.component.appendChild(i), i.click(), this._domNodes.component.removeChild(i)
        }
    };

    function Xa(t) {
        void 0 === t && (t = {});
        var e = L({
            useColTitles: !1,
            whitespace: 2,
            includeDataField: !1
        }, t);
        if (e.includeDataField) var i = (o = {
            data: []
        }).data;
        else {
            var o;
            i = o = []
        }
        if (e.useColTitles)
            for (var s = 0; s < this._rows.coordList.length; s++) {
                i.push({});
                for (var n = 0; n < this._cols.coordList.length; n++) {
                    this.getColFromStore(this._cols.coordList[n]);
                    var r = Je.call(this, this._cols.coordList[n]),
                        l = this.getCellFromStore(this._rows.coordList[s], this._cols.coordList[n]).value;
                    i[s][r] = null == l ? "" : l
                }
            } else
                for (s = 0; s < this._rows.coordList.length; s++) {
                    i.push([]);
                    for (n = 0; n < this._cols.coordList.length; n++) {
                        l = this.getCellFromStore(this._rows.coordList[s], this._cols.coordList[n]).value;
                        i[s].push(null == l ? "" : l)
                    }
                }
        var h = JSON.stringify(o, null, e.whitespace);
        Ya.call(this, h)
    }
    var Ya = function (t) {
        var e = new Blob([t], {
            type: "application/json",
            name: "datagridxl.json"
        });
        if (this.constructor._isIE) navigator.msSaveBlob(e, "datagridxl.json");
        else {
            var i = H("a", {
                class: "dgxl-downloadLink",
                href: URL.createObjectURL(e),
                download: "datagridxl.json"
            });
            i.textContent = "Click here to download", this._domNodes.component.appendChild(i), i.click(), this._domNodes.component.removeChild(i)
        }
    };

    function Wa(t) {
        if (void 0 === t && (t = null), null != t) {
            for (var e = [], i = 0, o = t[0].y; o <= t[1].y; o++) {
                e.push([]);
                for (var s = t[0].x; s <= t[1].x; s++) {
                    var n = this._cellStore[this._rows.coordList[o] - 1][this._cols.coordList[s] - 1].value;
                    e[i].push(n)
                }
                i++
            }
            return e
        }
    }

    function Ka(t) {
        if (null == t) return "";
        if (this.escapeQuotesOnCopy) var e = this.textParser.unparse(this.getCellRangeData(t), {
            delimiter: "\t"
        });
        else {
            e = "";
            for (var i = t[0].y; i <= t[1].y; i++) {
                for (var o = t[0].x; o <= t[1].x; o++) e += this._cellStore[this._rows.coordList[i] - 1][this._cols.coordList[o] - 1].value || "", o < t[1].x && (e += "\t");
                i < t[1].y && (e += "\n")
            }
        }
        return "" == e && (e += "\n"), e
    }

    function ja(t) {
        var e = this._cellStore[this.getRowIdByCoord(t.y) - 1];
        if (null != e) {
            var i = e[this.getColIdByCoord(t.x) - 1];
            if (null != i) return i.value
        }
    }

    function Ua(t) {
        var e = [];
        if ("objectCollection" == this._dataFormat)
            for (var i = 0; i < this._rows.coordList.length; i++) {
                for (var o = {}, s = 0; s < this._cols.coordList.length; s++) {
                    o[(n = this.getColFromStore(this._cols.coordList[s])).field] = this._cellStore[this._rows.coordList[i] - 1][n.id - 1].value
                }
                e.push(o)
            } else if ("arrayCollection" == this._dataFormat)
                for (i = 0; i < this._rows.coordList.length; i++) {
                    for (o = [], s = 0; s < this._cols.coordList.length; s++) {
                        var n = this.getColFromStore(this._cols.coordList[s]);
                        o[s] = this._cellStore[this._rows.coordList[i] - 1][n.id - 1].value
                    }
                    e.push(o)
                }
        return e
    }

    function qa() {
        this._isFullscreen ? Za.call(this) : Ga.call(this)
    }
    var Ga = function () {
            if (this.constructor._isIOS) this._domNodes.component.style.width = "100vw", this._domNodes.component.style.height = "100vh";
            else if (this.constructor._isMacOS) {
                var t = window.outerWidth - window.innerWidth,
                    e = window.outerHeight - window.innerHeight,
                    i = screen.availWidth - t;
                if (e < 100) var o = screen.availHeight;
                else o = screen.availHeight - e;
                this._domNodes.component.style.width = i + "px", this._domNodes.component.style.height = o + "px"
            }
            this._domNodes.component.requestFullscreen ? this._domNodes.component.requestFullscreen() : this._domNodes.component.webkitRequestFullscreen ? this._domNodes.component.webkitRequestFullscreen() : this._domNodes.component.msRequestFullscreen && this._domNodes.component.msRequestFullscreen()
        },
        Za = function () {
            document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen()
        };

    function $a(t) {
        return this.headerLabelSeries.letters.indexToLabel(this.getColIndexByCoord(t.x)) + this.headerLabelSeries.numbers.indexToLabel(this.getRowIndexByCoord(t.y))
    }

    function Qa(t) {
        alert(this.getLocaleSetting(t))
    }

    function Ja() {
        var t = "";
        for (var e in Y) e.startsWith("reset") || (t += e + " {\n", t += k(Y[e].call(this), !0), t += "}\n\n");
        t = t.substring(0, t.length - 2), tc.call(this, t)
    }
    var tc = function (t) {
        var e = new Blob([t], {
            type: "octet/stream",
            name: "datagridxl.csv"
        });
        if (this.constructor._isIE) navigator.msSaveBlob(e, "datagridxl.css");
        else {
            var i = H("a", {
                class: "dgxl-downloadLink",
                href: URL.createObjectURL(e),
                download: "datagridxl.css"
            });
            i.textContent = "Click here to download", document.body.appendChild(i), i.click(), document.body.removeChild(i)
        }
    };

    function ec() {
        var t = this;
        requestAnimationFrame((function () {
            Lr.call(t), t._prevSelection = Ur.call(t)
        }))
    }

    function ic() {
        var t = this,
            e = this._cd.componentHeight,
            i = this._cd.componentWidth,
            o = !1,
            s = !1;
        Xt.call(this), kl.call(this), this._isFullscreen && i == this._cd.componentWidth && e > this._cd.componentHeight + 200 ? o = !0 : this._isFullscreen && i == this._cd.componentWidth && this._cd.componentHeight > e + 200 && (s = !0), s || o || tn.call(this, {
            x: this._panesXids.left.length,
            y: this._panesYids.top.length
        }), requestAnimationFrame((function () {
            Lr.call(t)
        })), this.events.dispatch("resize", {
            width: this._cd.componentWidth,
            height: this._cd.componentHeight
        })
    }

    function oc(t, e) {
        void 0 === e && (e = !1);
        var i, o = {},
            s = t.match(/([$][\w]+)=([\w\d]+)/g);
        if (null != s)
            for (var n = 0; n < s.length; n++) {
                var r = s[n].split("=");
                o[r[0]] = r[1], t = t.replace(s[n], r[0])
            }
        return i = t in this.locale && null !== this.locale[t] ? this.locale[t] : t in this._defaultLocale && null !== this._defaultLocale[t] ? this._defaultLocale[t] : t, sc.call(this, i, o, e)
    }
    var sc = function (t, e, i) {
        var o = i ? "<em>" : "",
            s = i ? "</em>" : "";
        for (var n in e) t = t.replace(n, o + e[n] + s);
        return t
    };

    function nc() {
        this._selection = [], this._activeRangeIndex = -1, this._cellCursorPosition = null, this.redraw()
    }

    function rc(t) {
        for (var e = [], i = 0; i < this._selection.length; i++) Io(t, this._selection[i].range) && e.push({
            range: this._selection[i].range,
            type: this._selection[i].type,
            index: i
        });
        return e
    }

    function lc(t) {
        void 0 === t && (t = !1);
        var e = We(this._selection, {});
        if (t) return e;
        for (var i = [], o = 0; o < e.length; o++) i.push(e[o].range);
        return i
    }

    function hc(t) {
        void 0 === t && (t = !0);
        var e = [{
            range: [{
                x: 0,
                y: 0
            }, {
                x: this._cols.coordList.length - 1,
                y: this._rows.coordList.length - 1
            }],
            type: "all"
        }];
        if (t) var i = {
            x: 0,
            y: 0
        };
        else i = this._cellCursorPosition;
        Il.call(this, e, i, 0), this.redraw()
    }

    function ac(t) {
        switch (this._selection[this._activeRangeIndex].type) {
            case "cell":
                uc.call(this, t);
                break;
            case "col":
                cc.call(this, t);
                break;
            case "row":
                dc.call(this, t)
        }
        this.redraw()
    }
    var cc = function (t) {
            if ("left" == t || "right" == t) {
                var e, i = this._selection[this._activeRangeIndex].range,
                    o = {
                        x: this._cellCursorPosition.x,
                        y: this._cellCursorPosition.y
                    },
                    s = i;
                "right" == t ? o.x == i[0].x ? (s[0].x = i[0].x, s[1].x = i[1].x + 1, e = 1) : (s[0].x = i[0].x + 1, s[1].x = i[1].x, e = 0) : "left" == t && (o.x == i[1].x ? (s[0].x = i[0].x - 1, s[1].x = i[1].x, e = 0) : (s[0].x = i[0].x, s[1].x = i[1].x - 1, e = 1));
                var n = this._selection;
                n[this._activeRangeIndex].range = s, Il.call(this, n, o, this._activeRangeIndex);
                var r = Rl.call(this, {
                    x: s[e].x,
                    y: s[e].y
                }, "x");
                tn.call(this, {
                    x: this._viewportPosition.x + r.x,
                    y: this._viewportPosition.y + r.y
                })
            }
        },
        dc = function (t) {
            if ("up" == t || "down" == t) {
                var e, i = this._selection[this._activeRangeIndex].range,
                    o = {
                        x: this._cellCursorPosition.x,
                        y: this._cellCursorPosition.y
                    },
                    s = i;
                "down" == t ? o.y == i[0].y ? (s[0].y = i[0].y, s[1].y = i[1].y + 1, e = 1) : (s[0].y = i[0].y + 1, s[1].y = i[1].y, e = 0) : "up" == t && (o.y == i[1].y ? (s[0].y = i[0].y - 1, s[1].y = i[1].y, e = 0) : (s[0].y = i[0].y, s[1].y = i[1].y - 1, e = 1));
                var n = this._selection;
                n[this._activeRangeIndex].range = s, Il.call(this, n, o, this._activeRangeIndex);
                var r = Rl.call(this, {
                    x: s[e].x,
                    y: s[e].y
                }, "y");
                tn.call(this, {
                    x: this._viewportPosition.x + r.x,
                    y: this._viewportPosition.y + r.y
                })
            }
        },
        uc = function (t) {
            var e, i, o = this._selection[this._activeRangeIndex].range,
                s = {
                    x: this._cellCursorPosition.x,
                    y: this._cellCursorPosition.y
                },
                n = o;
            "right" == t ? (e = "x", n[0].y = o[0].y, n[1].y = o[1].y, s.x == o[0].x ? (n[0].x = o[0].x, n[1].x = o[1].x + 1, i = 1) : (n[0].x = o[0].x + 1, n[1].x = o[1].x, i = 0)) : "left" == t ? (e = "x", n[0].y = o[0].y, n[1].y = o[1].y, s.x == o[1].x ? (n[0].x = o[0].x - 1, n[1].x = o[1].x, i = 0) : (n[0].x = o[0].x, n[1].x = o[1].x - 1, i = 1)) : "down" == t ? (e = "y", n[0].x = o[0].x, n[1].x = o[1].x, s.y == o[0].y ? (n[0].y = o[0].y, n[1].y = o[1].y + 1, i = 1) : (n[0].y = o[0].y + 1, n[1].y = o[1].y, i = 0)) : "up" == t && (e = "y", n[0].x = o[0].x, n[1].x = o[1].x, s.y == o[1].y ? (n[0].y = o[0].y - 1, n[1].y = o[1].y, i = 0) : (n[0].y = o[0].y, n[1].y = o[1].y - 1, i = 1));
            var r = this._selection;
            r[this._activeRangeIndex].range = n, Il.call(this, r, s, this._activeRangeIndex);
            var l = Rl.call(this, {
                x: n[i].x,
                y: n[i].y
            }, e);
            tn.call(this, {
                x: this._viewportPosition.x + l.x,
                y: this._viewportPosition.y + l.y
            })
        };

    function pc() {
        return null == this._cellCursorPosition ? null : {
            x: this._cellCursorPosition.x,
            y: this._cellCursorPosition.y
        }
    }

    function fc(t, e) {
        if (void 0 === t && (t = null), void 0 === e && (e = !0), null != t) {
            var i = Is.call(this, t, "document");
            if (e || !Io(i, this._selection[this._activeRangeIndex].range)) var o = cl.call(this, i);
            else o = this._selection;
            Il.call(this, o, i, 0), this.redraw()
        }
    }

    function gc(t) {
        void 0 === t && (t = null);
        var e = Is.call(this, {
            x: this._cellCursorPosition.x + t.x,
            y: this._cellCursorPosition.y + t.y
        }, "document");
        Il.call(this, [{
            range: [e, e],
            type: "cell"
        }]);
        var i = {
                x: this._viewportPosition.x,
                y: this._viewportPosition.y
            },
            o = Rl.call(this, e);
        e.x >= this._panesXids.left.length && (i.x += o.x), e.y >= this._panesYids.top.length && (i.y += o.y), tn.call(this, i), this.redraw()
    }

    function _c(t) {
        if (void 0 === t && (t = null), null != t) {
            var e = this._selection[this._activeRangeIndex].range;
            if (1 == this._selection.length && Di.call(this, e)) {
                var i = [{
                    range: [r = {
                        x: this._cellCursorPosition.x + t.x,
                        y: this._cellCursorPosition.y + t.y
                    }, r],
                    type: "cell"
                }];
                Il.call(this, i, r, 0)
            } else {
                var o = this._cellCursorPosition.x + t.x,
                    s = this._cellCursorPosition.y + t.y,
                    n = {
                        top: !1,
                        right: !1,
                        bottom: !1,
                        left: !1
                    };
                o > e[1].x ? (n.right = !0, o = e[0].x, s < e[1].y ? s++ : (s = e[0].y, n.bottom = !0)) : o < e[0].x && (n.left = !0, o = e[1].x, s > e[0].y ? s-- : (s = e[1].y, n.top = !0)), s > e[1].y ? (n.bottom = !0, s = e[0].y, o < e[1].x ? o++ : (o = e[0].x, n.right = !0)) : s < e[0].y && (n.top = !0, s = e[1].y, o > e[0].x ? o-- : (o = e[1].x, n.left = !0));
                var r = {
                        x: o,
                        y: s
                    },
                    l = this._activeRangeIndex;
                n.right && n.bottom && (this._activeRangeIndex == this._selection.length - 1 ? l = 0 : l++, r = this._selection[l].range[0]), n.left && n.top && (0 == this._activeRangeIndex ? l = this._selection.length - 1 : l--, r = this._selection[l].range[1]), Il.call(this, this._selection, r, l)
            }
            var h = {
                    x: this._viewportPosition.x,
                    y: this._viewportPosition.y
                },
                a = Rl.call(this, r);
            r.x >= this._panesXids.left.length && (h.x += a.x), r.y >= this._panesYids.top.length && (h.y += a.y), tn.call(this, h), this.redraw()
        }
    }

    function yc() {
        var t = this._cellCursorPosition.y - this._viewportPosition.y;
        t < 0 && (t = 0);
        for (var e = 0, i = this._viewportPosition.y; e < this._cd.panesY.center.space && -1 != i;) e += this.getRowHeightById(this.getRowIdByCoord(i)), i--;
        var o = {
            x: this._cellCursorPosition.x,
            y: i + 1 + t
        };
        Il.call(this, [{
            range: [o, o],
            type: "cell"
        }]), tn.call(this, {
            x: this._viewportPosition.x,
            y: i + 1
        }), this.redraw()
    }

    function vc() {
        var t = this._cellCursorPosition.y - this._viewportPosition.y;
        t < 0 && (t = 0);
        var e = this._viewportPosition.y + (this._rowView.length - 1),
            i = {
                x: this._cellCursorPosition.x,
                y: e + t
            };
        Il.call(this, [{
            range: [i, i],
            type: "cell"
        }]), tn.call(this, {
            x: this._viewportPosition.x,
            y: e
        }), this.redraw()
    }

    function mc() {
        var t = {
            x: this._cellCursorPosition.x,
            y: 0
        };
        Il.call(this, [{
            range: [t, t],
            type: "cell"
        }]);
        var e = {
                x: this._viewportPosition.x,
                y: this._viewportPosition.y
            },
            i = Rl.call(this, t);
        t.x >= this._panesXids.left.length && (e.x += i.x), t.y >= this._panesYids.top.length && (e.y += i.y), tn.call(this, e), this.redraw()
    }

    function xc() {
        var t = {
            x: this._cellCursorPosition.x,
            y: this._rows.coordList.length - 1
        };
        Il.call(this, [{
            range: [t, t],
            type: "cell"
        }]);
        var e = {
                x: this._viewportPosition.x,
                y: this._viewportPosition.y
            },
            i = Rl.call(this, t);
        t.x >= this._panesXids.left.length && (e.x += i.x), t.y >= this._panesYids.top.length && (e.y += i.y), tn.call(this, e), this.redraw()
    }

    function wc() {
        var t = {
            x: 0,
            y: this._cellCursorPosition.y
        };
        Il.call(this, [{
            range: [t, t],
            type: "cell"
        }]);
        var e = {
                x: this._viewportPosition.x,
                y: this._viewportPosition.y
            },
            i = Rl.call(this, t);
        t.x >= this._panesXids.left.length && (e.x += i.x), t.y >= this._panesYids.top.length && (e.y += i.y), tn.call(this, e), this.redraw()
    }

    function Cc() {
        var t = {
            x: this._cols.coordList.length - 1,
            y: this._cellCursorPosition.y
        };
        Il.call(this, [{
            range: [t, t],
            type: "cell"
        }]);
        var e = {
                x: this._viewportPosition.x,
                y: this._viewportPosition.y
            },
            i = Rl.call(this, t);
        t.x >= this._panesXids.left.length && (e.x += i.x), t.y >= this._panesYids.top.length && (e.y += i.y), tn.call(this, e), this.redraw()
    }

    function bc() {
        var t = {
            x: this._panesXids.left.length,
            y: this._panesYids.top.length
        };
        Il.call(this, [{
            range: [t, t],
            type: "cell"
        }]);
        var e = Rl.call(this, t);
        tn.call(this, {
            x: this._viewportPosition.x + e.x,
            y: this._viewportPosition.y + e.y
        }), this.redraw()
    }

    function Sc() {
        var t = {
            x: this._cols.coordList.length - 1,
            y: this._rows.coordList.length - 1
        };
        Il.call(this, [{
            range: [t, t],
            type: "cell"
        }]);
        var e = Rl.call(this, t);
        tn.call(this, {
            x: this._viewportPosition.x + e.x,
            y: this._viewportPosition.y + e.y
        }), this.redraw()
    }

    function Ic(t) {
        if (void 0 === t && (t = null), null != t) {
            var e = cl.call(this, t);
            Il.call(this, e), this.redraw()
        }
    }

    function Rc(t) {
        void 0 === t && (t = !1);
        var e = We(this._selection, {
            type: "cell"
        });
        if (t) return e;
        for (var i = [], o = 0; o < e.length; o++) i.push(e[o].range);
        return i
    }

    function Lc(t, e) {
        void 0 === e && (e = !1);
        var i = this._cellCursorPosition || {
            x: 0,
            y: 0
        };
        if (e) {
            var o = [{
                range: s = [i, Is.call(this, t)],
                type: "cell"
            }];
            Il.call(this, o, i, 0)
        } else {
            var s = [i, Is.call(this, t)];
            (o = this._selection)[this._activeRangeIndex].range = s, Il.call(this, o, i, this._activeRangeIndex)
        }
        this.redraw()
    }

    function Pc(t) {
        if (void 0 === t && (t = null), null != t) {
            var e = this._selection;
            e.push({
                range: t,
                type: "cell"
            });
            var i = e.length - 1,
                o = {
                    x: e[i].range[0].x,
                    y: e[i].range[1].y
                };
            Il.call(this, e, o, i), this.redraw()
        }
    }

    function Nc(t) {
        for (var e = {
                x: t,
                y: 0
            }, i = [], o = 0; o < this._selection.length; o++) Io(e, this._selection[o].range) && "col" == this._selection[o].type && i.push({
            range: this._selection[o].range,
            type: this._selection[o].type,
            index: o
        });
        return i
    }

    function kc(t) {
        void 0 === t && (t = !1);
        var e = We(this._selection, {
            type: "col"
        });
        if (t) return e;
        for (var i = [], o = 0; o < e.length; o++) i.push(ps.call(this, e[o].range));
        return i
    }

    function Hc(t) {
        if (void 0 === t && (t = null), null != t) {
            var e = Ul.call(this, t),
                i = {
                    x: e[0].range[0].x,
                    y: 0
                };
            Il.call(this, e, i), this.redraw()
        }
    }

    function zc(t) {
        var e = t,
            i = {
                left: 0,
                right: this._cols.coordList.length - 1
            },
            o = e > i.right;
        return e < i.left && (e = i.left), o && (e = i.right), e
    }

    function Ac(t, e) {
        void 0 === e && (e = !1);
        var i = this._cellCursorPosition || {
            x: 0,
            y: 0
        };
        if (e) {
            var o = [i.x, zc.call(this, t)],
                s = [{
                    range: n = ir.call(this, o),
                    type: "col"
                }];
            Il.call(this, s, i, 0)
        } else {
            o = [i.x, zc.call(this, t)];
            var n = ir.call(this, o);
            (s = this._selection)[this._activeRangeIndex].range = n, Il.call(this, s, i, this._activeRangeIndex)
        }
        this.redraw()
    }

    function Tc(t) {
        if (void 0 === t && (t = null), null != t) {
            var e = this._selection;
            e.push({
                range: ir.call(this, t),
                type: "col"
            });
            var i = {
                    x: e[e.length - 1].range[0].x,
                    y: 0
                },
                o = e.length - 1;
            Il.call(this, e, i, o), this.redraw()
        }
    }

    function Fc(t) {
        for (var e = {
                x: 0,
                y: t
            }, i = [], o = 0; o < this._selection.length; o++) Io(e, this._selection[o].range) && "row" == this._selection[o].type && i.push({
            range: this._selection[o].range,
            type: this._selection[o].type,
            index: o
        });
        return i
    }

    function Ec(t) {
        void 0 === t && (t = !1);
        var e = We(this._selection, {
            type: "row"
        });
        if (t) return e;
        for (var i = [], o = 0; o < e.length; o++) i.push(Yo.call(this, e[o].range));
        return i
    }

    function Mc(t) {
        if (void 0 === t && (t = null), null != t) {
            var e = Ph.call(this, t),
                i = {
                    x: 0,
                    y: e[0].range[0].y
                };
            Il.call(this, e, i), this.redraw()
        }
    }

    function Bc(t) {
        var e = t,
            i = {
                top: 0,
                bottom: this._rows.coordList.length - 1
            },
            o = e > i.bottom;
        return e < i.top && (e = i.top), o && (e = i.bottom), e
    }

    function Oc(t, e) {
        void 0 === e && (e = !1);
        var i = this._cellCursorPosition || {
            x: 0,
            y: 0
        };
        if (e) {
            var o = [i.y, Bc.call(this, t)],
                s = [{
                    range: n = or.call(this, o),
                    type: "row"
                }];
            Il.call(this, s, i, 0)
        } else {
            o = [i.y, Bc.call(this, t)];
            var n = or.call(this, o);
            (s = this._selection)[this._activeRangeIndex].range = n, Il.call(this, s, i, this._activeRangeIndex)
        }
        this.redraw()
    }

    function Dc(t) {
        if (void 0 === t && (t = null), null != t) {
            var e = this._selection;
            e.push({
                range: or.call(this, t),
                type: "row"
            });
            var i = {
                    x: 0,
                    y: e[e.length - 1].range[0].y
                },
                o = e.length - 1;
            Il.call(this, e, i, o), this.redraw()
        }
    }

    function Vc(t, e) {
        var i = this._cellStore[t - 1];
        return null != i && i[e - 1] || null
    }

    function Xc(t) {
        return this._cols.store[t - 1] || null
    }

    function Yc(t) {
        return this._rows.store[t - 1] || null
    }

    function Wc(t) {
        return this.theme[t] || this._defaultTheme[t]
    }

    function Kc() {
        this.undoManager.hasUndo() && (this.undoManager.undo(), this._isUndo = !0)
    }

    function jc() {
        this.undoManager.hasRedo() && (this.undoManager.redo(), this._isRedo = !0)
    }

    function Uc() {
        return null == this._viewportPosition ? null : {
            x: this._viewportPosition.x,
            y: this._viewportPosition.y
        }
    }

    function qc(t) {
        tn.call(this, t), this.redraw()
    }

    function Gc() {
        var t = {
            document: ["fullscreenchange", "webkitfullscreenchange", "keydown", "mousedown"],
            component: ["contextmenu"],
            cellEditorInputField: ["copy", "paste", "cut", "mousedown", "input"],
            scrollArea: ["scroll", "scroll_debounced"],
            eventArea: ["mousedown", "mousemove", "mouseleave", "dblclick", "contextmenu"]
        };
        for (var e in t)
            for (var i = 0; i < t[e].length; i++) xi.call(this, e, t[e][i]);
        delete this._domNodes.container._resizeSensor, delete this._domNodes.lineHeightMeter._resizeSensor
    }

    function Zc() {
        if (!("_isDestroyed" in this)) {
            for (var t in Gc.call(this), this.keys.suspend(), this._domNodes.container.innerHTML = "", this._domNodes.lineHeightMeter.remove(), this._domNodes.textWidthMeter.remove(), this._domNodes) delete this._domNodes[t];
            for (var e in this.constructor._domNodes) this.constructor._domNodes[e].remove(), delete this.constructor._domNodes[e];
            this._isDestroyed = !0
        }
    }
    var $c = function (t, e) {
        void 0 === t && (t = null), void 0 === e && (e = {}), this._presetContextMenuItems = Zr, this._presetContextMenuTouchItems, this._presetKeyActions = jr, this._presetParts = Kr, this._defaultTheme = sl, this._defaultLocale = nl, this.events = new Yt(this), this.keys = new zr(this), this.undoManager = new Vr(this), this.textParser = Wr, this.mouseCursorStatesIdle = rl, this.mouseCursorStatesDrag = ll, this.headerLabelSeries = $r, this.keyActionSets = il, this.allowEditCells = !0, this.allowFillCells = !0, this.fillCellsDirection = "xy", this.allowCopy = !0, this.allowCut = !0, this.allowPaste = !0, this.expandSheetOnPaste = !0, this.instantCut = !1, this.allowDeleteCols = !0, this.allowInsertCols = !0, this.allowMoveCols = !0, this.allowFreezeCols = !0, this.allowHideCols = !0, this.allowResizeCols = !0, this.allowDeleteRows = !0, this.allowInsertRows = !0, this.allowMoveRows = !0, this.allowFreezeRows = !0, this.allowHideRows = !0, this.allowSort = !0, this.instantActivate = !1, this.colAlign = "left", this.colHeaderHeight = 28, this.colHeaderLabelAlign = "left", this.colHeaderLabelFunction = tl, this.colHeaderLabelPrefix = "", this.colHeaderLabelSuffix = "", this.colHeaderLabelType = "letters", this.colWidth = 100, this.frozenCols = 0, this.frozenRows = 0, this.rowHeaderLabelAlign = "right", this.rowHeaderLabelFunction = el, this.rowHeaderLabelPrefix = "", this.rowHeaderLabelSuffix = "", this.rowHeaderLabelType = "numbers", this.rowHeaderWidth = 50, this.rowHeight = 28, this.columns = void 0, this.contextMenuItems = ol, this.contextMenuTouchItems = void 0, this.data = void 0, this.fontSize = 13, this.fontFamily = "sans-serif", this.locale = {}, this.topBar = Qr, this.bottomBar = Jr, this.hijackNativeSearchCommand = !1, this.escapeQuotesOnCopy = !1, this.cacheCredits = !0, this.cssTheme = "light", this.theme = {}, this._dataFormat, this._actualRowHeight, this._scrollLeft = 0, this._scrollTop = 0, this._cd = {}, this._domNodes = {}, this._isReady = !1, this._isUndo = !1, this._isRedo = !1, this._isFullscreen = !1, this._currentDragAction = null, this._copyRange = null, this._cutRange = null, this._fillRange = null, this._cols = {
            store: [],
            sections: [],
            tree: [],
            headerLevels: [],
            hiddenGroups: [],
            iconList: void 0,
            prevNodes: [],
            nextNodes: [],
            indexList: [],
            coordList: []
        }, this._rows = {
            store: [],
            sections: [],
            tree: [],
            headerLevels: [],
            hiddenGroups: [],
            iconList: void 0,
            prevNodes: [],
            nextNodes: [],
            indexList: [],
            coordList: []
        }, this._columnNodes = [], this._topBarNodes = [], this._bottomBarNodes = [], this._colLines = [], this._rowLines = [], this._selection = [{
            range: [{
                x: 0,
                y: 0
            }, {
                x: 0,
                y: 0
            }],
            type: "cell"
        }], this._cellCursorPosition = {
            x: 0,
            y: 0
        }, this._activeRangeIndex = 0, this._viewportPosition = null, this._viewportOverflowPx = {
            x: 0,
            y: 0
        }, this._isViewportConnectedTo = {
            top: !0,
            left: !0
        }, this._sectionsPerPaneX = {
            left: [0],
            center: [1]
        }, this._sectionsPerPaneY = {
            top: [0],
            center: [1]
        }, this._isActive = !1, this._commandKey = this.constructor._isMacOS ? "metaKey" : "ctrlKey", this._searchStr = "", this._searchCellsFound = [], this._searchCellIndex = -1, this._sortState = [], this._sortFunctions = {
            reset: new Function("a,b", "return b[1] - a[1];")
        }, this._rowOrderStore = [], Hr.call(this, t, e)
    };
    return $c.prototype.clearCellValues = function (t) {
        return dl.call(this, t)
    }, $c.prototype.setCellValues = function (t, e, i, o) {
        return Wl.call(this, t, e, i, o)
    }, $c.prototype.fillCells = function (t, e, i) {
        return Kl.call(this, t, e, i)
    }, $c.prototype.deleteCols = function (t) {
        return Gl.call(this, t)
    }, $c.prototype.freezeCols = function (t) {
        return Zl.call(this, t)
    }, $c.prototype.hideCols = function (t) {
        return $l.call(this, t)
    }, $c.prototype.insertEmptyCols = function (t, e) {
        return eh.call(this, t, e)
    }, $c.prototype.moveCols = function (t, e) {
        return lh.call(this, t, e)
    }, $c.prototype.resizeCols = function (t, e) {
        return uh.call(this, t, e)
    }, $c.prototype.resizeColsToFit = function (t) {
        return ph.call(this, t)
    }, $c.prototype.deleteColsById = function (t) {
        return vh.call(this, t)
    }, $c.prototype.freezeColsUntilId = function (t) {
        return wh.call(this, t)
    }, $c.prototype.hideColsById = function (t) {
        return Ih.call(this, t)
    }, $c.prototype.showColsById = function (t) {
        return Lh.call(this, t)
    }, $c.prototype.deleteRows = function (t) {
        return kh.call(this, t)
    }, $c.prototype.freezeRows = function (t) {
        return Hh.call(this, t)
    }, $c.prototype.hideRows = function (t) {
        return zh.call(this, t)
    }, $c.prototype.insertEmptyRows = function (t, e) {
        return Fh.call(this, t, e)
    }, $c.prototype.moveRows = function (t, e) {
        return Oh.call(this, t, e)
    }, $c.prototype.deleteRowsById = function (t) {
        return Wh.call(this, t)
    }, $c.prototype.freezeRowsUntilId = function (t) {
        return Uh.call(this, t)
    }, $c.prototype.hideRowsById = function (t) {
        return $h.call(this, t)
    }, $c.prototype.showRowsById = function (t) {
        return Jh.call(this, t)
    }, $c.prototype.clearSearch = function () {
        return ta.call(this)
    }, $c.prototype.search = function (t) {
        return ia.call(this, t)
    }, $c.prototype.searchPrev = function () {
        return sa.call(this)
    }, $c.prototype.searchNext = function () {
        return oa.call(this)
    }, $c.prototype.sort = function (t, e) {
        return aa.call(this, t, e)
    }, $c.prototype.activate = function () {
        return da.call(this)
    }, $c.prototype.deactivate = function () {
        return ua.call(this)
    }, $c.prototype.getColCoordById = function (t) {
        return pa.call(this, t)
    }, $c.prototype.getColIdByCoord = function (t) {
        return fa.call(this, t)
    }, $c.prototype.getColIdByIndex = function (t) {
        return ga.call(this, t)
    }, $c.prototype.getColIndexByCoord = function (t) {
        return _a.call(this, t)
    }, $c.prototype.getColIndexById = function (t) {
        return ya.call(this, t)
    }, $c.prototype.getColPositionInViewport = function (t) {
        return va.call(this, t)
    }, $c.prototype.getColWidthById = function (t) {
        return ma.call(this, t)
    }, $c.prototype.getColSectionFromCellCoords = function (t) {
        return xa.call(this, t)
    }, $c.prototype.getPanePositionXfromCellCoords = function (t) {
        return wa.call(this, t)
    }, $c.prototype.getRowCoordById = function (t) {
        return Ca.call(this, t)
    }, $c.prototype.getRowHeightById = function (t) {
        return ba.call(this, t)
    }, $c.prototype.getRowIdByCoord = function (t) {
        return Sa.call(this, t)
    }, $c.prototype.getRowIdByIndex = function (t) {
        return Ia.call(this, t)
    }, $c.prototype.getRowIndexByCoord = function (t) {
        return Ra.call(this, t)
    }, $c.prototype.getRowIndexById = function (t) {
        return La.call(this, t)
    }, $c.prototype.getRowPositionInViewport = function (t) {
        return Pa.call(this, t)
    }, $c.prototype.getRowSectionFromCellCoords = function (t) {
        return Na.call(this, t)
    }, $c.prototype.getPanePositionYfromCellCoords = function (t) {
        return ka.call(this, t)
    }, $c.prototype.closeCellEditor = function () {
        return Ha.call(this)
    }, $c.prototype.closeCellEditorAndSave = function () {
        return za.call(this)
    }, $c.prototype.openCellEditor = function (t) {
        return Aa.call(this, t)
    }, $c.prototype.setCellEditorValue = function (t) {
        return Ta.call(this, t)
    }, $c.prototype.copy = function () {
        return Ea.call(this)
    }, $c.prototype.cut = function () {
        return Ma.call(this)
    }, $c.prototype.paste = function () {
        return Ba.call(this)
    }, $c.prototype.openContextMenu = function () {
        return Oa.call(this)
    }, $c.prototype.downloadDataAsCSV = function (t) {
        return Da.call(this, t)
    }, $c.prototype.downloadDataAsJSON = function (t) {
        return Xa.call(this, t)
    }, $c.prototype.getCellRangeData = function (t) {
        return Wa.call(this, t)
    }, $c.prototype.getCellRangeText = function (t) {
        return Ka.call(this, t)
    }, $c.prototype.getCellValue = function (t) {
        return ja.call(this, t)
    }, $c.prototype.getData = function (t) {
        return Ua.call(this, t)
    }, $c.prototype.toggleFullscreen = function () {
        return qa.call(this)
    }, $c.prototype.getSpreadsheetCoords = function (t) {
        return $a.call(this, t)
    }, $c.prototype.alertUser = function (t) {
        return Qa.call(this, t)
    }, $c.prototype.generateCssFromStyles = function () {
        return Ja.call(this)
    }, $c.prototype.redraw = function () {
        return ec.call(this)
    }, $c.prototype.resize = function () {
        return ic.call(this)
    }, $c.prototype.getLocaleSetting = function (t) {
        return oc.call(this, t)
    }, $c.prototype.deselectAll = function () {
        return nc.call(this)
    }, $c.prototype.getAnyRangesFromCellCoords = function (t) {
        return rc.call(this, t)
    }, $c.prototype.getSelection = function (t) {
        return lc.call(this, t)
    }, $c.prototype.selectAll = function (t) {
        return hc.call(this, t)
    }, $c.prototype.modifyActiveRange = function (t) {
        return ac.call(this, t)
    }, $c.prototype.getCellCursorPosition = function () {
        return pc.call(this)
    }, $c.prototype.setCellCursorPosition = function (t) {
        return fc.call(this, t)
    }, $c.prototype.moveCellCursor = function (t) {
        return gc.call(this, t)
    }, $c.prototype.moveCellCursorInsideSelection = function (t) {
        return _c.call(this, t)
    }, $c.prototype.moveCellCursorOneViewportUp = function () {
        return yc.call(this)
    }, $c.prototype.moveCellCursorOneViewportDown = function () {
        return vc.call(this)
    }, $c.prototype.moveCellCursorToColStart = function () {
        return mc.call(this)
    }, $c.prototype.moveCellCursorToColEnd = function () {
        return xc.call(this)
    }, $c.prototype.moveCellCursorToRowStart = function () {
        return wc.call(this)
    }, $c.prototype.moveCellCursorToRowEnd = function () {
        return Cc.call(this)
    }, $c.prototype.moveCellCursorToSheetStart = function () {
        return bc.call(this)
    }, $c.prototype.moveCellCursorToSheetEnd = function () {
        return Sc.call(this)
    }, $c.prototype.setCellSelection = function (t) {
        return Ic.call(this, t)
    }, $c.prototype.getCellSelection = function (t) {
        return Rc.call(this, t)
    }, $c.prototype.setCellRangeExtreme = function (t, e) {
        return Lc.call(this, t, e)
    }, $c.prototype.addCellRangeToSelection = function (t) {
        return Pc.call(this, t)
    }, $c.prototype.getColRangesFromCoord = function (t) {
        return Nc.call(this, t)
    }, $c.prototype.getColSelection = function (t) {
        return kc.call(this, t)
    }, $c.prototype.setColSelection = function (t) {
        return Hc.call(this, t)
    }, $c.prototype.setColRangeExtreme = function (t, e) {
        return Ac.call(this, t, e)
    }, $c.prototype.addColRangeToSelection = function (t) {
        return Tc.call(this, t)
    }, $c.prototype.getRowRangesFromCoord = function (t) {
        return Fc.call(this, t)
    }, $c.prototype.getRowSelection = function (t) {
        return Ec.call(this, t)
    }, $c.prototype.setRowSelection = function (t) {
        return Mc.call(this, t)
    }, $c.prototype.setRowRangeExtreme = function (t, e) {
        return Oc.call(this, t, e)
    }, $c.prototype.addRowRangeToSelection = function (t) {
        return Dc.call(this, t)
    }, $c.prototype.getCellFromStore = function (t, e) {
        return Vc.call(this, t, e)
    }, $c.prototype.getColFromStore = function (t) {
        return Xc.call(this, t)
    }, $c.prototype.getRowFromStore = function (t) {
        return Yc.call(this, t)
    }, $c.prototype.getThemeSetting = function (t) {
        return Wc.call(this, t)
    }, $c.prototype.undo = function () {
        return Kc.call(this)
    }, $c.prototype.redo = function () {
        return jc.call(this)
    }, $c.prototype.getViewportPosition = function () {
        return Uc.call(this)
    }, $c.prototype.setViewportPosition = function (t) {
        return qc.call(this, t)
    }, $c.prototype.destroy = function () {
        return Zc.call(this)
    }, $c._domNodes = {}, $c.instances = [], $c._isIE = function () {
        var t = window.navigator.userAgent,
            e = t.indexOf("MSIE ");
        if (e > 0) return parseInt(t.substring(e + 5, t.indexOf(".", e)), 10);
        if (t.indexOf("Trident/") > 0) {
            var i = t.indexOf("rv:");
            return parseInt(t.substring(i + 3, t.indexOf(".", i)), 10)
        }
        return !1
    }(), $c._isMacOS = navigator.platform.indexOf("Mac") > -1, $c._isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1, $c._isTouchDevice = window.matchMedia("(pointer: coarse)").matches, $c.createEmptyData = function (t, e) {
        for (var i = [], o = 0; o < t; o++) {
            i.push([]);
            for (var s = 0; s < e; s++) i[o].push(null)
        }
        return i
    }, $c.createDummyData = function (t, e) {
        for (var i = [], o = 0; o < t; o++) {
            i.push([]);
            for (var s = 0; s < e; s++) i[o].push(o + 1 + ";" + (s + 1))
        }
        return i
    }, $c
}();