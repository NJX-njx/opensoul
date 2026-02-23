(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();const Dn=globalThis,Ei=Dn.ShadowRoot&&(Dn.ShadyCSS===void 0||Dn.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ii=Symbol(),Bo=new WeakMap;let fr=class{constructor(t,n,s){if(this._$cssResult$=!0,s!==Ii)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(Ei&&t===void 0){const s=n!==void 0&&n.length===1;s&&(t=Bo.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Bo.set(n,t))}return t}toString(){return this.cssText}};const dc=e=>new fr(typeof e=="string"?e:e+"",void 0,Ii),uc=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((s,i,o)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new fr(n,e,Ii)},gc=(e,t)=>{if(Ei)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const s=document.createElement("style"),i=Dn.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=n.cssText,e.appendChild(s)}},zo=Ei?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const s of t.cssRules)n+=s.cssText;return dc(n)})(e):e;const{is:pc,defineProperty:hc,getOwnPropertyDescriptor:fc,getOwnPropertyNames:vc,getOwnPropertySymbols:mc,getPrototypeOf:bc}=Object,es=globalThis,Uo=es.trustedTypes,yc=Uo?Uo.emptyScript:"",xc=es.reactiveElementPolyfillSupport,Qt=(e,t)=>e,zn={toAttribute(e,t){switch(t){case Boolean:e=e?yc:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},Mi=(e,t)=>!pc(e,t),Ho={attribute:!0,type:String,converter:zn,reflect:!1,useDefault:!1,hasChanged:Mi};Symbol.metadata??=Symbol("metadata"),es.litPropertyMetadata??=new WeakMap;let Tt=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=Ho){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,n);i!==void 0&&hc(this.prototype,t,i)}}static getPropertyDescriptor(t,n,s){const{get:i,set:o}=fc(this.prototype,t)??{get(){return this[n]},set(a){this[n]=a}};return{get:i,set(a){const l=i?.call(this);o?.call(this,a),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ho}static _$Ei(){if(this.hasOwnProperty(Qt("elementProperties")))return;const t=bc(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Qt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Qt("properties"))){const n=this.properties,s=[...vc(n),...mc(n)];for(const i of s)this.createProperty(i,n[i])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[s,i]of n)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[n,s]of this.elementProperties){const i=this._$Eu(n,s);i!==void 0&&this._$Eh.set(i,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)n.unshift(zo(i))}else t!==void 0&&n.push(zo(t));return n}static _$Eu(t,n){const s=n.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const s of n.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return gc(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,n,s){this._$AK(t,s)}_$ET(t,n){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const o=(s.converter?.toAttribute!==void 0?s.converter:zn).toAttribute(n,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,n){const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const o=s.getPropertyOptions(i),a=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:zn;this._$Em=i;const l=a.fromAttribute(n,o.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(t,n,s,i=!1,o){if(t!==void 0){const a=this.constructor;if(i===!1&&(o=this[t]),s??=a.getPropertyOptions(t),!((s.hasChanged??Mi)(o,n)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,s))))return;this.C(t,n,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:s,reflect:i,wrapped:o},a){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??n??this[t]),o!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(n=void 0),this._$AL.set(t,n)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[i,o]of s){const{wrapped:a}=o,l=this[i];a!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,o,l)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(n)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(n)}willUpdate(t){}_$AE(t){this._$EO?.forEach(n=>n.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(n=>this._$ET(n,this[n])),this._$EM()}updated(t){}firstUpdated(t){}};Tt.elementStyles=[],Tt.shadowRootOptions={mode:"open"},Tt[Qt("elementProperties")]=new Map,Tt[Qt("finalized")]=new Map,xc?.({ReactiveElement:Tt}),(es.reactiveElementVersions??=[]).push("2.1.2");const Ri=globalThis,Ko=e=>e,Un=Ri.trustedTypes,jo=Un?Un.createPolicy("lit-html",{createHTML:e=>e}):void 0,vr="$lit$",Ve=`lit$${Math.random().toFixed(9).slice(2)}$`,mr="?"+Ve,$c=`<${mr}>`,pt=document,tn=()=>pt.createComment(""),nn=e=>e===null||typeof e!="object"&&typeof e!="function",Pi=Array.isArray,wc=e=>Pi(e)||typeof e?.[Symbol.iterator]=="function",Ts=`[ 	
\f\r]`,Ot=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Wo=/-->/g,Go=/>/g,st=RegExp(`>|${Ts}(?:([^\\s"'>=/]+)(${Ts}*=${Ts}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),qo=/'/g,Vo=/"/g,br=/^(?:script|style|textarea|title)$/i,yr=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),r=yr(1),wn=yr(2),Ye=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),Qo=new WeakMap,ut=pt.createTreeWalker(pt,129);function xr(e,t){if(!Pi(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return jo!==void 0?jo.createHTML(t):t}const kc=(e,t)=>{const n=e.length-1,s=[];let i,o=t===2?"<svg>":t===3?"<math>":"",a=Ot;for(let l=0;l<n;l++){const c=e[l];let u,g,h=-1,f=0;for(;f<c.length&&(a.lastIndex=f,g=a.exec(c),g!==null);)f=a.lastIndex,a===Ot?g[1]==="!--"?a=Wo:g[1]!==void 0?a=Go:g[2]!==void 0?(br.test(g[2])&&(i=RegExp("</"+g[2],"g")),a=st):g[3]!==void 0&&(a=st):a===st?g[0]===">"?(a=i??Ot,h=-1):g[1]===void 0?h=-2:(h=a.lastIndex-g[2].length,u=g[1],a=g[3]===void 0?st:g[3]==='"'?Vo:qo):a===Vo||a===qo?a=st:a===Wo||a===Go?a=Ot:(a=st,i=void 0);const d=a===st&&e[l+1].startsWith("/>")?" ":"";o+=a===Ot?c+$c:h>=0?(s.push(u),c.slice(0,h)+vr+c.slice(h)+Ve+d):c+Ve+(h===-2?l:d)}return[xr(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};let Xs=class $r{constructor({strings:t,_$litType$:n},s){let i;this.parts=[];let o=0,a=0;const l=t.length-1,c=this.parts,[u,g]=kc(t,n);if(this.el=$r.createElement(u,s),ut.currentNode=this.el.content,n===2||n===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=ut.nextNode())!==null&&c.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const h of i.getAttributeNames())if(h.endsWith(vr)){const f=g[a++],d=i.getAttribute(h).split(Ve),p=/([.?@])?(.*)/.exec(f);c.push({type:1,index:o,name:p[2],strings:d,ctor:p[1]==="."?Ac:p[1]==="?"?Cc:p[1]==="@"?Tc:ns}),i.removeAttribute(h)}else h.startsWith(Ve)&&(c.push({type:6,index:o}),i.removeAttribute(h));if(br.test(i.tagName)){const h=i.textContent.split(Ve),f=h.length-1;if(f>0){i.textContent=Un?Un.emptyScript:"";for(let d=0;d<f;d++)i.append(h[d],tn()),ut.nextNode(),c.push({type:2,index:++o});i.append(h[f],tn())}}}else if(i.nodeType===8)if(i.data===mr)c.push({type:2,index:o});else{let h=-1;for(;(h=i.data.indexOf(Ve,h+1))!==-1;)c.push({type:7,index:o}),h+=Ve.length-1}o++}}static createElement(t,n){const s=pt.createElement("template");return s.innerHTML=t,s}};function Et(e,t,n=e,s){if(t===Ye)return t;let i=s!==void 0?n._$Co?.[s]:n._$Cl;const o=nn(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(e),i._$AT(e,n,s)),s!==void 0?(n._$Co??=[])[s]=i:n._$Cl=i),i!==void 0&&(t=Et(e,i._$AS(e,t.values),i,s)),t}class Sc{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:s}=this._$AD,i=(t?.creationScope??pt).importNode(n,!0);ut.currentNode=i;let o=ut.nextNode(),a=0,l=0,c=s[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new ts(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new _c(o,this,t)),this._$AV.push(u),c=s[++l]}a!==c?.index&&(o=ut.nextNode(),a++)}return ut.currentNode=pt,i}p(t){let n=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,n),n+=s.strings.length-2):s._$AI(t[n])),n++}}let ts=class wr{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,s,i){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Et(this,t,n),nn(t)?t===v||t==null||t===""?(this._$AH!==v&&this._$AR(),this._$AH=v):t!==this._$AH&&t!==Ye&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):wc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==v&&nn(this._$AH)?this._$AA.nextSibling.data=t:this.T(pt.createTextNode(t)),this._$AH=t}$(t){const{values:n,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=Xs.createElement(xr(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(n);else{const o=new Sc(i,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=Qo.get(t.strings);return n===void 0&&Qo.set(t.strings,n=new Xs(t)),n}k(t){Pi(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let s,i=0;for(const o of t)i===n.length?n.push(s=new wr(this.O(tn()),this.O(tn()),this,this.options)):s=n[i],s._$AI(o),i++;i<n.length&&(this._$AR(s&&s._$AB.nextSibling,i),n.length=i)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){const s=Ko(t).nextSibling;Ko(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}};class ns{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,s,i,o){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=n,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=v}_$AI(t,n=this,s,i){const o=this.strings;let a=!1;if(o===void 0)t=Et(this,t,n,0),a=!nn(t)||t!==this._$AH&&t!==Ye,a&&(this._$AH=t);else{const l=t;let c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Et(this,l[s+c],n,c),u===Ye&&(u=this._$AH[c]),a||=!nn(u)||u!==this._$AH[c],u===v?t=v:t!==v&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!i&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}let Ac=class extends ns{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}},Cc=class extends ns{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==v)}},Tc=class extends ns{constructor(t,n,s,i,o){super(t,n,s,i,o),this.type=5}_$AI(t,n=this){if((t=Et(this,t,n,0)??v)===Ye)return;const s=this._$AH,i=t===v&&s!==v||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==v&&(s===v||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},_c=class{constructor(t,n,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Et(this,t)}};const Lc={I:ts},Ec=Ri.litHtmlPolyfillSupport;Ec?.(Xs,ts),(Ri.litHtmlVersions??=[]).push("3.3.2");const Ic=(e,t,n)=>{const s=n?.renderBefore??t;let i=s._$litPart$;if(i===void 0){const o=n?.renderBefore??null;s._$litPart$=i=new ts(t.insertBefore(tn(),o),o,void 0,n??{})}return i._$AI(e),i};const Di=globalThis;let Lt=class extends Tt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ic(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ye}};Lt._$litElement$=!0,Lt.finalized=!0,Di.litElementHydrateSupport?.({LitElement:Lt});const Mc=Di.litElementPolyfillSupport;Mc?.({LitElement:Lt});(Di.litElementVersions??=[]).push("4.2.2");const kr=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};const Rc={attribute:!0,type:String,converter:zn,reflect:!1,hasChanged:Mi},Pc=(e=Rc,t,n)=>{const{kind:s,metadata:i}=n;let o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),s==="setter"&&((e=Object.create(e)).wrapped=!0),o.set(n.name,e),s==="accessor"){const{name:a}=n;return{set(l){const c=t.get.call(this);t.set.call(this,l),this.requestUpdate(a,c,e,!0,l)},init(l){return l!==void 0&&this.C(a,void 0,e,l),l}}}if(s==="setter"){const{name:a}=n;return function(l){const c=this[a];t.call(this,l),this.requestUpdate(a,c,e,!0,l)}}throw Error("Unsupported decorator location: "+s)};function ss(e){return(t,n)=>typeof n=="object"?Pc(e,t,n):((s,i,o)=>{const a=i.hasOwnProperty(o);return i.constructor.createProperty(o,s),a?Object.getOwnPropertyDescriptor(i,o):void 0})(e,t,n)}function $(e){return ss({...e,state:!0,attribute:!1})}async function ye(e,t){if(!(!e.client||!e.connected)&&!e.channelsLoading){e.channelsLoading=!0,e.channelsError=null;try{const n=await e.client.request("channels.status",{probe:t,timeoutMs:8e3});e.channelsSnapshot=n,e.channelsLastSuccess=Date.now()}catch(n){e.channelsError=String(n)}finally{e.channelsLoading=!1}}}async function Dc(e,t){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const n=await e.client.request("web.login.start",{force:t,timeoutMs:3e4});e.whatsappLoginMessage=n.message??null,e.whatsappLoginQrDataUrl=n.qrDataUrl??null,e.whatsappLoginConnected=null}catch(n){e.whatsappLoginMessage=String(n),e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function Nc(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const t=await e.client.request("web.login.wait",{timeoutMs:12e4});e.whatsappLoginMessage=t.message??null,e.whatsappLoginConnected=t.connected??null,t.connected&&(e.whatsappLoginQrDataUrl=null)}catch(t){e.whatsappLoginMessage=String(t),e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function Fc(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{await e.client.request("channels.logout",{channel:"whatsapp"}),e.whatsappLoginMessage="Logged out.",e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}catch(t){e.whatsappLoginMessage=String(t)}finally{e.whatsappBusy=!1}}}function ht(e){return typeof structuredClone=="function"?structuredClone(e):JSON.parse(JSON.stringify(e))}function It(e){return`${JSON.stringify(e,null,2).trimEnd()}
`}function Sr(e,t,n){if(t.length===0)return;let s=e;for(let o=0;o<t.length-1;o+=1){const a=t[o],l=t[o+1];if(typeof a=="number"){if(!Array.isArray(s))return;s[a]==null&&(s[a]=typeof l=="number"?[]:{}),s=s[a]}else{if(typeof s!="object"||s==null)return;const c=s;c[a]==null&&(c[a]=typeof l=="number"?[]:{}),s=c[a]}}const i=t[t.length-1];if(typeof i=="number"){Array.isArray(s)&&(s[i]=n);return}typeof s=="object"&&s!=null&&(s[i]=n)}function Ar(e,t){if(t.length===0)return;let n=e;for(let i=0;i<t.length-1;i+=1){const o=t[i];if(typeof o=="number"){if(!Array.isArray(n))return;n=n[o]}else{if(typeof n!="object"||n==null)return;n=n[o]}if(n==null)return}const s=t[t.length-1];if(typeof s=="number"){Array.isArray(n)&&n.splice(s,1);return}typeof n=="object"&&n!=null&&delete n[s]}async function we(e){if(!(!e.client||!e.connected)){e.configLoading=!0,e.lastError=null;try{const t=await e.client.request("config.get",{});Bc(e,t)}catch(t){e.lastError=String(t)}finally{e.configLoading=!1}}}async function Hn(e){if(!(!e.client||!e.connected)&&!e.configSchemaLoading){e.configSchemaLoading=!0;try{const t=await e.client.request("config.schema",{});Oc(e,t)}catch(t){e.lastError=String(t)}finally{e.configSchemaLoading=!1}}}function Oc(e,t){e.configSchema=t.schema??null,e.configUiHints=t.uiHints??{},e.configSchemaVersion=t.version??null}function Bc(e,t){e.configSnapshot=t;const n=typeof t.raw=="string"?t.raw:t.config&&typeof t.config=="object"?It(t.config):e.configRaw;!e.configFormDirty||e.configFormMode==="raw"?e.configRaw=n:e.configForm?e.configRaw=It(e.configForm):e.configRaw=n,e.configValid=typeof t.valid=="boolean"?t.valid:null,e.configIssues=Array.isArray(t.issues)?t.issues:[],e.configFormDirty||(e.configForm=ht(t.config??{}),e.configFormOriginal=ht(t.config??{}),e.configRawOriginal=n)}async function Nn(e){if(!(!e.client||!e.connected)){e.configSaving=!0,e.lastError=null;try{const t=e.configFormMode==="form"&&e.configForm?It(e.configForm):e.configRaw,n=e.configSnapshot?.hash;if(!n){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.set",{raw:t,baseHash:n}),e.configFormDirty=!1,await we(e)}catch(t){e.lastError=String(t)}finally{e.configSaving=!1}}}async function zc(e){if(!(!e.client||!e.connected)){e.configApplying=!0,e.lastError=null;try{const t=e.configFormMode==="form"&&e.configForm?It(e.configForm):e.configRaw,n=e.configSnapshot?.hash;if(!n){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.apply",{raw:t,baseHash:n,sessionKey:e.applySessionKey}),e.configFormDirty=!1,await we(e)}catch(t){e.lastError=String(t)}finally{e.configApplying=!1}}}async function Uc(e){if(!(!e.client||!e.connected)){e.updateRunning=!0,e.lastError=null;try{await e.client.request("update.run",{sessionKey:e.applySessionKey})}catch(t){e.lastError=String(t)}finally{e.updateRunning=!1}}}function $e(e,t,n){const s=ht(e.configForm??e.configSnapshot?.config??{});Sr(s,t,n),e.configForm=s,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=It(s))}function Ue(e,t){const n=ht(e.configForm??e.configSnapshot?.config??{});Ar(n,t),e.configForm=n,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=It(n))}function Hc(e){const{values:t,original:n}=e;return t.name!==n.name||t.displayName!==n.displayName||t.about!==n.about||t.picture!==n.picture||t.banner!==n.banner||t.website!==n.website||t.nip05!==n.nip05||t.lud16!==n.lud16}function Kc(e){const{state:t,callbacks:n,accountId:s}=e,i=Hc(t),o=(l,c,u={})=>{const{type:g="text",placeholder:h,maxLength:f,help:d}=u,p=t.values[l]??"",m=t.fieldErrors[l],S=`nostr-profile-${l}`;return g==="textarea"?r`
        <div class="form-field" style="margin-bottom: 12px;">
          <label for="${S}" style="display: block; margin-bottom: 4px; font-weight: 500;">
            ${c}
          </label>
          <textarea
            id="${S}"
            .value=${p}
            placeholder=${h??""}
            maxlength=${f??2e3}
            rows="3"
            style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 4px; resize: vertical; font-family: inherit;"
            @input=${k=>{const w=k.target;n.onFieldChange(l,w.value)}}
            ?disabled=${t.saving}
          ></textarea>
          ${d?r`<div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${d}</div>`:v}
          ${m?r`<div style="font-size: 12px; color: var(--danger-color); margin-top: 2px;">${m}</div>`:v}
        </div>
      `:r`
      <div class="form-field" style="margin-bottom: 12px;">
        <label for="${S}" style="display: block; margin-bottom: 4px; font-weight: 500;">
          ${c}
        </label>
        <input
          id="${S}"
          type=${g}
          .value=${p}
          placeholder=${h??""}
          maxlength=${f??256}
          style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 4px;"
          @input=${k=>{const w=k.target;n.onFieldChange(l,w.value)}}
          ?disabled=${t.saving}
        />
        ${d?r`<div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${d}</div>`:v}
        ${m?r`<div style="font-size: 12px; color: var(--danger-color); margin-top: 2px;">${m}</div>`:v}
      </div>
    `},a=()=>{const l=t.values.picture;return l?r`
      <div style="margin-bottom: 12px;">
        <img
          src=${l}
          alt="Profile picture preview"
          style="max-width: 80px; max-height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border-color);"
          @error=${c=>{const u=c.target;u.style.display="none"}}
          @load=${c=>{const u=c.target;u.style.display="block"}}
        />
      </div>
    `:v};return r`
    <div class="nostr-profile-form" style="padding: 16px; background: var(--bg-secondary); border-radius: 8px; margin-top: 12px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <div style="font-weight: 600; font-size: 16px;">Edit Profile</div>
        <div style="font-size: 12px; color: var(--text-muted);">Account: ${s}</div>
      </div>

      ${t.error?r`<div class="callout danger" style="margin-bottom: 12px;">${t.error}</div>`:v}

      ${t.success?r`<div class="callout success" style="margin-bottom: 12px;">${t.success}</div>`:v}

      ${a()}

      ${o("name","Username",{placeholder:"satoshi",maxLength:256,help:"Short username (e.g., satoshi)"})}

      ${o("displayName","Display Name",{placeholder:"Satoshi Nakamoto",maxLength:256,help:"Your full display name"})}

      ${o("about","Bio",{type:"textarea",placeholder:"Tell people about yourself...",maxLength:2e3,help:"A brief bio or description"})}

      ${o("picture","Avatar URL",{type:"url",placeholder:"https://example.com/avatar.jpg",help:"HTTPS URL to your profile picture"})}

      ${t.showAdvanced?r`
            <div style="border-top: 1px solid var(--border-color); padding-top: 12px; margin-top: 12px;">
              <div style="font-weight: 500; margin-bottom: 12px; color: var(--text-muted);">Advanced</div>

              ${o("banner","Banner URL",{type:"url",placeholder:"https://example.com/banner.jpg",help:"HTTPS URL to a banner image"})}

              ${o("website","Website",{type:"url",placeholder:"https://example.com",help:"Your personal website"})}

              ${o("nip05","NIP-05 Identifier",{placeholder:"you@example.com",help:"Verifiable identifier (e.g., you@domain.com)"})}

              ${o("lud16","Lightning Address",{placeholder:"you@getalby.com",help:"Lightning address for tips (LUD-16)"})}
            </div>
          `:v}

      <div style="display: flex; gap: 8px; margin-top: 16px; flex-wrap: wrap;">
        <button
          class="btn primary"
          @click=${n.onSave}
          ?disabled=${t.saving||!i}
        >
          ${t.saving?"Saving...":"Save & Publish"}
        </button>

        <button
          class="btn"
          @click=${n.onImport}
          ?disabled=${t.importing||t.saving}
        >
          ${t.importing?"Importing...":"Import from Relays"}
        </button>

        <button
          class="btn"
          @click=${n.onToggleAdvanced}
        >
          ${t.showAdvanced?"Hide Advanced":"Show Advanced"}
        </button>

        <button
          class="btn"
          @click=${n.onCancel}
          ?disabled=${t.saving}
        >
          Cancel
        </button>
      </div>

      ${i?r`
              <div style="font-size: 12px; color: var(--warning-color); margin-top: 8px">
                You have unsaved changes
              </div>
            `:v}
    </div>
  `}function jc(e){const t={name:e?.name??"",displayName:e?.displayName??"",about:e?.about??"",picture:e?.picture??"",banner:e?.banner??"",website:e?.website??"",nip05:e?.nip05??"",lud16:e?.lud16??""};return{values:t,original:{...t},saving:!1,importing:!1,error:null,success:null,fieldErrors:{},showAdvanced:!!(e?.banner||e?.website||e?.nip05||e?.lud16)}}async function Wc(e,t){await Dc(e,t),await ye(e,!0)}async function Gc(e){await Nc(e),await ye(e,!0)}async function qc(e){await Fc(e),await ye(e,!0)}async function Vc(e){await Nn(e),await we(e),await ye(e,!0)}async function Qc(e){await we(e),await ye(e,!0)}function Yc(e){if(!Array.isArray(e))return{};const t={};for(const n of e){if(typeof n!="string")continue;const[s,...i]=n.split(":");if(!s||i.length===0)continue;const o=s.trim(),a=i.join(":").trim();o&&a&&(t[o]=a)}return t}function Cr(e){return(e.channelsSnapshot?.channelAccounts?.nostr??[])[0]?.accountId??e.nostrProfileAccountId??"default"}function Tr(e,t=""){return`/api/channels/nostr/${encodeURIComponent(e)}/profile${t}`}function Zc(e,t,n){e.nostrProfileAccountId=t,e.nostrProfileFormState=jc(n??void 0)}function Jc(e){e.nostrProfileFormState=null,e.nostrProfileAccountId=null}function Xc(e,t,n){const s=e.nostrProfileFormState;s&&(e.nostrProfileFormState={...s,values:{...s.values,[t]:n},fieldErrors:{...s.fieldErrors,[t]:""}})}function ed(e){const t=e.nostrProfileFormState;t&&(e.nostrProfileFormState={...t,showAdvanced:!t.showAdvanced})}async function td(e){const t=e.nostrProfileFormState;if(!t||t.saving)return;const n=Cr(e);e.nostrProfileFormState={...t,saving:!0,error:null,success:null,fieldErrors:{}};try{const s=await fetch(Tr(n),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t.values)}),i=await s.json().catch(()=>null);if(!s.ok||i?.ok===!1||!i){const o=i?.error??`Profile update failed (${s.status})`;e.nostrProfileFormState={...t,saving:!1,error:o,success:null,fieldErrors:Yc(i?.details)};return}if(!i.persisted){e.nostrProfileFormState={...t,saving:!1,error:"Profile publish failed on all relays.",success:null};return}e.nostrProfileFormState={...t,saving:!1,error:null,success:"Profile published to relays.",fieldErrors:{},original:{...t.values}},await ye(e,!0)}catch(s){e.nostrProfileFormState={...t,saving:!1,error:`Profile update failed: ${String(s)}`,success:null}}}async function nd(e){const t=e.nostrProfileFormState;if(!t||t.importing)return;const n=Cr(e);e.nostrProfileFormState={...t,importing:!0,error:null,success:null};try{const s=await fetch(Tr(n,"/import"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({autoMerge:!0})}),i=await s.json().catch(()=>null);if(!s.ok||i?.ok===!1||!i){const c=i?.error??`Profile import failed (${s.status})`;e.nostrProfileFormState={...t,importing:!1,error:c,success:null};return}const o=i.merged??i.imported??null,a=o?{...t.values,...o}:t.values,l=!!(a.banner||a.website||a.nip05||a.lud16);e.nostrProfileFormState={...t,importing:!1,values:a,error:null,success:i.saved?"Profile imported from relays. Review and publish.":"Profile imported. Review and publish.",showAdvanced:l},i.saved&&await ye(e,!0)}catch(s){e.nostrProfileFormState={...t,importing:!1,error:`Profile import failed: ${String(s)}`,success:null}}}function _r(e){const t=(e??"").trim();if(!t)return null;const n=t.split(":").filter(Boolean);if(n.length<3||n[0]!=="agent")return null;const s=n[1]?.trim(),i=n.slice(2).join(":");return!s||!i?null:{agentId:s,rest:i}}const ei=450;function dn(e,t=!1,n=!1){e.chatScrollFrame&&cancelAnimationFrame(e.chatScrollFrame),e.chatScrollTimeout!=null&&(clearTimeout(e.chatScrollTimeout),e.chatScrollTimeout=null);const s=()=>{const i=e.querySelector(".chat-thread");if(i){const o=getComputedStyle(i).overflowY;if(o==="auto"||o==="scroll"||i.scrollHeight-i.clientHeight>1)return i}return document.scrollingElement??document.documentElement};e.updateComplete.then(()=>{e.chatScrollFrame=requestAnimationFrame(()=>{e.chatScrollFrame=null;const i=s();if(!i)return;const o=i.scrollHeight-i.scrollTop-i.clientHeight,a=t&&!e.chatHasAutoScrolled;if(!(a||e.chatUserNearBottom||o<ei)){e.chatNewMessagesBelow=!0;return}a&&(e.chatHasAutoScrolled=!0);const c=n&&(typeof window>"u"||typeof window.matchMedia!="function"||!window.matchMedia("(prefers-reduced-motion: reduce)").matches),u=i.scrollHeight;typeof i.scrollTo=="function"?i.scrollTo({top:u,behavior:c?"smooth":"auto"}):i.scrollTop=u,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1;const g=a?150:120;e.chatScrollTimeout=window.setTimeout(()=>{e.chatScrollTimeout=null;const h=s();if(!h)return;const f=h.scrollHeight-h.scrollTop-h.clientHeight;(a||e.chatUserNearBottom||f<ei)&&(h.scrollTop=h.scrollHeight,e.chatUserNearBottom=!0)},g)})})}function Lr(e,t=!1){e.logsScrollFrame&&cancelAnimationFrame(e.logsScrollFrame),e.updateComplete.then(()=>{e.logsScrollFrame=requestAnimationFrame(()=>{e.logsScrollFrame=null;const n=e.querySelector(".log-stream");if(!n)return;const s=n.scrollHeight-n.scrollTop-n.clientHeight;(t||s<80)&&(n.scrollTop=n.scrollHeight)})})}function sd(e,t){const n=t.currentTarget;if(!n)return;const s=n.scrollHeight-n.scrollTop-n.clientHeight;e.chatUserNearBottom=s<ei,e.chatUserNearBottom&&(e.chatNewMessagesBelow=!1)}function id(e,t){const n=t.currentTarget;if(!n)return;const s=n.scrollHeight-n.scrollTop-n.clientHeight;e.logsAtBottom=s<80}function Yo(e){e.chatHasAutoScrolled=!1,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1}function od(e,t){if(e.length===0)return;const n=new Blob([`${e.join(`
`)}
`],{type:"text/plain"}),s=URL.createObjectURL(n),i=document.createElement("a"),o=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");i.href=s,i.download=`opensoul-logs-${t}-${o}.log`,i.click(),URL.revokeObjectURL(s)}function ad(e){if(typeof ResizeObserver>"u")return;const t=e.querySelector(".topbar");if(!t)return;const n=()=>{const{height:s}=t.getBoundingClientRect();e.style.setProperty("--topbar-height",`${s}px`)};n(),e.topbarObserver=new ResizeObserver(()=>n()),e.topbarObserver.observe(t)}async function Mt(e){if(!(!e.client||!e.connected)&&!e.debugLoading){e.debugLoading=!0;try{const[t,n,s,i]=await Promise.all([e.client.request("status",{}),e.client.request("health",{}),e.client.request("models.list",{}),e.client.request("last-heartbeat",{})]);e.debugStatus=t,e.debugHealth=n;const o=s;e.debugModels=Array.isArray(o?.models)?o?.models:[],e.debugHeartbeat=i}catch(t){e.debugCallError=String(t)}finally{e.debugLoading=!1}}}async function rd(e){if(!(!e.client||!e.connected)){e.debugCallError=null,e.debugCallResult=null;try{const t=e.debugCallParams.trim()?JSON.parse(e.debugCallParams):{},n=await e.client.request(e.debugCallMethod.trim(),t);e.debugCallResult=JSON.stringify(n,null,2)}catch(t){e.debugCallError=String(t)}}}const ld=2e3,cd=new Set(["trace","debug","info","warn","error","fatal"]);function dd(e){if(typeof e!="string")return null;const t=e.trim();if(!t.startsWith("{")||!t.endsWith("}"))return null;try{const n=JSON.parse(t);return!n||typeof n!="object"?null:n}catch{return null}}function ud(e){if(typeof e!="string")return null;const t=e.toLowerCase();return cd.has(t)?t:null}function gd(e){if(!e.trim())return{raw:e,message:e};try{const t=JSON.parse(e),n=t&&typeof t._meta=="object"&&t._meta!==null?t._meta:null,s=typeof t.time=="string"?t.time:typeof n?.date=="string"?n?.date:null,i=ud(n?.logLevelName??n?.level),o=typeof t[0]=="string"?t[0]:typeof n?.name=="string"?n?.name:null,a=dd(o);let l=null;a&&(typeof a.subsystem=="string"?l=a.subsystem:typeof a.module=="string"&&(l=a.module)),!l&&o&&o.length<120&&(l=o);let c=null;return typeof t[1]=="string"?c=t[1]:!a&&typeof t[0]=="string"?c=t[0]:typeof t.message=="string"&&(c=t.message),{raw:e,time:s,level:i,subsystem:l,message:c??e,meta:n??void 0}}catch{return{raw:e,message:e}}}async function sn(e,t){if(!(!e.client||!e.connected)&&!(e.logsLoading&&!t?.quiet)){t?.quiet||(e.logsLoading=!0),e.logsError=null;try{const s=await e.client.request("logs.tail",{cursor:t?.reset?void 0:e.logsCursor??void 0,limit:e.logsLimit,maxBytes:e.logsMaxBytes}),o=(Array.isArray(s.lines)?s.lines.filter(l=>typeof l=="string"):[]).map(gd),a=!!(t?.reset||s.reset||e.logsCursor==null);e.logsEntries=a?o:[...e.logsEntries,...o].slice(-ld),typeof s.cursor=="number"&&(e.logsCursor=s.cursor),typeof s.file=="string"&&(e.logsFile=s.file),e.logsTruncated=!!s.truncated,e.logsLastFetchAt=Date.now()}catch(n){e.logsError=String(n)}finally{t?.quiet||(e.logsLoading=!1)}}}async function is(e,t){if(!(!e.client||!e.connected)&&!e.nodesLoading){e.nodesLoading=!0,t?.quiet||(e.lastError=null);try{const n=await e.client.request("node.list",{});e.nodes=Array.isArray(n.nodes)?n.nodes:[]}catch(n){t?.quiet||(e.lastError=String(n))}finally{e.nodesLoading=!1}}}function pd(e){e.nodesPollInterval==null&&(e.nodesPollInterval=window.setInterval(()=>{is(e,{quiet:!0})},5e3))}function hd(e){e.nodesPollInterval!=null&&(clearInterval(e.nodesPollInterval),e.nodesPollInterval=null)}function Ni(e){e.logsPollInterval==null&&(e.logsPollInterval=window.setInterval(()=>{e.tab==="logs"&&sn(e,{quiet:!0})},2e3))}function Fi(e){e.logsPollInterval!=null&&(clearInterval(e.logsPollInterval),e.logsPollInterval=null)}function Oi(e){e.debugPollInterval==null&&(e.debugPollInterval=window.setInterval(()=>{e.tab==="debug"&&Mt(e)},3e3))}function Bi(e){e.debugPollInterval!=null&&(clearInterval(e.debugPollInterval),e.debugPollInterval=null)}async function Er(e,t){if(!(!e.client||!e.connected||e.agentIdentityLoading)&&!e.agentIdentityById[t]){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{const n=await e.client.request("agent.identity.get",{agentId:t});n&&(e.agentIdentityById={...e.agentIdentityById,[t]:n})}catch(n){e.agentIdentityError=String(n)}finally{e.agentIdentityLoading=!1}}}async function Ir(e,t){if(!e.client||!e.connected||e.agentIdentityLoading)return;const n=t.filter(s=>!e.agentIdentityById[s]);if(n.length!==0){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{for(const s of n){const i=await e.client.request("agent.identity.get",{agentId:s});i&&(e.agentIdentityById={...e.agentIdentityById,[s]:i})}}catch(s){e.agentIdentityError=String(s)}finally{e.agentIdentityLoading=!1}}}async function Fn(e,t){if(!(!e.client||!e.connected)&&!e.agentSkillsLoading){e.agentSkillsLoading=!0,e.agentSkillsError=null;try{const n=await e.client.request("skills.status",{agentId:t});n&&(e.agentSkillsReport=n,e.agentSkillsAgentId=t)}catch(n){e.agentSkillsError=String(n)}finally{e.agentSkillsLoading=!1}}}async function zi(e){if(!(!e.client||!e.connected)&&!e.agentsLoading){e.agentsLoading=!0,e.agentsError=null;try{const t=await e.client.request("agents.list",{});if(t){e.agentsList=t;const n=e.agentsSelectedId,s=t.agents.some(i=>i.id===n);(!n||!s)&&(e.agentsSelectedId=t.defaultId??t.agents[0]?.id??null)}}catch(t){e.agentsError=String(t)}finally{e.agentsLoading=!1}}}function Ui(e,t){if(e==null||!Number.isFinite(e)||e<=0)return;if(e<1e3)return`${Math.round(e)}ms`;const n=t?.spaced?" ":"",s=Math.round(e/1e3),i=Math.floor(s/3600),o=Math.floor(s%3600/60),a=s%60;if(i>=24){const l=Math.floor(i/24),c=i%24;return c>0?`${l}d${n}${c}h`:`${l}d`}return i>0?o>0?`${i}h${n}${o}m`:`${i}h`:o>0?a>0?`${o}m${n}${a}s`:`${o}m`:`${a}s`}function Hi(e,t="n/a"){if(e==null||!Number.isFinite(e)||e<0)return t;if(e<1e3)return`${Math.round(e)}ms`;const n=Math.round(e/1e3);if(n<60)return`${n}s`;const s=Math.round(n/60);if(s<60)return`${s}m`;const i=Math.round(s/60);return i<24?`${i}h`:`${Math.round(i/24)}d`}function V(e,t){const n=t?.fallback??"n/a";if(e==null||!Number.isFinite(e))return n;const s=Date.now()-e,i=Math.abs(s),o=s>=0,a=Math.round(i/1e3);if(a<60)return o?"just now":"in <1m";const l=Math.round(a/60);if(l<60)return o?`${l}m ago`:`in ${l}m`;const c=Math.round(l/60);if(c<48)return o?`${c}h ago`:`in ${c}h`;const u=Math.round(c/24);return o?`${u}d ago`:`in ${u}d`}const fd=/<\s*\/?\s*(?:think(?:ing)?|thought|antthinking|final)\b/i,kn=/<\s*\/?\s*final\b[^<>]*>/gi,Zo=/<\s*(\/?)\s*(?:think(?:ing)?|thought|antthinking)\b[^<>]*>/gi;function Jo(e){const t=[],n=/(^|\n)(```|~~~)[^\n]*\n[\s\S]*?(?:\n\2(?:\n|$)|$)/g;for(const i of e.matchAll(n)){const o=(i.index??0)+i[1].length;t.push({start:o,end:o+i[0].length-i[1].length})}const s=/`+[^`]+`+/g;for(const i of e.matchAll(s)){const o=i.index??0,a=o+i[0].length;t.some(c=>o>=c.start&&a<=c.end)||t.push({start:o,end:a})}return t.sort((i,o)=>i.start-o.start),t}function Xo(e,t){return t.some(n=>e>=n.start&&e<n.end)}function vd(e,t){return e.trimStart()}function md(e,t){if(!e||!fd.test(e))return e;let n=e;if(kn.test(n)){kn.lastIndex=0;const l=[],c=Jo(n);for(const u of n.matchAll(kn)){const g=u.index??0;l.push({start:g,length:u[0].length,inCode:Xo(g,c)})}for(let u=l.length-1;u>=0;u--){const g=l[u];g.inCode||(n=n.slice(0,g.start)+n.slice(g.start+g.length))}}else kn.lastIndex=0;const s=Jo(n);Zo.lastIndex=0;let i="",o=0,a=!1;for(const l of n.matchAll(Zo)){const c=l.index??0,u=l[1]==="/";Xo(c,s)||(a?u&&(a=!1):(i+=n.slice(o,c),u||(a=!0)),o=c+l[0].length)}return i+=n.slice(o),vd(i)}function ft(e){return!e&&e!==0?"n/a":new Date(e).toLocaleString()}function ti(e){return!e||e.length===0?"none":e.filter(t=>!!(t&&t.trim())).join(", ")}function ni(e,t=120){return e.length<=t?e:`${e.slice(0,Math.max(0,t-1))}…`}function Mr(e,t){return e.length<=t?{text:e,truncated:!1,total:e.length}:{text:e.slice(0,Math.max(0,t)),truncated:!0,total:e.length}}function Kn(e,t){const n=Number(e);return Number.isFinite(n)?n:t}function _s(e){return md(e)}async function un(e){if(!(!e.client||!e.connected))try{const t=await e.client.request("cron.status",{});e.cronStatus=t}catch(t){e.cronError=String(t)}}async function os(e){if(!(!e.client||!e.connected)&&!e.cronLoading){e.cronLoading=!0,e.cronError=null;try{const t=await e.client.request("cron.list",{includeDisabled:!0});e.cronJobs=Array.isArray(t.jobs)?t.jobs:[]}catch(t){e.cronError=String(t)}finally{e.cronLoading=!1}}}function bd(e){if(e.scheduleKind==="at"){const n=Date.parse(e.scheduleAt);if(!Number.isFinite(n))throw new Error("Invalid run time.");return{kind:"at",at:new Date(n).toISOString()}}if(e.scheduleKind==="every"){const n=Kn(e.everyAmount,0);if(n<=0)throw new Error("Invalid interval amount.");const s=e.everyUnit;return{kind:"every",everyMs:n*(s==="minutes"?6e4:s==="hours"?36e5:864e5)}}const t=e.cronExpr.trim();if(!t)throw new Error("Cron expression required.");return{kind:"cron",expr:t,tz:e.cronTz.trim()||void 0}}function yd(e){if(e.payloadKind==="systemEvent"){const i=e.payloadText.trim();if(!i)throw new Error("System event text required.");return{kind:"systemEvent",text:i}}const t=e.payloadText.trim();if(!t)throw new Error("Agent message required.");const n={kind:"agentTurn",message:t},s=Kn(e.timeoutSeconds,0);return s>0&&(n.timeoutSeconds=s),n}async function xd(e){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{const t=bd(e.cronForm),n=yd(e.cronForm),s=e.cronForm.sessionTarget==="isolated"&&e.cronForm.payloadKind==="agentTurn"&&e.cronForm.deliveryMode?{mode:e.cronForm.deliveryMode==="announce"?"announce":"none",channel:e.cronForm.deliveryChannel.trim()||"last",to:e.cronForm.deliveryTo.trim()||void 0}:void 0,i=e.cronForm.agentId.trim(),o={name:e.cronForm.name.trim(),description:e.cronForm.description.trim()||void 0,agentId:i||void 0,enabled:e.cronForm.enabled,schedule:t,sessionTarget:e.cronForm.sessionTarget,wakeMode:e.cronForm.wakeMode,payload:n,delivery:s};if(!o.name)throw new Error("Name required.");await e.client.request("cron.add",o),e.cronForm={...e.cronForm,name:"",description:"",payloadText:""},await os(e),await un(e)}catch(t){e.cronError=String(t)}finally{e.cronBusy=!1}}}async function $d(e,t,n){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.update",{id:t.id,patch:{enabled:n}}),await os(e),await un(e)}catch(s){e.cronError=String(s)}finally{e.cronBusy=!1}}}async function wd(e,t){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.run",{id:t.id,mode:"force"}),await Rr(e,t.id)}catch(n){e.cronError=String(n)}finally{e.cronBusy=!1}}}async function kd(e,t){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.remove",{id:t.id}),e.cronRunsJobId===t.id&&(e.cronRunsJobId=null,e.cronRuns=[]),await os(e),await un(e)}catch(n){e.cronError=String(n)}finally{e.cronBusy=!1}}}async function Rr(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("cron.runs",{id:t,limit:50});e.cronRunsJobId=t,e.cronRuns=Array.isArray(n.entries)?n.entries:[]}catch(n){e.cronError=String(n)}}const Pr="opensoul.device.auth.v1";function Ki(e){return e.trim()}function Sd(e){if(!Array.isArray(e))return[];const t=new Set;for(const n of e){const s=n.trim();s&&t.add(s)}return[...t].toSorted()}function ji(){try{const e=window.localStorage.getItem(Pr);if(!e)return null;const t=JSON.parse(e);return!t||t.version!==1||!t.deviceId||typeof t.deviceId!="string"||!t.tokens||typeof t.tokens!="object"?null:t}catch{return null}}function Dr(e){try{window.localStorage.setItem(Pr,JSON.stringify(e))}catch{}}function Ad(e){const t=ji();if(!t||t.deviceId!==e.deviceId)return null;const n=Ki(e.role),s=t.tokens[n];return!s||typeof s.token!="string"?null:s}function Nr(e){const t=Ki(e.role),n={version:1,deviceId:e.deviceId,tokens:{}},s=ji();s&&s.deviceId===e.deviceId&&(n.tokens={...s.tokens});const i={token:e.token,role:t,scopes:Sd(e.scopes),updatedAtMs:Date.now()};return n.tokens[t]=i,Dr(n),i}function Fr(e){const t=ji();if(!t||t.deviceId!==e.deviceId)return;const n=Ki(e.role);if(!t.tokens[n])return;const s={...t,tokens:{...t.tokens}};delete s.tokens[n],Dr(s)}const Or={p:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,n:0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,h:8n,a:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,d:0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,Gx:0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,Gy:0x6666666666666666666666666666666666666666666666666666666666666658n},{p:ue,n:On,Gx:ea,Gy:ta,a:Ls,d:Es,h:Cd}=Or,vt=32,Wi=64,Td=(...e)=>{"captureStackTrace"in Error&&typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(...e)},re=(e="")=>{const t=new Error(e);throw Td(t,re),t},_d=e=>typeof e=="bigint",Ld=e=>typeof e=="string",Ed=e=>e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array",Ze=(e,t,n="")=>{const s=Ed(e),i=e?.length,o=t!==void 0;if(!s||o&&i!==t){const a=n&&`"${n}" `,l=o?` of length ${t}`:"",c=s?`length=${i}`:`type=${typeof e}`;re(a+"expected Uint8Array"+l+", got "+c)}return e},as=e=>new Uint8Array(e),Br=e=>Uint8Array.from(e),zr=(e,t)=>e.toString(16).padStart(t,"0"),Ur=e=>Array.from(Ze(e)).map(t=>zr(t,2)).join(""),He={_0:48,_9:57,A:65,F:70,a:97,f:102},na=e=>{if(e>=He._0&&e<=He._9)return e-He._0;if(e>=He.A&&e<=He.F)return e-(He.A-10);if(e>=He.a&&e<=He.f)return e-(He.a-10)},Hr=e=>{const t="hex invalid";if(!Ld(e))return re(t);const n=e.length,s=n/2;if(n%2)return re(t);const i=as(s);for(let o=0,a=0;o<s;o++,a+=2){const l=na(e.charCodeAt(a)),c=na(e.charCodeAt(a+1));if(l===void 0||c===void 0)return re(t);i[o]=l*16+c}return i},Kr=()=>globalThis?.crypto,Id=()=>Kr()?.subtle??re("crypto.subtle must be defined, consider polyfill"),on=(...e)=>{const t=as(e.reduce((s,i)=>s+Ze(i).length,0));let n=0;return e.forEach(s=>{t.set(s,n),n+=s.length}),t},Md=(e=vt)=>Kr().getRandomValues(as(e)),jn=BigInt,rt=(e,t,n,s="bad number: out of range")=>_d(e)&&t<=e&&e<n?e:re(s),D=(e,t=ue)=>{const n=e%t;return n>=0n?n:t+n},jr=e=>D(e,On),Rd=(e,t)=>{(e===0n||t<=0n)&&re("no inverse n="+e+" mod="+t);let n=D(e,t),s=t,i=0n,o=1n;for(;n!==0n;){const a=s/n,l=s%n,c=i-o*a;s=n,n=l,i=o,o=c}return s===1n?D(i,t):re("no inverse")},Pd=e=>{const t=Vr[e];return typeof t!="function"&&re("hashes."+e+" not set"),t},Is=e=>e instanceof Se?e:re("Point expected"),si=2n**256n;class Se{static BASE;static ZERO;X;Y;Z;T;constructor(t,n,s,i){const o=si;this.X=rt(t,0n,o),this.Y=rt(n,0n,o),this.Z=rt(s,1n,o),this.T=rt(i,0n,o),Object.freeze(this)}static CURVE(){return Or}static fromAffine(t){return new Se(t.x,t.y,1n,D(t.x*t.y))}static fromBytes(t,n=!1){const s=Es,i=Br(Ze(t,vt)),o=t[31];i[31]=o&-129;const a=Gr(i);rt(a,0n,n?si:ue);const c=D(a*a),u=D(c-1n),g=D(s*c+1n);let{isValid:h,value:f}=Nd(u,g);h||re("bad point: y not sqrt");const d=(f&1n)===1n,p=(o&128)!==0;return!n&&f===0n&&p&&re("bad point: x==0, isLastByteOdd"),p!==d&&(f=D(-f)),new Se(f,a,1n,D(f*a))}static fromHex(t,n){return Se.fromBytes(Hr(t),n)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}assertValidity(){const t=Ls,n=Es,s=this;if(s.is0())return re("bad point: ZERO");const{X:i,Y:o,Z:a,T:l}=s,c=D(i*i),u=D(o*o),g=D(a*a),h=D(g*g),f=D(c*t),d=D(g*D(f+u)),p=D(h+D(n*D(c*u)));if(d!==p)return re("bad point: equation left != right (1)");const m=D(i*o),S=D(a*l);return m!==S?re("bad point: equation left != right (2)"):this}equals(t){const{X:n,Y:s,Z:i}=this,{X:o,Y:a,Z:l}=Is(t),c=D(n*l),u=D(o*i),g=D(s*l),h=D(a*i);return c===u&&g===h}is0(){return this.equals(_t)}negate(){return new Se(D(-this.X),this.Y,this.Z,D(-this.T))}double(){const{X:t,Y:n,Z:s}=this,i=Ls,o=D(t*t),a=D(n*n),l=D(2n*D(s*s)),c=D(i*o),u=t+n,g=D(D(u*u)-o-a),h=c+a,f=h-l,d=c-a,p=D(g*f),m=D(h*d),S=D(g*d),k=D(f*h);return new Se(p,m,k,S)}add(t){const{X:n,Y:s,Z:i,T:o}=this,{X:a,Y:l,Z:c,T:u}=Is(t),g=Ls,h=Es,f=D(n*a),d=D(s*l),p=D(o*h*u),m=D(i*c),S=D((n+s)*(a+l)-f-d),k=D(m-p),w=D(m+p),A=D(d-g*f),C=D(S*k),_=D(w*A),T=D(S*A),M=D(k*w);return new Se(C,_,M,T)}subtract(t){return this.add(Is(t).negate())}multiply(t,n=!0){if(!n&&(t===0n||this.is0()))return _t;if(rt(t,1n,On),t===1n)return this;if(this.equals(mt))return qd(t).p;let s=_t,i=mt;for(let o=this;t>0n;o=o.double(),t>>=1n)t&1n?s=s.add(o):n&&(i=i.add(o));return s}multiplyUnsafe(t){return this.multiply(t,!1)}toAffine(){const{X:t,Y:n,Z:s}=this;if(this.equals(_t))return{x:0n,y:1n};const i=Rd(s,ue);D(s*i)!==1n&&re("invalid inverse");const o=D(t*i),a=D(n*i);return{x:o,y:a}}toBytes(){const{x:t,y:n}=this.assertValidity().toAffine(),s=Wr(n);return s[31]|=t&1n?128:0,s}toHex(){return Ur(this.toBytes())}clearCofactor(){return this.multiply(jn(Cd),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let t=this.multiply(On/2n,!1).double();return On%2n&&(t=t.add(this)),t.is0()}}const mt=new Se(ea,ta,1n,D(ea*ta)),_t=new Se(0n,1n,1n,0n);Se.BASE=mt;Se.ZERO=_t;const Wr=e=>Hr(zr(rt(e,0n,si),Wi)).reverse(),Gr=e=>jn("0x"+Ur(Br(Ze(e)).reverse())),Me=(e,t)=>{let n=e;for(;t-- >0n;)n*=n,n%=ue;return n},Dd=e=>{const n=e*e%ue*e%ue,s=Me(n,2n)*n%ue,i=Me(s,1n)*e%ue,o=Me(i,5n)*i%ue,a=Me(o,10n)*o%ue,l=Me(a,20n)*a%ue,c=Me(l,40n)*l%ue,u=Me(c,80n)*c%ue,g=Me(u,80n)*c%ue,h=Me(g,10n)*o%ue;return{pow_p_5_8:Me(h,2n)*e%ue,b2:n}},sa=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,Nd=(e,t)=>{const n=D(t*t*t),s=D(n*n*t),i=Dd(e*s).pow_p_5_8;let o=D(e*n*i);const a=D(t*o*o),l=o,c=D(o*sa),u=a===e,g=a===D(-e),h=a===D(-e*sa);return u&&(o=l),(g||h)&&(o=c),(D(o)&1n)===1n&&(o=D(-o)),{isValid:u||g,value:o}},ii=e=>jr(Gr(e)),Gi=(...e)=>Vr.sha512Async(on(...e)),Fd=(...e)=>Pd("sha512")(on(...e)),qr=e=>{const t=e.slice(0,vt);t[0]&=248,t[31]&=127,t[31]|=64;const n=e.slice(vt,Wi),s=ii(t),i=mt.multiply(s),o=i.toBytes();return{head:t,prefix:n,scalar:s,point:i,pointBytes:o}},qi=e=>Gi(Ze(e,vt)).then(qr),Od=e=>qr(Fd(Ze(e,vt))),Bd=e=>qi(e).then(t=>t.pointBytes),zd=e=>Gi(e.hashable).then(e.finish),Ud=(e,t,n)=>{const{pointBytes:s,scalar:i}=e,o=ii(t),a=mt.multiply(o).toBytes();return{hashable:on(a,s,n),finish:u=>{const g=jr(o+ii(u)*i);return Ze(on(a,Wr(g)),Wi)}}},Hd=async(e,t)=>{const n=Ze(e),s=await qi(t),i=await Gi(s.prefix,n);return zd(Ud(s,i,n))},Vr={sha512Async:async e=>{const t=Id(),n=on(e);return as(await t.digest("SHA-512",n.buffer))},sha512:void 0},Kd=(e=Md(vt))=>e,jd={getExtendedPublicKeyAsync:qi,getExtendedPublicKey:Od,randomSecretKey:Kd},Wn=8,Wd=256,Qr=Math.ceil(Wd/Wn)+1,oi=2**(Wn-1),Gd=()=>{const e=[];let t=mt,n=t;for(let s=0;s<Qr;s++){n=t,e.push(n);for(let i=1;i<oi;i++)n=n.add(t),e.push(n);t=n.double()}return e};let ia;const oa=(e,t)=>{const n=t.negate();return e?n:t},qd=e=>{const t=ia||(ia=Gd());let n=_t,s=mt;const i=2**Wn,o=i,a=jn(i-1),l=jn(Wn);for(let c=0;c<Qr;c++){let u=Number(e&a);e>>=l,u>oi&&(u-=o,e+=1n);const g=c*oi,h=g,f=g+Math.abs(u)-1,d=c%2!==0,p=u<0;u===0?s=s.add(oa(d,t[h])):n=n.add(oa(p,t[f]))}return e!==0n&&re("invalid wnaf"),{p:n,f:s}},Ms="opensoul-device-identity-v1";function ai(e){let t="";for(const n of e)t+=String.fromCharCode(n);return btoa(t).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function Yr(e){const t=e.replaceAll("-","+").replaceAll("_","/"),n=t+"=".repeat((4-t.length%4)%4),s=atob(n),i=new Uint8Array(s.length);for(let o=0;o<s.length;o+=1)i[o]=s.charCodeAt(o);return i}function Vd(e){return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")}async function Zr(e){const t=await crypto.subtle.digest("SHA-256",e.slice().buffer);return Vd(new Uint8Array(t))}async function Qd(){const e=jd.randomSecretKey(),t=await Bd(e);return{deviceId:await Zr(t),publicKey:ai(t),privateKey:ai(e)}}async function Vi(){try{const n=localStorage.getItem(Ms);if(n){const s=JSON.parse(n);if(s?.version===1&&typeof s.deviceId=="string"&&typeof s.publicKey=="string"&&typeof s.privateKey=="string"){const i=await Zr(Yr(s.publicKey));if(i!==s.deviceId){const o={...s,deviceId:i};return localStorage.setItem(Ms,JSON.stringify(o)),{deviceId:i,publicKey:s.publicKey,privateKey:s.privateKey}}return{deviceId:s.deviceId,publicKey:s.publicKey,privateKey:s.privateKey}}}}catch{}const e=await Qd(),t={version:1,deviceId:e.deviceId,publicKey:e.publicKey,privateKey:e.privateKey,createdAtMs:Date.now()};return localStorage.setItem(Ms,JSON.stringify(t)),e}async function Yd(e,t){const n=Yr(e),s=new TextEncoder().encode(t),i=await Hd(s,n);return ai(i)}async function Je(e,t){if(!(!e.client||!e.connected)&&!e.devicesLoading){e.devicesLoading=!0,t?.quiet||(e.devicesError=null);try{const n=await e.client.request("device.pair.list",{});e.devicesList={pending:Array.isArray(n?.pending)?n.pending:[],paired:Array.isArray(n?.paired)?n.paired:[]}}catch(n){t?.quiet||(e.devicesError=String(n))}finally{e.devicesLoading=!1}}}async function Zd(e,t){if(!(!e.client||!e.connected))try{await e.client.request("device.pair.approve",{requestId:t}),await Je(e)}catch(n){e.devicesError=String(n)}}async function Jd(e,t){if(!(!e.client||!e.connected||!window.confirm("Reject this device pairing request?")))try{await e.client.request("device.pair.reject",{requestId:t}),await Je(e)}catch(s){e.devicesError=String(s)}}async function Xd(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("device.token.rotate",t);if(n?.token){const s=await Vi(),i=n.role??t.role;(n.deviceId===s.deviceId||t.deviceId===s.deviceId)&&Nr({deviceId:s.deviceId,role:i,token:n.token,scopes:n.scopes??t.scopes??[]}),window.prompt("New device token (copy and store securely):",n.token)}await Je(e)}catch(n){e.devicesError=String(n)}}async function eu(e,t){if(!(!e.client||!e.connected||!window.confirm(`Revoke token for ${t.deviceId} (${t.role})?`)))try{await e.client.request("device.token.revoke",t);const s=await Vi();t.deviceId===s.deviceId&&Fr({deviceId:s.deviceId,role:t.role}),await Je(e)}catch(s){e.devicesError=String(s)}}function tu(e){if(!e||e.kind==="gateway")return{method:"exec.approvals.get",params:{}};const t=e.nodeId.trim();return t?{method:"exec.approvals.node.get",params:{nodeId:t}}:null}function nu(e,t){if(!e||e.kind==="gateway")return{method:"exec.approvals.set",params:t};const n=e.nodeId.trim();return n?{method:"exec.approvals.node.set",params:{...t,nodeId:n}}:null}async function Qi(e,t){if(!(!e.client||!e.connected)&&!e.execApprovalsLoading){e.execApprovalsLoading=!0,e.lastError=null;try{const n=tu(t);if(!n){e.lastError="Select a node before loading exec approvals.";return}const s=await e.client.request(n.method,n.params);su(e,s)}catch(n){e.lastError=String(n)}finally{e.execApprovalsLoading=!1}}}function su(e,t){e.execApprovalsSnapshot=t,e.execApprovalsDirty||(e.execApprovalsForm=ht(t.file??{}))}async function iu(e,t){if(!(!e.client||!e.connected)){e.execApprovalsSaving=!0,e.lastError=null;try{const n=e.execApprovalsSnapshot?.hash;if(!n){e.lastError="Exec approvals hash missing; reload and retry.";return}const s=e.execApprovalsForm??e.execApprovalsSnapshot?.file??{},i=nu(t,{file:s,baseHash:n});if(!i){e.lastError="Select a node before saving exec approvals.";return}await e.client.request(i.method,i.params),e.execApprovalsDirty=!1,await Qi(e,t)}catch(n){e.lastError=String(n)}finally{e.execApprovalsSaving=!1}}}function ou(e,t,n){const s=ht(e.execApprovalsForm??e.execApprovalsSnapshot?.file??{});Sr(s,t,n),e.execApprovalsForm=s,e.execApprovalsDirty=!0}function au(e,t){const n=ht(e.execApprovalsForm??e.execApprovalsSnapshot?.file??{});Ar(n,t),e.execApprovalsForm=n,e.execApprovalsDirty=!0}async function Yi(e){if(!(!e.client||!e.connected)&&!e.presenceLoading){e.presenceLoading=!0,e.presenceError=null,e.presenceStatus=null;try{const t=await e.client.request("system-presence",{});Array.isArray(t)?(e.presenceEntries=t,e.presenceStatus=t.length===0?"No instances yet.":null):(e.presenceEntries=[],e.presenceStatus="No presence payload.")}catch(t){e.presenceError=String(t)}finally{e.presenceLoading=!1}}}async function yt(e,t){if(!(!e.client||!e.connected)&&!e.sessionsLoading){e.sessionsLoading=!0,e.sessionsError=null;try{const n=t?.includeGlobal??e.sessionsIncludeGlobal,s=t?.includeUnknown??e.sessionsIncludeUnknown,i=t?.activeMinutes??Kn(e.sessionsFilterActive,0),o=t?.limit??Kn(e.sessionsFilterLimit,0),a={includeGlobal:n,includeUnknown:s};i>0&&(a.activeMinutes=i),o>0&&(a.limit=o);const l=await e.client.request("sessions.list",a);l&&(e.sessionsResult=l)}catch(n){e.sessionsError=String(n)}finally{e.sessionsLoading=!1}}}async function ru(e,t,n){if(!e.client||!e.connected)return;const s={key:t};"label"in n&&(s.label=n.label),"thinkingLevel"in n&&(s.thinkingLevel=n.thinkingLevel),"verboseLevel"in n&&(s.verboseLevel=n.verboseLevel),"reasoningLevel"in n&&(s.reasoningLevel=n.reasoningLevel);try{await e.client.request("sessions.patch",s),await yt(e)}catch(i){e.sessionsError=String(i)}}async function lu(e,t){if(!(!e.client||!e.connected||e.sessionsLoading||!window.confirm(`Delete session "${t}"?

Deletes the session entry and archives its transcript.`))){e.sessionsLoading=!0,e.sessionsError=null;try{await e.client.request("sessions.delete",{key:t,deleteTranscript:!0}),await yt(e)}catch(s){e.sessionsError=String(s)}finally{e.sessionsLoading=!1}}}function Rt(e,t,n){if(!t.trim())return;const s={...e.skillMessages};n?s[t]=n:delete s[t],e.skillMessages=s}function rs(e){return e instanceof Error?e.message:String(e)}async function gn(e,t){if(t?.clearMessages&&Object.keys(e.skillMessages).length>0&&(e.skillMessages={}),!(!e.client||!e.connected)&&!e.skillsLoading){e.skillsLoading=!0,e.skillsError=null;try{const n=await e.client.request("skills.status",{});n&&(e.skillsReport=n)}catch(n){e.skillsError=rs(n)}finally{e.skillsLoading=!1}}}function cu(e,t,n){e.skillEdits={...e.skillEdits,[t]:n}}async function du(e,t,n){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{await e.client.request("skills.update",{skillKey:t,enabled:n}),await gn(e),Rt(e,t,{kind:"success",message:n?"Skill enabled":"Skill disabled"})}catch(s){const i=rs(s);e.skillsError=i,Rt(e,t,{kind:"error",message:i})}finally{e.skillsBusyKey=null}}}async function uu(e,t){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const n=e.skillEdits[t]??"";await e.client.request("skills.update",{skillKey:t,apiKey:n}),await gn(e),Rt(e,t,{kind:"success",message:"API key saved"})}catch(n){const s=rs(n);e.skillsError=s,Rt(e,t,{kind:"error",message:s})}finally{e.skillsBusyKey=null}}}async function gu(e,t,n,s){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const i=await e.client.request("skills.install",{name:n,installId:s,timeoutMs:12e4});await gn(e),Rt(e,t,{kind:"success",message:i?.message??"Installed"})}catch(i){const o=rs(i);e.skillsError=o,Rt(e,t,{kind:"error",message:o})}finally{e.skillsBusyKey=null}}}function pu(){return!!window.__opensoul_bridge?.isDesktop}function Dt(){return window.__opensoul_bridge??null}function hu(){const e=Dt();e&&e.send("shell.ready",{version:"1.0"})}function aa(e){const t=Dt();t&&t.send("shell.connectionStateChanged",{state:e})}function fu(e){const t=Dt();t&&t.send("shell.themeChanged",{theme:e})}function vu(e,t){const n=Dt();n&&n.send("shell.tabChanged",{tab:e,title:t})}let ri=null;function mu(e){const t=Dt();t&&(ri=e,t.on("host.init",n=>{e.onInit?.(n)}),t.on("host.themeChanged",n=>{const s=n;s?.theme&&e.onThemeChanged?.(s.theme)}),t.on("host.navigate",n=>{const s=n;s?.tab&&e.onNavigate?.(s.tab)}),t.on("host.focus",n=>{const s=n;s?.target&&e.onFocus?.(s.target)}),t.on("host.fileDrop",n=>{const s=n;s?.files&&e.onFileDrop?.(s.files)}),t.on("host.windowState",n=>{const s=n;s?.state&&e.onWindowState?.(s.state)}),t.on("host.settingsChanged",n=>{n&&typeof n=="object"&&e.onSettingsChanged?.(n)}),t.on("host.commandPalette",()=>{e.onCommandPalette?.()}),t.on("host.execApprovalResult",n=>{const s=n;s?.requestId!=null&&e.onExecApprovalResult?.(s.requestId,!!s.approved,!!s.remember)}),t.on("host.devicePairResult",n=>{const s=n;s?.requestId!=null&&e.onDevicePairResult?.(s.requestId,!!s.approved)}))}function bu(){const e=Dt();!e||!ri||(e.off("host.init"),e.off("host.themeChanged"),e.off("host.navigate"),e.off("host.focus"),e.off("host.fileDrop"),e.off("host.windowState"),e.off("host.settingsChanged"),e.off("host.commandPalette"),e.off("host.execApprovalResult"),e.off("host.devicePairResult"),ri=null)}const yu=[{label:"Assist",tabs:["chat"]},{label:"Operate",tabs:["channels","instances","sessions","usage","cron"]},{label:"Build",tabs:["agents","skills","nodes"]},{label:"System",tabs:["overview"]}],Jr=["config","logs","debug"],Xr={agents:"/agents",overview:"/overview",channels:"/channels",instances:"/instances",sessions:"/sessions",usage:"/usage",cron:"/cron",skills:"/skills",nodes:"/nodes",chat:"/chat",config:"/config",debug:"/debug",logs:"/logs"},el=new Map(Object.entries(Xr).map(([e,t])=>[t,e]));function pn(e){if(!e)return"";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t==="/"?"":(t.endsWith("/")&&(t=t.slice(0,-1)),t)}function an(e){if(!e)return"/";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t.length>1&&t.endsWith("/")&&(t=t.slice(0,-1)),t}function ls(e,t=""){const n=pn(t),s=Xr[e];return n?`${n}${s}`:s}function Zi(e,t=""){const n=pn(t);let s=e||"/";n&&(s===n?s="/":s.startsWith(`${n}/`)&&(s=s.slice(n.length)));let i=an(s).toLowerCase();return i.endsWith("/index.html")&&(i="/"),i==="/"?"chat":el.get(i)??null}function xu(e){let t=an(e);if(t.endsWith("/index.html")&&(t=an(t.slice(0,-11))),t==="/")return"";const n=t.split("/").filter(Boolean);if(n.length===0)return"";for(let s=0;s<n.length;s++){const i=`/${n.slice(s).join("/")}`.toLowerCase();if(el.has(i)){const o=n.slice(0,s);return o.length?`/${o.join("/")}`:""}}return`/${n.join("/")}`}function $u(e){switch(e){case"agents":return"folder";case"chat":return"messageSquare";case"overview":return"barChart";case"channels":return"link";case"instances":return"radio";case"sessions":return"fileText";case"usage":return"barChart";case"cron":return"loader";case"skills":return"zap";case"nodes":return"monitor";case"config":return"settings";case"debug":return"bug";case"logs":return"scrollText";default:return"folder"}}function Gn(e){switch(e){case"agents":return"Agents";case"overview":return"Overview";case"channels":return"Channels";case"instances":return"Instances";case"sessions":return"Sessions";case"usage":return"Usage";case"cron":return"Cron Jobs";case"skills":return"Skills";case"nodes":return"Nodes";case"chat":return"Chat";case"config":return"Config";case"debug":return"Debug";case"logs":return"Logs";default:return"Control"}}function wu(e){switch(e){case"agents":return"Build and manage agent workspaces, tools, and identities.";case"overview":return"System health, entry points, and fast operational diagnostics.";case"channels":return"Operate and monitor channel connectivity and settings.";case"instances":return"Live presence beacons from connected clients and nodes.";case"sessions":return"Inspect active sessions and adjust per-session behavior.";case"usage":return"";case"cron":return"Schedule wakeups and recurring automated agent runs.";case"skills":return"Manage skill availability and API key injection across agents.";case"nodes":return"Manage paired devices, capabilities, and command exposure.";case"chat":return"Direct assistant workspace for fast interventions and control.";case"config":return"Edit ~/.opensoul/opensoul.json with schema-aware safeguards.";case"debug":return"Advanced snapshots, event inspection, and manual RPC calls.";case"logs":return"Live tail of gateway file logs with operational filtering.";default:return""}}const tl="opensoul.control.settings.v1";function ku(){const t={gatewayUrl:`${location.protocol==="https:"?"wss":"ws"}://${location.host}`,token:"",sessionKey:"main",lastActiveSessionKey:"main",theme:"system",chatFocusMode:!1,chatShowThinking:!0,splitRatio:.6,navCollapsed:!1,navGroupsCollapsed:{},operateZoomLevel:1};try{const n=localStorage.getItem(tl);if(!n)return t;const s=JSON.parse(n);return{gatewayUrl:typeof s.gatewayUrl=="string"&&s.gatewayUrl.trim()?s.gatewayUrl.trim():t.gatewayUrl,token:typeof s.token=="string"?s.token:t.token,sessionKey:typeof s.sessionKey=="string"&&s.sessionKey.trim()?s.sessionKey.trim():t.sessionKey,lastActiveSessionKey:typeof s.lastActiveSessionKey=="string"&&s.lastActiveSessionKey.trim()?s.lastActiveSessionKey.trim():typeof s.sessionKey=="string"&&s.sessionKey.trim()||t.lastActiveSessionKey,theme:s.theme==="light"||s.theme==="dark"||s.theme==="system"?s.theme:t.theme,chatFocusMode:typeof s.chatFocusMode=="boolean"?s.chatFocusMode:t.chatFocusMode,chatShowThinking:typeof s.chatShowThinking=="boolean"?s.chatShowThinking:t.chatShowThinking,splitRatio:typeof s.splitRatio=="number"&&s.splitRatio>=.4&&s.splitRatio<=.7?s.splitRatio:t.splitRatio,navCollapsed:typeof s.navCollapsed=="boolean"?s.navCollapsed:t.navCollapsed,navGroupsCollapsed:typeof s.navGroupsCollapsed=="object"&&s.navGroupsCollapsed!==null?s.navGroupsCollapsed:t.navGroupsCollapsed,operateZoomLevel:typeof s.operateZoomLevel=="number"&&s.operateZoomLevel>=.5&&s.operateZoomLevel<=3?s.operateZoomLevel:t.operateZoomLevel}}catch{return t}}function Su(e){localStorage.setItem(tl,JSON.stringify(e))}const Sn=e=>Number.isNaN(e)?.5:e<=0?0:e>=1?1:e,Au=()=>typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches??!1,An=e=>{e.classList.remove("theme-transition"),e.style.removeProperty("--theme-switch-x"),e.style.removeProperty("--theme-switch-y")},Cu=({nextTheme:e,applyTheme:t,context:n,currentTheme:s})=>{if(s===e)return;const i=globalThis.document??null;if(!i){t();return}const o=i.documentElement,a=i,l=Au();if(!!a.startViewTransition&&!l){let u=.5,g=.5;if(n?.pointerClientX!==void 0&&n?.pointerClientY!==void 0&&typeof window<"u")u=Sn(n.pointerClientX/window.innerWidth),g=Sn(n.pointerClientY/window.innerHeight);else if(n?.element){const h=n.element.getBoundingClientRect();h.width>0&&h.height>0&&typeof window<"u"&&(u=Sn((h.left+h.width/2)/window.innerWidth),g=Sn((h.top+h.height/2)/window.innerHeight))}o.style.setProperty("--theme-switch-x",`${u*100}%`),o.style.setProperty("--theme-switch-y",`${g*100}%`),o.classList.add("theme-transition");try{const h=a.startViewTransition?.(()=>{t()});h?.finished?h.finished.finally(()=>An(o)):An(o)}catch{An(o),t()}return}t(),An(o)};function Tu(){return typeof window>"u"||typeof window.matchMedia!="function"||window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function Ji(e){return e==="system"?Tu():e}function je(e,t){const n={...t,lastActiveSessionKey:t.lastActiveSessionKey?.trim()||t.sessionKey.trim()||"main"};e.settings=n,Su(n),t.theme!==e.theme&&(e.theme=t.theme,cs(e,Ji(t.theme))),e.applySessionKey=e.settings.lastActiveSessionKey}function nl(e,t){const n=t.trim();n&&e.settings.lastActiveSessionKey!==n&&je(e,{...e.settings,lastActiveSessionKey:n})}function _u(e){if(!window.location.search&&!window.location.hash)return;const t=new URL(window.location.href),n=new URLSearchParams(t.search),s=new URLSearchParams(t.hash.startsWith("#")?t.hash.slice(1):t.hash),i=n.get("token")??s.get("token"),o=n.get("password")??s.get("password"),a=n.get("session")??s.get("session"),l=n.get("gatewayUrl")??s.get("gatewayUrl");let c=!1;if(i!=null){const g=i.trim();g&&g!==e.settings.token&&je(e,{...e.settings,token:g}),n.delete("token"),s.delete("token"),c=!0}if(o!=null){const g=o.trim();g&&(e.password=g),n.delete("password"),s.delete("password"),c=!0}if(a!=null){const g=a.trim();g&&(e.sessionKey=g,je(e,{...e.settings,sessionKey:g,lastActiveSessionKey:g}))}if(l!=null){const g=l.trim();g&&g!==e.settings.gatewayUrl&&(e.pendingGatewayUrl=g),n.delete("gatewayUrl"),s.delete("gatewayUrl"),c=!0}if(!c)return;t.search=n.toString();const u=s.toString();t.hash=u?`#${u}`:"",window.history.replaceState({},"",t.toString())}function sl(e,t){if(Jr.includes(t)){e.openSettings(t),rn({...e,tab:t});return}e.tab!==t&&(e.tab=t),vu(t,Gn(t)),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Ni(e):Fi(e),t==="debug"?Oi(e):Bi(e),rn(e),ol(e,t,!1)}function li(e,t,n){Cu({nextTheme:t,applyTheme:()=>{e.theme=t,je(e,{...e.settings,theme:t}),cs(e,Ji(t))},context:n,currentTheme:e.theme})}async function rn(e){if(e.tab==="overview"&&await al(e),e.tab==="channels"&&await Nu(e),e.tab==="instances"&&await Yi(e),e.tab==="sessions"&&await yt(e),e.tab==="cron"&&await qn(e),e.tab==="skills"&&await gn(e),e.tab==="agents"){await zi(e),await we(e);const t=e.agentsList?.agents?.map(s=>s.id)??[];t.length>0&&Ir(e,t);const n=e.agentsSelectedId??e.agentsList?.defaultId??e.agentsList?.agents?.[0]?.id;n&&(Er(e,n),e.agentsPanel==="skills"&&Fn(e,n),e.agentsPanel==="channels"&&ye(e,!1),e.agentsPanel==="cron"&&qn(e))}e.tab==="nodes"&&(await is(e),await Je(e),await we(e),await Qi(e)),e.tab==="chat"&&(await pl(e),dn(e,!e.chatHasAutoScrolled)),e.tab==="config"&&(await Hn(e),await we(e)),e.tab==="debug"&&(await Mt(e),e.eventLog=e.eventLogBuffer),e.tab==="logs"&&(e.logsAtBottom=!0,await sn(e,{reset:!0}),Lr(e,!0))}function Lu(){if(typeof window>"u")return"";const e=window.__OPENSOUL_CONTROL_UI_BASE_PATH__;return typeof e=="string"&&e.trim()?pn(e):xu(window.location.pathname)}function Eu(e){e.theme=e.settings.theme??"system",cs(e,Ji(e.theme))}function cs(e,t){if(e.themeResolved=t,typeof document>"u")return;const n=document.documentElement;n.dataset.theme=t,n.style.colorScheme=t,fu(t)}function Iu(e){if(typeof window>"u"||typeof window.matchMedia!="function")return;if(e.themeMedia=window.matchMedia("(prefers-color-scheme: dark)"),e.themeMediaHandler=n=>{e.theme==="system"&&cs(e,n.matches?"dark":"light")},typeof e.themeMedia.addEventListener=="function"){e.themeMedia.addEventListener("change",e.themeMediaHandler);return}e.themeMedia.addListener(e.themeMediaHandler)}function Mu(e){if(!e.themeMedia||!e.themeMediaHandler)return;if(typeof e.themeMedia.removeEventListener=="function"){e.themeMedia.removeEventListener("change",e.themeMediaHandler);return}e.themeMedia.removeListener(e.themeMediaHandler),e.themeMedia=null,e.themeMediaHandler=null}function Ru(e,t){if(typeof window>"u")return;const n=Zi(window.location.pathname,e.basePath)??"chat";il(e,n),ol(e,n,t)}function Pu(e){if(typeof window>"u")return;const t=Zi(window.location.pathname,e.basePath);if(!t)return;const s=new URL(window.location.href).searchParams.get("session")?.trim();s&&(e.sessionKey=s,je(e,{...e.settings,sessionKey:s,lastActiveSessionKey:s})),il(e,t)}function il(e,t){if(Jr.includes(t)){e.openSettings(t),e.connected&&rn({...e,tab:t});return}e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Ni(e):Fi(e),t==="debug"?Oi(e):Bi(e),e.connected&&rn(e)}function ol(e,t,n){if(typeof window>"u")return;const s=an(ls(t,e.basePath)),i=an(window.location.pathname),o=new URL(window.location.href);t==="chat"&&e.sessionKey?o.searchParams.set("session",e.sessionKey):o.searchParams.delete("session"),i!==s&&(o.pathname=s),n?window.history.replaceState({},"",o.toString()):window.history.pushState({},"",o.toString())}function Du(e,t,n){if(typeof window>"u")return;const s=new URL(window.location.href);s.searchParams.set("session",t),window.history.replaceState({},"",s.toString())}async function al(e){await Promise.all([ye(e,!1),Yi(e),yt(e),un(e),Mt(e)])}async function Nu(e){await Promise.all([ye(e,!0),Hn(e),we(e)])}async function qn(e){await Promise.all([ye(e,!1),un(e),os(e)])}const ra=50,Fu=80,Ou=12e4;function Bu(e){if(!e||typeof e!="object")return null;const t=e;if(typeof t.text=="string")return t.text;const n=t.content;if(!Array.isArray(n))return null;const s=n.map(i=>{if(!i||typeof i!="object")return null;const o=i;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(i=>!!i);return s.length===0?null:s.join(`
`)}function la(e){if(e==null)return null;if(typeof e=="number"||typeof e=="boolean")return String(e);const t=Bu(e);let n;if(typeof e=="string")n=e;else if(t)n=t;else try{n=JSON.stringify(e,null,2)}catch{n=String(e)}const s=Mr(n,Ou);return s.truncated?`${s.text}

… truncated (${s.total} chars, showing first ${s.text.length}).`:s.text}function zu(e){const t=[];return t.push({type:"toolcall",name:e.name,arguments:e.args??{}}),e.output&&t.push({type:"toolresult",name:e.name,text:e.output}),{role:"assistant",toolCallId:e.toolCallId,runId:e.runId,content:t,timestamp:e.startedAt}}function Uu(e){if(e.toolStreamOrder.length<=ra)return;const t=e.toolStreamOrder.length-ra,n=e.toolStreamOrder.splice(0,t);for(const s of n)e.toolStreamById.delete(s)}function Hu(e){e.chatToolMessages=e.toolStreamOrder.map(t=>e.toolStreamById.get(t)?.message).filter(t=>!!t)}function ci(e){e.toolStreamSyncTimer!=null&&(clearTimeout(e.toolStreamSyncTimer),e.toolStreamSyncTimer=null),Hu(e)}function Ku(e,t=!1){if(t){ci(e);return}e.toolStreamSyncTimer==null&&(e.toolStreamSyncTimer=window.setTimeout(()=>ci(e),Fu))}function ds(e){e.toolStreamById.clear(),e.toolStreamOrder=[],e.chatToolMessages=[],ci(e)}const ju=5e3;function Wu(e,t){const n=t.data??{},s=typeof n.phase=="string"?n.phase:"";e.compactionClearTimer!=null&&(window.clearTimeout(e.compactionClearTimer),e.compactionClearTimer=null),s==="start"?e.compactionStatus={active:!0,startedAt:Date.now(),completedAt:null}:s==="end"&&(e.compactionStatus={active:!1,startedAt:e.compactionStatus?.startedAt??null,completedAt:Date.now()},e.compactionClearTimer=window.setTimeout(()=>{e.compactionStatus=null,e.compactionClearTimer=null},ju))}function Gu(e,t){if(!t)return;if(t.stream==="compaction"){Wu(e,t);return}if(t.stream!=="tool")return;const n=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(n&&n!==e.sessionKey||!n&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;const s=t.data??{},i=typeof s.toolCallId=="string"?s.toolCallId:"";if(!i)return;const o=typeof s.name=="string"?s.name:"tool",a=typeof s.phase=="string"?s.phase:"",l=a==="start"?s.args:void 0,c=a==="update"?la(s.partialResult):a==="result"?la(s.result):void 0,u=Date.now();let g=e.toolStreamById.get(i);g?(g.name=o,l!==void 0&&(g.args=l),c!==void 0&&(g.output=c||void 0),g.updatedAt=u):(g={toolCallId:i,runId:t.runId,sessionKey:n,name:o,args:l,output:c||void 0,startedAt:typeof t.ts=="number"?t.ts:u,updatedAt:u,message:{}},e.toolStreamById.set(i,g),e.toolStreamOrder.push(i)),g.message=zu(g),Uu(e),Ku(e,a==="result")}const qu=/^\[([^\]]+)\]\s*/,Vu=["WebChat","WhatsApp","Telegram","Signal","Slack","Discord","iMessage","Teams","Matrix","Zalo","Zalo Personal","BlueBubbles"],Rs=new WeakMap,Ps=new WeakMap;function Qu(e){return/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}Z\b/.test(e)||/\d{4}-\d{2}-\d{2} \d{2}:\d{2}\b/.test(e)?!0:Vu.some(t=>e.startsWith(`${t} `))}function Ds(e){const t=e.match(qu);if(!t)return e;const n=t[1]??"";return Qu(n)?e.slice(t[0].length):e}function di(e){const t=e,n=typeof t.role=="string"?t.role:"",s=t.content;if(typeof s=="string")return n==="assistant"?_s(s):Ds(s);if(Array.isArray(s)){const i=s.map(o=>{const a=o;return a.type==="text"&&typeof a.text=="string"?a.text:null}).filter(o=>typeof o=="string");if(i.length>0){const o=i.join(`
`);return n==="assistant"?_s(o):Ds(o)}}return typeof t.text=="string"?n==="assistant"?_s(t.text):Ds(t.text):null}function rl(e){if(!e||typeof e!="object")return di(e);const t=e;if(Rs.has(t))return Rs.get(t)??null;const n=di(e);return Rs.set(t,n),n}function ca(e){const n=e.content,s=[];if(Array.isArray(n))for(const l of n){const c=l;if(c.type==="thinking"&&typeof c.thinking=="string"){const u=c.thinking.trim();u&&s.push(u)}}if(s.length>0)return s.join(`
`);const i=Zu(e);if(!i)return null;const a=[...i.matchAll(/<\s*think(?:ing)?\s*>([\s\S]*?)<\s*\/\s*think(?:ing)?\s*>/gi)].map(l=>(l[1]??"").trim()).filter(Boolean);return a.length>0?a.join(`
`):null}function Yu(e){if(!e||typeof e!="object")return ca(e);const t=e;if(Ps.has(t))return Ps.get(t)??null;const n=ca(e);return Ps.set(t,n),n}function Zu(e){const t=e,n=t.content;if(typeof n=="string")return n;if(Array.isArray(n)){const s=n.map(i=>{const o=i;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(i=>typeof i=="string");if(s.length>0)return s.join(`
`)}return typeof t.text=="string"?t.text:null}function Ju(e){const t=e.trim();if(!t)return"";const n=t.split(/\r?\n/).map(s=>s.trim()).filter(Boolean).map(s=>`_${s}_`);return n.length?["_Reasoning:_",...n].join(`
`):""}let da=!1;function ua(e){e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t="";for(let n=0;n<e.length;n++)t+=e[n].toString(16).padStart(2,"0");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}function Xu(){const e=new Uint8Array(16),t=Date.now();for(let n=0;n<e.length;n++)e[n]=Math.floor(Math.random()*256);return e[0]^=t&255,e[1]^=t>>>8&255,e[2]^=t>>>16&255,e[3]^=t>>>24&255,e}function eg(){da||(da=!0,console.warn("[uuid] crypto API missing; falling back to weak randomness"))}function Xi(e=globalThis.crypto){if(e&&typeof e.randomUUID=="function")return e.randomUUID();if(e&&typeof e.getRandomValues=="function"){const t=new Uint8Array(16);return e.getRandomValues(t),ua(t)}return eg(),ua(Xu())}async function ln(e){if(!(!e.client||!e.connected)){e.chatLoading=!0,e.lastError=null;try{const t=await e.client.request("chat.history",{sessionKey:e.sessionKey,limit:200});e.chatMessages=Array.isArray(t.messages)?t.messages:[],e.chatThinkingLevel=t.thinkingLevel??null}catch(t){e.lastError=String(t)}finally{e.chatLoading=!1}}}function tg(e){const t=/^data:([^;]+);base64,(.+)$/.exec(e);return t?{mimeType:t[1],content:t[2]}:null}async function ng(e,t,n){if(!e.client||!e.connected)return null;const s=t.trim(),i=n&&n.length>0;if(!s&&!i)return null;const o=Date.now(),a=[];if(s&&a.push({type:"text",text:s}),i)for(const u of n)a.push({type:"image",source:{type:"base64",media_type:u.mimeType,data:u.dataUrl}});e.chatMessages=[...e.chatMessages,{role:"user",content:a,timestamp:o}],e.chatSending=!0,e.lastError=null;const l=Xi();e.chatRunId=l,e.chatStream="",e.chatStreamStartedAt=o;const c=i?n.map(u=>{const g=tg(u.dataUrl);return g?{type:"image",mimeType:g.mimeType,content:g.content}:null}).filter(u=>u!==null):void 0;try{return await e.client.request("chat.send",{sessionKey:e.sessionKey,message:s,deliver:!1,idempotencyKey:l,attachments:c}),l}catch(u){const g=String(u);return e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,e.lastError=g,e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:"Error: "+g}],timestamp:Date.now()}],null}finally{e.chatSending=!1}}async function sg(e){if(!e.client||!e.connected)return!1;const t=e.chatRunId;try{return await e.client.request("chat.abort",t?{sessionKey:e.sessionKey,runId:t}:{sessionKey:e.sessionKey}),!0}catch(n){return e.lastError=String(n),!1}}function ig(e,t){if(!t||t.sessionKey!==e.sessionKey)return null;if(t.runId&&e.chatRunId&&t.runId!==e.chatRunId)return t.state==="final"?"final":null;if(t.state==="delta"){const n=di(t.message);if(typeof n=="string"){const s=e.chatStream??"";(!s||n.length>=s.length)&&(e.chatStream=n)}}else t.state==="final"||t.state==="aborted"?(e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null):t.state==="error"&&(e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null,e.lastError=t.errorMessage??"chat error");return t.state}const ll=120;function cl(e){return e.chatSending||!!e.chatRunId}function og(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/stop"?!0:n==="stop"||n==="esc"||n==="abort"||n==="wait"||n==="exit"}function ag(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/new"||n==="/reset"?!0:n.startsWith("/new ")||n.startsWith("/reset ")}async function dl(e){e.connected&&(e.chatMessage="",await sg(e))}function rg(e,t,n,s){const i=t.trim(),o=!!(n&&n.length>0);!i&&!o||(e.chatQueue=[...e.chatQueue,{id:Xi(),text:i,createdAt:Date.now(),attachments:o?n?.map(a=>({...a})):void 0,refreshSessions:s}])}async function ul(e,t,n){ds(e);const s=await ng(e,t,n?.attachments),i=!!s;return!i&&n?.previousDraft!=null&&(e.chatMessage=n.previousDraft),!i&&n?.previousAttachments&&(e.chatAttachments=n.previousAttachments),i&&nl(e,e.sessionKey),i&&n?.restoreDraft&&n.previousDraft?.trim()&&(e.chatMessage=n.previousDraft),i&&n?.restoreAttachments&&n.previousAttachments?.length&&(e.chatAttachments=n.previousAttachments),dn(e),i&&!e.chatRunId&&gl(e),i&&n?.refreshSessions&&s&&e.refreshSessionsAfterChat.add(s),i}async function gl(e){if(!e.connected||cl(e))return;const[t,...n]=e.chatQueue;if(!t)return;e.chatQueue=n,await ul(e,t.text,{attachments:t.attachments,refreshSessions:t.refreshSessions})||(e.chatQueue=[t,...e.chatQueue])}function lg(e,t){e.chatQueue=e.chatQueue.filter(n=>n.id!==t)}async function cg(e,t,n){if(!e.connected)return;const s=e.chatMessage,i=(t??e.chatMessage).trim(),o=e.chatAttachments??[],a=t==null?o:[],l=a.length>0;if(!i&&!l)return;if(og(i)){await dl(e);return}const c=ag(i);if(t==null&&(e.chatMessage="",e.chatAttachments=[]),cl(e)){rg(e,i,a,c);return}await ul(e,i,{previousDraft:t==null?s:void 0,restoreDraft:!!(t&&n?.restoreDraft),attachments:l?a:void 0,previousAttachments:t==null?o:void 0,restoreAttachments:!!(t&&n?.restoreDraft),refreshSessions:c})}async function pl(e,t){await Promise.all([ln(e),yt(e,{activeMinutes:ll}),ui(e)]),t?.scheduleScroll!==!1&&dn(e)}const dg=gl;function ug(e){const t=_r(e.sessionKey);return t?.agentId?t.agentId:e.hello?.snapshot?.sessionDefaults?.defaultAgentId?.trim()||"main"}function gg(e,t){const n=pn(e),s=encodeURIComponent(t);return n?`${n}/avatar/${s}?meta=1`:`/avatar/${s}?meta=1`}async function ui(e){if(!e.connected){e.chatAvatarUrl=null;return}const t=ug(e);if(!t){e.chatAvatarUrl=null;return}e.chatAvatarUrl=null;const n=gg(e.basePath,t);try{const s=await fetch(n,{method:"GET"});if(!s.ok){e.chatAvatarUrl=null;return}const i=await s.json(),o=typeof i.avatarUrl=="string"?i.avatarUrl.trim():"";e.chatAvatarUrl=o||null}catch{e.chatAvatarUrl=null}}const pg={trace:!0,debug:!0,info:!0,warn:!0,error:!0,fatal:!0},hg={name:"",description:"",agentId:"",enabled:!0,scheduleKind:"every",scheduleAt:"",everyAmount:"30",everyUnit:"minutes",cronExpr:"0 7 * * *",cronTz:"",sessionTarget:"isolated",wakeMode:"now",payloadKind:"agentTurn",payloadText:"",deliveryMode:"announce",deliveryChannel:"last",deliveryTo:"",timeoutSeconds:""},fg=50,vg=200,mg="Assistant";function ga(e,t){if(typeof e!="string")return;const n=e.trim();if(n)return n.length<=t?n:n.slice(0,t)}function gi(e){const t=ga(e?.name,fg)??mg,n=ga(e?.avatar??void 0,vg)??null;return{agentId:typeof e?.agentId=="string"&&e.agentId.trim()?e.agentId.trim():null,name:t,avatar:n}}function bg(){return gi(typeof window>"u"?{}:{name:window.__OPENSOUL_ASSISTANT_NAME__,avatar:window.__OPENSOUL_ASSISTANT_AVATAR__})}async function hl(e,t){if(!e.client||!e.connected)return;const n=e.sessionKey.trim(),s=n?{sessionKey:n}:{};try{const i=await e.client.request("agent.identity.get",s);if(!i)return;const o=gi(i);e.assistantName=o.name,e.assistantAvatar=o.avatar,e.assistantAgentId=o.agentId??null}catch{}}function pi(e){return typeof e=="object"&&e!==null}function yg(e){if(!pi(e))return null;const t=typeof e.id=="string"?e.id.trim():"",n=e.request;if(!t||!pi(n))return null;const s=typeof n.command=="string"?n.command.trim():"";if(!s)return null;const i=typeof e.createdAtMs=="number"?e.createdAtMs:0,o=typeof e.expiresAtMs=="number"?e.expiresAtMs:0;return!i||!o?null:{id:t,request:{command:s,cwd:typeof n.cwd=="string"?n.cwd:null,host:typeof n.host=="string"?n.host:null,security:typeof n.security=="string"?n.security:null,ask:typeof n.ask=="string"?n.ask:null,agentId:typeof n.agentId=="string"?n.agentId:null,resolvedPath:typeof n.resolvedPath=="string"?n.resolvedPath:null,sessionKey:typeof n.sessionKey=="string"?n.sessionKey:null},createdAtMs:i,expiresAtMs:o}}function xg(e){if(!pi(e))return null;const t=typeof e.id=="string"?e.id.trim():"";return t?{id:t,decision:typeof e.decision=="string"?e.decision:null,resolvedBy:typeof e.resolvedBy=="string"?e.resolvedBy:null,ts:typeof e.ts=="number"?e.ts:null}:null}function fl(e){const t=Date.now();return e.filter(n=>n.expiresAtMs>t)}function $g(e,t){const n=fl(e).filter(s=>s.id!==t.id);return n.push(t),n}function pa(e,t){return fl(e).filter(n=>n.id!==t)}function wg(e){const t=e.version??(e.nonce?"v2":"v1"),n=e.scopes.join(","),s=e.token??"",i=[t,e.deviceId,e.clientId,e.clientMode,e.role,n,String(e.signedAtMs),s];return t==="v2"&&i.push(e.nonce??""),i.join("|")}const vl={WEBCHAT_UI:"webchat-ui",CONTROL_UI:"opensoul-control-ui",WEBCHAT:"webchat",CLI:"cli",GATEWAY_CLIENT:"gateway-client",MACOS_APP:"opensoul-macos",IOS_APP:"opensoul-ios",ANDROID_APP:"opensoul-android",NODE_HOST:"node-host",TEST:"test",FINGERPRINT:"fingerprint",PROBE:"opensoul-probe"},ha=vl,hi={WEBCHAT:"webchat",CLI:"cli",UI:"ui",BACKEND:"backend",NODE:"node",PROBE:"probe",TEST:"test"};new Set(Object.values(vl));new Set(Object.values(hi));const kg=4008;class Sg{constructor(t){this.opts=t,this.ws=null,this.pending=new Map,this.closed=!1,this.lastSeq=null,this.connectNonce=null,this.connectSent=!1,this.connectTimer=null,this.backoffMs=200}start(){this.closed=!1,this.connect()}stop(){this.closed=!0,this.ws?.close(),this.ws=null,this.flushPending(new Error("gateway client stopped"))}get connected(){return this.ws?.readyState===WebSocket.OPEN}connect(){this.closed||(this.ws=new WebSocket(this.opts.url),this.ws.addEventListener("open",()=>this.queueConnect()),this.ws.addEventListener("message",t=>this.handleMessage(String(t.data??""))),this.ws.addEventListener("close",t=>{const n=String(t.reason??"");this.ws=null,this.flushPending(new Error(`gateway closed (${t.code}): ${n}`)),this.opts.onClose?.({code:t.code,reason:n}),this.scheduleReconnect()}),this.ws.addEventListener("error",()=>{}))}scheduleReconnect(){if(this.closed)return;const t=this.backoffMs;this.backoffMs=Math.min(this.backoffMs*1.5,1e4),window.setTimeout(()=>this.connect(),t)}flushPending(t){for(const[,n]of this.pending)n.reject(t);this.pending.clear()}async sendConnect(){if(this.connectSent)return;this.connectSent=!0,this.connectTimer!==null&&(window.clearTimeout(this.connectTimer),this.connectTimer=null);const t=typeof crypto<"u"&&!!crypto.subtle,n=["operator.admin","operator.approvals","operator.pairing"],s="operator";let i=null,o=!1,a=this.opts.token;if(t){i=await Vi();const g=Ad({deviceId:i.deviceId,role:s})?.token;a=g??this.opts.token,o=!!(g&&this.opts.token)}const l=a||this.opts.password?{token:a,password:this.opts.password}:void 0;let c;if(t&&i){const g=Date.now(),h=this.connectNonce??void 0,f=wg({deviceId:i.deviceId,clientId:this.opts.clientName??ha.CONTROL_UI,clientMode:this.opts.mode??hi.WEBCHAT,role:s,scopes:n,signedAtMs:g,token:a??null,nonce:h}),d=await Yd(i.privateKey,f);c={id:i.deviceId,publicKey:i.publicKey,signature:d,signedAt:g,nonce:h}}const u={minProtocol:3,maxProtocol:3,client:{id:this.opts.clientName??ha.CONTROL_UI,version:this.opts.clientVersion??"dev",platform:this.opts.platform??navigator.platform??"web",mode:this.opts.mode??hi.WEBCHAT,instanceId:this.opts.instanceId},role:s,scopes:n,device:c,caps:[],auth:l,userAgent:navigator.userAgent,locale:navigator.language};this.request("connect",u).then(g=>{g?.auth?.deviceToken&&i&&Nr({deviceId:i.deviceId,role:g.auth.role??s,token:g.auth.deviceToken,scopes:g.auth.scopes??[]}),this.backoffMs=200,this.opts.onHello?.(g)}).catch(()=>{o&&i&&Fr({deviceId:i.deviceId,role:s}),this.ws?.close(kg,"connect failed")})}handleMessage(t){let n;try{n=JSON.parse(t)}catch{return}const s=n;if(s.type==="event"){const i=n;if(i.event==="connect.challenge"){const a=i.payload,l=a&&typeof a.nonce=="string"?a.nonce:null;l&&(this.connectNonce=l,this.sendConnect());return}const o=typeof i.seq=="number"?i.seq:null;o!==null&&(this.lastSeq!==null&&o>this.lastSeq+1&&this.opts.onGap?.({expected:this.lastSeq+1,received:o}),this.lastSeq=o);try{this.opts.onEvent?.(i)}catch(a){console.error("[gateway] event handler error:",a)}return}if(s.type==="res"){const i=n,o=this.pending.get(i.id);if(!o)return;this.pending.delete(i.id),i.ok?o.resolve(i.payload):o.reject(new Error(i.error?.message??"request failed"));return}}request(t,n){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)return Promise.reject(new Error("gateway not connected"));const s=Xi(),i={type:"req",id:s,method:t,params:n},o=new Promise((a,l)=>{this.pending.set(s,{resolve:c=>a(c),reject:l})});return this.ws.send(JSON.stringify(i)),o}queueConnect(){this.connectNonce=null,this.connectSent=!1,this.connectTimer!==null&&window.clearTimeout(this.connectTimer),this.connectTimer=window.setTimeout(()=>{this.sendConnect()},50)}}function Ns(e,t){const n=(e??"").trim(),s=t.mainSessionKey?.trim();if(!s)return n;if(!n)return s;const i=t.mainKey?.trim()||"main",o=t.defaultAgentId?.trim();return n==="main"||n===i||o&&(n===`agent:${o}:main`||n===`agent:${o}:${i}`)?s:n}function Ag(e,t){if(!t?.mainSessionKey)return;const n=Ns(e.sessionKey,t),s=Ns(e.settings.sessionKey,t),i=Ns(e.settings.lastActiveSessionKey,t),o=n||s||e.sessionKey,a={...e.settings,sessionKey:s||o,lastActiveSessionKey:i||o},l=a.sessionKey!==e.settings.sessionKey||a.lastActiveSessionKey!==e.settings.lastActiveSessionKey;o!==e.sessionKey&&(e.sessionKey=o),l&&je(e,a)}function eo(e){e.lastError=null,e.hello=null,e.connected=!1,e.execApprovalQueue=[],e.execApprovalError=null,e.client?.stop(),e.client=new Sg({url:e.settings.gatewayUrl,token:e.settings.token.trim()?e.settings.token:void 0,password:e.password.trim()?e.password:void 0,clientName:"opensoul-control-ui",mode:"webchat",onHello:t=>{e.connected=!0,e.lastError=null,e.hello=t,aa("connected"),_g(e,t),e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,ds(e),hl(e),zi(e),is(e,{quiet:!0}),Je(e,{quiet:!0}),rn(e)},onClose:({code:t,reason:n})=>{e.connected=!1,aa("disconnected"),t!==1012&&(e.lastError=`disconnected (${t}): ${n||"no reason"}`)},onEvent:t=>Cg(e,t),onGap:({expected:t,received:n})=>{e.lastError=`event gap detected (expected seq ${t}, got ${n}); refresh recommended`}}),e.client.start()}function Cg(e,t){try{Tg(e,t)}catch(n){console.error("[gateway] handleGatewayEvent error:",t.event,n)}}function Tg(e,t){if(e.eventLogBuffer=[{ts:Date.now(),event:t.event,payload:t.payload},...e.eventLogBuffer].slice(0,250),e.tab==="debug"&&(e.eventLog=e.eventLogBuffer),t.event==="agent"){if(e.onboarding)return;Gu(e,t.payload);return}if(t.event==="chat"){const n=t.payload;n?.sessionKey&&nl(e,n.sessionKey);const s=ig(e,n);if(s==="final"||s==="error"||s==="aborted"){ds(e),dg(e);const i=n?.runId;i&&e.refreshSessionsAfterChat.has(i)&&(e.refreshSessionsAfterChat.delete(i),s==="final"&&yt(e,{activeMinutes:ll}))}s==="final"&&ln(e);return}if(t.event==="presence"){const n=t.payload;n?.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence,e.presenceError=null,e.presenceStatus=null);return}if(t.event==="cron"&&e.tab==="cron"&&qn(e),(t.event==="device.pair.requested"||t.event==="device.pair.resolved")&&Je(e,{quiet:!0}),t.event==="exec.approval.requested"){const n=yg(t.payload);if(n){e.execApprovalQueue=$g(e.execApprovalQueue,n),e.execApprovalError=null;const s=Math.max(0,n.expiresAtMs-Date.now()+500);window.setTimeout(()=>{e.execApprovalQueue=pa(e.execApprovalQueue,n.id)},s)}return}if(t.event==="exec.approval.resolved"){const n=xg(t.payload);n&&(e.execApprovalQueue=pa(e.execApprovalQueue,n.id))}}function _g(e,t){const n=t.snapshot;n?.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence),n?.health&&(e.debugHealth=n.health),n?.sessionDefaults&&Ag(e,n.sessionDefaults)}function Lg(e){e.basePath=Lu(),_u(e),Ru(e,!0),Eu(e),Iu(e),window.addEventListener("popstate",e.popStateHandler),pu()&&Mg(e),eo(e),pd(e),e.tab==="logs"&&Ni(e),e.tab==="debug"&&Oi(e)}function Eg(e){ad(e)}function Ig(e){window.removeEventListener("popstate",e.popStateHandler),hd(e),Fi(e),Bi(e),Mu(e),bu(),e.topbarObserver?.disconnect(),e.topbarObserver=null}function Mg(e){mu({onInit:t=>{const n=e;if(t.gatewayUrl||t.token){const s={...n.settings};t.gatewayUrl&&(s.gatewayUrl=t.gatewayUrl),t.token&&(s.token=t.token),t.settings?.sessionKey&&(s.sessionKey=t.settings.sessionKey,s.lastActiveSessionKey=t.settings.sessionKey),je(n,s),eo(e)}if(t.theme){const s=t.theme;li(n,s)}},onThemeChanged:t=>{li(e,t)},onNavigate:t=>{const n=Zi(`/${t}`);n&&sl(e,n)},onFocus:t=>{t==="chat-input"?document.querySelector(".chat-compose textarea")?.focus():t==="search"&&document.querySelector(".search-input, .command-input")?.focus()},onFileDrop:t=>{console.log("[desktop-bridge] File drop received:",t.length,"files")},onWindowState:t=>{e._windowFocused=t==="focused"},onCommandPalette:()=>{const t=document.querySelector(".command-palette");if(t){t.remove();return}window.dispatchEvent(new CustomEvent("opensoul:command-palette"))}}),hu()}function Rg(e,t){if(!(e.tab==="chat"&&e.chatManualRefreshInFlight)){if(e.tab==="chat"&&(t.has("chatMessages")||t.has("chatToolMessages")||t.has("chatStream")||t.has("chatLoading")||t.has("tab"))){const n=t.has("tab"),s=t.has("chatLoading")&&t.get("chatLoading")===!0&&!e.chatLoading;dn(e,n||s||!e.chatHasAutoScrolled)}e.tab==="logs"&&(t.has("logsEntries")||t.has("logsAutoFollow")||t.has("tab"))&&e.logsAutoFollow&&e.logsAtBottom&&Lr(e,t.has("tab")||t.has("logsAutoFollow"))}}const to={CHILD:2},no=e=>(...t)=>({_$litDirective$:e,values:t});let so=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,s){this._$Ct=t,this._$AM=n,this._$Ci=s}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};const{I:Pg}=Lc,fa=e=>e,Dg=e=>e.strings===void 0,va=()=>document.createComment(""),Bt=(e,t,n)=>{const s=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(n===void 0){const o=s.insertBefore(va(),i),a=s.insertBefore(va(),i);n=new Pg(o,a,e,e.options)}else{const o=n._$AB.nextSibling,a=n._$AM,l=a!==e;if(l){let c;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(c=e._$AU)!==a._$AU&&n._$AP(c)}if(o!==i||l){let c=n._$AA;for(;c!==o;){const u=fa(c).nextSibling;fa(s).insertBefore(c,i),c=u}}}return n},it=(e,t,n=e)=>(e._$AI(t,n),e),Ng={},Fg=(e,t=Ng)=>e._$AH=t,Og=e=>e._$AH,Fs=e=>{e._$AR(),e._$AA.remove()};const ma=(e,t,n)=>{const s=new Map;for(let i=t;i<=n;i++)s.set(e[i],i);return s},ml=no(class extends so{constructor(e){if(super(e),e.type!==to.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,n){let s;n===void 0?n=t:t!==void 0&&(s=t);const i=[],o=[];let a=0;for(const l of e)i[a]=s?s(l,a):a,o[a]=n(l,a),a++;return{values:o,keys:i}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,s]){const i=Og(e),{values:o,keys:a}=this.dt(t,n,s);if(!Array.isArray(i))return this.ut=a,o;const l=this.ut??=[],c=[];let u,g,h=0,f=i.length-1,d=0,p=o.length-1;for(;h<=f&&d<=p;)if(i[h]===null)h++;else if(i[f]===null)f--;else if(l[h]===a[d])c[d]=it(i[h],o[d]),h++,d++;else if(l[f]===a[p])c[p]=it(i[f],o[p]),f--,p--;else if(l[h]===a[p])c[p]=it(i[h],o[p]),Bt(e,c[p+1],i[h]),h++,p--;else if(l[f]===a[d])c[d]=it(i[f],o[d]),Bt(e,i[h],i[f]),f--,d++;else if(u===void 0&&(u=ma(a,d,p),g=ma(l,h,f)),u.has(l[h]))if(u.has(l[f])){const m=g.get(a[d]),S=m!==void 0?i[m]:null;if(S===null){const k=Bt(e,i[h]);it(k,o[d]),c[d]=k}else c[d]=it(S,o[d]),Bt(e,i[h],S),i[m]=null;d++}else Fs(i[f]),f--;else Fs(i[h]),h++;for(;d<=p;){const m=Bt(e,c[p+1]);it(m,o[d]),c[d++]=m}for(;h<=f;){const m=i[h++];m!==null&&Fs(m)}return this.ut=a,Fg(e,c),Ye}}),Y={messageSquare:r`
    <svg viewBox="0 0 24 24">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  `,barChart:r`
    <svg viewBox="0 0 24 24">
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  `,link:r`
    <svg viewBox="0 0 24 24">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  `,radio:r`
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="2" />
      <path
        d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"
      />
    </svg>
  `,fileText:r`
    <svg viewBox="0 0 24 24">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  `,zap:r`
    <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
  `,monitor:r`
    <svg viewBox="0 0 24 24">
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  `,settings:r`
    <svg viewBox="0 0 24 24">
      <path
        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  `,bug:r`
    <svg viewBox="0 0 24 24">
      <path d="m8 2 1.88 1.88" />
      <path d="M14.12 3.88 16 2" />
      <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
      <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
      <path d="M12 20v-9" />
      <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
      <path d="M6 13H2" />
      <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
      <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
      <path d="M22 13h-4" />
      <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
    </svg>
  `,scrollText:r`
    <svg viewBox="0 0 24 24">
      <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
      <path d="M19 17V5a2 2 0 0 0-2-2H4" />
      <path d="M15 8h-5" />
      <path d="M15 12h-5" />
    </svg>
  `,folder:r`
    <svg viewBox="0 0 24 24">
      <path
        d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
      />
    </svg>
  `,menu:r`
    <svg viewBox="0 0 24 24">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  `,x:r`
    <svg viewBox="0 0 24 24">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  `,check:r`
    <svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg>
  `,arrowDown:r`
    <svg viewBox="0 0 24 24">
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  `,copy:r`
    <svg viewBox="0 0 24 24">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  `,search:r`
    <svg viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  `,brain:r`
    <svg viewBox="0 0 24 24">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  `,book:r`
    <svg viewBox="0 0 24 24">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  `,loader:r`
    <svg viewBox="0 0 24 24">
      <path d="M12 2v4" />
      <path d="m16.2 7.8 2.9-2.9" />
      <path d="M18 12h4" />
      <path d="m16.2 16.2 2.9 2.9" />
      <path d="M12 18v4" />
      <path d="m4.9 19.1 2.9-2.9" />
      <path d="M2 12h4" />
      <path d="m4.9 4.9 2.9 2.9" />
    </svg>
  `,wrench:r`
    <svg viewBox="0 0 24 24">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      />
    </svg>
  `,fileCode:r`
    <svg viewBox="0 0 24 24">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="m10 13-2 2 2 2" />
      <path d="m14 17 2-2-2-2" />
    </svg>
  `,edit:r`
    <svg viewBox="0 0 24 24">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  `,penLine:r`
    <svg viewBox="0 0 24 24">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  `,paperclip:r`
    <svg viewBox="0 0 24 24">
      <path
        d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"
      />
    </svg>
  `,globe:r`
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  `,image:r`
    <svg viewBox="0 0 24 24">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  `,smartphone:r`
    <svg viewBox="0 0 24 24">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  `,plug:r`
    <svg viewBox="0 0 24 24">
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
    </svg>
  `,circle:r`
    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
  `,puzzle:r`
    <svg viewBox="0 0 24 24">
      <path
        d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.076.874.54 1.02 1.02a2.5 2.5 0 1 0 3.237-3.237c-.48-.146-.944-.505-1.02-1.02a.98.98 0 0 1 .303-.917l1.526-1.526A2.402 2.402 0 0 1 11.998 2c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.236 3.236c-.464.18-.894.527-.967 1.02Z"
      />
    </svg>
  `};function Bg(e,t){const n=ls(t,e.basePath);return r`
    <a
      href=${n}
      class="nav-item ${e.tab===t?"active":""}"
      @click=${s=>{s.defaultPrevented||s.button!==0||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey||(s.preventDefault(),e.setTab(t))}}
      title=${Gn(t)}
    >
      <span class="nav-item__icon" aria-hidden="true">${Y[$u(t)]}</span>
      <span class="nav-item__text">${Gn(t)}</span>
    </a>
  `}function zg(e){const t=Ug(e.hello,e.sessionsResult),n=Hg(e.sessionKey,e.sessionsResult,t),s=e.onboarding,i=e.onboarding,o=e.onboarding?!1:e.settings.chatShowThinking,a=e.onboarding?!0:e.settings.chatFocusMode,l=r`
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
      <path d="M21 3v5h-5"></path>
    </svg>
  `,c=r`
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M4 7V4h3"></path>
      <path d="M20 7V4h-3"></path>
      <path d="M4 17v3h3"></path>
      <path d="M20 17v3h-3"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  `;return r`
    <div class="chat-controls">
      <label class="field chat-controls__session">
        <select
          .value=${e.sessionKey}
          ?disabled=${!e.connected}
          @change=${u=>{const g=u.target.value;e.sessionKey=g,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:g,lastActiveSessionKey:g}),e.loadAssistantIdentity(),Du(e,g),ln(e)}}
        >
          ${ml(n,u=>u.key,u=>r`<option value=${u.key}>
                ${u.displayName??u.key}
              </option>`)}
        </select>
      </label>
      <button
        class="btn btn--sm btn--icon"
        ?disabled=${e.chatLoading||!e.connected}
        @click=${async()=>{const u=e;u.chatManualRefreshInFlight=!0,u.chatNewMessagesBelow=!1,await u.updateComplete,u.resetToolStream();try{await pl(e,{scheduleScroll:!1}),u.scrollToBottom({smooth:!0})}finally{requestAnimationFrame(()=>{u.chatManualRefreshInFlight=!1,u.chatNewMessagesBelow=!1})}}}
        title="Refresh chat data"
      >
        ${l}
      </button>
      <span class="chat-controls__separator">|</span>
      <button
        class="btn btn--sm btn--icon ${o?"active":""}"
        ?disabled=${s}
        @click=${()=>{s||e.applySettings({...e.settings,chatShowThinking:!e.settings.chatShowThinking})}}
        aria-pressed=${o}
        title=${s?"Disabled during onboarding":"Toggle assistant thinking/working output"}
      >
        ${Y.brain}
      </button>
      <button
        class="btn btn--sm btn--icon ${a?"active":""}"
        ?disabled=${i}
        @click=${()=>{i||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})}}
        aria-pressed=${a}
        title=${i?"Disabled during onboarding":"Toggle focus mode (hide sidebar + page header)"}
      >
        ${c}
      </button>
    </div>
  `}function Ug(e,t){const n=e?.snapshot,s=n?.sessionDefaults?.mainSessionKey?.trim();if(s)return s;const i=n?.sessionDefaults?.mainKey?.trim();return i||(t?.sessions?.some(o=>o.key==="main")?"main":null)}function Os(e,t){const n=t?.label?.trim()||"",s=t?.displayName?.trim()||"";return n&&n!==e?`${n} (${e})`:s&&s!==e?`${e} (${s})`:e}function Hg(e,t,n){const s=new Set,i=[],o=n&&t?.sessions?.find(l=>l.key===n),a=t?.sessions?.find(l=>l.key===e);if(n&&(s.add(n),i.push({key:n,displayName:Os(n,o||void 0)})),s.has(e)||(s.add(e),i.push({key:e,displayName:Os(e,a)})),t?.sessions)for(const l of t.sessions)s.has(l.key)||(s.add(l.key),i.push({key:l.key,displayName:Os(l.key,l)}));return i}const Kg=["system","light","dark"];function jg(e){const t=Math.max(0,Kg.indexOf(e.theme)),n=s=>i=>{const a={element:i.currentTarget};(i.clientX||i.clientY)&&(a.pointerClientX=i.clientX,a.pointerClientY=i.clientY),e.setTheme(s,a)};return r`
    <div class="theme-toggle" style="--theme-index: ${t};">
      <div class="theme-toggle__track" role="group" aria-label="Theme">
        <span class="theme-toggle__indicator"></span>
        <button
          class="theme-toggle__button ${e.theme==="system"?"active":""}"
          @click=${n("system")}
          aria-pressed=${e.theme==="system"}
          aria-label="System theme"
          title="System"
        >
          ${qg()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="light"?"active":""}"
          @click=${n("light")}
          aria-pressed=${e.theme==="light"}
          aria-label="Light theme"
          title="Light"
        >
          ${Wg()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="dark"?"active":""}"
          @click=${n("dark")}
          aria-pressed=${e.theme==="dark"}
          aria-label="Dark theme"
          title="Dark"
        >
          ${Gg()}
        </button>
      </div>
    </div>
  `}function Wg(){return r`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="m4.93 4.93 1.41 1.41"></path>
      <path d="m17.66 17.66 1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="m6.34 17.66-1.41 1.41"></path>
      <path d="m19.07 4.93-1.41 1.41"></path>
    </svg>
  `}function Gg(){return r`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
      ></path>
    </svg>
  `}function qg(){return r`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="14" x="2" y="3" rx="2"></rect>
      <line x1="8" x2="16" y1="21" y2="21"></line>
      <line x1="12" x2="12" y1="17" y2="21"></line>
    </svg>
  `}function bl(e,t){if(!e)return e;const s=e.files.some(i=>i.name===t.name)?e.files.map(i=>i.name===t.name?t:i):[...e.files,t];return{...e,files:s}}async function Bs(e,t){if(!(!e.client||!e.connected||e.agentFilesLoading)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const n=await e.client.request("agents.files.list",{agentId:t});n&&(e.agentFilesList=n,e.agentFileActive&&!n.files.some(s=>s.name===e.agentFileActive)&&(e.agentFileActive=null))}catch(n){e.agentFilesError=String(n)}finally{e.agentFilesLoading=!1}}}async function Vg(e,t,n,s){if(!(!e.client||!e.connected||e.agentFilesLoading)&&!Object.hasOwn(e.agentFileContents,n)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const i=await e.client.request("agents.files.get",{agentId:t,name:n});if(i?.file){const o=i.file.content??"",a=e.agentFileContents[n]??"",l=e.agentFileDrafts[n],c=s?.preserveDraft??!0;e.agentFilesList=bl(e.agentFilesList,i.file),e.agentFileContents={...e.agentFileContents,[n]:o},(!c||!Object.hasOwn(e.agentFileDrafts,n)||l===a)&&(e.agentFileDrafts={...e.agentFileDrafts,[n]:o})}}catch(i){e.agentFilesError=String(i)}finally{e.agentFilesLoading=!1}}}async function Qg(e,t,n,s){if(!(!e.client||!e.connected||e.agentFileSaving)){e.agentFileSaving=!0,e.agentFilesError=null;try{const i=await e.client.request("agents.files.set",{agentId:t,name:n,content:s});i?.file&&(e.agentFilesList=bl(e.agentFilesList,i.file),e.agentFileContents={...e.agentFileContents,[n]:s},e.agentFileDrafts={...e.agentFileDrafts,[n]:s})}catch(i){e.agentFilesError=String(i)}finally{e.agentFileSaving=!1}}}async function yl(e,t){if(!(!e.client||!e.connected)&&!e.usageLoading){e.usageLoading=!0,e.usageError=null;try{const n=t?.startDate??e.usageStartDate,s=t?.endDate??e.usageEndDate,[i,o]=await Promise.all([e.client.request("sessions.usage",{startDate:n,endDate:s,limit:1e3,includeContextWeight:!0}),e.client.request("usage.cost",{startDate:n,endDate:s})]);i&&(e.usageResult=i),o&&(e.usageCostSummary=o)}catch(n){e.usageError=String(n)}finally{e.usageLoading=!1}}}async function Yg(e,t){if(!(!e.client||!e.connected)&&!e.usageTimeSeriesLoading){e.usageTimeSeriesLoading=!0,e.usageTimeSeries=null;try{const n=await e.client.request("sessions.usage.timeseries",{key:t});n&&(e.usageTimeSeries=n)}catch{e.usageTimeSeries=null}finally{e.usageTimeSeriesLoading=!1}}}async function Zg(e,t){if(!(!e.client||!e.connected)&&!e.usageSessionLogsLoading){e.usageSessionLogsLoading=!0,e.usageSessionLogs=null;try{const n=await e.client.request("sessions.usage.logs",{key:t,limit:500});n&&Array.isArray(n.logs)&&(e.usageSessionLogs=n.logs)}catch{e.usageSessionLogs=null}finally{e.usageSessionLogsLoading=!1}}}const Jg={bash:"exec","apply-patch":"apply_patch"},Xg={"group:memory":["memory_search","memory_get"],"group:web":["web_search","web_fetch"],"group:fs":["read","write","edit","apply_patch"],"group:runtime":["exec","process"],"group:sessions":["sessions_list","sessions_history","sessions_send","sessions_spawn","session_status"],"group:ui":["browser","canvas"],"group:automation":["cron","gateway"],"group:messaging":["message"],"group:nodes":["nodes"],"group:opensoul":["browser","canvas","nodes","cron","message","gateway","agents_list","sessions_list","sessions_history","sessions_send","sessions_spawn","session_status","memory_search","memory_get","web_search","web_fetch","image"]},ep={minimal:{allow:["session_status"]},coding:{allow:["group:fs","group:runtime","group:sessions","group:memory","image"]},messaging:{allow:["group:messaging","sessions_list","sessions_history","sessions_send","session_status"]},full:{}};function Pe(e){const t=e.trim().toLowerCase();return Jg[t]??t}function tp(e){return e?e.map(Pe).filter(Boolean):[]}function np(e){const t=tp(e),n=[];for(const s of t){const i=Xg[s];if(i){n.push(...i);continue}n.push(s)}return Array.from(new Set(n))}function sp(e){if(!e)return;const t=ep[e];if(t&&!(!t.allow&&!t.deny))return{allow:t.allow?[...t.allow]:void 0,deny:t.deny?[...t.deny]:void 0}}function ip(e){const t=e.host??"unknown",n=e.ip?`(${e.ip})`:"",s=e.mode??"",i=e.version??"";return`${t} ${n} ${s} ${i}`.trim()}function op(e){const t=e.ts??null;return t?V(t):"n/a"}function io(e){return e?`${ft(e)} (${V(e)})`:"n/a"}function ap(e){if(e.totalTokens==null)return"n/a";const t=e.totalTokens??0,n=e.contextTokens??0;return n?`${t} / ${n}`:String(t)}function rp(e){if(e==null)return"";try{return JSON.stringify(e,null,2)}catch{return String(e)}}function lp(e){const t=e.state??{},n=t.nextRunAtMs?ft(t.nextRunAtMs):"n/a",s=t.lastRunAtMs?ft(t.lastRunAtMs):"n/a";return`${t.lastStatus??"n/a"} · next ${n} · last ${s}`}function xl(e){const t=e.schedule;if(t.kind==="at"){const n=Date.parse(t.at);return Number.isFinite(n)?`At ${ft(n)}`:`At ${t.at}`}return t.kind==="every"?`Every ${Hi(t.everyMs)}`:`Cron ${t.expr}${t.tz?` (${t.tz})`:""}`}function cp(e){const t=e.payload;if(t.kind==="systemEvent")return`System: ${t.text}`;const n=`Agent: ${t.message}`,s=e.delivery;if(s&&s.mode!=="none"){const i=s.channel||s.to?` (${s.channel??"last"}${s.to?` -> ${s.to}`:""})`:"";return`${n} · ${s.mode}${i}`}return n}const ba=[{id:"fs",label:"Files",tools:[{id:"read",label:"read",description:"Read file contents"},{id:"write",label:"write",description:"Create or overwrite files"},{id:"edit",label:"edit",description:"Make precise edits"},{id:"apply_patch",label:"apply_patch",description:"Patch files (OpenAI)"}]},{id:"runtime",label:"Runtime",tools:[{id:"exec",label:"exec",description:"Run shell commands"},{id:"process",label:"process",description:"Manage background processes"}]},{id:"web",label:"Web",tools:[{id:"web_search",label:"web_search",description:"Search the web"},{id:"web_fetch",label:"web_fetch",description:"Fetch web content"}]},{id:"memory",label:"Memory",tools:[{id:"memory_search",label:"memory_search",description:"Semantic search"},{id:"memory_get",label:"memory_get",description:"Read memory files"}]},{id:"sessions",label:"Sessions",tools:[{id:"sessions_list",label:"sessions_list",description:"List sessions"},{id:"sessions_history",label:"sessions_history",description:"Session history"},{id:"sessions_send",label:"sessions_send",description:"Send to session"},{id:"sessions_spawn",label:"sessions_spawn",description:"Spawn sub-agent"},{id:"session_status",label:"session_status",description:"Session status"}]},{id:"ui",label:"UI",tools:[{id:"browser",label:"browser",description:"Control web browser"},{id:"canvas",label:"canvas",description:"Control canvases"}]},{id:"messaging",label:"Messaging",tools:[{id:"message",label:"message",description:"Send messages"}]},{id:"automation",label:"Automation",tools:[{id:"cron",label:"cron",description:"Schedule tasks"},{id:"gateway",label:"gateway",description:"Gateway control"}]},{id:"nodes",label:"Nodes",tools:[{id:"nodes",label:"nodes",description:"Nodes + devices"}]},{id:"agents",label:"Agents",tools:[{id:"agents_list",label:"agents_list",description:"List agents"}]},{id:"media",label:"Media",tools:[{id:"image",label:"image",description:"Image understanding"}]}],dp=[{id:"minimal",label:"Minimal"},{id:"coding",label:"Coding"},{id:"messaging",label:"Messaging"},{id:"full",label:"Full"}];function fi(e){return e.name?.trim()||e.identity?.name?.trim()||e.id}function Cn(e){const t=e.trim();if(!t||t.length>16)return!1;let n=!1;for(let s=0;s<t.length;s+=1)if(t.charCodeAt(s)>127){n=!0;break}return!(!n||t.includes("://")||t.includes("/")||t.includes("."))}function us(e,t){const n=t?.emoji?.trim();if(n&&Cn(n))return n;const s=e.identity?.emoji?.trim();if(s&&Cn(s))return s;const i=t?.avatar?.trim();if(i&&Cn(i))return i;const o=e.identity?.avatar?.trim();return o&&Cn(o)?o:""}function $l(e,t){return t&&e===t?"default":null}function up(e){if(e==null||!Number.isFinite(e))return"-";if(e<1024)return`${e} B`;const t=["KB","MB","GB","TB"];let n=e/1024,s=0;for(;n>=1024&&s<t.length-1;)n/=1024,s+=1;return`${n.toFixed(n<10?1:0)} ${t[s]}`}function gs(e,t){const n=e;return{entry:(n?.agents?.list??[]).find(o=>o?.id===t),defaults:n?.agents?.defaults,globalTools:n?.tools}}function wl(e,t,n,s,i){const o=gs(t,e.id),l=(n&&n.agentId===e.id?n.workspace:null)||o.entry?.workspace||o.defaults?.workspace||"default",c=o.entry?.model?Yt(o.entry?.model):Yt(o.defaults?.model),u=i?.name?.trim()||e.identity?.name?.trim()||e.name?.trim()||o.entry?.name||e.id,g=us(e,i)||"-",h=Array.isArray(o.entry?.skills)?o.entry?.skills:null,f=h?.length??null;return{workspace:l,model:c,identityName:u,identityEmoji:g,skillsLabel:h?`${f} selected`:"all skills",isDefault:!!(s&&e.id===s)}}function Yt(e){if(!e)return"-";if(typeof e=="string")return e.trim()||"-";if(typeof e=="object"&&e){const t=e,n=t.primary?.trim();if(n){const s=Array.isArray(t.fallbacks)?t.fallbacks.length:0;return s>0?`${n} (+${s} fallback)`:n}}return"-"}function ya(e){const t=e.match(/^(.+) \(\+\d+ fallback\)$/);return t?t[1]:e}function xa(e){if(!e)return null;if(typeof e=="string")return e.trim()||null;if(typeof e=="object"&&e){const t=e;return(typeof t.primary=="string"?t.primary:typeof t.model=="string"?t.model:typeof t.id=="string"?t.id:typeof t.value=="string"?t.value:null)?.trim()||null}return null}function gp(e){if(!e||typeof e=="string")return null;if(typeof e=="object"&&e){const t=e,n=Array.isArray(t.fallbacks)?t.fallbacks:Array.isArray(t.fallback)?t.fallback:null;return n?n.filter(s=>typeof s=="string"):null}return null}function pp(e){return e.split(",").map(t=>t.trim()).filter(Boolean)}function hp(e){const n=e?.agents?.defaults?.models;if(!n||typeof n!="object")return[];const s=[];for(const[i,o]of Object.entries(n)){const a=i.trim();if(!a)continue;const l=o&&typeof o=="object"&&"alias"in o&&typeof o.alias=="string"?o.alias?.trim():void 0,c=l&&l!==a?`${l} (${a})`:a;s.push({value:a,label:c})}return s}function fp(e,t){const n=hp(e),s=t?n.some(i=>i.value===t):!1;return t&&!s&&n.unshift({value:t,label:`Current (${t})`}),n.length===0?r`
      <option value="" disabled>No configured models</option>
    `:n.map(i=>r`<option value=${i.value}>${i.label}</option>`)}function vp(e){const t=Pe(e);if(!t)return{kind:"exact",value:""};if(t==="*")return{kind:"all"};if(!t.includes("*"))return{kind:"exact",value:t};const n=t.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&");return{kind:"regex",value:new RegExp(`^${n.replaceAll("\\*",".*")}$`)}}function vi(e){return Array.isArray(e)?np(e).map(vp).filter(t=>t.kind!=="exact"||t.value.length>0):[]}function Zt(e,t){for(const n of t)if(n.kind==="all"||n.kind==="exact"&&e===n.value||n.kind==="regex"&&n.value.test(e))return!0;return!1}function mp(e,t){if(!t)return!0;const n=Pe(e),s=vi(t.deny);if(Zt(n,s))return!1;const i=vi(t.allow);return!!(i.length===0||Zt(n,i)||n==="apply_patch"&&Zt("exec",i))}function $a(e,t){if(!Array.isArray(t)||t.length===0)return!1;const n=Pe(e),s=vi(t);return!!(Zt(n,s)||n==="apply_patch"&&Zt("exec",s))}function bp(e){const t=e.agentsList?.agents??[],n=e.agentsList?.defaultId??null,s=e.selectedAgentId??n??t[0]?.id??null,i=s?t.find(o=>o.id===s)??null:null;return r`
    <div class="agents-layout">
      <section class="card agents-sidebar">
        <div class="row" style="justify-content: space-between;">
          <div>
            <div class="card-title">Agents</div>
            <div class="card-sub">${t.length} configured.</div>
          </div>
          <button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Loading…":"Refresh"}
          </button>
        </div>
        ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:v}
        <div class="agent-list" style="margin-top: 12px;">
          ${t.length===0?r`
                  <div class="muted">No agents found.</div>
                `:t.map(o=>{const a=$l(o.id,n),l=us(o,e.agentIdentityById[o.id]??null);return r`
                    <button
                      type="button"
                      class="agent-row ${s===o.id?"active":""}"
                      @click=${()=>e.onSelectAgent(o.id)}
                    >
                      <div class="agent-avatar">
                        ${l||fi(o).slice(0,1)}
                      </div>
                      <div class="agent-info">
                        <div class="agent-title">${fi(o)}</div>
                        <div class="agent-sub mono">${o.id}</div>
                      </div>
                      ${a?r`<span class="agent-pill">${a}</span>`:v}
                    </button>
                  `})}
        </div>
      </section>
      <section class="agents-main">
        ${i?r`
              ${yp(i,n,e.agentIdentityById[i.id]??null)}
              ${xp(e.activePanel,o=>e.onSelectPanel(o))}
              ${e.activePanel==="overview"?$p({agent:i,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[i.id]??null,agentIdentityError:e.agentIdentityError,agentIdentityLoading:e.agentIdentityLoading,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave,onModelChange:e.onModelChange,onModelFallbacksChange:e.onModelFallbacksChange}):v}
              ${e.activePanel==="files"?Ip({agentId:i.id,agentFilesList:e.agentFilesList,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,onLoadFiles:e.onLoadFiles,onSelectFile:e.onSelectFile,onFileDraftChange:e.onFileDraftChange,onFileReset:e.onFileReset,onFileSave:e.onFileSave}):v}
              ${e.activePanel==="tools"?Rp({agentId:i.id,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onProfileChange:e.onToolsProfileChange,onOverridesChange:e.onToolsOverridesChange,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):v}
              ${e.activePanel==="skills"?Dp({agentId:i.id,report:e.agentSkillsReport,loading:e.agentSkillsLoading,error:e.agentSkillsError,activeAgentId:e.agentSkillsAgentId,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,filter:e.skillsFilter,onFilterChange:e.onSkillsFilterChange,onRefresh:e.onSkillsRefresh,onToggle:e.onAgentSkillToggle,onClear:e.onAgentSkillsClear,onDisableAll:e.onAgentSkillsDisableAll,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):v}
              ${e.activePanel==="channels"?Lp({agent:i,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[i.id]??null,snapshot:e.channelsSnapshot,loading:e.channelsLoading,error:e.channelsError,lastSuccess:e.channelsLastSuccess,onRefresh:e.onChannelsRefresh}):v}
              ${e.activePanel==="cron"?Ep({agent:i,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[i.id]??null,jobs:e.cronJobs,status:e.cronStatus,loading:e.cronLoading,error:e.cronError,onRefresh:e.onCronRefresh}):v}
            `:r`
                <div class="card">
                  <div class="card-title">Select an agent</div>
                  <div class="card-sub">Pick an agent to inspect its workspace and tools.</div>
                </div>
              `}
      </section>
    </div>
  `}function yp(e,t,n){const s=$l(e.id,t),i=fi(e),o=e.identity?.theme?.trim()||"Agent workspace and routing.",a=us(e,n);return r`
    <section class="card agent-header">
      <div class="agent-header-main">
        <div class="agent-avatar agent-avatar--lg">
          ${a||i.slice(0,1)}
        </div>
        <div>
          <div class="card-title">${i}</div>
          <div class="card-sub">${o}</div>
        </div>
      </div>
      <div class="agent-header-meta">
        <div class="mono">${e.id}</div>
        ${s?r`<span class="agent-pill">${s}</span>`:v}
      </div>
    </section>
  `}function xp(e,t){return r`
    <div class="agent-tabs">
      ${[{id:"overview",label:"Overview"},{id:"files",label:"Files"},{id:"tools",label:"Tools"},{id:"skills",label:"Skills"},{id:"channels",label:"Channels"},{id:"cron",label:"Cron Jobs"}].map(s=>r`
          <button
            class="agent-tab ${e===s.id?"active":""}"
            type="button"
            @click=${()=>t(s.id)}
          >
            ${s.label}
          </button>
        `)}
    </div>
  `}function $p(e){const{agent:t,configForm:n,agentFilesList:s,agentIdentity:i,agentIdentityLoading:o,agentIdentityError:a,configLoading:l,configSaving:c,configDirty:u,onConfigReload:g,onConfigSave:h,onModelChange:f,onModelFallbacksChange:d}=e,p=gs(n,t.id),S=(s&&s.agentId===t.id?s.workspace:null)||p.entry?.workspace||p.defaults?.workspace||"default",k=p.entry?.model?Yt(p.entry?.model):Yt(p.defaults?.model),w=Yt(p.defaults?.model),A=xa(p.entry?.model)||(k!=="-"?ya(k):null),C=xa(p.defaults?.model)||(w!=="-"?ya(w):null),_=A??C??null,T=gp(p.entry?.model),M=T?T.join(", "):"",U=i?.name?.trim()||t.identity?.name?.trim()||t.name?.trim()||p.entry?.name||"-",ie=us(t,i)||"-",N=Array.isArray(p.entry?.skills)?p.entry?.skills:null,H=N?.length??null,ce=o?"Loading…":a?"Unavailable":"",L=!!(e.defaultId&&t.id===e.defaultId);return r`
    <section class="card">
      <div class="card-title">Overview</div>
      <div class="card-sub">Workspace paths and identity metadata.</div>
      <div class="agents-overview-grid" style="margin-top: 16px;">
        <div class="agent-kv">
          <div class="label">Workspace</div>
          <div class="mono">${S}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Primary Model</div>
          <div class="mono">${k}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Name</div>
          <div>${U}</div>
          ${ce?r`<div class="agent-kv-sub muted">${ce}</div>`:v}
        </div>
        <div class="agent-kv">
          <div class="label">Default</div>
          <div>${L?"yes":"no"}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Emoji</div>
          <div>${ie}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Skills Filter</div>
          <div>${N?`${H} selected`:"all skills"}</div>
        </div>
      </div>

      <div class="agent-model-select" style="margin-top: 20px;">
        <div class="label">Model Selection</div>
        <div class="row" style="gap: 12px; flex-wrap: wrap;">
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Primary model${L?" (default)":""}</span>
            <select
              .value=${_??""}
              ?disabled=${!n||l||c}
              @change=${B=>f(t.id,B.target.value||null)}
            >
              ${L?v:r`
                      <option value="">
                        ${C?`Inherit default (${C})`:"Inherit default"}
                      </option>
                    `}
              ${fp(n,_??void 0)}
            </select>
          </label>
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Fallbacks (comma-separated)</span>
            <input
              .value=${M}
              ?disabled=${!n||l||c}
              placeholder="provider/model, provider/model"
              @input=${B=>d(t.id,pp(B.target.value))}
            />
          </label>
        </div>
        <div class="row" style="justify-content: flex-end; gap: 8px;">
          <button
            class="btn btn--sm"
            ?disabled=${l}
            @click=${g}
          >
            Reload Config
          </button>
          <button
            class="btn btn--sm primary"
            ?disabled=${c||!u}
            @click=${h}
          >
            ${c?"Saving…":"Save"}
          </button>
        </div>
      </div>
    </section>
  `}function kl(e,t){return r`
    <section class="card">
      <div class="card-title">Agent Context</div>
      <div class="card-sub">${t}</div>
      <div class="agents-overview-grid" style="margin-top: 16px;">
        <div class="agent-kv">
          <div class="label">Workspace</div>
          <div class="mono">${e.workspace}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Primary Model</div>
          <div class="mono">${e.model}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Name</div>
          <div>${e.identityName}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Emoji</div>
          <div>${e.identityEmoji}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Skills Filter</div>
          <div>${e.skillsLabel}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Default</div>
          <div>${e.isDefault?"yes":"no"}</div>
        </div>
      </div>
    </section>
  `}function wp(e,t){const n=e.channelMeta?.find(s=>s.id===t);return n?.label?n.label:e.channelLabels?.[t]??t}function kp(e){if(!e)return[];const t=new Set;for(const i of e.channelOrder??[])t.add(i);for(const i of e.channelMeta??[])t.add(i.id);for(const i of Object.keys(e.channelAccounts??{}))t.add(i);const n=[],s=e.channelOrder?.length?e.channelOrder:Array.from(t);for(const i of s)t.has(i)&&(n.push(i),t.delete(i));for(const i of t)n.push(i);return n.map(i=>({id:i,label:wp(e,i),accounts:e.channelAccounts?.[i]??[]}))}const Sp=["groupPolicy","streamMode","dmPolicy"];function Ap(e,t){if(!e)return null;const s=(e.channels??{})[t];if(s&&typeof s=="object")return s;const i=e[t];return i&&typeof i=="object"?i:null}function Cp(e){if(e==null)return"n/a";if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return String(e);try{return JSON.stringify(e)}catch{return"n/a"}}function Tp(e,t){const n=Ap(e,t);return n?Sp.flatMap(s=>s in n?[{label:s,value:Cp(n[s])}]:[]):[]}function _p(e){let t=0,n=0,s=0;for(const i of e){const o=i.probe&&typeof i.probe=="object"&&"ok"in i.probe?!!i.probe.ok:!1;(i.connected===!0||i.running===!0||o)&&(t+=1),i.configured&&(n+=1),i.enabled&&(s+=1)}return{total:e.length,connected:t,configured:n,enabled:s}}function Lp(e){const t=wl(e.agent,e.configForm,e.agentFilesList,e.defaultId,e.agentIdentity),n=kp(e.snapshot),s=e.lastSuccess?V(e.lastSuccess):"never";return r`
    <section class="grid grid-cols-2">
      ${kl(t,"Workspace, identity, and model configuration.")}
      <section class="card">
        <div class="row" style="justify-content: space-between;">
          <div>
            <div class="card-title">Channels</div>
            <div class="card-sub">Gateway-wide channel status snapshot.</div>
          </div>
          <button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Refreshing…":"Refresh"}
          </button>
        </div>
        <div class="muted" style="margin-top: 8px;">
          Last refresh: ${s}
        </div>
        ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:v}
        ${e.snapshot?v:r`
                <div class="callout info" style="margin-top: 12px">Load channels to see live status.</div>
              `}
        ${n.length===0?r`
                <div class="muted" style="margin-top: 16px">No channels found.</div>
              `:r`
              <div class="list" style="margin-top: 16px;">
                ${n.map(i=>{const o=_p(i.accounts),a=o.total?`${o.connected}/${o.total} connected`:"no accounts",l=o.configured?`${o.configured} configured`:"not configured",c=o.total?`${o.enabled} enabled`:"disabled",u=Tp(e.configForm,i.id);return r`
                    <div class="list-item">
                      <div class="list-main">
                        <div class="list-title">${i.label}</div>
                        <div class="list-sub mono">${i.id}</div>
                      </div>
                      <div class="list-meta">
                        <div>${a}</div>
                        <div>${l}</div>
                        <div>${c}</div>
                        ${u.length>0?u.map(g=>r`<div>${g.label}: ${g.value}</div>`):v}
                      </div>
                    </div>
                  `})}
              </div>
            `}
      </section>
    </section>
  `}function Ep(e){const t=wl(e.agent,e.configForm,e.agentFilesList,e.defaultId,e.agentIdentity),n=e.jobs.filter(s=>s.agentId===e.agent.id);return r`
    <section class="grid grid-cols-2">
      ${kl(t,"Workspace and scheduling targets.")}
      <section class="card">
        <div class="row" style="justify-content: space-between;">
          <div>
            <div class="card-title">Scheduler</div>
            <div class="card-sub">Gateway cron status.</div>
          </div>
          <button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Refreshing…":"Refresh"}
          </button>
        </div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">Enabled</div>
            <div class="stat-value">
              ${e.status?e.status.enabled?"Yes":"No":"n/a"}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">Jobs</div>
            <div class="stat-value">${e.status?.jobs??"n/a"}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Next wake</div>
            <div class="stat-value">${io(e.status?.nextWakeAtMs??null)}</div>
          </div>
        </div>
        ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:v}
      </section>
    </section>
    <section class="card">
      <div class="card-title">Agent Cron Jobs</div>
      <div class="card-sub">Scheduled jobs targeting this agent.</div>
      ${n.length===0?r`
              <div class="muted" style="margin-top: 16px">No jobs assigned.</div>
            `:r`
              <div class="list" style="margin-top: 16px;">
                ${n.map(s=>r`
                  <div class="list-item">
                    <div class="list-main">
                      <div class="list-title">${s.name}</div>
                      ${s.description?r`<div class="list-sub">${s.description}</div>`:v}
                      <div class="chip-row" style="margin-top: 6px;">
                        <span class="chip">${xl(s)}</span>
                        <span class="chip ${s.enabled?"chip-ok":"chip-warn"}">
                          ${s.enabled?"enabled":"disabled"}
                        </span>
                        <span class="chip">${s.sessionTarget}</span>
                      </div>
                    </div>
                    <div class="list-meta">
                      <div class="mono">${lp(s)}</div>
                      <div class="muted">${cp(s)}</div>
                    </div>
                  </div>
                `)}
              </div>
            `}
    </section>
  `}function Ip(e){const t=e.agentFilesList?.agentId===e.agentId?e.agentFilesList:null,n=t?.files??[],s=e.agentFileActive??null,i=s?n.find(c=>c.name===s)??null:null,o=s?e.agentFileContents[s]??"":"",a=s?e.agentFileDrafts[s]??o:"",l=s?a!==o:!1;return r`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Core Files</div>
          <div class="card-sub">Bootstrap persona, identity, and tool guidance.</div>
        </div>
        <button
          class="btn btn--sm"
          ?disabled=${e.agentFilesLoading}
          @click=${()=>e.onLoadFiles(e.agentId)}
        >
          ${e.agentFilesLoading?"Loading…":"Refresh"}
        </button>
      </div>
      ${t?r`<div class="muted mono" style="margin-top: 8px;">Workspace: ${t.workspace}</div>`:v}
      ${e.agentFilesError?r`<div class="callout danger" style="margin-top: 12px;">${e.agentFilesError}</div>`:v}
      ${t?r`
              <div class="agent-files-grid" style="margin-top: 16px;">
                <div class="agent-files-list">
                  ${n.length===0?r`
                          <div class="muted">No files found.</div>
                        `:n.map(c=>Mp(c,s,()=>e.onSelectFile(c.name)))}
                </div>
                <div class="agent-files-editor">
                  ${i?r`
                          <div class="agent-file-header">
                            <div>
                              <div class="agent-file-title mono">${i.name}</div>
                              <div class="agent-file-sub mono">${i.path}</div>
                            </div>
                            <div class="agent-file-actions">
                              <button
                                class="btn btn--sm"
                                ?disabled=${!l}
                                @click=${()=>e.onFileReset(i.name)}
                              >
                                Reset
                              </button>
                              <button
                                class="btn btn--sm primary"
                                ?disabled=${e.agentFileSaving||!l}
                                @click=${()=>e.onFileSave(i.name)}
                              >
                                ${e.agentFileSaving?"Saving…":"Save"}
                              </button>
                            </div>
                          </div>
                          ${i.missing?r`
                                  <div class="callout info" style="margin-top: 10px">
                                    This file is missing. Saving will create it in the agent workspace.
                                  </div>
                                `:v}
                          <label class="field" style="margin-top: 12px;">
                            <span>Content</span>
                            <textarea
                              .value=${a}
                              @input=${c=>e.onFileDraftChange(i.name,c.target.value)}
                            ></textarea>
                          </label>
                        `:r`
                          <div class="muted">Select a file to edit.</div>
                        `}
                </div>
              </div>
            `:r`
              <div class="callout info" style="margin-top: 12px">
                Load the agent workspace files to edit core instructions.
              </div>
            `}
    </section>
  `}function Mp(e,t,n){const s=e.missing?"Missing":`${up(e.size)} · ${V(e.updatedAtMs??null)}`;return r`
    <button
      type="button"
      class="agent-file-row ${t===e.name?"active":""}"
      @click=${n}
    >
      <div>
        <div class="agent-file-name mono">${e.name}</div>
        <div class="agent-file-meta">${s}</div>
      </div>
      ${e.missing?r`
              <span class="agent-pill warn">missing</span>
            `:v}
    </button>
  `}function Rp(e){const t=gs(e.configForm,e.agentId),n=t.entry?.tools??{},s=t.globalTools??{},i=n.profile??s.profile??"full",o=n.profile?"agent override":s.profile?"global default":"default",a=Array.isArray(n.allow)&&n.allow.length>0,l=Array.isArray(s.allow)&&s.allow.length>0,c=!!e.configForm&&!e.configLoading&&!e.configSaving&&!a,u=a?[]:Array.isArray(n.alsoAllow)?n.alsoAllow:[],g=a?[]:Array.isArray(n.deny)?n.deny:[],h=a?{allow:n.allow??[],deny:n.deny??[]}:sp(i)??void 0,f=ba.flatMap(k=>k.tools.map(w=>w.id)),d=k=>{const w=mp(k,h),A=$a(k,u),C=$a(k,g);return{allowed:(w||A)&&!C,baseAllowed:w,denied:C}},p=f.filter(k=>d(k).allowed).length,m=(k,w)=>{const A=new Set(u.map(M=>Pe(M)).filter(M=>M.length>0)),C=new Set(g.map(M=>Pe(M)).filter(M=>M.length>0)),_=d(k).baseAllowed,T=Pe(k);w?(C.delete(T),_||A.add(T)):(A.delete(T),C.add(T)),e.onOverridesChange(e.agentId,[...A],[...C])},S=k=>{const w=new Set(u.map(C=>Pe(C)).filter(C=>C.length>0)),A=new Set(g.map(C=>Pe(C)).filter(C=>C.length>0));for(const C of f){const _=d(C).baseAllowed,T=Pe(C);k?(A.delete(T),_||w.add(T)):(w.delete(T),A.add(T))}e.onOverridesChange(e.agentId,[...w],[...A])};return r`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Tool Access</div>
          <div class="card-sub">
            Profile + per-tool overrides for this agent.
            <span class="mono">${p}/${f.length}</span> enabled.
          </div>
        </div>
        <div class="row" style="gap: 8px;">
          <button
            class="btn btn--sm"
            ?disabled=${!c}
            @click=${()=>S(!0)}
          >
            Enable All
          </button>
          <button
            class="btn btn--sm"
            ?disabled=${!c}
            @click=${()=>S(!1)}
          >
            Disable All
          </button>
          <button
            class="btn btn--sm"
            ?disabled=${e.configLoading}
            @click=${e.onConfigReload}
          >
            Reload Config
          </button>
          <button
            class="btn btn--sm primary"
            ?disabled=${e.configSaving||!e.configDirty}
            @click=${e.onConfigSave}
          >
            ${e.configSaving?"Saving…":"Save"}
          </button>
        </div>
      </div>

      ${e.configForm?v:r`
              <div class="callout info" style="margin-top: 12px">
                Load the gateway config to adjust tool profiles.
              </div>
            `}
      ${a?r`
              <div class="callout info" style="margin-top: 12px">
                This agent is using an explicit allowlist in config. Tool overrides are managed in the Config tab.
              </div>
            `:v}
      ${l?r`
              <div class="callout info" style="margin-top: 12px">
                Global tools.allow is set. Agent overrides cannot enable tools that are globally blocked.
              </div>
            `:v}

      <div class="agent-tools-meta" style="margin-top: 16px;">
        <div class="agent-kv">
          <div class="label">Profile</div>
          <div class="mono">${i}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Source</div>
          <div>${o}</div>
        </div>
        ${e.configDirty?r`
                <div class="agent-kv">
                  <div class="label">Status</div>
                  <div class="mono">unsaved</div>
                </div>
              `:v}
      </div>

      <div class="agent-tools-presets" style="margin-top: 16px;">
        <div class="label">Quick Presets</div>
        <div class="agent-tools-buttons">
          ${dp.map(k=>r`
              <button
                class="btn btn--sm ${i===k.id?"active":""}"
                ?disabled=${!c}
                @click=${()=>e.onProfileChange(e.agentId,k.id,!0)}
              >
                ${k.label}
              </button>
            `)}
          <button
            class="btn btn--sm"
            ?disabled=${!c}
            @click=${()=>e.onProfileChange(e.agentId,null,!1)}
          >
            Inherit
          </button>
        </div>
      </div>

      <div class="agent-tools-grid" style="margin-top: 20px;">
        ${ba.map(k=>r`
            <div class="agent-tools-section">
              <div class="agent-tools-header">${k.label}</div>
              <div class="agent-tools-list">
                ${k.tools.map(w=>{const{allowed:A}=d(w.id);return r`
                    <div class="agent-tool-row">
                      <div>
                        <div class="agent-tool-title mono">${w.label}</div>
                        <div class="agent-tool-sub">${w.description}</div>
                      </div>
                      <label class="cfg-toggle">
                        <input
                          type="checkbox"
                          .checked=${A}
                          ?disabled=${!c}
                          @change=${C=>m(w.id,C.target.checked)}
                        />
                        <span class="cfg-toggle__track"></span>
                      </label>
                    </div>
                  `})}
              </div>
            </div>
          `)}
      </div>
    </section>
  `}const Tn=[{id:"workspace",label:"Workspace Skills",sources:["opensoul-workspace"]},{id:"built-in",label:"Built-in Skills",sources:["opensoul-bundled"]},{id:"installed",label:"Installed Skills",sources:["opensoul-managed"]},{id:"extra",label:"Extra Skills",sources:["opensoul-extra"]}];function Pp(e){const t=new Map;for(const o of Tn)t.set(o.id,{id:o.id,label:o.label,skills:[]});const n=Tn.find(o=>o.id==="built-in"),s={id:"other",label:"Other Skills",skills:[]};for(const o of e){const a=o.bundled?n:Tn.find(l=>l.sources.includes(o.source));a?t.get(a.id)?.skills.push(o):s.skills.push(o)}const i=Tn.map(o=>t.get(o.id)).filter(o=>!!(o&&o.skills.length>0));return s.skills.length>0&&i.push(s),i}function Dp(e){const t=!!e.configForm&&!e.configLoading&&!e.configSaving,n=gs(e.configForm,e.agentId),s=Array.isArray(n.entry?.skills)?n.entry?.skills:void 0,i=new Set((s??[]).map(d=>d.trim()).filter(Boolean)),o=s!==void 0,a=!!(e.report&&e.activeAgentId===e.agentId),l=a?e.report?.skills??[]:[],c=e.filter.trim().toLowerCase(),u=c?l.filter(d=>[d.name,d.description,d.source].join(" ").toLowerCase().includes(c)):l,g=Pp(u),h=o?l.filter(d=>i.has(d.name)).length:l.length,f=l.length;return r`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Skills</div>
          <div class="card-sub">
            Per-agent skill allowlist and workspace skills.
            ${f>0?r`<span class="mono">${h}/${f}</span>`:v}
          </div>
        </div>
        <div class="row" style="gap: 8px;">
          <button class="btn btn--sm" ?disabled=${!t} @click=${()=>e.onClear(e.agentId)}>
            Use All
          </button>
          <button class="btn btn--sm" ?disabled=${!t} @click=${()=>e.onDisableAll(e.agentId)}>
            Disable All
          </button>
          <button
            class="btn btn--sm"
            ?disabled=${e.configLoading}
            @click=${e.onConfigReload}
          >
            Reload Config
          </button>
          <button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Loading…":"Refresh"}
          </button>
          <button
            class="btn btn--sm primary"
            ?disabled=${e.configSaving||!e.configDirty}
            @click=${e.onConfigSave}
          >
            ${e.configSaving?"Saving…":"Save"}
          </button>
        </div>
      </div>

      ${e.configForm?v:r`
              <div class="callout info" style="margin-top: 12px">
                Load the gateway config to set per-agent skills.
              </div>
            `}
      ${o?r`
              <div class="callout info" style="margin-top: 12px">This agent uses a custom skill allowlist.</div>
            `:r`
              <div class="callout info" style="margin-top: 12px">
                All skills are enabled. Disabling any skill will create a per-agent allowlist.
              </div>
            `}
      ${!a&&!e.loading?r`
              <div class="callout info" style="margin-top: 12px">
                Load skills for this agent to view workspace-specific entries.
              </div>
            `:v}
      ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:v}

      <div class="filters" style="margin-top: 14px;">
        <label class="field" style="flex: 1;">
          <span>Filter</span>
          <input
            .value=${e.filter}
            @input=${d=>e.onFilterChange(d.target.value)}
            placeholder="Search skills"
          />
        </label>
        <div class="muted">${u.length} shown</div>
      </div>

      ${u.length===0?r`
              <div class="muted" style="margin-top: 16px">No skills found.</div>
            `:r`
              <div class="agent-skills-groups" style="margin-top: 16px;">
                ${g.map(d=>Np(d,{agentId:e.agentId,allowSet:i,usingAllowlist:o,editable:t,onToggle:e.onToggle}))}
              </div>
            `}
    </section>
  `}function Np(e,t){const n=e.id==="workspace"||e.id==="built-in";return r`
    <details class="agent-skills-group" ?open=${!n}>
      <summary class="agent-skills-header">
        <span>${e.label}</span>
        <span class="muted">${e.skills.length}</span>
      </summary>
      <div class="list skills-grid">
        ${e.skills.map(s=>Fp(s,{agentId:t.agentId,allowSet:t.allowSet,usingAllowlist:t.usingAllowlist,editable:t.editable,onToggle:t.onToggle}))}
      </div>
    </details>
  `}function Fp(e,t){const n=t.usingAllowlist?t.allowSet.has(e.name):!0,s=[...e.missing.bins.map(o=>`bin:${o}`),...e.missing.env.map(o=>`env:${o}`),...e.missing.config.map(o=>`config:${o}`),...e.missing.os.map(o=>`os:${o}`)],i=[];return e.disabled&&i.push("disabled"),e.blockedByAllowlist&&i.push("blocked by allowlist"),r`
    <div class="list-item agent-skill-row">
      <div class="list-main">
        <div class="list-title">
          ${e.emoji?`${e.emoji} `:""}${e.name}
        </div>
        <div class="list-sub">${e.description}</div>
        <div class="chip-row" style="margin-top: 6px;">
          <span class="chip">${e.source}</span>
          <span class="chip ${e.eligible?"chip-ok":"chip-warn"}">
            ${e.eligible?"eligible":"blocked"}
          </span>
          ${e.disabled?r`
                  <span class="chip chip-warn">disabled</span>
                `:v}
        </div>
        ${s.length>0?r`<div class="muted" style="margin-top: 6px;">Missing: ${s.join(", ")}</div>`:v}
        ${i.length>0?r`<div class="muted" style="margin-top: 6px;">Reason: ${i.join(", ")}</div>`:v}
      </div>
      <div class="list-meta">
        <label class="cfg-toggle">
          <input
            type="checkbox"
            .checked=${n}
            ?disabled=${!t.editable}
            @change=${o=>t.onToggle(t.agentId,e.name,o.target.checked)}
          />
          <span class="cfg-toggle__track"></span>
        </label>
      </div>
    </div>
  `}function De(e){if(e)return Array.isArray(e.type)?e.type.filter(n=>n!=="null")[0]??e.type[0]:e.type}function Sl(e){if(!e)return"";if(e.default!==void 0)return e.default;switch(De(e)){case"object":return{};case"array":return[];case"boolean":return!1;case"number":case"integer":return 0;case"string":return"";default:return""}}function ps(e){return e.filter(t=>typeof t=="string").join(".")}function Ae(e,t){const n=ps(e),s=t[n];if(s)return s;const i=n.split(".");for(const[o,a]of Object.entries(t)){if(!o.includes("*"))continue;const l=o.split(".");if(l.length!==i.length)continue;let c=!0;for(let u=0;u<i.length;u+=1)if(l[u]!=="*"&&l[u]!==i[u]){c=!1;break}if(c)return a}}function Ge(e){return e.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/\s+/g," ").replace(/^./,t=>t.toUpperCase())}function Op(e){const t=ps(e).toLowerCase();return t.includes("token")||t.includes("password")||t.includes("secret")||t.includes("apikey")||t.endsWith("key")}const Bp=new Set(["title","description","default","nullable"]);function zp(e){return Object.keys(e??{}).filter(n=>!Bp.has(n)).length===0}function Up(e){if(e===void 0)return"";try{return JSON.stringify(e,null,2)??""}catch{return""}}const cn={chevronDown:r`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,plus:r`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  `,minus:r`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  `,trash:r`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  `,edit:r`
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  `};function We(e){const{schema:t,value:n,path:s,hints:i,unsupported:o,disabled:a,onPatch:l}=e,c=e.showLabel??!0,u=De(t),g=Ae(s,i),h=g?.label??t.title??Ge(String(s.at(-1))),f=g?.help??t.description,d=ps(s);if(o.has(d))return r`<div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${h}</div>
      <div class="cfg-field__error">Unsupported schema node. Use Raw mode.</div>
    </div>`;if(t.anyOf||t.oneOf){const m=(t.anyOf??t.oneOf??[]).filter(_=>!(_.type==="null"||Array.isArray(_.type)&&_.type.includes("null")));if(m.length===1)return We({...e,schema:m[0]});const S=_=>{if(_.const!==void 0)return _.const;if(_.enum&&_.enum.length===1)return _.enum[0]},k=m.map(S),w=k.every(_=>_!==void 0);if(w&&k.length>0&&k.length<=5){const _=n??t.default;return r`
        <div class="cfg-field">
          ${c?r`<label class="cfg-field__label">${h}</label>`:v}
          ${f?r`<div class="cfg-field__help">${f}</div>`:v}
          <div class="cfg-segmented">
            ${k.map(T=>r`
              <button
                type="button"
                class="cfg-segmented__btn ${T===_||String(T)===String(_)?"active":""}"
                ?disabled=${a}
                @click=${()=>l(s,T)}
              >
                ${String(T)}
              </button>
            `)}
          </div>
        </div>
      `}if(w&&k.length>5)return ka({...e,options:k,value:n??t.default});const A=new Set(m.map(_=>De(_)).filter(Boolean)),C=new Set([...A].map(_=>_==="integer"?"number":_));if([...C].every(_=>["string","number","boolean"].includes(_))){const _=C.has("string"),T=C.has("number");if(C.has("boolean")&&C.size===1)return We({...e,schema:{...t,type:"boolean",anyOf:void 0,oneOf:void 0}});if(_||T)return wa({...e,inputType:T&&!_?"number":"text"})}}if(t.enum){const p=t.enum;if(p.length<=5){const m=n??t.default;return r`
        <div class="cfg-field">
          ${c?r`<label class="cfg-field__label">${h}</label>`:v}
          ${f?r`<div class="cfg-field__help">${f}</div>`:v}
          <div class="cfg-segmented">
            ${p.map(S=>r`
              <button
                type="button"
                class="cfg-segmented__btn ${S===m||String(S)===String(m)?"active":""}"
                ?disabled=${a}
                @click=${()=>l(s,S)}
              >
                ${String(S)}
              </button>
            `)}
          </div>
        </div>
      `}return ka({...e,options:p,value:n??t.default})}if(u==="object")return Kp(e);if(u==="array")return jp(e);if(u==="boolean"){const p=typeof n=="boolean"?n:typeof t.default=="boolean"?t.default:!1;return r`
      <label class="cfg-toggle-row ${a?"disabled":""}">
        <div class="cfg-toggle-row__content">
          <span class="cfg-toggle-row__label">${h}</span>
          ${f?r`<span class="cfg-toggle-row__help">${f}</span>`:v}
        </div>
        <div class="cfg-toggle">
          <input
            type="checkbox"
            .checked=${p}
            ?disabled=${a}
            @change=${m=>l(s,m.target.checked)}
          />
          <span class="cfg-toggle__track"></span>
        </div>
      </label>
    `}return u==="number"||u==="integer"?Hp(e):u==="string"?wa({...e,inputType:"text"}):r`
    <div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${h}</div>
      <div class="cfg-field__error">Unsupported type: ${u}. Use Raw mode.</div>
    </div>
  `}function wa(e){const{schema:t,value:n,path:s,hints:i,disabled:o,onPatch:a,inputType:l}=e,c=e.showLabel??!0,u=Ae(s,i),g=u?.label??t.title??Ge(String(s.at(-1))),h=u?.help??t.description,f=u?.sensitive??Op(s),d=u?.placeholder??(f?"••••":t.default!==void 0?`Default: ${String(t.default)}`:""),p=n??"";return r`
    <div class="cfg-field">
      ${c?r`<label class="cfg-field__label">${g}</label>`:v}
      ${h?r`<div class="cfg-field__help">${h}</div>`:v}
      <div class="cfg-input-wrap">
        <input
          type=${f?"password":l}
          class="cfg-input"
          placeholder=${d}
          .value=${p==null?"":String(p)}
          ?disabled=${o}
          @input=${m=>{const S=m.target.value;if(l==="number"){if(S.trim()===""){a(s,void 0);return}const k=Number(S);a(s,Number.isNaN(k)?S:k);return}a(s,S)}}
          @change=${m=>{if(l==="number")return;const S=m.target.value;a(s,S.trim())}}
        />
        ${t.default!==void 0?r`
          <button
            type="button"
            class="cfg-input__reset"
            title="Reset to default"
            ?disabled=${o}
            @click=${()=>a(s,t.default)}
          >↺</button>
        `:v}
      </div>
    </div>
  `}function Hp(e){const{schema:t,value:n,path:s,hints:i,disabled:o,onPatch:a}=e,l=e.showLabel??!0,c=Ae(s,i),u=c?.label??t.title??Ge(String(s.at(-1))),g=c?.help??t.description,h=n??t.default??"",f=typeof h=="number"?h:0;return r`
    <div class="cfg-field">
      ${l?r`<label class="cfg-field__label">${u}</label>`:v}
      ${g?r`<div class="cfg-field__help">${g}</div>`:v}
      <div class="cfg-number">
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${o}
          @click=${()=>a(s,f-1)}
        >−</button>
        <input
          type="number"
          class="cfg-number__input"
          .value=${h==null?"":String(h)}
          ?disabled=${o}
          @input=${d=>{const p=d.target.value,m=p===""?void 0:Number(p);a(s,m)}}
        />
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${o}
          @click=${()=>a(s,f+1)}
        >+</button>
      </div>
    </div>
  `}function ka(e){const{schema:t,value:n,path:s,hints:i,disabled:o,options:a,onPatch:l}=e,c=e.showLabel??!0,u=Ae(s,i),g=u?.label??t.title??Ge(String(s.at(-1))),h=u?.help??t.description,f=n??t.default,d=a.findIndex(m=>m===f||String(m)===String(f)),p="__unset__";return r`
    <div class="cfg-field">
      ${c?r`<label class="cfg-field__label">${g}</label>`:v}
      ${h?r`<div class="cfg-field__help">${h}</div>`:v}
      <select
        class="cfg-select"
        ?disabled=${o}
        .value=${d>=0?String(d):p}
        @change=${m=>{const S=m.target.value;l(s,S===p?void 0:a[Number(S)])}}
      >
        <option value=${p}>Select...</option>
        ${a.map((m,S)=>r`
          <option value=${String(S)}>${String(m)}</option>
        `)}
      </select>
    </div>
  `}function Kp(e){const{schema:t,value:n,path:s,hints:i,unsupported:o,disabled:a,onPatch:l}=e,c=Ae(s,i),u=c?.label??t.title??Ge(String(s.at(-1))),g=c?.help??t.description,h=n??t.default,f=h&&typeof h=="object"&&!Array.isArray(h)?h:{},d=t.properties??{},m=Object.entries(d).toSorted((A,C)=>{const _=Ae([...s,A[0]],i)?.order??0,T=Ae([...s,C[0]],i)?.order??0;return _!==T?_-T:A[0].localeCompare(C[0])}),S=new Set(Object.keys(d)),k=t.additionalProperties,w=!!k&&typeof k=="object";return s.length===1?r`
      <div class="cfg-fields">
        ${m.map(([A,C])=>We({schema:C,value:f[A],path:[...s,A],hints:i,unsupported:o,disabled:a,onPatch:l}))}
        ${w?Sa({schema:k,value:f,path:s,hints:i,unsupported:o,disabled:a,reservedKeys:S,onPatch:l}):v}
      </div>
    `:r`
    <details class="cfg-object" open>
      <summary class="cfg-object__header">
        <span class="cfg-object__title">${u}</span>
        <span class="cfg-object__chevron">${cn.chevronDown}</span>
      </summary>
      ${g?r`<div class="cfg-object__help">${g}</div>`:v}
      <div class="cfg-object__content">
        ${m.map(([A,C])=>We({schema:C,value:f[A],path:[...s,A],hints:i,unsupported:o,disabled:a,onPatch:l}))}
        ${w?Sa({schema:k,value:f,path:s,hints:i,unsupported:o,disabled:a,reservedKeys:S,onPatch:l}):v}
      </div>
    </details>
  `}function jp(e){const{schema:t,value:n,path:s,hints:i,unsupported:o,disabled:a,onPatch:l}=e,c=e.showLabel??!0,u=Ae(s,i),g=u?.label??t.title??Ge(String(s.at(-1))),h=u?.help??t.description,f=Array.isArray(t.items)?t.items[0]:t.items;if(!f)return r`
      <div class="cfg-field cfg-field--error">
        <div class="cfg-field__label">${g}</div>
        <div class="cfg-field__error">Unsupported array schema. Use Raw mode.</div>
      </div>
    `;const d=Array.isArray(n)?n:Array.isArray(t.default)?t.default:[];return r`
    <div class="cfg-array">
      <div class="cfg-array__header">
        ${c?r`<span class="cfg-array__label">${g}</span>`:v}
        <span class="cfg-array__count">${d.length} item${d.length!==1?"s":""}</span>
        <button
          type="button"
          class="cfg-array__add"
          ?disabled=${a}
          @click=${()=>{const p=[...d,Sl(f)];l(s,p)}}
        >
          <span class="cfg-array__add-icon">${cn.plus}</span>
          Add
        </button>
      </div>
      ${h?r`<div class="cfg-array__help">${h}</div>`:v}

      ${d.length===0?r`
              <div class="cfg-array__empty">No items yet. Click "Add" to create one.</div>
            `:r`
        <div class="cfg-array__items">
          ${d.map((p,m)=>r`
            <div class="cfg-array__item">
              <div class="cfg-array__item-header">
                <span class="cfg-array__item-index">#${m+1}</span>
                <button
                  type="button"
                  class="cfg-array__item-remove"
                  title="Remove item"
                  ?disabled=${a}
                  @click=${()=>{const S=[...d];S.splice(m,1),l(s,S)}}
                >
                  ${cn.trash}
                </button>
              </div>
              <div class="cfg-array__item-content">
                ${We({schema:f,value:p,path:[...s,m],hints:i,unsupported:o,disabled:a,showLabel:!1,onPatch:l})}
              </div>
            </div>
          `)}
        </div>
      `}
    </div>
  `}function Sa(e){const{schema:t,value:n,path:s,hints:i,unsupported:o,disabled:a,reservedKeys:l,onPatch:c}=e,u=zp(t),g=Object.entries(n??{}).filter(([h])=>!l.has(h));return r`
    <div class="cfg-map">
      <div class="cfg-map__header">
        <span class="cfg-map__label">Custom entries</span>
        <button
          type="button"
          class="cfg-map__add"
          ?disabled=${a}
          @click=${()=>{const h={...n};let f=1,d=`custom-${f}`;for(;d in h;)f+=1,d=`custom-${f}`;h[d]=u?{}:Sl(t),c(s,h)}}
        >
          <span class="cfg-map__add-icon">${cn.plus}</span>
          Add Entry
        </button>
      </div>

      ${g.length===0?r`
              <div class="cfg-map__empty">No custom entries.</div>
            `:r`
        <div class="cfg-map__items">
          ${g.map(([h,f])=>{const d=[...s,h],p=Up(f);return r`
              <div class="cfg-map__item">
                <div class="cfg-map__item-key">
                  <input
                    type="text"
                    class="cfg-input cfg-input--sm"
                    placeholder="Key"
                    .value=${h}
                    ?disabled=${a}
                    @change=${m=>{const S=m.target.value.trim();if(!S||S===h)return;const k={...n};S in k||(k[S]=k[h],delete k[h],c(s,k))}}
                  />
                </div>
                <div class="cfg-map__item-value">
                  ${u?r`
                        <textarea
                          class="cfg-textarea cfg-textarea--sm"
                          placeholder="JSON value"
                          rows="2"
                          .value=${p}
                          ?disabled=${a}
                          @change=${m=>{const S=m.target,k=S.value.trim();if(!k){c(d,void 0);return}try{c(d,JSON.parse(k))}catch{S.value=p}}}
                        ></textarea>
                      `:We({schema:t,value:f,path:d,hints:i,unsupported:o,disabled:a,showLabel:!1,onPatch:c})}
                </div>
                <button
                  type="button"
                  class="cfg-map__item-remove"
                  title="Remove entry"
                  ?disabled=${a}
                  @click=${()=>{const m={...n};delete m[h],c(s,m)}}
                >
                  ${cn.trash}
                </button>
              </div>
            `})}
        </div>
      `}
    </div>
  `}const Aa={env:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="3"></circle>
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
      ></path>
    </svg>
  `,update:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  `,agents:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path
        d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"
      ></path>
      <circle cx="8" cy="14" r="1"></circle>
      <circle cx="16" cy="14" r="1"></circle>
    </svg>
  `,auth:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  `,channels:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  `,messages:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  `,commands:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  `,hooks:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  `,skills:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      ></polygon>
    </svg>
  `,tools:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      ></path>
    </svg>
  `,gateway:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,wizard:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M15 4V2"></path>
      <path d="M15 16v-2"></path>
      <path d="M8 9h2"></path>
      <path d="M20 9h2"></path>
      <path d="M17.8 11.8 19 13"></path>
      <path d="M15 9h0"></path>
      <path d="M17.8 6.2 19 5"></path>
      <path d="m3 21 9-9"></path>
      <path d="M12.2 6.2 11 5"></path>
    </svg>
  `,meta:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
    </svg>
  `,logging:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  `,browser:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <line x1="21.17" y1="8" x2="12" y2="8"></line>
      <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
      <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
    </svg>
  `,ui:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
  `,models:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
      ></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  `,bindings:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  `,broadcast:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path>
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path>
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path>
    </svg>
  `,audio:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M9 18V5l12-2v13"></path>
      <circle cx="6" cy="18" r="3"></circle>
      <circle cx="18" cy="16" r="3"></circle>
    </svg>
  `,session:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  `,cron:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  `,web:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,discovery:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `,canvasHost:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  `,talk:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="23"></line>
      <line x1="8" y1="23" x2="16" y2="23"></line>
    </svg>
  `,plugins:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M12 2v6"></path>
      <path d="m4.93 10.93 4.24 4.24"></path>
      <path d="M2 12h6"></path>
      <path d="m4.93 13.07 4.24-4.24"></path>
      <path d="M12 22v-6"></path>
      <path d="m19.07 13.07-4.24-4.24"></path>
      <path d="M22 12h-6"></path>
      <path d="m19.07 10.93-4.24 4.24"></path>
    </svg>
  `,default:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
  `},oo={env:{label:"Environment Variables",description:"Environment variables passed to the gateway process"},update:{label:"Updates",description:"Auto-update settings and release channel"},agents:{label:"Agents",description:"Agent configurations, models, and identities"},auth:{label:"Authentication",description:"API keys and authentication profiles"},channels:{label:"Channels",description:"Messaging channels (Telegram, Discord, Slack, etc.)"},messages:{label:"Messages",description:"Message handling and routing settings"},commands:{label:"Commands",description:"Custom slash commands"},hooks:{label:"Hooks",description:"Webhooks and event hooks"},skills:{label:"Skills",description:"Skill packs and capabilities"},tools:{label:"Tools",description:"Tool configurations (browser, search, etc.)"},gateway:{label:"Gateway",description:"Gateway server settings (port, auth, binding)"},wizard:{label:"Setup Wizard",description:"Setup wizard state and history"},meta:{label:"Metadata",description:"Gateway metadata and version information"},logging:{label:"Logging",description:"Log levels and output configuration"},browser:{label:"Browser",description:"Browser automation settings"},ui:{label:"UI",description:"User interface preferences"},models:{label:"Models",description:"AI model configurations and providers"},bindings:{label:"Bindings",description:"Key bindings and shortcuts"},broadcast:{label:"Broadcast",description:"Broadcast and notification settings"},audio:{label:"Audio",description:"Audio input/output settings"},session:{label:"Session",description:"Session management and persistence"},cron:{label:"Cron",description:"Scheduled tasks and automation"},web:{label:"Web",description:"Web server and API settings"},discovery:{label:"Discovery",description:"Service discovery and networking"},canvasHost:{label:"Canvas Host",description:"Canvas rendering and display"},talk:{label:"Talk",description:"Voice and speech settings"},plugins:{label:"Plugins",description:"Plugin management and extensions"}};function Ca(e){return Aa[e]??Aa.default}function Wp(e,t,n){if(!n)return!0;const s=n.toLowerCase(),i=oo[e];return e.toLowerCase().includes(s)||i&&(i.label.toLowerCase().includes(s)||i.description.toLowerCase().includes(s))?!0:qt(t,s)}function qt(e,t){if(e.title?.toLowerCase().includes(t)||e.description?.toLowerCase().includes(t)||e.enum?.some(s=>String(s).toLowerCase().includes(t)))return!0;if(e.properties){for(const[s,i]of Object.entries(e.properties))if(s.toLowerCase().includes(t)||qt(i,t))return!0}if(e.items){const s=Array.isArray(e.items)?e.items:[e.items];for(const i of s)if(i&&qt(i,t))return!0}if(e.additionalProperties&&typeof e.additionalProperties=="object"&&qt(e.additionalProperties,t))return!0;const n=e.anyOf??e.oneOf??e.allOf;if(n){for(const s of n)if(s&&qt(s,t))return!0}return!1}function Gp(e){if(!e.schema)return r`
      <div class="muted">Schema unavailable.</div>
    `;const t=e.schema,n=e.value??{};if(De(t)!=="object"||!t.properties)return r`
      <div class="callout danger">Unsupported schema. Use Raw.</div>
    `;const s=new Set(e.unsupportedPaths??[]),i=t.properties,o=e.searchQuery??"",a=e.activeSection,l=e.activeSubsection??null,u=Object.entries(i).toSorted((h,f)=>{const d=Ae([h[0]],e.uiHints)?.order??50,p=Ae([f[0]],e.uiHints)?.order??50;return d!==p?d-p:h[0].localeCompare(f[0])}).filter(([h,f])=>!(a&&h!==a||o&&!Wp(h,f,o)));let g=null;if(a&&l&&u.length===1){const h=u[0]?.[1];h&&De(h)==="object"&&h.properties&&h.properties[l]&&(g={sectionKey:a,subsectionKey:l,schema:h.properties[l]})}return u.length===0?r`
      <div class="config-empty">
        <div class="config-empty__icon">${Y.search}</div>
        <div class="config-empty__text">
          ${o?`No settings match "${o}"`:"No settings in this section"}
        </div>
      </div>
    `:r`
    <div class="config-form config-form--modern">
      ${g?(()=>{const{sectionKey:h,subsectionKey:f,schema:d}=g,p=Ae([h,f],e.uiHints),m=p?.label??d.title??Ge(f),S=p?.help??d.description??"",k=n[h],w=k&&typeof k=="object"?k[f]:void 0,A=`config-section-${h}-${f}`;return r`
              <section class="config-section-card" id=${A}>
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${Ca(h)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${m}</h3>
                    ${S?r`<p class="config-section-card__desc">${S}</p>`:v}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${We({schema:d,value:w,path:[h,f],hints:e.uiHints,unsupported:s,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})():u.map(([h,f])=>{const d=oo[h]??{label:h.charAt(0).toUpperCase()+h.slice(1),description:f.description??""};return r`
              <section class="config-section-card" id="config-section-${h}">
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${Ca(h)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${d.label}</h3>
                    ${d.description?r`<p class="config-section-card__desc">${d.description}</p>`:v}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${We({schema:f,value:n[h],path:[h],hints:e.uiHints,unsupported:s,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})}
    </div>
  `}const qp=new Set(["title","description","default","nullable"]);function Vp(e){return Object.keys(e??{}).filter(n=>!qp.has(n)).length===0}function Al(e){const t=e.filter(i=>i!=null),n=t.length!==e.length,s=[];for(const i of t)s.some(o=>Object.is(o,i))||s.push(i);return{enumValues:s,nullable:n}}function Cl(e){return!e||typeof e!="object"?{schema:null,unsupportedPaths:["<root>"]}:Jt(e,[])}function Jt(e,t){const n=new Set,s={...e},i=ps(t)||"<root>";if(e.anyOf||e.oneOf||e.allOf){const l=Qp(e,t);return l||{schema:e,unsupportedPaths:[i]}}const o=Array.isArray(e.type)&&e.type.includes("null"),a=De(e)??(e.properties||e.additionalProperties?"object":void 0);if(s.type=a??e.type,s.nullable=o||e.nullable,s.enum){const{enumValues:l,nullable:c}=Al(s.enum);s.enum=l,c&&(s.nullable=!0),l.length===0&&n.add(i)}if(a==="object"){const l=e.properties??{},c={};for(const[u,g]of Object.entries(l)){const h=Jt(g,[...t,u]);h.schema&&(c[u]=h.schema);for(const f of h.unsupportedPaths)n.add(f)}if(s.properties=c,e.additionalProperties===!0)n.add(i);else if(e.additionalProperties===!1)s.additionalProperties=!1;else if(e.additionalProperties&&typeof e.additionalProperties=="object"&&!Vp(e.additionalProperties)){const u=Jt(e.additionalProperties,[...t,"*"]);s.additionalProperties=u.schema??e.additionalProperties,u.unsupportedPaths.length>0&&n.add(i)}}else if(a==="array"){const l=Array.isArray(e.items)?e.items[0]:e.items;if(!l)n.add(i);else{const c=Jt(l,[...t,"*"]);s.items=c.schema??l,c.unsupportedPaths.length>0&&n.add(i)}}else a!=="string"&&a!=="number"&&a!=="integer"&&a!=="boolean"&&!s.enum&&n.add(i);return{schema:s,unsupportedPaths:Array.from(n)}}function Qp(e,t){if(e.allOf)return null;const n=e.anyOf??e.oneOf;if(!n)return null;const s=[],i=[];let o=!1;for(const l of n){if(!l||typeof l!="object")return null;if(Array.isArray(l.enum)){const{enumValues:c,nullable:u}=Al(l.enum);s.push(...c),u&&(o=!0);continue}if("const"in l){if(l.const==null){o=!0;continue}s.push(l.const);continue}if(De(l)==="null"){o=!0;continue}i.push(l)}if(s.length>0&&i.length===0){const l=[];for(const c of s)l.some(u=>Object.is(u,c))||l.push(c);return{schema:{...e,enum:l,nullable:o,anyOf:void 0,oneOf:void 0,allOf:void 0},unsupportedPaths:[]}}if(i.length===1){const l=Jt(i[0],t);return l.schema&&(l.schema.nullable=o||l.schema.nullable),l}const a=new Set(["string","number","integer","boolean"]);return i.length>0&&s.length===0&&i.every(l=>l.type&&a.has(String(l.type)))?{schema:{...e,nullable:o},unsupportedPaths:[]}:null}function Yp(e,t){let n=e;for(const s of t){if(!n)return null;const i=De(n);if(i==="object"){const o=n.properties??{};if(typeof s=="string"&&o[s]){n=o[s];continue}const a=n.additionalProperties;if(typeof s=="string"&&a&&typeof a=="object"){n=a;continue}return null}if(i==="array"){if(typeof s!="number")return null;n=(Array.isArray(n.items)?n.items[0]:n.items)??null;continue}return null}return n}function Zp(e,t){const s=(e.channels??{})[t],i=e[t];return(s&&typeof s=="object"?s:null)??(i&&typeof i=="object"?i:null)??{}}const Jp=["groupPolicy","streamMode","dmPolicy"];function Xp(e){if(e==null)return"n/a";if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return String(e);try{return JSON.stringify(e)}catch{return"n/a"}}function eh(e){const t=Jp.flatMap(n=>n in e?[[n,e[n]]]:[]);return t.length===0?null:r`
    <div class="status-list" style="margin-top: 12px;">
      ${t.map(([n,s])=>r`
          <div>
            <span class="label">${n}</span>
            <span>${Xp(s)}</span>
          </div>
        `)}
    </div>
  `}function th(e){const t=Cl(e.schema),n=t.schema;if(!n)return r`
      <div class="callout danger">Schema unavailable. Use Raw.</div>
    `;const s=Yp(n,["channels",e.channelId]);if(!s)return r`
      <div class="callout danger">Channel config schema unavailable.</div>
    `;const i=e.configValue??{},o=Zp(i,e.channelId);return r`
    <div class="config-form">
      ${We({schema:s,value:o,path:["channels",e.channelId],hints:e.uiHints,unsupported:new Set(t.unsupportedPaths),disabled:e.disabled,showLabel:!1,onPatch:e.onPatch})}
    </div>
    ${eh(o)}
  `}function qe(e){const{channelId:t,props:n}=e,s=n.configSaving||n.configSchemaLoading;return r`
    <div style="margin-top: 16px;">
      ${n.configSchemaLoading?r`
              <div class="muted">Loading config schema…</div>
            `:th({channelId:t,configValue:n.configForm,schema:n.configSchema,uiHints:n.configUiHints,disabled:s,onPatch:n.onConfigPatch})}
      <div class="row" style="margin-top: 12px;">
        <button
          class="btn primary"
          ?disabled=${s||!n.configFormDirty}
          @click=${()=>n.onConfigSave()}
        >
          ${n.configSaving?"Saving…":"Save"}
        </button>
        <button
          class="btn"
          ?disabled=${s}
          @click=${()=>n.onConfigReload()}
        >
          Reload
        </button>
      </div>
    </div>
  `}function nh(e){const{props:t,discord:n,accountCountLabel:s}=e;return r`
    <div class="card">
      <div class="card-title">Discord</div>
      <div class="card-sub">Bot status and channel configuration.</div>
      ${s}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">Configured</span>
          <span>${n?.configured?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Running</span>
          <span>${n?.running?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Last start</span>
          <span>${n?.lastStartAt?V(n.lastStartAt):"n/a"}</span>
        </div>
        <div>
          <span class="label">Last probe</span>
          <span>${n?.lastProbeAt?V(n.lastProbeAt):"n/a"}</span>
        </div>
      </div>

      ${n?.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:v}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            Probe ${n.probe.ok?"ok":"failed"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:v}

      ${qe({channelId:"discord",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Probe
        </button>
      </div>
    </div>
  `}function sh(e){const{props:t,googleChat:n,accountCountLabel:s}=e;return r`
    <div class="card">
      <div class="card-title">Google Chat</div>
      <div class="card-sub">Chat API webhook status and channel configuration.</div>
      ${s}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">Configured</span>
          <span>${n?n.configured?"Yes":"No":"n/a"}</span>
        </div>
        <div>
          <span class="label">Running</span>
          <span>${n?n.running?"Yes":"No":"n/a"}</span>
        </div>
        <div>
          <span class="label">Credential</span>
          <span>${n?.credentialSource??"n/a"}</span>
        </div>
        <div>
          <span class="label">Audience</span>
          <span>
            ${n?.audienceType?`${n.audienceType}${n.audience?` · ${n.audience}`:""}`:"n/a"}
          </span>
        </div>
        <div>
          <span class="label">Last start</span>
          <span>${n?.lastStartAt?V(n.lastStartAt):"n/a"}</span>
        </div>
        <div>
          <span class="label">Last probe</span>
          <span>${n?.lastProbeAt?V(n.lastProbeAt):"n/a"}</span>
        </div>
      </div>

      ${n?.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:v}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            Probe ${n.probe.ok?"ok":"failed"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:v}

      ${qe({channelId:"googlechat",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Probe
        </button>
      </div>
    </div>
  `}function ih(e){const{props:t,imessage:n,accountCountLabel:s}=e;return r`
    <div class="card">
      <div class="card-title">iMessage</div>
      <div class="card-sub">macOS bridge status and channel configuration.</div>
      ${s}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">Configured</span>
          <span>${n?.configured?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Running</span>
          <span>${n?.running?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Last start</span>
          <span>${n?.lastStartAt?V(n.lastStartAt):"n/a"}</span>
        </div>
        <div>
          <span class="label">Last probe</span>
          <span>${n?.lastProbeAt?V(n.lastProbeAt):"n/a"}</span>
        </div>
      </div>

      ${n?.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:v}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            Probe ${n.probe.ok?"ok":"failed"} ·
            ${n.probe.error??""}
          </div>`:v}

      ${qe({channelId:"imessage",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Probe
        </button>
      </div>
    </div>
  `}function Ta(e){return e?e.length<=20?e:`${e.slice(0,8)}...${e.slice(-8)}`:"n/a"}function oh(e){const{props:t,nostr:n,nostrAccounts:s,accountCountLabel:i,profileFormState:o,profileFormCallbacks:a,onEditProfile:l}=e,c=s[0],u=n?.configured??c?.configured??!1,g=n?.running??c?.running??!1,h=n?.publicKey??c?.publicKey,f=n?.lastStartAt??c?.lastStartAt??null,d=n?.lastError??c?.lastError??null,p=s.length>1,m=o!=null,S=w=>{const A=w.publicKey,C=w.profile,_=C?.displayName??C?.name??w.name??w.accountId;return r`
      <div class="account-card">
        <div class="account-card-header">
          <div class="account-card-title">${_}</div>
          <div class="account-card-id">${w.accountId}</div>
        </div>
        <div class="status-list account-card-status">
          <div>
            <span class="label">Running</span>
            <span>${w.running?"Yes":"No"}</span>
          </div>
          <div>
            <span class="label">Configured</span>
            <span>${w.configured?"Yes":"No"}</span>
          </div>
          <div>
            <span class="label">Public Key</span>
            <span class="monospace" title="${A??""}">${Ta(A)}</span>
          </div>
          <div>
            <span class="label">Last inbound</span>
            <span>${w.lastInboundAt?V(w.lastInboundAt):"n/a"}</span>
          </div>
          ${w.lastError?r`
                <div class="account-card-error">${w.lastError}</div>
              `:v}
        </div>
      </div>
    `},k=()=>{if(m&&a)return Kc({state:o,callbacks:a,accountId:s[0]?.accountId??"default"});const w=c?.profile??n?.profile,{name:A,displayName:C,about:_,picture:T,nip05:M}=w??{},U=A||C||_||T||M;return r`
      <div style="margin-top: 16px; padding: 12px; background: var(--bg-secondary); border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div style="font-weight: 500;">Profile</div>
          ${u?r`
                <button
                  class="btn btn-sm"
                  @click=${l}
                  style="font-size: 12px; padding: 4px 8px;"
                >
                  Edit Profile
                </button>
              `:v}
        </div>
        ${U?r`
              <div class="status-list">
                ${T?r`
                      <div style="margin-bottom: 8px;">
                        <img
                          src=${T}
                          alt="Profile picture"
                          style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border-color);"
                          @error=${Z=>{Z.target.style.display="none"}}
                        />
                      </div>
                    `:v}
                ${A?r`<div><span class="label">Name</span><span>${A}</span></div>`:v}
                ${C?r`<div><span class="label">Display Name</span><span>${C}</span></div>`:v}
                ${_?r`<div><span class="label">About</span><span style="max-width: 300px; overflow: hidden; text-overflow: ellipsis;">${_}</span></div>`:v}
                ${M?r`<div><span class="label">NIP-05</span><span>${M}</span></div>`:v}
              </div>
            `:r`
                <div style="color: var(--text-muted); font-size: 13px">
                  No profile set. Click "Edit Profile" to add your name, bio, and avatar.
                </div>
              `}
      </div>
    `};return r`
    <div class="card">
      <div class="card-title">Nostr</div>
      <div class="card-sub">Decentralized DMs via Nostr relays (NIP-04).</div>
      ${i}

      ${p?r`
            <div class="account-card-list">
              ${s.map(w=>S(w))}
            </div>
          `:r`
            <div class="status-list" style="margin-top: 16px;">
              <div>
                <span class="label">Configured</span>
                <span>${u?"Yes":"No"}</span>
              </div>
              <div>
                <span class="label">Running</span>
                <span>${g?"Yes":"No"}</span>
              </div>
              <div>
                <span class="label">Public Key</span>
                <span class="monospace" title="${h??""}"
                  >${Ta(h)}</span
                >
              </div>
              <div>
                <span class="label">Last start</span>
                <span>${f?V(f):"n/a"}</span>
              </div>
            </div>
          `}

      ${d?r`<div class="callout danger" style="margin-top: 12px;">${d}</div>`:v}

      ${k()}

      ${qe({channelId:"nostr",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!1)}>Refresh</button>
      </div>
    </div>
  `}function ah(e,t){const n=t.snapshot,s=n?.channels;if(!n||!s)return!1;const i=s[e],o=typeof i?.configured=="boolean"&&i.configured,a=typeof i?.running=="boolean"&&i.running,l=typeof i?.connected=="boolean"&&i.connected,u=(n.channelAccounts?.[e]??[]).some(g=>g.configured||g.running||g.connected);return o||a||l||u}function rh(e,t){return t?.[e]?.length??0}function Tl(e,t){const n=rh(e,t);return n<2?v:r`<div class="account-count">Accounts (${n})</div>`}function lh(e){const{props:t,signal:n,accountCountLabel:s}=e;return r`
    <div class="card">
      <div class="card-title">Signal</div>
      <div class="card-sub">signal-cli status and channel configuration.</div>
      ${s}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">Configured</span>
          <span>${n?.configured?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Running</span>
          <span>${n?.running?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Base URL</span>
          <span>${n?.baseUrl??"n/a"}</span>
        </div>
        <div>
          <span class="label">Last start</span>
          <span>${n?.lastStartAt?V(n.lastStartAt):"n/a"}</span>
        </div>
        <div>
          <span class="label">Last probe</span>
          <span>${n?.lastProbeAt?V(n.lastProbeAt):"n/a"}</span>
        </div>
      </div>

      ${n?.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:v}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            Probe ${n.probe.ok?"ok":"failed"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:v}

      ${qe({channelId:"signal",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Probe
        </button>
      </div>
    </div>
  `}function ch(e){const{props:t,slack:n,accountCountLabel:s}=e;return r`
    <div class="card">
      <div class="card-title">Slack</div>
      <div class="card-sub">Socket mode status and channel configuration.</div>
      ${s}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">Configured</span>
          <span>${n?.configured?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Running</span>
          <span>${n?.running?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Last start</span>
          <span>${n?.lastStartAt?V(n.lastStartAt):"n/a"}</span>
        </div>
        <div>
          <span class="label">Last probe</span>
          <span>${n?.lastProbeAt?V(n.lastProbeAt):"n/a"}</span>
        </div>
      </div>

      ${n?.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:v}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            Probe ${n.probe.ok?"ok":"failed"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:v}

      ${qe({channelId:"slack",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Probe
        </button>
      </div>
    </div>
  `}function dh(e){const{props:t,telegram:n,telegramAccounts:s,accountCountLabel:i}=e,o=s.length>1,a=l=>{const u=l.probe?.bot?.username,g=l.name||l.accountId;return r`
      <div class="account-card">
        <div class="account-card-header">
          <div class="account-card-title">
            ${u?`@${u}`:g}
          </div>
          <div class="account-card-id">${l.accountId}</div>
        </div>
        <div class="status-list account-card-status">
          <div>
            <span class="label">Running</span>
            <span>${l.running?"Yes":"No"}</span>
          </div>
          <div>
            <span class="label">Configured</span>
            <span>${l.configured?"Yes":"No"}</span>
          </div>
          <div>
            <span class="label">Last inbound</span>
            <span>${l.lastInboundAt?V(l.lastInboundAt):"n/a"}</span>
          </div>
          ${l.lastError?r`
                <div class="account-card-error">
                  ${l.lastError}
                </div>
              `:v}
        </div>
      </div>
    `};return r`
    <div class="card">
      <div class="card-title">Telegram</div>
      <div class="card-sub">Bot status and channel configuration.</div>
      ${i}

      ${o?r`
            <div class="account-card-list">
              ${s.map(l=>a(l))}
            </div>
          `:r`
            <div class="status-list" style="margin-top: 16px;">
              <div>
                <span class="label">Configured</span>
                <span>${n?.configured?"Yes":"No"}</span>
              </div>
              <div>
                <span class="label">Running</span>
                <span>${n?.running?"Yes":"No"}</span>
              </div>
              <div>
                <span class="label">Mode</span>
                <span>${n?.mode??"n/a"}</span>
              </div>
              <div>
                <span class="label">Last start</span>
                <span>${n?.lastStartAt?V(n.lastStartAt):"n/a"}</span>
              </div>
              <div>
                <span class="label">Last probe</span>
                <span>${n?.lastProbeAt?V(n.lastProbeAt):"n/a"}</span>
              </div>
            </div>
          `}

      ${n?.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:v}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            Probe ${n.probe.ok?"ok":"failed"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:v}

      ${qe({channelId:"telegram",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Probe
        </button>
      </div>
    </div>
  `}function uh(e){const{props:t,whatsapp:n,accountCountLabel:s}=e;return r`
    <div class="card">
      <div class="card-title">WhatsApp</div>
      <div class="card-sub">Link WhatsApp Web and monitor connection health.</div>
      ${s}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">Configured</span>
          <span>${n?.configured?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Linked</span>
          <span>${n?.linked?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Running</span>
          <span>${n?.running?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Connected</span>
          <span>${n?.connected?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Last connect</span>
          <span>
            ${n?.lastConnectedAt?V(n.lastConnectedAt):"n/a"}
          </span>
        </div>
        <div>
          <span class="label">Last message</span>
          <span>
            ${n?.lastMessageAt?V(n.lastMessageAt):"n/a"}
          </span>
        </div>
        <div>
          <span class="label">Auth age</span>
          <span>
            ${n?.authAgeMs!=null?Hi(n.authAgeMs):"n/a"}
          </span>
        </div>
      </div>

      ${n?.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:v}

      ${t.whatsappMessage?r`<div class="callout" style="margin-top: 12px;">
            ${t.whatsappMessage}
          </div>`:v}

      ${t.whatsappQrDataUrl?r`<div class="qr-wrap">
            <img src=${t.whatsappQrDataUrl} alt="WhatsApp QR" />
          </div>`:v}

      <div class="row" style="margin-top: 14px; flex-wrap: wrap;">
        <button
          class="btn primary"
          ?disabled=${t.whatsappBusy}
          @click=${()=>t.onWhatsAppStart(!1)}
        >
          ${t.whatsappBusy?"Working…":"Show QR"}
        </button>
        <button
          class="btn"
          ?disabled=${t.whatsappBusy}
          @click=${()=>t.onWhatsAppStart(!0)}
        >
          Relink
        </button>
        <button
          class="btn"
          ?disabled=${t.whatsappBusy}
          @click=${()=>t.onWhatsAppWait()}
        >
          Wait for scan
        </button>
        <button
          class="btn danger"
          ?disabled=${t.whatsappBusy}
          @click=${()=>t.onWhatsAppLogout()}
        >
          Logout
        </button>
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Refresh
        </button>
      </div>

      ${qe({channelId:"whatsapp",props:t})}
    </div>
  `}function gh(e){const t=e.snapshot?.channels,n=t?.whatsapp??void 0,s=t?.telegram??void 0,i=t?.discord??null,o=t?.googlechat??null,a=t?.slack??null,l=t?.signal??null,c=t?.imessage??null,u=t?.nostr??null,h=ph(e.snapshot).map((f,d)=>({key:f,enabled:ah(f,e),order:d})).toSorted((f,d)=>f.enabled!==d.enabled?f.enabled?-1:1:f.order-d.order);return r`
    <section class="grid grid-cols-2">
      ${h.map(f=>hh(f.key,e,{whatsapp:n,telegram:s,discord:i,googlechat:o,slack:a,signal:l,imessage:c,nostr:u,channelAccounts:e.snapshot?.channelAccounts??null}))}
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Channel health</div>
          <div class="card-sub">Channel status snapshots from the gateway.</div>
        </div>
        <div class="muted">${e.lastSuccessAt?V(e.lastSuccessAt):"n/a"}</div>
      </div>
      ${e.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${e.lastError}
          </div>`:v}
      <pre class="code-block" style="margin-top: 12px;">
${e.snapshot?JSON.stringify(e.snapshot,null,2):"No snapshot yet."}
      </pre>
    </section>
  `}function ph(e){return e?.channelMeta?.length?e.channelMeta.map(t=>t.id):e?.channelOrder?.length?e.channelOrder:["whatsapp","telegram","discord","googlechat","slack","signal","imessage","nostr"]}function hh(e,t,n){const s=Tl(e,n.channelAccounts);switch(e){case"whatsapp":return uh({props:t,whatsapp:n.whatsapp,accountCountLabel:s});case"telegram":return dh({props:t,telegram:n.telegram,telegramAccounts:n.channelAccounts?.telegram??[],accountCountLabel:s});case"discord":return nh({props:t,discord:n.discord,accountCountLabel:s});case"googlechat":return sh({props:t,googleChat:n.googlechat,accountCountLabel:s});case"slack":return ch({props:t,slack:n.slack,accountCountLabel:s});case"signal":return lh({props:t,signal:n.signal,accountCountLabel:s});case"imessage":return ih({props:t,imessage:n.imessage,accountCountLabel:s});case"nostr":{const i=n.channelAccounts?.nostr??[],o=i[0],a=o?.accountId??"default",l=o?.profile??null,c=t.nostrProfileAccountId===a?t.nostrProfileFormState:null,u=c?{onFieldChange:t.onNostrProfileFieldChange,onSave:t.onNostrProfileSave,onImport:t.onNostrProfileImport,onCancel:t.onNostrProfileCancel,onToggleAdvanced:t.onNostrProfileToggleAdvanced}:null;return oh({props:t,nostr:n.nostr,nostrAccounts:i,accountCountLabel:s,profileFormState:c,profileFormCallbacks:u,onEditProfile:()=>t.onNostrProfileEdit(a,l)})}default:return fh(e,t,n.channelAccounts??{})}}function fh(e,t,n){const s=mh(t.snapshot,e),i=t.snapshot?.channels?.[e],o=typeof i?.configured=="boolean"?i.configured:void 0,a=typeof i?.running=="boolean"?i.running:void 0,l=typeof i?.connected=="boolean"?i.connected:void 0,c=typeof i?.lastError=="string"?i.lastError:void 0,u=n[e]??[],g=Tl(e,n);return r`
    <div class="card">
      <div class="card-title">${s}</div>
      <div class="card-sub">Channel status and configuration.</div>
      ${g}

      ${u.length>0?r`
            <div class="account-card-list">
              ${u.map(h=>$h(h))}
            </div>
          `:r`
            <div class="status-list" style="margin-top: 16px;">
              <div>
                <span class="label">Configured</span>
                <span>${o==null?"n/a":o?"Yes":"No"}</span>
              </div>
              <div>
                <span class="label">Running</span>
                <span>${a==null?"n/a":a?"Yes":"No"}</span>
              </div>
              <div>
                <span class="label">Connected</span>
                <span>${l==null?"n/a":l?"Yes":"No"}</span>
              </div>
            </div>
          `}

      ${c?r`<div class="callout danger" style="margin-top: 12px;">
            ${c}
          </div>`:v}

      ${qe({channelId:e,props:t})}
    </div>
  `}function vh(e){return e?.channelMeta?.length?Object.fromEntries(e.channelMeta.map(t=>[t.id,t])):{}}function mh(e,t){return vh(e)[t]?.label??e?.channelLabels?.[t]??t}const bh=600*1e3;function _l(e){return e.lastInboundAt?Date.now()-e.lastInboundAt<bh:!1}function yh(e){return e.running?"Yes":_l(e)?"Active":"No"}function xh(e){return e.connected===!0?"Yes":e.connected===!1?"No":_l(e)?"Active":"n/a"}function $h(e){const t=yh(e),n=xh(e);return r`
    <div class="account-card">
      <div class="account-card-header">
        <div class="account-card-title">${e.name||e.accountId}</div>
        <div class="account-card-id">${e.accountId}</div>
      </div>
      <div class="status-list account-card-status">
        <div>
          <span class="label">Running</span>
          <span>${t}</span>
        </div>
        <div>
          <span class="label">Configured</span>
          <span>${e.configured?"Yes":"No"}</span>
        </div>
        <div>
          <span class="label">Connected</span>
          <span>${n}</span>
        </div>
        <div>
          <span class="label">Last inbound</span>
          <span>${e.lastInboundAt?V(e.lastInboundAt):"n/a"}</span>
        </div>
        ${e.lastError?r`
              <div class="account-card-error">
                ${e.lastError}
              </div>
            `:v}
      </div>
    </div>
  `}const Xt=(e,t)=>{const n=e._$AN;if(n===void 0)return!1;for(const s of n)s._$AO?.(t,!1),Xt(s,t);return!0},Vn=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},Ll=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Sh(t)}};function wh(e){this._$AN!==void 0?(Vn(this),this._$AM=e,Ll(this)):this._$AM=e}function kh(e,t=!1,n=0){const s=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(t)if(Array.isArray(s))for(let o=n;o<s.length;o++)Xt(s[o],!1),Vn(s[o]);else s!=null&&(Xt(s,!1),Vn(s));else Xt(this,e)}const Sh=e=>{e.type==to.CHILD&&(e._$AP??=kh,e._$AQ??=wh)};class Ah extends so{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,n,s){super._$AT(t,n,s),Ll(this),this.isConnected=t._$AU}_$AO(t,n=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),n&&(Xt(this,t),Vn(this))}setValue(t){if(Dg(this._$Ct))this._$Ct._$AI(t,this);else{const n=[...this._$Ct._$AH];n[this._$Ci]=t,this._$Ct._$AI(n,this,0)}}disconnected(){}reconnected(){}}const zs=new WeakMap,Ch=no(class extends Ah{render(e){return v}update(e,[t]){const n=t!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),v}rt(e){if(this.isConnected||(e=void 0),typeof this.G=="function"){const t=this.ht??globalThis;let n=zs.get(t);n===void 0&&(n=new WeakMap,zs.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return typeof this.G=="function"?zs.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});class mi extends so{constructor(t){if(super(t),this.it=v,t.type!==to.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===v||t==null)return this._t=void 0,this.it=t;if(t===Ye)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}mi.directiveName="unsafeHTML",mi.resultType=1;const bi=no(mi);const{entries:El,setPrototypeOf:_a,isFrozen:Th,getPrototypeOf:_h,getOwnPropertyDescriptor:Lh}=Object;let{freeze:ve,seal:Ce,create:yi}=Object,{apply:xi,construct:$i}=typeof Reflect<"u"&&Reflect;ve||(ve=function(t){return t});Ce||(Ce=function(t){return t});xi||(xi=function(t,n){for(var s=arguments.length,i=new Array(s>2?s-2:0),o=2;o<s;o++)i[o-2]=arguments[o];return t.apply(n,i)});$i||($i=function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return new t(...s)});const _n=me(Array.prototype.forEach),Eh=me(Array.prototype.lastIndexOf),La=me(Array.prototype.pop),zt=me(Array.prototype.push),Ih=me(Array.prototype.splice),Bn=me(String.prototype.toLowerCase),Us=me(String.prototype.toString),Hs=me(String.prototype.match),Ut=me(String.prototype.replace),Mh=me(String.prototype.indexOf),Rh=me(String.prototype.trim),Te=me(Object.prototype.hasOwnProperty),he=me(RegExp.prototype.test),Ht=Ph(TypeError);function me(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return xi(e,t,s)}}function Ph(e){return function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];return $i(e,n)}}function j(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Bn;_a&&_a(e,null);let s=t.length;for(;s--;){let i=t[s];if(typeof i=="string"){const o=n(i);o!==i&&(Th(t)||(t[s]=o),i=o)}e[i]=!0}return e}function Dh(e){for(let t=0;t<e.length;t++)Te(e,t)||(e[t]=null);return e}function Re(e){const t=yi(null);for(const[n,s]of El(e))Te(e,n)&&(Array.isArray(s)?t[n]=Dh(s):s&&typeof s=="object"&&s.constructor===Object?t[n]=Re(s):t[n]=s);return t}function Kt(e,t){for(;e!==null;){const s=Lh(e,t);if(s){if(s.get)return me(s.get);if(typeof s.value=="function")return me(s.value)}e=_h(e)}function n(){return null}return n}const Ea=ve(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ks=ve(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),js=ve(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Nh=ve(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ws=ve(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Fh=ve(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ia=ve(["#text"]),Ma=ve(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Gs=ve(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ra=ve(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ln=ve(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Oh=Ce(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Bh=Ce(/<%[\w\W]*|[\w\W]*%>/gm),zh=Ce(/\$\{[\w\W]*/gm),Uh=Ce(/^data-[\-\w.\u00B7-\uFFFF]+$/),Hh=Ce(/^aria-[\-\w]+$/),Il=Ce(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Kh=Ce(/^(?:\w+script|data):/i),jh=Ce(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ml=Ce(/^html$/i),Wh=Ce(/^[a-z][.\w]*(-[.\w]+)+$/i);var Pa=Object.freeze({__proto__:null,ARIA_ATTR:Hh,ATTR_WHITESPACE:jh,CUSTOM_ELEMENT:Wh,DATA_ATTR:Uh,DOCTYPE_NAME:Ml,ERB_EXPR:Bh,IS_ALLOWED_URI:Il,IS_SCRIPT_OR_DATA:Kh,MUSTACHE_EXPR:Oh,TMPLIT_EXPR:zh});const jt={element:1,text:3,progressingInstruction:7,comment:8,document:9},Gh=function(){return typeof window>"u"?null:window},qh=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let s=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(s=n.getAttribute(i));const o="dompurify"+(s?"#"+s:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Da=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Rl(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Gh();const t=z=>Rl(z);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==jt.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const s=n,i=s.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:l,Element:c,NodeFilter:u,NamedNodeMap:g=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:h,DOMParser:f,trustedTypes:d}=e,p=c.prototype,m=Kt(p,"cloneNode"),S=Kt(p,"remove"),k=Kt(p,"nextSibling"),w=Kt(p,"childNodes"),A=Kt(p,"parentNode");if(typeof a=="function"){const z=n.createElement("template");z.content&&z.content.ownerDocument&&(n=z.content.ownerDocument)}let C,_="";const{implementation:T,createNodeIterator:M,createDocumentFragment:U,getElementsByTagName:Z}=n,{importNode:ie}=s;let N=Da();t.isSupported=typeof El=="function"&&typeof A=="function"&&T&&T.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:H,ERB_EXPR:ce,TMPLIT_EXPR:L,DATA_ATTR:B,ARIA_ATTR:oe,IS_SCRIPT_OR_DATA:ae,ATTR_WHITESPACE:X,CUSTOM_ELEMENT:ne}=Pa;let{IS_ALLOWED_URI:I}=Pa,R=null;const P=j({},[...Ea,...Ks,...js,...Ws,...Ia]);let K=null;const xe=j({},[...Ma,...Gs,...Ra,...Ln]);let Q=Object.seal(yi(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ke=null,ee=null;const pe=Object.seal(yi(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Ne=!0,Fe=!0,et=!1,$o=!0,$t=!1,fn=!0,tt=!1,ms=!1,bs=!1,wt=!1,vn=!1,mn=!1,wo=!0,ko=!1;const nc="user-content-";let ys=!0,Nt=!1,kt={},Ee=null;const xs=j({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let So=null;const Ao=j({},["audio","video","img","source","image","track"]);let $s=null;const Co=j({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),bn="http://www.w3.org/1998/Math/MathML",yn="http://www.w3.org/2000/svg",Oe="http://www.w3.org/1999/xhtml";let St=Oe,ws=!1,ks=null;const sc=j({},[bn,yn,Oe],Us);let xn=j({},["mi","mo","mn","ms","mtext"]),$n=j({},["annotation-xml"]);const ic=j({},["title","style","font","a","script"]);let Ft=null;const oc=["application/xhtml+xml","text/html"],ac="text/html";let se=null,At=null;const rc=n.createElement("form"),To=function(b){return b instanceof RegExp||b instanceof Function},Ss=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(At&&At===b)){if((!b||typeof b!="object")&&(b={}),b=Re(b),Ft=oc.indexOf(b.PARSER_MEDIA_TYPE)===-1?ac:b.PARSER_MEDIA_TYPE,se=Ft==="application/xhtml+xml"?Us:Bn,R=Te(b,"ALLOWED_TAGS")?j({},b.ALLOWED_TAGS,se):P,K=Te(b,"ALLOWED_ATTR")?j({},b.ALLOWED_ATTR,se):xe,ks=Te(b,"ALLOWED_NAMESPACES")?j({},b.ALLOWED_NAMESPACES,Us):sc,$s=Te(b,"ADD_URI_SAFE_ATTR")?j(Re(Co),b.ADD_URI_SAFE_ATTR,se):Co,So=Te(b,"ADD_DATA_URI_TAGS")?j(Re(Ao),b.ADD_DATA_URI_TAGS,se):Ao,Ee=Te(b,"FORBID_CONTENTS")?j({},b.FORBID_CONTENTS,se):xs,ke=Te(b,"FORBID_TAGS")?j({},b.FORBID_TAGS,se):Re({}),ee=Te(b,"FORBID_ATTR")?j({},b.FORBID_ATTR,se):Re({}),kt=Te(b,"USE_PROFILES")?b.USE_PROFILES:!1,Ne=b.ALLOW_ARIA_ATTR!==!1,Fe=b.ALLOW_DATA_ATTR!==!1,et=b.ALLOW_UNKNOWN_PROTOCOLS||!1,$o=b.ALLOW_SELF_CLOSE_IN_ATTR!==!1,$t=b.SAFE_FOR_TEMPLATES||!1,fn=b.SAFE_FOR_XML!==!1,tt=b.WHOLE_DOCUMENT||!1,wt=b.RETURN_DOM||!1,vn=b.RETURN_DOM_FRAGMENT||!1,mn=b.RETURN_TRUSTED_TYPE||!1,bs=b.FORCE_BODY||!1,wo=b.SANITIZE_DOM!==!1,ko=b.SANITIZE_NAMED_PROPS||!1,ys=b.KEEP_CONTENT!==!1,Nt=b.IN_PLACE||!1,I=b.ALLOWED_URI_REGEXP||Il,St=b.NAMESPACE||Oe,xn=b.MATHML_TEXT_INTEGRATION_POINTS||xn,$n=b.HTML_INTEGRATION_POINTS||$n,Q=b.CUSTOM_ELEMENT_HANDLING||{},b.CUSTOM_ELEMENT_HANDLING&&To(b.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(Q.tagNameCheck=b.CUSTOM_ELEMENT_HANDLING.tagNameCheck),b.CUSTOM_ELEMENT_HANDLING&&To(b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(Q.attributeNameCheck=b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),b.CUSTOM_ELEMENT_HANDLING&&typeof b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(Q.allowCustomizedBuiltInElements=b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),$t&&(Fe=!1),vn&&(wt=!0),kt&&(R=j({},Ia),K=[],kt.html===!0&&(j(R,Ea),j(K,Ma)),kt.svg===!0&&(j(R,Ks),j(K,Gs),j(K,Ln)),kt.svgFilters===!0&&(j(R,js),j(K,Gs),j(K,Ln)),kt.mathMl===!0&&(j(R,Ws),j(K,Ra),j(K,Ln))),b.ADD_TAGS&&(typeof b.ADD_TAGS=="function"?pe.tagCheck=b.ADD_TAGS:(R===P&&(R=Re(R)),j(R,b.ADD_TAGS,se))),b.ADD_ATTR&&(typeof b.ADD_ATTR=="function"?pe.attributeCheck=b.ADD_ATTR:(K===xe&&(K=Re(K)),j(K,b.ADD_ATTR,se))),b.ADD_URI_SAFE_ATTR&&j($s,b.ADD_URI_SAFE_ATTR,se),b.FORBID_CONTENTS&&(Ee===xs&&(Ee=Re(Ee)),j(Ee,b.FORBID_CONTENTS,se)),b.ADD_FORBID_CONTENTS&&(Ee===xs&&(Ee=Re(Ee)),j(Ee,b.ADD_FORBID_CONTENTS,se)),ys&&(R["#text"]=!0),tt&&j(R,["html","head","body"]),R.table&&(j(R,["tbody"]),delete ke.tbody),b.TRUSTED_TYPES_POLICY){if(typeof b.TRUSTED_TYPES_POLICY.createHTML!="function")throw Ht('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof b.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Ht('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');C=b.TRUSTED_TYPES_POLICY,_=C.createHTML("")}else C===void 0&&(C=qh(d,i)),C!==null&&typeof _=="string"&&(_=C.createHTML(""));ve&&ve(b),At=b}},_o=j({},[...Ks,...js,...Nh]),Lo=j({},[...Ws,...Fh]),lc=function(b){let E=A(b);(!E||!E.tagName)&&(E={namespaceURI:St,tagName:"template"});const F=Bn(b.tagName),J=Bn(E.tagName);return ks[b.namespaceURI]?b.namespaceURI===yn?E.namespaceURI===Oe?F==="svg":E.namespaceURI===bn?F==="svg"&&(J==="annotation-xml"||xn[J]):!!_o[F]:b.namespaceURI===bn?E.namespaceURI===Oe?F==="math":E.namespaceURI===yn?F==="math"&&$n[J]:!!Lo[F]:b.namespaceURI===Oe?E.namespaceURI===yn&&!$n[J]||E.namespaceURI===bn&&!xn[J]?!1:!Lo[F]&&(ic[F]||!_o[F]):!!(Ft==="application/xhtml+xml"&&ks[b.namespaceURI]):!1},Ie=function(b){zt(t.removed,{element:b});try{A(b).removeChild(b)}catch{S(b)}},nt=function(b,E){try{zt(t.removed,{attribute:E.getAttributeNode(b),from:E})}catch{zt(t.removed,{attribute:null,from:E})}if(E.removeAttribute(b),b==="is")if(wt||vn)try{Ie(E)}catch{}else try{E.setAttribute(b,"")}catch{}},Eo=function(b){let E=null,F=null;if(bs)b="<remove></remove>"+b;else{const te=Hs(b,/^[\r\n\t ]+/);F=te&&te[0]}Ft==="application/xhtml+xml"&&St===Oe&&(b='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+b+"</body></html>");const J=C?C.createHTML(b):b;if(St===Oe)try{E=new f().parseFromString(J,Ft)}catch{}if(!E||!E.documentElement){E=T.createDocument(St,"template",null);try{E.documentElement.innerHTML=ws?_:J}catch{}}const de=E.body||E.documentElement;return b&&F&&de.insertBefore(n.createTextNode(F),de.childNodes[0]||null),St===Oe?Z.call(E,tt?"html":"body")[0]:tt?E.documentElement:de},Io=function(b){return M.call(b.ownerDocument||b,b,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},As=function(b){return b instanceof h&&(typeof b.nodeName!="string"||typeof b.textContent!="string"||typeof b.removeChild!="function"||!(b.attributes instanceof g)||typeof b.removeAttribute!="function"||typeof b.setAttribute!="function"||typeof b.namespaceURI!="string"||typeof b.insertBefore!="function"||typeof b.hasChildNodes!="function")},Mo=function(b){return typeof l=="function"&&b instanceof l};function Be(z,b,E){_n(z,F=>{F.call(t,b,E,At)})}const Ro=function(b){let E=null;if(Be(N.beforeSanitizeElements,b,null),As(b))return Ie(b),!0;const F=se(b.nodeName);if(Be(N.uponSanitizeElement,b,{tagName:F,allowedTags:R}),fn&&b.hasChildNodes()&&!Mo(b.firstElementChild)&&he(/<[/\w!]/g,b.innerHTML)&&he(/<[/\w!]/g,b.textContent)||b.nodeType===jt.progressingInstruction||fn&&b.nodeType===jt.comment&&he(/<[/\w]/g,b.data))return Ie(b),!0;if(!(pe.tagCheck instanceof Function&&pe.tagCheck(F))&&(!R[F]||ke[F])){if(!ke[F]&&Do(F)&&(Q.tagNameCheck instanceof RegExp&&he(Q.tagNameCheck,F)||Q.tagNameCheck instanceof Function&&Q.tagNameCheck(F)))return!1;if(ys&&!Ee[F]){const J=A(b)||b.parentNode,de=w(b)||b.childNodes;if(de&&J){const te=de.length;for(let be=te-1;be>=0;--be){const ze=m(de[be],!0);ze.__removalCount=(b.__removalCount||0)+1,J.insertBefore(ze,k(b))}}}return Ie(b),!0}return b instanceof c&&!lc(b)||(F==="noscript"||F==="noembed"||F==="noframes")&&he(/<\/no(script|embed|frames)/i,b.innerHTML)?(Ie(b),!0):($t&&b.nodeType===jt.text&&(E=b.textContent,_n([H,ce,L],J=>{E=Ut(E,J," ")}),b.textContent!==E&&(zt(t.removed,{element:b.cloneNode()}),b.textContent=E)),Be(N.afterSanitizeElements,b,null),!1)},Po=function(b,E,F){if(wo&&(E==="id"||E==="name")&&(F in n||F in rc))return!1;if(!(Fe&&!ee[E]&&he(B,E))){if(!(Ne&&he(oe,E))){if(!(pe.attributeCheck instanceof Function&&pe.attributeCheck(E,b))){if(!K[E]||ee[E]){if(!(Do(b)&&(Q.tagNameCheck instanceof RegExp&&he(Q.tagNameCheck,b)||Q.tagNameCheck instanceof Function&&Q.tagNameCheck(b))&&(Q.attributeNameCheck instanceof RegExp&&he(Q.attributeNameCheck,E)||Q.attributeNameCheck instanceof Function&&Q.attributeNameCheck(E,b))||E==="is"&&Q.allowCustomizedBuiltInElements&&(Q.tagNameCheck instanceof RegExp&&he(Q.tagNameCheck,F)||Q.tagNameCheck instanceof Function&&Q.tagNameCheck(F))))return!1}else if(!$s[E]){if(!he(I,Ut(F,X,""))){if(!((E==="src"||E==="xlink:href"||E==="href")&&b!=="script"&&Mh(F,"data:")===0&&So[b])){if(!(et&&!he(ae,Ut(F,X,"")))){if(F)return!1}}}}}}}return!0},Do=function(b){return b!=="annotation-xml"&&Hs(b,ne)},No=function(b){Be(N.beforeSanitizeAttributes,b,null);const{attributes:E}=b;if(!E||As(b))return;const F={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:K,forceKeepAttr:void 0};let J=E.length;for(;J--;){const de=E[J],{name:te,namespaceURI:be,value:ze}=de,Ct=se(te),Cs=ze;let le=te==="value"?Cs:Rh(Cs);if(F.attrName=Ct,F.attrValue=le,F.keepAttr=!0,F.forceKeepAttr=void 0,Be(N.uponSanitizeAttribute,b,F),le=F.attrValue,ko&&(Ct==="id"||Ct==="name")&&(nt(te,b),le=nc+le),fn&&he(/((--!?|])>)|<\/(style|title|textarea)/i,le)){nt(te,b);continue}if(Ct==="attributename"&&Hs(le,"href")){nt(te,b);continue}if(F.forceKeepAttr)continue;if(!F.keepAttr){nt(te,b);continue}if(!$o&&he(/\/>/i,le)){nt(te,b);continue}$t&&_n([H,ce,L],Oo=>{le=Ut(le,Oo," ")});const Fo=se(b.nodeName);if(!Po(Fo,Ct,le)){nt(te,b);continue}if(C&&typeof d=="object"&&typeof d.getAttributeType=="function"&&!be)switch(d.getAttributeType(Fo,Ct)){case"TrustedHTML":{le=C.createHTML(le);break}case"TrustedScriptURL":{le=C.createScriptURL(le);break}}if(le!==Cs)try{be?b.setAttributeNS(be,te,le):b.setAttribute(te,le),As(b)?Ie(b):La(t.removed)}catch{nt(te,b)}}Be(N.afterSanitizeAttributes,b,null)},cc=function z(b){let E=null;const F=Io(b);for(Be(N.beforeSanitizeShadowDOM,b,null);E=F.nextNode();)Be(N.uponSanitizeShadowNode,E,null),Ro(E),No(E),E.content instanceof o&&z(E.content);Be(N.afterSanitizeShadowDOM,b,null)};return t.sanitize=function(z){let b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},E=null,F=null,J=null,de=null;if(ws=!z,ws&&(z="<!-->"),typeof z!="string"&&!Mo(z))if(typeof z.toString=="function"){if(z=z.toString(),typeof z!="string")throw Ht("dirty is not a string, aborting")}else throw Ht("toString is not a function");if(!t.isSupported)return z;if(ms||Ss(b),t.removed=[],typeof z=="string"&&(Nt=!1),Nt){if(z.nodeName){const ze=se(z.nodeName);if(!R[ze]||ke[ze])throw Ht("root node is forbidden and cannot be sanitized in-place")}}else if(z instanceof l)E=Eo("<!---->"),F=E.ownerDocument.importNode(z,!0),F.nodeType===jt.element&&F.nodeName==="BODY"||F.nodeName==="HTML"?E=F:E.appendChild(F);else{if(!wt&&!$t&&!tt&&z.indexOf("<")===-1)return C&&mn?C.createHTML(z):z;if(E=Eo(z),!E)return wt?null:mn?_:""}E&&bs&&Ie(E.firstChild);const te=Io(Nt?z:E);for(;J=te.nextNode();)Ro(J),No(J),J.content instanceof o&&cc(J.content);if(Nt)return z;if(wt){if(vn)for(de=U.call(E.ownerDocument);E.firstChild;)de.appendChild(E.firstChild);else de=E;return(K.shadowroot||K.shadowrootmode)&&(de=ie.call(s,de,!0)),de}let be=tt?E.outerHTML:E.innerHTML;return tt&&R["!doctype"]&&E.ownerDocument&&E.ownerDocument.doctype&&E.ownerDocument.doctype.name&&he(Ml,E.ownerDocument.doctype.name)&&(be="<!DOCTYPE "+E.ownerDocument.doctype.name+`>
`+be),$t&&_n([H,ce,L],ze=>{be=Ut(be,ze," ")}),C&&mn?C.createHTML(be):be},t.setConfig=function(){let z=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ss(z),ms=!0},t.clearConfig=function(){At=null,ms=!1},t.isValidAttribute=function(z,b,E){At||Ss({});const F=se(z),J=se(b);return Po(F,J,E)},t.addHook=function(z,b){typeof b=="function"&&zt(N[z],b)},t.removeHook=function(z,b){if(b!==void 0){const E=Eh(N[z],b);return E===-1?void 0:Ih(N[z],E,1)[0]}return La(N[z])},t.removeHooks=function(z){N[z]=[]},t.removeAllHooks=function(){N=Da()},t}var wi=Rl();function ao(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var xt=ao();function Pl(e){xt=e}var en={exec:()=>null};function W(e,t=""){let n=typeof e=="string"?e:e.source,s={replace:(i,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(fe.caret,"$1"),n=n.replace(i,a),s},getRegex:()=>new RegExp(n,t)};return s}var Vh=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),fe={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Qh=/^(?:[ \t]*(?:\n|$))+/,Yh=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Zh=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Jh=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ro=/(?:[*+-]|\d{1,9}[.)])/,Dl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Nl=W(Dl).replace(/bull/g,ro).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Xh=W(Dl).replace(/bull/g,ro).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),lo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ef=/^[^\n]+/,co=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,tf=W(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",co).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),nf=W(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ro).getRegex(),hs="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",uo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,sf=W("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",uo).replace("tag",hs).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Fl=W(lo).replace("hr",hn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",hs).getRegex(),of=W(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Fl).getRegex(),go={blockquote:of,code:Yh,def:tf,fences:Zh,heading:Jh,hr:hn,html:sf,lheading:Nl,list:nf,newline:Qh,paragraph:Fl,table:en,text:ef},Na=W("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",hn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",hs).getRegex(),af={...go,lheading:Xh,table:Na,paragraph:W(lo).replace("hr",hn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Na).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",hs).getRegex()},rf={...go,html:W(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",uo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:en,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:W(lo).replace("hr",hn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Nl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},lf=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,cf=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ol=/^( {2,}|\\)\n(?!\s*$)/,df=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,fs=/[\p{P}\p{S}]/u,po=/[\s\p{P}\p{S}]/u,Bl=/[^\s\p{P}\p{S}]/u,uf=W(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,po).getRegex(),zl=/(?!~)[\p{P}\p{S}]/u,gf=/(?!~)[\s\p{P}\p{S}]/u,pf=/(?:[^\s\p{P}\p{S}]|~)/u,hf=W(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Vh?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Ul=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,ff=W(Ul,"u").replace(/punct/g,fs).getRegex(),vf=W(Ul,"u").replace(/punct/g,zl).getRegex(),Hl="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",mf=W(Hl,"gu").replace(/notPunctSpace/g,Bl).replace(/punctSpace/g,po).replace(/punct/g,fs).getRegex(),bf=W(Hl,"gu").replace(/notPunctSpace/g,pf).replace(/punctSpace/g,gf).replace(/punct/g,zl).getRegex(),yf=W("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Bl).replace(/punctSpace/g,po).replace(/punct/g,fs).getRegex(),xf=W(/\\(punct)/,"gu").replace(/punct/g,fs).getRegex(),$f=W(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),wf=W(uo).replace("(?:-->|$)","-->").getRegex(),kf=W("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",wf).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Qn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Sf=W(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Qn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Kl=W(/^!?\[(label)\]\[(ref)\]/).replace("label",Qn).replace("ref",co).getRegex(),jl=W(/^!?\[(ref)\](?:\[\])?/).replace("ref",co).getRegex(),Af=W("reflink|nolink(?!\\()","g").replace("reflink",Kl).replace("nolink",jl).getRegex(),Fa=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ho={_backpedal:en,anyPunctuation:xf,autolink:$f,blockSkip:hf,br:Ol,code:cf,del:en,emStrongLDelim:ff,emStrongRDelimAst:mf,emStrongRDelimUnd:yf,escape:lf,link:Sf,nolink:jl,punctuation:uf,reflink:Kl,reflinkSearch:Af,tag:kf,text:df,url:en},Cf={...ho,link:W(/^!?\[(label)\]\((.*?)\)/).replace("label",Qn).getRegex(),reflink:W(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Qn).getRegex()},ki={...ho,emStrongRDelimAst:bf,emStrongLDelim:vf,url:W(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Fa).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:W(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Fa).getRegex()},Tf={...ki,br:W(Ol).replace("{2,}","*").getRegex(),text:W(ki.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},En={normal:go,gfm:af,pedantic:rf},Wt={normal:ho,gfm:ki,breaks:Tf,pedantic:Cf},_f={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Oa=e=>_f[e];function Ke(e,t){if(t){if(fe.escapeTest.test(e))return e.replace(fe.escapeReplace,Oa)}else if(fe.escapeTestNoEncode.test(e))return e.replace(fe.escapeReplaceNoEncode,Oa);return e}function Ba(e){try{e=encodeURI(e).replace(fe.percentDecode,"%")}catch{return null}return e}function za(e,t){let n=e.replace(fe.findPipe,(o,a,l)=>{let c=!1,u=a;for(;--u>=0&&l[u]==="\\";)c=!c;return c?"|":" |"}),s=n.split(fe.splitPipe),i=0;if(s[0].trim()||s.shift(),s.length>0&&!s.at(-1)?.trim()&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(fe.slashPipe,"|");return s}function Gt(e,t,n){let s=e.length;if(s===0)return"";let i=0;for(;i<s&&e.charAt(s-i-1)===t;)i++;return e.slice(0,s-i)}function Lf(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function Ua(e,t,n,s,i){let o=t.href,a=t.title||null,l=e[1].replace(i.other.outputLinkReplace,"$1");s.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:l,tokens:s.inlineTokens(l)};return s.state.inLink=!1,c}function Ef(e,t,n){let s=e.match(n.other.indentCodeCompensation);if(s===null)return t;let i=s[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[l]=a;return l.length>=i.length?o.slice(i.length):o}).join(`
`)}var Yn=class{options;rules;lexer;constructor(e){this.options=e||xt}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Gt(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],s=Ef(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let s=Gt(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Gt(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Gt(t[0],`
`).split(`
`),s="",i="",o=[];for(;n.length>0;){let a=!1,l=[],c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))l.push(n[c]),a=!0;else if(!a)l.push(n[c]);else break;n=n.slice(c);let u=l.join(`
`),g=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${u}`:u,i=i?`${i}
${g}`:g;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(g,o,!0),this.lexer.state.top=h,n.length===0)break;let f=o.at(-1);if(f?.type==="code")break;if(f?.type==="blockquote"){let d=f,p=d.raw+`
`+n.join(`
`),m=this.blockquote(p);o[o.length-1]=m,s=s.substring(0,s.length-d.raw.length)+m.raw,i=i.substring(0,i.length-d.text.length)+m.text;break}else if(f?.type==="list"){let d=f,p=d.raw+`
`+n.join(`
`),m=this.list(p);o[o.length-1]=m,s=s.substring(0,s.length-f.raw.length)+m.raw,i=i.substring(0,i.length-d.raw.length)+m.raw,n=p.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:o,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let c=!1,u="",g="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let h=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,m=>" ".repeat(3*m.length)),f=e.split(`
`,1)[0],d=!h.trim(),p=0;if(this.options.pedantic?(p=2,g=h.trimStart()):d?p=t[1].length+1:(p=t[2].search(this.rules.other.nonSpaceChar),p=p>4?1:p,g=h.slice(p),p+=t[1].length),d&&this.rules.other.blankLine.test(f)&&(u+=f+`
`,e=e.substring(f.length+1),c=!0),!c){let m=this.rules.other.nextBulletRegex(p),S=this.rules.other.hrRegex(p),k=this.rules.other.fencesBeginRegex(p),w=this.rules.other.headingBeginRegex(p),A=this.rules.other.htmlBeginRegex(p);for(;e;){let C=e.split(`
`,1)[0],_;if(f=C,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),_=f):_=f.replace(this.rules.other.tabCharGlobal,"    "),k.test(f)||w.test(f)||A.test(f)||m.test(f)||S.test(f))break;if(_.search(this.rules.other.nonSpaceChar)>=p||!f.trim())g+=`
`+_.slice(p);else{if(d||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||k.test(h)||w.test(h)||S.test(h))break;g+=`
`+f}!d&&!f.trim()&&(d=!0),u+=C+`
`,e=e.substring(C.length+1),h=_.slice(p)}}i.loose||(a?i.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),i.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(g),loose:!1,text:g,tokens:[]}),i.raw+=u}let l=i.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let c of i.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let g=this.lexer.inlineQueue.length-1;g>=0;g--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[g].src)){this.lexer.inlineQueue[g].src=this.lexer.inlineQueue[g].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let g={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=g.checked,i.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=g.raw+c.tokens[0].raw,c.tokens[0].text=g.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(g)):c.tokens.unshift({type:"paragraph",raw:g.raw,text:g.raw,tokens:[g]}):c.tokens.unshift(g)}}if(!i.loose){let u=c.tokens.filter(h=>h.type==="space"),g=u.length>0&&u.some(h=>this.rules.other.anyLine.test(h.raw));i.loose=g}}if(i.loose)for(let c of i.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return i}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=za(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(let a of s)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of i)o.rows.push(za(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=Gt(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=Lf(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(s);o&&(s=o[1],i=o[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),Ua(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Ua(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!(!s||s[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(s[1]||s[2])||!n||this.rules.inline.punctuation.exec(n))){let i=[...s[0]].length-1,o,a,l=i,c=0,u=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+i);(s=u.exec(t))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(a=[...o].length,s[3]||s[4]){l+=a;continue}else if((s[5]||s[6])&&i%3&&!((i+a)%3)){c+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+c);let g=[...s[0]][0].length,h=e.slice(0,i+s.index+g+a);if(Math.min(i,a)%2){let d=h.slice(1,-1);return{type:"em",raw:h,text:d,tokens:this.lexer.inlineTokens(d)}}let f=h.slice(2,-2);return{type:"strong",raw:h,text:f,tokens:this.lexer.inlineTokens(f)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,s;if(t[2]==="@")n=t[0],s="mailto:"+n;else{let i;do i=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(i!==t[0]);n=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},_e=class Si{tokens;options;state;inlineQueue;tokenizer;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||xt,this.options.tokenizer=this.options.tokenizer||new Yn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:fe,block:En.normal,inline:Wt.normal};this.options.pedantic?(n.block=En.pedantic,n.inline=Wt.pedantic):this.options.gfm&&(n.block=En.gfm,this.options.breaks?n.inline=Wt.breaks:n.inline=Wt.gfm),this.tokenizer.rules=n}static get rules(){return{block:En,inline:Wt}}static lex(t,n){return new Si(n).lex(t)}static lexInline(t,n){return new Si(n).inlineTokens(t)}lex(t){t=t.replace(fe.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){for(this.options.pedantic&&(t=t.replace(fe.tabCharGlobal,"    ").replace(fe.spaceLine,""));t;){let i;if(this.options.extensions?.block?.some(a=>(i=a.call({lexer:this},t,n))?(t=t.substring(i.raw.length),n.push(i),!0):!1))continue;if(i=this.tokenizer.space(t)){t=t.substring(i.raw.length);let a=n.at(-1);i.raw.length===1&&a!==void 0?a.raw+=`
`:n.push(i);continue}if(i=this.tokenizer.code(t)){t=t.substring(i.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+i.raw,a.text+=`
`+i.text,this.inlineQueue.at(-1).src=a.text):n.push(i);continue}if(i=this.tokenizer.fences(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.heading(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.hr(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.blockquote(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.list(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.html(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.def(t)){t=t.substring(i.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+i.raw,a.text+=`
`+i.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title},n.push(i));continue}if(i=this.tokenizer.table(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.lheading(t)){t=t.substring(i.raw.length),n.push(i);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,l=t.slice(1),c;this.options.extensions.startBlock.forEach(u=>{c=u.call({lexer:this},l),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(i=this.tokenizer.paragraph(o))){let a=n.at(-1);s&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+i.raw,a.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(i),s=o.length!==t.length,t=t.substring(i.raw.length);continue}if(i=this.tokenizer.text(t)){t=t.substring(i.raw.length);let a=n.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+i.raw,a.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(i);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let s=t,i=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)c.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)o=i[2]?i[2].length:0,s=s.slice(0,i.index+o)+"["+"a".repeat(i[0].length-o-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);s=this.options.hooks?.emStrongMask?.call({lexer:this},s)??s;let a=!1,l="";for(;t;){a||(l=""),a=!1;let c;if(this.options.extensions?.inline?.some(g=>(c=g.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let g=n.at(-1);c.type==="text"&&g?.type==="text"?(g.raw+=c.raw,g.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,s,l)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let u=t;if(this.options.extensions?.startInline){let g=1/0,h=t.slice(1),f;this.options.extensions.startInline.forEach(d=>{f=d.call({lexer:this},h),typeof f=="number"&&f>=0&&(g=Math.min(g,f))}),g<1/0&&g>=0&&(u=t.substring(0,g+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(l=c.raw.slice(-1)),a=!0;let g=n.at(-1);g?.type==="text"?(g.raw+=c.raw,g.text+=c.text):n.push(c);continue}if(t){let g="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(g);break}else throw new Error(g)}}return n}},Zn=class{options;parser;constructor(e){this.options=e||xt}space(e){return""}code({text:e,lang:t,escaped:n}){let s=(t||"").match(fe.notSpaceStart)?.[0],i=e.replace(fe.endingNewline,"")+`
`;return s?'<pre><code class="language-'+Ke(s)+'">'+(n?i:Ke(i,!0))+`</code></pre>
`:"<pre><code>"+(n?i:Ke(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,s="";for(let a=0;a<e.items.length;a++){let l=e.items[a];s+=this.listitem(l)}let i=t?"ol":"ul",o=t&&n!==1?' start="'+n+'"':"";return"<"+i+o+`>
`+s+"</"+i+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let i=0;i<e.header.length;i++)n+=this.tablecell(e.header[i]);t+=this.tablerow({text:n});let s="";for(let i=0;i<e.rows.length;i++){let o=e.rows[i];n="";for(let a=0;a<o.length;a++)n+=this.tablecell(o[a]);s+=this.tablerow({text:n})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+s+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ke(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let s=this.parser.parseInline(n),i=Ba(e);if(i===null)return s;e=i;let o='<a href="'+e+'"';return t&&(o+=' title="'+Ke(t)+'"'),o+=">"+s+"</a>",o}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));let i=Ba(e);if(i===null)return Ke(n);e=i;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Ke(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ke(e.text)}},fo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Le=class Ai{options;renderer;textRenderer;constructor(t){this.options=t||xt,this.options.renderer=this.options.renderer||new Zn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new fo}static parse(t,n){return new Ai(n).parse(t)}static parseInline(t,n){return new Ai(n).parseInline(t)}parse(t){let n="";for(let s=0;s<t.length;s++){let i=t[s];if(this.options.extensions?.renderers?.[i.type]){let a=i,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=l||"";continue}}let o=i;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let s="";for(let i=0;i<t.length;i++){let o=t[i];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){s+=l||"";continue}}let a=o;switch(a.type){case"escape":{s+=n.text(a);break}case"html":{s+=n.html(a);break}case"link":{s+=n.link(a);break}case"image":{s+=n.image(a);break}case"checkbox":{s+=n.checkbox(a);break}case"strong":{s+=n.strong(a);break}case"em":{s+=n.em(a);break}case"codespan":{s+=n.codespan(a);break}case"br":{s+=n.br(a);break}case"del":{s+=n.del(a);break}case"text":{s+=n.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}},Vt=class{options;block;constructor(e){this.options=e||xt}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?_e.lex:_e.lexInline}provideParser(){return this.block?Le.parse:Le.parseInline}},If=class{defaults=ao();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=Le;Renderer=Zn;TextRenderer=fo;Lexer=_e;Tokenizer=Yn;Hooks=Vt;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let s of e)switch(n=n.concat(t.call(this,s)),s.type){case"table":{let i=s;for(let o of i.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of i.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let i=s;n=n.concat(this.walkTokens(i.items,t));break}default:{let i=s;this.defaults.extensions?.childTokens?.[i.type]?this.defaults.extensions.childTokens[i.type].forEach(o=>{let a=i[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):i.tokens&&(n=n.concat(this.walkTokens(i.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){let o=t.renderers[i.name];o?t.renderers[i.name]=function(...a){let l=i.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[i.level];o?o.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){let i=this.defaults.renderer||new Zn(this.defaults);for(let o in n.renderer){if(!(o in i))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,l=n.renderer[a],c=i[a];i[a]=(...u)=>{let g=l.apply(i,u);return g===!1&&(g=c.apply(i,u)),g||""}}s.renderer=i}if(n.tokenizer){let i=this.defaults.tokenizer||new Yn(this.defaults);for(let o in n.tokenizer){if(!(o in i))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,l=n.tokenizer[a],c=i[a];i[a]=(...u)=>{let g=l.apply(i,u);return g===!1&&(g=c.apply(i,u)),g}}s.tokenizer=i}if(n.hooks){let i=this.defaults.hooks||new Vt;for(let o in n.hooks){if(!(o in i))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,l=n.hooks[a],c=i[a];Vt.passThroughHooks.has(o)?i[a]=u=>{if(this.defaults.async&&Vt.passThroughHooksRespectAsync.has(o))return(async()=>{let h=await l.call(i,u);return c.call(i,h)})();let g=l.call(i,u);return c.call(i,g)}:i[a]=(...u)=>{if(this.defaults.async)return(async()=>{let h=await l.apply(i,u);return h===!1&&(h=await c.apply(i,u)),h})();let g=l.apply(i,u);return g===!1&&(g=c.apply(i,u)),g}}s.hooks=i}if(n.walkTokens){let i=this.defaults.walkTokens,o=n.walkTokens;s.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),i&&(l=l.concat(i.call(this,a))),l}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return _e.lex(e,t??this.defaults)}parser(e,t){return Le.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let s={...n},i={...this.defaults,...s},o=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&s.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(i.hooks&&(i.hooks.options=i,i.hooks.block=e),i.async)return(async()=>{let a=i.hooks?await i.hooks.preprocess(t):t,l=await(i.hooks?await i.hooks.provideLexer():e?_e.lex:_e.lexInline)(a,i),c=i.hooks?await i.hooks.processAllTokens(l):l;i.walkTokens&&await Promise.all(this.walkTokens(c,i.walkTokens));let u=await(i.hooks?await i.hooks.provideParser():e?Le.parse:Le.parseInline)(c,i);return i.hooks?await i.hooks.postprocess(u):u})().catch(o);try{i.hooks&&(t=i.hooks.preprocess(t));let a=(i.hooks?i.hooks.provideLexer():e?_e.lex:_e.lexInline)(t,i);i.hooks&&(a=i.hooks.processAllTokens(a)),i.walkTokens&&this.walkTokens(a,i.walkTokens);let l=(i.hooks?i.hooks.provideParser():e?Le.parse:Le.parseInline)(a,i);return i.hooks&&(l=i.hooks.postprocess(l)),l}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let s="<p>An error occurred:</p><pre>"+Ke(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},bt=new If;function q(e,t){return bt.parse(e,t)}q.options=q.setOptions=function(e){return bt.setOptions(e),q.defaults=bt.defaults,Pl(q.defaults),q};q.getDefaults=ao;q.defaults=xt;q.use=function(...e){return bt.use(...e),q.defaults=bt.defaults,Pl(q.defaults),q};q.walkTokens=function(e,t){return bt.walkTokens(e,t)};q.parseInline=bt.parseInline;q.Parser=Le;q.parser=Le.parse;q.Renderer=Zn;q.TextRenderer=fo;q.Lexer=_e;q.lexer=_e.lex;q.Tokenizer=Yn;q.Hooks=Vt;q.parse=q;q.options;q.setOptions;q.use;q.walkTokens;q.parseInline;Le.parse;_e.lex;q.setOptions({gfm:!0,breaks:!0});const Ha=["a","b","blockquote","br","code","del","em","h1","h2","h3","h4","hr","i","li","ol","p","pre","strong","table","tbody","td","th","thead","tr","ul"],Ka=["class","href","rel","target","title","start"];let ja=!1;const Mf=14e4,Rf=4e4,Pf=200,qs=5e4,gt=new Map;function Df(e){const t=gt.get(e);return t===void 0?null:(gt.delete(e),gt.set(e,t),t)}function Wa(e,t){if(gt.set(e,t),gt.size<=Pf)return;const n=gt.keys().next().value;n&&gt.delete(n)}function Nf(){ja||(ja=!0,wi.addHook("afterSanitizeAttributes",e=>{!(e instanceof HTMLAnchorElement)||!e.getAttribute("href")||(e.setAttribute("rel","noreferrer noopener"),e.setAttribute("target","_blank"))}))}function Ci(e){const t=e.trim();if(!t)return"";if(Nf(),t.length<=qs){const a=Df(t);if(a!==null)return a}const n=Mr(t,Mf),s=n.truncated?`

… truncated (${n.total} chars, showing first ${n.text.length}).`:"";if(n.text.length>Rf){const l=`<pre class="code-block">${Ff(`${n.text}${s}`)}</pre>`,c=wi.sanitize(l,{ALLOWED_TAGS:Ha,ALLOWED_ATTR:Ka});return t.length<=qs&&Wa(t,c),c}const i=q.parse(`${n.text}${s}`),o=wi.sanitize(i,{ALLOWED_TAGS:Ha,ALLOWED_ATTR:Ka});return t.length<=qs&&Wa(t,o),o}function Ff(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const Of=1500,Bf=2e3,Wl="Copy as markdown",zf="Copied",Uf="Copy failed";async function Hf(e){if(!e)return!1;try{return await navigator.clipboard.writeText(e),!0}catch{return!1}}function In(e,t){e.title=t,e.setAttribute("aria-label",t)}function Kf(e){const t=e.label??Wl;return r`
    <button
      class="chat-copy-btn"
      type="button"
      title=${t}
      aria-label=${t}
      @click=${async n=>{const s=n.currentTarget;if(!s||s.dataset.copying==="1")return;s.dataset.copying="1",s.setAttribute("aria-busy","true"),s.disabled=!0;const i=await Hf(e.text());if(s.isConnected){if(delete s.dataset.copying,s.removeAttribute("aria-busy"),s.disabled=!1,!i){s.dataset.error="1",In(s,Uf),window.setTimeout(()=>{s.isConnected&&(delete s.dataset.error,In(s,t))},Bf);return}s.dataset.copied="1",In(s,zf),window.setTimeout(()=>{s.isConnected&&(delete s.dataset.copied,In(s,t))},Of)}}}
    >
      <span class="chat-copy-btn__icon" aria-hidden="true">
        <span class="chat-copy-btn__icon-copy">${Y.copy}</span>
        <span class="chat-copy-btn__icon-check">${Y.check}</span>
      </span>
    </button>
  `}function jf(e){return Kf({text:()=>e,label:Wl})}function Gl(e){const t=e;let n=typeof t.role=="string"?t.role:"unknown";const s=typeof t.toolCallId=="string"||typeof t.tool_call_id=="string",i=t.content,o=Array.isArray(i)?i:null,a=Array.isArray(o)&&o.some(h=>{const f=h,d=(typeof f.type=="string"?f.type:"").toLowerCase();return d==="toolresult"||d==="tool_result"}),l=typeof t.toolName=="string"||typeof t.tool_name=="string";(s||a||l)&&(n="toolResult");let c=[];typeof t.content=="string"?c=[{type:"text",text:t.content}]:Array.isArray(t.content)?c=t.content.map(h=>({type:h.type||"text",text:h.text,name:h.name,args:h.args||h.arguments})):typeof t.text=="string"&&(c=[{type:"text",text:t.text}]);const u=typeof t.timestamp=="number"?t.timestamp:Date.now(),g=typeof t.id=="string"?t.id:void 0;return{role:n,content:c,timestamp:u,id:g}}function vo(e){const t=e.toLowerCase();return e==="user"||e==="User"?e:e==="assistant"?"assistant":e==="system"?"system":t==="toolresult"||t==="tool_result"||t==="tool"||t==="function"?"tool":e}function ql(e){const t=e,n=typeof t.role=="string"?t.role.toLowerCase():"";return n==="toolresult"||n==="tool_result"}const Wf={icon:"puzzle",detailKeys:["command","path","url","targetUrl","targetId","ref","element","node","nodeId","id","requestId","to","channelId","guildId","userId","name","query","pattern","messageId"]},Gf={bash:{icon:"wrench",title:"Bash",detailKeys:["command"]},process:{icon:"wrench",title:"Process",detailKeys:["sessionId"]},read:{icon:"fileText",title:"Read",detailKeys:["path"]},write:{icon:"edit",title:"Write",detailKeys:["path"]},edit:{icon:"penLine",title:"Edit",detailKeys:["path"]},attach:{icon:"paperclip",title:"Attach",detailKeys:["path","url","fileName"]},browser:{icon:"globe",title:"Browser",actions:{status:{label:"status"},start:{label:"start"},stop:{label:"stop"},tabs:{label:"tabs"},open:{label:"open",detailKeys:["targetUrl"]},focus:{label:"focus",detailKeys:["targetId"]},close:{label:"close",detailKeys:["targetId"]},snapshot:{label:"snapshot",detailKeys:["targetUrl","targetId","ref","element","format"]},screenshot:{label:"screenshot",detailKeys:["targetUrl","targetId","ref","element"]},navigate:{label:"navigate",detailKeys:["targetUrl","targetId"]},console:{label:"console",detailKeys:["level","targetId"]},pdf:{label:"pdf",detailKeys:["targetId"]},upload:{label:"upload",detailKeys:["paths","ref","inputRef","element","targetId"]},dialog:{label:"dialog",detailKeys:["accept","promptText","targetId"]},act:{label:"act",detailKeys:["request.kind","request.ref","request.selector","request.text","request.value"]}}},canvas:{icon:"image",title:"Canvas",actions:{present:{label:"present",detailKeys:["target","node","nodeId"]},hide:{label:"hide",detailKeys:["node","nodeId"]},navigate:{label:"navigate",detailKeys:["url","node","nodeId"]},eval:{label:"eval",detailKeys:["javaScript","node","nodeId"]},snapshot:{label:"snapshot",detailKeys:["format","node","nodeId"]},a2ui_push:{label:"A2UI push",detailKeys:["jsonlPath","node","nodeId"]},a2ui_reset:{label:"A2UI reset",detailKeys:["node","nodeId"]}}},nodes:{icon:"smartphone",title:"Nodes",actions:{status:{label:"status"},describe:{label:"describe",detailKeys:["node","nodeId"]},pending:{label:"pending"},approve:{label:"approve",detailKeys:["requestId"]},reject:{label:"reject",detailKeys:["requestId"]},notify:{label:"notify",detailKeys:["node","nodeId","title","body"]},camera_snap:{label:"camera snap",detailKeys:["node","nodeId","facing","deviceId"]},camera_list:{label:"camera list",detailKeys:["node","nodeId"]},camera_clip:{label:"camera clip",detailKeys:["node","nodeId","facing","duration","durationMs"]},screen_record:{label:"screen record",detailKeys:["node","nodeId","duration","durationMs","fps","screenIndex"]}}},cron:{icon:"loader",title:"Cron",actions:{status:{label:"status"},list:{label:"list"},add:{label:"add",detailKeys:["job.name","job.id","job.schedule","job.cron"]},update:{label:"update",detailKeys:["id"]},remove:{label:"remove",detailKeys:["id"]},run:{label:"run",detailKeys:["id"]},runs:{label:"runs",detailKeys:["id"]},wake:{label:"wake",detailKeys:["text","mode"]}}},gateway:{icon:"plug",title:"Gateway",actions:{restart:{label:"restart",detailKeys:["reason","delayMs"]},"config.get":{label:"config get"},"config.schema":{label:"config schema"},"config.apply":{label:"config apply",detailKeys:["restartDelayMs"]},"update.run":{label:"update run",detailKeys:["restartDelayMs"]}}},whatsapp_login:{icon:"circle",title:"WhatsApp Login",actions:{start:{label:"start"},wait:{label:"wait"}}},discord:{icon:"messageSquare",title:"Discord",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sticker:{label:"sticker",detailKeys:["to","stickerIds"]},poll:{label:"poll",detailKeys:["question","to"]},permissions:{label:"permissions",detailKeys:["channelId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},threadCreate:{label:"thread create",detailKeys:["channelId","name"]},threadList:{label:"thread list",detailKeys:["guildId","channelId"]},threadReply:{label:"thread reply",detailKeys:["channelId","content"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},searchMessages:{label:"search",detailKeys:["guildId","content"]},memberInfo:{label:"member",detailKeys:["guildId","userId"]},roleInfo:{label:"roles",detailKeys:["guildId"]},emojiList:{label:"emoji list",detailKeys:["guildId"]},roleAdd:{label:"role add",detailKeys:["guildId","userId","roleId"]},roleRemove:{label:"role remove",detailKeys:["guildId","userId","roleId"]},channelInfo:{label:"channel",detailKeys:["channelId"]},channelList:{label:"channels",detailKeys:["guildId"]},voiceStatus:{label:"voice",detailKeys:["guildId","userId"]},eventList:{label:"events",detailKeys:["guildId"]},eventCreate:{label:"event create",detailKeys:["guildId","name"]},timeout:{label:"timeout",detailKeys:["guildId","userId"]},kick:{label:"kick",detailKeys:["guildId","userId"]},ban:{label:"ban",detailKeys:["guildId","userId"]}}},slack:{icon:"messageSquare",title:"Slack",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},memberInfo:{label:"member",detailKeys:["userId"]},emojiList:{label:"emoji list"}}}},qf={fallback:Wf,tools:Gf},Vl=qf,Ga=Vl.fallback??{icon:"puzzle"},Vf=Vl.tools??{};function Qf(e){return(e??"tool").trim()}function Yf(e){const t=e.replace(/_/g," ").trim();return t?t.split(/\s+/).map(n=>n.length<=2&&n.toUpperCase()===n?n:`${n.at(0)?.toUpperCase()??""}${n.slice(1)}`).join(" "):"Tool"}function Zf(e){const t=e?.trim();if(t)return t.replace(/_/g," ")}function Ql(e){if(e!=null){if(typeof e=="string"){const t=e.trim();if(!t)return;const n=t.split(/\r?\n/)[0]?.trim()??"";return n?n.length>160?`${n.slice(0,157)}…`:n:void 0}if(typeof e=="number"||typeof e=="boolean")return String(e);if(Array.isArray(e)){const t=e.map(s=>Ql(s)).filter(s=>!!s);if(t.length===0)return;const n=t.slice(0,3).join(", ");return t.length>3?`${n}…`:n}}}function Jf(e,t){if(!e||typeof e!="object")return;let n=e;for(const s of t.split(".")){if(!s||!n||typeof n!="object")return;n=n[s]}return n}function Xf(e,t){for(const n of t){const s=Jf(e,n),i=Ql(s);if(i)return i}}function ev(e){if(!e||typeof e!="object")return;const t=e,n=typeof t.path=="string"?t.path:void 0;if(!n)return;const s=typeof t.offset=="number"?t.offset:void 0,i=typeof t.limit=="number"?t.limit:void 0;return s!==void 0&&i!==void 0?`${n}:${s}-${s+i}`:n}function tv(e){if(!e||typeof e!="object")return;const t=e;return typeof t.path=="string"?t.path:void 0}function nv(e,t){if(!(!e||!t))return e.actions?.[t]??void 0}function sv(e){const t=Qf(e.name),n=t.toLowerCase(),s=Vf[n],i=s?.icon??Ga.icon??"puzzle",o=s?.title??Yf(t),a=s?.label??t,l=e.args&&typeof e.args=="object"?e.args.action:void 0,c=typeof l=="string"?l.trim():void 0,u=nv(s,c),g=Zf(u?.label??c);let h;n==="read"&&(h=ev(e.args)),!h&&(n==="write"||n==="edit"||n==="attach")&&(h=tv(e.args));const f=u?.detailKeys??s?.detailKeys??Ga.detailKeys??[];return!h&&f.length>0&&(h=Xf(e.args,f)),!h&&e.meta&&(h=e.meta),h&&(h=ov(h)),{name:t,icon:i,title:o,label:a,verb:g,detail:h}}function iv(e){const t=[];if(e.verb&&t.push(e.verb),e.detail&&t.push(e.detail),t.length!==0)return t.join(" · ")}function ov(e){return e&&e.replace(/\/Users\/[^/]+/g,"~").replace(/\/home\/[^/]+/g,"~")}const av=80,rv=2,qa=100;function lv(e){const t=e.trim();if(t.startsWith("{")||t.startsWith("["))try{const n=JSON.parse(t);return"```json\n"+JSON.stringify(n,null,2)+"\n```"}catch{}return e}function cv(e){const t=e.split(`
`),n=t.slice(0,rv),s=n.join(`
`);return s.length>qa?s.slice(0,qa)+"…":n.length<t.length?s+"…":s}function dv(e){const t=e,n=uv(t.content),s=[];for(const i of n){const o=(typeof i.type=="string"?i.type:"").toLowerCase();(["toolcall","tool_call","tooluse","tool_use"].includes(o)||typeof i.name=="string"&&i.arguments!=null)&&s.push({kind:"call",name:i.name??"tool",args:gv(i.arguments??i.args)})}for(const i of n){const o=(typeof i.type=="string"?i.type:"").toLowerCase();if(o!=="toolresult"&&o!=="tool_result")continue;const a=pv(i),l=typeof i.name=="string"?i.name:"tool";s.push({kind:"result",name:l,text:a})}if(ql(e)&&!s.some(i=>i.kind==="result")){const i=typeof t.toolName=="string"&&t.toolName||typeof t.tool_name=="string"&&t.tool_name||"tool",o=rl(e)??void 0;s.push({kind:"result",name:i,text:o})}return s}function Va(e,t){const n=sv({name:e.name,args:e.args}),s=iv(n),i=!!e.text?.trim(),o=!!t,a=o?()=>{if(i){t(lv(e.text));return}const h=`## ${n.label}

${s?`**Command:** \`${s}\`

`:""}*No output — tool completed successfully.*`;t(h)}:void 0,l=i&&(e.text?.length??0)<=av,c=i&&!l,u=i&&l,g=!i;return r`
    <div
      class="chat-tool-card ${o?"chat-tool-card--clickable":""}"
      @click=${a}
      role=${o?"button":v}
      tabindex=${o?"0":v}
      @keydown=${o?h=>{h.key!=="Enter"&&h.key!==" "||(h.preventDefault(),a?.())}:v}
    >
      <div class="chat-tool-card__header">
        <div class="chat-tool-card__title">
          <span class="chat-tool-card__icon">${Y[n.icon]}</span>
          <span>${n.label}</span>
        </div>
        ${o?r`<span class="chat-tool-card__action">${i?"View":""} ${Y.check}</span>`:v}
        ${g&&!o?r`<span class="chat-tool-card__status">${Y.check}</span>`:v}
      </div>
      ${s?r`<div class="chat-tool-card__detail">${s}</div>`:v}
      ${g?r`
              <div class="chat-tool-card__status-text muted">Completed</div>
            `:v}
      ${c?r`<div class="chat-tool-card__preview mono">${cv(e.text)}</div>`:v}
      ${u?r`<div class="chat-tool-card__inline mono">${e.text}</div>`:v}
    </div>
  `}function uv(e){return Array.isArray(e)?e.filter(Boolean):[]}function gv(e){if(typeof e!="string")return e;const t=e.trim();if(!t||!t.startsWith("{")&&!t.startsWith("["))return e;try{return JSON.parse(t)}catch{return e}}function pv(e){if(typeof e.text=="string")return e.text;if(typeof e.content=="string")return e.content}function hv(e){const n=e.content,s=[];if(Array.isArray(n))for(const i of n){if(typeof i!="object"||i===null)continue;const o=i;if(o.type==="image"){const a=o.source;if(a?.type==="base64"&&typeof a.data=="string"){const l=a.data,c=a.media_type||"image/png",u=l.startsWith("data:")?l:`data:${c};base64,${l}`;s.push({url:u})}else typeof o.url=="string"&&s.push({url:o.url})}else if(o.type==="image_url"){const a=o.image_url;typeof a?.url=="string"&&s.push({url:a.url})}}return s}function fv(e){return r`
    <div class="chat-group assistant">
      ${mo("assistant",e)}
      <div class="chat-group-messages">
        <div class="chat-bubble chat-reading-indicator" aria-hidden="true">
          <span class="chat-reading-indicator__dots">
            <span></span><span></span><span></span>
          </span>
        </div>
      </div>
    </div>
  `}function vv(e,t,n,s){const i=new Date(t).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}),o=s?.name??"Assistant";return r`
    <div class="chat-group assistant">
      ${mo("assistant",s)}
      <div class="chat-group-messages">
        ${Yl({role:"assistant",content:[{type:"text",text:e}],timestamp:t},{isStreaming:!0,showReasoning:!1},n)}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${o}</span>
          <span class="chat-group-timestamp">${i}</span>
        </div>
      </div>
    </div>
  `}function mv(e,t){const n=vo(e.role),s=t.assistantName??"Assistant",i=n==="user"?"You":n==="assistant"?s:n,o=n==="user"?"user":n==="assistant"?"assistant":"other",a=new Date(e.timestamp).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return r`
    <div class="chat-group ${o}">
      ${mo(e.role,{name:s,avatar:t.assistantAvatar??null})}
      <div class="chat-group-messages">
        ${e.messages.map((l,c)=>Yl(l.message,{isStreaming:e.isStreaming&&c===e.messages.length-1,showReasoning:t.showReasoning},t.onOpenSidebar))}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${i}</span>
          <span class="chat-group-timestamp">${a}</span>
        </div>
      </div>
    </div>
  `}function mo(e,t){const n=vo(e),s=t?.name?.trim()||"Assistant",i=t?.avatar?.trim()||"",o=n==="user"?"U":n==="assistant"?s.charAt(0).toUpperCase()||"A":n==="tool"?"⚙":"?",a=n==="user"?"user":n==="assistant"?"assistant":n==="tool"?"tool":"other";return i&&n==="assistant"?bv(i)?r`<img
        class="chat-avatar ${a}"
        src="${i}"
        alt="${s}"
      />`:r`<div class="chat-avatar ${a}">${i}</div>`:r`<div class="chat-avatar ${a}">${o}</div>`}function bv(e){return/^https?:\/\//i.test(e)||/^data:image\//i.test(e)||e.startsWith("/")}function yv(e){return e.length===0?v:r`
    <div class="chat-message-images">
      ${e.map(t=>r`
          <img
            src=${t.url}
            alt=${t.alt??"Attached image"}
            class="chat-message-image"
            @click=${()=>window.open(t.url,"_blank")}
          />
        `)}
    </div>
  `}function Yl(e,t,n){const s=e,i=typeof s.role=="string"?s.role:"unknown",o=ql(e)||i.toLowerCase()==="toolresult"||i.toLowerCase()==="tool_result"||typeof s.toolCallId=="string"||typeof s.tool_call_id=="string",a=dv(e),l=a.length>0,c=hv(e),u=c.length>0,g=rl(e),h=t.showReasoning&&i==="assistant"?Yu(e):null,f=g?.trim()?g:null,d=h?Ju(h):null,p=f,m=i==="assistant"&&!!p?.trim(),S=["chat-bubble",m?"has-copy":"",t.isStreaming?"streaming":"","fade-in"].filter(Boolean).join(" ");return!p&&l&&o?r`${a.map(k=>Va(k,n))}`:!p&&!l&&!u?v:r`
    <div class="${S}">
      ${m?jf(p):v}
      ${yv(c)}
      ${d?r`<div class="chat-thinking">${bi(Ci(d))}</div>`:v}
      ${p?r`<div class="chat-text">${bi(Ci(p))}</div>`:v}
      ${a.map(k=>Va(k,n))}
    </div>
  `}function xv(e){return r`
    <div class="sidebar-panel">
      <div class="sidebar-header">
        <div class="sidebar-title">Tool Output</div>
        <button @click=${e.onClose} class="btn" title="Close sidebar">
          ${Y.x}
        </button>
      </div>
      <div class="sidebar-content">
        ${e.error?r`
              <div class="callout danger">${e.error}</div>
              <button @click=${e.onViewRawText} class="btn" style="margin-top: 12px;">
                View Raw Text
              </button>
            `:e.content?r`<div class="sidebar-markdown">${bi(Ci(e.content))}</div>`:r`
                  <div class="muted">No content available</div>
                `}
      </div>
    </div>
  `}var $v=Object.defineProperty,wv=Object.getOwnPropertyDescriptor,vs=(e,t,n,s)=>{for(var i=s>1?void 0:s?wv(t,n):t,o=e.length-1,a;o>=0;o--)(a=e[o])&&(i=(s?a(t,n,i):a(i))||i);return s&&i&&$v(t,n,i),i};let Pt=class extends Lt{constructor(){super(...arguments),this.splitRatio=.6,this.minRatio=.4,this.maxRatio=.7,this.isDragging=!1,this.startX=0,this.startRatio=0,this.handleMouseDown=e=>{this.isDragging=!0,this.startX=e.clientX,this.startRatio=this.splitRatio,this.classList.add("dragging"),document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),e.preventDefault()},this.handleMouseMove=e=>{if(!this.isDragging)return;const t=this.parentElement;if(!t)return;const n=t.getBoundingClientRect().width,i=(e.clientX-this.startX)/n;let o=this.startRatio+i;o=Math.max(this.minRatio,Math.min(this.maxRatio,o)),this.dispatchEvent(new CustomEvent("resize",{detail:{splitRatio:o},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{this.isDragging=!1,this.classList.remove("dragging"),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}}render(){return v}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}};Pt.styles=uc`
    :host {
      width: 4px;
      cursor: col-resize;
      background: var(--border, #333);
      transition: background 150ms ease-out;
      flex-shrink: 0;
      position: relative;
    }
    :host::before {
      content: "";
      position: absolute;
      top: 0;
      left: -4px;
      right: -4px;
      bottom: 0;
    }
    :host(:hover) {
      background: var(--accent, #007bff);
    }
    :host(.dragging) {
      background: var(--accent, #007bff);
    }
  `;vs([ss({type:Number})],Pt.prototype,"splitRatio",2);vs([ss({type:Number})],Pt.prototype,"minRatio",2);vs([ss({type:Number})],Pt.prototype,"maxRatio",2);Pt=vs([kr("resizable-divider")],Pt);const kv=5e3;function Qa(e){e.style.height="auto",e.style.height=`${e.scrollHeight}px`}function Sv(e){return e?e.active?r`
      <div class="compaction-indicator compaction-indicator--active" role="status" aria-live="polite">
        ${Y.loader} Compacting context...
      </div>
    `:e.completedAt&&Date.now()-e.completedAt<kv?r`
        <div class="compaction-indicator compaction-indicator--complete" role="status" aria-live="polite">
          ${Y.check} Context compacted
        </div>
      `:v:v}function Av(){return`att-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function Cv(e,t){const n=e.clipboardData?.items;if(!n||!t.onAttachmentsChange)return;const s=[];for(let i=0;i<n.length;i++){const o=n[i];o.type.startsWith("image/")&&s.push(o)}if(s.length!==0){e.preventDefault();for(const i of s){const o=i.getAsFile();if(!o)continue;const a=new FileReader;a.addEventListener("load",()=>{const l=a.result,c={id:Av(),dataUrl:l,mimeType:o.type},u=t.attachments??[];t.onAttachmentsChange?.([...u,c])}),a.readAsDataURL(o)}}}function Tv(e){const t=e.attachments??[];return t.length===0?v:r`
    <div class="chat-attachments">
      ${t.map(n=>r`
          <div class="chat-attachment">
            <img
              src=${n.dataUrl}
              alt="Attachment preview"
              class="chat-attachment__img"
            />
            <button
              class="chat-attachment__remove"
              type="button"
              aria-label="Remove attachment"
              @click=${()=>{const s=(e.attachments??[]).filter(i=>i.id!==n.id);e.onAttachmentsChange?.(s)}}
            >
              ${Y.x}
            </button>
          </div>
        `)}
    </div>
  `}function _v(e){const t=e.connected,n=e.sending||e.stream!==null,s=!!(e.canAbort&&e.onAbort),o=e.sessions?.sessions?.find(m=>m.key===e.sessionKey)?.reasoningLevel??"off",a=e.showThinking&&o!=="off",l={name:e.assistantName,avatar:e.assistantAvatar??e.assistantAvatarUrl??null},c=(e.attachments?.length??0)>0,u=e.connected?c?"Add a message or paste more images...":"Message (↩ to send, Shift+↩ for line breaks, paste images)":"Connect to the gateway to start chatting…",g=e.splitRatio??.6,h=!!(e.sidebarOpen&&e.onCloseSidebar),f=Ev(e),d=!e.loading&&f.length===0,p=r`
    <div
      class="chat-thread"
      role="log"
      aria-live="polite"
      @scroll=${e.onChatScroll}
    >
      ${e.loading?r`
              <div class="muted" style="text-align: center; padding: 48px 0">Loading chat…</div>
            `:v}
      ${d?r`
              <div class="chat-welcome">
                <div class="chat-welcome__icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div class="chat-welcome__title">Start a conversation</div>
                <div class="chat-welcome__sub">Send a message to begin chatting with the assistant.</div>
                <div class="chat-welcome__hints">
                  <button class="chat-welcome__hint" @click=${()=>{e.onDraftChange("What can you help me with?")}}>
                    What can you help me with?
                  </button>
                  <button class="chat-welcome__hint" @click=${()=>{e.onDraftChange("Show me your available tools")}}>
                    Show me your available tools
                  </button>
                  <button class="chat-welcome__hint" @click=${()=>{e.onDraftChange("Tell me about this system")}}>
                    Tell me about this system
                  </button>
                </div>
              </div>
            `:v}
      ${ml(f,m=>m.key,m=>m.kind==="divider"?r`
              <div class="chat-divider" role="separator" data-ts=${String(m.timestamp)}>
                <span class="chat-divider__line"></span>
                <span class="chat-divider__label">${m.label}</span>
                <span class="chat-divider__line"></span>
              </div>
            `:m.kind==="reading-indicator"?fv(l):m.kind==="stream"?vv(m.text,m.startedAt,e.onOpenSidebar,l):m.kind==="group"?mv(m,{onOpenSidebar:e.onOpenSidebar,showReasoning:a,assistantName:e.assistantName,assistantAvatar:l.avatar}):v)}
    </div>
  `;return r`
    <section class="card chat">
      ${e.disabledReason?r`<div class="callout">${e.disabledReason}</div>`:v}

      ${e.error?r`<div class="callout danger">${e.error}</div>`:v}

      ${e.focusMode?r`
            <button
              class="chat-focus-exit"
              type="button"
              @click=${e.onToggleFocusMode}
              aria-label="Exit focus mode"
              title="Exit focus mode"
            >
              ${Y.x}
            </button>
          `:v}

      <div
        class="chat-split-container ${h?"chat-split-container--open":""}"
      >
        <div
          class="chat-main"
          style="flex: ${h?`0 0 ${g*100}%`:"1 1 100%"}"
        >
          ${p}
        </div>

        ${h?r`
              <resizable-divider
                .splitRatio=${g}
                @resize=${m=>e.onSplitRatioChange?.(m.detail.splitRatio)}
              ></resizable-divider>
              <div class="chat-sidebar">
                ${xv({content:e.sidebarContent??null,error:e.sidebarError??null,onClose:e.onCloseSidebar,onViewRawText:()=>{!e.sidebarContent||!e.onOpenSidebar||e.onOpenSidebar(`\`\`\`
${e.sidebarContent}
\`\`\``)}})}
              </div>
            `:v}
      </div>

      ${e.queue.length?r`
            <div class="chat-queue" role="status" aria-live="polite">
              <div class="chat-queue__title">Queued (${e.queue.length})</div>
              <div class="chat-queue__list">
                ${e.queue.map(m=>r`
                    <div class="chat-queue__item">
                      <div class="chat-queue__text">
                        ${m.text||(m.attachments?.length?`Image (${m.attachments.length})`:"")}
                      </div>
                      <button
                        class="btn chat-queue__remove"
                        type="button"
                        aria-label="Remove queued message"
                        @click=${()=>e.onQueueRemove(m.id)}
                      >
                        ${Y.x}
                      </button>
                    </div>
                  `)}
              </div>
            </div>
          `:v}

      ${Sv(e.compactionStatus)}

      ${e.showNewMessages?r`
            <button
              class="btn chat-new-messages"
              type="button"
              @click=${e.onScrollToBottom}
            >
              New messages ${Y.arrowDown}
            </button>
          `:v}

      <div class="chat-compose">
        ${Tv(e)}
        <div class="chat-compose__row">
          <label class="field chat-compose__field">
            <span>Message</span>
            <textarea
              ${Ch(m=>m&&Qa(m))}
              .value=${e.draft}
              ?disabled=${!e.connected}
              @keydown=${m=>{m.key==="Enter"&&(m.isComposing||m.keyCode===229||m.shiftKey||e.connected&&(m.preventDefault(),t&&e.onSend()))}}
              @input=${m=>{const S=m.target;Qa(S),e.onDraftChange(S.value)}}
              @paste=${m=>Cv(m,e)}
              placeholder=${u}
            ></textarea>
          </label>
          <div class="chat-compose__actions">
            <span class="chat-compose__hint">↵ Send · Shift+↵ New line</span>
            <div class="chat-compose__actions-right">
              <button
                class="btn"
                ?disabled=${!e.connected||!s&&e.sending}
                @click=${s?e.onAbort:e.onNewSession}
              >
                ${s?"Stop":"New"}
              </button>
              <button
                class="btn primary"
                ?disabled=${!e.connected}
                @click=${e.onSend}
              >
                ${n?"Queue":"Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `}const Ya=200;function Lv(e){const t=[];let n=null;for(const s of e){if(s.kind!=="message"){n&&(t.push(n),n=null),t.push(s);continue}const i=Gl(s.message),o=vo(i.role),a=i.timestamp||Date.now();!n||n.role!==o?(n&&t.push(n),n={kind:"group",key:`group:${o}:${s.key}`,role:o,messages:[{message:s.message,key:s.key}],timestamp:a,isStreaming:!1}):n.messages.push({message:s.message,key:s.key})}return n&&t.push(n),t}function Ev(e){const t=[],n=Array.isArray(e.messages)?e.messages:[],s=Array.isArray(e.toolMessages)?e.toolMessages:[],i=Math.max(0,n.length-Ya);i>0&&t.push({kind:"message",key:"chat:history:notice",message:{role:"system",content:`Showing last ${Ya} messages (${i} hidden).`,timestamp:Date.now()}});for(let o=i;o<n.length;o++){const a=n[o],l=Gl(a),u=a.__opensoul;if(u&&u.kind==="compaction"){t.push({kind:"divider",key:typeof u.id=="string"?`divider:compaction:${u.id}`:`divider:compaction:${l.timestamp}:${o}`,label:"Compaction",timestamp:l.timestamp??Date.now()});continue}!e.showThinking&&l.role.toLowerCase()==="toolresult"||t.push({kind:"message",key:Za(a,o),message:a})}if(e.showThinking)for(let o=0;o<s.length;o++)t.push({kind:"message",key:Za(s[o],o+n.length),message:s[o]});if(e.stream!==null){const o=`stream:${e.sessionKey}:${e.streamStartedAt??"live"}`;e.stream.trim().length>0?t.push({kind:"stream",key:o,text:e.stream,startedAt:e.streamStartedAt??Date.now()}):t.push({kind:"reading-indicator",key:o})}return Lv(t)}function Za(e,t){const n=e,s=typeof n.toolCallId=="string"?n.toolCallId:"";if(s)return`tool:${s}`;const i=typeof n.id=="string"?n.id:"";if(i)return`msg:${i}`;const o=typeof n.messageId=="string"?n.messageId:"";if(o)return`msg:${o}`;const a=typeof n.timestamp=="number"?n.timestamp:null,l=typeof n.role=="string"?n.role:"unknown";return a!=null?`msg:${l}:${a}:${t}`:`msg:${l}:${t}`}const Ti={all:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  `,env:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="3"></circle>
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
      ></path>
    </svg>
  `,update:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  `,agents:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path
        d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"
      ></path>
      <circle cx="8" cy="14" r="1"></circle>
      <circle cx="16" cy="14" r="1"></circle>
    </svg>
  `,auth:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  `,channels:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  `,messages:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  `,commands:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  `,hooks:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  `,skills:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      ></polygon>
    </svg>
  `,tools:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      ></path>
    </svg>
  `,gateway:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,wizard:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M15 4V2"></path>
      <path d="M15 16v-2"></path>
      <path d="M8 9h2"></path>
      <path d="M20 9h2"></path>
      <path d="M17.8 11.8 19 13"></path>
      <path d="M15 9h0"></path>
      <path d="M17.8 6.2 19 5"></path>
      <path d="m3 21 9-9"></path>
      <path d="M12.2 6.2 11 5"></path>
    </svg>
  `,meta:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
    </svg>
  `,logging:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  `,browser:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <line x1="21.17" y1="8" x2="12" y2="8"></line>
      <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
      <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
    </svg>
  `,ui:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
  `,models:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
      ></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  `,bindings:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  `,broadcast:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path>
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path>
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path>
    </svg>
  `,audio:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9 18V5l12-2v13"></path>
      <circle cx="6" cy="18" r="3"></circle>
      <circle cx="18" cy="16" r="3"></circle>
    </svg>
  `,session:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  `,cron:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  `,web:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path
        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      ></path>
    </svg>
  `,discovery:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `,canvasHost:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  `,talk:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="23"></line>
      <line x1="8" y1="23" x2="16" y2="23"></line>
    </svg>
  `,plugins:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2v6"></path>
      <path d="m4.93 10.93 4.24 4.24"></path>
      <path d="M2 12h6"></path>
      <path d="m4.93 13.07 4.24-4.24"></path>
      <path d="M12 22v-6"></path>
      <path d="m19.07 13.07-4.24-4.24"></path>
      <path d="M22 12h-6"></path>
      <path d="m19.07 10.93-4.24 4.24"></path>
    </svg>
  `,default:r`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
  `},Ja=[{key:"env",label:"Environment"},{key:"update",label:"Updates"},{key:"agents",label:"Agents"},{key:"auth",label:"Authentication"},{key:"channels",label:"Channels"},{key:"messages",label:"Messages"},{key:"commands",label:"Commands"},{key:"hooks",label:"Hooks"},{key:"skills",label:"Skills"},{key:"tools",label:"Tools"},{key:"gateway",label:"Gateway"},{key:"wizard",label:"Setup Wizard"}],Xa="__all__";function er(e){return Ti[e]??Ti.default}function Iv(e,t){const n=oo[e];return n||{label:t?.title??Ge(e),description:t?.description??""}}function Mv(e){const{key:t,schema:n,uiHints:s}=e;if(!n||De(n)!=="object"||!n.properties)return[];const i=Object.entries(n.properties).map(([o,a])=>{const l=Ae([t,o],s),c=l?.label??a.title??Ge(o),u=l?.help??a.description??"",g=l?.order??50;return{key:o,label:c,description:u,order:g}});return i.sort((o,a)=>o.order!==a.order?o.order-a.order:o.key.localeCompare(a.key)),i}function Rv(e,t){if(!e||!t)return[];const n=[];function s(i,o,a){if(i===o)return;if(typeof i!=typeof o){n.push({path:a,from:i,to:o});return}if(typeof i!="object"||i===null||o===null){i!==o&&n.push({path:a,from:i,to:o});return}if(Array.isArray(i)&&Array.isArray(o)){JSON.stringify(i)!==JSON.stringify(o)&&n.push({path:a,from:i,to:o});return}const l=i,c=o,u=new Set([...Object.keys(l),...Object.keys(c)]);for(const g of u)s(l[g],c[g],a?`${a}.${g}`:g)}return s(e,t,""),n}function tr(e,t=40){let n;try{n=JSON.stringify(e)??String(e)}catch{n=String(e)}return n.length<=t?n:n.slice(0,t-3)+"..."}function Pv(e){const t=e.valid==null?"unknown":e.valid?"valid":"invalid",n=Cl(e.schema),s=n.schema?n.unsupportedPaths.length>0:!1,i=n.schema?.properties??{},o=Ja.filter(T=>T.key in i),a=new Set(Ja.map(T=>T.key)),l=Object.keys(i).filter(T=>!a.has(T)).map(T=>({key:T,label:T.charAt(0).toUpperCase()+T.slice(1)})),c=[...o,...l],u=e.activeSection&&n.schema&&De(n.schema)==="object"?n.schema.properties?.[e.activeSection]:void 0,g=e.activeSection?Iv(e.activeSection,u):null,h=e.activeSection?Mv({key:e.activeSection,schema:u,uiHints:e.uiHints}):[],f=e.formMode==="form"&&!!e.activeSection&&h.length>0,d=e.activeSubsection===Xa,p=e.searchQuery||d?null:e.activeSubsection??h[0]?.key??null,m=e.formMode==="form"?Rv(e.originalValue,e.formValue):[],S=e.formMode==="raw"&&e.raw!==e.originalRaw,k=e.formMode==="form"?m.length>0:S,w=!!e.formValue&&!e.loading&&!!n.schema,A=e.connected&&!e.saving&&k&&(e.formMode==="raw"?!0:w),C=e.connected&&!e.applying&&!e.updating&&k&&(e.formMode==="raw"?!0:w),_=e.connected&&!e.applying&&!e.updating;return r`
    <div class="config-layout">
      <!-- Sidebar -->
      <aside class="config-sidebar">
        <div class="config-sidebar__header">
          <div class="config-sidebar__title">Settings</div>
          <span
            class="pill pill--sm ${t==="valid"?"pill--ok":t==="invalid"?"pill--danger":""}"
            >${t}</span
          >
        </div>

        <!-- Search -->
        <div class="config-search">
          <svg
            class="config-search__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            class="config-search__input"
            placeholder="Search settings..."
            .value=${e.searchQuery}
            @input=${T=>e.onSearchChange(T.target.value)}
          />
          ${e.searchQuery?r`
                <button
                  class="config-search__clear"
                  @click=${()=>e.onSearchChange("")}
                >
                  ×
                </button>
              `:v}
        </div>

        <!-- Section nav -->
        <nav class="config-nav">
          <button
            class="config-nav__item ${e.activeSection===null?"active":""}"
            @click=${()=>e.onSectionChange(null)}
          >
            <span class="config-nav__icon">${Ti.all}</span>
            <span class="config-nav__label">All Settings</span>
          </button>
          ${c.map(T=>r`
              <button
                class="config-nav__item ${e.activeSection===T.key?"active":""}"
                @click=${()=>e.onSectionChange(T.key)}
              >
                <span class="config-nav__icon"
                  >${er(T.key)}</span
                >
                <span class="config-nav__label">${T.label}</span>
              </button>
            `)}
        </nav>

        <!-- Mode toggle at bottom -->
        <div class="config-sidebar__footer">
          <div class="config-mode-toggle">
            <button
              class="config-mode-toggle__btn ${e.formMode==="form"?"active":""}"
              ?disabled=${e.schemaLoading||!e.schema}
              @click=${()=>e.onFormModeChange("form")}
            >
              Form
            </button>
            <button
              class="config-mode-toggle__btn ${e.formMode==="raw"?"active":""}"
              @click=${()=>e.onFormModeChange("raw")}
            >
              Raw
            </button>
          </div>
        </div>
      </aside>

      <!-- Main content -->
      <main class="config-main">
        <!-- Action bar -->
        <div class="config-actions">
          <div class="config-actions__left">
            ${k?r`
                  <span class="config-changes-badge"
                    >${e.formMode==="raw"?"Unsaved changes":`${m.length} unsaved change${m.length!==1?"s":""}`}</span
                  >
                `:r`
                    <span class="config-status muted">No changes</span>
                  `}
          </div>
          <div class="config-actions__right">
            <button
              class="btn btn--sm"
              ?disabled=${e.loading}
              @click=${e.onReload}
            >
              ${e.loading?"Loading…":"Reload"}
            </button>
            <button
              class="btn btn--sm primary"
              ?disabled=${!A}
              @click=${e.onSave}
            >
              ${e.saving?"Saving…":"Save"}
            </button>
            <button
              class="btn btn--sm"
              ?disabled=${!C}
              @click=${e.onApply}
            >
              ${e.applying?"Applying…":"Apply"}
            </button>
            <button
              class="btn btn--sm"
              ?disabled=${!_}
              @click=${e.onUpdate}
            >
              ${e.updating?"Updating…":"Update"}
            </button>
          </div>
        </div>

        <!-- Diff panel (form mode only - raw mode doesn't have granular diff) -->
        ${k&&e.formMode==="form"?r`
              <details class="config-diff">
                <summary class="config-diff__summary">
                  <span
                    >View ${m.length} pending
                    change${m.length!==1?"s":""}</span
                  >
                  <svg
                    class="config-diff__chevron"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </summary>
                <div class="config-diff__content">
                  ${m.map(T=>r`
                      <div class="config-diff__item">
                        <div class="config-diff__path">${T.path}</div>
                        <div class="config-diff__values">
                          <span class="config-diff__from"
                            >${tr(T.from)}</span
                          >
                          <span class="config-diff__arrow">→</span>
                          <span class="config-diff__to"
                            >${tr(T.to)}</span
                          >
                        </div>
                      </div>
                    `)}
                </div>
              </details>
            `:v}
        ${g&&e.formMode==="form"?r`
              <div class="config-section-hero">
                <div class="config-section-hero__icon">
                  ${er(e.activeSection??"")}
                </div>
                <div class="config-section-hero__text">
                  <div class="config-section-hero__title">
                    ${g.label}
                  </div>
                  ${g.description?r`<div class="config-section-hero__desc">
                        ${g.description}
                      </div>`:v}
                </div>
              </div>
            `:v}
        ${f?r`
              <div class="config-subnav">
                <button
                  class="config-subnav__item ${p===null?"active":""}"
                  @click=${()=>e.onSubsectionChange(Xa)}
                >
                  All
                </button>
                ${h.map(T=>r`
                    <button
                      class="config-subnav__item ${p===T.key?"active":""}"
                      title=${T.description||T.label}
                      @click=${()=>e.onSubsectionChange(T.key)}
                    >
                      ${T.label}
                    </button>
                  `)}
              </div>
            `:v}

        <!-- Form content -->
        <div class="config-content">
          ${e.formMode==="form"?r`
                ${e.schemaLoading?r`
                        <div class="config-loading">
                          <div class="config-loading__spinner"></div>
                          <span>Loading schema…</span>
                        </div>
                      `:Gp({schema:n.schema,uiHints:e.uiHints,value:e.formValue,disabled:e.loading||!e.formValue,unsupportedPaths:n.unsupportedPaths,onPatch:e.onFormPatch,searchQuery:e.searchQuery,activeSection:e.activeSection,activeSubsection:p})}
                ${s?r`
                        <div class="callout danger" style="margin-top: 12px">
                          Form view can't safely edit some fields. Use Raw to avoid losing config entries.
                        </div>
                      `:v}
              `:r`
                <label class="field config-raw-field">
                  <span>Raw JSON5</span>
                  <textarea
                    .value=${e.raw}
                    @input=${T=>e.onRawChange(T.target.value)}
                  ></textarea>
                </label>
              `}
        </div>

        ${e.issues.length>0?r`<div class="callout danger" style="margin-top: 12px;">
              <pre class="code-block">
${JSON.stringify(e.issues,null,2)}</pre
              >
            </div>`:v}
      </main>
    </div>
  `}function Dv(e){const t=["last",...e.channels.filter(Boolean)],n=e.form.deliveryChannel?.trim();n&&!t.includes(n)&&t.push(n);const s=new Set;return t.filter(i=>s.has(i)?!1:(s.add(i),!0))}function Nv(e,t){if(t==="last")return"last";const n=e.channelMeta?.find(s=>s.id===t);return n?.label?n.label:e.channelLabels?.[t]??t}function Fv(e){const t=Dv(e),s=(e.runsJobId==null?void 0:e.jobs.find(o=>o.id===e.runsJobId))?.name??e.runsJobId??"(select a job)",i=e.runs.toSorted((o,a)=>a.ts-o.ts);return r`
    <section class="grid grid-cols-2">
      <div class="card">
        <div class="card-title">Scheduler</div>
        <div class="card-sub">Gateway-owned cron scheduler status.</div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">Enabled</div>
            <div class="stat-value">
              ${e.status?e.status.enabled?"Yes":"No":"n/a"}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">Jobs</div>
            <div class="stat-value">${e.status?.jobs??"n/a"}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Next wake</div>
            <div class="stat-value">${io(e.status?.nextWakeAtMs??null)}</div>
          </div>
        </div>
        <div class="row" style="margin-top: 12px;">
          <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Refreshing…":"Refresh"}
          </button>
          ${e.error?r`<span class="muted">${e.error}</span>`:v}
        </div>
      </div>

      <div class="card">
        <div class="card-title">New Job</div>
        <div class="card-sub">Create a scheduled wakeup or agent run.</div>
        <div class="form-grid" style="margin-top: 16px;">
          <label class="field">
            <span>Name</span>
            <input
              .value=${e.form.name}
              @input=${o=>e.onFormChange({name:o.target.value})}
            />
          </label>
          <label class="field">
            <span>Description</span>
            <input
              .value=${e.form.description}
              @input=${o=>e.onFormChange({description:o.target.value})}
            />
          </label>
          <label class="field">
            <span>Agent ID</span>
            <input
              .value=${e.form.agentId}
              @input=${o=>e.onFormChange({agentId:o.target.value})}
              placeholder="default"
            />
          </label>
          <label class="field checkbox">
            <span>Enabled</span>
            <input
              type="checkbox"
              .checked=${e.form.enabled}
              @change=${o=>e.onFormChange({enabled:o.target.checked})}
            />
          </label>
          <label class="field">
            <span>Schedule</span>
            <select
              .value=${e.form.scheduleKind}
              @change=${o=>e.onFormChange({scheduleKind:o.target.value})}
            >
              <option value="every">Every</option>
              <option value="at">At</option>
              <option value="cron">Cron</option>
            </select>
          </label>
        </div>
        ${Ov(e)}
        <div class="form-grid" style="margin-top: 12px;">
          <label class="field">
            <span>Session</span>
            <select
              .value=${e.form.sessionTarget}
              @change=${o=>e.onFormChange({sessionTarget:o.target.value})}
            >
              <option value="main">Main</option>
              <option value="isolated">Isolated</option>
            </select>
          </label>
          <label class="field">
            <span>Wake mode</span>
            <select
              .value=${e.form.wakeMode}
              @change=${o=>e.onFormChange({wakeMode:o.target.value})}
            >
              <option value="now">Now</option>
              <option value="next-heartbeat">Next heartbeat</option>
            </select>
          </label>
          <label class="field">
            <span>Payload</span>
            <select
              .value=${e.form.payloadKind}
              @change=${o=>e.onFormChange({payloadKind:o.target.value})}
            >
              <option value="systemEvent">System event</option>
              <option value="agentTurn">Agent turn</option>
            </select>
          </label>
        </div>
        <label class="field" style="margin-top: 12px;">
          <span>${e.form.payloadKind==="systemEvent"?"System text":"Agent message"}</span>
          <textarea
            .value=${e.form.payloadText}
            @input=${o=>e.onFormChange({payloadText:o.target.value})}
            rows="4"
          ></textarea>
        </label>
        ${e.form.payloadKind==="agentTurn"?r`
                <div class="form-grid" style="margin-top: 12px;">
                  <label class="field">
                    <span>Delivery</span>
                    <select
                      .value=${e.form.deliveryMode}
                      @change=${o=>e.onFormChange({deliveryMode:o.target.value})}
                    >
                      <option value="announce">Announce summary (default)</option>
                      <option value="none">None (internal)</option>
                    </select>
                  </label>
                  <label class="field">
                    <span>Timeout (seconds)</span>
                    <input
                      .value=${e.form.timeoutSeconds}
                      @input=${o=>e.onFormChange({timeoutSeconds:o.target.value})}
                    />
                  </label>
                  ${e.form.deliveryMode==="announce"?r`
                          <label class="field">
                            <span>Channel</span>
                            <select
                              .value=${e.form.deliveryChannel||"last"}
                              @change=${o=>e.onFormChange({deliveryChannel:o.target.value})}
                            >
                              ${t.map(o=>r`<option value=${o}>
                                    ${Nv(e,o)}
                                  </option>`)}
                            </select>
                          </label>
                          <label class="field">
                            <span>To</span>
                            <input
                              .value=${e.form.deliveryTo}
                              @input=${o=>e.onFormChange({deliveryTo:o.target.value})}
                              placeholder="+1555… or chat id"
                            />
                          </label>
                        `:v}
                </div>
              `:v}
        <div class="row" style="margin-top: 14px;">
          <button class="btn primary" ?disabled=${e.busy} @click=${e.onAdd}>
            ${e.busy?"Saving…":"Add job"}
          </button>
        </div>
      </div>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">Jobs</div>
      <div class="card-sub">All scheduled jobs stored in the gateway.</div>
      ${e.jobs.length===0?r`
              <div class="muted" style="margin-top: 12px">No jobs yet.</div>
            `:r`
            <div class="list" style="margin-top: 12px;">
              ${e.jobs.map(o=>Bv(o,e))}
            </div>
          `}
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">Run history</div>
      <div class="card-sub">Latest runs for ${s}.</div>
      ${e.runsJobId==null?r`
              <div class="muted" style="margin-top: 12px">Select a job to inspect run history.</div>
            `:i.length===0?r`
                <div class="muted" style="margin-top: 12px">No runs yet.</div>
              `:r`
              <div class="list" style="margin-top: 12px;">
                ${i.map(o=>Hv(o,e.basePath))}
              </div>
            `}
    </section>
  `}function Ov(e){const t=e.form;return t.scheduleKind==="at"?r`
      <label class="field" style="margin-top: 12px;">
        <span>Run at</span>
        <input
          type="datetime-local"
          .value=${t.scheduleAt}
          @input=${n=>e.onFormChange({scheduleAt:n.target.value})}
        />
      </label>
    `:t.scheduleKind==="every"?r`
      <div class="form-grid" style="margin-top: 12px;">
        <label class="field">
          <span>Every</span>
          <input
            .value=${t.everyAmount}
            @input=${n=>e.onFormChange({everyAmount:n.target.value})}
          />
        </label>
        <label class="field">
          <span>Unit</span>
          <select
            .value=${t.everyUnit}
            @change=${n=>e.onFormChange({everyUnit:n.target.value})}
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
        </label>
      </div>
    `:r`
    <div class="form-grid" style="margin-top: 12px;">
      <label class="field">
        <span>Expression</span>
        <input
          .value=${t.cronExpr}
          @input=${n=>e.onFormChange({cronExpr:n.target.value})}
        />
      </label>
      <label class="field">
        <span>Timezone (optional)</span>
        <input
          .value=${t.cronTz}
          @input=${n=>e.onFormChange({cronTz:n.target.value})}
        />
      </label>
    </div>
  `}function Bv(e,t){const s=`list-item list-item-clickable cron-job${t.runsJobId===e.id?" list-item-selected":""}`;return r`
    <div class=${s} @click=${()=>t.onLoadRuns(e.id)}>
      <div class="list-main">
        <div class="list-title">${e.name}</div>
        <div class="list-sub">${xl(e)}</div>
        ${zv(e)}
        ${e.agentId?r`<div class="muted cron-job-agent">Agent: ${e.agentId}</div>`:v}
      </div>
      <div class="list-meta">
        ${Uv(e)}
      </div>
      <div class="cron-job-footer">
        <div class="chip-row cron-job-chips">
          <span class=${`chip ${e.enabled?"chip-ok":"chip-danger"}`}>
            ${e.enabled?"enabled":"disabled"}
          </span>
          <span class="chip">${e.sessionTarget}</span>
          <span class="chip">${e.wakeMode}</span>
        </div>
        <div class="row cron-job-actions">
          <button
            class="btn"
            ?disabled=${t.busy}
            @click=${i=>{i.stopPropagation(),t.onToggle(e,!e.enabled)}}
          >
            ${e.enabled?"Disable":"Enable"}
          </button>
          <button
            class="btn"
            ?disabled=${t.busy}
            @click=${i=>{i.stopPropagation(),t.onRun(e)}}
          >
            Run
          </button>
          <button
            class="btn"
            ?disabled=${t.busy}
            @click=${i=>{i.stopPropagation(),t.onLoadRuns(e.id)}}
          >
            History
          </button>
          <button
            class="btn danger"
            ?disabled=${t.busy}
            @click=${i=>{i.stopPropagation(),t.onRemove(e)}}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  `}function zv(e){if(e.payload.kind==="systemEvent")return r`<div class="cron-job-detail">
      <span class="cron-job-detail-label">System</span>
      <span class="muted cron-job-detail-value">${e.payload.text}</span>
    </div>`;const t=e.delivery,n=t?.channel||t?.to?` (${t.channel??"last"}${t.to?` -> ${t.to}`:""})`:"";return r`
    <div class="cron-job-detail">
      <span class="cron-job-detail-label">Prompt</span>
      <span class="muted cron-job-detail-value">${e.payload.message}</span>
    </div>
    ${t?r`<div class="cron-job-detail">
            <span class="cron-job-detail-label">Delivery</span>
            <span class="muted cron-job-detail-value">${t.mode}${n}</span>
          </div>`:v}
  `}function nr(e){return typeof e!="number"||!Number.isFinite(e)?"n/a":V(e)}function Uv(e){const t=e.state?.lastStatus??"n/a",n=t==="ok"?"cron-job-status-ok":t==="error"?"cron-job-status-error":t==="skipped"?"cron-job-status-skipped":"cron-job-status-na",s=e.state?.nextRunAtMs,i=e.state?.lastRunAtMs;return r`
    <div class="cron-job-state">
      <div class="cron-job-state-row">
        <span class="cron-job-state-key">Status</span>
        <span class=${`cron-job-status-pill ${n}`}>${t}</span>
      </div>
      <div class="cron-job-state-row">
        <span class="cron-job-state-key">Next</span>
        <span class="cron-job-state-value" title=${ft(s)}>
          ${nr(s)}
        </span>
      </div>
      <div class="cron-job-state-row">
        <span class="cron-job-state-key">Last</span>
        <span class="cron-job-state-value" title=${ft(i)}>
          ${nr(i)}
        </span>
      </div>
    </div>
  `}function Hv(e,t){const n=typeof e.sessionKey=="string"&&e.sessionKey.trim().length>0?`${ls("chat",t)}?session=${encodeURIComponent(e.sessionKey)}`:null;return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.status}</div>
        <div class="list-sub">${e.summary??""}</div>
      </div>
      <div class="list-meta">
        <div>${ft(e.ts)}</div>
        <div class="muted">${e.durationMs??0}ms</div>
        ${n?r`<div><a class="session-link" href=${n}>Open run chat</a></div>`:v}
        ${e.error?r`<div class="muted">${e.error}</div>`:v}
      </div>
    </div>
  `}function Kv(e){const n=(e.status&&typeof e.status=="object"?e.status.securityAudit:null)?.summary??null,s=n?.critical??0,i=n?.warn??0,o=n?.info??0,a=s>0?"danger":i>0?"warn":"success",l=s>0?`${s} critical`:i>0?`${i} warnings`:"No critical issues";return r`
    <section class="grid grid-cols-2">
      <div class="card">
        <div class="row" style="justify-content: space-between;">
          <div>
            <div class="card-title">Snapshots</div>
            <div class="card-sub">Status, health, and heartbeat data.</div>
          </div>
          <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Refreshing…":"Refresh"}
          </button>
        </div>
        <div class="stack" style="margin-top: 12px;">
          <div>
            <div class="muted">Status</div>
            ${n?r`<div class="callout ${a}" style="margin-top: 8px;">
                  Security audit: ${l}${o>0?` · ${o} info`:""}. Run
                  <span class="mono">opensoul security audit --deep</span> for details.
                </div>`:v}
            <pre class="code-block">${JSON.stringify(e.status??{},null,2)}</pre>
          </div>
          <div>
            <div class="muted">Health</div>
            <pre class="code-block">${JSON.stringify(e.health??{},null,2)}</pre>
          </div>
          <div>
            <div class="muted">Last heartbeat</div>
            <pre class="code-block">${JSON.stringify(e.heartbeat??{},null,2)}</pre>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Manual RPC</div>
        <div class="card-sub">Send a raw gateway method with JSON params.</div>
        <div class="form-grid" style="margin-top: 16px;">
          <label class="field">
            <span>Method</span>
            <input
              .value=${e.callMethod}
              @input=${c=>e.onCallMethodChange(c.target.value)}
              placeholder="system-presence"
            />
          </label>
          <label class="field">
            <span>Params (JSON)</span>
            <textarea
              .value=${e.callParams}
              @input=${c=>e.onCallParamsChange(c.target.value)}
              rows="6"
            ></textarea>
          </label>
        </div>
        <div class="row" style="margin-top: 12px;">
          <button class="btn primary" @click=${e.onCall}>Call</button>
        </div>
        ${e.callError?r`<div class="callout danger" style="margin-top: 12px;">
              ${e.callError}
            </div>`:v}
        ${e.callResult?r`<pre class="code-block" style="margin-top: 12px;">${e.callResult}</pre>`:v}
      </div>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">Models</div>
      <div class="card-sub">Catalog from models.list.</div>
      <pre class="code-block" style="margin-top: 12px;">${JSON.stringify(e.models??[],null,2)}</pre>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">Event Log</div>
      <div class="card-sub">Latest gateway events.</div>
      ${e.eventLog.length===0?r`
              <div class="muted" style="margin-top: 12px">No events yet.</div>
            `:r`
            <div class="list" style="margin-top: 12px;">
              ${e.eventLog.map(c=>r`
                  <div class="list-item">
                    <div class="list-main">
                      <div class="list-title">${c.event}</div>
                      <div class="list-sub">${new Date(c.ts).toLocaleTimeString()}</div>
                    </div>
                    <div class="list-meta">
                      <pre class="code-block">${rp(c.payload)}</pre>
                    </div>
                  </div>
                `)}
            </div>
          `}
    </section>
  `}function jv(e){const t=Math.max(0,e),n=Math.floor(t/1e3);if(n<60)return`${n}s`;const s=Math.floor(n/60);return s<60?`${s}m`:`${Math.floor(s/60)}h`}function ot(e,t){return t?r`<div class="exec-approval-meta-row"><span>${e}</span><span>${t}</span></div>`:v}function Wv(e){const t=e.execApprovalQueue[0];if(!t)return v;const n=t.request,s=t.expiresAtMs-Date.now(),i=s>0?`expires in ${jv(s)}`:"expired",o=e.execApprovalQueue.length;return r`
    <div class="exec-approval-overlay" role="dialog" aria-live="polite">
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">Exec approval needed</div>
            <div class="exec-approval-sub">${i}</div>
          </div>
          ${o>1?r`<div class="exec-approval-queue">${o} pending</div>`:v}
        </div>
        <div class="exec-approval-command mono">${n.command}</div>
        <div class="exec-approval-meta">
          ${ot("Host",n.host)}
          ${ot("Agent",n.agentId)}
          ${ot("Session",n.sessionKey)}
          ${ot("CWD",n.cwd)}
          ${ot("Resolved",n.resolvedPath)}
          ${ot("Security",n.security)}
          ${ot("Ask",n.ask)}
        </div>
        ${e.execApprovalError?r`<div class="exec-approval-error">${e.execApprovalError}</div>`:v}
        <div class="exec-approval-actions">
          <button
            class="btn primary"
            ?disabled=${e.execApprovalBusy}
            @click=${()=>e.handleExecApprovalDecision("allow-once")}
          >
            Allow once
          </button>
          <button
            class="btn"
            ?disabled=${e.execApprovalBusy}
            @click=${()=>e.handleExecApprovalDecision("allow-always")}
          >
            Always allow
          </button>
          <button
            class="btn danger"
            ?disabled=${e.execApprovalBusy}
            @click=${()=>e.handleExecApprovalDecision("deny")}
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  `}function Gv(e){const{pendingGatewayUrl:t}=e;return t?r`
    <div class="exec-approval-overlay" role="dialog" aria-modal="true" aria-live="polite">
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">Change Gateway URL</div>
            <div class="exec-approval-sub">This will reconnect to a different gateway server</div>
          </div>
        </div>
        <div class="exec-approval-command mono">${t}</div>
        <div class="callout danger" style="margin-top: 12px;">
          Only confirm if you trust this URL. Malicious URLs can compromise your system.
        </div>
        <div class="exec-approval-actions">
          <button
            class="btn primary"
            @click=${()=>e.handleGatewayUrlConfirm()}
          >
            Confirm
          </button>
          <button
            class="btn"
            @click=${()=>e.handleGatewayUrlCancel()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  `:v}function qv(e){return r`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Connected Instances</div>
          <div class="card-sub">Presence beacons from the gateway and clients.</div>
        </div>
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?"Loading…":"Refresh"}
        </button>
      </div>
      ${e.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${e.lastError}
          </div>`:v}
      ${e.statusMessage?r`<div class="callout" style="margin-top: 12px;">
            ${e.statusMessage}
          </div>`:v}
      <div class="list" style="margin-top: 16px;">
        ${e.entries.length===0?r`
                <div class="muted">No instances reported yet.</div>
              `:e.entries.map(t=>Vv(t))}
      </div>
    </section>
  `}function Vv(e){const t=e.lastInputSeconds!=null?`${e.lastInputSeconds}s ago`:"n/a",n=e.mode??"unknown",s=Array.isArray(e.roles)?e.roles.filter(Boolean):[],i=Array.isArray(e.scopes)?e.scopes.filter(Boolean):[],o=i.length>0?i.length>3?`${i.length} scopes`:`scopes: ${i.join(", ")}`:null;return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.host??"unknown host"}</div>
        <div class="list-sub">${ip(e)}</div>
        <div class="chip-row">
          <span class="chip">${n}</span>
          ${s.map(a=>r`<span class="chip">${a}</span>`)}
          ${o?r`<span class="chip">${o}</span>`:v}
          ${e.platform?r`<span class="chip">${e.platform}</span>`:v}
          ${e.deviceFamily?r`<span class="chip">${e.deviceFamily}</span>`:v}
          ${e.modelIdentifier?r`<span class="chip">${e.modelIdentifier}</span>`:v}
          ${e.version?r`<span class="chip">${e.version}</span>`:v}
        </div>
      </div>
      <div class="list-meta">
        <div>${op(e)}</div>
        <div class="muted">Last input ${t}</div>
        <div class="muted">Reason ${e.reason??""}</div>
      </div>
    </div>
  `}const sr=["trace","debug","info","warn","error","fatal"];function Qv(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleTimeString()}function Yv(e,t){return t?[e.message,e.subsystem,e.raw].filter(Boolean).join(" ").toLowerCase().includes(t):!0}function Zv(e){const t=e.filterText.trim().toLowerCase(),n=sr.some(o=>!e.levelFilters[o]),s=e.entries.filter(o=>o.level&&!e.levelFilters[o.level]?!1:Yv(o,t)),i=t||n?"filtered":"visible";return r`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Logs</div>
          <div class="card-sub">Gateway file logs (JSONL).</div>
        </div>
        <div class="row" style="gap: 8px;">
          <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Loading…":"Refresh"}
          </button>
          <button
            class="btn"
            ?disabled=${s.length===0}
            @click=${()=>e.onExport(s.map(o=>o.raw),i)}
          >
            Export ${i}
          </button>
        </div>
      </div>

      <div class="filters" style="margin-top: 14px;">
        <label class="field" style="min-width: 220px;">
          <span>Filter</span>
          <input
            .value=${e.filterText}
            @input=${o=>e.onFilterTextChange(o.target.value)}
            placeholder="Search logs"
          />
        </label>
        <label class="field checkbox">
          <span>Auto-follow</span>
          <input
            type="checkbox"
            .checked=${e.autoFollow}
            @change=${o=>e.onToggleAutoFollow(o.target.checked)}
          />
        </label>
      </div>

      <div class="chip-row" style="margin-top: 12px;">
        ${sr.map(o=>r`
            <label class="chip log-chip ${o}">
              <input
                type="checkbox"
                .checked=${e.levelFilters[o]}
                @change=${a=>e.onLevelToggle(o,a.target.checked)}
              />
              <span>${o}</span>
            </label>
          `)}
      </div>

      ${e.file?r`<div class="muted" style="margin-top: 10px;">File: ${e.file}</div>`:v}
      ${e.truncated?r`
              <div class="callout" style="margin-top: 10px">Log output truncated; showing latest chunk.</div>
            `:v}
      ${e.error?r`<div class="callout danger" style="margin-top: 10px;">${e.error}</div>`:v}

      <div class="log-stream" style="margin-top: 12px;" @scroll=${e.onScroll}>
        ${s.length===0?r`
                <div class="muted" style="padding: 12px">No log entries.</div>
              `:s.map(o=>r`
                <div class="log-row">
                  <div class="log-time mono">${Qv(o.time)}</div>
                  <div class="log-level ${o.level??""}">${o.level??""}</div>
                  <div class="log-subsystem mono">${o.subsystem??""}</div>
                  <div class="log-message mono">${o.message??o.raw}</div>
                </div>
              `)}
      </div>
    </section>
  `}function Jv(e){const t=im(e),n=dm(e);return r`
    ${gm(n)}
    ${um(t)}
    ${Xv(e)}
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Nodes</div>
          <div class="card-sub">Paired devices and live links.</div>
        </div>
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?"Loading…":"Refresh"}
        </button>
      </div>
      <div class="list" style="margin-top: 16px;">
        ${e.nodes.length===0?r`
                <div class="muted">No nodes found.</div>
              `:e.nodes.map(s=>wm(s))}
      </div>
    </section>
  `}function Xv(e){const t=e.devicesList??{pending:[],paired:[]},n=Array.isArray(t.pending)?t.pending:[],s=Array.isArray(t.paired)?t.paired:[];return r`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Devices</div>
          <div class="card-sub">Pairing requests + role tokens.</div>
        </div>
        <button class="btn" ?disabled=${e.devicesLoading} @click=${e.onDevicesRefresh}>
          ${e.devicesLoading?"Loading…":"Refresh"}
        </button>
      </div>
      ${e.devicesError?r`<div class="callout danger" style="margin-top: 12px;">${e.devicesError}</div>`:v}
      <div class="list" style="margin-top: 16px;">
        ${n.length>0?r`
              <div class="muted" style="margin-bottom: 8px;">Pending</div>
              ${n.map(i=>em(i,e))}
            `:v}
        ${s.length>0?r`
              <div class="muted" style="margin-top: 12px; margin-bottom: 8px;">Paired</div>
              ${s.map(i=>tm(i,e))}
            `:v}
        ${n.length===0&&s.length===0?r`
                <div class="muted">No paired devices.</div>
              `:v}
      </div>
    </section>
  `}function em(e,t){const n=e.displayName?.trim()||e.deviceId,s=typeof e.ts=="number"?V(e.ts):"n/a",i=e.role?.trim()?`role: ${e.role}`:"role: -",o=e.isRepair?" · repair":"",a=e.remoteIp?` · ${e.remoteIp}`:"";return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${n}</div>
        <div class="list-sub">${e.deviceId}${a}</div>
        <div class="muted" style="margin-top: 6px;">
          ${i} · requested ${s}${o}
        </div>
      </div>
      <div class="list-meta">
        <div class="row" style="justify-content: flex-end; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn--sm primary" @click=${()=>t.onDeviceApprove(e.requestId)}>
            Approve
          </button>
          <button class="btn btn--sm" @click=${()=>t.onDeviceReject(e.requestId)}>
            Reject
          </button>
        </div>
      </div>
    </div>
  `}function tm(e,t){const n=e.displayName?.trim()||e.deviceId,s=e.remoteIp?` · ${e.remoteIp}`:"",i=`roles: ${ti(e.roles)}`,o=`scopes: ${ti(e.scopes)}`,a=Array.isArray(e.tokens)?e.tokens:[];return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${n}</div>
        <div class="list-sub">${e.deviceId}${s}</div>
        <div class="muted" style="margin-top: 6px;">${i} · ${o}</div>
        ${a.length===0?r`
                <div class="muted" style="margin-top: 6px">Tokens: none</div>
              `:r`
              <div class="muted" style="margin-top: 10px;">Tokens</div>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px;">
                ${a.map(l=>nm(e.deviceId,l,t))}
              </div>
            `}
      </div>
    </div>
  `}function nm(e,t,n){const s=t.revokedAtMs?"revoked":"active",i=`scopes: ${ti(t.scopes)}`,o=V(t.rotatedAtMs??t.createdAtMs??t.lastUsedAtMs??null);return r`
    <div class="row" style="justify-content: space-between; gap: 8px;">
      <div class="list-sub">${t.role} · ${s} · ${i} · ${o}</div>
      <div class="row" style="justify-content: flex-end; gap: 6px; flex-wrap: wrap;">
        <button
          class="btn btn--sm"
          @click=${()=>n.onDeviceRotate(e,t.role,t.scopes)}
        >
          Rotate
        </button>
        ${t.revokedAtMs?v:r`
              <button
                class="btn btn--sm danger"
                @click=${()=>n.onDeviceRevoke(e,t.role)}
              >
                Revoke
              </button>
            `}
      </div>
    </div>
  `}const Qe="__defaults__",ir=[{value:"deny",label:"Deny"},{value:"allowlist",label:"Allowlist"},{value:"full",label:"Full"}],sm=[{value:"off",label:"Off"},{value:"on-miss",label:"On miss"},{value:"always",label:"Always"}];function im(e){const t=e.configForm,n=ym(e.nodes),{defaultBinding:s,agents:i}=$m(t),o=!!t,a=e.configSaving||e.configFormMode==="raw";return{ready:o,disabled:a,configDirty:e.configDirty,configLoading:e.configLoading,configSaving:e.configSaving,defaultBinding:s,agents:i,nodes:n,onBindDefault:e.onBindDefault,onBindAgent:e.onBindAgent,onSave:e.onSaveBindings,onLoadConfig:e.onLoadConfig,formMode:e.configFormMode}}function or(e){return e==="allowlist"||e==="full"||e==="deny"?e:"deny"}function om(e){return e==="always"||e==="off"||e==="on-miss"?e:"on-miss"}function am(e){const t=e?.defaults??{};return{security:or(t.security),ask:om(t.ask),askFallback:or(t.askFallback??"deny"),autoAllowSkills:!!(t.autoAllowSkills??!1)}}function rm(e){const t=e?.agents??{},n=Array.isArray(t.list)?t.list:[],s=[];return n.forEach(i=>{if(!i||typeof i!="object")return;const o=i,a=typeof o.id=="string"?o.id.trim():"";if(!a)return;const l=typeof o.name=="string"?o.name.trim():void 0,c=o.default===!0;s.push({id:a,name:l||void 0,isDefault:c})}),s}function lm(e,t){const n=rm(e),s=Object.keys(t?.agents??{}),i=new Map;n.forEach(a=>i.set(a.id,a)),s.forEach(a=>{i.has(a)||i.set(a,{id:a})});const o=Array.from(i.values());return o.length===0&&o.push({id:"main",isDefault:!0}),o.sort((a,l)=>{if(a.isDefault&&!l.isDefault)return-1;if(!a.isDefault&&l.isDefault)return 1;const c=a.name?.trim()?a.name:a.id,u=l.name?.trim()?l.name:l.id;return c.localeCompare(u)}),o}function cm(e,t){return e===Qe?Qe:e&&t.some(n=>n.id===e)?e:Qe}function dm(e){const t=e.execApprovalsForm??e.execApprovalsSnapshot?.file??null,n=!!t,s=am(t),i=lm(e.configForm,t),o=xm(e.nodes),a=e.execApprovalsTarget;let l=a==="node"&&e.execApprovalsTargetNodeId?e.execApprovalsTargetNodeId:null;a==="node"&&l&&!o.some(h=>h.id===l)&&(l=null);const c=cm(e.execApprovalsSelectedAgent,i),u=c!==Qe?(t?.agents??{})[c]??null:null,g=Array.isArray(u?.allowlist)?u.allowlist??[]:[];return{ready:n,disabled:e.execApprovalsSaving||e.execApprovalsLoading,dirty:e.execApprovalsDirty,loading:e.execApprovalsLoading,saving:e.execApprovalsSaving,form:t,defaults:s,selectedScope:c,selectedAgent:u,agents:i,allowlist:g,target:a,targetNodeId:l,targetNodes:o,onSelectScope:e.onExecApprovalsSelectAgent,onSelectTarget:e.onExecApprovalsTargetChange,onPatch:e.onExecApprovalsPatch,onRemove:e.onExecApprovalsRemove,onLoad:e.onLoadExecApprovals,onSave:e.onSaveExecApprovals}}function um(e){const t=e.nodes.length>0,n=e.defaultBinding??"";return r`
    <section class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <div>
          <div class="card-title">Exec node binding</div>
          <div class="card-sub">
            Pin agents to a specific node when using <span class="mono">exec host=node</span>.
          </div>
        </div>
        <button
          class="btn"
          ?disabled=${e.disabled||!e.configDirty}
          @click=${e.onSave}
        >
          ${e.configSaving?"Saving…":"Save"}
        </button>
      </div>

      ${e.formMode==="raw"?r`
              <div class="callout warn" style="margin-top: 12px">
                Switch the Config tab to <strong>Form</strong> mode to edit bindings here.
              </div>
            `:v}

      ${e.ready?r`
            <div class="list" style="margin-top: 16px;">
              <div class="list-item">
                <div class="list-main">
                  <div class="list-title">Default binding</div>
                  <div class="list-sub">Used when agents do not override a node binding.</div>
                </div>
                <div class="list-meta">
                  <label class="field">
                    <span>Node</span>
                    <select
                      ?disabled=${e.disabled||!t}
                      @change=${s=>{const o=s.target.value.trim();e.onBindDefault(o||null)}}
                    >
                      <option value="" ?selected=${n===""}>Any node</option>
                      ${e.nodes.map(s=>r`<option
                            value=${s.id}
                            ?selected=${n===s.id}
                          >
                            ${s.label}
                          </option>`)}
                    </select>
                  </label>
                  ${t?v:r`
                          <div class="muted">No nodes with system.run available.</div>
                        `}
                </div>
              </div>

              ${e.agents.length===0?r`
                      <div class="muted">No agents found.</div>
                    `:e.agents.map(s=>bm(s,e))}
            </div>
          `:r`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load config to edit bindings.</div>
            <button class="btn" ?disabled=${e.configLoading} @click=${e.onLoadConfig}>
              ${e.configLoading?"Loading…":"Load config"}
            </button>
          </div>`}
    </section>
  `}function gm(e){const t=e.ready,n=e.target!=="node"||!!e.targetNodeId;return r`
    <section class="card">
      <div class="row" style="justify-content: space-between; align-items: center;">
        <div>
          <div class="card-title">Exec approvals</div>
          <div class="card-sub">
            Allowlist and approval policy for <span class="mono">exec host=gateway/node</span>.
          </div>
        </div>
        <button
          class="btn"
          ?disabled=${e.disabled||!e.dirty||!n}
          @click=${e.onSave}
        >
          ${e.saving?"Saving…":"Save"}
        </button>
      </div>

      ${pm(e)}

      ${t?r`
            ${hm(e)}
            ${fm(e)}
            ${e.selectedScope===Qe?v:vm(e)}
          `:r`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load exec approvals to edit allowlists.</div>
            <button class="btn" ?disabled=${e.loading||!n} @click=${e.onLoad}>
              ${e.loading?"Loading…":"Load approvals"}
            </button>
          </div>`}
    </section>
  `}function pm(e){const t=e.targetNodes.length>0,n=e.targetNodeId??"";return r`
    <div class="list" style="margin-top: 12px;">
      <div class="list-item">
        <div class="list-main">
          <div class="list-title">Target</div>
          <div class="list-sub">
            Gateway edits local approvals; node edits the selected node.
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Host</span>
            <select
              ?disabled=${e.disabled}
              @change=${s=>{if(s.target.value==="node"){const a=e.targetNodes[0]?.id??null;e.onSelectTarget("node",n||a)}else e.onSelectTarget("gateway",null)}}
            >
              <option value="gateway" ?selected=${e.target==="gateway"}>Gateway</option>
              <option value="node" ?selected=${e.target==="node"}>Node</option>
            </select>
          </label>
          ${e.target==="node"?r`
                <label class="field">
                  <span>Node</span>
                  <select
                    ?disabled=${e.disabled||!t}
                    @change=${s=>{const o=s.target.value.trim();e.onSelectTarget("node",o||null)}}
                  >
                    <option value="" ?selected=${n===""}>Select node</option>
                    ${e.targetNodes.map(s=>r`<option
                          value=${s.id}
                          ?selected=${n===s.id}
                        >
                          ${s.label}
                        </option>`)}
                  </select>
                </label>
              `:v}
        </div>
      </div>
      ${e.target==="node"&&!t?r`
              <div class="muted">No nodes advertise exec approvals yet.</div>
            `:v}
    </div>
  `}function hm(e){return r`
    <div class="row" style="margin-top: 12px; gap: 8px; flex-wrap: wrap;">
      <span class="label">Scope</span>
      <div class="row" style="gap: 8px; flex-wrap: wrap;">
        <button
          class="btn btn--sm ${e.selectedScope===Qe?"active":""}"
          @click=${()=>e.onSelectScope(Qe)}
        >
          Defaults
        </button>
        ${e.agents.map(t=>{const n=t.name?.trim()?`${t.name} (${t.id})`:t.id;return r`
            <button
              class="btn btn--sm ${e.selectedScope===t.id?"active":""}"
              @click=${()=>e.onSelectScope(t.id)}
            >
              ${n}
            </button>
          `})}
      </div>
    </div>
  `}function fm(e){const t=e.selectedScope===Qe,n=e.defaults,s=e.selectedAgent??{},i=t?["defaults"]:["agents",e.selectedScope],o=typeof s.security=="string"?s.security:void 0,a=typeof s.ask=="string"?s.ask:void 0,l=typeof s.askFallback=="string"?s.askFallback:void 0,c=t?n.security:o??"__default__",u=t?n.ask:a??"__default__",g=t?n.askFallback:l??"__default__",h=typeof s.autoAllowSkills=="boolean"?s.autoAllowSkills:void 0,f=h??n.autoAllowSkills,d=h==null;return r`
    <div class="list" style="margin-top: 16px;">
      <div class="list-item">
        <div class="list-main">
          <div class="list-title">Security</div>
          <div class="list-sub">
            ${t?"Default security mode.":`Default: ${n.security}.`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Mode</span>
            <select
              ?disabled=${e.disabled}
              @change=${p=>{const S=p.target.value;!t&&S==="__default__"?e.onRemove([...i,"security"]):e.onPatch([...i,"security"],S)}}
            >
              ${t?v:r`<option value="__default__" ?selected=${c==="__default__"}>
                    Use default (${n.security})
                  </option>`}
              ${ir.map(p=>r`<option
                    value=${p.value}
                    ?selected=${c===p.value}
                  >
                    ${p.label}
                  </option>`)}
            </select>
          </label>
        </div>
      </div>

      <div class="list-item">
        <div class="list-main">
          <div class="list-title">Ask</div>
          <div class="list-sub">
            ${t?"Default prompt policy.":`Default: ${n.ask}.`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Mode</span>
            <select
              ?disabled=${e.disabled}
              @change=${p=>{const S=p.target.value;!t&&S==="__default__"?e.onRemove([...i,"ask"]):e.onPatch([...i,"ask"],S)}}
            >
              ${t?v:r`<option value="__default__" ?selected=${u==="__default__"}>
                    Use default (${n.ask})
                  </option>`}
              ${sm.map(p=>r`<option
                    value=${p.value}
                    ?selected=${u===p.value}
                  >
                    ${p.label}
                  </option>`)}
            </select>
          </label>
        </div>
      </div>

      <div class="list-item">
        <div class="list-main">
          <div class="list-title">Ask fallback</div>
          <div class="list-sub">
            ${t?"Applied when the UI prompt is unavailable.":`Default: ${n.askFallback}.`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Fallback</span>
            <select
              ?disabled=${e.disabled}
              @change=${p=>{const S=p.target.value;!t&&S==="__default__"?e.onRemove([...i,"askFallback"]):e.onPatch([...i,"askFallback"],S)}}
            >
              ${t?v:r`<option value="__default__" ?selected=${g==="__default__"}>
                    Use default (${n.askFallback})
                  </option>`}
              ${ir.map(p=>r`<option
                    value=${p.value}
                    ?selected=${g===p.value}
                  >
                    ${p.label}
                  </option>`)}
            </select>
          </label>
        </div>
      </div>

      <div class="list-item">
        <div class="list-main">
          <div class="list-title">Auto-allow skill CLIs</div>
          <div class="list-sub">
            ${t?"Allow skill executables listed by the Gateway.":d?`Using default (${n.autoAllowSkills?"on":"off"}).`:`Override (${f?"on":"off"}).`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Enabled</span>
            <input
              type="checkbox"
              ?disabled=${e.disabled}
              .checked=${f}
              @change=${p=>{const m=p.target;e.onPatch([...i,"autoAllowSkills"],m.checked)}}
            />
          </label>
          ${!t&&!d?r`<button
                class="btn btn--sm"
                ?disabled=${e.disabled}
                @click=${()=>e.onRemove([...i,"autoAllowSkills"])}
              >
                Use default
              </button>`:v}
        </div>
      </div>
    </div>
  `}function vm(e){const t=["agents",e.selectedScope,"allowlist"],n=e.allowlist;return r`
    <div class="row" style="margin-top: 18px; justify-content: space-between;">
      <div>
        <div class="card-title">Allowlist</div>
        <div class="card-sub">Case-insensitive glob patterns.</div>
      </div>
      <button
        class="btn btn--sm"
        ?disabled=${e.disabled}
        @click=${()=>{const s=[...n,{pattern:""}];e.onPatch(t,s)}}
      >
        Add pattern
      </button>
    </div>
    <div class="list" style="margin-top: 12px;">
      ${n.length===0?r`
              <div class="muted">No allowlist entries yet.</div>
            `:n.map((s,i)=>mm(e,s,i))}
    </div>
  `}function mm(e,t,n){const s=t.lastUsedAt?V(t.lastUsedAt):"never",i=t.lastUsedCommand?ni(t.lastUsedCommand,120):null,o=t.lastResolvedPath?ni(t.lastResolvedPath,120):null;return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t.pattern?.trim()?t.pattern:"New pattern"}</div>
        <div class="list-sub">Last used: ${s}</div>
        ${i?r`<div class="list-sub mono">${i}</div>`:v}
        ${o?r`<div class="list-sub mono">${o}</div>`:v}
      </div>
      <div class="list-meta">
        <label class="field">
          <span>Pattern</span>
          <input
            type="text"
            .value=${t.pattern??""}
            ?disabled=${e.disabled}
            @input=${a=>{const l=a.target;e.onPatch(["agents",e.selectedScope,"allowlist",n,"pattern"],l.value)}}
          />
        </label>
        <button
          class="btn btn--sm danger"
          ?disabled=${e.disabled}
          @click=${()=>{if(e.allowlist.length<=1){e.onRemove(["agents",e.selectedScope,"allowlist"]);return}e.onRemove(["agents",e.selectedScope,"allowlist",n])}}
        >
          Remove
        </button>
      </div>
    </div>
  `}function bm(e,t){const n=e.binding??"__default__",s=e.name?.trim()?`${e.name} (${e.id})`:e.id,i=t.nodes.length>0;return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${s}</div>
        <div class="list-sub">
          ${e.isDefault?"default agent":"agent"} ·
          ${n==="__default__"?`uses default (${t.defaultBinding??"any"})`:`override: ${e.binding}`}
        </div>
      </div>
      <div class="list-meta">
        <label class="field">
          <span>Binding</span>
          <select
            ?disabled=${t.disabled||!i}
            @change=${o=>{const l=o.target.value.trim();t.onBindAgent(e.index,l==="__default__"?null:l)}}
          >
            <option value="__default__" ?selected=${n==="__default__"}>
              Use default
            </option>
            ${t.nodes.map(o=>r`<option
                  value=${o.id}
                  ?selected=${n===o.id}
                >
                  ${o.label}
                </option>`)}
          </select>
        </label>
      </div>
    </div>
  `}function ym(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(l=>String(l)==="system.run"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const a=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:a===o?o:`${a} · ${o}`})}return t.sort((n,s)=>n.label.localeCompare(s.label)),t}function xm(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(l=>String(l)==="system.execApprovals.get"||String(l)==="system.execApprovals.set"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const a=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:a===o?o:`${a} · ${o}`})}return t.sort((n,s)=>n.label.localeCompare(s.label)),t}function $m(e){const t={id:"main",name:void 0,index:0,isDefault:!0,binding:null};if(!e||typeof e!="object")return{defaultBinding:null,agents:[t]};const s=(e.tools??{}).exec??{},i=typeof s.node=="string"&&s.node.trim()?s.node.trim():null,o=e.agents??{},a=Array.isArray(o.list)?o.list:[];if(a.length===0)return{defaultBinding:i,agents:[t]};const l=[];return a.forEach((c,u)=>{if(!c||typeof c!="object")return;const g=c,h=typeof g.id=="string"?g.id.trim():"";if(!h)return;const f=typeof g.name=="string"?g.name.trim():void 0,d=g.default===!0,m=(g.tools??{}).exec??{},S=typeof m.node=="string"&&m.node.trim()?m.node.trim():null;l.push({id:h,name:f||void 0,index:u,isDefault:d,binding:S})}),l.length===0&&l.push(t),{defaultBinding:i,agents:l}}function wm(e){const t=!!e.connected,n=!!e.paired,s=typeof e.displayName=="string"&&e.displayName.trim()||(typeof e.nodeId=="string"?e.nodeId:"unknown"),i=Array.isArray(e.caps)?e.caps:[],o=Array.isArray(e.commands)?e.commands:[];return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${s}</div>
        <div class="list-sub">
          ${typeof e.nodeId=="string"?e.nodeId:""}
          ${typeof e.remoteIp=="string"?` · ${e.remoteIp}`:""}
          ${typeof e.version=="string"?` · ${e.version}`:""}
        </div>
        <div class="chip-row" style="margin-top: 6px;">
          <span class="chip">${n?"paired":"unpaired"}</span>
          <span class="chip ${t?"chip-ok":"chip-warn"}">
            ${t?"connected":"offline"}
          </span>
          ${i.slice(0,12).map(a=>r`<span class="chip">${String(a)}</span>`)}
          ${o.slice(0,8).map(a=>r`<span class="chip">${String(a)}</span>`)}
        </div>
      </div>
    </div>
  `}const Zl={stepOf:(e,t)=>`Step ${e} of ${t}`,langTitle:"Welcome to OpenSoul",langSubtitle:"Choose your preferred language to get started.",langLabel:"Language",loginTitle:"Sign In",loginSubtitle:"Sign in to sync your settings and unlock all features.",loginWithGoogle:"Continue with Google",loginWithGithub:"Continue with GitHub",loginOrDivider:"or",loginSkipHint:"You can skip this step and sign in later from Settings.",loginSkip:"Skip for now",loginLogout:"Sign out",loginSuccess:"Signed in",loginError:"Sign-in failed. Please try again.",providerTitle:"Choose an AI Provider",providerSubtitle:"Select one or more AI model providers. You can always change this later in Settings.",providerSearch:"Search providers…",providerNoneSelected:"No provider selected yet.",providerSkip:"Skip for now",providerApiKeyPlaceholder:"Paste your API key…",providerConnected:"Connected",channelTitle:"Connect a Channel",channelSubtitle:"Link a messaging platform so your AI companion can chat with you. You can skip and configure this later.",channelSkip:"Skip for now",channelTokenPlaceholder:"Paste bot token…",confirmTitle:"You're All Set!",confirmSubtitle:"Review your choices and launch OpenSoul.",confirmLogin:"Account",confirmLoginNone:"Not signed in (sign in later)",confirmLanguage:"Language",confirmProvider:"AI Provider",confirmProviderNone:"None (configure later)",confirmChannel:"Channel",confirmChannelNone:"None (configure later)",confirmLaunch:"Launch OpenSoul",next:"Next",back:"Back",skip:"Skip",finish:"Finish"},km={stepOf:(e,t)=>`第 ${e} 步，共 ${t} 步`,langTitle:"欢迎使用 OpenSoul",langSubtitle:"选择你偏好的语言以开始设置。",langLabel:"语言",loginTitle:"登录",loginSubtitle:"登录以同步你的设置并解锁所有功能。",loginWithGoogle:"使用 Google 登录",loginWithGithub:"使用 GitHub 登录",loginOrDivider:"或者",loginSkipHint:"你可以跳过此步骤，稍后在设置中登录。",loginSkip:"暂时跳过",loginLogout:"退出登录",loginSuccess:"已登录",loginError:"登录失败，请重试。",providerTitle:"选择 AI 提供商",providerSubtitle:"选择一个或多个 AI 模型提供商。你随时可以在设置中更改。",providerSearch:"搜索提供商…",providerNoneSelected:"尚未选择提供商。",providerSkip:"暂时跳过",providerApiKeyPlaceholder:"粘贴你的 API Key…",providerConnected:"已连接",channelTitle:"连接聊天渠道",channelSubtitle:"链接一个聊天平台，让你的 AI 伙伴与你对话。你也可以稍后配置。",channelSkip:"暂时跳过",channelTokenPlaceholder:"粘贴 Bot Token…",confirmTitle:"一切就绪！",confirmSubtitle:"检查你的选择，然后启动 OpenSoul。",confirmLogin:"账号",confirmLoginNone:"未登录（稍后登录）",confirmLanguage:"语言",confirmProvider:"AI 提供商",confirmProviderNone:"无（稍后配置）",confirmChannel:"聊天渠道",confirmChannelNone:"无（稍后配置）",confirmLaunch:"启动 OpenSoul",next:"下一步",back:"上一步",skip:"跳过",finish:"完成"},Sm={stepOf:(e,t)=>`第 ${e} 步，共 ${t} 步`,langTitle:"歡迎使用 OpenSoul",langSubtitle:"選擇你偏好的語言以開始設定。",langLabel:"語言",loginTitle:"登入",loginSubtitle:"登入以同步你的設定並解鎖所有功能。",loginWithGoogle:"使用 Google 登入",loginWithGithub:"使用 GitHub 登入",loginOrDivider:"或者",loginSkipHint:"你可以跳過此步驟，稍後在設定中登入。",loginSkip:"暫時跳過",loginLogout:"登出",loginSuccess:"已登入",loginError:"登入失敗，請重試。",providerTitle:"選擇 AI 提供商",providerSubtitle:"選擇一個或多個 AI 模型提供商。你隨時可以在設定中更改。",providerSearch:"搜尋提供商…",providerNoneSelected:"尚未選擇提供商。",providerSkip:"暫時跳過",providerApiKeyPlaceholder:"貼上你的 API Key…",providerConnected:"已連接",channelTitle:"連接聊天頻道",channelSubtitle:"連結一個聊天平台，讓你的 AI 夥伴與你對話。你也可以稍後設定。",channelSkip:"暫時跳過",channelTokenPlaceholder:"貼上 Bot Token…",confirmTitle:"一切就緒！",confirmSubtitle:"檢查你的選擇，然後啟動 OpenSoul。",confirmLogin:"帳號",confirmLoginNone:"未登入（稍後登入）",confirmLanguage:"語言",confirmProvider:"AI 提供商",confirmProviderNone:"無（稍後設定）",confirmChannel:"聊天頻道",confirmChannelNone:"無（稍後設定）",confirmLaunch:"啟動 OpenSoul",next:"下一步",back:"上一步",skip:"跳過",finish:"完成"},Am={stepOf:(e,t)=>`ステップ ${e} / ${t}`,langTitle:"OpenSoul へようこそ",langSubtitle:"お好みの言語を選択してください。",langLabel:"言語",loginTitle:"サインイン",loginSubtitle:"サインインして設定を同期し、すべての機能を利用しましょう。",loginWithGoogle:"Google で続ける",loginWithGithub:"GitHub で続ける",loginOrDivider:"または",loginSkipHint:"このステップをスキップして、後で設定からサインインできます。",loginSkip:"スキップ",loginLogout:"サインアウト",loginSuccess:"サインイン済み",loginError:"サインインに失敗しました。もう一度お試しください。",providerTitle:"AI プロバイダーを選択",providerSubtitle:"1つ以上のAIモデルプロバイダーを選択してください。設定でいつでも変更できます。",providerSearch:"プロバイダーを検索…",providerNoneSelected:"プロバイダーが選択されていません。",providerSkip:"スキップ",providerApiKeyPlaceholder:"API キーを貼り付け…",providerConnected:"接続済み",channelTitle:"チャンネルを接続",channelSubtitle:"メッセージングプラットフォームを接続して、AIコンパニオンとチャットしましょう。後で設定することもできます。",channelSkip:"スキップ",channelTokenPlaceholder:"ボットトークンを貼り付け…",confirmTitle:"準備完了！",confirmSubtitle:"設定を確認して、OpenSoul を起動します。",confirmLogin:"アカウント",confirmLoginNone:"未サインイン（後でサインイン）",confirmLanguage:"言語",confirmProvider:"AI プロバイダー",confirmProviderNone:"なし（後で設定）",confirmChannel:"チャンネル",confirmChannelNone:"なし（後で設定）",confirmLaunch:"OpenSoul を起動",next:"次へ",back:"戻る",skip:"スキップ",finish:"完了"},Cm={stepOf:(e,t)=>`${t}단계 중 ${e}단계`,langTitle:"OpenSoul에 오신 것을 환영합니다",langSubtitle:"원하는 언어를 선택하세요.",langLabel:"언어",loginTitle:"로그인",loginSubtitle:"로그인하여 설정을 동기화하고 모든 기능을 잠금 해제하세요.",loginWithGoogle:"Google로 계속",loginWithGithub:"GitHub로 계속",loginOrDivider:"또는",loginSkipHint:"이 단계를 건너뛰고 나중에 설정에서 로그인할 수 있습니다.",loginSkip:"건너뛰기",loginLogout:"로그아웃",loginSuccess:"로그인됨",loginError:"로그인에 실패했습니다. 다시 시도해 주세요.",providerTitle:"AI 제공자 선택",providerSubtitle:"하나 이상의 AI 모델 제공자를 선택하세요. 설정에서 언제든지 변경할 수 있습니다.",providerSearch:"제공자 검색…",providerNoneSelected:"선택된 제공자가 없습니다.",providerSkip:"건너뛰기",providerApiKeyPlaceholder:"API 키를 붙여넣기…",providerConnected:"연결됨",channelTitle:"채널 연결",channelSubtitle:"메시징 플랫폼을 연결하여 AI 동반자와 대화하세요. 나중에 설정할 수도 있습니다.",channelSkip:"건너뛰기",channelTokenPlaceholder:"봇 토큰 붙여넣기…",confirmTitle:"모두 준비되었습니다!",confirmSubtitle:"선택 사항을 검토하고 OpenSoul을 시작하세요.",confirmLogin:"계정",confirmLoginNone:"미로그인 (나중에 로그인)",confirmLanguage:"언어",confirmProvider:"AI 제공자",confirmProviderNone:"없음 (나중에 설정)",confirmChannel:"채널",confirmChannelNone:"없음 (나중에 설정)",confirmLaunch:"OpenSoul 시작",next:"다음",back:"뒤로",skip:"건너뛰기",finish:"완료"},Tm={stepOf:(e,t)=>`Paso ${e} de ${t}`,langTitle:"Bienvenido a OpenSoul",langSubtitle:"Elige tu idioma preferido para comenzar.",langLabel:"Idioma",providerTitle:"Elige un proveedor de IA",providerSubtitle:"Selecciona uno o más proveedores de modelos de IA. Puedes cambiarlo en Configuración.",providerSearch:"Buscar proveedores…",providerNoneSelected:"Ningún proveedor seleccionado.",providerSkip:"Omitir por ahora",providerApiKeyPlaceholder:"Pega tu API key…",providerConnected:"Conectado",channelTitle:"Conectar un canal",channelSubtitle:"Vincula una plataforma de mensajería. Puedes configurarlo después.",channelSkip:"Omitir por ahora",channelTokenPlaceholder:"Pega el token del bot…",confirmTogin:"Cuenta",confirmLoginNone:"Sin iniciar sesión (iniciar sesión después)",confirmLitle:"¡Todo listo!",confirmSubtitle:"Revisa tus opciones e inicia OpenSoul.",confirmLanguage:"Idioma",confirmProvider:"Proveedor de IA",confirmProviderNone:"Ninguno (configurar después)",confirmChannel:"Canal",confirmChannelNone:"Ninguno (configurar después)",confirmLaunch:"Iniciar OpenSoul",next:"Siguiente",back:"Atrás",skip:"Omitir",finish:"Finalizar"},_m={stepOf:(e,t)=>`Étape ${e} sur ${t}`,langTitle:"Bienvenue sur OpenSoul",langSubtitle:"Choisissez votre langue préférée pour commencer.",langLabel:"Langue",providerTitle:"Choisir un fournisseur IA",providerSubtitle:"Sélectionnez un ou plusieurs fournisseurs de modèles IA. Modifiable dans les paramètres.",providerSearch:"Rechercher…",providerNoneSelected:"Aucun fournisseur sélectionné.",providerSkip:"Passer pour l'instant",providerApiKeyPlaceholder:"Collez votre clé API…",providerConnected:"Connecté",channelTitle:"Connecter un canal",channelSubtitle:"Liez une plateforme de messagerie. Vous pouvez configurer plus tard.",channelSogin:"Compte",confirmLoginNone:"Non connecté (se connecter plus tard)",confirmLkip:"Passer pour l'instant",channelTokenPlaceholder:"Collez le token du bot…",confirmTitle:"Tout est prêt !",confirmSubtitle:"Vérifiez vos choix et lancez OpenSoul.",confirmLanguage:"Langue",confirmProvider:"Fournisseur IA",confirmProviderNone:"Aucun (configurer plus tard)",confirmChannel:"Canal",confirmChannelNone:"Aucun (configurer plus tard)",confirmLaunch:"Lancer OpenSoul",next:"Suivant",back:"Retour",skip:"Passer",finish:"Terminer"},Lm={stepOf:(e,t)=>`Schritt ${e} von ${t}`,langTitle:"Willkommen bei OpenSoul",langSubtitle:"Wähle deine bevorzugte Sprache.",langLabel:"Sprache",loginTitle:"Anmelden",loginSubtitle:"Melde dich an, um deine Einstellungen zu synchronisieren und alle Funktionen freizuschalten.",loginWithGoogle:"Weiter mit Google",loginWithGithub:"Weiter mit GitHub",loginOrDivider:"oder",loginSkipHint:"Du kannst diesen Schritt überspringen und dich später in den Einstellungen anmelden.",loginSkip:"Vorerst überspringen",loginLogout:"Abmelden",loginSuccess:"Angemeldet",loginError:"Anmeldung fehlgeschlagen. Bitte versuche es erneut.",providerTitle:"KI-Anbieter wählen",providerSubtitle:"Wähle einen oder mehrere KI-Modellanbieter. Du kannst dies jederzeit in den Einstellungen ändern.",providerSearch:"Anbieter suchen…",providerNoneSelected:"Kein Anbieter ausgewählt.",providerSkip:"Vorerst überspringen",providerApiKeyPlaceholder:"API-Schlüssel einfügen…",providerConnected:"Verbunden",channelTitle:"Kanal verbinden",channelSubtitle:"Verbinde eine Messaging-Plattform. Du kannst dies später konfigurieren.",channelSkip:"Vorerst überspringen",channelTokenPlaceholder:"Bot-Token einfügen…",confirmTitle:"Alles bereit!",confirmSubtitle:"Überprüfe deine Auswahl und starte OpenSoul.",confirmLogin:"Konto",confirmLoginNone:"Nicht angemeldet (später anmelden)",confirmLanguage:"Sprache",confirmProvider:"KI-Anbieter",confirmProviderNone:"Keiner (später konfigurieren)",confirmChannel:"Kanal",confirmChannelNone:"Keiner (später konfigurieren)",confirmLaunch:"OpenSoul starten",next:"Weiter",back:"Zurück",skip:"Überspringen",finish:"Fertig"},Em={stepOf:(e,t)=>`Passo ${e} de ${t}`,langTitle:"Bem-vindo ao OpenSoul",langSubtitle:"Escolha seu idioma preferido para começar.",langLabel:"Idioma",loginTitle:"Entrar",loginSubtitle:"Entre para sincronizar suas configurações e desbloquear todos os recursos.",loginWithGoogle:"Continuar com Google",loginWithGithub:"Continuar com GitHub",loginOrDivider:"ou",loginSkipHint:"Você pode pular esta etapa e entrar mais tarde nas configurações.",loginSkip:"Pular por enquanto",loginLogout:"Sair",loginSuccess:"Conectado",loginError:"Falha ao entrar. Tente novamente.",providerTitle:"Escolha um provedor de IA",providerSubtitle:"Selecione um ou mais provedores de modelos de IA. Você pode alterar nas configurações.",providerSearch:"Buscar provedores…",providerNoneSelected:"Nenhum provedor selecionado.",providerSkip:"Pular por enquanto",providerApiKeyPlaceholder:"Cole sua chave API…",providerConnected:"Conectado",channelTitle:"Conectar um canal",channelSubtitle:"Vincule uma plataforma de mensagens. Você pode configurar depois.",channelSkip:"Pular por enquanto",channelTokenPlaceholder:"Cole o token do bot…",confirmTogin:"Conta",confirmLoginNone:"Não conectado (conectar depois)",confirmLitle:"Tudo pronto!",confirmSubtitle:"Revise suas escolhas e inicie o OpenSoul.",confirmLanguage:"Idioma",confirmProvider:"Provedor de IA",confirmProviderNone:"Nenhum (configurar depois)",confirmChannel:"Canal",confirmChannelNone:"Nenhum (configurar depois)",confirmLaunch:"Iniciar OpenSoul",next:"Próximo",back:"Voltar",skip:"Pular",finish:"Concluir"},Im={stepOf:(e,t)=>`Шаг ${e} из ${t}`,langTitle:"Добро пожаловать в OpenSoul",langSubtitle:"Выберите предпочитаемый язык.",langLabel:"Язык",providerTitle:"Выберите провайдера ИИ",providerSubtitle:"Выберите одного или нескольких провайдеров. Вы всегда можете изменить это в настройках.",providerSearch:"Поиск провайдеров…",providerNoneSelected:"Провайдер не выбран.",providerSkip:"Пропустить",providerApiKeyPlaceholder:"Вставьте API ключ…",providerConnected:"Подключено",channelTitle:"Подключить канал",channelSubtitle:"Подключите мессенджер. Вы можете настроить это позже.",channelSkip:"Пропустить",channelTokenPlaceholder:"Вставьте токен бота…",confirmTogin:"Аккаунт",confirmLoginNone:"Не выполнен вход (войти позже)",confirmLitle:"Всё готово!",confirmSubtitle:"Проверьте настройки и запустите OpenSoul.",confirmLanguage:"Язык",confirmProvider:"Провайдер ИИ",confirmProviderNone:"Нет (настроить позже)",confirmChannel:"Канал",confirmChannelNone:"Нет (настроить позже)",confirmLaunch:"Запустить OpenSoul",next:"Далее",back:"Назад",skip:"Пропустить",finish:"Готово"},Mm={en:Zl,"zh-CN":km,"zh-TW":Sm,ja:Am,ko:Cm,es:Tm,fr:_m,de:Lm,"pt-BR":Em,ru:Im},Jl=[{value:"en",label:"English",nativeLabel:"English"},{value:"zh-CN",label:"Chinese (Simplified)",nativeLabel:"简体中文"},{value:"zh-TW",label:"Chinese (Traditional)",nativeLabel:"繁體中文"},{value:"ja",label:"Japanese",nativeLabel:"日本語"},{value:"ko",label:"Korean",nativeLabel:"한국어"},{value:"es",label:"Spanish",nativeLabel:"Español"},{value:"fr",label:"French",nativeLabel:"Français"},{value:"de",label:"German",nativeLabel:"Deutsch"},{value:"pt-BR",label:"Portuguese (Brazil)",nativeLabel:"Português (Brasil)"},{value:"ru",label:"Russian",nativeLabel:"Русский"}];function Xe(e){return Mm[e]??Zl}function Rm(){const t=(navigator.language??"en").toLowerCase();return t.startsWith("zh-tw")||t.startsWith("zh-hant")?"zh-TW":t.startsWith("zh")?"zh-CN":t.startsWith("ja")?"ja":t.startsWith("ko")?"ko":t.startsWith("es")?"es":t.startsWith("fr")?"fr":t.startsWith("de")?"de":t.startsWith("pt")?"pt-BR":t.startsWith("ru")?"ru":"en"}const _i=[{id:"anthropic",label:"Anthropic",hint:"Claude Opus / Sonnet"},{id:"openai",label:"OpenAI",hint:"GPT-5 / GPT-5 Mini"},{id:"google",label:"Google",hint:"Gemini 3 Pro / Flash"},{id:"openrouter",label:"OpenRouter",hint:"Multi-model gateway"},{id:"xai",label:"xAI",hint:"Grok"},{id:"minimax",label:"MiniMax",hint:"M2.1"},{id:"moonshot",label:"Moonshot AI",hint:"Kimi K2.5"},{id:"qwen",label:"Qwen",hint:"Alibaba Cloud"},{id:"zai",label:"Z.AI",hint:"GLM 4.7"},{id:"copilot",label:"GitHub Copilot",hint:"GitHub device login"},{id:"ai-gateway",label:"Vercel AI Gateway",hint:"API key"},{id:"opencode-zen",label:"OpenCode Zen",hint:"Multi-model proxy"},{id:"xiaomi",label:"Xiaomi",hint:"API key"},{id:"qianfan",label:"Qianfan",hint:"API key"},{id:"synthetic",label:"Synthetic",hint:"Anthropic-compatible"},{id:"venice",label:"Venice AI",hint:"Privacy-focused"},{id:"cloudflare-ai-gateway",label:"Cloudflare AI Gateway",hint:"Cloudflare"}],Li=[{id:"telegram",label:"Telegram",icon:"✈️",difficulty:"easy",tokenLabel:"Bot Token",tokenHint:"Create a bot via @BotFather on Telegram and paste the token here."},{id:"discord",label:"Discord",icon:"🎮",difficulty:"easy",tokenLabel:"Bot Token",tokenHint:"Create an app at discord.com/developers, add a bot, and paste the token."},{id:"whatsapp",label:"WhatsApp",icon:"📱",difficulty:"medium",tokenLabel:"",tokenHint:"WhatsApp uses QR code pairing. You can configure this after setup."},{id:"slack",label:"Slack",icon:"💬",difficulty:"medium",tokenLabel:"Bot Token + App Token",tokenHint:"Create a Slack app with Socket Mode and paste both tokens."},{id:"signal",label:"Signal",icon:"🔒",difficulty:"advanced",tokenLabel:"",tokenHint:"Signal requires signal-cli linking. Configure after setup."},{id:"feishu",label:"Feishu",icon:"🐦",difficulty:"medium",tokenLabel:"App ID + App Secret",tokenHint:"Create a Feishu app and paste the credentials."},{id:"msteams",label:"MS Teams",icon:"🏢",difficulty:"advanced",tokenLabel:"",tokenHint:"Teams integration requires Azure Bot registration."},{id:"matrix",label:"Matrix",icon:"🌐",difficulty:"medium",tokenLabel:"Access Token",tokenHint:"Provide your Matrix homeserver URL and access token."}],ar={en:{easy:"Easy",medium:"Medium",advanced:"Advanced"},"zh-CN":{easy:"简单",medium:"中等",advanced:"高级"},"zh-TW":{easy:"簡單",medium:"中等",advanced:"進階"},ja:{easy:"簡単",medium:"普通",advanced:"上級"},ko:{easy:"쉬움",medium:"보통",advanced:"고급"},es:{easy:"Fácil",medium:"Medio",advanced:"Avanzado"},fr:{easy:"Facile",medium:"Moyen",advanced:"Avancé"},de:{easy:"Einfach",medium:"Mittel",advanced:"Fortgeschritten"},"pt-BR":{easy:"Fácil",medium:"Médio",advanced:"Avançado"},ru:{easy:"Легко",medium:"Средне",advanced:"Сложно"}};function Pm(e,t){return ar[e]?.[t]??ar.en[t]??t}function Dm(e){const t=Xe(e.locale),n=Li.find(s=>s.id===e.selectedChannel);return r`
    <div class="onboarding-channel-grid">
      ${Li.map(s=>{const i=e.selectedChannel===s.id;return r`
          <button
            class="onboarding-channel-item ${i?"onboarding-channel-item--selected":""}"
            @click=${()=>e.onChannelSelect(i?null:s.id)}
          >
            <span class="onboarding-channel-item__icon">${s.icon}</span>
            <span class="onboarding-channel-item__name">${s.label}</span>
            <span class="onboarding-channel-item__difficulty">
              ${Pm(e.locale,s.difficulty)}
            </span>
          </button>
        `})}
    </div>

    ${n&&n.tokenLabel?r`
          <div class="onboarding-channel-token">
            <div class="onboarding-channel-token__label">${n.tokenLabel}</div>
            <div class="onboarding-channel-token__hint">${n.tokenHint}</div>
            <input
              class="onboarding-provider-input"
              type="password"
              placeholder=${t.channelTokenPlaceholder}
              .value=${e.channelToken}
              @input=${s=>e.onChannelTokenChange(s.target.value)}
            />
          </div>
        `:n?r`
            <div class="onboarding-channel-token">
              <div class="onboarding-channel-token__hint">${n.tokenHint}</div>
            </div>
          `:v}
  `}function Nm(e){const t=Xe(e.locale),n=Jl.find(a=>a.value===e.locale)?.nativeLabel??e.locale,s=_i.find(a=>a.id===e.selectedProvider)?.label??null,i=Li.find(a=>a.id===e.selectedChannel)?.label??null,o=e.loginStatus==="success"?e.loginDisplayName:null;return r`
    <div class="onboarding-confirm-hero">
      <div class="onboarding-confirm-hero__icon">🚀</div>
    </div>

    <div class="onboarding-confirm-list">
      <div class="onboarding-confirm-row">
        <span class="onboarding-confirm-row__label">${t.confirmLogin}</span>
        <span class="onboarding-confirm-row__value ${o?"":"onboarding-confirm-row__value--muted"}">
          ${o??t.confirmLoginNone}
        </span>
      </div>
      <div class="onboarding-confirm-row">
        <span class="onboarding-confirm-row__label">${t.confirmLanguage}</span>
        <span class="onboarding-confirm-row__value">${n}</span>
      </div>
      <div class="onboarding-confirm-row">
        <span class="onboarding-confirm-row__label">${t.confirmProvider}</span>
        <span class="onboarding-confirm-row__value ${s?"":"onboarding-confirm-row__value--muted"}">
          ${s??t.confirmProviderNone}
        </span>
      </div>
      <div class="onboarding-confirm-row">
        <span class="onboarding-confirm-row__label">${t.confirmChannel}</span>
        <span class="onboarding-confirm-row__value ${i?"":"onboarding-confirm-row__value--muted"}">
          ${i??t.confirmChannelNone}
        </span>
      </div>
    </div>
  `}function Fm(e){return Xe(e.locale),r`
    <div class="onboarding-lang-grid">
      ${Jl.map(t=>r`
          <button
            class="onboarding-lang-option ${e.locale===t.value?"onboarding-lang-option--selected":""}"
            @click=${()=>e.onLocaleChange(t.value)}
          >
            <div>
              <div class="onboarding-lang-option__native">${t.nativeLabel}</div>
              <div class="onboarding-lang-option__label">${t.label}</div>
            </div>
          </button>
        `)}
    </div>
  `}const Om=r`
  <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
`,Bm=r`
  <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
`,rr=r`
  <svg class="onboarding-login-spinner" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
`;function zm(e){const t=Xe(e.locale),n=e.loginStatus==="loading",s=e.loginStatus==="error",i=e.loginStatus==="success";return r`
    <div class="onboarding-login">
      <!-- Logged-in state -->
      ${i&&e.loginDisplayName?r`
            <div class="onboarding-login-success">
              <div class="onboarding-login-success__avatar">
                ${e.loginAvatarUrl?r`<img src="${e.loginAvatarUrl}" alt="" class="onboarding-login-success__avatar-img" />`:r`<span class="onboarding-login-success__avatar-fallback">
                      ${e.loginDisplayName.charAt(0).toUpperCase()}
                    </span>`}
              </div>
              <div class="onboarding-login-success__info">
                <div class="onboarding-login-success__name">${e.loginDisplayName}</div>
                ${e.loginEmail?r`<div class="onboarding-login-success__email">${e.loginEmail}</div>`:v}
              </div>
              <button
                class="onboarding-btn onboarding-btn--ghost onboarding-login-success__logout"
                @click=${e.onLogout}
              >
                ${t.loginLogout}
              </button>
            </div>
          `:r`
            <!-- Login buttons -->
            <div class="onboarding-login-buttons">
              <button
                class="onboarding-login-btn onboarding-login-btn--google"
                @click=${e.onGoogleLogin}
                ?disabled=${n}
              >
                <span class="onboarding-login-btn__icon">${Om}</span>
                <span class="onboarding-login-btn__label">
                  ${n?rr:v}
                  ${t.loginWithGoogle}
                </span>
              </button>

              <button
                class="onboarding-login-btn onboarding-login-btn--github"
                @click=${e.onGithubLogin}
                ?disabled=${n}
              >
                <span class="onboarding-login-btn__icon">${Bm}</span>
                <span class="onboarding-login-btn__label">
                  ${n?rr:v}
                  ${t.loginWithGithub}
                </span>
              </button>
            </div>

            <!-- Divider -->
            <div class="onboarding-login-divider">
              <span class="onboarding-login-divider__line"></span>
              <span class="onboarding-login-divider__text">${t.loginOrDivider}</span>
              <span class="onboarding-login-divider__line"></span>
            </div>

            <!-- Skip hint -->
            <div class="onboarding-login-skip-hint">
              ${t.loginSkipHint}
            </div>
          `}

      <!-- Error message -->
      ${s&&e.loginError?r`
            <div class="onboarding-login-error">
              <span class="onboarding-login-error__icon">⚠️</span>
              <span class="onboarding-login-error__text">${e.loginError}</span>
            </div>
          `:v}
    </div>
  `}const Um=r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,Hm=r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>`;function Km(e){const t=Xe(e.locale),n=e.providerSearchQuery.toLowerCase().trim(),s=n?_i.filter(i=>i.label.toLowerCase().includes(n)||(i.hint?.toLowerCase().includes(n)??!1)):_i;return r`
    <!-- Search -->
    <div class="onboarding-search">
      <span class="onboarding-search__icon">${Hm}</span>
      <input
        class="onboarding-search__input"
        type="text"
        placeholder=${t.providerSearch}
        .value=${e.providerSearchQuery}
        @input=${i=>e.onProviderSearchChange(i.target.value)}
      />
    </div>

    <!-- Provider list -->
    <div class="onboarding-provider-list">
      ${s.map(i=>{const o=e.selectedProvider===i.id;return r`
          <div
            class="onboarding-provider-item ${o?"onboarding-provider-item--selected":""}"
            @click=${()=>e.onProviderSelect(o?null:i.id)}
          >
            <div class="onboarding-provider-item__check">
              <span class="onboarding-provider-item__check-icon">${Um}</span>
            </div>
            <div class="onboarding-provider-item__info">
              <div class="onboarding-provider-item__name">${i.label}</div>
              ${i.hint?r`<div class="onboarding-provider-item__hint">${i.hint}</div>`:v}
              ${o?r`
                    <input
                      class="onboarding-provider-input"
                      type="password"
                      placeholder=${t.providerApiKeyPlaceholder}
                      .value=${e.providerApiKey}
                      @input=${a=>e.onProviderApiKeyChange(a.target.value)}
                      @click=${a=>a.stopPropagation()}
                    />
                  `:v}
            </div>
          </div>
        `})}
      ${s.length===0?r`<div style="text-align:center; padding:24px; color:var(--muted);">
            ${t.providerNoneSelected}
          </div>`:v}
    </div>
  `}const Vs=5;function jm(e){switch(e.step){case 1:return zm(e);case 2:return Fm(e);case 3:return Km(e);case 4:return Dm(e);case 5:return Nm(e)}}function Wm(e){const t=Xe(e.locale);switch(e.step){case 1:return t.loginTitle;case 2:return t.langTitle;case 3:return t.providerTitle;case 4:return t.channelTitle;case 5:return t.confirmTitle}}function Gm(e){const t=Xe(e.locale);switch(e.step){case 1:return t.loginSubtitle;case 2:return t.langSubtitle;case 3:return t.providerSubtitle;case 4:return t.channelSubtitle;case 5:return t.confirmSubtitle}}function qm(e){const t=Xe(e.locale),n=e.step===1,s=e.step===Vs,i=e.step===1||e.step===3||e.step===4;return r`
    <div class="onboarding-wizard">
      <div class="onboarding-card">
        <!-- Progress bar -->
        <div class="onboarding-progress">
          ${Array.from({length:Vs},(o,a)=>{const l=a+1,c=l<e.step,u=l===e.step;return r`
              <div
                class="onboarding-progress__step ${c?"onboarding-progress__step--done":""} ${u?"onboarding-progress__step--active":""}"
              ></div>
            `})}
        </div>

        <!-- Header -->
        <div class="onboarding-header">
          <div class="onboarding-header__step-label">
            ${t.stepOf(e.step,Vs)}
          </div>
          <h2 class="onboarding-header__title">${Wm(e)}</h2>
          <p class="onboarding-header__subtitle">${Gm(e)}</p>
        </div>

        <!-- Body -->
        <div class="onboarding-body">
          ${jm(e)}
        </div>

        <!-- Footer -->
        <div class="onboarding-footer">
          <div class="onboarding-footer__left">
            ${n?v:r`
                  <button class="onboarding-btn onboarding-btn--ghost" @click=${e.onBack}>
                    ${t.back}
                  </button>
                `}
          </div>
          <div class="onboarding-footer__right">
            ${i?r`
                  <button class="onboarding-btn" @click=${e.onSkip}>
                    ${e.step===1?t.loginSkip:t.skip}
                  </button>
                `:v}
            ${s?r`
                  <button class="onboarding-btn onboarding-btn--primary" @click=${e.onFinish}>
                    ${t.confirmLaunch} →
                  </button>
                `:r`
                  <button class="onboarding-btn onboarding-btn--primary" @click=${e.onNext}>
                    ${t.next} →
                  </button>
                `}
          </div>
        </div>
      </div>
    </div>
  `}function Vm(e){const t=e.hello?.snapshot,n=t?.uptimeMs?Hi(t.uptimeMs):"n/a",s=t?.policy?.tickIntervalMs?`${t.policy.tickIntervalMs}ms`:"n/a",i=(()=>{if(e.connected||!e.lastError)return null;const a=e.lastError.toLowerCase();if(!(a.includes("unauthorized")||a.includes("connect failed")))return null;const c=!!e.settings.token.trim(),u=!!e.password.trim();return!c&&!u?r`
        <div class="muted" style="margin-top: 8px">
          This gateway requires auth. Add a token or password, then click Connect.
          <div style="margin-top: 6px">
            <span class="mono">opensoul dashboard --no-open</span> → open the Control UI<br />
            <span class="mono">opensoul doctor --generate-gateway-token</span> → set token
          </div>
          <div style="margin-top: 6px">
            <a
              class="session-link"
              href="https://docs.opensoul.ai/web/dashboard"
              target="_blank"
              rel="noreferrer"
              title="Control UI auth docs (opens in new tab)"
              >Docs: Control UI auth</a
            >
          </div>
        </div>
      `:r`
      <div class="muted" style="margin-top: 8px">
        Auth failed. Update the token or password in Control UI settings, then click Connect.
        <div style="margin-top: 6px">
          <a
            class="session-link"
            href="https://docs.opensoul.ai/web/dashboard"
            target="_blank"
            rel="noreferrer"
            title="Control UI auth docs (opens in new tab)"
            >Docs: Control UI auth</a
          >
        </div>
      </div>
    `})(),o=(()=>{if(e.connected||!e.lastError||(typeof window<"u"?window.isSecureContext:!0))return null;const l=e.lastError.toLowerCase();return!l.includes("secure context")&&!l.includes("device identity required")?null:r`
      <div class="muted" style="margin-top: 8px">
        This page is HTTP, so the browser blocks device identity. Use HTTPS (Tailscale Serve) or open
        <span class="mono">http://127.0.0.1:18789</span> on the gateway host.
        <div style="margin-top: 6px">
          If you must stay on HTTP, set
          <span class="mono">gateway.controlUi.allowInsecureAuth: true</span> (token-only).
        </div>
        <div style="margin-top: 6px">
          <a
            class="session-link"
            href="https://docs.opensoul.ai/gateway/tailscale"
            target="_blank"
            rel="noreferrer"
            title="Tailscale Serve docs (opens in new tab)"
            >Docs: Tailscale Serve</a
          >
          <span class="muted"> · </span>
          <a
            class="session-link"
            href="https://docs.opensoul.ai/web/control-ui#insecure-http"
            target="_blank"
            rel="noreferrer"
            title="Insecure HTTP docs (opens in new tab)"
            >Docs: Insecure HTTP</a
          >
        </div>
      </div>
    `})();return r`
    <section class="grid grid-cols-2">
      <div class="card">
        <div class="card-title">Gateway Access</div>
        <div class="card-sub">Where the dashboard connects and how it authenticates.</div>
        <div class="form-grid" style="margin-top: 16px;">
          <label class="field">
            <span>WebSocket URL</span>
            <input
              .value=${e.settings.gatewayUrl}
              @input=${a=>{const l=a.target.value;e.onSettingsChange({...e.settings,gatewayUrl:l})}}
              placeholder="ws://100.x.y.z:18789"
            />
          </label>
          <label class="field">
            <span>Gateway Token</span>
            <input
              .value=${e.settings.token}
              @input=${a=>{const l=a.target.value;e.onSettingsChange({...e.settings,token:l})}}
              placeholder="OPENSOUL_GATEWAY_TOKEN"
            />
          </label>
          <label class="field">
            <span>Password (not stored)</span>
            <input
              type="password"
              .value=${e.password}
              @input=${a=>{const l=a.target.value;e.onPasswordChange(l)}}
              placeholder="system or shared password"
            />
          </label>
          <label class="field">
            <span>Default Session Key</span>
            <input
              .value=${e.settings.sessionKey}
              @input=${a=>{const l=a.target.value;e.onSessionKeyChange(l)}}
            />
          </label>
        </div>
        <div class="row" style="margin-top: 14px;">
          <button class="btn" @click=${()=>e.onConnect()}>Connect</button>
          <button class="btn" @click=${()=>e.onRefresh()}>Refresh</button>
          <span class="muted">Click Connect to apply connection changes.</span>
        </div>
      </div>

      <div class="card">
        <div class="card-title">Snapshot</div>
        <div class="card-sub">Latest gateway handshake information.</div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">Status</div>
            <div class="stat-value ${e.connected?"ok":"warn"}">
              ${e.connected?"Connected":"Disconnected"}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">Uptime</div>
            <div class="stat-value">${n}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Tick Interval</div>
            <div class="stat-value">${s}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Last Channels Refresh</div>
            <div class="stat-value">
              ${e.lastChannelsRefresh?V(e.lastChannelsRefresh):"n/a"}
            </div>
          </div>
        </div>
        ${e.lastError?r`<div class="callout danger" style="margin-top: 14px;">
              <div>${e.lastError}</div>
              ${i??""}
              ${o??""}
            </div>`:r`
                <div class="callout" style="margin-top: 14px">
                  Use Channels to link WhatsApp, Telegram, Discord, Signal, or iMessage.
                </div>
              `}
      </div>
    </section>

    <section class="grid grid-cols-4" style="margin-top: 18px;">
      <div class="card stat-card">
        <div class="stat-label">Status</div>
        <div class="stat-value ${e.connected?"ok":"warn"}">
          ${e.connected?"Online":"Offline"}
        </div>
        <div class="muted">Gateway connection state.</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">Instances</div>
        <div class="stat-value">${e.presenceCount}</div>
        <div class="muted">Active beacons in the last 5 min.</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">Sessions</div>
        <div class="stat-value">${e.sessionsCount??"n/a"}</div>
        <div class="muted">Tracked session keys.</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">Cron</div>
        <div class="stat-value">
          ${e.cronEnabled==null?"n/a":e.cronEnabled?"Enabled":"Disabled"}
        </div>
        <div class="muted">Next wake ${io(e.cronNext)}</div>
      </div>
    </section>

    <section class="grid grid-cols-2" style="margin-top: 18px;">
      <!-- System Information -->
      <div class="card">
        <div class="card-title">System Information</div>
        <div class="card-sub">Runtime details from the gateway handshake.</div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">Protocol Version</div>
            <div class="stat-value" style="font-size:18px;">${e.hello?.protocol??"n/a"}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Uptime</div>
            <div class="stat-value" style="font-size:18px;">${n}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Tick Interval</div>
            <div class="stat-value" style="font-size:18px;">${s}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Last Channels Refresh</div>
            <div class="stat-value" style="font-size:18px;">
              ${e.lastChannelsRefresh?V(e.lastChannelsRefresh):"n/a"}
            </div>
          </div>
          ${e.hello?.features?.methods?r`<div class="stat" style="grid-column: 1 / -1;">
                <div class="stat-label">Available Methods</div>
                <div class="muted" style="margin-top:4px;font-size:12px;word-break:break-word;">
                  ${e.hello.features.methods.join(", ")}
                </div>
              </div>`:v}
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card">
        <div class="card-title">Quick Actions</div>
        <div class="card-sub">Navigate to common tasks quickly.</div>
        <div class="overview-actions" style="margin-top: 16px; display: grid; gap: 10px;">
          <button class="btn" style="justify-content: flex-start; width: 100%;"
            @click=${()=>e.onNavigate?.("chat")}>
            ${Y.messageSquare}
            <span>Open Chat</span>
          </button>
          <button class="btn" style="justify-content: flex-start; width: 100%;"
            @click=${()=>e.onNavigate?.("channels")}>
            ${Y.link}
            <span>View Channels</span>
          </button>
          <button class="btn" style="justify-content: flex-start; width: 100%;"
            @click=${()=>e.onNavigate?.("sessions")}>
            ${Y.fileText}
            <span>Manage Sessions</span>
          </button>
          <button class="btn" style="justify-content: flex-start; width: 100%;"
            @click=${()=>e.onNavigate?.("logs")}>
            ${Y.scrollText}
            <span>View Logs</span>
          </button>
          <button class="btn" style="justify-content: flex-start; width: 100%;"
            @click=${()=>e.onNavigate?.("config")}>
            ${Y.settings}
            <span>Edit Config</span>
          </button>
        </div>
      </div>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">Getting Started</div>
      <div class="card-sub">Quick guides to help you get the most out of OpenSoul.</div>
      <div class="note-grid" style="margin-top: 14px;">
        <div>
          <div class="note-title">1. Connect your gateway</div>
          <div class="muted">
            Enter the WebSocket URL and token above, then click Connect. For remote access, use Tailscale serve.
          </div>
        </div>
        <div>
          <div class="note-title">2. Link messaging channels</div>
          <div class="muted">
            Go to Channels to connect WhatsApp, Telegram, Discord, Signal, or iMessage.
          </div>
        </div>
        <div>
          <div class="note-title">3. Chat and automate</div>
          <div class="muted">
            Use the Chat view for real-time interaction, or set up Cron for scheduled automated runs.
          </div>
        </div>
      </div>
    </section>
  `}const Qm=["","off","minimal","low","medium","high","xhigh"],Ym=["","off","on"],Zm=[{value:"",label:"inherit"},{value:"off",label:"off (explicit)"},{value:"on",label:"on"},{value:"full",label:"full"}],Jm=["","off","on","stream"];function Xm(e){if(!e)return"";const t=e.trim().toLowerCase();return t==="z.ai"||t==="z-ai"?"zai":t}function Xl(e){return Xm(e)==="zai"}function eb(e){return Xl(e)?Ym:Qm}function lr(e,t){return t?e.includes(t)?[...e]:[...e,t]:[...e]}function tb(e,t){return t?e.some(n=>n.value===t)?[...e]:[...e,{value:t,label:`${t} (custom)`}]:[...e]}function nb(e,t){return!t||!e||e==="off"?e:"on"}function sb(e,t){return e?t&&e==="on"?"low":e:null}function ib(e){const t=e.result?.sessions??[];return r`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Sessions</div>
          <div class="card-sub">Active session keys and per-session overrides.</div>
        </div>
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?"Loading…":"Refresh"}
        </button>
      </div>

      <div class="filters" style="margin-top: 14px;">
        <label class="field">
          <span>Active within (minutes)</span>
          <input
            .value=${e.activeMinutes}
            @input=${n=>e.onFiltersChange({activeMinutes:n.target.value,limit:e.limit,includeGlobal:e.includeGlobal,includeUnknown:e.includeUnknown})}
          />
        </label>
        <label class="field">
          <span>Limit</span>
          <input
            .value=${e.limit}
            @input=${n=>e.onFiltersChange({activeMinutes:e.activeMinutes,limit:n.target.value,includeGlobal:e.includeGlobal,includeUnknown:e.includeUnknown})}
          />
        </label>
        <label class="field checkbox">
          <span>Include global</span>
          <input
            type="checkbox"
            .checked=${e.includeGlobal}
            @change=${n=>e.onFiltersChange({activeMinutes:e.activeMinutes,limit:e.limit,includeGlobal:n.target.checked,includeUnknown:e.includeUnknown})}
          />
        </label>
        <label class="field checkbox">
          <span>Include unknown</span>
          <input
            type="checkbox"
            .checked=${e.includeUnknown}
            @change=${n=>e.onFiltersChange({activeMinutes:e.activeMinutes,limit:e.limit,includeGlobal:e.includeGlobal,includeUnknown:n.target.checked})}
          />
        </label>
      </div>

      ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:v}

      <div class="muted" style="margin-top: 12px;">
        ${e.result?`Store: ${e.result.path}`:""}
      </div>

      <div class="table" style="margin-top: 16px;">
        <div class="table-head">
          <div>Key</div>
          <div>Label</div>
          <div>Kind</div>
          <div>Updated</div>
          <div>Tokens</div>
          <div>Thinking</div>
          <div>Verbose</div>
          <div>Reasoning</div>
          <div>Actions</div>
        </div>
        ${t.length===0?r`
                <div class="muted">No sessions found.</div>
              `:t.map(n=>ob(n,e.basePath,e.onPatch,e.onDelete,e.loading))}
      </div>
    </section>
  `}function ob(e,t,n,s,i){const o=e.updatedAt?V(e.updatedAt):"n/a",a=e.thinkingLevel??"",l=Xl(e.modelProvider),c=nb(a,l),u=lr(eb(e.modelProvider),c),g=e.verboseLevel??"",h=tb(Zm,g),f=e.reasoningLevel??"",d=lr(Jm,f),p=typeof e.displayName=="string"&&e.displayName.trim().length>0?e.displayName.trim():null,m=typeof e.label=="string"?e.label.trim():"",S=!!(p&&p!==e.key&&p!==m),k=e.kind!=="global",w=k?`${ls("chat",t)}?session=${encodeURIComponent(e.key)}`:null;return r`
    <div class="table-row">
      <div class="mono session-key-cell">
        ${k?r`<a href=${w} class="session-link">${e.key}</a>`:e.key}
        ${S?r`<span class="muted session-key-display-name">${p}</span>`:v}
      </div>
      <div>
        <input
          .value=${e.label??""}
          ?disabled=${i}
          placeholder="(optional)"
          @change=${A=>{const C=A.target.value.trim();n(e.key,{label:C||null})}}
        />
      </div>
      <div>${e.kind}</div>
      <div>${o}</div>
      <div>${ap(e)}</div>
      <div>
        <select
          ?disabled=${i}
          @change=${A=>{const C=A.target.value;n(e.key,{thinkingLevel:sb(C,l)})}}
        >
          ${u.map(A=>r`<option value=${A} ?selected=${c===A}>
                ${A||"inherit"}
              </option>`)}
        </select>
      </div>
      <div>
        <select
          ?disabled=${i}
          @change=${A=>{const C=A.target.value;n(e.key,{verboseLevel:C||null})}}
        >
          ${h.map(A=>r`<option value=${A.value} ?selected=${g===A.value}>
                ${A.label}
              </option>`)}
        </select>
      </div>
      <div>
        <select
          ?disabled=${i}
          @change=${A=>{const C=A.target.value;n(e.key,{reasoningLevel:C||null})}}
        >
          ${d.map(A=>r`<option value=${A} ?selected=${f===A}>
                ${A||"inherit"}
              </option>`)}
        </select>
      </div>
      <div>
        <button class="btn danger" ?disabled=${i} @click=${()=>s(e.key)}>
          Delete
        </button>
      </div>
    </div>
  `}const ab=[{id:"general",label:"General",icon:"settings"},{id:"config",label:"Config",icon:"settings"},{id:"logs",label:"Logs",icon:"scrollText"},{id:"debug",label:"Debug",icon:"bug"}];function rb(e){return r`
    <div class="settings-section">
      <h3 class="settings-section__title">Appearance</h3>
      <div class="settings-section__row">
        <div class="settings-section__row-info">
          <span class="settings-section__row-label">Theme</span>
          <span class="settings-section__row-desc">Choose light, dark, or follow your system preference.</span>
        </div>
        <div class="settings-section__row-control">
          ${jg(e)}
        </div>
      </div>

      <h3 class="settings-section__title" style="margin-top:28px;">Links</h3>
      <a
        class="settings-link"
        href="https://github.com/NJX-njx/opensoul"
        target="_blank"
        rel="noreferrer"
      >
        <span class="settings-link__icon">${Y.link}</span>
        <span class="settings-link__text">GitHub Repository</span>
        <span class="settings-link__external">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" x2="21" y1="14" y2="3"></line>
          </svg>
        </span>
      </a>
    </div>
  `}function lb(e,t){if(!e.settingsOpen)return v;const n=e.settingsSection;return r`
    <!-- Backdrop -->
    <div class="settings-backdrop" @click=${()=>e.closeSettings()}></div>

    <!-- Panel -->
    <div class="settings-panel" @keydown=${i=>{i.key==="Escape"&&(i.stopPropagation(),e.closeSettings())}} tabindex="-1">
      <!-- Header -->
      <div class="settings-panel__header">
        <h2 class="settings-panel__title">Settings</h2>
        <button
          class="settings-panel__close"
          @click=${()=>e.closeSettings()}
          title="Close settings"
          aria-label="Close settings"
        >
          ${Y.x}
        </button>
      </div>

      <div class="settings-panel__body">
        <!-- Left nav -->
        <nav class="settings-panel__nav">
          ${ab.map(i=>r`
              <button
                class="settings-nav-item ${n===i.id?"active":""}"
                @click=${()=>e.setSettingsSection(i.id)}
              >
                <span class="settings-nav-item__icon">${Y[i.icon]}</span>
                <span class="settings-nav-item__text">${i.label}</span>
              </button>
            `)}
        </nav>

        <!-- Right content -->
        <div class="settings-panel__content">
          ${n==="general"?rb(e):v}
          ${n==="config"?t.config:v}
          ${n==="logs"?t.logs:v}
          ${n==="debug"?t.debug:v}
        </div>
      </div>
    </div>
  `}const Mn=[{id:"workspace",label:"Workspace Skills",sources:["opensoul-workspace"]},{id:"built-in",label:"Built-in Skills",sources:["opensoul-bundled"]},{id:"installed",label:"Installed Skills",sources:["opensoul-managed"]},{id:"extra",label:"Extra Skills",sources:["opensoul-extra"]}];function cb(e){const t=new Map;for(const o of Mn)t.set(o.id,{id:o.id,label:o.label,skills:[]});const n=Mn.find(o=>o.id==="built-in"),s={id:"other",label:"Other Skills",skills:[]};for(const o of e){const a=o.bundled?n:Mn.find(l=>l.sources.includes(o.source));a?t.get(a.id)?.skills.push(o):s.skills.push(o)}const i=Mn.map(o=>t.get(o.id)).filter(o=>!!(o&&o.skills.length>0));return s.skills.length>0&&i.push(s),i}function db(e){const t=e.report?.skills??[],n=e.filter.trim().toLowerCase(),s=n?t.filter(o=>[o.name,o.description,o.source].join(" ").toLowerCase().includes(n)):t,i=cb(s);return r`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Skills</div>
          <div class="card-sub">Bundled, managed, and workspace skills.</div>
        </div>
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?"Loading…":"Refresh"}
        </button>
      </div>

      <div class="filters" style="margin-top: 14px;">
        <label class="field" style="flex: 1;">
          <span>Filter</span>
          <input
            .value=${e.filter}
            @input=${o=>e.onFilterChange(o.target.value)}
            placeholder="Search skills"
          />
        </label>
        <div class="muted">${s.length} shown</div>
      </div>

      ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:v}

      ${s.length===0?r`
              <div class="muted" style="margin-top: 16px">No skills found.</div>
            `:r`
            <div class="agent-skills-groups" style="margin-top: 16px;">
              ${i.map(o=>{const a=o.id==="workspace"||o.id==="built-in";return r`
                  <details class="agent-skills-group" ?open=${!a}>
                    <summary class="agent-skills-header">
                      <span>${o.label}</span>
                      <span class="muted">${o.skills.length}</span>
                    </summary>
                    <div class="list skills-grid">
                      ${o.skills.map(l=>ub(l,e))}
                    </div>
                  </details>
                `})}
            </div>
          `}
    </section>
  `}function ub(e,t){const n=t.busyKey===e.skillKey,s=t.edits[e.skillKey]??"",i=t.messages[e.skillKey]??null,o=e.install.length>0&&e.missing.bins.length>0,a=!!(e.bundled&&e.source!=="opensoul-bundled"),l=[...e.missing.bins.map(u=>`bin:${u}`),...e.missing.env.map(u=>`env:${u}`),...e.missing.config.map(u=>`config:${u}`),...e.missing.os.map(u=>`os:${u}`)],c=[];return e.disabled&&c.push("disabled"),e.blockedByAllowlist&&c.push("blocked by allowlist"),r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">
          ${e.emoji?`${e.emoji} `:""}${e.name}
        </div>
        <div class="list-sub">${ni(e.description,140)}</div>
        <div class="chip-row" style="margin-top: 6px;">
          <span class="chip">${e.source}</span>
          ${a?r`
                  <span class="chip">bundled</span>
                `:v}
          <span class="chip ${e.eligible?"chip-ok":"chip-warn"}">
            ${e.eligible?"eligible":"blocked"}
          </span>
          ${e.disabled?r`
                  <span class="chip chip-warn">disabled</span>
                `:v}
        </div>
        ${l.length>0?r`
              <div class="muted" style="margin-top: 6px;">
                Missing: ${l.join(", ")}
              </div>
            `:v}
        ${c.length>0?r`
              <div class="muted" style="margin-top: 6px;">
                Reason: ${c.join(", ")}
              </div>
            `:v}
      </div>
      <div class="list-meta">
        <div class="row" style="justify-content: flex-end; flex-wrap: wrap;">
          <button
            class="btn"
            ?disabled=${n}
            @click=${()=>t.onToggle(e.skillKey,e.disabled)}
          >
            ${e.disabled?"Enable":"Disable"}
          </button>
          ${o?r`<button
                class="btn"
                ?disabled=${n}
                @click=${()=>t.onInstall(e.skillKey,e.name,e.install[0].id)}
              >
                ${n?"Installing…":e.install[0].label}
              </button>`:v}
        </div>
        ${i?r`<div
              class="muted"
              style="margin-top: 8px; color: ${i.kind==="error"?"var(--danger-color, #d14343)":"var(--success-color, #0a7f5a)"};"
            >
              ${i.message}
            </div>`:v}
        ${e.primaryEnv?r`
              <div class="field" style="margin-top: 10px;">
                <span>API key</span>
                <input
                  type="password"
                  .value=${s}
                  @input=${u=>t.onEdit(e.skillKey,u.target.value)}
                />
              </div>
              <button
                class="btn primary"
                style="margin-top: 8px;"
                ?disabled=${n}
                @click=${()=>t.onSaveKey(e.skillKey)}
              >
                Save key
              </button>
            `:v}
      </div>
    </div>
  `}const gb=new Set(["agent","channel","chat","provider","model","tool","label","key","session","id","has","mintokens","maxtokens","mincost","maxcost","minmessages","maxmessages"]),Jn=e=>e.trim().toLowerCase(),pb=e=>{const t=e.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*").replace(/\?/g,".");return new RegExp(`^${t}$`,"i")},lt=e=>{let t=e.trim().toLowerCase();if(!t)return null;t.startsWith("$")&&(t=t.slice(1));let n=1;t.endsWith("k")?(n=1e3,t=t.slice(0,-1)):t.endsWith("m")&&(n=1e6,t=t.slice(0,-1));const s=Number(t);return Number.isFinite(s)?s*n:null},bo=e=>(e.match(/"[^"]+"|\S+/g)??[]).map(n=>{const s=n.replace(/^"|"$/g,""),i=s.indexOf(":");if(i>0){const o=s.slice(0,i),a=s.slice(i+1);return{key:o,value:a,raw:s}}return{value:s,raw:s}}),hb=e=>[e.label,e.key,e.sessionId].filter(n=>!!n).map(n=>n.toLowerCase()),cr=e=>{const t=new Set;e.modelProvider&&t.add(e.modelProvider.toLowerCase()),e.providerOverride&&t.add(e.providerOverride.toLowerCase()),e.origin?.provider&&t.add(e.origin.provider.toLowerCase());for(const n of e.usage?.modelUsage??[])n.provider&&t.add(n.provider.toLowerCase());return Array.from(t)},dr=e=>{const t=new Set;e.model&&t.add(e.model.toLowerCase());for(const n of e.usage?.modelUsage??[])n.model&&t.add(n.model.toLowerCase());return Array.from(t)},fb=e=>(e.usage?.toolUsage?.tools??[]).map(t=>t.name.toLowerCase()),vb=(e,t)=>{const n=Jn(t.value??"");if(!n)return!0;if(!t.key)return hb(e).some(i=>i.includes(n));switch(Jn(t.key)){case"agent":return e.agentId?.toLowerCase().includes(n)??!1;case"channel":return e.channel?.toLowerCase().includes(n)??!1;case"chat":return e.chatType?.toLowerCase().includes(n)??!1;case"provider":return cr(e).some(i=>i.includes(n));case"model":return dr(e).some(i=>i.includes(n));case"tool":return fb(e).some(i=>i.includes(n));case"label":return e.label?.toLowerCase().includes(n)??!1;case"key":case"session":case"id":if(n.includes("*")||n.includes("?")){const i=pb(n);return i.test(e.key)||(e.sessionId?i.test(e.sessionId):!1)}return e.key.toLowerCase().includes(n)||(e.sessionId?.toLowerCase().includes(n)??!1);case"has":switch(n){case"tools":return(e.usage?.toolUsage?.totalCalls??0)>0;case"errors":return(e.usage?.messageCounts?.errors??0)>0;case"context":return!!e.contextWeight;case"usage":return!!e.usage;case"model":return dr(e).length>0;case"provider":return cr(e).length>0;default:return!0}case"mintokens":{const i=lt(n);return i===null?!0:(e.usage?.totalTokens??0)>=i}case"maxtokens":{const i=lt(n);return i===null?!0:(e.usage?.totalTokens??0)<=i}case"mincost":{const i=lt(n);return i===null?!0:(e.usage?.totalCost??0)>=i}case"maxcost":{const i=lt(n);return i===null?!0:(e.usage?.totalCost??0)<=i}case"minmessages":{const i=lt(n);return i===null?!0:(e.usage?.messageCounts?.total??0)>=i}case"maxmessages":{const i=lt(n);return i===null?!0:(e.usage?.messageCounts?.total??0)<=i}default:return!0}},mb=(e,t)=>{const n=bo(t);if(n.length===0)return{sessions:e,warnings:[]};const s=[];for(const o of n){if(!o.key)continue;const a=Jn(o.key);if(!gb.has(a)){s.push(`Unknown filter: ${o.key}`);continue}if(o.value===""&&s.push(`Missing value for ${o.key}`),a==="has"){const l=new Set(["tools","errors","context","usage","model","provider"]);o.value&&!l.has(Jn(o.value))&&s.push(`Unknown has:${o.value}`)}["mintokens","maxtokens","mincost","maxcost","minmessages","maxmessages"].includes(a)&&o.value&&lt(o.value)===null&&s.push(`Invalid number for ${o.key}`)}return{sessions:e.filter(o=>n.every(a=>vb(o,a))),warnings:s}};function bb(e){const t=e.split(`
`),n=new Map,s=[];for(const l of t){const c=/^\[Tool:\s*([^\]]+)\]/.exec(l.trim());if(c){const u=c[1];n.set(u,(n.get(u)??0)+1);continue}l.trim().startsWith("[Tool Result]")||s.push(l)}const i=Array.from(n.entries()).toSorted((l,c)=>c[1]-l[1]),o=i.reduce((l,[,c])=>l+c,0),a=i.length>0?`Tools: ${i.map(([l,c])=>`${l}×${c}`).join(", ")} (${o} calls)`:"";return{tools:i,summary:a,cleanContent:s.join(`
`).trim()}}const yb=`
  .usage-page-header {
    margin: 4px 0 12px;
  }
  .usage-page-title {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 4px;
  }
  .usage-page-subtitle {
    font-size: 13px;
    color: var(--text-muted);
    margin: 0 0 12px;
  }
  /* ===== FILTERS & HEADER ===== */
  .usage-filters-inline {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  }
  .usage-filters-inline select {
    padding: 6px 10px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--bg);
    color: var(--text);
    font-size: 13px;
  }
  .usage-filters-inline input[type="date"] {
    padding: 6px 10px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--bg);
    color: var(--text);
    font-size: 13px;
  }
  .usage-filters-inline input[type="text"] {
    padding: 6px 10px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--bg);
    color: var(--text);
    font-size: 13px;
    min-width: 180px;
  }
  .usage-filters-inline .btn-sm {
    padding: 6px 12px;
    font-size: 14px;
  }
  .usage-refresh-indicator {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    background: rgba(255, 77, 77, 0.1);
    border-radius: 4px;
    font-size: 12px;
    color: #ff4d4d;
  }
  .usage-refresh-indicator::before {
    content: "";
    width: 10px;
    height: 10px;
    border: 2px solid #ff4d4d;
    border-top-color: transparent;
    border-radius: 50%;
    animation: usage-spin 0.6s linear infinite;
  }
  @keyframes usage-spin {
    to { transform: rotate(360deg); }
  }
  .active-filters {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .filter-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px 4px 12px;
    background: var(--accent-subtle);
    border: 1px solid var(--accent);
    border-radius: 16px;
    font-size: 12px;
  }
  .filter-chip-label {
    color: var(--accent);
    font-weight: 500;
  }
  .filter-chip-remove {
    background: none;
    border: none;
    color: var(--accent);
    cursor: pointer;
    padding: 2px 4px;
    font-size: 14px;
    line-height: 1;
    opacity: 0.7;
    transition: opacity 0.15s;
  }
  .filter-chip-remove:hover {
    opacity: 1;
  }
  .filter-clear-btn {
    padding: 4px 10px !important;
    font-size: 12px !important;
    line-height: 1 !important;
    margin-left: 8px;
  }
  .usage-query-bar {
    display: grid;
    grid-template-columns: minmax(220px, 1fr) auto;
    gap: 10px;
    align-items: center;
    /* Keep the dropdown filter row from visually touching the query row. */
    margin-bottom: 10px;
  }
  .usage-query-actions {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: nowrap;
    justify-self: end;
  }
  .usage-query-actions .btn {
    height: 34px;
    padding: 0 14px;
    border-radius: 999px;
    font-weight: 600;
    font-size: 13px;
    line-height: 1;
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    color: var(--text);
    box-shadow: none;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
  }
  .usage-query-actions .btn:hover {
    background: var(--bg);
    border-color: var(--border-strong);
  }
  .usage-action-btn {
    height: 34px;
    padding: 0 14px;
    border-radius: 999px;
    font-weight: 600;
    font-size: 13px;
    line-height: 1;
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    color: var(--text);
    box-shadow: none;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
  }
  .usage-action-btn:hover {
    background: var(--bg);
    border-color: var(--border-strong);
  }
  .usage-primary-btn {
    background: #ff4d4d;
    color: #fff;
    border-color: #ff4d4d;
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.12);
  }
  .btn.usage-primary-btn {
    background: #ff4d4d !important;
    border-color: #ff4d4d !important;
    color: #fff !important;
  }
  .usage-primary-btn:hover {
    background: #e64545;
    border-color: #e64545;
  }
  .btn.usage-primary-btn:hover {
    background: #e64545 !important;
    border-color: #e64545 !important;
  }
  .usage-primary-btn:disabled {
    background: rgba(255, 77, 77, 0.18);
    border-color: rgba(255, 77, 77, 0.3);
    color: #ff4d4d;
    box-shadow: none;
    cursor: default;
    opacity: 1;
  }
  .usage-primary-btn[disabled] {
    background: rgba(255, 77, 77, 0.18) !important;
    border-color: rgba(255, 77, 77, 0.3) !important;
    color: #ff4d4d !important;
    opacity: 1 !important;
  }
  .usage-secondary-btn {
    background: var(--bg-secondary);
    color: var(--text);
    border-color: var(--border);
  }
  .usage-query-input {
    width: 100%;
    min-width: 220px;
    padding: 6px 10px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--bg);
    color: var(--text);
    font-size: 13px;
  }
  .usage-query-suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 6px;
  }
  .usage-query-suggestion {
    padding: 4px 8px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    font-size: 11px;
    color: var(--text);
    cursor: pointer;
    transition: background 0.15s;
  }
  .usage-query-suggestion:hover {
    background: var(--bg-hover);
  }
  .usage-filter-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    margin-top: 14px;
  }
  details.usage-filter-select {
    position: relative;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 6px 10px;
    background: var(--bg);
    font-size: 12px;
    min-width: 140px;
  }
  details.usage-filter-select summary {
    cursor: pointer;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    font-weight: 500;
  }
  details.usage-filter-select summary::-webkit-details-marker {
    display: none;
  }
  .usage-filter-badge {
    font-size: 11px;
    color: var(--text-muted);
  }
  .usage-filter-popover {
    position: absolute;
    left: 0;
    top: calc(100% + 6px);
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    min-width: 220px;
    z-index: 20;
  }
  .usage-filter-actions {
    display: flex;
    gap: 6px;
    margin-bottom: 8px;
  }
  .usage-filter-actions button {
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 11px;
  }
  .usage-filter-options {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-height: 200px;
    overflow: auto;
  }
  .usage-filter-option {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
  }
  .usage-query-hint {
    font-size: 11px;
    color: var(--text-muted);
  }
  .usage-query-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 6px;
  }
  .usage-query-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    font-size: 11px;
  }
  .usage-query-chip button {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0;
    line-height: 1;
  }
  .usage-header {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: var(--bg);
  }
  .usage-header.pinned {
    position: sticky;
    top: 12px;
    z-index: 6;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  }
  .usage-pin-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    font-size: 11px;
    color: var(--text);
    cursor: pointer;
  }
  .usage-pin-btn.active {
    background: var(--accent-subtle);
    border-color: var(--accent);
    color: var(--accent);
  }
  .usage-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }
  .usage-header-title {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .usage-header-metrics {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
  .usage-metric-badge {
    display: inline-flex;
    align-items: baseline;
    gap: 6px;
    padding: 2px 8px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: transparent;
    font-size: 11px;
    color: var(--text-muted);
  }
  .usage-metric-badge strong {
    font-size: 12px;
    color: var(--text);
  }
  .usage-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .usage-controls .active-filters {
    flex: 1 1 100%;
  }
  .usage-controls input[type="date"] {
    min-width: 140px;
  }
  .usage-presets {
    display: inline-flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  .usage-presets .btn {
    padding: 4px 8px;
    font-size: 11px;
  }
  .usage-quick-filters {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  }
  .usage-select {
    min-width: 120px;
    padding: 6px 10px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--bg);
    color: var(--text);
    font-size: 12px;
  }
  .usage-export-menu summary {
    cursor: pointer;
    font-weight: 500;
    color: var(--text);
    list-style: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .usage-export-menu summary::-webkit-details-marker {
    display: none;
  }
  .usage-export-menu {
    position: relative;
  }
  .usage-export-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--bg);
    font-size: 12px;
  }
  .usage-export-popover {
    position: absolute;
    right: 0;
    top: calc(100% + 6px);
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 8px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    min-width: 160px;
    z-index: 10;
  }
  .usage-export-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .usage-export-item {
    text-align: left;
    padding: 6px 10px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    font-size: 12px;
  }
  .usage-summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
    margin-top: 12px;
  }
  .usage-summary-card {
    padding: 12px;
    border-radius: 8px;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
  }
  .usage-mosaic {
    margin-top: 16px;
    padding: 16px;
  }
  .usage-mosaic-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }
  .usage-mosaic-title {
    font-weight: 600;
  }
  .usage-mosaic-sub {
    font-size: 12px;
    color: var(--text-muted);
  }
  .usage-mosaic-grid {
    display: grid;
    grid-template-columns: minmax(200px, 1fr) minmax(260px, 2fr);
    gap: 16px;
    align-items: start;
  }
  .usage-mosaic-section {
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px;
  }
  .usage-mosaic-section-title {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .usage-mosaic-total {
    font-size: 20px;
    font-weight: 700;
  }
  .usage-daypart-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
    gap: 8px;
  }
  .usage-daypart-cell {
    border-radius: 8px;
    padding: 10px;
    color: var(--text);
    background: rgba(255, 77, 77, 0.08);
    border: 1px solid rgba(255, 77, 77, 0.2);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .usage-daypart-label {
    font-size: 12px;
    font-weight: 600;
  }
  .usage-daypart-value {
    font-size: 14px;
  }
  .usage-hour-grid {
    display: grid;
    grid-template-columns: repeat(24, minmax(6px, 1fr));
    gap: 4px;
  }
  .usage-hour-cell {
    height: 28px;
    border-radius: 6px;
    background: rgba(255, 77, 77, 0.1);
    border: 1px solid rgba(255, 77, 77, 0.2);
    cursor: pointer;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .usage-hour-cell.selected {
    border-color: rgba(255, 77, 77, 0.8);
    box-shadow: 0 0 0 2px rgba(255, 77, 77, 0.2);
  }
  .usage-hour-labels {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 6px;
    margin-top: 8px;
    font-size: 11px;
    color: var(--text-muted);
  }
  .usage-hour-legend {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-top: 10px;
    font-size: 11px;
    color: var(--text-muted);
  }
  .usage-hour-legend span {
    display: inline-block;
    width: 14px;
    height: 10px;
    border-radius: 4px;
    background: rgba(255, 77, 77, 0.15);
    border: 1px solid rgba(255, 77, 77, 0.2);
  }
  .usage-calendar-labels {
    display: grid;
    grid-template-columns: repeat(7, minmax(10px, 1fr));
    gap: 6px;
    font-size: 10px;
    color: var(--text-muted);
    margin-bottom: 6px;
  }
  .usage-calendar {
    display: grid;
    grid-template-columns: repeat(7, minmax(10px, 1fr));
    gap: 6px;
  }
  .usage-calendar-cell {
    height: 18px;
    border-radius: 4px;
    border: 1px solid rgba(255, 77, 77, 0.2);
    background: rgba(255, 77, 77, 0.08);
  }
  .usage-calendar-cell.empty {
    background: transparent;
    border-color: transparent;
  }
  .usage-summary-title {
    font-size: 11px;
    color: var(--text-muted);
    margin-bottom: 6px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .usage-info {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    margin-left: 6px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--bg);
    font-size: 10px;
    color: var(--text-muted);
    cursor: help;
  }
  .usage-summary-value {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-strong);
  }
  .usage-summary-value.good {
    color: #1f8f4e;
  }
  .usage-summary-value.warn {
    color: #c57a00;
  }
  .usage-summary-value.bad {
    color: #c9372c;
  }
  .usage-summary-hint {
    font-size: 10px;
    color: var(--text-muted);
    cursor: help;
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 0 6px;
    line-height: 16px;
    height: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .usage-summary-sub {
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 4px;
  }
  .usage-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .usage-list-item {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    font-size: 12px;
    color: var(--text);
    align-items: flex-start;
  }
  .usage-list-value {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    text-align: right;
  }
  .usage-list-sub {
    font-size: 11px;
    color: var(--text-muted);
  }
  .usage-list-item.button {
    border: none;
    background: transparent;
    padding: 0;
    text-align: left;
    cursor: pointer;
  }
  .usage-list-item.button:hover {
    color: var(--text-strong);
  }
  .usage-list-item .muted {
    font-size: 11px;
  }
  .usage-error-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .usage-error-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 8px;
    align-items: center;
    font-size: 12px;
  }
  .usage-error-date {
    font-weight: 600;
  }
  .usage-error-rate {
    font-variant-numeric: tabular-nums;
  }
  .usage-error-sub {
    grid-column: 1 / -1;
    font-size: 11px;
    color: var(--text-muted);
  }
  .usage-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 8px;
  }
  .usage-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 2px 8px;
    border: 1px solid var(--border);
    border-radius: 999px;
    font-size: 11px;
    background: var(--bg);
    color: var(--text);
  }
  .usage-meta-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
  }
  .usage-meta-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
  }
  .usage-meta-item span {
    color: var(--text-muted);
    font-size: 11px;
  }
  .usage-insights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    margin-top: 12px;
  }
  .usage-insight-card {
    padding: 14px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--bg-secondary);
  }
  .usage-insight-title {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .usage-insight-subtitle {
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 6px;
  }
  /* ===== CHART TOGGLE ===== */
  .chart-toggle {
    display: flex;
    background: var(--bg);
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid var(--border);
  }
  .chart-toggle .toggle-btn {
    padding: 6px 14px;
    font-size: 13px;
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.15s;
  }
  .chart-toggle .toggle-btn:hover {
    color: var(--text);
  }
  .chart-toggle .toggle-btn.active {
    background: #ff4d4d;
    color: white;
  }
  .chart-toggle.small .toggle-btn {
    padding: 4px 8px;
    font-size: 11px;
  }
  .sessions-toggle {
    border-radius: 4px;
  }
  .sessions-toggle .toggle-btn {
    border-radius: 4px;
  }
  .daily-chart-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    margin-bottom: 6px;
  }

  /* ===== DAILY BAR CHART ===== */
  .daily-chart {
    margin-top: 12px;
  }
  .daily-chart-bars {
    display: flex;
    align-items: flex-end;
    height: 200px;
    gap: 4px;
    padding: 8px 4px 36px;
  }
  .daily-bar-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: flex-end;
    cursor: pointer;
    position: relative;
    border-radius: 4px 4px 0 0;
    transition: background 0.15s;
    min-width: 0;
  }
  .daily-bar-wrapper:hover {
    background: var(--bg-hover);
  }
  .daily-bar-wrapper.selected {
    background: var(--accent-subtle);
  }
  .daily-bar-wrapper.selected .daily-bar {
    background: var(--accent);
  }
  .daily-bar {
    width: 100%;
    max-width: var(--bar-max-width, 32px);
    background: #ff4d4d;
    border-radius: 3px 3px 0 0;
    min-height: 2px;
    transition: all 0.15s;
    overflow: hidden;
  }
  .daily-bar-wrapper:hover .daily-bar {
    background: #cc3d3d;
  }
  .daily-bar-label {
    position: absolute;
    bottom: -28px;
    font-size: 10px;
    color: var(--text-muted);
    white-space: nowrap;
    text-align: center;
    transform: rotate(-35deg);
    transform-origin: top center;
  }
  .daily-bar-total {
    position: absolute;
    top: -16px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 10px;
    color: var(--text-muted);
    white-space: nowrap;
  }
  .daily-bar-tooltip {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 100;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s;
  }
  .daily-bar-wrapper:hover .daily-bar-tooltip {
    opacity: 1;
  }

  /* ===== COST/TOKEN BREAKDOWN BAR ===== */
  .cost-breakdown {
    margin-top: 18px;
    padding: 16px;
    background: var(--bg-secondary);
    border-radius: 8px;
  }
  .cost-breakdown-header {
    font-weight: 600;
    font-size: 15px;
    letter-spacing: -0.02em;
    margin-bottom: 12px;
    color: var(--text-strong);
  }
  .cost-breakdown-bar {
    height: 28px;
    background: var(--bg);
    border-radius: 6px;
    overflow: hidden;
    display: flex;
  }
  .cost-segment {
    height: 100%;
    transition: width 0.3s ease;
    position: relative;
  }
  .cost-segment.output {
    background: #ef4444;
  }
  .cost-segment.input {
    background: #f59e0b;
  }
  .cost-segment.cache-write {
    background: #10b981;
  }
  .cost-segment.cache-read {
    background: #06b6d4;
  }
  .cost-breakdown-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 12px;
  }
  .cost-breakdown-total {
    margin-top: 10px;
    font-size: 12px;
    color: var(--text-muted);
  }
  .legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--text);
    cursor: help;
  }
  .legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    flex-shrink: 0;
  }
  .legend-dot.output {
    background: #ef4444;
  }
  .legend-dot.input {
    background: #f59e0b;
  }
  .legend-dot.cache-write {
    background: #10b981;
  }
  .legend-dot.cache-read {
    background: #06b6d4;
  }
  .legend-dot.system {
    background: #ff4d4d;
  }
  .legend-dot.skills {
    background: #8b5cf6;
  }
  .legend-dot.tools {
    background: #ec4899;
  }
  .legend-dot.files {
    background: #f59e0b;
  }
  .cost-breakdown-note {
    margin-top: 10px;
    font-size: 11px;
    color: var(--text-muted);
    line-height: 1.4;
  }

  /* ===== SESSION BARS (scrollable list) ===== */
  .session-bars {
    margin-top: 16px;
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--bg);
  }
  .session-bar-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    transition: background 0.15s;
  }
  .session-bar-row:last-child {
    border-bottom: none;
  }
  .session-bar-row:hover {
    background: var(--bg-hover);
  }
  .session-bar-row.selected {
    background: var(--accent-subtle);
  }
  .session-bar-label {
    flex: 1 1 auto;
    min-width: 0;
    font-size: 13px;
    color: var(--text);
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .session-bar-title {
    /* Prefer showing the full name; wrap instead of truncating. */
    white-space: normal;
    overflow-wrap: anywhere;
    word-break: break-word;
  }
  .session-bar-meta {
    font-size: 10px;
    color: var(--text-muted);
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .session-bar-track {
    flex: 0 0 90px;
    height: 6px;
    background: var(--bg-secondary);
    border-radius: 4px;
    overflow: hidden;
    opacity: 0.6;
  }
  .session-bar-fill {
    height: 100%;
    background: rgba(255, 77, 77, 0.7);
    border-radius: 4px;
    transition: width 0.3s ease;
  }
  .session-bar-value {
    flex: 0 0 70px;
    text-align: right;
    font-size: 12px;
    font-family: var(--font-mono);
    color: var(--text-muted);
  }
  .session-bar-actions {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex: 0 0 auto;
  }
  .session-copy-btn {
    height: 26px;
    padding: 0 10px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    font-size: 11px;
    font-weight: 600;
    color: var(--text-muted);
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
  }
  .session-copy-btn:hover {
    background: var(--bg);
    border-color: var(--border-strong);
    color: var(--text);
  }

  /* ===== TIME SERIES CHART ===== */
  .session-timeseries {
    margin-top: 24px;
    padding: 16px;
    background: var(--bg-secondary);
    border-radius: 8px;
  }
  .timeseries-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  .timeseries-controls {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .timeseries-header {
    font-weight: 600;
    color: var(--text);
  }
  .timeseries-chart {
    width: 100%;
    overflow: hidden;
  }
  .timeseries-svg {
    width: 100%;
    height: auto;
    display: block;
  }
  .timeseries-svg .axis-label {
    font-size: 10px;
    fill: var(--text-muted);
  }
  .timeseries-svg .ts-area {
    fill: #ff4d4d;
    fill-opacity: 0.1;
  }
  .timeseries-svg .ts-line {
    fill: none;
    stroke: #ff4d4d;
    stroke-width: 2;
  }
  .timeseries-svg .ts-dot {
    fill: #ff4d4d;
    transition: r 0.15s, fill 0.15s;
  }
  .timeseries-svg .ts-dot:hover {
    r: 5;
  }
  .timeseries-svg .ts-bar {
    fill: #ff4d4d;
    transition: fill 0.15s;
  }
  .timeseries-svg .ts-bar:hover {
    fill: #cc3d3d;
  }
  .timeseries-svg .ts-bar.output { fill: #ef4444; }
  .timeseries-svg .ts-bar.input { fill: #f59e0b; }
  .timeseries-svg .ts-bar.cache-write { fill: #10b981; }
  .timeseries-svg .ts-bar.cache-read { fill: #06b6d4; }
  .timeseries-summary {
    margin-top: 12px;
    font-size: 13px;
    color: var(--text-muted);
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .timeseries-loading {
    padding: 24px;
    text-align: center;
    color: var(--text-muted);
  }

  /* ===== SESSION LOGS ===== */
  .session-logs {
    margin-top: 24px;
    background: var(--bg-secondary);
    border-radius: 8px;
    overflow: hidden;
  }
  .session-logs-header {
    padding: 10px 14px;
    font-weight: 600;
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    background: var(--bg-secondary);
  }
  .session-logs-loading {
    padding: 24px;
    text-align: center;
    color: var(--text-muted);
  }
  .session-logs-list {
    max-height: 400px;
    overflow-y: auto;
  }
  .session-log-entry {
    padding: 10px 14px;
    border-bottom: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: var(--bg);
  }
  .session-log-entry:last-child {
    border-bottom: none;
  }
  .session-log-entry.user {
    border-left: 3px solid var(--accent);
  }
  .session-log-entry.assistant {
    border-left: 3px solid var(--border-strong);
  }
  .session-log-meta {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 11px;
    color: var(--text-muted);
    flex-wrap: wrap;
  }
  .session-log-role {
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 999px;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
  }
  .session-log-entry.user .session-log-role {
    color: var(--accent);
  }
  .session-log-entry.assistant .session-log-role {
    color: var(--text-muted);
  }
  .session-log-content {
    font-size: 13px;
    line-height: 1.5;
    color: var(--text);
    white-space: pre-wrap;
    word-break: break-word;
    background: var(--bg-secondary);
    border-radius: 8px;
    padding: 8px 10px;
    border: 1px solid var(--border);
    max-height: 220px;
    overflow-y: auto;
  }

  /* ===== CONTEXT WEIGHT BREAKDOWN ===== */
  .context-weight-breakdown {
    margin-top: 24px;
    padding: 16px;
    background: var(--bg-secondary);
    border-radius: 8px;
  }
  .context-weight-breakdown .context-weight-header {
    font-weight: 600;
    font-size: 13px;
    margin-bottom: 4px;
    color: var(--text);
  }
  .context-weight-desc {
    font-size: 12px;
    color: var(--text-muted);
    margin: 0 0 12px 0;
  }
  .context-stacked-bar {
    height: 24px;
    background: var(--bg);
    border-radius: 6px;
    overflow: hidden;
    display: flex;
  }
  .context-segment {
    height: 100%;
    transition: width 0.3s ease;
  }
  .context-segment.system {
    background: #ff4d4d;
  }
  .context-segment.skills {
    background: #8b5cf6;
  }
  .context-segment.tools {
    background: #ec4899;
  }
  .context-segment.files {
    background: #f59e0b;
  }
  .context-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 12px;
  }
  .context-total {
    margin-top: 10px;
    font-size: 12px;
    font-weight: 600;
    color: var(--text-muted);
  }
  .context-details {
    margin-top: 12px;
    border: 1px solid var(--border);
    border-radius: 6px;
    overflow: hidden;
  }
  .context-details summary {
    padding: 10px 14px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
  }
  .context-details[open] summary {
    border-bottom: 1px solid var(--border);
  }
  .context-list {
    max-height: 200px;
    overflow-y: auto;
  }
  .context-list-header {
    display: flex;
    justify-content: space-between;
    padding: 8px 14px;
    font-size: 11px;
    text-transform: uppercase;
    color: var(--text-muted);
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border);
  }
  .context-list-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 14px;
    font-size: 12px;
    border-bottom: 1px solid var(--border);
  }
  .context-list-item:last-child {
    border-bottom: none;
  }
  .context-list-item .mono {
    font-family: var(--font-mono);
    color: var(--text);
  }
  .context-list-item .muted {
    color: var(--text-muted);
    font-family: var(--font-mono);
  }

  /* ===== NO CONTEXT NOTE ===== */
  .no-context-note {
    margin-top: 24px;
    padding: 16px;
    background: var(--bg-secondary);
    border-radius: 8px;
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.5;
  }

  /* ===== TWO COLUMN LAYOUT ===== */
  .usage-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
    margin-top: 18px;
    align-items: stretch;
  }
  .usage-grid-left {
    display: flex;
    flex-direction: column;
  }
  .usage-grid-right {
    display: flex;
    flex-direction: column;
  }
  
  /* ===== LEFT CARD (Daily + Breakdown) ===== */
  .usage-left-card {
    /* inherits background, border, shadow from .card */
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .usage-left-card .daily-chart-bars {
    flex: 1;
    min-height: 200px;
  }
  .usage-left-card .sessions-panel-title {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 12px;
  }
  
  /* ===== COMPACT DAILY CHART ===== */
  .daily-chart-compact {
    margin-bottom: 16px;
  }
  .daily-chart-compact .sessions-panel-title {
    margin-bottom: 8px;
  }
  .daily-chart-compact .daily-chart-bars {
    height: 100px;
    padding-bottom: 20px;
  }
  
  /* ===== COMPACT COST BREAKDOWN ===== */
  .cost-breakdown-compact {
    padding: 0;
    margin: 0;
    background: transparent;
    border-top: 1px solid var(--border);
    padding-top: 12px;
  }
  .cost-breakdown-compact .cost-breakdown-header {
    margin-bottom: 8px;
  }
  .cost-breakdown-compact .cost-breakdown-legend {
    gap: 12px;
  }
  .cost-breakdown-compact .cost-breakdown-note {
    display: none;
  }
  
  /* ===== SESSIONS CARD ===== */
  .sessions-card {
    /* inherits background, border, shadow from .card */
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .sessions-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  .sessions-card-title {
    font-weight: 600;
    font-size: 14px;
  }
  .sessions-card-count {
    font-size: 12px;
    color: var(--text-muted);
  }
  .sessions-card-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin: 8px 0 10px;
    font-size: 12px;
    color: var(--text-muted);
  }
  .sessions-card-stats {
    display: inline-flex;
    gap: 12px;
  }
  .sessions-sort {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--text-muted);
  }
  .sessions-sort select {
    padding: 4px 8px;
    border-radius: 6px;
    border: 1px solid var(--border);
    background: var(--bg);
    color: var(--text);
    font-size: 12px;
  }
  .sessions-action-btn {
    height: 28px;
    padding: 0 10px;
    border-radius: 8px;
    font-size: 12px;
    line-height: 1;
  }
  .sessions-action-btn.icon {
    width: 32px;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .sessions-card-hint {
    font-size: 11px;
    color: var(--text-muted);
    margin-bottom: 8px;
  }
  .sessions-card .session-bars {
    max-height: 280px;
    background: var(--bg);
    border-radius: 6px;
    border: 1px solid var(--border);
    margin: 0;
    overflow-y: auto;
    padding: 8px;
  }
  .sessions-card .session-bar-row {
    padding: 6px 8px;
    border-radius: 6px;
    margin-bottom: 3px;
    border: 1px solid transparent;
    transition: all 0.15s;
  }
  .sessions-card .session-bar-row:hover {
    border-color: var(--border);
    background: var(--bg-hover);
  }
  .sessions-card .session-bar-row.selected {
    border-color: var(--accent);
    background: var(--accent-subtle);
    box-shadow: inset 0 0 0 1px rgba(255, 77, 77, 0.15);
  }
  .sessions-card .session-bar-label {
    flex: 1 1 auto;
    min-width: 140px;
    font-size: 12px;
  }
  .sessions-card .session-bar-value {
    flex: 0 0 60px;
    font-size: 11px;
    font-weight: 600;
  }
  .sessions-card .session-bar-track {
    flex: 0 0 70px;
    height: 5px;
    opacity: 0.5;
  }
  .sessions-card .session-bar-fill {
    background: rgba(255, 77, 77, 0.55);
  }
  .sessions-clear-btn {
    margin-left: auto;
  }
  
  /* ===== EMPTY DETAIL STATE ===== */
  .session-detail-empty {
    margin-top: 18px;
    background: var(--bg-secondary);
    border-radius: 8px;
    border: 2px dashed var(--border);
    padding: 32px;
    text-align: center;
  }
  .session-detail-empty-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 8px;
  }
  .session-detail-empty-desc {
    font-size: 13px;
    color: var(--text-muted);
    margin-bottom: 16px;
    line-height: 1.5;
  }
  .session-detail-empty-features {
    display: flex;
    justify-content: center;
    gap: 24px;
    flex-wrap: wrap;
  }
  .session-detail-empty-feature {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--text-muted);
  }
  .session-detail-empty-feature .icon {
    font-size: 16px;
  }
  
  /* ===== SESSION DETAIL PANEL ===== */
  .session-detail-panel {
    margin-top: 12px;
    /* inherits background, border-radius, shadow from .card */
    border: 2px solid var(--accent) !important;
  }
  .session-detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
  }
  .session-detail-header:hover {
    background: var(--bg-hover);
  }
  .session-detail-title {
    font-weight: 600;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .session-detail-header-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .session-close-btn {
    background: var(--bg);
    border: 1px solid var(--border);
    color: var(--text);
    cursor: pointer;
    padding: 2px 8px;
    font-size: 16px;
    line-height: 1;
    border-radius: 4px;
    transition: background 0.15s, color 0.15s;
  }
  .session-close-btn:hover {
    background: var(--bg-hover);
    color: var(--text);
    border-color: var(--accent);
  }
  .session-detail-stats {
    display: flex;
    gap: 10px;
    font-size: 12px;
    color: var(--text-muted);
  }
  .session-detail-stats strong {
    color: var(--text);
    font-family: var(--font-mono);
  }
  .session-detail-content {
    padding: 12px;
  }
  .session-summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 8px;
    margin-bottom: 12px;
  }
  .session-summary-card {
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 8px;
    background: var(--bg-secondary);
  }
  .session-summary-title {
    font-size: 11px;
    color: var(--text-muted);
    margin-bottom: 4px;
  }
  .session-summary-value {
    font-size: 14px;
    font-weight: 600;
  }
  .session-summary-meta {
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 4px;
  }
  .session-detail-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    /* Separate "Usage Over Time" from the summary + Top Tools/Model Mix cards above. */
    margin-top: 12px;
    margin-bottom: 10px;
  }
  .session-detail-bottom {
    display: grid;
    grid-template-columns: minmax(0, 1.8fr) minmax(0, 1fr);
    gap: 10px;
    align-items: stretch;
  }
  .session-detail-bottom .session-logs-compact {
    margin: 0;
    display: flex;
    flex-direction: column;
  }
  .session-detail-bottom .session-logs-compact .session-logs-list {
    flex: 1 1 auto;
    max-height: none;
  }
  .context-details-panel {
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: var(--bg);
    border-radius: 6px;
    border: 1px solid var(--border);
    padding: 12px;
  }
  .context-breakdown-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 10px;
    margin-top: 8px;
  }
  .context-breakdown-card {
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 8px;
    background: var(--bg-secondary);
  }
  .context-breakdown-title {
    font-size: 11px;
    font-weight: 600;
    margin-bottom: 6px;
  }
  .context-breakdown-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 11px;
  }
  .context-breakdown-item {
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }
  .context-breakdown-more {
    font-size: 10px;
    color: var(--text-muted);
    margin-top: 4px;
  }
  .context-breakdown-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .context-expand-btn {
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    color: var(--text-muted);
    font-size: 11px;
    padding: 4px 8px;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.15s;
  }
  .context-expand-btn:hover {
    color: var(--text);
    border-color: var(--border-strong);
    background: var(--bg);
  }
  
  /* ===== COMPACT TIMESERIES ===== */
  .session-timeseries-compact {
    background: var(--bg);
    border-radius: 6px;
    border: 1px solid var(--border);
    padding: 12px;
    margin: 0;
  }
  .session-timeseries-compact .timeseries-header-row {
    margin-bottom: 8px;
  }
  .session-timeseries-compact .timeseries-header {
    font-size: 12px;
  }
  .session-timeseries-compact .timeseries-summary {
    font-size: 11px;
    margin-top: 8px;
  }
  
  /* ===== COMPACT CONTEXT ===== */
  .context-weight-compact {
    background: var(--bg);
    border-radius: 6px;
    border: 1px solid var(--border);
    padding: 12px;
    margin: 0;
  }
  .context-weight-compact .context-weight-header {
    font-size: 12px;
    margin-bottom: 4px;
  }
  .context-weight-compact .context-weight-desc {
    font-size: 11px;
    margin-bottom: 8px;
  }
  .context-weight-compact .context-stacked-bar {
    height: 16px;
  }
  .context-weight-compact .context-legend {
    font-size: 11px;
    gap: 10px;
    margin-top: 8px;
  }
  .context-weight-compact .context-total {
    font-size: 11px;
    margin-top: 6px;
  }
  .context-weight-compact .context-details {
    margin-top: 8px;
  }
  .context-weight-compact .context-details summary {
    font-size: 12px;
    padding: 6px 10px;
  }
  
  /* ===== COMPACT LOGS ===== */
  .session-logs-compact {
    background: var(--bg);
    border-radius: 10px;
    border: 1px solid var(--border);
    overflow: hidden;
    margin: 0;
    display: flex;
    flex-direction: column;
  }
  .session-logs-compact .session-logs-header {
    padding: 10px 12px;
    font-size: 12px;
  }
  .session-logs-compact .session-logs-list {
    max-height: none;
    flex: 1 1 auto;
    overflow: auto;
  }
  .session-logs-compact .session-log-entry {
    padding: 8px 12px;
  }
  .session-logs-compact .session-log-content {
    font-size: 12px;
    max-height: 160px;
  }
  .session-log-tools {
    margin-top: 6px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--bg-secondary);
    padding: 6px 8px;
    font-size: 11px;
    color: var(--text);
  }
  .session-log-tools summary {
    cursor: pointer;
    list-style: none;
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 600;
  }
  .session-log-tools summary::-webkit-details-marker {
    display: none;
  }
  .session-log-tools-list {
    margin-top: 6px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .session-log-tools-pill {
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 2px 8px;
    font-size: 10px;
    background: var(--bg);
    color: var(--text);
  }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 900px) {
    .usage-grid {
      grid-template-columns: 1fr;
    }
    .session-detail-row {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 600px) {
    .session-bar-label {
      flex: 0 0 100px;
    }
    .cost-breakdown-legend {
      gap: 10px;
    }
    .legend-item {
      font-size: 11px;
    }
    .daily-chart-bars {
      height: 170px;
      gap: 6px;
      padding-bottom: 40px;
    }
    .daily-bar-label {
      font-size: 8px;
      bottom: -30px;
      transform: rotate(-45deg);
    }
    .usage-mosaic-grid {
      grid-template-columns: 1fr;
    }
    .usage-hour-grid {
      grid-template-columns: repeat(12, minmax(10px, 1fr));
    }
    .usage-hour-cell {
      height: 22px;
    }
  }
`,xb=4;function at(e){return Math.round(e/xb)}function O(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}K`:String(e)}function $b(e){const t=new Date;return t.setHours(e,0,0,0),t.toLocaleTimeString(void 0,{hour:"numeric"})}function wb(e,t){const n=Array.from({length:24},()=>0),s=Array.from({length:24},()=>0);for(const i of e){const o=i.usage;if(!o?.messageCounts||o.messageCounts.total===0)continue;const a=o.firstActivity??i.updatedAt,l=o.lastActivity??i.updatedAt;if(!a||!l)continue;const c=Math.min(a,l),u=Math.max(a,l),h=Math.max(u-c,1)/6e4;let f=c;for(;f<u;){const d=new Date(f),p=yo(d,t),m=xo(d,t),S=Math.min(m.getTime(),u),w=Math.max((S-f)/6e4,0)/h;n[p]+=o.messageCounts.errors*w,s[p]+=o.messageCounts.total*w,f=S+1}}return s.map((i,o)=>{const a=n[o],l=i>0?a/i:0;return{hour:o,rate:l,errors:a,msgs:i}}).filter(i=>i.msgs>0&&i.errors>0).toSorted((i,o)=>o.rate-i.rate).slice(0,5).map(i=>({label:$b(i.hour),value:`${(i.rate*100).toFixed(2)}%`,sub:`${Math.round(i.errors)} errors · ${Math.round(i.msgs)} msgs`}))}const kb=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];function yo(e,t){return t==="utc"?e.getUTCHours():e.getHours()}function Sb(e,t){return t==="utc"?e.getUTCDay():e.getDay()}function xo(e,t){const n=new Date(e);return t==="utc"?n.setUTCMinutes(59,59,999):n.setMinutes(59,59,999),n}function Ab(e,t){const n=Array.from({length:24},()=>0),s=Array.from({length:7},()=>0);let i=0,o=!1;for(const l of e){const c=l.usage;if(!c||!c.totalTokens||c.totalTokens<=0)continue;i+=c.totalTokens;const u=c.firstActivity??l.updatedAt,g=c.lastActivity??l.updatedAt;if(!u||!g)continue;o=!0;const h=Math.min(u,g),f=Math.max(u,g),p=Math.max(f-h,1)/6e4;let m=h;for(;m<f;){const S=new Date(m),k=yo(S,t),w=Sb(S,t),A=xo(S,t),C=Math.min(A.getTime(),f),T=Math.max((C-m)/6e4,0)/p;n[k]+=c.totalTokens*T,s[w]+=c.totalTokens*T,m=C+1}}const a=kb.map((l,c)=>({label:l,tokens:s[c]}));return{hasData:o,totalTokens:i,hourTotals:n,weekdayTotals:a}}function Cb(e,t,n,s){const i=Ab(e,t);if(!i.hasData)return r`
      <div class="card usage-mosaic">
        <div class="usage-mosaic-header">
          <div>
            <div class="usage-mosaic-title">Activity by Time</div>
            <div class="usage-mosaic-sub">Estimates require session timestamps.</div>
          </div>
          <div class="usage-mosaic-total">${O(0)} tokens</div>
        </div>
        <div class="muted" style="padding: 12px; text-align: center;">No timeline data yet.</div>
      </div>
    `;const o=Math.max(...i.hourTotals,1),a=Math.max(...i.weekdayTotals.map(l=>l.tokens),1);return r`
    <div class="card usage-mosaic">
      <div class="usage-mosaic-header">
        <div>
          <div class="usage-mosaic-title">Activity by Time</div>
          <div class="usage-mosaic-sub">
            Estimated from session spans (first/last activity). Time zone: ${t==="utc"?"UTC":"Local"}.
          </div>
        </div>
        <div class="usage-mosaic-total">${O(i.totalTokens)} tokens</div>
      </div>
      <div class="usage-mosaic-grid">
        <div class="usage-mosaic-section">
          <div class="usage-mosaic-section-title">Day of Week</div>
          <div class="usage-daypart-grid">
            ${i.weekdayTotals.map(l=>{const c=Math.min(l.tokens/a,1),u=l.tokens>0?`rgba(255, 77, 77, ${.12+c*.6})`:"transparent";return r`
                <div class="usage-daypart-cell" style="background: ${u};">
                  <div class="usage-daypart-label">${l.label}</div>
                  <div class="usage-daypart-value">${O(l.tokens)}</div>
                </div>
              `})}
          </div>
        </div>
        <div class="usage-mosaic-section">
          <div class="usage-mosaic-section-title">
            <span>Hours</span>
            <span class="usage-mosaic-sub">0 → 23</span>
          </div>
          <div class="usage-hour-grid">
            ${i.hourTotals.map((l,c)=>{const u=Math.min(l/o,1),g=l>0?`rgba(255, 77, 77, ${.08+u*.7})`:"transparent",h=`${c}:00 · ${O(l)} tokens`,f=u>.7?"rgba(255, 77, 77, 0.6)":"rgba(255, 77, 77, 0.2)",d=n.includes(c);return r`
                <div
                  class="usage-hour-cell ${d?"selected":""}"
                  style="background: ${g}; border-color: ${f};"
                  title="${h}"
                  @click=${p=>s(c,p.shiftKey)}
                ></div>
              `})}
          </div>
          <div class="usage-hour-labels">
            <span>Midnight</span>
            <span>4am</span>
            <span>8am</span>
            <span>Noon</span>
            <span>4pm</span>
            <span>8pm</span>
          </div>
          <div class="usage-hour-legend">
            <span></span>
            Low → High token density
          </div>
        </div>
      </div>
    </div>
  `}function G(e,t=2){return`$${e.toFixed(t)}`}function Qs(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function ec(e){const t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!t)return null;const[,n,s,i]=t,o=new Date(Date.UTC(Number(n),Number(s)-1,Number(i)));return Number.isNaN(o.valueOf())?null:o}function tc(e){const t=ec(e);return t?t.toLocaleDateString(void 0,{month:"short",day:"numeric"}):e}function Tb(e){const t=ec(e);return t?t.toLocaleDateString(void 0,{month:"long",day:"numeric",year:"numeric"}):e}function Ys(e,t,n="text/plain"){const s=new Blob([t],{type:n}),i=URL.createObjectURL(s),o=document.createElement("a");o.href=i,o.download=e,o.click(),URL.revokeObjectURL(i)}function _b(e){return e.includes('"')||e.includes(",")||e.includes(`
`)?`"${e.replace(/"/g,'""')}"`:e}function Xn(e){return e.map(t=>t==null?"":_b(String(t))).join(",")}const Rn=()=>({input:0,output:0,cacheRead:0,cacheWrite:0,totalTokens:0,totalCost:0,inputCost:0,outputCost:0,cacheReadCost:0,cacheWriteCost:0,missingCostEntries:0}),Pn=(e,t)=>{e.input+=t.input??0,e.output+=t.output??0,e.cacheRead+=t.cacheRead??0,e.cacheWrite+=t.cacheWrite??0,e.totalTokens+=t.totalTokens??0,e.totalCost+=t.totalCost??0,e.inputCost+=t.inputCost??0,e.outputCost+=t.outputCost??0,e.cacheReadCost+=t.cacheReadCost??0,e.cacheWriteCost+=t.cacheWriteCost??0,e.missingCostEntries+=t.missingCostEntries??0},Lb=(e,t)=>{if(e.length===0)return t??{messages:{total:0,user:0,assistant:0,toolCalls:0,toolResults:0,errors:0},tools:{totalCalls:0,uniqueTools:0,tools:[]},byModel:[],byProvider:[],byAgent:[],byChannel:[],daily:[]};const n={total:0,user:0,assistant:0,toolCalls:0,toolResults:0,errors:0},s=new Map,i=new Map,o=new Map,a=new Map,l=new Map,c=new Map,u=new Map,g=new Map,h={count:0,sum:0,min:Number.POSITIVE_INFINITY,max:0,p95Max:0};for(const f of e){const d=f.usage;if(d){if(d.messageCounts&&(n.total+=d.messageCounts.total,n.user+=d.messageCounts.user,n.assistant+=d.messageCounts.assistant,n.toolCalls+=d.messageCounts.toolCalls,n.toolResults+=d.messageCounts.toolResults,n.errors+=d.messageCounts.errors),d.toolUsage)for(const p of d.toolUsage.tools)s.set(p.name,(s.get(p.name)??0)+p.count);if(d.modelUsage)for(const p of d.modelUsage){const m=`${p.provider??"unknown"}::${p.model??"unknown"}`,S=i.get(m)??{provider:p.provider,model:p.model,count:0,totals:Rn()};S.count+=p.count,Pn(S.totals,p.totals),i.set(m,S);const k=p.provider??"unknown",w=o.get(k)??{provider:p.provider,model:void 0,count:0,totals:Rn()};w.count+=p.count,Pn(w.totals,p.totals),o.set(k,w)}if(d.latency){const{count:p,avgMs:m,minMs:S,maxMs:k,p95Ms:w}=d.latency;p>0&&(h.count+=p,h.sum+=m*p,h.min=Math.min(h.min,S),h.max=Math.max(h.max,k),h.p95Max=Math.max(h.p95Max,w))}if(f.agentId){const p=a.get(f.agentId)??Rn();Pn(p,d),a.set(f.agentId,p)}if(f.channel){const p=l.get(f.channel)??Rn();Pn(p,d),l.set(f.channel,p)}for(const p of d.dailyBreakdown??[]){const m=c.get(p.date)??{date:p.date,tokens:0,cost:0,messages:0,toolCalls:0,errors:0};m.tokens+=p.tokens,m.cost+=p.cost,c.set(p.date,m)}for(const p of d.dailyMessageCounts??[]){const m=c.get(p.date)??{date:p.date,tokens:0,cost:0,messages:0,toolCalls:0,errors:0};m.messages+=p.total,m.toolCalls+=p.toolCalls,m.errors+=p.errors,c.set(p.date,m)}for(const p of d.dailyLatency??[]){const m=u.get(p.date)??{date:p.date,count:0,sum:0,min:Number.POSITIVE_INFINITY,max:0,p95Max:0};m.count+=p.count,m.sum+=p.avgMs*p.count,m.min=Math.min(m.min,p.minMs),m.max=Math.max(m.max,p.maxMs),m.p95Max=Math.max(m.p95Max,p.p95Ms),u.set(p.date,m)}for(const p of d.dailyModelUsage??[]){const m=`${p.date}::${p.provider??"unknown"}::${p.model??"unknown"}`,S=g.get(m)??{date:p.date,provider:p.provider,model:p.model,tokens:0,cost:0,count:0};S.tokens+=p.tokens,S.cost+=p.cost,S.count+=p.count,g.set(m,S)}}}return{messages:n,tools:{totalCalls:Array.from(s.values()).reduce((f,d)=>f+d,0),uniqueTools:s.size,tools:Array.from(s.entries()).map(([f,d])=>({name:f,count:d})).toSorted((f,d)=>d.count-f.count)},byModel:Array.from(i.values()).toSorted((f,d)=>d.totals.totalCost-f.totals.totalCost),byProvider:Array.from(o.values()).toSorted((f,d)=>d.totals.totalCost-f.totals.totalCost),byAgent:Array.from(a.entries()).map(([f,d])=>({agentId:f,totals:d})).toSorted((f,d)=>d.totals.totalCost-f.totals.totalCost),byChannel:Array.from(l.entries()).map(([f,d])=>({channel:f,totals:d})).toSorted((f,d)=>d.totals.totalCost-f.totals.totalCost),latency:h.count>0?{count:h.count,avgMs:h.sum/h.count,minMs:h.min===Number.POSITIVE_INFINITY?0:h.min,maxMs:h.max,p95Ms:h.p95Max}:void 0,dailyLatency:Array.from(u.values()).map(f=>({date:f.date,count:f.count,avgMs:f.count?f.sum/f.count:0,minMs:f.min===Number.POSITIVE_INFINITY?0:f.min,maxMs:f.max,p95Ms:f.p95Max})).toSorted((f,d)=>f.date.localeCompare(d.date)),modelDaily:Array.from(g.values()).toSorted((f,d)=>f.date.localeCompare(d.date)||d.cost-f.cost),daily:Array.from(c.values()).toSorted((f,d)=>f.date.localeCompare(d.date))}},Eb=(e,t,n)=>{let s=0,i=0;for(const g of e){const h=g.usage?.durationMs??0;h>0&&(s+=h,i+=1)}const o=i?s/i:0,a=t&&s>0?t.totalTokens/(s/6e4):void 0,l=t&&s>0?t.totalCost/(s/6e4):void 0,c=n.messages.total?n.messages.errors/n.messages.total:0,u=n.daily.filter(g=>g.messages>0&&g.errors>0).map(g=>({date:g.date,errors:g.errors,messages:g.messages,rate:g.errors/g.messages})).toSorted((g,h)=>h.rate-g.rate||h.errors-g.errors)[0];return{durationSumMs:s,durationCount:i,avgDurationMs:o,throughputTokensPerMin:a,throughputCostPerMin:l,errorRate:c,peakErrorDay:u}},Ib=e=>{const t=[Xn(["key","label","agentId","channel","provider","model","updatedAt","durationMs","messages","errors","toolCalls","inputTokens","outputTokens","cacheReadTokens","cacheWriteTokens","totalTokens","totalCost"])];for(const n of e){const s=n.usage;t.push(Xn([n.key,n.label??"",n.agentId??"",n.channel??"",n.modelProvider??n.providerOverride??"",n.model??n.modelOverride??"",n.updatedAt?new Date(n.updatedAt).toISOString():"",s?.durationMs??"",s?.messageCounts?.total??"",s?.messageCounts?.errors??"",s?.messageCounts?.toolCalls??"",s?.input??"",s?.output??"",s?.cacheRead??"",s?.cacheWrite??"",s?.totalTokens??"",s?.totalCost??""]))}return t.join(`
`)},Mb=e=>{const t=[Xn(["date","inputTokens","outputTokens","cacheReadTokens","cacheWriteTokens","totalTokens","inputCost","outputCost","cacheReadCost","cacheWriteCost","totalCost"])];for(const n of e)t.push(Xn([n.date,n.input,n.output,n.cacheRead,n.cacheWrite,n.totalTokens,n.inputCost??"",n.outputCost??"",n.cacheReadCost??"",n.cacheWriteCost??"",n.totalCost]));return t.join(`
`)},Rb=(e,t,n)=>{const s=e.trim();if(!s)return[];const i=s.length?s.split(/\s+/):[],o=i.length?i[i.length-1]:"",[a,l]=o.includes(":")?[o.slice(0,o.indexOf(":")),o.slice(o.indexOf(":")+1)]:["",""],c=a.toLowerCase(),u=l.toLowerCase(),g=w=>{const A=new Set;for(const C of w)C&&A.add(C);return Array.from(A)},h=g(t.map(w=>w.agentId)).slice(0,6),f=g(t.map(w=>w.channel)).slice(0,6),d=g([...t.map(w=>w.modelProvider),...t.map(w=>w.providerOverride),...n?.byProvider.map(w=>w.provider)??[]]).slice(0,6),p=g([...t.map(w=>w.model),...n?.byModel.map(w=>w.model)??[]]).slice(0,6),m=g(n?.tools.tools.map(w=>w.name)??[]).slice(0,6);if(!c)return[{label:"agent:",value:"agent:"},{label:"channel:",value:"channel:"},{label:"provider:",value:"provider:"},{label:"model:",value:"model:"},{label:"tool:",value:"tool:"},{label:"has:errors",value:"has:errors"},{label:"has:tools",value:"has:tools"},{label:"minTokens:",value:"minTokens:"},{label:"maxCost:",value:"maxCost:"}];const S=[],k=(w,A)=>{for(const C of A)(!u||C.toLowerCase().includes(u))&&S.push({label:`${w}:${C}`,value:`${w}:${C}`})};switch(c){case"agent":k("agent",h);break;case"channel":k("channel",f);break;case"provider":k("provider",d);break;case"model":k("model",p);break;case"tool":k("tool",m);break;case"has":["errors","tools","context","usage","model","provider"].forEach(w=>{(!u||w.includes(u))&&S.push({label:`has:${w}`,value:`has:${w}`})});break}return S},Pb=(e,t)=>{const n=e.trim();if(!n)return`${t} `;const s=n.split(/\s+/);return s[s.length-1]=t,`${s.join(" ")} `},ct=e=>e.trim().toLowerCase(),Db=(e,t)=>{const n=e.trim();if(!n)return`${t} `;const s=n.split(/\s+/),i=s[s.length-1]??"",o=t.includes(":")?t.split(":")[0]:null,a=i.includes(":")?i.split(":")[0]:null;return i.endsWith(":")&&o&&a===o?(s[s.length-1]=t,`${s.join(" ")} `):s.includes(t)?`${s.join(" ")} `:`${s.join(" ")} ${t} `},ur=(e,t)=>{const s=e.trim().split(/\s+/).filter(Boolean).filter(i=>i!==t);return s.length?`${s.join(" ")} `:""},gr=(e,t,n)=>{const s=ct(t),o=[...bo(e).filter(a=>ct(a.key??"")!==s).map(a=>a.raw),...n.map(a=>`${t}:${a}`)];return o.length?`${o.join(" ")} `:""};function ge(e,t){return t===0?0:e/t*100}function Nb(e){const t=e.totalCost||0;return{input:{tokens:e.input,cost:e.inputCost||0,pct:ge(e.inputCost||0,t)},output:{tokens:e.output,cost:e.outputCost||0,pct:ge(e.outputCost||0,t)},cacheRead:{tokens:e.cacheRead,cost:e.cacheReadCost||0,pct:ge(e.cacheReadCost||0,t)},cacheWrite:{tokens:e.cacheWrite,cost:e.cacheWriteCost||0,pct:ge(e.cacheWriteCost||0,t)},totalCost:t}}function Fb(e,t,n,s,i,o,a,l){if(!(e.length>0||t.length>0||n.length>0))return v;const u=n.length===1?s.find(p=>p.key===n[0]):null,g=u?(u.label||u.key).slice(0,20)+((u.label||u.key).length>20?"…":""):n.length===1?n[0].slice(0,8)+"…":`${n.length} sessions`,h=u?u.label||u.key:n.length===1?n[0]:n.join(", "),f=e.length===1?e[0]:`${e.length} days`,d=t.length===1?`${t[0]}:00`:`${t.length} hours`;return r`
    <div class="active-filters">
      ${e.length>0?r`
            <div class="filter-chip">
              <span class="filter-chip-label">Days: ${f}</span>
              <button class="filter-chip-remove" @click=${i} title="Remove filter">×</button>
            </div>
          `:v}
      ${t.length>0?r`
            <div class="filter-chip">
              <span class="filter-chip-label">Hours: ${d}</span>
              <button class="filter-chip-remove" @click=${o} title="Remove filter">×</button>
            </div>
          `:v}
      ${n.length>0?r`
            <div class="filter-chip" title="${h}">
              <span class="filter-chip-label">Session: ${g}</span>
              <button class="filter-chip-remove" @click=${a} title="Remove filter">×</button>
            </div>
          `:v}
      ${(e.length>0||t.length>0)&&n.length>0?r`
            <button class="btn btn-sm filter-clear-btn" @click=${l}>
              Clear All
            </button>
          `:v}
    </div>
  `}function Ob(e,t,n,s,i,o){if(!e.length)return r`
      <div class="daily-chart-compact">
        <div class="sessions-panel-title">Daily Usage</div>
        <div class="muted" style="padding: 20px; text-align: center">No data</div>
      </div>
    `;const a=n==="tokens",l=e.map(h=>a?h.totalTokens:h.totalCost),c=Math.max(...l,a?1:1e-4),u=e.length>30?12:e.length>20?18:e.length>14?24:32,g=e.length<=14;return r`
    <div class="daily-chart-compact">
      <div class="daily-chart-header">
        <div class="chart-toggle small sessions-toggle">
          <button
            class="toggle-btn ${s==="total"?"active":""}"
            @click=${()=>i("total")}
          >
            Total
          </button>
          <button
            class="toggle-btn ${s==="by-type"?"active":""}"
            @click=${()=>i("by-type")}
          >
            By Type
          </button>
        </div>
        <div class="card-title">Daily ${a?"Token":"Cost"} Usage</div>
      </div>
      <div class="daily-chart">
        <div class="daily-chart-bars" style="--bar-max-width: ${u}px">
          ${e.map((h,f)=>{const p=l[f]/c*100,m=t.includes(h.date),S=tc(h.date),k=e.length>20?String(parseInt(h.date.slice(8),10)):S,w=e.length>20?"font-size: 8px":"",A=s==="by-type"?a?[{value:h.output,class:"output"},{value:h.input,class:"input"},{value:h.cacheWrite,class:"cache-write"},{value:h.cacheRead,class:"cache-read"}]:[{value:h.outputCost??0,class:"output"},{value:h.inputCost??0,class:"input"},{value:h.cacheWriteCost??0,class:"cache-write"},{value:h.cacheReadCost??0,class:"cache-read"}]:[],C=s==="by-type"?a?[`Output ${O(h.output)}`,`Input ${O(h.input)}`,`Cache write ${O(h.cacheWrite)}`,`Cache read ${O(h.cacheRead)}`]:[`Output ${G(h.outputCost??0)}`,`Input ${G(h.inputCost??0)}`,`Cache write ${G(h.cacheWriteCost??0)}`,`Cache read ${G(h.cacheReadCost??0)}`]:[],_=a?O(h.totalTokens):G(h.totalCost);return r`
              <div
                class="daily-bar-wrapper ${m?"selected":""}"
                @click=${T=>o(h.date,T.shiftKey)}
              >
                ${s==="by-type"?r`
                        <div
                          class="daily-bar"
                          style="height: ${p.toFixed(1)}%; display: flex; flex-direction: column;"
                        >
                          ${(()=>{const T=A.reduce((M,U)=>M+U.value,0)||1;return A.map(M=>r`
                                <div
                                  class="cost-segment ${M.class}"
                                  style="height: ${M.value/T*100}%"
                                ></div>
                              `)})()}
                        </div>
                      `:r`
                        <div class="daily-bar" style="height: ${p.toFixed(1)}%"></div>
                      `}
                ${g?r`<div class="daily-bar-total">${_}</div>`:v}
                <div class="daily-bar-label" style="${w}">${k}</div>
                <div class="daily-bar-tooltip">
                  <strong>${Tb(h.date)}</strong><br />
                  ${O(h.totalTokens)} tokens<br />
                  ${G(h.totalCost)}
                  ${C.length?r`${C.map(T=>r`<div>${T}</div>`)}`:v}
                </div>
              </div>
            `})}
        </div>
      </div>
    </div>
  `}function Bb(e,t){const n=Nb(e),s=t==="tokens",i=e.totalTokens||1,o={output:ge(e.output,i),input:ge(e.input,i),cacheWrite:ge(e.cacheWrite,i),cacheRead:ge(e.cacheRead,i)};return r`
    <div class="cost-breakdown cost-breakdown-compact">
      <div class="cost-breakdown-header">${s?"Tokens":"Cost"} by Type</div>
      <div class="cost-breakdown-bar">
        <div class="cost-segment output" style="width: ${(s?o.output:n.output.pct).toFixed(1)}%"
          title="Output: ${s?O(e.output):G(n.output.cost)}"></div>
        <div class="cost-segment input" style="width: ${(s?o.input:n.input.pct).toFixed(1)}%"
          title="Input: ${s?O(e.input):G(n.input.cost)}"></div>
        <div class="cost-segment cache-write" style="width: ${(s?o.cacheWrite:n.cacheWrite.pct).toFixed(1)}%"
          title="Cache Write: ${s?O(e.cacheWrite):G(n.cacheWrite.cost)}"></div>
        <div class="cost-segment cache-read" style="width: ${(s?o.cacheRead:n.cacheRead.pct).toFixed(1)}%"
          title="Cache Read: ${s?O(e.cacheRead):G(n.cacheRead.cost)}"></div>
      </div>
      <div class="cost-breakdown-legend">
        <span class="legend-item"><span class="legend-dot output"></span>Output ${s?O(e.output):G(n.output.cost)}</span>
        <span class="legend-item"><span class="legend-dot input"></span>Input ${s?O(e.input):G(n.input.cost)}</span>
        <span class="legend-item"><span class="legend-dot cache-write"></span>Cache Write ${s?O(e.cacheWrite):G(n.cacheWrite.cost)}</span>
        <span class="legend-item"><span class="legend-dot cache-read"></span>Cache Read ${s?O(e.cacheRead):G(n.cacheRead.cost)}</span>
      </div>
      <div class="cost-breakdown-total">
        Total: ${s?O(e.totalTokens):G(e.totalCost)}
      </div>
    </div>
  `}function dt(e,t,n){return r`
    <div class="usage-insight-card">
      <div class="usage-insight-title">${e}</div>
      ${t.length===0?r`<div class="muted">${n}</div>`:r`
              <div class="usage-list">
                ${t.map(s=>r`
                    <div class="usage-list-item">
                      <span>${s.label}</span>
                      <span class="usage-list-value">
                        <span>${s.value}</span>
                        ${s.sub?r`<span class="usage-list-sub">${s.sub}</span>`:v}
                      </span>
                    </div>
                  `)}
              </div>
            `}
    </div>
  `}function pr(e,t,n){return r`
    <div class="usage-insight-card">
      <div class="usage-insight-title">${e}</div>
      ${t.length===0?r`<div class="muted">${n}</div>`:r`
              <div class="usage-error-list">
                ${t.map(s=>r`
                    <div class="usage-error-row">
                      <div class="usage-error-date">${s.label}</div>
                      <div class="usage-error-rate">${s.value}</div>
                      ${s.sub?r`<div class="usage-error-sub">${s.sub}</div>`:v}
                    </div>
                  `)}
              </div>
            `}
    </div>
  `}function zb(e,t,n,s,i,o,a){if(!e)return v;const l=t.messages.total?Math.round(e.totalTokens/t.messages.total):0,c=t.messages.total?e.totalCost/t.messages.total:0,u=e.input+e.cacheRead,g=u>0?e.cacheRead/u:0,h=u>0?`${(g*100).toFixed(1)}%`:"—",f=n.errorRate*100,d=n.throughputTokensPerMin!==void 0?`${O(Math.round(n.throughputTokensPerMin))} tok/min`:"—",p=n.throughputCostPerMin!==void 0?`${G(n.throughputCostPerMin,4)} / min`:"—",m=n.durationCount>0?Ui(n.avgDurationMs,{spaced:!0})??"—":"—",S="Cache hit rate = cache read / (input + cache read). Higher is better.",k="Error rate = errors / total messages. Lower is better.",w="Throughput shows tokens per minute over active time. Higher is better.",A="Average tokens per message in this range.",C=s?"Average cost per message when providers report costs. Cost data is missing for some or all sessions in this range.":"Average cost per message when providers report costs.",_=t.daily.filter(N=>N.messages>0&&N.errors>0).map(N=>{const H=N.errors/N.messages;return{label:tc(N.date),value:`${(H*100).toFixed(2)}%`,sub:`${N.errors} errors · ${N.messages} msgs · ${O(N.tokens)}`,rate:H}}).toSorted((N,H)=>H.rate-N.rate).slice(0,5).map(({rate:N,...H})=>H),T=t.byModel.slice(0,5).map(N=>({label:N.model??"unknown",value:G(N.totals.totalCost),sub:`${O(N.totals.totalTokens)} · ${N.count} msgs`})),M=t.byProvider.slice(0,5).map(N=>({label:N.provider??"unknown",value:G(N.totals.totalCost),sub:`${O(N.totals.totalTokens)} · ${N.count} msgs`})),U=t.tools.tools.slice(0,6).map(N=>({label:N.name,value:`${N.count}`,sub:"calls"})),Z=t.byAgent.slice(0,5).map(N=>({label:N.agentId,value:G(N.totals.totalCost),sub:O(N.totals.totalTokens)})),ie=t.byChannel.slice(0,5).map(N=>({label:N.channel,value:G(N.totals.totalCost),sub:O(N.totals.totalTokens)}));return r`
    <section class="card" style="margin-top: 16px;">
      <div class="card-title">Usage Overview</div>
      <div class="usage-summary-grid">
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            Messages
            <span class="usage-summary-hint" title="Total user + assistant messages in range.">?</span>
          </div>
          <div class="usage-summary-value">${t.messages.total}</div>
          <div class="usage-summary-sub">
            ${t.messages.user} user · ${t.messages.assistant} assistant
          </div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            Tool Calls
            <span class="usage-summary-hint" title="Total tool call count across sessions.">?</span>
          </div>
          <div class="usage-summary-value">${t.tools.totalCalls}</div>
          <div class="usage-summary-sub">${t.tools.uniqueTools} tools used</div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            Errors
            <span class="usage-summary-hint" title="Total message/tool errors in range.">?</span>
          </div>
          <div class="usage-summary-value">${t.messages.errors}</div>
          <div class="usage-summary-sub">${t.messages.toolResults} tool results</div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            Avg Tokens / Msg
            <span class="usage-summary-hint" title=${A}>?</span>
          </div>
          <div class="usage-summary-value">${O(l)}</div>
          <div class="usage-summary-sub">Across ${t.messages.total||0} messages</div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            Avg Cost / Msg
            <span class="usage-summary-hint" title=${C}>?</span>
          </div>
          <div class="usage-summary-value">${G(c,4)}</div>
          <div class="usage-summary-sub">${G(e.totalCost)} total</div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            Sessions
            <span class="usage-summary-hint" title="Distinct sessions in the range.">?</span>
          </div>
          <div class="usage-summary-value">${o}</div>
          <div class="usage-summary-sub">of ${a} in range</div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            Throughput
            <span class="usage-summary-hint" title=${w}>?</span>
          </div>
          <div class="usage-summary-value">${d}</div>
          <div class="usage-summary-sub">${p}</div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            Error Rate
            <span class="usage-summary-hint" title=${k}>?</span>
          </div>
          <div class="usage-summary-value ${f>5?"bad":f>1?"warn":"good"}">${f.toFixed(2)}%</div>
          <div class="usage-summary-sub">
            ${t.messages.errors} errors · ${m} avg session
          </div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            Cache Hit Rate
            <span class="usage-summary-hint" title=${S}>?</span>
          </div>
          <div class="usage-summary-value ${g>.6?"good":g>.3?"warn":"bad"}">${h}</div>
          <div class="usage-summary-sub">
            ${O(e.cacheRead)} cached · ${O(u)} prompt
          </div>
        </div>
      </div>
      <div class="usage-insights-grid">
        ${dt("Top Models",T,"No model data")}
        ${dt("Top Providers",M,"No provider data")}
        ${dt("Top Tools",U,"No tool calls")}
        ${dt("Top Agents",Z,"No agent data")}
        ${dt("Top Channels",ie,"No channel data")}
        ${pr("Peak Error Days",_,"No error data")}
        ${pr("Peak Error Hours",i,"No error data")}
      </div>
    </section>
  `}function Ub(e,t,n,s,i,o,a,l,c,u,g,h,f,d,p){const m=L=>f.includes(L),S=L=>{const B=L.label||L.key;return B.startsWith("agent:")&&B.includes("?token=")?B.slice(0,B.indexOf("?token=")):B},k=async L=>{const B=S(L);try{await navigator.clipboard.writeText(B)}catch{}},w=L=>{const B=[];return m("channel")&&L.channel&&B.push(`channel:${L.channel}`),m("agent")&&L.agentId&&B.push(`agent:${L.agentId}`),m("provider")&&(L.modelProvider||L.providerOverride)&&B.push(`provider:${L.modelProvider??L.providerOverride}`),m("model")&&L.model&&B.push(`model:${L.model}`),m("messages")&&L.usage?.messageCounts&&B.push(`msgs:${L.usage.messageCounts.total}`),m("tools")&&L.usage?.toolUsage&&B.push(`tools:${L.usage.toolUsage.totalCalls}`),m("errors")&&L.usage?.messageCounts&&B.push(`errors:${L.usage.messageCounts.errors}`),m("duration")&&L.usage?.durationMs&&B.push(`dur:${Ui(L.usage.durationMs,{spaced:!0})??"—"}`),B},A=L=>{const B=L.usage;if(!B)return 0;if(n.length>0&&B.dailyBreakdown&&B.dailyBreakdown.length>0){const oe=B.dailyBreakdown.filter(ae=>n.includes(ae.date));return s?oe.reduce((ae,X)=>ae+X.tokens,0):oe.reduce((ae,X)=>ae+X.cost,0)}return s?B.totalTokens??0:B.totalCost??0},C=[...e].toSorted((L,B)=>{switch(i){case"recent":return(B.updatedAt??0)-(L.updatedAt??0);case"messages":return(B.usage?.messageCounts?.total??0)-(L.usage?.messageCounts?.total??0);case"errors":return(B.usage?.messageCounts?.errors??0)-(L.usage?.messageCounts?.errors??0);case"cost":return A(B)-A(L);default:return A(B)-A(L)}}),_=o==="asc"?C.toReversed():C,T=_.reduce((L,B)=>L+A(B),0),M=_.length?T/_.length:0,U=_.reduce((L,B)=>L+(B.usage?.messageCounts?.errors??0),0),Z=new Set(t),ie=_.filter(L=>Z.has(L.key)),N=ie.length,H=new Map(_.map(L=>[L.key,L])),ce=a.map(L=>H.get(L)).filter(L=>!!L);return r`
    <div class="card sessions-card">
      <div class="sessions-card-header">
        <div class="card-title">Sessions</div>
        <div class="sessions-card-count">
          ${e.length} shown${d!==e.length?` · ${d} total`:""}
        </div>
      </div>
      <div class="sessions-card-meta">
        <div class="sessions-card-stats">
          <span>${s?O(M):G(M)} avg</span>
          <span>${U} errors</span>
        </div>
        <div class="chart-toggle small">
          <button
            class="toggle-btn ${l==="all"?"active":""}"
            @click=${()=>h("all")}
          >
            All
          </button>
          <button
            class="toggle-btn ${l==="recent"?"active":""}"
            @click=${()=>h("recent")}
          >
            Recently viewed
          </button>
        </div>
        <label class="sessions-sort">
          <span>Sort</span>
          <select
            @change=${L=>u(L.target.value)}
          >
            <option value="cost" ?selected=${i==="cost"}>Cost</option>
            <option value="errors" ?selected=${i==="errors"}>Errors</option>
            <option value="messages" ?selected=${i==="messages"}>Messages</option>
            <option value="recent" ?selected=${i==="recent"}>Recent</option>
            <option value="tokens" ?selected=${i==="tokens"}>Tokens</option>
          </select>
        </label>
        <button
          class="btn btn-sm sessions-action-btn icon"
          @click=${()=>g(o==="desc"?"asc":"desc")}
          title=${o==="desc"?"Descending":"Ascending"}
        >
          ${o==="desc"?"↓":"↑"}
        </button>
        ${N>0?r`
                <button class="btn btn-sm sessions-action-btn sessions-clear-btn" @click=${p}>
                  Clear Selection
                </button>
              `:v}
      </div>
      ${l==="recent"?ce.length===0?r`
                <div class="muted" style="padding: 20px; text-align: center">No recent sessions</div>
              `:r`
                <div class="session-bars" style="max-height: 220px; margin-top: 6px;">
                  ${ce.map(L=>{const B=A(L),oe=Z.has(L.key),ae=S(L),X=w(L);return r`
                      <div
                        class="session-bar-row ${oe?"selected":""}"
                        @click=${ne=>c(L.key,ne.shiftKey)}
                        title="${L.key}"
                      >
                        <div class="session-bar-label">
                          <div class="session-bar-title">${ae}</div>
                          ${X.length>0?r`<div class="session-bar-meta">${X.join(" · ")}</div>`:v}
                        </div>
                        <div class="session-bar-track" style="display: none;"></div>
                        <div class="session-bar-actions">
                          <button
                            class="session-copy-btn"
                            title="Copy session name"
                            @click=${ne=>{ne.stopPropagation(),k(L)}}
                          >
                            Copy
                          </button>
                          <div class="session-bar-value">${s?O(B):G(B)}</div>
                        </div>
                      </div>
                    `})}
                </div>
              `:e.length===0?r`
                <div class="muted" style="padding: 20px; text-align: center">No sessions in range</div>
              `:r`
                <div class="session-bars">
                  ${_.slice(0,50).map(L=>{const B=A(L),oe=t.includes(L.key),ae=S(L),X=w(L);return r`
                      <div
                        class="session-bar-row ${oe?"selected":""}"
                        @click=${ne=>c(L.key,ne.shiftKey)}
                        title="${L.key}"
                      >
                        <div class="session-bar-label">
                          <div class="session-bar-title">${ae}</div>
                          ${X.length>0?r`<div class="session-bar-meta">${X.join(" · ")}</div>`:v}
                        </div>
                        <div class="session-bar-track" style="display: none;"></div>
                        <div class="session-bar-actions">
                          <button
                            class="session-copy-btn"
                            title="Copy session name"
                            @click=${ne=>{ne.stopPropagation(),k(L)}}
                          >
                            Copy
                          </button>
                          <div class="session-bar-value">${s?O(B):G(B)}</div>
                        </div>
                      </div>
                    `})}
                  ${e.length>50?r`<div class="muted" style="padding: 8px; text-align: center; font-size: 11px;">+${e.length-50} more</div>`:v}
                </div>
              `}
      ${N>1?r`
              <div style="margin-top: 10px;">
                <div class="sessions-card-count">Selected (${N})</div>
                <div class="session-bars" style="max-height: 160px; margin-top: 6px;">
                  ${ie.map(L=>{const B=A(L),oe=S(L),ae=w(L);return r`
                      <div
                        class="session-bar-row selected"
                        @click=${X=>c(L.key,X.shiftKey)}
                        title="${L.key}"
                      >
                        <div class="session-bar-label">
                          <div class="session-bar-title">${oe}</div>
                          ${ae.length>0?r`<div class="session-bar-meta">${ae.join(" · ")}</div>`:v}
                        </div>
                  <div class="session-bar-track" style="display: none;"></div>
                        <div class="session-bar-actions">
                          <button
                            class="session-copy-btn"
                            title="Copy session name"
                            @click=${X=>{X.stopPropagation(),k(L)}}
                          >
                            Copy
                          </button>
                          <div class="session-bar-value">${s?O(B):G(B)}</div>
                        </div>
                      </div>
                    `})}
                </div>
              </div>
            `:v}
    </div>
  `}function Hb(){return v}function Kb(e){const t=e.usage;if(!t)return r`
      <div class="muted">No usage data for this session.</div>
    `;const n=a=>a?new Date(a).toLocaleString():"—",s=[];e.channel&&s.push(`channel:${e.channel}`),e.agentId&&s.push(`agent:${e.agentId}`),(e.modelProvider||e.providerOverride)&&s.push(`provider:${e.modelProvider??e.providerOverride}`),e.model&&s.push(`model:${e.model}`);const i=t.toolUsage?.tools.slice(0,6).map(a=>({label:a.name,value:`${a.count}`,sub:"calls"}))??[],o=t.modelUsage?.slice(0,6).map(a=>({label:a.model??"unknown",value:G(a.totals.totalCost),sub:O(a.totals.totalTokens)}))??[];return r`
    ${s.length>0?r`<div class="usage-badges">${s.map(a=>r`<span class="usage-badge">${a}</span>`)}</div>`:v}
    <div class="session-summary-grid">
      <div class="session-summary-card">
        <div class="session-summary-title">Messages</div>
        <div class="session-summary-value">${t.messageCounts?.total??0}</div>
        <div class="session-summary-meta">${t.messageCounts?.user??0} user · ${t.messageCounts?.assistant??0} assistant</div>
      </div>
      <div class="session-summary-card">
        <div class="session-summary-title">Tool Calls</div>
        <div class="session-summary-value">${t.toolUsage?.totalCalls??0}</div>
        <div class="session-summary-meta">${t.toolUsage?.uniqueTools??0} tools</div>
      </div>
      <div class="session-summary-card">
        <div class="session-summary-title">Errors</div>
        <div class="session-summary-value">${t.messageCounts?.errors??0}</div>
        <div class="session-summary-meta">${t.messageCounts?.toolResults??0} tool results</div>
      </div>
      <div class="session-summary-card">
        <div class="session-summary-title">Duration</div>
        <div class="session-summary-value">${Ui(t.durationMs,{spaced:!0})??"—"}</div>
        <div class="session-summary-meta">${n(t.firstActivity)} → ${n(t.lastActivity)}</div>
      </div>
    </div>
    <div class="usage-insights-grid" style="margin-top: 12px;">
      ${dt("Top Tools",i,"No tool calls")}
      ${dt("Model Mix",o,"No model data")}
    </div>
  `}function jb(e,t,n,s,i,o,a,l,c,u,g,h,f,d,p,m,S,k,w,A,C,_,T){const M=e.label||e.key,U=M.length>50?M.slice(0,50)+"…":M,Z=e.usage;return r`
    <div class="card session-detail-panel">
      <div class="session-detail-header">
        <div class="session-detail-header-left">
          <div class="session-detail-title">${U}</div>
        </div>
        <div class="session-detail-stats">
          ${Z?r`
            <span><strong>${O(Z.totalTokens)}</strong> tokens</span>
            <span><strong>${G(Z.totalCost)}</strong></span>
          `:v}
        </div>
        <button class="session-close-btn" @click=${T} title="Close session details">×</button>
      </div>
      <div class="session-detail-content">
        ${Kb(e)}
        <div class="session-detail-row">
          ${Wb(t,n,s,i,o,a,l,c,u)}
        </div>
        <div class="session-detail-bottom">
          ${qb(g,h,f,d,p,m,S,k,w,A)}
          ${Gb(e.contextWeight,Z,C,_)}
        </div>
      </div>
    </div>
  `}function Wb(e,t,n,s,i,o,a,l,c){if(t)return r`
      <div class="session-timeseries-compact">
        <div class="muted" style="padding: 20px; text-align: center">Loading...</div>
      </div>
    `;if(!e||e.points.length<2)return r`
      <div class="session-timeseries-compact">
        <div class="muted" style="padding: 20px; text-align: center">No timeline data</div>
      </div>
    `;let u=e.points;if(a||l||c&&c.length>0){const H=a?new Date(a+"T00:00:00").getTime():0,ce=l?new Date(l+"T23:59:59").getTime():1/0;u=e.points.filter(L=>{if(L.timestamp<H||L.timestamp>ce)return!1;if(c&&c.length>0){const B=new Date(L.timestamp),oe=`${B.getFullYear()}-${String(B.getMonth()+1).padStart(2,"0")}-${String(B.getDate()).padStart(2,"0")}`;return c.includes(oe)}return!0})}if(u.length<2)return r`
      <div class="session-timeseries-compact">
        <div class="muted" style="padding: 20px; text-align: center">No data in range</div>
      </div>
    `;let g=0,h=0,f=0,d=0,p=0,m=0;u=u.map(H=>(g+=H.totalTokens,h+=H.cost,f+=H.output,d+=H.input,p+=H.cacheRead,m+=H.cacheWrite,{...H,cumulativeTokens:g,cumulativeCost:h}));const S=400,k=80,w={top:16,right:10,bottom:20,left:40},A=S-w.left-w.right,C=k-w.top-w.bottom,_=n==="cumulative",T=n==="per-turn"&&i==="by-type",M=f+d+p+m,U=u.map(H=>_?H.cumulativeTokens:T?H.input+H.output+H.cacheRead+H.cacheWrite:H.totalTokens),Z=Math.max(...U,1),ie=Math.max(2,Math.min(8,A/u.length*.7)),N=Math.max(1,(A-ie*u.length)/(u.length-1||1));return r`
    <div class="session-timeseries-compact">
      <div class="timeseries-header-row">
        <div class="card-title" style="font-size: 13px;">Usage Over Time</div>
        <div class="timeseries-controls">
          <div class="chart-toggle small">
            <button
              class="toggle-btn ${_?"":"active"}"
              @click=${()=>s("per-turn")}
            >
              Per Turn
            </button>
            <button
              class="toggle-btn ${_?"active":""}"
              @click=${()=>s("cumulative")}
            >
              Cumulative
            </button>
          </div>
          ${_?v:r`
                  <div class="chart-toggle small">
                    <button
                      class="toggle-btn ${i==="total"?"active":""}"
                      @click=${()=>o("total")}
                    >
                      Total
                    </button>
                    <button
                      class="toggle-btn ${i==="by-type"?"active":""}"
                      @click=${()=>o("by-type")}
                    >
                      By Type
                    </button>
                  </div>
                `}
        </div>
      </div>
      <svg viewBox="0 0 ${S} ${k+15}" class="timeseries-svg" style="width: 100%; height: auto;">
        <!-- Y axis -->
        <line x1="${w.left}" y1="${w.top}" x2="${w.left}" y2="${w.top+C}" stroke="var(--border)" />
        <!-- X axis -->
        <line x1="${w.left}" y1="${w.top+C}" x2="${S-w.right}" y2="${w.top+C}" stroke="var(--border)" />
        <!-- Y axis labels -->
        <text x="${w.left-4}" y="${w.top+4}" text-anchor="end" class="axis-label" style="font-size: 9px; fill: var(--text-muted)">${O(Z)}</text>
        <text x="${w.left-4}" y="${w.top+C}" text-anchor="end" class="axis-label" style="font-size: 9px; fill: var(--text-muted)">0</text>
        <!-- X axis labels (first and last) -->
        ${u.length>0?wn`
          <text x="${w.left}" y="${w.top+C+12}" text-anchor="start" style="font-size: 8px; fill: var(--text-muted)">${new Date(u[0].timestamp).toLocaleDateString(void 0,{month:"short",day:"numeric"})}</text>
          <text x="${S-w.right}" y="${w.top+C+12}" text-anchor="end" style="font-size: 8px; fill: var(--text-muted)">${new Date(u[u.length-1].timestamp).toLocaleDateString(void 0,{month:"short",day:"numeric"})}</text>
        `:v}
        <!-- Bars -->
        ${u.map((H,ce)=>{const L=U[ce],B=w.left+ce*(ie+N),oe=L/Z*C,ae=w.top+C-oe,ne=[new Date(H.timestamp).toLocaleDateString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),`${O(L)} tokens`];T&&(ne.push(`Output ${O(H.output)}`),ne.push(`Input ${O(H.input)}`),ne.push(`Cache write ${O(H.cacheWrite)}`),ne.push(`Cache read ${O(H.cacheRead)}`));const I=ne.join(" · ");if(!T)return wn`<rect x="${B}" y="${ae}" width="${ie}" height="${oe}" class="ts-bar" rx="1" style="cursor: pointer;"><title>${I}</title></rect>`;const R=[{value:H.output,class:"output"},{value:H.input,class:"input"},{value:H.cacheWrite,class:"cache-write"},{value:H.cacheRead,class:"cache-read"}];let P=w.top+C;return wn`
            ${R.map(K=>{if(K.value<=0||L<=0)return v;const xe=oe*(K.value/L);return P-=xe,wn`<rect x="${B}" y="${P}" width="${ie}" height="${xe}" class="ts-bar ${K.class}" rx="1"><title>${I}</title></rect>`})}
          `})}
      </svg>
      <div class="timeseries-summary">${u.length} msgs · ${O(g)} · ${G(h)}</div>
      ${T?r`
              <div style="margin-top: 8px;">
                <div class="card-title" style="font-size: 12px; margin-bottom: 6px;">Tokens by Type</div>
                <div class="cost-breakdown-bar" style="height: 18px;">
                  <div class="cost-segment output" style="width: ${ge(f,M).toFixed(1)}%"></div>
                  <div class="cost-segment input" style="width: ${ge(d,M).toFixed(1)}%"></div>
                  <div class="cost-segment cache-write" style="width: ${ge(m,M).toFixed(1)}%"></div>
                  <div class="cost-segment cache-read" style="width: ${ge(p,M).toFixed(1)}%"></div>
                </div>
                <div class="cost-breakdown-legend">
                  <div class="legend-item" title="Assistant output tokens">
                    <span class="legend-dot output"></span>Output ${O(f)}
                  </div>
                  <div class="legend-item" title="User + tool input tokens">
                    <span class="legend-dot input"></span>Input ${O(d)}
                  </div>
                  <div class="legend-item" title="Tokens written to cache">
                    <span class="legend-dot cache-write"></span>Cache Write ${O(m)}
                  </div>
                  <div class="legend-item" title="Tokens read from cache">
                    <span class="legend-dot cache-read"></span>Cache Read ${O(p)}
                  </div>
                </div>
                <div class="cost-breakdown-total">Total: ${O(M)}</div>
              </div>
            `:v}
    </div>
  `}function Gb(e,t,n,s){if(!e)return r`
      <div class="context-details-panel">
        <div class="muted" style="padding: 20px; text-align: center">No context data</div>
      </div>
    `;const i=at(e.systemPrompt.chars),o=at(e.skills.promptChars),a=at(e.tools.listChars+e.tools.schemaChars),l=at(e.injectedWorkspaceFiles.reduce((A,C)=>A+C.injectedChars,0)),c=i+o+a+l;let u="";if(t&&t.totalTokens>0){const A=t.input+t.cacheRead;A>0&&(u=`~${Math.min(c/A*100,100).toFixed(0)}% of input`)}const g=e.skills.entries.toSorted((A,C)=>C.blockChars-A.blockChars),h=e.tools.entries.toSorted((A,C)=>C.summaryChars+C.schemaChars-(A.summaryChars+A.schemaChars)),f=e.injectedWorkspaceFiles.toSorted((A,C)=>C.injectedChars-A.injectedChars),d=4,p=n,m=p?g:g.slice(0,d),S=p?h:h.slice(0,d),k=p?f:f.slice(0,d),w=g.length>d||h.length>d||f.length>d;return r`
    <div class="context-details-panel">
      <div class="context-breakdown-header">
        <div class="card-title" style="font-size: 13px;">System Prompt Breakdown</div>
        ${w?r`<button class="context-expand-btn" @click=${s}>
                ${p?"Collapse":"Expand all"}
              </button>`:v}
      </div>
      <p class="context-weight-desc">${u||"Base context per message"}</p>
      <div class="context-stacked-bar">
        <div class="context-segment system" style="width: ${ge(i,c).toFixed(1)}%" title="System: ~${O(i)}"></div>
        <div class="context-segment skills" style="width: ${ge(o,c).toFixed(1)}%" title="Skills: ~${O(o)}"></div>
        <div class="context-segment tools" style="width: ${ge(a,c).toFixed(1)}%" title="Tools: ~${O(a)}"></div>
        <div class="context-segment files" style="width: ${ge(l,c).toFixed(1)}%" title="Files: ~${O(l)}"></div>
      </div>
      <div class="context-legend">
        <span class="legend-item"><span class="legend-dot system"></span>Sys ~${O(i)}</span>
        <span class="legend-item"><span class="legend-dot skills"></span>Skills ~${O(o)}</span>
        <span class="legend-item"><span class="legend-dot tools"></span>Tools ~${O(a)}</span>
        <span class="legend-item"><span class="legend-dot files"></span>Files ~${O(l)}</span>
      </div>
      <div class="context-total">Total: ~${O(c)}</div>
      <div class="context-breakdown-grid">
        ${g.length>0?(()=>{const A=g.length-m.length;return r`
                  <div class="context-breakdown-card">
                    <div class="context-breakdown-title">Skills (${g.length})</div>
                    <div class="context-breakdown-list">
                      ${m.map(C=>r`
                          <div class="context-breakdown-item">
                            <span class="mono">${C.name}</span>
                            <span class="muted">~${O(at(C.blockChars))}</span>
                          </div>
                        `)}
                    </div>
                    ${A>0?r`<div class="context-breakdown-more">+${A} more</div>`:v}
                  </div>
                `})():v}
        ${h.length>0?(()=>{const A=h.length-S.length;return r`
                  <div class="context-breakdown-card">
                    <div class="context-breakdown-title">Tools (${h.length})</div>
                    <div class="context-breakdown-list">
                      ${S.map(C=>r`
                          <div class="context-breakdown-item">
                            <span class="mono">${C.name}</span>
                            <span class="muted">~${O(at(C.summaryChars+C.schemaChars))}</span>
                          </div>
                        `)}
                    </div>
                    ${A>0?r`<div class="context-breakdown-more">+${A} more</div>`:v}
                  </div>
                `})():v}
        ${f.length>0?(()=>{const A=f.length-k.length;return r`
                  <div class="context-breakdown-card">
                    <div class="context-breakdown-title">Files (${f.length})</div>
                    <div class="context-breakdown-list">
                      ${k.map(C=>r`
                          <div class="context-breakdown-item">
                            <span class="mono">${C.name}</span>
                            <span class="muted">~${O(at(C.injectedChars))}</span>
                          </div>
                        `)}
                    </div>
                    ${A>0?r`<div class="context-breakdown-more">+${A} more</div>`:v}
                  </div>
                `})():v}
      </div>
    </div>
  `}function qb(e,t,n,s,i,o,a,l,c,u){if(t)return r`
      <div class="session-logs-compact">
        <div class="session-logs-header">Conversation</div>
        <div class="muted" style="padding: 20px; text-align: center">Loading...</div>
      </div>
    `;if(!e||e.length===0)return r`
      <div class="session-logs-compact">
        <div class="session-logs-header">Conversation</div>
        <div class="muted" style="padding: 20px; text-align: center">No messages</div>
      </div>
    `;const g=i.query.trim().toLowerCase(),h=e.map(k=>{const w=bb(k.content),A=w.cleanContent||k.content;return{log:k,toolInfo:w,cleanContent:A}}),f=Array.from(new Set(h.flatMap(k=>k.toolInfo.tools.map(([w])=>w)))).toSorted((k,w)=>k.localeCompare(w)),d=h.filter(k=>!(i.roles.length>0&&!i.roles.includes(k.log.role)||i.hasTools&&k.toolInfo.tools.length===0||i.tools.length>0&&!k.toolInfo.tools.some(([A])=>i.tools.includes(A))||g&&!k.cleanContent.toLowerCase().includes(g))),p=i.roles.length>0||i.tools.length>0||i.hasTools||g?`${d.length} of ${e.length}`:`${e.length}`,m=new Set(i.roles),S=new Set(i.tools);return r`
    <div class="session-logs-compact">
      <div class="session-logs-header">
        <span>Conversation <span style="font-weight: normal; color: var(--text-muted);">(${p} messages)</span></span>
        <button class="btn btn-sm usage-action-btn usage-secondary-btn" @click=${s}>
          ${n?"Collapse All":"Expand All"}
        </button>
      </div>
      <div class="usage-filters-inline" style="margin: 10px 12px;">
        <select
          multiple
          size="4"
          @change=${k=>o(Array.from(k.target.selectedOptions).map(w=>w.value))}
        >
          <option value="user" ?selected=${m.has("user")}>User</option>
          <option value="assistant" ?selected=${m.has("assistant")}>Assistant</option>
          <option value="tool" ?selected=${m.has("tool")}>Tool</option>
          <option value="toolResult" ?selected=${m.has("toolResult")}>Tool result</option>
        </select>
        <select
          multiple
          size="4"
          @change=${k=>a(Array.from(k.target.selectedOptions).map(w=>w.value))}
        >
          ${f.map(k=>r`<option value=${k} ?selected=${S.has(k)}>${k}</option>`)}
        </select>
        <label class="usage-filters-inline" style="gap: 6px;">
          <input
            type="checkbox"
            .checked=${i.hasTools}
            @change=${k=>l(k.target.checked)}
          />
          Has tools
        </label>
        <input
          type="text"
          placeholder="Search conversation"
          .value=${i.query}
          @input=${k=>c(k.target.value)}
        />
        <button class="btn btn-sm usage-action-btn usage-secondary-btn" @click=${u}>
          Clear
        </button>
      </div>
      <div class="session-logs-list">
        ${d.map(k=>{const{log:w,toolInfo:A,cleanContent:C}=k,_=w.role==="user"?"user":"assistant",T=w.role==="user"?"You":w.role==="assistant"?"Assistant":"Tool";return r`
          <div class="session-log-entry ${_}">
            <div class="session-log-meta">
              <span class="session-log-role">${T}</span>
              <span>${new Date(w.timestamp).toLocaleString()}</span>
              ${w.tokens?r`<span>${O(w.tokens)}</span>`:v}
            </div>
            <div class="session-log-content">${C}</div>
            ${A.tools.length>0?r`
                    <details class="session-log-tools" ?open=${n}>
                      <summary>${A.summary}</summary>
                      <div class="session-log-tools-list">
                        ${A.tools.map(([M,U])=>r`
                            <span class="session-log-tools-pill">${M} × ${U}</span>
                          `)}
                      </div>
                    </details>
                  `:v}
          </div>
        `})}
        ${d.length===0?r`
                <div class="muted" style="padding: 12px">No messages match the filters.</div>
              `:v}
      </div>
    </div>
  `}function Vb(e){if(e.loading&&!e.totals)return r`
      <style>
        @keyframes initial-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes initial-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      </style>
      <section class="card">
        <div class="row" style="justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
          <div style="flex: 1; min-width: 250px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 2px;">
              <div class="card-title" style="margin: 0;">Token Usage</div>
              <span style="
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 4px 10px;
                background: rgba(255, 77, 77, 0.1);
                border-radius: 4px;
                font-size: 12px;
                color: #ff4d4d;
              ">
                <span style="
                  width: 10px;
                  height: 10px;
                  border: 2px solid #ff4d4d;
                  border-top-color: transparent;
                  border-radius: 50%;
                  animation: initial-spin 0.6s linear infinite;
                "></span>
                Loading
              </span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
            <div style="display: flex; gap: 8px; align-items: center;">
              <input type="date" .value=${e.startDate} disabled style="padding: 6px 10px; border: 1px solid var(--border); border-radius: 6px; background: var(--bg); color: var(--text); font-size: 13px; opacity: 0.6;" />
              <span style="color: var(--text-muted);">to</span>
              <input type="date" .value=${e.endDate} disabled style="padding: 6px 10px; border: 1px solid var(--border); border-radius: 6px; background: var(--bg); color: var(--text); font-size: 13px; opacity: 0.6;" />
            </div>
          </div>
        </div>
      </section>
    `;const t=e.chartMode==="tokens",n=e.query.trim().length>0,s=e.queryDraft.trim().length>0,i=[...e.sessions].toSorted((I,R)=>{const P=t?I.usage?.totalTokens??0:I.usage?.totalCost??0;return(t?R.usage?.totalTokens??0:R.usage?.totalCost??0)-P}),o=e.selectedDays.length>0?i.filter(I=>{if(I.usage?.activityDates?.length)return I.usage.activityDates.some(K=>e.selectedDays.includes(K));if(!I.updatedAt)return!1;const R=new Date(I.updatedAt),P=`${R.getFullYear()}-${String(R.getMonth()+1).padStart(2,"0")}-${String(R.getDate()).padStart(2,"0")}`;return e.selectedDays.includes(P)}):i,a=(I,R)=>{if(R.length===0)return!0;const P=I.usage,K=P?.firstActivity??I.updatedAt,xe=P?.lastActivity??I.updatedAt;if(!K||!xe)return!1;const Q=Math.min(K,xe),ke=Math.max(K,xe);let ee=Q;for(;ee<=ke;){const pe=new Date(ee),Ne=yo(pe,e.timeZone);if(R.includes(Ne))return!0;const Fe=xo(pe,e.timeZone);ee=Math.min(Fe.getTime(),ke)+1}return!1},l=e.selectedHours.length>0?o.filter(I=>a(I,e.selectedHours)):o,c=mb(l,e.query),u=c.sessions,g=c.warnings,h=Rb(e.queryDraft,i,e.aggregates),f=bo(e.query),d=I=>{const R=ct(I);return f.filter(P=>ct(P.key??"")===R).map(P=>P.value).filter(Boolean)},p=I=>{const R=new Set;for(const P of I)P&&R.add(P);return Array.from(R)},m=p(i.map(I=>I.agentId)).slice(0,12),S=p(i.map(I=>I.channel)).slice(0,12),k=p([...i.map(I=>I.modelProvider),...i.map(I=>I.providerOverride),...e.aggregates?.byProvider.map(I=>I.provider)??[]]).slice(0,12),w=p([...i.map(I=>I.model),...e.aggregates?.byModel.map(I=>I.model)??[]]).slice(0,12),A=p(e.aggregates?.tools.tools.map(I=>I.name)??[]).slice(0,12),C=e.selectedSessions.length===1?e.sessions.find(I=>I.key===e.selectedSessions[0])??u.find(I=>I.key===e.selectedSessions[0]):null,_=I=>I.reduce((R,P)=>(P.usage&&(R.input+=P.usage.input,R.output+=P.usage.output,R.cacheRead+=P.usage.cacheRead,R.cacheWrite+=P.usage.cacheWrite,R.totalTokens+=P.usage.totalTokens,R.totalCost+=P.usage.totalCost,R.inputCost+=P.usage.inputCost??0,R.outputCost+=P.usage.outputCost??0,R.cacheReadCost+=P.usage.cacheReadCost??0,R.cacheWriteCost+=P.usage.cacheWriteCost??0,R.missingCostEntries+=P.usage.missingCostEntries??0),R),{input:0,output:0,cacheRead:0,cacheWrite:0,totalTokens:0,totalCost:0,inputCost:0,outputCost:0,cacheReadCost:0,cacheWriteCost:0,missingCostEntries:0}),T=I=>e.costDaily.filter(P=>I.includes(P.date)).reduce((P,K)=>(P.input+=K.input,P.output+=K.output,P.cacheRead+=K.cacheRead,P.cacheWrite+=K.cacheWrite,P.totalTokens+=K.totalTokens,P.totalCost+=K.totalCost,P.inputCost+=K.inputCost??0,P.outputCost+=K.outputCost??0,P.cacheReadCost+=K.cacheReadCost??0,P.cacheWriteCost+=K.cacheWriteCost??0,P),{input:0,output:0,cacheRead:0,cacheWrite:0,totalTokens:0,totalCost:0,inputCost:0,outputCost:0,cacheReadCost:0,cacheWriteCost:0,missingCostEntries:0});let M,U;const Z=i.length;if(e.selectedSessions.length>0){const I=u.filter(R=>e.selectedSessions.includes(R.key));M=_(I),U=I.length}else e.selectedDays.length>0&&e.selectedHours.length===0?(M=T(e.selectedDays),U=u.length):e.selectedHours.length>0||n?(M=_(u),U=u.length):(M=e.totals,U=Z);const ie=e.selectedSessions.length>0?u.filter(I=>e.selectedSessions.includes(I.key)):n||e.selectedHours.length>0?u:e.selectedDays.length>0?o:i,N=Lb(ie,e.aggregates),H=e.selectedSessions.length>0?(()=>{const I=u.filter(P=>e.selectedSessions.includes(P.key)),R=new Set;for(const P of I)for(const K of P.usage?.activityDates??[])R.add(K);return R.size>0?e.costDaily.filter(P=>R.has(P.date)):e.costDaily})():e.costDaily,ce=Eb(ie,M,N),L=!e.loading&&!e.totals&&e.sessions.length===0,B=(M?.missingCostEntries??0)>0||(M?M.totalTokens>0&&M.totalCost===0&&M.input+M.output+M.cacheRead+M.cacheWrite>0:!1),oe=[{label:"Today",days:1},{label:"7d",days:7},{label:"30d",days:30}],ae=I=>{const R=new Date,P=new Date;P.setDate(P.getDate()-(I-1)),e.onStartDateChange(Qs(P)),e.onEndDateChange(Qs(R))},X=(I,R,P)=>{if(P.length===0)return v;const K=d(I),xe=new Set(K.map(ee=>ct(ee))),Q=P.length>0&&P.every(ee=>xe.has(ct(ee))),ke=K.length;return r`
      <details
        class="usage-filter-select"
        @toggle=${ee=>{const pe=ee.currentTarget;if(!pe.open)return;const Ne=Fe=>{Fe.composedPath().includes(pe)||(pe.open=!1,window.removeEventListener("click",Ne,!0))};window.addEventListener("click",Ne,!0)}}
      >
        <summary>
          <span>${R}</span>
          ${ke>0?r`<span class="usage-filter-badge">${ke}</span>`:r`
                  <span class="usage-filter-badge">All</span>
                `}
        </summary>
        <div class="usage-filter-popover">
          <div class="usage-filter-actions">
            <button
              class="btn btn-sm"
              @click=${ee=>{ee.preventDefault(),ee.stopPropagation(),e.onQueryDraftChange(gr(e.queryDraft,I,P))}}
              ?disabled=${Q}
            >
              Select All
            </button>
            <button
              class="btn btn-sm"
              @click=${ee=>{ee.preventDefault(),ee.stopPropagation(),e.onQueryDraftChange(gr(e.queryDraft,I,[]))}}
              ?disabled=${ke===0}
            >
              Clear
            </button>
          </div>
          <div class="usage-filter-options">
            ${P.map(ee=>{const pe=xe.has(ct(ee));return r`
                <label class="usage-filter-option">
                  <input
                    type="checkbox"
                    .checked=${pe}
                    @change=${Ne=>{const Fe=Ne.target,et=`${I}:${ee}`;e.onQueryDraftChange(Fe.checked?Db(e.queryDraft,et):ur(e.queryDraft,et))}}
                  />
                  <span>${ee}</span>
                </label>
              `})}
          </div>
        </div>
      </details>
    `},ne=Qs(new Date);return r`
    <style>${yb}</style>

    <section class="usage-page-header">
      <div class="usage-page-title">Usage</div>
      <div class="usage-page-subtitle">See where tokens go, when sessions spike, and what drives cost.</div>
    </section>

    <section class="card usage-header ${e.headerPinned?"pinned":""}">
      <div class="usage-header-row">
        <div class="usage-header-title">
          <div class="card-title" style="margin: 0;">Filters</div>
          ${e.loading?r`
                  <span class="usage-refresh-indicator">Loading</span>
                `:v}
          ${L?r`
                  <span class="usage-query-hint">Select a date range and click Refresh to load usage.</span>
                `:v}
        </div>
        <div class="usage-header-metrics">
          ${M?r`
                <span class="usage-metric-badge">
                  <strong>${O(M.totalTokens)}</strong> tokens
                </span>
                <span class="usage-metric-badge">
                  <strong>${G(M.totalCost)}</strong> cost
                </span>
                <span class="usage-metric-badge">
                  <strong>${U}</strong>
                  session${U!==1?"s":""}
                </span>
              `:v}
          <button
            class="usage-pin-btn ${e.headerPinned?"active":""}"
            title=${e.headerPinned?"Unpin filters":"Pin filters"}
            @click=${e.onToggleHeaderPinned}
          >
            ${e.headerPinned?"Pinned":"Pin"}
          </button>
          <details
            class="usage-export-menu"
            @toggle=${I=>{const R=I.currentTarget;if(!R.open)return;const P=K=>{K.composedPath().includes(R)||(R.open=!1,window.removeEventListener("click",P,!0))};window.addEventListener("click",P,!0)}}
          >
            <summary class="usage-export-button">Export ▾</summary>
            <div class="usage-export-popover">
              <div class="usage-export-list">
                <button
                  class="usage-export-item"
                  @click=${()=>Ys(`opensoul-usage-sessions-${ne}.csv`,Ib(u),"text/csv")}
                  ?disabled=${u.length===0}
                >
                  Sessions CSV
                </button>
                <button
                  class="usage-export-item"
                  @click=${()=>Ys(`opensoul-usage-daily-${ne}.csv`,Mb(H),"text/csv")}
                  ?disabled=${H.length===0}
                >
                  Daily CSV
                </button>
                <button
                  class="usage-export-item"
                  @click=${()=>Ys(`opensoul-usage-${ne}.json`,JSON.stringify({totals:M,sessions:u,daily:H,aggregates:N},null,2),"application/json")}
                  ?disabled=${u.length===0&&H.length===0}
                >
                  JSON
                </button>
              </div>
            </div>
          </details>
        </div>
      </div>
      <div class="usage-header-row">
        <div class="usage-controls">
          ${Fb(e.selectedDays,e.selectedHours,e.selectedSessions,e.sessions,e.onClearDays,e.onClearHours,e.onClearSessions,e.onClearFilters)}
          <div class="usage-presets">
            ${oe.map(I=>r`
                <button class="btn btn-sm" @click=${()=>ae(I.days)}>
                  ${I.label}
                </button>
              `)}
          </div>
          <input
            type="date"
            .value=${e.startDate}
            title="Start Date"
            @change=${I=>e.onStartDateChange(I.target.value)}
          />
          <span style="color: var(--text-muted);">to</span>
          <input
            type="date"
            .value=${e.endDate}
            title="End Date"
            @change=${I=>e.onEndDateChange(I.target.value)}
          />
          <select
            title="Time zone"
            .value=${e.timeZone}
            @change=${I=>e.onTimeZoneChange(I.target.value)}
          >
            <option value="local">Local</option>
            <option value="utc">UTC</option>
          </select>
          <div class="chart-toggle">
            <button
              class="toggle-btn ${t?"active":""}"
              @click=${()=>e.onChartModeChange("tokens")}
            >
              Tokens
            </button>
            <button
              class="toggle-btn ${t?"":"active"}"
              @click=${()=>e.onChartModeChange("cost")}
            >
              Cost
            </button>
          </div>
          <button
            class="btn btn-sm usage-action-btn usage-primary-btn"
            @click=${e.onRefresh}
            ?disabled=${e.loading}
          >
            Refresh
          </button>
        </div>
        
      </div>

      <div style="margin-top: 12px;">
          <div class="usage-query-bar">
          <input
            class="usage-query-input"
            type="text"
            .value=${e.queryDraft}
            placeholder="Filter sessions (e.g. key:agent:main:cron* model:gpt-4o has:errors minTokens:2000)"
            @input=${I=>e.onQueryDraftChange(I.target.value)}
            @keydown=${I=>{I.key==="Enter"&&(I.preventDefault(),e.onApplyQuery())}}
          />
          <div class="usage-query-actions">
            <button
              class="btn btn-sm usage-action-btn usage-secondary-btn"
              @click=${e.onApplyQuery}
              ?disabled=${e.loading||!s&&!n}
            >
              Filter (client-side)
            </button>
            ${s||n?r`<button class="btn btn-sm usage-action-btn usage-secondary-btn" @click=${e.onClearQuery}>Clear</button>`:v}
            <span class="usage-query-hint">
              ${n?`${u.length} of ${Z} sessions match`:`${Z} sessions in range`}
            </span>
          </div>
        </div>
        <div class="usage-filter-row">
          ${X("agent","Agent",m)}
          ${X("channel","Channel",S)}
          ${X("provider","Provider",k)}
          ${X("model","Model",w)}
          ${X("tool","Tool",A)}
          <span class="usage-query-hint">
            Tip: use filters or click bars to filter days.
          </span>
        </div>
        ${f.length>0?r`
                <div class="usage-query-chips">
                  ${f.map(I=>{const R=I.raw;return r`
                      <span class="usage-query-chip">
                        ${R}
                        <button
                          title="Remove filter"
                          @click=${()=>e.onQueryDraftChange(ur(e.queryDraft,R))}
                        >
                          ×
                        </button>
                      </span>
                    `})}
                </div>
              `:v}
        ${h.length>0?r`
                <div class="usage-query-suggestions">
                  ${h.map(I=>r`
                      <button
                        class="usage-query-suggestion"
                        @click=${()=>e.onQueryDraftChange(Pb(e.queryDraft,I.value))}
                      >
                        ${I.label}
                      </button>
                    `)}
                </div>
              `:v}
        ${g.length>0?r`
                <div class="callout warning" style="margin-top: 8px;">
                  ${g.join(" · ")}
                </div>
              `:v}
      </div>

      ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:v}

      ${e.sessionsLimitReached?r`
              <div class="callout warning" style="margin-top: 12px">
                Showing first 1,000 sessions. Narrow date range for complete results.
              </div>
            `:v}
    </section>

    ${zb(M,N,ce,B,wb(ie,e.timeZone),U,Z)}

    ${Cb(ie,e.timeZone,e.selectedHours,e.onSelectHour)}

    <!-- Two-column layout: Daily+Breakdown on left, Sessions on right -->
    <div class="usage-grid">
      <div class="usage-grid-left">
        <div class="card usage-left-card">
          ${Ob(H,e.selectedDays,e.chartMode,e.dailyChartMode,e.onDailyChartModeChange,e.onSelectDay)}
          ${M?Bb(M,e.chartMode):v}
        </div>
      </div>
      <div class="usage-grid-right">
        ${Ub(u,e.selectedSessions,e.selectedDays,t,e.sessionSort,e.sessionSortDir,e.recentSessions,e.sessionsTab,e.onSelectSession,e.onSessionSortChange,e.onSessionSortDirChange,e.onSessionsTabChange,e.visibleColumns,Z,e.onClearSessions)}
      </div>
    </div>

    <!-- Session Detail Panel (when selected) or Empty State -->
    ${C?jb(C,e.timeSeries,e.timeSeriesLoading,e.timeSeriesMode,e.onTimeSeriesModeChange,e.timeSeriesBreakdownMode,e.onTimeSeriesBreakdownChange,e.startDate,e.endDate,e.selectedDays,e.sessionLogs,e.sessionLogsLoading,e.sessionLogsExpanded,e.onToggleSessionLogsExpanded,{roles:e.logFilterRoles,tools:e.logFilterTools,hasTools:e.logFilterHasTools,query:e.logFilterQuery},e.onLogFilterRolesChange,e.onLogFilterToolsChange,e.onLogFilterHasToolsChange,e.onLogFilterQueryChange,e.onLogFilterClear,e.contextExpanded,e.onToggleContextExpanded,e.onClearSessions):Hb()}
  `}let Zs=null;const hr=e=>{Zs&&clearTimeout(Zs),Zs=window.setTimeout(()=>{yl(e)},400)},Qb=/^data:/i,Yb=/^https?:\/\//i;function Zb(e){const t=e.agentsList?.agents??[],s=_r(e.sessionKey)?.agentId??e.agentsList?.defaultId??"main",o=t.find(l=>l.id===s)?.identity,a=o?.avatarUrl??o?.avatar;if(a)return Qb.test(a)||Yb.test(a)?a:o?.avatarUrl}function Jb(e){const t=e.settings.operateZoomLevel??1,n=s=>{const i=Math.max(.5,Math.min(3,Number(s.toFixed(1))));e.applySettings({...e.settings,operateZoomLevel:i})};return r`
    <div class="nav-zoom-control" @click=${s=>s.stopPropagation()}>
      <button
        class="nav-zoom-control__btn"
        @click=${()=>n(t-.1)}
        title="Zoom Out"
      >−</button>
      <input
        type="range"
        class="nav-zoom-control__slider"
        min="0.5"
        max="3.0"
        step="0.1"
        .value=${String(t)}
        @input=${s=>n(parseFloat(s.target.value))}
        @wheel=${s=>{s.preventDefault(),s.stopPropagation();const i=s.deltaY>0?-.1:.1;n(t+i)}}
      />
      <button
        class="nav-zoom-control__btn"
        @click=${()=>n(t+.1)}
        title="Zoom In"
      >+</button>
      <div class="nav-zoom-control__value">${Math.round(t*100)}%</div>
    </div>
  `}function Xb(e){if(e.showOnboardingWizard){const d={step:e.onboardingStep,locale:e.onboardingLocale,loginStatus:e.onboardingLoginStatus,loginDisplayName:e.onboardingLoginDisplayName,loginAvatarUrl:e.onboardingLoginAvatarUrl,loginEmail:e.onboardingLoginEmail,loginError:e.onboardingLoginError,isExistingAccount:e.onboardingIsExistingAccount,selectedProvider:e.onboardingSelectedProvider,providerApiKey:e.onboardingProviderApiKey,providerSearchQuery:e.onboardingProviderSearchQuery,selectedChannel:e.onboardingSelectedChannel,channelToken:e.onboardingChannelToken,onLocaleChange:p=>e.setOnboardingLocale(p),onProviderSelect:p=>e.setOnboardingProvider(p),onProviderApiKeyChange:p=>e.setOnboardingProviderApiKey(p),onProviderSearchChange:p=>e.setOnboardingProviderSearchQuery(p),onChannelSelect:p=>e.setOnboardingChannel(p),onChannelTokenChange:p=>e.setOnboardingChannelToken(p),onGoogleLogin:()=>e.onboardingGoogleLogin(),onGithubLogin:()=>e.onboardingGithubLogin(),onLogout:()=>e.onboardingLogout(),onNext:()=>{if(e.onboardingStep===1&&e.onboardingIsExistingAccount&&e.onboardingLoginStatus==="success"){e.finishOnboarding();return}const p=Math.min(e.onboardingStep+1,5);e.setOnboardingStep(p)},onBack:()=>{const p=Math.max(e.onboardingStep-1,1);e.setOnboardingStep(p)},onSkip:()=>{e.onboardingStep===3?e.setOnboardingProvider(null):e.onboardingStep===4&&e.setOnboardingChannel(null);const p=Math.min(e.onboardingStep+1,5);e.setOnboardingStep(p)},onFinish:()=>e.finishOnboarding()};return qm(d)}const t=e.presenceEntries.length,n=e.sessionsResult?.count??null,s=e.cronStatus?.nextWakeAtMs??null,i=e.connected?null:"Disconnected from gateway.",o=e.tab==="chat",a=o&&(e.settings.chatFocusMode||e.onboarding),l=e.onboarding?!1:e.settings.chatShowThinking,c=Zb(e),u=e.chatAvatarUrl??c??null,g=e.configForm??e.configSnapshot?.config,h=pn(e.basePath??""),f=e.agentsSelectedId??e.agentsList?.defaultId??e.agentsList?.agents?.[0]?.id??null;return r`
    <div class="shell ${o?"shell--chat":""} ${a?"shell--chat-focus":""} ${e.settings.navCollapsed?"shell--nav-collapsed":""} ${e.onboarding?"shell--onboarding":""}">
      <header class="topbar">
        <div class="topbar-left">
          <button
            class="nav-collapse-toggle"
            @click=${()=>e.applySettings({...e.settings,navCollapsed:!e.settings.navCollapsed})}
            title="${e.settings.navCollapsed?"Expand sidebar":"Collapse sidebar"}"
            aria-label="${e.settings.navCollapsed?"Expand sidebar":"Collapse sidebar"}"
          >
            <span class="nav-collapse-toggle__icon">${Y.menu}</span>
          </button>
          <div class="brand">
            <div class="brand-logo">
              <img src=${h?`${h}/logo.jpg`:"/logo.jpg"} alt="OpenSoul" style="border-radius:50%;" />
            </div>
            <div class="brand-text">
              <div class="brand-title">OPENSOUL</div>
              <div class="brand-sub">Gateway Dashboard</div>
            </div>
          </div>
        </div>
        <div class="topbar-status">
          <div class="pill">
            <span class="statusDot ${e.connected?"ok":""}"></span>
            <span>Health</span>
            <span class="mono">${e.connected?"OK":"Offline"}</span>
          </div>
          ${v}
        </div>
      </header>
      <aside class="nav ${e.settings.navCollapsed?"nav--collapsed":""}">
        ${yu.map(d=>{const p=e.settings.navGroupsCollapsed[d.label]??!1;return r`
            <div class="nav-group ${p?"nav-group--collapsed":""}">
              <button
                class="nav-label"
                @click=${()=>{const m={...e.settings.navGroupsCollapsed};m[d.label]=!p,e.applySettings({...e.settings,navGroupsCollapsed:m})}}
                aria-expanded=${!p}
              >
                <span class="nav-label__text">${d.label}</span>
                <span class="nav-label__chevron">${p?"+":"−"}</span>
              </button>
              <div class="nav-group__items">
                ${d.tabs.map(m=>Bg(e,m))}
              </div>
              ${(d.label==="Operate"||d.label==="Assist")&&!p?Jb(e):v}
            </div>
          `})}
        <div class="nav-bottom">
          <button
            class="nav-settings-btn"
            @click=${()=>e.openSettings()}
            title="Settings"
          >
            <span class="nav-settings-btn__icon">${Y.settings}</span>
            <span class="nav-settings-btn__text">Settings</span>
          </button>
        </div>
      </aside>
      <main
        class="content ${o?"content--chat":""}"
        style=${["chat","channels","instances","sessions","usage","cron"].includes(e.tab)&&(e.settings.operateZoomLevel??1)!==1?`transform: scale(${e.settings.operateZoomLevel??1}); width: ${100/(e.settings.operateZoomLevel??1)}%; height: ${100/(e.settings.operateZoomLevel??1)}%;`:v}
      >
        <section class="content-header">
          <div>
            ${e.tab==="usage"?v:r`<div class="page-title">${Gn(e.tab)}</div>`}
            ${e.tab==="usage"?v:r`<div class="page-sub">${wu(e.tab)}</div>`}
          </div>
          <div class="page-meta">
            ${e.lastError?r`<div class="pill danger">${e.lastError}</div>`:v}
            ${o?zg(e):v}
          </div>
        </section>

        ${e.tab==="overview"?Vm({connected:e.connected,hello:e.hello,settings:e.settings,password:e.password,lastError:e.lastError,presenceCount:t,sessionsCount:n,cronEnabled:e.cronStatus?.enabled??null,cronNext:s,lastChannelsRefresh:e.channelsLastSuccess,onSettingsChange:d=>e.applySettings(d),onPasswordChange:d=>e.password=d,onSessionKeyChange:d=>{e.sessionKey=d,e.chatMessage="",e.resetToolStream(),e.applySettings({...e.settings,sessionKey:d,lastActiveSessionKey:d}),e.loadAssistantIdentity()},onConnect:()=>e.connect(),onRefresh:()=>e.loadOverview(),onNavigate:d=>e.setTab(d)}):v}

        ${e.tab==="channels"?gh({connected:e.connected,loading:e.channelsLoading,snapshot:e.channelsSnapshot,lastError:e.channelsError,lastSuccessAt:e.channelsLastSuccess,whatsappMessage:e.whatsappLoginMessage,whatsappQrDataUrl:e.whatsappLoginQrDataUrl,whatsappConnected:e.whatsappLoginConnected,whatsappBusy:e.whatsappBusy,configSchema:e.configSchema,configSchemaLoading:e.configSchemaLoading,configForm:e.configForm,configUiHints:e.configUiHints,configSaving:e.configSaving,configFormDirty:e.configFormDirty,nostrProfileFormState:e.nostrProfileFormState,nostrProfileAccountId:e.nostrProfileAccountId,onRefresh:d=>ye(e,d),onWhatsAppStart:d=>e.handleWhatsAppStart(d),onWhatsAppWait:()=>e.handleWhatsAppWait(),onWhatsAppLogout:()=>e.handleWhatsAppLogout(),onConfigPatch:(d,p)=>$e(e,d,p),onConfigSave:()=>e.handleChannelConfigSave(),onConfigReload:()=>e.handleChannelConfigReload(),onNostrProfileEdit:(d,p)=>e.handleNostrProfileEdit(d,p),onNostrProfileCancel:()=>e.handleNostrProfileCancel(),onNostrProfileFieldChange:(d,p)=>e.handleNostrProfileFieldChange(d,p),onNostrProfileSave:()=>e.handleNostrProfileSave(),onNostrProfileImport:()=>e.handleNostrProfileImport(),onNostrProfileToggleAdvanced:()=>e.handleNostrProfileToggleAdvanced()}):v}

        ${e.tab==="instances"?qv({loading:e.presenceLoading,entries:e.presenceEntries,lastError:e.presenceError,statusMessage:e.presenceStatus,onRefresh:()=>Yi(e)}):v}

        ${e.tab==="sessions"?ib({loading:e.sessionsLoading,result:e.sessionsResult,error:e.sessionsError,activeMinutes:e.sessionsFilterActive,limit:e.sessionsFilterLimit,includeGlobal:e.sessionsIncludeGlobal,includeUnknown:e.sessionsIncludeUnknown,basePath:e.basePath,onFiltersChange:d=>{e.sessionsFilterActive=d.activeMinutes,e.sessionsFilterLimit=d.limit,e.sessionsIncludeGlobal=d.includeGlobal,e.sessionsIncludeUnknown=d.includeUnknown},onRefresh:()=>yt(e),onPatch:(d,p)=>ru(e,d,p),onDelete:d=>lu(e,d)}):v}

        ${e.tab==="usage"?Vb({loading:e.usageLoading,error:e.usageError,startDate:e.usageStartDate,endDate:e.usageEndDate,sessions:e.usageResult?.sessions??[],sessionsLimitReached:(e.usageResult?.sessions?.length??0)>=1e3,totals:e.usageResult?.totals??null,aggregates:e.usageResult?.aggregates??null,costDaily:e.usageCostSummary?.daily??[],selectedSessions:e.usageSelectedSessions,selectedDays:e.usageSelectedDays,selectedHours:e.usageSelectedHours,chartMode:e.usageChartMode,dailyChartMode:e.usageDailyChartMode,timeSeriesMode:e.usageTimeSeriesMode,timeSeriesBreakdownMode:e.usageTimeSeriesBreakdownMode,timeSeries:e.usageTimeSeries,timeSeriesLoading:e.usageTimeSeriesLoading,sessionLogs:e.usageSessionLogs,sessionLogsLoading:e.usageSessionLogsLoading,sessionLogsExpanded:e.usageSessionLogsExpanded,logFilterRoles:e.usageLogFilterRoles,logFilterTools:e.usageLogFilterTools,logFilterHasTools:e.usageLogFilterHasTools,logFilterQuery:e.usageLogFilterQuery,query:e.usageQuery,queryDraft:e.usageQueryDraft,sessionSort:e.usageSessionSort,sessionSortDir:e.usageSessionSortDir,recentSessions:e.usageRecentSessions,sessionsTab:e.usageSessionsTab,visibleColumns:e.usageVisibleColumns,timeZone:e.usageTimeZone,contextExpanded:e.usageContextExpanded,headerPinned:e.usageHeaderPinned,onStartDateChange:d=>{e.usageStartDate=d,e.usageSelectedDays=[],e.usageSelectedHours=[],e.usageSelectedSessions=[],hr(e)},onEndDateChange:d=>{e.usageEndDate=d,e.usageSelectedDays=[],e.usageSelectedHours=[],e.usageSelectedSessions=[],hr(e)},onRefresh:()=>yl(e),onTimeZoneChange:d=>{e.usageTimeZone=d},onToggleContextExpanded:()=>{e.usageContextExpanded=!e.usageContextExpanded},onToggleSessionLogsExpanded:()=>{e.usageSessionLogsExpanded=!e.usageSessionLogsExpanded},onLogFilterRolesChange:d=>{e.usageLogFilterRoles=d},onLogFilterToolsChange:d=>{e.usageLogFilterTools=d},onLogFilterHasToolsChange:d=>{e.usageLogFilterHasTools=d},onLogFilterQueryChange:d=>{e.usageLogFilterQuery=d},onLogFilterClear:()=>{e.usageLogFilterRoles=[],e.usageLogFilterTools=[],e.usageLogFilterHasTools=!1,e.usageLogFilterQuery=""},onToggleHeaderPinned:()=>{e.usageHeaderPinned=!e.usageHeaderPinned},onSelectHour:(d,p)=>{if(p&&e.usageSelectedHours.length>0){const m=Array.from({length:24},(A,C)=>C),S=e.usageSelectedHours[e.usageSelectedHours.length-1],k=m.indexOf(S),w=m.indexOf(d);if(k!==-1&&w!==-1){const[A,C]=k<w?[k,w]:[w,k],_=m.slice(A,C+1);e.usageSelectedHours=[...new Set([...e.usageSelectedHours,..._])]}}else e.usageSelectedHours.includes(d)?e.usageSelectedHours=e.usageSelectedHours.filter(m=>m!==d):e.usageSelectedHours=[...e.usageSelectedHours,d]},onQueryDraftChange:d=>{e.usageQueryDraft=d,e.usageQueryDebounceTimer&&window.clearTimeout(e.usageQueryDebounceTimer),e.usageQueryDebounceTimer=window.setTimeout(()=>{e.usageQuery=e.usageQueryDraft,e.usageQueryDebounceTimer=null},250)},onApplyQuery:()=>{e.usageQueryDebounceTimer&&(window.clearTimeout(e.usageQueryDebounceTimer),e.usageQueryDebounceTimer=null),e.usageQuery=e.usageQueryDraft},onClearQuery:()=>{e.usageQueryDebounceTimer&&(window.clearTimeout(e.usageQueryDebounceTimer),e.usageQueryDebounceTimer=null),e.usageQueryDraft="",e.usageQuery=""},onSessionSortChange:d=>{e.usageSessionSort=d},onSessionSortDirChange:d=>{e.usageSessionSortDir=d},onSessionsTabChange:d=>{e.usageSessionsTab=d},onToggleColumn:d=>{e.usageVisibleColumns.includes(d)?e.usageVisibleColumns=e.usageVisibleColumns.filter(p=>p!==d):e.usageVisibleColumns=[...e.usageVisibleColumns,d]},onSelectSession:(d,p)=>{if(e.usageTimeSeries=null,e.usageSessionLogs=null,e.usageRecentSessions=[d,...e.usageRecentSessions.filter(m=>m!==d)].slice(0,8),p&&e.usageSelectedSessions.length>0){const m=e.usageChartMode==="tokens",k=[...e.usageResult?.sessions??[]].toSorted((_,T)=>{const M=m?_.usage?.totalTokens??0:_.usage?.totalCost??0;return(m?T.usage?.totalTokens??0:T.usage?.totalCost??0)-M}).map(_=>_.key),w=e.usageSelectedSessions[e.usageSelectedSessions.length-1],A=k.indexOf(w),C=k.indexOf(d);if(A!==-1&&C!==-1){const[_,T]=A<C?[A,C]:[C,A],M=k.slice(_,T+1),U=[...new Set([...e.usageSelectedSessions,...M])];e.usageSelectedSessions=U}}else e.usageSelectedSessions.length===1&&e.usageSelectedSessions[0]===d?e.usageSelectedSessions=[]:e.usageSelectedSessions=[d];e.usageSelectedSessions.length===1&&(Yg(e,e.usageSelectedSessions[0]),Zg(e,e.usageSelectedSessions[0]))},onSelectDay:(d,p)=>{if(p&&e.usageSelectedDays.length>0){const m=(e.usageCostSummary?.daily??[]).map(A=>A.date),S=e.usageSelectedDays[e.usageSelectedDays.length-1],k=m.indexOf(S),w=m.indexOf(d);if(k!==-1&&w!==-1){const[A,C]=k<w?[k,w]:[w,k],_=m.slice(A,C+1),T=[...new Set([...e.usageSelectedDays,..._])];e.usageSelectedDays=T}}else e.usageSelectedDays.includes(d)?e.usageSelectedDays=e.usageSelectedDays.filter(m=>m!==d):e.usageSelectedDays=[d]},onChartModeChange:d=>{e.usageChartMode=d},onDailyChartModeChange:d=>{e.usageDailyChartMode=d},onTimeSeriesModeChange:d=>{e.usageTimeSeriesMode=d},onTimeSeriesBreakdownChange:d=>{e.usageTimeSeriesBreakdownMode=d},onClearDays:()=>{e.usageSelectedDays=[]},onClearHours:()=>{e.usageSelectedHours=[]},onClearSessions:()=>{e.usageSelectedSessions=[],e.usageTimeSeries=null,e.usageSessionLogs=null},onClearFilters:()=>{e.usageSelectedDays=[],e.usageSelectedHours=[],e.usageSelectedSessions=[],e.usageTimeSeries=null,e.usageSessionLogs=null}}):v}

        ${e.tab==="cron"?Fv({basePath:e.basePath,loading:e.cronLoading,status:e.cronStatus,jobs:e.cronJobs,error:e.cronError,busy:e.cronBusy,form:e.cronForm,channels:e.channelsSnapshot?.channelMeta?.length?e.channelsSnapshot.channelMeta.map(d=>d.id):e.channelsSnapshot?.channelOrder??[],channelLabels:e.channelsSnapshot?.channelLabels??{},channelMeta:e.channelsSnapshot?.channelMeta??[],runsJobId:e.cronRunsJobId,runs:e.cronRuns,onFormChange:d=>e.cronForm={...e.cronForm,...d},onRefresh:()=>e.loadCron(),onAdd:()=>xd(e),onToggle:(d,p)=>$d(e,d,p),onRun:d=>wd(e,d),onRemove:d=>kd(e,d),onLoadRuns:d=>Rr(e,d)}):v}

        ${e.tab==="agents"?bp({loading:e.agentsLoading,error:e.agentsError,agentsList:e.agentsList,selectedAgentId:f,activePanel:e.agentsPanel,configForm:g,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,channelsLoading:e.channelsLoading,channelsError:e.channelsError,channelsSnapshot:e.channelsSnapshot,channelsLastSuccess:e.channelsLastSuccess,cronLoading:e.cronLoading,cronStatus:e.cronStatus,cronJobs:e.cronJobs,cronError:e.cronError,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFilesList:e.agentFilesList,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,agentIdentityLoading:e.agentIdentityLoading,agentIdentityError:e.agentIdentityError,agentIdentityById:e.agentIdentityById,agentSkillsLoading:e.agentSkillsLoading,agentSkillsReport:e.agentSkillsReport,agentSkillsError:e.agentSkillsError,agentSkillsAgentId:e.agentSkillsAgentId,skillsFilter:e.skillsFilter,onRefresh:async()=>{await zi(e);const d=e.agentsList?.agents?.map(p=>p.id)??[];d.length>0&&Ir(e,d)},onSelectAgent:d=>{e.agentsSelectedId!==d&&(e.agentsSelectedId=d,e.agentFilesList=null,e.agentFilesError=null,e.agentFilesLoading=!1,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},e.agentSkillsReport=null,e.agentSkillsError=null,e.agentSkillsAgentId=null,Er(e,d),e.agentsPanel==="files"&&Bs(e,d),e.agentsPanel==="skills"&&Fn(e,d))},onSelectPanel:d=>{e.agentsPanel=d,d==="files"&&f&&e.agentFilesList?.agentId!==f&&(e.agentFilesList=null,e.agentFilesError=null,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},Bs(e,f)),d==="skills"&&f&&Fn(e,f),d==="channels"&&ye(e,!1),d==="cron"&&e.loadCron()},onLoadFiles:d=>Bs(e,d),onSelectFile:d=>{e.agentFileActive=d,f&&Vg(e,f,d)},onFileDraftChange:(d,p)=>{e.agentFileDrafts={...e.agentFileDrafts,[d]:p}},onFileReset:d=>{const p=e.agentFileContents[d]??"";e.agentFileDrafts={...e.agentFileDrafts,[d]:p}},onFileSave:d=>{if(!f)return;const p=e.agentFileDrafts[d]??e.agentFileContents[d]??"";Qg(e,f,d,p)},onToolsProfileChange:(d,p,m)=>{if(!g)return;const S=g.agents?.list;if(!Array.isArray(S))return;const k=S.findIndex(A=>A&&typeof A=="object"&&"id"in A&&A.id===d);if(k<0)return;const w=["agents","list",k,"tools"];p?$e(e,[...w,"profile"],p):Ue(e,[...w,"profile"]),m&&Ue(e,[...w,"allow"])},onToolsOverridesChange:(d,p,m)=>{if(!g)return;const S=g.agents?.list;if(!Array.isArray(S))return;const k=S.findIndex(A=>A&&typeof A=="object"&&"id"in A&&A.id===d);if(k<0)return;const w=["agents","list",k,"tools"];p.length>0?$e(e,[...w,"alsoAllow"],p):Ue(e,[...w,"alsoAllow"]),m.length>0?$e(e,[...w,"deny"],m):Ue(e,[...w,"deny"])},onConfigReload:()=>we(e),onConfigSave:()=>Nn(e),onChannelsRefresh:()=>ye(e,!1),onCronRefresh:()=>e.loadCron(),onSkillsFilterChange:d=>e.skillsFilter=d,onSkillsRefresh:()=>{f&&Fn(e,f)},onAgentSkillToggle:(d,p,m)=>{if(!g)return;const S=g.agents?.list;if(!Array.isArray(S))return;const k=S.findIndex(U=>U&&typeof U=="object"&&"id"in U&&U.id===d);if(k<0)return;const w=S[k],A=p.trim();if(!A)return;const C=e.agentSkillsReport?.skills?.map(U=>U.name).filter(Boolean)??[],T=(Array.isArray(w.skills)?w.skills.map(U=>String(U).trim()).filter(Boolean):void 0)??C,M=new Set(T);m?M.add(A):M.delete(A),$e(e,["agents","list",k,"skills"],[...M])},onAgentSkillsClear:d=>{if(!g)return;const p=g.agents?.list;if(!Array.isArray(p))return;const m=p.findIndex(S=>S&&typeof S=="object"&&"id"in S&&S.id===d);m<0||Ue(e,["agents","list",m,"skills"])},onAgentSkillsDisableAll:d=>{if(!g)return;const p=g.agents?.list;if(!Array.isArray(p))return;const m=p.findIndex(S=>S&&typeof S=="object"&&"id"in S&&S.id===d);m<0||$e(e,["agents","list",m,"skills"],[])},onModelChange:(d,p)=>{if(!g)return;const m=g.agents?.list;if(!Array.isArray(m))return;const S=m.findIndex(C=>C&&typeof C=="object"&&"id"in C&&C.id===d);if(S<0)return;const k=["agents","list",S,"model"];if(!p){Ue(e,k);return}const A=m[S]?.model;if(A&&typeof A=="object"&&!Array.isArray(A)){const C=A.fallbacks,_={primary:p,...Array.isArray(C)?{fallbacks:C}:{}};$e(e,k,_)}else $e(e,k,p)},onModelFallbacksChange:(d,p)=>{if(!g)return;const m=g.agents?.list;if(!Array.isArray(m))return;const S=m.findIndex(U=>U&&typeof U=="object"&&"id"in U&&U.id===d);if(S<0)return;const k=["agents","list",S,"model"],w=m[S],A=p.map(U=>U.trim()).filter(Boolean),C=w.model,T=(()=>{if(typeof C=="string")return C.trim()||null;if(C&&typeof C=="object"&&!Array.isArray(C)){const U=C.primary;if(typeof U=="string")return U.trim()||null}return null})();if(A.length===0){T?$e(e,k,T):Ue(e,k);return}$e(e,k,T?{primary:T,fallbacks:A}:{fallbacks:A})}}):v}

        ${e.tab==="skills"?db({loading:e.skillsLoading,report:e.skillsReport,error:e.skillsError,filter:e.skillsFilter,edits:e.skillEdits,messages:e.skillMessages,busyKey:e.skillsBusyKey,onFilterChange:d=>e.skillsFilter=d,onRefresh:()=>gn(e,{clearMessages:!0}),onToggle:(d,p)=>du(e,d,p),onEdit:(d,p)=>cu(e,d,p),onSaveKey:d=>uu(e,d),onInstall:(d,p,m)=>gu(e,d,p,m)}):v}

        ${e.tab==="nodes"?Jv({loading:e.nodesLoading,nodes:e.nodes,devicesLoading:e.devicesLoading,devicesError:e.devicesError,devicesList:e.devicesList,configForm:e.configForm??e.configSnapshot?.config,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,configFormMode:e.configFormMode,execApprovalsLoading:e.execApprovalsLoading,execApprovalsSaving:e.execApprovalsSaving,execApprovalsDirty:e.execApprovalsDirty,execApprovalsSnapshot:e.execApprovalsSnapshot,execApprovalsForm:e.execApprovalsForm,execApprovalsSelectedAgent:e.execApprovalsSelectedAgent,execApprovalsTarget:e.execApprovalsTarget,execApprovalsTargetNodeId:e.execApprovalsTargetNodeId,onRefresh:()=>is(e),onDevicesRefresh:()=>Je(e),onDeviceApprove:d=>Zd(e,d),onDeviceReject:d=>Jd(e,d),onDeviceRotate:(d,p,m)=>Xd(e,{deviceId:d,role:p,scopes:m}),onDeviceRevoke:(d,p)=>eu(e,{deviceId:d,role:p}),onLoadConfig:()=>we(e),onLoadExecApprovals:()=>{const d=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return Qi(e,d)},onBindDefault:d=>{d?$e(e,["tools","exec","node"],d):Ue(e,["tools","exec","node"])},onBindAgent:(d,p)=>{const m=["agents","list",d,"tools","exec","node"];p?$e(e,m,p):Ue(e,m)},onSaveBindings:()=>Nn(e),onExecApprovalsTargetChange:(d,p)=>{e.execApprovalsTarget=d,e.execApprovalsTargetNodeId=p,e.execApprovalsSnapshot=null,e.execApprovalsForm=null,e.execApprovalsDirty=!1,e.execApprovalsSelectedAgent=null},onExecApprovalsSelectAgent:d=>{e.execApprovalsSelectedAgent=d},onExecApprovalsPatch:(d,p)=>ou(e,d,p),onExecApprovalsRemove:d=>au(e,d),onSaveExecApprovals:()=>{const d=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return iu(e,d)}}):v}

        ${e.tab==="chat"?_v({sessionKey:e.sessionKey,onSessionKeyChange:d=>{e.sessionKey=d,e.chatMessage="",e.chatAttachments=[],e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.chatQueue=[],e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:d,lastActiveSessionKey:d}),e.loadAssistantIdentity(),ln(e),ui(e)},thinkingLevel:e.chatThinkingLevel,showThinking:l,loading:e.chatLoading,sending:e.chatSending,compactionStatus:e.compactionStatus,assistantAvatarUrl:u,messages:e.chatMessages,toolMessages:e.chatToolMessages,stream:e.chatStream,streamStartedAt:e.chatStreamStartedAt,draft:e.chatMessage,queue:e.chatQueue,connected:e.connected,canSend:e.connected,disabledReason:i,error:e.lastError,sessions:e.sessionsResult,focusMode:a,onRefresh:()=>(e.resetToolStream(),Promise.all([ln(e),ui(e)])),onToggleFocusMode:()=>{e.onboarding||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})},onChatScroll:d=>e.handleChatScroll(d),onDraftChange:d=>e.chatMessage=d,attachments:e.chatAttachments,onAttachmentsChange:d=>e.chatAttachments=d,onSend:()=>e.handleSendChat(),canAbort:!!e.chatRunId,onAbort:()=>{e.handleAbortChat()},onQueueRemove:d=>e.removeQueuedMessage(d),onNewSession:()=>e.handleSendChat("/new",{restoreDraft:!0}),showNewMessages:e.chatNewMessagesBelow&&!e.chatManualRefreshInFlight,onScrollToBottom:()=>e.scrollToBottom(),sidebarOpen:e.sidebarOpen,sidebarContent:e.sidebarContent,sidebarError:e.sidebarError,splitRatio:e.splitRatio,onOpenSidebar:d=>e.handleOpenSidebar(d),onCloseSidebar:()=>e.handleCloseSidebar(),onSplitRatioChange:d=>e.handleSplitRatioChange(d),assistantName:e.assistantName,assistantAvatar:e.assistantAvatar}):v}

      </main>

      ${lb(e,{config:Pv({raw:e.configRaw,originalRaw:e.configRawOriginal,valid:e.configValid,issues:e.configIssues,loading:e.configLoading,saving:e.configSaving,applying:e.configApplying,updating:e.updateRunning,connected:e.connected,schema:e.configSchema,schemaLoading:e.configSchemaLoading,uiHints:e.configUiHints,formMode:e.configFormMode,formValue:e.configForm,originalValue:e.configFormOriginal,searchQuery:e.configSearchQuery,activeSection:e.configActiveSection,activeSubsection:e.configActiveSubsection,onRawChange:d=>{e.configRaw=d},onFormModeChange:d=>e.configFormMode=d,onFormPatch:(d,p)=>$e(e,d,p),onSearchChange:d=>e.configSearchQuery=d,onSectionChange:d=>{e.configActiveSection=d,e.configActiveSubsection=null},onSubsectionChange:d=>e.configActiveSubsection=d,onReload:()=>we(e),onSave:()=>Nn(e),onApply:()=>zc(e),onUpdate:()=>Uc(e)}),logs:Zv({loading:e.logsLoading,error:e.logsError,file:e.logsFile,entries:e.logsEntries,filterText:e.logsFilterText,levelFilters:e.logsLevelFilters,autoFollow:e.logsAutoFollow,truncated:e.logsTruncated,onFilterTextChange:d=>e.logsFilterText=d,onLevelToggle:(d,p)=>{e.logsLevelFilters={...e.logsLevelFilters,[d]:p}},onToggleAutoFollow:d=>e.logsAutoFollow=d,onRefresh:()=>sn(e,{reset:!0}),onExport:(d,p)=>e.exportLogs(d,p),onScroll:d=>e.handleLogsScroll(d)}),debug:Kv({loading:e.debugLoading,status:e.debugStatus,health:e.debugHealth,models:e.debugModels,heartbeat:e.debugHeartbeat,eventLog:e.eventLog,callMethod:e.debugCallMethod,callParams:e.debugCallParams,callResult:e.debugCallResult,callError:e.debugCallError,onCallMethodChange:d=>e.debugCallMethod=d,onCallParamsChange:d=>e.debugCallParams=d,onRefresh:()=>Mt(e),onCall:()=>rd(e)})})}
      ${Wv(e)}
      ${Gv(e)}
    </div>
  `}var ey=Object.defineProperty,ty=Object.getOwnPropertyDescriptor,x=(e,t,n,s)=>{for(var i=s>1?void 0:s?ty(t,n):t,o=e.length-1,a;o>=0;o--)(a=e[o])&&(i=(s?a(t,n,i):a(i))||i);return s&&i&&ey(t,n,i),i};const Js=bg();function ny(){if(!window.location.search)return!1;const t=new URLSearchParams(window.location.search).get("onboarding");if(!t)return!1;const n=t.trim().toLowerCase();return n==="1"||n==="true"||n==="yes"||n==="on"}let y=class extends Lt{constructor(){super(...arguments),this.settings=ku(),this.password="",this.tab="chat",this.onboarding=ny(),this.connected=!1,this.theme=this.settings.theme??"system",this.themeResolved="dark",this.hello=null,this.lastError=null,this.eventLog=[],this.eventLogBuffer=[],this.toolStreamSyncTimer=null,this.sidebarCloseTimer=null,this.assistantName=Js.name,this.assistantAvatar=Js.avatar,this.assistantAgentId=Js.agentId??null,this.sessionKey=this.settings.sessionKey,this.chatLoading=!1,this.chatSending=!1,this.chatMessage="",this.chatMessages=[],this.chatToolMessages=[],this.chatStream=null,this.chatStreamStartedAt=null,this.chatRunId=null,this.compactionStatus=null,this.chatAvatarUrl=null,this.chatThinkingLevel=null,this.chatQueue=[],this.chatAttachments=[],this.chatManualRefreshInFlight=!1,this.sidebarOpen=!1,this.sidebarContent=null,this.sidebarError=null,this.splitRatio=this.settings.splitRatio,this.nodesLoading=!1,this.nodes=[],this.devicesLoading=!1,this.devicesError=null,this.devicesList=null,this.execApprovalsLoading=!1,this.execApprovalsSaving=!1,this.execApprovalsDirty=!1,this.execApprovalsSnapshot=null,this.execApprovalsForm=null,this.execApprovalsSelectedAgent=null,this.execApprovalsTarget="gateway",this.execApprovalsTargetNodeId=null,this.execApprovalQueue=[],this.execApprovalBusy=!1,this.execApprovalError=null,this.pendingGatewayUrl=null,this.configLoading=!1,this.configRaw=`{
}
`,this.configRawOriginal="",this.configValid=null,this.configIssues=[],this.configSaving=!1,this.configApplying=!1,this.updateRunning=!1,this.applySessionKey=this.settings.lastActiveSessionKey,this.configSnapshot=null,this.configSchema=null,this.configSchemaVersion=null,this.configSchemaLoading=!1,this.configUiHints={},this.configForm=null,this.configFormOriginal=null,this.configFormDirty=!1,this.configFormMode="form",this.configSearchQuery="",this.configActiveSection=null,this.configActiveSubsection=null,this.channelsLoading=!1,this.channelsSnapshot=null,this.channelsError=null,this.channelsLastSuccess=null,this.whatsappLoginMessage=null,this.whatsappLoginQrDataUrl=null,this.whatsappLoginConnected=null,this.whatsappBusy=!1,this.nostrProfileFormState=null,this.nostrProfileAccountId=null,this.presenceLoading=!1,this.presenceEntries=[],this.presenceError=null,this.presenceStatus=null,this.agentsLoading=!1,this.agentsList=null,this.agentsError=null,this.agentsSelectedId=null,this.agentsPanel="overview",this.agentFilesLoading=!1,this.agentFilesError=null,this.agentFilesList=null,this.agentFileContents={},this.agentFileDrafts={},this.agentFileActive=null,this.agentFileSaving=!1,this.agentIdentityLoading=!1,this.agentIdentityError=null,this.agentIdentityById={},this.agentSkillsLoading=!1,this.agentSkillsError=null,this.agentSkillsReport=null,this.agentSkillsAgentId=null,this.sessionsLoading=!1,this.sessionsResult=null,this.sessionsError=null,this.sessionsFilterActive="",this.sessionsFilterLimit="120",this.sessionsIncludeGlobal=!0,this.sessionsIncludeUnknown=!1,this.usageLoading=!1,this.usageResult=null,this.usageCostSummary=null,this.usageError=null,this.usageStartDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageEndDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageSelectedSessions=[],this.usageSelectedDays=[],this.usageSelectedHours=[],this.usageChartMode="tokens",this.usageDailyChartMode="by-type",this.usageTimeSeriesMode="per-turn",this.usageTimeSeriesBreakdownMode="by-type",this.usageTimeSeries=null,this.usageTimeSeriesLoading=!1,this.usageSessionLogs=null,this.usageSessionLogsLoading=!1,this.usageSessionLogsExpanded=!1,this.usageQuery="",this.usageQueryDraft="",this.usageSessionSort="recent",this.usageSessionSortDir="desc",this.usageRecentSessions=[],this.usageTimeZone="local",this.usageContextExpanded=!1,this.usageHeaderPinned=!1,this.usageSessionsTab="all",this.usageVisibleColumns=["channel","agent","provider","model","messages","tools","errors","duration"],this.usageLogFilterRoles=[],this.usageLogFilterTools=[],this.usageLogFilterHasTools=!1,this.usageLogFilterQuery="",this.usageQueryDebounceTimer=null,this.cronLoading=!1,this.cronJobs=[],this.cronStatus=null,this.cronError=null,this.cronForm={...hg},this.cronRunsJobId=null,this.cronRuns=[],this.cronBusy=!1,this.skillsLoading=!1,this.skillsReport=null,this.skillsError=null,this.skillsFilter="",this.skillEdits={},this.skillsBusyKey=null,this.skillMessages={},this.debugLoading=!1,this.debugStatus=null,this.debugHealth=null,this.debugModels=[],this.debugHeartbeat=null,this.debugCallMethod="",this.debugCallParams="{}",this.debugCallResult=null,this.debugCallError=null,this.logsLoading=!1,this.logsError=null,this.logsFile=null,this.logsEntries=[],this.logsFilterText="",this.logsLevelFilters={...pg},this.logsAutoFollow=!0,this.logsTruncated=!1,this.logsCursor=null,this.logsLastFetchAt=null,this.logsLimit=500,this.logsMaxBytes=25e4,this.logsAtBottom=!0,this.settingsOpen=!1,this.settingsSection="general",this.showOnboardingWizard=!0,this.onboardingStep=1,this.onboardingLocale=Rm(),this.onboardingLoginStatus="idle",this.onboardingLoginDisplayName=null,this.onboardingLoginAvatarUrl=null,this.onboardingLoginEmail=null,this.onboardingLoginError=null,this.onboardingIsExistingAccount=!1,this.onboardingSelectedProvider=null,this.onboardingProviderApiKey="",this.onboardingProviderSearchQuery="",this.onboardingSelectedChannel=null,this.onboardingChannelToken="",this.client=null,this.chatScrollFrame=null,this.chatScrollTimeout=null,this.chatHasAutoScrolled=!1,this.chatUserNearBottom=!0,this.chatNewMessagesBelow=!1,this.nodesPollInterval=null,this.logsPollInterval=null,this.debugPollInterval=null,this.logsScrollFrame=null,this.toolStreamById=new Map,this.toolStreamOrder=[],this.refreshSessionsAfterChat=new Set,this.basePath="",this.popStateHandler=()=>Pu(this),this.themeMedia=null,this.themeMediaHandler=null,this.topbarObserver=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),Lg(this)}firstUpdated(){Eg(this)}disconnectedCallback(){Ig(this),super.disconnectedCallback()}updated(e){Rg(this,e)}connect(){eo(this)}handleChatScroll(e){sd(this,e)}handleLogsScroll(e){id(this,e)}exportLogs(e,t){od(e,t)}resetToolStream(){ds(this)}resetChatScroll(){Yo(this)}scrollToBottom(e){Yo(this),dn(this,!0,!!e?.smooth)}async loadAssistantIdentity(){await hl(this)}applySettings(e){je(this,e)}setTab(e){sl(this,e)}setTheme(e,t){li(this,e,t)}async loadOverview(){await al(this)}async loadCron(){await qn(this)}async handleAbortChat(){await dl(this)}removeQueuedMessage(e){lg(this,e)}async handleSendChat(e,t){await cg(this,e,t)}async handleWhatsAppStart(e){await Wc(this,e)}async handleWhatsAppWait(){await Gc(this)}async handleWhatsAppLogout(){await qc(this)}async handleChannelConfigSave(){await Vc(this)}async handleChannelConfigReload(){await Qc(this)}handleNostrProfileEdit(e,t){Zc(this,e,t)}handleNostrProfileCancel(){Jc(this)}handleNostrProfileFieldChange(e,t){Xc(this,e,t)}async handleNostrProfileSave(){await td(this)}async handleNostrProfileImport(){await nd(this)}handleNostrProfileToggleAdvanced(){ed(this)}async handleExecApprovalDecision(e){const t=this.execApprovalQueue[0];if(!(!t||!this.client||this.execApprovalBusy)){this.execApprovalBusy=!0,this.execApprovalError=null;try{await this.client.request("exec.approval.resolve",{id:t.id,decision:e}),this.execApprovalQueue=this.execApprovalQueue.filter(n=>n.id!==t.id)}catch(n){this.execApprovalError=`Exec approval failed: ${String(n)}`}finally{this.execApprovalBusy=!1}}}handleGatewayUrlConfirm(){const e=this.pendingGatewayUrl;e&&(this.pendingGatewayUrl=null,je(this,{...this.settings,gatewayUrl:e}),this.connect())}handleGatewayUrlCancel(){this.pendingGatewayUrl=null}openSettings(e){this.settingsSection=e??"general",this.settingsOpen=!0,e==="config"?(Hn(this),we(this)):e==="logs"?(this.logsAtBottom=!0,sn(this,{reset:!0})):e==="debug"&&Mt(this)}closeSettings(){this.settingsOpen=!1}setSettingsSection(e){this.settingsSection=e,e==="config"?(Hn(this),we(this)):e==="logs"?(this.logsAtBottom=!0,sn(this,{reset:!0})):e==="debug"&&Mt(this)}handleOpenSidebar(e){this.sidebarCloseTimer!=null&&(window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=null),this.sidebarContent=e,this.sidebarError=null,this.sidebarOpen=!0}handleCloseSidebar(){this.sidebarOpen=!1,this.sidebarCloseTimer!=null&&window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=window.setTimeout(()=>{this.sidebarOpen||(this.sidebarContent=null,this.sidebarError=null,this.sidebarCloseTimer=null)},200)}handleSplitRatioChange(e){const t=Math.max(.4,Math.min(.7,e));this.splitRatio=t,this.applySettings({...this.settings,splitRatio:t})}setOnboardingStep(e){this.onboardingStep=e}setOnboardingLocale(e){this.onboardingLocale=e}setOnboardingProvider(e){this.onboardingSelectedProvider=e,e||(this.onboardingProviderApiKey="")}setOnboardingProviderApiKey(e){this.onboardingProviderApiKey=e}setOnboardingProviderSearchQuery(e){this.onboardingProviderSearchQuery=e}setOnboardingChannel(e){this.onboardingSelectedChannel=e,e||(this.onboardingChannelToken="")}setOnboardingChannelToken(e){this.onboardingChannelToken=e}onboardingGoogleLogin(){this.onboardingLoginStatus="loading",this.onboardingLoginError=null,setTimeout(()=>{this.onboardingLoginStatus="success",this.onboardingLoginDisplayName="Google User",this.onboardingLoginEmail="user@gmail.com",this.onboardingLoginAvatarUrl=null,this.onboardingIsExistingAccount=!1},1200)}onboardingGithubLogin(){this.onboardingLoginStatus="loading",this.onboardingLoginError=null,setTimeout(()=>{this.onboardingLoginStatus="success",this.onboardingLoginDisplayName="GitHub User",this.onboardingLoginEmail="user@github.com",this.onboardingLoginAvatarUrl=null,this.onboardingIsExistingAccount=!1},1200)}onboardingLogout(){this.onboardingLoginStatus="idle",this.onboardingLoginDisplayName=null,this.onboardingLoginAvatarUrl=null,this.onboardingLoginEmail=null,this.onboardingLoginError=null,this.onboardingIsExistingAccount=!1}finishOnboarding(){localStorage.setItem("opensoul.onboarding.done","1"),this.showOnboardingWizard=!1}render(){return Xb(this)}};x([$()],y.prototype,"settings",2);x([$()],y.prototype,"password",2);x([$()],y.prototype,"tab",2);x([$()],y.prototype,"onboarding",2);x([$()],y.prototype,"connected",2);x([$()],y.prototype,"theme",2);x([$()],y.prototype,"themeResolved",2);x([$()],y.prototype,"hello",2);x([$()],y.prototype,"lastError",2);x([$()],y.prototype,"eventLog",2);x([$()],y.prototype,"assistantName",2);x([$()],y.prototype,"assistantAvatar",2);x([$()],y.prototype,"assistantAgentId",2);x([$()],y.prototype,"sessionKey",2);x([$()],y.prototype,"chatLoading",2);x([$()],y.prototype,"chatSending",2);x([$()],y.prototype,"chatMessage",2);x([$()],y.prototype,"chatMessages",2);x([$()],y.prototype,"chatToolMessages",2);x([$()],y.prototype,"chatStream",2);x([$()],y.prototype,"chatStreamStartedAt",2);x([$()],y.prototype,"chatRunId",2);x([$()],y.prototype,"compactionStatus",2);x([$()],y.prototype,"chatAvatarUrl",2);x([$()],y.prototype,"chatThinkingLevel",2);x([$()],y.prototype,"chatQueue",2);x([$()],y.prototype,"chatAttachments",2);x([$()],y.prototype,"chatManualRefreshInFlight",2);x([$()],y.prototype,"sidebarOpen",2);x([$()],y.prototype,"sidebarContent",2);x([$()],y.prototype,"sidebarError",2);x([$()],y.prototype,"splitRatio",2);x([$()],y.prototype,"nodesLoading",2);x([$()],y.prototype,"nodes",2);x([$()],y.prototype,"devicesLoading",2);x([$()],y.prototype,"devicesError",2);x([$()],y.prototype,"devicesList",2);x([$()],y.prototype,"execApprovalsLoading",2);x([$()],y.prototype,"execApprovalsSaving",2);x([$()],y.prototype,"execApprovalsDirty",2);x([$()],y.prototype,"execApprovalsSnapshot",2);x([$()],y.prototype,"execApprovalsForm",2);x([$()],y.prototype,"execApprovalsSelectedAgent",2);x([$()],y.prototype,"execApprovalsTarget",2);x([$()],y.prototype,"execApprovalsTargetNodeId",2);x([$()],y.prototype,"execApprovalQueue",2);x([$()],y.prototype,"execApprovalBusy",2);x([$()],y.prototype,"execApprovalError",2);x([$()],y.prototype,"pendingGatewayUrl",2);x([$()],y.prototype,"configLoading",2);x([$()],y.prototype,"configRaw",2);x([$()],y.prototype,"configRawOriginal",2);x([$()],y.prototype,"configValid",2);x([$()],y.prototype,"configIssues",2);x([$()],y.prototype,"configSaving",2);x([$()],y.prototype,"configApplying",2);x([$()],y.prototype,"updateRunning",2);x([$()],y.prototype,"applySessionKey",2);x([$()],y.prototype,"configSnapshot",2);x([$()],y.prototype,"configSchema",2);x([$()],y.prototype,"configSchemaVersion",2);x([$()],y.prototype,"configSchemaLoading",2);x([$()],y.prototype,"configUiHints",2);x([$()],y.prototype,"configForm",2);x([$()],y.prototype,"configFormOriginal",2);x([$()],y.prototype,"configFormDirty",2);x([$()],y.prototype,"configFormMode",2);x([$()],y.prototype,"configSearchQuery",2);x([$()],y.prototype,"configActiveSection",2);x([$()],y.prototype,"configActiveSubsection",2);x([$()],y.prototype,"channelsLoading",2);x([$()],y.prototype,"channelsSnapshot",2);x([$()],y.prototype,"channelsError",2);x([$()],y.prototype,"channelsLastSuccess",2);x([$()],y.prototype,"whatsappLoginMessage",2);x([$()],y.prototype,"whatsappLoginQrDataUrl",2);x([$()],y.prototype,"whatsappLoginConnected",2);x([$()],y.prototype,"whatsappBusy",2);x([$()],y.prototype,"nostrProfileFormState",2);x([$()],y.prototype,"nostrProfileAccountId",2);x([$()],y.prototype,"presenceLoading",2);x([$()],y.prototype,"presenceEntries",2);x([$()],y.prototype,"presenceError",2);x([$()],y.prototype,"presenceStatus",2);x([$()],y.prototype,"agentsLoading",2);x([$()],y.prototype,"agentsList",2);x([$()],y.prototype,"agentsError",2);x([$()],y.prototype,"agentsSelectedId",2);x([$()],y.prototype,"agentsPanel",2);x([$()],y.prototype,"agentFilesLoading",2);x([$()],y.prototype,"agentFilesError",2);x([$()],y.prototype,"agentFilesList",2);x([$()],y.prototype,"agentFileContents",2);x([$()],y.prototype,"agentFileDrafts",2);x([$()],y.prototype,"agentFileActive",2);x([$()],y.prototype,"agentFileSaving",2);x([$()],y.prototype,"agentIdentityLoading",2);x([$()],y.prototype,"agentIdentityError",2);x([$()],y.prototype,"agentIdentityById",2);x([$()],y.prototype,"agentSkillsLoading",2);x([$()],y.prototype,"agentSkillsError",2);x([$()],y.prototype,"agentSkillsReport",2);x([$()],y.prototype,"agentSkillsAgentId",2);x([$()],y.prototype,"sessionsLoading",2);x([$()],y.prototype,"sessionsResult",2);x([$()],y.prototype,"sessionsError",2);x([$()],y.prototype,"sessionsFilterActive",2);x([$()],y.prototype,"sessionsFilterLimit",2);x([$()],y.prototype,"sessionsIncludeGlobal",2);x([$()],y.prototype,"sessionsIncludeUnknown",2);x([$()],y.prototype,"usageLoading",2);x([$()],y.prototype,"usageResult",2);x([$()],y.prototype,"usageCostSummary",2);x([$()],y.prototype,"usageError",2);x([$()],y.prototype,"usageStartDate",2);x([$()],y.prototype,"usageEndDate",2);x([$()],y.prototype,"usageSelectedSessions",2);x([$()],y.prototype,"usageSelectedDays",2);x([$()],y.prototype,"usageSelectedHours",2);x([$()],y.prototype,"usageChartMode",2);x([$()],y.prototype,"usageDailyChartMode",2);x([$()],y.prototype,"usageTimeSeriesMode",2);x([$()],y.prototype,"usageTimeSeriesBreakdownMode",2);x([$()],y.prototype,"usageTimeSeries",2);x([$()],y.prototype,"usageTimeSeriesLoading",2);x([$()],y.prototype,"usageSessionLogs",2);x([$()],y.prototype,"usageSessionLogsLoading",2);x([$()],y.prototype,"usageSessionLogsExpanded",2);x([$()],y.prototype,"usageQuery",2);x([$()],y.prototype,"usageQueryDraft",2);x([$()],y.prototype,"usageSessionSort",2);x([$()],y.prototype,"usageSessionSortDir",2);x([$()],y.prototype,"usageRecentSessions",2);x([$()],y.prototype,"usageTimeZone",2);x([$()],y.prototype,"usageContextExpanded",2);x([$()],y.prototype,"usageHeaderPinned",2);x([$()],y.prototype,"usageSessionsTab",2);x([$()],y.prototype,"usageVisibleColumns",2);x([$()],y.prototype,"usageLogFilterRoles",2);x([$()],y.prototype,"usageLogFilterTools",2);x([$()],y.prototype,"usageLogFilterHasTools",2);x([$()],y.prototype,"usageLogFilterQuery",2);x([$()],y.prototype,"cronLoading",2);x([$()],y.prototype,"cronJobs",2);x([$()],y.prototype,"cronStatus",2);x([$()],y.prototype,"cronError",2);x([$()],y.prototype,"cronForm",2);x([$()],y.prototype,"cronRunsJobId",2);x([$()],y.prototype,"cronRuns",2);x([$()],y.prototype,"cronBusy",2);x([$()],y.prototype,"skillsLoading",2);x([$()],y.prototype,"skillsReport",2);x([$()],y.prototype,"skillsError",2);x([$()],y.prototype,"skillsFilter",2);x([$()],y.prototype,"skillEdits",2);x([$()],y.prototype,"skillsBusyKey",2);x([$()],y.prototype,"skillMessages",2);x([$()],y.prototype,"debugLoading",2);x([$()],y.prototype,"debugStatus",2);x([$()],y.prototype,"debugHealth",2);x([$()],y.prototype,"debugModels",2);x([$()],y.prototype,"debugHeartbeat",2);x([$()],y.prototype,"debugCallMethod",2);x([$()],y.prototype,"debugCallParams",2);x([$()],y.prototype,"debugCallResult",2);x([$()],y.prototype,"debugCallError",2);x([$()],y.prototype,"logsLoading",2);x([$()],y.prototype,"logsError",2);x([$()],y.prototype,"logsFile",2);x([$()],y.prototype,"logsEntries",2);x([$()],y.prototype,"logsFilterText",2);x([$()],y.prototype,"logsLevelFilters",2);x([$()],y.prototype,"logsAutoFollow",2);x([$()],y.prototype,"logsTruncated",2);x([$()],y.prototype,"logsCursor",2);x([$()],y.prototype,"logsLastFetchAt",2);x([$()],y.prototype,"logsLimit",2);x([$()],y.prototype,"logsMaxBytes",2);x([$()],y.prototype,"logsAtBottom",2);x([$()],y.prototype,"settingsOpen",2);x([$()],y.prototype,"settingsSection",2);x([$()],y.prototype,"showOnboardingWizard",2);x([$()],y.prototype,"onboardingStep",2);x([$()],y.prototype,"onboardingLocale",2);x([$()],y.prototype,"onboardingLoginStatus",2);x([$()],y.prototype,"onboardingLoginDisplayName",2);x([$()],y.prototype,"onboardingLoginAvatarUrl",2);x([$()],y.prototype,"onboardingLoginEmail",2);x([$()],y.prototype,"onboardingLoginError",2);x([$()],y.prototype,"onboardingIsExistingAccount",2);x([$()],y.prototype,"onboardingSelectedProvider",2);x([$()],y.prototype,"onboardingProviderApiKey",2);x([$()],y.prototype,"onboardingProviderSearchQuery",2);x([$()],y.prototype,"onboardingSelectedChannel",2);x([$()],y.prototype,"onboardingChannelToken",2);x([$()],y.prototype,"chatNewMessagesBelow",2);y=x([kr("opensoul-app")],y);
//# sourceMappingURL=index-DLBzkEGL.js.map
