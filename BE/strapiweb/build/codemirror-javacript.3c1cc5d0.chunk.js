(self.webpackChunkstrapiweb=self.webpackChunkstrapiweb||[]).push([[3860],{17319:(e,t,r)=>{!function(e){"use strict";e.defineMode("javascript",(function(t,r){var n,a,i=t.indentUnit,o=r.statementIndent,c=r.jsonld,s=r.json||c,u=!1!==r.trackScope,l=r.typescript,f=r.wordCharacters||/[\w$\xa1-\uffff]/,d=function(){function e(e){return{type:e,style:"keyword"}}var t=e("keyword a"),r=e("keyword b"),n=e("keyword c"),a=e("keyword d"),i=e("operator"),o={type:"atom",style:"atom"};return{if:e("if"),while:t,with:t,else:r,do:r,try:r,finally:r,return:a,break:a,continue:a,new:e("new"),delete:n,void:n,throw:n,debugger:e("debugger"),var:e("var"),const:e("var"),let:e("var"),function:e("function"),catch:e("catch"),for:e("for"),switch:e("switch"),case:e("case"),default:e("default"),in:i,typeof:i,instanceof:i,true:o,false:o,null:o,undefined:o,NaN:o,Infinity:o,this:e("this"),class:e("class"),super:e("atom"),yield:n,export:e("export"),import:e("import"),extends:n,await:n}}(),p=/[+\-*&%=<>!?|~^@]/,m=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;function k(e){for(var t,r=!1,n=!1;null!=(t=e.next());){if(!r){if("/"==t&&!n)return;"["==t?n=!0:n&&"]"==t&&(n=!1)}r=!r&&"\\"==t}}function v(e,t,r){return n=e,a=r,t}function y(e,t){var r=e.next();if('"'==r||"'"==r)return t.tokenize=w(r),t.tokenize(e,t);if("."==r&&e.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/))return v("number","number");if("."==r&&e.match(".."))return v("spread","meta");if(/[\[\]{}\(\),;\:\.]/.test(r))return v(r);if("="==r&&e.eat(">"))return v("=>","operator");if("0"==r&&e.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/))return v("number","number");if(/\d/.test(r))return e.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/),v("number","number");if("/"==r)return e.eat("*")?(t.tokenize=b,b(e,t)):e.eat("/")?(e.skipToEnd(),v("comment","comment")):at(e,t,1)?(k(e),e.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/),v("regexp","string-2")):(e.eat("="),v("operator","operator",e.current()));if("`"==r)return t.tokenize=h,h(e,t);if("#"==r&&"!"==e.peek())return e.skipToEnd(),v("meta","meta");if("#"==r&&e.eatWhile(f))return v("variable","property");if("<"==r&&e.match("!--")||"-"==r&&e.match("->")&&!/\S/.test(e.string.slice(0,e.start)))return e.skipToEnd(),v("comment","comment");if(p.test(r))return">"==r&&t.lexical&&">"==t.lexical.type||(e.eat("=")?"!"!=r&&"="!=r||e.eat("="):/[<>*+\-|&?]/.test(r)&&(e.eat(r),">"==r&&e.eat(r))),"?"==r&&e.eat(".")?v("."):v("operator","operator",e.current());if(f.test(r)){e.eatWhile(f);var n=e.current();if("."!=t.lastType){if(d.propertyIsEnumerable(n)){var a=d[n];return v(a.type,a.style,n)}if("async"==n&&e.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/,!1))return v("async","keyword",n)}return v("variable","variable",n)}}function w(e){return function(t,r){var n,a=!1;if(c&&"@"==t.peek()&&t.match(m))return r.tokenize=y,v("jsonld-keyword","meta");for(;null!=(n=t.next())&&(n!=e||a);)a=!a&&"\\"==n;return a||(r.tokenize=y),v("string","string")}}function b(e,t){for(var r,n=!1;r=e.next();){if("/"==r&&n){t.tokenize=y;break}n="*"==r}return v("comment","comment")}function h(e,t){for(var r,n=!1;null!=(r=e.next());){if(!n&&("`"==r||"$"==r&&e.eat("{"))){t.tokenize=y;break}n=!n&&"\\"==r}return v("quasi","string-2",e.current())}var x="([{}])";function g(e,t){t.fatArrowAt&&(t.fatArrowAt=null);var r=e.string.indexOf("=>",e.start);if(!(r<0)){if(l){var n=/:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(e.string.slice(e.start,r));n&&(r=n.index)}for(var a=0,i=!1,o=r-1;o>=0;--o){var c=e.string.charAt(o),s=x.indexOf(c);if(s>=0&&s<3){if(!a){++o;break}if(0==--a){"("==c&&(i=!0);break}}else if(s>=3&&s<6)++a;else if(f.test(c))i=!0;else if(/["'\/`]/.test(c))for(;;--o){if(0==o)return;if(e.string.charAt(o-1)==c&&"\\"!=e.string.charAt(o-2)){o--;break}}else if(i&&!a){++o;break}}i&&!a&&(t.fatArrowAt=o)}}var j={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,this:!0,import:!0,"jsonld-keyword":!0};function M(e,t,r,n,a,i){this.indented=e,this.column=t,this.type=r,this.prev=a,this.info=i,null!=n&&(this.align=n)}function A(e,t){if(!u)return!1;for(var r=e.localVars;r;r=r.next)if(r.name==t)return!0;for(var n=e.context;n;n=n.prev)for(r=n.vars;r;r=r.next)if(r.name==t)return!0}function V(e,t,r,n,a){var i=e.cc;for(E.state=e,E.stream=a,E.marked=null,E.cc=i,E.style=t,e.lexical.hasOwnProperty("align")||(e.lexical.align=!0);;)if((i.length?i.pop():s?G:H)(r,n)){for(;i.length&&i[i.length-1].lex;)i.pop()();return E.marked?E.marked:"variable"==r&&A(e,n)?"variable-2":t}}var E={state:null,column:null,marked:null,cc:null};function z(){for(var e=arguments.length-1;e>=0;e--)E.cc.push(arguments[e])}function I(){return z.apply(null,arguments),!0}function T(e,t){for(var r=t;r;r=r.next)if(r.name==e)return!0;return!1}function $(e){var t=E.state;if(E.marked="def",u){if(t.context)if("var"==t.lexical.info&&t.context&&t.context.block){var n=C(e,t.context);if(null!=n)return void(t.context=n)}else if(!T(e,t.localVars))return void(t.localVars=new q(e,t.localVars));r.globalVars&&!T(e,t.globalVars)&&(t.globalVars=new q(e,t.globalVars))}}function C(e,t){if(t){if(t.block){var r=C(e,t.prev);return r?r==t.prev?t:new _(r,t.vars,!0):null}return T(e,t.vars)?t:new _(t.prev,new q(e,t.vars),!1)}return null}function S(e){return"public"==e||"private"==e||"protected"==e||"abstract"==e||"readonly"==e}function _(e,t,r){this.prev=e,this.vars=t,this.block=r}function q(e,t){this.name=e,this.next=t}var O=new q("this",new q("arguments",null));function P(){E.state.context=new _(E.state.context,E.state.localVars,!1),E.state.localVars=O}function N(){E.state.context=new _(E.state.context,E.state.localVars,!0),E.state.localVars=null}function U(){E.state.localVars=E.state.context.vars,E.state.context=E.state.context.prev}function W(e,t){var r=function(){var r=E.state,n=r.indented;if("stat"==r.lexical.type)n=r.lexical.indented;else for(var a=r.lexical;a&&")"==a.type&&a.align;a=a.prev)n=a.indented;r.lexical=new M(n,E.stream.column(),e,null,r.lexical,t)};return r.lex=!0,r}function B(){var e=E.state;e.lexical.prev&&(")"==e.lexical.type&&(e.indented=e.lexical.indented),e.lexical=e.lexical.prev)}function F(e){function t(r){return r==e?I():";"==e||"}"==r||")"==r||"]"==r?z():I(t)}return t}function H(e,t){return"var"==e?I(W("vardef",t),ze,F(";"),B):"keyword a"==e?I(W("form"),K,H,B):"keyword b"==e?I(W("form"),H,B):"keyword d"==e?E.stream.match(/^\s*$/,!1)?I():I(W("stat"),Q,F(";"),B):"debugger"==e?I(F(";")):"{"==e?I(W("}"),N,de,B,U):";"==e?I():"if"==e?("else"==E.state.lexical.info&&E.state.cc[E.state.cc.length-1]==B&&E.state.cc.pop()(),I(W("form"),K,H,B,_e)):"function"==e?I(Ne):"for"==e?I(W("form"),N,qe,H,U,B):"class"==e||l&&"interface"==t?(E.marked="keyword",I(W("form","class"==e?e:t),He,B)):"variable"==e?l&&"declare"==t?(E.marked="keyword",I(H)):l&&("module"==t||"enum"==t||"type"==t)&&E.stream.match(/^\s*\w/,!1)?(E.marked="keyword","enum"==t?I(tt):"type"==t?I(We,F("operator"),ye,F(";")):I(W("form"),Ie,F("{"),W("}"),de,B,B)):l&&"namespace"==t?(E.marked="keyword",I(W("form"),G,H,B)):l&&"abstract"==t?(E.marked="keyword",I(H)):I(W("stat"),ie):"switch"==e?I(W("form"),K,F("{"),W("}","switch"),N,de,B,B,U):"case"==e?I(G,F(":")):"default"==e?I(F(":")):"catch"==e?I(W("form"),P,D,H,B,U):"export"==e?I(W("stat"),Ke,B):"import"==e?I(W("stat"),Qe,B):"async"==e?I(H):"@"==t?I(G,H):z(W("stat"),G,F(";"),B)}function D(e){if("("==e)return I(Be,F(")"))}function G(e,t){return L(e,t,!1)}function J(e,t){return L(e,t,!0)}function K(e){return"("!=e?z():I(W(")"),Q,F(")"),B)}function L(e,t,r){if(E.state.fatArrowAt==E.stream.start){var n=r?te:ee;if("("==e)return I(P,W(")"),le(Be,")"),B,F("=>"),n,U);if("variable"==e)return z(P,Ie,F("=>"),n,U)}var a=r?X:R;return j.hasOwnProperty(e)?I(a):"function"==e?I(Ne,a):"class"==e||l&&"interface"==t?(E.marked="keyword",I(W("form"),Fe,B)):"keyword c"==e||"async"==e?I(r?J:G):"("==e?I(W(")"),Q,F(")"),B,a):"operator"==e||"spread"==e?I(r?J:G):"["==e?I(W("]"),et,B,a):"{"==e?fe(ce,"}",null,a):"quasi"==e?z(Y,a):"new"==e?I(re(r)):I()}function Q(e){return e.match(/[;\}\)\],]/)?z():z(G)}function R(e,t){return","==e?I(Q):X(e,t,!1)}function X(e,t,r){var n=0==r?R:X,a=0==r?G:J;return"=>"==e?I(P,r?te:ee,U):"operator"==e?/\+\+|--/.test(t)||l&&"!"==t?I(n):l&&"<"==t&&E.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/,!1)?I(W(">"),le(ye,">"),B,n):"?"==t?I(G,F(":"),a):I(a):"quasi"==e?z(Y,n):";"!=e?"("==e?fe(J,")","call",n):"."==e?I(oe,n):"["==e?I(W("]"),Q,F("]"),B,n):l&&"as"==t?(E.marked="keyword",I(ye,n)):"regexp"==e?(E.state.lastType=E.marked="operator",E.stream.backUp(E.stream.pos-E.stream.start-1),I(a)):void 0:void 0}function Y(e,t){return"quasi"!=e?z():"${"!=t.slice(t.length-2)?I(Y):I(Q,Z)}function Z(e){if("}"==e)return E.marked="string-2",E.state.tokenize=h,I(Y)}function ee(e){return g(E.stream,E.state),z("{"==e?H:G)}function te(e){return g(E.stream,E.state),z("{"==e?H:J)}function re(e){return function(t){return"."==t?I(e?ae:ne):"variable"==t&&l?I(Ae,e?X:R):z(e?J:G)}}function ne(e,t){if("target"==t)return E.marked="keyword",I(R)}function ae(e,t){if("target"==t)return E.marked="keyword",I(X)}function ie(e){return":"==e?I(B,H):z(R,F(";"),B)}function oe(e){if("variable"==e)return E.marked="property",I()}function ce(e,t){return"async"==e?(E.marked="property",I(ce)):"variable"==e||"keyword"==E.style?(E.marked="property","get"==t||"set"==t?I(se):(l&&E.state.fatArrowAt==E.stream.start&&(r=E.stream.match(/^\s*:\s*/,!1))&&(E.state.fatArrowAt=E.stream.pos+r[0].length),I(ue))):"number"==e||"string"==e?(E.marked=c?"property":E.style+" property",I(ue)):"jsonld-keyword"==e?I(ue):l&&S(t)?(E.marked="keyword",I(ce)):"["==e?I(G,pe,F("]"),ue):"spread"==e?I(J,ue):"*"==t?(E.marked="keyword",I(ce)):":"==e?z(ue):void 0;var r}function se(e){return"variable"!=e?z(ue):(E.marked="property",I(Ne))}function ue(e){return":"==e?I(J):"("==e?z(Ne):void 0}function le(e,t,r){function n(a,i){if(r?r.indexOf(a)>-1:","==a){var o=E.state.lexical;return"call"==o.info&&(o.pos=(o.pos||0)+1),I((function(r,n){return r==t||n==t?z():z(e)}),n)}return a==t||i==t?I():r&&r.indexOf(";")>-1?z(e):I(F(t))}return function(r,a){return r==t||a==t?I():z(e,n)}}function fe(e,t,r){for(var n=3;n<arguments.length;n++)E.cc.push(arguments[n]);return I(W(t,r),le(e,t),B)}function de(e){return"}"==e?I():z(H,de)}function pe(e,t){if(l){if(":"==e)return I(ye);if("?"==t)return I(pe)}}function me(e,t){if(l&&(":"==e||"in"==t))return I(ye)}function ke(e){if(l&&":"==e)return E.stream.match(/^\s*\w+\s+is\b/,!1)?I(G,ve,ye):I(ye)}function ve(e,t){if("is"==t)return E.marked="keyword",I()}function ye(e,t){return"keyof"==t||"typeof"==t||"infer"==t||"readonly"==t?(E.marked="keyword",I("typeof"==t?J:ye)):"variable"==e||"void"==t?(E.marked="type",I(Me)):"|"==t||"&"==t?I(ye):"string"==e||"number"==e||"atom"==e?I(Me):"["==e?I(W("]"),le(ye,"]",","),B,Me):"{"==e?I(W("}"),be,B,Me):"("==e?I(le(je,")"),we,Me):"<"==e?I(le(ye,">"),ye):"quasi"==e?z(xe,Me):void 0}function we(e){if("=>"==e)return I(ye)}function be(e){return e.match(/[\}\)\]]/)?I():","==e||";"==e?I(be):z(he,be)}function he(e,t){return"variable"==e||"keyword"==E.style?(E.marked="property",I(he)):"?"==t||"number"==e||"string"==e?I(he):":"==e?I(ye):"["==e?I(F("variable"),me,F("]"),he):"("==e?z(Ue,he):e.match(/[;\}\)\],]/)?void 0:I()}function xe(e,t){return"quasi"!=e?z():"${"!=t.slice(t.length-2)?I(xe):I(ye,ge)}function ge(e){if("}"==e)return E.marked="string-2",E.state.tokenize=h,I(xe)}function je(e,t){return"variable"==e&&E.stream.match(/^\s*[?:]/,!1)||"?"==t?I(je):":"==e?I(ye):"spread"==e?I(je):z(ye)}function Me(e,t){return"<"==t?I(W(">"),le(ye,">"),B,Me):"|"==t||"."==e||"&"==t?I(ye):"["==e?I(ye,F("]"),Me):"extends"==t||"implements"==t?(E.marked="keyword",I(ye)):"?"==t?I(ye,F(":"),ye):void 0}function Ae(e,t){if("<"==t)return I(W(">"),le(ye,">"),B,Me)}function Ve(){return z(ye,Ee)}function Ee(e,t){if("="==t)return I(ye)}function ze(e,t){return"enum"==t?(E.marked="keyword",I(tt)):z(Ie,pe,Ce,Se)}function Ie(e,t){return l&&S(t)?(E.marked="keyword",I(Ie)):"variable"==e?($(t),I()):"spread"==e?I(Ie):"["==e?fe($e,"]"):"{"==e?fe(Te,"}"):void 0}function Te(e,t){return"variable"!=e||E.stream.match(/^\s*:/,!1)?("variable"==e&&(E.marked="property"),"spread"==e?I(Ie):"}"==e?z():"["==e?I(G,F("]"),F(":"),Te):I(F(":"),Ie,Ce)):($(t),I(Ce))}function $e(){return z(Ie,Ce)}function Ce(e,t){if("="==t)return I(J)}function Se(e){if(","==e)return I(ze)}function _e(e,t){if("keyword b"==e&&"else"==t)return I(W("form","else"),H,B)}function qe(e,t){return"await"==t?I(qe):"("==e?I(W(")"),Oe,B):void 0}function Oe(e){return"var"==e?I(ze,Pe):"variable"==e?I(Pe):z(Pe)}function Pe(e,t){return")"==e?I():";"==e?I(Pe):"in"==t||"of"==t?(E.marked="keyword",I(G,Pe)):z(G,Pe)}function Ne(e,t){return"*"==t?(E.marked="keyword",I(Ne)):"variable"==e?($(t),I(Ne)):"("==e?I(P,W(")"),le(Be,")"),B,ke,H,U):l&&"<"==t?I(W(">"),le(Ve,">"),B,Ne):void 0}function Ue(e,t){return"*"==t?(E.marked="keyword",I(Ue)):"variable"==e?($(t),I(Ue)):"("==e?I(P,W(")"),le(Be,")"),B,ke,U):l&&"<"==t?I(W(">"),le(Ve,">"),B,Ue):void 0}function We(e,t){return"keyword"==e||"variable"==e?(E.marked="type",I(We)):"<"==t?I(W(">"),le(Ve,">"),B):void 0}function Be(e,t){return"@"==t&&I(G,Be),"spread"==e?I(Be):l&&S(t)?(E.marked="keyword",I(Be)):l&&"this"==e?I(pe,Ce):z(Ie,pe,Ce)}function Fe(e,t){return"variable"==e?He(e,t):De(e,t)}function He(e,t){if("variable"==e)return $(t),I(De)}function De(e,t){return"<"==t?I(W(">"),le(Ve,">"),B,De):"extends"==t||"implements"==t||l&&","==e?("implements"==t&&(E.marked="keyword"),I(l?ye:G,De)):"{"==e?I(W("}"),Ge,B):void 0}function Ge(e,t){return"async"==e||"variable"==e&&("static"==t||"get"==t||"set"==t||l&&S(t))&&E.stream.match(/^\s+[\w$\xa1-\uffff]/,!1)?(E.marked="keyword",I(Ge)):"variable"==e||"keyword"==E.style?(E.marked="property",I(Je,Ge)):"number"==e||"string"==e?I(Je,Ge):"["==e?I(G,pe,F("]"),Je,Ge):"*"==t?(E.marked="keyword",I(Ge)):l&&"("==e?z(Ue,Ge):";"==e||","==e?I(Ge):"}"==e?I():"@"==t?I(G,Ge):void 0}function Je(e,t){if("!"==t)return I(Je);if("?"==t)return I(Je);if(":"==e)return I(ye,Ce);if("="==t)return I(J);var r=E.state.lexical.prev;return z(r&&"interface"==r.info?Ue:Ne)}function Ke(e,t){return"*"==t?(E.marked="keyword",I(Ze,F(";"))):"default"==t?(E.marked="keyword",I(G,F(";"))):"{"==e?I(le(Le,"}"),Ze,F(";")):z(H)}function Le(e,t){return"as"==t?(E.marked="keyword",I(F("variable"))):"variable"==e?z(J,Le):void 0}function Qe(e){return"string"==e?I():"("==e?z(G):"."==e?z(R):z(Re,Xe,Ze)}function Re(e,t){return"{"==e?fe(Re,"}"):("variable"==e&&$(t),"*"==t&&(E.marked="keyword"),I(Ye))}function Xe(e){if(","==e)return I(Re,Xe)}function Ye(e,t){if("as"==t)return E.marked="keyword",I(Re)}function Ze(e,t){if("from"==t)return E.marked="keyword",I(G)}function et(e){return"]"==e?I():z(le(J,"]"))}function tt(){return z(W("form"),Ie,F("{"),W("}"),le(rt,"}"),B,B)}function rt(){return z(Ie,Ce)}function nt(e,t){return"operator"==e.lastType||","==e.lastType||p.test(t.charAt(0))||/[,.]/.test(t.charAt(0))}function at(e,t,r){return t.tokenize==y&&/^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(t.lastType)||"quasi"==t.lastType&&/\{\s*$/.test(e.string.slice(0,e.pos-(r||0)))}return P.lex=N.lex=!0,U.lex=!0,B.lex=!0,{startState:function(e){var t={tokenize:y,lastType:"sof",cc:[],lexical:new M((e||0)-i,0,"block",!1),localVars:r.localVars,context:r.localVars&&new _(null,null,!1),indented:e||0};return r.globalVars&&"object"==typeof r.globalVars&&(t.globalVars=r.globalVars),t},token:function(e,t){if(e.sol()&&(t.lexical.hasOwnProperty("align")||(t.lexical.align=!1),t.indented=e.indentation(),g(e,t)),t.tokenize!=b&&e.eatSpace())return null;var r=t.tokenize(e,t);return"comment"==n?r:(t.lastType="operator"!=n||"++"!=a&&"--"!=a?n:"incdec",V(t,r,n,a,e))},indent:function(t,n){if(t.tokenize==b||t.tokenize==h)return e.Pass;if(t.tokenize!=y)return 0;var a,c=n&&n.charAt(0),s=t.lexical;if(!/^\s*else\b/.test(n))for(var u=t.cc.length-1;u>=0;--u){var l=t.cc[u];if(l==B)s=s.prev;else if(l!=_e&&l!=U)break}for(;("stat"==s.type||"form"==s.type)&&("}"==c||(a=t.cc[t.cc.length-1])&&(a==R||a==X)&&!/^[,\.=+\-*:?[\(]/.test(n));)s=s.prev;o&&")"==s.type&&"stat"==s.prev.type&&(s=s.prev);var f=s.type,d=c==f;return"vardef"==f?s.indented+("operator"==t.lastType||","==t.lastType?s.info.length+1:0):"form"==f&&"{"==c?s.indented:"form"==f?s.indented+i:"stat"==f?s.indented+(nt(t,n)?o||i:0):"switch"!=s.info||d||0==r.doubleIndentSwitch?s.align?s.column+(d?0:1):s.indented+(d?0:i):s.indented+(/^(?:case|default)\b/.test(n)?i:2*i)},electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:s?null:"/*",blockCommentEnd:s?null:"*/",blockCommentContinue:s?null:" * ",lineComment:s?null:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``",helperType:s?"json":"javascript",jsonldMode:c,jsonMode:s,expressionAllowed:at,skipExpression:function(t){V(t,"atom","atom","true",new e.StringStream("",2,null))}}})),e.registerHelper("wordChars","javascript",/[\w$]/),e.defineMIME("text/javascript","javascript"),e.defineMIME("text/ecmascript","javascript"),e.defineMIME("application/javascript","javascript"),e.defineMIME("application/x-javascript","javascript"),e.defineMIME("application/ecmascript","javascript"),e.defineMIME("application/json",{name:"javascript",json:!0}),e.defineMIME("application/x-json",{name:"javascript",json:!0}),e.defineMIME("application/manifest+json",{name:"javascript",json:!0}),e.defineMIME("application/ld+json",{name:"javascript",jsonld:!0}),e.defineMIME("text/typescript",{name:"javascript",typescript:!0}),e.defineMIME("application/typescript",{name:"javascript",typescript:!0})}(r(4631))}}]);