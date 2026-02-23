(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();const On=globalThis,Bi=On.ShadowRoot&&(On.ShadyCSS===void 0||On.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ui=Symbol(),Qo=new WeakMap;let Sr=class{constructor(t,n,s){if(this._$cssResult$=!0,s!==Ui)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(Bi&&t===void 0){const s=n!==void 0&&n.length===1;s&&(t=Qo.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Qo.set(n,t))}return t}toString(){return this.cssText}};const xc=e=>new Sr(typeof e=="string"?e:e+"",void 0,Ui),$c=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((s,i,o)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new Sr(n,e,Ui)},wc=(e,t)=>{if(Bi)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const s=document.createElement("style"),i=On.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=n.cssText,e.appendChild(s)}},Yo=Bi?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const s of t.cssRules)n+=s.cssText;return xc(n)})(e):e;const{is:kc,defineProperty:Sc,getOwnPropertyDescriptor:Ac,getOwnPropertyNames:Cc,getOwnPropertySymbols:Tc,getPrototypeOf:_c}=Object,is=globalThis,Zo=is.trustedTypes,Lc=Zo?Zo.emptyScript:"",Ec=is.reactiveElementPolyfillSupport,Jt=(e,t)=>e,Kn={toAttribute(e,t){switch(t){case Boolean:e=e?Lc:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},zi=(e,t)=>!kc(e,t),Jo={attribute:!0,type:String,converter:Kn,reflect:!1,useDefault:!1,hasChanged:zi};Symbol.metadata??=Symbol("metadata"),is.litPropertyMetadata??=new WeakMap;let Et=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=Jo){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,n);i!==void 0&&Sc(this.prototype,t,i)}}static getPropertyDescriptor(t,n,s){const{get:i,set:o}=Ac(this.prototype,t)??{get(){return this[n]},set(a){this[n]=a}};return{get:i,set(a){const l=i?.call(this);o?.call(this,a),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Jo}static _$Ei(){if(this.hasOwnProperty(Jt("elementProperties")))return;const t=_c(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Jt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Jt("properties"))){const n=this.properties,s=[...Cc(n),...Tc(n)];for(const i of s)this.createProperty(i,n[i])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[s,i]of n)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[n,s]of this.elementProperties){const i=this._$Eu(n,s);i!==void 0&&this._$Eh.set(i,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)n.unshift(Yo(i))}else t!==void 0&&n.push(Yo(t));return n}static _$Eu(t,n){const s=n.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const s of n.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return wc(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,n,s){this._$AK(t,s)}_$ET(t,n){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const o=(s.converter?.toAttribute!==void 0?s.converter:Kn).toAttribute(n,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,n){const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const o=s.getPropertyOptions(i),a=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:Kn;this._$Em=i;const l=a.fromAttribute(n,o.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(t,n,s,i=!1,o){if(t!==void 0){const a=this.constructor;if(i===!1&&(o=this[t]),s??=a.getPropertyOptions(t),!((s.hasChanged??zi)(o,n)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,s))))return;this.C(t,n,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:s,reflect:i,wrapped:o},a){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??n??this[t]),o!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(n=void 0),this._$AL.set(t,n)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[i,o]of s){const{wrapped:a}=o,l=this[i];a!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,o,l)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(n)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(n)}willUpdate(t){}_$AE(t){this._$EO?.forEach(n=>n.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(n=>this._$ET(n,this[n])),this._$EM()}updated(t){}firstUpdated(t){}};Et.elementStyles=[],Et.shadowRootOptions={mode:"open"},Et[Jt("elementProperties")]=new Map,Et[Jt("finalized")]=new Map,Ec?.({ReactiveElement:Et}),(is.reactiveElementVersions??=[]).push("2.1.2");const Hi=globalThis,Xo=e=>e,jn=Hi.trustedTypes,ea=jn?jn.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ar="$lit$",Ze=`lit$${Math.random().toFixed(9).slice(2)}$`,Cr="?"+Ze,Ic=`<${Cr}>`,vt=document,on=()=>vt.createComment(""),an=e=>e===null||typeof e!="object"&&typeof e!="function",Ki=Array.isArray,Mc=e=>Ki(e)||typeof e?.[Symbol.iterator]=="function",Ms=`[ 	
\f\r]`,zt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ta=/-->/g,na=/>/g,at=RegExp(`>|${Ms}(?:([^\\s"'>=/]+)(${Ms}*=${Ms}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),sa=/'/g,ia=/"/g,Tr=/^(?:script|style|textarea|title)$/i,_r=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),r=_r(1),An=_r(2),Xe=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),oa=new WeakMap,ht=vt.createTreeWalker(vt,129);function Lr(e,t){if(!Ki(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ea!==void 0?ea.createHTML(t):t}const Rc=(e,t)=>{const n=e.length-1,s=[];let i,o=t===2?"<svg>":t===3?"<math>":"",a=zt;for(let l=0;l<n;l++){const c=e[l];let u,g,p=-1,h=0;for(;h<c.length&&(a.lastIndex=h,g=a.exec(c),g!==null);)h=a.lastIndex,a===zt?g[1]==="!--"?a=ta:g[1]!==void 0?a=na:g[2]!==void 0?(Tr.test(g[2])&&(i=RegExp("</"+g[2],"g")),a=at):g[3]!==void 0&&(a=at):a===at?g[0]===">"?(a=i??zt,p=-1):g[1]===void 0?p=-2:(p=a.lastIndex-g[2].length,u=g[1],a=g[3]===void 0?at:g[3]==='"'?ia:sa):a===ia||a===sa?a=at:a===ta||a===na?a=zt:(a=at,i=void 0);const v=a===at&&e[l+1].startsWith("/>")?" ":"";o+=a===zt?c+Ic:p>=0?(s.push(u),c.slice(0,p)+Ar+c.slice(p)+Ze+v):c+Ze+(p===-2?l:v)}return[Lr(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};let ai=class Er{constructor({strings:t,_$litType$:n},s){let i;this.parts=[];let o=0,a=0;const l=t.length-1,c=this.parts,[u,g]=Rc(t,n);if(this.el=Er.createElement(u,s),ht.currentNode=this.el.content,n===2||n===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=ht.nextNode())!==null&&c.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const p of i.getAttributeNames())if(p.endsWith(Ar)){const h=g[a++],v=i.getAttribute(p).split(Ze),d=/([.?@])?(.*)/.exec(h);c.push({type:1,index:o,name:d[2],strings:v,ctor:d[1]==="."?Dc:d[1]==="?"?Nc:d[1]==="@"?Fc:as}),i.removeAttribute(p)}else p.startsWith(Ze)&&(c.push({type:6,index:o}),i.removeAttribute(p));if(Tr.test(i.tagName)){const p=i.textContent.split(Ze),h=p.length-1;if(h>0){i.textContent=jn?jn.emptyScript:"";for(let v=0;v<h;v++)i.append(p[v],on()),ht.nextNode(),c.push({type:2,index:++o});i.append(p[h],on())}}}else if(i.nodeType===8)if(i.data===Cr)c.push({type:2,index:o});else{let p=-1;for(;(p=i.data.indexOf(Ze,p+1))!==-1;)c.push({type:7,index:o}),p+=Ze.length-1}o++}}static createElement(t,n){const s=vt.createElement("template");return s.innerHTML=t,s}};function Rt(e,t,n=e,s){if(t===Xe)return t;let i=s!==void 0?n._$Co?.[s]:n._$Cl;const o=an(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(e),i._$AT(e,n,s)),s!==void 0?(n._$Co??=[])[s]=i:n._$Cl=i),i!==void 0&&(t=Rt(e,i._$AS(e,t.values),i,s)),t}class Pc{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:s}=this._$AD,i=(t?.creationScope??vt).importNode(n,!0);ht.currentNode=i;let o=ht.nextNode(),a=0,l=0,c=s[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new os(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Oc(o,this,t)),this._$AV.push(u),c=s[++l]}a!==c?.index&&(o=ht.nextNode(),a++)}return ht.currentNode=vt,i}p(t){let n=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,n),n+=s.strings.length-2):s._$AI(t[n])),n++}}let os=class Ir{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,s,i){this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Rt(this,t,n),an(t)?t===f||t==null||t===""?(this._$AH!==f&&this._$AR(),this._$AH=f):t!==this._$AH&&t!==Xe&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Mc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==f&&an(this._$AH)?this._$AA.nextSibling.data=t:this.T(vt.createTextNode(t)),this._$AH=t}$(t){const{values:n,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=ai.createElement(Lr(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(n);else{const o=new Pc(i,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=oa.get(t.strings);return n===void 0&&oa.set(t.strings,n=new ai(t)),n}k(t){Ki(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let s,i=0;for(const o of t)i===n.length?n.push(s=new Ir(this.O(on()),this.O(on()),this,this.options)):s=n[i],s._$AI(o),i++;i<n.length&&(this._$AR(s&&s._$AB.nextSibling,i),n.length=i)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){const s=Xo(t).nextSibling;Xo(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}};class as{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,s,i,o){this.type=1,this._$AH=f,this._$AN=void 0,this.element=t,this.name=n,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=f}_$AI(t,n=this,s,i){const o=this.strings;let a=!1;if(o===void 0)t=Rt(this,t,n,0),a=!an(t)||t!==this._$AH&&t!==Xe,a&&(this._$AH=t);else{const l=t;let c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Rt(this,l[s+c],n,c),u===Xe&&(u=this._$AH[c]),a||=!an(u)||u!==this._$AH[c],u===f?t=f:t!==f&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!i&&this.j(t)}j(t){t===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}let Dc=class extends as{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===f?void 0:t}},Nc=class extends as{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==f)}},Fc=class extends as{constructor(t,n,s,i,o){super(t,n,s,i,o),this.type=5}_$AI(t,n=this){if((t=Rt(this,t,n,0)??f)===Xe)return;const s=this._$AH,i=t===f&&s!==f||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==f&&(s===f||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Oc=class{constructor(t,n,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Rt(this,t)}};const Bc={I:os},Uc=Hi.litHtmlPolyfillSupport;Uc?.(ai,os),(Hi.litHtmlVersions??=[]).push("3.3.2");const zc=(e,t,n)=>{const s=n?.renderBefore??t;let i=s._$litPart$;if(i===void 0){const o=n?.renderBefore??null;s._$litPart$=i=new os(t.insertBefore(on(),o),o,void 0,n??{})}return i._$AI(e),i};const ji=globalThis;let Mt=class extends Et{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=zc(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Xe}};Mt._$litElement$=!0,Mt.finalized=!0,ji.litElementHydrateSupport?.({LitElement:Mt});const Hc=ji.litElementPolyfillSupport;Hc?.({LitElement:Mt});(ji.litElementVersions??=[]).push("4.2.2");const Mr=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};const Kc={attribute:!0,type:String,converter:Kn,reflect:!1,hasChanged:zi},jc=(e=Kc,t,n)=>{const{kind:s,metadata:i}=n;let o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),s==="setter"&&((e=Object.create(e)).wrapped=!0),o.set(n.name,e),s==="accessor"){const{name:a}=n;return{set(l){const c=t.get.call(this);t.set.call(this,l),this.requestUpdate(a,c,e,!0,l)},init(l){return l!==void 0&&this.C(a,void 0,e,l),l}}}if(s==="setter"){const{name:a}=n;return function(l){const c=this[a];t.call(this,l),this.requestUpdate(a,c,e,!0,l)}}throw Error("Unsupported decorator location: "+s)};function rs(e){return(t,n)=>typeof n=="object"?jc(e,t,n):((s,i,o)=>{const a=i.hasOwnProperty(o);return i.constructor.createProperty(o,s),a?Object.getOwnPropertyDescriptor(i,o):void 0})(e,t,n)}function k(e){return rs({...e,state:!0,attribute:!1})}async function $e(e,t){if(!(!e.client||!e.connected)&&!e.channelsLoading){e.channelsLoading=!0,e.channelsError=null;try{const n=await e.client.request("channels.status",{probe:t,timeoutMs:8e3});e.channelsSnapshot=n,e.channelsLastSuccess=Date.now()}catch(n){e.channelsError=String(n)}finally{e.channelsLoading=!1}}}async function Wc(e,t){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const n=await e.client.request("web.login.start",{force:t,timeoutMs:3e4});e.whatsappLoginMessage=n.message??null,e.whatsappLoginQrDataUrl=n.qrDataUrl??null,e.whatsappLoginConnected=null}catch(n){e.whatsappLoginMessage=String(n),e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function Gc(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const t=await e.client.request("web.login.wait",{timeoutMs:12e4});e.whatsappLoginMessage=t.message??null,e.whatsappLoginConnected=t.connected??null,t.connected&&(e.whatsappLoginQrDataUrl=null)}catch(t){e.whatsappLoginMessage=String(t),e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function qc(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{await e.client.request("channels.logout",{channel:"whatsapp"}),e.whatsappLoginMessage="Logged out.",e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}catch(t){e.whatsappLoginMessage=String(t)}finally{e.whatsappBusy=!1}}}function mt(e){return typeof structuredClone=="function"?structuredClone(e):JSON.parse(JSON.stringify(e))}function Pt(e){return`${JSON.stringify(e,null,2).trimEnd()}
`}function Rr(e,t,n){if(t.length===0)return;let s=e;for(let o=0;o<t.length-1;o+=1){const a=t[o],l=t[o+1];if(typeof a=="number"){if(!Array.isArray(s))return;s[a]==null&&(s[a]=typeof l=="number"?[]:{}),s=s[a]}else{if(typeof s!="object"||s==null)return;const c=s;c[a]==null&&(c[a]=typeof l=="number"?[]:{}),s=c[a]}}const i=t[t.length-1];if(typeof i=="number"){Array.isArray(s)&&(s[i]=n);return}typeof s=="object"&&s!=null&&(s[i]=n)}function Pr(e,t){if(t.length===0)return;let n=e;for(let i=0;i<t.length-1;i+=1){const o=t[i];if(typeof o=="number"){if(!Array.isArray(n))return;n=n[o]}else{if(typeof n!="object"||n==null)return;n=n[o]}if(n==null)return}const s=t[t.length-1];if(typeof s=="number"){Array.isArray(n)&&n.splice(s,1);return}typeof n=="object"&&n!=null&&delete n[s]}async function Se(e){if(!(!e.client||!e.connected)){e.configLoading=!0,e.lastError=null;try{const t=await e.client.request("config.get",{});Qc(e,t)}catch(t){e.lastError=String(t)}finally{e.configLoading=!1}}}async function Wn(e){if(!(!e.client||!e.connected)&&!e.configSchemaLoading){e.configSchemaLoading=!0;try{const t=await e.client.request("config.schema",{});Vc(e,t)}catch(t){e.lastError=String(t)}finally{e.configSchemaLoading=!1}}}function Vc(e,t){e.configSchema=t.schema??null,e.configUiHints=t.uiHints??{},e.configSchemaVersion=t.version??null}function Qc(e,t){e.configSnapshot=t;const n=typeof t.raw=="string"?t.raw:t.config&&typeof t.config=="object"?Pt(t.config):e.configRaw;!e.configFormDirty||e.configFormMode==="raw"?e.configRaw=n:e.configForm?e.configRaw=Pt(e.configForm):e.configRaw=n,e.configValid=typeof t.valid=="boolean"?t.valid:null,e.configIssues=Array.isArray(t.issues)?t.issues:[],e.configFormDirty||(e.configForm=mt(t.config??{}),e.configFormOriginal=mt(t.config??{}),e.configRawOriginal=n)}async function Bn(e){if(!(!e.client||!e.connected)){e.configSaving=!0,e.lastError=null;try{const t=e.configFormMode==="form"&&e.configForm?Pt(e.configForm):e.configRaw,n=e.configSnapshot?.hash;if(!n){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.set",{raw:t,baseHash:n}),e.configFormDirty=!1,await Se(e)}catch(t){e.lastError=String(t)}finally{e.configSaving=!1}}}async function Yc(e){if(!(!e.client||!e.connected)){e.configApplying=!0,e.lastError=null;try{const t=e.configFormMode==="form"&&e.configForm?Pt(e.configForm):e.configRaw,n=e.configSnapshot?.hash;if(!n){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.apply",{raw:t,baseHash:n,sessionKey:e.applySessionKey}),e.configFormDirty=!1,await Se(e)}catch(t){e.lastError=String(t)}finally{e.configApplying=!1}}}async function Zc(e){if(!(!e.client||!e.connected)){e.updateRunning=!0,e.lastError=null;try{await e.client.request("update.run",{sessionKey:e.applySessionKey})}catch(t){e.lastError=String(t)}finally{e.updateRunning=!1}}}function ke(e,t,n){const s=mt(e.configForm??e.configSnapshot?.config??{});Rr(s,t,n),e.configForm=s,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=Pt(s))}function je(e,t){const n=mt(e.configForm??e.configSnapshot?.config??{});Pr(n,t),e.configForm=n,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=Pt(n))}function Jc(e){const{values:t,original:n}=e;return t.name!==n.name||t.displayName!==n.displayName||t.about!==n.about||t.picture!==n.picture||t.banner!==n.banner||t.website!==n.website||t.nip05!==n.nip05||t.lud16!==n.lud16}function Xc(e){const{state:t,callbacks:n,accountId:s}=e,i=Jc(t),o=(l,c,u={})=>{const{type:g="text",placeholder:p,maxLength:h,help:v}=u,d=t.values[l]??"",m=t.fieldErrors[l],y=`nostr-profile-${l}`;return g==="textarea"?r`
        <div class="form-field" style="margin-bottom: 12px;">
          <label for="${y}" style="display: block; margin-bottom: 4px; font-weight: 500;">
            ${c}
          </label>
          <textarea
            id="${y}"
            .value=${d}
            placeholder=${p??""}
            maxlength=${h??2e3}
            rows="3"
            style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 4px; resize: vertical; font-family: inherit;"
            @input=${C=>{const b=C.target;n.onFieldChange(l,b.value)}}
            ?disabled=${t.saving}
          ></textarea>
          ${v?r`<div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${v}</div>`:f}
          ${m?r`<div style="font-size: 12px; color: var(--danger-color); margin-top: 2px;">${m}</div>`:f}
        </div>
      `:r`
      <div class="form-field" style="margin-bottom: 12px;">
        <label for="${y}" style="display: block; margin-bottom: 4px; font-weight: 500;">
          ${c}
        </label>
        <input
          id="${y}"
          type=${g}
          .value=${d}
          placeholder=${p??""}
          maxlength=${h??256}
          style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 4px;"
          @input=${C=>{const b=C.target;n.onFieldChange(l,b.value)}}
          ?disabled=${t.saving}
        />
        ${v?r`<div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${v}</div>`:f}
        ${m?r`<div style="font-size: 12px; color: var(--danger-color); margin-top: 2px;">${m}</div>`:f}
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
    `:f};return r`
    <div class="nostr-profile-form" style="padding: 16px; background: var(--bg-secondary); border-radius: 8px; margin-top: 12px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <div style="font-weight: 600; font-size: 16px;">Edit Profile</div>
        <div style="font-size: 12px; color: var(--text-muted);">Account: ${s}</div>
      </div>

      ${t.error?r`<div class="callout danger" style="margin-bottom: 12px;">${t.error}</div>`:f}

      ${t.success?r`<div class="callout success" style="margin-bottom: 12px;">${t.success}</div>`:f}

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
          `:f}

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
            `:f}
    </div>
  `}function ed(e){const t={name:e?.name??"",displayName:e?.displayName??"",about:e?.about??"",picture:e?.picture??"",banner:e?.banner??"",website:e?.website??"",nip05:e?.nip05??"",lud16:e?.lud16??""};return{values:t,original:{...t},saving:!1,importing:!1,error:null,success:null,fieldErrors:{},showAdvanced:!!(e?.banner||e?.website||e?.nip05||e?.lud16)}}async function td(e,t){await Wc(e,t),await $e(e,!0)}async function nd(e){await Gc(e),await $e(e,!0)}async function sd(e){await qc(e),await $e(e,!0)}async function id(e){await Bn(e),await Se(e),await $e(e,!0)}async function od(e){await Se(e),await $e(e,!0)}function ad(e){if(!Array.isArray(e))return{};const t={};for(const n of e){if(typeof n!="string")continue;const[s,...i]=n.split(":");if(!s||i.length===0)continue;const o=s.trim(),a=i.join(":").trim();o&&a&&(t[o]=a)}return t}function Dr(e){return(e.channelsSnapshot?.channelAccounts?.nostr??[])[0]?.accountId??e.nostrProfileAccountId??"default"}function Nr(e,t=""){return`/api/channels/nostr/${encodeURIComponent(e)}/profile${t}`}function rd(e,t,n){e.nostrProfileAccountId=t,e.nostrProfileFormState=ed(n??void 0)}function ld(e){e.nostrProfileFormState=null,e.nostrProfileAccountId=null}function cd(e,t,n){const s=e.nostrProfileFormState;s&&(e.nostrProfileFormState={...s,values:{...s.values,[t]:n},fieldErrors:{...s.fieldErrors,[t]:""}})}function dd(e){const t=e.nostrProfileFormState;t&&(e.nostrProfileFormState={...t,showAdvanced:!t.showAdvanced})}async function ud(e){const t=e.nostrProfileFormState;if(!t||t.saving)return;const n=Dr(e);e.nostrProfileFormState={...t,saving:!0,error:null,success:null,fieldErrors:{}};try{const s=await fetch(Nr(n),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t.values)}),i=await s.json().catch(()=>null);if(!s.ok||i?.ok===!1||!i){const o=i?.error??`Profile update failed (${s.status})`;e.nostrProfileFormState={...t,saving:!1,error:o,success:null,fieldErrors:ad(i?.details)};return}if(!i.persisted){e.nostrProfileFormState={...t,saving:!1,error:"Profile publish failed on all relays.",success:null};return}e.nostrProfileFormState={...t,saving:!1,error:null,success:"Profile published to relays.",fieldErrors:{},original:{...t.values}},await $e(e,!0)}catch(s){e.nostrProfileFormState={...t,saving:!1,error:`Profile update failed: ${String(s)}`,success:null}}}async function gd(e){const t=e.nostrProfileFormState;if(!t||t.importing)return;const n=Dr(e);e.nostrProfileFormState={...t,importing:!0,error:null,success:null};try{const s=await fetch(Nr(n,"/import"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({autoMerge:!0})}),i=await s.json().catch(()=>null);if(!s.ok||i?.ok===!1||!i){const c=i?.error??`Profile import failed (${s.status})`;e.nostrProfileFormState={...t,importing:!1,error:c,success:null};return}const o=i.merged??i.imported??null,a=o?{...t.values,...o}:t.values,l=!!(a.banner||a.website||a.nip05||a.lud16);e.nostrProfileFormState={...t,importing:!1,values:a,error:null,success:i.saved?"Profile imported from relays. Review and publish.":"Profile imported. Review and publish.",showAdvanced:l},i.saved&&await $e(e,!0)}catch(s){e.nostrProfileFormState={...t,importing:!1,error:`Profile import failed: ${String(s)}`,success:null}}}function Fr(e){const t=(e??"").trim();if(!t)return null;const n=t.split(":").filter(Boolean);if(n.length<3||n[0]!=="agent")return null;const s=n[1]?.trim(),i=n.slice(2).join(":");return!s||!i?null:{agentId:s,rest:i}}const ri=450;function pn(e,t=!1,n=!1){e.chatScrollFrame&&cancelAnimationFrame(e.chatScrollFrame),e.chatScrollTimeout!=null&&(clearTimeout(e.chatScrollTimeout),e.chatScrollTimeout=null);const s=()=>{const i=e.querySelector(".chat-thread");if(i){const o=getComputedStyle(i).overflowY;if(o==="auto"||o==="scroll"||i.scrollHeight-i.clientHeight>1)return i}return document.scrollingElement??document.documentElement};e.updateComplete.then(()=>{e.chatScrollFrame=requestAnimationFrame(()=>{e.chatScrollFrame=null;const i=s();if(!i)return;const o=i.scrollHeight-i.scrollTop-i.clientHeight,a=t&&!e.chatHasAutoScrolled;if(!(a||e.chatUserNearBottom||o<ri)){e.chatNewMessagesBelow=!0;return}a&&(e.chatHasAutoScrolled=!0);const c=n&&(typeof window>"u"||typeof window.matchMedia!="function"||!window.matchMedia("(prefers-reduced-motion: reduce)").matches),u=i.scrollHeight;typeof i.scrollTo=="function"?i.scrollTo({top:u,behavior:c?"smooth":"auto"}):i.scrollTop=u,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1;const g=a?150:120;e.chatScrollTimeout=window.setTimeout(()=>{e.chatScrollTimeout=null;const p=s();if(!p)return;const h=p.scrollHeight-p.scrollTop-p.clientHeight;(a||e.chatUserNearBottom||h<ri)&&(p.scrollTop=p.scrollHeight,e.chatUserNearBottom=!0)},g)})})}function Or(e,t=!1){e.logsScrollFrame&&cancelAnimationFrame(e.logsScrollFrame),e.updateComplete.then(()=>{e.logsScrollFrame=requestAnimationFrame(()=>{e.logsScrollFrame=null;const n=e.querySelector(".log-stream");if(!n)return;const s=n.scrollHeight-n.scrollTop-n.clientHeight;(t||s<80)&&(n.scrollTop=n.scrollHeight)})})}function pd(e,t){const n=t.currentTarget;if(!n)return;const s=n.scrollHeight-n.scrollTop-n.clientHeight;e.chatUserNearBottom=s<ri,e.chatUserNearBottom&&(e.chatNewMessagesBelow=!1)}function hd(e,t){const n=t.currentTarget;if(!n)return;const s=n.scrollHeight-n.scrollTop-n.clientHeight;e.logsAtBottom=s<80}function aa(e){e.chatHasAutoScrolled=!1,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1}function fd(e,t){if(e.length===0)return;const n=new Blob([`${e.join(`
`)}
`],{type:"text/plain"}),s=URL.createObjectURL(n),i=document.createElement("a"),o=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");i.href=s,i.download=`opensoul-logs-${t}-${o}.log`,i.click(),URL.revokeObjectURL(s)}function vd(e){if(typeof ResizeObserver>"u")return;const t=e.querySelector(".topbar");if(!t)return;const n=()=>{const{height:s}=t.getBoundingClientRect();e.style.setProperty("--topbar-height",`${s}px`)};n(),e.topbarObserver=new ResizeObserver(()=>n()),e.topbarObserver.observe(t)}async function Dt(e){if(!(!e.client||!e.connected)&&!e.debugLoading){e.debugLoading=!0;try{const[t,n,s,i]=await Promise.all([e.client.request("status",{}),e.client.request("health",{}),e.client.request("models.list",{}),e.client.request("last-heartbeat",{})]);e.debugStatus=t,e.debugHealth=n;const o=s;e.debugModels=Array.isArray(o?.models)?o?.models:[],e.debugHeartbeat=i}catch(t){e.debugCallError=String(t)}finally{e.debugLoading=!1}}}async function md(e){if(!(!e.client||!e.connected)){e.debugCallError=null,e.debugCallResult=null;try{const t=e.debugCallParams.trim()?JSON.parse(e.debugCallParams):{},n=await e.client.request(e.debugCallMethod.trim(),t);e.debugCallResult=JSON.stringify(n,null,2)}catch(t){e.debugCallError=String(t)}}}const bd=2e3,yd=new Set(["trace","debug","info","warn","error","fatal"]);function xd(e){if(typeof e!="string")return null;const t=e.trim();if(!t.startsWith("{")||!t.endsWith("}"))return null;try{const n=JSON.parse(t);return!n||typeof n!="object"?null:n}catch{return null}}function $d(e){if(typeof e!="string")return null;const t=e.toLowerCase();return yd.has(t)?t:null}function wd(e){if(!e.trim())return{raw:e,message:e};try{const t=JSON.parse(e),n=t&&typeof t._meta=="object"&&t._meta!==null?t._meta:null,s=typeof t.time=="string"?t.time:typeof n?.date=="string"?n?.date:null,i=$d(n?.logLevelName??n?.level),o=typeof t[0]=="string"?t[0]:typeof n?.name=="string"?n?.name:null,a=xd(o);let l=null;a&&(typeof a.subsystem=="string"?l=a.subsystem:typeof a.module=="string"&&(l=a.module)),!l&&o&&o.length<120&&(l=o);let c=null;return typeof t[1]=="string"?c=t[1]:!a&&typeof t[0]=="string"?c=t[0]:typeof t.message=="string"&&(c=t.message),{raw:e,time:s,level:i,subsystem:l,message:c??e,meta:n??void 0}}catch{return{raw:e,message:e}}}async function rn(e,t){if(!(!e.client||!e.connected)&&!(e.logsLoading&&!t?.quiet)){t?.quiet||(e.logsLoading=!0),e.logsError=null;try{const s=await e.client.request("logs.tail",{cursor:t?.reset?void 0:e.logsCursor??void 0,limit:e.logsLimit,maxBytes:e.logsMaxBytes}),o=(Array.isArray(s.lines)?s.lines.filter(l=>typeof l=="string"):[]).map(wd),a=!!(t?.reset||s.reset||e.logsCursor==null);e.logsEntries=a?o:[...e.logsEntries,...o].slice(-bd),typeof s.cursor=="number"&&(e.logsCursor=s.cursor),typeof s.file=="string"&&(e.logsFile=s.file),e.logsTruncated=!!s.truncated,e.logsLastFetchAt=Date.now()}catch(n){e.logsError=String(n)}finally{t?.quiet||(e.logsLoading=!1)}}}async function ls(e,t){if(!(!e.client||!e.connected)&&!e.nodesLoading){e.nodesLoading=!0,t?.quiet||(e.lastError=null);try{const n=await e.client.request("node.list",{});e.nodes=Array.isArray(n.nodes)?n.nodes:[]}catch(n){t?.quiet||(e.lastError=String(n))}finally{e.nodesLoading=!1}}}function kd(e){e.nodesPollInterval==null&&(e.nodesPollInterval=window.setInterval(()=>{ls(e,{quiet:!0})},5e3))}function Sd(e){e.nodesPollInterval!=null&&(clearInterval(e.nodesPollInterval),e.nodesPollInterval=null)}function Wi(e){e.logsPollInterval==null&&(e.logsPollInterval=window.setInterval(()=>{e.tab==="logs"&&rn(e,{quiet:!0})},2e3))}function Gi(e){e.logsPollInterval!=null&&(clearInterval(e.logsPollInterval),e.logsPollInterval=null)}function qi(e){e.debugPollInterval==null&&(e.debugPollInterval=window.setInterval(()=>{e.tab==="debug"&&Dt(e)},3e3))}function Vi(e){e.debugPollInterval!=null&&(clearInterval(e.debugPollInterval),e.debugPollInterval=null)}async function Br(e,t){if(!(!e.client||!e.connected||e.agentIdentityLoading)&&!e.agentIdentityById[t]){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{const n=await e.client.request("agent.identity.get",{agentId:t});n&&(e.agentIdentityById={...e.agentIdentityById,[t]:n})}catch(n){e.agentIdentityError=String(n)}finally{e.agentIdentityLoading=!1}}}async function Ur(e,t){if(!e.client||!e.connected||e.agentIdentityLoading)return;const n=t.filter(s=>!e.agentIdentityById[s]);if(n.length!==0){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{for(const s of n){const i=await e.client.request("agent.identity.get",{agentId:s});i&&(e.agentIdentityById={...e.agentIdentityById,[s]:i})}}catch(s){e.agentIdentityError=String(s)}finally{e.agentIdentityLoading=!1}}}async function Un(e,t){if(!(!e.client||!e.connected)&&!e.agentSkillsLoading){e.agentSkillsLoading=!0,e.agentSkillsError=null;try{const n=await e.client.request("skills.status",{agentId:t});n&&(e.agentSkillsReport=n,e.agentSkillsAgentId=t)}catch(n){e.agentSkillsError=String(n)}finally{e.agentSkillsLoading=!1}}}async function Qi(e){if(!(!e.client||!e.connected)&&!e.agentsLoading){e.agentsLoading=!0,e.agentsError=null;try{const t=await e.client.request("agents.list",{});if(t){e.agentsList=t;const n=e.agentsSelectedId,s=t.agents.some(i=>i.id===n);(!n||!s)&&(e.agentsSelectedId=t.defaultId??t.agents[0]?.id??null)}}catch(t){e.agentsError=String(t)}finally{e.agentsLoading=!1}}}function Yi(e,t){if(e==null||!Number.isFinite(e)||e<=0)return;if(e<1e3)return`${Math.round(e)}ms`;const n=t?.spaced?" ":"",s=Math.round(e/1e3),i=Math.floor(s/3600),o=Math.floor(s%3600/60),a=s%60;if(i>=24){const l=Math.floor(i/24),c=i%24;return c>0?`${l}d${n}${c}h`:`${l}d`}return i>0?o>0?`${i}h${n}${o}m`:`${i}h`:o>0?a>0?`${o}m${n}${a}s`:`${o}m`:`${a}s`}function Zi(e,t="n/a"){if(e==null||!Number.isFinite(e)||e<0)return t;if(e<1e3)return`${Math.round(e)}ms`;const n=Math.round(e/1e3);if(n<60)return`${n}s`;const s=Math.round(n/60);if(s<60)return`${s}m`;const i=Math.round(s/60);return i<24?`${i}h`:`${Math.round(i/24)}d`}function Y(e,t){const n=t?.fallback??"n/a";if(e==null||!Number.isFinite(e))return n;const s=Date.now()-e,i=Math.abs(s),o=s>=0,a=Math.round(i/1e3);if(a<60)return o?"just now":"in <1m";const l=Math.round(a/60);if(l<60)return o?`${l}m ago`:`in ${l}m`;const c=Math.round(l/60);if(c<48)return o?`${c}h ago`:`in ${c}h`;const u=Math.round(c/24);return o?`${u}d ago`:`in ${u}d`}const Ad=/<\s*\/?\s*(?:think(?:ing)?|thought|antthinking|final)\b/i,Cn=/<\s*\/?\s*final\b[^<>]*>/gi,ra=/<\s*(\/?)\s*(?:think(?:ing)?|thought|antthinking)\b[^<>]*>/gi;function la(e){const t=[],n=/(^|\n)(```|~~~)[^\n]*\n[\s\S]*?(?:\n\2(?:\n|$)|$)/g;for(const i of e.matchAll(n)){const o=(i.index??0)+i[1].length;t.push({start:o,end:o+i[0].length-i[1].length})}const s=/`+[^`]+`+/g;for(const i of e.matchAll(s)){const o=i.index??0,a=o+i[0].length;t.some(c=>o>=c.start&&a<=c.end)||t.push({start:o,end:a})}return t.sort((i,o)=>i.start-o.start),t}function ca(e,t){return t.some(n=>e>=n.start&&e<n.end)}function Cd(e,t){return e.trimStart()}function Td(e,t){if(!e||!Ad.test(e))return e;let n=e;if(Cn.test(n)){Cn.lastIndex=0;const l=[],c=la(n);for(const u of n.matchAll(Cn)){const g=u.index??0;l.push({start:g,length:u[0].length,inCode:ca(g,c)})}for(let u=l.length-1;u>=0;u--){const g=l[u];g.inCode||(n=n.slice(0,g.start)+n.slice(g.start+g.length))}}else Cn.lastIndex=0;const s=la(n);ra.lastIndex=0;let i="",o=0,a=!1;for(const l of n.matchAll(ra)){const c=l.index??0,u=l[1]==="/";ca(c,s)||(a?u&&(a=!1):(i+=n.slice(o,c),u||(a=!0)),o=c+l[0].length)}return i+=n.slice(o),Cd(i)}function bt(e){return!e&&e!==0?"n/a":new Date(e).toLocaleString()}function li(e){return!e||e.length===0?"none":e.filter(t=>!!(t&&t.trim())).join(", ")}function ci(e,t=120){return e.length<=t?e:`${e.slice(0,Math.max(0,t-1))}…`}function zr(e,t){return e.length<=t?{text:e,truncated:!1,total:e.length}:{text:e.slice(0,Math.max(0,t)),truncated:!0,total:e.length}}function Gn(e,t){const n=Number(e);return Number.isFinite(n)?n:t}function Rs(e){return Td(e)}async function hn(e){if(!(!e.client||!e.connected))try{const t=await e.client.request("cron.status",{});e.cronStatus=t}catch(t){e.cronError=String(t)}}async function cs(e){if(!(!e.client||!e.connected)&&!e.cronLoading){e.cronLoading=!0,e.cronError=null;try{const t=await e.client.request("cron.list",{includeDisabled:!0});e.cronJobs=Array.isArray(t.jobs)?t.jobs:[]}catch(t){e.cronError=String(t)}finally{e.cronLoading=!1}}}function _d(e){if(e.scheduleKind==="at"){const n=Date.parse(e.scheduleAt);if(!Number.isFinite(n))throw new Error("Invalid run time.");return{kind:"at",at:new Date(n).toISOString()}}if(e.scheduleKind==="every"){const n=Gn(e.everyAmount,0);if(n<=0)throw new Error("Invalid interval amount.");const s=e.everyUnit;return{kind:"every",everyMs:n*(s==="minutes"?6e4:s==="hours"?36e5:864e5)}}const t=e.cronExpr.trim();if(!t)throw new Error("Cron expression required.");return{kind:"cron",expr:t,tz:e.cronTz.trim()||void 0}}function Ld(e){if(e.payloadKind==="systemEvent"){const i=e.payloadText.trim();if(!i)throw new Error("System event text required.");return{kind:"systemEvent",text:i}}const t=e.payloadText.trim();if(!t)throw new Error("Agent message required.");const n={kind:"agentTurn",message:t},s=Gn(e.timeoutSeconds,0);return s>0&&(n.timeoutSeconds=s),n}async function Ed(e){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{const t=_d(e.cronForm),n=Ld(e.cronForm),s=e.cronForm.sessionTarget==="isolated"&&e.cronForm.payloadKind==="agentTurn"&&e.cronForm.deliveryMode?{mode:e.cronForm.deliveryMode==="announce"?"announce":"none",channel:e.cronForm.deliveryChannel.trim()||"last",to:e.cronForm.deliveryTo.trim()||void 0}:void 0,i=e.cronForm.agentId.trim(),o={name:e.cronForm.name.trim(),description:e.cronForm.description.trim()||void 0,agentId:i||void 0,enabled:e.cronForm.enabled,schedule:t,sessionTarget:e.cronForm.sessionTarget,wakeMode:e.cronForm.wakeMode,payload:n,delivery:s};if(!o.name)throw new Error("Name required.");await e.client.request("cron.add",o),e.cronForm={...e.cronForm,name:"",description:"",payloadText:""},await cs(e),await hn(e)}catch(t){e.cronError=String(t)}finally{e.cronBusy=!1}}}async function Id(e,t,n){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.update",{id:t.id,patch:{enabled:n}}),await cs(e),await hn(e)}catch(s){e.cronError=String(s)}finally{e.cronBusy=!1}}}async function Md(e,t){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.run",{id:t.id,mode:"force"}),await Hr(e,t.id)}catch(n){e.cronError=String(n)}finally{e.cronBusy=!1}}}async function Rd(e,t){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.remove",{id:t.id}),e.cronRunsJobId===t.id&&(e.cronRunsJobId=null,e.cronRuns=[]),await cs(e),await hn(e)}catch(n){e.cronError=String(n)}finally{e.cronBusy=!1}}}async function Hr(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("cron.runs",{id:t,limit:50});e.cronRunsJobId=t,e.cronRuns=Array.isArray(n.entries)?n.entries:[]}catch(n){e.cronError=String(n)}}const Kr="opensoul.device.auth.v1";function Ji(e){return e.trim()}function Pd(e){if(!Array.isArray(e))return[];const t=new Set;for(const n of e){const s=n.trim();s&&t.add(s)}return[...t].toSorted()}function Xi(){try{const e=window.localStorage.getItem(Kr);if(!e)return null;const t=JSON.parse(e);return!t||t.version!==1||!t.deviceId||typeof t.deviceId!="string"||!t.tokens||typeof t.tokens!="object"?null:t}catch{return null}}function jr(e){try{window.localStorage.setItem(Kr,JSON.stringify(e))}catch{}}function Dd(e){const t=Xi();if(!t||t.deviceId!==e.deviceId)return null;const n=Ji(e.role),s=t.tokens[n];return!s||typeof s.token!="string"?null:s}function Wr(e){const t=Ji(e.role),n={version:1,deviceId:e.deviceId,tokens:{}},s=Xi();s&&s.deviceId===e.deviceId&&(n.tokens={...s.tokens});const i={token:e.token,role:t,scopes:Pd(e.scopes),updatedAtMs:Date.now()};return n.tokens[t]=i,jr(n),i}function Gr(e){const t=Xi();if(!t||t.deviceId!==e.deviceId)return;const n=Ji(e.role);if(!t.tokens[n])return;const s={...t,tokens:{...t.tokens}};delete s.tokens[n],jr(s)}const qr={p:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,n:0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,h:8n,a:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,d:0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,Gx:0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,Gy:0x6666666666666666666666666666666666666666666666666666666666666658n},{p:pe,n:zn,Gx:da,Gy:ua,a:Ps,d:Ds,h:Nd}=qr,yt=32,eo=64,Fd=(...e)=>{"captureStackTrace"in Error&&typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(...e)},le=(e="")=>{const t=new Error(e);throw Fd(t,le),t},Od=e=>typeof e=="bigint",Bd=e=>typeof e=="string",Ud=e=>e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array",et=(e,t,n="")=>{const s=Ud(e),i=e?.length,o=t!==void 0;if(!s||o&&i!==t){const a=n&&`"${n}" `,l=o?` of length ${t}`:"",c=s?`length=${i}`:`type=${typeof e}`;le(a+"expected Uint8Array"+l+", got "+c)}return e},ds=e=>new Uint8Array(e),Vr=e=>Uint8Array.from(e),Qr=(e,t)=>e.toString(16).padStart(t,"0"),Yr=e=>Array.from(et(e)).map(t=>Qr(t,2)).join(""),We={_0:48,_9:57,A:65,F:70,a:97,f:102},ga=e=>{if(e>=We._0&&e<=We._9)return e-We._0;if(e>=We.A&&e<=We.F)return e-(We.A-10);if(e>=We.a&&e<=We.f)return e-(We.a-10)},Zr=e=>{const t="hex invalid";if(!Bd(e))return le(t);const n=e.length,s=n/2;if(n%2)return le(t);const i=ds(s);for(let o=0,a=0;o<s;o++,a+=2){const l=ga(e.charCodeAt(a)),c=ga(e.charCodeAt(a+1));if(l===void 0||c===void 0)return le(t);i[o]=l*16+c}return i},Jr=()=>globalThis?.crypto,zd=()=>Jr()?.subtle??le("crypto.subtle must be defined, consider polyfill"),ln=(...e)=>{const t=ds(e.reduce((s,i)=>s+et(i).length,0));let n=0;return e.forEach(s=>{t.set(s,n),n+=s.length}),t},Hd=(e=yt)=>Jr().getRandomValues(ds(e)),qn=BigInt,dt=(e,t,n,s="bad number: out of range")=>Od(e)&&t<=e&&e<n?e:le(s),O=(e,t=pe)=>{const n=e%t;return n>=0n?n:t+n},Xr=e=>O(e,zn),Kd=(e,t)=>{(e===0n||t<=0n)&&le("no inverse n="+e+" mod="+t);let n=O(e,t),s=t,i=0n,o=1n;for(;n!==0n;){const a=s/n,l=s%n,c=i-o*a;s=n,n=l,i=o,o=c}return s===1n?O(i,t):le("no inverse")},jd=e=>{const t=sl[e];return typeof t!="function"&&le("hashes."+e+" not set"),t},Ns=e=>e instanceof Ce?e:le("Point expected"),di=2n**256n;class Ce{static BASE;static ZERO;X;Y;Z;T;constructor(t,n,s,i){const o=di;this.X=dt(t,0n,o),this.Y=dt(n,0n,o),this.Z=dt(s,1n,o),this.T=dt(i,0n,o),Object.freeze(this)}static CURVE(){return qr}static fromAffine(t){return new Ce(t.x,t.y,1n,O(t.x*t.y))}static fromBytes(t,n=!1){const s=Ds,i=Vr(et(t,yt)),o=t[31];i[31]=o&-129;const a=tl(i);dt(a,0n,n?di:pe);const c=O(a*a),u=O(c-1n),g=O(s*c+1n);let{isValid:p,value:h}=Gd(u,g);p||le("bad point: y not sqrt");const v=(h&1n)===1n,d=(o&128)!==0;return!n&&h===0n&&d&&le("bad point: x==0, isLastByteOdd"),d!==v&&(h=O(-h)),new Ce(h,a,1n,O(h*a))}static fromHex(t,n){return Ce.fromBytes(Zr(t),n)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}assertValidity(){const t=Ps,n=Ds,s=this;if(s.is0())return le("bad point: ZERO");const{X:i,Y:o,Z:a,T:l}=s,c=O(i*i),u=O(o*o),g=O(a*a),p=O(g*g),h=O(c*t),v=O(g*O(h+u)),d=O(p+O(n*O(c*u)));if(v!==d)return le("bad point: equation left != right (1)");const m=O(i*o),y=O(a*l);return m!==y?le("bad point: equation left != right (2)"):this}equals(t){const{X:n,Y:s,Z:i}=this,{X:o,Y:a,Z:l}=Ns(t),c=O(n*l),u=O(o*i),g=O(s*l),p=O(a*i);return c===u&&g===p}is0(){return this.equals(It)}negate(){return new Ce(O(-this.X),this.Y,this.Z,O(-this.T))}double(){const{X:t,Y:n,Z:s}=this,i=Ps,o=O(t*t),a=O(n*n),l=O(2n*O(s*s)),c=O(i*o),u=t+n,g=O(O(u*u)-o-a),p=c+a,h=p-l,v=c-a,d=O(g*h),m=O(p*v),y=O(g*v),C=O(h*p);return new Ce(d,m,C,y)}add(t){const{X:n,Y:s,Z:i,T:o}=this,{X:a,Y:l,Z:c,T:u}=Ns(t),g=Ps,p=Ds,h=O(n*a),v=O(s*l),d=O(o*p*u),m=O(i*c),y=O((n+s)*(a+l)-h-v),C=O(m-d),b=O(m+d),S=O(v-g*h),A=O(y*C),T=O(b*S),M=O(y*S),E=O(C*b);return new Ce(A,T,E,M)}subtract(t){return this.add(Ns(t).negate())}multiply(t,n=!0){if(!n&&(t===0n||this.is0()))return It;if(dt(t,1n,zn),t===1n)return this;if(this.equals(xt))return su(t).p;let s=It,i=xt;for(let o=this;t>0n;o=o.double(),t>>=1n)t&1n?s=s.add(o):n&&(i=i.add(o));return s}multiplyUnsafe(t){return this.multiply(t,!1)}toAffine(){const{X:t,Y:n,Z:s}=this;if(this.equals(It))return{x:0n,y:1n};const i=Kd(s,pe);O(s*i)!==1n&&le("invalid inverse");const o=O(t*i),a=O(n*i);return{x:o,y:a}}toBytes(){const{x:t,y:n}=this.assertValidity().toAffine(),s=el(n);return s[31]|=t&1n?128:0,s}toHex(){return Yr(this.toBytes())}clearCofactor(){return this.multiply(qn(Nd),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let t=this.multiply(zn/2n,!1).double();return zn%2n&&(t=t.add(this)),t.is0()}}const xt=new Ce(da,ua,1n,O(da*ua)),It=new Ce(0n,1n,1n,0n);Ce.BASE=xt;Ce.ZERO=It;const el=e=>Zr(Qr(dt(e,0n,di),eo)).reverse(),tl=e=>qn("0x"+Yr(Vr(et(e)).reverse())),Pe=(e,t)=>{let n=e;for(;t-- >0n;)n*=n,n%=pe;return n},Wd=e=>{const n=e*e%pe*e%pe,s=Pe(n,2n)*n%pe,i=Pe(s,1n)*e%pe,o=Pe(i,5n)*i%pe,a=Pe(o,10n)*o%pe,l=Pe(a,20n)*a%pe,c=Pe(l,40n)*l%pe,u=Pe(c,80n)*c%pe,g=Pe(u,80n)*c%pe,p=Pe(g,10n)*o%pe;return{pow_p_5_8:Pe(p,2n)*e%pe,b2:n}},pa=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,Gd=(e,t)=>{const n=O(t*t*t),s=O(n*n*t),i=Wd(e*s).pow_p_5_8;let o=O(e*n*i);const a=O(t*o*o),l=o,c=O(o*pa),u=a===e,g=a===O(-e),p=a===O(-e*pa);return u&&(o=l),(g||p)&&(o=c),(O(o)&1n)===1n&&(o=O(-o)),{isValid:u||g,value:o}},ui=e=>Xr(tl(e)),to=(...e)=>sl.sha512Async(ln(...e)),qd=(...e)=>jd("sha512")(ln(...e)),nl=e=>{const t=e.slice(0,yt);t[0]&=248,t[31]&=127,t[31]|=64;const n=e.slice(yt,eo),s=ui(t),i=xt.multiply(s),o=i.toBytes();return{head:t,prefix:n,scalar:s,point:i,pointBytes:o}},no=e=>to(et(e,yt)).then(nl),Vd=e=>nl(qd(et(e,yt))),Qd=e=>no(e).then(t=>t.pointBytes),Yd=e=>to(e.hashable).then(e.finish),Zd=(e,t,n)=>{const{pointBytes:s,scalar:i}=e,o=ui(t),a=xt.multiply(o).toBytes();return{hashable:ln(a,s,n),finish:u=>{const g=Xr(o+ui(u)*i);return et(ln(a,el(g)),eo)}}},Jd=async(e,t)=>{const n=et(e),s=await no(t),i=await to(s.prefix,n);return Yd(Zd(s,i,n))},sl={sha512Async:async e=>{const t=zd(),n=ln(e);return ds(await t.digest("SHA-512",n.buffer))},sha512:void 0},Xd=(e=Hd(yt))=>e,eu={getExtendedPublicKeyAsync:no,getExtendedPublicKey:Vd,randomSecretKey:Xd},Vn=8,tu=256,il=Math.ceil(tu/Vn)+1,gi=2**(Vn-1),nu=()=>{const e=[];let t=xt,n=t;for(let s=0;s<il;s++){n=t,e.push(n);for(let i=1;i<gi;i++)n=n.add(t),e.push(n);t=n.double()}return e};let ha;const fa=(e,t)=>{const n=t.negate();return e?n:t},su=e=>{const t=ha||(ha=nu());let n=It,s=xt;const i=2**Vn,o=i,a=qn(i-1),l=qn(Vn);for(let c=0;c<il;c++){let u=Number(e&a);e>>=l,u>gi&&(u-=o,e+=1n);const g=c*gi,p=g,h=g+Math.abs(u)-1,v=c%2!==0,d=u<0;u===0?s=s.add(fa(v,t[p])):n=n.add(fa(d,t[h]))}return e!==0n&&le("invalid wnaf"),{p:n,f:s}},Fs="opensoul-device-identity-v1";function pi(e){let t="";for(const n of e)t+=String.fromCharCode(n);return btoa(t).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function ol(e){const t=e.replaceAll("-","+").replaceAll("_","/"),n=t+"=".repeat((4-t.length%4)%4),s=atob(n),i=new Uint8Array(s.length);for(let o=0;o<s.length;o+=1)i[o]=s.charCodeAt(o);return i}function iu(e){return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")}async function al(e){const t=await crypto.subtle.digest("SHA-256",e.slice().buffer);return iu(new Uint8Array(t))}async function ou(){const e=eu.randomSecretKey(),t=await Qd(e);return{deviceId:await al(t),publicKey:pi(t),privateKey:pi(e)}}async function so(){try{const n=localStorage.getItem(Fs);if(n){const s=JSON.parse(n);if(s?.version===1&&typeof s.deviceId=="string"&&typeof s.publicKey=="string"&&typeof s.privateKey=="string"){const i=await al(ol(s.publicKey));if(i!==s.deviceId){const o={...s,deviceId:i};return localStorage.setItem(Fs,JSON.stringify(o)),{deviceId:i,publicKey:s.publicKey,privateKey:s.privateKey}}return{deviceId:s.deviceId,publicKey:s.publicKey,privateKey:s.privateKey}}}}catch{}const e=await ou(),t={version:1,deviceId:e.deviceId,publicKey:e.publicKey,privateKey:e.privateKey,createdAtMs:Date.now()};return localStorage.setItem(Fs,JSON.stringify(t)),e}async function au(e,t){const n=ol(e),s=new TextEncoder().encode(t),i=await Jd(s,n);return pi(i)}async function tt(e,t){if(!(!e.client||!e.connected)&&!e.devicesLoading){e.devicesLoading=!0,t?.quiet||(e.devicesError=null);try{const n=await e.client.request("device.pair.list",{});e.devicesList={pending:Array.isArray(n?.pending)?n.pending:[],paired:Array.isArray(n?.paired)?n.paired:[]}}catch(n){t?.quiet||(e.devicesError=String(n))}finally{e.devicesLoading=!1}}}async function ru(e,t){if(!(!e.client||!e.connected))try{await e.client.request("device.pair.approve",{requestId:t}),await tt(e)}catch(n){e.devicesError=String(n)}}async function lu(e,t){if(!(!e.client||!e.connected||!window.confirm("Reject this device pairing request?")))try{await e.client.request("device.pair.reject",{requestId:t}),await tt(e)}catch(s){e.devicesError=String(s)}}async function cu(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("device.token.rotate",t);if(n?.token){const s=await so(),i=n.role??t.role;(n.deviceId===s.deviceId||t.deviceId===s.deviceId)&&Wr({deviceId:s.deviceId,role:i,token:n.token,scopes:n.scopes??t.scopes??[]}),window.prompt("New device token (copy and store securely):",n.token)}await tt(e)}catch(n){e.devicesError=String(n)}}async function du(e,t){if(!(!e.client||!e.connected||!window.confirm(`Revoke token for ${t.deviceId} (${t.role})?`)))try{await e.client.request("device.token.revoke",t);const s=await so();t.deviceId===s.deviceId&&Gr({deviceId:s.deviceId,role:t.role}),await tt(e)}catch(s){e.devicesError=String(s)}}function uu(e){if(!e||e.kind==="gateway")return{method:"exec.approvals.get",params:{}};const t=e.nodeId.trim();return t?{method:"exec.approvals.node.get",params:{nodeId:t}}:null}function gu(e,t){if(!e||e.kind==="gateway")return{method:"exec.approvals.set",params:t};const n=e.nodeId.trim();return n?{method:"exec.approvals.node.set",params:{...t,nodeId:n}}:null}async function io(e,t){if(!(!e.client||!e.connected)&&!e.execApprovalsLoading){e.execApprovalsLoading=!0,e.lastError=null;try{const n=uu(t);if(!n){e.lastError="Select a node before loading exec approvals.";return}const s=await e.client.request(n.method,n.params);pu(e,s)}catch(n){e.lastError=String(n)}finally{e.execApprovalsLoading=!1}}}function pu(e,t){e.execApprovalsSnapshot=t,e.execApprovalsDirty||(e.execApprovalsForm=mt(t.file??{}))}async function hu(e,t){if(!(!e.client||!e.connected)){e.execApprovalsSaving=!0,e.lastError=null;try{const n=e.execApprovalsSnapshot?.hash;if(!n){e.lastError="Exec approvals hash missing; reload and retry.";return}const s=e.execApprovalsForm??e.execApprovalsSnapshot?.file??{},i=gu(t,{file:s,baseHash:n});if(!i){e.lastError="Select a node before saving exec approvals.";return}await e.client.request(i.method,i.params),e.execApprovalsDirty=!1,await io(e,t)}catch(n){e.lastError=String(n)}finally{e.execApprovalsSaving=!1}}}function fu(e,t,n){const s=mt(e.execApprovalsForm??e.execApprovalsSnapshot?.file??{});Rr(s,t,n),e.execApprovalsForm=s,e.execApprovalsDirty=!0}function vu(e,t){const n=mt(e.execApprovalsForm??e.execApprovalsSnapshot?.file??{});Pr(n,t),e.execApprovalsForm=n,e.execApprovalsDirty=!0}async function oo(e){if(!(!e.client||!e.connected)&&!e.presenceLoading){e.presenceLoading=!0,e.presenceError=null,e.presenceStatus=null;try{const t=await e.client.request("system-presence",{});Array.isArray(t)?(e.presenceEntries=t,e.presenceStatus=t.length===0?"No instances yet.":null):(e.presenceEntries=[],e.presenceStatus="No presence payload.")}catch(t){e.presenceError=String(t)}finally{e.presenceLoading=!1}}}async function wt(e,t){if(!(!e.client||!e.connected)&&!e.sessionsLoading){e.sessionsLoading=!0,e.sessionsError=null;try{const n=t?.includeGlobal??e.sessionsIncludeGlobal,s=t?.includeUnknown??e.sessionsIncludeUnknown,i=t?.activeMinutes??Gn(e.sessionsFilterActive,0),o=t?.limit??Gn(e.sessionsFilterLimit,0),a={includeGlobal:n,includeUnknown:s};i>0&&(a.activeMinutes=i),o>0&&(a.limit=o);const l=await e.client.request("sessions.list",a);l&&(e.sessionsResult=l)}catch(n){e.sessionsError=String(n)}finally{e.sessionsLoading=!1}}}async function mu(e,t,n){if(!e.client||!e.connected)return;const s={key:t};"label"in n&&(s.label=n.label),"thinkingLevel"in n&&(s.thinkingLevel=n.thinkingLevel),"verboseLevel"in n&&(s.verboseLevel=n.verboseLevel),"reasoningLevel"in n&&(s.reasoningLevel=n.reasoningLevel);try{await e.client.request("sessions.patch",s),await wt(e)}catch(i){e.sessionsError=String(i)}}async function bu(e,t){if(!(!e.client||!e.connected||e.sessionsLoading||!window.confirm(`Delete session "${t}"?

Deletes the session entry and archives its transcript.`))){e.sessionsLoading=!0,e.sessionsError=null;try{await e.client.request("sessions.delete",{key:t,deleteTranscript:!0}),await wt(e)}catch(s){e.sessionsError=String(s)}finally{e.sessionsLoading=!1}}}function Nt(e,t,n){if(!t.trim())return;const s={...e.skillMessages};n?s[t]=n:delete s[t],e.skillMessages=s}function us(e){return e instanceof Error?e.message:String(e)}async function fn(e,t){if(t?.clearMessages&&Object.keys(e.skillMessages).length>0&&(e.skillMessages={}),!(!e.client||!e.connected)&&!e.skillsLoading){e.skillsLoading=!0,e.skillsError=null;try{const n=await e.client.request("skills.status",{});n&&(e.skillsReport=n)}catch(n){e.skillsError=us(n)}finally{e.skillsLoading=!1}}}function yu(e,t,n){e.skillEdits={...e.skillEdits,[t]:n}}async function xu(e,t,n){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{await e.client.request("skills.update",{skillKey:t,enabled:n}),await fn(e),Nt(e,t,{kind:"success",message:n?"Skill enabled":"Skill disabled"})}catch(s){const i=us(s);e.skillsError=i,Nt(e,t,{kind:"error",message:i})}finally{e.skillsBusyKey=null}}}async function $u(e,t){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const n=e.skillEdits[t]??"";await e.client.request("skills.update",{skillKey:t,apiKey:n}),await fn(e),Nt(e,t,{kind:"success",message:"API key saved"})}catch(n){const s=us(n);e.skillsError=s,Nt(e,t,{kind:"error",message:s})}finally{e.skillsBusyKey=null}}}async function wu(e,t,n,s){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const i=await e.client.request("skills.install",{name:n,installId:s,timeoutMs:12e4});await fn(e),Nt(e,t,{kind:"success",message:i?.message??"Installed"})}catch(i){const o=us(i);e.skillsError=o,Nt(e,t,{kind:"error",message:o})}finally{e.skillsBusyKey=null}}}function ku(){return!!window.__opensoul_bridge?.isDesktop}function Ot(){return window.__opensoul_bridge??null}function Su(){const e=Ot();e&&e.send("shell.ready",{version:"1.0"})}function va(e){const t=Ot();t&&t.send("shell.connectionStateChanged",{state:e})}function Au(e){const t=Ot();t&&t.send("shell.themeChanged",{theme:e})}function Cu(e,t){const n=Ot();n&&n.send("shell.tabChanged",{tab:e,title:t})}let hi=null;function Tu(e){const t=Ot();t&&(hi=e,t.on("host.init",n=>{e.onInit?.(n)}),t.on("host.themeChanged",n=>{const s=n;s?.theme&&e.onThemeChanged?.(s.theme)}),t.on("host.navigate",n=>{const s=n;s?.tab&&e.onNavigate?.(s.tab)}),t.on("host.focus",n=>{const s=n;s?.target&&e.onFocus?.(s.target)}),t.on("host.fileDrop",n=>{const s=n;s?.files&&e.onFileDrop?.(s.files)}),t.on("host.windowState",n=>{const s=n;s?.state&&e.onWindowState?.(s.state)}),t.on("host.settingsChanged",n=>{n&&typeof n=="object"&&e.onSettingsChanged?.(n)}),t.on("host.commandPalette",()=>{e.onCommandPalette?.()}),t.on("host.execApprovalResult",n=>{const s=n;s?.requestId!=null&&e.onExecApprovalResult?.(s.requestId,!!s.approved,!!s.remember)}),t.on("host.devicePairResult",n=>{const s=n;s?.requestId!=null&&e.onDevicePairResult?.(s.requestId,!!s.approved)}))}function _u(){const e=Ot();!e||!hi||(e.off("host.init"),e.off("host.themeChanged"),e.off("host.navigate"),e.off("host.focus"),e.off("host.fileDrop"),e.off("host.windowState"),e.off("host.settingsChanged"),e.off("host.commandPalette"),e.off("host.execApprovalResult"),e.off("host.devicePairResult"),hi=null)}const rl={stepOf:(e,t)=>`Step ${e} of ${t}`,langTitle:"Welcome to OpenSoul",langSubtitle:"Choose your preferred language to get started.",langLabel:"Language",loginTitle:"Sign In",loginSubtitle:"Sign in to sync your settings and unlock all features.",loginWithGoogle:"Continue with Google",loginWithGithub:"Continue with GitHub",loginOrDivider:"or",loginSkipHint:"You can skip this step and sign in later from Settings.",loginSkip:"Skip for now",loginLogout:"Sign out",loginSuccess:"Signed in",loginError:"Sign-in failed. Please try again.",providerTitle:"Choose an AI Provider",providerSubtitle:"Select one or more AI model providers. You can always change this later in Settings.",providerSearch:"Search providers…",providerNoneSelected:"No provider selected yet.",providerSkip:"Skip for now",providerApiKeyPlaceholder:"Paste your API key…",providerConnected:"Connected",channelTitle:"Connect a Channel",channelSubtitle:"Link a messaging platform so your AI companion can chat with you. You can skip and configure this later.",channelSkip:"Skip for now",channelTokenPlaceholder:"Paste bot token…",confirmTitle:"You're All Set!",confirmSubtitle:"Review your choices and launch OpenSoul.",confirmLogin:"Account",confirmLoginNone:"Not signed in (sign in later)",confirmLanguage:"Language",confirmProvider:"AI Provider",confirmProviderNone:"None (configure later)",confirmChannel:"Channel",confirmChannelNone:"None (configure later)",confirmLaunch:"Launch OpenSoul",next:"Next",back:"Back",skip:"Skip",finish:"Finish"},Lu={stepOf:(e,t)=>`第 ${e} 步，共 ${t} 步`,langTitle:"欢迎使用 OpenSoul",langSubtitle:"选择你偏好的语言以开始设置。",langLabel:"语言",loginTitle:"登录",loginSubtitle:"登录以同步你的设置并解锁所有功能。",loginWithGoogle:"使用 Google 登录",loginWithGithub:"使用 GitHub 登录",loginOrDivider:"或者",loginSkipHint:"你可以跳过此步骤，稍后在设置中登录。",loginSkip:"暂时跳过",loginLogout:"退出登录",loginSuccess:"已登录",loginError:"登录失败，请重试。",providerTitle:"选择 AI 提供商",providerSubtitle:"选择一个或多个 AI 模型提供商。你随时可以在设置中更改。",providerSearch:"搜索提供商…",providerNoneSelected:"尚未选择提供商。",providerSkip:"暂时跳过",providerApiKeyPlaceholder:"粘贴你的 API Key…",providerConnected:"已连接",channelTitle:"连接聊天渠道",channelSubtitle:"链接一个聊天平台，让你的 AI 伙伴与你对话。你也可以稍后配置。",channelSkip:"暂时跳过",channelTokenPlaceholder:"粘贴 Bot Token…",confirmTitle:"一切就绪！",confirmSubtitle:"检查你的选择，然后启动 OpenSoul。",confirmLogin:"账号",confirmLoginNone:"未登录（稍后登录）",confirmLanguage:"语言",confirmProvider:"AI 提供商",confirmProviderNone:"无（稍后配置）",confirmChannel:"聊天渠道",confirmChannelNone:"无（稍后配置）",confirmLaunch:"启动 OpenSoul",next:"下一步",back:"上一步",skip:"跳过",finish:"完成"},Eu={stepOf:(e,t)=>`第 ${e} 步，共 ${t} 步`,langTitle:"歡迎使用 OpenSoul",langSubtitle:"選擇你偏好的語言以開始設定。",langLabel:"語言",loginTitle:"登入",loginSubtitle:"登入以同步你的設定並解鎖所有功能。",loginWithGoogle:"使用 Google 登入",loginWithGithub:"使用 GitHub 登入",loginOrDivider:"或者",loginSkipHint:"你可以跳過此步驟，稍後在設定中登入。",loginSkip:"暫時跳過",loginLogout:"登出",loginSuccess:"已登入",loginError:"登入失敗，請重試。",providerTitle:"選擇 AI 提供商",providerSubtitle:"選擇一個或多個 AI 模型提供商。你隨時可以在設定中更改。",providerSearch:"搜尋提供商…",providerNoneSelected:"尚未選擇提供商。",providerSkip:"暫時跳過",providerApiKeyPlaceholder:"貼上你的 API Key…",providerConnected:"已連接",channelTitle:"連接聊天頻道",channelSubtitle:"連結一個聊天平台，讓你的 AI 夥伴與你對話。你也可以稍後設定。",channelSkip:"暫時跳過",channelTokenPlaceholder:"貼上 Bot Token…",confirmTitle:"一切就緒！",confirmSubtitle:"檢查你的選擇，然後啟動 OpenSoul。",confirmLogin:"帳號",confirmLoginNone:"未登入（稍後登入）",confirmLanguage:"語言",confirmProvider:"AI 提供商",confirmProviderNone:"無（稍後設定）",confirmChannel:"聊天頻道",confirmChannelNone:"無（稍後設定）",confirmLaunch:"啟動 OpenSoul",next:"下一步",back:"上一步",skip:"跳過",finish:"完成"},Iu={stepOf:(e,t)=>`ステップ ${e} / ${t}`,langTitle:"OpenSoul へようこそ",langSubtitle:"お好みの言語を選択してください。",langLabel:"言語",loginTitle:"サインイン",loginSubtitle:"サインインして設定を同期し、すべての機能を利用しましょう。",loginWithGoogle:"Google で続ける",loginWithGithub:"GitHub で続ける",loginOrDivider:"または",loginSkipHint:"このステップをスキップして、後で設定からサインインできます。",loginSkip:"スキップ",loginLogout:"サインアウト",loginSuccess:"サインイン済み",loginError:"サインインに失敗しました。もう一度お試しください。",providerTitle:"AI プロバイダーを選択",providerSubtitle:"1つ以上のAIモデルプロバイダーを選択してください。設定でいつでも変更できます。",providerSearch:"プロバイダーを検索…",providerNoneSelected:"プロバイダーが選択されていません。",providerSkip:"スキップ",providerApiKeyPlaceholder:"API キーを貼り付け…",providerConnected:"接続済み",channelTitle:"チャンネルを接続",channelSubtitle:"メッセージングプラットフォームを接続して、AIコンパニオンとチャットしましょう。後で設定することもできます。",channelSkip:"スキップ",channelTokenPlaceholder:"ボットトークンを貼り付け…",confirmTitle:"準備完了！",confirmSubtitle:"設定を確認して、OpenSoul を起動します。",confirmLogin:"アカウント",confirmLoginNone:"未サインイン（後でサインイン）",confirmLanguage:"言語",confirmProvider:"AI プロバイダー",confirmProviderNone:"なし（後で設定）",confirmChannel:"チャンネル",confirmChannelNone:"なし（後で設定）",confirmLaunch:"OpenSoul を起動",next:"次へ",back:"戻る",skip:"スキップ",finish:"完了"},Mu={stepOf:(e,t)=>`${t}단계 중 ${e}단계`,langTitle:"OpenSoul에 오신 것을 환영합니다",langSubtitle:"원하는 언어를 선택하세요.",langLabel:"언어",loginTitle:"로그인",loginSubtitle:"로그인하여 설정을 동기화하고 모든 기능을 잠금 해제하세요.",loginWithGoogle:"Google로 계속",loginWithGithub:"GitHub로 계속",loginOrDivider:"또는",loginSkipHint:"이 단계를 건너뛰고 나중에 설정에서 로그인할 수 있습니다.",loginSkip:"건너뛰기",loginLogout:"로그아웃",loginSuccess:"로그인됨",loginError:"로그인에 실패했습니다. 다시 시도해 주세요.",providerTitle:"AI 제공자 선택",providerSubtitle:"하나 이상의 AI 모델 제공자를 선택하세요. 설정에서 언제든지 변경할 수 있습니다.",providerSearch:"제공자 검색…",providerNoneSelected:"선택된 제공자가 없습니다.",providerSkip:"건너뛰기",providerApiKeyPlaceholder:"API 키를 붙여넣기…",providerConnected:"연결됨",channelTitle:"채널 연결",channelSubtitle:"메시징 플랫폼을 연결하여 AI 동반자와 대화하세요. 나중에 설정할 수도 있습니다.",channelSkip:"건너뛰기",channelTokenPlaceholder:"봇 토큰 붙여넣기…",confirmTitle:"모두 준비되었습니다!",confirmSubtitle:"선택 사항을 검토하고 OpenSoul을 시작하세요.",confirmLogin:"계정",confirmLoginNone:"미로그인 (나중에 로그인)",confirmLanguage:"언어",confirmProvider:"AI 제공자",confirmProviderNone:"없음 (나중에 설정)",confirmChannel:"채널",confirmChannelNone:"없음 (나중에 설정)",confirmLaunch:"OpenSoul 시작",next:"다음",back:"뒤로",skip:"건너뛰기",finish:"완료"},Ru={stepOf:(e,t)=>`Paso ${e} de ${t}`,langTitle:"Bienvenido a OpenSoul",langSubtitle:"Elige tu idioma preferido para comenzar.",langLabel:"Idioma",providerTitle:"Elige un proveedor de IA",providerSubtitle:"Selecciona uno o más proveedores de modelos de IA. Puedes cambiarlo en Configuración.",providerSearch:"Buscar proveedores…",providerNoneSelected:"Ningún proveedor seleccionado.",providerSkip:"Omitir por ahora",providerApiKeyPlaceholder:"Pega tu API key…",providerConnected:"Conectado",channelTitle:"Conectar un canal",channelSubtitle:"Vincula una plataforma de mensajería. Puedes configurarlo después.",channelSkip:"Omitir por ahora",channelTokenPlaceholder:"Pega el token del bot…",confirmTogin:"Cuenta",confirmLoginNone:"Sin iniciar sesión (iniciar sesión después)",confirmLitle:"¡Todo listo!",confirmSubtitle:"Revisa tus opciones e inicia OpenSoul.",confirmLanguage:"Idioma",confirmProvider:"Proveedor de IA",confirmProviderNone:"Ninguno (configurar después)",confirmChannel:"Canal",confirmChannelNone:"Ninguno (configurar después)",confirmLaunch:"Iniciar OpenSoul",next:"Siguiente",back:"Atrás",skip:"Omitir",finish:"Finalizar"},Pu={stepOf:(e,t)=>`Étape ${e} sur ${t}`,langTitle:"Bienvenue sur OpenSoul",langSubtitle:"Choisissez votre langue préférée pour commencer.",langLabel:"Langue",providerTitle:"Choisir un fournisseur IA",providerSubtitle:"Sélectionnez un ou plusieurs fournisseurs de modèles IA. Modifiable dans les paramètres.",providerSearch:"Rechercher…",providerNoneSelected:"Aucun fournisseur sélectionné.",providerSkip:"Passer pour l'instant",providerApiKeyPlaceholder:"Collez votre clé API…",providerConnected:"Connecté",channelTitle:"Connecter un canal",channelSubtitle:"Liez une plateforme de messagerie. Vous pouvez configurer plus tard.",channelSogin:"Compte",confirmLoginNone:"Non connecté (se connecter plus tard)",confirmLkip:"Passer pour l'instant",channelTokenPlaceholder:"Collez le token du bot…",confirmTitle:"Tout est prêt !",confirmSubtitle:"Vérifiez vos choix et lancez OpenSoul.",confirmLanguage:"Langue",confirmProvider:"Fournisseur IA",confirmProviderNone:"Aucun (configurer plus tard)",confirmChannel:"Canal",confirmChannelNone:"Aucun (configurer plus tard)",confirmLaunch:"Lancer OpenSoul",next:"Suivant",back:"Retour",skip:"Passer",finish:"Terminer"},Du={stepOf:(e,t)=>`Schritt ${e} von ${t}`,langTitle:"Willkommen bei OpenSoul",langSubtitle:"Wähle deine bevorzugte Sprache.",langLabel:"Sprache",loginTitle:"Anmelden",loginSubtitle:"Melde dich an, um deine Einstellungen zu synchronisieren und alle Funktionen freizuschalten.",loginWithGoogle:"Weiter mit Google",loginWithGithub:"Weiter mit GitHub",loginOrDivider:"oder",loginSkipHint:"Du kannst diesen Schritt überspringen und dich später in den Einstellungen anmelden.",loginSkip:"Vorerst überspringen",loginLogout:"Abmelden",loginSuccess:"Angemeldet",loginError:"Anmeldung fehlgeschlagen. Bitte versuche es erneut.",providerTitle:"KI-Anbieter wählen",providerSubtitle:"Wähle einen oder mehrere KI-Modellanbieter. Du kannst dies jederzeit in den Einstellungen ändern.",providerSearch:"Anbieter suchen…",providerNoneSelected:"Kein Anbieter ausgewählt.",providerSkip:"Vorerst überspringen",providerApiKeyPlaceholder:"API-Schlüssel einfügen…",providerConnected:"Verbunden",channelTitle:"Kanal verbinden",channelSubtitle:"Verbinde eine Messaging-Plattform. Du kannst dies später konfigurieren.",channelSkip:"Vorerst überspringen",channelTokenPlaceholder:"Bot-Token einfügen…",confirmTitle:"Alles bereit!",confirmSubtitle:"Überprüfe deine Auswahl und starte OpenSoul.",confirmLogin:"Konto",confirmLoginNone:"Nicht angemeldet (später anmelden)",confirmLanguage:"Sprache",confirmProvider:"KI-Anbieter",confirmProviderNone:"Keiner (später konfigurieren)",confirmChannel:"Kanal",confirmChannelNone:"Keiner (später konfigurieren)",confirmLaunch:"OpenSoul starten",next:"Weiter",back:"Zurück",skip:"Überspringen",finish:"Fertig"},Nu={stepOf:(e,t)=>`Passo ${e} de ${t}`,langTitle:"Bem-vindo ao OpenSoul",langSubtitle:"Escolha seu idioma preferido para começar.",langLabel:"Idioma",loginTitle:"Entrar",loginSubtitle:"Entre para sincronizar suas configurações e desbloquear todos os recursos.",loginWithGoogle:"Continuar com Google",loginWithGithub:"Continuar com GitHub",loginOrDivider:"ou",loginSkipHint:"Você pode pular esta etapa e entrar mais tarde nas configurações.",loginSkip:"Pular por enquanto",loginLogout:"Sair",loginSuccess:"Conectado",loginError:"Falha ao entrar. Tente novamente.",providerTitle:"Escolha um provedor de IA",providerSubtitle:"Selecione um ou mais provedores de modelos de IA. Você pode alterar nas configurações.",providerSearch:"Buscar provedores…",providerNoneSelected:"Nenhum provedor selecionado.",providerSkip:"Pular por enquanto",providerApiKeyPlaceholder:"Cole sua chave API…",providerConnected:"Conectado",channelTitle:"Conectar um canal",channelSubtitle:"Vincule uma plataforma de mensagens. Você pode configurar depois.",channelSkip:"Pular por enquanto",channelTokenPlaceholder:"Cole o token do bot…",confirmTogin:"Conta",confirmLoginNone:"Não conectado (conectar depois)",confirmLitle:"Tudo pronto!",confirmSubtitle:"Revise suas escolhas e inicie o OpenSoul.",confirmLanguage:"Idioma",confirmProvider:"Provedor de IA",confirmProviderNone:"Nenhum (configurar depois)",confirmChannel:"Canal",confirmChannelNone:"Nenhum (configurar depois)",confirmLaunch:"Iniciar OpenSoul",next:"Próximo",back:"Voltar",skip:"Pular",finish:"Concluir"},Fu={stepOf:(e,t)=>`Шаг ${e} из ${t}`,langTitle:"Добро пожаловать в OpenSoul",langSubtitle:"Выберите предпочитаемый язык.",langLabel:"Язык",providerTitle:"Выберите провайдера ИИ",providerSubtitle:"Выберите одного или нескольких провайдеров. Вы всегда можете изменить это в настройках.",providerSearch:"Поиск провайдеров…",providerNoneSelected:"Провайдер не выбран.",providerSkip:"Пропустить",providerApiKeyPlaceholder:"Вставьте API ключ…",providerConnected:"Подключено",channelTitle:"Подключить канал",channelSubtitle:"Подключите мессенджер. Вы можете настроить это позже.",channelSkip:"Пропустить",channelTokenPlaceholder:"Вставьте токен бота…",confirmTogin:"Аккаунт",confirmLoginNone:"Не выполнен вход (войти позже)",confirmLitle:"Всё готово!",confirmSubtitle:"Проверьте настройки и запустите OpenSoul.",confirmLanguage:"Язык",confirmProvider:"Провайдер ИИ",confirmProviderNone:"Нет (настроить позже)",confirmChannel:"Канал",confirmChannelNone:"Нет (настроить позже)",confirmLaunch:"Запустить OpenSoul",next:"Далее",back:"Назад",skip:"Пропустить",finish:"Готово"},Ou={en:rl,"zh-CN":Lu,"zh-TW":Eu,ja:Iu,ko:Mu,es:Ru,fr:Pu,de:Du,"pt-BR":Nu,ru:Fu},gs=[{value:"en",label:"English",nativeLabel:"English"},{value:"zh-CN",label:"Chinese (Simplified)",nativeLabel:"简体中文"},{value:"zh-TW",label:"Chinese (Traditional)",nativeLabel:"繁體中文"},{value:"ja",label:"Japanese",nativeLabel:"日本語"},{value:"ko",label:"Korean",nativeLabel:"한국어"},{value:"es",label:"Spanish",nativeLabel:"Español"},{value:"fr",label:"French",nativeLabel:"Français"},{value:"de",label:"German",nativeLabel:"Deutsch"},{value:"pt-BR",label:"Portuguese (Brazil)",nativeLabel:"Português (Brasil)"},{value:"ru",label:"Russian",nativeLabel:"Русский"}];function nt(e){return Ou[e]??rl}function fi(){const t=(navigator.language??"en").toLowerCase();return t.startsWith("zh-tw")||t.startsWith("zh-hant")?"zh-TW":t.startsWith("zh")?"zh-CN":t.startsWith("ja")?"ja":t.startsWith("ko")?"ko":t.startsWith("es")?"es":t.startsWith("fr")?"fr":t.startsWith("de")?"de":t.startsWith("pt")?"pt-BR":t.startsWith("ru")?"ru":"en"}const ll="opensoul.ui.locale",Bu=new Set(gs.map(e=>e.value));function Qn(e){const t=String(e??"").trim();return Bu.has(t)?t:fi()}function cl(){if(typeof localStorage>"u")return fi();try{return Qn(localStorage.getItem(ll))}catch{return fi()}}function Os(e){if(typeof document<"u"&&(document.documentElement.lang=e),!(typeof localStorage>"u"))try{localStorage.setItem(ll,e)}catch{}}function Uu(e){return String(e??"").trim().toLowerCase().startsWith("zh")}function W(e,t,n){return Uu(e)?n:t}const zu=[{label:"Assist",tabs:["chat"]},{label:"Operate",tabs:["channels","instances","sessions","usage","cron"]},{label:"Build",tabs:["agents","skills","nodes"]},{label:"System",tabs:["overview"]}],dl=["config","logs","debug"],ul={agents:"/agents",overview:"/overview",channels:"/channels",instances:"/instances",sessions:"/sessions",usage:"/usage",cron:"/cron",skills:"/skills",nodes:"/nodes",chat:"/chat",config:"/config",debug:"/debug",logs:"/logs"},gl=new Map(Object.entries(ul).map(([e,t])=>[t,e]));function vn(e){if(!e)return"";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t==="/"?"":(t.endsWith("/")&&(t=t.slice(0,-1)),t)}function cn(e){if(!e)return"/";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t.length>1&&t.endsWith("/")&&(t=t.slice(0,-1)),t}function ps(e,t=""){const n=vn(t),s=ul[e];return n?`${n}${s}`:s}function ao(e,t=""){const n=vn(t);let s=e||"/";n&&(s===n?s="/":s.startsWith(`${n}/`)&&(s=s.slice(n.length)));let i=cn(s).toLowerCase();return i.endsWith("/index.html")&&(i="/"),i==="/"?"chat":gl.get(i)??null}function Hu(e){let t=cn(e);if(t.endsWith("/index.html")&&(t=cn(t.slice(0,-11))),t==="/")return"";const n=t.split("/").filter(Boolean);if(n.length===0)return"";for(let s=0;s<n.length;s++){const i=`/${n.slice(s).join("/")}`.toLowerCase();if(gl.has(i)){const o=n.slice(0,s);return o.length?`/${o.join("/")}`:""}}return`/${n.join("/")}`}function Ku(e){switch(e){case"agents":return"folder";case"chat":return"messageSquare";case"overview":return"barChart";case"channels":return"link";case"instances":return"radio";case"sessions":return"fileText";case"usage":return"barChart";case"cron":return"loader";case"skills":return"zap";case"nodes":return"monitor";case"config":return"settings";case"debug":return"bug";case"logs":return"scrollText";default:return"folder"}}function ju(e,t){switch(e){case"Assist":return W(t,"Assist","助手");case"Operate":return W(t,"Operate","运维");case"Build":return W(t,"Build","构建");case"System":return W(t,"System","系统");default:return e}}function ro(e,t){switch(e){case"agents":return W(t,"Agents","代理");case"overview":return W(t,"Overview","总览");case"channels":return W(t,"Channels","渠道");case"instances":return W(t,"Instances","实例");case"sessions":return W(t,"Sessions","会话");case"usage":return W(t,"Usage","用量");case"cron":return W(t,"Cron Jobs","定时任务");case"skills":return W(t,"Skills","技能");case"nodes":return W(t,"Nodes","节点");case"chat":return W(t,"Chat","聊天");case"config":return W(t,"Config","配置");case"debug":return W(t,"Debug","调试");case"logs":return W(t,"Logs","日志");default:return W(t,"Control","控制台")}}function Wu(e,t){switch(e){case"agents":return W(t,"Build and manage agent workspaces, tools, and identities.","构建和管理代理工作区、工具与身份信息。");case"overview":return W(t,"System health, entry points, and fast operational diagnostics.","系统健康状态、入口与快速运维诊断。");case"channels":return W(t,"Operate and monitor channel connectivity and settings.","运营并监控渠道连接与配置。");case"instances":return W(t,"Live presence beacons from connected clients and nodes.","来自已连接客户端与节点的在线状态信标。");case"sessions":return W(t,"Inspect active sessions and adjust per-session behavior.","查看活跃会话并调整每个会话的行为。");case"usage":return"";case"cron":return W(t,"Schedule wakeups and recurring automated agent runs.","安排唤醒与周期性自动代理执行。");case"skills":return W(t,"Manage skill availability and API key injection across agents.","管理技能可用性与跨代理 API Key 注入。");case"nodes":return W(t,"Manage paired devices, capabilities, and command exposure.","管理配对设备、能力与命令暴露。");case"chat":return W(t,"Direct assistant workspace for fast interventions and control.","直接与助手交互的工作区，用于快速控制与干预。");case"config":return W(t,"Edit ~/.opensoul/opensoul.json with schema-aware safeguards.","以 schema 感知保护编辑 ~/.opensoul/opensoul.json。");case"debug":return W(t,"Advanced snapshots, event inspection, and manual RPC calls.","高级快照、事件检查与手动 RPC 调用。");case"logs":return W(t,"Live tail of gateway file logs with operational filtering.","网关文件日志实时追踪与运维过滤。");default:return""}}const pl="opensoul.control.settings.v1";function Gu(){const t={gatewayUrl:`${location.protocol==="https:"?"wss":"ws"}://${location.host}`,token:"",sessionKey:"main",lastActiveSessionKey:"main",theme:"system",chatFocusMode:!1,chatShowThinking:!0,splitRatio:.6,navCollapsed:!1,navGroupsCollapsed:{},operateZoomLevel:1};try{const n=localStorage.getItem(pl);if(!n)return t;const s=JSON.parse(n);return{gatewayUrl:typeof s.gatewayUrl=="string"&&s.gatewayUrl.trim()?s.gatewayUrl.trim():t.gatewayUrl,token:typeof s.token=="string"?s.token:t.token,sessionKey:typeof s.sessionKey=="string"&&s.sessionKey.trim()?s.sessionKey.trim():t.sessionKey,lastActiveSessionKey:typeof s.lastActiveSessionKey=="string"&&s.lastActiveSessionKey.trim()?s.lastActiveSessionKey.trim():typeof s.sessionKey=="string"&&s.sessionKey.trim()||t.lastActiveSessionKey,theme:s.theme==="light"||s.theme==="dark"||s.theme==="system"?s.theme:t.theme,chatFocusMode:typeof s.chatFocusMode=="boolean"?s.chatFocusMode:t.chatFocusMode,chatShowThinking:typeof s.chatShowThinking=="boolean"?s.chatShowThinking:t.chatShowThinking,splitRatio:typeof s.splitRatio=="number"&&s.splitRatio>=.4&&s.splitRatio<=.7?s.splitRatio:t.splitRatio,navCollapsed:typeof s.navCollapsed=="boolean"?s.navCollapsed:t.navCollapsed,navGroupsCollapsed:typeof s.navGroupsCollapsed=="object"&&s.navGroupsCollapsed!==null?s.navGroupsCollapsed:t.navGroupsCollapsed,operateZoomLevel:typeof s.operateZoomLevel=="number"&&s.operateZoomLevel>=.5&&s.operateZoomLevel<=3?s.operateZoomLevel:t.operateZoomLevel}}catch{return t}}function qu(e){localStorage.setItem(pl,JSON.stringify(e))}const Tn=e=>Number.isNaN(e)?.5:e<=0?0:e>=1?1:e,Vu=()=>typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches??!1,_n=e=>{e.classList.remove("theme-transition"),e.style.removeProperty("--theme-switch-x"),e.style.removeProperty("--theme-switch-y")},Qu=({nextTheme:e,applyTheme:t,context:n,currentTheme:s})=>{if(s===e)return;const i=globalThis.document??null;if(!i){t();return}const o=i.documentElement,a=i,l=Vu();if(!!a.startViewTransition&&!l){let u=.5,g=.5;if(n?.pointerClientX!==void 0&&n?.pointerClientY!==void 0&&typeof window<"u")u=Tn(n.pointerClientX/window.innerWidth),g=Tn(n.pointerClientY/window.innerHeight);else if(n?.element){const p=n.element.getBoundingClientRect();p.width>0&&p.height>0&&typeof window<"u"&&(u=Tn((p.left+p.width/2)/window.innerWidth),g=Tn((p.top+p.height/2)/window.innerHeight))}o.style.setProperty("--theme-switch-x",`${u*100}%`),o.style.setProperty("--theme-switch-y",`${g*100}%`),o.classList.add("theme-transition");try{const p=a.startViewTransition?.(()=>{t()});p?.finished?p.finished.finally(()=>_n(o)):_n(o)}catch{_n(o),t()}return}t(),_n(o)};function Yu(){return typeof window>"u"||typeof window.matchMedia!="function"||window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function lo(e){return e==="system"?Yu():e}function qe(e,t){const n={...t,lastActiveSessionKey:t.lastActiveSessionKey?.trim()||t.sessionKey.trim()||"main"};e.settings=n,qu(n),t.theme!==e.theme&&(e.theme=t.theme,hs(e,lo(t.theme))),e.applySessionKey=e.settings.lastActiveSessionKey}function hl(e,t){const n=t.trim();n&&e.settings.lastActiveSessionKey!==n&&qe(e,{...e.settings,lastActiveSessionKey:n})}function Zu(e){if(!window.location.search&&!window.location.hash)return;const t=new URL(window.location.href),n=new URLSearchParams(t.search),s=new URLSearchParams(t.hash.startsWith("#")?t.hash.slice(1):t.hash),i=n.get("token")??s.get("token"),o=n.get("password")??s.get("password"),a=n.get("session")??s.get("session"),l=n.get("gatewayUrl")??s.get("gatewayUrl");let c=!1;if(i!=null){const g=i.trim();g&&g!==e.settings.token&&qe(e,{...e.settings,token:g}),n.delete("token"),s.delete("token"),c=!0}if(o!=null){const g=o.trim();g&&(e.password=g),n.delete("password"),s.delete("password"),c=!0}if(a!=null){const g=a.trim();g&&(e.sessionKey=g,qe(e,{...e.settings,sessionKey:g,lastActiveSessionKey:g}))}if(l!=null){const g=l.trim();g&&g!==e.settings.gatewayUrl&&(e.pendingGatewayUrl=g),n.delete("gatewayUrl"),s.delete("gatewayUrl"),c=!0}if(!c)return;t.search=n.toString();const u=s.toString();t.hash=u?`#${u}`:"",window.history.replaceState({},"",t.toString())}function fl(e,t){if(dl.includes(t)){e.openSettings(t),dn({...e,tab:t});return}e.tab!==t&&(e.tab=t),Cu(t,ro(t,e.uiLocale)),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Wi(e):Gi(e),t==="debug"?qi(e):Vi(e),dn(e),ml(e,t,!1)}function vi(e,t,n){Qu({nextTheme:t,applyTheme:()=>{e.theme=t,qe(e,{...e.settings,theme:t}),hs(e,lo(t))},context:n,currentTheme:e.theme})}async function dn(e){if(e.tab==="overview"&&await bl(e),e.tab==="channels"&&await og(e),e.tab==="instances"&&await oo(e),e.tab==="sessions"&&await wt(e),e.tab==="cron"&&await Yn(e),e.tab==="skills"&&await fn(e),e.tab==="agents"){await Qi(e),await Se(e);const t=e.agentsList?.agents?.map(s=>s.id)??[];t.length>0&&Ur(e,t);const n=e.agentsSelectedId??e.agentsList?.defaultId??e.agentsList?.agents?.[0]?.id;n&&(Br(e,n),e.agentsPanel==="skills"&&Un(e,n),e.agentsPanel==="channels"&&$e(e,!1),e.agentsPanel==="cron"&&Yn(e))}e.tab==="nodes"&&(await ls(e),await tt(e),await Se(e),await io(e)),e.tab==="chat"&&(await Al(e),pn(e,!e.chatHasAutoScrolled)),e.tab==="config"&&(await Wn(e),await Se(e)),e.tab==="debug"&&(await Dt(e),e.eventLog=e.eventLogBuffer),e.tab==="logs"&&(e.logsAtBottom=!0,await rn(e,{reset:!0}),Or(e,!0))}function Ju(){if(typeof window>"u")return"";const e=window.__OPENSOUL_CONTROL_UI_BASE_PATH__;return typeof e=="string"&&e.trim()?vn(e):Hu(window.location.pathname)}function Xu(e){e.theme=e.settings.theme??"system",hs(e,lo(e.theme))}function hs(e,t){if(e.themeResolved=t,typeof document>"u")return;const n=document.documentElement;n.dataset.theme=t,n.style.colorScheme=t,Au(t)}function eg(e){if(typeof window>"u"||typeof window.matchMedia!="function")return;if(e.themeMedia=window.matchMedia("(prefers-color-scheme: dark)"),e.themeMediaHandler=n=>{e.theme==="system"&&hs(e,n.matches?"dark":"light")},typeof e.themeMedia.addEventListener=="function"){e.themeMedia.addEventListener("change",e.themeMediaHandler);return}e.themeMedia.addListener(e.themeMediaHandler)}function tg(e){if(!e.themeMedia||!e.themeMediaHandler)return;if(typeof e.themeMedia.removeEventListener=="function"){e.themeMedia.removeEventListener("change",e.themeMediaHandler);return}e.themeMedia.removeListener(e.themeMediaHandler),e.themeMedia=null,e.themeMediaHandler=null}function ng(e,t){if(typeof window>"u")return;const n=ao(window.location.pathname,e.basePath)??"chat";vl(e,n),ml(e,n,t)}function sg(e){if(typeof window>"u")return;const t=ao(window.location.pathname,e.basePath);if(!t)return;const s=new URL(window.location.href).searchParams.get("session")?.trim();s&&(e.sessionKey=s,qe(e,{...e.settings,sessionKey:s,lastActiveSessionKey:s})),vl(e,t)}function vl(e,t){if(dl.includes(t)){e.openSettings(t),e.connected&&dn({...e,tab:t});return}e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Wi(e):Gi(e),t==="debug"?qi(e):Vi(e),e.connected&&dn(e)}function ml(e,t,n){if(typeof window>"u")return;const s=cn(ps(t,e.basePath)),i=cn(window.location.pathname),o=new URL(window.location.href);t==="chat"&&e.sessionKey?o.searchParams.set("session",e.sessionKey):o.searchParams.delete("session"),i!==s&&(o.pathname=s),n?window.history.replaceState({},"",o.toString()):window.history.pushState({},"",o.toString())}function ig(e,t,n){if(typeof window>"u")return;const s=new URL(window.location.href);s.searchParams.set("session",t),window.history.replaceState({},"",s.toString())}async function bl(e){await Promise.all([$e(e,!1),oo(e),wt(e),hn(e),Dt(e)])}async function og(e){await Promise.all([$e(e,!0),Wn(e),Se(e)])}async function Yn(e){await Promise.all([$e(e,!1),hn(e),cs(e)])}const ma=50,ag=80,rg=12e4;function lg(e){if(!e||typeof e!="object")return null;const t=e;if(typeof t.text=="string")return t.text;const n=t.content;if(!Array.isArray(n))return null;const s=n.map(i=>{if(!i||typeof i!="object")return null;const o=i;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(i=>!!i);return s.length===0?null:s.join(`
`)}function ba(e){if(e==null)return null;if(typeof e=="number"||typeof e=="boolean")return String(e);const t=lg(e);let n;if(typeof e=="string")n=e;else if(t)n=t;else try{n=JSON.stringify(e,null,2)}catch{n=String(e)}const s=zr(n,rg);return s.truncated?`${s.text}

… truncated (${s.total} chars, showing first ${s.text.length}).`:s.text}function cg(e){const t=[];return t.push({type:"toolcall",name:e.name,arguments:e.args??{}}),e.output&&t.push({type:"toolresult",name:e.name,text:e.output}),{role:"assistant",toolCallId:e.toolCallId,runId:e.runId,content:t,timestamp:e.startedAt}}function dg(e){if(e.toolStreamOrder.length<=ma)return;const t=e.toolStreamOrder.length-ma,n=e.toolStreamOrder.splice(0,t);for(const s of n)e.toolStreamById.delete(s)}function ug(e){e.chatToolMessages=e.toolStreamOrder.map(t=>e.toolStreamById.get(t)?.message).filter(t=>!!t)}function mi(e){e.toolStreamSyncTimer!=null&&(clearTimeout(e.toolStreamSyncTimer),e.toolStreamSyncTimer=null),ug(e)}function gg(e,t=!1){if(t){mi(e);return}e.toolStreamSyncTimer==null&&(e.toolStreamSyncTimer=window.setTimeout(()=>mi(e),ag))}function fs(e){e.toolStreamById.clear(),e.toolStreamOrder=[],e.chatToolMessages=[],mi(e)}const pg=5e3;function hg(e,t){const n=t.data??{},s=typeof n.phase=="string"?n.phase:"";e.compactionClearTimer!=null&&(window.clearTimeout(e.compactionClearTimer),e.compactionClearTimer=null),s==="start"?e.compactionStatus={active:!0,startedAt:Date.now(),completedAt:null}:s==="end"&&(e.compactionStatus={active:!1,startedAt:e.compactionStatus?.startedAt??null,completedAt:Date.now()},e.compactionClearTimer=window.setTimeout(()=>{e.compactionStatus=null,e.compactionClearTimer=null},pg))}function fg(e,t){if(!t)return;if(t.stream==="compaction"){hg(e,t);return}if(t.stream!=="tool")return;const n=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(n&&n!==e.sessionKey||!n&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;const s=t.data??{},i=typeof s.toolCallId=="string"?s.toolCallId:"";if(!i)return;const o=typeof s.name=="string"?s.name:"tool",a=typeof s.phase=="string"?s.phase:"",l=a==="start"?s.args:void 0,c=a==="update"?ba(s.partialResult):a==="result"?ba(s.result):void 0,u=Date.now();let g=e.toolStreamById.get(i);g?(g.name=o,l!==void 0&&(g.args=l),c!==void 0&&(g.output=c||void 0),g.updatedAt=u):(g={toolCallId:i,runId:t.runId,sessionKey:n,name:o,args:l,output:c||void 0,startedAt:typeof t.ts=="number"?t.ts:u,updatedAt:u,message:{}},e.toolStreamById.set(i,g),e.toolStreamOrder.push(i)),g.message=cg(g),dg(e),gg(e,a==="result")}const vg=/^\[([^\]]+)\]\s*/,mg=["WebChat","WhatsApp","Telegram","Signal","Slack","Discord","iMessage","Teams","Matrix","Zalo","Zalo Personal","BlueBubbles"],Bs=new WeakMap,Us=new WeakMap;function bg(e){return/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}Z\b/.test(e)||/\d{4}-\d{2}-\d{2} \d{2}:\d{2}\b/.test(e)?!0:mg.some(t=>e.startsWith(`${t} `))}function zs(e){const t=e.match(vg);if(!t)return e;const n=t[1]??"";return bg(n)?e.slice(t[0].length):e}function bi(e){const t=e,n=typeof t.role=="string"?t.role:"",s=t.content;if(typeof s=="string")return n==="assistant"?Rs(s):zs(s);if(Array.isArray(s)){const i=s.map(o=>{const a=o;return a.type==="text"&&typeof a.text=="string"?a.text:null}).filter(o=>typeof o=="string");if(i.length>0){const o=i.join(`
`);return n==="assistant"?Rs(o):zs(o)}}return typeof t.text=="string"?n==="assistant"?Rs(t.text):zs(t.text):null}function yl(e){if(!e||typeof e!="object")return bi(e);const t=e;if(Bs.has(t))return Bs.get(t)??null;const n=bi(e);return Bs.set(t,n),n}function ya(e){const n=e.content,s=[];if(Array.isArray(n))for(const l of n){const c=l;if(c.type==="thinking"&&typeof c.thinking=="string"){const u=c.thinking.trim();u&&s.push(u)}}if(s.length>0)return s.join(`
`);const i=xg(e);if(!i)return null;const a=[...i.matchAll(/<\s*think(?:ing)?\s*>([\s\S]*?)<\s*\/\s*think(?:ing)?\s*>/gi)].map(l=>(l[1]??"").trim()).filter(Boolean);return a.length>0?a.join(`
`):null}function yg(e){if(!e||typeof e!="object")return ya(e);const t=e;if(Us.has(t))return Us.get(t)??null;const n=ya(e);return Us.set(t,n),n}function xg(e){const t=e,n=t.content;if(typeof n=="string")return n;if(Array.isArray(n)){const s=n.map(i=>{const o=i;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(i=>typeof i=="string");if(s.length>0)return s.join(`
`)}return typeof t.text=="string"?t.text:null}function $g(e){const t=e.trim();if(!t)return"";const n=t.split(/\r?\n/).map(s=>s.trim()).filter(Boolean).map(s=>`_${s}_`);return n.length?["_Reasoning:_",...n].join(`
`):""}let xa=!1;function $a(e){e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t="";for(let n=0;n<e.length;n++)t+=e[n].toString(16).padStart(2,"0");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}function wg(){const e=new Uint8Array(16),t=Date.now();for(let n=0;n<e.length;n++)e[n]=Math.floor(Math.random()*256);return e[0]^=t&255,e[1]^=t>>>8&255,e[2]^=t>>>16&255,e[3]^=t>>>24&255,e}function kg(){xa||(xa=!0,console.warn("[uuid] crypto API missing; falling back to weak randomness"))}function co(e=globalThis.crypto){if(e&&typeof e.randomUUID=="function")return e.randomUUID();if(e&&typeof e.getRandomValues=="function"){const t=new Uint8Array(16);return e.getRandomValues(t),$a(t)}return kg(),$a(wg())}async function un(e){if(!(!e.client||!e.connected)){e.chatLoading=!0,e.lastError=null;try{const t=await e.client.request("chat.history",{sessionKey:e.sessionKey,limit:200});e.chatMessages=Array.isArray(t.messages)?t.messages:[],e.chatThinkingLevel=t.thinkingLevel??null}catch(t){e.lastError=String(t)}finally{e.chatLoading=!1}}}function Sg(e){const t=/^data:([^;]+);base64,(.+)$/.exec(e);return t?{mimeType:t[1],content:t[2]}:null}async function Ag(e,t,n){if(!e.client||!e.connected)return null;const s=t.trim(),i=n&&n.length>0;if(!s&&!i)return null;const o=Date.now(),a=[];if(s&&a.push({type:"text",text:s}),i)for(const u of n)a.push({type:"image",source:{type:"base64",media_type:u.mimeType,data:u.dataUrl}});e.chatMessages=[...e.chatMessages,{role:"user",content:a,timestamp:o}],e.chatSending=!0,e.lastError=null;const l=co();e.chatRunId=l,e.chatStream="",e.chatStreamStartedAt=o;const c=i?n.map(u=>{const g=Sg(u.dataUrl);return g?{type:"image",mimeType:g.mimeType,content:g.content}:null}).filter(u=>u!==null):void 0;try{return await e.client.request("chat.send",{sessionKey:e.sessionKey,message:s,deliver:!1,idempotencyKey:l,attachments:c}),l}catch(u){const g=String(u);return e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,e.lastError=g,e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:"Error: "+g}],timestamp:Date.now()}],null}finally{e.chatSending=!1}}async function Cg(e){if(!e.client||!e.connected)return!1;const t=e.chatRunId;try{return await e.client.request("chat.abort",t?{sessionKey:e.sessionKey,runId:t}:{sessionKey:e.sessionKey}),!0}catch(n){return e.lastError=String(n),!1}}function Tg(e,t){if(!t||t.sessionKey!==e.sessionKey)return null;if(t.runId&&e.chatRunId&&t.runId!==e.chatRunId)return t.state==="final"?"final":null;if(t.state==="delta"){const n=bi(t.message);if(typeof n=="string"){const s=e.chatStream??"";(!s||n.length>=s.length)&&(e.chatStream=n)}}else t.state==="final"||t.state==="aborted"?(e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null):t.state==="error"&&(e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null,e.lastError=t.errorMessage??"chat error");return t.state}const xl=120;function $l(e){return e.chatSending||!!e.chatRunId}function _g(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/stop"?!0:n==="stop"||n==="esc"||n==="abort"||n==="wait"||n==="exit"}function Lg(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/new"||n==="/reset"?!0:n.startsWith("/new ")||n.startsWith("/reset ")}async function wl(e){e.connected&&(e.chatMessage="",await Cg(e))}function Eg(e,t,n,s){const i=t.trim(),o=!!(n&&n.length>0);!i&&!o||(e.chatQueue=[...e.chatQueue,{id:co(),text:i,createdAt:Date.now(),attachments:o?n?.map(a=>({...a})):void 0,refreshSessions:s}])}async function kl(e,t,n){fs(e);const s=await Ag(e,t,n?.attachments),i=!!s;return!i&&n?.previousDraft!=null&&(e.chatMessage=n.previousDraft),!i&&n?.previousAttachments&&(e.chatAttachments=n.previousAttachments),i&&hl(e,e.sessionKey),i&&n?.restoreDraft&&n.previousDraft?.trim()&&(e.chatMessage=n.previousDraft),i&&n?.restoreAttachments&&n.previousAttachments?.length&&(e.chatAttachments=n.previousAttachments),pn(e),i&&!e.chatRunId&&Sl(e),i&&n?.refreshSessions&&s&&e.refreshSessionsAfterChat.add(s),i}async function Sl(e){if(!e.connected||$l(e))return;const[t,...n]=e.chatQueue;if(!t)return;e.chatQueue=n,await kl(e,t.text,{attachments:t.attachments,refreshSessions:t.refreshSessions})||(e.chatQueue=[t,...e.chatQueue])}function Ig(e,t){e.chatQueue=e.chatQueue.filter(n=>n.id!==t)}async function Mg(e,t,n){if(!e.connected)return;const s=e.chatMessage,i=(t??e.chatMessage).trim(),o=e.chatAttachments??[],a=t==null?o:[],l=a.length>0;if(!i&&!l)return;if(_g(i)){await wl(e);return}const c=Lg(i);if(t==null&&(e.chatMessage="",e.chatAttachments=[]),$l(e)){Eg(e,i,a,c);return}await kl(e,i,{previousDraft:t==null?s:void 0,restoreDraft:!!(t&&n?.restoreDraft),attachments:l?a:void 0,previousAttachments:t==null?o:void 0,restoreAttachments:!!(t&&n?.restoreDraft),refreshSessions:c})}async function Al(e,t){await Promise.all([un(e),wt(e,{activeMinutes:xl}),yi(e)]),t?.scheduleScroll!==!1&&pn(e)}const Rg=Sl;function Pg(e){const t=Fr(e.sessionKey);return t?.agentId?t.agentId:e.hello?.snapshot?.sessionDefaults?.defaultAgentId?.trim()||"main"}function Dg(e,t){const n=vn(e),s=encodeURIComponent(t);return n?`${n}/avatar/${s}?meta=1`:`/avatar/${s}?meta=1`}async function yi(e){if(!e.connected){e.chatAvatarUrl=null;return}const t=Pg(e);if(!t){e.chatAvatarUrl=null;return}e.chatAvatarUrl=null;const n=Dg(e.basePath,t);try{const s=await fetch(n,{method:"GET"});if(!s.ok){e.chatAvatarUrl=null;return}const i=await s.json(),o=typeof i.avatarUrl=="string"?i.avatarUrl.trim():"";e.chatAvatarUrl=o||null}catch{e.chatAvatarUrl=null}}const Ng={trace:!0,debug:!0,info:!0,warn:!0,error:!0,fatal:!0},Fg={name:"",description:"",agentId:"",enabled:!0,scheduleKind:"every",scheduleAt:"",everyAmount:"30",everyUnit:"minutes",cronExpr:"0 7 * * *",cronTz:"",sessionTarget:"isolated",wakeMode:"now",payloadKind:"agentTurn",payloadText:"",deliveryMode:"announce",deliveryChannel:"last",deliveryTo:"",timeoutSeconds:""},Og=50,Bg=200,Ug="Assistant";function wa(e,t){if(typeof e!="string")return;const n=e.trim();if(n)return n.length<=t?n:n.slice(0,t)}function xi(e){const t=wa(e?.name,Og)??Ug,n=wa(e?.avatar??void 0,Bg)??null;return{agentId:typeof e?.agentId=="string"&&e.agentId.trim()?e.agentId.trim():null,name:t,avatar:n}}function zg(){return xi(typeof window>"u"?{}:{name:window.__OPENSOUL_ASSISTANT_NAME__,avatar:window.__OPENSOUL_ASSISTANT_AVATAR__})}async function Cl(e,t){if(!e.client||!e.connected)return;const n=e.sessionKey.trim(),s=n?{sessionKey:n}:{};try{const i=await e.client.request("agent.identity.get",s);if(!i)return;const o=xi(i);e.assistantName=o.name,e.assistantAvatar=o.avatar,e.assistantAgentId=o.agentId??null}catch{}}function $i(e){return typeof e=="object"&&e!==null}function Hg(e){if(!$i(e))return null;const t=typeof e.id=="string"?e.id.trim():"",n=e.request;if(!t||!$i(n))return null;const s=typeof n.command=="string"?n.command.trim():"";if(!s)return null;const i=typeof e.createdAtMs=="number"?e.createdAtMs:0,o=typeof e.expiresAtMs=="number"?e.expiresAtMs:0;return!i||!o?null:{id:t,request:{command:s,cwd:typeof n.cwd=="string"?n.cwd:null,host:typeof n.host=="string"?n.host:null,security:typeof n.security=="string"?n.security:null,ask:typeof n.ask=="string"?n.ask:null,agentId:typeof n.agentId=="string"?n.agentId:null,resolvedPath:typeof n.resolvedPath=="string"?n.resolvedPath:null,sessionKey:typeof n.sessionKey=="string"?n.sessionKey:null},createdAtMs:i,expiresAtMs:o}}function Kg(e){if(!$i(e))return null;const t=typeof e.id=="string"?e.id.trim():"";return t?{id:t,decision:typeof e.decision=="string"?e.decision:null,resolvedBy:typeof e.resolvedBy=="string"?e.resolvedBy:null,ts:typeof e.ts=="number"?e.ts:null}:null}function Tl(e){const t=Date.now();return e.filter(n=>n.expiresAtMs>t)}function jg(e,t){const n=Tl(e).filter(s=>s.id!==t.id);return n.push(t),n}function ka(e,t){return Tl(e).filter(n=>n.id!==t)}function Wg(e){const t=e.version??(e.nonce?"v2":"v1"),n=e.scopes.join(","),s=e.token??"",i=[t,e.deviceId,e.clientId,e.clientMode,e.role,n,String(e.signedAtMs),s];return t==="v2"&&i.push(e.nonce??""),i.join("|")}const _l={WEBCHAT_UI:"webchat-ui",CONTROL_UI:"opensoul-control-ui",WEBCHAT:"webchat",CLI:"cli",GATEWAY_CLIENT:"gateway-client",MACOS_APP:"opensoul-macos",IOS_APP:"opensoul-ios",ANDROID_APP:"opensoul-android",NODE_HOST:"node-host",TEST:"test",FINGERPRINT:"fingerprint",PROBE:"opensoul-probe"},Sa=_l,wi={WEBCHAT:"webchat",CLI:"cli",UI:"ui",BACKEND:"backend",NODE:"node",PROBE:"probe",TEST:"test"};new Set(Object.values(_l));new Set(Object.values(wi));const Gg=4008;class qg{constructor(t){this.opts=t,this.ws=null,this.pending=new Map,this.closed=!1,this.lastSeq=null,this.connectNonce=null,this.connectSent=!1,this.connectTimer=null,this.backoffMs=200,this.phase="dialing",this.reconnectAttempt=0,this.lastConnectFailure=null}start(){this.closed=!1,this.connect()}stop(){this.closed=!0,this.ws?.close(),this.ws=null,this.flushPending(new Error("gateway client stopped"))}get connected(){return this.ws?.readyState===WebSocket.OPEN}connect(){this.closed||(this.phase="dialing",this.ws=new WebSocket(this.opts.url),this.ws.addEventListener("open",()=>this.queueConnect()),this.ws.addEventListener("message",t=>this.handleMessage(String(t.data??""))),this.ws.addEventListener("close",t=>{const n=this.phase,s=this.closed?null:this.backoffMs,i=this.reconnectAttempt,o=this.lastConnectFailure??void 0;this.lastConnectFailure=null;const a=String(t.reason??"");this.ws=null,this.flushPending(new Error(`gateway closed (${t.code}): ${a}`)),this.opts.onClose?.({code:t.code,reason:a,phase:n,url:this.opts.url,reconnectInMs:s,reconnectAttempt:i,failure:o}),this.scheduleReconnect()}),this.ws.addEventListener("error",()=>{}))}scheduleReconnect(){if(this.closed)return;const t=this.backoffMs;this.phase="reconnecting",this.reconnectAttempt+=1,this.backoffMs=Math.min(this.backoffMs*1.5,1e4),window.setTimeout(()=>this.connect(),t)}flushPending(t){for(const[,n]of this.pending)n.reject(t);this.pending.clear()}async sendConnect(){if(this.connectSent)return;this.connectSent=!0,this.connectTimer!==null&&(window.clearTimeout(this.connectTimer),this.connectTimer=null);const t=typeof crypto<"u"&&!!crypto.subtle,n=["operator.admin","operator.approvals","operator.pairing"],s="operator";let i=null,o=!1,a=this.opts.token;if(t){i=await so();const g=Dd({deviceId:i.deviceId,role:s})?.token;a=g??this.opts.token,o=!!(g&&this.opts.token)}const l=a||this.opts.password?{token:a,password:this.opts.password}:void 0;let c;if(t&&i){const g=Date.now(),p=this.connectNonce??void 0,h=Wg({deviceId:i.deviceId,clientId:this.opts.clientName??Sa.CONTROL_UI,clientMode:this.opts.mode??wi.WEBCHAT,role:s,scopes:n,signedAtMs:g,token:a??null,nonce:p}),v=await au(i.privateKey,h);c={id:i.deviceId,publicKey:i.publicKey,signature:v,signedAt:g,nonce:p}}const u={minProtocol:3,maxProtocol:3,client:{id:this.opts.clientName??Sa.CONTROL_UI,version:this.opts.clientVersion??"dev",platform:this.opts.platform??navigator.platform??"web",mode:this.opts.mode??wi.WEBCHAT,instanceId:this.opts.instanceId},role:s,scopes:n,device:c,caps:[],auth:l,userAgent:navigator.userAgent,locale:cl()};this.request("connect",u).then(g=>{g?.auth?.deviceToken&&i&&Wr({deviceId:i.deviceId,role:g.auth.role??s,token:g.auth.deviceToken,scopes:g.auth.scopes??[]}),this.lastConnectFailure=null,this.backoffMs=200,this.reconnectAttempt=0,this.phase="connected",this.opts.onHello?.(g)}).catch(g=>{this.lastConnectFailure=g instanceof Error?g.message:String(g),o&&i&&Gr({deviceId:i.deviceId,role:s}),this.ws?.close(Gg,"connect failed")})}handleMessage(t){let n;try{n=JSON.parse(t)}catch{return}const s=n;if(s.type==="event"){const i=n;if(i.event==="connect.challenge"){const a=i.payload,l=a&&typeof a.nonce=="string"?a.nonce:null;l&&(this.connectNonce=l,this.sendConnect());return}const o=typeof i.seq=="number"?i.seq:null;o!==null&&(this.lastSeq!==null&&o>this.lastSeq+1&&this.opts.onGap?.({expected:this.lastSeq+1,received:o}),this.lastSeq=o);try{this.opts.onEvent?.(i)}catch(a){console.error("[gateway] event handler error:",a)}return}if(s.type==="res"){const i=n,o=this.pending.get(i.id);if(!o)return;this.pending.delete(i.id),i.ok?o.resolve(i.payload):o.reject(new Error(i.error?.message??"request failed"));return}}request(t,n){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)return Promise.reject(new Error("gateway not connected"));const s=co(),i={type:"req",id:s,method:t,params:n},o=new Promise((a,l)=>{this.pending.set(s,{resolve:c=>a(c),reject:l})});return this.ws.send(JSON.stringify(i)),o}queueConnect(){this.connectNonce=null,this.connectSent=!1,this.phase="handshake",this.connectTimer!==null&&window.clearTimeout(this.connectTimer),this.connectTimer=window.setTimeout(()=>{this.sendConnect()},50)}}function Hs(e,t){const n=(e??"").trim(),s=t.mainSessionKey?.trim();if(!s)return n;if(!n)return s;const i=t.mainKey?.trim()||"main",o=t.defaultAgentId?.trim();return n==="main"||n===i||o&&(n===`agent:${o}:main`||n===`agent:${o}:${i}`)?s:n}function Vg(e,t){if(!t?.mainSessionKey)return;const n=Hs(e.sessionKey,t),s=Hs(e.settings.sessionKey,t),i=Hs(e.settings.lastActiveSessionKey,t),o=n||s||e.sessionKey,a={...e.settings,sessionKey:s||o,lastActiveSessionKey:i||o},l=a.sessionKey!==e.settings.sessionKey||a.lastActiveSessionKey!==e.settings.lastActiveSessionKey;o!==e.sessionKey&&(e.sessionKey=o),l&&qe(e,a)}function Qg(e){const t=e.failure?.toLowerCase()??"";return t.includes("unauthorized")||t.includes("token")||t.includes("password")||t.includes("pairing")||t.includes("device")||e.code===1008||e.code===4008?"auth":e.phase==="reconnecting"?"reconnecting":e.phase==="handshake"?"handshake":e.phase==="dialing"?"dns":"network"}function Yg(e){const n=[`stage=${Qg(e)}`,`url=${e.url}`];return e.reconnectInMs!==null&&n.push(`retry=${e.reconnectInMs}ms`),e.reconnectAttempt>0&&n.push(`attempt=${e.reconnectAttempt}`),e.failure&&n.push(`cause=${e.failure}`),`disconnected (${e.code}): ${e.reason||"no reason"} [${n.join(", ")}]`}function uo(e){e.lastError=null,e.hello=null,e.connected=!1,e.execApprovalQueue=[],e.execApprovalError=null,e.client?.stop(),e.client=new qg({url:e.settings.gatewayUrl,token:e.settings.token.trim()?e.settings.token:void 0,password:e.password.trim()?e.password:void 0,clientName:"opensoul-control-ui",mode:"webchat",onHello:t=>{e.connected=!0,e.lastError=null,e.hello=t,va("connected"),Xg(e,t),e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,fs(e),Cl(e),Qi(e),ls(e,{quiet:!0}),tt(e,{quiet:!0}),dn(e)},onClose:t=>{const{code:n}=t;e.connected=!1,va("disconnected"),n!==1012&&(e.lastError=Yg(t))},onEvent:t=>Zg(e,t),onGap:({expected:t,received:n})=>{e.lastError=`event gap detected (expected seq ${t}, got ${n}); refresh recommended`}}),e.client.start()}function Zg(e,t){try{Jg(e,t)}catch(n){console.error("[gateway] handleGatewayEvent error:",t.event,n)}}function Jg(e,t){if(e.eventLogBuffer=[{ts:Date.now(),event:t.event,payload:t.payload},...e.eventLogBuffer].slice(0,250),e.tab==="debug"&&(e.eventLog=e.eventLogBuffer),t.event==="agent"){if(e.onboarding)return;fg(e,t.payload);return}if(t.event==="chat"){const n=t.payload;n?.sessionKey&&hl(e,n.sessionKey);const s=Tg(e,n);if(s==="final"||s==="error"||s==="aborted"){fs(e),Rg(e);const i=n?.runId;i&&e.refreshSessionsAfterChat.has(i)&&(e.refreshSessionsAfterChat.delete(i),s==="final"&&wt(e,{activeMinutes:xl}))}s==="final"&&un(e);return}if(t.event==="presence"){const n=t.payload;n?.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence,e.presenceError=null,e.presenceStatus=null);return}if(t.event==="cron"&&e.tab==="cron"&&Yn(e),(t.event==="device.pair.requested"||t.event==="device.pair.resolved")&&tt(e,{quiet:!0}),t.event==="exec.approval.requested"){const n=Hg(t.payload);if(n){e.execApprovalQueue=jg(e.execApprovalQueue,n),e.execApprovalError=null;const s=Math.max(0,n.expiresAtMs-Date.now()+500);window.setTimeout(()=>{e.execApprovalQueue=ka(e.execApprovalQueue,n.id)},s)}return}if(t.event==="exec.approval.resolved"){const n=Kg(t.payload);n&&(e.execApprovalQueue=ka(e.execApprovalQueue,n.id))}}function Xg(e,t){const n=t.snapshot;n?.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence),n?.health&&(e.debugHealth=n.health),n?.sessionDefaults&&Vg(e,n.sessionDefaults)}function ep(e){e.basePath=Ju(),Zu(e),ng(e,!0),Xu(e),eg(e),window.addEventListener("popstate",e.popStateHandler),ku()?sp(e):uo(e),kd(e),e.tab==="logs"&&Wi(e),e.tab==="debug"&&qi(e)}function tp(e){vd(e)}function np(e){window.removeEventListener("popstate",e.popStateHandler),Sd(e),Gi(e),Vi(e),tg(e),_u(),e.topbarObserver?.disconnect(),e.topbarObserver=null}function sp(e){Tu({onInit:t=>{const n=e,s=n.settings.gatewayUrl,i=n.settings.token,o=t.gatewayUrl?.trim(),a=!!(o&&o!==s),l=typeof t.token=="string"&&t.token!==i,c={...n.settings};let u=!1;if(a&&o&&(c.gatewayUrl=o,u=!0),l&&t.token&&(c.token=t.token,u=!0),t.settings?.sessionKey){const g=t.settings.sessionKey;(g!==c.sessionKey||g!==c.lastActiveSessionKey)&&(c.sessionKey=g,c.lastActiveSessionKey=g,u=!0)}if(u&&qe(n,c),o&&(a||l||!e.connected)&&uo(e),t.theme){const g=t.theme;vi(n,g)}},onThemeChanged:t=>{vi(e,t)},onNavigate:t=>{const n=ao(`/${t}`);n&&fl(e,n)},onFocus:t=>{t==="chat-input"?document.querySelector(".chat-compose textarea")?.focus():t==="search"&&document.querySelector(".search-input, .command-input")?.focus()},onFileDrop:t=>{console.log("[desktop-bridge] File drop received:",t.length,"files")},onWindowState:t=>{e._windowFocused=t==="focused"},onCommandPalette:()=>{const t=document.querySelector(".command-palette");if(t){t.remove();return}window.dispatchEvent(new CustomEvent("opensoul:command-palette"))}}),Su()}function ip(e,t){if(!(e.tab==="chat"&&e.chatManualRefreshInFlight)){if(e.tab==="chat"&&(t.has("chatMessages")||t.has("chatToolMessages")||t.has("chatStream")||t.has("chatLoading")||t.has("tab"))){const n=t.has("tab"),s=t.has("chatLoading")&&t.get("chatLoading")===!0&&!e.chatLoading;pn(e,n||s||!e.chatHasAutoScrolled)}e.tab==="logs"&&(t.has("logsEntries")||t.has("logsAutoFollow")||t.has("tab"))&&e.logsAutoFollow&&e.logsAtBottom&&Or(e,t.has("tab")||t.has("logsAutoFollow"))}}const go={CHILD:2},po=e=>(...t)=>({_$litDirective$:e,values:t});let ho=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,s){this._$Ct=t,this._$AM=n,this._$Ci=s}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};const{I:op}=Bc,Aa=e=>e,ap=e=>e.strings===void 0,Ca=()=>document.createComment(""),Ht=(e,t,n)=>{const s=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(n===void 0){const o=s.insertBefore(Ca(),i),a=s.insertBefore(Ca(),i);n=new op(o,a,e,e.options)}else{const o=n._$AB.nextSibling,a=n._$AM,l=a!==e;if(l){let c;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(c=e._$AU)!==a._$AU&&n._$AP(c)}if(o!==i||l){let c=n._$AA;for(;c!==o;){const u=Aa(c).nextSibling;Aa(s).insertBefore(c,i),c=u}}}return n},rt=(e,t,n=e)=>(e._$AI(t,n),e),rp={},lp=(e,t=rp)=>e._$AH=t,cp=e=>e._$AH,Ks=e=>{e._$AR(),e._$AA.remove()};const Ta=(e,t,n)=>{const s=new Map;for(let i=t;i<=n;i++)s.set(e[i],i);return s},Ll=po(class extends ho{constructor(e){if(super(e),e.type!==go.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,n){let s;n===void 0?n=t:t!==void 0&&(s=t);const i=[],o=[];let a=0;for(const l of e)i[a]=s?s(l,a):a,o[a]=n(l,a),a++;return{values:o,keys:i}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,s]){const i=cp(e),{values:o,keys:a}=this.dt(t,n,s);if(!Array.isArray(i))return this.ut=a,o;const l=this.ut??=[],c=[];let u,g,p=0,h=i.length-1,v=0,d=o.length-1;for(;p<=h&&v<=d;)if(i[p]===null)p++;else if(i[h]===null)h--;else if(l[p]===a[v])c[v]=rt(i[p],o[v]),p++,v++;else if(l[h]===a[d])c[d]=rt(i[h],o[d]),h--,d--;else if(l[p]===a[d])c[d]=rt(i[p],o[d]),Ht(e,c[d+1],i[p]),p++,d--;else if(l[h]===a[v])c[v]=rt(i[h],o[v]),Ht(e,i[p],i[h]),h--,v++;else if(u===void 0&&(u=Ta(a,v,d),g=Ta(l,p,h)),u.has(l[p]))if(u.has(l[h])){const m=g.get(a[v]),y=m!==void 0?i[m]:null;if(y===null){const C=Ht(e,i[p]);rt(C,o[v]),c[v]=C}else c[v]=rt(y,o[v]),Ht(e,i[p],y),i[m]=null;v++}else Ks(i[h]),h--;else Ks(i[p]),p++;for(;v<=d;){const m=Ht(e,c[d+1]);rt(m,o[v]),c[v++]=m}for(;p<=h;){const m=i[p++];m!==null&&Ks(m)}return this.ut=a,lp(e,c),Xe}}),X={messageSquare:r`
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
  `};function dp(e,t){const n=ps(t,e.basePath),s=ro(t,e.uiLocale);return r`
    <a
      href=${n}
      class="nav-item ${e.tab===t?"active":""}"
      @click=${i=>{i.defaultPrevented||i.button!==0||i.metaKey||i.ctrlKey||i.shiftKey||i.altKey||(i.preventDefault(),e.setTab(t))}}
      title=${s}
    >
      <span class="nav-item__icon" aria-hidden="true">${X[Ku(t)]}</span>
      <span class="nav-item__text">${s}</span>
    </a>
  `}function up(e){const t=(g,p)=>W(e.uiLocale,g,p),n=gp(e.hello,e.sessionsResult),s=pp(e.sessionKey,e.sessionsResult,n),i=e.onboarding,o=e.onboarding,a=e.onboarding?!1:e.settings.chatShowThinking,l=e.onboarding?!0:e.settings.chatFocusMode,c=r`
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
  `,u=r`
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
          @change=${g=>{const p=g.target.value;e.sessionKey=p,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:p,lastActiveSessionKey:p}),e.loadAssistantIdentity(),ig(e,p),un(e)}}
        >
          ${Ll(s,g=>g.key,g=>r`<option value=${g.key}>
                ${g.displayName??g.key}
              </option>`)}
        </select>
      </label>
      <button
        class="btn btn--sm btn--icon"
        ?disabled=${e.chatLoading||!e.connected}
        @click=${async()=>{const g=e;g.chatManualRefreshInFlight=!0,g.chatNewMessagesBelow=!1,await g.updateComplete,g.resetToolStream();try{await Al(e,{scheduleScroll:!1}),g.scrollToBottom({smooth:!0})}finally{requestAnimationFrame(()=>{g.chatManualRefreshInFlight=!1,g.chatNewMessagesBelow=!1})}}}
        title=${t("Refresh chat data","刷新聊天数据")}
      >
        ${c}
      </button>
      <span class="chat-controls__separator">|</span>
      <button
        class="btn btn--sm btn--icon ${a?"active":""}"
        ?disabled=${i}
        @click=${()=>{i||e.applySettings({...e.settings,chatShowThinking:!e.settings.chatShowThinking})}}
        aria-pressed=${a}
        title=${i?t("Disabled during onboarding","引导期间不可用"):t("Toggle assistant thinking/working output","切换助手思考/执行输出")}
      >
        ${X.brain}
      </button>
      <button
        class="btn btn--sm btn--icon ${l?"active":""}"
        ?disabled=${o}
        @click=${()=>{o||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})}}
        aria-pressed=${l}
        title=${o?t("Disabled during onboarding","引导期间不可用"):t("Toggle focus mode (hide sidebar + page header)","切换专注模式（隐藏侧栏和页头）")}
      >
        ${u}
      </button>
    </div>
  `}function gp(e,t){const n=e?.snapshot,s=n?.sessionDefaults?.mainSessionKey?.trim();if(s)return s;const i=n?.sessionDefaults?.mainKey?.trim();return i||(t?.sessions?.some(o=>o.key==="main")?"main":null)}function js(e,t){const n=t?.label?.trim()||"",s=t?.displayName?.trim()||"";return n&&n!==e?`${n} (${e})`:s&&s!==e?`${e} (${s})`:e}function pp(e,t,n){const s=new Set,i=[],o=n&&t?.sessions?.find(l=>l.key===n),a=t?.sessions?.find(l=>l.key===e);if(n&&(s.add(n),i.push({key:n,displayName:js(n,o||void 0)})),s.has(e)||(s.add(e),i.push({key:e,displayName:js(e,a)})),t?.sessions)for(const l of t.sessions)s.has(l.key)||(s.add(l.key),i.push({key:l.key,displayName:js(l.key,l)}));return i}const hp=["system","light","dark"];function fp(e){const t=(i,o)=>W(e.uiLocale,i,o),n=Math.max(0,hp.indexOf(e.theme)),s=i=>o=>{const l={element:o.currentTarget};(o.clientX||o.clientY)&&(l.pointerClientX=o.clientX,l.pointerClientY=o.clientY),e.setTheme(i,l)};return r`
    <div class="theme-toggle" style="--theme-index: ${n};">
      <div class="theme-toggle__track" role="group" aria-label=${t("Theme","主题")}>
        <span class="theme-toggle__indicator"></span>
        <button
          class="theme-toggle__button ${e.theme==="system"?"active":""}"
          @click=${s("system")}
          aria-pressed=${e.theme==="system"}
          aria-label=${t("System theme","系统主题")}
          title=${t("System","系统")}
        >
          ${bp()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="light"?"active":""}"
          @click=${s("light")}
          aria-pressed=${e.theme==="light"}
          aria-label=${t("Light theme","浅色主题")}
          title=${t("Light","浅色")}
        >
          ${vp()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="dark"?"active":""}"
          @click=${s("dark")}
          aria-pressed=${e.theme==="dark"}
          aria-label=${t("Dark theme","深色主题")}
          title=${t("Dark","深色")}
        >
          ${mp()}
        </button>
      </div>
    </div>
  `}function vp(){return r`
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
  `}function mp(){return r`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
      ></path>
    </svg>
  `}function bp(){return r`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="14" x="2" y="3" rx="2"></rect>
      <line x1="8" x2="16" y1="21" y2="21"></line>
      <line x1="12" x2="12" y1="17" y2="21"></line>
    </svg>
  `}function El(e,t){if(!e)return e;const s=e.files.some(i=>i.name===t.name)?e.files.map(i=>i.name===t.name?t:i):[...e.files,t];return{...e,files:s}}async function Ws(e,t){if(!(!e.client||!e.connected||e.agentFilesLoading)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const n=await e.client.request("agents.files.list",{agentId:t});n&&(e.agentFilesList=n,e.agentFileActive&&!n.files.some(s=>s.name===e.agentFileActive)&&(e.agentFileActive=null))}catch(n){e.agentFilesError=String(n)}finally{e.agentFilesLoading=!1}}}async function yp(e,t,n,s){if(!(!e.client||!e.connected||e.agentFilesLoading)&&!Object.hasOwn(e.agentFileContents,n)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const i=await e.client.request("agents.files.get",{agentId:t,name:n});if(i?.file){const o=i.file.content??"",a=e.agentFileContents[n]??"",l=e.agentFileDrafts[n],c=s?.preserveDraft??!0;e.agentFilesList=El(e.agentFilesList,i.file),e.agentFileContents={...e.agentFileContents,[n]:o},(!c||!Object.hasOwn(e.agentFileDrafts,n)||l===a)&&(e.agentFileDrafts={...e.agentFileDrafts,[n]:o})}}catch(i){e.agentFilesError=String(i)}finally{e.agentFilesLoading=!1}}}async function xp(e,t,n,s){if(!(!e.client||!e.connected||e.agentFileSaving)){e.agentFileSaving=!0,e.agentFilesError=null;try{const i=await e.client.request("agents.files.set",{agentId:t,name:n,content:s});i?.file&&(e.agentFilesList=El(e.agentFilesList,i.file),e.agentFileContents={...e.agentFileContents,[n]:s},e.agentFileDrafts={...e.agentFileDrafts,[n]:s})}catch(i){e.agentFilesError=String(i)}finally{e.agentFileSaving=!1}}}async function Il(e,t){if(!(!e.client||!e.connected)&&!e.usageLoading){e.usageLoading=!0,e.usageError=null;try{const n=t?.startDate??e.usageStartDate,s=t?.endDate??e.usageEndDate,[i,o]=await Promise.all([e.client.request("sessions.usage",{startDate:n,endDate:s,limit:1e3,includeContextWeight:!0}),e.client.request("usage.cost",{startDate:n,endDate:s})]);i&&(e.usageResult=i),o&&(e.usageCostSummary=o)}catch(n){e.usageError=String(n)}finally{e.usageLoading=!1}}}async function $p(e,t){if(!(!e.client||!e.connected)&&!e.usageTimeSeriesLoading){e.usageTimeSeriesLoading=!0,e.usageTimeSeries=null;try{const n=await e.client.request("sessions.usage.timeseries",{key:t});n&&(e.usageTimeSeries=n)}catch{e.usageTimeSeries=null}finally{e.usageTimeSeriesLoading=!1}}}async function wp(e,t){if(!(!e.client||!e.connected)&&!e.usageSessionLogsLoading){e.usageSessionLogsLoading=!0,e.usageSessionLogs=null;try{const n=await e.client.request("sessions.usage.logs",{key:t,limit:500});n&&Array.isArray(n.logs)&&(e.usageSessionLogs=n.logs)}catch{e.usageSessionLogs=null}finally{e.usageSessionLogsLoading=!1}}}const kp={bash:"exec","apply-patch":"apply_patch"},Sp={"group:memory":["memory_search","memory_get"],"group:web":["web_search","web_fetch"],"group:fs":["read","write","edit","apply_patch"],"group:runtime":["exec","process"],"group:sessions":["sessions_list","sessions_history","sessions_send","sessions_spawn","session_status"],"group:ui":["browser","canvas"],"group:automation":["cron","gateway"],"group:messaging":["message"],"group:nodes":["nodes"],"group:opensoul":["browser","canvas","nodes","cron","message","gateway","agents_list","sessions_list","sessions_history","sessions_send","sessions_spawn","session_status","memory_search","memory_get","web_search","web_fetch","image"]},Ap={minimal:{allow:["session_status"]},coding:{allow:["group:fs","group:runtime","group:sessions","group:memory","image"]},messaging:{allow:["group:messaging","sessions_list","sessions_history","sessions_send","session_status"]},full:{}};function Ne(e){const t=e.trim().toLowerCase();return kp[t]??t}function Cp(e){return e?e.map(Ne).filter(Boolean):[]}function Tp(e){const t=Cp(e),n=[];for(const s of t){const i=Sp[s];if(i){n.push(...i);continue}n.push(s)}return Array.from(new Set(n))}function _p(e){if(!e)return;const t=Ap[e];if(t&&!(!t.allow&&!t.deny))return{allow:t.allow?[...t.allow]:void 0,deny:t.deny?[...t.deny]:void 0}}function Lp(e){const t=e.host??"unknown",n=e.ip?`(${e.ip})`:"",s=e.mode??"",i=e.version??"";return`${t} ${n} ${s} ${i}`.trim()}function Ep(e){const t=e.ts??null;return t?Y(t):"n/a"}function fo(e){return e?`${bt(e)} (${Y(e)})`:"n/a"}function Ip(e){if(e.totalTokens==null)return"n/a";const t=e.totalTokens??0,n=e.contextTokens??0;return n?`${t} / ${n}`:String(t)}function Mp(e){if(e==null)return"";try{return JSON.stringify(e,null,2)}catch{return String(e)}}function Rp(e){const t=e.state??{},n=t.nextRunAtMs?bt(t.nextRunAtMs):"n/a",s=t.lastRunAtMs?bt(t.lastRunAtMs):"n/a";return`${t.lastStatus??"n/a"} · next ${n} · last ${s}`}function Ml(e){const t=e.schedule;if(t.kind==="at"){const n=Date.parse(t.at);return Number.isFinite(n)?`At ${bt(n)}`:`At ${t.at}`}return t.kind==="every"?`Every ${Zi(t.everyMs)}`:`Cron ${t.expr}${t.tz?` (${t.tz})`:""}`}function Pp(e){const t=e.payload;if(t.kind==="systemEvent")return`System: ${t.text}`;const n=`Agent: ${t.message}`,s=e.delivery;if(s&&s.mode!=="none"){const i=s.channel||s.to?` (${s.channel??"last"}${s.to?` -> ${s.to}`:""})`:"";return`${n} · ${s.mode}${i}`}return n}const _a=[{id:"fs",label:"Files",tools:[{id:"read",label:"read",description:"Read file contents"},{id:"write",label:"write",description:"Create or overwrite files"},{id:"edit",label:"edit",description:"Make precise edits"},{id:"apply_patch",label:"apply_patch",description:"Patch files (OpenAI)"}]},{id:"runtime",label:"Runtime",tools:[{id:"exec",label:"exec",description:"Run shell commands"},{id:"process",label:"process",description:"Manage background processes"}]},{id:"web",label:"Web",tools:[{id:"web_search",label:"web_search",description:"Search the web"},{id:"web_fetch",label:"web_fetch",description:"Fetch web content"}]},{id:"memory",label:"Memory",tools:[{id:"memory_search",label:"memory_search",description:"Semantic search"},{id:"memory_get",label:"memory_get",description:"Read memory files"}]},{id:"sessions",label:"Sessions",tools:[{id:"sessions_list",label:"sessions_list",description:"List sessions"},{id:"sessions_history",label:"sessions_history",description:"Session history"},{id:"sessions_send",label:"sessions_send",description:"Send to session"},{id:"sessions_spawn",label:"sessions_spawn",description:"Spawn sub-agent"},{id:"session_status",label:"session_status",description:"Session status"}]},{id:"ui",label:"UI",tools:[{id:"browser",label:"browser",description:"Control web browser"},{id:"canvas",label:"canvas",description:"Control canvases"}]},{id:"messaging",label:"Messaging",tools:[{id:"message",label:"message",description:"Send messages"}]},{id:"automation",label:"Automation",tools:[{id:"cron",label:"cron",description:"Schedule tasks"},{id:"gateway",label:"gateway",description:"Gateway control"}]},{id:"nodes",label:"Nodes",tools:[{id:"nodes",label:"nodes",description:"Nodes + devices"}]},{id:"agents",label:"Agents",tools:[{id:"agents_list",label:"agents_list",description:"List agents"}]},{id:"media",label:"Media",tools:[{id:"image",label:"image",description:"Image understanding"}]}],Dp=[{id:"minimal",label:"Minimal"},{id:"coding",label:"Coding"},{id:"messaging",label:"Messaging"},{id:"full",label:"Full"}];function ki(e){return e.name?.trim()||e.identity?.name?.trim()||e.id}function Ln(e){const t=e.trim();if(!t||t.length>16)return!1;let n=!1;for(let s=0;s<t.length;s+=1)if(t.charCodeAt(s)>127){n=!0;break}return!(!n||t.includes("://")||t.includes("/")||t.includes("."))}function vs(e,t){const n=t?.emoji?.trim();if(n&&Ln(n))return n;const s=e.identity?.emoji?.trim();if(s&&Ln(s))return s;const i=t?.avatar?.trim();if(i&&Ln(i))return i;const o=e.identity?.avatar?.trim();return o&&Ln(o)?o:""}function Rl(e,t){return t&&e===t?"default":null}function Np(e){if(e==null||!Number.isFinite(e))return"-";if(e<1024)return`${e} B`;const t=["KB","MB","GB","TB"];let n=e/1024,s=0;for(;n>=1024&&s<t.length-1;)n/=1024,s+=1;return`${n.toFixed(n<10?1:0)} ${t[s]}`}function ms(e,t){const n=e;return{entry:(n?.agents?.list??[]).find(o=>o?.id===t),defaults:n?.agents?.defaults,globalTools:n?.tools}}function Pl(e,t,n,s,i){const o=ms(t,e.id),l=(n&&n.agentId===e.id?n.workspace:null)||o.entry?.workspace||o.defaults?.workspace||"default",c=o.entry?.model?Xt(o.entry?.model):Xt(o.defaults?.model),u=i?.name?.trim()||e.identity?.name?.trim()||e.name?.trim()||o.entry?.name||e.id,g=vs(e,i)||"-",p=Array.isArray(o.entry?.skills)?o.entry?.skills:null,h=p?.length??null;return{workspace:l,model:c,identityName:u,identityEmoji:g,skillsLabel:p?`${h} selected`:"all skills",isDefault:!!(s&&e.id===s)}}function Xt(e){if(!e)return"-";if(typeof e=="string")return e.trim()||"-";if(typeof e=="object"&&e){const t=e,n=t.primary?.trim();if(n){const s=Array.isArray(t.fallbacks)?t.fallbacks.length:0;return s>0?`${n} (+${s} fallback)`:n}}return"-"}function La(e){const t=e.match(/^(.+) \(\+\d+ fallback\)$/);return t?t[1]:e}function Ea(e){if(!e)return null;if(typeof e=="string")return e.trim()||null;if(typeof e=="object"&&e){const t=e;return(typeof t.primary=="string"?t.primary:typeof t.model=="string"?t.model:typeof t.id=="string"?t.id:typeof t.value=="string"?t.value:null)?.trim()||null}return null}function Fp(e){if(!e||typeof e=="string")return null;if(typeof e=="object"&&e){const t=e,n=Array.isArray(t.fallbacks)?t.fallbacks:Array.isArray(t.fallback)?t.fallback:null;return n?n.filter(s=>typeof s=="string"):null}return null}function Op(e){return e.split(",").map(t=>t.trim()).filter(Boolean)}function Bp(e){const n=e?.agents?.defaults?.models;if(!n||typeof n!="object")return[];const s=[];for(const[i,o]of Object.entries(n)){const a=i.trim();if(!a)continue;const l=o&&typeof o=="object"&&"alias"in o&&typeof o.alias=="string"?o.alias?.trim():void 0,c=l&&l!==a?`${l} (${a})`:a;s.push({value:a,label:c})}return s}function Up(e,t){const n=Bp(e),s=t?n.some(i=>i.value===t):!1;return t&&!s&&n.unshift({value:t,label:`Current (${t})`}),n.length===0?r`
      <option value="" disabled>No configured models</option>
    `:n.map(i=>r`<option value=${i.value}>${i.label}</option>`)}function zp(e){const t=Ne(e);if(!t)return{kind:"exact",value:""};if(t==="*")return{kind:"all"};if(!t.includes("*"))return{kind:"exact",value:t};const n=t.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&");return{kind:"regex",value:new RegExp(`^${n.replaceAll("\\*",".*")}$`)}}function Si(e){return Array.isArray(e)?Tp(e).map(zp).filter(t=>t.kind!=="exact"||t.value.length>0):[]}function en(e,t){for(const n of t)if(n.kind==="all"||n.kind==="exact"&&e===n.value||n.kind==="regex"&&n.value.test(e))return!0;return!1}function Hp(e,t){if(!t)return!0;const n=Ne(e),s=Si(t.deny);if(en(n,s))return!1;const i=Si(t.allow);return!!(i.length===0||en(n,i)||n==="apply_patch"&&en("exec",i))}function Ia(e,t){if(!Array.isArray(t)||t.length===0)return!1;const n=Ne(e),s=Si(t);return!!(en(n,s)||n==="apply_patch"&&en("exec",s))}function Kp(e){const t=e.agentsList?.agents??[],n=e.agentsList?.defaultId??null,s=e.selectedAgentId??n??t[0]?.id??null,i=s?t.find(o=>o.id===s)??null:null;return r`
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
        ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:f}
        <div class="agent-list" style="margin-top: 12px;">
          ${t.length===0?r`
                  <div class="muted">No agents found.</div>
                `:t.map(o=>{const a=Rl(o.id,n),l=vs(o,e.agentIdentityById[o.id]??null);return r`
                    <button
                      type="button"
                      class="agent-row ${s===o.id?"active":""}"
                      @click=${()=>e.onSelectAgent(o.id)}
                    >
                      <div class="agent-avatar">
                        ${l||ki(o).slice(0,1)}
                      </div>
                      <div class="agent-info">
                        <div class="agent-title">${ki(o)}</div>
                        <div class="agent-sub mono">${o.id}</div>
                      </div>
                      ${a?r`<span class="agent-pill">${a}</span>`:f}
                    </button>
                  `})}
        </div>
      </section>
      <section class="agents-main">
        ${i?r`
              ${jp(i,n,e.agentIdentityById[i.id]??null)}
              ${Wp(e.activePanel,o=>e.onSelectPanel(o))}
              ${e.activePanel==="overview"?Gp({agent:i,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[i.id]??null,agentIdentityError:e.agentIdentityError,agentIdentityLoading:e.agentIdentityLoading,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave,onModelChange:e.onModelChange,onModelFallbacksChange:e.onModelFallbacksChange}):f}
              ${e.activePanel==="files"?nh({agentId:i.id,agentFilesList:e.agentFilesList,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,onLoadFiles:e.onLoadFiles,onSelectFile:e.onSelectFile,onFileDraftChange:e.onFileDraftChange,onFileReset:e.onFileReset,onFileSave:e.onFileSave}):f}
              ${e.activePanel==="tools"?ih({agentId:i.id,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onProfileChange:e.onToolsProfileChange,onOverridesChange:e.onToolsOverridesChange,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):f}
              ${e.activePanel==="skills"?ah({agentId:i.id,report:e.agentSkillsReport,loading:e.agentSkillsLoading,error:e.agentSkillsError,activeAgentId:e.agentSkillsAgentId,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,filter:e.skillsFilter,onFilterChange:e.onSkillsFilterChange,onRefresh:e.onSkillsRefresh,onToggle:e.onAgentSkillToggle,onClear:e.onAgentSkillsClear,onDisableAll:e.onAgentSkillsDisableAll,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):f}
              ${e.activePanel==="channels"?eh({agent:i,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[i.id]??null,snapshot:e.channelsSnapshot,loading:e.channelsLoading,error:e.channelsError,lastSuccess:e.channelsLastSuccess,onRefresh:e.onChannelsRefresh}):f}
              ${e.activePanel==="cron"?th({agent:i,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[i.id]??null,jobs:e.cronJobs,status:e.cronStatus,loading:e.cronLoading,error:e.cronError,onRefresh:e.onCronRefresh}):f}
            `:r`
                <div class="card">
                  <div class="card-title">Select an agent</div>
                  <div class="card-sub">Pick an agent to inspect its workspace and tools.</div>
                </div>
              `}
      </section>
    </div>
  `}function jp(e,t,n){const s=Rl(e.id,t),i=ki(e),o=e.identity?.theme?.trim()||"Agent workspace and routing.",a=vs(e,n);return r`
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
        ${s?r`<span class="agent-pill">${s}</span>`:f}
      </div>
    </section>
  `}function Wp(e,t){return r`
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
  `}function Gp(e){const{agent:t,configForm:n,agentFilesList:s,agentIdentity:i,agentIdentityLoading:o,agentIdentityError:a,configLoading:l,configSaving:c,configDirty:u,onConfigReload:g,onConfigSave:p,onModelChange:h,onModelFallbacksChange:v}=e,d=ms(n,t.id),y=(s&&s.agentId===t.id?s.workspace:null)||d.entry?.workspace||d.defaults?.workspace||"default",C=d.entry?.model?Xt(d.entry?.model):Xt(d.defaults?.model),b=Xt(d.defaults?.model),S=Ea(d.entry?.model)||(C!=="-"?La(C):null),A=Ea(d.defaults?.model)||(b!=="-"?La(b):null),T=S??A??null,M=Fp(d.entry?.model),E=M?M.join(", "):"",R=i?.name?.trim()||t.identity?.name?.trim()||t.name?.trim()||d.entry?.name||"-",Z=vs(t,i)||"-",F=Array.isArray(d.entry?.skills)?d.entry?.skills:null,K=F?.length??null,ue=o?"Loading…":a?"Unavailable":"",_=!!(e.defaultId&&t.id===e.defaultId);return r`
    <section class="card">
      <div class="card-title">Overview</div>
      <div class="card-sub">Workspace paths and identity metadata.</div>
      <div class="agents-overview-grid" style="margin-top: 16px;">
        <div class="agent-kv">
          <div class="label">Workspace</div>
          <div class="mono">${y}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Primary Model</div>
          <div class="mono">${C}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Name</div>
          <div>${R}</div>
          ${ue?r`<div class="agent-kv-sub muted">${ue}</div>`:f}
        </div>
        <div class="agent-kv">
          <div class="label">Default</div>
          <div>${_?"yes":"no"}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Emoji</div>
          <div>${Z}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Skills Filter</div>
          <div>${F?`${K} selected`:"all skills"}</div>
        </div>
      </div>

      <div class="agent-model-select" style="margin-top: 20px;">
        <div class="label">Model Selection</div>
        <div class="row" style="gap: 12px; flex-wrap: wrap;">
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Primary model${_?" (default)":""}</span>
            <select
              .value=${T??""}
              ?disabled=${!n||l||c}
              @change=${z=>h(t.id,z.target.value||null)}
            >
              ${_?f:r`
                      <option value="">
                        ${A?`Inherit default (${A})`:"Inherit default"}
                      </option>
                    `}
              ${Up(n,T??void 0)}
            </select>
          </label>
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Fallbacks (comma-separated)</span>
            <input
              .value=${E}
              ?disabled=${!n||l||c}
              placeholder="provider/model, provider/model"
              @input=${z=>v(t.id,Op(z.target.value))}
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
            @click=${p}
          >
            ${c?"Saving…":"Save"}
          </button>
        </div>
      </div>
    </section>
  `}function Dl(e,t){return r`
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
  `}function qp(e,t){const n=e.channelMeta?.find(s=>s.id===t);return n?.label?n.label:e.channelLabels?.[t]??t}function Vp(e){if(!e)return[];const t=new Set;for(const i of e.channelOrder??[])t.add(i);for(const i of e.channelMeta??[])t.add(i.id);for(const i of Object.keys(e.channelAccounts??{}))t.add(i);const n=[],s=e.channelOrder?.length?e.channelOrder:Array.from(t);for(const i of s)t.has(i)&&(n.push(i),t.delete(i));for(const i of t)n.push(i);return n.map(i=>({id:i,label:qp(e,i),accounts:e.channelAccounts?.[i]??[]}))}const Qp=["groupPolicy","streamMode","dmPolicy"];function Yp(e,t){if(!e)return null;const s=(e.channels??{})[t];if(s&&typeof s=="object")return s;const i=e[t];return i&&typeof i=="object"?i:null}function Zp(e){if(e==null)return"n/a";if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return String(e);try{return JSON.stringify(e)}catch{return"n/a"}}function Jp(e,t){const n=Yp(e,t);return n?Qp.flatMap(s=>s in n?[{label:s,value:Zp(n[s])}]:[]):[]}function Xp(e){let t=0,n=0,s=0;for(const i of e){const o=i.probe&&typeof i.probe=="object"&&"ok"in i.probe?!!i.probe.ok:!1;(i.connected===!0||i.running===!0||o)&&(t+=1),i.configured&&(n+=1),i.enabled&&(s+=1)}return{total:e.length,connected:t,configured:n,enabled:s}}function eh(e){const t=Pl(e.agent,e.configForm,e.agentFilesList,e.defaultId,e.agentIdentity),n=Vp(e.snapshot),s=e.lastSuccess?Y(e.lastSuccess):"never";return r`
    <section class="grid grid-cols-2">
      ${Dl(t,"Workspace, identity, and model configuration.")}
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
        ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:f}
        ${e.snapshot?f:r`
                <div class="callout info" style="margin-top: 12px">Load channels to see live status.</div>
              `}
        ${n.length===0?r`
                <div class="muted" style="margin-top: 16px">No channels found.</div>
              `:r`
              <div class="list" style="margin-top: 16px;">
                ${n.map(i=>{const o=Xp(i.accounts),a=o.total?`${o.connected}/${o.total} connected`:"no accounts",l=o.configured?`${o.configured} configured`:"not configured",c=o.total?`${o.enabled} enabled`:"disabled",u=Jp(e.configForm,i.id);return r`
                    <div class="list-item">
                      <div class="list-main">
                        <div class="list-title">${i.label}</div>
                        <div class="list-sub mono">${i.id}</div>
                      </div>
                      <div class="list-meta">
                        <div>${a}</div>
                        <div>${l}</div>
                        <div>${c}</div>
                        ${u.length>0?u.map(g=>r`<div>${g.label}: ${g.value}</div>`):f}
                      </div>
                    </div>
                  `})}
              </div>
            `}
      </section>
    </section>
  `}function th(e){const t=Pl(e.agent,e.configForm,e.agentFilesList,e.defaultId,e.agentIdentity),n=e.jobs.filter(s=>s.agentId===e.agent.id);return r`
    <section class="grid grid-cols-2">
      ${Dl(t,"Workspace and scheduling targets.")}
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
            <div class="stat-value">${fo(e.status?.nextWakeAtMs??null)}</div>
          </div>
        </div>
        ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:f}
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
                      ${s.description?r`<div class="list-sub">${s.description}</div>`:f}
                      <div class="chip-row" style="margin-top: 6px;">
                        <span class="chip">${Ml(s)}</span>
                        <span class="chip ${s.enabled?"chip-ok":"chip-warn"}">
                          ${s.enabled?"enabled":"disabled"}
                        </span>
                        <span class="chip">${s.sessionTarget}</span>
                      </div>
                    </div>
                    <div class="list-meta">
                      <div class="mono">${Rp(s)}</div>
                      <div class="muted">${Pp(s)}</div>
                    </div>
                  </div>
                `)}
              </div>
            `}
    </section>
  `}function nh(e){const t=e.agentFilesList?.agentId===e.agentId?e.agentFilesList:null,n=t?.files??[],s=e.agentFileActive??null,i=s?n.find(c=>c.name===s)??null:null,o=s?e.agentFileContents[s]??"":"",a=s?e.agentFileDrafts[s]??o:"",l=s?a!==o:!1;return r`
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
      ${t?r`<div class="muted mono" style="margin-top: 8px;">Workspace: ${t.workspace}</div>`:f}
      ${e.agentFilesError?r`<div class="callout danger" style="margin-top: 12px;">${e.agentFilesError}</div>`:f}
      ${t?r`
              <div class="agent-files-grid" style="margin-top: 16px;">
                <div class="agent-files-list">
                  ${n.length===0?r`
                          <div class="muted">No files found.</div>
                        `:n.map(c=>sh(c,s,()=>e.onSelectFile(c.name)))}
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
                                `:f}
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
  `}function sh(e,t,n){const s=e.missing?"Missing":`${Np(e.size)} · ${Y(e.updatedAtMs??null)}`;return r`
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
            `:f}
    </button>
  `}function ih(e){const t=ms(e.configForm,e.agentId),n=t.entry?.tools??{},s=t.globalTools??{},i=n.profile??s.profile??"full",o=n.profile?"agent override":s.profile?"global default":"default",a=Array.isArray(n.allow)&&n.allow.length>0,l=Array.isArray(s.allow)&&s.allow.length>0,c=!!e.configForm&&!e.configLoading&&!e.configSaving&&!a,u=a?[]:Array.isArray(n.alsoAllow)?n.alsoAllow:[],g=a?[]:Array.isArray(n.deny)?n.deny:[],p=a?{allow:n.allow??[],deny:n.deny??[]}:_p(i)??void 0,h=_a.flatMap(C=>C.tools.map(b=>b.id)),v=C=>{const b=Hp(C,p),S=Ia(C,u),A=Ia(C,g);return{allowed:(b||S)&&!A,baseAllowed:b,denied:A}},d=h.filter(C=>v(C).allowed).length,m=(C,b)=>{const S=new Set(u.map(E=>Ne(E)).filter(E=>E.length>0)),A=new Set(g.map(E=>Ne(E)).filter(E=>E.length>0)),T=v(C).baseAllowed,M=Ne(C);b?(A.delete(M),T||S.add(M)):(S.delete(M),A.add(M)),e.onOverridesChange(e.agentId,[...S],[...A])},y=C=>{const b=new Set(u.map(A=>Ne(A)).filter(A=>A.length>0)),S=new Set(g.map(A=>Ne(A)).filter(A=>A.length>0));for(const A of h){const T=v(A).baseAllowed,M=Ne(A);C?(S.delete(M),T||b.add(M)):(b.delete(M),S.add(M))}e.onOverridesChange(e.agentId,[...b],[...S])};return r`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Tool Access</div>
          <div class="card-sub">
            Profile + per-tool overrides for this agent.
            <span class="mono">${d}/${h.length}</span> enabled.
          </div>
        </div>
        <div class="row" style="gap: 8px;">
          <button
            class="btn btn--sm"
            ?disabled=${!c}
            @click=${()=>y(!0)}
          >
            Enable All
          </button>
          <button
            class="btn btn--sm"
            ?disabled=${!c}
            @click=${()=>y(!1)}
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

      ${e.configForm?f:r`
              <div class="callout info" style="margin-top: 12px">
                Load the gateway config to adjust tool profiles.
              </div>
            `}
      ${a?r`
              <div class="callout info" style="margin-top: 12px">
                This agent is using an explicit allowlist in config. Tool overrides are managed in the Config tab.
              </div>
            `:f}
      ${l?r`
              <div class="callout info" style="margin-top: 12px">
                Global tools.allow is set. Agent overrides cannot enable tools that are globally blocked.
              </div>
            `:f}

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
              `:f}
      </div>

      <div class="agent-tools-presets" style="margin-top: 16px;">
        <div class="label">Quick Presets</div>
        <div class="agent-tools-buttons">
          ${Dp.map(C=>r`
              <button
                class="btn btn--sm ${i===C.id?"active":""}"
                ?disabled=${!c}
                @click=${()=>e.onProfileChange(e.agentId,C.id,!0)}
              >
                ${C.label}
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
        ${_a.map(C=>r`
            <div class="agent-tools-section">
              <div class="agent-tools-header">${C.label}</div>
              <div class="agent-tools-list">
                ${C.tools.map(b=>{const{allowed:S}=v(b.id);return r`
                    <div class="agent-tool-row">
                      <div>
                        <div class="agent-tool-title mono">${b.label}</div>
                        <div class="agent-tool-sub">${b.description}</div>
                      </div>
                      <label class="cfg-toggle">
                        <input
                          type="checkbox"
                          .checked=${S}
                          ?disabled=${!c}
                          @change=${A=>m(b.id,A.target.checked)}
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
  `}const En=[{id:"workspace",label:"Workspace Skills",sources:["opensoul-workspace"]},{id:"built-in",label:"Built-in Skills",sources:["opensoul-bundled"]},{id:"installed",label:"Installed Skills",sources:["opensoul-managed"]},{id:"extra",label:"Extra Skills",sources:["opensoul-extra"]}];function oh(e){const t=new Map;for(const o of En)t.set(o.id,{id:o.id,label:o.label,skills:[]});const n=En.find(o=>o.id==="built-in"),s={id:"other",label:"Other Skills",skills:[]};for(const o of e){const a=o.bundled?n:En.find(l=>l.sources.includes(o.source));a?t.get(a.id)?.skills.push(o):s.skills.push(o)}const i=En.map(o=>t.get(o.id)).filter(o=>!!(o&&o.skills.length>0));return s.skills.length>0&&i.push(s),i}function ah(e){const t=!!e.configForm&&!e.configLoading&&!e.configSaving,n=ms(e.configForm,e.agentId),s=Array.isArray(n.entry?.skills)?n.entry?.skills:void 0,i=new Set((s??[]).map(v=>v.trim()).filter(Boolean)),o=s!==void 0,a=!!(e.report&&e.activeAgentId===e.agentId),l=a?e.report?.skills??[]:[],c=e.filter.trim().toLowerCase(),u=c?l.filter(v=>[v.name,v.description,v.source].join(" ").toLowerCase().includes(c)):l,g=oh(u),p=o?l.filter(v=>i.has(v.name)).length:l.length,h=l.length;return r`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Skills</div>
          <div class="card-sub">
            Per-agent skill allowlist and workspace skills.
            ${h>0?r`<span class="mono">${p}/${h}</span>`:f}
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

      ${e.configForm?f:r`
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
            `:f}
      ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:f}

      <div class="filters" style="margin-top: 14px;">
        <label class="field" style="flex: 1;">
          <span>Filter</span>
          <input
            .value=${e.filter}
            @input=${v=>e.onFilterChange(v.target.value)}
            placeholder="Search skills"
          />
        </label>
        <div class="muted">${u.length} shown</div>
      </div>

      ${u.length===0?r`
              <div class="muted" style="margin-top: 16px">No skills found.</div>
            `:r`
              <div class="agent-skills-groups" style="margin-top: 16px;">
                ${g.map(v=>rh(v,{agentId:e.agentId,allowSet:i,usingAllowlist:o,editable:t,onToggle:e.onToggle}))}
              </div>
            `}
    </section>
  `}function rh(e,t){const n=e.id==="workspace"||e.id==="built-in";return r`
    <details class="agent-skills-group" ?open=${!n}>
      <summary class="agent-skills-header">
        <span>${e.label}</span>
        <span class="muted">${e.skills.length}</span>
      </summary>
      <div class="list skills-grid">
        ${e.skills.map(s=>lh(s,{agentId:t.agentId,allowSet:t.allowSet,usingAllowlist:t.usingAllowlist,editable:t.editable,onToggle:t.onToggle}))}
      </div>
    </details>
  `}function lh(e,t){const n=t.usingAllowlist?t.allowSet.has(e.name):!0,s=[...e.missing.bins.map(o=>`bin:${o}`),...e.missing.env.map(o=>`env:${o}`),...e.missing.config.map(o=>`config:${o}`),...e.missing.os.map(o=>`os:${o}`)],i=[];return e.disabled&&i.push("disabled"),e.blockedByAllowlist&&i.push("blocked by allowlist"),r`
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
                `:f}
        </div>
        ${s.length>0?r`<div class="muted" style="margin-top: 6px;">Missing: ${s.join(", ")}</div>`:f}
        ${i.length>0?r`<div class="muted" style="margin-top: 6px;">Reason: ${i.join(", ")}</div>`:f}
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
  `}const ch={env:"环境",update:"更新",agents:"代理",auth:"认证",channels:"渠道",messages:"消息",commands:"命令",hooks:"钩子",skills:"技能",tools:"工具",gateway:"网关",wizard:"引导",meta:"元数据",logging:"日志",browser:"浏览器",ui:"界面",models:"模型",bindings:"绑定",broadcast:"广播",audio:"音频",session:"会话",cron:"定时任务",web:"Web",discovery:"发现",canvasHost:"画布主机",talk:"语音",plugins:"插件"},dh={env:"传递给网关进程的环境变量",update:"自动更新配置与发布通道",agents:"代理配置、模型与身份",auth:"API 密钥与认证配置",channels:"消息渠道配置（Telegram、Discord、Slack 等）",messages:"消息处理与路由设置",commands:"自定义斜杠命令",hooks:"Webhook 与事件钩子",skills:"技能包与能力",tools:"工具配置（浏览器、搜索等）",gateway:"网关服务设置（端口、认证、绑定）",wizard:"引导状态与历史",meta:"网关元数据与版本信息",logging:"日志级别与输出配置",browser:"浏览器自动化设置",ui:"界面偏好设置",models:"AI 模型配置与提供商",bindings:"按键绑定与快捷键",broadcast:"广播与通知设置",audio:"音频输入/输出设置",session:"会话管理与持久化",cron:"计划任务与自动化",web:"Web 服务与 API 设置",discovery:"服务发现与网络配置",canvasHost:"画布渲染与显示设置",talk:"语音与对话设置",plugins:"插件管理与扩展"},uh={Authentication:"认证","API keys and authentication profiles":"API 密钥与认证配置",Cooldowns:"冷却策略","Auth Profile Order":"认证配置顺序","Auth Profiles":"认证配置","Billing Backoff (hours)":"账单退避（小时）","Billing Backoff Overrides":"账单退避覆盖","Base backoff (hours) when a profile fails due to billing/insufficient credits (default: 5).":"当认证配置因账单或余额不足失败时的基础退避时间（小时，默认：5）。","Optional per-provider overrides for billing backoff (hours).":"可选：按供应商单独覆盖账单退避时间（小时）。"};function Oe(e,t,n){return W(e,t,n)}function de(e,t){const n=t.trim(),s=uh[n];return s?Oe(e,t,s):t}function Zn(e,t,n){const s=ch[t];return s?Oe(e,n,s):n}function Ai(e,t,n){const s=dh[t];return s?Oe(e,n,s):n}function Fe(e){if(e)return Array.isArray(e.type)?e.type.filter(n=>n!=="null")[0]??e.type[0]:e.type}function Nl(e){if(!e)return"";if(e.default!==void 0)return e.default;switch(Fe(e)){case"object":return{};case"array":return[];case"boolean":return!1;case"number":case"integer":return 0;case"string":return"";default:return""}}function bs(e){return e.filter(t=>typeof t=="string").join(".")}function Te(e,t){const n=bs(e),s=t[n];if(s)return s;const i=n.split(".");for(const[o,a]of Object.entries(t)){if(!o.includes("*"))continue;const l=o.split(".");if(l.length!==i.length)continue;let c=!0;for(let u=0;u<i.length;u+=1)if(l[u]!=="*"&&l[u]!==i[u]){c=!1;break}if(c)return a}}function Qe(e){return e.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/\s+/g," ").replace(/^./,t=>t.toUpperCase())}function gh(e){const t=bs(e).toLowerCase();return t.includes("token")||t.includes("password")||t.includes("secret")||t.includes("apikey")||t.endsWith("key")}const ph=new Set(["title","description","default","nullable"]);function hh(e){return Object.keys(e??{}).filter(n=>!ph.has(n)).length===0}function fh(e){if(e===void 0)return"";try{return JSON.stringify(e,null,2)??""}catch{return""}}const gn={chevronDown:r`
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
  `};function Ve(e){const{locale:t,schema:n,value:s,path:i,hints:o,unsupported:a,disabled:l,onPatch:c}=e,u=(b,S)=>Oe(t,b,S),g=e.showLabel??!0,p=Fe(n),h=Te(i,o),v=h?.label??n.title??Qe(String(i.at(-1))),d=de(t,v),m=h?.help??n.description,y=m&&de(t,m),C=bs(i);if(a.has(C))return r`<div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${d}</div>
      <div class="cfg-field__error">${u("Unsupported schema node. Use Raw mode.","不支持的配置节点，请使用原始模式。")}</div>
    </div>`;if(n.anyOf||n.oneOf){const S=(n.anyOf??n.oneOf??[]).filter(P=>!(P.type==="null"||Array.isArray(P.type)&&P.type.includes("null")));if(S.length===1)return Ve({...e,schema:S[0]});const A=P=>{if(P.const!==void 0)return P.const;if(P.enum&&P.enum.length===1)return P.enum[0]},T=S.map(A),M=T.every(P=>P!==void 0);if(M&&T.length>0&&T.length<=5){const P=s??n.default;return r`
        <div class="cfg-field">
          ${g?r`<label class="cfg-field__label">${d}</label>`:f}
          ${y?r`<div class="cfg-field__help">${y}</div>`:f}
          <div class="cfg-segmented">
            ${T.map(Z=>r`
              <button
                type="button"
                class="cfg-segmented__btn ${Z===P||String(Z)===String(P)?"active":""}"
                ?disabled=${l}
                @click=${()=>c(i,Z)}
              >
                ${String(Z)}
              </button>
            `)}
          </div>
        </div>
      `}if(M&&T.length>5)return Ra({...e,options:T,value:s??n.default});const E=new Set(S.map(P=>Fe(P)).filter(Boolean)),R=new Set([...E].map(P=>P==="integer"?"number":P));if([...R].every(P=>["string","number","boolean"].includes(P))){const P=R.has("string"),Z=R.has("number");if(R.has("boolean")&&R.size===1)return Ve({...e,schema:{...n,type:"boolean",anyOf:void 0,oneOf:void 0}});if(P||Z)return Ma({...e,inputType:Z&&!P?"number":"text"})}}if(n.enum){const b=n.enum;if(b.length<=5){const S=s??n.default;return r`
        <div class="cfg-field">
          ${g?r`<label class="cfg-field__label">${d}</label>`:f}
          ${y?r`<div class="cfg-field__help">${y}</div>`:f}
          <div class="cfg-segmented">
            ${b.map(A=>r`
              <button
                type="button"
                class="cfg-segmented__btn ${A===S||String(A)===String(S)?"active":""}"
                ?disabled=${l}
                @click=${()=>c(i,A)}
              >
                ${String(A)}
              </button>
            `)}
          </div>
        </div>
      `}return Ra({...e,options:b,value:s??n.default})}if(p==="object")return mh(e);if(p==="array")return bh(e);if(p==="boolean"){const b=typeof s=="boolean"?s:typeof n.default=="boolean"?n.default:!1;return r`
      <label class="cfg-toggle-row ${l?"disabled":""}">
        <div class="cfg-toggle-row__content">
          <span class="cfg-toggle-row__label">${d}</span>
          ${y?r`<span class="cfg-toggle-row__help">${y}</span>`:f}
        </div>
        <div class="cfg-toggle">
          <input
            type="checkbox"
            .checked=${b}
            ?disabled=${l}
            @change=${S=>c(i,S.target.checked)}
          />
          <span class="cfg-toggle__track"></span>
        </div>
      </label>
    `}return p==="number"||p==="integer"?vh(e):p==="string"?Ma({...e,inputType:"text"}):r`
    <div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${d}</div>
      <div class="cfg-field__error">${u(`Unsupported type: ${p}. Use Raw mode.`,`不支持的类型：${p}。请使用原始模式。`)}</div>
    </div>
  `}function Ma(e){const{locale:t,schema:n,value:s,path:i,hints:o,disabled:a,onPatch:l,inputType:c}=e,u=(S,A)=>Oe(t,S,A),g=e.showLabel??!0,p=Te(i,o),h=p?.label??n.title??Qe(String(i.at(-1))),v=de(t,h),d=p?.help??n.description,m=d&&de(t,d),y=p?.sensitive??gh(i),C=p?.placeholder??(y?"********":n.default!==void 0?u(`Default: ${String(n.default)}`,`默认：${String(n.default)}`):""),b=s??"";return r`
    <div class="cfg-field">
      ${g?r`<label class="cfg-field__label">${v}</label>`:f}
      ${m?r`<div class="cfg-field__help">${m}</div>`:f}
      <div class="cfg-input-wrap">
        <input
          type=${y?"password":c}
          class="cfg-input"
          placeholder=${C}
          .value=${b==null?"":String(b)}
          ?disabled=${a}
          @input=${S=>{const A=S.target.value;if(c==="number"){if(A.trim()===""){l(i,void 0);return}const T=Number(A);l(i,Number.isNaN(T)?A:T);return}l(i,A)}}
          @change=${S=>{if(c==="number")return;const A=S.target.value;l(i,A.trim())}}
        />
        ${n.default!==void 0?r`
          <button
            type="button"
            class="cfg-input__reset"
            title=${u("Reset to default","重置为默认值")}
            aria-label=${u("Reset to default","重置为默认值")}
            ?disabled=${a}
            @click=${()=>l(i,n.default)}
          >
            \u21ba
          </button>
        `:f}
      </div>
    </div>
  `}function vh(e){const{locale:t,schema:n,value:s,path:i,hints:o,disabled:a,onPatch:l}=e,c=e.showLabel??!0,u=Te(i,o),g=u?.label??n.title??Qe(String(i.at(-1))),p=de(t,g),h=u?.help??n.description,v=h&&de(t,h),d=s??n.default??"",m=typeof d=="number"?d:0;return r`
    <div class="cfg-field">
      ${c?r`<label class="cfg-field__label">${p}</label>`:f}
      ${v?r`<div class="cfg-field__help">${v}</div>`:f}
      <div class="cfg-number">
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${a}
          @click=${()=>l(i,m-1)}
        >−</button>
        <input
          type="number"
          class="cfg-number__input"
          .value=${d==null?"":String(d)}
          ?disabled=${a}
          @input=${y=>{const C=y.target.value,b=C===""?void 0:Number(C);l(i,b)}}
        />
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${a}
          @click=${()=>l(i,m+1)}
        >+</button>
      </div>
    </div>
  `}function Ra(e){const{locale:t,schema:n,value:s,path:i,hints:o,disabled:a,options:l,onPatch:c}=e,u=(S,A)=>Oe(t,S,A),g=e.showLabel??!0,p=Te(i,o),h=p?.label??n.title??Qe(String(i.at(-1))),v=de(t,h),d=p?.help??n.description,m=d&&de(t,d),y=s??n.default,C=l.findIndex(S=>S===y||String(S)===String(y)),b="__unset__";return r`
    <div class="cfg-field">
      ${g?r`<label class="cfg-field__label">${v}</label>`:f}
      ${m?r`<div class="cfg-field__help">${m}</div>`:f}
      <select
        class="cfg-select"
        ?disabled=${a}
        .value=${C>=0?String(C):b}
        @change=${S=>{const A=S.target.value;c(i,A===b?void 0:l[Number(A)])}}
      >
        <option value=${b}>${u("Select...","请选择...")}</option>
        ${l.map((S,A)=>r`
          <option value=${String(A)}>${String(S)}</option>
        `)}
      </select>
    </div>
  `}function mh(e){const{locale:t,schema:n,value:s,path:i,hints:o,unsupported:a,disabled:l,onPatch:c}=e,u=Te(i,o),g=u?.label??n.title??Qe(String(i.at(-1))),p=de(t,g),h=u?.help??n.description,v=h&&de(t,h),d=s??n.default,m=d&&typeof d=="object"&&!Array.isArray(d)?d:{},y=n.properties??{},b=Object.entries(y).toSorted((M,E)=>{const R=Te([...i,M[0]],o)?.order??0,P=Te([...i,E[0]],o)?.order??0;return R!==P?R-P:M[0].localeCompare(E[0])}),S=new Set(Object.keys(y)),A=n.additionalProperties,T=!!A&&typeof A=="object";return i.length===1?r`
      <div class="cfg-fields">
        ${b.map(([M,E])=>Ve({locale:t,schema:E,value:m[M],path:[...i,M],hints:o,unsupported:a,disabled:l,onPatch:c}))}
        ${T?Pa({locale:t,schema:A,value:m,path:i,hints:o,unsupported:a,disabled:l,reservedKeys:S,onPatch:c}):f}
      </div>
    `:r`
    <details class="cfg-object" open>
      <summary class="cfg-object__header">
        <span class="cfg-object__title">${p}</span>
        <span class="cfg-object__chevron">${gn.chevronDown}</span>
      </summary>
      ${v?r`<div class="cfg-object__help">${v}</div>`:f}
      <div class="cfg-object__content">
        ${b.map(([M,E])=>Ve({locale:t,schema:E,value:m[M],path:[...i,M],hints:o,unsupported:a,disabled:l,onPatch:c}))}
        ${T?Pa({locale:t,schema:A,value:m,path:i,hints:o,unsupported:a,disabled:l,reservedKeys:S,onPatch:c}):f}
      </div>
    </details>
  `}function bh(e){const{locale:t,schema:n,value:s,path:i,hints:o,unsupported:a,disabled:l,onPatch:c}=e,u=(b,S)=>Oe(t,b,S),g=e.showLabel??!0,p=Te(i,o),h=p?.label??n.title??Qe(String(i.at(-1))),v=de(t,h),d=p?.help??n.description,m=d&&de(t,d),y=Array.isArray(n.items)?n.items[0]:n.items;if(!y)return r`
      <div class="cfg-field cfg-field--error">
        <div class="cfg-field__label">${v}</div>
        <div class="cfg-field__error">${u("Unsupported array schema. Use Raw mode.","不支持的数组配置结构，请使用原始模式。")}</div>
      </div>
    `;const C=Array.isArray(s)?s:Array.isArray(n.default)?n.default:[];return r`
    <div class="cfg-array">
      <div class="cfg-array__header">
        ${g?r`<span class="cfg-array__label">${v}</span>`:f}
        <span class="cfg-array__count">${u(`${C.length} item${C.length!==1?"s":""}`,`${C.length} 项`)}</span>
        <button
          type="button"
          class="cfg-array__add"
          ?disabled=${l}
          @click=${()=>{const b=[...C,Nl(y)];c(i,b)}}
        >
          <span class="cfg-array__add-icon">${gn.plus}</span>
          ${u("Add","添加")}
        </button>
      </div>
      ${m?r`<div class="cfg-array__help">${m}</div>`:f}

      ${C.length===0?r`
              <div class="cfg-array__empty">${u('No items yet. Click "Add" to create one.',"还没有条目，点击“添加”创建。")}</div>
            `:r`
        <div class="cfg-array__items">
          ${C.map((b,S)=>r`
            <div class="cfg-array__item">
              <div class="cfg-array__item-header">
                <span class="cfg-array__item-index">#${S+1}</span>
                <button
                  type="button"
                  class="cfg-array__item-remove"
                  title=${u("Remove item","移除条目")}
                  ?disabled=${l}
                  @click=${()=>{const A=[...C];A.splice(S,1),c(i,A)}}
                >
                  ${gn.trash}
                </button>
              </div>
              <div class="cfg-array__item-content">
                ${Ve({locale:t,schema:y,value:b,path:[...i,S],hints:o,unsupported:a,disabled:l,showLabel:!1,onPatch:c})}
              </div>
            </div>
          `)}
        </div>
      `}
    </div>
  `}function Pa(e){const{locale:t,schema:n,value:s,path:i,hints:o,unsupported:a,disabled:l,reservedKeys:c,onPatch:u}=e,g=(v,d)=>Oe(t,v,d),p=hh(n),h=Object.entries(s??{}).filter(([v])=>!c.has(v));return r`
    <div class="cfg-map">
      <div class="cfg-map__header">
        <span class="cfg-map__label">${g("Custom entries","自定义条目")}</span>
        <button
          type="button"
          class="cfg-map__add"
          ?disabled=${l}
          @click=${()=>{const v={...s};let d=1,m=`custom-${d}`;for(;m in v;)d+=1,m=`custom-${d}`;v[m]=p?{}:Nl(n),u(i,v)}}
        >
          <span class="cfg-map__add-icon">${gn.plus}</span>
          ${g("Add Entry","添加条目")}
        </button>
      </div>

      ${h.length===0?r`
              <div class="cfg-map__empty">${g("No custom entries.","暂无自定义条目。")}</div>
            `:r`
        <div class="cfg-map__items">
          ${h.map(([v,d])=>{const m=[...i,v],y=fh(d);return r`
              <div class="cfg-map__item">
                <div class="cfg-map__item-key">
                  <input
                    type="text"
                    class="cfg-input cfg-input--sm"
                    placeholder=${g("Key","键")}
                    .value=${v}
                    ?disabled=${l}
                    @change=${C=>{const b=C.target.value.trim();if(!b||b===v)return;const S={...s};b in S||(S[b]=S[v],delete S[v],u(i,S))}}
                  />
                </div>
                <div class="cfg-map__item-value">
                  ${p?r`
                        <textarea
                          class="cfg-textarea cfg-textarea--sm"
                          placeholder=${g("JSON value","JSON 值")}
                          rows="2"
                          .value=${y}
                          ?disabled=${l}
                          @change=${C=>{const b=C.target,S=b.value.trim();if(!S){u(m,void 0);return}try{u(m,JSON.parse(S))}catch{b.value=y}}}
                        ></textarea>
                      `:Ve({locale:t,schema:n,value:d,path:m,hints:o,unsupported:a,disabled:l,showLabel:!1,onPatch:u})}
                </div>
                <button
                  type="button"
                  class="cfg-map__item-remove"
                  title=${g("Remove entry","移除条目")}
                  aria-label=${g("Remove entry","移除条目")}
                  ?disabled=${l}
                  @click=${()=>{const C={...s};delete C[v],u(i,C)}}
                >
                  ${gn.trash}
                </button>
              </div>
            `})}
        </div>
      `}
    </div>
  `}const Da={env:r`
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
  `},vo={env:{label:"Environment Variables",description:"Environment variables passed to the gateway process"},update:{label:"Updates",description:"Auto-update settings and release channel"},agents:{label:"Agents",description:"Agent configurations, models, and identities"},auth:{label:"Authentication",description:"API keys and authentication profiles"},channels:{label:"Channels",description:"Messaging channels (Telegram, Discord, Slack, etc.)"},messages:{label:"Messages",description:"Message handling and routing settings"},commands:{label:"Commands",description:"Custom slash commands"},hooks:{label:"Hooks",description:"Webhooks and event hooks"},skills:{label:"Skills",description:"Skill packs and capabilities"},tools:{label:"Tools",description:"Tool configurations (browser, search, etc.)"},gateway:{label:"Gateway",description:"Gateway server settings (port, auth, binding)"},wizard:{label:"Setup Wizard",description:"Setup wizard state and history"},meta:{label:"Metadata",description:"Gateway metadata and version information"},logging:{label:"Logging",description:"Log levels and output configuration"},browser:{label:"Browser",description:"Browser automation settings"},ui:{label:"UI",description:"User interface preferences"},models:{label:"Models",description:"AI model configurations and providers"},bindings:{label:"Bindings",description:"Key bindings and shortcuts"},broadcast:{label:"Broadcast",description:"Broadcast and notification settings"},audio:{label:"Audio",description:"Audio input/output settings"},session:{label:"Session",description:"Session management and persistence"},cron:{label:"Cron",description:"Scheduled tasks and automation"},web:{label:"Web",description:"Web server and API settings"},discovery:{label:"Discovery",description:"Service discovery and networking"},canvasHost:{label:"Canvas Host",description:"Canvas rendering and display"},talk:{label:"Talk",description:"Voice and speech settings"},plugins:{label:"Plugins",description:"Plugin management and extensions"}};function Na(e){return Da[e]??Da.default}function yh(e,t,n){if(!n)return!0;const s=n.toLowerCase(),i=vo[e];return e.toLowerCase().includes(s)||i&&(i.label.toLowerCase().includes(s)||i.description.toLowerCase().includes(s))?!0:Yt(t,s)}function Yt(e,t){if(e.title?.toLowerCase().includes(t)||e.description?.toLowerCase().includes(t)||e.enum?.some(s=>String(s).toLowerCase().includes(t)))return!0;if(e.properties){for(const[s,i]of Object.entries(e.properties))if(s.toLowerCase().includes(t)||Yt(i,t))return!0}if(e.items){const s=Array.isArray(e.items)?e.items:[e.items];for(const i of s)if(i&&Yt(i,t))return!0}if(e.additionalProperties&&typeof e.additionalProperties=="object"&&Yt(e.additionalProperties,t))return!0;const n=e.anyOf??e.oneOf??e.allOf;if(n){for(const s of n)if(s&&Yt(s,t))return!0}return!1}function xh(e){const t=(h,v)=>Oe(e.locale,h,v);if(!e.schema)return r`
      <div class="muted">${t("Schema unavailable.","配置结构不可用。")}</div>
    `;const n=e.schema,s=e.value??{};if(Fe(n)!=="object"||!n.properties)return r`
      <div class="callout danger">${t("Unsupported schema. Use Raw.","不支持的配置结构，请使用原始模式。")}</div>
    `;const i=new Set(e.unsupportedPaths??[]),o=n.properties,a=e.searchQuery??"",l=e.activeSection,c=e.activeSubsection??null,g=Object.entries(o).toSorted((h,v)=>{const d=Te([h[0]],e.uiHints)?.order??50,m=Te([v[0]],e.uiHints)?.order??50;return d!==m?d-m:h[0].localeCompare(v[0])}).filter(([h,v])=>!(l&&h!==l||a&&!yh(h,v,a)));let p=null;if(l&&c&&g.length===1){const h=g[0]?.[1];h&&Fe(h)==="object"&&h.properties&&h.properties[c]&&(p={sectionKey:l,subsectionKey:c,schema:h.properties[c]})}return g.length===0?r`
      <div class="config-empty">
        <div class="config-empty__icon">${X.search}</div>
        <div class="config-empty__text">
          ${a?t(`No settings match "${a}"`,`未找到匹配“${a}”的设置`):t("No settings in this section","这个分组没有设置")}
        </div>
      </div>
    `:r`
    <div class="config-form config-form--modern">
      ${p?(()=>{const{sectionKey:h,subsectionKey:v,schema:d}=p,m=Te([h,v],e.uiHints),y=m?.label??d.title??Qe(v),C=de(e.locale,y),b=m?.help??d.description??"",S=b&&de(e.locale,b),A=s[h],T=A&&typeof A=="object"?A[v]:void 0,M=`config-section-${h}-${v}`;return r`
              <section class="config-section-card" id=${M}>
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${Na(h)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${C}</h3>
                    ${S?r`<p class="config-section-card__desc">${S}</p>`:f}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${Ve({locale:e.locale,schema:d,value:T,path:[h,v],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})():g.map(([h,v])=>{const d=vo[h]??{label:h.charAt(0).toUpperCase()+h.slice(1),description:v.description??""},m={label:Zn(e.locale,h,d.label),description:de(e.locale,Ai(e.locale,h,d.description))};return r`
              <section class="config-section-card" id="config-section-${h}">
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${Na(h)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${m.label}</h3>
                    ${m.description?r`<p class="config-section-card__desc">${m.description}</p>`:f}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${Ve({locale:e.locale,schema:v,value:s[h],path:[h],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})}
    </div>
  `}const $h=new Set(["title","description","default","nullable"]);function wh(e){return Object.keys(e??{}).filter(n=>!$h.has(n)).length===0}function Fl(e){const t=e.filter(i=>i!=null),n=t.length!==e.length,s=[];for(const i of t)s.some(o=>Object.is(o,i))||s.push(i);return{enumValues:s,nullable:n}}function Ol(e){return!e||typeof e!="object"?{schema:null,unsupportedPaths:["<root>"]}:tn(e,[])}function tn(e,t){const n=new Set,s={...e},i=bs(t)||"<root>";if(e.anyOf||e.oneOf||e.allOf){const l=kh(e,t);return l||{schema:e,unsupportedPaths:[i]}}const o=Array.isArray(e.type)&&e.type.includes("null"),a=Fe(e)??(e.properties||e.additionalProperties?"object":void 0);if(s.type=a??e.type,s.nullable=o||e.nullable,s.enum){const{enumValues:l,nullable:c}=Fl(s.enum);s.enum=l,c&&(s.nullable=!0),l.length===0&&n.add(i)}if(a==="object"){const l=e.properties??{},c={};for(const[u,g]of Object.entries(l)){const p=tn(g,[...t,u]);p.schema&&(c[u]=p.schema);for(const h of p.unsupportedPaths)n.add(h)}if(s.properties=c,e.additionalProperties===!0)n.add(i);else if(e.additionalProperties===!1)s.additionalProperties=!1;else if(e.additionalProperties&&typeof e.additionalProperties=="object"&&!wh(e.additionalProperties)){const u=tn(e.additionalProperties,[...t,"*"]);s.additionalProperties=u.schema??e.additionalProperties,u.unsupportedPaths.length>0&&n.add(i)}}else if(a==="array"){const l=Array.isArray(e.items)?e.items[0]:e.items;if(!l)n.add(i);else{const c=tn(l,[...t,"*"]);s.items=c.schema??l,c.unsupportedPaths.length>0&&n.add(i)}}else a!=="string"&&a!=="number"&&a!=="integer"&&a!=="boolean"&&!s.enum&&n.add(i);return{schema:s,unsupportedPaths:Array.from(n)}}function kh(e,t){if(e.allOf)return null;const n=e.anyOf??e.oneOf;if(!n)return null;const s=[],i=[];let o=!1;for(const l of n){if(!l||typeof l!="object")return null;if(Array.isArray(l.enum)){const{enumValues:c,nullable:u}=Fl(l.enum);s.push(...c),u&&(o=!0);continue}if("const"in l){if(l.const==null){o=!0;continue}s.push(l.const);continue}if(Fe(l)==="null"){o=!0;continue}i.push(l)}if(s.length>0&&i.length===0){const l=[];for(const c of s)l.some(u=>Object.is(u,c))||l.push(c);return{schema:{...e,enum:l,nullable:o,anyOf:void 0,oneOf:void 0,allOf:void 0},unsupportedPaths:[]}}if(i.length===1){const l=tn(i[0],t);return l.schema&&(l.schema.nullable=o||l.schema.nullable),l}const a=new Set(["string","number","integer","boolean"]);return i.length>0&&s.length===0&&i.every(l=>l.type&&a.has(String(l.type)))?{schema:{...e,nullable:o},unsupportedPaths:[]}:null}function Sh(e,t){let n=e;for(const s of t){if(!n)return null;const i=Fe(n);if(i==="object"){const o=n.properties??{};if(typeof s=="string"&&o[s]){n=o[s];continue}const a=n.additionalProperties;if(typeof s=="string"&&a&&typeof a=="object"){n=a;continue}return null}if(i==="array"){if(typeof s!="number")return null;n=(Array.isArray(n.items)?n.items[0]:n.items)??null;continue}return null}return n}function Ah(e,t){const s=(e.channels??{})[t],i=e[t];return(s&&typeof s=="object"?s:null)??(i&&typeof i=="object"?i:null)??{}}const Ch=["groupPolicy","streamMode","dmPolicy"];function Th(e){if(e==null)return"n/a";if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return String(e);try{return JSON.stringify(e)}catch{return"n/a"}}function _h(e){const t=Ch.flatMap(n=>n in e?[[n,e[n]]]:[]);return t.length===0?null:r`
    <div class="status-list" style="margin-top: 12px;">
      ${t.map(([n,s])=>r`
          <div>
            <span class="label">${n}</span>
            <span>${Th(s)}</span>
          </div>
        `)}
    </div>
  `}function Lh(e){const t=Ol(e.schema),n=t.schema;if(!n)return r`
      <div class="callout danger">Schema unavailable. Use Raw.</div>
    `;const s=Sh(n,["channels",e.channelId]);if(!s)return r`
      <div class="callout danger">Channel config schema unavailable.</div>
    `;const i=e.configValue??{},o=Ah(i,e.channelId);return r`
    <div class="config-form">
      ${Ve({schema:s,value:o,path:["channels",e.channelId],hints:e.uiHints,unsupported:new Set(t.unsupportedPaths),disabled:e.disabled,showLabel:!1,onPatch:e.onPatch})}
    </div>
    ${_h(o)}
  `}function Ye(e){const{channelId:t,props:n}=e,s=n.configSaving||n.configSchemaLoading;return r`
    <div style="margin-top: 16px;">
      ${n.configSchemaLoading?r`
              <div class="muted">Loading config schema…</div>
            `:Lh({channelId:t,configValue:n.configForm,schema:n.configSchema,uiHints:n.configUiHints,disabled:s,onPatch:n.onConfigPatch})}
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
  `}function Eh(e){const{props:t,discord:n,accountCountLabel:s}=e;return r`
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
          <span>${n?.lastStartAt?Y(n.lastStartAt):"n/a"}</span>
        </div>
        <div>
          <span class="label">Last probe</span>
          <span>${n?.lastProbeAt?Y(n.lastProbeAt):"n/a"}</span>
        </div>
      </div>

      ${n?.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:f}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            Probe ${n.probe.ok?"ok":"failed"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:f}

      ${Ye({channelId:"discord",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Probe
        </button>
      </div>
    </div>
  `}function Ih(e){const{props:t,googleChat:n,accountCountLabel:s}=e;return r`
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
          <span>${n?.lastStartAt?Y(n.lastStartAt):"n/a"}</span>
        </div>
        <div>
          <span class="label">Last probe</span>
          <span>${n?.lastProbeAt?Y(n.lastProbeAt):"n/a"}</span>
        </div>
      </div>

      ${n?.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:f}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            Probe ${n.probe.ok?"ok":"failed"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:f}

      ${Ye({channelId:"googlechat",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Probe
        </button>
      </div>
    </div>
  `}function Mh(e){const{props:t,imessage:n,accountCountLabel:s}=e;return r`
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
          <span>${n?.lastStartAt?Y(n.lastStartAt):"n/a"}</span>
        </div>
        <div>
          <span class="label">Last probe</span>
          <span>${n?.lastProbeAt?Y(n.lastProbeAt):"n/a"}</span>
        </div>
      </div>

      ${n?.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:f}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            Probe ${n.probe.ok?"ok":"failed"} ·
            ${n.probe.error??""}
          </div>`:f}

      ${Ye({channelId:"imessage",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Probe
        </button>
      </div>
    </div>
  `}function Fa(e){return e?e.length<=20?e:`${e.slice(0,8)}...${e.slice(-8)}`:"n/a"}function Rh(e){const{props:t,nostr:n,nostrAccounts:s,accountCountLabel:i,profileFormState:o,profileFormCallbacks:a,onEditProfile:l}=e,c=s[0],u=n?.configured??c?.configured??!1,g=n?.running??c?.running??!1,p=n?.publicKey??c?.publicKey,h=n?.lastStartAt??c?.lastStartAt??null,v=n?.lastError??c?.lastError??null,d=s.length>1,m=o!=null,y=b=>{const S=b.publicKey,A=b.profile,T=A?.displayName??A?.name??b.name??b.accountId;return r`
      <div class="account-card">
        <div class="account-card-header">
          <div class="account-card-title">${T}</div>
          <div class="account-card-id">${b.accountId}</div>
        </div>
        <div class="status-list account-card-status">
          <div>
            <span class="label">Running</span>
            <span>${b.running?"Yes":"No"}</span>
          </div>
          <div>
            <span class="label">Configured</span>
            <span>${b.configured?"Yes":"No"}</span>
          </div>
          <div>
            <span class="label">Public Key</span>
            <span class="monospace" title="${S??""}">${Fa(S)}</span>
          </div>
          <div>
            <span class="label">Last inbound</span>
            <span>${b.lastInboundAt?Y(b.lastInboundAt):"n/a"}</span>
          </div>
          ${b.lastError?r`
                <div class="account-card-error">${b.lastError}</div>
              `:f}
        </div>
      </div>
    `},C=()=>{if(m&&a)return Xc({state:o,callbacks:a,accountId:s[0]?.accountId??"default"});const b=c?.profile??n?.profile,{name:S,displayName:A,about:T,picture:M,nip05:E}=b??{},R=S||A||T||M||E;return r`
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
              `:f}
        </div>
        ${R?r`
              <div class="status-list">
                ${M?r`
                      <div style="margin-bottom: 8px;">
                        <img
                          src=${M}
                          alt="Profile picture"
                          style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border-color);"
                          @error=${P=>{P.target.style.display="none"}}
                        />
                      </div>
                    `:f}
                ${S?r`<div><span class="label">Name</span><span>${S}</span></div>`:f}
                ${A?r`<div><span class="label">Display Name</span><span>${A}</span></div>`:f}
                ${T?r`<div><span class="label">About</span><span style="max-width: 300px; overflow: hidden; text-overflow: ellipsis;">${T}</span></div>`:f}
                ${E?r`<div><span class="label">NIP-05</span><span>${E}</span></div>`:f}
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

      ${d?r`
            <div class="account-card-list">
              ${s.map(b=>y(b))}
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
                <span class="monospace" title="${p??""}"
                  >${Fa(p)}</span
                >
              </div>
              <div>
                <span class="label">Last start</span>
                <span>${h?Y(h):"n/a"}</span>
              </div>
            </div>
          `}

      ${v?r`<div class="callout danger" style="margin-top: 12px;">${v}</div>`:f}

      ${C()}

      ${Ye({channelId:"nostr",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!1)}>Refresh</button>
      </div>
    </div>
  `}function Ph(e,t){const n=t.snapshot,s=n?.channels;if(!n||!s)return!1;const i=s[e],o=typeof i?.configured=="boolean"&&i.configured,a=typeof i?.running=="boolean"&&i.running,l=typeof i?.connected=="boolean"&&i.connected,u=(n.channelAccounts?.[e]??[]).some(g=>g.configured||g.running||g.connected);return o||a||l||u}function Dh(e,t){return t?.[e]?.length??0}function Bl(e,t){const n=Dh(e,t);return n<2?f:r`<div class="account-count">Accounts (${n})</div>`}function Nh(e){const{props:t,signal:n,accountCountLabel:s}=e;return r`
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
          <span>${n?.lastStartAt?Y(n.lastStartAt):"n/a"}</span>
        </div>
        <div>
          <span class="label">Last probe</span>
          <span>${n?.lastProbeAt?Y(n.lastProbeAt):"n/a"}</span>
        </div>
      </div>

      ${n?.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:f}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            Probe ${n.probe.ok?"ok":"failed"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:f}

      ${Ye({channelId:"signal",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Probe
        </button>
      </div>
    </div>
  `}function Fh(e){const{props:t,slack:n,accountCountLabel:s}=e;return r`
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
          <span>${n?.lastStartAt?Y(n.lastStartAt):"n/a"}</span>
        </div>
        <div>
          <span class="label">Last probe</span>
          <span>${n?.lastProbeAt?Y(n.lastProbeAt):"n/a"}</span>
        </div>
      </div>

      ${n?.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:f}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            Probe ${n.probe.ok?"ok":"failed"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:f}

      ${Ye({channelId:"slack",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Probe
        </button>
      </div>
    </div>
  `}function Oh(e){const{props:t,telegram:n,telegramAccounts:s,accountCountLabel:i}=e,o=s.length>1,a=l=>{const u=l.probe?.bot?.username,g=l.name||l.accountId;return r`
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
            <span>${l.lastInboundAt?Y(l.lastInboundAt):"n/a"}</span>
          </div>
          ${l.lastError?r`
                <div class="account-card-error">
                  ${l.lastError}
                </div>
              `:f}
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
                <span>${n?.lastStartAt?Y(n.lastStartAt):"n/a"}</span>
              </div>
              <div>
                <span class="label">Last probe</span>
                <span>${n?.lastProbeAt?Y(n.lastProbeAt):"n/a"}</span>
              </div>
            </div>
          `}

      ${n?.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:f}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            Probe ${n.probe.ok?"ok":"failed"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:f}

      ${Ye({channelId:"telegram",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Probe
        </button>
      </div>
    </div>
  `}function Bh(e){const{props:t,whatsapp:n,accountCountLabel:s}=e;return r`
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
            ${n?.lastConnectedAt?Y(n.lastConnectedAt):"n/a"}
          </span>
        </div>
        <div>
          <span class="label">Last message</span>
          <span>
            ${n?.lastMessageAt?Y(n.lastMessageAt):"n/a"}
          </span>
        </div>
        <div>
          <span class="label">Auth age</span>
          <span>
            ${n?.authAgeMs!=null?Zi(n.authAgeMs):"n/a"}
          </span>
        </div>
      </div>

      ${n?.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:f}

      ${t.whatsappMessage?r`<div class="callout" style="margin-top: 12px;">
            ${t.whatsappMessage}
          </div>`:f}

      ${t.whatsappQrDataUrl?r`<div class="qr-wrap">
            <img src=${t.whatsappQrDataUrl} alt="WhatsApp QR" />
          </div>`:f}

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

      ${Ye({channelId:"whatsapp",props:t})}
    </div>
  `}function Uh(e){const t=e.snapshot?.channels,n=t?.whatsapp??void 0,s=t?.telegram??void 0,i=t?.discord??null,o=t?.googlechat??null,a=t?.slack??null,l=t?.signal??null,c=t?.imessage??null,u=t?.nostr??null,p=zh(e.snapshot).map((h,v)=>({key:h,enabled:Ph(h,e),order:v})).toSorted((h,v)=>h.enabled!==v.enabled?h.enabled?-1:1:h.order-v.order);return r`
    <section class="grid grid-cols-2">
      ${p.map(h=>Hh(h.key,e,{whatsapp:n,telegram:s,discord:i,googlechat:o,slack:a,signal:l,imessage:c,nostr:u,channelAccounts:e.snapshot?.channelAccounts??null}))}
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Channel health</div>
          <div class="card-sub">Channel status snapshots from the gateway.</div>
        </div>
        <div class="muted">${e.lastSuccessAt?Y(e.lastSuccessAt):"n/a"}</div>
      </div>
      ${e.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${e.lastError}
          </div>`:f}
      <pre class="code-block" style="margin-top: 12px;">
${e.snapshot?JSON.stringify(e.snapshot,null,2):"No snapshot yet."}
      </pre>
    </section>
  `}function zh(e){return e?.channelMeta?.length?e.channelMeta.map(t=>t.id):e?.channelOrder?.length?e.channelOrder:["whatsapp","telegram","discord","googlechat","slack","signal","imessage","nostr"]}function Hh(e,t,n){const s=Bl(e,n.channelAccounts);switch(e){case"whatsapp":return Bh({props:t,whatsapp:n.whatsapp,accountCountLabel:s});case"telegram":return Oh({props:t,telegram:n.telegram,telegramAccounts:n.channelAccounts?.telegram??[],accountCountLabel:s});case"discord":return Eh({props:t,discord:n.discord,accountCountLabel:s});case"googlechat":return Ih({props:t,googleChat:n.googlechat,accountCountLabel:s});case"slack":return Fh({props:t,slack:n.slack,accountCountLabel:s});case"signal":return Nh({props:t,signal:n.signal,accountCountLabel:s});case"imessage":return Mh({props:t,imessage:n.imessage,accountCountLabel:s});case"nostr":{const i=n.channelAccounts?.nostr??[],o=i[0],a=o?.accountId??"default",l=o?.profile??null,c=t.nostrProfileAccountId===a?t.nostrProfileFormState:null,u=c?{onFieldChange:t.onNostrProfileFieldChange,onSave:t.onNostrProfileSave,onImport:t.onNostrProfileImport,onCancel:t.onNostrProfileCancel,onToggleAdvanced:t.onNostrProfileToggleAdvanced}:null;return Rh({props:t,nostr:n.nostr,nostrAccounts:i,accountCountLabel:s,profileFormState:c,profileFormCallbacks:u,onEditProfile:()=>t.onNostrProfileEdit(a,l)})}default:return Kh(e,t,n.channelAccounts??{})}}function Kh(e,t,n){const s=Wh(t.snapshot,e),i=t.snapshot?.channels?.[e],o=typeof i?.configured=="boolean"?i.configured:void 0,a=typeof i?.running=="boolean"?i.running:void 0,l=typeof i?.connected=="boolean"?i.connected:void 0,c=typeof i?.lastError=="string"?i.lastError:void 0,u=n[e]??[],g=Bl(e,n);return r`
    <div class="card">
      <div class="card-title">${s}</div>
      <div class="card-sub">Channel status and configuration.</div>
      ${g}

      ${u.length>0?r`
            <div class="account-card-list">
              ${u.map(p=>Qh(p))}
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
          </div>`:f}

      ${Ye({channelId:e,props:t})}
    </div>
  `}function jh(e){return e?.channelMeta?.length?Object.fromEntries(e.channelMeta.map(t=>[t.id,t])):{}}function Wh(e,t){return jh(e)[t]?.label??e?.channelLabels?.[t]??t}const Gh=600*1e3;function Ul(e){return e.lastInboundAt?Date.now()-e.lastInboundAt<Gh:!1}function qh(e){return e.running?"Yes":Ul(e)?"Active":"No"}function Vh(e){return e.connected===!0?"Yes":e.connected===!1?"No":Ul(e)?"Active":"n/a"}function Qh(e){const t=qh(e),n=Vh(e);return r`
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
          <span>${e.lastInboundAt?Y(e.lastInboundAt):"n/a"}</span>
        </div>
        ${e.lastError?r`
              <div class="account-card-error">
                ${e.lastError}
              </div>
            `:f}
      </div>
    </div>
  `}const nn=(e,t)=>{const n=e._$AN;if(n===void 0)return!1;for(const s of n)s._$AO?.(t,!1),nn(s,t);return!0},Jn=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},zl=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Jh(t)}};function Yh(e){this._$AN!==void 0?(Jn(this),this._$AM=e,zl(this)):this._$AM=e}function Zh(e,t=!1,n=0){const s=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(t)if(Array.isArray(s))for(let o=n;o<s.length;o++)nn(s[o],!1),Jn(s[o]);else s!=null&&(nn(s,!1),Jn(s));else nn(this,e)}const Jh=e=>{e.type==go.CHILD&&(e._$AP??=Zh,e._$AQ??=Yh)};class Xh extends ho{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,n,s){super._$AT(t,n,s),zl(this),this.isConnected=t._$AU}_$AO(t,n=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),n&&(nn(this,t),Jn(this))}setValue(t){if(ap(this._$Ct))this._$Ct._$AI(t,this);else{const n=[...this._$Ct._$AH];n[this._$Ci]=t,this._$Ct._$AI(n,this,0)}}disconnected(){}reconnected(){}}const Gs=new WeakMap,ef=po(class extends Xh{render(e){return f}update(e,[t]){const n=t!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),f}rt(e){if(this.isConnected||(e=void 0),typeof this.G=="function"){const t=this.ht??globalThis;let n=Gs.get(t);n===void 0&&(n=new WeakMap,Gs.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return typeof this.G=="function"?Gs.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});class Ci extends ho{constructor(t){if(super(t),this.it=f,t.type!==go.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===f||t==null)return this._t=void 0,this.it=t;if(t===Xe)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}Ci.directiveName="unsafeHTML",Ci.resultType=1;const Ti=po(Ci);const{entries:Hl,setPrototypeOf:Oa,isFrozen:tf,getPrototypeOf:nf,getOwnPropertyDescriptor:sf}=Object;let{freeze:be,seal:_e,create:_i}=Object,{apply:Li,construct:Ei}=typeof Reflect<"u"&&Reflect;be||(be=function(t){return t});_e||(_e=function(t){return t});Li||(Li=function(t,n){for(var s=arguments.length,i=new Array(s>2?s-2:0),o=2;o<s;o++)i[o-2]=arguments[o];return t.apply(n,i)});Ei||(Ei=function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return new t(...s)});const In=ye(Array.prototype.forEach),of=ye(Array.prototype.lastIndexOf),Ba=ye(Array.prototype.pop),Kt=ye(Array.prototype.push),af=ye(Array.prototype.splice),Hn=ye(String.prototype.toLowerCase),qs=ye(String.prototype.toString),Vs=ye(String.prototype.match),jt=ye(String.prototype.replace),rf=ye(String.prototype.indexOf),lf=ye(String.prototype.trim),Le=ye(Object.prototype.hasOwnProperty),ve=ye(RegExp.prototype.test),Wt=cf(TypeError);function ye(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return Li(e,t,s)}}function cf(e){return function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];return Ei(e,n)}}function G(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Hn;Oa&&Oa(e,null);let s=t.length;for(;s--;){let i=t[s];if(typeof i=="string"){const o=n(i);o!==i&&(tf(t)||(t[s]=o),i=o)}e[i]=!0}return e}function df(e){for(let t=0;t<e.length;t++)Le(e,t)||(e[t]=null);return e}function De(e){const t=_i(null);for(const[n,s]of Hl(e))Le(e,n)&&(Array.isArray(s)?t[n]=df(s):s&&typeof s=="object"&&s.constructor===Object?t[n]=De(s):t[n]=s);return t}function Gt(e,t){for(;e!==null;){const s=sf(e,t);if(s){if(s.get)return ye(s.get);if(typeof s.value=="function")return ye(s.value)}e=nf(e)}function n(){return null}return n}const Ua=be(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Qs=be(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ys=be(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),uf=be(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Zs=be(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),gf=be(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),za=be(["#text"]),Ha=be(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Js=be(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ka=be(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Mn=be(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),pf=_e(/\{\{[\w\W]*|[\w\W]*\}\}/gm),hf=_e(/<%[\w\W]*|[\w\W]*%>/gm),ff=_e(/\$\{[\w\W]*/gm),vf=_e(/^data-[\-\w.\u00B7-\uFFFF]+$/),mf=_e(/^aria-[\-\w]+$/),Kl=_e(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),bf=_e(/^(?:\w+script|data):/i),yf=_e(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),jl=_e(/^html$/i),xf=_e(/^[a-z][.\w]*(-[.\w]+)+$/i);var ja=Object.freeze({__proto__:null,ARIA_ATTR:mf,ATTR_WHITESPACE:yf,CUSTOM_ELEMENT:xf,DATA_ATTR:vf,DOCTYPE_NAME:jl,ERB_EXPR:hf,IS_ALLOWED_URI:Kl,IS_SCRIPT_OR_DATA:bf,MUSTACHE_EXPR:pf,TMPLIT_EXPR:ff});const qt={element:1,text:3,progressingInstruction:7,comment:8,document:9},$f=function(){return typeof window>"u"?null:window},wf=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let s=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(s=n.getAttribute(i));const o="dompurify"+(s?"#"+s:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Wa=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Wl(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:$f();const t=H=>Wl(H);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==qt.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const s=n,i=s.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:l,Element:c,NodeFilter:u,NamedNodeMap:g=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:h,trustedTypes:v}=e,d=c.prototype,m=Gt(d,"cloneNode"),y=Gt(d,"remove"),C=Gt(d,"nextSibling"),b=Gt(d,"childNodes"),S=Gt(d,"parentNode");if(typeof a=="function"){const H=n.createElement("template");H.content&&H.content.ownerDocument&&(n=H.content.ownerDocument)}let A,T="";const{implementation:M,createNodeIterator:E,createDocumentFragment:R,getElementsByTagName:P}=n,{importNode:Z}=s;let F=Wa();t.isSupported=typeof Hl=="function"&&typeof S=="function"&&M&&M.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:K,ERB_EXPR:ue,TMPLIT_EXPR:_,DATA_ATTR:z,ARIA_ATTR:ae,IS_SCRIPT_OR_DATA:re,ATTR_WHITESPACE:te,CUSTOM_ELEMENT:ie}=ja;let{IS_ALLOWED_URI:I}=ja,D=null;const N=G({},[...Ua,...Qs,...Ys,...Zs,...za]);let j=null;const we=G({},[...Ha,...Js,...Ka,...Mn]);let J=Object.seal(_i(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ae=null,ne=null;const fe=Object.seal(_i(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Be=!0,Ue=!0,st=!1,Io=!0,St=!1,bn=!0,it=!1,ws=!1,ks=!1,At=!1,yn=!1,xn=!1,Mo=!0,Ro=!1;const gc="user-content-";let Ss=!0,Bt=!1,Ct={},Me=null;const As=G({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Po=null;const Do=G({},["audio","video","img","source","image","track"]);let Cs=null;const No=G({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),$n="http://www.w3.org/1998/Math/MathML",wn="http://www.w3.org/2000/svg",ze="http://www.w3.org/1999/xhtml";let Tt=ze,Ts=!1,_s=null;const pc=G({},[$n,wn,ze],qs);let kn=G({},["mi","mo","mn","ms","mtext"]),Sn=G({},["annotation-xml"]);const hc=G({},["title","style","font","a","script"]);let Ut=null;const fc=["application/xhtml+xml","text/html"],vc="text/html";let oe=null,_t=null;const mc=n.createElement("form"),Fo=function(x){return x instanceof RegExp||x instanceof Function},Ls=function(){let x=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(_t&&_t===x)){if((!x||typeof x!="object")&&(x={}),x=De(x),Ut=fc.indexOf(x.PARSER_MEDIA_TYPE)===-1?vc:x.PARSER_MEDIA_TYPE,oe=Ut==="application/xhtml+xml"?qs:Hn,D=Le(x,"ALLOWED_TAGS")?G({},x.ALLOWED_TAGS,oe):N,j=Le(x,"ALLOWED_ATTR")?G({},x.ALLOWED_ATTR,oe):we,_s=Le(x,"ALLOWED_NAMESPACES")?G({},x.ALLOWED_NAMESPACES,qs):pc,Cs=Le(x,"ADD_URI_SAFE_ATTR")?G(De(No),x.ADD_URI_SAFE_ATTR,oe):No,Po=Le(x,"ADD_DATA_URI_TAGS")?G(De(Do),x.ADD_DATA_URI_TAGS,oe):Do,Me=Le(x,"FORBID_CONTENTS")?G({},x.FORBID_CONTENTS,oe):As,Ae=Le(x,"FORBID_TAGS")?G({},x.FORBID_TAGS,oe):De({}),ne=Le(x,"FORBID_ATTR")?G({},x.FORBID_ATTR,oe):De({}),Ct=Le(x,"USE_PROFILES")?x.USE_PROFILES:!1,Be=x.ALLOW_ARIA_ATTR!==!1,Ue=x.ALLOW_DATA_ATTR!==!1,st=x.ALLOW_UNKNOWN_PROTOCOLS||!1,Io=x.ALLOW_SELF_CLOSE_IN_ATTR!==!1,St=x.SAFE_FOR_TEMPLATES||!1,bn=x.SAFE_FOR_XML!==!1,it=x.WHOLE_DOCUMENT||!1,At=x.RETURN_DOM||!1,yn=x.RETURN_DOM_FRAGMENT||!1,xn=x.RETURN_TRUSTED_TYPE||!1,ks=x.FORCE_BODY||!1,Mo=x.SANITIZE_DOM!==!1,Ro=x.SANITIZE_NAMED_PROPS||!1,Ss=x.KEEP_CONTENT!==!1,Bt=x.IN_PLACE||!1,I=x.ALLOWED_URI_REGEXP||Kl,Tt=x.NAMESPACE||ze,kn=x.MATHML_TEXT_INTEGRATION_POINTS||kn,Sn=x.HTML_INTEGRATION_POINTS||Sn,J=x.CUSTOM_ELEMENT_HANDLING||{},x.CUSTOM_ELEMENT_HANDLING&&Fo(x.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(J.tagNameCheck=x.CUSTOM_ELEMENT_HANDLING.tagNameCheck),x.CUSTOM_ELEMENT_HANDLING&&Fo(x.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(J.attributeNameCheck=x.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),x.CUSTOM_ELEMENT_HANDLING&&typeof x.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(J.allowCustomizedBuiltInElements=x.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),St&&(Ue=!1),yn&&(At=!0),Ct&&(D=G({},za),j=[],Ct.html===!0&&(G(D,Ua),G(j,Ha)),Ct.svg===!0&&(G(D,Qs),G(j,Js),G(j,Mn)),Ct.svgFilters===!0&&(G(D,Ys),G(j,Js),G(j,Mn)),Ct.mathMl===!0&&(G(D,Zs),G(j,Ka),G(j,Mn))),x.ADD_TAGS&&(typeof x.ADD_TAGS=="function"?fe.tagCheck=x.ADD_TAGS:(D===N&&(D=De(D)),G(D,x.ADD_TAGS,oe))),x.ADD_ATTR&&(typeof x.ADD_ATTR=="function"?fe.attributeCheck=x.ADD_ATTR:(j===we&&(j=De(j)),G(j,x.ADD_ATTR,oe))),x.ADD_URI_SAFE_ATTR&&G(Cs,x.ADD_URI_SAFE_ATTR,oe),x.FORBID_CONTENTS&&(Me===As&&(Me=De(Me)),G(Me,x.FORBID_CONTENTS,oe)),x.ADD_FORBID_CONTENTS&&(Me===As&&(Me=De(Me)),G(Me,x.ADD_FORBID_CONTENTS,oe)),Ss&&(D["#text"]=!0),it&&G(D,["html","head","body"]),D.table&&(G(D,["tbody"]),delete Ae.tbody),x.TRUSTED_TYPES_POLICY){if(typeof x.TRUSTED_TYPES_POLICY.createHTML!="function")throw Wt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof x.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Wt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');A=x.TRUSTED_TYPES_POLICY,T=A.createHTML("")}else A===void 0&&(A=wf(v,i)),A!==null&&typeof T=="string"&&(T=A.createHTML(""));be&&be(x),_t=x}},Oo=G({},[...Qs,...Ys,...uf]),Bo=G({},[...Zs,...gf]),bc=function(x){let L=S(x);(!L||!L.tagName)&&(L={namespaceURI:Tt,tagName:"template"});const B=Hn(x.tagName),ee=Hn(L.tagName);return _s[x.namespaceURI]?x.namespaceURI===wn?L.namespaceURI===ze?B==="svg":L.namespaceURI===$n?B==="svg"&&(ee==="annotation-xml"||kn[ee]):!!Oo[B]:x.namespaceURI===$n?L.namespaceURI===ze?B==="math":L.namespaceURI===wn?B==="math"&&Sn[ee]:!!Bo[B]:x.namespaceURI===ze?L.namespaceURI===wn&&!Sn[ee]||L.namespaceURI===$n&&!kn[ee]?!1:!Bo[B]&&(hc[B]||!Oo[B]):!!(Ut==="application/xhtml+xml"&&_s[x.namespaceURI]):!1},Re=function(x){Kt(t.removed,{element:x});try{S(x).removeChild(x)}catch{y(x)}},ot=function(x,L){try{Kt(t.removed,{attribute:L.getAttributeNode(x),from:L})}catch{Kt(t.removed,{attribute:null,from:L})}if(L.removeAttribute(x),x==="is")if(At||yn)try{Re(L)}catch{}else try{L.setAttribute(x,"")}catch{}},Uo=function(x){let L=null,B=null;if(ks)x="<remove></remove>"+x;else{const se=Vs(x,/^[\r\n\t ]+/);B=se&&se[0]}Ut==="application/xhtml+xml"&&Tt===ze&&(x='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+x+"</body></html>");const ee=A?A.createHTML(x):x;if(Tt===ze)try{L=new h().parseFromString(ee,Ut)}catch{}if(!L||!L.documentElement){L=M.createDocument(Tt,"template",null);try{L.documentElement.innerHTML=Ts?T:ee}catch{}}const ge=L.body||L.documentElement;return x&&B&&ge.insertBefore(n.createTextNode(B),ge.childNodes[0]||null),Tt===ze?P.call(L,it?"html":"body")[0]:it?L.documentElement:ge},zo=function(x){return E.call(x.ownerDocument||x,x,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Es=function(x){return x instanceof p&&(typeof x.nodeName!="string"||typeof x.textContent!="string"||typeof x.removeChild!="function"||!(x.attributes instanceof g)||typeof x.removeAttribute!="function"||typeof x.setAttribute!="function"||typeof x.namespaceURI!="string"||typeof x.insertBefore!="function"||typeof x.hasChildNodes!="function")},Ho=function(x){return typeof l=="function"&&x instanceof l};function He(H,x,L){In(H,B=>{B.call(t,x,L,_t)})}const Ko=function(x){let L=null;if(He(F.beforeSanitizeElements,x,null),Es(x))return Re(x),!0;const B=oe(x.nodeName);if(He(F.uponSanitizeElement,x,{tagName:B,allowedTags:D}),bn&&x.hasChildNodes()&&!Ho(x.firstElementChild)&&ve(/<[/\w!]/g,x.innerHTML)&&ve(/<[/\w!]/g,x.textContent)||x.nodeType===qt.progressingInstruction||bn&&x.nodeType===qt.comment&&ve(/<[/\w]/g,x.data))return Re(x),!0;if(!(fe.tagCheck instanceof Function&&fe.tagCheck(B))&&(!D[B]||Ae[B])){if(!Ae[B]&&Wo(B)&&(J.tagNameCheck instanceof RegExp&&ve(J.tagNameCheck,B)||J.tagNameCheck instanceof Function&&J.tagNameCheck(B)))return!1;if(Ss&&!Me[B]){const ee=S(x)||x.parentNode,ge=b(x)||x.childNodes;if(ge&&ee){const se=ge.length;for(let xe=se-1;xe>=0;--xe){const Ke=m(ge[xe],!0);Ke.__removalCount=(x.__removalCount||0)+1,ee.insertBefore(Ke,C(x))}}}return Re(x),!0}return x instanceof c&&!bc(x)||(B==="noscript"||B==="noembed"||B==="noframes")&&ve(/<\/no(script|embed|frames)/i,x.innerHTML)?(Re(x),!0):(St&&x.nodeType===qt.text&&(L=x.textContent,In([K,ue,_],ee=>{L=jt(L,ee," ")}),x.textContent!==L&&(Kt(t.removed,{element:x.cloneNode()}),x.textContent=L)),He(F.afterSanitizeElements,x,null),!1)},jo=function(x,L,B){if(Mo&&(L==="id"||L==="name")&&(B in n||B in mc))return!1;if(!(Ue&&!ne[L]&&ve(z,L))){if(!(Be&&ve(ae,L))){if(!(fe.attributeCheck instanceof Function&&fe.attributeCheck(L,x))){if(!j[L]||ne[L]){if(!(Wo(x)&&(J.tagNameCheck instanceof RegExp&&ve(J.tagNameCheck,x)||J.tagNameCheck instanceof Function&&J.tagNameCheck(x))&&(J.attributeNameCheck instanceof RegExp&&ve(J.attributeNameCheck,L)||J.attributeNameCheck instanceof Function&&J.attributeNameCheck(L,x))||L==="is"&&J.allowCustomizedBuiltInElements&&(J.tagNameCheck instanceof RegExp&&ve(J.tagNameCheck,B)||J.tagNameCheck instanceof Function&&J.tagNameCheck(B))))return!1}else if(!Cs[L]){if(!ve(I,jt(B,te,""))){if(!((L==="src"||L==="xlink:href"||L==="href")&&x!=="script"&&rf(B,"data:")===0&&Po[x])){if(!(st&&!ve(re,jt(B,te,"")))){if(B)return!1}}}}}}}return!0},Wo=function(x){return x!=="annotation-xml"&&Vs(x,ie)},Go=function(x){He(F.beforeSanitizeAttributes,x,null);const{attributes:L}=x;if(!L||Es(x))return;const B={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:j,forceKeepAttr:void 0};let ee=L.length;for(;ee--;){const ge=L[ee],{name:se,namespaceURI:xe,value:Ke}=ge,Lt=oe(se),Is=Ke;let ce=se==="value"?Is:lf(Is);if(B.attrName=Lt,B.attrValue=ce,B.keepAttr=!0,B.forceKeepAttr=void 0,He(F.uponSanitizeAttribute,x,B),ce=B.attrValue,Ro&&(Lt==="id"||Lt==="name")&&(ot(se,x),ce=gc+ce),bn&&ve(/((--!?|])>)|<\/(style|title|textarea)/i,ce)){ot(se,x);continue}if(Lt==="attributename"&&Vs(ce,"href")){ot(se,x);continue}if(B.forceKeepAttr)continue;if(!B.keepAttr){ot(se,x);continue}if(!Io&&ve(/\/>/i,ce)){ot(se,x);continue}St&&In([K,ue,_],Vo=>{ce=jt(ce,Vo," ")});const qo=oe(x.nodeName);if(!jo(qo,Lt,ce)){ot(se,x);continue}if(A&&typeof v=="object"&&typeof v.getAttributeType=="function"&&!xe)switch(v.getAttributeType(qo,Lt)){case"TrustedHTML":{ce=A.createHTML(ce);break}case"TrustedScriptURL":{ce=A.createScriptURL(ce);break}}if(ce!==Is)try{xe?x.setAttributeNS(xe,se,ce):x.setAttribute(se,ce),Es(x)?Re(x):Ba(t.removed)}catch{ot(se,x)}}He(F.afterSanitizeAttributes,x,null)},yc=function H(x){let L=null;const B=zo(x);for(He(F.beforeSanitizeShadowDOM,x,null);L=B.nextNode();)He(F.uponSanitizeShadowNode,L,null),Ko(L),Go(L),L.content instanceof o&&H(L.content);He(F.afterSanitizeShadowDOM,x,null)};return t.sanitize=function(H){let x=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},L=null,B=null,ee=null,ge=null;if(Ts=!H,Ts&&(H="<!-->"),typeof H!="string"&&!Ho(H))if(typeof H.toString=="function"){if(H=H.toString(),typeof H!="string")throw Wt("dirty is not a string, aborting")}else throw Wt("toString is not a function");if(!t.isSupported)return H;if(ws||Ls(x),t.removed=[],typeof H=="string"&&(Bt=!1),Bt){if(H.nodeName){const Ke=oe(H.nodeName);if(!D[Ke]||Ae[Ke])throw Wt("root node is forbidden and cannot be sanitized in-place")}}else if(H instanceof l)L=Uo("<!---->"),B=L.ownerDocument.importNode(H,!0),B.nodeType===qt.element&&B.nodeName==="BODY"||B.nodeName==="HTML"?L=B:L.appendChild(B);else{if(!At&&!St&&!it&&H.indexOf("<")===-1)return A&&xn?A.createHTML(H):H;if(L=Uo(H),!L)return At?null:xn?T:""}L&&ks&&Re(L.firstChild);const se=zo(Bt?H:L);for(;ee=se.nextNode();)Ko(ee),Go(ee),ee.content instanceof o&&yc(ee.content);if(Bt)return H;if(At){if(yn)for(ge=R.call(L.ownerDocument);L.firstChild;)ge.appendChild(L.firstChild);else ge=L;return(j.shadowroot||j.shadowrootmode)&&(ge=Z.call(s,ge,!0)),ge}let xe=it?L.outerHTML:L.innerHTML;return it&&D["!doctype"]&&L.ownerDocument&&L.ownerDocument.doctype&&L.ownerDocument.doctype.name&&ve(jl,L.ownerDocument.doctype.name)&&(xe="<!DOCTYPE "+L.ownerDocument.doctype.name+`>
`+xe),St&&In([K,ue,_],Ke=>{xe=jt(xe,Ke," ")}),A&&xn?A.createHTML(xe):xe},t.setConfig=function(){let H=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ls(H),ws=!0},t.clearConfig=function(){_t=null,ws=!1},t.isValidAttribute=function(H,x,L){_t||Ls({});const B=oe(H),ee=oe(x);return jo(B,ee,L)},t.addHook=function(H,x){typeof x=="function"&&Kt(F[H],x)},t.removeHook=function(H,x){if(x!==void 0){const L=of(F[H],x);return L===-1?void 0:af(F[H],L,1)[0]}return Ba(F[H])},t.removeHooks=function(H){F[H]=[]},t.removeAllHooks=function(){F=Wa()},t}var Ii=Wl();function mo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var kt=mo();function Gl(e){kt=e}var sn={exec:()=>null};function q(e,t=""){let n=typeof e=="string"?e:e.source,s={replace:(i,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(me.caret,"$1"),n=n.replace(i,a),s},getRegex:()=>new RegExp(n,t)};return s}var kf=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),me={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Sf=/^(?:[ \t]*(?:\n|$))+/,Af=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Cf=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,mn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Tf=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,bo=/(?:[*+-]|\d{1,9}[.)])/,ql=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Vl=q(ql).replace(/bull/g,bo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),_f=q(ql).replace(/bull/g,bo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),yo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Lf=/^[^\n]+/,xo=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ef=q(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",xo).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),If=q(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,bo).getRegex(),ys="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",$o=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Mf=q("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",$o).replace("tag",ys).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ql=q(yo).replace("hr",mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ys).getRegex(),Rf=q(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ql).getRegex(),wo={blockquote:Rf,code:Af,def:Ef,fences:Cf,heading:Tf,hr:mn,html:Mf,lheading:Vl,list:If,newline:Sf,paragraph:Ql,table:sn,text:Lf},Ga=q("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ys).getRegex(),Pf={...wo,lheading:_f,table:Ga,paragraph:q(yo).replace("hr",mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ga).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ys).getRegex()},Df={...wo,html:q(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",$o).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:sn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:q(yo).replace("hr",mn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Vl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Nf=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ff=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Yl=/^( {2,}|\\)\n(?!\s*$)/,Of=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,xs=/[\p{P}\p{S}]/u,ko=/[\s\p{P}\p{S}]/u,Zl=/[^\s\p{P}\p{S}]/u,Bf=q(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ko).getRegex(),Jl=/(?!~)[\p{P}\p{S}]/u,Uf=/(?!~)[\s\p{P}\p{S}]/u,zf=/(?:[^\s\p{P}\p{S}]|~)/u,Hf=q(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",kf?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Xl=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Kf=q(Xl,"u").replace(/punct/g,xs).getRegex(),jf=q(Xl,"u").replace(/punct/g,Jl).getRegex(),ec="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Wf=q(ec,"gu").replace(/notPunctSpace/g,Zl).replace(/punctSpace/g,ko).replace(/punct/g,xs).getRegex(),Gf=q(ec,"gu").replace(/notPunctSpace/g,zf).replace(/punctSpace/g,Uf).replace(/punct/g,Jl).getRegex(),qf=q("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Zl).replace(/punctSpace/g,ko).replace(/punct/g,xs).getRegex(),Vf=q(/\\(punct)/,"gu").replace(/punct/g,xs).getRegex(),Qf=q(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Yf=q($o).replace("(?:-->|$)","-->").getRegex(),Zf=q("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Yf).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Xn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Jf=q(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Xn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),tc=q(/^!?\[(label)\]\[(ref)\]/).replace("label",Xn).replace("ref",xo).getRegex(),nc=q(/^!?\[(ref)\](?:\[\])?/).replace("ref",xo).getRegex(),Xf=q("reflink|nolink(?!\\()","g").replace("reflink",tc).replace("nolink",nc).getRegex(),qa=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,So={_backpedal:sn,anyPunctuation:Vf,autolink:Qf,blockSkip:Hf,br:Yl,code:Ff,del:sn,emStrongLDelim:Kf,emStrongRDelimAst:Wf,emStrongRDelimUnd:qf,escape:Nf,link:Jf,nolink:nc,punctuation:Bf,reflink:tc,reflinkSearch:Xf,tag:Zf,text:Of,url:sn},ev={...So,link:q(/^!?\[(label)\]\((.*?)\)/).replace("label",Xn).getRegex(),reflink:q(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Xn).getRegex()},Mi={...So,emStrongRDelimAst:Gf,emStrongLDelim:jf,url:q(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",qa).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:q(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",qa).getRegex()},tv={...Mi,br:q(Yl).replace("{2,}","*").getRegex(),text:q(Mi.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Rn={normal:wo,gfm:Pf,pedantic:Df},Vt={normal:So,gfm:Mi,breaks:tv,pedantic:ev},nv={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Va=e=>nv[e];function Ge(e,t){if(t){if(me.escapeTest.test(e))return e.replace(me.escapeReplace,Va)}else if(me.escapeTestNoEncode.test(e))return e.replace(me.escapeReplaceNoEncode,Va);return e}function Qa(e){try{e=encodeURI(e).replace(me.percentDecode,"%")}catch{return null}return e}function Ya(e,t){let n=e.replace(me.findPipe,(o,a,l)=>{let c=!1,u=a;for(;--u>=0&&l[u]==="\\";)c=!c;return c?"|":" |"}),s=n.split(me.splitPipe),i=0;if(s[0].trim()||s.shift(),s.length>0&&!s.at(-1)?.trim()&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(me.slashPipe,"|");return s}function Qt(e,t,n){let s=e.length;if(s===0)return"";let i=0;for(;i<s&&e.charAt(s-i-1)===t;)i++;return e.slice(0,s-i)}function sv(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function Za(e,t,n,s,i){let o=t.href,a=t.title||null,l=e[1].replace(i.other.outputLinkReplace,"$1");s.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:l,tokens:s.inlineTokens(l)};return s.state.inLink=!1,c}function iv(e,t,n){let s=e.match(n.other.indentCodeCompensation);if(s===null)return t;let i=s[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[l]=a;return l.length>=i.length?o.slice(i.length):o}).join(`
`)}var es=class{options;rules;lexer;constructor(e){this.options=e||kt}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Qt(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],s=iv(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let s=Qt(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Qt(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Qt(t[0],`
`).split(`
`),s="",i="",o=[];for(;n.length>0;){let a=!1,l=[],c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))l.push(n[c]),a=!0;else if(!a)l.push(n[c]);else break;n=n.slice(c);let u=l.join(`
`),g=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${u}`:u,i=i?`${i}
${g}`:g;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(g,o,!0),this.lexer.state.top=p,n.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let v=h,d=v.raw+`
`+n.join(`
`),m=this.blockquote(d);o[o.length-1]=m,s=s.substring(0,s.length-v.raw.length)+m.raw,i=i.substring(0,i.length-v.text.length)+m.text;break}else if(h?.type==="list"){let v=h,d=v.raw+`
`+n.join(`
`),m=this.list(d);o[o.length-1]=m,s=s.substring(0,s.length-h.raw.length)+m.raw,i=i.substring(0,i.length-v.raw.length)+m.raw,n=d.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:o,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let c=!1,u="",g="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,m=>" ".repeat(3*m.length)),h=e.split(`
`,1)[0],v=!p.trim(),d=0;if(this.options.pedantic?(d=2,g=p.trimStart()):v?d=t[1].length+1:(d=t[2].search(this.rules.other.nonSpaceChar),d=d>4?1:d,g=p.slice(d),d+=t[1].length),v&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),c=!0),!c){let m=this.rules.other.nextBulletRegex(d),y=this.rules.other.hrRegex(d),C=this.rules.other.fencesBeginRegex(d),b=this.rules.other.headingBeginRegex(d),S=this.rules.other.htmlBeginRegex(d);for(;e;){let A=e.split(`
`,1)[0],T;if(h=A,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),T=h):T=h.replace(this.rules.other.tabCharGlobal,"    "),C.test(h)||b.test(h)||S.test(h)||m.test(h)||y.test(h))break;if(T.search(this.rules.other.nonSpaceChar)>=d||!h.trim())g+=`
`+T.slice(d);else{if(v||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||C.test(p)||b.test(p)||y.test(p))break;g+=`
`+h}!v&&!h.trim()&&(v=!0),u+=A+`
`,e=e.substring(A.length+1),p=T.slice(d)}}i.loose||(a?i.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),i.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(g),loose:!1,text:g,tokens:[]}),i.raw+=u}let l=i.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let c of i.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let g=this.lexer.inlineQueue.length-1;g>=0;g--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[g].src)){this.lexer.inlineQueue[g].src=this.lexer.inlineQueue[g].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let g={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=g.checked,i.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=g.raw+c.tokens[0].raw,c.tokens[0].text=g.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(g)):c.tokens.unshift({type:"paragraph",raw:g.raw,text:g.raw,tokens:[g]}):c.tokens.unshift(g)}}if(!i.loose){let u=c.tokens.filter(p=>p.type==="space"),g=u.length>0&&u.some(p=>this.rules.other.anyLine.test(p.raw));i.loose=g}}if(i.loose)for(let c of i.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return i}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Ya(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(let a of s)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of i)o.rows.push(Ya(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=Qt(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=sv(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(s);o&&(s=o[1],i=o[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),Za(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Za(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!(!s||s[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(s[1]||s[2])||!n||this.rules.inline.punctuation.exec(n))){let i=[...s[0]].length-1,o,a,l=i,c=0,u=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+i);(s=u.exec(t))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(a=[...o].length,s[3]||s[4]){l+=a;continue}else if((s[5]||s[6])&&i%3&&!((i+a)%3)){c+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+c);let g=[...s[0]][0].length,p=e.slice(0,i+s.index+g+a);if(Math.min(i,a)%2){let v=p.slice(1,-1);return{type:"em",raw:p,text:v,tokens:this.lexer.inlineTokens(v)}}let h=p.slice(2,-2);return{type:"strong",raw:p,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,s;if(t[2]==="@")n=t[0],s="mailto:"+n;else{let i;do i=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(i!==t[0]);n=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Ee=class Ri{tokens;options;state;inlineQueue;tokenizer;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||kt,this.options.tokenizer=this.options.tokenizer||new es,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:me,block:Rn.normal,inline:Vt.normal};this.options.pedantic?(n.block=Rn.pedantic,n.inline=Vt.pedantic):this.options.gfm&&(n.block=Rn.gfm,this.options.breaks?n.inline=Vt.breaks:n.inline=Vt.gfm),this.tokenizer.rules=n}static get rules(){return{block:Rn,inline:Vt}}static lex(t,n){return new Ri(n).lex(t)}static lexInline(t,n){return new Ri(n).inlineTokens(t)}lex(t){t=t.replace(me.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){for(this.options.pedantic&&(t=t.replace(me.tabCharGlobal,"    ").replace(me.spaceLine,""));t;){let i;if(this.options.extensions?.block?.some(a=>(i=a.call({lexer:this},t,n))?(t=t.substring(i.raw.length),n.push(i),!0):!1))continue;if(i=this.tokenizer.space(t)){t=t.substring(i.raw.length);let a=n.at(-1);i.raw.length===1&&a!==void 0?a.raw+=`
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
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(i);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let s=t,i=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)c.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)o=i[2]?i[2].length:0,s=s.slice(0,i.index+o)+"["+"a".repeat(i[0].length-o-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);s=this.options.hooks?.emStrongMask?.call({lexer:this},s)??s;let a=!1,l="";for(;t;){a||(l=""),a=!1;let c;if(this.options.extensions?.inline?.some(g=>(c=g.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let g=n.at(-1);c.type==="text"&&g?.type==="text"?(g.raw+=c.raw,g.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,s,l)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let u=t;if(this.options.extensions?.startInline){let g=1/0,p=t.slice(1),h;this.options.extensions.startInline.forEach(v=>{h=v.call({lexer:this},p),typeof h=="number"&&h>=0&&(g=Math.min(g,h))}),g<1/0&&g>=0&&(u=t.substring(0,g+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(l=c.raw.slice(-1)),a=!0;let g=n.at(-1);g?.type==="text"?(g.raw+=c.raw,g.text+=c.text):n.push(c);continue}if(t){let g="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(g);break}else throw new Error(g)}}return n}},ts=class{options;parser;constructor(e){this.options=e||kt}space(e){return""}code({text:e,lang:t,escaped:n}){let s=(t||"").match(me.notSpaceStart)?.[0],i=e.replace(me.endingNewline,"")+`
`;return s?'<pre><code class="language-'+Ge(s)+'">'+(n?i:Ge(i,!0))+`</code></pre>
`:"<pre><code>"+(n?i:Ge(i,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ge(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let s=this.parser.parseInline(n),i=Qa(e);if(i===null)return s;e=i;let o='<a href="'+e+'"';return t&&(o+=' title="'+Ge(t)+'"'),o+=">"+s+"</a>",o}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));let i=Qa(e);if(i===null)return Ge(n);e=i;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Ge(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ge(e.text)}},Ao=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Ie=class Pi{options;renderer;textRenderer;constructor(t){this.options=t||kt,this.options.renderer=this.options.renderer||new ts,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ao}static parse(t,n){return new Pi(n).parse(t)}static parseInline(t,n){return new Pi(n).parseInline(t)}parse(t){let n="";for(let s=0;s<t.length;s++){let i=t[s];if(this.options.extensions?.renderers?.[i.type]){let a=i,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=l||"";continue}}let o=i;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let s="";for(let i=0;i<t.length;i++){let o=t[i];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){s+=l||"";continue}}let a=o;switch(a.type){case"escape":{s+=n.text(a);break}case"html":{s+=n.html(a);break}case"link":{s+=n.link(a);break}case"image":{s+=n.image(a);break}case"checkbox":{s+=n.checkbox(a);break}case"strong":{s+=n.strong(a);break}case"em":{s+=n.em(a);break}case"codespan":{s+=n.codespan(a);break}case"br":{s+=n.br(a);break}case"del":{s+=n.del(a);break}case"text":{s+=n.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}},Zt=class{options;block;constructor(e){this.options=e||kt}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ee.lex:Ee.lexInline}provideParser(){return this.block?Ie.parse:Ie.parseInline}},ov=class{defaults=mo();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=Ie;Renderer=ts;TextRenderer=Ao;Lexer=Ee;Tokenizer=es;Hooks=Zt;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let s of e)switch(n=n.concat(t.call(this,s)),s.type){case"table":{let i=s;for(let o of i.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of i.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let i=s;n=n.concat(this.walkTokens(i.items,t));break}default:{let i=s;this.defaults.extensions?.childTokens?.[i.type]?this.defaults.extensions.childTokens[i.type].forEach(o=>{let a=i[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):i.tokens&&(n=n.concat(this.walkTokens(i.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){let o=t.renderers[i.name];o?t.renderers[i.name]=function(...a){let l=i.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[i.level];o?o.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){let i=this.defaults.renderer||new ts(this.defaults);for(let o in n.renderer){if(!(o in i))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,l=n.renderer[a],c=i[a];i[a]=(...u)=>{let g=l.apply(i,u);return g===!1&&(g=c.apply(i,u)),g||""}}s.renderer=i}if(n.tokenizer){let i=this.defaults.tokenizer||new es(this.defaults);for(let o in n.tokenizer){if(!(o in i))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,l=n.tokenizer[a],c=i[a];i[a]=(...u)=>{let g=l.apply(i,u);return g===!1&&(g=c.apply(i,u)),g}}s.tokenizer=i}if(n.hooks){let i=this.defaults.hooks||new Zt;for(let o in n.hooks){if(!(o in i))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,l=n.hooks[a],c=i[a];Zt.passThroughHooks.has(o)?i[a]=u=>{if(this.defaults.async&&Zt.passThroughHooksRespectAsync.has(o))return(async()=>{let p=await l.call(i,u);return c.call(i,p)})();let g=l.call(i,u);return c.call(i,g)}:i[a]=(...u)=>{if(this.defaults.async)return(async()=>{let p=await l.apply(i,u);return p===!1&&(p=await c.apply(i,u)),p})();let g=l.apply(i,u);return g===!1&&(g=c.apply(i,u)),g}}s.hooks=i}if(n.walkTokens){let i=this.defaults.walkTokens,o=n.walkTokens;s.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),i&&(l=l.concat(i.call(this,a))),l}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ee.lex(e,t??this.defaults)}parser(e,t){return Ie.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let s={...n},i={...this.defaults,...s},o=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&s.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(i.hooks&&(i.hooks.options=i,i.hooks.block=e),i.async)return(async()=>{let a=i.hooks?await i.hooks.preprocess(t):t,l=await(i.hooks?await i.hooks.provideLexer():e?Ee.lex:Ee.lexInline)(a,i),c=i.hooks?await i.hooks.processAllTokens(l):l;i.walkTokens&&await Promise.all(this.walkTokens(c,i.walkTokens));let u=await(i.hooks?await i.hooks.provideParser():e?Ie.parse:Ie.parseInline)(c,i);return i.hooks?await i.hooks.postprocess(u):u})().catch(o);try{i.hooks&&(t=i.hooks.preprocess(t));let a=(i.hooks?i.hooks.provideLexer():e?Ee.lex:Ee.lexInline)(t,i);i.hooks&&(a=i.hooks.processAllTokens(a)),i.walkTokens&&this.walkTokens(a,i.walkTokens);let l=(i.hooks?i.hooks.provideParser():e?Ie.parse:Ie.parseInline)(a,i);return i.hooks&&(l=i.hooks.postprocess(l)),l}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let s="<p>An error occurred:</p><pre>"+Ge(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},$t=new ov;function Q(e,t){return $t.parse(e,t)}Q.options=Q.setOptions=function(e){return $t.setOptions(e),Q.defaults=$t.defaults,Gl(Q.defaults),Q};Q.getDefaults=mo;Q.defaults=kt;Q.use=function(...e){return $t.use(...e),Q.defaults=$t.defaults,Gl(Q.defaults),Q};Q.walkTokens=function(e,t){return $t.walkTokens(e,t)};Q.parseInline=$t.parseInline;Q.Parser=Ie;Q.parser=Ie.parse;Q.Renderer=ts;Q.TextRenderer=Ao;Q.Lexer=Ee;Q.lexer=Ee.lex;Q.Tokenizer=es;Q.Hooks=Zt;Q.parse=Q;Q.options;Q.setOptions;Q.use;Q.walkTokens;Q.parseInline;Ie.parse;Ee.lex;Q.setOptions({gfm:!0,breaks:!0});const Ja=["a","b","blockquote","br","code","del","em","h1","h2","h3","h4","hr","i","li","ol","p","pre","strong","table","tbody","td","th","thead","tr","ul"],Xa=["class","href","rel","target","title","start"];let er=!1;const av=14e4,rv=4e4,lv=200,Xs=5e4,ft=new Map;function cv(e){const t=ft.get(e);return t===void 0?null:(ft.delete(e),ft.set(e,t),t)}function tr(e,t){if(ft.set(e,t),ft.size<=lv)return;const n=ft.keys().next().value;n&&ft.delete(n)}function dv(){er||(er=!0,Ii.addHook("afterSanitizeAttributes",e=>{!(e instanceof HTMLAnchorElement)||!e.getAttribute("href")||(e.setAttribute("rel","noreferrer noopener"),e.setAttribute("target","_blank"))}))}function Di(e){const t=e.trim();if(!t)return"";if(dv(),t.length<=Xs){const a=cv(t);if(a!==null)return a}const n=zr(t,av),s=n.truncated?`

… truncated (${n.total} chars, showing first ${n.text.length}).`:"";if(n.text.length>rv){const l=`<pre class="code-block">${uv(`${n.text}${s}`)}</pre>`,c=Ii.sanitize(l,{ALLOWED_TAGS:Ja,ALLOWED_ATTR:Xa});return t.length<=Xs&&tr(t,c),c}const i=Q.parse(`${n.text}${s}`),o=Ii.sanitize(i,{ALLOWED_TAGS:Ja,ALLOWED_ATTR:Xa});return t.length<=Xs&&tr(t,o),o}function uv(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const gv=1500,pv=2e3,sc="Copy as markdown",hv="Copied",fv="Copy failed";async function vv(e){if(!e)return!1;try{return await navigator.clipboard.writeText(e),!0}catch{return!1}}function Pn(e,t){e.title=t,e.setAttribute("aria-label",t)}function mv(e){const t=e.label??sc;return r`
    <button
      class="chat-copy-btn"
      type="button"
      title=${t}
      aria-label=${t}
      @click=${async n=>{const s=n.currentTarget;if(!s||s.dataset.copying==="1")return;s.dataset.copying="1",s.setAttribute("aria-busy","true"),s.disabled=!0;const i=await vv(e.text());if(s.isConnected){if(delete s.dataset.copying,s.removeAttribute("aria-busy"),s.disabled=!1,!i){s.dataset.error="1",Pn(s,fv),window.setTimeout(()=>{s.isConnected&&(delete s.dataset.error,Pn(s,t))},pv);return}s.dataset.copied="1",Pn(s,hv),window.setTimeout(()=>{s.isConnected&&(delete s.dataset.copied,Pn(s,t))},gv)}}}
    >
      <span class="chat-copy-btn__icon" aria-hidden="true">
        <span class="chat-copy-btn__icon-copy">${X.copy}</span>
        <span class="chat-copy-btn__icon-check">${X.check}</span>
      </span>
    </button>
  `}function bv(e){return mv({text:()=>e,label:sc})}function ic(e){const t=e;let n=typeof t.role=="string"?t.role:"unknown";const s=typeof t.toolCallId=="string"||typeof t.tool_call_id=="string",i=t.content,o=Array.isArray(i)?i:null,a=Array.isArray(o)&&o.some(p=>{const h=p,v=(typeof h.type=="string"?h.type:"").toLowerCase();return v==="toolresult"||v==="tool_result"}),l=typeof t.toolName=="string"||typeof t.tool_name=="string";(s||a||l)&&(n="toolResult");let c=[];typeof t.content=="string"?c=[{type:"text",text:t.content}]:Array.isArray(t.content)?c=t.content.map(p=>({type:p.type||"text",text:p.text,name:p.name,args:p.args||p.arguments})):typeof t.text=="string"&&(c=[{type:"text",text:t.text}]);const u=typeof t.timestamp=="number"?t.timestamp:Date.now(),g=typeof t.id=="string"?t.id:void 0;return{role:n,content:c,timestamp:u,id:g}}function Co(e){const t=e.toLowerCase();return e==="user"||e==="User"?e:e==="assistant"?"assistant":e==="system"?"system":t==="toolresult"||t==="tool_result"||t==="tool"||t==="function"?"tool":e}function oc(e){const t=e,n=typeof t.role=="string"?t.role.toLowerCase():"";return n==="toolresult"||n==="tool_result"}const yv={icon:"puzzle",detailKeys:["command","path","url","targetUrl","targetId","ref","element","node","nodeId","id","requestId","to","channelId","guildId","userId","name","query","pattern","messageId"]},xv={bash:{icon:"wrench",title:"Bash",detailKeys:["command"]},process:{icon:"wrench",title:"Process",detailKeys:["sessionId"]},read:{icon:"fileText",title:"Read",detailKeys:["path"]},write:{icon:"edit",title:"Write",detailKeys:["path"]},edit:{icon:"penLine",title:"Edit",detailKeys:["path"]},attach:{icon:"paperclip",title:"Attach",detailKeys:["path","url","fileName"]},browser:{icon:"globe",title:"Browser",actions:{status:{label:"status"},start:{label:"start"},stop:{label:"stop"},tabs:{label:"tabs"},open:{label:"open",detailKeys:["targetUrl"]},focus:{label:"focus",detailKeys:["targetId"]},close:{label:"close",detailKeys:["targetId"]},snapshot:{label:"snapshot",detailKeys:["targetUrl","targetId","ref","element","format"]},screenshot:{label:"screenshot",detailKeys:["targetUrl","targetId","ref","element"]},navigate:{label:"navigate",detailKeys:["targetUrl","targetId"]},console:{label:"console",detailKeys:["level","targetId"]},pdf:{label:"pdf",detailKeys:["targetId"]},upload:{label:"upload",detailKeys:["paths","ref","inputRef","element","targetId"]},dialog:{label:"dialog",detailKeys:["accept","promptText","targetId"]},act:{label:"act",detailKeys:["request.kind","request.ref","request.selector","request.text","request.value"]}}},canvas:{icon:"image",title:"Canvas",actions:{present:{label:"present",detailKeys:["target","node","nodeId"]},hide:{label:"hide",detailKeys:["node","nodeId"]},navigate:{label:"navigate",detailKeys:["url","node","nodeId"]},eval:{label:"eval",detailKeys:["javaScript","node","nodeId"]},snapshot:{label:"snapshot",detailKeys:["format","node","nodeId"]},a2ui_push:{label:"A2UI push",detailKeys:["jsonlPath","node","nodeId"]},a2ui_reset:{label:"A2UI reset",detailKeys:["node","nodeId"]}}},nodes:{icon:"smartphone",title:"Nodes",actions:{status:{label:"status"},describe:{label:"describe",detailKeys:["node","nodeId"]},pending:{label:"pending"},approve:{label:"approve",detailKeys:["requestId"]},reject:{label:"reject",detailKeys:["requestId"]},notify:{label:"notify",detailKeys:["node","nodeId","title","body"]},camera_snap:{label:"camera snap",detailKeys:["node","nodeId","facing","deviceId"]},camera_list:{label:"camera list",detailKeys:["node","nodeId"]},camera_clip:{label:"camera clip",detailKeys:["node","nodeId","facing","duration","durationMs"]},screen_record:{label:"screen record",detailKeys:["node","nodeId","duration","durationMs","fps","screenIndex"]}}},cron:{icon:"loader",title:"Cron",actions:{status:{label:"status"},list:{label:"list"},add:{label:"add",detailKeys:["job.name","job.id","job.schedule","job.cron"]},update:{label:"update",detailKeys:["id"]},remove:{label:"remove",detailKeys:["id"]},run:{label:"run",detailKeys:["id"]},runs:{label:"runs",detailKeys:["id"]},wake:{label:"wake",detailKeys:["text","mode"]}}},gateway:{icon:"plug",title:"Gateway",actions:{restart:{label:"restart",detailKeys:["reason","delayMs"]},"config.get":{label:"config get"},"config.schema":{label:"config schema"},"config.apply":{label:"config apply",detailKeys:["restartDelayMs"]},"update.run":{label:"update run",detailKeys:["restartDelayMs"]}}},whatsapp_login:{icon:"circle",title:"WhatsApp Login",actions:{start:{label:"start"},wait:{label:"wait"}}},discord:{icon:"messageSquare",title:"Discord",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sticker:{label:"sticker",detailKeys:["to","stickerIds"]},poll:{label:"poll",detailKeys:["question","to"]},permissions:{label:"permissions",detailKeys:["channelId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},threadCreate:{label:"thread create",detailKeys:["channelId","name"]},threadList:{label:"thread list",detailKeys:["guildId","channelId"]},threadReply:{label:"thread reply",detailKeys:["channelId","content"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},searchMessages:{label:"search",detailKeys:["guildId","content"]},memberInfo:{label:"member",detailKeys:["guildId","userId"]},roleInfo:{label:"roles",detailKeys:["guildId"]},emojiList:{label:"emoji list",detailKeys:["guildId"]},roleAdd:{label:"role add",detailKeys:["guildId","userId","roleId"]},roleRemove:{label:"role remove",detailKeys:["guildId","userId","roleId"]},channelInfo:{label:"channel",detailKeys:["channelId"]},channelList:{label:"channels",detailKeys:["guildId"]},voiceStatus:{label:"voice",detailKeys:["guildId","userId"]},eventList:{label:"events",detailKeys:["guildId"]},eventCreate:{label:"event create",detailKeys:["guildId","name"]},timeout:{label:"timeout",detailKeys:["guildId","userId"]},kick:{label:"kick",detailKeys:["guildId","userId"]},ban:{label:"ban",detailKeys:["guildId","userId"]}}},slack:{icon:"messageSquare",title:"Slack",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},memberInfo:{label:"member",detailKeys:["userId"]},emojiList:{label:"emoji list"}}}},$v={fallback:yv,tools:xv},ac=$v,nr=ac.fallback??{icon:"puzzle"},wv=ac.tools??{};function kv(e){return(e??"tool").trim()}function Sv(e){const t=e.replace(/_/g," ").trim();return t?t.split(/\s+/).map(n=>n.length<=2&&n.toUpperCase()===n?n:`${n.at(0)?.toUpperCase()??""}${n.slice(1)}`).join(" "):"Tool"}function Av(e){const t=e?.trim();if(t)return t.replace(/_/g," ")}function rc(e){if(e!=null){if(typeof e=="string"){const t=e.trim();if(!t)return;const n=t.split(/\r?\n/)[0]?.trim()??"";return n?n.length>160?`${n.slice(0,157)}…`:n:void 0}if(typeof e=="number"||typeof e=="boolean")return String(e);if(Array.isArray(e)){const t=e.map(s=>rc(s)).filter(s=>!!s);if(t.length===0)return;const n=t.slice(0,3).join(", ");return t.length>3?`${n}…`:n}}}function Cv(e,t){if(!e||typeof e!="object")return;let n=e;for(const s of t.split(".")){if(!s||!n||typeof n!="object")return;n=n[s]}return n}function Tv(e,t){for(const n of t){const s=Cv(e,n),i=rc(s);if(i)return i}}function _v(e){if(!e||typeof e!="object")return;const t=e,n=typeof t.path=="string"?t.path:void 0;if(!n)return;const s=typeof t.offset=="number"?t.offset:void 0,i=typeof t.limit=="number"?t.limit:void 0;return s!==void 0&&i!==void 0?`${n}:${s}-${s+i}`:n}function Lv(e){if(!e||typeof e!="object")return;const t=e;return typeof t.path=="string"?t.path:void 0}function Ev(e,t){if(!(!e||!t))return e.actions?.[t]??void 0}function Iv(e){const t=kv(e.name),n=t.toLowerCase(),s=wv[n],i=s?.icon??nr.icon??"puzzle",o=s?.title??Sv(t),a=s?.label??t,l=e.args&&typeof e.args=="object"?e.args.action:void 0,c=typeof l=="string"?l.trim():void 0,u=Ev(s,c),g=Av(u?.label??c);let p;n==="read"&&(p=_v(e.args)),!p&&(n==="write"||n==="edit"||n==="attach")&&(p=Lv(e.args));const h=u?.detailKeys??s?.detailKeys??nr.detailKeys??[];return!p&&h.length>0&&(p=Tv(e.args,h)),!p&&e.meta&&(p=e.meta),p&&(p=Rv(p)),{name:t,icon:i,title:o,label:a,verb:g,detail:p}}function Mv(e){const t=[];if(e.verb&&t.push(e.verb),e.detail&&t.push(e.detail),t.length!==0)return t.join(" · ")}function Rv(e){return e&&e.replace(/\/Users\/[^/]+/g,"~").replace(/\/home\/[^/]+/g,"~")}const Pv=80,Dv=2,sr=100;function Nv(e){const t=e.trim();if(t.startsWith("{")||t.startsWith("["))try{const n=JSON.parse(t);return"```json\n"+JSON.stringify(n,null,2)+"\n```"}catch{}return e}function Fv(e){const t=e.split(`
`),n=t.slice(0,Dv),s=n.join(`
`);return s.length>sr?s.slice(0,sr)+"…":n.length<t.length?s+"…":s}function Ov(e){const t=e,n=Bv(t.content),s=[];for(const i of n){const o=(typeof i.type=="string"?i.type:"").toLowerCase();(["toolcall","tool_call","tooluse","tool_use"].includes(o)||typeof i.name=="string"&&i.arguments!=null)&&s.push({kind:"call",name:i.name??"tool",args:Uv(i.arguments??i.args)})}for(const i of n){const o=(typeof i.type=="string"?i.type:"").toLowerCase();if(o!=="toolresult"&&o!=="tool_result")continue;const a=zv(i),l=typeof i.name=="string"?i.name:"tool";s.push({kind:"result",name:l,text:a})}if(oc(e)&&!s.some(i=>i.kind==="result")){const i=typeof t.toolName=="string"&&t.toolName||typeof t.tool_name=="string"&&t.tool_name||"tool",o=yl(e)??void 0;s.push({kind:"result",name:i,text:o})}return s}function ir(e,t){const n=Iv({name:e.name,args:e.args}),s=Mv(n),i=!!e.text?.trim(),o=!!t,a=o?()=>{if(i){t(Nv(e.text));return}const p=`## ${n.label}

${s?`**Command:** \`${s}\`

`:""}*No output — tool completed successfully.*`;t(p)}:void 0,l=i&&(e.text?.length??0)<=Pv,c=i&&!l,u=i&&l,g=!i;return r`
    <div
      class="chat-tool-card ${o?"chat-tool-card--clickable":""}"
      @click=${a}
      role=${o?"button":f}
      tabindex=${o?"0":f}
      @keydown=${o?p=>{p.key!=="Enter"&&p.key!==" "||(p.preventDefault(),a?.())}:f}
    >
      <div class="chat-tool-card__header">
        <div class="chat-tool-card__title">
          <span class="chat-tool-card__icon">${X[n.icon]}</span>
          <span>${n.label}</span>
        </div>
        ${o?r`<span class="chat-tool-card__action">${i?"View":""} ${X.check}</span>`:f}
        ${g&&!o?r`<span class="chat-tool-card__status">${X.check}</span>`:f}
      </div>
      ${s?r`<div class="chat-tool-card__detail">${s}</div>`:f}
      ${g?r`
              <div class="chat-tool-card__status-text muted">Completed</div>
            `:f}
      ${c?r`<div class="chat-tool-card__preview mono">${Fv(e.text)}</div>`:f}
      ${u?r`<div class="chat-tool-card__inline mono">${e.text}</div>`:f}
    </div>
  `}function Bv(e){return Array.isArray(e)?e.filter(Boolean):[]}function Uv(e){if(typeof e!="string")return e;const t=e.trim();if(!t||!t.startsWith("{")&&!t.startsWith("["))return e;try{return JSON.parse(t)}catch{return e}}function zv(e){if(typeof e.text=="string")return e.text;if(typeof e.content=="string")return e.content}function Hv(e){const n=e.content,s=[];if(Array.isArray(n))for(const i of n){if(typeof i!="object"||i===null)continue;const o=i;if(o.type==="image"){const a=o.source;if(a?.type==="base64"&&typeof a.data=="string"){const l=a.data,c=a.media_type||"image/png",u=l.startsWith("data:")?l:`data:${c};base64,${l}`;s.push({url:u})}else typeof o.url=="string"&&s.push({url:o.url})}else if(o.type==="image_url"){const a=o.image_url;typeof a?.url=="string"&&s.push({url:a.url})}}return s}function Kv(e){return r`
    <div class="chat-group assistant">
      ${To("assistant",e)}
      <div class="chat-group-messages">
        <div class="chat-bubble chat-reading-indicator" aria-hidden="true">
          <span class="chat-reading-indicator__dots">
            <span></span><span></span><span></span>
          </span>
        </div>
      </div>
    </div>
  `}function jv(e,t,n,s){const i=new Date(t).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}),o=s?.name??"Assistant";return r`
    <div class="chat-group assistant">
      ${To("assistant",s)}
      <div class="chat-group-messages">
        ${lc({role:"assistant",content:[{type:"text",text:e}],timestamp:t},{isStreaming:!0,showReasoning:!1},n)}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${o}</span>
          <span class="chat-group-timestamp">${i}</span>
        </div>
      </div>
    </div>
  `}function Wv(e,t){const n=Co(e.role),s=t.assistantName??"Assistant",i=n==="user"?"You":n==="assistant"?s:n,o=n==="user"?"user":n==="assistant"?"assistant":"other",a=new Date(e.timestamp).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return r`
    <div class="chat-group ${o}">
      ${To(e.role,{name:s,avatar:t.assistantAvatar??null})}
      <div class="chat-group-messages">
        ${e.messages.map((l,c)=>lc(l.message,{isStreaming:e.isStreaming&&c===e.messages.length-1,showReasoning:t.showReasoning},t.onOpenSidebar))}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${i}</span>
          <span class="chat-group-timestamp">${a}</span>
        </div>
      </div>
    </div>
  `}function To(e,t){const n=Co(e),s=t?.name?.trim()||"Assistant",i=t?.avatar?.trim()||"",o=n==="user"?"U":n==="assistant"?s.charAt(0).toUpperCase()||"A":n==="tool"?"⚙":"?",a=n==="user"?"user":n==="assistant"?"assistant":n==="tool"?"tool":"other";return i&&n==="assistant"?Gv(i)?r`<img
        class="chat-avatar ${a}"
        src="${i}"
        alt="${s}"
      />`:r`<div class="chat-avatar ${a}">${i}</div>`:r`<div class="chat-avatar ${a}">${o}</div>`}function Gv(e){return/^https?:\/\//i.test(e)||/^data:image\//i.test(e)||e.startsWith("/")}function qv(e){return e.length===0?f:r`
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
  `}function lc(e,t,n){const s=e,i=typeof s.role=="string"?s.role:"unknown",o=oc(e)||i.toLowerCase()==="toolresult"||i.toLowerCase()==="tool_result"||typeof s.toolCallId=="string"||typeof s.tool_call_id=="string",a=Ov(e),l=a.length>0,c=Hv(e),u=c.length>0,g=yl(e),p=t.showReasoning&&i==="assistant"?yg(e):null,h=g?.trim()?g:null,v=p?$g(p):null,d=h,m=i==="assistant"&&!!d?.trim(),y=["chat-bubble",m?"has-copy":"",t.isStreaming?"streaming":"","fade-in"].filter(Boolean).join(" ");return!d&&l&&o?r`${a.map(C=>ir(C,n))}`:!d&&!l&&!u?f:r`
    <div class="${y}">
      ${m?bv(d):f}
      ${qv(c)}
      ${v?r`<div class="chat-thinking">${Ti(Di(v))}</div>`:f}
      ${d?r`<div class="chat-text">${Ti(Di(d))}</div>`:f}
      ${a.map(C=>ir(C,n))}
    </div>
  `}function Vv(e){const t=(n,s)=>W(e.locale,n,s);return r`
    <div class="sidebar-panel">
      <div class="sidebar-header">
        <div class="sidebar-title">${t("Tool Output","工具输出")}</div>
        <button @click=${e.onClose} class="btn" title=${t("Close sidebar","关闭侧栏")}>
          ${X.x}
        </button>
      </div>
      <div class="sidebar-content">
        ${e.error?r`
              <div class="callout danger">${e.error}</div>
              <button @click=${e.onViewRawText} class="btn" style="margin-top: 12px;">
                ${t("View Raw Text","查看原始文本")}
              </button>
            `:e.content?r`<div class="sidebar-markdown">${Ti(Di(e.content))}</div>`:r`
                  <div class="muted">${t("No content available","暂无内容")}</div>
                `}
      </div>
    </div>
  `}var Qv=Object.defineProperty,Yv=Object.getOwnPropertyDescriptor,$s=(e,t,n,s)=>{for(var i=s>1?void 0:s?Yv(t,n):t,o=e.length-1,a;o>=0;o--)(a=e[o])&&(i=(s?a(t,n,i):a(i))||i);return s&&i&&Qv(t,n,i),i};let Ft=class extends Mt{constructor(){super(...arguments),this.splitRatio=.6,this.minRatio=.4,this.maxRatio=.7,this.isDragging=!1,this.startX=0,this.startRatio=0,this.handleMouseDown=e=>{this.isDragging=!0,this.startX=e.clientX,this.startRatio=this.splitRatio,this.classList.add("dragging"),document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),e.preventDefault()},this.handleMouseMove=e=>{if(!this.isDragging)return;const t=this.parentElement;if(!t)return;const n=t.getBoundingClientRect().width,i=(e.clientX-this.startX)/n;let o=this.startRatio+i;o=Math.max(this.minRatio,Math.min(this.maxRatio,o)),this.dispatchEvent(new CustomEvent("resize",{detail:{splitRatio:o},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{this.isDragging=!1,this.classList.remove("dragging"),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}}render(){return f}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}};Ft.styles=$c`
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
  `;$s([rs({type:Number})],Ft.prototype,"splitRatio",2);$s([rs({type:Number})],Ft.prototype,"minRatio",2);$s([rs({type:Number})],Ft.prototype,"maxRatio",2);Ft=$s([Mr("resizable-divider")],Ft);const Zv=5e3;function or(e){e.style.height="auto",e.style.height=`${e.scrollHeight}px`}function Jv(e,t){if(!e)return f;const n=(s,i)=>W(t,s,i);return e.active?r`
      <div class="compaction-indicator compaction-indicator--active" role="status" aria-live="polite">
        ${X.loader} ${n("Compacting context...","正在压缩上下文...")}
      </div>
    `:e.completedAt&&Date.now()-e.completedAt<Zv?r`
        <div class="compaction-indicator compaction-indicator--complete" role="status" aria-live="polite">
          ${X.check} ${n("Context compacted","上下文已压缩")}
        </div>
      `:f}function Xv(){return`att-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function em(e,t){const n=e.clipboardData?.items;if(!n||!t.onAttachmentsChange)return;const s=[];for(let i=0;i<n.length;i++){const o=n[i];o.type.startsWith("image/")&&s.push(o)}if(s.length!==0){e.preventDefault();for(const i of s){const o=i.getAsFile();if(!o)continue;const a=new FileReader;a.addEventListener("load",()=>{const l=a.result,c={id:Xv(),dataUrl:l,mimeType:o.type},u=t.attachments??[];t.onAttachmentsChange?.([...u,c])}),a.readAsDataURL(o)}}}function tm(e){const t=e.attachments??[];return t.length===0?f:r`
    <div class="chat-attachments">
      ${t.map(n=>r`
          <div class="chat-attachment">
            <img
              src=${n.dataUrl}
              alt=${W(e.locale,"Attachment preview","附件预览")}
              class="chat-attachment__img"
            />
            <button
              class="chat-attachment__remove"
              type="button"
              aria-label=${W(e.locale,"Remove attachment","移除附件")}
              @click=${()=>{const s=(e.attachments??[]).filter(i=>i.id!==n.id);e.onAttachmentsChange?.(s)}}
            >
              ${X.x}
            </button>
          </div>
        `)}
    </div>
  `}function nm(e){const t=(y,C)=>W(e.locale,y,C),n=e.connected,s=e.sending||e.stream!==null,i=!!(e.canAbort&&e.onAbort),a=e.sessions?.sessions?.find(y=>y.key===e.sessionKey)?.reasoningLevel??"off",l=e.showThinking&&a!=="off",c={name:e.assistantName,avatar:e.assistantAvatar??e.assistantAvatarUrl??null},u=(e.attachments?.length??0)>0,g=e.connected?u?t("Add a message or paste more images...","添加消息或继续粘贴图片..."):t("Message (Enter to send, Shift+Enter for line breaks, paste images)","消息（Enter 发送，Shift+Enter 换行，可粘贴图片）"):t("Connect to the gateway to start chatting...","连接网关后即可开始聊天..."),p=e.splitRatio??.6,h=!!(e.sidebarOpen&&e.onCloseSidebar),v=im(e),d=!e.loading&&v.length===0,m=r`
    <div
      class="chat-thread"
      role="log"
      aria-live="polite"
      @scroll=${e.onChatScroll}
    >
      ${e.loading?r`
              <div class="muted" style="text-align: center; padding: 48px 0">
                ${t("Loading chat...","正在加载聊天...")}
              </div>
            `:f}
      ${d?r`
              <div class="chat-welcome">
                <div class="chat-welcome__icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div class="chat-welcome__title">${t("Start a conversation","开始对话")}</div>
                <div class="chat-welcome__sub">
                  ${t("Send a message to begin chatting with the assistant.","发送一条消息开始与助手聊天。")}
                </div>
                <div class="chat-welcome__hints">
                  <button class="chat-welcome__hint" @click=${()=>{e.onDraftChange(t("What can you help me with?","你可以帮我做什么？"))}}>
                    ${t("What can you help me with?","你可以帮我做什么？")}
                  </button>
                  <button class="chat-welcome__hint" @click=${()=>{e.onDraftChange(t("Show me your available tools","展示你可用的工具"))}}>
                    ${t("Show me your available tools","展示你可用的工具")}
                  </button>
                  <button class="chat-welcome__hint" @click=${()=>{e.onDraftChange(t("Tell me about this system","介绍一下这个系统"))}}>
                    ${t("Tell me about this system","介绍一下这个系统")}
                  </button>
                </div>
              </div>
            `:f}
      ${Ll(v,y=>y.key,y=>y.kind==="divider"?r`
              <div class="chat-divider" role="separator" data-ts=${String(y.timestamp)}>
                <span class="chat-divider__line"></span>
                <span class="chat-divider__label">${y.label}</span>
                <span class="chat-divider__line"></span>
              </div>
            `:y.kind==="reading-indicator"?Kv(c):y.kind==="stream"?jv(y.text,y.startedAt,e.onOpenSidebar,c):y.kind==="group"?Wv(y,{onOpenSidebar:e.onOpenSidebar,showReasoning:l,assistantName:e.assistantName,assistantAvatar:c.avatar}):f)}
    </div>
  `;return r`
    <section class="card chat">
      ${e.disabledReason?r`<div class="callout">${e.disabledReason}</div>`:f}

      ${e.error?r`<div class="callout danger">${e.error}</div>`:f}

      ${e.focusMode?r`
            <button
              class="chat-focus-exit"
              type="button"
              @click=${e.onToggleFocusMode}
              aria-label=${t("Exit focus mode","退出专注模式")}
              title=${t("Exit focus mode","退出专注模式")}
            >
              ${X.x}
            </button>
          `:f}

      <div
        class="chat-split-container ${h?"chat-split-container--open":""}"
      >
        <div
          class="chat-main"
          style="flex: ${h?`0 0 ${p*100}%`:"1 1 100%"}"
        >
          ${m}
        </div>

        ${h?r`
              <resizable-divider
                .splitRatio=${p}
                @resize=${y=>e.onSplitRatioChange?.(y.detail.splitRatio)}
              ></resizable-divider>
              <div class="chat-sidebar">
                ${Vv({locale:e.locale,content:e.sidebarContent??null,error:e.sidebarError??null,onClose:e.onCloseSidebar,onViewRawText:()=>{!e.sidebarContent||!e.onOpenSidebar||e.onOpenSidebar(`\`\`\`
${e.sidebarContent}
\`\`\``)}})}
              </div>
            `:f}
      </div>

      ${e.queue.length?r`
            <div class="chat-queue" role="status" aria-live="polite">
              <div class="chat-queue__title">${t("Queued","队列中")} (${e.queue.length})</div>
              <div class="chat-queue__list">
                ${e.queue.map(y=>r`
                    <div class="chat-queue__item">
                      <div class="chat-queue__text">
                        ${y.text||(y.attachments?.length?`${t("Image","图片")} (${y.attachments.length})`:"")}
                      </div>
                      <button
                        class="btn chat-queue__remove"
                        type="button"
                        aria-label=${t("Remove queued message","移除排队消息")}
                        @click=${()=>e.onQueueRemove(y.id)}
                      >
                        ${X.x}
                      </button>
                    </div>
                  `)}
              </div>
            </div>
          `:f}

      ${Jv(e.compactionStatus,e.locale)}

      ${e.showNewMessages?r`
            <button
              class="btn chat-new-messages"
              type="button"
              @click=${e.onScrollToBottom}
            >
              ${t("New messages","新消息")} ${X.arrowDown}
            </button>
          `:f}

      <div class="chat-compose">
        ${tm(e)}
        <div class="chat-compose__row">
          <label class="field chat-compose__field">
            <span>${t("Message","消息")}</span>
            <textarea
              ${ef(y=>y&&or(y))}
              .value=${e.draft}
              ?disabled=${!e.connected}
              @keydown=${y=>{y.key==="Enter"&&(y.isComposing||y.keyCode===229||y.shiftKey||e.connected&&(y.preventDefault(),n&&e.onSend()))}}
              @input=${y=>{const C=y.target;or(C),e.onDraftChange(C.value)}}
              @paste=${y=>em(y,e)}
              placeholder=${g}
            ></textarea>
          </label>
          <div class="chat-compose__actions">
            <span class="chat-compose__hint">${t("Enter Send · Shift+Enter New line","Enter 发送 · Shift+Enter 换行")}</span>
            <div class="chat-compose__actions-right">
              <button
                class="btn"
                ?disabled=${!e.connected||!i&&e.sending}
                @click=${i?e.onAbort:e.onNewSession}
              >
                ${i?t("Stop","停止"):t("New","新建")}
              </button>
              <button
                class="btn primary"
                ?disabled=${!e.connected}
                @click=${e.onSend}
              >
                ${s?t("Queue","排队"):t("Send","发送")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `}const ei=200;function sm(e){const t=[];let n=null;for(const s of e){if(s.kind!=="message"){n&&(t.push(n),n=null),t.push(s);continue}const i=ic(s.message),o=Co(i.role),a=i.timestamp||Date.now();!n||n.role!==o?(n&&t.push(n),n={kind:"group",key:`group:${o}:${s.key}`,role:o,messages:[{message:s.message,key:s.key}],timestamp:a,isStreaming:!1}):n.messages.push({message:s.message,key:s.key})}return n&&t.push(n),t}function im(e){const t=(a,l)=>W(e.locale,a,l),n=[],s=Array.isArray(e.messages)?e.messages:[],i=Array.isArray(e.toolMessages)?e.toolMessages:[],o=Math.max(0,s.length-ei);o>0&&n.push({kind:"message",key:"chat:history:notice",message:{role:"system",content:t(`Showing last ${ei} messages (${o} hidden).`,`仅显示最近 ${ei} 条消息（已隐藏 ${o} 条）。`),timestamp:Date.now()}});for(let a=o;a<s.length;a++){const l=s[a],c=ic(l),g=l.__opensoul;if(g&&g.kind==="compaction"){n.push({kind:"divider",key:typeof g.id=="string"?`divider:compaction:${g.id}`:`divider:compaction:${c.timestamp}:${a}`,label:t("Compaction","压缩"),timestamp:c.timestamp??Date.now()});continue}!e.showThinking&&c.role.toLowerCase()==="toolresult"||n.push({kind:"message",key:ar(l,a),message:l})}if(e.showThinking)for(let a=0;a<i.length;a++)n.push({kind:"message",key:ar(i[a],a+s.length),message:i[a]});if(e.stream!==null){const a=`stream:${e.sessionKey}:${e.streamStartedAt??"live"}`;e.stream.trim().length>0?n.push({kind:"stream",key:a,text:e.stream,startedAt:e.streamStartedAt??Date.now()}):n.push({kind:"reading-indicator",key:a})}return sm(n)}function ar(e,t){const n=e,s=typeof n.toolCallId=="string"?n.toolCallId:"";if(s)return`tool:${s}`;const i=typeof n.id=="string"?n.id:"";if(i)return`msg:${i}`;const o=typeof n.messageId=="string"?n.messageId:"";if(o)return`msg:${o}`;const a=typeof n.timestamp=="number"?n.timestamp:null,l=typeof n.role=="string"?n.role:"unknown";return a!=null?`msg:${l}:${a}:${t}`:`msg:${l}:${t}`}const Ni={all:r`
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
  `},rr=[{key:"env",label:"Environment"},{key:"update",label:"Updates"},{key:"agents",label:"Agents"},{key:"auth",label:"Authentication"},{key:"channels",label:"Channels"},{key:"messages",label:"Messages"},{key:"commands",label:"Commands"},{key:"hooks",label:"Hooks"},{key:"skills",label:"Skills"},{key:"tools",label:"Tools"},{key:"gateway",label:"Gateway"},{key:"wizard",label:"Setup Wizard"}],lr="__all__";function cr(e){return Ni[e]??Ni.default}function om(e,t,n){const s=vo[t];if(s)return{label:Zn(e,t,s.label),description:Ai(e,t,s.description)};const i=n?.title??Qe(t),o=n?.description??"";return{label:Zn(e,t,i),description:Ai(e,t,o)}}function am(e){const{locale:t,key:n,schema:s,uiHints:i}=e;if(!s||Fe(s)!=="object"||!s.properties)return[];const o=Object.entries(s.properties).map(([a,l])=>{const c=Te([n,a],i),u=c?.label??l.title??Qe(a),g=de(t,u),p=c?.help??l.description??"",h=p&&de(t,p),v=c?.order??50;return{key:a,label:g,description:h,order:v}});return o.sort((a,l)=>a.order!==l.order?a.order-l.order:a.key.localeCompare(l.key)),o}function rm(e,t){if(!e||!t)return[];const n=[];function s(i,o,a){if(i===o)return;if(typeof i!=typeof o){n.push({path:a,from:i,to:o});return}if(typeof i!="object"||i===null||o===null){i!==o&&n.push({path:a,from:i,to:o});return}if(Array.isArray(i)&&Array.isArray(o)){JSON.stringify(i)!==JSON.stringify(o)&&n.push({path:a,from:i,to:o});return}const l=i,c=o,u=new Set([...Object.keys(l),...Object.keys(c)]);for(const g of u)s(l[g],c[g],a?`${a}.${g}`:g)}return s(e,t,""),n}function dr(e,t=40){let n;try{n=JSON.stringify(e)??String(e)}catch{n=String(e)}return n.length<=t?n:n.slice(0,t-3)+"..."}function lm(e){const t=(R,P)=>Oe(e.locale,R,P),n=e.valid==null?"unknown":e.valid?"valid":"invalid",s=n==="valid"?t("valid","有效"):n==="invalid"?t("invalid","无效"):t("unknown","未知"),i=Ol(e.schema),o=i.schema?i.unsupportedPaths.length>0:!1,a=i.schema?.properties??{},l=rr.filter(R=>R.key in a),c=new Set(rr.map(R=>R.key)),u=Object.keys(a).filter(R=>!c.has(R)).map(R=>({key:R,label:R.charAt(0).toUpperCase()+R.slice(1)})),g=[...l,...u],p=e.activeSection&&i.schema&&Fe(i.schema)==="object"?i.schema.properties?.[e.activeSection]:void 0,h=e.activeSection?om(e.locale,e.activeSection,p):null,v=e.activeSection?am({locale:e.locale,key:e.activeSection,schema:p,uiHints:e.uiHints}):[],d=e.formMode==="form"&&!!e.activeSection&&v.length>0,m=e.activeSubsection===lr,y=e.searchQuery||m?null:e.activeSubsection??v[0]?.key??null,C=e.formMode==="form"?rm(e.originalValue,e.formValue):[],b=e.formMode==="raw"&&e.raw!==e.originalRaw,S=e.formMode==="form"?C.length>0:b,A=!!e.formValue&&!e.loading&&!!i.schema,T=e.connected&&!e.saving&&S&&(e.formMode==="raw"?!0:A),M=e.connected&&!e.applying&&!e.updating&&S&&(e.formMode==="raw"?!0:A),E=e.connected&&!e.applying&&!e.updating;return r`
    <div class="config-layout">
      <!-- Sidebar -->
      <aside class="config-sidebar">
        <div class="config-sidebar__header">
          <div class="config-sidebar__title">${t("Settings","设置")}</div>
          <span
            class="pill pill--sm ${n==="valid"?"pill--ok":n==="invalid"?"pill--danger":""}"
            >${s}</span
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
            placeholder=${t("Search settings...","搜索设置...")}
            .value=${e.searchQuery}
            @input=${R=>e.onSearchChange(R.target.value)}
          />
          ${e.searchQuery?r`
                <button
                  class="config-search__clear"
                  title=${t("Clear search","清空搜索")}
                  aria-label=${t("Clear search","清空搜索")}
                  @click=${()=>e.onSearchChange("")}
                >
                  x
                </button>
              `:f}
        </div>

        <!-- Section nav -->
        <nav class="config-nav">
          <button
            class="config-nav__item ${e.activeSection===null?"active":""}"
            @click=${()=>e.onSectionChange(null)}
          >
            <span class="config-nav__icon">${Ni.all}</span>
            <span class="config-nav__label">${t("All Settings","全部设置")}</span>
          </button>
          ${g.map(R=>r`
              <button
                class="config-nav__item ${e.activeSection===R.key?"active":""}"
                @click=${()=>e.onSectionChange(R.key)}
              >
                <span class="config-nav__icon"
                  >${cr(R.key)}</span
                >
                <span class="config-nav__label">${Zn(e.locale,R.key,R.label)}</span>
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
              ${t("Form","表单")}
            </button>
            <button
              class="config-mode-toggle__btn ${e.formMode==="raw"?"active":""}"
              @click=${()=>e.onFormModeChange("raw")}
            >
              ${t("Raw","原始")}
            </button>
          </div>
        </div>
      </aside>

      <!-- Main content -->
      <main class="config-main">
        <!-- Action bar -->
        <div class="config-actions">
          <div class="config-actions__left">
            ${S?r`
                  <span class="config-changes-badge"
                    >${e.formMode==="raw"?t("Unsaved changes","未保存更改"):t(`${C.length} unsaved change${C.length!==1?"s":""}`,`${C.length} 条未保存更改`)}</span
                  >
                `:r`
                    <span class="config-status muted">${t("No changes","无更改")}</span>
                  `}
          </div>
          <div class="config-actions__right">
            <button
              class="btn btn--sm"
              ?disabled=${e.loading}
              @click=${e.onReload}
            >
              ${e.loading?t("Loading...","加载中..."):t("Reload","重载")}
            </button>
            <button
              class="btn btn--sm primary"
              ?disabled=${!T}
              @click=${e.onSave}
            >
              ${e.saving?t("Saving...","保存中..."):t("Save","保存")}
            </button>
            <button
              class="btn btn--sm"
              ?disabled=${!M}
              @click=${e.onApply}
            >
              ${e.applying?t("Applying...","应用中..."):t("Apply","应用")}
            </button>
            <button
              class="btn btn--sm"
              ?disabled=${!E}
              @click=${e.onUpdate}
            >
              ${e.updating?t("Updating...","更新中..."):t("Update","更新")}
            </button>
          </div>
        </div>

        <!-- Diff panel (form mode only - raw mode doesn't have granular diff) -->
        ${S&&e.formMode==="form"?r`
              <details class="config-diff">
                <summary class="config-diff__summary">
                  <span>${t(`View ${C.length} pending change${C.length!==1?"s":""}`,`查看 ${C.length} 条待提交更改`)}</span>
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
                  ${C.map(R=>r`
                      <div class="config-diff__item">
                        <div class="config-diff__path">${R.path}</div>
                        <div class="config-diff__values">
                          <span class="config-diff__from"
                            >${dr(R.from)}</span
                          >
                          <span class="config-diff__arrow">-></span>
                          <span class="config-diff__to"
                            >${dr(R.to)}</span
                          >
                        </div>
                      </div>
                    `)}
                </div>
              </details>
            `:f}
        ${h&&e.formMode==="form"?r`
              <div class="config-section-hero">
                <div class="config-section-hero__icon">
                  ${cr(e.activeSection??"")}
                </div>
                <div class="config-section-hero__text">
                  <div class="config-section-hero__title">
                    ${h.label}
                  </div>
                  ${h.description?r`<div class="config-section-hero__desc">
                        ${h.description}
                      </div>`:f}
                </div>
              </div>
            `:f}
        ${d?r`
              <div class="config-subnav">
                <button
                  class="config-subnav__item ${y===null?"active":""}"
                  @click=${()=>e.onSubsectionChange(lr)}
                >
                  ${t("All","全部")}
                </button>
                ${v.map(R=>r`
                    <button
                      class="config-subnav__item ${y===R.key?"active":""}"
                      title=${R.description||R.label}
                      @click=${()=>e.onSubsectionChange(R.key)}
                    >
                      ${R.label}
                    </button>
                  `)}
              </div>
            `:f}

        <!-- Form content -->
        <div class="config-content">
          ${e.formMode==="form"?r`
                ${e.schemaLoading?r`
                        <div class="config-loading">
                          <div class="config-loading__spinner"></div>
                          <span>${t("Loading schema...","正在加载配置结构...")}</span>
                        </div>
                      `:xh({locale:e.locale,schema:i.schema,uiHints:e.uiHints,value:e.formValue,disabled:e.loading||!e.formValue,unsupportedPaths:i.unsupportedPaths,onPatch:e.onFormPatch,searchQuery:e.searchQuery,activeSection:e.activeSection,activeSubsection:y})}
                ${o?r`
                        <div class="callout danger" style="margin-top: 12px">
                          ${t("Form view can't safely edit some fields. Use Raw to avoid losing config entries.","表单视图无法安全编辑部分字段，请使用原始模式避免配置项丢失。")}
                        </div>
                      `:f}
              `:r`
                <label class="field config-raw-field">
                  <span>${t("Raw JSON5","原始 JSON5")}</span>
                  <textarea
                    .value=${e.raw}
                    @input=${R=>e.onRawChange(R.target.value)}
                  ></textarea>
                </label>
              `}
        </div>

        ${e.issues.length>0?r`<div class="callout danger" style="margin-top: 12px;">
              <pre class="code-block">
${JSON.stringify(e.issues,null,2)}</pre
              >
            </div>`:f}
      </main>
    </div>
  `}function cm(e){const t=["last",...e.channels.filter(Boolean)],n=e.form.deliveryChannel?.trim();n&&!t.includes(n)&&t.push(n);const s=new Set;return t.filter(i=>s.has(i)?!1:(s.add(i),!0))}function dm(e,t){if(t==="last")return"last";const n=e.channelMeta?.find(s=>s.id===t);return n?.label?n.label:e.channelLabels?.[t]??t}function um(e){const t=cm(e),s=(e.runsJobId==null?void 0:e.jobs.find(o=>o.id===e.runsJobId))?.name??e.runsJobId??"(select a job)",i=e.runs.toSorted((o,a)=>a.ts-o.ts);return r`
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
            <div class="stat-value">${fo(e.status?.nextWakeAtMs??null)}</div>
          </div>
        </div>
        <div class="row" style="margin-top: 12px;">
          <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Refreshing…":"Refresh"}
          </button>
          ${e.error?r`<span class="muted">${e.error}</span>`:f}
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
        ${gm(e)}
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
                                    ${dm(e,o)}
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
                        `:f}
                </div>
              `:f}
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
              ${e.jobs.map(o=>pm(o,e))}
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
                ${i.map(o=>vm(o,e.basePath))}
              </div>
            `}
    </section>
  `}function gm(e){const t=e.form;return t.scheduleKind==="at"?r`
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
  `}function pm(e,t){const s=`list-item list-item-clickable cron-job${t.runsJobId===e.id?" list-item-selected":""}`;return r`
    <div class=${s} @click=${()=>t.onLoadRuns(e.id)}>
      <div class="list-main">
        <div class="list-title">${e.name}</div>
        <div class="list-sub">${Ml(e)}</div>
        ${hm(e)}
        ${e.agentId?r`<div class="muted cron-job-agent">Agent: ${e.agentId}</div>`:f}
      </div>
      <div class="list-meta">
        ${fm(e)}
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
  `}function hm(e){if(e.payload.kind==="systemEvent")return r`<div class="cron-job-detail">
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
          </div>`:f}
  `}function ur(e){return typeof e!="number"||!Number.isFinite(e)?"n/a":Y(e)}function fm(e){const t=e.state?.lastStatus??"n/a",n=t==="ok"?"cron-job-status-ok":t==="error"?"cron-job-status-error":t==="skipped"?"cron-job-status-skipped":"cron-job-status-na",s=e.state?.nextRunAtMs,i=e.state?.lastRunAtMs;return r`
    <div class="cron-job-state">
      <div class="cron-job-state-row">
        <span class="cron-job-state-key">Status</span>
        <span class=${`cron-job-status-pill ${n}`}>${t}</span>
      </div>
      <div class="cron-job-state-row">
        <span class="cron-job-state-key">Next</span>
        <span class="cron-job-state-value" title=${bt(s)}>
          ${ur(s)}
        </span>
      </div>
      <div class="cron-job-state-row">
        <span class="cron-job-state-key">Last</span>
        <span class="cron-job-state-value" title=${bt(i)}>
          ${ur(i)}
        </span>
      </div>
    </div>
  `}function vm(e,t){const n=typeof e.sessionKey=="string"&&e.sessionKey.trim().length>0?`${ps("chat",t)}?session=${encodeURIComponent(e.sessionKey)}`:null;return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.status}</div>
        <div class="list-sub">${e.summary??""}</div>
      </div>
      <div class="list-meta">
        <div>${bt(e.ts)}</div>
        <div class="muted">${e.durationMs??0}ms</div>
        ${n?r`<div><a class="session-link" href=${n}>Open run chat</a></div>`:f}
        ${e.error?r`<div class="muted">${e.error}</div>`:f}
      </div>
    </div>
  `}function mm(e){const n=(e.status&&typeof e.status=="object"?e.status.securityAudit:null)?.summary??null,s=n?.critical??0,i=n?.warn??0,o=n?.info??0,a=s>0?"danger":i>0?"warn":"success",l=s>0?`${s} critical`:i>0?`${i} warnings`:"No critical issues";return r`
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
                </div>`:f}
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
            </div>`:f}
        ${e.callResult?r`<pre class="code-block" style="margin-top: 12px;">${e.callResult}</pre>`:f}
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
                      <pre class="code-block">${Mp(c.payload)}</pre>
                    </div>
                  </div>
                `)}
            </div>
          `}
    </section>
  `}function bm(e){const t=Math.max(0,e),n=Math.floor(t/1e3);if(n<60)return`${n}s`;const s=Math.floor(n/60);return s<60?`${s}m`:`${Math.floor(s/60)}h`}function lt(e,t){return t?r`<div class="exec-approval-meta-row"><span>${e}</span><span>${t}</span></div>`:f}function ym(e){const t=e.execApprovalQueue[0];if(!t)return f;const n=t.request,s=t.expiresAtMs-Date.now(),i=s>0?`expires in ${bm(s)}`:"expired",o=e.execApprovalQueue.length;return r`
    <div class="exec-approval-overlay" role="dialog" aria-live="polite">
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">Exec approval needed</div>
            <div class="exec-approval-sub">${i}</div>
          </div>
          ${o>1?r`<div class="exec-approval-queue">${o} pending</div>`:f}
        </div>
        <div class="exec-approval-command mono">${n.command}</div>
        <div class="exec-approval-meta">
          ${lt("Host",n.host)}
          ${lt("Agent",n.agentId)}
          ${lt("Session",n.sessionKey)}
          ${lt("CWD",n.cwd)}
          ${lt("Resolved",n.resolvedPath)}
          ${lt("Security",n.security)}
          ${lt("Ask",n.ask)}
        </div>
        ${e.execApprovalError?r`<div class="exec-approval-error">${e.execApprovalError}</div>`:f}
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
  `}function xm(e){const{pendingGatewayUrl:t}=e;if(!t)return f;const n=(s,i)=>W(e.uiLocale,s,i);return r`
    <div class="exec-approval-overlay" role="dialog" aria-modal="true" aria-live="polite">
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">${n("Change Gateway URL","修改网关地址")}</div>
            <div class="exec-approval-sub">
              ${n("This will reconnect to a different gateway server","这将重新连接到另一个网关服务")}
            </div>
          </div>
        </div>
        <div class="exec-approval-command mono">${t}</div>
        <div class="callout danger" style="margin-top: 12px;">
          ${n("Only confirm if you trust this URL. Malicious URLs can compromise your system.","仅在你信任该 URL 时确认。恶意 URL 可能危及你的系统。")}
        </div>
        <div class="exec-approval-actions">
          <button
            class="btn primary"
            @click=${()=>e.handleGatewayUrlConfirm()}
          >
            ${n("Confirm","确认")}
          </button>
          <button
            class="btn"
            @click=${()=>e.handleGatewayUrlCancel()}
          >
            ${n("Cancel","取消")}
          </button>
        </div>
      </div>
    </div>
  `}function $m(e){return r`
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
          </div>`:f}
      ${e.statusMessage?r`<div class="callout" style="margin-top: 12px;">
            ${e.statusMessage}
          </div>`:f}
      <div class="list" style="margin-top: 16px;">
        ${e.entries.length===0?r`
                <div class="muted">No instances reported yet.</div>
              `:e.entries.map(t=>wm(t))}
      </div>
    </section>
  `}function wm(e){const t=e.lastInputSeconds!=null?`${e.lastInputSeconds}s ago`:"n/a",n=e.mode??"unknown",s=Array.isArray(e.roles)?e.roles.filter(Boolean):[],i=Array.isArray(e.scopes)?e.scopes.filter(Boolean):[],o=i.length>0?i.length>3?`${i.length} scopes`:`scopes: ${i.join(", ")}`:null;return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.host??"unknown host"}</div>
        <div class="list-sub">${Lp(e)}</div>
        <div class="chip-row">
          <span class="chip">${n}</span>
          ${s.map(a=>r`<span class="chip">${a}</span>`)}
          ${o?r`<span class="chip">${o}</span>`:f}
          ${e.platform?r`<span class="chip">${e.platform}</span>`:f}
          ${e.deviceFamily?r`<span class="chip">${e.deviceFamily}</span>`:f}
          ${e.modelIdentifier?r`<span class="chip">${e.modelIdentifier}</span>`:f}
          ${e.version?r`<span class="chip">${e.version}</span>`:f}
        </div>
      </div>
      <div class="list-meta">
        <div>${Ep(e)}</div>
        <div class="muted">Last input ${t}</div>
        <div class="muted">Reason ${e.reason??""}</div>
      </div>
    </div>
  `}const gr=["trace","debug","info","warn","error","fatal"];function km(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleTimeString()}function Sm(e,t){return t?[e.message,e.subsystem,e.raw].filter(Boolean).join(" ").toLowerCase().includes(t):!0}function Am(e){const t=e.filterText.trim().toLowerCase(),n=gr.some(o=>!e.levelFilters[o]),s=e.entries.filter(o=>o.level&&!e.levelFilters[o.level]?!1:Sm(o,t)),i=t||n?"filtered":"visible";return r`
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
        ${gr.map(o=>r`
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

      ${e.file?r`<div class="muted" style="margin-top: 10px;">File: ${e.file}</div>`:f}
      ${e.truncated?r`
              <div class="callout" style="margin-top: 10px">Log output truncated; showing latest chunk.</div>
            `:f}
      ${e.error?r`<div class="callout danger" style="margin-top: 10px;">${e.error}</div>`:f}

      <div class="log-stream" style="margin-top: 12px;" @scroll=${e.onScroll}>
        ${s.length===0?r`
                <div class="muted" style="padding: 12px">No log entries.</div>
              `:s.map(o=>r`
                <div class="log-row">
                  <div class="log-time mono">${km(o.time)}</div>
                  <div class="log-level ${o.level??""}">${o.level??""}</div>
                  <div class="log-subsystem mono">${o.subsystem??""}</div>
                  <div class="log-message mono">${o.message??o.raw}</div>
                </div>
              `)}
      </div>
    </section>
  `}function Cm(e){const t=Mm(e),n=Om(e);return r`
    ${Um(n)}
    ${Bm(t)}
    ${Tm(e)}
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
              `:e.nodes.map(s=>Ym(s))}
      </div>
    </section>
  `}function Tm(e){const t=e.devicesList??{pending:[],paired:[]},n=Array.isArray(t.pending)?t.pending:[],s=Array.isArray(t.paired)?t.paired:[];return r`
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
      ${e.devicesError?r`<div class="callout danger" style="margin-top: 12px;">${e.devicesError}</div>`:f}
      <div class="list" style="margin-top: 16px;">
        ${n.length>0?r`
              <div class="muted" style="margin-bottom: 8px;">Pending</div>
              ${n.map(i=>_m(i,e))}
            `:f}
        ${s.length>0?r`
              <div class="muted" style="margin-top: 12px; margin-bottom: 8px;">Paired</div>
              ${s.map(i=>Lm(i,e))}
            `:f}
        ${n.length===0&&s.length===0?r`
                <div class="muted">No paired devices.</div>
              `:f}
      </div>
    </section>
  `}function _m(e,t){const n=e.displayName?.trim()||e.deviceId,s=typeof e.ts=="number"?Y(e.ts):"n/a",i=e.role?.trim()?`role: ${e.role}`:"role: -",o=e.isRepair?" · repair":"",a=e.remoteIp?` · ${e.remoteIp}`:"";return r`
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
  `}function Lm(e,t){const n=e.displayName?.trim()||e.deviceId,s=e.remoteIp?` · ${e.remoteIp}`:"",i=`roles: ${li(e.roles)}`,o=`scopes: ${li(e.scopes)}`,a=Array.isArray(e.tokens)?e.tokens:[];return r`
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
                ${a.map(l=>Em(e.deviceId,l,t))}
              </div>
            `}
      </div>
    </div>
  `}function Em(e,t,n){const s=t.revokedAtMs?"revoked":"active",i=`scopes: ${li(t.scopes)}`,o=Y(t.rotatedAtMs??t.createdAtMs??t.lastUsedAtMs??null);return r`
    <div class="row" style="justify-content: space-between; gap: 8px;">
      <div class="list-sub">${t.role} · ${s} · ${i} · ${o}</div>
      <div class="row" style="justify-content: flex-end; gap: 6px; flex-wrap: wrap;">
        <button
          class="btn btn--sm"
          @click=${()=>n.onDeviceRotate(e,t.role,t.scopes)}
        >
          Rotate
        </button>
        ${t.revokedAtMs?f:r`
              <button
                class="btn btn--sm danger"
                @click=${()=>n.onDeviceRevoke(e,t.role)}
              >
                Revoke
              </button>
            `}
      </div>
    </div>
  `}const Je="__defaults__",pr=[{value:"deny",label:"Deny"},{value:"allowlist",label:"Allowlist"},{value:"full",label:"Full"}],Im=[{value:"off",label:"Off"},{value:"on-miss",label:"On miss"},{value:"always",label:"Always"}];function Mm(e){const t=e.configForm,n=qm(e.nodes),{defaultBinding:s,agents:i}=Qm(t),o=!!t,a=e.configSaving||e.configFormMode==="raw";return{ready:o,disabled:a,configDirty:e.configDirty,configLoading:e.configLoading,configSaving:e.configSaving,defaultBinding:s,agents:i,nodes:n,onBindDefault:e.onBindDefault,onBindAgent:e.onBindAgent,onSave:e.onSaveBindings,onLoadConfig:e.onLoadConfig,formMode:e.configFormMode}}function hr(e){return e==="allowlist"||e==="full"||e==="deny"?e:"deny"}function Rm(e){return e==="always"||e==="off"||e==="on-miss"?e:"on-miss"}function Pm(e){const t=e?.defaults??{};return{security:hr(t.security),ask:Rm(t.ask),askFallback:hr(t.askFallback??"deny"),autoAllowSkills:!!(t.autoAllowSkills??!1)}}function Dm(e){const t=e?.agents??{},n=Array.isArray(t.list)?t.list:[],s=[];return n.forEach(i=>{if(!i||typeof i!="object")return;const o=i,a=typeof o.id=="string"?o.id.trim():"";if(!a)return;const l=typeof o.name=="string"?o.name.trim():void 0,c=o.default===!0;s.push({id:a,name:l||void 0,isDefault:c})}),s}function Nm(e,t){const n=Dm(e),s=Object.keys(t?.agents??{}),i=new Map;n.forEach(a=>i.set(a.id,a)),s.forEach(a=>{i.has(a)||i.set(a,{id:a})});const o=Array.from(i.values());return o.length===0&&o.push({id:"main",isDefault:!0}),o.sort((a,l)=>{if(a.isDefault&&!l.isDefault)return-1;if(!a.isDefault&&l.isDefault)return 1;const c=a.name?.trim()?a.name:a.id,u=l.name?.trim()?l.name:l.id;return c.localeCompare(u)}),o}function Fm(e,t){return e===Je?Je:e&&t.some(n=>n.id===e)?e:Je}function Om(e){const t=e.execApprovalsForm??e.execApprovalsSnapshot?.file??null,n=!!t,s=Pm(t),i=Nm(e.configForm,t),o=Vm(e.nodes),a=e.execApprovalsTarget;let l=a==="node"&&e.execApprovalsTargetNodeId?e.execApprovalsTargetNodeId:null;a==="node"&&l&&!o.some(p=>p.id===l)&&(l=null);const c=Fm(e.execApprovalsSelectedAgent,i),u=c!==Je?(t?.agents??{})[c]??null:null,g=Array.isArray(u?.allowlist)?u.allowlist??[]:[];return{ready:n,disabled:e.execApprovalsSaving||e.execApprovalsLoading,dirty:e.execApprovalsDirty,loading:e.execApprovalsLoading,saving:e.execApprovalsSaving,form:t,defaults:s,selectedScope:c,selectedAgent:u,agents:i,allowlist:g,target:a,targetNodeId:l,targetNodes:o,onSelectScope:e.onExecApprovalsSelectAgent,onSelectTarget:e.onExecApprovalsTargetChange,onPatch:e.onExecApprovalsPatch,onRemove:e.onExecApprovalsRemove,onLoad:e.onLoadExecApprovals,onSave:e.onSaveExecApprovals}}function Bm(e){const t=e.nodes.length>0,n=e.defaultBinding??"";return r`
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
            `:f}

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
                  ${t?f:r`
                          <div class="muted">No nodes with system.run available.</div>
                        `}
                </div>
              </div>

              ${e.agents.length===0?r`
                      <div class="muted">No agents found.</div>
                    `:e.agents.map(s=>Gm(s,e))}
            </div>
          `:r`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load config to edit bindings.</div>
            <button class="btn" ?disabled=${e.configLoading} @click=${e.onLoadConfig}>
              ${e.configLoading?"Loading…":"Load config"}
            </button>
          </div>`}
    </section>
  `}function Um(e){const t=e.ready,n=e.target!=="node"||!!e.targetNodeId;return r`
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

      ${zm(e)}

      ${t?r`
            ${Hm(e)}
            ${Km(e)}
            ${e.selectedScope===Je?f:jm(e)}
          `:r`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load exec approvals to edit allowlists.</div>
            <button class="btn" ?disabled=${e.loading||!n} @click=${e.onLoad}>
              ${e.loading?"Loading…":"Load approvals"}
            </button>
          </div>`}
    </section>
  `}function zm(e){const t=e.targetNodes.length>0,n=e.targetNodeId??"";return r`
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
              `:f}
        </div>
      </div>
      ${e.target==="node"&&!t?r`
              <div class="muted">No nodes advertise exec approvals yet.</div>
            `:f}
    </div>
  `}function Hm(e){return r`
    <div class="row" style="margin-top: 12px; gap: 8px; flex-wrap: wrap;">
      <span class="label">Scope</span>
      <div class="row" style="gap: 8px; flex-wrap: wrap;">
        <button
          class="btn btn--sm ${e.selectedScope===Je?"active":""}"
          @click=${()=>e.onSelectScope(Je)}
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
  `}function Km(e){const t=e.selectedScope===Je,n=e.defaults,s=e.selectedAgent??{},i=t?["defaults"]:["agents",e.selectedScope],o=typeof s.security=="string"?s.security:void 0,a=typeof s.ask=="string"?s.ask:void 0,l=typeof s.askFallback=="string"?s.askFallback:void 0,c=t?n.security:o??"__default__",u=t?n.ask:a??"__default__",g=t?n.askFallback:l??"__default__",p=typeof s.autoAllowSkills=="boolean"?s.autoAllowSkills:void 0,h=p??n.autoAllowSkills,v=p==null;return r`
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
              @change=${d=>{const y=d.target.value;!t&&y==="__default__"?e.onRemove([...i,"security"]):e.onPatch([...i,"security"],y)}}
            >
              ${t?f:r`<option value="__default__" ?selected=${c==="__default__"}>
                    Use default (${n.security})
                  </option>`}
              ${pr.map(d=>r`<option
                    value=${d.value}
                    ?selected=${c===d.value}
                  >
                    ${d.label}
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
              @change=${d=>{const y=d.target.value;!t&&y==="__default__"?e.onRemove([...i,"ask"]):e.onPatch([...i,"ask"],y)}}
            >
              ${t?f:r`<option value="__default__" ?selected=${u==="__default__"}>
                    Use default (${n.ask})
                  </option>`}
              ${Im.map(d=>r`<option
                    value=${d.value}
                    ?selected=${u===d.value}
                  >
                    ${d.label}
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
              @change=${d=>{const y=d.target.value;!t&&y==="__default__"?e.onRemove([...i,"askFallback"]):e.onPatch([...i,"askFallback"],y)}}
            >
              ${t?f:r`<option value="__default__" ?selected=${g==="__default__"}>
                    Use default (${n.askFallback})
                  </option>`}
              ${pr.map(d=>r`<option
                    value=${d.value}
                    ?selected=${g===d.value}
                  >
                    ${d.label}
                  </option>`)}
            </select>
          </label>
        </div>
      </div>

      <div class="list-item">
        <div class="list-main">
          <div class="list-title">Auto-allow skill CLIs</div>
          <div class="list-sub">
            ${t?"Allow skill executables listed by the Gateway.":v?`Using default (${n.autoAllowSkills?"on":"off"}).`:`Override (${h?"on":"off"}).`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Enabled</span>
            <input
              type="checkbox"
              ?disabled=${e.disabled}
              .checked=${h}
              @change=${d=>{const m=d.target;e.onPatch([...i,"autoAllowSkills"],m.checked)}}
            />
          </label>
          ${!t&&!v?r`<button
                class="btn btn--sm"
                ?disabled=${e.disabled}
                @click=${()=>e.onRemove([...i,"autoAllowSkills"])}
              >
                Use default
              </button>`:f}
        </div>
      </div>
    </div>
  `}function jm(e){const t=["agents",e.selectedScope,"allowlist"],n=e.allowlist;return r`
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
            `:n.map((s,i)=>Wm(e,s,i))}
    </div>
  `}function Wm(e,t,n){const s=t.lastUsedAt?Y(t.lastUsedAt):"never",i=t.lastUsedCommand?ci(t.lastUsedCommand,120):null,o=t.lastResolvedPath?ci(t.lastResolvedPath,120):null;return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t.pattern?.trim()?t.pattern:"New pattern"}</div>
        <div class="list-sub">Last used: ${s}</div>
        ${i?r`<div class="list-sub mono">${i}</div>`:f}
        ${o?r`<div class="list-sub mono">${o}</div>`:f}
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
  `}function Gm(e,t){const n=e.binding??"__default__",s=e.name?.trim()?`${e.name} (${e.id})`:e.id,i=t.nodes.length>0;return r`
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
  `}function qm(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(l=>String(l)==="system.run"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const a=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:a===o?o:`${a} · ${o}`})}return t.sort((n,s)=>n.label.localeCompare(s.label)),t}function Vm(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(l=>String(l)==="system.execApprovals.get"||String(l)==="system.execApprovals.set"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const a=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:a===o?o:`${a} · ${o}`})}return t.sort((n,s)=>n.label.localeCompare(s.label)),t}function Qm(e){const t={id:"main",name:void 0,index:0,isDefault:!0,binding:null};if(!e||typeof e!="object")return{defaultBinding:null,agents:[t]};const s=(e.tools??{}).exec??{},i=typeof s.node=="string"&&s.node.trim()?s.node.trim():null,o=e.agents??{},a=Array.isArray(o.list)?o.list:[];if(a.length===0)return{defaultBinding:i,agents:[t]};const l=[];return a.forEach((c,u)=>{if(!c||typeof c!="object")return;const g=c,p=typeof g.id=="string"?g.id.trim():"";if(!p)return;const h=typeof g.name=="string"?g.name.trim():void 0,v=g.default===!0,m=(g.tools??{}).exec??{},y=typeof m.node=="string"&&m.node.trim()?m.node.trim():null;l.push({id:p,name:h||void 0,index:u,isDefault:v,binding:y})}),l.length===0&&l.push(t),{defaultBinding:i,agents:l}}function Ym(e){const t=!!e.connected,n=!!e.paired,s=typeof e.displayName=="string"&&e.displayName.trim()||(typeof e.nodeId=="string"?e.nodeId:"unknown"),i=Array.isArray(e.caps)?e.caps:[],o=Array.isArray(e.commands)?e.commands:[];return r`
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
  `}const Fi=[{id:"anthropic",label:"Anthropic",hint:"Claude Opus / Sonnet"},{id:"openai",label:"OpenAI",hint:"GPT-5 / GPT-5 Mini"},{id:"google",label:"Google",hint:"Gemini 3 Pro / Flash"},{id:"openrouter",label:"OpenRouter",hint:"Multi-model gateway"},{id:"xai",label:"xAI",hint:"Grok"},{id:"minimax",label:"MiniMax",hint:"M2.1"},{id:"moonshot",label:"Moonshot AI",hint:"Kimi K2.5"},{id:"qwen",label:"Qwen",hint:"Alibaba Cloud"},{id:"zai",label:"Z.AI",hint:"GLM 4.7"},{id:"copilot",label:"GitHub Copilot",hint:"GitHub device login"},{id:"ai-gateway",label:"Vercel AI Gateway",hint:"API key"},{id:"opencode-zen",label:"OpenCode Zen",hint:"Multi-model proxy"},{id:"xiaomi",label:"Xiaomi",hint:"API key"},{id:"qianfan",label:"Qianfan",hint:"API key"},{id:"synthetic",label:"Synthetic",hint:"Anthropic-compatible"},{id:"venice",label:"Venice AI",hint:"Privacy-focused"},{id:"cloudflare-ai-gateway",label:"Cloudflare AI Gateway",hint:"Cloudflare"}],Oi=[{id:"telegram",label:"Telegram",icon:"✈️",difficulty:"easy",tokenLabel:"Bot Token",tokenHint:"Create a bot via @BotFather on Telegram and paste the token here."},{id:"discord",label:"Discord",icon:"🎮",difficulty:"easy",tokenLabel:"Bot Token",tokenHint:"Create an app at discord.com/developers, add a bot, and paste the token."},{id:"whatsapp",label:"WhatsApp",icon:"📱",difficulty:"medium",tokenLabel:"",tokenHint:"WhatsApp uses QR code pairing. You can configure this after setup."},{id:"slack",label:"Slack",icon:"💬",difficulty:"medium",tokenLabel:"Bot Token + App Token",tokenHint:"Create a Slack app with Socket Mode and paste both tokens."},{id:"signal",label:"Signal",icon:"🔒",difficulty:"advanced",tokenLabel:"",tokenHint:"Signal requires signal-cli linking. Configure after setup."},{id:"feishu",label:"Feishu",icon:"🐦",difficulty:"medium",tokenLabel:"App ID + App Secret",tokenHint:"Create a Feishu app and paste the credentials."},{id:"msteams",label:"MS Teams",icon:"🏢",difficulty:"advanced",tokenLabel:"",tokenHint:"Teams integration requires Azure Bot registration."},{id:"matrix",label:"Matrix",icon:"🌐",difficulty:"medium",tokenLabel:"Access Token",tokenHint:"Provide your Matrix homeserver URL and access token."}],fr={en:{easy:"Easy",medium:"Medium",advanced:"Advanced"},"zh-CN":{easy:"简单",medium:"中等",advanced:"高级"},"zh-TW":{easy:"簡單",medium:"中等",advanced:"進階"},ja:{easy:"簡単",medium:"普通",advanced:"上級"},ko:{easy:"쉬움",medium:"보통",advanced:"고급"},es:{easy:"Fácil",medium:"Medio",advanced:"Avanzado"},fr:{easy:"Facile",medium:"Moyen",advanced:"Avancé"},de:{easy:"Einfach",medium:"Mittel",advanced:"Fortgeschritten"},"pt-BR":{easy:"Fácil",medium:"Médio",advanced:"Avançado"},ru:{easy:"Легко",medium:"Средне",advanced:"Сложно"}};function Zm(e,t){return fr[e]?.[t]??fr.en[t]??t}function Jm(e){const t=nt(e.locale),n=Oi.find(s=>s.id===e.selectedChannel);return r`
    <div class="onboarding-channel-grid">
      ${Oi.map(s=>{const i=e.selectedChannel===s.id;return r`
          <button
            class="onboarding-channel-item ${i?"onboarding-channel-item--selected":""}"
            @click=${()=>e.onChannelSelect(i?null:s.id)}
          >
            <span class="onboarding-channel-item__icon">${s.icon}</span>
            <span class="onboarding-channel-item__name">${s.label}</span>
            <span class="onboarding-channel-item__difficulty">
              ${Zm(e.locale,s.difficulty)}
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
          `:f}
  `}function Xm(e){const t=nt(e.locale),n=gs.find(a=>a.value===e.locale)?.nativeLabel??e.locale,s=Fi.find(a=>a.id===e.selectedProvider)?.label??null,i=Oi.find(a=>a.id===e.selectedChannel)?.label??null,o=e.loginStatus==="success"?e.loginDisplayName:null;return r`
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
  `}function eb(e){return nt(e.locale),r`
    <div class="onboarding-lang-grid">
      ${gs.map(t=>r`
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
  `}const tb=r`
  <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
`,nb=r`
  <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
`,vr=r`
  <svg class="onboarding-login-spinner" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
`;function sb(e){const t=nt(e.locale),n=e.loginStatus==="loading",s=e.loginStatus==="error",i=e.loginStatus==="success";return r`
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
                ${e.loginEmail?r`<div class="onboarding-login-success__email">${e.loginEmail}</div>`:f}
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
                <span class="onboarding-login-btn__icon">${tb}</span>
                <span class="onboarding-login-btn__label">
                  ${n?vr:f}
                  ${t.loginWithGoogle}
                </span>
              </button>

              <button
                class="onboarding-login-btn onboarding-login-btn--github"
                @click=${e.onGithubLogin}
                ?disabled=${n}
              >
                <span class="onboarding-login-btn__icon">${nb}</span>
                <span class="onboarding-login-btn__label">
                  ${n?vr:f}
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
          `:f}
    </div>
  `}const ib=r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,ob=r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>`;function ab(e){const t=nt(e.locale),n=e.providerSearchQuery.toLowerCase().trim(),s=n?Fi.filter(i=>i.label.toLowerCase().includes(n)||(i.hint?.toLowerCase().includes(n)??!1)):Fi;return r`
    <!-- Search -->
    <div class="onboarding-search">
      <span class="onboarding-search__icon">${ob}</span>
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
              <span class="onboarding-provider-item__check-icon">${ib}</span>
            </div>
            <div class="onboarding-provider-item__info">
              <div class="onboarding-provider-item__name">${i.label}</div>
              ${i.hint?r`<div class="onboarding-provider-item__hint">${i.hint}</div>`:f}
              ${o?r`
                    <input
                      class="onboarding-provider-input"
                      type="password"
                      placeholder=${t.providerApiKeyPlaceholder}
                      .value=${e.providerApiKey}
                      @input=${a=>e.onProviderApiKeyChange(a.target.value)}
                      @click=${a=>a.stopPropagation()}
                    />
                  `:f}
            </div>
          </div>
        `})}
      ${s.length===0?r`<div style="text-align:center; padding:24px; color:var(--muted);">
            ${t.providerNoneSelected}
          </div>`:f}
    </div>
  `}const ti=5;function rb(e){switch(e.step){case 1:return sb(e);case 2:return eb(e);case 3:return ab(e);case 4:return Jm(e);case 5:return Xm(e)}}function lb(e){const t=nt(e.locale);switch(e.step){case 1:return t.loginTitle;case 2:return t.langTitle;case 3:return t.providerTitle;case 4:return t.channelTitle;case 5:return t.confirmTitle}}function cb(e){const t=nt(e.locale);switch(e.step){case 1:return t.loginSubtitle;case 2:return t.langSubtitle;case 3:return t.providerSubtitle;case 4:return t.channelSubtitle;case 5:return t.confirmSubtitle}}function db(e){const t=nt(e.locale),n=e.step===1,s=e.step===ti,i=e.step===1||e.step===3||e.step===4;return r`
    <div class="onboarding-wizard">
      <div class="onboarding-card">
        <!-- Progress bar -->
        <div class="onboarding-progress">
          ${Array.from({length:ti},(o,a)=>{const l=a+1,c=l<e.step,u=l===e.step;return r`
              <div
                class="onboarding-progress__step ${c?"onboarding-progress__step--done":""} ${u?"onboarding-progress__step--active":""}"
              ></div>
            `})}
        </div>

        <!-- Header -->
        <div class="onboarding-header">
          <div class="onboarding-header__step-label">
            ${t.stepOf(e.step,ti)}
          </div>
          <h2 class="onboarding-header__title">${lb(e)}</h2>
          <p class="onboarding-header__subtitle">${cb(e)}</p>
        </div>

        <!-- Body -->
        <div class="onboarding-body">
          ${rb(e)}
        </div>

        <!-- Footer -->
        <div class="onboarding-footer">
          <div class="onboarding-footer__left">
            ${n?f:r`
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
                `:f}
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
  `}function ub(e){const t=(l,c)=>W(e.locale,l,c),n=e.hello?.snapshot,s=n?.uptimeMs?Zi(n.uptimeMs):t("n/a","无"),i=n?.policy?.tickIntervalMs?`${n.policy.tickIntervalMs}ms`:t("n/a","无"),o=(()=>{if(e.connected||!e.lastError)return null;const l=e.lastError.toLowerCase();if(!(l.includes("unauthorized")||l.includes("connect failed")))return null;const u=!!e.settings.token.trim(),g=!!e.password.trim();return!u&&!g?r`
        <div class="muted" style="margin-top: 8px">
          ${t("This gateway requires auth. Add a token or password, then click Connect.","该网关需要认证。请填写 token 或密码后点击“连接”。")}
          <div style="margin-top: 6px">
            <span class="mono">opensoul dashboard --no-open</span> → ${t("open the Control UI","打开控制台")}<br />
            <span class="mono">opensoul doctor --generate-gateway-token</span> → ${t("set token","生成并设置 token")}
          </div>
          <div style="margin-top: 6px">
            <a
              class="session-link"
              href="https://docs.opensoul.ai/web/dashboard"
              target="_blank"
              rel="noreferrer"
              title=${t("Control UI auth docs (opens in new tab)","控制台认证文档（新标签页打开）")}
              >${t("Docs: Control UI auth","文档：控制台认证")}</a
            >
          </div>
        </div>
      `:r`
      <div class="muted" style="margin-top: 8px">
        ${t("Auth failed. Update the token or password in Control UI settings, then click Connect.","认证失败。请在控制台设置中更新 token 或密码后再点击“连接”。")}
        <div style="margin-top: 6px">
          <a
            class="session-link"
            href="https://docs.opensoul.ai/web/dashboard"
            target="_blank"
            rel="noreferrer"
            title=${t("Control UI auth docs (opens in new tab)","控制台认证文档（新标签页打开）")}
            >${t("Docs: Control UI auth","文档：控制台认证")}</a
          >
        </div>
      </div>
    `})(),a=(()=>{if(e.connected||!e.lastError||(typeof window<"u"?window.isSecureContext:!0))return null;const c=e.lastError.toLowerCase();return!c.includes("secure context")&&!c.includes("device identity required")?null:r`
      <div class="muted" style="margin-top: 8px">
        ${t("This page is HTTP, so the browser blocks device identity. Use HTTPS (Tailscale Serve) or open","当前页面是 HTTP，浏览器会阻止设备身份能力。请使用 HTTPS（Tailscale Serve）或在网关主机打开")}
        <span class="mono">http://127.0.0.1:18789</span>
        ${t("on the gateway host.","。")}
        <div style="margin-top: 6px">
          ${t("If you must stay on HTTP, set","若必须使用 HTTP，请设置")}
          <span class="mono">gateway.controlUi.allowInsecureAuth: true</span> (token-only).
        </div>
        <div style="margin-top: 6px">
          <a
            class="session-link"
            href="https://docs.opensoul.ai/gateway/tailscale"
            target="_blank"
            rel="noreferrer"
            title=${t("Tailscale Serve docs (opens in new tab)","Tailscale Serve 文档（新标签页打开）")}
            >${t("Docs: Tailscale Serve","文档：Tailscale Serve")}</a
          >
          <span class="muted"> · </span>
          <a
            class="session-link"
            href="https://docs.opensoul.ai/web/control-ui#insecure-http"
            target="_blank"
            rel="noreferrer"
            title=${t("Insecure HTTP docs (opens in new tab)","不安全 HTTP 文档（新标签页打开）")}
            >${t("Docs: Insecure HTTP","文档：不安全 HTTP")}</a
          >
        </div>
      </div>
    `})();return r`
    <section class="grid grid-cols-2">
      <div class="card">
        <div class="card-title">${t("Gateway Access","网关访问")}</div>
        <div class="card-sub">${t("Where the dashboard connects and how it authenticates.","控制台连接位置与认证方式。")}</div>
        <div class="form-grid" style="margin-top: 16px;">
          <label class="field">
            <span>${t("WebSocket URL","WebSocket 地址")}</span>
            <input
              .value=${e.settings.gatewayUrl}
              @input=${l=>{const c=l.target.value;e.onSettingsChange({...e.settings,gatewayUrl:c})}}
              placeholder="ws://100.x.y.z:18789"
            />
          </label>
          <label class="field">
            <span>${t("Gateway Token","网关 Token")}</span>
            <input
              .value=${e.settings.token}
              @input=${l=>{const c=l.target.value;e.onSettingsChange({...e.settings,token:c})}}
              placeholder="OPENSOUL_GATEWAY_TOKEN"
            />
          </label>
          <label class="field">
            <span>${t("Password (not stored)","密码（不存储）")}</span>
            <input
              type="password"
              .value=${e.password}
              @input=${l=>{const c=l.target.value;e.onPasswordChange(c)}}
              placeholder=${t("system or shared password","系统密码或共享密码")}
            />
          </label>
          <label class="field">
            <span>${t("Default Session Key","默认会话 Key")}</span>
            <input
              .value=${e.settings.sessionKey}
              @input=${l=>{const c=l.target.value;e.onSessionKeyChange(c)}}
            />
          </label>
        </div>
        <div class="row" style="margin-top: 14px;">
          <button class="btn" @click=${()=>e.onConnect()}>${t("Connect","连接")}</button>
          <button class="btn" @click=${()=>e.onRefresh()}>${t("Refresh","刷新")}</button>
          <span class="muted">${t("Click Connect to apply connection changes.","点击“连接”以应用连接变更。")}</span>
        </div>
      </div>

      <div class="card">
        <div class="card-title">${t("Snapshot","快照")}</div>
        <div class="card-sub">${t("Latest gateway handshake information.","最新网关握手信息。")}</div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">${t("Status","状态")}</div>
            <div class="stat-value ${e.connected?"ok":"warn"}">
              ${e.connected?t("Connected","已连接"):t("Disconnected","未连接")}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">${t("Uptime","运行时长")}</div>
            <div class="stat-value">${s}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${t("Tick Interval","心跳间隔")}</div>
            <div class="stat-value">${i}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${t("Last Channels Refresh","最近渠道刷新")}</div>
            <div class="stat-value">
              ${e.lastChannelsRefresh?Y(e.lastChannelsRefresh):t("n/a","无")}
            </div>
          </div>
        </div>
        ${e.lastError?r`<div class="callout danger" style="margin-top: 14px;">
              <div>${e.lastError}</div>
              ${o??""}
              ${a??""}
            </div>`:r`
                <div class="callout" style="margin-top: 14px">
                  ${t("Use Channels to link WhatsApp, Telegram, Discord, Signal, or iMessage.","可在“渠道”中连接 WhatsApp、Telegram、Discord、Signal 或 iMessage。")}
                </div>
              `}
      </div>
    </section>

    <section class="grid grid-cols-4" style="margin-top: 18px;">
      <div class="card stat-card">
        <div class="stat-label">${t("Status","状态")}</div>
        <div class="stat-value ${e.connected?"ok":"warn"}">
          ${e.connected?t("Online","在线"):t("Offline","离线")}
        </div>
        <div class="muted">${t("Gateway connection state.","网关连接状态。")}</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">${t("Instances","实例")}</div>
        <div class="stat-value">${e.presenceCount}</div>
        <div class="muted">${t("Active beacons in the last 5 min.","最近 5 分钟内的活跃信标。")}</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">${t("Sessions","会话")}</div>
        <div class="stat-value">${e.sessionsCount??t("n/a","无")}</div>
        <div class="muted">${t("Tracked session keys.","已追踪会话 Key 数。")}</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">${t("Cron","定时任务")}</div>
        <div class="stat-value">
          ${e.cronEnabled==null?t("n/a","无"):e.cronEnabled?t("Enabled","已启用"):t("Disabled","已禁用")}
        </div>
        <div class="muted">${t("Next wake","下次唤醒")} ${fo(e.cronNext)}</div>
      </div>
    </section>

    <section class="grid grid-cols-2" style="margin-top: 18px;">
      <!-- System Information -->
      <div class="card">
        <div class="card-title">${t("System Information","系统信息")}</div>
        <div class="card-sub">${t("Runtime details from the gateway handshake.","来自网关握手的运行时详情。")}</div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">${t("Protocol Version","协议版本")}</div>
            <div class="stat-value" style="font-size:18px;">${e.hello?.protocol??t("n/a","无")}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${t("Uptime","运行时长")}</div>
            <div class="stat-value" style="font-size:18px;">${s}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${t("Tick Interval","心跳间隔")}</div>
            <div class="stat-value" style="font-size:18px;">${i}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${t("Last Channels Refresh","最近渠道刷新")}</div>
            <div class="stat-value" style="font-size:18px;">
              ${e.lastChannelsRefresh?Y(e.lastChannelsRefresh):t("n/a","无")}
            </div>
          </div>
          ${e.hello?.features?.methods?r`<div class="stat" style="grid-column: 1 / -1;">
                <div class="stat-label">${t("Available Methods","可用方法")}</div>
                <div class="muted" style="margin-top:4px;font-size:12px;word-break:break-word;">
                  ${e.hello.features.methods.join(", ")}
                </div>
              </div>`:f}
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card">
        <div class="card-title">${t("Quick Actions","快捷操作")}</div>
        <div class="card-sub">${t("Navigate to common tasks quickly.","快速跳转到常用任务。")}</div>
        <div class="overview-actions" style="margin-top: 16px; display: grid; gap: 10px;">
          <button class="btn" style="justify-content: flex-start; width: 100%;"
            @click=${()=>e.onNavigate?.("chat")}>
            ${X.messageSquare}
            <span>${t("Open Chat","打开聊天")}</span>
          </button>
          <button class="btn" style="justify-content: flex-start; width: 100%;"
            @click=${()=>e.onNavigate?.("channels")}>
            ${X.link}
            <span>${t("View Channels","查看渠道")}</span>
          </button>
          <button class="btn" style="justify-content: flex-start; width: 100%;"
            @click=${()=>e.onNavigate?.("sessions")}>
            ${X.fileText}
            <span>${t("Manage Sessions","管理会话")}</span>
          </button>
          <button class="btn" style="justify-content: flex-start; width: 100%;"
            @click=${()=>e.onNavigate?.("logs")}>
            ${X.scrollText}
            <span>${t("View Logs","查看日志")}</span>
          </button>
          <button class="btn" style="justify-content: flex-start; width: 100%;"
            @click=${()=>e.onNavigate?.("config")}>
            ${X.settings}
            <span>${t("Edit Config","编辑配置")}</span>
          </button>
        </div>
      </div>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">${t("Getting Started","快速开始")}</div>
      <div class="card-sub">${t("Quick guides to help you get the most out of OpenSoul.","帮助你快速上手 OpenSoul 的简要指引。")}</div>
      <div class="note-grid" style="margin-top: 14px;">
        <div>
          <div class="note-title">${t("1. Connect your gateway","1. 连接网关")}</div>
          <div class="muted">
            ${t("Enter the WebSocket URL and token above, then click Connect. For remote access, use Tailscale serve.","在上方填写 WebSocket 地址和 token 后点击“连接”。远程访问建议使用 Tailscale Serve。")}
          </div>
        </div>
        <div>
          <div class="note-title">${t("2. Link messaging channels","2. 连接消息渠道")}</div>
          <div class="muted">
            ${t("Go to Channels to connect WhatsApp, Telegram, Discord, Signal, or iMessage.","进入“渠道”连接 WhatsApp、Telegram、Discord、Signal 或 iMessage。")}
          </div>
        </div>
        <div>
          <div class="note-title">${t("3. Chat and automate","3. 聊天与自动化")}</div>
          <div class="muted">
            ${t("Use the Chat view for real-time interaction, or set up Cron for scheduled automated runs.","使用“聊天”进行实时交互，或在“定时任务”中配置周期自动执行。")}
          </div>
        </div>
      </div>
    </section>
  `}const gb=["","off","minimal","low","medium","high","xhigh"],pb=["","off","on"],hb=[{value:"",label:"inherit"},{value:"off",label:"off (explicit)"},{value:"on",label:"on"},{value:"full",label:"full"}],fb=["","off","on","stream"];function vb(e){if(!e)return"";const t=e.trim().toLowerCase();return t==="z.ai"||t==="z-ai"?"zai":t}function cc(e){return vb(e)==="zai"}function mb(e){return cc(e)?pb:gb}function mr(e,t){return t?e.includes(t)?[...e]:[...e,t]:[...e]}function bb(e,t){return t?e.some(n=>n.value===t)?[...e]:[...e,{value:t,label:`${t} (custom)`}]:[...e]}function yb(e,t){return!t||!e||e==="off"?e:"on"}function xb(e,t){return e?t&&e==="on"?"low":e:null}function $b(e){const t=e.result?.sessions??[];return r`
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

      ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:f}

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
              `:t.map(n=>wb(n,e.basePath,e.onPatch,e.onDelete,e.loading))}
      </div>
    </section>
  `}function wb(e,t,n,s,i){const o=e.updatedAt?Y(e.updatedAt):"n/a",a=e.thinkingLevel??"",l=cc(e.modelProvider),c=yb(a,l),u=mr(mb(e.modelProvider),c),g=e.verboseLevel??"",p=bb(hb,g),h=e.reasoningLevel??"",v=mr(fb,h),d=typeof e.displayName=="string"&&e.displayName.trim().length>0?e.displayName.trim():null,m=typeof e.label=="string"?e.label.trim():"",y=!!(d&&d!==e.key&&d!==m),C=e.kind!=="global",b=C?`${ps("chat",t)}?session=${encodeURIComponent(e.key)}`:null;return r`
    <div class="table-row">
      <div class="mono session-key-cell">
        ${C?r`<a href=${b} class="session-link">${e.key}</a>`:e.key}
        ${y?r`<span class="muted session-key-display-name">${d}</span>`:f}
      </div>
      <div>
        <input
          .value=${e.label??""}
          ?disabled=${i}
          placeholder="(optional)"
          @change=${S=>{const A=S.target.value.trim();n(e.key,{label:A||null})}}
        />
      </div>
      <div>${e.kind}</div>
      <div>${o}</div>
      <div>${Ip(e)}</div>
      <div>
        <select
          ?disabled=${i}
          @change=${S=>{const A=S.target.value;n(e.key,{thinkingLevel:xb(A,l)})}}
        >
          ${u.map(S=>r`<option value=${S} ?selected=${c===S}>
                ${S||"inherit"}
              </option>`)}
        </select>
      </div>
      <div>
        <select
          ?disabled=${i}
          @change=${S=>{const A=S.target.value;n(e.key,{verboseLevel:A||null})}}
        >
          ${p.map(S=>r`<option value=${S.value} ?selected=${g===S.value}>
                ${S.label}
              </option>`)}
        </select>
      </div>
      <div>
        <select
          ?disabled=${i}
          @change=${S=>{const A=S.target.value;n(e.key,{reasoningLevel:A||null})}}
        >
          ${v.map(S=>r`<option value=${S} ?selected=${h===S}>
                ${S||"inherit"}
              </option>`)}
        </select>
      </div>
      <div>
        <button class="btn danger" ?disabled=${i} @click=${()=>s(e.key)}>
          Delete
        </button>
      </div>
    </div>
  `}const kb=[{id:"general",icon:"settings"},{id:"config",icon:"settings"},{id:"logs",icon:"scrollText"},{id:"debug",icon:"bug"}];function Sb(e){const t=(i,o)=>W(e.uiLocale,i,o),n=Qn(e.uiLocale),s=i=>{const o=i.currentTarget;if(!o)return;const a=Qn(o.value);e.setUiLocale(a)};return r`
    <div class="settings-section">
      <h3 class="settings-section__title">${t("Appearance","外观")}</h3>
      <div class="settings-section__row">
        <div class="settings-section__row-info">
          <span class="settings-section__row-label">${t("Theme","主题")}</span>
          <span class="settings-section__row-desc">
            ${t("Choose light, dark, or follow your system preference.","选择浅色、深色，或跟随系统偏好。")}
          </span>
        </div>
        <div class="settings-section__row-control">
          ${fp(e)}
        </div>
      </div>

      <h3 class="settings-section__title" style="margin-top:28px;">
        ${t("Language","语言")}
      </h3>
      <div class="settings-section__row">
        <div class="settings-section__row-info">
          <span class="settings-section__row-label">${t("System Language","系统语言")}</span>
          <span class="settings-section__row-desc">
            ${t("Use the same language options as onboarding and apply immediately.","与引导页使用同一套语言选项，修改后立即生效。")}
          </span>
        </div>
        <div class="settings-section__row-control">
          <label class="settings-sr-only" for="settings-system-language">
            ${t("System language","系统语言")}
          </label>
          <select
            id="settings-system-language"
            class="settings-select"
            .value=${n}
            @input=${s}
            @change=${s}
          >
            ${gs.map(i=>r`<option
                  value=${i.value}
                  ?selected=${i.value===n}
                >
                  ${i.nativeLabel} - ${i.label}
                </option>`)}
          </select>
        </div>
      </div>

      <h3 class="settings-section__title" style="margin-top:28px;">${t("Links","链接")}</h3>
      <a
        class="settings-link"
        href="https://github.com/NJX-njx/opensoul"
        target="_blank"
        rel="noreferrer"
      >
        <span class="settings-link__icon">${X.link}</span>
        <span class="settings-link__text">${t("GitHub Repository","GitHub 仓库")}</span>
        <span class="settings-link__external">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" x2="21" y1="14" y2="3"></line>
          </svg>
        </span>
      </a>
    </div>
  `}function Ab(e,t){if(!e.settingsOpen)return f;const n=(a,l)=>W(e.uiLocale,a,l),s=a=>{switch(a){case"general":return n("General","通用");case"config":return n("Config","配置");case"logs":return n("Logs","日志");case"debug":return n("Debug","调试");default:return a}},i=e.settingsSection;return r`
    <div class="settings-backdrop" @click=${()=>e.closeSettings()}></div>

    <div class="settings-panel" @keydown=${a=>{a.key==="Escape"&&(a.stopPropagation(),e.closeSettings())}} tabindex="-1">
      <div class="settings-panel__header">
        <h2 class="settings-panel__title">${n("Settings","设置")}</h2>
        <button
          class="settings-panel__close"
          @click=${()=>e.closeSettings()}
          title=${n("Close settings","关闭设置")}
          aria-label=${n("Close settings","关闭设置")}
        >
          ${X.x}
        </button>
      </div>

      <div class="settings-panel__body">
        <nav class="settings-panel__nav">
          ${kb.map(a=>r`
              <button
                class="settings-nav-item ${i===a.id?"active":""}"
                @click=${()=>e.setSettingsSection(a.id)}
              >
                <span class="settings-nav-item__icon">${X[a.icon]}</span>
                <span class="settings-nav-item__text">${s(a.id)}</span>
              </button>
            `)}
        </nav>

        <div class="settings-panel__content">
          ${i==="general"?Sb(e):f}
          ${i==="config"?t.config:f}
          ${i==="logs"?t.logs:f}
          ${i==="debug"?t.debug:f}
        </div>
      </div>
    </div>
  `}const Dn=[{id:"workspace",label:"Workspace Skills",sources:["opensoul-workspace"]},{id:"built-in",label:"Built-in Skills",sources:["opensoul-bundled"]},{id:"installed",label:"Installed Skills",sources:["opensoul-managed"]},{id:"extra",label:"Extra Skills",sources:["opensoul-extra"]}];function Cb(e){const t=new Map;for(const o of Dn)t.set(o.id,{id:o.id,label:o.label,skills:[]});const n=Dn.find(o=>o.id==="built-in"),s={id:"other",label:"Other Skills",skills:[]};for(const o of e){const a=o.bundled?n:Dn.find(l=>l.sources.includes(o.source));a?t.get(a.id)?.skills.push(o):s.skills.push(o)}const i=Dn.map(o=>t.get(o.id)).filter(o=>!!(o&&o.skills.length>0));return s.skills.length>0&&i.push(s),i}function Tb(e){const t=e.report?.skills??[],n=e.filter.trim().toLowerCase(),s=n?t.filter(o=>[o.name,o.description,o.source].join(" ").toLowerCase().includes(n)):t,i=Cb(s);return r`
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

      ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:f}

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
                      ${o.skills.map(l=>_b(l,e))}
                    </div>
                  </details>
                `})}
            </div>
          `}
    </section>
  `}function _b(e,t){const n=t.busyKey===e.skillKey,s=t.edits[e.skillKey]??"",i=t.messages[e.skillKey]??null,o=e.install.length>0&&e.missing.bins.length>0,a=!!(e.bundled&&e.source!=="opensoul-bundled"),l=[...e.missing.bins.map(u=>`bin:${u}`),...e.missing.env.map(u=>`env:${u}`),...e.missing.config.map(u=>`config:${u}`),...e.missing.os.map(u=>`os:${u}`)],c=[];return e.disabled&&c.push("disabled"),e.blockedByAllowlist&&c.push("blocked by allowlist"),r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">
          ${e.emoji?`${e.emoji} `:""}${e.name}
        </div>
        <div class="list-sub">${ci(e.description,140)}</div>
        <div class="chip-row" style="margin-top: 6px;">
          <span class="chip">${e.source}</span>
          ${a?r`
                  <span class="chip">bundled</span>
                `:f}
          <span class="chip ${e.eligible?"chip-ok":"chip-warn"}">
            ${e.eligible?"eligible":"blocked"}
          </span>
          ${e.disabled?r`
                  <span class="chip chip-warn">disabled</span>
                `:f}
        </div>
        ${l.length>0?r`
              <div class="muted" style="margin-top: 6px;">
                Missing: ${l.join(", ")}
              </div>
            `:f}
        ${c.length>0?r`
              <div class="muted" style="margin-top: 6px;">
                Reason: ${c.join(", ")}
              </div>
            `:f}
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
              </button>`:f}
        </div>
        ${i?r`<div
              class="muted"
              style="margin-top: 8px; color: ${i.kind==="error"?"var(--danger-color, #d14343)":"var(--success-color, #0a7f5a)"};"
            >
              ${i.message}
            </div>`:f}
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
            `:f}
      </div>
    </div>
  `}const Lb=new Set(["agent","channel","chat","provider","model","tool","label","key","session","id","has","mintokens","maxtokens","mincost","maxcost","minmessages","maxmessages"]),ns=e=>e.trim().toLowerCase(),Eb=e=>{const t=e.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*").replace(/\?/g,".");return new RegExp(`^${t}$`,"i")},ut=e=>{let t=e.trim().toLowerCase();if(!t)return null;t.startsWith("$")&&(t=t.slice(1));let n=1;t.endsWith("k")?(n=1e3,t=t.slice(0,-1)):t.endsWith("m")&&(n=1e6,t=t.slice(0,-1));const s=Number(t);return Number.isFinite(s)?s*n:null},_o=e=>(e.match(/"[^"]+"|\S+/g)??[]).map(n=>{const s=n.replace(/^"|"$/g,""),i=s.indexOf(":");if(i>0){const o=s.slice(0,i),a=s.slice(i+1);return{key:o,value:a,raw:s}}return{value:s,raw:s}}),Ib=e=>[e.label,e.key,e.sessionId].filter(n=>!!n).map(n=>n.toLowerCase()),br=e=>{const t=new Set;e.modelProvider&&t.add(e.modelProvider.toLowerCase()),e.providerOverride&&t.add(e.providerOverride.toLowerCase()),e.origin?.provider&&t.add(e.origin.provider.toLowerCase());for(const n of e.usage?.modelUsage??[])n.provider&&t.add(n.provider.toLowerCase());return Array.from(t)},yr=e=>{const t=new Set;e.model&&t.add(e.model.toLowerCase());for(const n of e.usage?.modelUsage??[])n.model&&t.add(n.model.toLowerCase());return Array.from(t)},Mb=e=>(e.usage?.toolUsage?.tools??[]).map(t=>t.name.toLowerCase()),Rb=(e,t)=>{const n=ns(t.value??"");if(!n)return!0;if(!t.key)return Ib(e).some(i=>i.includes(n));switch(ns(t.key)){case"agent":return e.agentId?.toLowerCase().includes(n)??!1;case"channel":return e.channel?.toLowerCase().includes(n)??!1;case"chat":return e.chatType?.toLowerCase().includes(n)??!1;case"provider":return br(e).some(i=>i.includes(n));case"model":return yr(e).some(i=>i.includes(n));case"tool":return Mb(e).some(i=>i.includes(n));case"label":return e.label?.toLowerCase().includes(n)??!1;case"key":case"session":case"id":if(n.includes("*")||n.includes("?")){const i=Eb(n);return i.test(e.key)||(e.sessionId?i.test(e.sessionId):!1)}return e.key.toLowerCase().includes(n)||(e.sessionId?.toLowerCase().includes(n)??!1);case"has":switch(n){case"tools":return(e.usage?.toolUsage?.totalCalls??0)>0;case"errors":return(e.usage?.messageCounts?.errors??0)>0;case"context":return!!e.contextWeight;case"usage":return!!e.usage;case"model":return yr(e).length>0;case"provider":return br(e).length>0;default:return!0}case"mintokens":{const i=ut(n);return i===null?!0:(e.usage?.totalTokens??0)>=i}case"maxtokens":{const i=ut(n);return i===null?!0:(e.usage?.totalTokens??0)<=i}case"mincost":{const i=ut(n);return i===null?!0:(e.usage?.totalCost??0)>=i}case"maxcost":{const i=ut(n);return i===null?!0:(e.usage?.totalCost??0)<=i}case"minmessages":{const i=ut(n);return i===null?!0:(e.usage?.messageCounts?.total??0)>=i}case"maxmessages":{const i=ut(n);return i===null?!0:(e.usage?.messageCounts?.total??0)<=i}default:return!0}},Pb=(e,t)=>{const n=_o(t);if(n.length===0)return{sessions:e,warnings:[]};const s=[];for(const o of n){if(!o.key)continue;const a=ns(o.key);if(!Lb.has(a)){s.push(`Unknown filter: ${o.key}`);continue}if(o.value===""&&s.push(`Missing value for ${o.key}`),a==="has"){const l=new Set(["tools","errors","context","usage","model","provider"]);o.value&&!l.has(ns(o.value))&&s.push(`Unknown has:${o.value}`)}["mintokens","maxtokens","mincost","maxcost","minmessages","maxmessages"].includes(a)&&o.value&&ut(o.value)===null&&s.push(`Invalid number for ${o.key}`)}return{sessions:e.filter(o=>n.every(a=>Rb(o,a))),warnings:s}};function Db(e){const t=e.split(`
`),n=new Map,s=[];for(const l of t){const c=/^\[Tool:\s*([^\]]+)\]/.exec(l.trim());if(c){const u=c[1];n.set(u,(n.get(u)??0)+1);continue}l.trim().startsWith("[Tool Result]")||s.push(l)}const i=Array.from(n.entries()).toSorted((l,c)=>c[1]-l[1]),o=i.reduce((l,[,c])=>l+c,0),a=i.length>0?`Tools: ${i.map(([l,c])=>`${l}×${c}`).join(", ")} (${o} calls)`:"";return{tools:i,summary:a,cleanContent:s.join(`
`).trim()}}const Nb=`
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
`,Fb=4;function ct(e){return Math.round(e/Fb)}function U(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}K`:String(e)}function Ob(e){const t=new Date;return t.setHours(e,0,0,0),t.toLocaleTimeString(void 0,{hour:"numeric"})}function Bb(e,t){const n=Array.from({length:24},()=>0),s=Array.from({length:24},()=>0);for(const i of e){const o=i.usage;if(!o?.messageCounts||o.messageCounts.total===0)continue;const a=o.firstActivity??i.updatedAt,l=o.lastActivity??i.updatedAt;if(!a||!l)continue;const c=Math.min(a,l),u=Math.max(a,l),p=Math.max(u-c,1)/6e4;let h=c;for(;h<u;){const v=new Date(h),d=Lo(v,t),m=Eo(v,t),y=Math.min(m.getTime(),u),b=Math.max((y-h)/6e4,0)/p;n[d]+=o.messageCounts.errors*b,s[d]+=o.messageCounts.total*b,h=y+1}}return s.map((i,o)=>{const a=n[o],l=i>0?a/i:0;return{hour:o,rate:l,errors:a,msgs:i}}).filter(i=>i.msgs>0&&i.errors>0).toSorted((i,o)=>o.rate-i.rate).slice(0,5).map(i=>({label:Ob(i.hour),value:`${(i.rate*100).toFixed(2)}%`,sub:`${Math.round(i.errors)} errors · ${Math.round(i.msgs)} msgs`}))}const Ub=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];function Lo(e,t){return t==="utc"?e.getUTCHours():e.getHours()}function zb(e,t){return t==="utc"?e.getUTCDay():e.getDay()}function Eo(e,t){const n=new Date(e);return t==="utc"?n.setUTCMinutes(59,59,999):n.setMinutes(59,59,999),n}function Hb(e,t){const n=Array.from({length:24},()=>0),s=Array.from({length:7},()=>0);let i=0,o=!1;for(const l of e){const c=l.usage;if(!c||!c.totalTokens||c.totalTokens<=0)continue;i+=c.totalTokens;const u=c.firstActivity??l.updatedAt,g=c.lastActivity??l.updatedAt;if(!u||!g)continue;o=!0;const p=Math.min(u,g),h=Math.max(u,g),d=Math.max(h-p,1)/6e4;let m=p;for(;m<h;){const y=new Date(m),C=Lo(y,t),b=zb(y,t),S=Eo(y,t),A=Math.min(S.getTime(),h),M=Math.max((A-m)/6e4,0)/d;n[C]+=c.totalTokens*M,s[b]+=c.totalTokens*M,m=A+1}}const a=Ub.map((l,c)=>({label:l,tokens:s[c]}));return{hasData:o,totalTokens:i,hourTotals:n,weekdayTotals:a}}function Kb(e,t,n,s){const i=Hb(e,t);if(!i.hasData)return r`
      <div class="card usage-mosaic">
        <div class="usage-mosaic-header">
          <div>
            <div class="usage-mosaic-title">Activity by Time</div>
            <div class="usage-mosaic-sub">Estimates require session timestamps.</div>
          </div>
          <div class="usage-mosaic-total">${U(0)} tokens</div>
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
        <div class="usage-mosaic-total">${U(i.totalTokens)} tokens</div>
      </div>
      <div class="usage-mosaic-grid">
        <div class="usage-mosaic-section">
          <div class="usage-mosaic-section-title">Day of Week</div>
          <div class="usage-daypart-grid">
            ${i.weekdayTotals.map(l=>{const c=Math.min(l.tokens/a,1),u=l.tokens>0?`rgba(255, 77, 77, ${.12+c*.6})`:"transparent";return r`
                <div class="usage-daypart-cell" style="background: ${u};">
                  <div class="usage-daypart-label">${l.label}</div>
                  <div class="usage-daypart-value">${U(l.tokens)}</div>
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
            ${i.hourTotals.map((l,c)=>{const u=Math.min(l/o,1),g=l>0?`rgba(255, 77, 77, ${.08+u*.7})`:"transparent",p=`${c}:00 · ${U(l)} tokens`,h=u>.7?"rgba(255, 77, 77, 0.6)":"rgba(255, 77, 77, 0.2)",v=n.includes(c);return r`
                <div
                  class="usage-hour-cell ${v?"selected":""}"
                  style="background: ${g}; border-color: ${h};"
                  title="${p}"
                  @click=${d=>s(c,d.shiftKey)}
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
  `}function V(e,t=2){return`$${e.toFixed(t)}`}function ni(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function dc(e){const t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!t)return null;const[,n,s,i]=t,o=new Date(Date.UTC(Number(n),Number(s)-1,Number(i)));return Number.isNaN(o.valueOf())?null:o}function uc(e){const t=dc(e);return t?t.toLocaleDateString(void 0,{month:"short",day:"numeric"}):e}function jb(e){const t=dc(e);return t?t.toLocaleDateString(void 0,{month:"long",day:"numeric",year:"numeric"}):e}function si(e,t,n="text/plain"){const s=new Blob([t],{type:n}),i=URL.createObjectURL(s),o=document.createElement("a");o.href=i,o.download=e,o.click(),URL.revokeObjectURL(i)}function Wb(e){return e.includes('"')||e.includes(",")||e.includes(`
`)?`"${e.replace(/"/g,'""')}"`:e}function ss(e){return e.map(t=>t==null?"":Wb(String(t))).join(",")}const Nn=()=>({input:0,output:0,cacheRead:0,cacheWrite:0,totalTokens:0,totalCost:0,inputCost:0,outputCost:0,cacheReadCost:0,cacheWriteCost:0,missingCostEntries:0}),Fn=(e,t)=>{e.input+=t.input??0,e.output+=t.output??0,e.cacheRead+=t.cacheRead??0,e.cacheWrite+=t.cacheWrite??0,e.totalTokens+=t.totalTokens??0,e.totalCost+=t.totalCost??0,e.inputCost+=t.inputCost??0,e.outputCost+=t.outputCost??0,e.cacheReadCost+=t.cacheReadCost??0,e.cacheWriteCost+=t.cacheWriteCost??0,e.missingCostEntries+=t.missingCostEntries??0},Gb=(e,t)=>{if(e.length===0)return t??{messages:{total:0,user:0,assistant:0,toolCalls:0,toolResults:0,errors:0},tools:{totalCalls:0,uniqueTools:0,tools:[]},byModel:[],byProvider:[],byAgent:[],byChannel:[],daily:[]};const n={total:0,user:0,assistant:0,toolCalls:0,toolResults:0,errors:0},s=new Map,i=new Map,o=new Map,a=new Map,l=new Map,c=new Map,u=new Map,g=new Map,p={count:0,sum:0,min:Number.POSITIVE_INFINITY,max:0,p95Max:0};for(const h of e){const v=h.usage;if(v){if(v.messageCounts&&(n.total+=v.messageCounts.total,n.user+=v.messageCounts.user,n.assistant+=v.messageCounts.assistant,n.toolCalls+=v.messageCounts.toolCalls,n.toolResults+=v.messageCounts.toolResults,n.errors+=v.messageCounts.errors),v.toolUsage)for(const d of v.toolUsage.tools)s.set(d.name,(s.get(d.name)??0)+d.count);if(v.modelUsage)for(const d of v.modelUsage){const m=`${d.provider??"unknown"}::${d.model??"unknown"}`,y=i.get(m)??{provider:d.provider,model:d.model,count:0,totals:Nn()};y.count+=d.count,Fn(y.totals,d.totals),i.set(m,y);const C=d.provider??"unknown",b=o.get(C)??{provider:d.provider,model:void 0,count:0,totals:Nn()};b.count+=d.count,Fn(b.totals,d.totals),o.set(C,b)}if(v.latency){const{count:d,avgMs:m,minMs:y,maxMs:C,p95Ms:b}=v.latency;d>0&&(p.count+=d,p.sum+=m*d,p.min=Math.min(p.min,y),p.max=Math.max(p.max,C),p.p95Max=Math.max(p.p95Max,b))}if(h.agentId){const d=a.get(h.agentId)??Nn();Fn(d,v),a.set(h.agentId,d)}if(h.channel){const d=l.get(h.channel)??Nn();Fn(d,v),l.set(h.channel,d)}for(const d of v.dailyBreakdown??[]){const m=c.get(d.date)??{date:d.date,tokens:0,cost:0,messages:0,toolCalls:0,errors:0};m.tokens+=d.tokens,m.cost+=d.cost,c.set(d.date,m)}for(const d of v.dailyMessageCounts??[]){const m=c.get(d.date)??{date:d.date,tokens:0,cost:0,messages:0,toolCalls:0,errors:0};m.messages+=d.total,m.toolCalls+=d.toolCalls,m.errors+=d.errors,c.set(d.date,m)}for(const d of v.dailyLatency??[]){const m=u.get(d.date)??{date:d.date,count:0,sum:0,min:Number.POSITIVE_INFINITY,max:0,p95Max:0};m.count+=d.count,m.sum+=d.avgMs*d.count,m.min=Math.min(m.min,d.minMs),m.max=Math.max(m.max,d.maxMs),m.p95Max=Math.max(m.p95Max,d.p95Ms),u.set(d.date,m)}for(const d of v.dailyModelUsage??[]){const m=`${d.date}::${d.provider??"unknown"}::${d.model??"unknown"}`,y=g.get(m)??{date:d.date,provider:d.provider,model:d.model,tokens:0,cost:0,count:0};y.tokens+=d.tokens,y.cost+=d.cost,y.count+=d.count,g.set(m,y)}}}return{messages:n,tools:{totalCalls:Array.from(s.values()).reduce((h,v)=>h+v,0),uniqueTools:s.size,tools:Array.from(s.entries()).map(([h,v])=>({name:h,count:v})).toSorted((h,v)=>v.count-h.count)},byModel:Array.from(i.values()).toSorted((h,v)=>v.totals.totalCost-h.totals.totalCost),byProvider:Array.from(o.values()).toSorted((h,v)=>v.totals.totalCost-h.totals.totalCost),byAgent:Array.from(a.entries()).map(([h,v])=>({agentId:h,totals:v})).toSorted((h,v)=>v.totals.totalCost-h.totals.totalCost),byChannel:Array.from(l.entries()).map(([h,v])=>({channel:h,totals:v})).toSorted((h,v)=>v.totals.totalCost-h.totals.totalCost),latency:p.count>0?{count:p.count,avgMs:p.sum/p.count,minMs:p.min===Number.POSITIVE_INFINITY?0:p.min,maxMs:p.max,p95Ms:p.p95Max}:void 0,dailyLatency:Array.from(u.values()).map(h=>({date:h.date,count:h.count,avgMs:h.count?h.sum/h.count:0,minMs:h.min===Number.POSITIVE_INFINITY?0:h.min,maxMs:h.max,p95Ms:h.p95Max})).toSorted((h,v)=>h.date.localeCompare(v.date)),modelDaily:Array.from(g.values()).toSorted((h,v)=>h.date.localeCompare(v.date)||v.cost-h.cost),daily:Array.from(c.values()).toSorted((h,v)=>h.date.localeCompare(v.date))}},qb=(e,t,n)=>{let s=0,i=0;for(const g of e){const p=g.usage?.durationMs??0;p>0&&(s+=p,i+=1)}const o=i?s/i:0,a=t&&s>0?t.totalTokens/(s/6e4):void 0,l=t&&s>0?t.totalCost/(s/6e4):void 0,c=n.messages.total?n.messages.errors/n.messages.total:0,u=n.daily.filter(g=>g.messages>0&&g.errors>0).map(g=>({date:g.date,errors:g.errors,messages:g.messages,rate:g.errors/g.messages})).toSorted((g,p)=>p.rate-g.rate||p.errors-g.errors)[0];return{durationSumMs:s,durationCount:i,avgDurationMs:o,throughputTokensPerMin:a,throughputCostPerMin:l,errorRate:c,peakErrorDay:u}},Vb=e=>{const t=[ss(["key","label","agentId","channel","provider","model","updatedAt","durationMs","messages","errors","toolCalls","inputTokens","outputTokens","cacheReadTokens","cacheWriteTokens","totalTokens","totalCost"])];for(const n of e){const s=n.usage;t.push(ss([n.key,n.label??"",n.agentId??"",n.channel??"",n.modelProvider??n.providerOverride??"",n.model??n.modelOverride??"",n.updatedAt?new Date(n.updatedAt).toISOString():"",s?.durationMs??"",s?.messageCounts?.total??"",s?.messageCounts?.errors??"",s?.messageCounts?.toolCalls??"",s?.input??"",s?.output??"",s?.cacheRead??"",s?.cacheWrite??"",s?.totalTokens??"",s?.totalCost??""]))}return t.join(`
`)},Qb=e=>{const t=[ss(["date","inputTokens","outputTokens","cacheReadTokens","cacheWriteTokens","totalTokens","inputCost","outputCost","cacheReadCost","cacheWriteCost","totalCost"])];for(const n of e)t.push(ss([n.date,n.input,n.output,n.cacheRead,n.cacheWrite,n.totalTokens,n.inputCost??"",n.outputCost??"",n.cacheReadCost??"",n.cacheWriteCost??"",n.totalCost]));return t.join(`
`)},Yb=(e,t,n)=>{const s=e.trim();if(!s)return[];const i=s.length?s.split(/\s+/):[],o=i.length?i[i.length-1]:"",[a,l]=o.includes(":")?[o.slice(0,o.indexOf(":")),o.slice(o.indexOf(":")+1)]:["",""],c=a.toLowerCase(),u=l.toLowerCase(),g=b=>{const S=new Set;for(const A of b)A&&S.add(A);return Array.from(S)},p=g(t.map(b=>b.agentId)).slice(0,6),h=g(t.map(b=>b.channel)).slice(0,6),v=g([...t.map(b=>b.modelProvider),...t.map(b=>b.providerOverride),...n?.byProvider.map(b=>b.provider)??[]]).slice(0,6),d=g([...t.map(b=>b.model),...n?.byModel.map(b=>b.model)??[]]).slice(0,6),m=g(n?.tools.tools.map(b=>b.name)??[]).slice(0,6);if(!c)return[{label:"agent:",value:"agent:"},{label:"channel:",value:"channel:"},{label:"provider:",value:"provider:"},{label:"model:",value:"model:"},{label:"tool:",value:"tool:"},{label:"has:errors",value:"has:errors"},{label:"has:tools",value:"has:tools"},{label:"minTokens:",value:"minTokens:"},{label:"maxCost:",value:"maxCost:"}];const y=[],C=(b,S)=>{for(const A of S)(!u||A.toLowerCase().includes(u))&&y.push({label:`${b}:${A}`,value:`${b}:${A}`})};switch(c){case"agent":C("agent",p);break;case"channel":C("channel",h);break;case"provider":C("provider",v);break;case"model":C("model",d);break;case"tool":C("tool",m);break;case"has":["errors","tools","context","usage","model","provider"].forEach(b=>{(!u||b.includes(u))&&y.push({label:`has:${b}`,value:`has:${b}`})});break}return y},Zb=(e,t)=>{const n=e.trim();if(!n)return`${t} `;const s=n.split(/\s+/);return s[s.length-1]=t,`${s.join(" ")} `},gt=e=>e.trim().toLowerCase(),Jb=(e,t)=>{const n=e.trim();if(!n)return`${t} `;const s=n.split(/\s+/),i=s[s.length-1]??"",o=t.includes(":")?t.split(":")[0]:null,a=i.includes(":")?i.split(":")[0]:null;return i.endsWith(":")&&o&&a===o?(s[s.length-1]=t,`${s.join(" ")} `):s.includes(t)?`${s.join(" ")} `:`${s.join(" ")} ${t} `},xr=(e,t)=>{const s=e.trim().split(/\s+/).filter(Boolean).filter(i=>i!==t);return s.length?`${s.join(" ")} `:""},$r=(e,t,n)=>{const s=gt(t),o=[..._o(e).filter(a=>gt(a.key??"")!==s).map(a=>a.raw),...n.map(a=>`${t}:${a}`)];return o.length?`${o.join(" ")} `:""};function he(e,t){return t===0?0:e/t*100}function Xb(e){const t=e.totalCost||0;return{input:{tokens:e.input,cost:e.inputCost||0,pct:he(e.inputCost||0,t)},output:{tokens:e.output,cost:e.outputCost||0,pct:he(e.outputCost||0,t)},cacheRead:{tokens:e.cacheRead,cost:e.cacheReadCost||0,pct:he(e.cacheReadCost||0,t)},cacheWrite:{tokens:e.cacheWrite,cost:e.cacheWriteCost||0,pct:he(e.cacheWriteCost||0,t)},totalCost:t}}function ey(e,t,n,s,i,o,a,l){if(!(e.length>0||t.length>0||n.length>0))return f;const u=n.length===1?s.find(d=>d.key===n[0]):null,g=u?(u.label||u.key).slice(0,20)+((u.label||u.key).length>20?"…":""):n.length===1?n[0].slice(0,8)+"…":`${n.length} sessions`,p=u?u.label||u.key:n.length===1?n[0]:n.join(", "),h=e.length===1?e[0]:`${e.length} days`,v=t.length===1?`${t[0]}:00`:`${t.length} hours`;return r`
    <div class="active-filters">
      ${e.length>0?r`
            <div class="filter-chip">
              <span class="filter-chip-label">Days: ${h}</span>
              <button class="filter-chip-remove" @click=${i} title="Remove filter">×</button>
            </div>
          `:f}
      ${t.length>0?r`
            <div class="filter-chip">
              <span class="filter-chip-label">Hours: ${v}</span>
              <button class="filter-chip-remove" @click=${o} title="Remove filter">×</button>
            </div>
          `:f}
      ${n.length>0?r`
            <div class="filter-chip" title="${p}">
              <span class="filter-chip-label">Session: ${g}</span>
              <button class="filter-chip-remove" @click=${a} title="Remove filter">×</button>
            </div>
          `:f}
      ${(e.length>0||t.length>0)&&n.length>0?r`
            <button class="btn btn-sm filter-clear-btn" @click=${l}>
              Clear All
            </button>
          `:f}
    </div>
  `}function ty(e,t,n,s,i,o){if(!e.length)return r`
      <div class="daily-chart-compact">
        <div class="sessions-panel-title">Daily Usage</div>
        <div class="muted" style="padding: 20px; text-align: center">No data</div>
      </div>
    `;const a=n==="tokens",l=e.map(p=>a?p.totalTokens:p.totalCost),c=Math.max(...l,a?1:1e-4),u=e.length>30?12:e.length>20?18:e.length>14?24:32,g=e.length<=14;return r`
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
          ${e.map((p,h)=>{const d=l[h]/c*100,m=t.includes(p.date),y=uc(p.date),C=e.length>20?String(parseInt(p.date.slice(8),10)):y,b=e.length>20?"font-size: 8px":"",S=s==="by-type"?a?[{value:p.output,class:"output"},{value:p.input,class:"input"},{value:p.cacheWrite,class:"cache-write"},{value:p.cacheRead,class:"cache-read"}]:[{value:p.outputCost??0,class:"output"},{value:p.inputCost??0,class:"input"},{value:p.cacheWriteCost??0,class:"cache-write"},{value:p.cacheReadCost??0,class:"cache-read"}]:[],A=s==="by-type"?a?[`Output ${U(p.output)}`,`Input ${U(p.input)}`,`Cache write ${U(p.cacheWrite)}`,`Cache read ${U(p.cacheRead)}`]:[`Output ${V(p.outputCost??0)}`,`Input ${V(p.inputCost??0)}`,`Cache write ${V(p.cacheWriteCost??0)}`,`Cache read ${V(p.cacheReadCost??0)}`]:[],T=a?U(p.totalTokens):V(p.totalCost);return r`
              <div
                class="daily-bar-wrapper ${m?"selected":""}"
                @click=${M=>o(p.date,M.shiftKey)}
              >
                ${s==="by-type"?r`
                        <div
                          class="daily-bar"
                          style="height: ${d.toFixed(1)}%; display: flex; flex-direction: column;"
                        >
                          ${(()=>{const M=S.reduce((E,R)=>E+R.value,0)||1;return S.map(E=>r`
                                <div
                                  class="cost-segment ${E.class}"
                                  style="height: ${E.value/M*100}%"
                                ></div>
                              `)})()}
                        </div>
                      `:r`
                        <div class="daily-bar" style="height: ${d.toFixed(1)}%"></div>
                      `}
                ${g?r`<div class="daily-bar-total">${T}</div>`:f}
                <div class="daily-bar-label" style="${b}">${C}</div>
                <div class="daily-bar-tooltip">
                  <strong>${jb(p.date)}</strong><br />
                  ${U(p.totalTokens)} tokens<br />
                  ${V(p.totalCost)}
                  ${A.length?r`${A.map(M=>r`<div>${M}</div>`)}`:f}
                </div>
              </div>
            `})}
        </div>
      </div>
    </div>
  `}function ny(e,t){const n=Xb(e),s=t==="tokens",i=e.totalTokens||1,o={output:he(e.output,i),input:he(e.input,i),cacheWrite:he(e.cacheWrite,i),cacheRead:he(e.cacheRead,i)};return r`
    <div class="cost-breakdown cost-breakdown-compact">
      <div class="cost-breakdown-header">${s?"Tokens":"Cost"} by Type</div>
      <div class="cost-breakdown-bar">
        <div class="cost-segment output" style="width: ${(s?o.output:n.output.pct).toFixed(1)}%"
          title="Output: ${s?U(e.output):V(n.output.cost)}"></div>
        <div class="cost-segment input" style="width: ${(s?o.input:n.input.pct).toFixed(1)}%"
          title="Input: ${s?U(e.input):V(n.input.cost)}"></div>
        <div class="cost-segment cache-write" style="width: ${(s?o.cacheWrite:n.cacheWrite.pct).toFixed(1)}%"
          title="Cache Write: ${s?U(e.cacheWrite):V(n.cacheWrite.cost)}"></div>
        <div class="cost-segment cache-read" style="width: ${(s?o.cacheRead:n.cacheRead.pct).toFixed(1)}%"
          title="Cache Read: ${s?U(e.cacheRead):V(n.cacheRead.cost)}"></div>
      </div>
      <div class="cost-breakdown-legend">
        <span class="legend-item"><span class="legend-dot output"></span>Output ${s?U(e.output):V(n.output.cost)}</span>
        <span class="legend-item"><span class="legend-dot input"></span>Input ${s?U(e.input):V(n.input.cost)}</span>
        <span class="legend-item"><span class="legend-dot cache-write"></span>Cache Write ${s?U(e.cacheWrite):V(n.cacheWrite.cost)}</span>
        <span class="legend-item"><span class="legend-dot cache-read"></span>Cache Read ${s?U(e.cacheRead):V(n.cacheRead.cost)}</span>
      </div>
      <div class="cost-breakdown-total">
        Total: ${s?U(e.totalTokens):V(e.totalCost)}
      </div>
    </div>
  `}function pt(e,t,n){return r`
    <div class="usage-insight-card">
      <div class="usage-insight-title">${e}</div>
      ${t.length===0?r`<div class="muted">${n}</div>`:r`
              <div class="usage-list">
                ${t.map(s=>r`
                    <div class="usage-list-item">
                      <span>${s.label}</span>
                      <span class="usage-list-value">
                        <span>${s.value}</span>
                        ${s.sub?r`<span class="usage-list-sub">${s.sub}</span>`:f}
                      </span>
                    </div>
                  `)}
              </div>
            `}
    </div>
  `}function wr(e,t,n){return r`
    <div class="usage-insight-card">
      <div class="usage-insight-title">${e}</div>
      ${t.length===0?r`<div class="muted">${n}</div>`:r`
              <div class="usage-error-list">
                ${t.map(s=>r`
                    <div class="usage-error-row">
                      <div class="usage-error-date">${s.label}</div>
                      <div class="usage-error-rate">${s.value}</div>
                      ${s.sub?r`<div class="usage-error-sub">${s.sub}</div>`:f}
                    </div>
                  `)}
              </div>
            `}
    </div>
  `}function sy(e,t,n,s,i,o,a){if(!e)return f;const l=t.messages.total?Math.round(e.totalTokens/t.messages.total):0,c=t.messages.total?e.totalCost/t.messages.total:0,u=e.input+e.cacheRead,g=u>0?e.cacheRead/u:0,p=u>0?`${(g*100).toFixed(1)}%`:"—",h=n.errorRate*100,v=n.throughputTokensPerMin!==void 0?`${U(Math.round(n.throughputTokensPerMin))} tok/min`:"—",d=n.throughputCostPerMin!==void 0?`${V(n.throughputCostPerMin,4)} / min`:"—",m=n.durationCount>0?Yi(n.avgDurationMs,{spaced:!0})??"—":"—",y="Cache hit rate = cache read / (input + cache read). Higher is better.",C="Error rate = errors / total messages. Lower is better.",b="Throughput shows tokens per minute over active time. Higher is better.",S="Average tokens per message in this range.",A=s?"Average cost per message when providers report costs. Cost data is missing for some or all sessions in this range.":"Average cost per message when providers report costs.",T=t.daily.filter(F=>F.messages>0&&F.errors>0).map(F=>{const K=F.errors/F.messages;return{label:uc(F.date),value:`${(K*100).toFixed(2)}%`,sub:`${F.errors} errors · ${F.messages} msgs · ${U(F.tokens)}`,rate:K}}).toSorted((F,K)=>K.rate-F.rate).slice(0,5).map(({rate:F,...K})=>K),M=t.byModel.slice(0,5).map(F=>({label:F.model??"unknown",value:V(F.totals.totalCost),sub:`${U(F.totals.totalTokens)} · ${F.count} msgs`})),E=t.byProvider.slice(0,5).map(F=>({label:F.provider??"unknown",value:V(F.totals.totalCost),sub:`${U(F.totals.totalTokens)} · ${F.count} msgs`})),R=t.tools.tools.slice(0,6).map(F=>({label:F.name,value:`${F.count}`,sub:"calls"})),P=t.byAgent.slice(0,5).map(F=>({label:F.agentId,value:V(F.totals.totalCost),sub:U(F.totals.totalTokens)})),Z=t.byChannel.slice(0,5).map(F=>({label:F.channel,value:V(F.totals.totalCost),sub:U(F.totals.totalTokens)}));return r`
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
            <span class="usage-summary-hint" title=${S}>?</span>
          </div>
          <div class="usage-summary-value">${U(l)}</div>
          <div class="usage-summary-sub">Across ${t.messages.total||0} messages</div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            Avg Cost / Msg
            <span class="usage-summary-hint" title=${A}>?</span>
          </div>
          <div class="usage-summary-value">${V(c,4)}</div>
          <div class="usage-summary-sub">${V(e.totalCost)} total</div>
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
            <span class="usage-summary-hint" title=${b}>?</span>
          </div>
          <div class="usage-summary-value">${v}</div>
          <div class="usage-summary-sub">${d}</div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            Error Rate
            <span class="usage-summary-hint" title=${C}>?</span>
          </div>
          <div class="usage-summary-value ${h>5?"bad":h>1?"warn":"good"}">${h.toFixed(2)}%</div>
          <div class="usage-summary-sub">
            ${t.messages.errors} errors · ${m} avg session
          </div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            Cache Hit Rate
            <span class="usage-summary-hint" title=${y}>?</span>
          </div>
          <div class="usage-summary-value ${g>.6?"good":g>.3?"warn":"bad"}">${p}</div>
          <div class="usage-summary-sub">
            ${U(e.cacheRead)} cached · ${U(u)} prompt
          </div>
        </div>
      </div>
      <div class="usage-insights-grid">
        ${pt("Top Models",M,"No model data")}
        ${pt("Top Providers",E,"No provider data")}
        ${pt("Top Tools",R,"No tool calls")}
        ${pt("Top Agents",P,"No agent data")}
        ${pt("Top Channels",Z,"No channel data")}
        ${wr("Peak Error Days",T,"No error data")}
        ${wr("Peak Error Hours",i,"No error data")}
      </div>
    </section>
  `}function iy(e,t,n,s,i,o,a,l,c,u,g,p,h,v,d){const m=_=>h.includes(_),y=_=>{const z=_.label||_.key;return z.startsWith("agent:")&&z.includes("?token=")?z.slice(0,z.indexOf("?token=")):z},C=async _=>{const z=y(_);try{await navigator.clipboard.writeText(z)}catch{}},b=_=>{const z=[];return m("channel")&&_.channel&&z.push(`channel:${_.channel}`),m("agent")&&_.agentId&&z.push(`agent:${_.agentId}`),m("provider")&&(_.modelProvider||_.providerOverride)&&z.push(`provider:${_.modelProvider??_.providerOverride}`),m("model")&&_.model&&z.push(`model:${_.model}`),m("messages")&&_.usage?.messageCounts&&z.push(`msgs:${_.usage.messageCounts.total}`),m("tools")&&_.usage?.toolUsage&&z.push(`tools:${_.usage.toolUsage.totalCalls}`),m("errors")&&_.usage?.messageCounts&&z.push(`errors:${_.usage.messageCounts.errors}`),m("duration")&&_.usage?.durationMs&&z.push(`dur:${Yi(_.usage.durationMs,{spaced:!0})??"—"}`),z},S=_=>{const z=_.usage;if(!z)return 0;if(n.length>0&&z.dailyBreakdown&&z.dailyBreakdown.length>0){const ae=z.dailyBreakdown.filter(re=>n.includes(re.date));return s?ae.reduce((re,te)=>re+te.tokens,0):ae.reduce((re,te)=>re+te.cost,0)}return s?z.totalTokens??0:z.totalCost??0},A=[...e].toSorted((_,z)=>{switch(i){case"recent":return(z.updatedAt??0)-(_.updatedAt??0);case"messages":return(z.usage?.messageCounts?.total??0)-(_.usage?.messageCounts?.total??0);case"errors":return(z.usage?.messageCounts?.errors??0)-(_.usage?.messageCounts?.errors??0);case"cost":return S(z)-S(_);default:return S(z)-S(_)}}),T=o==="asc"?A.toReversed():A,M=T.reduce((_,z)=>_+S(z),0),E=T.length?M/T.length:0,R=T.reduce((_,z)=>_+(z.usage?.messageCounts?.errors??0),0),P=new Set(t),Z=T.filter(_=>P.has(_.key)),F=Z.length,K=new Map(T.map(_=>[_.key,_])),ue=a.map(_=>K.get(_)).filter(_=>!!_);return r`
    <div class="card sessions-card">
      <div class="sessions-card-header">
        <div class="card-title">Sessions</div>
        <div class="sessions-card-count">
          ${e.length} shown${v!==e.length?` · ${v} total`:""}
        </div>
      </div>
      <div class="sessions-card-meta">
        <div class="sessions-card-stats">
          <span>${s?U(E):V(E)} avg</span>
          <span>${R} errors</span>
        </div>
        <div class="chart-toggle small">
          <button
            class="toggle-btn ${l==="all"?"active":""}"
            @click=${()=>p("all")}
          >
            All
          </button>
          <button
            class="toggle-btn ${l==="recent"?"active":""}"
            @click=${()=>p("recent")}
          >
            Recently viewed
          </button>
        </div>
        <label class="sessions-sort">
          <span>Sort</span>
          <select
            @change=${_=>u(_.target.value)}
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
        ${F>0?r`
                <button class="btn btn-sm sessions-action-btn sessions-clear-btn" @click=${d}>
                  Clear Selection
                </button>
              `:f}
      </div>
      ${l==="recent"?ue.length===0?r`
                <div class="muted" style="padding: 20px; text-align: center">No recent sessions</div>
              `:r`
                <div class="session-bars" style="max-height: 220px; margin-top: 6px;">
                  ${ue.map(_=>{const z=S(_),ae=P.has(_.key),re=y(_),te=b(_);return r`
                      <div
                        class="session-bar-row ${ae?"selected":""}"
                        @click=${ie=>c(_.key,ie.shiftKey)}
                        title="${_.key}"
                      >
                        <div class="session-bar-label">
                          <div class="session-bar-title">${re}</div>
                          ${te.length>0?r`<div class="session-bar-meta">${te.join(" · ")}</div>`:f}
                        </div>
                        <div class="session-bar-track" style="display: none;"></div>
                        <div class="session-bar-actions">
                          <button
                            class="session-copy-btn"
                            title="Copy session name"
                            @click=${ie=>{ie.stopPropagation(),C(_)}}
                          >
                            Copy
                          </button>
                          <div class="session-bar-value">${s?U(z):V(z)}</div>
                        </div>
                      </div>
                    `})}
                </div>
              `:e.length===0?r`
                <div class="muted" style="padding: 20px; text-align: center">No sessions in range</div>
              `:r`
                <div class="session-bars">
                  ${T.slice(0,50).map(_=>{const z=S(_),ae=t.includes(_.key),re=y(_),te=b(_);return r`
                      <div
                        class="session-bar-row ${ae?"selected":""}"
                        @click=${ie=>c(_.key,ie.shiftKey)}
                        title="${_.key}"
                      >
                        <div class="session-bar-label">
                          <div class="session-bar-title">${re}</div>
                          ${te.length>0?r`<div class="session-bar-meta">${te.join(" · ")}</div>`:f}
                        </div>
                        <div class="session-bar-track" style="display: none;"></div>
                        <div class="session-bar-actions">
                          <button
                            class="session-copy-btn"
                            title="Copy session name"
                            @click=${ie=>{ie.stopPropagation(),C(_)}}
                          >
                            Copy
                          </button>
                          <div class="session-bar-value">${s?U(z):V(z)}</div>
                        </div>
                      </div>
                    `})}
                  ${e.length>50?r`<div class="muted" style="padding: 8px; text-align: center; font-size: 11px;">+${e.length-50} more</div>`:f}
                </div>
              `}
      ${F>1?r`
              <div style="margin-top: 10px;">
                <div class="sessions-card-count">Selected (${F})</div>
                <div class="session-bars" style="max-height: 160px; margin-top: 6px;">
                  ${Z.map(_=>{const z=S(_),ae=y(_),re=b(_);return r`
                      <div
                        class="session-bar-row selected"
                        @click=${te=>c(_.key,te.shiftKey)}
                        title="${_.key}"
                      >
                        <div class="session-bar-label">
                          <div class="session-bar-title">${ae}</div>
                          ${re.length>0?r`<div class="session-bar-meta">${re.join(" · ")}</div>`:f}
                        </div>
                  <div class="session-bar-track" style="display: none;"></div>
                        <div class="session-bar-actions">
                          <button
                            class="session-copy-btn"
                            title="Copy session name"
                            @click=${te=>{te.stopPropagation(),C(_)}}
                          >
                            Copy
                          </button>
                          <div class="session-bar-value">${s?U(z):V(z)}</div>
                        </div>
                      </div>
                    `})}
                </div>
              </div>
            `:f}
    </div>
  `}function oy(){return f}function ay(e){const t=e.usage;if(!t)return r`
      <div class="muted">No usage data for this session.</div>
    `;const n=a=>a?new Date(a).toLocaleString():"—",s=[];e.channel&&s.push(`channel:${e.channel}`),e.agentId&&s.push(`agent:${e.agentId}`),(e.modelProvider||e.providerOverride)&&s.push(`provider:${e.modelProvider??e.providerOverride}`),e.model&&s.push(`model:${e.model}`);const i=t.toolUsage?.tools.slice(0,6).map(a=>({label:a.name,value:`${a.count}`,sub:"calls"}))??[],o=t.modelUsage?.slice(0,6).map(a=>({label:a.model??"unknown",value:V(a.totals.totalCost),sub:U(a.totals.totalTokens)}))??[];return r`
    ${s.length>0?r`<div class="usage-badges">${s.map(a=>r`<span class="usage-badge">${a}</span>`)}</div>`:f}
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
        <div class="session-summary-value">${Yi(t.durationMs,{spaced:!0})??"—"}</div>
        <div class="session-summary-meta">${n(t.firstActivity)} → ${n(t.lastActivity)}</div>
      </div>
    </div>
    <div class="usage-insights-grid" style="margin-top: 12px;">
      ${pt("Top Tools",i,"No tool calls")}
      ${pt("Model Mix",o,"No model data")}
    </div>
  `}function ry(e,t,n,s,i,o,a,l,c,u,g,p,h,v,d,m,y,C,b,S,A,T,M){const E=e.label||e.key,R=E.length>50?E.slice(0,50)+"…":E,P=e.usage;return r`
    <div class="card session-detail-panel">
      <div class="session-detail-header">
        <div class="session-detail-header-left">
          <div class="session-detail-title">${R}</div>
        </div>
        <div class="session-detail-stats">
          ${P?r`
            <span><strong>${U(P.totalTokens)}</strong> tokens</span>
            <span><strong>${V(P.totalCost)}</strong></span>
          `:f}
        </div>
        <button class="session-close-btn" @click=${M} title="Close session details">×</button>
      </div>
      <div class="session-detail-content">
        ${ay(e)}
        <div class="session-detail-row">
          ${ly(t,n,s,i,o,a,l,c,u)}
        </div>
        <div class="session-detail-bottom">
          ${dy(g,p,h,v,d,m,y,C,b,S)}
          ${cy(e.contextWeight,P,A,T)}
        </div>
      </div>
    </div>
  `}function ly(e,t,n,s,i,o,a,l,c){if(t)return r`
      <div class="session-timeseries-compact">
        <div class="muted" style="padding: 20px; text-align: center">Loading...</div>
      </div>
    `;if(!e||e.points.length<2)return r`
      <div class="session-timeseries-compact">
        <div class="muted" style="padding: 20px; text-align: center">No timeline data</div>
      </div>
    `;let u=e.points;if(a||l||c&&c.length>0){const K=a?new Date(a+"T00:00:00").getTime():0,ue=l?new Date(l+"T23:59:59").getTime():1/0;u=e.points.filter(_=>{if(_.timestamp<K||_.timestamp>ue)return!1;if(c&&c.length>0){const z=new Date(_.timestamp),ae=`${z.getFullYear()}-${String(z.getMonth()+1).padStart(2,"0")}-${String(z.getDate()).padStart(2,"0")}`;return c.includes(ae)}return!0})}if(u.length<2)return r`
      <div class="session-timeseries-compact">
        <div class="muted" style="padding: 20px; text-align: center">No data in range</div>
      </div>
    `;let g=0,p=0,h=0,v=0,d=0,m=0;u=u.map(K=>(g+=K.totalTokens,p+=K.cost,h+=K.output,v+=K.input,d+=K.cacheRead,m+=K.cacheWrite,{...K,cumulativeTokens:g,cumulativeCost:p}));const y=400,C=80,b={top:16,right:10,bottom:20,left:40},S=y-b.left-b.right,A=C-b.top-b.bottom,T=n==="cumulative",M=n==="per-turn"&&i==="by-type",E=h+v+d+m,R=u.map(K=>T?K.cumulativeTokens:M?K.input+K.output+K.cacheRead+K.cacheWrite:K.totalTokens),P=Math.max(...R,1),Z=Math.max(2,Math.min(8,S/u.length*.7)),F=Math.max(1,(S-Z*u.length)/(u.length-1||1));return r`
    <div class="session-timeseries-compact">
      <div class="timeseries-header-row">
        <div class="card-title" style="font-size: 13px;">Usage Over Time</div>
        <div class="timeseries-controls">
          <div class="chart-toggle small">
            <button
              class="toggle-btn ${T?"":"active"}"
              @click=${()=>s("per-turn")}
            >
              Per Turn
            </button>
            <button
              class="toggle-btn ${T?"active":""}"
              @click=${()=>s("cumulative")}
            >
              Cumulative
            </button>
          </div>
          ${T?f:r`
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
      <svg viewBox="0 0 ${y} ${C+15}" class="timeseries-svg" style="width: 100%; height: auto;">
        <!-- Y axis -->
        <line x1="${b.left}" y1="${b.top}" x2="${b.left}" y2="${b.top+A}" stroke="var(--border)" />
        <!-- X axis -->
        <line x1="${b.left}" y1="${b.top+A}" x2="${y-b.right}" y2="${b.top+A}" stroke="var(--border)" />
        <!-- Y axis labels -->
        <text x="${b.left-4}" y="${b.top+4}" text-anchor="end" class="axis-label" style="font-size: 9px; fill: var(--text-muted)">${U(P)}</text>
        <text x="${b.left-4}" y="${b.top+A}" text-anchor="end" class="axis-label" style="font-size: 9px; fill: var(--text-muted)">0</text>
        <!-- X axis labels (first and last) -->
        ${u.length>0?An`
          <text x="${b.left}" y="${b.top+A+12}" text-anchor="start" style="font-size: 8px; fill: var(--text-muted)">${new Date(u[0].timestamp).toLocaleDateString(void 0,{month:"short",day:"numeric"})}</text>
          <text x="${y-b.right}" y="${b.top+A+12}" text-anchor="end" style="font-size: 8px; fill: var(--text-muted)">${new Date(u[u.length-1].timestamp).toLocaleDateString(void 0,{month:"short",day:"numeric"})}</text>
        `:f}
        <!-- Bars -->
        ${u.map((K,ue)=>{const _=R[ue],z=b.left+ue*(Z+F),ae=_/P*A,re=b.top+A-ae,ie=[new Date(K.timestamp).toLocaleDateString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),`${U(_)} tokens`];M&&(ie.push(`Output ${U(K.output)}`),ie.push(`Input ${U(K.input)}`),ie.push(`Cache write ${U(K.cacheWrite)}`),ie.push(`Cache read ${U(K.cacheRead)}`));const I=ie.join(" · ");if(!M)return An`<rect x="${z}" y="${re}" width="${Z}" height="${ae}" class="ts-bar" rx="1" style="cursor: pointer;"><title>${I}</title></rect>`;const D=[{value:K.output,class:"output"},{value:K.input,class:"input"},{value:K.cacheWrite,class:"cache-write"},{value:K.cacheRead,class:"cache-read"}];let N=b.top+A;return An`
            ${D.map(j=>{if(j.value<=0||_<=0)return f;const we=ae*(j.value/_);return N-=we,An`<rect x="${z}" y="${N}" width="${Z}" height="${we}" class="ts-bar ${j.class}" rx="1"><title>${I}</title></rect>`})}
          `})}
      </svg>
      <div class="timeseries-summary">${u.length} msgs · ${U(g)} · ${V(p)}</div>
      ${M?r`
              <div style="margin-top: 8px;">
                <div class="card-title" style="font-size: 12px; margin-bottom: 6px;">Tokens by Type</div>
                <div class="cost-breakdown-bar" style="height: 18px;">
                  <div class="cost-segment output" style="width: ${he(h,E).toFixed(1)}%"></div>
                  <div class="cost-segment input" style="width: ${he(v,E).toFixed(1)}%"></div>
                  <div class="cost-segment cache-write" style="width: ${he(m,E).toFixed(1)}%"></div>
                  <div class="cost-segment cache-read" style="width: ${he(d,E).toFixed(1)}%"></div>
                </div>
                <div class="cost-breakdown-legend">
                  <div class="legend-item" title="Assistant output tokens">
                    <span class="legend-dot output"></span>Output ${U(h)}
                  </div>
                  <div class="legend-item" title="User + tool input tokens">
                    <span class="legend-dot input"></span>Input ${U(v)}
                  </div>
                  <div class="legend-item" title="Tokens written to cache">
                    <span class="legend-dot cache-write"></span>Cache Write ${U(m)}
                  </div>
                  <div class="legend-item" title="Tokens read from cache">
                    <span class="legend-dot cache-read"></span>Cache Read ${U(d)}
                  </div>
                </div>
                <div class="cost-breakdown-total">Total: ${U(E)}</div>
              </div>
            `:f}
    </div>
  `}function cy(e,t,n,s){if(!e)return r`
      <div class="context-details-panel">
        <div class="muted" style="padding: 20px; text-align: center">No context data</div>
      </div>
    `;const i=ct(e.systemPrompt.chars),o=ct(e.skills.promptChars),a=ct(e.tools.listChars+e.tools.schemaChars),l=ct(e.injectedWorkspaceFiles.reduce((S,A)=>S+A.injectedChars,0)),c=i+o+a+l;let u="";if(t&&t.totalTokens>0){const S=t.input+t.cacheRead;S>0&&(u=`~${Math.min(c/S*100,100).toFixed(0)}% of input`)}const g=e.skills.entries.toSorted((S,A)=>A.blockChars-S.blockChars),p=e.tools.entries.toSorted((S,A)=>A.summaryChars+A.schemaChars-(S.summaryChars+S.schemaChars)),h=e.injectedWorkspaceFiles.toSorted((S,A)=>A.injectedChars-S.injectedChars),v=4,d=n,m=d?g:g.slice(0,v),y=d?p:p.slice(0,v),C=d?h:h.slice(0,v),b=g.length>v||p.length>v||h.length>v;return r`
    <div class="context-details-panel">
      <div class="context-breakdown-header">
        <div class="card-title" style="font-size: 13px;">System Prompt Breakdown</div>
        ${b?r`<button class="context-expand-btn" @click=${s}>
                ${d?"Collapse":"Expand all"}
              </button>`:f}
      </div>
      <p class="context-weight-desc">${u||"Base context per message"}</p>
      <div class="context-stacked-bar">
        <div class="context-segment system" style="width: ${he(i,c).toFixed(1)}%" title="System: ~${U(i)}"></div>
        <div class="context-segment skills" style="width: ${he(o,c).toFixed(1)}%" title="Skills: ~${U(o)}"></div>
        <div class="context-segment tools" style="width: ${he(a,c).toFixed(1)}%" title="Tools: ~${U(a)}"></div>
        <div class="context-segment files" style="width: ${he(l,c).toFixed(1)}%" title="Files: ~${U(l)}"></div>
      </div>
      <div class="context-legend">
        <span class="legend-item"><span class="legend-dot system"></span>Sys ~${U(i)}</span>
        <span class="legend-item"><span class="legend-dot skills"></span>Skills ~${U(o)}</span>
        <span class="legend-item"><span class="legend-dot tools"></span>Tools ~${U(a)}</span>
        <span class="legend-item"><span class="legend-dot files"></span>Files ~${U(l)}</span>
      </div>
      <div class="context-total">Total: ~${U(c)}</div>
      <div class="context-breakdown-grid">
        ${g.length>0?(()=>{const S=g.length-m.length;return r`
                  <div class="context-breakdown-card">
                    <div class="context-breakdown-title">Skills (${g.length})</div>
                    <div class="context-breakdown-list">
                      ${m.map(A=>r`
                          <div class="context-breakdown-item">
                            <span class="mono">${A.name}</span>
                            <span class="muted">~${U(ct(A.blockChars))}</span>
                          </div>
                        `)}
                    </div>
                    ${S>0?r`<div class="context-breakdown-more">+${S} more</div>`:f}
                  </div>
                `})():f}
        ${p.length>0?(()=>{const S=p.length-y.length;return r`
                  <div class="context-breakdown-card">
                    <div class="context-breakdown-title">Tools (${p.length})</div>
                    <div class="context-breakdown-list">
                      ${y.map(A=>r`
                          <div class="context-breakdown-item">
                            <span class="mono">${A.name}</span>
                            <span class="muted">~${U(ct(A.summaryChars+A.schemaChars))}</span>
                          </div>
                        `)}
                    </div>
                    ${S>0?r`<div class="context-breakdown-more">+${S} more</div>`:f}
                  </div>
                `})():f}
        ${h.length>0?(()=>{const S=h.length-C.length;return r`
                  <div class="context-breakdown-card">
                    <div class="context-breakdown-title">Files (${h.length})</div>
                    <div class="context-breakdown-list">
                      ${C.map(A=>r`
                          <div class="context-breakdown-item">
                            <span class="mono">${A.name}</span>
                            <span class="muted">~${U(ct(A.injectedChars))}</span>
                          </div>
                        `)}
                    </div>
                    ${S>0?r`<div class="context-breakdown-more">+${S} more</div>`:f}
                  </div>
                `})():f}
      </div>
    </div>
  `}function dy(e,t,n,s,i,o,a,l,c,u){if(t)return r`
      <div class="session-logs-compact">
        <div class="session-logs-header">Conversation</div>
        <div class="muted" style="padding: 20px; text-align: center">Loading...</div>
      </div>
    `;if(!e||e.length===0)return r`
      <div class="session-logs-compact">
        <div class="session-logs-header">Conversation</div>
        <div class="muted" style="padding: 20px; text-align: center">No messages</div>
      </div>
    `;const g=i.query.trim().toLowerCase(),p=e.map(C=>{const b=Db(C.content),S=b.cleanContent||C.content;return{log:C,toolInfo:b,cleanContent:S}}),h=Array.from(new Set(p.flatMap(C=>C.toolInfo.tools.map(([b])=>b)))).toSorted((C,b)=>C.localeCompare(b)),v=p.filter(C=>!(i.roles.length>0&&!i.roles.includes(C.log.role)||i.hasTools&&C.toolInfo.tools.length===0||i.tools.length>0&&!C.toolInfo.tools.some(([S])=>i.tools.includes(S))||g&&!C.cleanContent.toLowerCase().includes(g))),d=i.roles.length>0||i.tools.length>0||i.hasTools||g?`${v.length} of ${e.length}`:`${e.length}`,m=new Set(i.roles),y=new Set(i.tools);return r`
    <div class="session-logs-compact">
      <div class="session-logs-header">
        <span>Conversation <span style="font-weight: normal; color: var(--text-muted);">(${d} messages)</span></span>
        <button class="btn btn-sm usage-action-btn usage-secondary-btn" @click=${s}>
          ${n?"Collapse All":"Expand All"}
        </button>
      </div>
      <div class="usage-filters-inline" style="margin: 10px 12px;">
        <select
          multiple
          size="4"
          @change=${C=>o(Array.from(C.target.selectedOptions).map(b=>b.value))}
        >
          <option value="user" ?selected=${m.has("user")}>User</option>
          <option value="assistant" ?selected=${m.has("assistant")}>Assistant</option>
          <option value="tool" ?selected=${m.has("tool")}>Tool</option>
          <option value="toolResult" ?selected=${m.has("toolResult")}>Tool result</option>
        </select>
        <select
          multiple
          size="4"
          @change=${C=>a(Array.from(C.target.selectedOptions).map(b=>b.value))}
        >
          ${h.map(C=>r`<option value=${C} ?selected=${y.has(C)}>${C}</option>`)}
        </select>
        <label class="usage-filters-inline" style="gap: 6px;">
          <input
            type="checkbox"
            .checked=${i.hasTools}
            @change=${C=>l(C.target.checked)}
          />
          Has tools
        </label>
        <input
          type="text"
          placeholder="Search conversation"
          .value=${i.query}
          @input=${C=>c(C.target.value)}
        />
        <button class="btn btn-sm usage-action-btn usage-secondary-btn" @click=${u}>
          Clear
        </button>
      </div>
      <div class="session-logs-list">
        ${v.map(C=>{const{log:b,toolInfo:S,cleanContent:A}=C,T=b.role==="user"?"user":"assistant",M=b.role==="user"?"You":b.role==="assistant"?"Assistant":"Tool";return r`
          <div class="session-log-entry ${T}">
            <div class="session-log-meta">
              <span class="session-log-role">${M}</span>
              <span>${new Date(b.timestamp).toLocaleString()}</span>
              ${b.tokens?r`<span>${U(b.tokens)}</span>`:f}
            </div>
            <div class="session-log-content">${A}</div>
            ${S.tools.length>0?r`
                    <details class="session-log-tools" ?open=${n}>
                      <summary>${S.summary}</summary>
                      <div class="session-log-tools-list">
                        ${S.tools.map(([E,R])=>r`
                            <span class="session-log-tools-pill">${E} × ${R}</span>
                          `)}
                      </div>
                    </details>
                  `:f}
          </div>
        `})}
        ${v.length===0?r`
                <div class="muted" style="padding: 12px">No messages match the filters.</div>
              `:f}
      </div>
    </div>
  `}function uy(e){if(e.loading&&!e.totals)return r`
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
    `;const t=e.chartMode==="tokens",n=e.query.trim().length>0,s=e.queryDraft.trim().length>0,i=[...e.sessions].toSorted((I,D)=>{const N=t?I.usage?.totalTokens??0:I.usage?.totalCost??0;return(t?D.usage?.totalTokens??0:D.usage?.totalCost??0)-N}),o=e.selectedDays.length>0?i.filter(I=>{if(I.usage?.activityDates?.length)return I.usage.activityDates.some(j=>e.selectedDays.includes(j));if(!I.updatedAt)return!1;const D=new Date(I.updatedAt),N=`${D.getFullYear()}-${String(D.getMonth()+1).padStart(2,"0")}-${String(D.getDate()).padStart(2,"0")}`;return e.selectedDays.includes(N)}):i,a=(I,D)=>{if(D.length===0)return!0;const N=I.usage,j=N?.firstActivity??I.updatedAt,we=N?.lastActivity??I.updatedAt;if(!j||!we)return!1;const J=Math.min(j,we),Ae=Math.max(j,we);let ne=J;for(;ne<=Ae;){const fe=new Date(ne),Be=Lo(fe,e.timeZone);if(D.includes(Be))return!0;const Ue=Eo(fe,e.timeZone);ne=Math.min(Ue.getTime(),Ae)+1}return!1},l=e.selectedHours.length>0?o.filter(I=>a(I,e.selectedHours)):o,c=Pb(l,e.query),u=c.sessions,g=c.warnings,p=Yb(e.queryDraft,i,e.aggregates),h=_o(e.query),v=I=>{const D=gt(I);return h.filter(N=>gt(N.key??"")===D).map(N=>N.value).filter(Boolean)},d=I=>{const D=new Set;for(const N of I)N&&D.add(N);return Array.from(D)},m=d(i.map(I=>I.agentId)).slice(0,12),y=d(i.map(I=>I.channel)).slice(0,12),C=d([...i.map(I=>I.modelProvider),...i.map(I=>I.providerOverride),...e.aggregates?.byProvider.map(I=>I.provider)??[]]).slice(0,12),b=d([...i.map(I=>I.model),...e.aggregates?.byModel.map(I=>I.model)??[]]).slice(0,12),S=d(e.aggregates?.tools.tools.map(I=>I.name)??[]).slice(0,12),A=e.selectedSessions.length===1?e.sessions.find(I=>I.key===e.selectedSessions[0])??u.find(I=>I.key===e.selectedSessions[0]):null,T=I=>I.reduce((D,N)=>(N.usage&&(D.input+=N.usage.input,D.output+=N.usage.output,D.cacheRead+=N.usage.cacheRead,D.cacheWrite+=N.usage.cacheWrite,D.totalTokens+=N.usage.totalTokens,D.totalCost+=N.usage.totalCost,D.inputCost+=N.usage.inputCost??0,D.outputCost+=N.usage.outputCost??0,D.cacheReadCost+=N.usage.cacheReadCost??0,D.cacheWriteCost+=N.usage.cacheWriteCost??0,D.missingCostEntries+=N.usage.missingCostEntries??0),D),{input:0,output:0,cacheRead:0,cacheWrite:0,totalTokens:0,totalCost:0,inputCost:0,outputCost:0,cacheReadCost:0,cacheWriteCost:0,missingCostEntries:0}),M=I=>e.costDaily.filter(N=>I.includes(N.date)).reduce((N,j)=>(N.input+=j.input,N.output+=j.output,N.cacheRead+=j.cacheRead,N.cacheWrite+=j.cacheWrite,N.totalTokens+=j.totalTokens,N.totalCost+=j.totalCost,N.inputCost+=j.inputCost??0,N.outputCost+=j.outputCost??0,N.cacheReadCost+=j.cacheReadCost??0,N.cacheWriteCost+=j.cacheWriteCost??0,N),{input:0,output:0,cacheRead:0,cacheWrite:0,totalTokens:0,totalCost:0,inputCost:0,outputCost:0,cacheReadCost:0,cacheWriteCost:0,missingCostEntries:0});let E,R;const P=i.length;if(e.selectedSessions.length>0){const I=u.filter(D=>e.selectedSessions.includes(D.key));E=T(I),R=I.length}else e.selectedDays.length>0&&e.selectedHours.length===0?(E=M(e.selectedDays),R=u.length):e.selectedHours.length>0||n?(E=T(u),R=u.length):(E=e.totals,R=P);const Z=e.selectedSessions.length>0?u.filter(I=>e.selectedSessions.includes(I.key)):n||e.selectedHours.length>0?u:e.selectedDays.length>0?o:i,F=Gb(Z,e.aggregates),K=e.selectedSessions.length>0?(()=>{const I=u.filter(N=>e.selectedSessions.includes(N.key)),D=new Set;for(const N of I)for(const j of N.usage?.activityDates??[])D.add(j);return D.size>0?e.costDaily.filter(N=>D.has(N.date)):e.costDaily})():e.costDaily,ue=qb(Z,E,F),_=!e.loading&&!e.totals&&e.sessions.length===0,z=(E?.missingCostEntries??0)>0||(E?E.totalTokens>0&&E.totalCost===0&&E.input+E.output+E.cacheRead+E.cacheWrite>0:!1),ae=[{label:"Today",days:1},{label:"7d",days:7},{label:"30d",days:30}],re=I=>{const D=new Date,N=new Date;N.setDate(N.getDate()-(I-1)),e.onStartDateChange(ni(N)),e.onEndDateChange(ni(D))},te=(I,D,N)=>{if(N.length===0)return f;const j=v(I),we=new Set(j.map(ne=>gt(ne))),J=N.length>0&&N.every(ne=>we.has(gt(ne))),Ae=j.length;return r`
      <details
        class="usage-filter-select"
        @toggle=${ne=>{const fe=ne.currentTarget;if(!fe.open)return;const Be=Ue=>{Ue.composedPath().includes(fe)||(fe.open=!1,window.removeEventListener("click",Be,!0))};window.addEventListener("click",Be,!0)}}
      >
        <summary>
          <span>${D}</span>
          ${Ae>0?r`<span class="usage-filter-badge">${Ae}</span>`:r`
                  <span class="usage-filter-badge">All</span>
                `}
        </summary>
        <div class="usage-filter-popover">
          <div class="usage-filter-actions">
            <button
              class="btn btn-sm"
              @click=${ne=>{ne.preventDefault(),ne.stopPropagation(),e.onQueryDraftChange($r(e.queryDraft,I,N))}}
              ?disabled=${J}
            >
              Select All
            </button>
            <button
              class="btn btn-sm"
              @click=${ne=>{ne.preventDefault(),ne.stopPropagation(),e.onQueryDraftChange($r(e.queryDraft,I,[]))}}
              ?disabled=${Ae===0}
            >
              Clear
            </button>
          </div>
          <div class="usage-filter-options">
            ${N.map(ne=>{const fe=we.has(gt(ne));return r`
                <label class="usage-filter-option">
                  <input
                    type="checkbox"
                    .checked=${fe}
                    @change=${Be=>{const Ue=Be.target,st=`${I}:${ne}`;e.onQueryDraftChange(Ue.checked?Jb(e.queryDraft,st):xr(e.queryDraft,st))}}
                  />
                  <span>${ne}</span>
                </label>
              `})}
          </div>
        </div>
      </details>
    `},ie=ni(new Date);return r`
    <style>${Nb}</style>

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
                `:f}
          ${_?r`
                  <span class="usage-query-hint">Select a date range and click Refresh to load usage.</span>
                `:f}
        </div>
        <div class="usage-header-metrics">
          ${E?r`
                <span class="usage-metric-badge">
                  <strong>${U(E.totalTokens)}</strong> tokens
                </span>
                <span class="usage-metric-badge">
                  <strong>${V(E.totalCost)}</strong> cost
                </span>
                <span class="usage-metric-badge">
                  <strong>${R}</strong>
                  session${R!==1?"s":""}
                </span>
              `:f}
          <button
            class="usage-pin-btn ${e.headerPinned?"active":""}"
            title=${e.headerPinned?"Unpin filters":"Pin filters"}
            @click=${e.onToggleHeaderPinned}
          >
            ${e.headerPinned?"Pinned":"Pin"}
          </button>
          <details
            class="usage-export-menu"
            @toggle=${I=>{const D=I.currentTarget;if(!D.open)return;const N=j=>{j.composedPath().includes(D)||(D.open=!1,window.removeEventListener("click",N,!0))};window.addEventListener("click",N,!0)}}
          >
            <summary class="usage-export-button">Export ▾</summary>
            <div class="usage-export-popover">
              <div class="usage-export-list">
                <button
                  class="usage-export-item"
                  @click=${()=>si(`opensoul-usage-sessions-${ie}.csv`,Vb(u),"text/csv")}
                  ?disabled=${u.length===0}
                >
                  Sessions CSV
                </button>
                <button
                  class="usage-export-item"
                  @click=${()=>si(`opensoul-usage-daily-${ie}.csv`,Qb(K),"text/csv")}
                  ?disabled=${K.length===0}
                >
                  Daily CSV
                </button>
                <button
                  class="usage-export-item"
                  @click=${()=>si(`opensoul-usage-${ie}.json`,JSON.stringify({totals:E,sessions:u,daily:K,aggregates:F},null,2),"application/json")}
                  ?disabled=${u.length===0&&K.length===0}
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
          ${ey(e.selectedDays,e.selectedHours,e.selectedSessions,e.sessions,e.onClearDays,e.onClearHours,e.onClearSessions,e.onClearFilters)}
          <div class="usage-presets">
            ${ae.map(I=>r`
                <button class="btn btn-sm" @click=${()=>re(I.days)}>
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
            ${s||n?r`<button class="btn btn-sm usage-action-btn usage-secondary-btn" @click=${e.onClearQuery}>Clear</button>`:f}
            <span class="usage-query-hint">
              ${n?`${u.length} of ${P} sessions match`:`${P} sessions in range`}
            </span>
          </div>
        </div>
        <div class="usage-filter-row">
          ${te("agent","Agent",m)}
          ${te("channel","Channel",y)}
          ${te("provider","Provider",C)}
          ${te("model","Model",b)}
          ${te("tool","Tool",S)}
          <span class="usage-query-hint">
            Tip: use filters or click bars to filter days.
          </span>
        </div>
        ${h.length>0?r`
                <div class="usage-query-chips">
                  ${h.map(I=>{const D=I.raw;return r`
                      <span class="usage-query-chip">
                        ${D}
                        <button
                          title="Remove filter"
                          @click=${()=>e.onQueryDraftChange(xr(e.queryDraft,D))}
                        >
                          ×
                        </button>
                      </span>
                    `})}
                </div>
              `:f}
        ${p.length>0?r`
                <div class="usage-query-suggestions">
                  ${p.map(I=>r`
                      <button
                        class="usage-query-suggestion"
                        @click=${()=>e.onQueryDraftChange(Zb(e.queryDraft,I.value))}
                      >
                        ${I.label}
                      </button>
                    `)}
                </div>
              `:f}
        ${g.length>0?r`
                <div class="callout warning" style="margin-top: 8px;">
                  ${g.join(" · ")}
                </div>
              `:f}
      </div>

      ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:f}

      ${e.sessionsLimitReached?r`
              <div class="callout warning" style="margin-top: 12px">
                Showing first 1,000 sessions. Narrow date range for complete results.
              </div>
            `:f}
    </section>

    ${sy(E,F,ue,z,Bb(Z,e.timeZone),R,P)}

    ${Kb(Z,e.timeZone,e.selectedHours,e.onSelectHour)}

    <!-- Two-column layout: Daily+Breakdown on left, Sessions on right -->
    <div class="usage-grid">
      <div class="usage-grid-left">
        <div class="card usage-left-card">
          ${ty(K,e.selectedDays,e.chartMode,e.dailyChartMode,e.onDailyChartModeChange,e.onSelectDay)}
          ${E?ny(E,e.chartMode):f}
        </div>
      </div>
      <div class="usage-grid-right">
        ${iy(u,e.selectedSessions,e.selectedDays,t,e.sessionSort,e.sessionSortDir,e.recentSessions,e.sessionsTab,e.onSelectSession,e.onSessionSortChange,e.onSessionSortDirChange,e.onSessionsTabChange,e.visibleColumns,P,e.onClearSessions)}
      </div>
    </div>

    <!-- Session Detail Panel (when selected) or Empty State -->
    ${A?ry(A,e.timeSeries,e.timeSeriesLoading,e.timeSeriesMode,e.onTimeSeriesModeChange,e.timeSeriesBreakdownMode,e.onTimeSeriesBreakdownChange,e.startDate,e.endDate,e.selectedDays,e.sessionLogs,e.sessionLogsLoading,e.sessionLogsExpanded,e.onToggleSessionLogsExpanded,{roles:e.logFilterRoles,tools:e.logFilterTools,hasTools:e.logFilterHasTools,query:e.logFilterQuery},e.onLogFilterRolesChange,e.onLogFilterToolsChange,e.onLogFilterHasToolsChange,e.onLogFilterQueryChange,e.onLogFilterClear,e.contextExpanded,e.onToggleContextExpanded,e.onClearSessions):oy()}
  `}let ii=null;const kr=e=>{ii&&clearTimeout(ii),ii=window.setTimeout(()=>{Il(e)},400)},gy=/^data:/i,py=/^https?:\/\//i;function hy(e){const t=e.agentsList?.agents??[],s=Fr(e.sessionKey)?.agentId??e.agentsList?.defaultId??"main",o=t.find(l=>l.id===s)?.identity,a=o?.avatarUrl??o?.avatar;if(a)return gy.test(a)||py.test(a)?a:o?.avatarUrl}function fy(e){const t=(d,m)=>W(e.uiLocale,d,m);if(e.showOnboardingWizard){const d={step:e.onboardingStep,locale:e.onboardingLocale,loginStatus:e.onboardingLoginStatus,loginDisplayName:e.onboardingLoginDisplayName,loginAvatarUrl:e.onboardingLoginAvatarUrl,loginEmail:e.onboardingLoginEmail,loginError:e.onboardingLoginError,isExistingAccount:e.onboardingIsExistingAccount,selectedProvider:e.onboardingSelectedProvider,providerApiKey:e.onboardingProviderApiKey,providerSearchQuery:e.onboardingProviderSearchQuery,selectedChannel:e.onboardingSelectedChannel,channelToken:e.onboardingChannelToken,onLocaleChange:m=>e.setOnboardingLocale(m),onProviderSelect:m=>e.setOnboardingProvider(m),onProviderApiKeyChange:m=>e.setOnboardingProviderApiKey(m),onProviderSearchChange:m=>e.setOnboardingProviderSearchQuery(m),onChannelSelect:m=>e.setOnboardingChannel(m),onChannelTokenChange:m=>e.setOnboardingChannelToken(m),onGoogleLogin:()=>e.onboardingGoogleLogin(),onGithubLogin:()=>e.onboardingGithubLogin(),onLogout:()=>e.onboardingLogout(),onNext:()=>{if(e.onboardingStep===1&&e.onboardingIsExistingAccount&&e.onboardingLoginStatus==="success"){e.finishOnboarding();return}const m=Math.min(e.onboardingStep+1,5);e.setOnboardingStep(m)},onBack:()=>{const m=Math.max(e.onboardingStep-1,1);e.setOnboardingStep(m)},onSkip:()=>{e.onboardingStep===3?e.setOnboardingProvider(null):e.onboardingStep===4&&e.setOnboardingChannel(null);const m=Math.min(e.onboardingStep+1,5);e.setOnboardingStep(m)},onFinish:()=>e.finishOnboarding()};return db(d)}const n=e.presenceEntries.length,s=e.sessionsResult?.count??null,i=e.cronStatus?.nextWakeAtMs??null,o=e.connected?null:t("Disconnected from gateway.","与网关断开连接。"),a=e.tab==="chat",l=a&&(e.settings.chatFocusMode||e.onboarding),c=e.onboarding?!1:e.settings.chatShowThinking,u=hy(e),g=e.chatAvatarUrl??u??null,p=e.configForm??e.configSnapshot?.config,h=vn(e.basePath??""),v=e.agentsSelectedId??e.agentsList?.defaultId??e.agentsList?.agents?.[0]?.id??null;return r`
    <div class="shell ${a?"shell--chat":""} ${l?"shell--chat-focus":""} ${e.settings.navCollapsed?"shell--nav-collapsed":""} ${e.onboarding?"shell--onboarding":""}">
      <header class="topbar">
        <div class="topbar-left">
          <button
            class="nav-collapse-toggle"
            @click=${()=>e.applySettings({...e.settings,navCollapsed:!e.settings.navCollapsed})}
            title="${e.settings.navCollapsed?t("Expand sidebar","展开侧栏"):t("Collapse sidebar","收起侧栏")}"
            aria-label="${e.settings.navCollapsed?t("Expand sidebar","展开侧栏"):t("Collapse sidebar","收起侧栏")}"
          >
            <span class="nav-collapse-toggle__icon">${X.menu}</span>
          </button>
          <div class="brand">
            <div class="brand-logo">
              <img src=${h?`${h}/logo.jpg`:"/logo.jpg"} alt="OpenSoul" style="border-radius:50%;" />
            </div>
            <div class="brand-text">
              <div class="brand-title">OPENSOUL</div>
              <div class="brand-sub">${t("Gateway Dashboard","网关控制台")}</div>
            </div>
          </div>
        </div>
        <div class="topbar-status">
          <div class="pill">
            <span class="statusDot ${e.connected?"ok":""}"></span>
            <span>${t("Health","状态")}</span>
            <span class="mono">${e.connected?t("OK","正常"):t("Offline","离线")}</span>
          </div>
          ${f}
        </div>
      </header>
      <aside class="nav ${e.settings.navCollapsed?"nav--collapsed":""}">
        ${zu.map(d=>{const m=e.settings.navGroupsCollapsed[d.label]??!1,y=e.settings.navCollapsed?!1:m,C=ju(d.label,e.uiLocale);return r`
            <div class="nav-group ${y?"nav-group--collapsed":""}">
              <button
                class="nav-label"
                @click=${()=>{const b={...e.settings.navGroupsCollapsed};b[d.label]=!m,e.applySettings({...e.settings,navGroupsCollapsed:b})}}
                aria-expanded=${!y}
              >
                <span class="nav-label__text">${C}</span>
                <span class="nav-label__chevron">${y?"+":"-"}</span>
              </button>
              <div class="nav-group__items">
                ${d.tabs.map(b=>dp(e,b))}
              </div>
            </div>
          `})}
        <div class="nav-bottom">
          <button
            class="nav-settings-btn"
            @click=${()=>e.openSettings()}
            title=${t("Settings","设置")}
          >
            <span class="nav-settings-btn__icon">${X.settings}</span>
            <span class="nav-settings-btn__text">${t("Settings","设置")}</span>
          </button>
        </div>
      </aside>
      <main class="content ${a?"content--chat":""}">
        <section class="content-header">
          <div>
            ${e.tab==="usage"?f:r`<div class="page-title">${ro(e.tab,e.uiLocale)}</div>`}
            ${e.tab==="usage"?f:r`<div class="page-sub">${Wu(e.tab,e.uiLocale)}</div>`}
          </div>
          <div class="page-meta">
            ${e.lastError?r`<div class="pill danger">${e.lastError}</div>`:f}
            ${a?up(e):f}
          </div>
        </section>

        ${e.tab==="overview"?ub({locale:e.uiLocale,connected:e.connected,hello:e.hello,settings:e.settings,password:e.password,lastError:e.lastError,presenceCount:n,sessionsCount:s,cronEnabled:e.cronStatus?.enabled??null,cronNext:i,lastChannelsRefresh:e.channelsLastSuccess,onSettingsChange:d=>e.applySettings(d),onPasswordChange:d=>e.password=d,onSessionKeyChange:d=>{e.sessionKey=d,e.chatMessage="",e.resetToolStream(),e.applySettings({...e.settings,sessionKey:d,lastActiveSessionKey:d}),e.loadAssistantIdentity()},onConnect:()=>e.connect(),onRefresh:()=>e.loadOverview(),onNavigate:d=>e.setTab(d)}):f}

        ${e.tab==="channels"?Uh({connected:e.connected,loading:e.channelsLoading,snapshot:e.channelsSnapshot,lastError:e.channelsError,lastSuccessAt:e.channelsLastSuccess,whatsappMessage:e.whatsappLoginMessage,whatsappQrDataUrl:e.whatsappLoginQrDataUrl,whatsappConnected:e.whatsappLoginConnected,whatsappBusy:e.whatsappBusy,configSchema:e.configSchema,configSchemaLoading:e.configSchemaLoading,configForm:e.configForm,configUiHints:e.configUiHints,configSaving:e.configSaving,configFormDirty:e.configFormDirty,nostrProfileFormState:e.nostrProfileFormState,nostrProfileAccountId:e.nostrProfileAccountId,onRefresh:d=>$e(e,d),onWhatsAppStart:d=>e.handleWhatsAppStart(d),onWhatsAppWait:()=>e.handleWhatsAppWait(),onWhatsAppLogout:()=>e.handleWhatsAppLogout(),onConfigPatch:(d,m)=>ke(e,d,m),onConfigSave:()=>e.handleChannelConfigSave(),onConfigReload:()=>e.handleChannelConfigReload(),onNostrProfileEdit:(d,m)=>e.handleNostrProfileEdit(d,m),onNostrProfileCancel:()=>e.handleNostrProfileCancel(),onNostrProfileFieldChange:(d,m)=>e.handleNostrProfileFieldChange(d,m),onNostrProfileSave:()=>e.handleNostrProfileSave(),onNostrProfileImport:()=>e.handleNostrProfileImport(),onNostrProfileToggleAdvanced:()=>e.handleNostrProfileToggleAdvanced()}):f}

        ${e.tab==="instances"?$m({loading:e.presenceLoading,entries:e.presenceEntries,lastError:e.presenceError,statusMessage:e.presenceStatus,onRefresh:()=>oo(e)}):f}

        ${e.tab==="sessions"?$b({loading:e.sessionsLoading,result:e.sessionsResult,error:e.sessionsError,activeMinutes:e.sessionsFilterActive,limit:e.sessionsFilterLimit,includeGlobal:e.sessionsIncludeGlobal,includeUnknown:e.sessionsIncludeUnknown,basePath:e.basePath,onFiltersChange:d=>{e.sessionsFilterActive=d.activeMinutes,e.sessionsFilterLimit=d.limit,e.sessionsIncludeGlobal=d.includeGlobal,e.sessionsIncludeUnknown=d.includeUnknown},onRefresh:()=>wt(e),onPatch:(d,m)=>mu(e,d,m),onDelete:d=>bu(e,d)}):f}

        ${e.tab==="usage"?uy({loading:e.usageLoading,error:e.usageError,startDate:e.usageStartDate,endDate:e.usageEndDate,sessions:e.usageResult?.sessions??[],sessionsLimitReached:(e.usageResult?.sessions?.length??0)>=1e3,totals:e.usageResult?.totals??null,aggregates:e.usageResult?.aggregates??null,costDaily:e.usageCostSummary?.daily??[],selectedSessions:e.usageSelectedSessions,selectedDays:e.usageSelectedDays,selectedHours:e.usageSelectedHours,chartMode:e.usageChartMode,dailyChartMode:e.usageDailyChartMode,timeSeriesMode:e.usageTimeSeriesMode,timeSeriesBreakdownMode:e.usageTimeSeriesBreakdownMode,timeSeries:e.usageTimeSeries,timeSeriesLoading:e.usageTimeSeriesLoading,sessionLogs:e.usageSessionLogs,sessionLogsLoading:e.usageSessionLogsLoading,sessionLogsExpanded:e.usageSessionLogsExpanded,logFilterRoles:e.usageLogFilterRoles,logFilterTools:e.usageLogFilterTools,logFilterHasTools:e.usageLogFilterHasTools,logFilterQuery:e.usageLogFilterQuery,query:e.usageQuery,queryDraft:e.usageQueryDraft,sessionSort:e.usageSessionSort,sessionSortDir:e.usageSessionSortDir,recentSessions:e.usageRecentSessions,sessionsTab:e.usageSessionsTab,visibleColumns:e.usageVisibleColumns,timeZone:e.usageTimeZone,contextExpanded:e.usageContextExpanded,headerPinned:e.usageHeaderPinned,onStartDateChange:d=>{e.usageStartDate=d,e.usageSelectedDays=[],e.usageSelectedHours=[],e.usageSelectedSessions=[],kr(e)},onEndDateChange:d=>{e.usageEndDate=d,e.usageSelectedDays=[],e.usageSelectedHours=[],e.usageSelectedSessions=[],kr(e)},onRefresh:()=>Il(e),onTimeZoneChange:d=>{e.usageTimeZone=d},onToggleContextExpanded:()=>{e.usageContextExpanded=!e.usageContextExpanded},onToggleSessionLogsExpanded:()=>{e.usageSessionLogsExpanded=!e.usageSessionLogsExpanded},onLogFilterRolesChange:d=>{e.usageLogFilterRoles=d},onLogFilterToolsChange:d=>{e.usageLogFilterTools=d},onLogFilterHasToolsChange:d=>{e.usageLogFilterHasTools=d},onLogFilterQueryChange:d=>{e.usageLogFilterQuery=d},onLogFilterClear:()=>{e.usageLogFilterRoles=[],e.usageLogFilterTools=[],e.usageLogFilterHasTools=!1,e.usageLogFilterQuery=""},onToggleHeaderPinned:()=>{e.usageHeaderPinned=!e.usageHeaderPinned},onSelectHour:(d,m)=>{if(m&&e.usageSelectedHours.length>0){const y=Array.from({length:24},(A,T)=>T),C=e.usageSelectedHours[e.usageSelectedHours.length-1],b=y.indexOf(C),S=y.indexOf(d);if(b!==-1&&S!==-1){const[A,T]=b<S?[b,S]:[S,b],M=y.slice(A,T+1);e.usageSelectedHours=[...new Set([...e.usageSelectedHours,...M])]}}else e.usageSelectedHours.includes(d)?e.usageSelectedHours=e.usageSelectedHours.filter(y=>y!==d):e.usageSelectedHours=[...e.usageSelectedHours,d]},onQueryDraftChange:d=>{e.usageQueryDraft=d,e.usageQueryDebounceTimer&&window.clearTimeout(e.usageQueryDebounceTimer),e.usageQueryDebounceTimer=window.setTimeout(()=>{e.usageQuery=e.usageQueryDraft,e.usageQueryDebounceTimer=null},250)},onApplyQuery:()=>{e.usageQueryDebounceTimer&&(window.clearTimeout(e.usageQueryDebounceTimer),e.usageQueryDebounceTimer=null),e.usageQuery=e.usageQueryDraft},onClearQuery:()=>{e.usageQueryDebounceTimer&&(window.clearTimeout(e.usageQueryDebounceTimer),e.usageQueryDebounceTimer=null),e.usageQueryDraft="",e.usageQuery=""},onSessionSortChange:d=>{e.usageSessionSort=d},onSessionSortDirChange:d=>{e.usageSessionSortDir=d},onSessionsTabChange:d=>{e.usageSessionsTab=d},onToggleColumn:d=>{e.usageVisibleColumns.includes(d)?e.usageVisibleColumns=e.usageVisibleColumns.filter(m=>m!==d):e.usageVisibleColumns=[...e.usageVisibleColumns,d]},onSelectSession:(d,m)=>{if(e.usageTimeSeries=null,e.usageSessionLogs=null,e.usageRecentSessions=[d,...e.usageRecentSessions.filter(y=>y!==d)].slice(0,8),m&&e.usageSelectedSessions.length>0){const y=e.usageChartMode==="tokens",b=[...e.usageResult?.sessions??[]].toSorted((M,E)=>{const R=y?M.usage?.totalTokens??0:M.usage?.totalCost??0;return(y?E.usage?.totalTokens??0:E.usage?.totalCost??0)-R}).map(M=>M.key),S=e.usageSelectedSessions[e.usageSelectedSessions.length-1],A=b.indexOf(S),T=b.indexOf(d);if(A!==-1&&T!==-1){const[M,E]=A<T?[A,T]:[T,A],R=b.slice(M,E+1),P=[...new Set([...e.usageSelectedSessions,...R])];e.usageSelectedSessions=P}}else e.usageSelectedSessions.length===1&&e.usageSelectedSessions[0]===d?e.usageSelectedSessions=[]:e.usageSelectedSessions=[d];e.usageSelectedSessions.length===1&&($p(e,e.usageSelectedSessions[0]),wp(e,e.usageSelectedSessions[0]))},onSelectDay:(d,m)=>{if(m&&e.usageSelectedDays.length>0){const y=(e.usageCostSummary?.daily??[]).map(A=>A.date),C=e.usageSelectedDays[e.usageSelectedDays.length-1],b=y.indexOf(C),S=y.indexOf(d);if(b!==-1&&S!==-1){const[A,T]=b<S?[b,S]:[S,b],M=y.slice(A,T+1),E=[...new Set([...e.usageSelectedDays,...M])];e.usageSelectedDays=E}}else e.usageSelectedDays.includes(d)?e.usageSelectedDays=e.usageSelectedDays.filter(y=>y!==d):e.usageSelectedDays=[d]},onChartModeChange:d=>{e.usageChartMode=d},onDailyChartModeChange:d=>{e.usageDailyChartMode=d},onTimeSeriesModeChange:d=>{e.usageTimeSeriesMode=d},onTimeSeriesBreakdownChange:d=>{e.usageTimeSeriesBreakdownMode=d},onClearDays:()=>{e.usageSelectedDays=[]},onClearHours:()=>{e.usageSelectedHours=[]},onClearSessions:()=>{e.usageSelectedSessions=[],e.usageTimeSeries=null,e.usageSessionLogs=null},onClearFilters:()=>{e.usageSelectedDays=[],e.usageSelectedHours=[],e.usageSelectedSessions=[],e.usageTimeSeries=null,e.usageSessionLogs=null}}):f}

        ${e.tab==="cron"?um({basePath:e.basePath,loading:e.cronLoading,status:e.cronStatus,jobs:e.cronJobs,error:e.cronError,busy:e.cronBusy,form:e.cronForm,channels:e.channelsSnapshot?.channelMeta?.length?e.channelsSnapshot.channelMeta.map(d=>d.id):e.channelsSnapshot?.channelOrder??[],channelLabels:e.channelsSnapshot?.channelLabels??{},channelMeta:e.channelsSnapshot?.channelMeta??[],runsJobId:e.cronRunsJobId,runs:e.cronRuns,onFormChange:d=>e.cronForm={...e.cronForm,...d},onRefresh:()=>e.loadCron(),onAdd:()=>Ed(e),onToggle:(d,m)=>Id(e,d,m),onRun:d=>Md(e,d),onRemove:d=>Rd(e,d),onLoadRuns:d=>Hr(e,d)}):f}

        ${e.tab==="agents"?Kp({loading:e.agentsLoading,error:e.agentsError,agentsList:e.agentsList,selectedAgentId:v,activePanel:e.agentsPanel,configForm:p,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,channelsLoading:e.channelsLoading,channelsError:e.channelsError,channelsSnapshot:e.channelsSnapshot,channelsLastSuccess:e.channelsLastSuccess,cronLoading:e.cronLoading,cronStatus:e.cronStatus,cronJobs:e.cronJobs,cronError:e.cronError,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFilesList:e.agentFilesList,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,agentIdentityLoading:e.agentIdentityLoading,agentIdentityError:e.agentIdentityError,agentIdentityById:e.agentIdentityById,agentSkillsLoading:e.agentSkillsLoading,agentSkillsReport:e.agentSkillsReport,agentSkillsError:e.agentSkillsError,agentSkillsAgentId:e.agentSkillsAgentId,skillsFilter:e.skillsFilter,onRefresh:async()=>{await Qi(e);const d=e.agentsList?.agents?.map(m=>m.id)??[];d.length>0&&Ur(e,d)},onSelectAgent:d=>{e.agentsSelectedId!==d&&(e.agentsSelectedId=d,e.agentFilesList=null,e.agentFilesError=null,e.agentFilesLoading=!1,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},e.agentSkillsReport=null,e.agentSkillsError=null,e.agentSkillsAgentId=null,Br(e,d),e.agentsPanel==="files"&&Ws(e,d),e.agentsPanel==="skills"&&Un(e,d))},onSelectPanel:d=>{e.agentsPanel=d,d==="files"&&v&&e.agentFilesList?.agentId!==v&&(e.agentFilesList=null,e.agentFilesError=null,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},Ws(e,v)),d==="skills"&&v&&Un(e,v),d==="channels"&&$e(e,!1),d==="cron"&&e.loadCron()},onLoadFiles:d=>Ws(e,d),onSelectFile:d=>{e.agentFileActive=d,v&&yp(e,v,d)},onFileDraftChange:(d,m)=>{e.agentFileDrafts={...e.agentFileDrafts,[d]:m}},onFileReset:d=>{const m=e.agentFileContents[d]??"";e.agentFileDrafts={...e.agentFileDrafts,[d]:m}},onFileSave:d=>{if(!v)return;const m=e.agentFileDrafts[d]??e.agentFileContents[d]??"";xp(e,v,d,m)},onToolsProfileChange:(d,m,y)=>{if(!p)return;const C=p.agents?.list;if(!Array.isArray(C))return;const b=C.findIndex(A=>A&&typeof A=="object"&&"id"in A&&A.id===d);if(b<0)return;const S=["agents","list",b,"tools"];m?ke(e,[...S,"profile"],m):je(e,[...S,"profile"]),y&&je(e,[...S,"allow"])},onToolsOverridesChange:(d,m,y)=>{if(!p)return;const C=p.agents?.list;if(!Array.isArray(C))return;const b=C.findIndex(A=>A&&typeof A=="object"&&"id"in A&&A.id===d);if(b<0)return;const S=["agents","list",b,"tools"];m.length>0?ke(e,[...S,"alsoAllow"],m):je(e,[...S,"alsoAllow"]),y.length>0?ke(e,[...S,"deny"],y):je(e,[...S,"deny"])},onConfigReload:()=>Se(e),onConfigSave:()=>Bn(e),onChannelsRefresh:()=>$e(e,!1),onCronRefresh:()=>e.loadCron(),onSkillsFilterChange:d=>e.skillsFilter=d,onSkillsRefresh:()=>{v&&Un(e,v)},onAgentSkillToggle:(d,m,y)=>{if(!p)return;const C=p.agents?.list;if(!Array.isArray(C))return;const b=C.findIndex(P=>P&&typeof P=="object"&&"id"in P&&P.id===d);if(b<0)return;const S=C[b],A=m.trim();if(!A)return;const T=e.agentSkillsReport?.skills?.map(P=>P.name).filter(Boolean)??[],E=(Array.isArray(S.skills)?S.skills.map(P=>String(P).trim()).filter(Boolean):void 0)??T,R=new Set(E);y?R.add(A):R.delete(A),ke(e,["agents","list",b,"skills"],[...R])},onAgentSkillsClear:d=>{if(!p)return;const m=p.agents?.list;if(!Array.isArray(m))return;const y=m.findIndex(C=>C&&typeof C=="object"&&"id"in C&&C.id===d);y<0||je(e,["agents","list",y,"skills"])},onAgentSkillsDisableAll:d=>{if(!p)return;const m=p.agents?.list;if(!Array.isArray(m))return;const y=m.findIndex(C=>C&&typeof C=="object"&&"id"in C&&C.id===d);y<0||ke(e,["agents","list",y,"skills"],[])},onModelChange:(d,m)=>{if(!p)return;const y=p.agents?.list;if(!Array.isArray(y))return;const C=y.findIndex(T=>T&&typeof T=="object"&&"id"in T&&T.id===d);if(C<0)return;const b=["agents","list",C,"model"];if(!m){je(e,b);return}const A=y[C]?.model;if(A&&typeof A=="object"&&!Array.isArray(A)){const T=A.fallbacks,M={primary:m,...Array.isArray(T)?{fallbacks:T}:{}};ke(e,b,M)}else ke(e,b,m)},onModelFallbacksChange:(d,m)=>{if(!p)return;const y=p.agents?.list;if(!Array.isArray(y))return;const C=y.findIndex(P=>P&&typeof P=="object"&&"id"in P&&P.id===d);if(C<0)return;const b=["agents","list",C,"model"],S=y[C],A=m.map(P=>P.trim()).filter(Boolean),T=S.model,E=(()=>{if(typeof T=="string")return T.trim()||null;if(T&&typeof T=="object"&&!Array.isArray(T)){const P=T.primary;if(typeof P=="string")return P.trim()||null}return null})();if(A.length===0){E?ke(e,b,E):je(e,b);return}ke(e,b,E?{primary:E,fallbacks:A}:{fallbacks:A})}}):f}

        ${e.tab==="skills"?Tb({loading:e.skillsLoading,report:e.skillsReport,error:e.skillsError,filter:e.skillsFilter,edits:e.skillEdits,messages:e.skillMessages,busyKey:e.skillsBusyKey,onFilterChange:d=>e.skillsFilter=d,onRefresh:()=>fn(e,{clearMessages:!0}),onToggle:(d,m)=>xu(e,d,m),onEdit:(d,m)=>yu(e,d,m),onSaveKey:d=>$u(e,d),onInstall:(d,m,y)=>wu(e,d,m,y)}):f}

        ${e.tab==="nodes"?Cm({loading:e.nodesLoading,nodes:e.nodes,devicesLoading:e.devicesLoading,devicesError:e.devicesError,devicesList:e.devicesList,configForm:e.configForm??e.configSnapshot?.config,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,configFormMode:e.configFormMode,execApprovalsLoading:e.execApprovalsLoading,execApprovalsSaving:e.execApprovalsSaving,execApprovalsDirty:e.execApprovalsDirty,execApprovalsSnapshot:e.execApprovalsSnapshot,execApprovalsForm:e.execApprovalsForm,execApprovalsSelectedAgent:e.execApprovalsSelectedAgent,execApprovalsTarget:e.execApprovalsTarget,execApprovalsTargetNodeId:e.execApprovalsTargetNodeId,onRefresh:()=>ls(e),onDevicesRefresh:()=>tt(e),onDeviceApprove:d=>ru(e,d),onDeviceReject:d=>lu(e,d),onDeviceRotate:(d,m,y)=>cu(e,{deviceId:d,role:m,scopes:y}),onDeviceRevoke:(d,m)=>du(e,{deviceId:d,role:m}),onLoadConfig:()=>Se(e),onLoadExecApprovals:()=>{const d=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return io(e,d)},onBindDefault:d=>{d?ke(e,["tools","exec","node"],d):je(e,["tools","exec","node"])},onBindAgent:(d,m)=>{const y=["agents","list",d,"tools","exec","node"];m?ke(e,y,m):je(e,y)},onSaveBindings:()=>Bn(e),onExecApprovalsTargetChange:(d,m)=>{e.execApprovalsTarget=d,e.execApprovalsTargetNodeId=m,e.execApprovalsSnapshot=null,e.execApprovalsForm=null,e.execApprovalsDirty=!1,e.execApprovalsSelectedAgent=null},onExecApprovalsSelectAgent:d=>{e.execApprovalsSelectedAgent=d},onExecApprovalsPatch:(d,m)=>fu(e,d,m),onExecApprovalsRemove:d=>vu(e,d),onSaveExecApprovals:()=>{const d=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return hu(e,d)}}):f}

        ${e.tab==="chat"?nm({locale:e.uiLocale,sessionKey:e.sessionKey,onSessionKeyChange:d=>{e.sessionKey=d,e.chatMessage="",e.chatAttachments=[],e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.chatQueue=[],e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:d,lastActiveSessionKey:d}),e.loadAssistantIdentity(),un(e),yi(e)},thinkingLevel:e.chatThinkingLevel,showThinking:c,loading:e.chatLoading,sending:e.chatSending,compactionStatus:e.compactionStatus,assistantAvatarUrl:g,messages:e.chatMessages,toolMessages:e.chatToolMessages,stream:e.chatStream,streamStartedAt:e.chatStreamStartedAt,draft:e.chatMessage,queue:e.chatQueue,connected:e.connected,canSend:e.connected,disabledReason:o,error:e.lastError,sessions:e.sessionsResult,focusMode:l,onRefresh:()=>(e.resetToolStream(),Promise.all([un(e),yi(e)])),onToggleFocusMode:()=>{e.onboarding||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})},onChatScroll:d=>e.handleChatScroll(d),onDraftChange:d=>e.chatMessage=d,attachments:e.chatAttachments,onAttachmentsChange:d=>e.chatAttachments=d,onSend:()=>e.handleSendChat(),canAbort:!!e.chatRunId,onAbort:()=>{e.handleAbortChat()},onQueueRemove:d=>e.removeQueuedMessage(d),onNewSession:()=>e.handleSendChat("/new",{restoreDraft:!0}),showNewMessages:e.chatNewMessagesBelow&&!e.chatManualRefreshInFlight,onScrollToBottom:()=>e.scrollToBottom(),sidebarOpen:e.sidebarOpen,sidebarContent:e.sidebarContent,sidebarError:e.sidebarError,splitRatio:e.splitRatio,onOpenSidebar:d=>e.handleOpenSidebar(d),onCloseSidebar:()=>e.handleCloseSidebar(),onSplitRatioChange:d=>e.handleSplitRatioChange(d),assistantName:e.assistantName,assistantAvatar:e.assistantAvatar}):f}

      </main>

      ${Ab(e,{config:lm({locale:e.uiLocale,raw:e.configRaw,originalRaw:e.configRawOriginal,valid:e.configValid,issues:e.configIssues,loading:e.configLoading,saving:e.configSaving,applying:e.configApplying,updating:e.updateRunning,connected:e.connected,schema:e.configSchema,schemaLoading:e.configSchemaLoading,uiHints:e.configUiHints,formMode:e.configFormMode,formValue:e.configForm,originalValue:e.configFormOriginal,searchQuery:e.configSearchQuery,activeSection:e.configActiveSection,activeSubsection:e.configActiveSubsection,onRawChange:d=>{e.configRaw=d},onFormModeChange:d=>e.configFormMode=d,onFormPatch:(d,m)=>ke(e,d,m),onSearchChange:d=>e.configSearchQuery=d,onSectionChange:d=>{e.configActiveSection=d,e.configActiveSubsection=null},onSubsectionChange:d=>e.configActiveSubsection=d,onReload:()=>Se(e),onSave:()=>Bn(e),onApply:()=>Yc(e),onUpdate:()=>Zc(e)}),logs:Am({loading:e.logsLoading,error:e.logsError,file:e.logsFile,entries:e.logsEntries,filterText:e.logsFilterText,levelFilters:e.logsLevelFilters,autoFollow:e.logsAutoFollow,truncated:e.logsTruncated,onFilterTextChange:d=>e.logsFilterText=d,onLevelToggle:(d,m)=>{e.logsLevelFilters={...e.logsLevelFilters,[d]:m}},onToggleAutoFollow:d=>e.logsAutoFollow=d,onRefresh:()=>rn(e,{reset:!0}),onExport:(d,m)=>e.exportLogs(d,m),onScroll:d=>e.handleLogsScroll(d)}),debug:mm({loading:e.debugLoading,status:e.debugStatus,health:e.debugHealth,models:e.debugModels,heartbeat:e.debugHeartbeat,eventLog:e.eventLog,callMethod:e.debugCallMethod,callParams:e.debugCallParams,callResult:e.debugCallResult,callError:e.debugCallError,onCallMethodChange:d=>e.debugCallMethod=d,onCallParamsChange:d=>e.debugCallParams=d,onRefresh:()=>Dt(e),onCall:()=>md(e)})})}
      ${ym(e)}
      ${xm(e)}
    </div>
  `}var vy=Object.defineProperty,my=Object.getOwnPropertyDescriptor,w=(e,t,n,s)=>{for(var i=s>1?void 0:s?my(t,n):t,o=e.length-1,a;o>=0;o--)(a=e[o])&&(i=(s?a(t,n,i):a(i))||i);return s&&i&&vy(t,n,i),i};const oi=zg();function by(){if(!window.location.search)return!1;const t=new URLSearchParams(window.location.search).get("onboarding");if(!t)return!1;const n=t.trim().toLowerCase();return n==="1"||n==="true"||n==="yes"||n==="on"}let $=class extends Mt{constructor(){super(...arguments),this.initialLocale=cl(),this.settings=Gu(),this.password="",this.tab="chat",this.onboarding=by(),this.uiLocale=this.initialLocale,this.connected=!1,this.theme=this.settings.theme??"system",this.themeResolved="dark",this.hello=null,this.lastError=null,this.eventLog=[],this.eventLogBuffer=[],this.toolStreamSyncTimer=null,this.sidebarCloseTimer=null,this.assistantName=oi.name,this.assistantAvatar=oi.avatar,this.assistantAgentId=oi.agentId??null,this.sessionKey=this.settings.sessionKey,this.chatLoading=!1,this.chatSending=!1,this.chatMessage="",this.chatMessages=[],this.chatToolMessages=[],this.chatStream=null,this.chatStreamStartedAt=null,this.chatRunId=null,this.compactionStatus=null,this.chatAvatarUrl=null,this.chatThinkingLevel=null,this.chatQueue=[],this.chatAttachments=[],this.chatManualRefreshInFlight=!1,this.sidebarOpen=!1,this.sidebarContent=null,this.sidebarError=null,this.splitRatio=this.settings.splitRatio,this.nodesLoading=!1,this.nodes=[],this.devicesLoading=!1,this.devicesError=null,this.devicesList=null,this.execApprovalsLoading=!1,this.execApprovalsSaving=!1,this.execApprovalsDirty=!1,this.execApprovalsSnapshot=null,this.execApprovalsForm=null,this.execApprovalsSelectedAgent=null,this.execApprovalsTarget="gateway",this.execApprovalsTargetNodeId=null,this.execApprovalQueue=[],this.execApprovalBusy=!1,this.execApprovalError=null,this.pendingGatewayUrl=null,this.configLoading=!1,this.configRaw=`{
}
`,this.configRawOriginal="",this.configValid=null,this.configIssues=[],this.configSaving=!1,this.configApplying=!1,this.updateRunning=!1,this.applySessionKey=this.settings.lastActiveSessionKey,this.configSnapshot=null,this.configSchema=null,this.configSchemaVersion=null,this.configSchemaLoading=!1,this.configUiHints={},this.configForm=null,this.configFormOriginal=null,this.configFormDirty=!1,this.configFormMode="form",this.configSearchQuery="",this.configActiveSection=null,this.configActiveSubsection=null,this.channelsLoading=!1,this.channelsSnapshot=null,this.channelsError=null,this.channelsLastSuccess=null,this.whatsappLoginMessage=null,this.whatsappLoginQrDataUrl=null,this.whatsappLoginConnected=null,this.whatsappBusy=!1,this.nostrProfileFormState=null,this.nostrProfileAccountId=null,this.presenceLoading=!1,this.presenceEntries=[],this.presenceError=null,this.presenceStatus=null,this.agentsLoading=!1,this.agentsList=null,this.agentsError=null,this.agentsSelectedId=null,this.agentsPanel="overview",this.agentFilesLoading=!1,this.agentFilesError=null,this.agentFilesList=null,this.agentFileContents={},this.agentFileDrafts={},this.agentFileActive=null,this.agentFileSaving=!1,this.agentIdentityLoading=!1,this.agentIdentityError=null,this.agentIdentityById={},this.agentSkillsLoading=!1,this.agentSkillsError=null,this.agentSkillsReport=null,this.agentSkillsAgentId=null,this.sessionsLoading=!1,this.sessionsResult=null,this.sessionsError=null,this.sessionsFilterActive="",this.sessionsFilterLimit="120",this.sessionsIncludeGlobal=!0,this.sessionsIncludeUnknown=!1,this.usageLoading=!1,this.usageResult=null,this.usageCostSummary=null,this.usageError=null,this.usageStartDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageEndDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageSelectedSessions=[],this.usageSelectedDays=[],this.usageSelectedHours=[],this.usageChartMode="tokens",this.usageDailyChartMode="by-type",this.usageTimeSeriesMode="per-turn",this.usageTimeSeriesBreakdownMode="by-type",this.usageTimeSeries=null,this.usageTimeSeriesLoading=!1,this.usageSessionLogs=null,this.usageSessionLogsLoading=!1,this.usageSessionLogsExpanded=!1,this.usageQuery="",this.usageQueryDraft="",this.usageSessionSort="recent",this.usageSessionSortDir="desc",this.usageRecentSessions=[],this.usageTimeZone="local",this.usageContextExpanded=!1,this.usageHeaderPinned=!1,this.usageSessionsTab="all",this.usageVisibleColumns=["channel","agent","provider","model","messages","tools","errors","duration"],this.usageLogFilterRoles=[],this.usageLogFilterTools=[],this.usageLogFilterHasTools=!1,this.usageLogFilterQuery="",this.usageQueryDebounceTimer=null,this.cronLoading=!1,this.cronJobs=[],this.cronStatus=null,this.cronError=null,this.cronForm={...Fg},this.cronRunsJobId=null,this.cronRuns=[],this.cronBusy=!1,this.skillsLoading=!1,this.skillsReport=null,this.skillsError=null,this.skillsFilter="",this.skillEdits={},this.skillsBusyKey=null,this.skillMessages={},this.debugLoading=!1,this.debugStatus=null,this.debugHealth=null,this.debugModels=[],this.debugHeartbeat=null,this.debugCallMethod="",this.debugCallParams="{}",this.debugCallResult=null,this.debugCallError=null,this.logsLoading=!1,this.logsError=null,this.logsFile=null,this.logsEntries=[],this.logsFilterText="",this.logsLevelFilters={...Ng},this.logsAutoFollow=!0,this.logsTruncated=!1,this.logsCursor=null,this.logsLastFetchAt=null,this.logsLimit=500,this.logsMaxBytes=25e4,this.logsAtBottom=!0,this.settingsOpen=!1,this.settingsSection="general",this.showOnboardingWizard=!0,this.onboardingStep=1,this.onboardingLocale=this.initialLocale,this.onboardingLoginStatus="idle",this.onboardingLoginDisplayName=null,this.onboardingLoginAvatarUrl=null,this.onboardingLoginEmail=null,this.onboardingLoginError=null,this.onboardingIsExistingAccount=!1,this.onboardingSelectedProvider=null,this.onboardingProviderApiKey="",this.onboardingProviderSearchQuery="",this.onboardingSelectedChannel=null,this.onboardingChannelToken="",this.client=null,this.chatScrollFrame=null,this.chatScrollTimeout=null,this.chatHasAutoScrolled=!1,this.chatUserNearBottom=!0,this.chatNewMessagesBelow=!1,this.nodesPollInterval=null,this.logsPollInterval=null,this.debugPollInterval=null,this.logsScrollFrame=null,this.toolStreamById=new Map,this.toolStreamOrder=[],this.refreshSessionsAfterChat=new Set,this.basePath="",this.popStateHandler=()=>sg(this),this.themeMedia=null,this.themeMediaHandler=null,this.topbarObserver=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),Os(this.uiLocale),ep(this)}firstUpdated(){tp(this)}disconnectedCallback(){np(this),super.disconnectedCallback()}updated(e){ip(this,e)}connect(){uo(this)}handleChatScroll(e){pd(this,e)}handleLogsScroll(e){hd(this,e)}exportLogs(e,t){fd(e,t)}resetToolStream(){fs(this)}resetChatScroll(){aa(this)}scrollToBottom(e){aa(this),pn(this,!0,!!e?.smooth)}async loadAssistantIdentity(){await Cl(this)}applySettings(e){qe(this,e)}setTab(e){fl(this,e)}setTheme(e,t){vi(this,e,t)}async loadOverview(){await bl(this)}async loadCron(){await Yn(this)}async handleAbortChat(){await wl(this)}removeQueuedMessage(e){Ig(this,e)}async handleSendChat(e,t){await Mg(this,e,t)}async handleWhatsAppStart(e){await td(this,e)}async handleWhatsAppWait(){await nd(this)}async handleWhatsAppLogout(){await sd(this)}async handleChannelConfigSave(){await id(this)}async handleChannelConfigReload(){await od(this)}handleNostrProfileEdit(e,t){rd(this,e,t)}handleNostrProfileCancel(){ld(this)}handleNostrProfileFieldChange(e,t){cd(this,e,t)}async handleNostrProfileSave(){await ud(this)}async handleNostrProfileImport(){await gd(this)}handleNostrProfileToggleAdvanced(){dd(this)}async handleExecApprovalDecision(e){const t=this.execApprovalQueue[0];if(!(!t||!this.client||this.execApprovalBusy)){this.execApprovalBusy=!0,this.execApprovalError=null;try{await this.client.request("exec.approval.resolve",{id:t.id,decision:e}),this.execApprovalQueue=this.execApprovalQueue.filter(n=>n.id!==t.id)}catch(n){this.execApprovalError=`Exec approval failed: ${String(n)}`}finally{this.execApprovalBusy=!1}}}handleGatewayUrlConfirm(){const e=this.pendingGatewayUrl;e&&(this.pendingGatewayUrl=null,qe(this,{...this.settings,gatewayUrl:e}),this.connect())}handleGatewayUrlCancel(){this.pendingGatewayUrl=null}openSettings(e){this.settingsSection=e??"general",this.settingsOpen=!0,e==="config"?(Wn(this),Se(this)):e==="logs"?(this.logsAtBottom=!0,rn(this,{reset:!0})):e==="debug"&&Dt(this)}closeSettings(){this.settingsOpen=!1}setSettingsSection(e){this.settingsSection=e,e==="config"?(Wn(this),Se(this)):e==="logs"?(this.logsAtBottom=!0,rn(this,{reset:!0})):e==="debug"&&Dt(this)}handleOpenSidebar(e){this.sidebarCloseTimer!=null&&(window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=null),this.sidebarContent=e,this.sidebarError=null,this.sidebarOpen=!0}handleCloseSidebar(){this.sidebarOpen=!1,this.sidebarCloseTimer!=null&&window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=window.setTimeout(()=>{this.sidebarOpen||(this.sidebarContent=null,this.sidebarError=null,this.sidebarCloseTimer=null)},200)}handleSplitRatioChange(e){const t=Math.max(.4,Math.min(.7,e));this.splitRatio=t,this.applySettings({...this.settings,splitRatio:t})}setOnboardingStep(e){this.onboardingStep=e}setUiLocale(e){const t=Qn(e);this.onboardingLocale=t,this.uiLocale=t,Os(t)}setOnboardingLocale(e){this.setUiLocale(e)}setOnboardingProvider(e){this.onboardingSelectedProvider=e,e||(this.onboardingProviderApiKey="")}setOnboardingProviderApiKey(e){this.onboardingProviderApiKey=e}setOnboardingProviderSearchQuery(e){this.onboardingProviderSearchQuery=e}setOnboardingChannel(e){this.onboardingSelectedChannel=e,e||(this.onboardingChannelToken="")}setOnboardingChannelToken(e){this.onboardingChannelToken=e}onboardingGoogleLogin(){this.onboardingLoginStatus="loading",this.onboardingLoginError=null,setTimeout(()=>{this.onboardingLoginStatus="success",this.onboardingLoginDisplayName="Google User",this.onboardingLoginEmail="user@gmail.com",this.onboardingLoginAvatarUrl=null,this.onboardingIsExistingAccount=!1},1200)}onboardingGithubLogin(){this.onboardingLoginStatus="loading",this.onboardingLoginError=null,setTimeout(()=>{this.onboardingLoginStatus="success",this.onboardingLoginDisplayName="GitHub User",this.onboardingLoginEmail="user@github.com",this.onboardingLoginAvatarUrl=null,this.onboardingIsExistingAccount=!1},1200)}onboardingLogout(){this.onboardingLoginStatus="idle",this.onboardingLoginDisplayName=null,this.onboardingLoginAvatarUrl=null,this.onboardingLoginEmail=null,this.onboardingLoginError=null,this.onboardingIsExistingAccount=!1}finishOnboarding(){this.uiLocale=this.onboardingLocale,Os(this.onboardingLocale),localStorage.setItem("opensoul.onboarding.done","1"),this.showOnboardingWizard=!1}render(){return fy(this)}};w([k()],$.prototype,"settings",2);w([k()],$.prototype,"password",2);w([k()],$.prototype,"tab",2);w([k()],$.prototype,"onboarding",2);w([k()],$.prototype,"uiLocale",2);w([k()],$.prototype,"connected",2);w([k()],$.prototype,"theme",2);w([k()],$.prototype,"themeResolved",2);w([k()],$.prototype,"hello",2);w([k()],$.prototype,"lastError",2);w([k()],$.prototype,"eventLog",2);w([k()],$.prototype,"assistantName",2);w([k()],$.prototype,"assistantAvatar",2);w([k()],$.prototype,"assistantAgentId",2);w([k()],$.prototype,"sessionKey",2);w([k()],$.prototype,"chatLoading",2);w([k()],$.prototype,"chatSending",2);w([k()],$.prototype,"chatMessage",2);w([k()],$.prototype,"chatMessages",2);w([k()],$.prototype,"chatToolMessages",2);w([k()],$.prototype,"chatStream",2);w([k()],$.prototype,"chatStreamStartedAt",2);w([k()],$.prototype,"chatRunId",2);w([k()],$.prototype,"compactionStatus",2);w([k()],$.prototype,"chatAvatarUrl",2);w([k()],$.prototype,"chatThinkingLevel",2);w([k()],$.prototype,"chatQueue",2);w([k()],$.prototype,"chatAttachments",2);w([k()],$.prototype,"chatManualRefreshInFlight",2);w([k()],$.prototype,"sidebarOpen",2);w([k()],$.prototype,"sidebarContent",2);w([k()],$.prototype,"sidebarError",2);w([k()],$.prototype,"splitRatio",2);w([k()],$.prototype,"nodesLoading",2);w([k()],$.prototype,"nodes",2);w([k()],$.prototype,"devicesLoading",2);w([k()],$.prototype,"devicesError",2);w([k()],$.prototype,"devicesList",2);w([k()],$.prototype,"execApprovalsLoading",2);w([k()],$.prototype,"execApprovalsSaving",2);w([k()],$.prototype,"execApprovalsDirty",2);w([k()],$.prototype,"execApprovalsSnapshot",2);w([k()],$.prototype,"execApprovalsForm",2);w([k()],$.prototype,"execApprovalsSelectedAgent",2);w([k()],$.prototype,"execApprovalsTarget",2);w([k()],$.prototype,"execApprovalsTargetNodeId",2);w([k()],$.prototype,"execApprovalQueue",2);w([k()],$.prototype,"execApprovalBusy",2);w([k()],$.prototype,"execApprovalError",2);w([k()],$.prototype,"pendingGatewayUrl",2);w([k()],$.prototype,"configLoading",2);w([k()],$.prototype,"configRaw",2);w([k()],$.prototype,"configRawOriginal",2);w([k()],$.prototype,"configValid",2);w([k()],$.prototype,"configIssues",2);w([k()],$.prototype,"configSaving",2);w([k()],$.prototype,"configApplying",2);w([k()],$.prototype,"updateRunning",2);w([k()],$.prototype,"applySessionKey",2);w([k()],$.prototype,"configSnapshot",2);w([k()],$.prototype,"configSchema",2);w([k()],$.prototype,"configSchemaVersion",2);w([k()],$.prototype,"configSchemaLoading",2);w([k()],$.prototype,"configUiHints",2);w([k()],$.prototype,"configForm",2);w([k()],$.prototype,"configFormOriginal",2);w([k()],$.prototype,"configFormDirty",2);w([k()],$.prototype,"configFormMode",2);w([k()],$.prototype,"configSearchQuery",2);w([k()],$.prototype,"configActiveSection",2);w([k()],$.prototype,"configActiveSubsection",2);w([k()],$.prototype,"channelsLoading",2);w([k()],$.prototype,"channelsSnapshot",2);w([k()],$.prototype,"channelsError",2);w([k()],$.prototype,"channelsLastSuccess",2);w([k()],$.prototype,"whatsappLoginMessage",2);w([k()],$.prototype,"whatsappLoginQrDataUrl",2);w([k()],$.prototype,"whatsappLoginConnected",2);w([k()],$.prototype,"whatsappBusy",2);w([k()],$.prototype,"nostrProfileFormState",2);w([k()],$.prototype,"nostrProfileAccountId",2);w([k()],$.prototype,"presenceLoading",2);w([k()],$.prototype,"presenceEntries",2);w([k()],$.prototype,"presenceError",2);w([k()],$.prototype,"presenceStatus",2);w([k()],$.prototype,"agentsLoading",2);w([k()],$.prototype,"agentsList",2);w([k()],$.prototype,"agentsError",2);w([k()],$.prototype,"agentsSelectedId",2);w([k()],$.prototype,"agentsPanel",2);w([k()],$.prototype,"agentFilesLoading",2);w([k()],$.prototype,"agentFilesError",2);w([k()],$.prototype,"agentFilesList",2);w([k()],$.prototype,"agentFileContents",2);w([k()],$.prototype,"agentFileDrafts",2);w([k()],$.prototype,"agentFileActive",2);w([k()],$.prototype,"agentFileSaving",2);w([k()],$.prototype,"agentIdentityLoading",2);w([k()],$.prototype,"agentIdentityError",2);w([k()],$.prototype,"agentIdentityById",2);w([k()],$.prototype,"agentSkillsLoading",2);w([k()],$.prototype,"agentSkillsError",2);w([k()],$.prototype,"agentSkillsReport",2);w([k()],$.prototype,"agentSkillsAgentId",2);w([k()],$.prototype,"sessionsLoading",2);w([k()],$.prototype,"sessionsResult",2);w([k()],$.prototype,"sessionsError",2);w([k()],$.prototype,"sessionsFilterActive",2);w([k()],$.prototype,"sessionsFilterLimit",2);w([k()],$.prototype,"sessionsIncludeGlobal",2);w([k()],$.prototype,"sessionsIncludeUnknown",2);w([k()],$.prototype,"usageLoading",2);w([k()],$.prototype,"usageResult",2);w([k()],$.prototype,"usageCostSummary",2);w([k()],$.prototype,"usageError",2);w([k()],$.prototype,"usageStartDate",2);w([k()],$.prototype,"usageEndDate",2);w([k()],$.prototype,"usageSelectedSessions",2);w([k()],$.prototype,"usageSelectedDays",2);w([k()],$.prototype,"usageSelectedHours",2);w([k()],$.prototype,"usageChartMode",2);w([k()],$.prototype,"usageDailyChartMode",2);w([k()],$.prototype,"usageTimeSeriesMode",2);w([k()],$.prototype,"usageTimeSeriesBreakdownMode",2);w([k()],$.prototype,"usageTimeSeries",2);w([k()],$.prototype,"usageTimeSeriesLoading",2);w([k()],$.prototype,"usageSessionLogs",2);w([k()],$.prototype,"usageSessionLogsLoading",2);w([k()],$.prototype,"usageSessionLogsExpanded",2);w([k()],$.prototype,"usageQuery",2);w([k()],$.prototype,"usageQueryDraft",2);w([k()],$.prototype,"usageSessionSort",2);w([k()],$.prototype,"usageSessionSortDir",2);w([k()],$.prototype,"usageRecentSessions",2);w([k()],$.prototype,"usageTimeZone",2);w([k()],$.prototype,"usageContextExpanded",2);w([k()],$.prototype,"usageHeaderPinned",2);w([k()],$.prototype,"usageSessionsTab",2);w([k()],$.prototype,"usageVisibleColumns",2);w([k()],$.prototype,"usageLogFilterRoles",2);w([k()],$.prototype,"usageLogFilterTools",2);w([k()],$.prototype,"usageLogFilterHasTools",2);w([k()],$.prototype,"usageLogFilterQuery",2);w([k()],$.prototype,"cronLoading",2);w([k()],$.prototype,"cronJobs",2);w([k()],$.prototype,"cronStatus",2);w([k()],$.prototype,"cronError",2);w([k()],$.prototype,"cronForm",2);w([k()],$.prototype,"cronRunsJobId",2);w([k()],$.prototype,"cronRuns",2);w([k()],$.prototype,"cronBusy",2);w([k()],$.prototype,"skillsLoading",2);w([k()],$.prototype,"skillsReport",2);w([k()],$.prototype,"skillsError",2);w([k()],$.prototype,"skillsFilter",2);w([k()],$.prototype,"skillEdits",2);w([k()],$.prototype,"skillsBusyKey",2);w([k()],$.prototype,"skillMessages",2);w([k()],$.prototype,"debugLoading",2);w([k()],$.prototype,"debugStatus",2);w([k()],$.prototype,"debugHealth",2);w([k()],$.prototype,"debugModels",2);w([k()],$.prototype,"debugHeartbeat",2);w([k()],$.prototype,"debugCallMethod",2);w([k()],$.prototype,"debugCallParams",2);w([k()],$.prototype,"debugCallResult",2);w([k()],$.prototype,"debugCallError",2);w([k()],$.prototype,"logsLoading",2);w([k()],$.prototype,"logsError",2);w([k()],$.prototype,"logsFile",2);w([k()],$.prototype,"logsEntries",2);w([k()],$.prototype,"logsFilterText",2);w([k()],$.prototype,"logsLevelFilters",2);w([k()],$.prototype,"logsAutoFollow",2);w([k()],$.prototype,"logsTruncated",2);w([k()],$.prototype,"logsCursor",2);w([k()],$.prototype,"logsLastFetchAt",2);w([k()],$.prototype,"logsLimit",2);w([k()],$.prototype,"logsMaxBytes",2);w([k()],$.prototype,"logsAtBottom",2);w([k()],$.prototype,"settingsOpen",2);w([k()],$.prototype,"settingsSection",2);w([k()],$.prototype,"showOnboardingWizard",2);w([k()],$.prototype,"onboardingStep",2);w([k()],$.prototype,"onboardingLocale",2);w([k()],$.prototype,"onboardingLoginStatus",2);w([k()],$.prototype,"onboardingLoginDisplayName",2);w([k()],$.prototype,"onboardingLoginAvatarUrl",2);w([k()],$.prototype,"onboardingLoginEmail",2);w([k()],$.prototype,"onboardingLoginError",2);w([k()],$.prototype,"onboardingIsExistingAccount",2);w([k()],$.prototype,"onboardingSelectedProvider",2);w([k()],$.prototype,"onboardingProviderApiKey",2);w([k()],$.prototype,"onboardingProviderSearchQuery",2);w([k()],$.prototype,"onboardingSelectedChannel",2);w([k()],$.prototype,"onboardingChannelToken",2);w([k()],$.prototype,"chatNewMessagesBelow",2);$=w([Mr("opensoul-app")],$);
//# sourceMappingURL=index-Cq6AW8CB.js.map
