var Jn = Object.defineProperty, Zn = (r, i, t) => i in r ? Jn(r, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[i] = t, g = (r, i, t) => Zn(r, typeof i != "symbol" ? i + "" : i, t), ht = { 0: 8203, 1: 8204, 2: 8205, 3: 8290, 4: 8291, 5: 8288, 6: 65279, 7: 8289, 8: 119155, 9: 119156, a: 119157, b: 119158, c: 119159, d: 119160, e: 119161, f: 119162 }, pt = { 0: 8203, 1: 8204, 2: 8205, 3: 65279 }, Xn = new Array(4).fill(String.fromCodePoint(pt[0])).join(""), ot = "\0", qn = Object.fromEntries(Object.entries(pt).map((r) => r.reverse())), st = Object.fromEntries(Object.entries(ht).map((r) => r.reverse())), Qn = `${Object.values(ht).map((r) => `\\u{${r.toString(16)}}`).join("")}`, Wn = new RegExp(`[${Qn}]{4,}`, "gu");
function er(r) {
  let i = r.match(Wn);
  if (i) return tr(i[0], !0)[0];
}
function tr(r, i = !1) {
  let t = Array.from(r);
  if (t.length % 2 === 0) {
    if (t.length % 4 || !r.startsWith(Xn)) return nr(t, i);
  } else throw new Error("Encoded data has invalid length");
  let o = [];
  for (let a = t.length * 0.25; a--; ) {
    let l = t.slice(a * 4, a * 4 + 4).map((f) => qn[f.codePointAt(0)]).join("");
    o.unshift(String.fromCharCode(parseInt(l, 4)));
  }
  if (i) {
    o.shift();
    let a = o.indexOf(ot);
    return a === -1 && (a = o.length), [JSON.parse(o.slice(0, a).join(""))];
  }
  return o.join("").split(ot).filter(Boolean).map((a) => JSON.parse(a));
}
function nr(r, i) {
  var t;
  let o = [];
  for (let c = r.length * 0.5; c--; ) {
    let d = `${st[r[c * 2].codePointAt(0)]}${st[r[c * 2 + 1].codePointAt(0)]}`;
    o.unshift(String.fromCharCode(parseInt(d, 16)));
  }
  let a = [], l = [o.join("")], f = 10;
  for (; l.length; ) {
    let c = l.shift();
    try {
      if (a.push(JSON.parse(c)), i) return a;
    } catch (d) {
      if (!f--) throw d;
      let v = +((t = d.message.match(/\sposition\s(\d+)$/)) == null ? void 0 : t[1]);
      if (!v) throw d;
      l.unshift(c.substring(0, v), c.substring(v));
    }
  }
  return a;
}
function rr(r) {
  return er(r);
}
var De, at;
function ir() {
  if (at) return De;
  at = 1;
  var r = Object.prototype.hasOwnProperty, i = Object.prototype.toString;
  return De = function(t, o, a) {
    if (i.call(o) !== "[object Function]")
      throw new TypeError("iterator must be a function");
    var l = t.length;
    if (l === +l)
      for (var f = 0; f < l; f++)
        o.call(a, t[f], f, t);
    else
      for (var c in t)
        r.call(t, c) && o.call(a, t[c], c, t);
  }, De;
}
var Ae, lt;
function or() {
  if (lt) return Ae;
  lt = 1;
  var r = ir();
  Ae = i;
  function i(t, o, a) {
    if (arguments.length === 3)
      return i.set(t, o, a);
    if (arguments.length === 2)
      return i.get(t, o);
    var l = i.bind(i, t);
    for (var f in i)
      i.hasOwnProperty(f) && (l[f] = i[f].bind(l, t));
    return l;
  }
  return i.get = function(t, o) {
    for (var a = Array.isArray(o) ? o : i.parse(o), l = 0; l < a.length; ++l) {
      var f = a[l];
      if (!(typeof t == "object" && f in t))
        throw new Error("Invalid reference token: " + f);
      t = t[f];
    }
    return t;
  }, i.set = function(t, o, a) {
    var l = Array.isArray(o) ? o : i.parse(o), f = l[0];
    if (l.length === 0)
      throw Error("Can not set the root object");
    for (var c = 0; c < l.length - 1; ++c) {
      var d = l[c];
      typeof d != "string" && typeof d != "number" && (d = String(d)), !(d === "__proto__" || d === "constructor" || d === "prototype") && (d === "-" && Array.isArray(t) && (d = t.length), f = l[c + 1], d in t || (f.match(/^(\d+|-)$/) ? t[d] = [] : t[d] = {}), t = t[d]);
    }
    return f === "-" && Array.isArray(t) && (f = t.length), t[f] = a, this;
  }, i.remove = function(t, o) {
    var a = Array.isArray(o) ? o : i.parse(o), l = a[a.length - 1];
    if (l === void 0)
      throw new Error('Invalid JSON pointer for remove: "' + o + '"');
    var f = i.get(t, a.slice(0, -1));
    if (Array.isArray(f)) {
      var c = +l;
      if (l === "" && isNaN(c))
        throw new Error('Invalid array index: "' + l + '"');
      Array.prototype.splice.call(f, c, 1);
    } else
      delete f[l];
  }, i.dict = function(t, o) {
    var a = {};
    return i.walk(t, function(l, f) {
      a[f] = l;
    }, o), a;
  }, i.walk = function(t, o, a) {
    var l = [];
    a = a || function(f) {
      var c = Object.prototype.toString.call(f);
      return c === "[object Object]" || c === "[object Array]";
    }, function f(c) {
      r(c, function(d, v) {
        l.push(String(v)), a(d) ? f(d) : o(d, i.compile(l)), l.pop();
      });
    }(t);
  }, i.has = function(t, o) {
    try {
      i.get(t, o);
    } catch {
      return !1;
    }
    return !0;
  }, i.escape = function(t) {
    return t.toString().replace(/~/g, "~0").replace(/\//g, "~1");
  }, i.unescape = function(t) {
    return t.replace(/~1/g, "/").replace(/~0/g, "~");
  }, i.parse = function(t) {
    if (t === "")
      return [];
    if (t.charAt(0) !== "/")
      throw new Error("Invalid JSON pointer: " + t);
    return t.substring(1).split(/\//).map(i.unescape);
  }, i.compile = function(t) {
    return t.length === 0 ? "" : "/" + t.map(i.escape).join("/");
  }, Ae;
}
or();
const sr = "4.6.20", ar = {
  version: sr
};
let gt = !1;
function ct(r) {
  gt = r;
}
const Ce = (r) => (...i) => {
  gt && console[r](...i);
}, C = {
  error: Ce("error"),
  warn: Ce("warn"),
  log: Ce("log")
};
function lr(r, i = 500) {
  let t = window.location.href;
  const o = setInterval(() => {
    const a = window.location.href;
    a !== t && (t = a, r(a));
  }, i);
  return () => clearInterval(o);
}
const cr = "live-preview-editor", ur = "live-preview-sdk";
function R(r, i, t) {
  const o = {
    ...i,
    method: r,
    source: ur,
    location: window.location.href,
    version: ar.version
  };
  C.log("Send message", o), t.forEach((a) => {
    var l;
    (l = window.top) == null || l.postMessage(o, a);
  });
}
function fr(r, i = 100) {
  let t;
  return (...o) => {
    clearTimeout(t), t = setTimeout(() => {
      r.apply(this, o);
    }, i);
  };
}
function dr() {
  var r;
  try {
    return ((r = window.top) == null ? void 0 : r.location.href) !== window.location.href;
  } catch {
    return !0;
  }
}
function hr() {
  return `${performance.now()}-${Math.random().toString(36).slice(2)}`;
}
function pr(r) {
  return typeof r.data != "object" || !r.data ? !1 : "source" in r.data && r.data.source === cr;
}
var ge = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function gr(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var ve = { exports: {} };
ve.exports;
var ut;
function vr() {
  return ut || (ut = 1, function(r, i) {
    var t = 200, o = "__lodash_hash_undefined__", a = 1, l = 2, f = 9007199254740991, c = "[object Arguments]", d = "[object Array]", v = "[object AsyncFunction]", h = "[object Boolean]", I = "[object Date]", D = "[object Error]", Q = "[object Function]", k = "[object GeneratorFunction]", x = "[object Map]", W = "[object Number]", ie = "[object Null]", X = "[object Object]", Le = "[object Promise]", _t = "[object Proxy]", je = "[object RegExp]", oe = "[object Set]", Ne = "[object String]", wt = "[object Symbol]", Tt = "[object Undefined]", Ee = "[object WeakMap]", Re = "[object ArrayBuffer]", se = "[object DataView]", Ot = "[object Float32Array]", It = "[object Float64Array]", Dt = "[object Int8Array]", At = "[object Int16Array]", Ct = "[object Int32Array]", St = "[object Uint8Array]", Mt = "[object Uint8ClampedArray]", Lt = "[object Uint16Array]", jt = "[object Uint32Array]", Nt = /[\\^$.*+?()[\]{}|]/g, Rt = /^\[object .+?Constructor\]$/, Ut = /^(?:0|[1-9]\d*)$/, m = {};
    m[Ot] = m[It] = m[Dt] = m[At] = m[Ct] = m[St] = m[Mt] = m[Lt] = m[jt] = !0, m[c] = m[d] = m[Re] = m[h] = m[se] = m[I] = m[D] = m[Q] = m[x] = m[W] = m[X] = m[je] = m[oe] = m[Ne] = m[Ee] = !1;
    var Ue = typeof ge == "object" && ge && ge.Object === Object && ge, Pt = typeof self == "object" && self && self.Object === Object && self, P = Ue || Pt || Function("return this")(), Pe = i && !i.nodeType && i, ze = Pe && !0 && r && !r.nodeType && r, Be = ze && ze.exports === Pe, me = Be && Ue.process, ke = function() {
      try {
        return me && me.binding && me.binding("util");
      } catch {
      }
    }(), Ge = ke && ke.isTypedArray;
    function zt(e, n) {
      for (var s = -1, u = e == null ? 0 : e.length, b = 0, p = []; ++s < u; ) {
        var _ = e[s];
        n(_, s, e) && (p[b++] = _);
      }
      return p;
    }
    function Bt(e, n) {
      for (var s = -1, u = n.length, b = e.length; ++s < u; )
        e[b + s] = n[s];
      return e;
    }
    function kt(e, n) {
      for (var s = -1, u = e == null ? 0 : e.length; ++s < u; )
        if (n(e[s], s, e))
          return !0;
      return !1;
    }
    function Gt(e, n) {
      for (var s = -1, u = Array(e); ++s < e; )
        u[s] = n(s);
      return u;
    }
    function Ft(e) {
      return function(n) {
        return e(n);
      };
    }
    function $t(e, n) {
      return e.has(n);
    }
    function xt(e, n) {
      return e == null ? void 0 : e[n];
    }
    function Vt(e) {
      var n = -1, s = Array(e.size);
      return e.forEach(function(u, b) {
        s[++n] = [b, u];
      }), s;
    }
    function Yt(e, n) {
      return function(s) {
        return e(n(s));
      };
    }
    function Ht(e) {
      var n = -1, s = Array(e.size);
      return e.forEach(function(u) {
        s[++n] = u;
      }), s;
    }
    var Kt = Array.prototype, Jt = Function.prototype, ae = Object.prototype, be = P["__core-js_shared__"], Fe = Jt.toString, N = ae.hasOwnProperty, $e = function() {
      var e = /[^.]+$/.exec(be && be.keys && be.keys.IE_PROTO || "");
      return e ? "Symbol(src)_1." + e : "";
    }(), xe = ae.toString, Zt = RegExp(
      "^" + Fe.call(N).replace(Nt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), Ve = Be ? P.Buffer : void 0, le = P.Symbol, Ye = P.Uint8Array, He = ae.propertyIsEnumerable, Xt = Kt.splice, V = le ? le.toStringTag : void 0, Ke = Object.getOwnPropertySymbols, qt = Ve ? Ve.isBuffer : void 0, Qt = Yt(Object.keys, Object), ye = q(P, "DataView"), ee = q(P, "Map"), _e = q(P, "Promise"), we = q(P, "Set"), Te = q(P, "WeakMap"), te = q(Object, "create"), Wt = K(ye), en = K(ee), tn = K(_e), nn = K(we), rn = K(Te), Je = le ? le.prototype : void 0, Oe = Je ? Je.valueOf : void 0;
    function Y(e) {
      var n = -1, s = e == null ? 0 : e.length;
      for (this.clear(); ++n < s; ) {
        var u = e[n];
        this.set(u[0], u[1]);
      }
    }
    function on() {
      this.__data__ = te ? te(null) : {}, this.size = 0;
    }
    function sn(e) {
      var n = this.has(e) && delete this.__data__[e];
      return this.size -= n ? 1 : 0, n;
    }
    function an(e) {
      var n = this.__data__;
      if (te) {
        var s = n[e];
        return s === o ? void 0 : s;
      }
      return N.call(n, e) ? n[e] : void 0;
    }
    function ln(e) {
      var n = this.__data__;
      return te ? n[e] !== void 0 : N.call(n, e);
    }
    function cn(e, n) {
      var s = this.__data__;
      return this.size += this.has(e) ? 0 : 1, s[e] = te && n === void 0 ? o : n, this;
    }
    Y.prototype.clear = on, Y.prototype.delete = sn, Y.prototype.get = an, Y.prototype.has = ln, Y.prototype.set = cn;
    function z(e) {
      var n = -1, s = e == null ? 0 : e.length;
      for (this.clear(); ++n < s; ) {
        var u = e[n];
        this.set(u[0], u[1]);
      }
    }
    function un() {
      this.__data__ = [], this.size = 0;
    }
    function fn(e) {
      var n = this.__data__, s = ue(n, e);
      if (s < 0)
        return !1;
      var u = n.length - 1;
      return s == u ? n.pop() : Xt.call(n, s, 1), --this.size, !0;
    }
    function dn(e) {
      var n = this.__data__, s = ue(n, e);
      return s < 0 ? void 0 : n[s][1];
    }
    function hn(e) {
      return ue(this.__data__, e) > -1;
    }
    function pn(e, n) {
      var s = this.__data__, u = ue(s, e);
      return u < 0 ? (++this.size, s.push([e, n])) : s[u][1] = n, this;
    }
    z.prototype.clear = un, z.prototype.delete = fn, z.prototype.get = dn, z.prototype.has = hn, z.prototype.set = pn;
    function H(e) {
      var n = -1, s = e == null ? 0 : e.length;
      for (this.clear(); ++n < s; ) {
        var u = e[n];
        this.set(u[0], u[1]);
      }
    }
    function gn() {
      this.size = 0, this.__data__ = {
        hash: new Y(),
        map: new (ee || z)(),
        string: new Y()
      };
    }
    function vn(e) {
      var n = fe(this, e).delete(e);
      return this.size -= n ? 1 : 0, n;
    }
    function En(e) {
      return fe(this, e).get(e);
    }
    function mn(e) {
      return fe(this, e).has(e);
    }
    function bn(e, n) {
      var s = fe(this, e), u = s.size;
      return s.set(e, n), this.size += s.size == u ? 0 : 1, this;
    }
    H.prototype.clear = gn, H.prototype.delete = vn, H.prototype.get = En, H.prototype.has = mn, H.prototype.set = bn;
    function ce(e) {
      var n = -1, s = e == null ? 0 : e.length;
      for (this.__data__ = new H(); ++n < s; )
        this.add(e[n]);
    }
    function yn(e) {
      return this.__data__.set(e, o), this;
    }
    function _n(e) {
      return this.__data__.has(e);
    }
    ce.prototype.add = ce.prototype.push = yn, ce.prototype.has = _n;
    function G(e) {
      var n = this.__data__ = new z(e);
      this.size = n.size;
    }
    function wn() {
      this.__data__ = new z(), this.size = 0;
    }
    function Tn(e) {
      var n = this.__data__, s = n.delete(e);
      return this.size = n.size, s;
    }
    function On(e) {
      return this.__data__.get(e);
    }
    function In(e) {
      return this.__data__.has(e);
    }
    function Dn(e, n) {
      var s = this.__data__;
      if (s instanceof z) {
        var u = s.__data__;
        if (!ee || u.length < t - 1)
          return u.push([e, n]), this.size = ++s.size, this;
        s = this.__data__ = new H(u);
      }
      return s.set(e, n), this.size = s.size, this;
    }
    G.prototype.clear = wn, G.prototype.delete = Tn, G.prototype.get = On, G.prototype.has = In, G.prototype.set = Dn;
    function An(e, n) {
      var s = de(e), u = !s && $n(e), b = !s && !u && Ie(e), p = !s && !u && !b && rt(e), _ = s || u || b || p, w = _ ? Gt(e.length, String) : [], T = w.length;
      for (var y in e)
        N.call(e, y) && !(_ && // Safari 9 has enumerable `arguments.length` in strict mode.
        (y == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        b && (y == "offset" || y == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        p && (y == "buffer" || y == "byteLength" || y == "byteOffset") || // Skip index properties.
        zn(y, T))) && w.push(y);
      return w;
    }
    function ue(e, n) {
      for (var s = e.length; s--; )
        if (We(e[s][0], n))
          return s;
      return -1;
    }
    function Cn(e, n, s) {
      var u = n(e);
      return de(e) ? u : Bt(u, s(e));
    }
    function ne(e) {
      return e == null ? e === void 0 ? Tt : ie : V && V in Object(e) ? Un(e) : Fn(e);
    }
    function Ze(e) {
      return re(e) && ne(e) == c;
    }
    function Xe(e, n, s, u, b) {
      return e === n ? !0 : e == null || n == null || !re(e) && !re(n) ? e !== e && n !== n : Sn(e, n, s, u, Xe, b);
    }
    function Sn(e, n, s, u, b, p) {
      var _ = de(e), w = de(n), T = _ ? d : F(e), y = w ? d : F(n);
      T = T == c ? X : T, y = y == c ? X : y;
      var A = T == X, j = y == X, O = T == y;
      if (O && Ie(e)) {
        if (!Ie(n))
          return !1;
        _ = !0, A = !1;
      }
      if (O && !A)
        return p || (p = new G()), _ || rt(e) ? qe(e, n, s, u, b, p) : Nn(e, n, T, s, u, b, p);
      if (!(s & a)) {
        var S = A && N.call(e, "__wrapped__"), M = j && N.call(n, "__wrapped__");
        if (S || M) {
          var $ = S ? e.value() : e, B = M ? n.value() : n;
          return p || (p = new G()), b($, B, s, u, p);
        }
      }
      return O ? (p || (p = new G()), Rn(e, n, s, u, b, p)) : !1;
    }
    function Mn(e) {
      if (!nt(e) || kn(e))
        return !1;
      var n = et(e) ? Zt : Rt;
      return n.test(K(e));
    }
    function Ln(e) {
      return re(e) && tt(e.length) && !!m[ne(e)];
    }
    function jn(e) {
      if (!Gn(e))
        return Qt(e);
      var n = [];
      for (var s in Object(e))
        N.call(e, s) && s != "constructor" && n.push(s);
      return n;
    }
    function qe(e, n, s, u, b, p) {
      var _ = s & a, w = e.length, T = n.length;
      if (w != T && !(_ && T > w))
        return !1;
      var y = p.get(e);
      if (y && p.get(n))
        return y == n;
      var A = -1, j = !0, O = s & l ? new ce() : void 0;
      for (p.set(e, n), p.set(n, e); ++A < w; ) {
        var S = e[A], M = n[A];
        if (u)
          var $ = _ ? u(M, S, A, n, e, p) : u(S, M, A, e, n, p);
        if ($ !== void 0) {
          if ($)
            continue;
          j = !1;
          break;
        }
        if (O) {
          if (!kt(n, function(B, J) {
            if (!$t(O, J) && (S === B || b(S, B, s, u, p)))
              return O.push(J);
          })) {
            j = !1;
            break;
          }
        } else if (!(S === M || b(S, M, s, u, p))) {
          j = !1;
          break;
        }
      }
      return p.delete(e), p.delete(n), j;
    }
    function Nn(e, n, s, u, b, p, _) {
      switch (s) {
        case se:
          if (e.byteLength != n.byteLength || e.byteOffset != n.byteOffset)
            return !1;
          e = e.buffer, n = n.buffer;
        case Re:
          return !(e.byteLength != n.byteLength || !p(new Ye(e), new Ye(n)));
        case h:
        case I:
        case W:
          return We(+e, +n);
        case D:
          return e.name == n.name && e.message == n.message;
        case je:
        case Ne:
          return e == n + "";
        case x:
          var w = Vt;
        case oe:
          var T = u & a;
          if (w || (w = Ht), e.size != n.size && !T)
            return !1;
          var y = _.get(e);
          if (y)
            return y == n;
          u |= l, _.set(e, n);
          var A = qe(w(e), w(n), u, b, p, _);
          return _.delete(e), A;
        case wt:
          if (Oe)
            return Oe.call(e) == Oe.call(n);
      }
      return !1;
    }
    function Rn(e, n, s, u, b, p) {
      var _ = s & a, w = Qe(e), T = w.length, y = Qe(n), A = y.length;
      if (T != A && !_)
        return !1;
      for (var j = T; j--; ) {
        var O = w[j];
        if (!(_ ? O in n : N.call(n, O)))
          return !1;
      }
      var S = p.get(e);
      if (S && p.get(n))
        return S == n;
      var M = !0;
      p.set(e, n), p.set(n, e);
      for (var $ = _; ++j < T; ) {
        O = w[j];
        var B = e[O], J = n[O];
        if (u)
          var it = _ ? u(J, B, O, n, e, p) : u(B, J, O, e, n, p);
        if (!(it === void 0 ? B === J || b(B, J, s, u, p) : it)) {
          M = !1;
          break;
        }
        $ || ($ = O == "constructor");
      }
      if (M && !$) {
        var he = e.constructor, pe = n.constructor;
        he != pe && "constructor" in e && "constructor" in n && !(typeof he == "function" && he instanceof he && typeof pe == "function" && pe instanceof pe) && (M = !1);
      }
      return p.delete(e), p.delete(n), M;
    }
    function Qe(e) {
      return Cn(e, Yn, Pn);
    }
    function fe(e, n) {
      var s = e.__data__;
      return Bn(n) ? s[typeof n == "string" ? "string" : "hash"] : s.map;
    }
    function q(e, n) {
      var s = xt(e, n);
      return Mn(s) ? s : void 0;
    }
    function Un(e) {
      var n = N.call(e, V), s = e[V];
      try {
        e[V] = void 0;
        var u = !0;
      } catch {
      }
      var b = xe.call(e);
      return u && (n ? e[V] = s : delete e[V]), b;
    }
    var Pn = Ke ? function(e) {
      return e == null ? [] : (e = Object(e), zt(Ke(e), function(n) {
        return He.call(e, n);
      }));
    } : Hn, F = ne;
    (ye && F(new ye(new ArrayBuffer(1))) != se || ee && F(new ee()) != x || _e && F(_e.resolve()) != Le || we && F(new we()) != oe || Te && F(new Te()) != Ee) && (F = function(e) {
      var n = ne(e), s = n == X ? e.constructor : void 0, u = s ? K(s) : "";
      if (u)
        switch (u) {
          case Wt:
            return se;
          case en:
            return x;
          case tn:
            return Le;
          case nn:
            return oe;
          case rn:
            return Ee;
        }
      return n;
    });
    function zn(e, n) {
      return n = n ?? f, !!n && (typeof e == "number" || Ut.test(e)) && e > -1 && e % 1 == 0 && e < n;
    }
    function Bn(e) {
      var n = typeof e;
      return n == "string" || n == "number" || n == "symbol" || n == "boolean" ? e !== "__proto__" : e === null;
    }
    function kn(e) {
      return !!$e && $e in e;
    }
    function Gn(e) {
      var n = e && e.constructor, s = typeof n == "function" && n.prototype || ae;
      return e === s;
    }
    function Fn(e) {
      return xe.call(e);
    }
    function K(e) {
      if (e != null) {
        try {
          return Fe.call(e);
        } catch {
        }
        try {
          return e + "";
        } catch {
        }
      }
      return "";
    }
    function We(e, n) {
      return e === n || e !== e && n !== n;
    }
    var $n = Ze(/* @__PURE__ */ function() {
      return arguments;
    }()) ? Ze : function(e) {
      return re(e) && N.call(e, "callee") && !He.call(e, "callee");
    }, de = Array.isArray;
    function xn(e) {
      return e != null && tt(e.length) && !et(e);
    }
    var Ie = qt || Kn;
    function Vn(e, n) {
      return Xe(e, n);
    }
    function et(e) {
      if (!nt(e))
        return !1;
      var n = ne(e);
      return n == Q || n == k || n == v || n == _t;
    }
    function tt(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= f;
    }
    function nt(e) {
      var n = typeof e;
      return e != null && (n == "object" || n == "function");
    }
    function re(e) {
      return e != null && typeof e == "object";
    }
    var rt = Ge ? Ft(Ge) : Ln;
    function Yn(e) {
      return xn(e) ? An(e) : jn(e);
    }
    function Hn() {
      return [];
    }
    function Kn() {
      return !1;
    }
    r.exports = Vn;
  }(ve, ve.exports)), ve.exports;
}
var Er = vr();
const mr = /* @__PURE__ */ gr(Er);
var E = /* @__PURE__ */ ((r) => (r.FIELD_ID = "data-contentful-field-id", r.ENTRY_ID = "data-contentful-entry-id", r.ASSET_ID = "data-contentful-asset-id", r.LOCALE = "data-contentful-locale", r.SPACE = "data-contentful-space", r.ENVIRONMENT = "data-contentful-environment", r))(E || {}), Z = /* @__PURE__ */ ((r) => (r.MOUSE_MOVE = "MOUSE_MOVE", r.SCROLL_START = "SCROLL_START", r.SCROLL_END = "SCROLL_END", r.RESIZE_START = "RESIZE_START", r.RESIZE_END = "RESIZE_END", r.TAGGED_ELEMENTS = "TAGGED_ELEMENTS", r.INSPECTOR_MODE_CHANGED = "INSPECTOR_MODE_CHANGED", r))(Z || {}), vt = { 0: 8203, 1: 8204, 2: 8205, 3: 8290, 4: 8291, 5: 8288, 6: 65279, 7: 8289, 8: 119155, 9: 119156, a: 119157, b: 119158, c: 119159, d: 119160, e: 119161, f: 119162 }, Et = { 0: 8203, 1: 8204, 2: 8205, 3: 65279 };
new Array(4).fill(String.fromCodePoint(Et[0])).join("");
Object.fromEntries(Object.entries(Et).map((r) => r.reverse()));
Object.fromEntries(Object.entries(vt).map((r) => r.reverse()));
var br = `${Object.values(vt).map((r) => `\\u{${r.toString(16)}}`).join("")}`, yr = new RegExp(`[${br}]{4,}`, "gu");
const _r = (r) => {
  if (!r || r.nodeType !== Node.ELEMENT_NODE)
    return !1;
  const i = r;
  return !(!i.hasAttribute(E.FIELD_ID) || !i.hasAttribute(E.ENTRY_ID) && !i.hasAttribute(E.ASSET_ID));
};
function wr(r, i) {
  if (!_r(r))
    return null;
  const t = {
    fieldId: r.getAttribute(E.FIELD_ID),
    locale: r.getAttribute(E.LOCALE) ?? i.locale,
    environment: r.getAttribute(E.ENVIRONMENT) ?? i.environment,
    space: r.getAttribute(E.SPACE) ?? i.space,
    manuallyTagged: !0
  };
  if (!t.fieldId)
    return C.warn("Element is missing field ID attribute and cannot be tagged", {
      id: r.getAttribute(E.ENTRY_ID) ?? r.getAttribute(E.ASSET_ID),
      sharedProps: t
    }), null;
  const o = r.getAttribute(E.ENTRY_ID);
  if (o)
    return { ...t, entryId: o };
  const a = r.getAttribute(E.ASSET_ID);
  return a ? { ...t, assetId: a } : null;
}
function mt(r, i) {
  return r.href === i.href;
}
function Tr(r, i) {
  return !(!mt(r.sourceMap, i.sourceMap) || r.element !== i.element);
}
function Or(r) {
  let i = [];
  return typeof r.matches == "function" && r.matches("*") && (i = [r]), [
    ...i,
    ...Array.from(r.querySelectorAll("*:not(script,style,meta,title)"))
  ].map((t) => ({ node: t, text: Ir(t) })).filter(({ text: t }) => !!(t && t.match(yr)));
}
function Ir(r) {
  return r.matches("input[type=submit], input[type=button], input[type=reset]") ? r.value : r.matches("img, video") ? r.alt : Array.from(r.childNodes).filter((i) => i.nodeType === Node.TEXT_NODE && !!i.textContent).map((i) => i.textContent).join("");
}
function Dr(r, i) {
  for (const t of i)
    if (t.element === r || t.element.contains(r))
      return !0;
  return !1;
}
function Me({
  root: r = window.document,
  options: i
}) {
  const t = [...i.ignoreManuallyTaggedElements ? [] : r.querySelectorAll(
    `[${E.ASSET_ID}][${E.FIELD_ID}], [${E.ENTRY_ID}][${E.FIELD_ID}]`
  )].map((c) => ({
    element: c,
    attributes: wr(c, i)
  })).filter(({ attributes: c }) => c !== null), o = [], a = Or("body" in r ? r.body : r);
  for (const { node: c, text: d } of a) {
    const v = rr(d);
    if (!v || !v.origin.includes("contentful.com")) {
      C.warn(
        "Element has missing or invalid ContentSourceMap, please check if you have correctly enabled ContentSourceMaps and that the element's data originates from Contentful",
        {
          node: c,
          sourceMap: v
        }
      );
      continue;
    }
    if (!(Dr(c, t) || o.some(
      (h) => h.element.contains(c) && mt(h.sourceMap, v)
    ))) {
      if (c.matches("img")) {
        const h = c.closest("figure") || c.closest("picture") || c;
        o.push({ element: h, sourceMap: v });
        continue;
      }
      o.push({ element: c, sourceMap: v });
    }
  }
  const l = o.filter(
    (c, d) => o.findIndex((v) => Tr(c, v)) === d
  );
  for (const { element: c, sourceMap: d } of l) {
    let v = null;
    if (d.href) {
      const h = Lr(d.href);
      if (!h)
        continue;
      if (h.entityType === "Asset")
        v = {
          fieldId: h.fieldId,
          locale: h.locale,
          space: h.space,
          environment: h.environment,
          assetId: h.entityId
        };
      else if (h.entityType === "Entry")
        v = {
          fieldId: h.fieldId,
          locale: h.locale,
          space: h.space,
          environment: h.environment,
          entryId: h.entityId
        };
      else {
        C.warn("Unknown entityType", {
          element: c,
          sourceMap: d
        });
        continue;
      }
    } else if (d.contentful && jr(d.contentful)) {
      const h = d.contentful;
      if (!h.entity || !h.field || !h.locale || !h.space || !h.environment) {
        C.warn(
          "Element has missing information in their ContentSourceMap, please check if you have restricted the platform for the encoding. (Missing parameters in `contentful`)",
          {
            element: c,
            sourceMap: d
          }
        );
        continue;
      }
      const I = {
        fieldId: h.field,
        locale: h.locale,
        space: h.space,
        environment: h.environment
      };
      if (h.entityType === "Asset")
        I.assetId = h.entity, v = I;
      else if (h.entityType === "Entry")
        I.entryId = h.entity, v = I;
      else {
        C.warn("Unknown entityType in contentful data", {
          element: c,
          sourceMap: d
        });
        continue;
      }
    } else {
      C.warn(
        "Element has neither href nor contentful data in their ContentSourceMap, unable to extract attributes.",
        {
          element: c,
          sourceMap: d
        }
      );
      continue;
    }
    t.push({
      element: c,
      attributes: v
    });
  }
  const f = t.filter(
    ({ attributes: c }) => (c == null ? void 0 : c.manuallyTagged) === !1 || !(c != null && c.manuallyTagged)
  ).length;
  return {
    taggedElements: t,
    manuallyTaggedCount: t.length - f,
    automaticallyTaggedCount: f,
    autoTaggedElements: l
  };
}
function bt({
  options: r
}) {
  return [
    ...new Set(
      Me({ options: r }).taggedElements.map((i) => i.attributes && "entryId" in i.attributes ? i.attributes.entryId : null).filter(Boolean)
    )
  ];
}
const Ar = (r, i, t = window.document) => {
  const { top: o, right: a, bottom: l, left: f } = i, c = t.elementFromPoint(f + 1, o + 1), d = t.elementFromPoint(a - 1, o + 1), v = t.elementFromPoint(f + 1, l - 1), h = t.elementFromPoint(a - 1, l - 1);
  return !(c === r && d === r && v === r && h === r);
}, Cr = (r, i = window.document) => r.map((t) => ({
  ...t,
  isVisible: t.element.checkVisibility({
    checkOpacity: !0,
    checkVisibilityCSS: !0
  }),
  isCoveredByOtherElement: Ar(
    t.element,
    t.coordinates,
    i
  )
})), Sr = (r) => r.map(({ element: i, attributes: t }) => ({
  element: i,
  coordinates: i.getBoundingClientRect(),
  attributes: t
})), Mr = (r, i = window.document) => {
  const t = Sr(r);
  return Cr(t, i);
};
function Lr(r) {
  try {
    const i = new URL(r), t = i.searchParams.get("focusedField"), o = i.searchParams.get("focusedLocale"), a = i.pathname.split("/").filter(Boolean), l = a.indexOf("spaces"), f = a.indexOf("environments"), c = l !== -1 ? a[l + 1] : void 0, d = f !== -1 ? a[f + 1] : void 0;
    let v, h;
    const I = a.indexOf("entries"), D = a.indexOf("assets");
    return I !== -1 ? (v = "Entry", h = a[I + 1]) : D !== -1 && (v = "Asset", h = a[D + 1]), !v || !h ? (console.warn("Unable to determine entityType or entityId from href", { href: r }), null) : t ? o ? !c || !d ? (console.warn("Missing space or environment in href path", { href: r }), null) : {
      entityId: h,
      entityType: v,
      fieldId: t,
      locale: o,
      space: c,
      environment: d
    } : (console.warn("Missing focusedLocale query parameter in href", { href: r }), null) : (console.warn("Missing focusedField query parameter in href", { href: r }), null);
  } catch (i) {
    return console.warn("Invalid href URL", { href: r, error: i }), null;
  }
}
function jr(r) {
  return r && typeof r.entity == "string" && typeof r.field == "string" && typeof r.locale == "string" && typeof r.space == "string" && typeof r.environment == "string" && (r.entityType === "Asset" || r.entityType === "Entry");
}
class Nr {
  constructor(i) {
    g(this, "delay", 300), g(this, "isScrolling", !1), g(this, "scrollTimeout"), g(this, "isResizing", !1), g(this, "resizeTimeout"), g(this, "hoveredElement"), g(this, "taggedElements", []), g(this, "manuallyTaggedCount", 0), g(this, "automaticallyTaggedCount", 0), g(this, "intersectionObserver"), g(this, "observersCB", []), g(this, "cleanupCB", []), g(this, "init", () => {
      this.cleanupCB = [
        this.addScrollListener(),
        this.addMutationListener(document.body),
        this.addResizeListener(),
        this.addHoverListener()
      ], this.updateElements();
    }), g(this, "cleanup", () => {
      this.observersCB.forEach((t) => t()), this.cleanupCB.forEach((t) => t());
    }), g(this, "receiveMessage", (t) => {
      if (t.method === Z.INSPECTOR_MODE_CHANGED) {
        const { isInspectorActive: o } = t;
        o ? this.init() : this.cleanup();
      }
    }), g(this, "observe", (t) => {
      this.intersectionObserver.observe(t);
      const o = this.addMutationListener(t);
      this.observersCB.push(o, () => this.intersectionObserver.unobserve(t));
    }), g(this, "addScrollListener", () => {
      const { targetOrigin: t } = this.options, o = () => {
        this.isScrolling || (this.isScrolling = !0, R(Z.SCROLL_START, {}, t)), this.scrollTimeout && clearTimeout(this.scrollTimeout), this.scrollTimeout = setTimeout(() => {
          this.isScrolling = !1, R(Z.SCROLL_END, {}, t), this.updateElements();
        }, this.delay);
      }, a = { capture: !0, passive: !0 };
      return window.addEventListener("scroll", o, a), () => window.removeEventListener("scroll", o, a);
    }), g(this, "addMutationListener", (t) => {
      const o = new MutationObserver(() => {
        this.updateElements();
      });
      return o.observe(t, {
        // Content source maps
        characterData: !0,
        // Manual tagging
        attributes: !0,
        attributeFilter: [
          E.ENTRY_ID,
          E.FIELD_ID,
          E.LOCALE,
          E.SPACE,
          E.ENVIRONMENT,
          "class",
          "style"
        ],
        // Adding or removal of new nodes
        childList: !0,
        // Include children
        subtree: !0
      }), () => o.disconnect();
    }), g(this, "addResizeListener", () => {
      const { targetOrigin: t } = this.options, o = new ResizeObserver(() => {
        this.isResizing || (this.isResizing = !0, R(Z.RESIZE_START, {}, t)), this.resizeTimeout && clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(() => {
          this.isResizing = !1, R(Z.RESIZE_END, {}, t), this.updateElements();
        }, this.delay);
      });
      return o.observe(document.body), () => o.disconnect();
    }), g(this, "addHoverListener", () => {
      const t = fr((a) => {
        let l;
        for (const f of a) {
          const c = f;
          if (c.nodeName === "BODY") break;
          const d = this.taggedElements.find((v) => v.element === c);
          if (d) {
            l = d;
            break;
          }
        }
        this.hoveredElement = l == null ? void 0 : l.element, this.updateElements();
      }, this.delay), o = (a) => {
        t(a.composedPath());
      };
      return window.addEventListener("mouseover", o, { passive: !0 }), () => window.removeEventListener("mouseover", o);
    }), g(this, "sendTaggedElements", () => {
      R(
        Z.TAGGED_ELEMENTS,
        {
          elements: this.taggedElements.map((t) => ({
            // Important: do not add `element` as it can't be cloned by sendMessage
            coordinates: t.coordinates,
            isVisible: !!t.isVisible,
            attributes: t.attributes,
            isHovered: this.hoveredElement === t.element,
            isCoveredByOtherElement: !!t.isCoveredByOtherElement
          })),
          automaticallyTaggedCount: this.automaticallyTaggedCount,
          manuallyTaggedCount: this.manuallyTaggedCount
        },
        this.options.targetOrigin
      );
    }), g(this, "updateElements", () => {
      const { taggedElements: t, manuallyTaggedCount: o, automaticallyTaggedCount: a } = Me({
        options: this.options
      }), l = Mr(t);
      mr(l, this.taggedElements) || (this.observersCB.forEach((f) => f()), this.observersCB = [], this.taggedElements = l, t.forEach(({ element: f }) => this.observe(f)), this.manuallyTaggedCount = o, this.automaticallyTaggedCount = a);
    }), this.options = i, this.intersectionObserver = new IntersectionObserver(
      (t) => {
        const o = this.taggedElements;
        for (const a of t)
          if (a.isIntersecting)
            for (const l of o)
              l.element === a.target && (l.coordinates = a.intersectionRect, l.isVisible = a.target.checkVisibility({
                checkOpacity: !0,
                checkVisibilityCSS: !0
              }));
        this.taggedElements = o, this.sendTaggedElements();
      },
      { threshold: 0.15 }
    );
  }
}
const { stringify: Rr } = JSON, Ur = String, Pr = "string", zr = "object", Br = (r, i) => i, ft = (r, i, t) => {
  const o = Ur(i.push(t) - 1);
  return r.set(t, o), o;
}, kr = (r, i, t) => {
  const o = Br, a = /* @__PURE__ */ new Map(), l = [], f = [];
  let c = +ft(a, l, o.call({ "": r }, "", r)), d = !c;
  for (; c < l.length; )
    d = !0, f[c] = Rr(l[c++], v, t);
  return "[" + f.join(",") + "]";
  function v(h, I) {
    if (d)
      return d = !d, I;
    const D = o.call(this, h, I);
    switch (typeof D) {
      case zr:
        if (D === null) return D;
      case Pr:
        return a.get(D) || ft(a, l, D);
    }
    return D;
  }
};
var U = /* @__PURE__ */ ((r) => (r.CONNECTED = "CONNECTED", r.DISCONNECTED = "DISCONNECTED", r.ERROR = "ERROR", r.TAGGED_FIELD_CLICKED = "TAGGED_FIELD_CLICKED", r.URL_CHANGED = "URL_CHANGED", r.SUBSCRIBED = "SUBSCRIBED", r.UNSUBSCRIBED = "UNSUBSCRIBED", r.ENTRY_UPDATED = "ENTRY_UPDATED", r.ENTRY_SAVED = "ENTRY_SAVED", r.DEBUG_MODE_ENABLED = "DEBUG_MODE_ENABLED", r))(U || {});
function Gr(r, i) {
  R(
    "TAGGED_FIELD_CLICKED",
    {
      action: "TAGGED_FIELD_CLICKED",
      ...r
    },
    i
  );
}
function Fr(r, i) {
  R(
    "TAGGED_FIELD_CLICKED",
    {
      action: "TAGGED_FIELD_CLICKED",
      ...r
    },
    i
  );
}
class $r {
  constructor({ locale: i, targetOrigin: t }) {
    g(this, "subscriptions", /* @__PURE__ */ new Map()), g(this, "defaultLocale"), g(this, "sendMessage"), this.defaultLocale = i, this.sendMessage = (o, a) => R(o, a, t);
  }
  /** Receives the data from the message event handler and calls the subscriptions */
  async receiveMessage(i) {
    if (i.method === U.ENTRY_UPDATED) {
      const { data: t, subscriptionId: o } = i, a = this.subscriptions.get(o);
      a ? (a.callback(t), a.data = t, this.subscriptions.set(o, a)) : C.error("Received an update for an unknown subscription", {
        subscriptionId: o,
        data: t,
        subscriptions: this.subscriptions
      });
    }
  }
  /**
   * Subscribe to data changes from the Editor, returns a function to unsubscribe
   * Will be called once initially for the restored data
   */
  subscribe(i) {
    const t = hr(), o = i.locale ?? this.defaultLocale;
    this.subscriptions.set(t, {
      ...i
    });
    const a = {
      locale: o,
      event: "edit",
      id: t,
      config: kr(i)
    };
    return this.sendMessage(U.SUBSCRIBED, a), () => {
      this.sendMessage(U.UNSUBSCRIBED, a), this.subscriptions.delete(t);
    };
  }
}
class xr {
  constructor({
    locale: i,
    options: t,
    inspectorModeEnabled: o
  }) {
    g(this, "locale"), g(this, "options"), g(this, "inspectorModeEnabled"), g(this, "subscription"), this.locale = i, this.options = t, this.inspectorModeEnabled = o;
  }
  subscribe(i) {
    return this.subscription && C.log(
      "There is already a subscription for the save event, the existing one will be replaced."
    ), this.subscription = i, () => {
      this.subscription = void 0;
    };
  }
  receiveMessage(i) {
    if (i.method === U.ENTRY_SAVED && this.subscription) {
      const { entity: t } = i;
      this.inspectorModeEnabled ? bt({ options: this.options }).includes(t.sys.id) && this.subscription(t) : this.subscription(t);
    }
  }
}
const dt = [
  "https://app.contentful.com",
  "https://app.eu.contentful.com",
  "http://localhost:3001"
  // for local debugging for Contentful engineers
], L = class Se {
  // Static method to initialize the LivePreview SDK
  static init(i) {
    var t;
    if (typeof i != "object" || !(i != null && i.locale))
      throw new Error(
        "Init function has to be called with a locale configuration (for example: `ContentfulLivePreview.init({ locale: 'en-US'})`)"
      );
    const {
      debugMode: o,
      enableInspectorMode: a,
      enableLiveUpdates: l,
      locale: f,
      environment: c,
      space: d,
      targetOrigin: v
    } = i;
    if (typeof window < "u") {
      if (!dr())
        return this.liveUpdatesEnabled = !1, Promise.resolve(null);
      if (o && ct(o), typeof a == "boolean" && (this.inspectorModeEnabled = a), typeof l == "boolean" && (this.liveUpdatesEnabled = l), this.locale = f, this.space = d, this.environment = c, this.initTargetOrigin(v), this.initialized)
        return C.log("You have already initialized the Live Preview SDK."), Promise.resolve(Se.inspectorMode);
      this.inspectorModeEnabled && (this.inspectorMode = new Nr({
        locale: f,
        space: d,
        environment: c,
        targetOrigin: this.targetOrigin,
        ignoreManuallyTaggedElements: (t = i.experimental) == null ? void 0 : t.ignoreManuallyTaggedElements
      })), this.liveUpdatesEnabled && (this.liveUpdates = new $r({ locale: f, targetOrigin: this.targetOrigin }), this.saveEvent = new xr({
        locale: f,
        options: {
          locale: this.locale,
          space: this.space,
          environment: this.environment,
          targetOrigin: this.targetOrigin
        },
        inspectorModeEnabled: this.inspectorModeEnabled
      })), window.addEventListener("message", (k) => {
        var x, W, ie;
        if (pr(k)) {
          if (C.log("Received message", k.data), k.data.method === U.DEBUG_MODE_ENABLED) {
            ct(!0);
            return;
          }
          this.inspectorModeEnabled && ((x = this.inspectorMode) == null || x.receiveMessage(k.data)), this.liveUpdatesEnabled && ((W = this.liveUpdates) == null || W.receiveMessage(k.data), (ie = this.saveEvent) == null || ie.receiveMessage(k.data));
        }
      }), lr(() => {
        R(
          U.URL_CHANGED,
          {
            action: U.URL_CHANGED,
            taggedElementCount: document.querySelectorAll(
              `[${E.ENTRY_ID}]`
            ).length
          },
          this.targetOrigin
        );
      });
      const { taggedElements: h, manuallyTaggedCount: I, automaticallyTaggedCount: D } = this.inspectorModeEnabled ? Me({
        options: {
          locale: this.locale,
          space: this.space,
          environment: this.environment
        }
      }) : {
        taggedElements: [],
        manuallyTaggedCount: 0,
        automaticallyTaggedCount: 0
      }, Q = h.length;
      return R(
        U.CONNECTED,
        {
          action: U.CONNECTED,
          connected: !0,
          tags: Q,
          taggedElementCount: Q,
          locale: this.locale,
          isInspectorEnabled: this.inspectorModeEnabled,
          isLiveUpdatesEnabled: this.liveUpdatesEnabled,
          manuallyTaggedElementCount: I,
          automaticallyTaggedElementCount: D
        },
        this.targetOrigin
      ), this.initialized = !0, Promise.resolve(Se.inspectorMode);
    }
  }
  static initTargetOrigin(i) {
    if (i)
      this.targetOrigin = Array.isArray(i) ? i : [i];
    else {
      const t = window.location.ancestorOrigins, o = t ? dt.find((a) => t.contains(a)) : (
        //less consistent workaround for Firefox, where ancestorOrigins is not supported
        dt.find((a) => document.referrer.includes(a))
      );
      if (!o)
        throw new Error(
          "The current origin is not supported. Please provide a targetOrigin in the live preview configuration."
        );
      this.targetOrigin = [o];
    }
  }
  static subscribe(i, t) {
    if (!this.liveUpdatesEnabled)
      return () => {
      };
    const o = typeof i == "string" ? i : "edit", a = typeof i == "object" ? i : t;
    if (o === "save") {
      if (!this.saveEvent)
        throw new Error(
          "Save event is not initialized, please call `ContentfulLivePreview.init()` first."
        );
      return this.saveEvent.subscribe(a.callback);
    }
    if (!this.liveUpdates)
      throw new Error(
        "Live updates are not initialized, please call `ContentfulLivePreview.init()` first."
      );
    return this.liveUpdates.subscribe(a);
  }
  // Static method to render live preview data-attributes to HTML element output
  static getProps(i) {
    const { fieldId: t, locale: o, environment: a, space: l } = i;
    if (!this.inspectorModeEnabled)
      return null;
    if (t) {
      const f = {
        ...o ? { [E.LOCALE]: o } : {},
        ...a ? { [E.ENVIRONMENT]: a } : {},
        ...l ? { [E.SPACE]: l } : {},
        [E.FIELD_ID]: t
      };
      if (o && (f[E.LOCALE] = o), i.assetId !== void 0)
        return {
          ...f,
          [E.ASSET_ID]: i.assetId
        };
      if (i.entryId !== void 0)
        return {
          ...f,
          [E.ENTRY_ID]: i.entryId
        };
    }
    return C.warn("Missing property for inspector mode", { ...i }), null;
  }
  static toggleInspectorMode() {
    return this.inspectorModeEnabled = !this.inspectorModeEnabled, this.inspectorModeEnabled;
  }
  static toggleLiveUpdatesMode() {
    return this.liveUpdatesEnabled = !this.liveUpdatesEnabled, this.liveUpdatesEnabled;
  }
  //TODO: Rename to openEntityInEditor, as assets can also be opened. Would be breaking change
  static openEntryInEditor(i) {
    const t = {
      locale: this.locale,
      environment: this.environment,
      space: this.space
    };
    if (i.assetId !== void 0 && i.fieldId) {
      Fr(
        {
          ...t,
          ...i
        },
        this.targetOrigin
      );
      return;
    }
    if (i.entryId !== void 0 && i.fieldId) {
      Gr(
        {
          ...t,
          ...i
        },
        this.targetOrigin
      );
      return;
    }
    C.error("Please provide field id and entry/asset id to openEntryInEditor.", { ...i });
  }
  /**
   * Returns a list of tagged entries on the page
   */
  static getEntryList() {
    return bt({
      options: {
        locale: this.locale,
        space: this.space,
        environment: this.environment
      }
    });
  }
};
g(L, "initialized", !1), g(L, "inspectorMode", null), g(L, "liveUpdates", null), g(L, "saveEvent", null), g(L, "inspectorModeEnabled", !0), g(L, "liveUpdatesEnabled", !0), g(L, "locale"), g(L, "space"), g(L, "environment"), g(L, "sendMessage"), g(L, "targetOrigin");
let yt = L;
yt.init({
  locale: "en-US",
  debugMode: !0,
  enableLiveUpdates: !0
});
yt.subscribe("save", {
  callback: async () => {
    const r = window.location.pathname;
    await fetch(`/api/revalidate?pathname=${r}`), window.location.reload();
  }
});
