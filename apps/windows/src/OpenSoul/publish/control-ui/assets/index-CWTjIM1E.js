(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();const Nn=globalThis,Pi=Nn.ShadowRoot&&(Nn.ShadyCSS===void 0||Nn.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Di=Symbol(),jo=new WeakMap;let yr=class{constructor(t,n,s){if(this._$cssResult$=!0,s!==Di)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(Pi&&t===void 0){const s=n!==void 0&&n.length===1;s&&(t=jo.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&jo.set(n,t))}return t}toString(){return this.cssText}};const fc=e=>new yr(typeof e=="string"?e:e+"",void 0,Di),vc=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((s,i,o)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new yr(n,e,Di)},mc=(e,t)=>{if(Pi)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const s=document.createElement("style"),i=Nn.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=n.cssText,e.appendChild(s)}},Wo=Pi?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const s of t.cssRules)n+=s.cssText;return fc(n)})(e):e;const{is:bc,defineProperty:yc,getOwnPropertyDescriptor:xc,getOwnPropertyNames:$c,getOwnPropertySymbols:wc,getPrototypeOf:kc}=Object,es=globalThis,Go=es.trustedTypes,Sc=Go?Go.emptyScript:"",Ac=es.reactiveElementPolyfillSupport,Yt=(e,t)=>e,zn={toAttribute(e,t){switch(t){case Boolean:e=e?Sc:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},Ni=(e,t)=>!bc(e,t),qo={attribute:!0,type:String,converter:zn,reflect:!1,useDefault:!1,hasChanged:Ni};Symbol.metadata??=Symbol("metadata"),es.litPropertyMetadata??=new WeakMap;let _t=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=qo){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,n);i!==void 0&&yc(this.prototype,t,i)}}static getPropertyDescriptor(t,n,s){const{get:i,set:o}=xc(this.prototype,t)??{get(){return this[n]},set(a){this[n]=a}};return{get:i,set(a){const l=i?.call(this);o?.call(this,a),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??qo}static _$Ei(){if(this.hasOwnProperty(Yt("elementProperties")))return;const t=kc(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Yt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Yt("properties"))){const n=this.properties,s=[...$c(n),...wc(n)];for(const i of s)this.createProperty(i,n[i])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[s,i]of n)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[n,s]of this.elementProperties){const i=this._$Eu(n,s);i!==void 0&&this._$Eh.set(i,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)n.unshift(Wo(i))}else t!==void 0&&n.push(Wo(t));return n}static _$Eu(t,n){const s=n.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const s of n.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return mc(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,n,s){this._$AK(t,s)}_$ET(t,n){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const o=(s.converter?.toAttribute!==void 0?s.converter:zn).toAttribute(n,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,n){const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const o=s.getPropertyOptions(i),a=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:zn;this._$Em=i;const l=a.fromAttribute(n,o.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(t,n,s,i=!1,o){if(t!==void 0){const a=this.constructor;if(i===!1&&(o=this[t]),s??=a.getPropertyOptions(t),!((s.hasChanged??Ni)(o,n)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,s))))return;this.C(t,n,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:s,reflect:i,wrapped:o},a){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??n??this[t]),o!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(n=void 0),this._$AL.set(t,n)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[i,o]of s){const{wrapped:a}=o,l=this[i];a!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,o,l)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(n)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(n)}willUpdate(t){}_$AE(t){this._$EO?.forEach(n=>n.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(n=>this._$ET(n,this[n])),this._$EM()}updated(t){}firstUpdated(t){}};_t.elementStyles=[],_t.shadowRootOptions={mode:"open"},_t[Yt("elementProperties")]=new Map,_t[Yt("finalized")]=new Map,Ac?.({ReactiveElement:_t}),(es.reactiveElementVersions??=[]).push("2.1.2");const Fi=globalThis,Vo=e=>e,Hn=Fi.trustedTypes,Qo=Hn?Hn.createPolicy("lit-html",{createHTML:e=>e}):void 0,xr="$lit$",Qe=`lit$${Math.random().toFixed(9).slice(2)}$`,$r="?"+Qe,Cc=`<${$r}>`,ht=document,nn=()=>ht.createComment(""),sn=e=>e===null||typeof e!="object"&&typeof e!="function",Oi=Array.isArray,Tc=e=>Oi(e)||typeof e?.[Symbol.iterator]=="function",_s=`[ 	
\f\r]`,Bt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Yo=/-->/g,Zo=/>/g,it=RegExp(`>|${_s}(?:([^\\s"'>=/]+)(${_s}*=${_s}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Jo=/'/g,Xo=/"/g,wr=/^(?:script|style|textarea|title)$/i,kr=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),r=kr(1),kn=kr(2),Ze=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),ea=new WeakMap,gt=ht.createTreeWalker(ht,129);function Sr(e,t){if(!Oi(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Qo!==void 0?Qo.createHTML(t):t}const _c=(e,t)=>{const n=e.length-1,s=[];let i,o=t===2?"<svg>":t===3?"<math>":"",a=Bt;for(let l=0;l<n;l++){const c=e[l];let u,g,p=-1,f=0;for(;f<c.length&&(a.lastIndex=f,g=a.exec(c),g!==null);)f=a.lastIndex,a===Bt?g[1]==="!--"?a=Yo:g[1]!==void 0?a=Zo:g[2]!==void 0?(wr.test(g[2])&&(i=RegExp("</"+g[2],"g")),a=it):g[3]!==void 0&&(a=it):a===it?g[0]===">"?(a=i??Bt,p=-1):g[1]===void 0?p=-2:(p=a.lastIndex-g[2].length,u=g[1],a=g[3]===void 0?it:g[3]==='"'?Xo:Jo):a===Xo||a===Jo?a=it:a===Yo||a===Zo?a=Bt:(a=it,i=void 0);const m=a===it&&e[l+1].startsWith("/>")?" ":"";o+=a===Bt?c+Cc:p>=0?(s.push(u),c.slice(0,p)+xr+c.slice(p)+Qe+m):c+Qe+(p===-2?l:m)}return[Sr(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};let ni=class Ar{constructor({strings:t,_$litType$:n},s){let i;this.parts=[];let o=0,a=0;const l=t.length-1,c=this.parts,[u,g]=_c(t,n);if(this.el=Ar.createElement(u,s),gt.currentNode=this.el.content,n===2||n===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=gt.nextNode())!==null&&c.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const p of i.getAttributeNames())if(p.endsWith(xr)){const f=g[a++],m=i.getAttribute(p).split(Qe),d=/([.?@])?(.*)/.exec(f);c.push({type:1,index:o,name:d[2],strings:m,ctor:d[1]==="."?Ec:d[1]==="?"?Ic:d[1]==="@"?Mc:ns}),i.removeAttribute(p)}else p.startsWith(Qe)&&(c.push({type:6,index:o}),i.removeAttribute(p));if(wr.test(i.tagName)){const p=i.textContent.split(Qe),f=p.length-1;if(f>0){i.textContent=Hn?Hn.emptyScript:"";for(let m=0;m<f;m++)i.append(p[m],nn()),gt.nextNode(),c.push({type:2,index:++o});i.append(p[f],nn())}}}else if(i.nodeType===8)if(i.data===$r)c.push({type:2,index:o});else{let p=-1;for(;(p=i.data.indexOf(Qe,p+1))!==-1;)c.push({type:7,index:o}),p+=Qe.length-1}o++}}static createElement(t,n){const s=ht.createElement("template");return s.innerHTML=t,s}};function It(e,t,n=e,s){if(t===Ze)return t;let i=s!==void 0?n._$Co?.[s]:n._$Cl;const o=sn(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(e),i._$AT(e,n,s)),s!==void 0?(n._$Co??=[])[s]=i:n._$Cl=i),i!==void 0&&(t=It(e,i._$AS(e,t.values),i,s)),t}class Lc{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:s}=this._$AD,i=(t?.creationScope??ht).importNode(n,!0);gt.currentNode=i;let o=gt.nextNode(),a=0,l=0,c=s[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new ts(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Rc(o,this,t)),this._$AV.push(u),c=s[++l]}a!==c?.index&&(o=gt.nextNode(),a++)}return gt.currentNode=ht,i}p(t){let n=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,n),n+=s.strings.length-2):s._$AI(t[n])),n++}}let ts=class Cr{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,s,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=It(this,t,n),sn(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==Ze&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Tc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==h&&sn(this._$AH)?this._$AA.nextSibling.data=t:this.T(ht.createTextNode(t)),this._$AH=t}$(t){const{values:n,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=ni.createElement(Sr(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(n);else{const o=new Lc(i,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=ea.get(t.strings);return n===void 0&&ea.set(t.strings,n=new ni(t)),n}k(t){Oi(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let s,i=0;for(const o of t)i===n.length?n.push(s=new Cr(this.O(nn()),this.O(nn()),this,this.options)):s=n[i],s._$AI(o),i++;i<n.length&&(this._$AR(s&&s._$AB.nextSibling,i),n.length=i)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){const s=Vo(t).nextSibling;Vo(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}};class ns{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,s,i,o){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=n,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=h}_$AI(t,n=this,s,i){const o=this.strings;let a=!1;if(o===void 0)t=It(this,t,n,0),a=!sn(t)||t!==this._$AH&&t!==Ze,a&&(this._$AH=t);else{const l=t;let c,u;for(t=o[0],c=0;c<o.length-1;c++)u=It(this,l[s+c],n,c),u===Ze&&(u=this._$AH[c]),a||=!sn(u)||u!==this._$AH[c],u===h?t=h:t!==h&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!i&&this.j(t)}j(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}let Ec=class extends ns{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===h?void 0:t}},Ic=class extends ns{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}},Mc=class extends ns{constructor(t,n,s,i,o){super(t,n,s,i,o),this.type=5}_$AI(t,n=this){if((t=It(this,t,n,0)??h)===Ze)return;const s=this._$AH,i=t===h&&s!==h||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==h&&(s===h||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Rc=class{constructor(t,n,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){It(this,t)}};const Pc={I:ts},Dc=Fi.litHtmlPolyfillSupport;Dc?.(ni,ts),(Fi.litHtmlVersions??=[]).push("3.3.2");const Nc=(e,t,n)=>{const s=n?.renderBefore??t;let i=s._$litPart$;if(i===void 0){const o=n?.renderBefore??null;s._$litPart$=i=new ts(t.insertBefore(nn(),o),o,void 0,n??{})}return i._$AI(e),i};const Bi=globalThis;let Et=class extends _t{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Nc(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ze}};Et._$litElement$=!0,Et.finalized=!0,Bi.litElementHydrateSupport?.({LitElement:Et});const Fc=Bi.litElementPolyfillSupport;Fc?.({LitElement:Et});(Bi.litElementVersions??=[]).push("4.2.2");const Tr=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};const Oc={attribute:!0,type:String,converter:zn,reflect:!1,hasChanged:Ni},Bc=(e=Oc,t,n)=>{const{kind:s,metadata:i}=n;let o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),s==="setter"&&((e=Object.create(e)).wrapped=!0),o.set(n.name,e),s==="accessor"){const{name:a}=n;return{set(l){const c=t.get.call(this);t.set.call(this,l),this.requestUpdate(a,c,e,!0,l)},init(l){return l!==void 0&&this.C(a,void 0,e,l),l}}}if(s==="setter"){const{name:a}=n;return function(l){const c=this[a];t.call(this,l),this.requestUpdate(a,c,e,!0,l)}}throw Error("Unsupported decorator location: "+s)};function ss(e){return(t,n)=>typeof n=="object"?Bc(e,t,n):((s,i,o)=>{const a=i.hasOwnProperty(o);return i.constructor.createProperty(o,s),a?Object.getOwnPropertyDescriptor(i,o):void 0})(e,t,n)}function w(e){return ss({...e,state:!0,attribute:!1})}async function xe(e,t){if(!(!e.client||!e.connected)&&!e.channelsLoading){e.channelsLoading=!0,e.channelsError=null;try{const n=await e.client.request("channels.status",{probe:t,timeoutMs:8e3});e.channelsSnapshot=n,e.channelsLastSuccess=Date.now()}catch(n){e.channelsError=String(n)}finally{e.channelsLoading=!1}}}async function Uc(e,t){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const n=await e.client.request("web.login.start",{force:t,timeoutMs:3e4});e.whatsappLoginMessage=n.message??null,e.whatsappLoginQrDataUrl=n.qrDataUrl??null,e.whatsappLoginConnected=null}catch(n){e.whatsappLoginMessage=String(n),e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function zc(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const t=await e.client.request("web.login.wait",{timeoutMs:12e4});e.whatsappLoginMessage=t.message??null,e.whatsappLoginConnected=t.connected??null,t.connected&&(e.whatsappLoginQrDataUrl=null)}catch(t){e.whatsappLoginMessage=String(t),e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function Hc(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{await e.client.request("channels.logout",{channel:"whatsapp"}),e.whatsappLoginMessage="Logged out.",e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}catch(t){e.whatsappLoginMessage=String(t)}finally{e.whatsappBusy=!1}}}function ft(e){return typeof structuredClone=="function"?structuredClone(e):JSON.parse(JSON.stringify(e))}function Mt(e){return`${JSON.stringify(e,null,2).trimEnd()}
`}function _r(e,t,n){if(t.length===0)return;let s=e;for(let o=0;o<t.length-1;o+=1){const a=t[o],l=t[o+1];if(typeof a=="number"){if(!Array.isArray(s))return;s[a]==null&&(s[a]=typeof l=="number"?[]:{}),s=s[a]}else{if(typeof s!="object"||s==null)return;const c=s;c[a]==null&&(c[a]=typeof l=="number"?[]:{}),s=c[a]}}const i=t[t.length-1];if(typeof i=="number"){Array.isArray(s)&&(s[i]=n);return}typeof s=="object"&&s!=null&&(s[i]=n)}function Lr(e,t){if(t.length===0)return;let n=e;for(let i=0;i<t.length-1;i+=1){const o=t[i];if(typeof o=="number"){if(!Array.isArray(n))return;n=n[o]}else{if(typeof n!="object"||n==null)return;n=n[o]}if(n==null)return}const s=t[t.length-1];if(typeof s=="number"){Array.isArray(n)&&n.splice(s,1);return}typeof n=="object"&&n!=null&&delete n[s]}async function ke(e){if(!(!e.client||!e.connected)){e.configLoading=!0,e.lastError=null;try{const t=await e.client.request("config.get",{});jc(e,t)}catch(t){e.lastError=String(t)}finally{e.configLoading=!1}}}async function Kn(e){if(!(!e.client||!e.connected)&&!e.configSchemaLoading){e.configSchemaLoading=!0;try{const t=await e.client.request("config.schema",{});Kc(e,t)}catch(t){e.lastError=String(t)}finally{e.configSchemaLoading=!1}}}function Kc(e,t){e.configSchema=t.schema??null,e.configUiHints=t.uiHints??{},e.configSchemaVersion=t.version??null}function jc(e,t){e.configSnapshot=t;const n=typeof t.raw=="string"?t.raw:t.config&&typeof t.config=="object"?Mt(t.config):e.configRaw;!e.configFormDirty||e.configFormMode==="raw"?e.configRaw=n:e.configForm?e.configRaw=Mt(e.configForm):e.configRaw=n,e.configValid=typeof t.valid=="boolean"?t.valid:null,e.configIssues=Array.isArray(t.issues)?t.issues:[],e.configFormDirty||(e.configForm=ft(t.config??{}),e.configFormOriginal=ft(t.config??{}),e.configRawOriginal=n)}async function Fn(e){if(!(!e.client||!e.connected)){e.configSaving=!0,e.lastError=null;try{const t=e.configFormMode==="form"&&e.configForm?Mt(e.configForm):e.configRaw,n=e.configSnapshot?.hash;if(!n){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.set",{raw:t,baseHash:n}),e.configFormDirty=!1,await ke(e)}catch(t){e.lastError=String(t)}finally{e.configSaving=!1}}}async function Wc(e){if(!(!e.client||!e.connected)){e.configApplying=!0,e.lastError=null;try{const t=e.configFormMode==="form"&&e.configForm?Mt(e.configForm):e.configRaw,n=e.configSnapshot?.hash;if(!n){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.apply",{raw:t,baseHash:n,sessionKey:e.applySessionKey}),e.configFormDirty=!1,await ke(e)}catch(t){e.lastError=String(t)}finally{e.configApplying=!1}}}async function Gc(e){if(!(!e.client||!e.connected)){e.updateRunning=!0,e.lastError=null;try{await e.client.request("update.run",{sessionKey:e.applySessionKey})}catch(t){e.lastError=String(t)}finally{e.updateRunning=!1}}}function we(e,t,n){const s=ft(e.configForm??e.configSnapshot?.config??{});_r(s,t,n),e.configForm=s,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=Mt(s))}function He(e,t){const n=ft(e.configForm??e.configSnapshot?.config??{});Lr(n,t),e.configForm=n,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=Mt(n))}function qc(e){const{values:t,original:n}=e;return t.name!==n.name||t.displayName!==n.displayName||t.about!==n.about||t.picture!==n.picture||t.banner!==n.banner||t.website!==n.website||t.nip05!==n.nip05||t.lud16!==n.lud16}function Vc(e){const{state:t,callbacks:n,accountId:s}=e,i=qc(t),o=(l,c,u={})=>{const{type:g="text",placeholder:p,maxLength:f,help:m}=u,d=t.values[l]??"",v=t.fieldErrors[l],b=`nostr-profile-${l}`;return g==="textarea"?r`
        <div class="form-field" style="margin-bottom: 12px;">
          <label for="${b}" style="display: block; margin-bottom: 4px; font-weight: 500;">
            ${c}
          </label>
          <textarea
            id="${b}"
            .value=${d}
            placeholder=${p??""}
            maxlength=${f??2e3}
            rows="3"
            style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 4px; resize: vertical; font-family: inherit;"
            @input=${S=>{const k=S.target;n.onFieldChange(l,k.value)}}
            ?disabled=${t.saving}
          ></textarea>
          ${m?r`<div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${m}</div>`:h}
          ${v?r`<div style="font-size: 12px; color: var(--danger-color); margin-top: 2px;">${v}</div>`:h}
        </div>
      `:r`
      <div class="form-field" style="margin-bottom: 12px;">
        <label for="${b}" style="display: block; margin-bottom: 4px; font-weight: 500;">
          ${c}
        </label>
        <input
          id="${b}"
          type=${g}
          .value=${d}
          placeholder=${p??""}
          maxlength=${f??256}
          style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 4px;"
          @input=${S=>{const k=S.target;n.onFieldChange(l,k.value)}}
          ?disabled=${t.saving}
        />
        ${m?r`<div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${m}</div>`:h}
        ${v?r`<div style="font-size: 12px; color: var(--danger-color); margin-top: 2px;">${v}</div>`:h}
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
    `:h};return r`
    <div class="nostr-profile-form" style="padding: 16px; background: var(--bg-secondary); border-radius: 8px; margin-top: 12px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <div style="font-weight: 600; font-size: 16px;">Edit Profile</div>
        <div style="font-size: 12px; color: var(--text-muted);">Account: ${s}</div>
      </div>

      ${t.error?r`<div class="callout danger" style="margin-bottom: 12px;">${t.error}</div>`:h}

      ${t.success?r`<div class="callout success" style="margin-bottom: 12px;">${t.success}</div>`:h}

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
          `:h}

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
            `:h}
    </div>
  `}function Qc(e){const t={name:e?.name??"",displayName:e?.displayName??"",about:e?.about??"",picture:e?.picture??"",banner:e?.banner??"",website:e?.website??"",nip05:e?.nip05??"",lud16:e?.lud16??""};return{values:t,original:{...t},saving:!1,importing:!1,error:null,success:null,fieldErrors:{},showAdvanced:!!(e?.banner||e?.website||e?.nip05||e?.lud16)}}async function Yc(e,t){await Uc(e,t),await xe(e,!0)}async function Zc(e){await zc(e),await xe(e,!0)}async function Jc(e){await Hc(e),await xe(e,!0)}async function Xc(e){await Fn(e),await ke(e),await xe(e,!0)}async function ed(e){await ke(e),await xe(e,!0)}function td(e){if(!Array.isArray(e))return{};const t={};for(const n of e){if(typeof n!="string")continue;const[s,...i]=n.split(":");if(!s||i.length===0)continue;const o=s.trim(),a=i.join(":").trim();o&&a&&(t[o]=a)}return t}function Er(e){return(e.channelsSnapshot?.channelAccounts?.nostr??[])[0]?.accountId??e.nostrProfileAccountId??"default"}function Ir(e,t=""){return`/api/channels/nostr/${encodeURIComponent(e)}/profile${t}`}function nd(e,t,n){e.nostrProfileAccountId=t,e.nostrProfileFormState=Qc(n??void 0)}function sd(e){e.nostrProfileFormState=null,e.nostrProfileAccountId=null}function id(e,t,n){const s=e.nostrProfileFormState;s&&(e.nostrProfileFormState={...s,values:{...s.values,[t]:n},fieldErrors:{...s.fieldErrors,[t]:""}})}function od(e){const t=e.nostrProfileFormState;t&&(e.nostrProfileFormState={...t,showAdvanced:!t.showAdvanced})}async function ad(e){const t=e.nostrProfileFormState;if(!t||t.saving)return;const n=Er(e);e.nostrProfileFormState={...t,saving:!0,error:null,success:null,fieldErrors:{}};try{const s=await fetch(Ir(n),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t.values)}),i=await s.json().catch(()=>null);if(!s.ok||i?.ok===!1||!i){const o=i?.error??`Profile update failed (${s.status})`;e.nostrProfileFormState={...t,saving:!1,error:o,success:null,fieldErrors:td(i?.details)};return}if(!i.persisted){e.nostrProfileFormState={...t,saving:!1,error:"Profile publish failed on all relays.",success:null};return}e.nostrProfileFormState={...t,saving:!1,error:null,success:"Profile published to relays.",fieldErrors:{},original:{...t.values}},await xe(e,!0)}catch(s){e.nostrProfileFormState={...t,saving:!1,error:`Profile update failed: ${String(s)}`,success:null}}}async function rd(e){const t=e.nostrProfileFormState;if(!t||t.importing)return;const n=Er(e);e.nostrProfileFormState={...t,importing:!0,error:null,success:null};try{const s=await fetch(Ir(n,"/import"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({autoMerge:!0})}),i=await s.json().catch(()=>null);if(!s.ok||i?.ok===!1||!i){const c=i?.error??`Profile import failed (${s.status})`;e.nostrProfileFormState={...t,importing:!1,error:c,success:null};return}const o=i.merged??i.imported??null,a=o?{...t.values,...o}:t.values,l=!!(a.banner||a.website||a.nip05||a.lud16);e.nostrProfileFormState={...t,importing:!1,values:a,error:null,success:i.saved?"Profile imported from relays. Review and publish.":"Profile imported. Review and publish.",showAdvanced:l},i.saved&&await xe(e,!0)}catch(s){e.nostrProfileFormState={...t,importing:!1,error:`Profile import failed: ${String(s)}`,success:null}}}function Mr(e){const t=(e??"").trim();if(!t)return null;const n=t.split(":").filter(Boolean);if(n.length<3||n[0]!=="agent")return null;const s=n[1]?.trim(),i=n.slice(2).join(":");return!s||!i?null:{agentId:s,rest:i}}const si=450;function un(e,t=!1,n=!1){e.chatScrollFrame&&cancelAnimationFrame(e.chatScrollFrame),e.chatScrollTimeout!=null&&(clearTimeout(e.chatScrollTimeout),e.chatScrollTimeout=null);const s=()=>{const i=e.querySelector(".chat-thread");if(i){const o=getComputedStyle(i).overflowY;if(o==="auto"||o==="scroll"||i.scrollHeight-i.clientHeight>1)return i}return document.scrollingElement??document.documentElement};e.updateComplete.then(()=>{e.chatScrollFrame=requestAnimationFrame(()=>{e.chatScrollFrame=null;const i=s();if(!i)return;const o=i.scrollHeight-i.scrollTop-i.clientHeight,a=t&&!e.chatHasAutoScrolled;if(!(a||e.chatUserNearBottom||o<si)){e.chatNewMessagesBelow=!0;return}a&&(e.chatHasAutoScrolled=!0);const c=n&&(typeof window>"u"||typeof window.matchMedia!="function"||!window.matchMedia("(prefers-reduced-motion: reduce)").matches),u=i.scrollHeight;typeof i.scrollTo=="function"?i.scrollTo({top:u,behavior:c?"smooth":"auto"}):i.scrollTop=u,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1;const g=a?150:120;e.chatScrollTimeout=window.setTimeout(()=>{e.chatScrollTimeout=null;const p=s();if(!p)return;const f=p.scrollHeight-p.scrollTop-p.clientHeight;(a||e.chatUserNearBottom||f<si)&&(p.scrollTop=p.scrollHeight,e.chatUserNearBottom=!0)},g)})})}function Rr(e,t=!1){e.logsScrollFrame&&cancelAnimationFrame(e.logsScrollFrame),e.updateComplete.then(()=>{e.logsScrollFrame=requestAnimationFrame(()=>{e.logsScrollFrame=null;const n=e.querySelector(".log-stream");if(!n)return;const s=n.scrollHeight-n.scrollTop-n.clientHeight;(t||s<80)&&(n.scrollTop=n.scrollHeight)})})}function ld(e,t){const n=t.currentTarget;if(!n)return;const s=n.scrollHeight-n.scrollTop-n.clientHeight;e.chatUserNearBottom=s<si,e.chatUserNearBottom&&(e.chatNewMessagesBelow=!1)}function cd(e,t){const n=t.currentTarget;if(!n)return;const s=n.scrollHeight-n.scrollTop-n.clientHeight;e.logsAtBottom=s<80}function ta(e){e.chatHasAutoScrolled=!1,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1}function dd(e,t){if(e.length===0)return;const n=new Blob([`${e.join(`
`)}
`],{type:"text/plain"}),s=URL.createObjectURL(n),i=document.createElement("a"),o=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");i.href=s,i.download=`opensoul-logs-${t}-${o}.log`,i.click(),URL.revokeObjectURL(s)}function ud(e){if(typeof ResizeObserver>"u")return;const t=e.querySelector(".topbar");if(!t)return;const n=()=>{const{height:s}=t.getBoundingClientRect();e.style.setProperty("--topbar-height",`${s}px`)};n(),e.topbarObserver=new ResizeObserver(()=>n()),e.topbarObserver.observe(t)}async function Rt(e){if(!(!e.client||!e.connected)&&!e.debugLoading){e.debugLoading=!0;try{const[t,n,s,i]=await Promise.all([e.client.request("status",{}),e.client.request("health",{}),e.client.request("models.list",{}),e.client.request("last-heartbeat",{})]);e.debugStatus=t,e.debugHealth=n;const o=s;e.debugModels=Array.isArray(o?.models)?o?.models:[],e.debugHeartbeat=i}catch(t){e.debugCallError=String(t)}finally{e.debugLoading=!1}}}async function gd(e){if(!(!e.client||!e.connected)){e.debugCallError=null,e.debugCallResult=null;try{const t=e.debugCallParams.trim()?JSON.parse(e.debugCallParams):{},n=await e.client.request(e.debugCallMethod.trim(),t);e.debugCallResult=JSON.stringify(n,null,2)}catch(t){e.debugCallError=String(t)}}}const pd=2e3,hd=new Set(["trace","debug","info","warn","error","fatal"]);function fd(e){if(typeof e!="string")return null;const t=e.trim();if(!t.startsWith("{")||!t.endsWith("}"))return null;try{const n=JSON.parse(t);return!n||typeof n!="object"?null:n}catch{return null}}function vd(e){if(typeof e!="string")return null;const t=e.toLowerCase();return hd.has(t)?t:null}function md(e){if(!e.trim())return{raw:e,message:e};try{const t=JSON.parse(e),n=t&&typeof t._meta=="object"&&t._meta!==null?t._meta:null,s=typeof t.time=="string"?t.time:typeof n?.date=="string"?n?.date:null,i=vd(n?.logLevelName??n?.level),o=typeof t[0]=="string"?t[0]:typeof n?.name=="string"?n?.name:null,a=fd(o);let l=null;a&&(typeof a.subsystem=="string"?l=a.subsystem:typeof a.module=="string"&&(l=a.module)),!l&&o&&o.length<120&&(l=o);let c=null;return typeof t[1]=="string"?c=t[1]:!a&&typeof t[0]=="string"?c=t[0]:typeof t.message=="string"&&(c=t.message),{raw:e,time:s,level:i,subsystem:l,message:c??e,meta:n??void 0}}catch{return{raw:e,message:e}}}async function on(e,t){if(!(!e.client||!e.connected)&&!(e.logsLoading&&!t?.quiet)){t?.quiet||(e.logsLoading=!0),e.logsError=null;try{const s=await e.client.request("logs.tail",{cursor:t?.reset?void 0:e.logsCursor??void 0,limit:e.logsLimit,maxBytes:e.logsMaxBytes}),o=(Array.isArray(s.lines)?s.lines.filter(l=>typeof l=="string"):[]).map(md),a=!!(t?.reset||s.reset||e.logsCursor==null);e.logsEntries=a?o:[...e.logsEntries,...o].slice(-pd),typeof s.cursor=="number"&&(e.logsCursor=s.cursor),typeof s.file=="string"&&(e.logsFile=s.file),e.logsTruncated=!!s.truncated,e.logsLastFetchAt=Date.now()}catch(n){e.logsError=String(n)}finally{t?.quiet||(e.logsLoading=!1)}}}async function is(e,t){if(!(!e.client||!e.connected)&&!e.nodesLoading){e.nodesLoading=!0,t?.quiet||(e.lastError=null);try{const n=await e.client.request("node.list",{});e.nodes=Array.isArray(n.nodes)?n.nodes:[]}catch(n){t?.quiet||(e.lastError=String(n))}finally{e.nodesLoading=!1}}}function bd(e){e.nodesPollInterval==null&&(e.nodesPollInterval=window.setInterval(()=>{is(e,{quiet:!0})},5e3))}function yd(e){e.nodesPollInterval!=null&&(clearInterval(e.nodesPollInterval),e.nodesPollInterval=null)}function Ui(e){e.logsPollInterval==null&&(e.logsPollInterval=window.setInterval(()=>{e.tab==="logs"&&on(e,{quiet:!0})},2e3))}function zi(e){e.logsPollInterval!=null&&(clearInterval(e.logsPollInterval),e.logsPollInterval=null)}function Hi(e){e.debugPollInterval==null&&(e.debugPollInterval=window.setInterval(()=>{e.tab==="debug"&&Rt(e)},3e3))}function Ki(e){e.debugPollInterval!=null&&(clearInterval(e.debugPollInterval),e.debugPollInterval=null)}async function Pr(e,t){if(!(!e.client||!e.connected||e.agentIdentityLoading)&&!e.agentIdentityById[t]){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{const n=await e.client.request("agent.identity.get",{agentId:t});n&&(e.agentIdentityById={...e.agentIdentityById,[t]:n})}catch(n){e.agentIdentityError=String(n)}finally{e.agentIdentityLoading=!1}}}async function Dr(e,t){if(!e.client||!e.connected||e.agentIdentityLoading)return;const n=t.filter(s=>!e.agentIdentityById[s]);if(n.length!==0){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{for(const s of n){const i=await e.client.request("agent.identity.get",{agentId:s});i&&(e.agentIdentityById={...e.agentIdentityById,[s]:i})}}catch(s){e.agentIdentityError=String(s)}finally{e.agentIdentityLoading=!1}}}async function On(e,t){if(!(!e.client||!e.connected)&&!e.agentSkillsLoading){e.agentSkillsLoading=!0,e.agentSkillsError=null;try{const n=await e.client.request("skills.status",{agentId:t});n&&(e.agentSkillsReport=n,e.agentSkillsAgentId=t)}catch(n){e.agentSkillsError=String(n)}finally{e.agentSkillsLoading=!1}}}async function ji(e){if(!(!e.client||!e.connected)&&!e.agentsLoading){e.agentsLoading=!0,e.agentsError=null;try{const t=await e.client.request("agents.list",{});if(t){e.agentsList=t;const n=e.agentsSelectedId,s=t.agents.some(i=>i.id===n);(!n||!s)&&(e.agentsSelectedId=t.defaultId??t.agents[0]?.id??null)}}catch(t){e.agentsError=String(t)}finally{e.agentsLoading=!1}}}function Wi(e,t){if(e==null||!Number.isFinite(e)||e<=0)return;if(e<1e3)return`${Math.round(e)}ms`;const n=t?.spaced?" ":"",s=Math.round(e/1e3),i=Math.floor(s/3600),o=Math.floor(s%3600/60),a=s%60;if(i>=24){const l=Math.floor(i/24),c=i%24;return c>0?`${l}d${n}${c}h`:`${l}d`}return i>0?o>0?`${i}h${n}${o}m`:`${i}h`:o>0?a>0?`${o}m${n}${a}s`:`${o}m`:`${a}s`}function Gi(e,t="n/a"){if(e==null||!Number.isFinite(e)||e<0)return t;if(e<1e3)return`${Math.round(e)}ms`;const n=Math.round(e/1e3);if(n<60)return`${n}s`;const s=Math.round(n/60);if(s<60)return`${s}m`;const i=Math.round(s/60);return i<24?`${i}h`:`${Math.round(i/24)}d`}function Y(e,t){const n=t?.fallback??"n/a";if(e==null||!Number.isFinite(e))return n;const s=Date.now()-e,i=Math.abs(s),o=s>=0,a=Math.round(i/1e3);if(a<60)return o?"just now":"in <1m";const l=Math.round(a/60);if(l<60)return o?`${l}m ago`:`in ${l}m`;const c=Math.round(l/60);if(c<48)return o?`${c}h ago`:`in ${c}h`;const u=Math.round(c/24);return o?`${u}d ago`:`in ${u}d`}const xd=/<\s*\/?\s*(?:think(?:ing)?|thought|antthinking|final)\b/i,Sn=/<\s*\/?\s*final\b[^<>]*>/gi,na=/<\s*(\/?)\s*(?:think(?:ing)?|thought|antthinking)\b[^<>]*>/gi;function sa(e){const t=[],n=/(^|\n)(```|~~~)[^\n]*\n[\s\S]*?(?:\n\2(?:\n|$)|$)/g;for(const i of e.matchAll(n)){const o=(i.index??0)+i[1].length;t.push({start:o,end:o+i[0].length-i[1].length})}const s=/`+[^`]+`+/g;for(const i of e.matchAll(s)){const o=i.index??0,a=o+i[0].length;t.some(c=>o>=c.start&&a<=c.end)||t.push({start:o,end:a})}return t.sort((i,o)=>i.start-o.start),t}function ia(e,t){return t.some(n=>e>=n.start&&e<n.end)}function $d(e,t){return e.trimStart()}function wd(e,t){if(!e||!xd.test(e))return e;let n=e;if(Sn.test(n)){Sn.lastIndex=0;const l=[],c=sa(n);for(const u of n.matchAll(Sn)){const g=u.index??0;l.push({start:g,length:u[0].length,inCode:ia(g,c)})}for(let u=l.length-1;u>=0;u--){const g=l[u];g.inCode||(n=n.slice(0,g.start)+n.slice(g.start+g.length))}}else Sn.lastIndex=0;const s=sa(n);na.lastIndex=0;let i="",o=0,a=!1;for(const l of n.matchAll(na)){const c=l.index??0,u=l[1]==="/";ia(c,s)||(a?u&&(a=!1):(i+=n.slice(o,c),u||(a=!0)),o=c+l[0].length)}return i+=n.slice(o),$d(i)}function vt(e){return!e&&e!==0?"n/a":new Date(e).toLocaleString()}function ii(e){return!e||e.length===0?"none":e.filter(t=>!!(t&&t.trim())).join(", ")}function oi(e,t=120){return e.length<=t?e:`${e.slice(0,Math.max(0,t-1))}…`}function Nr(e,t){return e.length<=t?{text:e,truncated:!1,total:e.length}:{text:e.slice(0,Math.max(0,t)),truncated:!0,total:e.length}}function jn(e,t){const n=Number(e);return Number.isFinite(n)?n:t}function Ls(e){return wd(e)}async function gn(e){if(!(!e.client||!e.connected))try{const t=await e.client.request("cron.status",{});e.cronStatus=t}catch(t){e.cronError=String(t)}}async function os(e){if(!(!e.client||!e.connected)&&!e.cronLoading){e.cronLoading=!0,e.cronError=null;try{const t=await e.client.request("cron.list",{includeDisabled:!0});e.cronJobs=Array.isArray(t.jobs)?t.jobs:[]}catch(t){e.cronError=String(t)}finally{e.cronLoading=!1}}}function kd(e){if(e.scheduleKind==="at"){const n=Date.parse(e.scheduleAt);if(!Number.isFinite(n))throw new Error("Invalid run time.");return{kind:"at",at:new Date(n).toISOString()}}if(e.scheduleKind==="every"){const n=jn(e.everyAmount,0);if(n<=0)throw new Error("Invalid interval amount.");const s=e.everyUnit;return{kind:"every",everyMs:n*(s==="minutes"?6e4:s==="hours"?36e5:864e5)}}const t=e.cronExpr.trim();if(!t)throw new Error("Cron expression required.");return{kind:"cron",expr:t,tz:e.cronTz.trim()||void 0}}function Sd(e){if(e.payloadKind==="systemEvent"){const i=e.payloadText.trim();if(!i)throw new Error("System event text required.");return{kind:"systemEvent",text:i}}const t=e.payloadText.trim();if(!t)throw new Error("Agent message required.");const n={kind:"agentTurn",message:t},s=jn(e.timeoutSeconds,0);return s>0&&(n.timeoutSeconds=s),n}async function Ad(e){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{const t=kd(e.cronForm),n=Sd(e.cronForm),s=e.cronForm.sessionTarget==="isolated"&&e.cronForm.payloadKind==="agentTurn"&&e.cronForm.deliveryMode?{mode:e.cronForm.deliveryMode==="announce"?"announce":"none",channel:e.cronForm.deliveryChannel.trim()||"last",to:e.cronForm.deliveryTo.trim()||void 0}:void 0,i=e.cronForm.agentId.trim(),o={name:e.cronForm.name.trim(),description:e.cronForm.description.trim()||void 0,agentId:i||void 0,enabled:e.cronForm.enabled,schedule:t,sessionTarget:e.cronForm.sessionTarget,wakeMode:e.cronForm.wakeMode,payload:n,delivery:s};if(!o.name)throw new Error("Name required.");await e.client.request("cron.add",o),e.cronForm={...e.cronForm,name:"",description:"",payloadText:""},await os(e),await gn(e)}catch(t){e.cronError=String(t)}finally{e.cronBusy=!1}}}async function Cd(e,t,n){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.update",{id:t.id,patch:{enabled:n}}),await os(e),await gn(e)}catch(s){e.cronError=String(s)}finally{e.cronBusy=!1}}}async function Td(e,t){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.run",{id:t.id,mode:"force"}),await Fr(e,t.id)}catch(n){e.cronError=String(n)}finally{e.cronBusy=!1}}}async function _d(e,t){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.remove",{id:t.id}),e.cronRunsJobId===t.id&&(e.cronRunsJobId=null,e.cronRuns=[]),await os(e),await gn(e)}catch(n){e.cronError=String(n)}finally{e.cronBusy=!1}}}async function Fr(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("cron.runs",{id:t,limit:50});e.cronRunsJobId=t,e.cronRuns=Array.isArray(n.entries)?n.entries:[]}catch(n){e.cronError=String(n)}}const Or="opensoul.device.auth.v1";function qi(e){return e.trim()}function Ld(e){if(!Array.isArray(e))return[];const t=new Set;for(const n of e){const s=n.trim();s&&t.add(s)}return[...t].toSorted()}function Vi(){try{const e=window.localStorage.getItem(Or);if(!e)return null;const t=JSON.parse(e);return!t||t.version!==1||!t.deviceId||typeof t.deviceId!="string"||!t.tokens||typeof t.tokens!="object"?null:t}catch{return null}}function Br(e){try{window.localStorage.setItem(Or,JSON.stringify(e))}catch{}}function Ed(e){const t=Vi();if(!t||t.deviceId!==e.deviceId)return null;const n=qi(e.role),s=t.tokens[n];return!s||typeof s.token!="string"?null:s}function Ur(e){const t=qi(e.role),n={version:1,deviceId:e.deviceId,tokens:{}},s=Vi();s&&s.deviceId===e.deviceId&&(n.tokens={...s.tokens});const i={token:e.token,role:t,scopes:Ld(e.scopes),updatedAtMs:Date.now()};return n.tokens[t]=i,Br(n),i}function zr(e){const t=Vi();if(!t||t.deviceId!==e.deviceId)return;const n=qi(e.role);if(!t.tokens[n])return;const s={...t,tokens:{...t.tokens}};delete s.tokens[n],Br(s)}const Hr={p:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,n:0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,h:8n,a:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,d:0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,Gx:0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,Gy:0x6666666666666666666666666666666666666666666666666666666666666658n},{p:ge,n:Bn,Gx:oa,Gy:aa,a:Es,d:Is,h:Id}=Hr,mt=32,Qi=64,Md=(...e)=>{"captureStackTrace"in Error&&typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(...e)},le=(e="")=>{const t=new Error(e);throw Md(t,le),t},Rd=e=>typeof e=="bigint",Pd=e=>typeof e=="string",Dd=e=>e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array",Je=(e,t,n="")=>{const s=Dd(e),i=e?.length,o=t!==void 0;if(!s||o&&i!==t){const a=n&&`"${n}" `,l=o?` of length ${t}`:"",c=s?`length=${i}`:`type=${typeof e}`;le(a+"expected Uint8Array"+l+", got "+c)}return e},as=e=>new Uint8Array(e),Kr=e=>Uint8Array.from(e),jr=(e,t)=>e.toString(16).padStart(t,"0"),Wr=e=>Array.from(Je(e)).map(t=>jr(t,2)).join(""),Ke={_0:48,_9:57,A:65,F:70,a:97,f:102},ra=e=>{if(e>=Ke._0&&e<=Ke._9)return e-Ke._0;if(e>=Ke.A&&e<=Ke.F)return e-(Ke.A-10);if(e>=Ke.a&&e<=Ke.f)return e-(Ke.a-10)},Gr=e=>{const t="hex invalid";if(!Pd(e))return le(t);const n=e.length,s=n/2;if(n%2)return le(t);const i=as(s);for(let o=0,a=0;o<s;o++,a+=2){const l=ra(e.charCodeAt(a)),c=ra(e.charCodeAt(a+1));if(l===void 0||c===void 0)return le(t);i[o]=l*16+c}return i},qr=()=>globalThis?.crypto,Nd=()=>qr()?.subtle??le("crypto.subtle must be defined, consider polyfill"),an=(...e)=>{const t=as(e.reduce((s,i)=>s+Je(i).length,0));let n=0;return e.forEach(s=>{t.set(s,n),n+=s.length}),t},Fd=(e=mt)=>qr().getRandomValues(as(e)),Wn=BigInt,lt=(e,t,n,s="bad number: out of range")=>Rd(e)&&t<=e&&e<n?e:le(s),D=(e,t=ge)=>{const n=e%t;return n>=0n?n:t+n},Vr=e=>D(e,Bn),Od=(e,t)=>{(e===0n||t<=0n)&&le("no inverse n="+e+" mod="+t);let n=D(e,t),s=t,i=0n,o=1n;for(;n!==0n;){const a=s/n,l=s%n,c=i-o*a;s=n,n=l,i=o,o=c}return s===1n?D(i,t):le("no inverse")},Bd=e=>{const t=Jr[e];return typeof t!="function"&&le("hashes."+e+" not set"),t},Ms=e=>e instanceof Ae?e:le("Point expected"),ai=2n**256n;class Ae{static BASE;static ZERO;X;Y;Z;T;constructor(t,n,s,i){const o=ai;this.X=lt(t,0n,o),this.Y=lt(n,0n,o),this.Z=lt(s,1n,o),this.T=lt(i,0n,o),Object.freeze(this)}static CURVE(){return Hr}static fromAffine(t){return new Ae(t.x,t.y,1n,D(t.x*t.y))}static fromBytes(t,n=!1){const s=Is,i=Kr(Je(t,mt)),o=t[31];i[31]=o&-129;const a=Yr(i);lt(a,0n,n?ai:ge);const c=D(a*a),u=D(c-1n),g=D(s*c+1n);let{isValid:p,value:f}=zd(u,g);p||le("bad point: y not sqrt");const m=(f&1n)===1n,d=(o&128)!==0;return!n&&f===0n&&d&&le("bad point: x==0, isLastByteOdd"),d!==m&&(f=D(-f)),new Ae(f,a,1n,D(f*a))}static fromHex(t,n){return Ae.fromBytes(Gr(t),n)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}assertValidity(){const t=Es,n=Is,s=this;if(s.is0())return le("bad point: ZERO");const{X:i,Y:o,Z:a,T:l}=s,c=D(i*i),u=D(o*o),g=D(a*a),p=D(g*g),f=D(c*t),m=D(g*D(f+u)),d=D(p+D(n*D(c*u)));if(m!==d)return le("bad point: equation left != right (1)");const v=D(i*o),b=D(a*l);return v!==b?le("bad point: equation left != right (2)"):this}equals(t){const{X:n,Y:s,Z:i}=this,{X:o,Y:a,Z:l}=Ms(t),c=D(n*l),u=D(o*i),g=D(s*l),p=D(a*i);return c===u&&g===p}is0(){return this.equals(Lt)}negate(){return new Ae(D(-this.X),this.Y,this.Z,D(-this.T))}double(){const{X:t,Y:n,Z:s}=this,i=Es,o=D(t*t),a=D(n*n),l=D(2n*D(s*s)),c=D(i*o),u=t+n,g=D(D(u*u)-o-a),p=c+a,f=p-l,m=c-a,d=D(g*f),v=D(p*m),b=D(g*m),S=D(f*p);return new Ae(d,v,S,b)}add(t){const{X:n,Y:s,Z:i,T:o}=this,{X:a,Y:l,Z:c,T:u}=Ms(t),g=Es,p=Is,f=D(n*a),m=D(s*l),d=D(o*p*u),v=D(i*c),b=D((n+s)*(a+l)-f-m),S=D(v-d),k=D(v+d),C=D(m-g*f),A=D(b*S),T=D(k*C),_=D(b*C),M=D(S*k);return new Ae(A,T,M,_)}subtract(t){return this.add(Ms(t).negate())}multiply(t,n=!0){if(!n&&(t===0n||this.is0()))return Lt;if(lt(t,1n,Bn),t===1n)return this;if(this.equals(bt))return Jd(t).p;let s=Lt,i=bt;for(let o=this;t>0n;o=o.double(),t>>=1n)t&1n?s=s.add(o):n&&(i=i.add(o));return s}multiplyUnsafe(t){return this.multiply(t,!1)}toAffine(){const{X:t,Y:n,Z:s}=this;if(this.equals(Lt))return{x:0n,y:1n};const i=Od(s,ge);D(s*i)!==1n&&le("invalid inverse");const o=D(t*i),a=D(n*i);return{x:o,y:a}}toBytes(){const{x:t,y:n}=this.assertValidity().toAffine(),s=Qr(n);return s[31]|=t&1n?128:0,s}toHex(){return Wr(this.toBytes())}clearCofactor(){return this.multiply(Wn(Id),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let t=this.multiply(Bn/2n,!1).double();return Bn%2n&&(t=t.add(this)),t.is0()}}const bt=new Ae(oa,aa,1n,D(oa*aa)),Lt=new Ae(0n,1n,1n,0n);Ae.BASE=bt;Ae.ZERO=Lt;const Qr=e=>Gr(jr(lt(e,0n,ai),Qi)).reverse(),Yr=e=>Wn("0x"+Wr(Kr(Je(e)).reverse())),Re=(e,t)=>{let n=e;for(;t-- >0n;)n*=n,n%=ge;return n},Ud=e=>{const n=e*e%ge*e%ge,s=Re(n,2n)*n%ge,i=Re(s,1n)*e%ge,o=Re(i,5n)*i%ge,a=Re(o,10n)*o%ge,l=Re(a,20n)*a%ge,c=Re(l,40n)*l%ge,u=Re(c,80n)*c%ge,g=Re(u,80n)*c%ge,p=Re(g,10n)*o%ge;return{pow_p_5_8:Re(p,2n)*e%ge,b2:n}},la=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,zd=(e,t)=>{const n=D(t*t*t),s=D(n*n*t),i=Ud(e*s).pow_p_5_8;let o=D(e*n*i);const a=D(t*o*o),l=o,c=D(o*la),u=a===e,g=a===D(-e),p=a===D(-e*la);return u&&(o=l),(g||p)&&(o=c),(D(o)&1n)===1n&&(o=D(-o)),{isValid:u||g,value:o}},ri=e=>Vr(Yr(e)),Yi=(...e)=>Jr.sha512Async(an(...e)),Hd=(...e)=>Bd("sha512")(an(...e)),Zr=e=>{const t=e.slice(0,mt);t[0]&=248,t[31]&=127,t[31]|=64;const n=e.slice(mt,Qi),s=ri(t),i=bt.multiply(s),o=i.toBytes();return{head:t,prefix:n,scalar:s,point:i,pointBytes:o}},Zi=e=>Yi(Je(e,mt)).then(Zr),Kd=e=>Zr(Hd(Je(e,mt))),jd=e=>Zi(e).then(t=>t.pointBytes),Wd=e=>Yi(e.hashable).then(e.finish),Gd=(e,t,n)=>{const{pointBytes:s,scalar:i}=e,o=ri(t),a=bt.multiply(o).toBytes();return{hashable:an(a,s,n),finish:u=>{const g=Vr(o+ri(u)*i);return Je(an(a,Qr(g)),Qi)}}},qd=async(e,t)=>{const n=Je(e),s=await Zi(t),i=await Yi(s.prefix,n);return Wd(Gd(s,i,n))},Jr={sha512Async:async e=>{const t=Nd(),n=an(e);return as(await t.digest("SHA-512",n.buffer))},sha512:void 0},Vd=(e=Fd(mt))=>e,Qd={getExtendedPublicKeyAsync:Zi,getExtendedPublicKey:Kd,randomSecretKey:Vd},Gn=8,Yd=256,Xr=Math.ceil(Yd/Gn)+1,li=2**(Gn-1),Zd=()=>{const e=[];let t=bt,n=t;for(let s=0;s<Xr;s++){n=t,e.push(n);for(let i=1;i<li;i++)n=n.add(t),e.push(n);t=n.double()}return e};let ca;const da=(e,t)=>{const n=t.negate();return e?n:t},Jd=e=>{const t=ca||(ca=Zd());let n=Lt,s=bt;const i=2**Gn,o=i,a=Wn(i-1),l=Wn(Gn);for(let c=0;c<Xr;c++){let u=Number(e&a);e>>=l,u>li&&(u-=o,e+=1n);const g=c*li,p=g,f=g+Math.abs(u)-1,m=c%2!==0,d=u<0;u===0?s=s.add(da(m,t[p])):n=n.add(da(d,t[f]))}return e!==0n&&le("invalid wnaf"),{p:n,f:s}},Rs="opensoul-device-identity-v1";function ci(e){let t="";for(const n of e)t+=String.fromCharCode(n);return btoa(t).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function el(e){const t=e.replaceAll("-","+").replaceAll("_","/"),n=t+"=".repeat((4-t.length%4)%4),s=atob(n),i=new Uint8Array(s.length);for(let o=0;o<s.length;o+=1)i[o]=s.charCodeAt(o);return i}function Xd(e){return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")}async function tl(e){const t=await crypto.subtle.digest("SHA-256",e.slice().buffer);return Xd(new Uint8Array(t))}async function eu(){const e=Qd.randomSecretKey(),t=await jd(e);return{deviceId:await tl(t),publicKey:ci(t),privateKey:ci(e)}}async function Ji(){try{const n=localStorage.getItem(Rs);if(n){const s=JSON.parse(n);if(s?.version===1&&typeof s.deviceId=="string"&&typeof s.publicKey=="string"&&typeof s.privateKey=="string"){const i=await tl(el(s.publicKey));if(i!==s.deviceId){const o={...s,deviceId:i};return localStorage.setItem(Rs,JSON.stringify(o)),{deviceId:i,publicKey:s.publicKey,privateKey:s.privateKey}}return{deviceId:s.deviceId,publicKey:s.publicKey,privateKey:s.privateKey}}}}catch{}const e=await eu(),t={version:1,deviceId:e.deviceId,publicKey:e.publicKey,privateKey:e.privateKey,createdAtMs:Date.now()};return localStorage.setItem(Rs,JSON.stringify(t)),e}async function tu(e,t){const n=el(e),s=new TextEncoder().encode(t),i=await qd(s,n);return ci(i)}async function Xe(e,t){if(!(!e.client||!e.connected)&&!e.devicesLoading){e.devicesLoading=!0,t?.quiet||(e.devicesError=null);try{const n=await e.client.request("device.pair.list",{});e.devicesList={pending:Array.isArray(n?.pending)?n.pending:[],paired:Array.isArray(n?.paired)?n.paired:[]}}catch(n){t?.quiet||(e.devicesError=String(n))}finally{e.devicesLoading=!1}}}async function nu(e,t){if(!(!e.client||!e.connected))try{await e.client.request("device.pair.approve",{requestId:t}),await Xe(e)}catch(n){e.devicesError=String(n)}}async function su(e,t){if(!(!e.client||!e.connected||!window.confirm("Reject this device pairing request?")))try{await e.client.request("device.pair.reject",{requestId:t}),await Xe(e)}catch(s){e.devicesError=String(s)}}async function iu(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("device.token.rotate",t);if(n?.token){const s=await Ji(),i=n.role??t.role;(n.deviceId===s.deviceId||t.deviceId===s.deviceId)&&Ur({deviceId:s.deviceId,role:i,token:n.token,scopes:n.scopes??t.scopes??[]}),window.prompt("New device token (copy and store securely):",n.token)}await Xe(e)}catch(n){e.devicesError=String(n)}}async function ou(e,t){if(!(!e.client||!e.connected||!window.confirm(`Revoke token for ${t.deviceId} (${t.role})?`)))try{await e.client.request("device.token.revoke",t);const s=await Ji();t.deviceId===s.deviceId&&zr({deviceId:s.deviceId,role:t.role}),await Xe(e)}catch(s){e.devicesError=String(s)}}function au(e){if(!e||e.kind==="gateway")return{method:"exec.approvals.get",params:{}};const t=e.nodeId.trim();return t?{method:"exec.approvals.node.get",params:{nodeId:t}}:null}function ru(e,t){if(!e||e.kind==="gateway")return{method:"exec.approvals.set",params:t};const n=e.nodeId.trim();return n?{method:"exec.approvals.node.set",params:{...t,nodeId:n}}:null}async function Xi(e,t){if(!(!e.client||!e.connected)&&!e.execApprovalsLoading){e.execApprovalsLoading=!0,e.lastError=null;try{const n=au(t);if(!n){e.lastError="Select a node before loading exec approvals.";return}const s=await e.client.request(n.method,n.params);lu(e,s)}catch(n){e.lastError=String(n)}finally{e.execApprovalsLoading=!1}}}function lu(e,t){e.execApprovalsSnapshot=t,e.execApprovalsDirty||(e.execApprovalsForm=ft(t.file??{}))}async function cu(e,t){if(!(!e.client||!e.connected)){e.execApprovalsSaving=!0,e.lastError=null;try{const n=e.execApprovalsSnapshot?.hash;if(!n){e.lastError="Exec approvals hash missing; reload and retry.";return}const s=e.execApprovalsForm??e.execApprovalsSnapshot?.file??{},i=ru(t,{file:s,baseHash:n});if(!i){e.lastError="Select a node before saving exec approvals.";return}await e.client.request(i.method,i.params),e.execApprovalsDirty=!1,await Xi(e,t)}catch(n){e.lastError=String(n)}finally{e.execApprovalsSaving=!1}}}function du(e,t,n){const s=ft(e.execApprovalsForm??e.execApprovalsSnapshot?.file??{});_r(s,t,n),e.execApprovalsForm=s,e.execApprovalsDirty=!0}function uu(e,t){const n=ft(e.execApprovalsForm??e.execApprovalsSnapshot?.file??{});Lr(n,t),e.execApprovalsForm=n,e.execApprovalsDirty=!0}async function eo(e){if(!(!e.client||!e.connected)&&!e.presenceLoading){e.presenceLoading=!0,e.presenceError=null,e.presenceStatus=null;try{const t=await e.client.request("system-presence",{});Array.isArray(t)?(e.presenceEntries=t,e.presenceStatus=t.length===0?"No instances yet.":null):(e.presenceEntries=[],e.presenceStatus="No presence payload.")}catch(t){e.presenceError=String(t)}finally{e.presenceLoading=!1}}}async function xt(e,t){if(!(!e.client||!e.connected)&&!e.sessionsLoading){e.sessionsLoading=!0,e.sessionsError=null;try{const n=t?.includeGlobal??e.sessionsIncludeGlobal,s=t?.includeUnknown??e.sessionsIncludeUnknown,i=t?.activeMinutes??jn(e.sessionsFilterActive,0),o=t?.limit??jn(e.sessionsFilterLimit,0),a={includeGlobal:n,includeUnknown:s};i>0&&(a.activeMinutes=i),o>0&&(a.limit=o);const l=await e.client.request("sessions.list",a);l&&(e.sessionsResult=l)}catch(n){e.sessionsError=String(n)}finally{e.sessionsLoading=!1}}}async function gu(e,t,n){if(!e.client||!e.connected)return;const s={key:t};"label"in n&&(s.label=n.label),"thinkingLevel"in n&&(s.thinkingLevel=n.thinkingLevel),"verboseLevel"in n&&(s.verboseLevel=n.verboseLevel),"reasoningLevel"in n&&(s.reasoningLevel=n.reasoningLevel);try{await e.client.request("sessions.patch",s),await xt(e)}catch(i){e.sessionsError=String(i)}}async function pu(e,t){if(!(!e.client||!e.connected||e.sessionsLoading||!window.confirm(`Delete session "${t}"?

Deletes the session entry and archives its transcript.`))){e.sessionsLoading=!0,e.sessionsError=null;try{await e.client.request("sessions.delete",{key:t,deleteTranscript:!0}),await xt(e)}catch(s){e.sessionsError=String(s)}finally{e.sessionsLoading=!1}}}function Pt(e,t,n){if(!t.trim())return;const s={...e.skillMessages};n?s[t]=n:delete s[t],e.skillMessages=s}function rs(e){return e instanceof Error?e.message:String(e)}async function pn(e,t){if(t?.clearMessages&&Object.keys(e.skillMessages).length>0&&(e.skillMessages={}),!(!e.client||!e.connected)&&!e.skillsLoading){e.skillsLoading=!0,e.skillsError=null;try{const n=await e.client.request("skills.status",{});n&&(e.skillsReport=n)}catch(n){e.skillsError=rs(n)}finally{e.skillsLoading=!1}}}function hu(e,t,n){e.skillEdits={...e.skillEdits,[t]:n}}async function fu(e,t,n){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{await e.client.request("skills.update",{skillKey:t,enabled:n}),await pn(e),Pt(e,t,{kind:"success",message:n?"Skill enabled":"Skill disabled"})}catch(s){const i=rs(s);e.skillsError=i,Pt(e,t,{kind:"error",message:i})}finally{e.skillsBusyKey=null}}}async function vu(e,t){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const n=e.skillEdits[t]??"";await e.client.request("skills.update",{skillKey:t,apiKey:n}),await pn(e),Pt(e,t,{kind:"success",message:"API key saved"})}catch(n){const s=rs(n);e.skillsError=s,Pt(e,t,{kind:"error",message:s})}finally{e.skillsBusyKey=null}}}async function mu(e,t,n,s){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const i=await e.client.request("skills.install",{name:n,installId:s,timeoutMs:12e4});await pn(e),Pt(e,t,{kind:"success",message:i?.message??"Installed"})}catch(i){const o=rs(i);e.skillsError=o,Pt(e,t,{kind:"error",message:o})}finally{e.skillsBusyKey=null}}}function bu(){return!!window.__opensoul_bridge?.isDesktop}function Nt(){return window.__opensoul_bridge??null}function yu(){const e=Nt();e&&e.send("shell.ready",{version:"1.0"})}function ua(e){const t=Nt();t&&t.send("shell.connectionStateChanged",{state:e})}function xu(e){const t=Nt();t&&t.send("shell.themeChanged",{theme:e})}function $u(e,t){const n=Nt();n&&n.send("shell.tabChanged",{tab:e,title:t})}let di=null;function wu(e){const t=Nt();t&&(di=e,t.on("host.init",n=>{e.onInit?.(n)}),t.on("host.themeChanged",n=>{const s=n;s?.theme&&e.onThemeChanged?.(s.theme)}),t.on("host.navigate",n=>{const s=n;s?.tab&&e.onNavigate?.(s.tab)}),t.on("host.focus",n=>{const s=n;s?.target&&e.onFocus?.(s.target)}),t.on("host.fileDrop",n=>{const s=n;s?.files&&e.onFileDrop?.(s.files)}),t.on("host.windowState",n=>{const s=n;s?.state&&e.onWindowState?.(s.state)}),t.on("host.settingsChanged",n=>{n&&typeof n=="object"&&e.onSettingsChanged?.(n)}),t.on("host.commandPalette",()=>{e.onCommandPalette?.()}),t.on("host.execApprovalResult",n=>{const s=n;s?.requestId!=null&&e.onExecApprovalResult?.(s.requestId,!!s.approved,!!s.remember)}),t.on("host.devicePairResult",n=>{const s=n;s?.requestId!=null&&e.onDevicePairResult?.(s.requestId,!!s.approved)}))}function ku(){const e=Nt();!e||!di||(e.off("host.init"),e.off("host.themeChanged"),e.off("host.navigate"),e.off("host.focus"),e.off("host.fileDrop"),e.off("host.windowState"),e.off("host.settingsChanged"),e.off("host.commandPalette"),e.off("host.execApprovalResult"),e.off("host.devicePairResult"),di=null)}const nl={stepOf:(e,t)=>`Step ${e} of ${t}`,langTitle:"Welcome to OpenSoul",langSubtitle:"Choose your preferred language to get started.",langLabel:"Language",loginTitle:"Sign In",loginSubtitle:"Sign in to sync your settings and unlock all features.",loginWithGoogle:"Continue with Google",loginWithGithub:"Continue with GitHub",loginOrDivider:"or",loginSkipHint:"You can skip this step and sign in later from Settings.",loginSkip:"Skip for now",loginLogout:"Sign out",loginSuccess:"Signed in",loginError:"Sign-in failed. Please try again.",providerTitle:"Choose an AI Provider",providerSubtitle:"Select one or more AI model providers. You can always change this later in Settings.",providerSearch:"Search providers…",providerNoneSelected:"No provider selected yet.",providerSkip:"Skip for now",providerApiKeyPlaceholder:"Paste your API key…",providerConnected:"Connected",channelTitle:"Connect a Channel",channelSubtitle:"Link a messaging platform so your AI companion can chat with you. You can skip and configure this later.",channelSkip:"Skip for now",channelTokenPlaceholder:"Paste bot token…",confirmTitle:"You're All Set!",confirmSubtitle:"Review your choices and launch OpenSoul.",confirmLogin:"Account",confirmLoginNone:"Not signed in (sign in later)",confirmLanguage:"Language",confirmProvider:"AI Provider",confirmProviderNone:"None (configure later)",confirmChannel:"Channel",confirmChannelNone:"None (configure later)",confirmLaunch:"Launch OpenSoul",next:"Next",back:"Back",skip:"Skip",finish:"Finish"},Su={stepOf:(e,t)=>`第 ${e} 步，共 ${t} 步`,langTitle:"欢迎使用 OpenSoul",langSubtitle:"选择你偏好的语言以开始设置。",langLabel:"语言",loginTitle:"登录",loginSubtitle:"登录以同步你的设置并解锁所有功能。",loginWithGoogle:"使用 Google 登录",loginWithGithub:"使用 GitHub 登录",loginOrDivider:"或者",loginSkipHint:"你可以跳过此步骤，稍后在设置中登录。",loginSkip:"暂时跳过",loginLogout:"退出登录",loginSuccess:"已登录",loginError:"登录失败，请重试。",providerTitle:"选择 AI 提供商",providerSubtitle:"选择一个或多个 AI 模型提供商。你随时可以在设置中更改。",providerSearch:"搜索提供商…",providerNoneSelected:"尚未选择提供商。",providerSkip:"暂时跳过",providerApiKeyPlaceholder:"粘贴你的 API Key…",providerConnected:"已连接",channelTitle:"连接聊天渠道",channelSubtitle:"链接一个聊天平台，让你的 AI 伙伴与你对话。你也可以稍后配置。",channelSkip:"暂时跳过",channelTokenPlaceholder:"粘贴 Bot Token…",confirmTitle:"一切就绪！",confirmSubtitle:"检查你的选择，然后启动 OpenSoul。",confirmLogin:"账号",confirmLoginNone:"未登录（稍后登录）",confirmLanguage:"语言",confirmProvider:"AI 提供商",confirmProviderNone:"无（稍后配置）",confirmChannel:"聊天渠道",confirmChannelNone:"无（稍后配置）",confirmLaunch:"启动 OpenSoul",next:"下一步",back:"上一步",skip:"跳过",finish:"完成"},Au={stepOf:(e,t)=>`第 ${e} 步，共 ${t} 步`,langTitle:"歡迎使用 OpenSoul",langSubtitle:"選擇你偏好的語言以開始設定。",langLabel:"語言",loginTitle:"登入",loginSubtitle:"登入以同步你的設定並解鎖所有功能。",loginWithGoogle:"使用 Google 登入",loginWithGithub:"使用 GitHub 登入",loginOrDivider:"或者",loginSkipHint:"你可以跳過此步驟，稍後在設定中登入。",loginSkip:"暫時跳過",loginLogout:"登出",loginSuccess:"已登入",loginError:"登入失敗，請重試。",providerTitle:"選擇 AI 提供商",providerSubtitle:"選擇一個或多個 AI 模型提供商。你隨時可以在設定中更改。",providerSearch:"搜尋提供商…",providerNoneSelected:"尚未選擇提供商。",providerSkip:"暫時跳過",providerApiKeyPlaceholder:"貼上你的 API Key…",providerConnected:"已連接",channelTitle:"連接聊天頻道",channelSubtitle:"連結一個聊天平台，讓你的 AI 夥伴與你對話。你也可以稍後設定。",channelSkip:"暫時跳過",channelTokenPlaceholder:"貼上 Bot Token…",confirmTitle:"一切就緒！",confirmSubtitle:"檢查你的選擇，然後啟動 OpenSoul。",confirmLogin:"帳號",confirmLoginNone:"未登入（稍後登入）",confirmLanguage:"語言",confirmProvider:"AI 提供商",confirmProviderNone:"無（稍後設定）",confirmChannel:"聊天頻道",confirmChannelNone:"無（稍後設定）",confirmLaunch:"啟動 OpenSoul",next:"下一步",back:"上一步",skip:"跳過",finish:"完成"},Cu={stepOf:(e,t)=>`ステップ ${e} / ${t}`,langTitle:"OpenSoul へようこそ",langSubtitle:"お好みの言語を選択してください。",langLabel:"言語",loginTitle:"サインイン",loginSubtitle:"サインインして設定を同期し、すべての機能を利用しましょう。",loginWithGoogle:"Google で続ける",loginWithGithub:"GitHub で続ける",loginOrDivider:"または",loginSkipHint:"このステップをスキップして、後で設定からサインインできます。",loginSkip:"スキップ",loginLogout:"サインアウト",loginSuccess:"サインイン済み",loginError:"サインインに失敗しました。もう一度お試しください。",providerTitle:"AI プロバイダーを選択",providerSubtitle:"1つ以上のAIモデルプロバイダーを選択してください。設定でいつでも変更できます。",providerSearch:"プロバイダーを検索…",providerNoneSelected:"プロバイダーが選択されていません。",providerSkip:"スキップ",providerApiKeyPlaceholder:"API キーを貼り付け…",providerConnected:"接続済み",channelTitle:"チャンネルを接続",channelSubtitle:"メッセージングプラットフォームを接続して、AIコンパニオンとチャットしましょう。後で設定することもできます。",channelSkip:"スキップ",channelTokenPlaceholder:"ボットトークンを貼り付け…",confirmTitle:"準備完了！",confirmSubtitle:"設定を確認して、OpenSoul を起動します。",confirmLogin:"アカウント",confirmLoginNone:"未サインイン（後でサインイン）",confirmLanguage:"言語",confirmProvider:"AI プロバイダー",confirmProviderNone:"なし（後で設定）",confirmChannel:"チャンネル",confirmChannelNone:"なし（後で設定）",confirmLaunch:"OpenSoul を起動",next:"次へ",back:"戻る",skip:"スキップ",finish:"完了"},Tu={stepOf:(e,t)=>`${t}단계 중 ${e}단계`,langTitle:"OpenSoul에 오신 것을 환영합니다",langSubtitle:"원하는 언어를 선택하세요.",langLabel:"언어",loginTitle:"로그인",loginSubtitle:"로그인하여 설정을 동기화하고 모든 기능을 잠금 해제하세요.",loginWithGoogle:"Google로 계속",loginWithGithub:"GitHub로 계속",loginOrDivider:"또는",loginSkipHint:"이 단계를 건너뛰고 나중에 설정에서 로그인할 수 있습니다.",loginSkip:"건너뛰기",loginLogout:"로그아웃",loginSuccess:"로그인됨",loginError:"로그인에 실패했습니다. 다시 시도해 주세요.",providerTitle:"AI 제공자 선택",providerSubtitle:"하나 이상의 AI 모델 제공자를 선택하세요. 설정에서 언제든지 변경할 수 있습니다.",providerSearch:"제공자 검색…",providerNoneSelected:"선택된 제공자가 없습니다.",providerSkip:"건너뛰기",providerApiKeyPlaceholder:"API 키를 붙여넣기…",providerConnected:"연결됨",channelTitle:"채널 연결",channelSubtitle:"메시징 플랫폼을 연결하여 AI 동반자와 대화하세요. 나중에 설정할 수도 있습니다.",channelSkip:"건너뛰기",channelTokenPlaceholder:"봇 토큰 붙여넣기…",confirmTitle:"모두 준비되었습니다!",confirmSubtitle:"선택 사항을 검토하고 OpenSoul을 시작하세요.",confirmLogin:"계정",confirmLoginNone:"미로그인 (나중에 로그인)",confirmLanguage:"언어",confirmProvider:"AI 제공자",confirmProviderNone:"없음 (나중에 설정)",confirmChannel:"채널",confirmChannelNone:"없음 (나중에 설정)",confirmLaunch:"OpenSoul 시작",next:"다음",back:"뒤로",skip:"건너뛰기",finish:"완료"},_u={stepOf:(e,t)=>`Paso ${e} de ${t}`,langTitle:"Bienvenido a OpenSoul",langSubtitle:"Elige tu idioma preferido para comenzar.",langLabel:"Idioma",providerTitle:"Elige un proveedor de IA",providerSubtitle:"Selecciona uno o más proveedores de modelos de IA. Puedes cambiarlo en Configuración.",providerSearch:"Buscar proveedores…",providerNoneSelected:"Ningún proveedor seleccionado.",providerSkip:"Omitir por ahora",providerApiKeyPlaceholder:"Pega tu API key…",providerConnected:"Conectado",channelTitle:"Conectar un canal",channelSubtitle:"Vincula una plataforma de mensajería. Puedes configurarlo después.",channelSkip:"Omitir por ahora",channelTokenPlaceholder:"Pega el token del bot…",confirmTogin:"Cuenta",confirmLoginNone:"Sin iniciar sesión (iniciar sesión después)",confirmLitle:"¡Todo listo!",confirmSubtitle:"Revisa tus opciones e inicia OpenSoul.",confirmLanguage:"Idioma",confirmProvider:"Proveedor de IA",confirmProviderNone:"Ninguno (configurar después)",confirmChannel:"Canal",confirmChannelNone:"Ninguno (configurar después)",confirmLaunch:"Iniciar OpenSoul",next:"Siguiente",back:"Atrás",skip:"Omitir",finish:"Finalizar"},Lu={stepOf:(e,t)=>`Étape ${e} sur ${t}`,langTitle:"Bienvenue sur OpenSoul",langSubtitle:"Choisissez votre langue préférée pour commencer.",langLabel:"Langue",providerTitle:"Choisir un fournisseur IA",providerSubtitle:"Sélectionnez un ou plusieurs fournisseurs de modèles IA. Modifiable dans les paramètres.",providerSearch:"Rechercher…",providerNoneSelected:"Aucun fournisseur sélectionné.",providerSkip:"Passer pour l'instant",providerApiKeyPlaceholder:"Collez votre clé API…",providerConnected:"Connecté",channelTitle:"Connecter un canal",channelSubtitle:"Liez une plateforme de messagerie. Vous pouvez configurer plus tard.",channelSogin:"Compte",confirmLoginNone:"Non connecté (se connecter plus tard)",confirmLkip:"Passer pour l'instant",channelTokenPlaceholder:"Collez le token du bot…",confirmTitle:"Tout est prêt !",confirmSubtitle:"Vérifiez vos choix et lancez OpenSoul.",confirmLanguage:"Langue",confirmProvider:"Fournisseur IA",confirmProviderNone:"Aucun (configurer plus tard)",confirmChannel:"Canal",confirmChannelNone:"Aucun (configurer plus tard)",confirmLaunch:"Lancer OpenSoul",next:"Suivant",back:"Retour",skip:"Passer",finish:"Terminer"},Eu={stepOf:(e,t)=>`Schritt ${e} von ${t}`,langTitle:"Willkommen bei OpenSoul",langSubtitle:"Wähle deine bevorzugte Sprache.",langLabel:"Sprache",loginTitle:"Anmelden",loginSubtitle:"Melde dich an, um deine Einstellungen zu synchronisieren und alle Funktionen freizuschalten.",loginWithGoogle:"Weiter mit Google",loginWithGithub:"Weiter mit GitHub",loginOrDivider:"oder",loginSkipHint:"Du kannst diesen Schritt überspringen und dich später in den Einstellungen anmelden.",loginSkip:"Vorerst überspringen",loginLogout:"Abmelden",loginSuccess:"Angemeldet",loginError:"Anmeldung fehlgeschlagen. Bitte versuche es erneut.",providerTitle:"KI-Anbieter wählen",providerSubtitle:"Wähle einen oder mehrere KI-Modellanbieter. Du kannst dies jederzeit in den Einstellungen ändern.",providerSearch:"Anbieter suchen…",providerNoneSelected:"Kein Anbieter ausgewählt.",providerSkip:"Vorerst überspringen",providerApiKeyPlaceholder:"API-Schlüssel einfügen…",providerConnected:"Verbunden",channelTitle:"Kanal verbinden",channelSubtitle:"Verbinde eine Messaging-Plattform. Du kannst dies später konfigurieren.",channelSkip:"Vorerst überspringen",channelTokenPlaceholder:"Bot-Token einfügen…",confirmTitle:"Alles bereit!",confirmSubtitle:"Überprüfe deine Auswahl und starte OpenSoul.",confirmLogin:"Konto",confirmLoginNone:"Nicht angemeldet (später anmelden)",confirmLanguage:"Sprache",confirmProvider:"KI-Anbieter",confirmProviderNone:"Keiner (später konfigurieren)",confirmChannel:"Kanal",confirmChannelNone:"Keiner (später konfigurieren)",confirmLaunch:"OpenSoul starten",next:"Weiter",back:"Zurück",skip:"Überspringen",finish:"Fertig"},Iu={stepOf:(e,t)=>`Passo ${e} de ${t}`,langTitle:"Bem-vindo ao OpenSoul",langSubtitle:"Escolha seu idioma preferido para começar.",langLabel:"Idioma",loginTitle:"Entrar",loginSubtitle:"Entre para sincronizar suas configurações e desbloquear todos os recursos.",loginWithGoogle:"Continuar com Google",loginWithGithub:"Continuar com GitHub",loginOrDivider:"ou",loginSkipHint:"Você pode pular esta etapa e entrar mais tarde nas configurações.",loginSkip:"Pular por enquanto",loginLogout:"Sair",loginSuccess:"Conectado",loginError:"Falha ao entrar. Tente novamente.",providerTitle:"Escolha um provedor de IA",providerSubtitle:"Selecione um ou mais provedores de modelos de IA. Você pode alterar nas configurações.",providerSearch:"Buscar provedores…",providerNoneSelected:"Nenhum provedor selecionado.",providerSkip:"Pular por enquanto",providerApiKeyPlaceholder:"Cole sua chave API…",providerConnected:"Conectado",channelTitle:"Conectar um canal",channelSubtitle:"Vincule uma plataforma de mensagens. Você pode configurar depois.",channelSkip:"Pular por enquanto",channelTokenPlaceholder:"Cole o token do bot…",confirmTogin:"Conta",confirmLoginNone:"Não conectado (conectar depois)",confirmLitle:"Tudo pronto!",confirmSubtitle:"Revise suas escolhas e inicie o OpenSoul.",confirmLanguage:"Idioma",confirmProvider:"Provedor de IA",confirmProviderNone:"Nenhum (configurar depois)",confirmChannel:"Canal",confirmChannelNone:"Nenhum (configurar depois)",confirmLaunch:"Iniciar OpenSoul",next:"Próximo",back:"Voltar",skip:"Pular",finish:"Concluir"},Mu={stepOf:(e,t)=>`Шаг ${e} из ${t}`,langTitle:"Добро пожаловать в OpenSoul",langSubtitle:"Выберите предпочитаемый язык.",langLabel:"Язык",providerTitle:"Выберите провайдера ИИ",providerSubtitle:"Выберите одного или нескольких провайдеров. Вы всегда можете изменить это в настройках.",providerSearch:"Поиск провайдеров…",providerNoneSelected:"Провайдер не выбран.",providerSkip:"Пропустить",providerApiKeyPlaceholder:"Вставьте API ключ…",providerConnected:"Подключено",channelTitle:"Подключить канал",channelSubtitle:"Подключите мессенджер. Вы можете настроить это позже.",channelSkip:"Пропустить",channelTokenPlaceholder:"Вставьте токен бота…",confirmTogin:"Аккаунт",confirmLoginNone:"Не выполнен вход (войти позже)",confirmLitle:"Всё готово!",confirmSubtitle:"Проверьте настройки и запустите OpenSoul.",confirmLanguage:"Язык",confirmProvider:"Провайдер ИИ",confirmProviderNone:"Нет (настроить позже)",confirmChannel:"Канал",confirmChannelNone:"Нет (настроить позже)",confirmLaunch:"Запустить OpenSoul",next:"Далее",back:"Назад",skip:"Пропустить",finish:"Готово"},Ru={en:nl,"zh-CN":Su,"zh-TW":Au,ja:Cu,ko:Tu,es:_u,fr:Lu,de:Eu,"pt-BR":Iu,ru:Mu},ls=[{value:"en",label:"English",nativeLabel:"English"},{value:"zh-CN",label:"Chinese (Simplified)",nativeLabel:"简体中文"},{value:"zh-TW",label:"Chinese (Traditional)",nativeLabel:"繁體中文"},{value:"ja",label:"Japanese",nativeLabel:"日本語"},{value:"ko",label:"Korean",nativeLabel:"한국어"},{value:"es",label:"Spanish",nativeLabel:"Español"},{value:"fr",label:"French",nativeLabel:"Français"},{value:"de",label:"German",nativeLabel:"Deutsch"},{value:"pt-BR",label:"Portuguese (Brazil)",nativeLabel:"Português (Brasil)"},{value:"ru",label:"Russian",nativeLabel:"Русский"}];function et(e){return Ru[e]??nl}function ui(){const t=(navigator.language??"en").toLowerCase();return t.startsWith("zh-tw")||t.startsWith("zh-hant")?"zh-TW":t.startsWith("zh")?"zh-CN":t.startsWith("ja")?"ja":t.startsWith("ko")?"ko":t.startsWith("es")?"es":t.startsWith("fr")?"fr":t.startsWith("de")?"de":t.startsWith("pt")?"pt-BR":t.startsWith("ru")?"ru":"en"}const sl="opensoul.ui.locale",Pu=new Set(ls.map(e=>e.value));function Du(e){const t=String(e??"").trim();return Pu.has(t)?t:ui()}function il(){if(typeof localStorage>"u")return ui();try{return Du(localStorage.getItem(sl))}catch{return ui()}}function Ps(e){if(typeof document<"u"&&(document.documentElement.lang=e),!(typeof localStorage>"u"))try{localStorage.setItem(sl,e)}catch{}}function Nu(e){return String(e??"").trim().toLowerCase().startsWith("zh")}function j(e,t,n){return Nu(e)?n:t}const Fu=[{label:"Assist",tabs:["chat"]},{label:"Operate",tabs:["channels","instances","sessions","usage","cron"]},{label:"Build",tabs:["agents","skills","nodes"]},{label:"System",tabs:["overview"]}],ol=["config","logs","debug"],al={agents:"/agents",overview:"/overview",channels:"/channels",instances:"/instances",sessions:"/sessions",usage:"/usage",cron:"/cron",skills:"/skills",nodes:"/nodes",chat:"/chat",config:"/config",debug:"/debug",logs:"/logs"},rl=new Map(Object.entries(al).map(([e,t])=>[t,e]));function hn(e){if(!e)return"";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t==="/"?"":(t.endsWith("/")&&(t=t.slice(0,-1)),t)}function rn(e){if(!e)return"/";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t.length>1&&t.endsWith("/")&&(t=t.slice(0,-1)),t}function cs(e,t=""){const n=hn(t),s=al[e];return n?`${n}${s}`:s}function to(e,t=""){const n=hn(t);let s=e||"/";n&&(s===n?s="/":s.startsWith(`${n}/`)&&(s=s.slice(n.length)));let i=rn(s).toLowerCase();return i.endsWith("/index.html")&&(i="/"),i==="/"?"chat":rl.get(i)??null}function Ou(e){let t=rn(e);if(t.endsWith("/index.html")&&(t=rn(t.slice(0,-11))),t==="/")return"";const n=t.split("/").filter(Boolean);if(n.length===0)return"";for(let s=0;s<n.length;s++){const i=`/${n.slice(s).join("/")}`.toLowerCase();if(rl.has(i)){const o=n.slice(0,s);return o.length?`/${o.join("/")}`:""}}return`/${n.join("/")}`}function Bu(e){switch(e){case"agents":return"folder";case"chat":return"messageSquare";case"overview":return"barChart";case"channels":return"link";case"instances":return"radio";case"sessions":return"fileText";case"usage":return"barChart";case"cron":return"loader";case"skills":return"zap";case"nodes":return"monitor";case"config":return"settings";case"debug":return"bug";case"logs":return"scrollText";default:return"folder"}}function Uu(e,t){switch(e){case"Assist":return j(t,"Assist","助手");case"Operate":return j(t,"Operate","运维");case"Build":return j(t,"Build","构建");case"System":return j(t,"System","系统");default:return e}}function no(e,t){switch(e){case"agents":return j(t,"Agents","代理");case"overview":return j(t,"Overview","总览");case"channels":return j(t,"Channels","渠道");case"instances":return j(t,"Instances","实例");case"sessions":return j(t,"Sessions","会话");case"usage":return j(t,"Usage","用量");case"cron":return j(t,"Cron Jobs","定时任务");case"skills":return j(t,"Skills","技能");case"nodes":return j(t,"Nodes","节点");case"chat":return j(t,"Chat","聊天");case"config":return j(t,"Config","配置");case"debug":return j(t,"Debug","调试");case"logs":return j(t,"Logs","日志");default:return j(t,"Control","控制台")}}function zu(e,t){switch(e){case"agents":return j(t,"Build and manage agent workspaces, tools, and identities.","构建和管理代理工作区、工具与身份信息。");case"overview":return j(t,"System health, entry points, and fast operational diagnostics.","系统健康状态、入口与快速运维诊断。");case"channels":return j(t,"Operate and monitor channel connectivity and settings.","运营并监控渠道连接与配置。");case"instances":return j(t,"Live presence beacons from connected clients and nodes.","来自已连接客户端与节点的在线状态信标。");case"sessions":return j(t,"Inspect active sessions and adjust per-session behavior.","查看活跃会话并调整每个会话的行为。");case"usage":return"";case"cron":return j(t,"Schedule wakeups and recurring automated agent runs.","安排唤醒与周期性自动代理执行。");case"skills":return j(t,"Manage skill availability and API key injection across agents.","管理技能可用性与跨代理 API Key 注入。");case"nodes":return j(t,"Manage paired devices, capabilities, and command exposure.","管理配对设备、能力与命令暴露。");case"chat":return j(t,"Direct assistant workspace for fast interventions and control.","直接与助手交互的工作区，用于快速控制与干预。");case"config":return j(t,"Edit ~/.opensoul/opensoul.json with schema-aware safeguards.","以 schema 感知保护编辑 ~/.opensoul/opensoul.json。");case"debug":return j(t,"Advanced snapshots, event inspection, and manual RPC calls.","高级快照、事件检查与手动 RPC 调用。");case"logs":return j(t,"Live tail of gateway file logs with operational filtering.","网关文件日志实时追踪与运维过滤。");default:return""}}const ll="opensoul.control.settings.v1";function Hu(){const t={gatewayUrl:`${location.protocol==="https:"?"wss":"ws"}://${location.host}`,token:"",sessionKey:"main",lastActiveSessionKey:"main",theme:"system",chatFocusMode:!1,chatShowThinking:!0,splitRatio:.6,navCollapsed:!1,navGroupsCollapsed:{},operateZoomLevel:1};try{const n=localStorage.getItem(ll);if(!n)return t;const s=JSON.parse(n);return{gatewayUrl:typeof s.gatewayUrl=="string"&&s.gatewayUrl.trim()?s.gatewayUrl.trim():t.gatewayUrl,token:typeof s.token=="string"?s.token:t.token,sessionKey:typeof s.sessionKey=="string"&&s.sessionKey.trim()?s.sessionKey.trim():t.sessionKey,lastActiveSessionKey:typeof s.lastActiveSessionKey=="string"&&s.lastActiveSessionKey.trim()?s.lastActiveSessionKey.trim():typeof s.sessionKey=="string"&&s.sessionKey.trim()||t.lastActiveSessionKey,theme:s.theme==="light"||s.theme==="dark"||s.theme==="system"?s.theme:t.theme,chatFocusMode:typeof s.chatFocusMode=="boolean"?s.chatFocusMode:t.chatFocusMode,chatShowThinking:typeof s.chatShowThinking=="boolean"?s.chatShowThinking:t.chatShowThinking,splitRatio:typeof s.splitRatio=="number"&&s.splitRatio>=.4&&s.splitRatio<=.7?s.splitRatio:t.splitRatio,navCollapsed:typeof s.navCollapsed=="boolean"?s.navCollapsed:t.navCollapsed,navGroupsCollapsed:typeof s.navGroupsCollapsed=="object"&&s.navGroupsCollapsed!==null?s.navGroupsCollapsed:t.navGroupsCollapsed,operateZoomLevel:typeof s.operateZoomLevel=="number"&&s.operateZoomLevel>=.5&&s.operateZoomLevel<=3?s.operateZoomLevel:t.operateZoomLevel}}catch{return t}}function Ku(e){localStorage.setItem(ll,JSON.stringify(e))}const An=e=>Number.isNaN(e)?.5:e<=0?0:e>=1?1:e,ju=()=>typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches??!1,Cn=e=>{e.classList.remove("theme-transition"),e.style.removeProperty("--theme-switch-x"),e.style.removeProperty("--theme-switch-y")},Wu=({nextTheme:e,applyTheme:t,context:n,currentTheme:s})=>{if(s===e)return;const i=globalThis.document??null;if(!i){t();return}const o=i.documentElement,a=i,l=ju();if(!!a.startViewTransition&&!l){let u=.5,g=.5;if(n?.pointerClientX!==void 0&&n?.pointerClientY!==void 0&&typeof window<"u")u=An(n.pointerClientX/window.innerWidth),g=An(n.pointerClientY/window.innerHeight);else if(n?.element){const p=n.element.getBoundingClientRect();p.width>0&&p.height>0&&typeof window<"u"&&(u=An((p.left+p.width/2)/window.innerWidth),g=An((p.top+p.height/2)/window.innerHeight))}o.style.setProperty("--theme-switch-x",`${u*100}%`),o.style.setProperty("--theme-switch-y",`${g*100}%`),o.classList.add("theme-transition");try{const p=a.startViewTransition?.(()=>{t()});p?.finished?p.finished.finally(()=>Cn(o)):Cn(o)}catch{Cn(o),t()}return}t(),Cn(o)};function Gu(){return typeof window>"u"||typeof window.matchMedia!="function"||window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function so(e){return e==="system"?Gu():e}function We(e,t){const n={...t,lastActiveSessionKey:t.lastActiveSessionKey?.trim()||t.sessionKey.trim()||"main"};e.settings=n,Ku(n),t.theme!==e.theme&&(e.theme=t.theme,ds(e,so(t.theme))),e.applySessionKey=e.settings.lastActiveSessionKey}function cl(e,t){const n=t.trim();n&&e.settings.lastActiveSessionKey!==n&&We(e,{...e.settings,lastActiveSessionKey:n})}function qu(e){if(!window.location.search&&!window.location.hash)return;const t=new URL(window.location.href),n=new URLSearchParams(t.search),s=new URLSearchParams(t.hash.startsWith("#")?t.hash.slice(1):t.hash),i=n.get("token")??s.get("token"),o=n.get("password")??s.get("password"),a=n.get("session")??s.get("session"),l=n.get("gatewayUrl")??s.get("gatewayUrl");let c=!1;if(i!=null){const g=i.trim();g&&g!==e.settings.token&&We(e,{...e.settings,token:g}),n.delete("token"),s.delete("token"),c=!0}if(o!=null){const g=o.trim();g&&(e.password=g),n.delete("password"),s.delete("password"),c=!0}if(a!=null){const g=a.trim();g&&(e.sessionKey=g,We(e,{...e.settings,sessionKey:g,lastActiveSessionKey:g}))}if(l!=null){const g=l.trim();g&&g!==e.settings.gatewayUrl&&(e.pendingGatewayUrl=g),n.delete("gatewayUrl"),s.delete("gatewayUrl"),c=!0}if(!c)return;t.search=n.toString();const u=s.toString();t.hash=u?`#${u}`:"",window.history.replaceState({},"",t.toString())}function dl(e,t){if(ol.includes(t)){e.openSettings(t),ln({...e,tab:t});return}e.tab!==t&&(e.tab=t),$u(t,no(t,e.uiLocale)),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Ui(e):zi(e),t==="debug"?Hi(e):Ki(e),ln(e),gl(e,t,!1)}function gi(e,t,n){Wu({nextTheme:t,applyTheme:()=>{e.theme=t,We(e,{...e.settings,theme:t}),ds(e,so(t))},context:n,currentTheme:e.theme})}async function ln(e){if(e.tab==="overview"&&await pl(e),e.tab==="channels"&&await tg(e),e.tab==="instances"&&await eo(e),e.tab==="sessions"&&await xt(e),e.tab==="cron"&&await qn(e),e.tab==="skills"&&await pn(e),e.tab==="agents"){await ji(e),await ke(e);const t=e.agentsList?.agents?.map(s=>s.id)??[];t.length>0&&Dr(e,t);const n=e.agentsSelectedId??e.agentsList?.defaultId??e.agentsList?.agents?.[0]?.id;n&&(Pr(e,n),e.agentsPanel==="skills"&&On(e,n),e.agentsPanel==="channels"&&xe(e,!1),e.agentsPanel==="cron"&&qn(e))}e.tab==="nodes"&&(await is(e),await Xe(e),await ke(e),await Xi(e)),e.tab==="chat"&&(await xl(e),un(e,!e.chatHasAutoScrolled)),e.tab==="config"&&(await Kn(e),await ke(e)),e.tab==="debug"&&(await Rt(e),e.eventLog=e.eventLogBuffer),e.tab==="logs"&&(e.logsAtBottom=!0,await on(e,{reset:!0}),Rr(e,!0))}function Vu(){if(typeof window>"u")return"";const e=window.__OPENSOUL_CONTROL_UI_BASE_PATH__;return typeof e=="string"&&e.trim()?hn(e):Ou(window.location.pathname)}function Qu(e){e.theme=e.settings.theme??"system",ds(e,so(e.theme))}function ds(e,t){if(e.themeResolved=t,typeof document>"u")return;const n=document.documentElement;n.dataset.theme=t,n.style.colorScheme=t,xu(t)}function Yu(e){if(typeof window>"u"||typeof window.matchMedia!="function")return;if(e.themeMedia=window.matchMedia("(prefers-color-scheme: dark)"),e.themeMediaHandler=n=>{e.theme==="system"&&ds(e,n.matches?"dark":"light")},typeof e.themeMedia.addEventListener=="function"){e.themeMedia.addEventListener("change",e.themeMediaHandler);return}e.themeMedia.addListener(e.themeMediaHandler)}function Zu(e){if(!e.themeMedia||!e.themeMediaHandler)return;if(typeof e.themeMedia.removeEventListener=="function"){e.themeMedia.removeEventListener("change",e.themeMediaHandler);return}e.themeMedia.removeListener(e.themeMediaHandler),e.themeMedia=null,e.themeMediaHandler=null}function Ju(e,t){if(typeof window>"u")return;const n=to(window.location.pathname,e.basePath)??"chat";ul(e,n),gl(e,n,t)}function Xu(e){if(typeof window>"u")return;const t=to(window.location.pathname,e.basePath);if(!t)return;const s=new URL(window.location.href).searchParams.get("session")?.trim();s&&(e.sessionKey=s,We(e,{...e.settings,sessionKey:s,lastActiveSessionKey:s})),ul(e,t)}function ul(e,t){if(ol.includes(t)){e.openSettings(t),e.connected&&ln({...e,tab:t});return}e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?Ui(e):zi(e),t==="debug"?Hi(e):Ki(e),e.connected&&ln(e)}function gl(e,t,n){if(typeof window>"u")return;const s=rn(cs(t,e.basePath)),i=rn(window.location.pathname),o=new URL(window.location.href);t==="chat"&&e.sessionKey?o.searchParams.set("session",e.sessionKey):o.searchParams.delete("session"),i!==s&&(o.pathname=s),n?window.history.replaceState({},"",o.toString()):window.history.pushState({},"",o.toString())}function eg(e,t,n){if(typeof window>"u")return;const s=new URL(window.location.href);s.searchParams.set("session",t),window.history.replaceState({},"",s.toString())}async function pl(e){await Promise.all([xe(e,!1),eo(e),xt(e),gn(e),Rt(e)])}async function tg(e){await Promise.all([xe(e,!0),Kn(e),ke(e)])}async function qn(e){await Promise.all([xe(e,!1),gn(e),os(e)])}const ga=50,ng=80,sg=12e4;function ig(e){if(!e||typeof e!="object")return null;const t=e;if(typeof t.text=="string")return t.text;const n=t.content;if(!Array.isArray(n))return null;const s=n.map(i=>{if(!i||typeof i!="object")return null;const o=i;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(i=>!!i);return s.length===0?null:s.join(`
`)}function pa(e){if(e==null)return null;if(typeof e=="number"||typeof e=="boolean")return String(e);const t=ig(e);let n;if(typeof e=="string")n=e;else if(t)n=t;else try{n=JSON.stringify(e,null,2)}catch{n=String(e)}const s=Nr(n,sg);return s.truncated?`${s.text}

… truncated (${s.total} chars, showing first ${s.text.length}).`:s.text}function og(e){const t=[];return t.push({type:"toolcall",name:e.name,arguments:e.args??{}}),e.output&&t.push({type:"toolresult",name:e.name,text:e.output}),{role:"assistant",toolCallId:e.toolCallId,runId:e.runId,content:t,timestamp:e.startedAt}}function ag(e){if(e.toolStreamOrder.length<=ga)return;const t=e.toolStreamOrder.length-ga,n=e.toolStreamOrder.splice(0,t);for(const s of n)e.toolStreamById.delete(s)}function rg(e){e.chatToolMessages=e.toolStreamOrder.map(t=>e.toolStreamById.get(t)?.message).filter(t=>!!t)}function pi(e){e.toolStreamSyncTimer!=null&&(clearTimeout(e.toolStreamSyncTimer),e.toolStreamSyncTimer=null),rg(e)}function lg(e,t=!1){if(t){pi(e);return}e.toolStreamSyncTimer==null&&(e.toolStreamSyncTimer=window.setTimeout(()=>pi(e),ng))}function us(e){e.toolStreamById.clear(),e.toolStreamOrder=[],e.chatToolMessages=[],pi(e)}const cg=5e3;function dg(e,t){const n=t.data??{},s=typeof n.phase=="string"?n.phase:"";e.compactionClearTimer!=null&&(window.clearTimeout(e.compactionClearTimer),e.compactionClearTimer=null),s==="start"?e.compactionStatus={active:!0,startedAt:Date.now(),completedAt:null}:s==="end"&&(e.compactionStatus={active:!1,startedAt:e.compactionStatus?.startedAt??null,completedAt:Date.now()},e.compactionClearTimer=window.setTimeout(()=>{e.compactionStatus=null,e.compactionClearTimer=null},cg))}function ug(e,t){if(!t)return;if(t.stream==="compaction"){dg(e,t);return}if(t.stream!=="tool")return;const n=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(n&&n!==e.sessionKey||!n&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;const s=t.data??{},i=typeof s.toolCallId=="string"?s.toolCallId:"";if(!i)return;const o=typeof s.name=="string"?s.name:"tool",a=typeof s.phase=="string"?s.phase:"",l=a==="start"?s.args:void 0,c=a==="update"?pa(s.partialResult):a==="result"?pa(s.result):void 0,u=Date.now();let g=e.toolStreamById.get(i);g?(g.name=o,l!==void 0&&(g.args=l),c!==void 0&&(g.output=c||void 0),g.updatedAt=u):(g={toolCallId:i,runId:t.runId,sessionKey:n,name:o,args:l,output:c||void 0,startedAt:typeof t.ts=="number"?t.ts:u,updatedAt:u,message:{}},e.toolStreamById.set(i,g),e.toolStreamOrder.push(i)),g.message=og(g),ag(e),lg(e,a==="result")}const gg=/^\[([^\]]+)\]\s*/,pg=["WebChat","WhatsApp","Telegram","Signal","Slack","Discord","iMessage","Teams","Matrix","Zalo","Zalo Personal","BlueBubbles"],Ds=new WeakMap,Ns=new WeakMap;function hg(e){return/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}Z\b/.test(e)||/\d{4}-\d{2}-\d{2} \d{2}:\d{2}\b/.test(e)?!0:pg.some(t=>e.startsWith(`${t} `))}function Fs(e){const t=e.match(gg);if(!t)return e;const n=t[1]??"";return hg(n)?e.slice(t[0].length):e}function hi(e){const t=e,n=typeof t.role=="string"?t.role:"",s=t.content;if(typeof s=="string")return n==="assistant"?Ls(s):Fs(s);if(Array.isArray(s)){const i=s.map(o=>{const a=o;return a.type==="text"&&typeof a.text=="string"?a.text:null}).filter(o=>typeof o=="string");if(i.length>0){const o=i.join(`
`);return n==="assistant"?Ls(o):Fs(o)}}return typeof t.text=="string"?n==="assistant"?Ls(t.text):Fs(t.text):null}function hl(e){if(!e||typeof e!="object")return hi(e);const t=e;if(Ds.has(t))return Ds.get(t)??null;const n=hi(e);return Ds.set(t,n),n}function ha(e){const n=e.content,s=[];if(Array.isArray(n))for(const l of n){const c=l;if(c.type==="thinking"&&typeof c.thinking=="string"){const u=c.thinking.trim();u&&s.push(u)}}if(s.length>0)return s.join(`
`);const i=vg(e);if(!i)return null;const a=[...i.matchAll(/<\s*think(?:ing)?\s*>([\s\S]*?)<\s*\/\s*think(?:ing)?\s*>/gi)].map(l=>(l[1]??"").trim()).filter(Boolean);return a.length>0?a.join(`
`):null}function fg(e){if(!e||typeof e!="object")return ha(e);const t=e;if(Ns.has(t))return Ns.get(t)??null;const n=ha(e);return Ns.set(t,n),n}function vg(e){const t=e,n=t.content;if(typeof n=="string")return n;if(Array.isArray(n)){const s=n.map(i=>{const o=i;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(i=>typeof i=="string");if(s.length>0)return s.join(`
`)}return typeof t.text=="string"?t.text:null}function mg(e){const t=e.trim();if(!t)return"";const n=t.split(/\r?\n/).map(s=>s.trim()).filter(Boolean).map(s=>`_${s}_`);return n.length?["_Reasoning:_",...n].join(`
`):""}let fa=!1;function va(e){e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t="";for(let n=0;n<e.length;n++)t+=e[n].toString(16).padStart(2,"0");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}function bg(){const e=new Uint8Array(16),t=Date.now();for(let n=0;n<e.length;n++)e[n]=Math.floor(Math.random()*256);return e[0]^=t&255,e[1]^=t>>>8&255,e[2]^=t>>>16&255,e[3]^=t>>>24&255,e}function yg(){fa||(fa=!0,console.warn("[uuid] crypto API missing; falling back to weak randomness"))}function io(e=globalThis.crypto){if(e&&typeof e.randomUUID=="function")return e.randomUUID();if(e&&typeof e.getRandomValues=="function"){const t=new Uint8Array(16);return e.getRandomValues(t),va(t)}return yg(),va(bg())}async function cn(e){if(!(!e.client||!e.connected)){e.chatLoading=!0,e.lastError=null;try{const t=await e.client.request("chat.history",{sessionKey:e.sessionKey,limit:200});e.chatMessages=Array.isArray(t.messages)?t.messages:[],e.chatThinkingLevel=t.thinkingLevel??null}catch(t){e.lastError=String(t)}finally{e.chatLoading=!1}}}function xg(e){const t=/^data:([^;]+);base64,(.+)$/.exec(e);return t?{mimeType:t[1],content:t[2]}:null}async function $g(e,t,n){if(!e.client||!e.connected)return null;const s=t.trim(),i=n&&n.length>0;if(!s&&!i)return null;const o=Date.now(),a=[];if(s&&a.push({type:"text",text:s}),i)for(const u of n)a.push({type:"image",source:{type:"base64",media_type:u.mimeType,data:u.dataUrl}});e.chatMessages=[...e.chatMessages,{role:"user",content:a,timestamp:o}],e.chatSending=!0,e.lastError=null;const l=io();e.chatRunId=l,e.chatStream="",e.chatStreamStartedAt=o;const c=i?n.map(u=>{const g=xg(u.dataUrl);return g?{type:"image",mimeType:g.mimeType,content:g.content}:null}).filter(u=>u!==null):void 0;try{return await e.client.request("chat.send",{sessionKey:e.sessionKey,message:s,deliver:!1,idempotencyKey:l,attachments:c}),l}catch(u){const g=String(u);return e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,e.lastError=g,e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:"Error: "+g}],timestamp:Date.now()}],null}finally{e.chatSending=!1}}async function wg(e){if(!e.client||!e.connected)return!1;const t=e.chatRunId;try{return await e.client.request("chat.abort",t?{sessionKey:e.sessionKey,runId:t}:{sessionKey:e.sessionKey}),!0}catch(n){return e.lastError=String(n),!1}}function kg(e,t){if(!t||t.sessionKey!==e.sessionKey)return null;if(t.runId&&e.chatRunId&&t.runId!==e.chatRunId)return t.state==="final"?"final":null;if(t.state==="delta"){const n=hi(t.message);if(typeof n=="string"){const s=e.chatStream??"";(!s||n.length>=s.length)&&(e.chatStream=n)}}else t.state==="final"||t.state==="aborted"?(e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null):t.state==="error"&&(e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null,e.lastError=t.errorMessage??"chat error");return t.state}const fl=120;function vl(e){return e.chatSending||!!e.chatRunId}function Sg(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/stop"?!0:n==="stop"||n==="esc"||n==="abort"||n==="wait"||n==="exit"}function Ag(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/new"||n==="/reset"?!0:n.startsWith("/new ")||n.startsWith("/reset ")}async function ml(e){e.connected&&(e.chatMessage="",await wg(e))}function Cg(e,t,n,s){const i=t.trim(),o=!!(n&&n.length>0);!i&&!o||(e.chatQueue=[...e.chatQueue,{id:io(),text:i,createdAt:Date.now(),attachments:o?n?.map(a=>({...a})):void 0,refreshSessions:s}])}async function bl(e,t,n){us(e);const s=await $g(e,t,n?.attachments),i=!!s;return!i&&n?.previousDraft!=null&&(e.chatMessage=n.previousDraft),!i&&n?.previousAttachments&&(e.chatAttachments=n.previousAttachments),i&&cl(e,e.sessionKey),i&&n?.restoreDraft&&n.previousDraft?.trim()&&(e.chatMessage=n.previousDraft),i&&n?.restoreAttachments&&n.previousAttachments?.length&&(e.chatAttachments=n.previousAttachments),un(e),i&&!e.chatRunId&&yl(e),i&&n?.refreshSessions&&s&&e.refreshSessionsAfterChat.add(s),i}async function yl(e){if(!e.connected||vl(e))return;const[t,...n]=e.chatQueue;if(!t)return;e.chatQueue=n,await bl(e,t.text,{attachments:t.attachments,refreshSessions:t.refreshSessions})||(e.chatQueue=[t,...e.chatQueue])}function Tg(e,t){e.chatQueue=e.chatQueue.filter(n=>n.id!==t)}async function _g(e,t,n){if(!e.connected)return;const s=e.chatMessage,i=(t??e.chatMessage).trim(),o=e.chatAttachments??[],a=t==null?o:[],l=a.length>0;if(!i&&!l)return;if(Sg(i)){await ml(e);return}const c=Ag(i);if(t==null&&(e.chatMessage="",e.chatAttachments=[]),vl(e)){Cg(e,i,a,c);return}await bl(e,i,{previousDraft:t==null?s:void 0,restoreDraft:!!(t&&n?.restoreDraft),attachments:l?a:void 0,previousAttachments:t==null?o:void 0,restoreAttachments:!!(t&&n?.restoreDraft),refreshSessions:c})}async function xl(e,t){await Promise.all([cn(e),xt(e,{activeMinutes:fl}),fi(e)]),t?.scheduleScroll!==!1&&un(e)}const Lg=yl;function Eg(e){const t=Mr(e.sessionKey);return t?.agentId?t.agentId:e.hello?.snapshot?.sessionDefaults?.defaultAgentId?.trim()||"main"}function Ig(e,t){const n=hn(e),s=encodeURIComponent(t);return n?`${n}/avatar/${s}?meta=1`:`/avatar/${s}?meta=1`}async function fi(e){if(!e.connected){e.chatAvatarUrl=null;return}const t=Eg(e);if(!t){e.chatAvatarUrl=null;return}e.chatAvatarUrl=null;const n=Ig(e.basePath,t);try{const s=await fetch(n,{method:"GET"});if(!s.ok){e.chatAvatarUrl=null;return}const i=await s.json(),o=typeof i.avatarUrl=="string"?i.avatarUrl.trim():"";e.chatAvatarUrl=o||null}catch{e.chatAvatarUrl=null}}const Mg={trace:!0,debug:!0,info:!0,warn:!0,error:!0,fatal:!0},Rg={name:"",description:"",agentId:"",enabled:!0,scheduleKind:"every",scheduleAt:"",everyAmount:"30",everyUnit:"minutes",cronExpr:"0 7 * * *",cronTz:"",sessionTarget:"isolated",wakeMode:"now",payloadKind:"agentTurn",payloadText:"",deliveryMode:"announce",deliveryChannel:"last",deliveryTo:"",timeoutSeconds:""},Pg=50,Dg=200,Ng="Assistant";function ma(e,t){if(typeof e!="string")return;const n=e.trim();if(n)return n.length<=t?n:n.slice(0,t)}function vi(e){const t=ma(e?.name,Pg)??Ng,n=ma(e?.avatar??void 0,Dg)??null;return{agentId:typeof e?.agentId=="string"&&e.agentId.trim()?e.agentId.trim():null,name:t,avatar:n}}function Fg(){return vi(typeof window>"u"?{}:{name:window.__OPENSOUL_ASSISTANT_NAME__,avatar:window.__OPENSOUL_ASSISTANT_AVATAR__})}async function $l(e,t){if(!e.client||!e.connected)return;const n=e.sessionKey.trim(),s=n?{sessionKey:n}:{};try{const i=await e.client.request("agent.identity.get",s);if(!i)return;const o=vi(i);e.assistantName=o.name,e.assistantAvatar=o.avatar,e.assistantAgentId=o.agentId??null}catch{}}function mi(e){return typeof e=="object"&&e!==null}function Og(e){if(!mi(e))return null;const t=typeof e.id=="string"?e.id.trim():"",n=e.request;if(!t||!mi(n))return null;const s=typeof n.command=="string"?n.command.trim():"";if(!s)return null;const i=typeof e.createdAtMs=="number"?e.createdAtMs:0,o=typeof e.expiresAtMs=="number"?e.expiresAtMs:0;return!i||!o?null:{id:t,request:{command:s,cwd:typeof n.cwd=="string"?n.cwd:null,host:typeof n.host=="string"?n.host:null,security:typeof n.security=="string"?n.security:null,ask:typeof n.ask=="string"?n.ask:null,agentId:typeof n.agentId=="string"?n.agentId:null,resolvedPath:typeof n.resolvedPath=="string"?n.resolvedPath:null,sessionKey:typeof n.sessionKey=="string"?n.sessionKey:null},createdAtMs:i,expiresAtMs:o}}function Bg(e){if(!mi(e))return null;const t=typeof e.id=="string"?e.id.trim():"";return t?{id:t,decision:typeof e.decision=="string"?e.decision:null,resolvedBy:typeof e.resolvedBy=="string"?e.resolvedBy:null,ts:typeof e.ts=="number"?e.ts:null}:null}function wl(e){const t=Date.now();return e.filter(n=>n.expiresAtMs>t)}function Ug(e,t){const n=wl(e).filter(s=>s.id!==t.id);return n.push(t),n}function ba(e,t){return wl(e).filter(n=>n.id!==t)}function zg(e){const t=e.version??(e.nonce?"v2":"v1"),n=e.scopes.join(","),s=e.token??"",i=[t,e.deviceId,e.clientId,e.clientMode,e.role,n,String(e.signedAtMs),s];return t==="v2"&&i.push(e.nonce??""),i.join("|")}const kl={WEBCHAT_UI:"webchat-ui",CONTROL_UI:"opensoul-control-ui",WEBCHAT:"webchat",CLI:"cli",GATEWAY_CLIENT:"gateway-client",MACOS_APP:"opensoul-macos",IOS_APP:"opensoul-ios",ANDROID_APP:"opensoul-android",NODE_HOST:"node-host",TEST:"test",FINGERPRINT:"fingerprint",PROBE:"opensoul-probe"},ya=kl,bi={WEBCHAT:"webchat",CLI:"cli",UI:"ui",BACKEND:"backend",NODE:"node",PROBE:"probe",TEST:"test"};new Set(Object.values(kl));new Set(Object.values(bi));const Hg=4008;class Kg{constructor(t){this.opts=t,this.ws=null,this.pending=new Map,this.closed=!1,this.lastSeq=null,this.connectNonce=null,this.connectSent=!1,this.connectTimer=null,this.backoffMs=200,this.phase="dialing",this.reconnectAttempt=0,this.lastConnectFailure=null}start(){this.closed=!1,this.connect()}stop(){this.closed=!0,this.ws?.close(),this.ws=null,this.flushPending(new Error("gateway client stopped"))}get connected(){return this.ws?.readyState===WebSocket.OPEN}connect(){this.closed||(this.phase="dialing",this.ws=new WebSocket(this.opts.url),this.ws.addEventListener("open",()=>this.queueConnect()),this.ws.addEventListener("message",t=>this.handleMessage(String(t.data??""))),this.ws.addEventListener("close",t=>{const n=this.phase,s=this.closed?null:this.backoffMs,i=this.reconnectAttempt,o=this.lastConnectFailure??void 0;this.lastConnectFailure=null;const a=String(t.reason??"");this.ws=null,this.flushPending(new Error(`gateway closed (${t.code}): ${a}`)),this.opts.onClose?.({code:t.code,reason:a,phase:n,url:this.opts.url,reconnectInMs:s,reconnectAttempt:i,failure:o}),this.scheduleReconnect()}),this.ws.addEventListener("error",()=>{}))}scheduleReconnect(){if(this.closed)return;const t=this.backoffMs;this.phase="reconnecting",this.reconnectAttempt+=1,this.backoffMs=Math.min(this.backoffMs*1.5,1e4),window.setTimeout(()=>this.connect(),t)}flushPending(t){for(const[,n]of this.pending)n.reject(t);this.pending.clear()}async sendConnect(){if(this.connectSent)return;this.connectSent=!0,this.connectTimer!==null&&(window.clearTimeout(this.connectTimer),this.connectTimer=null);const t=typeof crypto<"u"&&!!crypto.subtle,n=["operator.admin","operator.approvals","operator.pairing"],s="operator";let i=null,o=!1,a=this.opts.token;if(t){i=await Ji();const g=Ed({deviceId:i.deviceId,role:s})?.token;a=g??this.opts.token,o=!!(g&&this.opts.token)}const l=a||this.opts.password?{token:a,password:this.opts.password}:void 0;let c;if(t&&i){const g=Date.now(),p=this.connectNonce??void 0,f=zg({deviceId:i.deviceId,clientId:this.opts.clientName??ya.CONTROL_UI,clientMode:this.opts.mode??bi.WEBCHAT,role:s,scopes:n,signedAtMs:g,token:a??null,nonce:p}),m=await tu(i.privateKey,f);c={id:i.deviceId,publicKey:i.publicKey,signature:m,signedAt:g,nonce:p}}const u={minProtocol:3,maxProtocol:3,client:{id:this.opts.clientName??ya.CONTROL_UI,version:this.opts.clientVersion??"dev",platform:this.opts.platform??navigator.platform??"web",mode:this.opts.mode??bi.WEBCHAT,instanceId:this.opts.instanceId},role:s,scopes:n,device:c,caps:[],auth:l,userAgent:navigator.userAgent,locale:il()};this.request("connect",u).then(g=>{g?.auth?.deviceToken&&i&&Ur({deviceId:i.deviceId,role:g.auth.role??s,token:g.auth.deviceToken,scopes:g.auth.scopes??[]}),this.lastConnectFailure=null,this.backoffMs=200,this.reconnectAttempt=0,this.phase="connected",this.opts.onHello?.(g)}).catch(g=>{this.lastConnectFailure=g instanceof Error?g.message:String(g),o&&i&&zr({deviceId:i.deviceId,role:s}),this.ws?.close(Hg,"connect failed")})}handleMessage(t){let n;try{n=JSON.parse(t)}catch{return}const s=n;if(s.type==="event"){const i=n;if(i.event==="connect.challenge"){const a=i.payload,l=a&&typeof a.nonce=="string"?a.nonce:null;l&&(this.connectNonce=l,this.sendConnect());return}const o=typeof i.seq=="number"?i.seq:null;o!==null&&(this.lastSeq!==null&&o>this.lastSeq+1&&this.opts.onGap?.({expected:this.lastSeq+1,received:o}),this.lastSeq=o);try{this.opts.onEvent?.(i)}catch(a){console.error("[gateway] event handler error:",a)}return}if(s.type==="res"){const i=n,o=this.pending.get(i.id);if(!o)return;this.pending.delete(i.id),i.ok?o.resolve(i.payload):o.reject(new Error(i.error?.message??"request failed"));return}}request(t,n){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)return Promise.reject(new Error("gateway not connected"));const s=io(),i={type:"req",id:s,method:t,params:n},o=new Promise((a,l)=>{this.pending.set(s,{resolve:c=>a(c),reject:l})});return this.ws.send(JSON.stringify(i)),o}queueConnect(){this.connectNonce=null,this.connectSent=!1,this.phase="handshake",this.connectTimer!==null&&window.clearTimeout(this.connectTimer),this.connectTimer=window.setTimeout(()=>{this.sendConnect()},50)}}function Os(e,t){const n=(e??"").trim(),s=t.mainSessionKey?.trim();if(!s)return n;if(!n)return s;const i=t.mainKey?.trim()||"main",o=t.defaultAgentId?.trim();return n==="main"||n===i||o&&(n===`agent:${o}:main`||n===`agent:${o}:${i}`)?s:n}function jg(e,t){if(!t?.mainSessionKey)return;const n=Os(e.sessionKey,t),s=Os(e.settings.sessionKey,t),i=Os(e.settings.lastActiveSessionKey,t),o=n||s||e.sessionKey,a={...e.settings,sessionKey:s||o,lastActiveSessionKey:i||o},l=a.sessionKey!==e.settings.sessionKey||a.lastActiveSessionKey!==e.settings.lastActiveSessionKey;o!==e.sessionKey&&(e.sessionKey=o),l&&We(e,a)}function Wg(e){const t=e.failure?.toLowerCase()??"";return t.includes("unauthorized")||t.includes("token")||t.includes("password")||t.includes("pairing")||t.includes("device")||e.code===1008||e.code===4008?"auth":e.phase==="reconnecting"?"reconnecting":e.phase==="handshake"?"handshake":e.phase==="dialing"?"dns":"network"}function Gg(e){const n=[`stage=${Wg(e)}`,`url=${e.url}`];return e.reconnectInMs!==null&&n.push(`retry=${e.reconnectInMs}ms`),e.reconnectAttempt>0&&n.push(`attempt=${e.reconnectAttempt}`),e.failure&&n.push(`cause=${e.failure}`),`disconnected (${e.code}): ${e.reason||"no reason"} [${n.join(", ")}]`}function oo(e){e.lastError=null,e.hello=null,e.connected=!1,e.execApprovalQueue=[],e.execApprovalError=null,e.client?.stop(),e.client=new Kg({url:e.settings.gatewayUrl,token:e.settings.token.trim()?e.settings.token:void 0,password:e.password.trim()?e.password:void 0,clientName:"opensoul-control-ui",mode:"webchat",onHello:t=>{e.connected=!0,e.lastError=null,e.hello=t,ua("connected"),Qg(e,t),e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,us(e),$l(e),ji(e),is(e,{quiet:!0}),Xe(e,{quiet:!0}),ln(e)},onClose:t=>{const{code:n}=t;e.connected=!1,ua("disconnected"),n!==1012&&(e.lastError=Gg(t))},onEvent:t=>qg(e,t),onGap:({expected:t,received:n})=>{e.lastError=`event gap detected (expected seq ${t}, got ${n}); refresh recommended`}}),e.client.start()}function qg(e,t){try{Vg(e,t)}catch(n){console.error("[gateway] handleGatewayEvent error:",t.event,n)}}function Vg(e,t){if(e.eventLogBuffer=[{ts:Date.now(),event:t.event,payload:t.payload},...e.eventLogBuffer].slice(0,250),e.tab==="debug"&&(e.eventLog=e.eventLogBuffer),t.event==="agent"){if(e.onboarding)return;ug(e,t.payload);return}if(t.event==="chat"){const n=t.payload;n?.sessionKey&&cl(e,n.sessionKey);const s=kg(e,n);if(s==="final"||s==="error"||s==="aborted"){us(e),Lg(e);const i=n?.runId;i&&e.refreshSessionsAfterChat.has(i)&&(e.refreshSessionsAfterChat.delete(i),s==="final"&&xt(e,{activeMinutes:fl}))}s==="final"&&cn(e);return}if(t.event==="presence"){const n=t.payload;n?.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence,e.presenceError=null,e.presenceStatus=null);return}if(t.event==="cron"&&e.tab==="cron"&&qn(e),(t.event==="device.pair.requested"||t.event==="device.pair.resolved")&&Xe(e,{quiet:!0}),t.event==="exec.approval.requested"){const n=Og(t.payload);if(n){e.execApprovalQueue=Ug(e.execApprovalQueue,n),e.execApprovalError=null;const s=Math.max(0,n.expiresAtMs-Date.now()+500);window.setTimeout(()=>{e.execApprovalQueue=ba(e.execApprovalQueue,n.id)},s)}return}if(t.event==="exec.approval.resolved"){const n=Bg(t.payload);n&&(e.execApprovalQueue=ba(e.execApprovalQueue,n.id))}}function Qg(e,t){const n=t.snapshot;n?.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence),n?.health&&(e.debugHealth=n.health),n?.sessionDefaults&&jg(e,n.sessionDefaults)}function Yg(e){e.basePath=Vu(),qu(e),Ju(e,!0),Qu(e),Yu(e),window.addEventListener("popstate",e.popStateHandler),bu()?Xg(e):oo(e),bd(e),e.tab==="logs"&&Ui(e),e.tab==="debug"&&Hi(e)}function Zg(e){ud(e)}function Jg(e){window.removeEventListener("popstate",e.popStateHandler),yd(e),zi(e),Ki(e),Zu(e),ku(),e.topbarObserver?.disconnect(),e.topbarObserver=null}function Xg(e){wu({onInit:t=>{const n=e,s=n.settings.gatewayUrl,i=n.settings.token,o=t.gatewayUrl?.trim(),a=!!(o&&o!==s),l=typeof t.token=="string"&&t.token!==i,c={...n.settings};let u=!1;if(a&&o&&(c.gatewayUrl=o,u=!0),l&&t.token&&(c.token=t.token,u=!0),t.settings?.sessionKey){const g=t.settings.sessionKey;(g!==c.sessionKey||g!==c.lastActiveSessionKey)&&(c.sessionKey=g,c.lastActiveSessionKey=g,u=!0)}if(u&&We(n,c),o&&(a||l||!e.connected)&&oo(e),t.theme){const g=t.theme;gi(n,g)}},onThemeChanged:t=>{gi(e,t)},onNavigate:t=>{const n=to(`/${t}`);n&&dl(e,n)},onFocus:t=>{t==="chat-input"?document.querySelector(".chat-compose textarea")?.focus():t==="search"&&document.querySelector(".search-input, .command-input")?.focus()},onFileDrop:t=>{console.log("[desktop-bridge] File drop received:",t.length,"files")},onWindowState:t=>{e._windowFocused=t==="focused"},onCommandPalette:()=>{const t=document.querySelector(".command-palette");if(t){t.remove();return}window.dispatchEvent(new CustomEvent("opensoul:command-palette"))}}),yu()}function ep(e,t){if(!(e.tab==="chat"&&e.chatManualRefreshInFlight)){if(e.tab==="chat"&&(t.has("chatMessages")||t.has("chatToolMessages")||t.has("chatStream")||t.has("chatLoading")||t.has("tab"))){const n=t.has("tab"),s=t.has("chatLoading")&&t.get("chatLoading")===!0&&!e.chatLoading;un(e,n||s||!e.chatHasAutoScrolled)}e.tab==="logs"&&(t.has("logsEntries")||t.has("logsAutoFollow")||t.has("tab"))&&e.logsAutoFollow&&e.logsAtBottom&&Rr(e,t.has("tab")||t.has("logsAutoFollow"))}}const ao={CHILD:2},ro=e=>(...t)=>({_$litDirective$:e,values:t});let lo=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,s){this._$Ct=t,this._$AM=n,this._$Ci=s}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};const{I:tp}=Pc,xa=e=>e,np=e=>e.strings===void 0,$a=()=>document.createComment(""),Ut=(e,t,n)=>{const s=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(n===void 0){const o=s.insertBefore($a(),i),a=s.insertBefore($a(),i);n=new tp(o,a,e,e.options)}else{const o=n._$AB.nextSibling,a=n._$AM,l=a!==e;if(l){let c;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(c=e._$AU)!==a._$AU&&n._$AP(c)}if(o!==i||l){let c=n._$AA;for(;c!==o;){const u=xa(c).nextSibling;xa(s).insertBefore(c,i),c=u}}}return n},ot=(e,t,n=e)=>(e._$AI(t,n),e),sp={},ip=(e,t=sp)=>e._$AH=t,op=e=>e._$AH,Bs=e=>{e._$AR(),e._$AA.remove()};const wa=(e,t,n)=>{const s=new Map;for(let i=t;i<=n;i++)s.set(e[i],i);return s},Sl=ro(class extends lo{constructor(e){if(super(e),e.type!==ao.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,n){let s;n===void 0?n=t:t!==void 0&&(s=t);const i=[],o=[];let a=0;for(const l of e)i[a]=s?s(l,a):a,o[a]=n(l,a),a++;return{values:o,keys:i}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,s]){const i=op(e),{values:o,keys:a}=this.dt(t,n,s);if(!Array.isArray(i))return this.ut=a,o;const l=this.ut??=[],c=[];let u,g,p=0,f=i.length-1,m=0,d=o.length-1;for(;p<=f&&m<=d;)if(i[p]===null)p++;else if(i[f]===null)f--;else if(l[p]===a[m])c[m]=ot(i[p],o[m]),p++,m++;else if(l[f]===a[d])c[d]=ot(i[f],o[d]),f--,d--;else if(l[p]===a[d])c[d]=ot(i[p],o[d]),Ut(e,c[d+1],i[p]),p++,d--;else if(l[f]===a[m])c[m]=ot(i[f],o[m]),Ut(e,i[p],i[f]),f--,m++;else if(u===void 0&&(u=wa(a,m,d),g=wa(l,p,f)),u.has(l[p]))if(u.has(l[f])){const v=g.get(a[m]),b=v!==void 0?i[v]:null;if(b===null){const S=Ut(e,i[p]);ot(S,o[m]),c[m]=S}else c[m]=ot(b,o[m]),Ut(e,i[p],b),i[v]=null;m++}else Bs(i[f]),f--;else Bs(i[p]),p++;for(;m<=d;){const v=Ut(e,c[d+1]);ot(v,o[m]),c[m++]=v}for(;p<=f;){const v=i[p++];v!==null&&Bs(v)}return this.ut=a,ip(e,c),Ze}}),J={messageSquare:r`
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
  `};function ap(e,t){const n=cs(t,e.basePath),s=no(t,e.uiLocale);return r`
    <a
      href=${n}
      class="nav-item ${e.tab===t?"active":""}"
      @click=${i=>{i.defaultPrevented||i.button!==0||i.metaKey||i.ctrlKey||i.shiftKey||i.altKey||(i.preventDefault(),e.setTab(t))}}
      title=${s}
    >
      <span class="nav-item__icon" aria-hidden="true">${J[Bu(t)]}</span>
      <span class="nav-item__text">${s}</span>
    </a>
  `}function rp(e){const t=(g,p)=>j(e.uiLocale,g,p),n=lp(e.hello,e.sessionsResult),s=cp(e.sessionKey,e.sessionsResult,n),i=e.onboarding,o=e.onboarding,a=e.onboarding?!1:e.settings.chatShowThinking,l=e.onboarding?!0:e.settings.chatFocusMode,c=r`
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
          @change=${g=>{const p=g.target.value;e.sessionKey=p,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:p,lastActiveSessionKey:p}),e.loadAssistantIdentity(),eg(e,p),cn(e)}}
        >
          ${Sl(s,g=>g.key,g=>r`<option value=${g.key}>
                ${g.displayName??g.key}
              </option>`)}
        </select>
      </label>
      <button
        class="btn btn--sm btn--icon"
        ?disabled=${e.chatLoading||!e.connected}
        @click=${async()=>{const g=e;g.chatManualRefreshInFlight=!0,g.chatNewMessagesBelow=!1,await g.updateComplete,g.resetToolStream();try{await xl(e,{scheduleScroll:!1}),g.scrollToBottom({smooth:!0})}finally{requestAnimationFrame(()=>{g.chatManualRefreshInFlight=!1,g.chatNewMessagesBelow=!1})}}}
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
        ${J.brain}
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
  `}function lp(e,t){const n=e?.snapshot,s=n?.sessionDefaults?.mainSessionKey?.trim();if(s)return s;const i=n?.sessionDefaults?.mainKey?.trim();return i||(t?.sessions?.some(o=>o.key==="main")?"main":null)}function Us(e,t){const n=t?.label?.trim()||"",s=t?.displayName?.trim()||"";return n&&n!==e?`${n} (${e})`:s&&s!==e?`${e} (${s})`:e}function cp(e,t,n){const s=new Set,i=[],o=n&&t?.sessions?.find(l=>l.key===n),a=t?.sessions?.find(l=>l.key===e);if(n&&(s.add(n),i.push({key:n,displayName:Us(n,o||void 0)})),s.has(e)||(s.add(e),i.push({key:e,displayName:Us(e,a)})),t?.sessions)for(const l of t.sessions)s.has(l.key)||(s.add(l.key),i.push({key:l.key,displayName:Us(l.key,l)}));return i}const dp=["system","light","dark"];function up(e){const t=(i,o)=>j(e.uiLocale,i,o),n=Math.max(0,dp.indexOf(e.theme)),s=i=>o=>{const l={element:o.currentTarget};(o.clientX||o.clientY)&&(l.pointerClientX=o.clientX,l.pointerClientY=o.clientY),e.setTheme(i,l)};return r`
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
          ${hp()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="light"?"active":""}"
          @click=${s("light")}
          aria-pressed=${e.theme==="light"}
          aria-label=${t("Light theme","浅色主题")}
          title=${t("Light","浅色")}
        >
          ${gp()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="dark"?"active":""}"
          @click=${s("dark")}
          aria-pressed=${e.theme==="dark"}
          aria-label=${t("Dark theme","深色主题")}
          title=${t("Dark","深色")}
        >
          ${pp()}
        </button>
      </div>
    </div>
  `}function gp(){return r`
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
  `}function pp(){return r`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
      ></path>
    </svg>
  `}function hp(){return r`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="14" x="2" y="3" rx="2"></rect>
      <line x1="8" x2="16" y1="21" y2="21"></line>
      <line x1="12" x2="12" y1="17" y2="21"></line>
    </svg>
  `}function Al(e,t){if(!e)return e;const s=e.files.some(i=>i.name===t.name)?e.files.map(i=>i.name===t.name?t:i):[...e.files,t];return{...e,files:s}}async function zs(e,t){if(!(!e.client||!e.connected||e.agentFilesLoading)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const n=await e.client.request("agents.files.list",{agentId:t});n&&(e.agentFilesList=n,e.agentFileActive&&!n.files.some(s=>s.name===e.agentFileActive)&&(e.agentFileActive=null))}catch(n){e.agentFilesError=String(n)}finally{e.agentFilesLoading=!1}}}async function fp(e,t,n,s){if(!(!e.client||!e.connected||e.agentFilesLoading)&&!Object.hasOwn(e.agentFileContents,n)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const i=await e.client.request("agents.files.get",{agentId:t,name:n});if(i?.file){const o=i.file.content??"",a=e.agentFileContents[n]??"",l=e.agentFileDrafts[n],c=s?.preserveDraft??!0;e.agentFilesList=Al(e.agentFilesList,i.file),e.agentFileContents={...e.agentFileContents,[n]:o},(!c||!Object.hasOwn(e.agentFileDrafts,n)||l===a)&&(e.agentFileDrafts={...e.agentFileDrafts,[n]:o})}}catch(i){e.agentFilesError=String(i)}finally{e.agentFilesLoading=!1}}}async function vp(e,t,n,s){if(!(!e.client||!e.connected||e.agentFileSaving)){e.agentFileSaving=!0,e.agentFilesError=null;try{const i=await e.client.request("agents.files.set",{agentId:t,name:n,content:s});i?.file&&(e.agentFilesList=Al(e.agentFilesList,i.file),e.agentFileContents={...e.agentFileContents,[n]:s},e.agentFileDrafts={...e.agentFileDrafts,[n]:s})}catch(i){e.agentFilesError=String(i)}finally{e.agentFileSaving=!1}}}async function Cl(e,t){if(!(!e.client||!e.connected)&&!e.usageLoading){e.usageLoading=!0,e.usageError=null;try{const n=t?.startDate??e.usageStartDate,s=t?.endDate??e.usageEndDate,[i,o]=await Promise.all([e.client.request("sessions.usage",{startDate:n,endDate:s,limit:1e3,includeContextWeight:!0}),e.client.request("usage.cost",{startDate:n,endDate:s})]);i&&(e.usageResult=i),o&&(e.usageCostSummary=o)}catch(n){e.usageError=String(n)}finally{e.usageLoading=!1}}}async function mp(e,t){if(!(!e.client||!e.connected)&&!e.usageTimeSeriesLoading){e.usageTimeSeriesLoading=!0,e.usageTimeSeries=null;try{const n=await e.client.request("sessions.usage.timeseries",{key:t});n&&(e.usageTimeSeries=n)}catch{e.usageTimeSeries=null}finally{e.usageTimeSeriesLoading=!1}}}async function bp(e,t){if(!(!e.client||!e.connected)&&!e.usageSessionLogsLoading){e.usageSessionLogsLoading=!0,e.usageSessionLogs=null;try{const n=await e.client.request("sessions.usage.logs",{key:t,limit:500});n&&Array.isArray(n.logs)&&(e.usageSessionLogs=n.logs)}catch{e.usageSessionLogs=null}finally{e.usageSessionLogsLoading=!1}}}const yp={bash:"exec","apply-patch":"apply_patch"},xp={"group:memory":["memory_search","memory_get"],"group:web":["web_search","web_fetch"],"group:fs":["read","write","edit","apply_patch"],"group:runtime":["exec","process"],"group:sessions":["sessions_list","sessions_history","sessions_send","sessions_spawn","session_status"],"group:ui":["browser","canvas"],"group:automation":["cron","gateway"],"group:messaging":["message"],"group:nodes":["nodes"],"group:opensoul":["browser","canvas","nodes","cron","message","gateway","agents_list","sessions_list","sessions_history","sessions_send","sessions_spawn","session_status","memory_search","memory_get","web_search","web_fetch","image"]},$p={minimal:{allow:["session_status"]},coding:{allow:["group:fs","group:runtime","group:sessions","group:memory","image"]},messaging:{allow:["group:messaging","sessions_list","sessions_history","sessions_send","session_status"]},full:{}};function De(e){const t=e.trim().toLowerCase();return yp[t]??t}function wp(e){return e?e.map(De).filter(Boolean):[]}function kp(e){const t=wp(e),n=[];for(const s of t){const i=xp[s];if(i){n.push(...i);continue}n.push(s)}return Array.from(new Set(n))}function Sp(e){if(!e)return;const t=$p[e];if(t&&!(!t.allow&&!t.deny))return{allow:t.allow?[...t.allow]:void 0,deny:t.deny?[...t.deny]:void 0}}function Ap(e){const t=e.host??"unknown",n=e.ip?`(${e.ip})`:"",s=e.mode??"",i=e.version??"";return`${t} ${n} ${s} ${i}`.trim()}function Cp(e){const t=e.ts??null;return t?Y(t):"n/a"}function co(e){return e?`${vt(e)} (${Y(e)})`:"n/a"}function Tp(e){if(e.totalTokens==null)return"n/a";const t=e.totalTokens??0,n=e.contextTokens??0;return n?`${t} / ${n}`:String(t)}function _p(e){if(e==null)return"";try{return JSON.stringify(e,null,2)}catch{return String(e)}}function Lp(e){const t=e.state??{},n=t.nextRunAtMs?vt(t.nextRunAtMs):"n/a",s=t.lastRunAtMs?vt(t.lastRunAtMs):"n/a";return`${t.lastStatus??"n/a"} · next ${n} · last ${s}`}function Tl(e){const t=e.schedule;if(t.kind==="at"){const n=Date.parse(t.at);return Number.isFinite(n)?`At ${vt(n)}`:`At ${t.at}`}return t.kind==="every"?`Every ${Gi(t.everyMs)}`:`Cron ${t.expr}${t.tz?` (${t.tz})`:""}`}function Ep(e){const t=e.payload;if(t.kind==="systemEvent")return`System: ${t.text}`;const n=`Agent: ${t.message}`,s=e.delivery;if(s&&s.mode!=="none"){const i=s.channel||s.to?` (${s.channel??"last"}${s.to?` -> ${s.to}`:""})`:"";return`${n} · ${s.mode}${i}`}return n}const ka=[{id:"fs",label:"Files",tools:[{id:"read",label:"read",description:"Read file contents"},{id:"write",label:"write",description:"Create or overwrite files"},{id:"edit",label:"edit",description:"Make precise edits"},{id:"apply_patch",label:"apply_patch",description:"Patch files (OpenAI)"}]},{id:"runtime",label:"Runtime",tools:[{id:"exec",label:"exec",description:"Run shell commands"},{id:"process",label:"process",description:"Manage background processes"}]},{id:"web",label:"Web",tools:[{id:"web_search",label:"web_search",description:"Search the web"},{id:"web_fetch",label:"web_fetch",description:"Fetch web content"}]},{id:"memory",label:"Memory",tools:[{id:"memory_search",label:"memory_search",description:"Semantic search"},{id:"memory_get",label:"memory_get",description:"Read memory files"}]},{id:"sessions",label:"Sessions",tools:[{id:"sessions_list",label:"sessions_list",description:"List sessions"},{id:"sessions_history",label:"sessions_history",description:"Session history"},{id:"sessions_send",label:"sessions_send",description:"Send to session"},{id:"sessions_spawn",label:"sessions_spawn",description:"Spawn sub-agent"},{id:"session_status",label:"session_status",description:"Session status"}]},{id:"ui",label:"UI",tools:[{id:"browser",label:"browser",description:"Control web browser"},{id:"canvas",label:"canvas",description:"Control canvases"}]},{id:"messaging",label:"Messaging",tools:[{id:"message",label:"message",description:"Send messages"}]},{id:"automation",label:"Automation",tools:[{id:"cron",label:"cron",description:"Schedule tasks"},{id:"gateway",label:"gateway",description:"Gateway control"}]},{id:"nodes",label:"Nodes",tools:[{id:"nodes",label:"nodes",description:"Nodes + devices"}]},{id:"agents",label:"Agents",tools:[{id:"agents_list",label:"agents_list",description:"List agents"}]},{id:"media",label:"Media",tools:[{id:"image",label:"image",description:"Image understanding"}]}],Ip=[{id:"minimal",label:"Minimal"},{id:"coding",label:"Coding"},{id:"messaging",label:"Messaging"},{id:"full",label:"Full"}];function yi(e){return e.name?.trim()||e.identity?.name?.trim()||e.id}function Tn(e){const t=e.trim();if(!t||t.length>16)return!1;let n=!1;for(let s=0;s<t.length;s+=1)if(t.charCodeAt(s)>127){n=!0;break}return!(!n||t.includes("://")||t.includes("/")||t.includes("."))}function gs(e,t){const n=t?.emoji?.trim();if(n&&Tn(n))return n;const s=e.identity?.emoji?.trim();if(s&&Tn(s))return s;const i=t?.avatar?.trim();if(i&&Tn(i))return i;const o=e.identity?.avatar?.trim();return o&&Tn(o)?o:""}function _l(e,t){return t&&e===t?"default":null}function Mp(e){if(e==null||!Number.isFinite(e))return"-";if(e<1024)return`${e} B`;const t=["KB","MB","GB","TB"];let n=e/1024,s=0;for(;n>=1024&&s<t.length-1;)n/=1024,s+=1;return`${n.toFixed(n<10?1:0)} ${t[s]}`}function ps(e,t){const n=e;return{entry:(n?.agents?.list??[]).find(o=>o?.id===t),defaults:n?.agents?.defaults,globalTools:n?.tools}}function Ll(e,t,n,s,i){const o=ps(t,e.id),l=(n&&n.agentId===e.id?n.workspace:null)||o.entry?.workspace||o.defaults?.workspace||"default",c=o.entry?.model?Zt(o.entry?.model):Zt(o.defaults?.model),u=i?.name?.trim()||e.identity?.name?.trim()||e.name?.trim()||o.entry?.name||e.id,g=gs(e,i)||"-",p=Array.isArray(o.entry?.skills)?o.entry?.skills:null,f=p?.length??null;return{workspace:l,model:c,identityName:u,identityEmoji:g,skillsLabel:p?`${f} selected`:"all skills",isDefault:!!(s&&e.id===s)}}function Zt(e){if(!e)return"-";if(typeof e=="string")return e.trim()||"-";if(typeof e=="object"&&e){const t=e,n=t.primary?.trim();if(n){const s=Array.isArray(t.fallbacks)?t.fallbacks.length:0;return s>0?`${n} (+${s} fallback)`:n}}return"-"}function Sa(e){const t=e.match(/^(.+) \(\+\d+ fallback\)$/);return t?t[1]:e}function Aa(e){if(!e)return null;if(typeof e=="string")return e.trim()||null;if(typeof e=="object"&&e){const t=e;return(typeof t.primary=="string"?t.primary:typeof t.model=="string"?t.model:typeof t.id=="string"?t.id:typeof t.value=="string"?t.value:null)?.trim()||null}return null}function Rp(e){if(!e||typeof e=="string")return null;if(typeof e=="object"&&e){const t=e,n=Array.isArray(t.fallbacks)?t.fallbacks:Array.isArray(t.fallback)?t.fallback:null;return n?n.filter(s=>typeof s=="string"):null}return null}function Pp(e){return e.split(",").map(t=>t.trim()).filter(Boolean)}function Dp(e){const n=e?.agents?.defaults?.models;if(!n||typeof n!="object")return[];const s=[];for(const[i,o]of Object.entries(n)){const a=i.trim();if(!a)continue;const l=o&&typeof o=="object"&&"alias"in o&&typeof o.alias=="string"?o.alias?.trim():void 0,c=l&&l!==a?`${l} (${a})`:a;s.push({value:a,label:c})}return s}function Np(e,t){const n=Dp(e),s=t?n.some(i=>i.value===t):!1;return t&&!s&&n.unshift({value:t,label:`Current (${t})`}),n.length===0?r`
      <option value="" disabled>No configured models</option>
    `:n.map(i=>r`<option value=${i.value}>${i.label}</option>`)}function Fp(e){const t=De(e);if(!t)return{kind:"exact",value:""};if(t==="*")return{kind:"all"};if(!t.includes("*"))return{kind:"exact",value:t};const n=t.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&");return{kind:"regex",value:new RegExp(`^${n.replaceAll("\\*",".*")}$`)}}function xi(e){return Array.isArray(e)?kp(e).map(Fp).filter(t=>t.kind!=="exact"||t.value.length>0):[]}function Jt(e,t){for(const n of t)if(n.kind==="all"||n.kind==="exact"&&e===n.value||n.kind==="regex"&&n.value.test(e))return!0;return!1}function Op(e,t){if(!t)return!0;const n=De(e),s=xi(t.deny);if(Jt(n,s))return!1;const i=xi(t.allow);return!!(i.length===0||Jt(n,i)||n==="apply_patch"&&Jt("exec",i))}function Ca(e,t){if(!Array.isArray(t)||t.length===0)return!1;const n=De(e),s=xi(t);return!!(Jt(n,s)||n==="apply_patch"&&Jt("exec",s))}function Bp(e){const t=e.agentsList?.agents??[],n=e.agentsList?.defaultId??null,s=e.selectedAgentId??n??t[0]?.id??null,i=s?t.find(o=>o.id===s)??null:null;return r`
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
        ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:h}
        <div class="agent-list" style="margin-top: 12px;">
          ${t.length===0?r`
                  <div class="muted">No agents found.</div>
                `:t.map(o=>{const a=_l(o.id,n),l=gs(o,e.agentIdentityById[o.id]??null);return r`
                    <button
                      type="button"
                      class="agent-row ${s===o.id?"active":""}"
                      @click=${()=>e.onSelectAgent(o.id)}
                    >
                      <div class="agent-avatar">
                        ${l||yi(o).slice(0,1)}
                      </div>
                      <div class="agent-info">
                        <div class="agent-title">${yi(o)}</div>
                        <div class="agent-sub mono">${o.id}</div>
                      </div>
                      ${a?r`<span class="agent-pill">${a}</span>`:h}
                    </button>
                  `})}
        </div>
      </section>
      <section class="agents-main">
        ${i?r`
              ${Up(i,n,e.agentIdentityById[i.id]??null)}
              ${zp(e.activePanel,o=>e.onSelectPanel(o))}
              ${e.activePanel==="overview"?Hp({agent:i,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[i.id]??null,agentIdentityError:e.agentIdentityError,agentIdentityLoading:e.agentIdentityLoading,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave,onModelChange:e.onModelChange,onModelFallbacksChange:e.onModelFallbacksChange}):h}
              ${e.activePanel==="files"?Jp({agentId:i.id,agentFilesList:e.agentFilesList,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,onLoadFiles:e.onLoadFiles,onSelectFile:e.onSelectFile,onFileDraftChange:e.onFileDraftChange,onFileReset:e.onFileReset,onFileSave:e.onFileSave}):h}
              ${e.activePanel==="tools"?eh({agentId:i.id,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onProfileChange:e.onToolsProfileChange,onOverridesChange:e.onToolsOverridesChange,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):h}
              ${e.activePanel==="skills"?nh({agentId:i.id,report:e.agentSkillsReport,loading:e.agentSkillsLoading,error:e.agentSkillsError,activeAgentId:e.agentSkillsAgentId,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,filter:e.skillsFilter,onFilterChange:e.onSkillsFilterChange,onRefresh:e.onSkillsRefresh,onToggle:e.onAgentSkillToggle,onClear:e.onAgentSkillsClear,onDisableAll:e.onAgentSkillsDisableAll,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):h}
              ${e.activePanel==="channels"?Yp({agent:i,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[i.id]??null,snapshot:e.channelsSnapshot,loading:e.channelsLoading,error:e.channelsError,lastSuccess:e.channelsLastSuccess,onRefresh:e.onChannelsRefresh}):h}
              ${e.activePanel==="cron"?Zp({agent:i,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[i.id]??null,jobs:e.cronJobs,status:e.cronStatus,loading:e.cronLoading,error:e.cronError,onRefresh:e.onCronRefresh}):h}
            `:r`
                <div class="card">
                  <div class="card-title">Select an agent</div>
                  <div class="card-sub">Pick an agent to inspect its workspace and tools.</div>
                </div>
              `}
      </section>
    </div>
  `}function Up(e,t,n){const s=_l(e.id,t),i=yi(e),o=e.identity?.theme?.trim()||"Agent workspace and routing.",a=gs(e,n);return r`
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
        ${s?r`<span class="agent-pill">${s}</span>`:h}
      </div>
    </section>
  `}function zp(e,t){return r`
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
  `}function Hp(e){const{agent:t,configForm:n,agentFilesList:s,agentIdentity:i,agentIdentityLoading:o,agentIdentityError:a,configLoading:l,configSaving:c,configDirty:u,onConfigReload:g,onConfigSave:p,onModelChange:f,onModelFallbacksChange:m}=e,d=ps(n,t.id),b=(s&&s.agentId===t.id?s.workspace:null)||d.entry?.workspace||d.defaults?.workspace||"default",S=d.entry?.model?Zt(d.entry?.model):Zt(d.defaults?.model),k=Zt(d.defaults?.model),C=Aa(d.entry?.model)||(S!=="-"?Sa(S):null),A=Aa(d.defaults?.model)||(k!=="-"?Sa(k):null),T=C??A??null,_=Rp(d.entry?.model),M=_?_.join(", "):"",G=i?.name?.trim()||t.identity?.name?.trim()||t.name?.trim()||d.entry?.name||"-",se=gs(t,i)||"-",N=Array.isArray(d.entry?.skills)?d.entry?.skills:null,z=N?.length??null,de=o?"Loading…":a?"Unavailable":"",L=!!(e.defaultId&&t.id===e.defaultId);return r`
    <section class="card">
      <div class="card-title">Overview</div>
      <div class="card-sub">Workspace paths and identity metadata.</div>
      <div class="agents-overview-grid" style="margin-top: 16px;">
        <div class="agent-kv">
          <div class="label">Workspace</div>
          <div class="mono">${b}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Primary Model</div>
          <div class="mono">${S}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Name</div>
          <div>${G}</div>
          ${de?r`<div class="agent-kv-sub muted">${de}</div>`:h}
        </div>
        <div class="agent-kv">
          <div class="label">Default</div>
          <div>${L?"yes":"no"}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Emoji</div>
          <div>${se}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Skills Filter</div>
          <div>${N?`${z} selected`:"all skills"}</div>
        </div>
      </div>

      <div class="agent-model-select" style="margin-top: 20px;">
        <div class="label">Model Selection</div>
        <div class="row" style="gap: 12px; flex-wrap: wrap;">
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Primary model${L?" (default)":""}</span>
            <select
              .value=${T??""}
              ?disabled=${!n||l||c}
              @change=${B=>f(t.id,B.target.value||null)}
            >
              ${L?h:r`
                      <option value="">
                        ${A?`Inherit default (${A})`:"Inherit default"}
                      </option>
                    `}
              ${Np(n,T??void 0)}
            </select>
          </label>
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Fallbacks (comma-separated)</span>
            <input
              .value=${M}
              ?disabled=${!n||l||c}
              placeholder="provider/model, provider/model"
              @input=${B=>m(t.id,Pp(B.target.value))}
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
  `}function El(e,t){return r`
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
  `}function Kp(e,t){const n=e.channelMeta?.find(s=>s.id===t);return n?.label?n.label:e.channelLabels?.[t]??t}function jp(e){if(!e)return[];const t=new Set;for(const i of e.channelOrder??[])t.add(i);for(const i of e.channelMeta??[])t.add(i.id);for(const i of Object.keys(e.channelAccounts??{}))t.add(i);const n=[],s=e.channelOrder?.length?e.channelOrder:Array.from(t);for(const i of s)t.has(i)&&(n.push(i),t.delete(i));for(const i of t)n.push(i);return n.map(i=>({id:i,label:Kp(e,i),accounts:e.channelAccounts?.[i]??[]}))}const Wp=["groupPolicy","streamMode","dmPolicy"];function Gp(e,t){if(!e)return null;const s=(e.channels??{})[t];if(s&&typeof s=="object")return s;const i=e[t];return i&&typeof i=="object"?i:null}function qp(e){if(e==null)return"n/a";if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return String(e);try{return JSON.stringify(e)}catch{return"n/a"}}function Vp(e,t){const n=Gp(e,t);return n?Wp.flatMap(s=>s in n?[{label:s,value:qp(n[s])}]:[]):[]}function Qp(e){let t=0,n=0,s=0;for(const i of e){const o=i.probe&&typeof i.probe=="object"&&"ok"in i.probe?!!i.probe.ok:!1;(i.connected===!0||i.running===!0||o)&&(t+=1),i.configured&&(n+=1),i.enabled&&(s+=1)}return{total:e.length,connected:t,configured:n,enabled:s}}function Yp(e){const t=Ll(e.agent,e.configForm,e.agentFilesList,e.defaultId,e.agentIdentity),n=jp(e.snapshot),s=e.lastSuccess?Y(e.lastSuccess):"never";return r`
    <section class="grid grid-cols-2">
      ${El(t,"Workspace, identity, and model configuration.")}
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
        ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:h}
        ${e.snapshot?h:r`
                <div class="callout info" style="margin-top: 12px">Load channels to see live status.</div>
              `}
        ${n.length===0?r`
                <div class="muted" style="margin-top: 16px">No channels found.</div>
              `:r`
              <div class="list" style="margin-top: 16px;">
                ${n.map(i=>{const o=Qp(i.accounts),a=o.total?`${o.connected}/${o.total} connected`:"no accounts",l=o.configured?`${o.configured} configured`:"not configured",c=o.total?`${o.enabled} enabled`:"disabled",u=Vp(e.configForm,i.id);return r`
                    <div class="list-item">
                      <div class="list-main">
                        <div class="list-title">${i.label}</div>
                        <div class="list-sub mono">${i.id}</div>
                      </div>
                      <div class="list-meta">
                        <div>${a}</div>
                        <div>${l}</div>
                        <div>${c}</div>
                        ${u.length>0?u.map(g=>r`<div>${g.label}: ${g.value}</div>`):h}
                      </div>
                    </div>
                  `})}
              </div>
            `}
      </section>
    </section>
  `}function Zp(e){const t=Ll(e.agent,e.configForm,e.agentFilesList,e.defaultId,e.agentIdentity),n=e.jobs.filter(s=>s.agentId===e.agent.id);return r`
    <section class="grid grid-cols-2">
      ${El(t,"Workspace and scheduling targets.")}
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
            <div class="stat-value">${co(e.status?.nextWakeAtMs??null)}</div>
          </div>
        </div>
        ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:h}
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
                      ${s.description?r`<div class="list-sub">${s.description}</div>`:h}
                      <div class="chip-row" style="margin-top: 6px;">
                        <span class="chip">${Tl(s)}</span>
                        <span class="chip ${s.enabled?"chip-ok":"chip-warn"}">
                          ${s.enabled?"enabled":"disabled"}
                        </span>
                        <span class="chip">${s.sessionTarget}</span>
                      </div>
                    </div>
                    <div class="list-meta">
                      <div class="mono">${Lp(s)}</div>
                      <div class="muted">${Ep(s)}</div>
                    </div>
                  </div>
                `)}
              </div>
            `}
    </section>
  `}function Jp(e){const t=e.agentFilesList?.agentId===e.agentId?e.agentFilesList:null,n=t?.files??[],s=e.agentFileActive??null,i=s?n.find(c=>c.name===s)??null:null,o=s?e.agentFileContents[s]??"":"",a=s?e.agentFileDrafts[s]??o:"",l=s?a!==o:!1;return r`
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
      ${t?r`<div class="muted mono" style="margin-top: 8px;">Workspace: ${t.workspace}</div>`:h}
      ${e.agentFilesError?r`<div class="callout danger" style="margin-top: 12px;">${e.agentFilesError}</div>`:h}
      ${t?r`
              <div class="agent-files-grid" style="margin-top: 16px;">
                <div class="agent-files-list">
                  ${n.length===0?r`
                          <div class="muted">No files found.</div>
                        `:n.map(c=>Xp(c,s,()=>e.onSelectFile(c.name)))}
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
                                `:h}
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
  `}function Xp(e,t,n){const s=e.missing?"Missing":`${Mp(e.size)} · ${Y(e.updatedAtMs??null)}`;return r`
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
            `:h}
    </button>
  `}function eh(e){const t=ps(e.configForm,e.agentId),n=t.entry?.tools??{},s=t.globalTools??{},i=n.profile??s.profile??"full",o=n.profile?"agent override":s.profile?"global default":"default",a=Array.isArray(n.allow)&&n.allow.length>0,l=Array.isArray(s.allow)&&s.allow.length>0,c=!!e.configForm&&!e.configLoading&&!e.configSaving&&!a,u=a?[]:Array.isArray(n.alsoAllow)?n.alsoAllow:[],g=a?[]:Array.isArray(n.deny)?n.deny:[],p=a?{allow:n.allow??[],deny:n.deny??[]}:Sp(i)??void 0,f=ka.flatMap(S=>S.tools.map(k=>k.id)),m=S=>{const k=Op(S,p),C=Ca(S,u),A=Ca(S,g);return{allowed:(k||C)&&!A,baseAllowed:k,denied:A}},d=f.filter(S=>m(S).allowed).length,v=(S,k)=>{const C=new Set(u.map(M=>De(M)).filter(M=>M.length>0)),A=new Set(g.map(M=>De(M)).filter(M=>M.length>0)),T=m(S).baseAllowed,_=De(S);k?(A.delete(_),T||C.add(_)):(C.delete(_),A.add(_)),e.onOverridesChange(e.agentId,[...C],[...A])},b=S=>{const k=new Set(u.map(A=>De(A)).filter(A=>A.length>0)),C=new Set(g.map(A=>De(A)).filter(A=>A.length>0));for(const A of f){const T=m(A).baseAllowed,_=De(A);S?(C.delete(_),T||k.add(_)):(k.delete(_),C.add(_))}e.onOverridesChange(e.agentId,[...k],[...C])};return r`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Tool Access</div>
          <div class="card-sub">
            Profile + per-tool overrides for this agent.
            <span class="mono">${d}/${f.length}</span> enabled.
          </div>
        </div>
        <div class="row" style="gap: 8px;">
          <button
            class="btn btn--sm"
            ?disabled=${!c}
            @click=${()=>b(!0)}
          >
            Enable All
          </button>
          <button
            class="btn btn--sm"
            ?disabled=${!c}
            @click=${()=>b(!1)}
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

      ${e.configForm?h:r`
              <div class="callout info" style="margin-top: 12px">
                Load the gateway config to adjust tool profiles.
              </div>
            `}
      ${a?r`
              <div class="callout info" style="margin-top: 12px">
                This agent is using an explicit allowlist in config. Tool overrides are managed in the Config tab.
              </div>
            `:h}
      ${l?r`
              <div class="callout info" style="margin-top: 12px">
                Global tools.allow is set. Agent overrides cannot enable tools that are globally blocked.
              </div>
            `:h}

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
              `:h}
      </div>

      <div class="agent-tools-presets" style="margin-top: 16px;">
        <div class="label">Quick Presets</div>
        <div class="agent-tools-buttons">
          ${Ip.map(S=>r`
              <button
                class="btn btn--sm ${i===S.id?"active":""}"
                ?disabled=${!c}
                @click=${()=>e.onProfileChange(e.agentId,S.id,!0)}
              >
                ${S.label}
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
        ${ka.map(S=>r`
            <div class="agent-tools-section">
              <div class="agent-tools-header">${S.label}</div>
              <div class="agent-tools-list">
                ${S.tools.map(k=>{const{allowed:C}=m(k.id);return r`
                    <div class="agent-tool-row">
                      <div>
                        <div class="agent-tool-title mono">${k.label}</div>
                        <div class="agent-tool-sub">${k.description}</div>
                      </div>
                      <label class="cfg-toggle">
                        <input
                          type="checkbox"
                          .checked=${C}
                          ?disabled=${!c}
                          @change=${A=>v(k.id,A.target.checked)}
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
  `}const _n=[{id:"workspace",label:"Workspace Skills",sources:["opensoul-workspace"]},{id:"built-in",label:"Built-in Skills",sources:["opensoul-bundled"]},{id:"installed",label:"Installed Skills",sources:["opensoul-managed"]},{id:"extra",label:"Extra Skills",sources:["opensoul-extra"]}];function th(e){const t=new Map;for(const o of _n)t.set(o.id,{id:o.id,label:o.label,skills:[]});const n=_n.find(o=>o.id==="built-in"),s={id:"other",label:"Other Skills",skills:[]};for(const o of e){const a=o.bundled?n:_n.find(l=>l.sources.includes(o.source));a?t.get(a.id)?.skills.push(o):s.skills.push(o)}const i=_n.map(o=>t.get(o.id)).filter(o=>!!(o&&o.skills.length>0));return s.skills.length>0&&i.push(s),i}function nh(e){const t=!!e.configForm&&!e.configLoading&&!e.configSaving,n=ps(e.configForm,e.agentId),s=Array.isArray(n.entry?.skills)?n.entry?.skills:void 0,i=new Set((s??[]).map(m=>m.trim()).filter(Boolean)),o=s!==void 0,a=!!(e.report&&e.activeAgentId===e.agentId),l=a?e.report?.skills??[]:[],c=e.filter.trim().toLowerCase(),u=c?l.filter(m=>[m.name,m.description,m.source].join(" ").toLowerCase().includes(c)):l,g=th(u),p=o?l.filter(m=>i.has(m.name)).length:l.length,f=l.length;return r`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Skills</div>
          <div class="card-sub">
            Per-agent skill allowlist and workspace skills.
            ${f>0?r`<span class="mono">${p}/${f}</span>`:h}
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

      ${e.configForm?h:r`
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
            `:h}
      ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:h}

      <div class="filters" style="margin-top: 14px;">
        <label class="field" style="flex: 1;">
          <span>Filter</span>
          <input
            .value=${e.filter}
            @input=${m=>e.onFilterChange(m.target.value)}
            placeholder="Search skills"
          />
        </label>
        <div class="muted">${u.length} shown</div>
      </div>

      ${u.length===0?r`
              <div class="muted" style="margin-top: 16px">No skills found.</div>
            `:r`
              <div class="agent-skills-groups" style="margin-top: 16px;">
                ${g.map(m=>sh(m,{agentId:e.agentId,allowSet:i,usingAllowlist:o,editable:t,onToggle:e.onToggle}))}
              </div>
            `}
    </section>
  `}function sh(e,t){const n=e.id==="workspace"||e.id==="built-in";return r`
    <details class="agent-skills-group" ?open=${!n}>
      <summary class="agent-skills-header">
        <span>${e.label}</span>
        <span class="muted">${e.skills.length}</span>
      </summary>
      <div class="list skills-grid">
        ${e.skills.map(s=>ih(s,{agentId:t.agentId,allowSet:t.allowSet,usingAllowlist:t.usingAllowlist,editable:t.editable,onToggle:t.onToggle}))}
      </div>
    </details>
  `}function ih(e,t){const n=t.usingAllowlist?t.allowSet.has(e.name):!0,s=[...e.missing.bins.map(o=>`bin:${o}`),...e.missing.env.map(o=>`env:${o}`),...e.missing.config.map(o=>`config:${o}`),...e.missing.os.map(o=>`os:${o}`)],i=[];return e.disabled&&i.push("disabled"),e.blockedByAllowlist&&i.push("blocked by allowlist"),r`
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
                `:h}
        </div>
        ${s.length>0?r`<div class="muted" style="margin-top: 6px;">Missing: ${s.join(", ")}</div>`:h}
        ${i.length>0?r`<div class="muted" style="margin-top: 6px;">Reason: ${i.join(", ")}</div>`:h}
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
  `}function Ne(e){if(e)return Array.isArray(e.type)?e.type.filter(n=>n!=="null")[0]??e.type[0]:e.type}function Il(e){if(!e)return"";if(e.default!==void 0)return e.default;switch(Ne(e)){case"object":return{};case"array":return[];case"boolean":return!1;case"number":case"integer":return 0;case"string":return"";default:return""}}function hs(e){return e.filter(t=>typeof t=="string").join(".")}function Ce(e,t){const n=hs(e),s=t[n];if(s)return s;const i=n.split(".");for(const[o,a]of Object.entries(t)){if(!o.includes("*"))continue;const l=o.split(".");if(l.length!==i.length)continue;let c=!0;for(let u=0;u<i.length;u+=1)if(l[u]!=="*"&&l[u]!==i[u]){c=!1;break}if(c)return a}}function qe(e){return e.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/\s+/g," ").replace(/^./,t=>t.toUpperCase())}function oh(e){const t=hs(e).toLowerCase();return t.includes("token")||t.includes("password")||t.includes("secret")||t.includes("apikey")||t.endsWith("key")}const ah=new Set(["title","description","default","nullable"]);function rh(e){return Object.keys(e??{}).filter(n=>!ah.has(n)).length===0}function lh(e){if(e===void 0)return"";try{return JSON.stringify(e,null,2)??""}catch{return""}}const dn={chevronDown:r`
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
  `};function Ge(e){const{schema:t,value:n,path:s,hints:i,unsupported:o,disabled:a,onPatch:l}=e,c=e.showLabel??!0,u=Ne(t),g=Ce(s,i),p=g?.label??t.title??qe(String(s.at(-1))),f=g?.help??t.description,m=hs(s);if(o.has(m))return r`<div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${p}</div>
      <div class="cfg-field__error">Unsupported schema node. Use Raw mode.</div>
    </div>`;if(t.anyOf||t.oneOf){const v=(t.anyOf??t.oneOf??[]).filter(T=>!(T.type==="null"||Array.isArray(T.type)&&T.type.includes("null")));if(v.length===1)return Ge({...e,schema:v[0]});const b=T=>{if(T.const!==void 0)return T.const;if(T.enum&&T.enum.length===1)return T.enum[0]},S=v.map(b),k=S.every(T=>T!==void 0);if(k&&S.length>0&&S.length<=5){const T=n??t.default;return r`
        <div class="cfg-field">
          ${c?r`<label class="cfg-field__label">${p}</label>`:h}
          ${f?r`<div class="cfg-field__help">${f}</div>`:h}
          <div class="cfg-segmented">
            ${S.map(_=>r`
              <button
                type="button"
                class="cfg-segmented__btn ${_===T||String(_)===String(T)?"active":""}"
                ?disabled=${a}
                @click=${()=>l(s,_)}
              >
                ${String(_)}
              </button>
            `)}
          </div>
        </div>
      `}if(k&&S.length>5)return _a({...e,options:S,value:n??t.default});const C=new Set(v.map(T=>Ne(T)).filter(Boolean)),A=new Set([...C].map(T=>T==="integer"?"number":T));if([...A].every(T=>["string","number","boolean"].includes(T))){const T=A.has("string"),_=A.has("number");if(A.has("boolean")&&A.size===1)return Ge({...e,schema:{...t,type:"boolean",anyOf:void 0,oneOf:void 0}});if(T||_)return Ta({...e,inputType:_&&!T?"number":"text"})}}if(t.enum){const d=t.enum;if(d.length<=5){const v=n??t.default;return r`
        <div class="cfg-field">
          ${c?r`<label class="cfg-field__label">${p}</label>`:h}
          ${f?r`<div class="cfg-field__help">${f}</div>`:h}
          <div class="cfg-segmented">
            ${d.map(b=>r`
              <button
                type="button"
                class="cfg-segmented__btn ${b===v||String(b)===String(v)?"active":""}"
                ?disabled=${a}
                @click=${()=>l(s,b)}
              >
                ${String(b)}
              </button>
            `)}
          </div>
        </div>
      `}return _a({...e,options:d,value:n??t.default})}if(u==="object")return dh(e);if(u==="array")return uh(e);if(u==="boolean"){const d=typeof n=="boolean"?n:typeof t.default=="boolean"?t.default:!1;return r`
      <label class="cfg-toggle-row ${a?"disabled":""}">
        <div class="cfg-toggle-row__content">
          <span class="cfg-toggle-row__label">${p}</span>
          ${f?r`<span class="cfg-toggle-row__help">${f}</span>`:h}
        </div>
        <div class="cfg-toggle">
          <input
            type="checkbox"
            .checked=${d}
            ?disabled=${a}
            @change=${v=>l(s,v.target.checked)}
          />
          <span class="cfg-toggle__track"></span>
        </div>
      </label>
    `}return u==="number"||u==="integer"?ch(e):u==="string"?Ta({...e,inputType:"text"}):r`
    <div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${p}</div>
      <div class="cfg-field__error">Unsupported type: ${u}. Use Raw mode.</div>
    </div>
  `}function Ta(e){const{schema:t,value:n,path:s,hints:i,disabled:o,onPatch:a,inputType:l}=e,c=e.showLabel??!0,u=Ce(s,i),g=u?.label??t.title??qe(String(s.at(-1))),p=u?.help??t.description,f=u?.sensitive??oh(s),m=u?.placeholder??(f?"••••":t.default!==void 0?`Default: ${String(t.default)}`:""),d=n??"";return r`
    <div class="cfg-field">
      ${c?r`<label class="cfg-field__label">${g}</label>`:h}
      ${p?r`<div class="cfg-field__help">${p}</div>`:h}
      <div class="cfg-input-wrap">
        <input
          type=${f?"password":l}
          class="cfg-input"
          placeholder=${m}
          .value=${d==null?"":String(d)}
          ?disabled=${o}
          @input=${v=>{const b=v.target.value;if(l==="number"){if(b.trim()===""){a(s,void 0);return}const S=Number(b);a(s,Number.isNaN(S)?b:S);return}a(s,b)}}
          @change=${v=>{if(l==="number")return;const b=v.target.value;a(s,b.trim())}}
        />
        ${t.default!==void 0?r`
          <button
            type="button"
            class="cfg-input__reset"
            title="Reset to default"
            ?disabled=${o}
            @click=${()=>a(s,t.default)}
          >↺</button>
        `:h}
      </div>
    </div>
  `}function ch(e){const{schema:t,value:n,path:s,hints:i,disabled:o,onPatch:a}=e,l=e.showLabel??!0,c=Ce(s,i),u=c?.label??t.title??qe(String(s.at(-1))),g=c?.help??t.description,p=n??t.default??"",f=typeof p=="number"?p:0;return r`
    <div class="cfg-field">
      ${l?r`<label class="cfg-field__label">${u}</label>`:h}
      ${g?r`<div class="cfg-field__help">${g}</div>`:h}
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
          .value=${p==null?"":String(p)}
          ?disabled=${o}
          @input=${m=>{const d=m.target.value,v=d===""?void 0:Number(d);a(s,v)}}
        />
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${o}
          @click=${()=>a(s,f+1)}
        >+</button>
      </div>
    </div>
  `}function _a(e){const{schema:t,value:n,path:s,hints:i,disabled:o,options:a,onPatch:l}=e,c=e.showLabel??!0,u=Ce(s,i),g=u?.label??t.title??qe(String(s.at(-1))),p=u?.help??t.description,f=n??t.default,m=a.findIndex(v=>v===f||String(v)===String(f)),d="__unset__";return r`
    <div class="cfg-field">
      ${c?r`<label class="cfg-field__label">${g}</label>`:h}
      ${p?r`<div class="cfg-field__help">${p}</div>`:h}
      <select
        class="cfg-select"
        ?disabled=${o}
        .value=${m>=0?String(m):d}
        @change=${v=>{const b=v.target.value;l(s,b===d?void 0:a[Number(b)])}}
      >
        <option value=${d}>Select...</option>
        ${a.map((v,b)=>r`
          <option value=${String(b)}>${String(v)}</option>
        `)}
      </select>
    </div>
  `}function dh(e){const{schema:t,value:n,path:s,hints:i,unsupported:o,disabled:a,onPatch:l}=e,c=Ce(s,i),u=c?.label??t.title??qe(String(s.at(-1))),g=c?.help??t.description,p=n??t.default,f=p&&typeof p=="object"&&!Array.isArray(p)?p:{},m=t.properties??{},v=Object.entries(m).toSorted((C,A)=>{const T=Ce([...s,C[0]],i)?.order??0,_=Ce([...s,A[0]],i)?.order??0;return T!==_?T-_:C[0].localeCompare(A[0])}),b=new Set(Object.keys(m)),S=t.additionalProperties,k=!!S&&typeof S=="object";return s.length===1?r`
      <div class="cfg-fields">
        ${v.map(([C,A])=>Ge({schema:A,value:f[C],path:[...s,C],hints:i,unsupported:o,disabled:a,onPatch:l}))}
        ${k?La({schema:S,value:f,path:s,hints:i,unsupported:o,disabled:a,reservedKeys:b,onPatch:l}):h}
      </div>
    `:r`
    <details class="cfg-object" open>
      <summary class="cfg-object__header">
        <span class="cfg-object__title">${u}</span>
        <span class="cfg-object__chevron">${dn.chevronDown}</span>
      </summary>
      ${g?r`<div class="cfg-object__help">${g}</div>`:h}
      <div class="cfg-object__content">
        ${v.map(([C,A])=>Ge({schema:A,value:f[C],path:[...s,C],hints:i,unsupported:o,disabled:a,onPatch:l}))}
        ${k?La({schema:S,value:f,path:s,hints:i,unsupported:o,disabled:a,reservedKeys:b,onPatch:l}):h}
      </div>
    </details>
  `}function uh(e){const{schema:t,value:n,path:s,hints:i,unsupported:o,disabled:a,onPatch:l}=e,c=e.showLabel??!0,u=Ce(s,i),g=u?.label??t.title??qe(String(s.at(-1))),p=u?.help??t.description,f=Array.isArray(t.items)?t.items[0]:t.items;if(!f)return r`
      <div class="cfg-field cfg-field--error">
        <div class="cfg-field__label">${g}</div>
        <div class="cfg-field__error">Unsupported array schema. Use Raw mode.</div>
      </div>
    `;const m=Array.isArray(n)?n:Array.isArray(t.default)?t.default:[];return r`
    <div class="cfg-array">
      <div class="cfg-array__header">
        ${c?r`<span class="cfg-array__label">${g}</span>`:h}
        <span class="cfg-array__count">${m.length} item${m.length!==1?"s":""}</span>
        <button
          type="button"
          class="cfg-array__add"
          ?disabled=${a}
          @click=${()=>{const d=[...m,Il(f)];l(s,d)}}
        >
          <span class="cfg-array__add-icon">${dn.plus}</span>
          Add
        </button>
      </div>
      ${p?r`<div class="cfg-array__help">${p}</div>`:h}

      ${m.length===0?r`
              <div class="cfg-array__empty">No items yet. Click "Add" to create one.</div>
            `:r`
        <div class="cfg-array__items">
          ${m.map((d,v)=>r`
            <div class="cfg-array__item">
              <div class="cfg-array__item-header">
                <span class="cfg-array__item-index">#${v+1}</span>
                <button
                  type="button"
                  class="cfg-array__item-remove"
                  title="Remove item"
                  ?disabled=${a}
                  @click=${()=>{const b=[...m];b.splice(v,1),l(s,b)}}
                >
                  ${dn.trash}
                </button>
              </div>
              <div class="cfg-array__item-content">
                ${Ge({schema:f,value:d,path:[...s,v],hints:i,unsupported:o,disabled:a,showLabel:!1,onPatch:l})}
              </div>
            </div>
          `)}
        </div>
      `}
    </div>
  `}function La(e){const{schema:t,value:n,path:s,hints:i,unsupported:o,disabled:a,reservedKeys:l,onPatch:c}=e,u=rh(t),g=Object.entries(n??{}).filter(([p])=>!l.has(p));return r`
    <div class="cfg-map">
      <div class="cfg-map__header">
        <span class="cfg-map__label">Custom entries</span>
        <button
          type="button"
          class="cfg-map__add"
          ?disabled=${a}
          @click=${()=>{const p={...n};let f=1,m=`custom-${f}`;for(;m in p;)f+=1,m=`custom-${f}`;p[m]=u?{}:Il(t),c(s,p)}}
        >
          <span class="cfg-map__add-icon">${dn.plus}</span>
          Add Entry
        </button>
      </div>

      ${g.length===0?r`
              <div class="cfg-map__empty">No custom entries.</div>
            `:r`
        <div class="cfg-map__items">
          ${g.map(([p,f])=>{const m=[...s,p],d=lh(f);return r`
              <div class="cfg-map__item">
                <div class="cfg-map__item-key">
                  <input
                    type="text"
                    class="cfg-input cfg-input--sm"
                    placeholder="Key"
                    .value=${p}
                    ?disabled=${a}
                    @change=${v=>{const b=v.target.value.trim();if(!b||b===p)return;const S={...n};b in S||(S[b]=S[p],delete S[p],c(s,S))}}
                  />
                </div>
                <div class="cfg-map__item-value">
                  ${u?r`
                        <textarea
                          class="cfg-textarea cfg-textarea--sm"
                          placeholder="JSON value"
                          rows="2"
                          .value=${d}
                          ?disabled=${a}
                          @change=${v=>{const b=v.target,S=b.value.trim();if(!S){c(m,void 0);return}try{c(m,JSON.parse(S))}catch{b.value=d}}}
                        ></textarea>
                      `:Ge({schema:t,value:f,path:m,hints:i,unsupported:o,disabled:a,showLabel:!1,onPatch:c})}
                </div>
                <button
                  type="button"
                  class="cfg-map__item-remove"
                  title="Remove entry"
                  ?disabled=${a}
                  @click=${()=>{const v={...n};delete v[p],c(s,v)}}
                >
                  ${dn.trash}
                </button>
              </div>
            `})}
        </div>
      `}
    </div>
  `}const Ea={env:r`
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
  `},uo={env:{label:"Environment Variables",description:"Environment variables passed to the gateway process"},update:{label:"Updates",description:"Auto-update settings and release channel"},agents:{label:"Agents",description:"Agent configurations, models, and identities"},auth:{label:"Authentication",description:"API keys and authentication profiles"},channels:{label:"Channels",description:"Messaging channels (Telegram, Discord, Slack, etc.)"},messages:{label:"Messages",description:"Message handling and routing settings"},commands:{label:"Commands",description:"Custom slash commands"},hooks:{label:"Hooks",description:"Webhooks and event hooks"},skills:{label:"Skills",description:"Skill packs and capabilities"},tools:{label:"Tools",description:"Tool configurations (browser, search, etc.)"},gateway:{label:"Gateway",description:"Gateway server settings (port, auth, binding)"},wizard:{label:"Setup Wizard",description:"Setup wizard state and history"},meta:{label:"Metadata",description:"Gateway metadata and version information"},logging:{label:"Logging",description:"Log levels and output configuration"},browser:{label:"Browser",description:"Browser automation settings"},ui:{label:"UI",description:"User interface preferences"},models:{label:"Models",description:"AI model configurations and providers"},bindings:{label:"Bindings",description:"Key bindings and shortcuts"},broadcast:{label:"Broadcast",description:"Broadcast and notification settings"},audio:{label:"Audio",description:"Audio input/output settings"},session:{label:"Session",description:"Session management and persistence"},cron:{label:"Cron",description:"Scheduled tasks and automation"},web:{label:"Web",description:"Web server and API settings"},discovery:{label:"Discovery",description:"Service discovery and networking"},canvasHost:{label:"Canvas Host",description:"Canvas rendering and display"},talk:{label:"Talk",description:"Voice and speech settings"},plugins:{label:"Plugins",description:"Plugin management and extensions"}};function Ia(e){return Ea[e]??Ea.default}function gh(e,t,n){if(!n)return!0;const s=n.toLowerCase(),i=uo[e];return e.toLowerCase().includes(s)||i&&(i.label.toLowerCase().includes(s)||i.description.toLowerCase().includes(s))?!0:Vt(t,s)}function Vt(e,t){if(e.title?.toLowerCase().includes(t)||e.description?.toLowerCase().includes(t)||e.enum?.some(s=>String(s).toLowerCase().includes(t)))return!0;if(e.properties){for(const[s,i]of Object.entries(e.properties))if(s.toLowerCase().includes(t)||Vt(i,t))return!0}if(e.items){const s=Array.isArray(e.items)?e.items:[e.items];for(const i of s)if(i&&Vt(i,t))return!0}if(e.additionalProperties&&typeof e.additionalProperties=="object"&&Vt(e.additionalProperties,t))return!0;const n=e.anyOf??e.oneOf??e.allOf;if(n){for(const s of n)if(s&&Vt(s,t))return!0}return!1}function ph(e){if(!e.schema)return r`
      <div class="muted">Schema unavailable.</div>
    `;const t=e.schema,n=e.value??{};if(Ne(t)!=="object"||!t.properties)return r`
      <div class="callout danger">Unsupported schema. Use Raw.</div>
    `;const s=new Set(e.unsupportedPaths??[]),i=t.properties,o=e.searchQuery??"",a=e.activeSection,l=e.activeSubsection??null,u=Object.entries(i).toSorted((p,f)=>{const m=Ce([p[0]],e.uiHints)?.order??50,d=Ce([f[0]],e.uiHints)?.order??50;return m!==d?m-d:p[0].localeCompare(f[0])}).filter(([p,f])=>!(a&&p!==a||o&&!gh(p,f,o)));let g=null;if(a&&l&&u.length===1){const p=u[0]?.[1];p&&Ne(p)==="object"&&p.properties&&p.properties[l]&&(g={sectionKey:a,subsectionKey:l,schema:p.properties[l]})}return u.length===0?r`
      <div class="config-empty">
        <div class="config-empty__icon">${J.search}</div>
        <div class="config-empty__text">
          ${o?`No settings match "${o}"`:"No settings in this section"}
        </div>
      </div>
    `:r`
    <div class="config-form config-form--modern">
      ${g?(()=>{const{sectionKey:p,subsectionKey:f,schema:m}=g,d=Ce([p,f],e.uiHints),v=d?.label??m.title??qe(f),b=d?.help??m.description??"",S=n[p],k=S&&typeof S=="object"?S[f]:void 0,C=`config-section-${p}-${f}`;return r`
              <section class="config-section-card" id=${C}>
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${Ia(p)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${v}</h3>
                    ${b?r`<p class="config-section-card__desc">${b}</p>`:h}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${Ge({schema:m,value:k,path:[p,f],hints:e.uiHints,unsupported:s,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})():u.map(([p,f])=>{const m=uo[p]??{label:p.charAt(0).toUpperCase()+p.slice(1),description:f.description??""};return r`
              <section class="config-section-card" id="config-section-${p}">
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${Ia(p)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${m.label}</h3>
                    ${m.description?r`<p class="config-section-card__desc">${m.description}</p>`:h}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${Ge({schema:f,value:n[p],path:[p],hints:e.uiHints,unsupported:s,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})}
    </div>
  `}const hh=new Set(["title","description","default","nullable"]);function fh(e){return Object.keys(e??{}).filter(n=>!hh.has(n)).length===0}function Ml(e){const t=e.filter(i=>i!=null),n=t.length!==e.length,s=[];for(const i of t)s.some(o=>Object.is(o,i))||s.push(i);return{enumValues:s,nullable:n}}function Rl(e){return!e||typeof e!="object"?{schema:null,unsupportedPaths:["<root>"]}:Xt(e,[])}function Xt(e,t){const n=new Set,s={...e},i=hs(t)||"<root>";if(e.anyOf||e.oneOf||e.allOf){const l=vh(e,t);return l||{schema:e,unsupportedPaths:[i]}}const o=Array.isArray(e.type)&&e.type.includes("null"),a=Ne(e)??(e.properties||e.additionalProperties?"object":void 0);if(s.type=a??e.type,s.nullable=o||e.nullable,s.enum){const{enumValues:l,nullable:c}=Ml(s.enum);s.enum=l,c&&(s.nullable=!0),l.length===0&&n.add(i)}if(a==="object"){const l=e.properties??{},c={};for(const[u,g]of Object.entries(l)){const p=Xt(g,[...t,u]);p.schema&&(c[u]=p.schema);for(const f of p.unsupportedPaths)n.add(f)}if(s.properties=c,e.additionalProperties===!0)n.add(i);else if(e.additionalProperties===!1)s.additionalProperties=!1;else if(e.additionalProperties&&typeof e.additionalProperties=="object"&&!fh(e.additionalProperties)){const u=Xt(e.additionalProperties,[...t,"*"]);s.additionalProperties=u.schema??e.additionalProperties,u.unsupportedPaths.length>0&&n.add(i)}}else if(a==="array"){const l=Array.isArray(e.items)?e.items[0]:e.items;if(!l)n.add(i);else{const c=Xt(l,[...t,"*"]);s.items=c.schema??l,c.unsupportedPaths.length>0&&n.add(i)}}else a!=="string"&&a!=="number"&&a!=="integer"&&a!=="boolean"&&!s.enum&&n.add(i);return{schema:s,unsupportedPaths:Array.from(n)}}function vh(e,t){if(e.allOf)return null;const n=e.anyOf??e.oneOf;if(!n)return null;const s=[],i=[];let o=!1;for(const l of n){if(!l||typeof l!="object")return null;if(Array.isArray(l.enum)){const{enumValues:c,nullable:u}=Ml(l.enum);s.push(...c),u&&(o=!0);continue}if("const"in l){if(l.const==null){o=!0;continue}s.push(l.const);continue}if(Ne(l)==="null"){o=!0;continue}i.push(l)}if(s.length>0&&i.length===0){const l=[];for(const c of s)l.some(u=>Object.is(u,c))||l.push(c);return{schema:{...e,enum:l,nullable:o,anyOf:void 0,oneOf:void 0,allOf:void 0},unsupportedPaths:[]}}if(i.length===1){const l=Xt(i[0],t);return l.schema&&(l.schema.nullable=o||l.schema.nullable),l}const a=new Set(["string","number","integer","boolean"]);return i.length>0&&s.length===0&&i.every(l=>l.type&&a.has(String(l.type)))?{schema:{...e,nullable:o},unsupportedPaths:[]}:null}function mh(e,t){let n=e;for(const s of t){if(!n)return null;const i=Ne(n);if(i==="object"){const o=n.properties??{};if(typeof s=="string"&&o[s]){n=o[s];continue}const a=n.additionalProperties;if(typeof s=="string"&&a&&typeof a=="object"){n=a;continue}return null}if(i==="array"){if(typeof s!="number")return null;n=(Array.isArray(n.items)?n.items[0]:n.items)??null;continue}return null}return n}function bh(e,t){const s=(e.channels??{})[t],i=e[t];return(s&&typeof s=="object"?s:null)??(i&&typeof i=="object"?i:null)??{}}const yh=["groupPolicy","streamMode","dmPolicy"];function xh(e){if(e==null)return"n/a";if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return String(e);try{return JSON.stringify(e)}catch{return"n/a"}}function $h(e){const t=yh.flatMap(n=>n in e?[[n,e[n]]]:[]);return t.length===0?null:r`
    <div class="status-list" style="margin-top: 12px;">
      ${t.map(([n,s])=>r`
          <div>
            <span class="label">${n}</span>
            <span>${xh(s)}</span>
          </div>
        `)}
    </div>
  `}function wh(e){const t=Rl(e.schema),n=t.schema;if(!n)return r`
      <div class="callout danger">Schema unavailable. Use Raw.</div>
    `;const s=mh(n,["channels",e.channelId]);if(!s)return r`
      <div class="callout danger">Channel config schema unavailable.</div>
    `;const i=e.configValue??{},o=bh(i,e.channelId);return r`
    <div class="config-form">
      ${Ge({schema:s,value:o,path:["channels",e.channelId],hints:e.uiHints,unsupported:new Set(t.unsupportedPaths),disabled:e.disabled,showLabel:!1,onPatch:e.onPatch})}
    </div>
    ${$h(o)}
  `}function Ve(e){const{channelId:t,props:n}=e,s=n.configSaving||n.configSchemaLoading;return r`
    <div style="margin-top: 16px;">
      ${n.configSchemaLoading?r`
              <div class="muted">Loading config schema…</div>
            `:wh({channelId:t,configValue:n.configForm,schema:n.configSchema,uiHints:n.configUiHints,disabled:s,onPatch:n.onConfigPatch})}
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
  `}function kh(e){const{props:t,discord:n,accountCountLabel:s}=e;return r`
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
          </div>`:h}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            Probe ${n.probe.ok?"ok":"failed"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:h}

      ${Ve({channelId:"discord",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Probe
        </button>
      </div>
    </div>
  `}function Sh(e){const{props:t,googleChat:n,accountCountLabel:s}=e;return r`
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
          </div>`:h}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            Probe ${n.probe.ok?"ok":"failed"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:h}

      ${Ve({channelId:"googlechat",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Probe
        </button>
      </div>
    </div>
  `}function Ah(e){const{props:t,imessage:n,accountCountLabel:s}=e;return r`
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
          </div>`:h}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            Probe ${n.probe.ok?"ok":"failed"} ·
            ${n.probe.error??""}
          </div>`:h}

      ${Ve({channelId:"imessage",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Probe
        </button>
      </div>
    </div>
  `}function Ma(e){return e?e.length<=20?e:`${e.slice(0,8)}...${e.slice(-8)}`:"n/a"}function Ch(e){const{props:t,nostr:n,nostrAccounts:s,accountCountLabel:i,profileFormState:o,profileFormCallbacks:a,onEditProfile:l}=e,c=s[0],u=n?.configured??c?.configured??!1,g=n?.running??c?.running??!1,p=n?.publicKey??c?.publicKey,f=n?.lastStartAt??c?.lastStartAt??null,m=n?.lastError??c?.lastError??null,d=s.length>1,v=o!=null,b=k=>{const C=k.publicKey,A=k.profile,T=A?.displayName??A?.name??k.name??k.accountId;return r`
      <div class="account-card">
        <div class="account-card-header">
          <div class="account-card-title">${T}</div>
          <div class="account-card-id">${k.accountId}</div>
        </div>
        <div class="status-list account-card-status">
          <div>
            <span class="label">Running</span>
            <span>${k.running?"Yes":"No"}</span>
          </div>
          <div>
            <span class="label">Configured</span>
            <span>${k.configured?"Yes":"No"}</span>
          </div>
          <div>
            <span class="label">Public Key</span>
            <span class="monospace" title="${C??""}">${Ma(C)}</span>
          </div>
          <div>
            <span class="label">Last inbound</span>
            <span>${k.lastInboundAt?Y(k.lastInboundAt):"n/a"}</span>
          </div>
          ${k.lastError?r`
                <div class="account-card-error">${k.lastError}</div>
              `:h}
        </div>
      </div>
    `},S=()=>{if(v&&a)return Vc({state:o,callbacks:a,accountId:s[0]?.accountId??"default"});const k=c?.profile??n?.profile,{name:C,displayName:A,about:T,picture:_,nip05:M}=k??{},G=C||A||T||_||M;return r`
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
              `:h}
        </div>
        ${G?r`
              <div class="status-list">
                ${_?r`
                      <div style="margin-bottom: 8px;">
                        <img
                          src=${_}
                          alt="Profile picture"
                          style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border-color);"
                          @error=${K=>{K.target.style.display="none"}}
                        />
                      </div>
                    `:h}
                ${C?r`<div><span class="label">Name</span><span>${C}</span></div>`:h}
                ${A?r`<div><span class="label">Display Name</span><span>${A}</span></div>`:h}
                ${T?r`<div><span class="label">About</span><span style="max-width: 300px; overflow: hidden; text-overflow: ellipsis;">${T}</span></div>`:h}
                ${M?r`<div><span class="label">NIP-05</span><span>${M}</span></div>`:h}
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
              ${s.map(k=>b(k))}
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
                  >${Ma(p)}</span
                >
              </div>
              <div>
                <span class="label">Last start</span>
                <span>${f?Y(f):"n/a"}</span>
              </div>
            </div>
          `}

      ${m?r`<div class="callout danger" style="margin-top: 12px;">${m}</div>`:h}

      ${S()}

      ${Ve({channelId:"nostr",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!1)}>Refresh</button>
      </div>
    </div>
  `}function Th(e,t){const n=t.snapshot,s=n?.channels;if(!n||!s)return!1;const i=s[e],o=typeof i?.configured=="boolean"&&i.configured,a=typeof i?.running=="boolean"&&i.running,l=typeof i?.connected=="boolean"&&i.connected,u=(n.channelAccounts?.[e]??[]).some(g=>g.configured||g.running||g.connected);return o||a||l||u}function _h(e,t){return t?.[e]?.length??0}function Pl(e,t){const n=_h(e,t);return n<2?h:r`<div class="account-count">Accounts (${n})</div>`}function Lh(e){const{props:t,signal:n,accountCountLabel:s}=e;return r`
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
          </div>`:h}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            Probe ${n.probe.ok?"ok":"failed"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:h}

      ${Ve({channelId:"signal",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Probe
        </button>
      </div>
    </div>
  `}function Eh(e){const{props:t,slack:n,accountCountLabel:s}=e;return r`
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
          </div>`:h}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            Probe ${n.probe.ok?"ok":"failed"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:h}

      ${Ve({channelId:"slack",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Probe
        </button>
      </div>
    </div>
  `}function Ih(e){const{props:t,telegram:n,telegramAccounts:s,accountCountLabel:i}=e,o=s.length>1,a=l=>{const u=l.probe?.bot?.username,g=l.name||l.accountId;return r`
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
              `:h}
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
          </div>`:h}

      ${n?.probe?r`<div class="callout" style="margin-top: 12px;">
            Probe ${n.probe.ok?"ok":"failed"} ·
            ${n.probe.status??""} ${n.probe.error??""}
          </div>`:h}

      ${Ve({channelId:"telegram",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!0)}>
          Probe
        </button>
      </div>
    </div>
  `}function Mh(e){const{props:t,whatsapp:n,accountCountLabel:s}=e;return r`
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
            ${n?.authAgeMs!=null?Gi(n.authAgeMs):"n/a"}
          </span>
        </div>
      </div>

      ${n?.lastError?r`<div class="callout danger" style="margin-top: 12px;">
            ${n.lastError}
          </div>`:h}

      ${t.whatsappMessage?r`<div class="callout" style="margin-top: 12px;">
            ${t.whatsappMessage}
          </div>`:h}

      ${t.whatsappQrDataUrl?r`<div class="qr-wrap">
            <img src=${t.whatsappQrDataUrl} alt="WhatsApp QR" />
          </div>`:h}

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

      ${Ve({channelId:"whatsapp",props:t})}
    </div>
  `}function Rh(e){const t=e.snapshot?.channels,n=t?.whatsapp??void 0,s=t?.telegram??void 0,i=t?.discord??null,o=t?.googlechat??null,a=t?.slack??null,l=t?.signal??null,c=t?.imessage??null,u=t?.nostr??null,p=Ph(e.snapshot).map((f,m)=>({key:f,enabled:Th(f,e),order:m})).toSorted((f,m)=>f.enabled!==m.enabled?f.enabled?-1:1:f.order-m.order);return r`
    <section class="grid grid-cols-2">
      ${p.map(f=>Dh(f.key,e,{whatsapp:n,telegram:s,discord:i,googlechat:o,slack:a,signal:l,imessage:c,nostr:u,channelAccounts:e.snapshot?.channelAccounts??null}))}
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
          </div>`:h}
      <pre class="code-block" style="margin-top: 12px;">
${e.snapshot?JSON.stringify(e.snapshot,null,2):"No snapshot yet."}
      </pre>
    </section>
  `}function Ph(e){return e?.channelMeta?.length?e.channelMeta.map(t=>t.id):e?.channelOrder?.length?e.channelOrder:["whatsapp","telegram","discord","googlechat","slack","signal","imessage","nostr"]}function Dh(e,t,n){const s=Pl(e,n.channelAccounts);switch(e){case"whatsapp":return Mh({props:t,whatsapp:n.whatsapp,accountCountLabel:s});case"telegram":return Ih({props:t,telegram:n.telegram,telegramAccounts:n.channelAccounts?.telegram??[],accountCountLabel:s});case"discord":return kh({props:t,discord:n.discord,accountCountLabel:s});case"googlechat":return Sh({props:t,googleChat:n.googlechat,accountCountLabel:s});case"slack":return Eh({props:t,slack:n.slack,accountCountLabel:s});case"signal":return Lh({props:t,signal:n.signal,accountCountLabel:s});case"imessage":return Ah({props:t,imessage:n.imessage,accountCountLabel:s});case"nostr":{const i=n.channelAccounts?.nostr??[],o=i[0],a=o?.accountId??"default",l=o?.profile??null,c=t.nostrProfileAccountId===a?t.nostrProfileFormState:null,u=c?{onFieldChange:t.onNostrProfileFieldChange,onSave:t.onNostrProfileSave,onImport:t.onNostrProfileImport,onCancel:t.onNostrProfileCancel,onToggleAdvanced:t.onNostrProfileToggleAdvanced}:null;return Ch({props:t,nostr:n.nostr,nostrAccounts:i,accountCountLabel:s,profileFormState:c,profileFormCallbacks:u,onEditProfile:()=>t.onNostrProfileEdit(a,l)})}default:return Nh(e,t,n.channelAccounts??{})}}function Nh(e,t,n){const s=Oh(t.snapshot,e),i=t.snapshot?.channels?.[e],o=typeof i?.configured=="boolean"?i.configured:void 0,a=typeof i?.running=="boolean"?i.running:void 0,l=typeof i?.connected=="boolean"?i.connected:void 0,c=typeof i?.lastError=="string"?i.lastError:void 0,u=n[e]??[],g=Pl(e,n);return r`
    <div class="card">
      <div class="card-title">${s}</div>
      <div class="card-sub">Channel status and configuration.</div>
      ${g}

      ${u.length>0?r`
            <div class="account-card-list">
              ${u.map(p=>Hh(p))}
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
          </div>`:h}

      ${Ve({channelId:e,props:t})}
    </div>
  `}function Fh(e){return e?.channelMeta?.length?Object.fromEntries(e.channelMeta.map(t=>[t.id,t])):{}}function Oh(e,t){return Fh(e)[t]?.label??e?.channelLabels?.[t]??t}const Bh=600*1e3;function Dl(e){return e.lastInboundAt?Date.now()-e.lastInboundAt<Bh:!1}function Uh(e){return e.running?"Yes":Dl(e)?"Active":"No"}function zh(e){return e.connected===!0?"Yes":e.connected===!1?"No":Dl(e)?"Active":"n/a"}function Hh(e){const t=Uh(e),n=zh(e);return r`
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
            `:h}
      </div>
    </div>
  `}const en=(e,t)=>{const n=e._$AN;if(n===void 0)return!1;for(const s of n)s._$AO?.(t,!1),en(s,t);return!0},Vn=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},Nl=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Wh(t)}};function Kh(e){this._$AN!==void 0?(Vn(this),this._$AM=e,Nl(this)):this._$AM=e}function jh(e,t=!1,n=0){const s=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(t)if(Array.isArray(s))for(let o=n;o<s.length;o++)en(s[o],!1),Vn(s[o]);else s!=null&&(en(s,!1),Vn(s));else en(this,e)}const Wh=e=>{e.type==ao.CHILD&&(e._$AP??=jh,e._$AQ??=Kh)};class Gh extends lo{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,n,s){super._$AT(t,n,s),Nl(this),this.isConnected=t._$AU}_$AO(t,n=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),n&&(en(this,t),Vn(this))}setValue(t){if(np(this._$Ct))this._$Ct._$AI(t,this);else{const n=[...this._$Ct._$AH];n[this._$Ci]=t,this._$Ct._$AI(n,this,0)}}disconnected(){}reconnected(){}}const Hs=new WeakMap,qh=ro(class extends Gh{render(e){return h}update(e,[t]){const n=t!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),h}rt(e){if(this.isConnected||(e=void 0),typeof this.G=="function"){const t=this.ht??globalThis;let n=Hs.get(t);n===void 0&&(n=new WeakMap,Hs.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return typeof this.G=="function"?Hs.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});class $i extends lo{constructor(t){if(super(t),this.it=h,t.type!==ao.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===h||t==null)return this._t=void 0,this.it=t;if(t===Ze)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}$i.directiveName="unsafeHTML",$i.resultType=1;const wi=ro($i);const{entries:Fl,setPrototypeOf:Ra,isFrozen:Vh,getPrototypeOf:Qh,getOwnPropertyDescriptor:Yh}=Object;let{freeze:me,seal:Te,create:ki}=Object,{apply:Si,construct:Ai}=typeof Reflect<"u"&&Reflect;me||(me=function(t){return t});Te||(Te=function(t){return t});Si||(Si=function(t,n){for(var s=arguments.length,i=new Array(s>2?s-2:0),o=2;o<s;o++)i[o-2]=arguments[o];return t.apply(n,i)});Ai||(Ai=function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return new t(...s)});const Ln=be(Array.prototype.forEach),Zh=be(Array.prototype.lastIndexOf),Pa=be(Array.prototype.pop),zt=be(Array.prototype.push),Jh=be(Array.prototype.splice),Un=be(String.prototype.toLowerCase),Ks=be(String.prototype.toString),js=be(String.prototype.match),Ht=be(String.prototype.replace),Xh=be(String.prototype.indexOf),ef=be(String.prototype.trim),_e=be(Object.prototype.hasOwnProperty),fe=be(RegExp.prototype.test),Kt=tf(TypeError);function be(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return Si(e,t,s)}}function tf(e){return function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];return Ai(e,n)}}function W(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Un;Ra&&Ra(e,null);let s=t.length;for(;s--;){let i=t[s];if(typeof i=="string"){const o=n(i);o!==i&&(Vh(t)||(t[s]=o),i=o)}e[i]=!0}return e}function nf(e){for(let t=0;t<e.length;t++)_e(e,t)||(e[t]=null);return e}function Pe(e){const t=ki(null);for(const[n,s]of Fl(e))_e(e,n)&&(Array.isArray(s)?t[n]=nf(s):s&&typeof s=="object"&&s.constructor===Object?t[n]=Pe(s):t[n]=s);return t}function jt(e,t){for(;e!==null;){const s=Yh(e,t);if(s){if(s.get)return be(s.get);if(typeof s.value=="function")return be(s.value)}e=Qh(e)}function n(){return null}return n}const Da=me(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ws=me(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Gs=me(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),sf=me(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),qs=me(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),of=me(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Na=me(["#text"]),Fa=me(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Vs=me(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Oa=me(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),En=me(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),af=Te(/\{\{[\w\W]*|[\w\W]*\}\}/gm),rf=Te(/<%[\w\W]*|[\w\W]*%>/gm),lf=Te(/\$\{[\w\W]*/gm),cf=Te(/^data-[\-\w.\u00B7-\uFFFF]+$/),df=Te(/^aria-[\-\w]+$/),Ol=Te(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),uf=Te(/^(?:\w+script|data):/i),gf=Te(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Bl=Te(/^html$/i),pf=Te(/^[a-z][.\w]*(-[.\w]+)+$/i);var Ba=Object.freeze({__proto__:null,ARIA_ATTR:df,ATTR_WHITESPACE:gf,CUSTOM_ELEMENT:pf,DATA_ATTR:cf,DOCTYPE_NAME:Bl,ERB_EXPR:rf,IS_ALLOWED_URI:Ol,IS_SCRIPT_OR_DATA:uf,MUSTACHE_EXPR:af,TMPLIT_EXPR:lf});const Wt={element:1,text:3,progressingInstruction:7,comment:8,document:9},hf=function(){return typeof window>"u"?null:window},ff=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let s=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(s=n.getAttribute(i));const o="dompurify"+(s?"#"+s:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ua=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ul(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:hf();const t=U=>Ul(U);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==Wt.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const s=n,i=s.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:l,Element:c,NodeFilter:u,NamedNodeMap:g=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:f,trustedTypes:m}=e,d=c.prototype,v=jt(d,"cloneNode"),b=jt(d,"remove"),S=jt(d,"nextSibling"),k=jt(d,"childNodes"),C=jt(d,"parentNode");if(typeof a=="function"){const U=n.createElement("template");U.content&&U.content.ownerDocument&&(n=U.content.ownerDocument)}let A,T="";const{implementation:_,createNodeIterator:M,createDocumentFragment:G,getElementsByTagName:K}=n,{importNode:se}=s;let N=Ua();t.isSupported=typeof Fl=="function"&&typeof C=="function"&&_&&_.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:z,ERB_EXPR:de,TMPLIT_EXPR:L,DATA_ATTR:B,ARIA_ATTR:ae,IS_SCRIPT_OR_DATA:re,ATTR_WHITESPACE:ee,CUSTOM_ELEMENT:ie}=Ba;let{IS_ALLOWED_URI:I}=Ba,R=null;const P=W({},[...Da,...Ws,...Gs,...qs,...Na]);let H=null;const $e=W({},[...Fa,...Vs,...Oa,...En]);let Z=Object.seal(ki(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Se=null,te=null;const he=Object.seal(ki(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Fe=!0,Oe=!0,tt=!1,Co=!0,wt=!1,vn=!0,nt=!1,bs=!1,ys=!1,kt=!1,mn=!1,bn=!1,To=!0,_o=!1;const rc="user-content-";let xs=!0,Ft=!1,St={},Ie=null;const $s=W({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Lo=null;const Eo=W({},["audio","video","img","source","image","track"]);let ws=null;const Io=W({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),yn="http://www.w3.org/1998/Math/MathML",xn="http://www.w3.org/2000/svg",Be="http://www.w3.org/1999/xhtml";let At=Be,ks=!1,Ss=null;const lc=W({},[yn,xn,Be],Ks);let $n=W({},["mi","mo","mn","ms","mtext"]),wn=W({},["annotation-xml"]);const cc=W({},["title","style","font","a","script"]);let Ot=null;const dc=["application/xhtml+xml","text/html"],uc="text/html";let oe=null,Ct=null;const gc=n.createElement("form"),Mo=function(y){return y instanceof RegExp||y instanceof Function},As=function(){let y=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ct&&Ct===y)){if((!y||typeof y!="object")&&(y={}),y=Pe(y),Ot=dc.indexOf(y.PARSER_MEDIA_TYPE)===-1?uc:y.PARSER_MEDIA_TYPE,oe=Ot==="application/xhtml+xml"?Ks:Un,R=_e(y,"ALLOWED_TAGS")?W({},y.ALLOWED_TAGS,oe):P,H=_e(y,"ALLOWED_ATTR")?W({},y.ALLOWED_ATTR,oe):$e,Ss=_e(y,"ALLOWED_NAMESPACES")?W({},y.ALLOWED_NAMESPACES,Ks):lc,ws=_e(y,"ADD_URI_SAFE_ATTR")?W(Pe(Io),y.ADD_URI_SAFE_ATTR,oe):Io,Lo=_e(y,"ADD_DATA_URI_TAGS")?W(Pe(Eo),y.ADD_DATA_URI_TAGS,oe):Eo,Ie=_e(y,"FORBID_CONTENTS")?W({},y.FORBID_CONTENTS,oe):$s,Se=_e(y,"FORBID_TAGS")?W({},y.FORBID_TAGS,oe):Pe({}),te=_e(y,"FORBID_ATTR")?W({},y.FORBID_ATTR,oe):Pe({}),St=_e(y,"USE_PROFILES")?y.USE_PROFILES:!1,Fe=y.ALLOW_ARIA_ATTR!==!1,Oe=y.ALLOW_DATA_ATTR!==!1,tt=y.ALLOW_UNKNOWN_PROTOCOLS||!1,Co=y.ALLOW_SELF_CLOSE_IN_ATTR!==!1,wt=y.SAFE_FOR_TEMPLATES||!1,vn=y.SAFE_FOR_XML!==!1,nt=y.WHOLE_DOCUMENT||!1,kt=y.RETURN_DOM||!1,mn=y.RETURN_DOM_FRAGMENT||!1,bn=y.RETURN_TRUSTED_TYPE||!1,ys=y.FORCE_BODY||!1,To=y.SANITIZE_DOM!==!1,_o=y.SANITIZE_NAMED_PROPS||!1,xs=y.KEEP_CONTENT!==!1,Ft=y.IN_PLACE||!1,I=y.ALLOWED_URI_REGEXP||Ol,At=y.NAMESPACE||Be,$n=y.MATHML_TEXT_INTEGRATION_POINTS||$n,wn=y.HTML_INTEGRATION_POINTS||wn,Z=y.CUSTOM_ELEMENT_HANDLING||{},y.CUSTOM_ELEMENT_HANDLING&&Mo(y.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(Z.tagNameCheck=y.CUSTOM_ELEMENT_HANDLING.tagNameCheck),y.CUSTOM_ELEMENT_HANDLING&&Mo(y.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(Z.attributeNameCheck=y.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),y.CUSTOM_ELEMENT_HANDLING&&typeof y.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(Z.allowCustomizedBuiltInElements=y.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),wt&&(Oe=!1),mn&&(kt=!0),St&&(R=W({},Na),H=[],St.html===!0&&(W(R,Da),W(H,Fa)),St.svg===!0&&(W(R,Ws),W(H,Vs),W(H,En)),St.svgFilters===!0&&(W(R,Gs),W(H,Vs),W(H,En)),St.mathMl===!0&&(W(R,qs),W(H,Oa),W(H,En))),y.ADD_TAGS&&(typeof y.ADD_TAGS=="function"?he.tagCheck=y.ADD_TAGS:(R===P&&(R=Pe(R)),W(R,y.ADD_TAGS,oe))),y.ADD_ATTR&&(typeof y.ADD_ATTR=="function"?he.attributeCheck=y.ADD_ATTR:(H===$e&&(H=Pe(H)),W(H,y.ADD_ATTR,oe))),y.ADD_URI_SAFE_ATTR&&W(ws,y.ADD_URI_SAFE_ATTR,oe),y.FORBID_CONTENTS&&(Ie===$s&&(Ie=Pe(Ie)),W(Ie,y.FORBID_CONTENTS,oe)),y.ADD_FORBID_CONTENTS&&(Ie===$s&&(Ie=Pe(Ie)),W(Ie,y.ADD_FORBID_CONTENTS,oe)),xs&&(R["#text"]=!0),nt&&W(R,["html","head","body"]),R.table&&(W(R,["tbody"]),delete Se.tbody),y.TRUSTED_TYPES_POLICY){if(typeof y.TRUSTED_TYPES_POLICY.createHTML!="function")throw Kt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof y.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Kt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');A=y.TRUSTED_TYPES_POLICY,T=A.createHTML("")}else A===void 0&&(A=ff(m,i)),A!==null&&typeof T=="string"&&(T=A.createHTML(""));me&&me(y),Ct=y}},Ro=W({},[...Ws,...Gs,...sf]),Po=W({},[...qs,...of]),pc=function(y){let E=C(y);(!E||!E.tagName)&&(E={namespaceURI:At,tagName:"template"});const F=Un(y.tagName),X=Un(E.tagName);return Ss[y.namespaceURI]?y.namespaceURI===xn?E.namespaceURI===Be?F==="svg":E.namespaceURI===yn?F==="svg"&&(X==="annotation-xml"||$n[X]):!!Ro[F]:y.namespaceURI===yn?E.namespaceURI===Be?F==="math":E.namespaceURI===xn?F==="math"&&wn[X]:!!Po[F]:y.namespaceURI===Be?E.namespaceURI===xn&&!wn[X]||E.namespaceURI===yn&&!$n[X]?!1:!Po[F]&&(cc[F]||!Ro[F]):!!(Ot==="application/xhtml+xml"&&Ss[y.namespaceURI]):!1},Me=function(y){zt(t.removed,{element:y});try{C(y).removeChild(y)}catch{b(y)}},st=function(y,E){try{zt(t.removed,{attribute:E.getAttributeNode(y),from:E})}catch{zt(t.removed,{attribute:null,from:E})}if(E.removeAttribute(y),y==="is")if(kt||mn)try{Me(E)}catch{}else try{E.setAttribute(y,"")}catch{}},Do=function(y){let E=null,F=null;if(ys)y="<remove></remove>"+y;else{const ne=js(y,/^[\r\n\t ]+/);F=ne&&ne[0]}Ot==="application/xhtml+xml"&&At===Be&&(y='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+y+"</body></html>");const X=A?A.createHTML(y):y;if(At===Be)try{E=new f().parseFromString(X,Ot)}catch{}if(!E||!E.documentElement){E=_.createDocument(At,"template",null);try{E.documentElement.innerHTML=ks?T:X}catch{}}const ue=E.body||E.documentElement;return y&&F&&ue.insertBefore(n.createTextNode(F),ue.childNodes[0]||null),At===Be?K.call(E,nt?"html":"body")[0]:nt?E.documentElement:ue},No=function(y){return M.call(y.ownerDocument||y,y,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Cs=function(y){return y instanceof p&&(typeof y.nodeName!="string"||typeof y.textContent!="string"||typeof y.removeChild!="function"||!(y.attributes instanceof g)||typeof y.removeAttribute!="function"||typeof y.setAttribute!="function"||typeof y.namespaceURI!="string"||typeof y.insertBefore!="function"||typeof y.hasChildNodes!="function")},Fo=function(y){return typeof l=="function"&&y instanceof l};function Ue(U,y,E){Ln(U,F=>{F.call(t,y,E,Ct)})}const Oo=function(y){let E=null;if(Ue(N.beforeSanitizeElements,y,null),Cs(y))return Me(y),!0;const F=oe(y.nodeName);if(Ue(N.uponSanitizeElement,y,{tagName:F,allowedTags:R}),vn&&y.hasChildNodes()&&!Fo(y.firstElementChild)&&fe(/<[/\w!]/g,y.innerHTML)&&fe(/<[/\w!]/g,y.textContent)||y.nodeType===Wt.progressingInstruction||vn&&y.nodeType===Wt.comment&&fe(/<[/\w]/g,y.data))return Me(y),!0;if(!(he.tagCheck instanceof Function&&he.tagCheck(F))&&(!R[F]||Se[F])){if(!Se[F]&&Uo(F)&&(Z.tagNameCheck instanceof RegExp&&fe(Z.tagNameCheck,F)||Z.tagNameCheck instanceof Function&&Z.tagNameCheck(F)))return!1;if(xs&&!Ie[F]){const X=C(y)||y.parentNode,ue=k(y)||y.childNodes;if(ue&&X){const ne=ue.length;for(let ye=ne-1;ye>=0;--ye){const ze=v(ue[ye],!0);ze.__removalCount=(y.__removalCount||0)+1,X.insertBefore(ze,S(y))}}}return Me(y),!0}return y instanceof c&&!pc(y)||(F==="noscript"||F==="noembed"||F==="noframes")&&fe(/<\/no(script|embed|frames)/i,y.innerHTML)?(Me(y),!0):(wt&&y.nodeType===Wt.text&&(E=y.textContent,Ln([z,de,L],X=>{E=Ht(E,X," ")}),y.textContent!==E&&(zt(t.removed,{element:y.cloneNode()}),y.textContent=E)),Ue(N.afterSanitizeElements,y,null),!1)},Bo=function(y,E,F){if(To&&(E==="id"||E==="name")&&(F in n||F in gc))return!1;if(!(Oe&&!te[E]&&fe(B,E))){if(!(Fe&&fe(ae,E))){if(!(he.attributeCheck instanceof Function&&he.attributeCheck(E,y))){if(!H[E]||te[E]){if(!(Uo(y)&&(Z.tagNameCheck instanceof RegExp&&fe(Z.tagNameCheck,y)||Z.tagNameCheck instanceof Function&&Z.tagNameCheck(y))&&(Z.attributeNameCheck instanceof RegExp&&fe(Z.attributeNameCheck,E)||Z.attributeNameCheck instanceof Function&&Z.attributeNameCheck(E,y))||E==="is"&&Z.allowCustomizedBuiltInElements&&(Z.tagNameCheck instanceof RegExp&&fe(Z.tagNameCheck,F)||Z.tagNameCheck instanceof Function&&Z.tagNameCheck(F))))return!1}else if(!ws[E]){if(!fe(I,Ht(F,ee,""))){if(!((E==="src"||E==="xlink:href"||E==="href")&&y!=="script"&&Xh(F,"data:")===0&&Lo[y])){if(!(tt&&!fe(re,Ht(F,ee,"")))){if(F)return!1}}}}}}}return!0},Uo=function(y){return y!=="annotation-xml"&&js(y,ie)},zo=function(y){Ue(N.beforeSanitizeAttributes,y,null);const{attributes:E}=y;if(!E||Cs(y))return;const F={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:H,forceKeepAttr:void 0};let X=E.length;for(;X--;){const ue=E[X],{name:ne,namespaceURI:ye,value:ze}=ue,Tt=oe(ne),Ts=ze;let ce=ne==="value"?Ts:ef(Ts);if(F.attrName=Tt,F.attrValue=ce,F.keepAttr=!0,F.forceKeepAttr=void 0,Ue(N.uponSanitizeAttribute,y,F),ce=F.attrValue,_o&&(Tt==="id"||Tt==="name")&&(st(ne,y),ce=rc+ce),vn&&fe(/((--!?|])>)|<\/(style|title|textarea)/i,ce)){st(ne,y);continue}if(Tt==="attributename"&&js(ce,"href")){st(ne,y);continue}if(F.forceKeepAttr)continue;if(!F.keepAttr){st(ne,y);continue}if(!Co&&fe(/\/>/i,ce)){st(ne,y);continue}wt&&Ln([z,de,L],Ko=>{ce=Ht(ce,Ko," ")});const Ho=oe(y.nodeName);if(!Bo(Ho,Tt,ce)){st(ne,y);continue}if(A&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!ye)switch(m.getAttributeType(Ho,Tt)){case"TrustedHTML":{ce=A.createHTML(ce);break}case"TrustedScriptURL":{ce=A.createScriptURL(ce);break}}if(ce!==Ts)try{ye?y.setAttributeNS(ye,ne,ce):y.setAttribute(ne,ce),Cs(y)?Me(y):Pa(t.removed)}catch{st(ne,y)}}Ue(N.afterSanitizeAttributes,y,null)},hc=function U(y){let E=null;const F=No(y);for(Ue(N.beforeSanitizeShadowDOM,y,null);E=F.nextNode();)Ue(N.uponSanitizeShadowNode,E,null),Oo(E),zo(E),E.content instanceof o&&U(E.content);Ue(N.afterSanitizeShadowDOM,y,null)};return t.sanitize=function(U){let y=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},E=null,F=null,X=null,ue=null;if(ks=!U,ks&&(U="<!-->"),typeof U!="string"&&!Fo(U))if(typeof U.toString=="function"){if(U=U.toString(),typeof U!="string")throw Kt("dirty is not a string, aborting")}else throw Kt("toString is not a function");if(!t.isSupported)return U;if(bs||As(y),t.removed=[],typeof U=="string"&&(Ft=!1),Ft){if(U.nodeName){const ze=oe(U.nodeName);if(!R[ze]||Se[ze])throw Kt("root node is forbidden and cannot be sanitized in-place")}}else if(U instanceof l)E=Do("<!---->"),F=E.ownerDocument.importNode(U,!0),F.nodeType===Wt.element&&F.nodeName==="BODY"||F.nodeName==="HTML"?E=F:E.appendChild(F);else{if(!kt&&!wt&&!nt&&U.indexOf("<")===-1)return A&&bn?A.createHTML(U):U;if(E=Do(U),!E)return kt?null:bn?T:""}E&&ys&&Me(E.firstChild);const ne=No(Ft?U:E);for(;X=ne.nextNode();)Oo(X),zo(X),X.content instanceof o&&hc(X.content);if(Ft)return U;if(kt){if(mn)for(ue=G.call(E.ownerDocument);E.firstChild;)ue.appendChild(E.firstChild);else ue=E;return(H.shadowroot||H.shadowrootmode)&&(ue=se.call(s,ue,!0)),ue}let ye=nt?E.outerHTML:E.innerHTML;return nt&&R["!doctype"]&&E.ownerDocument&&E.ownerDocument.doctype&&E.ownerDocument.doctype.name&&fe(Bl,E.ownerDocument.doctype.name)&&(ye="<!DOCTYPE "+E.ownerDocument.doctype.name+`>
`+ye),wt&&Ln([z,de,L],ze=>{ye=Ht(ye,ze," ")}),A&&bn?A.createHTML(ye):ye},t.setConfig=function(){let U=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};As(U),bs=!0},t.clearConfig=function(){Ct=null,bs=!1},t.isValidAttribute=function(U,y,E){Ct||As({});const F=oe(U),X=oe(y);return Bo(F,X,E)},t.addHook=function(U,y){typeof y=="function"&&zt(N[U],y)},t.removeHook=function(U,y){if(y!==void 0){const E=Zh(N[U],y);return E===-1?void 0:Jh(N[U],E,1)[0]}return Pa(N[U])},t.removeHooks=function(U){N[U]=[]},t.removeAllHooks=function(){N=Ua()},t}var Ci=Ul();function go(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var $t=go();function zl(e){$t=e}var tn={exec:()=>null};function q(e,t=""){let n=typeof e=="string"?e:e.source,s={replace:(i,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(ve.caret,"$1"),n=n.replace(i,a),s},getRegex:()=>new RegExp(n,t)};return s}var vf=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ve={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},mf=/^(?:[ \t]*(?:\n|$))+/,bf=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,yf=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,fn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,xf=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,po=/(?:[*+-]|\d{1,9}[.)])/,Hl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Kl=q(Hl).replace(/bull/g,po).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),$f=q(Hl).replace(/bull/g,po).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ho=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,wf=/^[^\n]+/,fo=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,kf=q(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",fo).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Sf=q(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,po).getRegex(),fs="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",vo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Af=q("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",vo).replace("tag",fs).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),jl=q(ho).replace("hr",fn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",fs).getRegex(),Cf=q(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",jl).getRegex(),mo={blockquote:Cf,code:bf,def:kf,fences:yf,heading:xf,hr:fn,html:Af,lheading:Kl,list:Sf,newline:mf,paragraph:jl,table:tn,text:wf},za=q("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",fn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",fs).getRegex(),Tf={...mo,lheading:$f,table:za,paragraph:q(ho).replace("hr",fn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",za).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",fs).getRegex()},_f={...mo,html:q(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",vo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:tn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:q(ho).replace("hr",fn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Kl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Lf=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ef=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Wl=/^( {2,}|\\)\n(?!\s*$)/,If=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,vs=/[\p{P}\p{S}]/u,bo=/[\s\p{P}\p{S}]/u,Gl=/[^\s\p{P}\p{S}]/u,Mf=q(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,bo).getRegex(),ql=/(?!~)[\p{P}\p{S}]/u,Rf=/(?!~)[\s\p{P}\p{S}]/u,Pf=/(?:[^\s\p{P}\p{S}]|~)/u,Df=q(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",vf?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Vl=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Nf=q(Vl,"u").replace(/punct/g,vs).getRegex(),Ff=q(Vl,"u").replace(/punct/g,ql).getRegex(),Ql="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Of=q(Ql,"gu").replace(/notPunctSpace/g,Gl).replace(/punctSpace/g,bo).replace(/punct/g,vs).getRegex(),Bf=q(Ql,"gu").replace(/notPunctSpace/g,Pf).replace(/punctSpace/g,Rf).replace(/punct/g,ql).getRegex(),Uf=q("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Gl).replace(/punctSpace/g,bo).replace(/punct/g,vs).getRegex(),zf=q(/\\(punct)/,"gu").replace(/punct/g,vs).getRegex(),Hf=q(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Kf=q(vo).replace("(?:-->|$)","-->").getRegex(),jf=q("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Kf).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Qn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Wf=q(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Qn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Yl=q(/^!?\[(label)\]\[(ref)\]/).replace("label",Qn).replace("ref",fo).getRegex(),Zl=q(/^!?\[(ref)\](?:\[\])?/).replace("ref",fo).getRegex(),Gf=q("reflink|nolink(?!\\()","g").replace("reflink",Yl).replace("nolink",Zl).getRegex(),Ha=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,yo={_backpedal:tn,anyPunctuation:zf,autolink:Hf,blockSkip:Df,br:Wl,code:Ef,del:tn,emStrongLDelim:Nf,emStrongRDelimAst:Of,emStrongRDelimUnd:Uf,escape:Lf,link:Wf,nolink:Zl,punctuation:Mf,reflink:Yl,reflinkSearch:Gf,tag:jf,text:If,url:tn},qf={...yo,link:q(/^!?\[(label)\]\((.*?)\)/).replace("label",Qn).getRegex(),reflink:q(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Qn).getRegex()},Ti={...yo,emStrongRDelimAst:Bf,emStrongLDelim:Ff,url:q(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ha).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:q(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ha).getRegex()},Vf={...Ti,br:q(Wl).replace("{2,}","*").getRegex(),text:q(Ti.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},In={normal:mo,gfm:Tf,pedantic:_f},Gt={normal:yo,gfm:Ti,breaks:Vf,pedantic:qf},Qf={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ka=e=>Qf[e];function je(e,t){if(t){if(ve.escapeTest.test(e))return e.replace(ve.escapeReplace,Ka)}else if(ve.escapeTestNoEncode.test(e))return e.replace(ve.escapeReplaceNoEncode,Ka);return e}function ja(e){try{e=encodeURI(e).replace(ve.percentDecode,"%")}catch{return null}return e}function Wa(e,t){let n=e.replace(ve.findPipe,(o,a,l)=>{let c=!1,u=a;for(;--u>=0&&l[u]==="\\";)c=!c;return c?"|":" |"}),s=n.split(ve.splitPipe),i=0;if(s[0].trim()||s.shift(),s.length>0&&!s.at(-1)?.trim()&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(ve.slashPipe,"|");return s}function qt(e,t,n){let s=e.length;if(s===0)return"";let i=0;for(;i<s&&e.charAt(s-i-1)===t;)i++;return e.slice(0,s-i)}function Yf(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function Ga(e,t,n,s,i){let o=t.href,a=t.title||null,l=e[1].replace(i.other.outputLinkReplace,"$1");s.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:l,tokens:s.inlineTokens(l)};return s.state.inLink=!1,c}function Zf(e,t,n){let s=e.match(n.other.indentCodeCompensation);if(s===null)return t;let i=s[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[l]=a;return l.length>=i.length?o.slice(i.length):o}).join(`
`)}var Yn=class{options;rules;lexer;constructor(e){this.options=e||$t}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:qt(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],s=Zf(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let s=qt(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:qt(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=qt(t[0],`
`).split(`
`),s="",i="",o=[];for(;n.length>0;){let a=!1,l=[],c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))l.push(n[c]),a=!0;else if(!a)l.push(n[c]);else break;n=n.slice(c);let u=l.join(`
`),g=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${u}`:u,i=i?`${i}
${g}`:g;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(g,o,!0),this.lexer.state.top=p,n.length===0)break;let f=o.at(-1);if(f?.type==="code")break;if(f?.type==="blockquote"){let m=f,d=m.raw+`
`+n.join(`
`),v=this.blockquote(d);o[o.length-1]=v,s=s.substring(0,s.length-m.raw.length)+v.raw,i=i.substring(0,i.length-m.text.length)+v.text;break}else if(f?.type==="list"){let m=f,d=m.raw+`
`+n.join(`
`),v=this.list(d);o[o.length-1]=v,s=s.substring(0,s.length-f.raw.length)+v.raw,i=i.substring(0,i.length-m.raw.length)+v.raw,n=d.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:o,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let c=!1,u="",g="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,v=>" ".repeat(3*v.length)),f=e.split(`
`,1)[0],m=!p.trim(),d=0;if(this.options.pedantic?(d=2,g=p.trimStart()):m?d=t[1].length+1:(d=t[2].search(this.rules.other.nonSpaceChar),d=d>4?1:d,g=p.slice(d),d+=t[1].length),m&&this.rules.other.blankLine.test(f)&&(u+=f+`
`,e=e.substring(f.length+1),c=!0),!c){let v=this.rules.other.nextBulletRegex(d),b=this.rules.other.hrRegex(d),S=this.rules.other.fencesBeginRegex(d),k=this.rules.other.headingBeginRegex(d),C=this.rules.other.htmlBeginRegex(d);for(;e;){let A=e.split(`
`,1)[0],T;if(f=A,this.options.pedantic?(f=f.replace(this.rules.other.listReplaceNesting,"  "),T=f):T=f.replace(this.rules.other.tabCharGlobal,"    "),S.test(f)||k.test(f)||C.test(f)||v.test(f)||b.test(f))break;if(T.search(this.rules.other.nonSpaceChar)>=d||!f.trim())g+=`
`+T.slice(d);else{if(m||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||S.test(p)||k.test(p)||b.test(p))break;g+=`
`+f}!m&&!f.trim()&&(m=!0),u+=A+`
`,e=e.substring(A.length+1),p=T.slice(d)}}i.loose||(a?i.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),i.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(g),loose:!1,text:g,tokens:[]}),i.raw+=u}let l=i.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let c of i.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let g=this.lexer.inlineQueue.length-1;g>=0;g--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[g].src)){this.lexer.inlineQueue[g].src=this.lexer.inlineQueue[g].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let g={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=g.checked,i.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=g.raw+c.tokens[0].raw,c.tokens[0].text=g.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(g)):c.tokens.unshift({type:"paragraph",raw:g.raw,text:g.raw,tokens:[g]}):c.tokens.unshift(g)}}if(!i.loose){let u=c.tokens.filter(p=>p.type==="space"),g=u.length>0&&u.some(p=>this.rules.other.anyLine.test(p.raw));i.loose=g}}if(i.loose)for(let c of i.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return i}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Wa(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(let a of s)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of i)o.rows.push(Wa(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=qt(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=Yf(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(s);o&&(s=o[1],i=o[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),Ga(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Ga(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!(!s||s[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(s[1]||s[2])||!n||this.rules.inline.punctuation.exec(n))){let i=[...s[0]].length-1,o,a,l=i,c=0,u=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+i);(s=u.exec(t))!=null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(a=[...o].length,s[3]||s[4]){l+=a;continue}else if((s[5]||s[6])&&i%3&&!((i+a)%3)){c+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+c);let g=[...s[0]][0].length,p=e.slice(0,i+s.index+g+a);if(Math.min(i,a)%2){let m=p.slice(1,-1);return{type:"em",raw:p,text:m,tokens:this.lexer.inlineTokens(m)}}let f=p.slice(2,-2);return{type:"strong",raw:p,text:f,tokens:this.lexer.inlineTokens(f)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,s;if(t[2]==="@")n=t[0],s="mailto:"+n;else{let i;do i=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(i!==t[0]);n=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Le=class _i{tokens;options;state;inlineQueue;tokenizer;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||$t,this.options.tokenizer=this.options.tokenizer||new Yn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:ve,block:In.normal,inline:Gt.normal};this.options.pedantic?(n.block=In.pedantic,n.inline=Gt.pedantic):this.options.gfm&&(n.block=In.gfm,this.options.breaks?n.inline=Gt.breaks:n.inline=Gt.gfm),this.tokenizer.rules=n}static get rules(){return{block:In,inline:Gt}}static lex(t,n){return new _i(n).lex(t)}static lexInline(t,n){return new _i(n).inlineTokens(t)}lex(t){t=t.replace(ve.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){for(this.options.pedantic&&(t=t.replace(ve.tabCharGlobal,"    ").replace(ve.spaceLine,""));t;){let i;if(this.options.extensions?.block?.some(a=>(i=a.call({lexer:this},t,n))?(t=t.substring(i.raw.length),n.push(i),!0):!1))continue;if(i=this.tokenizer.space(t)){t=t.substring(i.raw.length);let a=n.at(-1);i.raw.length===1&&a!==void 0?a.raw+=`
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
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(i);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let s=t,i=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)c.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)o=i[2]?i[2].length:0,s=s.slice(0,i.index+o)+"["+"a".repeat(i[0].length-o-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);s=this.options.hooks?.emStrongMask?.call({lexer:this},s)??s;let a=!1,l="";for(;t;){a||(l=""),a=!1;let c;if(this.options.extensions?.inline?.some(g=>(c=g.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let g=n.at(-1);c.type==="text"&&g?.type==="text"?(g.raw+=c.raw,g.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,s,l)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let u=t;if(this.options.extensions?.startInline){let g=1/0,p=t.slice(1),f;this.options.extensions.startInline.forEach(m=>{f=m.call({lexer:this},p),typeof f=="number"&&f>=0&&(g=Math.min(g,f))}),g<1/0&&g>=0&&(u=t.substring(0,g+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(l=c.raw.slice(-1)),a=!0;let g=n.at(-1);g?.type==="text"?(g.raw+=c.raw,g.text+=c.text):n.push(c);continue}if(t){let g="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(g);break}else throw new Error(g)}}return n}},Zn=class{options;parser;constructor(e){this.options=e||$t}space(e){return""}code({text:e,lang:t,escaped:n}){let s=(t||"").match(ve.notSpaceStart)?.[0],i=e.replace(ve.endingNewline,"")+`
`;return s?'<pre><code class="language-'+je(s)+'">'+(n?i:je(i,!0))+`</code></pre>
`:"<pre><code>"+(n?i:je(i,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${je(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let s=this.parser.parseInline(n),i=ja(e);if(i===null)return s;e=i;let o='<a href="'+e+'"';return t&&(o+=' title="'+je(t)+'"'),o+=">"+s+"</a>",o}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));let i=ja(e);if(i===null)return je(n);e=i;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${je(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:je(e.text)}},xo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Ee=class Li{options;renderer;textRenderer;constructor(t){this.options=t||$t,this.options.renderer=this.options.renderer||new Zn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new xo}static parse(t,n){return new Li(n).parse(t)}static parseInline(t,n){return new Li(n).parseInline(t)}parse(t){let n="";for(let s=0;s<t.length;s++){let i=t[s];if(this.options.extensions?.renderers?.[i.type]){let a=i,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=l||"";continue}}let o=i;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let s="";for(let i=0;i<t.length;i++){let o=t[i];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){s+=l||"";continue}}let a=o;switch(a.type){case"escape":{s+=n.text(a);break}case"html":{s+=n.html(a);break}case"link":{s+=n.link(a);break}case"image":{s+=n.image(a);break}case"checkbox":{s+=n.checkbox(a);break}case"strong":{s+=n.strong(a);break}case"em":{s+=n.em(a);break}case"codespan":{s+=n.codespan(a);break}case"br":{s+=n.br(a);break}case"del":{s+=n.del(a);break}case"text":{s+=n.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}},Qt=class{options;block;constructor(e){this.options=e||$t}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Le.lex:Le.lexInline}provideParser(){return this.block?Ee.parse:Ee.parseInline}},Jf=class{defaults=go();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=Ee;Renderer=Zn;TextRenderer=xo;Lexer=Le;Tokenizer=Yn;Hooks=Qt;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let s of e)switch(n=n.concat(t.call(this,s)),s.type){case"table":{let i=s;for(let o of i.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of i.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let i=s;n=n.concat(this.walkTokens(i.items,t));break}default:{let i=s;this.defaults.extensions?.childTokens?.[i.type]?this.defaults.extensions.childTokens[i.type].forEach(o=>{let a=i[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):i.tokens&&(n=n.concat(this.walkTokens(i.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){let o=t.renderers[i.name];o?t.renderers[i.name]=function(...a){let l=i.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[i.level];o?o.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){let i=this.defaults.renderer||new Zn(this.defaults);for(let o in n.renderer){if(!(o in i))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,l=n.renderer[a],c=i[a];i[a]=(...u)=>{let g=l.apply(i,u);return g===!1&&(g=c.apply(i,u)),g||""}}s.renderer=i}if(n.tokenizer){let i=this.defaults.tokenizer||new Yn(this.defaults);for(let o in n.tokenizer){if(!(o in i))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,l=n.tokenizer[a],c=i[a];i[a]=(...u)=>{let g=l.apply(i,u);return g===!1&&(g=c.apply(i,u)),g}}s.tokenizer=i}if(n.hooks){let i=this.defaults.hooks||new Qt;for(let o in n.hooks){if(!(o in i))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,l=n.hooks[a],c=i[a];Qt.passThroughHooks.has(o)?i[a]=u=>{if(this.defaults.async&&Qt.passThroughHooksRespectAsync.has(o))return(async()=>{let p=await l.call(i,u);return c.call(i,p)})();let g=l.call(i,u);return c.call(i,g)}:i[a]=(...u)=>{if(this.defaults.async)return(async()=>{let p=await l.apply(i,u);return p===!1&&(p=await c.apply(i,u)),p})();let g=l.apply(i,u);return g===!1&&(g=c.apply(i,u)),g}}s.hooks=i}if(n.walkTokens){let i=this.defaults.walkTokens,o=n.walkTokens;s.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),i&&(l=l.concat(i.call(this,a))),l}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Le.lex(e,t??this.defaults)}parser(e,t){return Ee.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let s={...n},i={...this.defaults,...s},o=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&s.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(i.hooks&&(i.hooks.options=i,i.hooks.block=e),i.async)return(async()=>{let a=i.hooks?await i.hooks.preprocess(t):t,l=await(i.hooks?await i.hooks.provideLexer():e?Le.lex:Le.lexInline)(a,i),c=i.hooks?await i.hooks.processAllTokens(l):l;i.walkTokens&&await Promise.all(this.walkTokens(c,i.walkTokens));let u=await(i.hooks?await i.hooks.provideParser():e?Ee.parse:Ee.parseInline)(c,i);return i.hooks?await i.hooks.postprocess(u):u})().catch(o);try{i.hooks&&(t=i.hooks.preprocess(t));let a=(i.hooks?i.hooks.provideLexer():e?Le.lex:Le.lexInline)(t,i);i.hooks&&(a=i.hooks.processAllTokens(a)),i.walkTokens&&this.walkTokens(a,i.walkTokens);let l=(i.hooks?i.hooks.provideParser():e?Ee.parse:Ee.parseInline)(a,i);return i.hooks&&(l=i.hooks.postprocess(l)),l}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let s="<p>An error occurred:</p><pre>"+je(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},yt=new Jf;function Q(e,t){return yt.parse(e,t)}Q.options=Q.setOptions=function(e){return yt.setOptions(e),Q.defaults=yt.defaults,zl(Q.defaults),Q};Q.getDefaults=go;Q.defaults=$t;Q.use=function(...e){return yt.use(...e),Q.defaults=yt.defaults,zl(Q.defaults),Q};Q.walkTokens=function(e,t){return yt.walkTokens(e,t)};Q.parseInline=yt.parseInline;Q.Parser=Ee;Q.parser=Ee.parse;Q.Renderer=Zn;Q.TextRenderer=xo;Q.Lexer=Le;Q.lexer=Le.lex;Q.Tokenizer=Yn;Q.Hooks=Qt;Q.parse=Q;Q.options;Q.setOptions;Q.use;Q.walkTokens;Q.parseInline;Ee.parse;Le.lex;Q.setOptions({gfm:!0,breaks:!0});const qa=["a","b","blockquote","br","code","del","em","h1","h2","h3","h4","hr","i","li","ol","p","pre","strong","table","tbody","td","th","thead","tr","ul"],Va=["class","href","rel","target","title","start"];let Qa=!1;const Xf=14e4,ev=4e4,tv=200,Qs=5e4,pt=new Map;function nv(e){const t=pt.get(e);return t===void 0?null:(pt.delete(e),pt.set(e,t),t)}function Ya(e,t){if(pt.set(e,t),pt.size<=tv)return;const n=pt.keys().next().value;n&&pt.delete(n)}function sv(){Qa||(Qa=!0,Ci.addHook("afterSanitizeAttributes",e=>{!(e instanceof HTMLAnchorElement)||!e.getAttribute("href")||(e.setAttribute("rel","noreferrer noopener"),e.setAttribute("target","_blank"))}))}function Ei(e){const t=e.trim();if(!t)return"";if(sv(),t.length<=Qs){const a=nv(t);if(a!==null)return a}const n=Nr(t,Xf),s=n.truncated?`

… truncated (${n.total} chars, showing first ${n.text.length}).`:"";if(n.text.length>ev){const l=`<pre class="code-block">${iv(`${n.text}${s}`)}</pre>`,c=Ci.sanitize(l,{ALLOWED_TAGS:qa,ALLOWED_ATTR:Va});return t.length<=Qs&&Ya(t,c),c}const i=Q.parse(`${n.text}${s}`),o=Ci.sanitize(i,{ALLOWED_TAGS:qa,ALLOWED_ATTR:Va});return t.length<=Qs&&Ya(t,o),o}function iv(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const ov=1500,av=2e3,Jl="Copy as markdown",rv="Copied",lv="Copy failed";async function cv(e){if(!e)return!1;try{return await navigator.clipboard.writeText(e),!0}catch{return!1}}function Mn(e,t){e.title=t,e.setAttribute("aria-label",t)}function dv(e){const t=e.label??Jl;return r`
    <button
      class="chat-copy-btn"
      type="button"
      title=${t}
      aria-label=${t}
      @click=${async n=>{const s=n.currentTarget;if(!s||s.dataset.copying==="1")return;s.dataset.copying="1",s.setAttribute("aria-busy","true"),s.disabled=!0;const i=await cv(e.text());if(s.isConnected){if(delete s.dataset.copying,s.removeAttribute("aria-busy"),s.disabled=!1,!i){s.dataset.error="1",Mn(s,lv),window.setTimeout(()=>{s.isConnected&&(delete s.dataset.error,Mn(s,t))},av);return}s.dataset.copied="1",Mn(s,rv),window.setTimeout(()=>{s.isConnected&&(delete s.dataset.copied,Mn(s,t))},ov)}}}
    >
      <span class="chat-copy-btn__icon" aria-hidden="true">
        <span class="chat-copy-btn__icon-copy">${J.copy}</span>
        <span class="chat-copy-btn__icon-check">${J.check}</span>
      </span>
    </button>
  `}function uv(e){return dv({text:()=>e,label:Jl})}function Xl(e){const t=e;let n=typeof t.role=="string"?t.role:"unknown";const s=typeof t.toolCallId=="string"||typeof t.tool_call_id=="string",i=t.content,o=Array.isArray(i)?i:null,a=Array.isArray(o)&&o.some(p=>{const f=p,m=(typeof f.type=="string"?f.type:"").toLowerCase();return m==="toolresult"||m==="tool_result"}),l=typeof t.toolName=="string"||typeof t.tool_name=="string";(s||a||l)&&(n="toolResult");let c=[];typeof t.content=="string"?c=[{type:"text",text:t.content}]:Array.isArray(t.content)?c=t.content.map(p=>({type:p.type||"text",text:p.text,name:p.name,args:p.args||p.arguments})):typeof t.text=="string"&&(c=[{type:"text",text:t.text}]);const u=typeof t.timestamp=="number"?t.timestamp:Date.now(),g=typeof t.id=="string"?t.id:void 0;return{role:n,content:c,timestamp:u,id:g}}function $o(e){const t=e.toLowerCase();return e==="user"||e==="User"?e:e==="assistant"?"assistant":e==="system"?"system":t==="toolresult"||t==="tool_result"||t==="tool"||t==="function"?"tool":e}function ec(e){const t=e,n=typeof t.role=="string"?t.role.toLowerCase():"";return n==="toolresult"||n==="tool_result"}const gv={icon:"puzzle",detailKeys:["command","path","url","targetUrl","targetId","ref","element","node","nodeId","id","requestId","to","channelId","guildId","userId","name","query","pattern","messageId"]},pv={bash:{icon:"wrench",title:"Bash",detailKeys:["command"]},process:{icon:"wrench",title:"Process",detailKeys:["sessionId"]},read:{icon:"fileText",title:"Read",detailKeys:["path"]},write:{icon:"edit",title:"Write",detailKeys:["path"]},edit:{icon:"penLine",title:"Edit",detailKeys:["path"]},attach:{icon:"paperclip",title:"Attach",detailKeys:["path","url","fileName"]},browser:{icon:"globe",title:"Browser",actions:{status:{label:"status"},start:{label:"start"},stop:{label:"stop"},tabs:{label:"tabs"},open:{label:"open",detailKeys:["targetUrl"]},focus:{label:"focus",detailKeys:["targetId"]},close:{label:"close",detailKeys:["targetId"]},snapshot:{label:"snapshot",detailKeys:["targetUrl","targetId","ref","element","format"]},screenshot:{label:"screenshot",detailKeys:["targetUrl","targetId","ref","element"]},navigate:{label:"navigate",detailKeys:["targetUrl","targetId"]},console:{label:"console",detailKeys:["level","targetId"]},pdf:{label:"pdf",detailKeys:["targetId"]},upload:{label:"upload",detailKeys:["paths","ref","inputRef","element","targetId"]},dialog:{label:"dialog",detailKeys:["accept","promptText","targetId"]},act:{label:"act",detailKeys:["request.kind","request.ref","request.selector","request.text","request.value"]}}},canvas:{icon:"image",title:"Canvas",actions:{present:{label:"present",detailKeys:["target","node","nodeId"]},hide:{label:"hide",detailKeys:["node","nodeId"]},navigate:{label:"navigate",detailKeys:["url","node","nodeId"]},eval:{label:"eval",detailKeys:["javaScript","node","nodeId"]},snapshot:{label:"snapshot",detailKeys:["format","node","nodeId"]},a2ui_push:{label:"A2UI push",detailKeys:["jsonlPath","node","nodeId"]},a2ui_reset:{label:"A2UI reset",detailKeys:["node","nodeId"]}}},nodes:{icon:"smartphone",title:"Nodes",actions:{status:{label:"status"},describe:{label:"describe",detailKeys:["node","nodeId"]},pending:{label:"pending"},approve:{label:"approve",detailKeys:["requestId"]},reject:{label:"reject",detailKeys:["requestId"]},notify:{label:"notify",detailKeys:["node","nodeId","title","body"]},camera_snap:{label:"camera snap",detailKeys:["node","nodeId","facing","deviceId"]},camera_list:{label:"camera list",detailKeys:["node","nodeId"]},camera_clip:{label:"camera clip",detailKeys:["node","nodeId","facing","duration","durationMs"]},screen_record:{label:"screen record",detailKeys:["node","nodeId","duration","durationMs","fps","screenIndex"]}}},cron:{icon:"loader",title:"Cron",actions:{status:{label:"status"},list:{label:"list"},add:{label:"add",detailKeys:["job.name","job.id","job.schedule","job.cron"]},update:{label:"update",detailKeys:["id"]},remove:{label:"remove",detailKeys:["id"]},run:{label:"run",detailKeys:["id"]},runs:{label:"runs",detailKeys:["id"]},wake:{label:"wake",detailKeys:["text","mode"]}}},gateway:{icon:"plug",title:"Gateway",actions:{restart:{label:"restart",detailKeys:["reason","delayMs"]},"config.get":{label:"config get"},"config.schema":{label:"config schema"},"config.apply":{label:"config apply",detailKeys:["restartDelayMs"]},"update.run":{label:"update run",detailKeys:["restartDelayMs"]}}},whatsapp_login:{icon:"circle",title:"WhatsApp Login",actions:{start:{label:"start"},wait:{label:"wait"}}},discord:{icon:"messageSquare",title:"Discord",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sticker:{label:"sticker",detailKeys:["to","stickerIds"]},poll:{label:"poll",detailKeys:["question","to"]},permissions:{label:"permissions",detailKeys:["channelId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},threadCreate:{label:"thread create",detailKeys:["channelId","name"]},threadList:{label:"thread list",detailKeys:["guildId","channelId"]},threadReply:{label:"thread reply",detailKeys:["channelId","content"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},searchMessages:{label:"search",detailKeys:["guildId","content"]},memberInfo:{label:"member",detailKeys:["guildId","userId"]},roleInfo:{label:"roles",detailKeys:["guildId"]},emojiList:{label:"emoji list",detailKeys:["guildId"]},roleAdd:{label:"role add",detailKeys:["guildId","userId","roleId"]},roleRemove:{label:"role remove",detailKeys:["guildId","userId","roleId"]},channelInfo:{label:"channel",detailKeys:["channelId"]},channelList:{label:"channels",detailKeys:["guildId"]},voiceStatus:{label:"voice",detailKeys:["guildId","userId"]},eventList:{label:"events",detailKeys:["guildId"]},eventCreate:{label:"event create",detailKeys:["guildId","name"]},timeout:{label:"timeout",detailKeys:["guildId","userId"]},kick:{label:"kick",detailKeys:["guildId","userId"]},ban:{label:"ban",detailKeys:["guildId","userId"]}}},slack:{icon:"messageSquare",title:"Slack",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},memberInfo:{label:"member",detailKeys:["userId"]},emojiList:{label:"emoji list"}}}},hv={fallback:gv,tools:pv},tc=hv,Za=tc.fallback??{icon:"puzzle"},fv=tc.tools??{};function vv(e){return(e??"tool").trim()}function mv(e){const t=e.replace(/_/g," ").trim();return t?t.split(/\s+/).map(n=>n.length<=2&&n.toUpperCase()===n?n:`${n.at(0)?.toUpperCase()??""}${n.slice(1)}`).join(" "):"Tool"}function bv(e){const t=e?.trim();if(t)return t.replace(/_/g," ")}function nc(e){if(e!=null){if(typeof e=="string"){const t=e.trim();if(!t)return;const n=t.split(/\r?\n/)[0]?.trim()??"";return n?n.length>160?`${n.slice(0,157)}…`:n:void 0}if(typeof e=="number"||typeof e=="boolean")return String(e);if(Array.isArray(e)){const t=e.map(s=>nc(s)).filter(s=>!!s);if(t.length===0)return;const n=t.slice(0,3).join(", ");return t.length>3?`${n}…`:n}}}function yv(e,t){if(!e||typeof e!="object")return;let n=e;for(const s of t.split(".")){if(!s||!n||typeof n!="object")return;n=n[s]}return n}function xv(e,t){for(const n of t){const s=yv(e,n),i=nc(s);if(i)return i}}function $v(e){if(!e||typeof e!="object")return;const t=e,n=typeof t.path=="string"?t.path:void 0;if(!n)return;const s=typeof t.offset=="number"?t.offset:void 0,i=typeof t.limit=="number"?t.limit:void 0;return s!==void 0&&i!==void 0?`${n}:${s}-${s+i}`:n}function wv(e){if(!e||typeof e!="object")return;const t=e;return typeof t.path=="string"?t.path:void 0}function kv(e,t){if(!(!e||!t))return e.actions?.[t]??void 0}function Sv(e){const t=vv(e.name),n=t.toLowerCase(),s=fv[n],i=s?.icon??Za.icon??"puzzle",o=s?.title??mv(t),a=s?.label??t,l=e.args&&typeof e.args=="object"?e.args.action:void 0,c=typeof l=="string"?l.trim():void 0,u=kv(s,c),g=bv(u?.label??c);let p;n==="read"&&(p=$v(e.args)),!p&&(n==="write"||n==="edit"||n==="attach")&&(p=wv(e.args));const f=u?.detailKeys??s?.detailKeys??Za.detailKeys??[];return!p&&f.length>0&&(p=xv(e.args,f)),!p&&e.meta&&(p=e.meta),p&&(p=Cv(p)),{name:t,icon:i,title:o,label:a,verb:g,detail:p}}function Av(e){const t=[];if(e.verb&&t.push(e.verb),e.detail&&t.push(e.detail),t.length!==0)return t.join(" · ")}function Cv(e){return e&&e.replace(/\/Users\/[^/]+/g,"~").replace(/\/home\/[^/]+/g,"~")}const Tv=80,_v=2,Ja=100;function Lv(e){const t=e.trim();if(t.startsWith("{")||t.startsWith("["))try{const n=JSON.parse(t);return"```json\n"+JSON.stringify(n,null,2)+"\n```"}catch{}return e}function Ev(e){const t=e.split(`
`),n=t.slice(0,_v),s=n.join(`
`);return s.length>Ja?s.slice(0,Ja)+"…":n.length<t.length?s+"…":s}function Iv(e){const t=e,n=Mv(t.content),s=[];for(const i of n){const o=(typeof i.type=="string"?i.type:"").toLowerCase();(["toolcall","tool_call","tooluse","tool_use"].includes(o)||typeof i.name=="string"&&i.arguments!=null)&&s.push({kind:"call",name:i.name??"tool",args:Rv(i.arguments??i.args)})}for(const i of n){const o=(typeof i.type=="string"?i.type:"").toLowerCase();if(o!=="toolresult"&&o!=="tool_result")continue;const a=Pv(i),l=typeof i.name=="string"?i.name:"tool";s.push({kind:"result",name:l,text:a})}if(ec(e)&&!s.some(i=>i.kind==="result")){const i=typeof t.toolName=="string"&&t.toolName||typeof t.tool_name=="string"&&t.tool_name||"tool",o=hl(e)??void 0;s.push({kind:"result",name:i,text:o})}return s}function Xa(e,t){const n=Sv({name:e.name,args:e.args}),s=Av(n),i=!!e.text?.trim(),o=!!t,a=o?()=>{if(i){t(Lv(e.text));return}const p=`## ${n.label}

${s?`**Command:** \`${s}\`

`:""}*No output — tool completed successfully.*`;t(p)}:void 0,l=i&&(e.text?.length??0)<=Tv,c=i&&!l,u=i&&l,g=!i;return r`
    <div
      class="chat-tool-card ${o?"chat-tool-card--clickable":""}"
      @click=${a}
      role=${o?"button":h}
      tabindex=${o?"0":h}
      @keydown=${o?p=>{p.key!=="Enter"&&p.key!==" "||(p.preventDefault(),a?.())}:h}
    >
      <div class="chat-tool-card__header">
        <div class="chat-tool-card__title">
          <span class="chat-tool-card__icon">${J[n.icon]}</span>
          <span>${n.label}</span>
        </div>
        ${o?r`<span class="chat-tool-card__action">${i?"View":""} ${J.check}</span>`:h}
        ${g&&!o?r`<span class="chat-tool-card__status">${J.check}</span>`:h}
      </div>
      ${s?r`<div class="chat-tool-card__detail">${s}</div>`:h}
      ${g?r`
              <div class="chat-tool-card__status-text muted">Completed</div>
            `:h}
      ${c?r`<div class="chat-tool-card__preview mono">${Ev(e.text)}</div>`:h}
      ${u?r`<div class="chat-tool-card__inline mono">${e.text}</div>`:h}
    </div>
  `}function Mv(e){return Array.isArray(e)?e.filter(Boolean):[]}function Rv(e){if(typeof e!="string")return e;const t=e.trim();if(!t||!t.startsWith("{")&&!t.startsWith("["))return e;try{return JSON.parse(t)}catch{return e}}function Pv(e){if(typeof e.text=="string")return e.text;if(typeof e.content=="string")return e.content}function Dv(e){const n=e.content,s=[];if(Array.isArray(n))for(const i of n){if(typeof i!="object"||i===null)continue;const o=i;if(o.type==="image"){const a=o.source;if(a?.type==="base64"&&typeof a.data=="string"){const l=a.data,c=a.media_type||"image/png",u=l.startsWith("data:")?l:`data:${c};base64,${l}`;s.push({url:u})}else typeof o.url=="string"&&s.push({url:o.url})}else if(o.type==="image_url"){const a=o.image_url;typeof a?.url=="string"&&s.push({url:a.url})}}return s}function Nv(e){return r`
    <div class="chat-group assistant">
      ${wo("assistant",e)}
      <div class="chat-group-messages">
        <div class="chat-bubble chat-reading-indicator" aria-hidden="true">
          <span class="chat-reading-indicator__dots">
            <span></span><span></span><span></span>
          </span>
        </div>
      </div>
    </div>
  `}function Fv(e,t,n,s){const i=new Date(t).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}),o=s?.name??"Assistant";return r`
    <div class="chat-group assistant">
      ${wo("assistant",s)}
      <div class="chat-group-messages">
        ${sc({role:"assistant",content:[{type:"text",text:e}],timestamp:t},{isStreaming:!0,showReasoning:!1},n)}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${o}</span>
          <span class="chat-group-timestamp">${i}</span>
        </div>
      </div>
    </div>
  `}function Ov(e,t){const n=$o(e.role),s=t.assistantName??"Assistant",i=n==="user"?"You":n==="assistant"?s:n,o=n==="user"?"user":n==="assistant"?"assistant":"other",a=new Date(e.timestamp).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return r`
    <div class="chat-group ${o}">
      ${wo(e.role,{name:s,avatar:t.assistantAvatar??null})}
      <div class="chat-group-messages">
        ${e.messages.map((l,c)=>sc(l.message,{isStreaming:e.isStreaming&&c===e.messages.length-1,showReasoning:t.showReasoning},t.onOpenSidebar))}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${i}</span>
          <span class="chat-group-timestamp">${a}</span>
        </div>
      </div>
    </div>
  `}function wo(e,t){const n=$o(e),s=t?.name?.trim()||"Assistant",i=t?.avatar?.trim()||"",o=n==="user"?"U":n==="assistant"?s.charAt(0).toUpperCase()||"A":n==="tool"?"⚙":"?",a=n==="user"?"user":n==="assistant"?"assistant":n==="tool"?"tool":"other";return i&&n==="assistant"?Bv(i)?r`<img
        class="chat-avatar ${a}"
        src="${i}"
        alt="${s}"
      />`:r`<div class="chat-avatar ${a}">${i}</div>`:r`<div class="chat-avatar ${a}">${o}</div>`}function Bv(e){return/^https?:\/\//i.test(e)||/^data:image\//i.test(e)||e.startsWith("/")}function Uv(e){return e.length===0?h:r`
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
  `}function sc(e,t,n){const s=e,i=typeof s.role=="string"?s.role:"unknown",o=ec(e)||i.toLowerCase()==="toolresult"||i.toLowerCase()==="tool_result"||typeof s.toolCallId=="string"||typeof s.tool_call_id=="string",a=Iv(e),l=a.length>0,c=Dv(e),u=c.length>0,g=hl(e),p=t.showReasoning&&i==="assistant"?fg(e):null,f=g?.trim()?g:null,m=p?mg(p):null,d=f,v=i==="assistant"&&!!d?.trim(),b=["chat-bubble",v?"has-copy":"",t.isStreaming?"streaming":"","fade-in"].filter(Boolean).join(" ");return!d&&l&&o?r`${a.map(S=>Xa(S,n))}`:!d&&!l&&!u?h:r`
    <div class="${b}">
      ${v?uv(d):h}
      ${Uv(c)}
      ${m?r`<div class="chat-thinking">${wi(Ei(m))}</div>`:h}
      ${d?r`<div class="chat-text">${wi(Ei(d))}</div>`:h}
      ${a.map(S=>Xa(S,n))}
    </div>
  `}function zv(e){const t=(n,s)=>j(e.locale,n,s);return r`
    <div class="sidebar-panel">
      <div class="sidebar-header">
        <div class="sidebar-title">${t("Tool Output","工具输出")}</div>
        <button @click=${e.onClose} class="btn" title=${t("Close sidebar","关闭侧栏")}>
          ${J.x}
        </button>
      </div>
      <div class="sidebar-content">
        ${e.error?r`
              <div class="callout danger">${e.error}</div>
              <button @click=${e.onViewRawText} class="btn" style="margin-top: 12px;">
                ${t("View Raw Text","查看原始文本")}
              </button>
            `:e.content?r`<div class="sidebar-markdown">${wi(Ei(e.content))}</div>`:r`
                  <div class="muted">${t("No content available","暂无内容")}</div>
                `}
      </div>
    </div>
  `}var Hv=Object.defineProperty,Kv=Object.getOwnPropertyDescriptor,ms=(e,t,n,s)=>{for(var i=s>1?void 0:s?Kv(t,n):t,o=e.length-1,a;o>=0;o--)(a=e[o])&&(i=(s?a(t,n,i):a(i))||i);return s&&i&&Hv(t,n,i),i};let Dt=class extends Et{constructor(){super(...arguments),this.splitRatio=.6,this.minRatio=.4,this.maxRatio=.7,this.isDragging=!1,this.startX=0,this.startRatio=0,this.handleMouseDown=e=>{this.isDragging=!0,this.startX=e.clientX,this.startRatio=this.splitRatio,this.classList.add("dragging"),document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),e.preventDefault()},this.handleMouseMove=e=>{if(!this.isDragging)return;const t=this.parentElement;if(!t)return;const n=t.getBoundingClientRect().width,i=(e.clientX-this.startX)/n;let o=this.startRatio+i;o=Math.max(this.minRatio,Math.min(this.maxRatio,o)),this.dispatchEvent(new CustomEvent("resize",{detail:{splitRatio:o},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{this.isDragging=!1,this.classList.remove("dragging"),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}}render(){return h}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}};Dt.styles=vc`
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
  `;ms([ss({type:Number})],Dt.prototype,"splitRatio",2);ms([ss({type:Number})],Dt.prototype,"minRatio",2);ms([ss({type:Number})],Dt.prototype,"maxRatio",2);Dt=ms([Tr("resizable-divider")],Dt);const jv=5e3;function er(e){e.style.height="auto",e.style.height=`${e.scrollHeight}px`}function Wv(e,t){if(!e)return h;const n=(s,i)=>j(t,s,i);return e.active?r`
      <div class="compaction-indicator compaction-indicator--active" role="status" aria-live="polite">
        ${J.loader} ${n("Compacting context...","正在压缩上下文...")}
      </div>
    `:e.completedAt&&Date.now()-e.completedAt<jv?r`
        <div class="compaction-indicator compaction-indicator--complete" role="status" aria-live="polite">
          ${J.check} ${n("Context compacted","上下文已压缩")}
        </div>
      `:h}function Gv(){return`att-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function qv(e,t){const n=e.clipboardData?.items;if(!n||!t.onAttachmentsChange)return;const s=[];for(let i=0;i<n.length;i++){const o=n[i];o.type.startsWith("image/")&&s.push(o)}if(s.length!==0){e.preventDefault();for(const i of s){const o=i.getAsFile();if(!o)continue;const a=new FileReader;a.addEventListener("load",()=>{const l=a.result,c={id:Gv(),dataUrl:l,mimeType:o.type},u=t.attachments??[];t.onAttachmentsChange?.([...u,c])}),a.readAsDataURL(o)}}}function Vv(e){const t=e.attachments??[];return t.length===0?h:r`
    <div class="chat-attachments">
      ${t.map(n=>r`
          <div class="chat-attachment">
            <img
              src=${n.dataUrl}
              alt=${j(e.locale,"Attachment preview","附件预览")}
              class="chat-attachment__img"
            />
            <button
              class="chat-attachment__remove"
              type="button"
              aria-label=${j(e.locale,"Remove attachment","移除附件")}
              @click=${()=>{const s=(e.attachments??[]).filter(i=>i.id!==n.id);e.onAttachmentsChange?.(s)}}
            >
              ${J.x}
            </button>
          </div>
        `)}
    </div>
  `}function Qv(e){const t=(b,S)=>j(e.locale,b,S),n=e.connected,s=e.sending||e.stream!==null,i=!!(e.canAbort&&e.onAbort),a=e.sessions?.sessions?.find(b=>b.key===e.sessionKey)?.reasoningLevel??"off",l=e.showThinking&&a!=="off",c={name:e.assistantName,avatar:e.assistantAvatar??e.assistantAvatarUrl??null},u=(e.attachments?.length??0)>0,g=e.connected?u?t("Add a message or paste more images...","添加消息或继续粘贴图片..."):t("Message (Enter to send, Shift+Enter for line breaks, paste images)","消息（Enter 发送，Shift+Enter 换行，可粘贴图片）"):t("Connect to the gateway to start chatting...","连接网关后即可开始聊天..."),p=e.splitRatio??.6,f=!!(e.sidebarOpen&&e.onCloseSidebar),m=Zv(e),d=!e.loading&&m.length===0,v=r`
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
            `:h}
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
            `:h}
      ${Sl(m,b=>b.key,b=>b.kind==="divider"?r`
              <div class="chat-divider" role="separator" data-ts=${String(b.timestamp)}>
                <span class="chat-divider__line"></span>
                <span class="chat-divider__label">${b.label}</span>
                <span class="chat-divider__line"></span>
              </div>
            `:b.kind==="reading-indicator"?Nv(c):b.kind==="stream"?Fv(b.text,b.startedAt,e.onOpenSidebar,c):b.kind==="group"?Ov(b,{onOpenSidebar:e.onOpenSidebar,showReasoning:l,assistantName:e.assistantName,assistantAvatar:c.avatar}):h)}
    </div>
  `;return r`
    <section class="card chat">
      ${e.disabledReason?r`<div class="callout">${e.disabledReason}</div>`:h}

      ${e.error?r`<div class="callout danger">${e.error}</div>`:h}

      ${e.focusMode?r`
            <button
              class="chat-focus-exit"
              type="button"
              @click=${e.onToggleFocusMode}
              aria-label=${t("Exit focus mode","退出专注模式")}
              title=${t("Exit focus mode","退出专注模式")}
            >
              ${J.x}
            </button>
          `:h}

      <div
        class="chat-split-container ${f?"chat-split-container--open":""}"
      >
        <div
          class="chat-main"
          style="flex: ${f?`0 0 ${p*100}%`:"1 1 100%"}"
        >
          ${v}
        </div>

        ${f?r`
              <resizable-divider
                .splitRatio=${p}
                @resize=${b=>e.onSplitRatioChange?.(b.detail.splitRatio)}
              ></resizable-divider>
              <div class="chat-sidebar">
                ${zv({locale:e.locale,content:e.sidebarContent??null,error:e.sidebarError??null,onClose:e.onCloseSidebar,onViewRawText:()=>{!e.sidebarContent||!e.onOpenSidebar||e.onOpenSidebar(`\`\`\`
${e.sidebarContent}
\`\`\``)}})}
              </div>
            `:h}
      </div>

      ${e.queue.length?r`
            <div class="chat-queue" role="status" aria-live="polite">
              <div class="chat-queue__title">${t("Queued","队列中")} (${e.queue.length})</div>
              <div class="chat-queue__list">
                ${e.queue.map(b=>r`
                    <div class="chat-queue__item">
                      <div class="chat-queue__text">
                        ${b.text||(b.attachments?.length?`${t("Image","图片")} (${b.attachments.length})`:"")}
                      </div>
                      <button
                        class="btn chat-queue__remove"
                        type="button"
                        aria-label=${t("Remove queued message","移除排队消息")}
                        @click=${()=>e.onQueueRemove(b.id)}
                      >
                        ${J.x}
                      </button>
                    </div>
                  `)}
              </div>
            </div>
          `:h}

      ${Wv(e.compactionStatus,e.locale)}

      ${e.showNewMessages?r`
            <button
              class="btn chat-new-messages"
              type="button"
              @click=${e.onScrollToBottom}
            >
              ${t("New messages","新消息")} ${J.arrowDown}
            </button>
          `:h}

      <div class="chat-compose">
        ${Vv(e)}
        <div class="chat-compose__row">
          <label class="field chat-compose__field">
            <span>${t("Message","消息")}</span>
            <textarea
              ${qh(b=>b&&er(b))}
              .value=${e.draft}
              ?disabled=${!e.connected}
              @keydown=${b=>{b.key==="Enter"&&(b.isComposing||b.keyCode===229||b.shiftKey||e.connected&&(b.preventDefault(),n&&e.onSend()))}}
              @input=${b=>{const S=b.target;er(S),e.onDraftChange(S.value)}}
              @paste=${b=>qv(b,e)}
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
  `}const Ys=200;function Yv(e){const t=[];let n=null;for(const s of e){if(s.kind!=="message"){n&&(t.push(n),n=null),t.push(s);continue}const i=Xl(s.message),o=$o(i.role),a=i.timestamp||Date.now();!n||n.role!==o?(n&&t.push(n),n={kind:"group",key:`group:${o}:${s.key}`,role:o,messages:[{message:s.message,key:s.key}],timestamp:a,isStreaming:!1}):n.messages.push({message:s.message,key:s.key})}return n&&t.push(n),t}function Zv(e){const t=(a,l)=>j(e.locale,a,l),n=[],s=Array.isArray(e.messages)?e.messages:[],i=Array.isArray(e.toolMessages)?e.toolMessages:[],o=Math.max(0,s.length-Ys);o>0&&n.push({kind:"message",key:"chat:history:notice",message:{role:"system",content:t(`Showing last ${Ys} messages (${o} hidden).`,`仅显示最近 ${Ys} 条消息（已隐藏 ${o} 条）。`),timestamp:Date.now()}});for(let a=o;a<s.length;a++){const l=s[a],c=Xl(l),g=l.__opensoul;if(g&&g.kind==="compaction"){n.push({kind:"divider",key:typeof g.id=="string"?`divider:compaction:${g.id}`:`divider:compaction:${c.timestamp}:${a}`,label:t("Compaction","压缩"),timestamp:c.timestamp??Date.now()});continue}!e.showThinking&&c.role.toLowerCase()==="toolresult"||n.push({kind:"message",key:tr(l,a),message:l})}if(e.showThinking)for(let a=0;a<i.length;a++)n.push({kind:"message",key:tr(i[a],a+s.length),message:i[a]});if(e.stream!==null){const a=`stream:${e.sessionKey}:${e.streamStartedAt??"live"}`;e.stream.trim().length>0?n.push({kind:"stream",key:a,text:e.stream,startedAt:e.streamStartedAt??Date.now()}):n.push({kind:"reading-indicator",key:a})}return Yv(n)}function tr(e,t){const n=e,s=typeof n.toolCallId=="string"?n.toolCallId:"";if(s)return`tool:${s}`;const i=typeof n.id=="string"?n.id:"";if(i)return`msg:${i}`;const o=typeof n.messageId=="string"?n.messageId:"";if(o)return`msg:${o}`;const a=typeof n.timestamp=="number"?n.timestamp:null,l=typeof n.role=="string"?n.role:"unknown";return a!=null?`msg:${l}:${a}:${t}`:`msg:${l}:${t}`}const Ii={all:r`
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
  `},nr=[{key:"env",label:"Environment"},{key:"update",label:"Updates"},{key:"agents",label:"Agents"},{key:"auth",label:"Authentication"},{key:"channels",label:"Channels"},{key:"messages",label:"Messages"},{key:"commands",label:"Commands"},{key:"hooks",label:"Hooks"},{key:"skills",label:"Skills"},{key:"tools",label:"Tools"},{key:"gateway",label:"Gateway"},{key:"wizard",label:"Setup Wizard"}],sr="__all__";function ir(e){return Ii[e]??Ii.default}function Jv(e,t){const n=uo[e];return n||{label:t?.title??qe(e),description:t?.description??""}}function Xv(e){const{key:t,schema:n,uiHints:s}=e;if(!n||Ne(n)!=="object"||!n.properties)return[];const i=Object.entries(n.properties).map(([o,a])=>{const l=Ce([t,o],s),c=l?.label??a.title??qe(o),u=l?.help??a.description??"",g=l?.order??50;return{key:o,label:c,description:u,order:g}});return i.sort((o,a)=>o.order!==a.order?o.order-a.order:o.key.localeCompare(a.key)),i}function em(e,t){if(!e||!t)return[];const n=[];function s(i,o,a){if(i===o)return;if(typeof i!=typeof o){n.push({path:a,from:i,to:o});return}if(typeof i!="object"||i===null||o===null){i!==o&&n.push({path:a,from:i,to:o});return}if(Array.isArray(i)&&Array.isArray(o)){JSON.stringify(i)!==JSON.stringify(o)&&n.push({path:a,from:i,to:o});return}const l=i,c=o,u=new Set([...Object.keys(l),...Object.keys(c)]);for(const g of u)s(l[g],c[g],a?`${a}.${g}`:g)}return s(e,t,""),n}function or(e,t=40){let n;try{n=JSON.stringify(e)??String(e)}catch{n=String(e)}return n.length<=t?n:n.slice(0,t-3)+"..."}function tm(e){const t=e.valid==null?"unknown":e.valid?"valid":"invalid",n=Rl(e.schema),s=n.schema?n.unsupportedPaths.length>0:!1,i=n.schema?.properties??{},o=nr.filter(_=>_.key in i),a=new Set(nr.map(_=>_.key)),l=Object.keys(i).filter(_=>!a.has(_)).map(_=>({key:_,label:_.charAt(0).toUpperCase()+_.slice(1)})),c=[...o,...l],u=e.activeSection&&n.schema&&Ne(n.schema)==="object"?n.schema.properties?.[e.activeSection]:void 0,g=e.activeSection?Jv(e.activeSection,u):null,p=e.activeSection?Xv({key:e.activeSection,schema:u,uiHints:e.uiHints}):[],f=e.formMode==="form"&&!!e.activeSection&&p.length>0,m=e.activeSubsection===sr,d=e.searchQuery||m?null:e.activeSubsection??p[0]?.key??null,v=e.formMode==="form"?em(e.originalValue,e.formValue):[],b=e.formMode==="raw"&&e.raw!==e.originalRaw,S=e.formMode==="form"?v.length>0:b,k=!!e.formValue&&!e.loading&&!!n.schema,C=e.connected&&!e.saving&&S&&(e.formMode==="raw"?!0:k),A=e.connected&&!e.applying&&!e.updating&&S&&(e.formMode==="raw"?!0:k),T=e.connected&&!e.applying&&!e.updating;return r`
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
            @input=${_=>e.onSearchChange(_.target.value)}
          />
          ${e.searchQuery?r`
                <button
                  class="config-search__clear"
                  @click=${()=>e.onSearchChange("")}
                >
                  ×
                </button>
              `:h}
        </div>

        <!-- Section nav -->
        <nav class="config-nav">
          <button
            class="config-nav__item ${e.activeSection===null?"active":""}"
            @click=${()=>e.onSectionChange(null)}
          >
            <span class="config-nav__icon">${Ii.all}</span>
            <span class="config-nav__label">All Settings</span>
          </button>
          ${c.map(_=>r`
              <button
                class="config-nav__item ${e.activeSection===_.key?"active":""}"
                @click=${()=>e.onSectionChange(_.key)}
              >
                <span class="config-nav__icon"
                  >${ir(_.key)}</span
                >
                <span class="config-nav__label">${_.label}</span>
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
            ${S?r`
                  <span class="config-changes-badge"
                    >${e.formMode==="raw"?"Unsaved changes":`${v.length} unsaved change${v.length!==1?"s":""}`}</span
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
              ?disabled=${!C}
              @click=${e.onSave}
            >
              ${e.saving?"Saving…":"Save"}
            </button>
            <button
              class="btn btn--sm"
              ?disabled=${!A}
              @click=${e.onApply}
            >
              ${e.applying?"Applying…":"Apply"}
            </button>
            <button
              class="btn btn--sm"
              ?disabled=${!T}
              @click=${e.onUpdate}
            >
              ${e.updating?"Updating…":"Update"}
            </button>
          </div>
        </div>

        <!-- Diff panel (form mode only - raw mode doesn't have granular diff) -->
        ${S&&e.formMode==="form"?r`
              <details class="config-diff">
                <summary class="config-diff__summary">
                  <span
                    >View ${v.length} pending
                    change${v.length!==1?"s":""}</span
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
                  ${v.map(_=>r`
                      <div class="config-diff__item">
                        <div class="config-diff__path">${_.path}</div>
                        <div class="config-diff__values">
                          <span class="config-diff__from"
                            >${or(_.from)}</span
                          >
                          <span class="config-diff__arrow">→</span>
                          <span class="config-diff__to"
                            >${or(_.to)}</span
                          >
                        </div>
                      </div>
                    `)}
                </div>
              </details>
            `:h}
        ${g&&e.formMode==="form"?r`
              <div class="config-section-hero">
                <div class="config-section-hero__icon">
                  ${ir(e.activeSection??"")}
                </div>
                <div class="config-section-hero__text">
                  <div class="config-section-hero__title">
                    ${g.label}
                  </div>
                  ${g.description?r`<div class="config-section-hero__desc">
                        ${g.description}
                      </div>`:h}
                </div>
              </div>
            `:h}
        ${f?r`
              <div class="config-subnav">
                <button
                  class="config-subnav__item ${d===null?"active":""}"
                  @click=${()=>e.onSubsectionChange(sr)}
                >
                  All
                </button>
                ${p.map(_=>r`
                    <button
                      class="config-subnav__item ${d===_.key?"active":""}"
                      title=${_.description||_.label}
                      @click=${()=>e.onSubsectionChange(_.key)}
                    >
                      ${_.label}
                    </button>
                  `)}
              </div>
            `:h}

        <!-- Form content -->
        <div class="config-content">
          ${e.formMode==="form"?r`
                ${e.schemaLoading?r`
                        <div class="config-loading">
                          <div class="config-loading__spinner"></div>
                          <span>Loading schema…</span>
                        </div>
                      `:ph({schema:n.schema,uiHints:e.uiHints,value:e.formValue,disabled:e.loading||!e.formValue,unsupportedPaths:n.unsupportedPaths,onPatch:e.onFormPatch,searchQuery:e.searchQuery,activeSection:e.activeSection,activeSubsection:d})}
                ${s?r`
                        <div class="callout danger" style="margin-top: 12px">
                          Form view can't safely edit some fields. Use Raw to avoid losing config entries.
                        </div>
                      `:h}
              `:r`
                <label class="field config-raw-field">
                  <span>Raw JSON5</span>
                  <textarea
                    .value=${e.raw}
                    @input=${_=>e.onRawChange(_.target.value)}
                  ></textarea>
                </label>
              `}
        </div>

        ${e.issues.length>0?r`<div class="callout danger" style="margin-top: 12px;">
              <pre class="code-block">
${JSON.stringify(e.issues,null,2)}</pre
              >
            </div>`:h}
      </main>
    </div>
  `}function nm(e){const t=["last",...e.channels.filter(Boolean)],n=e.form.deliveryChannel?.trim();n&&!t.includes(n)&&t.push(n);const s=new Set;return t.filter(i=>s.has(i)?!1:(s.add(i),!0))}function sm(e,t){if(t==="last")return"last";const n=e.channelMeta?.find(s=>s.id===t);return n?.label?n.label:e.channelLabels?.[t]??t}function im(e){const t=nm(e),s=(e.runsJobId==null?void 0:e.jobs.find(o=>o.id===e.runsJobId))?.name??e.runsJobId??"(select a job)",i=e.runs.toSorted((o,a)=>a.ts-o.ts);return r`
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
            <div class="stat-value">${co(e.status?.nextWakeAtMs??null)}</div>
          </div>
        </div>
        <div class="row" style="margin-top: 12px;">
          <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Refreshing…":"Refresh"}
          </button>
          ${e.error?r`<span class="muted">${e.error}</span>`:h}
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
        ${om(e)}
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
                                    ${sm(e,o)}
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
                        `:h}
                </div>
              `:h}
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
              ${e.jobs.map(o=>am(o,e))}
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
                ${i.map(o=>cm(o,e.basePath))}
              </div>
            `}
    </section>
  `}function om(e){const t=e.form;return t.scheduleKind==="at"?r`
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
  `}function am(e,t){const s=`list-item list-item-clickable cron-job${t.runsJobId===e.id?" list-item-selected":""}`;return r`
    <div class=${s} @click=${()=>t.onLoadRuns(e.id)}>
      <div class="list-main">
        <div class="list-title">${e.name}</div>
        <div class="list-sub">${Tl(e)}</div>
        ${rm(e)}
        ${e.agentId?r`<div class="muted cron-job-agent">Agent: ${e.agentId}</div>`:h}
      </div>
      <div class="list-meta">
        ${lm(e)}
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
  `}function rm(e){if(e.payload.kind==="systemEvent")return r`<div class="cron-job-detail">
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
          </div>`:h}
  `}function ar(e){return typeof e!="number"||!Number.isFinite(e)?"n/a":Y(e)}function lm(e){const t=e.state?.lastStatus??"n/a",n=t==="ok"?"cron-job-status-ok":t==="error"?"cron-job-status-error":t==="skipped"?"cron-job-status-skipped":"cron-job-status-na",s=e.state?.nextRunAtMs,i=e.state?.lastRunAtMs;return r`
    <div class="cron-job-state">
      <div class="cron-job-state-row">
        <span class="cron-job-state-key">Status</span>
        <span class=${`cron-job-status-pill ${n}`}>${t}</span>
      </div>
      <div class="cron-job-state-row">
        <span class="cron-job-state-key">Next</span>
        <span class="cron-job-state-value" title=${vt(s)}>
          ${ar(s)}
        </span>
      </div>
      <div class="cron-job-state-row">
        <span class="cron-job-state-key">Last</span>
        <span class="cron-job-state-value" title=${vt(i)}>
          ${ar(i)}
        </span>
      </div>
    </div>
  `}function cm(e,t){const n=typeof e.sessionKey=="string"&&e.sessionKey.trim().length>0?`${cs("chat",t)}?session=${encodeURIComponent(e.sessionKey)}`:null;return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.status}</div>
        <div class="list-sub">${e.summary??""}</div>
      </div>
      <div class="list-meta">
        <div>${vt(e.ts)}</div>
        <div class="muted">${e.durationMs??0}ms</div>
        ${n?r`<div><a class="session-link" href=${n}>Open run chat</a></div>`:h}
        ${e.error?r`<div class="muted">${e.error}</div>`:h}
      </div>
    </div>
  `}function dm(e){const n=(e.status&&typeof e.status=="object"?e.status.securityAudit:null)?.summary??null,s=n?.critical??0,i=n?.warn??0,o=n?.info??0,a=s>0?"danger":i>0?"warn":"success",l=s>0?`${s} critical`:i>0?`${i} warnings`:"No critical issues";return r`
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
                </div>`:h}
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
            </div>`:h}
        ${e.callResult?r`<pre class="code-block" style="margin-top: 12px;">${e.callResult}</pre>`:h}
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
                      <pre class="code-block">${_p(c.payload)}</pre>
                    </div>
                  </div>
                `)}
            </div>
          `}
    </section>
  `}function um(e){const t=Math.max(0,e),n=Math.floor(t/1e3);if(n<60)return`${n}s`;const s=Math.floor(n/60);return s<60?`${s}m`:`${Math.floor(s/60)}h`}function at(e,t){return t?r`<div class="exec-approval-meta-row"><span>${e}</span><span>${t}</span></div>`:h}function gm(e){const t=e.execApprovalQueue[0];if(!t)return h;const n=t.request,s=t.expiresAtMs-Date.now(),i=s>0?`expires in ${um(s)}`:"expired",o=e.execApprovalQueue.length;return r`
    <div class="exec-approval-overlay" role="dialog" aria-live="polite">
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">Exec approval needed</div>
            <div class="exec-approval-sub">${i}</div>
          </div>
          ${o>1?r`<div class="exec-approval-queue">${o} pending</div>`:h}
        </div>
        <div class="exec-approval-command mono">${n.command}</div>
        <div class="exec-approval-meta">
          ${at("Host",n.host)}
          ${at("Agent",n.agentId)}
          ${at("Session",n.sessionKey)}
          ${at("CWD",n.cwd)}
          ${at("Resolved",n.resolvedPath)}
          ${at("Security",n.security)}
          ${at("Ask",n.ask)}
        </div>
        ${e.execApprovalError?r`<div class="exec-approval-error">${e.execApprovalError}</div>`:h}
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
  `}function pm(e){const{pendingGatewayUrl:t}=e;if(!t)return h;const n=(s,i)=>j(e.uiLocale,s,i);return r`
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
  `}function hm(e){return r`
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
          </div>`:h}
      ${e.statusMessage?r`<div class="callout" style="margin-top: 12px;">
            ${e.statusMessage}
          </div>`:h}
      <div class="list" style="margin-top: 16px;">
        ${e.entries.length===0?r`
                <div class="muted">No instances reported yet.</div>
              `:e.entries.map(t=>fm(t))}
      </div>
    </section>
  `}function fm(e){const t=e.lastInputSeconds!=null?`${e.lastInputSeconds}s ago`:"n/a",n=e.mode??"unknown",s=Array.isArray(e.roles)?e.roles.filter(Boolean):[],i=Array.isArray(e.scopes)?e.scopes.filter(Boolean):[],o=i.length>0?i.length>3?`${i.length} scopes`:`scopes: ${i.join(", ")}`:null;return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.host??"unknown host"}</div>
        <div class="list-sub">${Ap(e)}</div>
        <div class="chip-row">
          <span class="chip">${n}</span>
          ${s.map(a=>r`<span class="chip">${a}</span>`)}
          ${o?r`<span class="chip">${o}</span>`:h}
          ${e.platform?r`<span class="chip">${e.platform}</span>`:h}
          ${e.deviceFamily?r`<span class="chip">${e.deviceFamily}</span>`:h}
          ${e.modelIdentifier?r`<span class="chip">${e.modelIdentifier}</span>`:h}
          ${e.version?r`<span class="chip">${e.version}</span>`:h}
        </div>
      </div>
      <div class="list-meta">
        <div>${Cp(e)}</div>
        <div class="muted">Last input ${t}</div>
        <div class="muted">Reason ${e.reason??""}</div>
      </div>
    </div>
  `}const rr=["trace","debug","info","warn","error","fatal"];function vm(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleTimeString()}function mm(e,t){return t?[e.message,e.subsystem,e.raw].filter(Boolean).join(" ").toLowerCase().includes(t):!0}function bm(e){const t=e.filterText.trim().toLowerCase(),n=rr.some(o=>!e.levelFilters[o]),s=e.entries.filter(o=>o.level&&!e.levelFilters[o.level]?!1:mm(o,t)),i=t||n?"filtered":"visible";return r`
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
        ${rr.map(o=>r`
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

      ${e.file?r`<div class="muted" style="margin-top: 10px;">File: ${e.file}</div>`:h}
      ${e.truncated?r`
              <div class="callout" style="margin-top: 10px">Log output truncated; showing latest chunk.</div>
            `:h}
      ${e.error?r`<div class="callout danger" style="margin-top: 10px;">${e.error}</div>`:h}

      <div class="log-stream" style="margin-top: 12px;" @scroll=${e.onScroll}>
        ${s.length===0?r`
                <div class="muted" style="padding: 12px">No log entries.</div>
              `:s.map(o=>r`
                <div class="log-row">
                  <div class="log-time mono">${vm(o.time)}</div>
                  <div class="log-level ${o.level??""}">${o.level??""}</div>
                  <div class="log-subsystem mono">${o.subsystem??""}</div>
                  <div class="log-message mono">${o.message??o.raw}</div>
                </div>
              `)}
      </div>
    </section>
  `}function ym(e){const t=Am(e),n=Im(e);return r`
    ${Rm(n)}
    ${Mm(t)}
    ${xm(e)}
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
              `:e.nodes.map(s=>Km(s))}
      </div>
    </section>
  `}function xm(e){const t=e.devicesList??{pending:[],paired:[]},n=Array.isArray(t.pending)?t.pending:[],s=Array.isArray(t.paired)?t.paired:[];return r`
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
      ${e.devicesError?r`<div class="callout danger" style="margin-top: 12px;">${e.devicesError}</div>`:h}
      <div class="list" style="margin-top: 16px;">
        ${n.length>0?r`
              <div class="muted" style="margin-bottom: 8px;">Pending</div>
              ${n.map(i=>$m(i,e))}
            `:h}
        ${s.length>0?r`
              <div class="muted" style="margin-top: 12px; margin-bottom: 8px;">Paired</div>
              ${s.map(i=>wm(i,e))}
            `:h}
        ${n.length===0&&s.length===0?r`
                <div class="muted">No paired devices.</div>
              `:h}
      </div>
    </section>
  `}function $m(e,t){const n=e.displayName?.trim()||e.deviceId,s=typeof e.ts=="number"?Y(e.ts):"n/a",i=e.role?.trim()?`role: ${e.role}`:"role: -",o=e.isRepair?" · repair":"",a=e.remoteIp?` · ${e.remoteIp}`:"";return r`
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
  `}function wm(e,t){const n=e.displayName?.trim()||e.deviceId,s=e.remoteIp?` · ${e.remoteIp}`:"",i=`roles: ${ii(e.roles)}`,o=`scopes: ${ii(e.scopes)}`,a=Array.isArray(e.tokens)?e.tokens:[];return r`
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
                ${a.map(l=>km(e.deviceId,l,t))}
              </div>
            `}
      </div>
    </div>
  `}function km(e,t,n){const s=t.revokedAtMs?"revoked":"active",i=`scopes: ${ii(t.scopes)}`,o=Y(t.rotatedAtMs??t.createdAtMs??t.lastUsedAtMs??null);return r`
    <div class="row" style="justify-content: space-between; gap: 8px;">
      <div class="list-sub">${t.role} · ${s} · ${i} · ${o}</div>
      <div class="row" style="justify-content: flex-end; gap: 6px; flex-wrap: wrap;">
        <button
          class="btn btn--sm"
          @click=${()=>n.onDeviceRotate(e,t.role,t.scopes)}
        >
          Rotate
        </button>
        ${t.revokedAtMs?h:r`
              <button
                class="btn btn--sm danger"
                @click=${()=>n.onDeviceRevoke(e,t.role)}
              >
                Revoke
              </button>
            `}
      </div>
    </div>
  `}const Ye="__defaults__",lr=[{value:"deny",label:"Deny"},{value:"allowlist",label:"Allowlist"},{value:"full",label:"Full"}],Sm=[{value:"off",label:"Off"},{value:"on-miss",label:"On miss"},{value:"always",label:"Always"}];function Am(e){const t=e.configForm,n=Um(e.nodes),{defaultBinding:s,agents:i}=Hm(t),o=!!t,a=e.configSaving||e.configFormMode==="raw";return{ready:o,disabled:a,configDirty:e.configDirty,configLoading:e.configLoading,configSaving:e.configSaving,defaultBinding:s,agents:i,nodes:n,onBindDefault:e.onBindDefault,onBindAgent:e.onBindAgent,onSave:e.onSaveBindings,onLoadConfig:e.onLoadConfig,formMode:e.configFormMode}}function cr(e){return e==="allowlist"||e==="full"||e==="deny"?e:"deny"}function Cm(e){return e==="always"||e==="off"||e==="on-miss"?e:"on-miss"}function Tm(e){const t=e?.defaults??{};return{security:cr(t.security),ask:Cm(t.ask),askFallback:cr(t.askFallback??"deny"),autoAllowSkills:!!(t.autoAllowSkills??!1)}}function _m(e){const t=e?.agents??{},n=Array.isArray(t.list)?t.list:[],s=[];return n.forEach(i=>{if(!i||typeof i!="object")return;const o=i,a=typeof o.id=="string"?o.id.trim():"";if(!a)return;const l=typeof o.name=="string"?o.name.trim():void 0,c=o.default===!0;s.push({id:a,name:l||void 0,isDefault:c})}),s}function Lm(e,t){const n=_m(e),s=Object.keys(t?.agents??{}),i=new Map;n.forEach(a=>i.set(a.id,a)),s.forEach(a=>{i.has(a)||i.set(a,{id:a})});const o=Array.from(i.values());return o.length===0&&o.push({id:"main",isDefault:!0}),o.sort((a,l)=>{if(a.isDefault&&!l.isDefault)return-1;if(!a.isDefault&&l.isDefault)return 1;const c=a.name?.trim()?a.name:a.id,u=l.name?.trim()?l.name:l.id;return c.localeCompare(u)}),o}function Em(e,t){return e===Ye?Ye:e&&t.some(n=>n.id===e)?e:Ye}function Im(e){const t=e.execApprovalsForm??e.execApprovalsSnapshot?.file??null,n=!!t,s=Tm(t),i=Lm(e.configForm,t),o=zm(e.nodes),a=e.execApprovalsTarget;let l=a==="node"&&e.execApprovalsTargetNodeId?e.execApprovalsTargetNodeId:null;a==="node"&&l&&!o.some(p=>p.id===l)&&(l=null);const c=Em(e.execApprovalsSelectedAgent,i),u=c!==Ye?(t?.agents??{})[c]??null:null,g=Array.isArray(u?.allowlist)?u.allowlist??[]:[];return{ready:n,disabled:e.execApprovalsSaving||e.execApprovalsLoading,dirty:e.execApprovalsDirty,loading:e.execApprovalsLoading,saving:e.execApprovalsSaving,form:t,defaults:s,selectedScope:c,selectedAgent:u,agents:i,allowlist:g,target:a,targetNodeId:l,targetNodes:o,onSelectScope:e.onExecApprovalsSelectAgent,onSelectTarget:e.onExecApprovalsTargetChange,onPatch:e.onExecApprovalsPatch,onRemove:e.onExecApprovalsRemove,onLoad:e.onLoadExecApprovals,onSave:e.onSaveExecApprovals}}function Mm(e){const t=e.nodes.length>0,n=e.defaultBinding??"";return r`
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
            `:h}

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
                  ${t?h:r`
                          <div class="muted">No nodes with system.run available.</div>
                        `}
                </div>
              </div>

              ${e.agents.length===0?r`
                      <div class="muted">No agents found.</div>
                    `:e.agents.map(s=>Bm(s,e))}
            </div>
          `:r`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load config to edit bindings.</div>
            <button class="btn" ?disabled=${e.configLoading} @click=${e.onLoadConfig}>
              ${e.configLoading?"Loading…":"Load config"}
            </button>
          </div>`}
    </section>
  `}function Rm(e){const t=e.ready,n=e.target!=="node"||!!e.targetNodeId;return r`
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

      ${Pm(e)}

      ${t?r`
            ${Dm(e)}
            ${Nm(e)}
            ${e.selectedScope===Ye?h:Fm(e)}
          `:r`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load exec approvals to edit allowlists.</div>
            <button class="btn" ?disabled=${e.loading||!n} @click=${e.onLoad}>
              ${e.loading?"Loading…":"Load approvals"}
            </button>
          </div>`}
    </section>
  `}function Pm(e){const t=e.targetNodes.length>0,n=e.targetNodeId??"";return r`
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
              `:h}
        </div>
      </div>
      ${e.target==="node"&&!t?r`
              <div class="muted">No nodes advertise exec approvals yet.</div>
            `:h}
    </div>
  `}function Dm(e){return r`
    <div class="row" style="margin-top: 12px; gap: 8px; flex-wrap: wrap;">
      <span class="label">Scope</span>
      <div class="row" style="gap: 8px; flex-wrap: wrap;">
        <button
          class="btn btn--sm ${e.selectedScope===Ye?"active":""}"
          @click=${()=>e.onSelectScope(Ye)}
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
  `}function Nm(e){const t=e.selectedScope===Ye,n=e.defaults,s=e.selectedAgent??{},i=t?["defaults"]:["agents",e.selectedScope],o=typeof s.security=="string"?s.security:void 0,a=typeof s.ask=="string"?s.ask:void 0,l=typeof s.askFallback=="string"?s.askFallback:void 0,c=t?n.security:o??"__default__",u=t?n.ask:a??"__default__",g=t?n.askFallback:l??"__default__",p=typeof s.autoAllowSkills=="boolean"?s.autoAllowSkills:void 0,f=p??n.autoAllowSkills,m=p==null;return r`
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
              @change=${d=>{const b=d.target.value;!t&&b==="__default__"?e.onRemove([...i,"security"]):e.onPatch([...i,"security"],b)}}
            >
              ${t?h:r`<option value="__default__" ?selected=${c==="__default__"}>
                    Use default (${n.security})
                  </option>`}
              ${lr.map(d=>r`<option
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
              @change=${d=>{const b=d.target.value;!t&&b==="__default__"?e.onRemove([...i,"ask"]):e.onPatch([...i,"ask"],b)}}
            >
              ${t?h:r`<option value="__default__" ?selected=${u==="__default__"}>
                    Use default (${n.ask})
                  </option>`}
              ${Sm.map(d=>r`<option
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
              @change=${d=>{const b=d.target.value;!t&&b==="__default__"?e.onRemove([...i,"askFallback"]):e.onPatch([...i,"askFallback"],b)}}
            >
              ${t?h:r`<option value="__default__" ?selected=${g==="__default__"}>
                    Use default (${n.askFallback})
                  </option>`}
              ${lr.map(d=>r`<option
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
            ${t?"Allow skill executables listed by the Gateway.":m?`Using default (${n.autoAllowSkills?"on":"off"}).`:`Override (${f?"on":"off"}).`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Enabled</span>
            <input
              type="checkbox"
              ?disabled=${e.disabled}
              .checked=${f}
              @change=${d=>{const v=d.target;e.onPatch([...i,"autoAllowSkills"],v.checked)}}
            />
          </label>
          ${!t&&!m?r`<button
                class="btn btn--sm"
                ?disabled=${e.disabled}
                @click=${()=>e.onRemove([...i,"autoAllowSkills"])}
              >
                Use default
              </button>`:h}
        </div>
      </div>
    </div>
  `}function Fm(e){const t=["agents",e.selectedScope,"allowlist"],n=e.allowlist;return r`
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
            `:n.map((s,i)=>Om(e,s,i))}
    </div>
  `}function Om(e,t,n){const s=t.lastUsedAt?Y(t.lastUsedAt):"never",i=t.lastUsedCommand?oi(t.lastUsedCommand,120):null,o=t.lastResolvedPath?oi(t.lastResolvedPath,120):null;return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t.pattern?.trim()?t.pattern:"New pattern"}</div>
        <div class="list-sub">Last used: ${s}</div>
        ${i?r`<div class="list-sub mono">${i}</div>`:h}
        ${o?r`<div class="list-sub mono">${o}</div>`:h}
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
  `}function Bm(e,t){const n=e.binding??"__default__",s=e.name?.trim()?`${e.name} (${e.id})`:e.id,i=t.nodes.length>0;return r`
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
  `}function Um(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(l=>String(l)==="system.run"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const a=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:a===o?o:`${a} · ${o}`})}return t.sort((n,s)=>n.label.localeCompare(s.label)),t}function zm(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(l=>String(l)==="system.execApprovals.get"||String(l)==="system.execApprovals.set"))continue;const o=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!o)continue;const a=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():o;t.push({id:o,label:a===o?o:`${a} · ${o}`})}return t.sort((n,s)=>n.label.localeCompare(s.label)),t}function Hm(e){const t={id:"main",name:void 0,index:0,isDefault:!0,binding:null};if(!e||typeof e!="object")return{defaultBinding:null,agents:[t]};const s=(e.tools??{}).exec??{},i=typeof s.node=="string"&&s.node.trim()?s.node.trim():null,o=e.agents??{},a=Array.isArray(o.list)?o.list:[];if(a.length===0)return{defaultBinding:i,agents:[t]};const l=[];return a.forEach((c,u)=>{if(!c||typeof c!="object")return;const g=c,p=typeof g.id=="string"?g.id.trim():"";if(!p)return;const f=typeof g.name=="string"?g.name.trim():void 0,m=g.default===!0,v=(g.tools??{}).exec??{},b=typeof v.node=="string"&&v.node.trim()?v.node.trim():null;l.push({id:p,name:f||void 0,index:u,isDefault:m,binding:b})}),l.length===0&&l.push(t),{defaultBinding:i,agents:l}}function Km(e){const t=!!e.connected,n=!!e.paired,s=typeof e.displayName=="string"&&e.displayName.trim()||(typeof e.nodeId=="string"?e.nodeId:"unknown"),i=Array.isArray(e.caps)?e.caps:[],o=Array.isArray(e.commands)?e.commands:[];return r`
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
  `}const Mi=[{id:"anthropic",label:"Anthropic",hint:"Claude Opus / Sonnet"},{id:"openai",label:"OpenAI",hint:"GPT-5 / GPT-5 Mini"},{id:"google",label:"Google",hint:"Gemini 3 Pro / Flash"},{id:"openrouter",label:"OpenRouter",hint:"Multi-model gateway"},{id:"xai",label:"xAI",hint:"Grok"},{id:"minimax",label:"MiniMax",hint:"M2.1"},{id:"moonshot",label:"Moonshot AI",hint:"Kimi K2.5"},{id:"qwen",label:"Qwen",hint:"Alibaba Cloud"},{id:"zai",label:"Z.AI",hint:"GLM 4.7"},{id:"copilot",label:"GitHub Copilot",hint:"GitHub device login"},{id:"ai-gateway",label:"Vercel AI Gateway",hint:"API key"},{id:"opencode-zen",label:"OpenCode Zen",hint:"Multi-model proxy"},{id:"xiaomi",label:"Xiaomi",hint:"API key"},{id:"qianfan",label:"Qianfan",hint:"API key"},{id:"synthetic",label:"Synthetic",hint:"Anthropic-compatible"},{id:"venice",label:"Venice AI",hint:"Privacy-focused"},{id:"cloudflare-ai-gateway",label:"Cloudflare AI Gateway",hint:"Cloudflare"}],Ri=[{id:"telegram",label:"Telegram",icon:"✈️",difficulty:"easy",tokenLabel:"Bot Token",tokenHint:"Create a bot via @BotFather on Telegram and paste the token here."},{id:"discord",label:"Discord",icon:"🎮",difficulty:"easy",tokenLabel:"Bot Token",tokenHint:"Create an app at discord.com/developers, add a bot, and paste the token."},{id:"whatsapp",label:"WhatsApp",icon:"📱",difficulty:"medium",tokenLabel:"",tokenHint:"WhatsApp uses QR code pairing. You can configure this after setup."},{id:"slack",label:"Slack",icon:"💬",difficulty:"medium",tokenLabel:"Bot Token + App Token",tokenHint:"Create a Slack app with Socket Mode and paste both tokens."},{id:"signal",label:"Signal",icon:"🔒",difficulty:"advanced",tokenLabel:"",tokenHint:"Signal requires signal-cli linking. Configure after setup."},{id:"feishu",label:"Feishu",icon:"🐦",difficulty:"medium",tokenLabel:"App ID + App Secret",tokenHint:"Create a Feishu app and paste the credentials."},{id:"msteams",label:"MS Teams",icon:"🏢",difficulty:"advanced",tokenLabel:"",tokenHint:"Teams integration requires Azure Bot registration."},{id:"matrix",label:"Matrix",icon:"🌐",difficulty:"medium",tokenLabel:"Access Token",tokenHint:"Provide your Matrix homeserver URL and access token."}],dr={en:{easy:"Easy",medium:"Medium",advanced:"Advanced"},"zh-CN":{easy:"简单",medium:"中等",advanced:"高级"},"zh-TW":{easy:"簡單",medium:"中等",advanced:"進階"},ja:{easy:"簡単",medium:"普通",advanced:"上級"},ko:{easy:"쉬움",medium:"보통",advanced:"고급"},es:{easy:"Fácil",medium:"Medio",advanced:"Avanzado"},fr:{easy:"Facile",medium:"Moyen",advanced:"Avancé"},de:{easy:"Einfach",medium:"Mittel",advanced:"Fortgeschritten"},"pt-BR":{easy:"Fácil",medium:"Médio",advanced:"Avançado"},ru:{easy:"Легко",medium:"Средне",advanced:"Сложно"}};function jm(e,t){return dr[e]?.[t]??dr.en[t]??t}function Wm(e){const t=et(e.locale),n=Ri.find(s=>s.id===e.selectedChannel);return r`
    <div class="onboarding-channel-grid">
      ${Ri.map(s=>{const i=e.selectedChannel===s.id;return r`
          <button
            class="onboarding-channel-item ${i?"onboarding-channel-item--selected":""}"
            @click=${()=>e.onChannelSelect(i?null:s.id)}
          >
            <span class="onboarding-channel-item__icon">${s.icon}</span>
            <span class="onboarding-channel-item__name">${s.label}</span>
            <span class="onboarding-channel-item__difficulty">
              ${jm(e.locale,s.difficulty)}
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
          `:h}
  `}function Gm(e){const t=et(e.locale),n=ls.find(a=>a.value===e.locale)?.nativeLabel??e.locale,s=Mi.find(a=>a.id===e.selectedProvider)?.label??null,i=Ri.find(a=>a.id===e.selectedChannel)?.label??null,o=e.loginStatus==="success"?e.loginDisplayName:null;return r`
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
  `}function qm(e){return et(e.locale),r`
    <div class="onboarding-lang-grid">
      ${ls.map(t=>r`
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
  `}const Vm=r`
  <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
`,Qm=r`
  <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
`,ur=r`
  <svg class="onboarding-login-spinner" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
`;function Ym(e){const t=et(e.locale),n=e.loginStatus==="loading",s=e.loginStatus==="error",i=e.loginStatus==="success";return r`
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
                ${e.loginEmail?r`<div class="onboarding-login-success__email">${e.loginEmail}</div>`:h}
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
                <span class="onboarding-login-btn__icon">${Vm}</span>
                <span class="onboarding-login-btn__label">
                  ${n?ur:h}
                  ${t.loginWithGoogle}
                </span>
              </button>

              <button
                class="onboarding-login-btn onboarding-login-btn--github"
                @click=${e.onGithubLogin}
                ?disabled=${n}
              >
                <span class="onboarding-login-btn__icon">${Qm}</span>
                <span class="onboarding-login-btn__label">
                  ${n?ur:h}
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
          `:h}
    </div>
  `}const Zm=r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,Jm=r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>`;function Xm(e){const t=et(e.locale),n=e.providerSearchQuery.toLowerCase().trim(),s=n?Mi.filter(i=>i.label.toLowerCase().includes(n)||(i.hint?.toLowerCase().includes(n)??!1)):Mi;return r`
    <!-- Search -->
    <div class="onboarding-search">
      <span class="onboarding-search__icon">${Jm}</span>
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
              <span class="onboarding-provider-item__check-icon">${Zm}</span>
            </div>
            <div class="onboarding-provider-item__info">
              <div class="onboarding-provider-item__name">${i.label}</div>
              ${i.hint?r`<div class="onboarding-provider-item__hint">${i.hint}</div>`:h}
              ${o?r`
                    <input
                      class="onboarding-provider-input"
                      type="password"
                      placeholder=${t.providerApiKeyPlaceholder}
                      .value=${e.providerApiKey}
                      @input=${a=>e.onProviderApiKeyChange(a.target.value)}
                      @click=${a=>a.stopPropagation()}
                    />
                  `:h}
            </div>
          </div>
        `})}
      ${s.length===0?r`<div style="text-align:center; padding:24px; color:var(--muted);">
            ${t.providerNoneSelected}
          </div>`:h}
    </div>
  `}const Zs=5;function eb(e){switch(e.step){case 1:return Ym(e);case 2:return qm(e);case 3:return Xm(e);case 4:return Wm(e);case 5:return Gm(e)}}function tb(e){const t=et(e.locale);switch(e.step){case 1:return t.loginTitle;case 2:return t.langTitle;case 3:return t.providerTitle;case 4:return t.channelTitle;case 5:return t.confirmTitle}}function nb(e){const t=et(e.locale);switch(e.step){case 1:return t.loginSubtitle;case 2:return t.langSubtitle;case 3:return t.providerSubtitle;case 4:return t.channelSubtitle;case 5:return t.confirmSubtitle}}function sb(e){const t=et(e.locale),n=e.step===1,s=e.step===Zs,i=e.step===1||e.step===3||e.step===4;return r`
    <div class="onboarding-wizard">
      <div class="onboarding-card">
        <!-- Progress bar -->
        <div class="onboarding-progress">
          ${Array.from({length:Zs},(o,a)=>{const l=a+1,c=l<e.step,u=l===e.step;return r`
              <div
                class="onboarding-progress__step ${c?"onboarding-progress__step--done":""} ${u?"onboarding-progress__step--active":""}"
              ></div>
            `})}
        </div>

        <!-- Header -->
        <div class="onboarding-header">
          <div class="onboarding-header__step-label">
            ${t.stepOf(e.step,Zs)}
          </div>
          <h2 class="onboarding-header__title">${tb(e)}</h2>
          <p class="onboarding-header__subtitle">${nb(e)}</p>
        </div>

        <!-- Body -->
        <div class="onboarding-body">
          ${eb(e)}
        </div>

        <!-- Footer -->
        <div class="onboarding-footer">
          <div class="onboarding-footer__left">
            ${n?h:r`
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
                `:h}
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
  `}function ib(e){const t=(l,c)=>j(e.locale,l,c),n=e.hello?.snapshot,s=n?.uptimeMs?Gi(n.uptimeMs):t("n/a","无"),i=n?.policy?.tickIntervalMs?`${n.policy.tickIntervalMs}ms`:t("n/a","无"),o=(()=>{if(e.connected||!e.lastError)return null;const l=e.lastError.toLowerCase();if(!(l.includes("unauthorized")||l.includes("connect failed")))return null;const u=!!e.settings.token.trim(),g=!!e.password.trim();return!u&&!g?r`
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
        <div class="muted">${t("Next wake","下次唤醒")} ${co(e.cronNext)}</div>
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
              </div>`:h}
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card">
        <div class="card-title">${t("Quick Actions","快捷操作")}</div>
        <div class="card-sub">${t("Navigate to common tasks quickly.","快速跳转到常用任务。")}</div>
        <div class="overview-actions" style="margin-top: 16px; display: grid; gap: 10px;">
          <button class="btn" style="justify-content: flex-start; width: 100%;"
            @click=${()=>e.onNavigate?.("chat")}>
            ${J.messageSquare}
            <span>${t("Open Chat","打开聊天")}</span>
          </button>
          <button class="btn" style="justify-content: flex-start; width: 100%;"
            @click=${()=>e.onNavigate?.("channels")}>
            ${J.link}
            <span>${t("View Channels","查看渠道")}</span>
          </button>
          <button class="btn" style="justify-content: flex-start; width: 100%;"
            @click=${()=>e.onNavigate?.("sessions")}>
            ${J.fileText}
            <span>${t("Manage Sessions","管理会话")}</span>
          </button>
          <button class="btn" style="justify-content: flex-start; width: 100%;"
            @click=${()=>e.onNavigate?.("logs")}>
            ${J.scrollText}
            <span>${t("View Logs","查看日志")}</span>
          </button>
          <button class="btn" style="justify-content: flex-start; width: 100%;"
            @click=${()=>e.onNavigate?.("config")}>
            ${J.settings}
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
  `}const ob=["","off","minimal","low","medium","high","xhigh"],ab=["","off","on"],rb=[{value:"",label:"inherit"},{value:"off",label:"off (explicit)"},{value:"on",label:"on"},{value:"full",label:"full"}],lb=["","off","on","stream"];function cb(e){if(!e)return"";const t=e.trim().toLowerCase();return t==="z.ai"||t==="z-ai"?"zai":t}function ic(e){return cb(e)==="zai"}function db(e){return ic(e)?ab:ob}function gr(e,t){return t?e.includes(t)?[...e]:[...e,t]:[...e]}function ub(e,t){return t?e.some(n=>n.value===t)?[...e]:[...e,{value:t,label:`${t} (custom)`}]:[...e]}function gb(e,t){return!t||!e||e==="off"?e:"on"}function pb(e,t){return e?t&&e==="on"?"low":e:null}function hb(e){const t=e.result?.sessions??[];return r`
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

      ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:h}

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
              `:t.map(n=>fb(n,e.basePath,e.onPatch,e.onDelete,e.loading))}
      </div>
    </section>
  `}function fb(e,t,n,s,i){const o=e.updatedAt?Y(e.updatedAt):"n/a",a=e.thinkingLevel??"",l=ic(e.modelProvider),c=gb(a,l),u=gr(db(e.modelProvider),c),g=e.verboseLevel??"",p=ub(rb,g),f=e.reasoningLevel??"",m=gr(lb,f),d=typeof e.displayName=="string"&&e.displayName.trim().length>0?e.displayName.trim():null,v=typeof e.label=="string"?e.label.trim():"",b=!!(d&&d!==e.key&&d!==v),S=e.kind!=="global",k=S?`${cs("chat",t)}?session=${encodeURIComponent(e.key)}`:null;return r`
    <div class="table-row">
      <div class="mono session-key-cell">
        ${S?r`<a href=${k} class="session-link">${e.key}</a>`:e.key}
        ${b?r`<span class="muted session-key-display-name">${d}</span>`:h}
      </div>
      <div>
        <input
          .value=${e.label??""}
          ?disabled=${i}
          placeholder="(optional)"
          @change=${C=>{const A=C.target.value.trim();n(e.key,{label:A||null})}}
        />
      </div>
      <div>${e.kind}</div>
      <div>${o}</div>
      <div>${Tp(e)}</div>
      <div>
        <select
          ?disabled=${i}
          @change=${C=>{const A=C.target.value;n(e.key,{thinkingLevel:pb(A,l)})}}
        >
          ${u.map(C=>r`<option value=${C} ?selected=${c===C}>
                ${C||"inherit"}
              </option>`)}
        </select>
      </div>
      <div>
        <select
          ?disabled=${i}
          @change=${C=>{const A=C.target.value;n(e.key,{verboseLevel:A||null})}}
        >
          ${p.map(C=>r`<option value=${C.value} ?selected=${g===C.value}>
                ${C.label}
              </option>`)}
        </select>
      </div>
      <div>
        <select
          ?disabled=${i}
          @change=${C=>{const A=C.target.value;n(e.key,{reasoningLevel:A||null})}}
        >
          ${m.map(C=>r`<option value=${C} ?selected=${f===C}>
                ${C||"inherit"}
              </option>`)}
        </select>
      </div>
      <div>
        <button class="btn danger" ?disabled=${i} @click=${()=>s(e.key)}>
          Delete
        </button>
      </div>
    </div>
  `}const vb=[{id:"general",icon:"settings"},{id:"config",icon:"settings"},{id:"logs",icon:"scrollText"},{id:"debug",icon:"bug"}];function mb(e){const t=(s,i)=>j(e.uiLocale,s,i),n=s=>{const i=s.currentTarget;i&&e.setUiLocale(i.value)};return r`
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
          ${up(e)}
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
            .value=${e.uiLocale}
            @change=${n}
          >
            ${ls.map(s=>r`<option value=${s.value}>${s.nativeLabel} - ${s.label}</option>`)}
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
        <span class="settings-link__icon">${J.link}</span>
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
  `}function bb(e,t){if(!e.settingsOpen)return h;const n=(a,l)=>j(e.uiLocale,a,l),s=a=>{switch(a){case"general":return n("General","通用");case"config":return n("Config","配置");case"logs":return n("Logs","日志");case"debug":return n("Debug","调试");default:return a}},i=e.settingsSection;return r`
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
          ${J.x}
        </button>
      </div>

      <div class="settings-panel__body">
        <nav class="settings-panel__nav">
          ${vb.map(a=>r`
              <button
                class="settings-nav-item ${i===a.id?"active":""}"
                @click=${()=>e.setSettingsSection(a.id)}
              >
                <span class="settings-nav-item__icon">${J[a.icon]}</span>
                <span class="settings-nav-item__text">${s(a.id)}</span>
              </button>
            `)}
        </nav>

        <div class="settings-panel__content">
          ${i==="general"?mb(e):h}
          ${i==="config"?t.config:h}
          ${i==="logs"?t.logs:h}
          ${i==="debug"?t.debug:h}
        </div>
      </div>
    </div>
  `}const Rn=[{id:"workspace",label:"Workspace Skills",sources:["opensoul-workspace"]},{id:"built-in",label:"Built-in Skills",sources:["opensoul-bundled"]},{id:"installed",label:"Installed Skills",sources:["opensoul-managed"]},{id:"extra",label:"Extra Skills",sources:["opensoul-extra"]}];function yb(e){const t=new Map;for(const o of Rn)t.set(o.id,{id:o.id,label:o.label,skills:[]});const n=Rn.find(o=>o.id==="built-in"),s={id:"other",label:"Other Skills",skills:[]};for(const o of e){const a=o.bundled?n:Rn.find(l=>l.sources.includes(o.source));a?t.get(a.id)?.skills.push(o):s.skills.push(o)}const i=Rn.map(o=>t.get(o.id)).filter(o=>!!(o&&o.skills.length>0));return s.skills.length>0&&i.push(s),i}function xb(e){const t=e.report?.skills??[],n=e.filter.trim().toLowerCase(),s=n?t.filter(o=>[o.name,o.description,o.source].join(" ").toLowerCase().includes(n)):t,i=yb(s);return r`
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

      ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:h}

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
                      ${o.skills.map(l=>$b(l,e))}
                    </div>
                  </details>
                `})}
            </div>
          `}
    </section>
  `}function $b(e,t){const n=t.busyKey===e.skillKey,s=t.edits[e.skillKey]??"",i=t.messages[e.skillKey]??null,o=e.install.length>0&&e.missing.bins.length>0,a=!!(e.bundled&&e.source!=="opensoul-bundled"),l=[...e.missing.bins.map(u=>`bin:${u}`),...e.missing.env.map(u=>`env:${u}`),...e.missing.config.map(u=>`config:${u}`),...e.missing.os.map(u=>`os:${u}`)],c=[];return e.disabled&&c.push("disabled"),e.blockedByAllowlist&&c.push("blocked by allowlist"),r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">
          ${e.emoji?`${e.emoji} `:""}${e.name}
        </div>
        <div class="list-sub">${oi(e.description,140)}</div>
        <div class="chip-row" style="margin-top: 6px;">
          <span class="chip">${e.source}</span>
          ${a?r`
                  <span class="chip">bundled</span>
                `:h}
          <span class="chip ${e.eligible?"chip-ok":"chip-warn"}">
            ${e.eligible?"eligible":"blocked"}
          </span>
          ${e.disabled?r`
                  <span class="chip chip-warn">disabled</span>
                `:h}
        </div>
        ${l.length>0?r`
              <div class="muted" style="margin-top: 6px;">
                Missing: ${l.join(", ")}
              </div>
            `:h}
        ${c.length>0?r`
              <div class="muted" style="margin-top: 6px;">
                Reason: ${c.join(", ")}
              </div>
            `:h}
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
              </button>`:h}
        </div>
        ${i?r`<div
              class="muted"
              style="margin-top: 8px; color: ${i.kind==="error"?"var(--danger-color, #d14343)":"var(--success-color, #0a7f5a)"};"
            >
              ${i.message}
            </div>`:h}
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
            `:h}
      </div>
    </div>
  `}const wb=new Set(["agent","channel","chat","provider","model","tool","label","key","session","id","has","mintokens","maxtokens","mincost","maxcost","minmessages","maxmessages"]),Jn=e=>e.trim().toLowerCase(),kb=e=>{const t=e.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*").replace(/\?/g,".");return new RegExp(`^${t}$`,"i")},ct=e=>{let t=e.trim().toLowerCase();if(!t)return null;t.startsWith("$")&&(t=t.slice(1));let n=1;t.endsWith("k")?(n=1e3,t=t.slice(0,-1)):t.endsWith("m")&&(n=1e6,t=t.slice(0,-1));const s=Number(t);return Number.isFinite(s)?s*n:null},ko=e=>(e.match(/"[^"]+"|\S+/g)??[]).map(n=>{const s=n.replace(/^"|"$/g,""),i=s.indexOf(":");if(i>0){const o=s.slice(0,i),a=s.slice(i+1);return{key:o,value:a,raw:s}}return{value:s,raw:s}}),Sb=e=>[e.label,e.key,e.sessionId].filter(n=>!!n).map(n=>n.toLowerCase()),pr=e=>{const t=new Set;e.modelProvider&&t.add(e.modelProvider.toLowerCase()),e.providerOverride&&t.add(e.providerOverride.toLowerCase()),e.origin?.provider&&t.add(e.origin.provider.toLowerCase());for(const n of e.usage?.modelUsage??[])n.provider&&t.add(n.provider.toLowerCase());return Array.from(t)},hr=e=>{const t=new Set;e.model&&t.add(e.model.toLowerCase());for(const n of e.usage?.modelUsage??[])n.model&&t.add(n.model.toLowerCase());return Array.from(t)},Ab=e=>(e.usage?.toolUsage?.tools??[]).map(t=>t.name.toLowerCase()),Cb=(e,t)=>{const n=Jn(t.value??"");if(!n)return!0;if(!t.key)return Sb(e).some(i=>i.includes(n));switch(Jn(t.key)){case"agent":return e.agentId?.toLowerCase().includes(n)??!1;case"channel":return e.channel?.toLowerCase().includes(n)??!1;case"chat":return e.chatType?.toLowerCase().includes(n)??!1;case"provider":return pr(e).some(i=>i.includes(n));case"model":return hr(e).some(i=>i.includes(n));case"tool":return Ab(e).some(i=>i.includes(n));case"label":return e.label?.toLowerCase().includes(n)??!1;case"key":case"session":case"id":if(n.includes("*")||n.includes("?")){const i=kb(n);return i.test(e.key)||(e.sessionId?i.test(e.sessionId):!1)}return e.key.toLowerCase().includes(n)||(e.sessionId?.toLowerCase().includes(n)??!1);case"has":switch(n){case"tools":return(e.usage?.toolUsage?.totalCalls??0)>0;case"errors":return(e.usage?.messageCounts?.errors??0)>0;case"context":return!!e.contextWeight;case"usage":return!!e.usage;case"model":return hr(e).length>0;case"provider":return pr(e).length>0;default:return!0}case"mintokens":{const i=ct(n);return i===null?!0:(e.usage?.totalTokens??0)>=i}case"maxtokens":{const i=ct(n);return i===null?!0:(e.usage?.totalTokens??0)<=i}case"mincost":{const i=ct(n);return i===null?!0:(e.usage?.totalCost??0)>=i}case"maxcost":{const i=ct(n);return i===null?!0:(e.usage?.totalCost??0)<=i}case"minmessages":{const i=ct(n);return i===null?!0:(e.usage?.messageCounts?.total??0)>=i}case"maxmessages":{const i=ct(n);return i===null?!0:(e.usage?.messageCounts?.total??0)<=i}default:return!0}},Tb=(e,t)=>{const n=ko(t);if(n.length===0)return{sessions:e,warnings:[]};const s=[];for(const o of n){if(!o.key)continue;const a=Jn(o.key);if(!wb.has(a)){s.push(`Unknown filter: ${o.key}`);continue}if(o.value===""&&s.push(`Missing value for ${o.key}`),a==="has"){const l=new Set(["tools","errors","context","usage","model","provider"]);o.value&&!l.has(Jn(o.value))&&s.push(`Unknown has:${o.value}`)}["mintokens","maxtokens","mincost","maxcost","minmessages","maxmessages"].includes(a)&&o.value&&ct(o.value)===null&&s.push(`Invalid number for ${o.key}`)}return{sessions:e.filter(o=>n.every(a=>Cb(o,a))),warnings:s}};function _b(e){const t=e.split(`
`),n=new Map,s=[];for(const l of t){const c=/^\[Tool:\s*([^\]]+)\]/.exec(l.trim());if(c){const u=c[1];n.set(u,(n.get(u)??0)+1);continue}l.trim().startsWith("[Tool Result]")||s.push(l)}const i=Array.from(n.entries()).toSorted((l,c)=>c[1]-l[1]),o=i.reduce((l,[,c])=>l+c,0),a=i.length>0?`Tools: ${i.map(([l,c])=>`${l}×${c}`).join(", ")} (${o} calls)`:"";return{tools:i,summary:a,cleanContent:s.join(`
`).trim()}}const Lb=`
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
`,Eb=4;function rt(e){return Math.round(e/Eb)}function O(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}K`:String(e)}function Ib(e){const t=new Date;return t.setHours(e,0,0,0),t.toLocaleTimeString(void 0,{hour:"numeric"})}function Mb(e,t){const n=Array.from({length:24},()=>0),s=Array.from({length:24},()=>0);for(const i of e){const o=i.usage;if(!o?.messageCounts||o.messageCounts.total===0)continue;const a=o.firstActivity??i.updatedAt,l=o.lastActivity??i.updatedAt;if(!a||!l)continue;const c=Math.min(a,l),u=Math.max(a,l),p=Math.max(u-c,1)/6e4;let f=c;for(;f<u;){const m=new Date(f),d=So(m,t),v=Ao(m,t),b=Math.min(v.getTime(),u),k=Math.max((b-f)/6e4,0)/p;n[d]+=o.messageCounts.errors*k,s[d]+=o.messageCounts.total*k,f=b+1}}return s.map((i,o)=>{const a=n[o],l=i>0?a/i:0;return{hour:o,rate:l,errors:a,msgs:i}}).filter(i=>i.msgs>0&&i.errors>0).toSorted((i,o)=>o.rate-i.rate).slice(0,5).map(i=>({label:Ib(i.hour),value:`${(i.rate*100).toFixed(2)}%`,sub:`${Math.round(i.errors)} errors · ${Math.round(i.msgs)} msgs`}))}const Rb=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];function So(e,t){return t==="utc"?e.getUTCHours():e.getHours()}function Pb(e,t){return t==="utc"?e.getUTCDay():e.getDay()}function Ao(e,t){const n=new Date(e);return t==="utc"?n.setUTCMinutes(59,59,999):n.setMinutes(59,59,999),n}function Db(e,t){const n=Array.from({length:24},()=>0),s=Array.from({length:7},()=>0);let i=0,o=!1;for(const l of e){const c=l.usage;if(!c||!c.totalTokens||c.totalTokens<=0)continue;i+=c.totalTokens;const u=c.firstActivity??l.updatedAt,g=c.lastActivity??l.updatedAt;if(!u||!g)continue;o=!0;const p=Math.min(u,g),f=Math.max(u,g),d=Math.max(f-p,1)/6e4;let v=p;for(;v<f;){const b=new Date(v),S=So(b,t),k=Pb(b,t),C=Ao(b,t),A=Math.min(C.getTime(),f),_=Math.max((A-v)/6e4,0)/d;n[S]+=c.totalTokens*_,s[k]+=c.totalTokens*_,v=A+1}}const a=Rb.map((l,c)=>({label:l,tokens:s[c]}));return{hasData:o,totalTokens:i,hourTotals:n,weekdayTotals:a}}function Nb(e,t,n,s){const i=Db(e,t);if(!i.hasData)return r`
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
            ${i.hourTotals.map((l,c)=>{const u=Math.min(l/o,1),g=l>0?`rgba(255, 77, 77, ${.08+u*.7})`:"transparent",p=`${c}:00 · ${O(l)} tokens`,f=u>.7?"rgba(255, 77, 77, 0.6)":"rgba(255, 77, 77, 0.2)",m=n.includes(c);return r`
                <div
                  class="usage-hour-cell ${m?"selected":""}"
                  style="background: ${g}; border-color: ${f};"
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
  `}function V(e,t=2){return`$${e.toFixed(t)}`}function Js(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function oc(e){const t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!t)return null;const[,n,s,i]=t,o=new Date(Date.UTC(Number(n),Number(s)-1,Number(i)));return Number.isNaN(o.valueOf())?null:o}function ac(e){const t=oc(e);return t?t.toLocaleDateString(void 0,{month:"short",day:"numeric"}):e}function Fb(e){const t=oc(e);return t?t.toLocaleDateString(void 0,{month:"long",day:"numeric",year:"numeric"}):e}function Xs(e,t,n="text/plain"){const s=new Blob([t],{type:n}),i=URL.createObjectURL(s),o=document.createElement("a");o.href=i,o.download=e,o.click(),URL.revokeObjectURL(i)}function Ob(e){return e.includes('"')||e.includes(",")||e.includes(`
`)?`"${e.replace(/"/g,'""')}"`:e}function Xn(e){return e.map(t=>t==null?"":Ob(String(t))).join(",")}const Pn=()=>({input:0,output:0,cacheRead:0,cacheWrite:0,totalTokens:0,totalCost:0,inputCost:0,outputCost:0,cacheReadCost:0,cacheWriteCost:0,missingCostEntries:0}),Dn=(e,t)=>{e.input+=t.input??0,e.output+=t.output??0,e.cacheRead+=t.cacheRead??0,e.cacheWrite+=t.cacheWrite??0,e.totalTokens+=t.totalTokens??0,e.totalCost+=t.totalCost??0,e.inputCost+=t.inputCost??0,e.outputCost+=t.outputCost??0,e.cacheReadCost+=t.cacheReadCost??0,e.cacheWriteCost+=t.cacheWriteCost??0,e.missingCostEntries+=t.missingCostEntries??0},Bb=(e,t)=>{if(e.length===0)return t??{messages:{total:0,user:0,assistant:0,toolCalls:0,toolResults:0,errors:0},tools:{totalCalls:0,uniqueTools:0,tools:[]},byModel:[],byProvider:[],byAgent:[],byChannel:[],daily:[]};const n={total:0,user:0,assistant:0,toolCalls:0,toolResults:0,errors:0},s=new Map,i=new Map,o=new Map,a=new Map,l=new Map,c=new Map,u=new Map,g=new Map,p={count:0,sum:0,min:Number.POSITIVE_INFINITY,max:0,p95Max:0};for(const f of e){const m=f.usage;if(m){if(m.messageCounts&&(n.total+=m.messageCounts.total,n.user+=m.messageCounts.user,n.assistant+=m.messageCounts.assistant,n.toolCalls+=m.messageCounts.toolCalls,n.toolResults+=m.messageCounts.toolResults,n.errors+=m.messageCounts.errors),m.toolUsage)for(const d of m.toolUsage.tools)s.set(d.name,(s.get(d.name)??0)+d.count);if(m.modelUsage)for(const d of m.modelUsage){const v=`${d.provider??"unknown"}::${d.model??"unknown"}`,b=i.get(v)??{provider:d.provider,model:d.model,count:0,totals:Pn()};b.count+=d.count,Dn(b.totals,d.totals),i.set(v,b);const S=d.provider??"unknown",k=o.get(S)??{provider:d.provider,model:void 0,count:0,totals:Pn()};k.count+=d.count,Dn(k.totals,d.totals),o.set(S,k)}if(m.latency){const{count:d,avgMs:v,minMs:b,maxMs:S,p95Ms:k}=m.latency;d>0&&(p.count+=d,p.sum+=v*d,p.min=Math.min(p.min,b),p.max=Math.max(p.max,S),p.p95Max=Math.max(p.p95Max,k))}if(f.agentId){const d=a.get(f.agentId)??Pn();Dn(d,m),a.set(f.agentId,d)}if(f.channel){const d=l.get(f.channel)??Pn();Dn(d,m),l.set(f.channel,d)}for(const d of m.dailyBreakdown??[]){const v=c.get(d.date)??{date:d.date,tokens:0,cost:0,messages:0,toolCalls:0,errors:0};v.tokens+=d.tokens,v.cost+=d.cost,c.set(d.date,v)}for(const d of m.dailyMessageCounts??[]){const v=c.get(d.date)??{date:d.date,tokens:0,cost:0,messages:0,toolCalls:0,errors:0};v.messages+=d.total,v.toolCalls+=d.toolCalls,v.errors+=d.errors,c.set(d.date,v)}for(const d of m.dailyLatency??[]){const v=u.get(d.date)??{date:d.date,count:0,sum:0,min:Number.POSITIVE_INFINITY,max:0,p95Max:0};v.count+=d.count,v.sum+=d.avgMs*d.count,v.min=Math.min(v.min,d.minMs),v.max=Math.max(v.max,d.maxMs),v.p95Max=Math.max(v.p95Max,d.p95Ms),u.set(d.date,v)}for(const d of m.dailyModelUsage??[]){const v=`${d.date}::${d.provider??"unknown"}::${d.model??"unknown"}`,b=g.get(v)??{date:d.date,provider:d.provider,model:d.model,tokens:0,cost:0,count:0};b.tokens+=d.tokens,b.cost+=d.cost,b.count+=d.count,g.set(v,b)}}}return{messages:n,tools:{totalCalls:Array.from(s.values()).reduce((f,m)=>f+m,0),uniqueTools:s.size,tools:Array.from(s.entries()).map(([f,m])=>({name:f,count:m})).toSorted((f,m)=>m.count-f.count)},byModel:Array.from(i.values()).toSorted((f,m)=>m.totals.totalCost-f.totals.totalCost),byProvider:Array.from(o.values()).toSorted((f,m)=>m.totals.totalCost-f.totals.totalCost),byAgent:Array.from(a.entries()).map(([f,m])=>({agentId:f,totals:m})).toSorted((f,m)=>m.totals.totalCost-f.totals.totalCost),byChannel:Array.from(l.entries()).map(([f,m])=>({channel:f,totals:m})).toSorted((f,m)=>m.totals.totalCost-f.totals.totalCost),latency:p.count>0?{count:p.count,avgMs:p.sum/p.count,minMs:p.min===Number.POSITIVE_INFINITY?0:p.min,maxMs:p.max,p95Ms:p.p95Max}:void 0,dailyLatency:Array.from(u.values()).map(f=>({date:f.date,count:f.count,avgMs:f.count?f.sum/f.count:0,minMs:f.min===Number.POSITIVE_INFINITY?0:f.min,maxMs:f.max,p95Ms:f.p95Max})).toSorted((f,m)=>f.date.localeCompare(m.date)),modelDaily:Array.from(g.values()).toSorted((f,m)=>f.date.localeCompare(m.date)||m.cost-f.cost),daily:Array.from(c.values()).toSorted((f,m)=>f.date.localeCompare(m.date))}},Ub=(e,t,n)=>{let s=0,i=0;for(const g of e){const p=g.usage?.durationMs??0;p>0&&(s+=p,i+=1)}const o=i?s/i:0,a=t&&s>0?t.totalTokens/(s/6e4):void 0,l=t&&s>0?t.totalCost/(s/6e4):void 0,c=n.messages.total?n.messages.errors/n.messages.total:0,u=n.daily.filter(g=>g.messages>0&&g.errors>0).map(g=>({date:g.date,errors:g.errors,messages:g.messages,rate:g.errors/g.messages})).toSorted((g,p)=>p.rate-g.rate||p.errors-g.errors)[0];return{durationSumMs:s,durationCount:i,avgDurationMs:o,throughputTokensPerMin:a,throughputCostPerMin:l,errorRate:c,peakErrorDay:u}},zb=e=>{const t=[Xn(["key","label","agentId","channel","provider","model","updatedAt","durationMs","messages","errors","toolCalls","inputTokens","outputTokens","cacheReadTokens","cacheWriteTokens","totalTokens","totalCost"])];for(const n of e){const s=n.usage;t.push(Xn([n.key,n.label??"",n.agentId??"",n.channel??"",n.modelProvider??n.providerOverride??"",n.model??n.modelOverride??"",n.updatedAt?new Date(n.updatedAt).toISOString():"",s?.durationMs??"",s?.messageCounts?.total??"",s?.messageCounts?.errors??"",s?.messageCounts?.toolCalls??"",s?.input??"",s?.output??"",s?.cacheRead??"",s?.cacheWrite??"",s?.totalTokens??"",s?.totalCost??""]))}return t.join(`
`)},Hb=e=>{const t=[Xn(["date","inputTokens","outputTokens","cacheReadTokens","cacheWriteTokens","totalTokens","inputCost","outputCost","cacheReadCost","cacheWriteCost","totalCost"])];for(const n of e)t.push(Xn([n.date,n.input,n.output,n.cacheRead,n.cacheWrite,n.totalTokens,n.inputCost??"",n.outputCost??"",n.cacheReadCost??"",n.cacheWriteCost??"",n.totalCost]));return t.join(`
`)},Kb=(e,t,n)=>{const s=e.trim();if(!s)return[];const i=s.length?s.split(/\s+/):[],o=i.length?i[i.length-1]:"",[a,l]=o.includes(":")?[o.slice(0,o.indexOf(":")),o.slice(o.indexOf(":")+1)]:["",""],c=a.toLowerCase(),u=l.toLowerCase(),g=k=>{const C=new Set;for(const A of k)A&&C.add(A);return Array.from(C)},p=g(t.map(k=>k.agentId)).slice(0,6),f=g(t.map(k=>k.channel)).slice(0,6),m=g([...t.map(k=>k.modelProvider),...t.map(k=>k.providerOverride),...n?.byProvider.map(k=>k.provider)??[]]).slice(0,6),d=g([...t.map(k=>k.model),...n?.byModel.map(k=>k.model)??[]]).slice(0,6),v=g(n?.tools.tools.map(k=>k.name)??[]).slice(0,6);if(!c)return[{label:"agent:",value:"agent:"},{label:"channel:",value:"channel:"},{label:"provider:",value:"provider:"},{label:"model:",value:"model:"},{label:"tool:",value:"tool:"},{label:"has:errors",value:"has:errors"},{label:"has:tools",value:"has:tools"},{label:"minTokens:",value:"minTokens:"},{label:"maxCost:",value:"maxCost:"}];const b=[],S=(k,C)=>{for(const A of C)(!u||A.toLowerCase().includes(u))&&b.push({label:`${k}:${A}`,value:`${k}:${A}`})};switch(c){case"agent":S("agent",p);break;case"channel":S("channel",f);break;case"provider":S("provider",m);break;case"model":S("model",d);break;case"tool":S("tool",v);break;case"has":["errors","tools","context","usage","model","provider"].forEach(k=>{(!u||k.includes(u))&&b.push({label:`has:${k}`,value:`has:${k}`})});break}return b},jb=(e,t)=>{const n=e.trim();if(!n)return`${t} `;const s=n.split(/\s+/);return s[s.length-1]=t,`${s.join(" ")} `},dt=e=>e.trim().toLowerCase(),Wb=(e,t)=>{const n=e.trim();if(!n)return`${t} `;const s=n.split(/\s+/),i=s[s.length-1]??"",o=t.includes(":")?t.split(":")[0]:null,a=i.includes(":")?i.split(":")[0]:null;return i.endsWith(":")&&o&&a===o?(s[s.length-1]=t,`${s.join(" ")} `):s.includes(t)?`${s.join(" ")} `:`${s.join(" ")} ${t} `},fr=(e,t)=>{const s=e.trim().split(/\s+/).filter(Boolean).filter(i=>i!==t);return s.length?`${s.join(" ")} `:""},vr=(e,t,n)=>{const s=dt(t),o=[...ko(e).filter(a=>dt(a.key??"")!==s).map(a=>a.raw),...n.map(a=>`${t}:${a}`)];return o.length?`${o.join(" ")} `:""};function pe(e,t){return t===0?0:e/t*100}function Gb(e){const t=e.totalCost||0;return{input:{tokens:e.input,cost:e.inputCost||0,pct:pe(e.inputCost||0,t)},output:{tokens:e.output,cost:e.outputCost||0,pct:pe(e.outputCost||0,t)},cacheRead:{tokens:e.cacheRead,cost:e.cacheReadCost||0,pct:pe(e.cacheReadCost||0,t)},cacheWrite:{tokens:e.cacheWrite,cost:e.cacheWriteCost||0,pct:pe(e.cacheWriteCost||0,t)},totalCost:t}}function qb(e,t,n,s,i,o,a,l){if(!(e.length>0||t.length>0||n.length>0))return h;const u=n.length===1?s.find(d=>d.key===n[0]):null,g=u?(u.label||u.key).slice(0,20)+((u.label||u.key).length>20?"…":""):n.length===1?n[0].slice(0,8)+"…":`${n.length} sessions`,p=u?u.label||u.key:n.length===1?n[0]:n.join(", "),f=e.length===1?e[0]:`${e.length} days`,m=t.length===1?`${t[0]}:00`:`${t.length} hours`;return r`
    <div class="active-filters">
      ${e.length>0?r`
            <div class="filter-chip">
              <span class="filter-chip-label">Days: ${f}</span>
              <button class="filter-chip-remove" @click=${i} title="Remove filter">×</button>
            </div>
          `:h}
      ${t.length>0?r`
            <div class="filter-chip">
              <span class="filter-chip-label">Hours: ${m}</span>
              <button class="filter-chip-remove" @click=${o} title="Remove filter">×</button>
            </div>
          `:h}
      ${n.length>0?r`
            <div class="filter-chip" title="${p}">
              <span class="filter-chip-label">Session: ${g}</span>
              <button class="filter-chip-remove" @click=${a} title="Remove filter">×</button>
            </div>
          `:h}
      ${(e.length>0||t.length>0)&&n.length>0?r`
            <button class="btn btn-sm filter-clear-btn" @click=${l}>
              Clear All
            </button>
          `:h}
    </div>
  `}function Vb(e,t,n,s,i,o){if(!e.length)return r`
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
          ${e.map((p,f)=>{const d=l[f]/c*100,v=t.includes(p.date),b=ac(p.date),S=e.length>20?String(parseInt(p.date.slice(8),10)):b,k=e.length>20?"font-size: 8px":"",C=s==="by-type"?a?[{value:p.output,class:"output"},{value:p.input,class:"input"},{value:p.cacheWrite,class:"cache-write"},{value:p.cacheRead,class:"cache-read"}]:[{value:p.outputCost??0,class:"output"},{value:p.inputCost??0,class:"input"},{value:p.cacheWriteCost??0,class:"cache-write"},{value:p.cacheReadCost??0,class:"cache-read"}]:[],A=s==="by-type"?a?[`Output ${O(p.output)}`,`Input ${O(p.input)}`,`Cache write ${O(p.cacheWrite)}`,`Cache read ${O(p.cacheRead)}`]:[`Output ${V(p.outputCost??0)}`,`Input ${V(p.inputCost??0)}`,`Cache write ${V(p.cacheWriteCost??0)}`,`Cache read ${V(p.cacheReadCost??0)}`]:[],T=a?O(p.totalTokens):V(p.totalCost);return r`
              <div
                class="daily-bar-wrapper ${v?"selected":""}"
                @click=${_=>o(p.date,_.shiftKey)}
              >
                ${s==="by-type"?r`
                        <div
                          class="daily-bar"
                          style="height: ${d.toFixed(1)}%; display: flex; flex-direction: column;"
                        >
                          ${(()=>{const _=C.reduce((M,G)=>M+G.value,0)||1;return C.map(M=>r`
                                <div
                                  class="cost-segment ${M.class}"
                                  style="height: ${M.value/_*100}%"
                                ></div>
                              `)})()}
                        </div>
                      `:r`
                        <div class="daily-bar" style="height: ${d.toFixed(1)}%"></div>
                      `}
                ${g?r`<div class="daily-bar-total">${T}</div>`:h}
                <div class="daily-bar-label" style="${k}">${S}</div>
                <div class="daily-bar-tooltip">
                  <strong>${Fb(p.date)}</strong><br />
                  ${O(p.totalTokens)} tokens<br />
                  ${V(p.totalCost)}
                  ${A.length?r`${A.map(_=>r`<div>${_}</div>`)}`:h}
                </div>
              </div>
            `})}
        </div>
      </div>
    </div>
  `}function Qb(e,t){const n=Gb(e),s=t==="tokens",i=e.totalTokens||1,o={output:pe(e.output,i),input:pe(e.input,i),cacheWrite:pe(e.cacheWrite,i),cacheRead:pe(e.cacheRead,i)};return r`
    <div class="cost-breakdown cost-breakdown-compact">
      <div class="cost-breakdown-header">${s?"Tokens":"Cost"} by Type</div>
      <div class="cost-breakdown-bar">
        <div class="cost-segment output" style="width: ${(s?o.output:n.output.pct).toFixed(1)}%"
          title="Output: ${s?O(e.output):V(n.output.cost)}"></div>
        <div class="cost-segment input" style="width: ${(s?o.input:n.input.pct).toFixed(1)}%"
          title="Input: ${s?O(e.input):V(n.input.cost)}"></div>
        <div class="cost-segment cache-write" style="width: ${(s?o.cacheWrite:n.cacheWrite.pct).toFixed(1)}%"
          title="Cache Write: ${s?O(e.cacheWrite):V(n.cacheWrite.cost)}"></div>
        <div class="cost-segment cache-read" style="width: ${(s?o.cacheRead:n.cacheRead.pct).toFixed(1)}%"
          title="Cache Read: ${s?O(e.cacheRead):V(n.cacheRead.cost)}"></div>
      </div>
      <div class="cost-breakdown-legend">
        <span class="legend-item"><span class="legend-dot output"></span>Output ${s?O(e.output):V(n.output.cost)}</span>
        <span class="legend-item"><span class="legend-dot input"></span>Input ${s?O(e.input):V(n.input.cost)}</span>
        <span class="legend-item"><span class="legend-dot cache-write"></span>Cache Write ${s?O(e.cacheWrite):V(n.cacheWrite.cost)}</span>
        <span class="legend-item"><span class="legend-dot cache-read"></span>Cache Read ${s?O(e.cacheRead):V(n.cacheRead.cost)}</span>
      </div>
      <div class="cost-breakdown-total">
        Total: ${s?O(e.totalTokens):V(e.totalCost)}
      </div>
    </div>
  `}function ut(e,t,n){return r`
    <div class="usage-insight-card">
      <div class="usage-insight-title">${e}</div>
      ${t.length===0?r`<div class="muted">${n}</div>`:r`
              <div class="usage-list">
                ${t.map(s=>r`
                    <div class="usage-list-item">
                      <span>${s.label}</span>
                      <span class="usage-list-value">
                        <span>${s.value}</span>
                        ${s.sub?r`<span class="usage-list-sub">${s.sub}</span>`:h}
                      </span>
                    </div>
                  `)}
              </div>
            `}
    </div>
  `}function mr(e,t,n){return r`
    <div class="usage-insight-card">
      <div class="usage-insight-title">${e}</div>
      ${t.length===0?r`<div class="muted">${n}</div>`:r`
              <div class="usage-error-list">
                ${t.map(s=>r`
                    <div class="usage-error-row">
                      <div class="usage-error-date">${s.label}</div>
                      <div class="usage-error-rate">${s.value}</div>
                      ${s.sub?r`<div class="usage-error-sub">${s.sub}</div>`:h}
                    </div>
                  `)}
              </div>
            `}
    </div>
  `}function Yb(e,t,n,s,i,o,a){if(!e)return h;const l=t.messages.total?Math.round(e.totalTokens/t.messages.total):0,c=t.messages.total?e.totalCost/t.messages.total:0,u=e.input+e.cacheRead,g=u>0?e.cacheRead/u:0,p=u>0?`${(g*100).toFixed(1)}%`:"—",f=n.errorRate*100,m=n.throughputTokensPerMin!==void 0?`${O(Math.round(n.throughputTokensPerMin))} tok/min`:"—",d=n.throughputCostPerMin!==void 0?`${V(n.throughputCostPerMin,4)} / min`:"—",v=n.durationCount>0?Wi(n.avgDurationMs,{spaced:!0})??"—":"—",b="Cache hit rate = cache read / (input + cache read). Higher is better.",S="Error rate = errors / total messages. Lower is better.",k="Throughput shows tokens per minute over active time. Higher is better.",C="Average tokens per message in this range.",A=s?"Average cost per message when providers report costs. Cost data is missing for some or all sessions in this range.":"Average cost per message when providers report costs.",T=t.daily.filter(N=>N.messages>0&&N.errors>0).map(N=>{const z=N.errors/N.messages;return{label:ac(N.date),value:`${(z*100).toFixed(2)}%`,sub:`${N.errors} errors · ${N.messages} msgs · ${O(N.tokens)}`,rate:z}}).toSorted((N,z)=>z.rate-N.rate).slice(0,5).map(({rate:N,...z})=>z),_=t.byModel.slice(0,5).map(N=>({label:N.model??"unknown",value:V(N.totals.totalCost),sub:`${O(N.totals.totalTokens)} · ${N.count} msgs`})),M=t.byProvider.slice(0,5).map(N=>({label:N.provider??"unknown",value:V(N.totals.totalCost),sub:`${O(N.totals.totalTokens)} · ${N.count} msgs`})),G=t.tools.tools.slice(0,6).map(N=>({label:N.name,value:`${N.count}`,sub:"calls"})),K=t.byAgent.slice(0,5).map(N=>({label:N.agentId,value:V(N.totals.totalCost),sub:O(N.totals.totalTokens)})),se=t.byChannel.slice(0,5).map(N=>({label:N.channel,value:V(N.totals.totalCost),sub:O(N.totals.totalTokens)}));return r`
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
            <span class="usage-summary-hint" title=${C}>?</span>
          </div>
          <div class="usage-summary-value">${O(l)}</div>
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
            <span class="usage-summary-hint" title=${k}>?</span>
          </div>
          <div class="usage-summary-value">${m}</div>
          <div class="usage-summary-sub">${d}</div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            Error Rate
            <span class="usage-summary-hint" title=${S}>?</span>
          </div>
          <div class="usage-summary-value ${f>5?"bad":f>1?"warn":"good"}">${f.toFixed(2)}%</div>
          <div class="usage-summary-sub">
            ${t.messages.errors} errors · ${v} avg session
          </div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            Cache Hit Rate
            <span class="usage-summary-hint" title=${b}>?</span>
          </div>
          <div class="usage-summary-value ${g>.6?"good":g>.3?"warn":"bad"}">${p}</div>
          <div class="usage-summary-sub">
            ${O(e.cacheRead)} cached · ${O(u)} prompt
          </div>
        </div>
      </div>
      <div class="usage-insights-grid">
        ${ut("Top Models",_,"No model data")}
        ${ut("Top Providers",M,"No provider data")}
        ${ut("Top Tools",G,"No tool calls")}
        ${ut("Top Agents",K,"No agent data")}
        ${ut("Top Channels",se,"No channel data")}
        ${mr("Peak Error Days",T,"No error data")}
        ${mr("Peak Error Hours",i,"No error data")}
      </div>
    </section>
  `}function Zb(e,t,n,s,i,o,a,l,c,u,g,p,f,m,d){const v=L=>f.includes(L),b=L=>{const B=L.label||L.key;return B.startsWith("agent:")&&B.includes("?token=")?B.slice(0,B.indexOf("?token=")):B},S=async L=>{const B=b(L);try{await navigator.clipboard.writeText(B)}catch{}},k=L=>{const B=[];return v("channel")&&L.channel&&B.push(`channel:${L.channel}`),v("agent")&&L.agentId&&B.push(`agent:${L.agentId}`),v("provider")&&(L.modelProvider||L.providerOverride)&&B.push(`provider:${L.modelProvider??L.providerOverride}`),v("model")&&L.model&&B.push(`model:${L.model}`),v("messages")&&L.usage?.messageCounts&&B.push(`msgs:${L.usage.messageCounts.total}`),v("tools")&&L.usage?.toolUsage&&B.push(`tools:${L.usage.toolUsage.totalCalls}`),v("errors")&&L.usage?.messageCounts&&B.push(`errors:${L.usage.messageCounts.errors}`),v("duration")&&L.usage?.durationMs&&B.push(`dur:${Wi(L.usage.durationMs,{spaced:!0})??"—"}`),B},C=L=>{const B=L.usage;if(!B)return 0;if(n.length>0&&B.dailyBreakdown&&B.dailyBreakdown.length>0){const ae=B.dailyBreakdown.filter(re=>n.includes(re.date));return s?ae.reduce((re,ee)=>re+ee.tokens,0):ae.reduce((re,ee)=>re+ee.cost,0)}return s?B.totalTokens??0:B.totalCost??0},A=[...e].toSorted((L,B)=>{switch(i){case"recent":return(B.updatedAt??0)-(L.updatedAt??0);case"messages":return(B.usage?.messageCounts?.total??0)-(L.usage?.messageCounts?.total??0);case"errors":return(B.usage?.messageCounts?.errors??0)-(L.usage?.messageCounts?.errors??0);case"cost":return C(B)-C(L);default:return C(B)-C(L)}}),T=o==="asc"?A.toReversed():A,_=T.reduce((L,B)=>L+C(B),0),M=T.length?_/T.length:0,G=T.reduce((L,B)=>L+(B.usage?.messageCounts?.errors??0),0),K=new Set(t),se=T.filter(L=>K.has(L.key)),N=se.length,z=new Map(T.map(L=>[L.key,L])),de=a.map(L=>z.get(L)).filter(L=>!!L);return r`
    <div class="card sessions-card">
      <div class="sessions-card-header">
        <div class="card-title">Sessions</div>
        <div class="sessions-card-count">
          ${e.length} shown${m!==e.length?` · ${m} total`:""}
        </div>
      </div>
      <div class="sessions-card-meta">
        <div class="sessions-card-stats">
          <span>${s?O(M):V(M)} avg</span>
          <span>${G} errors</span>
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
                <button class="btn btn-sm sessions-action-btn sessions-clear-btn" @click=${d}>
                  Clear Selection
                </button>
              `:h}
      </div>
      ${l==="recent"?de.length===0?r`
                <div class="muted" style="padding: 20px; text-align: center">No recent sessions</div>
              `:r`
                <div class="session-bars" style="max-height: 220px; margin-top: 6px;">
                  ${de.map(L=>{const B=C(L),ae=K.has(L.key),re=b(L),ee=k(L);return r`
                      <div
                        class="session-bar-row ${ae?"selected":""}"
                        @click=${ie=>c(L.key,ie.shiftKey)}
                        title="${L.key}"
                      >
                        <div class="session-bar-label">
                          <div class="session-bar-title">${re}</div>
                          ${ee.length>0?r`<div class="session-bar-meta">${ee.join(" · ")}</div>`:h}
                        </div>
                        <div class="session-bar-track" style="display: none;"></div>
                        <div class="session-bar-actions">
                          <button
                            class="session-copy-btn"
                            title="Copy session name"
                            @click=${ie=>{ie.stopPropagation(),S(L)}}
                          >
                            Copy
                          </button>
                          <div class="session-bar-value">${s?O(B):V(B)}</div>
                        </div>
                      </div>
                    `})}
                </div>
              `:e.length===0?r`
                <div class="muted" style="padding: 20px; text-align: center">No sessions in range</div>
              `:r`
                <div class="session-bars">
                  ${T.slice(0,50).map(L=>{const B=C(L),ae=t.includes(L.key),re=b(L),ee=k(L);return r`
                      <div
                        class="session-bar-row ${ae?"selected":""}"
                        @click=${ie=>c(L.key,ie.shiftKey)}
                        title="${L.key}"
                      >
                        <div class="session-bar-label">
                          <div class="session-bar-title">${re}</div>
                          ${ee.length>0?r`<div class="session-bar-meta">${ee.join(" · ")}</div>`:h}
                        </div>
                        <div class="session-bar-track" style="display: none;"></div>
                        <div class="session-bar-actions">
                          <button
                            class="session-copy-btn"
                            title="Copy session name"
                            @click=${ie=>{ie.stopPropagation(),S(L)}}
                          >
                            Copy
                          </button>
                          <div class="session-bar-value">${s?O(B):V(B)}</div>
                        </div>
                      </div>
                    `})}
                  ${e.length>50?r`<div class="muted" style="padding: 8px; text-align: center; font-size: 11px;">+${e.length-50} more</div>`:h}
                </div>
              `}
      ${N>1?r`
              <div style="margin-top: 10px;">
                <div class="sessions-card-count">Selected (${N})</div>
                <div class="session-bars" style="max-height: 160px; margin-top: 6px;">
                  ${se.map(L=>{const B=C(L),ae=b(L),re=k(L);return r`
                      <div
                        class="session-bar-row selected"
                        @click=${ee=>c(L.key,ee.shiftKey)}
                        title="${L.key}"
                      >
                        <div class="session-bar-label">
                          <div class="session-bar-title">${ae}</div>
                          ${re.length>0?r`<div class="session-bar-meta">${re.join(" · ")}</div>`:h}
                        </div>
                  <div class="session-bar-track" style="display: none;"></div>
                        <div class="session-bar-actions">
                          <button
                            class="session-copy-btn"
                            title="Copy session name"
                            @click=${ee=>{ee.stopPropagation(),S(L)}}
                          >
                            Copy
                          </button>
                          <div class="session-bar-value">${s?O(B):V(B)}</div>
                        </div>
                      </div>
                    `})}
                </div>
              </div>
            `:h}
    </div>
  `}function Jb(){return h}function Xb(e){const t=e.usage;if(!t)return r`
      <div class="muted">No usage data for this session.</div>
    `;const n=a=>a?new Date(a).toLocaleString():"—",s=[];e.channel&&s.push(`channel:${e.channel}`),e.agentId&&s.push(`agent:${e.agentId}`),(e.modelProvider||e.providerOverride)&&s.push(`provider:${e.modelProvider??e.providerOverride}`),e.model&&s.push(`model:${e.model}`);const i=t.toolUsage?.tools.slice(0,6).map(a=>({label:a.name,value:`${a.count}`,sub:"calls"}))??[],o=t.modelUsage?.slice(0,6).map(a=>({label:a.model??"unknown",value:V(a.totals.totalCost),sub:O(a.totals.totalTokens)}))??[];return r`
    ${s.length>0?r`<div class="usage-badges">${s.map(a=>r`<span class="usage-badge">${a}</span>`)}</div>`:h}
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
        <div class="session-summary-value">${Wi(t.durationMs,{spaced:!0})??"—"}</div>
        <div class="session-summary-meta">${n(t.firstActivity)} → ${n(t.lastActivity)}</div>
      </div>
    </div>
    <div class="usage-insights-grid" style="margin-top: 12px;">
      ${ut("Top Tools",i,"No tool calls")}
      ${ut("Model Mix",o,"No model data")}
    </div>
  `}function ey(e,t,n,s,i,o,a,l,c,u,g,p,f,m,d,v,b,S,k,C,A,T,_){const M=e.label||e.key,G=M.length>50?M.slice(0,50)+"…":M,K=e.usage;return r`
    <div class="card session-detail-panel">
      <div class="session-detail-header">
        <div class="session-detail-header-left">
          <div class="session-detail-title">${G}</div>
        </div>
        <div class="session-detail-stats">
          ${K?r`
            <span><strong>${O(K.totalTokens)}</strong> tokens</span>
            <span><strong>${V(K.totalCost)}</strong></span>
          `:h}
        </div>
        <button class="session-close-btn" @click=${_} title="Close session details">×</button>
      </div>
      <div class="session-detail-content">
        ${Xb(e)}
        <div class="session-detail-row">
          ${ty(t,n,s,i,o,a,l,c,u)}
        </div>
        <div class="session-detail-bottom">
          ${sy(g,p,f,m,d,v,b,S,k,C)}
          ${ny(e.contextWeight,K,A,T)}
        </div>
      </div>
    </div>
  `}function ty(e,t,n,s,i,o,a,l,c){if(t)return r`
      <div class="session-timeseries-compact">
        <div class="muted" style="padding: 20px; text-align: center">Loading...</div>
      </div>
    `;if(!e||e.points.length<2)return r`
      <div class="session-timeseries-compact">
        <div class="muted" style="padding: 20px; text-align: center">No timeline data</div>
      </div>
    `;let u=e.points;if(a||l||c&&c.length>0){const z=a?new Date(a+"T00:00:00").getTime():0,de=l?new Date(l+"T23:59:59").getTime():1/0;u=e.points.filter(L=>{if(L.timestamp<z||L.timestamp>de)return!1;if(c&&c.length>0){const B=new Date(L.timestamp),ae=`${B.getFullYear()}-${String(B.getMonth()+1).padStart(2,"0")}-${String(B.getDate()).padStart(2,"0")}`;return c.includes(ae)}return!0})}if(u.length<2)return r`
      <div class="session-timeseries-compact">
        <div class="muted" style="padding: 20px; text-align: center">No data in range</div>
      </div>
    `;let g=0,p=0,f=0,m=0,d=0,v=0;u=u.map(z=>(g+=z.totalTokens,p+=z.cost,f+=z.output,m+=z.input,d+=z.cacheRead,v+=z.cacheWrite,{...z,cumulativeTokens:g,cumulativeCost:p}));const b=400,S=80,k={top:16,right:10,bottom:20,left:40},C=b-k.left-k.right,A=S-k.top-k.bottom,T=n==="cumulative",_=n==="per-turn"&&i==="by-type",M=f+m+d+v,G=u.map(z=>T?z.cumulativeTokens:_?z.input+z.output+z.cacheRead+z.cacheWrite:z.totalTokens),K=Math.max(...G,1),se=Math.max(2,Math.min(8,C/u.length*.7)),N=Math.max(1,(C-se*u.length)/(u.length-1||1));return r`
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
          ${T?h:r`
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
      <svg viewBox="0 0 ${b} ${S+15}" class="timeseries-svg" style="width: 100%; height: auto;">
        <!-- Y axis -->
        <line x1="${k.left}" y1="${k.top}" x2="${k.left}" y2="${k.top+A}" stroke="var(--border)" />
        <!-- X axis -->
        <line x1="${k.left}" y1="${k.top+A}" x2="${b-k.right}" y2="${k.top+A}" stroke="var(--border)" />
        <!-- Y axis labels -->
        <text x="${k.left-4}" y="${k.top+4}" text-anchor="end" class="axis-label" style="font-size: 9px; fill: var(--text-muted)">${O(K)}</text>
        <text x="${k.left-4}" y="${k.top+A}" text-anchor="end" class="axis-label" style="font-size: 9px; fill: var(--text-muted)">0</text>
        <!-- X axis labels (first and last) -->
        ${u.length>0?kn`
          <text x="${k.left}" y="${k.top+A+12}" text-anchor="start" style="font-size: 8px; fill: var(--text-muted)">${new Date(u[0].timestamp).toLocaleDateString(void 0,{month:"short",day:"numeric"})}</text>
          <text x="${b-k.right}" y="${k.top+A+12}" text-anchor="end" style="font-size: 8px; fill: var(--text-muted)">${new Date(u[u.length-1].timestamp).toLocaleDateString(void 0,{month:"short",day:"numeric"})}</text>
        `:h}
        <!-- Bars -->
        ${u.map((z,de)=>{const L=G[de],B=k.left+de*(se+N),ae=L/K*A,re=k.top+A-ae,ie=[new Date(z.timestamp).toLocaleDateString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),`${O(L)} tokens`];_&&(ie.push(`Output ${O(z.output)}`),ie.push(`Input ${O(z.input)}`),ie.push(`Cache write ${O(z.cacheWrite)}`),ie.push(`Cache read ${O(z.cacheRead)}`));const I=ie.join(" · ");if(!_)return kn`<rect x="${B}" y="${re}" width="${se}" height="${ae}" class="ts-bar" rx="1" style="cursor: pointer;"><title>${I}</title></rect>`;const R=[{value:z.output,class:"output"},{value:z.input,class:"input"},{value:z.cacheWrite,class:"cache-write"},{value:z.cacheRead,class:"cache-read"}];let P=k.top+A;return kn`
            ${R.map(H=>{if(H.value<=0||L<=0)return h;const $e=ae*(H.value/L);return P-=$e,kn`<rect x="${B}" y="${P}" width="${se}" height="${$e}" class="ts-bar ${H.class}" rx="1"><title>${I}</title></rect>`})}
          `})}
      </svg>
      <div class="timeseries-summary">${u.length} msgs · ${O(g)} · ${V(p)}</div>
      ${_?r`
              <div style="margin-top: 8px;">
                <div class="card-title" style="font-size: 12px; margin-bottom: 6px;">Tokens by Type</div>
                <div class="cost-breakdown-bar" style="height: 18px;">
                  <div class="cost-segment output" style="width: ${pe(f,M).toFixed(1)}%"></div>
                  <div class="cost-segment input" style="width: ${pe(m,M).toFixed(1)}%"></div>
                  <div class="cost-segment cache-write" style="width: ${pe(v,M).toFixed(1)}%"></div>
                  <div class="cost-segment cache-read" style="width: ${pe(d,M).toFixed(1)}%"></div>
                </div>
                <div class="cost-breakdown-legend">
                  <div class="legend-item" title="Assistant output tokens">
                    <span class="legend-dot output"></span>Output ${O(f)}
                  </div>
                  <div class="legend-item" title="User + tool input tokens">
                    <span class="legend-dot input"></span>Input ${O(m)}
                  </div>
                  <div class="legend-item" title="Tokens written to cache">
                    <span class="legend-dot cache-write"></span>Cache Write ${O(v)}
                  </div>
                  <div class="legend-item" title="Tokens read from cache">
                    <span class="legend-dot cache-read"></span>Cache Read ${O(d)}
                  </div>
                </div>
                <div class="cost-breakdown-total">Total: ${O(M)}</div>
              </div>
            `:h}
    </div>
  `}function ny(e,t,n,s){if(!e)return r`
      <div class="context-details-panel">
        <div class="muted" style="padding: 20px; text-align: center">No context data</div>
      </div>
    `;const i=rt(e.systemPrompt.chars),o=rt(e.skills.promptChars),a=rt(e.tools.listChars+e.tools.schemaChars),l=rt(e.injectedWorkspaceFiles.reduce((C,A)=>C+A.injectedChars,0)),c=i+o+a+l;let u="";if(t&&t.totalTokens>0){const C=t.input+t.cacheRead;C>0&&(u=`~${Math.min(c/C*100,100).toFixed(0)}% of input`)}const g=e.skills.entries.toSorted((C,A)=>A.blockChars-C.blockChars),p=e.tools.entries.toSorted((C,A)=>A.summaryChars+A.schemaChars-(C.summaryChars+C.schemaChars)),f=e.injectedWorkspaceFiles.toSorted((C,A)=>A.injectedChars-C.injectedChars),m=4,d=n,v=d?g:g.slice(0,m),b=d?p:p.slice(0,m),S=d?f:f.slice(0,m),k=g.length>m||p.length>m||f.length>m;return r`
    <div class="context-details-panel">
      <div class="context-breakdown-header">
        <div class="card-title" style="font-size: 13px;">System Prompt Breakdown</div>
        ${k?r`<button class="context-expand-btn" @click=${s}>
                ${d?"Collapse":"Expand all"}
              </button>`:h}
      </div>
      <p class="context-weight-desc">${u||"Base context per message"}</p>
      <div class="context-stacked-bar">
        <div class="context-segment system" style="width: ${pe(i,c).toFixed(1)}%" title="System: ~${O(i)}"></div>
        <div class="context-segment skills" style="width: ${pe(o,c).toFixed(1)}%" title="Skills: ~${O(o)}"></div>
        <div class="context-segment tools" style="width: ${pe(a,c).toFixed(1)}%" title="Tools: ~${O(a)}"></div>
        <div class="context-segment files" style="width: ${pe(l,c).toFixed(1)}%" title="Files: ~${O(l)}"></div>
      </div>
      <div class="context-legend">
        <span class="legend-item"><span class="legend-dot system"></span>Sys ~${O(i)}</span>
        <span class="legend-item"><span class="legend-dot skills"></span>Skills ~${O(o)}</span>
        <span class="legend-item"><span class="legend-dot tools"></span>Tools ~${O(a)}</span>
        <span class="legend-item"><span class="legend-dot files"></span>Files ~${O(l)}</span>
      </div>
      <div class="context-total">Total: ~${O(c)}</div>
      <div class="context-breakdown-grid">
        ${g.length>0?(()=>{const C=g.length-v.length;return r`
                  <div class="context-breakdown-card">
                    <div class="context-breakdown-title">Skills (${g.length})</div>
                    <div class="context-breakdown-list">
                      ${v.map(A=>r`
                          <div class="context-breakdown-item">
                            <span class="mono">${A.name}</span>
                            <span class="muted">~${O(rt(A.blockChars))}</span>
                          </div>
                        `)}
                    </div>
                    ${C>0?r`<div class="context-breakdown-more">+${C} more</div>`:h}
                  </div>
                `})():h}
        ${p.length>0?(()=>{const C=p.length-b.length;return r`
                  <div class="context-breakdown-card">
                    <div class="context-breakdown-title">Tools (${p.length})</div>
                    <div class="context-breakdown-list">
                      ${b.map(A=>r`
                          <div class="context-breakdown-item">
                            <span class="mono">${A.name}</span>
                            <span class="muted">~${O(rt(A.summaryChars+A.schemaChars))}</span>
                          </div>
                        `)}
                    </div>
                    ${C>0?r`<div class="context-breakdown-more">+${C} more</div>`:h}
                  </div>
                `})():h}
        ${f.length>0?(()=>{const C=f.length-S.length;return r`
                  <div class="context-breakdown-card">
                    <div class="context-breakdown-title">Files (${f.length})</div>
                    <div class="context-breakdown-list">
                      ${S.map(A=>r`
                          <div class="context-breakdown-item">
                            <span class="mono">${A.name}</span>
                            <span class="muted">~${O(rt(A.injectedChars))}</span>
                          </div>
                        `)}
                    </div>
                    ${C>0?r`<div class="context-breakdown-more">+${C} more</div>`:h}
                  </div>
                `})():h}
      </div>
    </div>
  `}function sy(e,t,n,s,i,o,a,l,c,u){if(t)return r`
      <div class="session-logs-compact">
        <div class="session-logs-header">Conversation</div>
        <div class="muted" style="padding: 20px; text-align: center">Loading...</div>
      </div>
    `;if(!e||e.length===0)return r`
      <div class="session-logs-compact">
        <div class="session-logs-header">Conversation</div>
        <div class="muted" style="padding: 20px; text-align: center">No messages</div>
      </div>
    `;const g=i.query.trim().toLowerCase(),p=e.map(S=>{const k=_b(S.content),C=k.cleanContent||S.content;return{log:S,toolInfo:k,cleanContent:C}}),f=Array.from(new Set(p.flatMap(S=>S.toolInfo.tools.map(([k])=>k)))).toSorted((S,k)=>S.localeCompare(k)),m=p.filter(S=>!(i.roles.length>0&&!i.roles.includes(S.log.role)||i.hasTools&&S.toolInfo.tools.length===0||i.tools.length>0&&!S.toolInfo.tools.some(([C])=>i.tools.includes(C))||g&&!S.cleanContent.toLowerCase().includes(g))),d=i.roles.length>0||i.tools.length>0||i.hasTools||g?`${m.length} of ${e.length}`:`${e.length}`,v=new Set(i.roles),b=new Set(i.tools);return r`
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
          @change=${S=>o(Array.from(S.target.selectedOptions).map(k=>k.value))}
        >
          <option value="user" ?selected=${v.has("user")}>User</option>
          <option value="assistant" ?selected=${v.has("assistant")}>Assistant</option>
          <option value="tool" ?selected=${v.has("tool")}>Tool</option>
          <option value="toolResult" ?selected=${v.has("toolResult")}>Tool result</option>
        </select>
        <select
          multiple
          size="4"
          @change=${S=>a(Array.from(S.target.selectedOptions).map(k=>k.value))}
        >
          ${f.map(S=>r`<option value=${S} ?selected=${b.has(S)}>${S}</option>`)}
        </select>
        <label class="usage-filters-inline" style="gap: 6px;">
          <input
            type="checkbox"
            .checked=${i.hasTools}
            @change=${S=>l(S.target.checked)}
          />
          Has tools
        </label>
        <input
          type="text"
          placeholder="Search conversation"
          .value=${i.query}
          @input=${S=>c(S.target.value)}
        />
        <button class="btn btn-sm usage-action-btn usage-secondary-btn" @click=${u}>
          Clear
        </button>
      </div>
      <div class="session-logs-list">
        ${m.map(S=>{const{log:k,toolInfo:C,cleanContent:A}=S,T=k.role==="user"?"user":"assistant",_=k.role==="user"?"You":k.role==="assistant"?"Assistant":"Tool";return r`
          <div class="session-log-entry ${T}">
            <div class="session-log-meta">
              <span class="session-log-role">${_}</span>
              <span>${new Date(k.timestamp).toLocaleString()}</span>
              ${k.tokens?r`<span>${O(k.tokens)}</span>`:h}
            </div>
            <div class="session-log-content">${A}</div>
            ${C.tools.length>0?r`
                    <details class="session-log-tools" ?open=${n}>
                      <summary>${C.summary}</summary>
                      <div class="session-log-tools-list">
                        ${C.tools.map(([M,G])=>r`
                            <span class="session-log-tools-pill">${M} × ${G}</span>
                          `)}
                      </div>
                    </details>
                  `:h}
          </div>
        `})}
        ${m.length===0?r`
                <div class="muted" style="padding: 12px">No messages match the filters.</div>
              `:h}
      </div>
    </div>
  `}function iy(e){if(e.loading&&!e.totals)return r`
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
    `;const t=e.chartMode==="tokens",n=e.query.trim().length>0,s=e.queryDraft.trim().length>0,i=[...e.sessions].toSorted((I,R)=>{const P=t?I.usage?.totalTokens??0:I.usage?.totalCost??0;return(t?R.usage?.totalTokens??0:R.usage?.totalCost??0)-P}),o=e.selectedDays.length>0?i.filter(I=>{if(I.usage?.activityDates?.length)return I.usage.activityDates.some(H=>e.selectedDays.includes(H));if(!I.updatedAt)return!1;const R=new Date(I.updatedAt),P=`${R.getFullYear()}-${String(R.getMonth()+1).padStart(2,"0")}-${String(R.getDate()).padStart(2,"0")}`;return e.selectedDays.includes(P)}):i,a=(I,R)=>{if(R.length===0)return!0;const P=I.usage,H=P?.firstActivity??I.updatedAt,$e=P?.lastActivity??I.updatedAt;if(!H||!$e)return!1;const Z=Math.min(H,$e),Se=Math.max(H,$e);let te=Z;for(;te<=Se;){const he=new Date(te),Fe=So(he,e.timeZone);if(R.includes(Fe))return!0;const Oe=Ao(he,e.timeZone);te=Math.min(Oe.getTime(),Se)+1}return!1},l=e.selectedHours.length>0?o.filter(I=>a(I,e.selectedHours)):o,c=Tb(l,e.query),u=c.sessions,g=c.warnings,p=Kb(e.queryDraft,i,e.aggregates),f=ko(e.query),m=I=>{const R=dt(I);return f.filter(P=>dt(P.key??"")===R).map(P=>P.value).filter(Boolean)},d=I=>{const R=new Set;for(const P of I)P&&R.add(P);return Array.from(R)},v=d(i.map(I=>I.agentId)).slice(0,12),b=d(i.map(I=>I.channel)).slice(0,12),S=d([...i.map(I=>I.modelProvider),...i.map(I=>I.providerOverride),...e.aggregates?.byProvider.map(I=>I.provider)??[]]).slice(0,12),k=d([...i.map(I=>I.model),...e.aggregates?.byModel.map(I=>I.model)??[]]).slice(0,12),C=d(e.aggregates?.tools.tools.map(I=>I.name)??[]).slice(0,12),A=e.selectedSessions.length===1?e.sessions.find(I=>I.key===e.selectedSessions[0])??u.find(I=>I.key===e.selectedSessions[0]):null,T=I=>I.reduce((R,P)=>(P.usage&&(R.input+=P.usage.input,R.output+=P.usage.output,R.cacheRead+=P.usage.cacheRead,R.cacheWrite+=P.usage.cacheWrite,R.totalTokens+=P.usage.totalTokens,R.totalCost+=P.usage.totalCost,R.inputCost+=P.usage.inputCost??0,R.outputCost+=P.usage.outputCost??0,R.cacheReadCost+=P.usage.cacheReadCost??0,R.cacheWriteCost+=P.usage.cacheWriteCost??0,R.missingCostEntries+=P.usage.missingCostEntries??0),R),{input:0,output:0,cacheRead:0,cacheWrite:0,totalTokens:0,totalCost:0,inputCost:0,outputCost:0,cacheReadCost:0,cacheWriteCost:0,missingCostEntries:0}),_=I=>e.costDaily.filter(P=>I.includes(P.date)).reduce((P,H)=>(P.input+=H.input,P.output+=H.output,P.cacheRead+=H.cacheRead,P.cacheWrite+=H.cacheWrite,P.totalTokens+=H.totalTokens,P.totalCost+=H.totalCost,P.inputCost+=H.inputCost??0,P.outputCost+=H.outputCost??0,P.cacheReadCost+=H.cacheReadCost??0,P.cacheWriteCost+=H.cacheWriteCost??0,P),{input:0,output:0,cacheRead:0,cacheWrite:0,totalTokens:0,totalCost:0,inputCost:0,outputCost:0,cacheReadCost:0,cacheWriteCost:0,missingCostEntries:0});let M,G;const K=i.length;if(e.selectedSessions.length>0){const I=u.filter(R=>e.selectedSessions.includes(R.key));M=T(I),G=I.length}else e.selectedDays.length>0&&e.selectedHours.length===0?(M=_(e.selectedDays),G=u.length):e.selectedHours.length>0||n?(M=T(u),G=u.length):(M=e.totals,G=K);const se=e.selectedSessions.length>0?u.filter(I=>e.selectedSessions.includes(I.key)):n||e.selectedHours.length>0?u:e.selectedDays.length>0?o:i,N=Bb(se,e.aggregates),z=e.selectedSessions.length>0?(()=>{const I=u.filter(P=>e.selectedSessions.includes(P.key)),R=new Set;for(const P of I)for(const H of P.usage?.activityDates??[])R.add(H);return R.size>0?e.costDaily.filter(P=>R.has(P.date)):e.costDaily})():e.costDaily,de=Ub(se,M,N),L=!e.loading&&!e.totals&&e.sessions.length===0,B=(M?.missingCostEntries??0)>0||(M?M.totalTokens>0&&M.totalCost===0&&M.input+M.output+M.cacheRead+M.cacheWrite>0:!1),ae=[{label:"Today",days:1},{label:"7d",days:7},{label:"30d",days:30}],re=I=>{const R=new Date,P=new Date;P.setDate(P.getDate()-(I-1)),e.onStartDateChange(Js(P)),e.onEndDateChange(Js(R))},ee=(I,R,P)=>{if(P.length===0)return h;const H=m(I),$e=new Set(H.map(te=>dt(te))),Z=P.length>0&&P.every(te=>$e.has(dt(te))),Se=H.length;return r`
      <details
        class="usage-filter-select"
        @toggle=${te=>{const he=te.currentTarget;if(!he.open)return;const Fe=Oe=>{Oe.composedPath().includes(he)||(he.open=!1,window.removeEventListener("click",Fe,!0))};window.addEventListener("click",Fe,!0)}}
      >
        <summary>
          <span>${R}</span>
          ${Se>0?r`<span class="usage-filter-badge">${Se}</span>`:r`
                  <span class="usage-filter-badge">All</span>
                `}
        </summary>
        <div class="usage-filter-popover">
          <div class="usage-filter-actions">
            <button
              class="btn btn-sm"
              @click=${te=>{te.preventDefault(),te.stopPropagation(),e.onQueryDraftChange(vr(e.queryDraft,I,P))}}
              ?disabled=${Z}
            >
              Select All
            </button>
            <button
              class="btn btn-sm"
              @click=${te=>{te.preventDefault(),te.stopPropagation(),e.onQueryDraftChange(vr(e.queryDraft,I,[]))}}
              ?disabled=${Se===0}
            >
              Clear
            </button>
          </div>
          <div class="usage-filter-options">
            ${P.map(te=>{const he=$e.has(dt(te));return r`
                <label class="usage-filter-option">
                  <input
                    type="checkbox"
                    .checked=${he}
                    @change=${Fe=>{const Oe=Fe.target,tt=`${I}:${te}`;e.onQueryDraftChange(Oe.checked?Wb(e.queryDraft,tt):fr(e.queryDraft,tt))}}
                  />
                  <span>${te}</span>
                </label>
              `})}
          </div>
        </div>
      </details>
    `},ie=Js(new Date);return r`
    <style>${Lb}</style>

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
                `:h}
          ${L?r`
                  <span class="usage-query-hint">Select a date range and click Refresh to load usage.</span>
                `:h}
        </div>
        <div class="usage-header-metrics">
          ${M?r`
                <span class="usage-metric-badge">
                  <strong>${O(M.totalTokens)}</strong> tokens
                </span>
                <span class="usage-metric-badge">
                  <strong>${V(M.totalCost)}</strong> cost
                </span>
                <span class="usage-metric-badge">
                  <strong>${G}</strong>
                  session${G!==1?"s":""}
                </span>
              `:h}
          <button
            class="usage-pin-btn ${e.headerPinned?"active":""}"
            title=${e.headerPinned?"Unpin filters":"Pin filters"}
            @click=${e.onToggleHeaderPinned}
          >
            ${e.headerPinned?"Pinned":"Pin"}
          </button>
          <details
            class="usage-export-menu"
            @toggle=${I=>{const R=I.currentTarget;if(!R.open)return;const P=H=>{H.composedPath().includes(R)||(R.open=!1,window.removeEventListener("click",P,!0))};window.addEventListener("click",P,!0)}}
          >
            <summary class="usage-export-button">Export ▾</summary>
            <div class="usage-export-popover">
              <div class="usage-export-list">
                <button
                  class="usage-export-item"
                  @click=${()=>Xs(`opensoul-usage-sessions-${ie}.csv`,zb(u),"text/csv")}
                  ?disabled=${u.length===0}
                >
                  Sessions CSV
                </button>
                <button
                  class="usage-export-item"
                  @click=${()=>Xs(`opensoul-usage-daily-${ie}.csv`,Hb(z),"text/csv")}
                  ?disabled=${z.length===0}
                >
                  Daily CSV
                </button>
                <button
                  class="usage-export-item"
                  @click=${()=>Xs(`opensoul-usage-${ie}.json`,JSON.stringify({totals:M,sessions:u,daily:z,aggregates:N},null,2),"application/json")}
                  ?disabled=${u.length===0&&z.length===0}
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
          ${qb(e.selectedDays,e.selectedHours,e.selectedSessions,e.sessions,e.onClearDays,e.onClearHours,e.onClearSessions,e.onClearFilters)}
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
            ${s||n?r`<button class="btn btn-sm usage-action-btn usage-secondary-btn" @click=${e.onClearQuery}>Clear</button>`:h}
            <span class="usage-query-hint">
              ${n?`${u.length} of ${K} sessions match`:`${K} sessions in range`}
            </span>
          </div>
        </div>
        <div class="usage-filter-row">
          ${ee("agent","Agent",v)}
          ${ee("channel","Channel",b)}
          ${ee("provider","Provider",S)}
          ${ee("model","Model",k)}
          ${ee("tool","Tool",C)}
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
                          @click=${()=>e.onQueryDraftChange(fr(e.queryDraft,R))}
                        >
                          ×
                        </button>
                      </span>
                    `})}
                </div>
              `:h}
        ${p.length>0?r`
                <div class="usage-query-suggestions">
                  ${p.map(I=>r`
                      <button
                        class="usage-query-suggestion"
                        @click=${()=>e.onQueryDraftChange(jb(e.queryDraft,I.value))}
                      >
                        ${I.label}
                      </button>
                    `)}
                </div>
              `:h}
        ${g.length>0?r`
                <div class="callout warning" style="margin-top: 8px;">
                  ${g.join(" · ")}
                </div>
              `:h}
      </div>

      ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:h}

      ${e.sessionsLimitReached?r`
              <div class="callout warning" style="margin-top: 12px">
                Showing first 1,000 sessions. Narrow date range for complete results.
              </div>
            `:h}
    </section>

    ${Yb(M,N,de,B,Mb(se,e.timeZone),G,K)}

    ${Nb(se,e.timeZone,e.selectedHours,e.onSelectHour)}

    <!-- Two-column layout: Daily+Breakdown on left, Sessions on right -->
    <div class="usage-grid">
      <div class="usage-grid-left">
        <div class="card usage-left-card">
          ${Vb(z,e.selectedDays,e.chartMode,e.dailyChartMode,e.onDailyChartModeChange,e.onSelectDay)}
          ${M?Qb(M,e.chartMode):h}
        </div>
      </div>
      <div class="usage-grid-right">
        ${Zb(u,e.selectedSessions,e.selectedDays,t,e.sessionSort,e.sessionSortDir,e.recentSessions,e.sessionsTab,e.onSelectSession,e.onSessionSortChange,e.onSessionSortDirChange,e.onSessionsTabChange,e.visibleColumns,K,e.onClearSessions)}
      </div>
    </div>

    <!-- Session Detail Panel (when selected) or Empty State -->
    ${A?ey(A,e.timeSeries,e.timeSeriesLoading,e.timeSeriesMode,e.onTimeSeriesModeChange,e.timeSeriesBreakdownMode,e.onTimeSeriesBreakdownChange,e.startDate,e.endDate,e.selectedDays,e.sessionLogs,e.sessionLogsLoading,e.sessionLogsExpanded,e.onToggleSessionLogsExpanded,{roles:e.logFilterRoles,tools:e.logFilterTools,hasTools:e.logFilterHasTools,query:e.logFilterQuery},e.onLogFilterRolesChange,e.onLogFilterToolsChange,e.onLogFilterHasToolsChange,e.onLogFilterQueryChange,e.onLogFilterClear,e.contextExpanded,e.onToggleContextExpanded,e.onClearSessions):Jb()}
  `}let ei=null;const br=e=>{ei&&clearTimeout(ei),ei=window.setTimeout(()=>{Cl(e)},400)},oy=/^data:/i,ay=/^https?:\/\//i;function ry(e){const t=e.agentsList?.agents??[],s=Mr(e.sessionKey)?.agentId??e.agentsList?.defaultId??"main",o=t.find(l=>l.id===s)?.identity,a=o?.avatarUrl??o?.avatar;if(a)return oy.test(a)||ay.test(a)?a:o?.avatarUrl}function ly(e){const t=(d,v)=>j(e.uiLocale,d,v);if(e.showOnboardingWizard){const d={step:e.onboardingStep,locale:e.onboardingLocale,loginStatus:e.onboardingLoginStatus,loginDisplayName:e.onboardingLoginDisplayName,loginAvatarUrl:e.onboardingLoginAvatarUrl,loginEmail:e.onboardingLoginEmail,loginError:e.onboardingLoginError,isExistingAccount:e.onboardingIsExistingAccount,selectedProvider:e.onboardingSelectedProvider,providerApiKey:e.onboardingProviderApiKey,providerSearchQuery:e.onboardingProviderSearchQuery,selectedChannel:e.onboardingSelectedChannel,channelToken:e.onboardingChannelToken,onLocaleChange:v=>e.setOnboardingLocale(v),onProviderSelect:v=>e.setOnboardingProvider(v),onProviderApiKeyChange:v=>e.setOnboardingProviderApiKey(v),onProviderSearchChange:v=>e.setOnboardingProviderSearchQuery(v),onChannelSelect:v=>e.setOnboardingChannel(v),onChannelTokenChange:v=>e.setOnboardingChannelToken(v),onGoogleLogin:()=>e.onboardingGoogleLogin(),onGithubLogin:()=>e.onboardingGithubLogin(),onLogout:()=>e.onboardingLogout(),onNext:()=>{if(e.onboardingStep===1&&e.onboardingIsExistingAccount&&e.onboardingLoginStatus==="success"){e.finishOnboarding();return}const v=Math.min(e.onboardingStep+1,5);e.setOnboardingStep(v)},onBack:()=>{const v=Math.max(e.onboardingStep-1,1);e.setOnboardingStep(v)},onSkip:()=>{e.onboardingStep===3?e.setOnboardingProvider(null):e.onboardingStep===4&&e.setOnboardingChannel(null);const v=Math.min(e.onboardingStep+1,5);e.setOnboardingStep(v)},onFinish:()=>e.finishOnboarding()};return sb(d)}const n=e.presenceEntries.length,s=e.sessionsResult?.count??null,i=e.cronStatus?.nextWakeAtMs??null,o=e.connected?null:t("Disconnected from gateway.","与网关断开连接。"),a=e.tab==="chat",l=a&&(e.settings.chatFocusMode||e.onboarding),c=e.onboarding?!1:e.settings.chatShowThinking,u=ry(e),g=e.chatAvatarUrl??u??null,p=e.configForm??e.configSnapshot?.config,f=hn(e.basePath??""),m=e.agentsSelectedId??e.agentsList?.defaultId??e.agentsList?.agents?.[0]?.id??null;return r`
    <div class="shell ${a?"shell--chat":""} ${l?"shell--chat-focus":""} ${e.settings.navCollapsed?"shell--nav-collapsed":""} ${e.onboarding?"shell--onboarding":""}">
      <header class="topbar">
        <div class="topbar-left">
          <button
            class="nav-collapse-toggle"
            @click=${()=>e.applySettings({...e.settings,navCollapsed:!e.settings.navCollapsed})}
            title="${e.settings.navCollapsed?t("Expand sidebar","展开侧栏"):t("Collapse sidebar","收起侧栏")}"
            aria-label="${e.settings.navCollapsed?t("Expand sidebar","展开侧栏"):t("Collapse sidebar","收起侧栏")}"
          >
            <span class="nav-collapse-toggle__icon">${J.menu}</span>
          </button>
          <div class="brand">
            <div class="brand-logo">
              <img src=${f?`${f}/logo.jpg`:"/logo.jpg"} alt="OpenSoul" style="border-radius:50%;" />
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
          ${h}
        </div>
      </header>
      <aside class="nav ${e.settings.navCollapsed?"nav--collapsed":""}">
        ${Fu.map(d=>{const v=e.settings.navGroupsCollapsed[d.label]??!1,b=e.settings.navCollapsed?!1:v,S=Uu(d.label,e.uiLocale);return r`
            <div class="nav-group ${b?"nav-group--collapsed":""}">
              <button
                class="nav-label"
                @click=${()=>{const k={...e.settings.navGroupsCollapsed};k[d.label]=!v,e.applySettings({...e.settings,navGroupsCollapsed:k})}}
                aria-expanded=${!b}
              >
                <span class="nav-label__text">${S}</span>
                <span class="nav-label__chevron">${b?"+":"-"}</span>
              </button>
              <div class="nav-group__items">
                ${d.tabs.map(k=>ap(e,k))}
              </div>
            </div>
          `})}
        <div class="nav-bottom">
          <button
            class="nav-settings-btn"
            @click=${()=>e.openSettings()}
            title=${t("Settings","设置")}
          >
            <span class="nav-settings-btn__icon">${J.settings}</span>
            <span class="nav-settings-btn__text">${t("Settings","设置")}</span>
          </button>
        </div>
      </aside>
      <main class="content ${a?"content--chat":""}">
        <section class="content-header">
          <div>
            ${e.tab==="usage"?h:r`<div class="page-title">${no(e.tab,e.uiLocale)}</div>`}
            ${e.tab==="usage"?h:r`<div class="page-sub">${zu(e.tab,e.uiLocale)}</div>`}
          </div>
          <div class="page-meta">
            ${e.lastError?r`<div class="pill danger">${e.lastError}</div>`:h}
            ${a?rp(e):h}
          </div>
        </section>

        ${e.tab==="overview"?ib({locale:e.uiLocale,connected:e.connected,hello:e.hello,settings:e.settings,password:e.password,lastError:e.lastError,presenceCount:n,sessionsCount:s,cronEnabled:e.cronStatus?.enabled??null,cronNext:i,lastChannelsRefresh:e.channelsLastSuccess,onSettingsChange:d=>e.applySettings(d),onPasswordChange:d=>e.password=d,onSessionKeyChange:d=>{e.sessionKey=d,e.chatMessage="",e.resetToolStream(),e.applySettings({...e.settings,sessionKey:d,lastActiveSessionKey:d}),e.loadAssistantIdentity()},onConnect:()=>e.connect(),onRefresh:()=>e.loadOverview(),onNavigate:d=>e.setTab(d)}):h}

        ${e.tab==="channels"?Rh({connected:e.connected,loading:e.channelsLoading,snapshot:e.channelsSnapshot,lastError:e.channelsError,lastSuccessAt:e.channelsLastSuccess,whatsappMessage:e.whatsappLoginMessage,whatsappQrDataUrl:e.whatsappLoginQrDataUrl,whatsappConnected:e.whatsappLoginConnected,whatsappBusy:e.whatsappBusy,configSchema:e.configSchema,configSchemaLoading:e.configSchemaLoading,configForm:e.configForm,configUiHints:e.configUiHints,configSaving:e.configSaving,configFormDirty:e.configFormDirty,nostrProfileFormState:e.nostrProfileFormState,nostrProfileAccountId:e.nostrProfileAccountId,onRefresh:d=>xe(e,d),onWhatsAppStart:d=>e.handleWhatsAppStart(d),onWhatsAppWait:()=>e.handleWhatsAppWait(),onWhatsAppLogout:()=>e.handleWhatsAppLogout(),onConfigPatch:(d,v)=>we(e,d,v),onConfigSave:()=>e.handleChannelConfigSave(),onConfigReload:()=>e.handleChannelConfigReload(),onNostrProfileEdit:(d,v)=>e.handleNostrProfileEdit(d,v),onNostrProfileCancel:()=>e.handleNostrProfileCancel(),onNostrProfileFieldChange:(d,v)=>e.handleNostrProfileFieldChange(d,v),onNostrProfileSave:()=>e.handleNostrProfileSave(),onNostrProfileImport:()=>e.handleNostrProfileImport(),onNostrProfileToggleAdvanced:()=>e.handleNostrProfileToggleAdvanced()}):h}

        ${e.tab==="instances"?hm({loading:e.presenceLoading,entries:e.presenceEntries,lastError:e.presenceError,statusMessage:e.presenceStatus,onRefresh:()=>eo(e)}):h}

        ${e.tab==="sessions"?hb({loading:e.sessionsLoading,result:e.sessionsResult,error:e.sessionsError,activeMinutes:e.sessionsFilterActive,limit:e.sessionsFilterLimit,includeGlobal:e.sessionsIncludeGlobal,includeUnknown:e.sessionsIncludeUnknown,basePath:e.basePath,onFiltersChange:d=>{e.sessionsFilterActive=d.activeMinutes,e.sessionsFilterLimit=d.limit,e.sessionsIncludeGlobal=d.includeGlobal,e.sessionsIncludeUnknown=d.includeUnknown},onRefresh:()=>xt(e),onPatch:(d,v)=>gu(e,d,v),onDelete:d=>pu(e,d)}):h}

        ${e.tab==="usage"?iy({loading:e.usageLoading,error:e.usageError,startDate:e.usageStartDate,endDate:e.usageEndDate,sessions:e.usageResult?.sessions??[],sessionsLimitReached:(e.usageResult?.sessions?.length??0)>=1e3,totals:e.usageResult?.totals??null,aggregates:e.usageResult?.aggregates??null,costDaily:e.usageCostSummary?.daily??[],selectedSessions:e.usageSelectedSessions,selectedDays:e.usageSelectedDays,selectedHours:e.usageSelectedHours,chartMode:e.usageChartMode,dailyChartMode:e.usageDailyChartMode,timeSeriesMode:e.usageTimeSeriesMode,timeSeriesBreakdownMode:e.usageTimeSeriesBreakdownMode,timeSeries:e.usageTimeSeries,timeSeriesLoading:e.usageTimeSeriesLoading,sessionLogs:e.usageSessionLogs,sessionLogsLoading:e.usageSessionLogsLoading,sessionLogsExpanded:e.usageSessionLogsExpanded,logFilterRoles:e.usageLogFilterRoles,logFilterTools:e.usageLogFilterTools,logFilterHasTools:e.usageLogFilterHasTools,logFilterQuery:e.usageLogFilterQuery,query:e.usageQuery,queryDraft:e.usageQueryDraft,sessionSort:e.usageSessionSort,sessionSortDir:e.usageSessionSortDir,recentSessions:e.usageRecentSessions,sessionsTab:e.usageSessionsTab,visibleColumns:e.usageVisibleColumns,timeZone:e.usageTimeZone,contextExpanded:e.usageContextExpanded,headerPinned:e.usageHeaderPinned,onStartDateChange:d=>{e.usageStartDate=d,e.usageSelectedDays=[],e.usageSelectedHours=[],e.usageSelectedSessions=[],br(e)},onEndDateChange:d=>{e.usageEndDate=d,e.usageSelectedDays=[],e.usageSelectedHours=[],e.usageSelectedSessions=[],br(e)},onRefresh:()=>Cl(e),onTimeZoneChange:d=>{e.usageTimeZone=d},onToggleContextExpanded:()=>{e.usageContextExpanded=!e.usageContextExpanded},onToggleSessionLogsExpanded:()=>{e.usageSessionLogsExpanded=!e.usageSessionLogsExpanded},onLogFilterRolesChange:d=>{e.usageLogFilterRoles=d},onLogFilterToolsChange:d=>{e.usageLogFilterTools=d},onLogFilterHasToolsChange:d=>{e.usageLogFilterHasTools=d},onLogFilterQueryChange:d=>{e.usageLogFilterQuery=d},onLogFilterClear:()=>{e.usageLogFilterRoles=[],e.usageLogFilterTools=[],e.usageLogFilterHasTools=!1,e.usageLogFilterQuery=""},onToggleHeaderPinned:()=>{e.usageHeaderPinned=!e.usageHeaderPinned},onSelectHour:(d,v)=>{if(v&&e.usageSelectedHours.length>0){const b=Array.from({length:24},(A,T)=>T),S=e.usageSelectedHours[e.usageSelectedHours.length-1],k=b.indexOf(S),C=b.indexOf(d);if(k!==-1&&C!==-1){const[A,T]=k<C?[k,C]:[C,k],_=b.slice(A,T+1);e.usageSelectedHours=[...new Set([...e.usageSelectedHours,..._])]}}else e.usageSelectedHours.includes(d)?e.usageSelectedHours=e.usageSelectedHours.filter(b=>b!==d):e.usageSelectedHours=[...e.usageSelectedHours,d]},onQueryDraftChange:d=>{e.usageQueryDraft=d,e.usageQueryDebounceTimer&&window.clearTimeout(e.usageQueryDebounceTimer),e.usageQueryDebounceTimer=window.setTimeout(()=>{e.usageQuery=e.usageQueryDraft,e.usageQueryDebounceTimer=null},250)},onApplyQuery:()=>{e.usageQueryDebounceTimer&&(window.clearTimeout(e.usageQueryDebounceTimer),e.usageQueryDebounceTimer=null),e.usageQuery=e.usageQueryDraft},onClearQuery:()=>{e.usageQueryDebounceTimer&&(window.clearTimeout(e.usageQueryDebounceTimer),e.usageQueryDebounceTimer=null),e.usageQueryDraft="",e.usageQuery=""},onSessionSortChange:d=>{e.usageSessionSort=d},onSessionSortDirChange:d=>{e.usageSessionSortDir=d},onSessionsTabChange:d=>{e.usageSessionsTab=d},onToggleColumn:d=>{e.usageVisibleColumns.includes(d)?e.usageVisibleColumns=e.usageVisibleColumns.filter(v=>v!==d):e.usageVisibleColumns=[...e.usageVisibleColumns,d]},onSelectSession:(d,v)=>{if(e.usageTimeSeries=null,e.usageSessionLogs=null,e.usageRecentSessions=[d,...e.usageRecentSessions.filter(b=>b!==d)].slice(0,8),v&&e.usageSelectedSessions.length>0){const b=e.usageChartMode==="tokens",k=[...e.usageResult?.sessions??[]].toSorted((_,M)=>{const G=b?_.usage?.totalTokens??0:_.usage?.totalCost??0;return(b?M.usage?.totalTokens??0:M.usage?.totalCost??0)-G}).map(_=>_.key),C=e.usageSelectedSessions[e.usageSelectedSessions.length-1],A=k.indexOf(C),T=k.indexOf(d);if(A!==-1&&T!==-1){const[_,M]=A<T?[A,T]:[T,A],G=k.slice(_,M+1),K=[...new Set([...e.usageSelectedSessions,...G])];e.usageSelectedSessions=K}}else e.usageSelectedSessions.length===1&&e.usageSelectedSessions[0]===d?e.usageSelectedSessions=[]:e.usageSelectedSessions=[d];e.usageSelectedSessions.length===1&&(mp(e,e.usageSelectedSessions[0]),bp(e,e.usageSelectedSessions[0]))},onSelectDay:(d,v)=>{if(v&&e.usageSelectedDays.length>0){const b=(e.usageCostSummary?.daily??[]).map(A=>A.date),S=e.usageSelectedDays[e.usageSelectedDays.length-1],k=b.indexOf(S),C=b.indexOf(d);if(k!==-1&&C!==-1){const[A,T]=k<C?[k,C]:[C,k],_=b.slice(A,T+1),M=[...new Set([...e.usageSelectedDays,..._])];e.usageSelectedDays=M}}else e.usageSelectedDays.includes(d)?e.usageSelectedDays=e.usageSelectedDays.filter(b=>b!==d):e.usageSelectedDays=[d]},onChartModeChange:d=>{e.usageChartMode=d},onDailyChartModeChange:d=>{e.usageDailyChartMode=d},onTimeSeriesModeChange:d=>{e.usageTimeSeriesMode=d},onTimeSeriesBreakdownChange:d=>{e.usageTimeSeriesBreakdownMode=d},onClearDays:()=>{e.usageSelectedDays=[]},onClearHours:()=>{e.usageSelectedHours=[]},onClearSessions:()=>{e.usageSelectedSessions=[],e.usageTimeSeries=null,e.usageSessionLogs=null},onClearFilters:()=>{e.usageSelectedDays=[],e.usageSelectedHours=[],e.usageSelectedSessions=[],e.usageTimeSeries=null,e.usageSessionLogs=null}}):h}

        ${e.tab==="cron"?im({basePath:e.basePath,loading:e.cronLoading,status:e.cronStatus,jobs:e.cronJobs,error:e.cronError,busy:e.cronBusy,form:e.cronForm,channels:e.channelsSnapshot?.channelMeta?.length?e.channelsSnapshot.channelMeta.map(d=>d.id):e.channelsSnapshot?.channelOrder??[],channelLabels:e.channelsSnapshot?.channelLabels??{},channelMeta:e.channelsSnapshot?.channelMeta??[],runsJobId:e.cronRunsJobId,runs:e.cronRuns,onFormChange:d=>e.cronForm={...e.cronForm,...d},onRefresh:()=>e.loadCron(),onAdd:()=>Ad(e),onToggle:(d,v)=>Cd(e,d,v),onRun:d=>Td(e,d),onRemove:d=>_d(e,d),onLoadRuns:d=>Fr(e,d)}):h}

        ${e.tab==="agents"?Bp({loading:e.agentsLoading,error:e.agentsError,agentsList:e.agentsList,selectedAgentId:m,activePanel:e.agentsPanel,configForm:p,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,channelsLoading:e.channelsLoading,channelsError:e.channelsError,channelsSnapshot:e.channelsSnapshot,channelsLastSuccess:e.channelsLastSuccess,cronLoading:e.cronLoading,cronStatus:e.cronStatus,cronJobs:e.cronJobs,cronError:e.cronError,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFilesList:e.agentFilesList,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,agentIdentityLoading:e.agentIdentityLoading,agentIdentityError:e.agentIdentityError,agentIdentityById:e.agentIdentityById,agentSkillsLoading:e.agentSkillsLoading,agentSkillsReport:e.agentSkillsReport,agentSkillsError:e.agentSkillsError,agentSkillsAgentId:e.agentSkillsAgentId,skillsFilter:e.skillsFilter,onRefresh:async()=>{await ji(e);const d=e.agentsList?.agents?.map(v=>v.id)??[];d.length>0&&Dr(e,d)},onSelectAgent:d=>{e.agentsSelectedId!==d&&(e.agentsSelectedId=d,e.agentFilesList=null,e.agentFilesError=null,e.agentFilesLoading=!1,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},e.agentSkillsReport=null,e.agentSkillsError=null,e.agentSkillsAgentId=null,Pr(e,d),e.agentsPanel==="files"&&zs(e,d),e.agentsPanel==="skills"&&On(e,d))},onSelectPanel:d=>{e.agentsPanel=d,d==="files"&&m&&e.agentFilesList?.agentId!==m&&(e.agentFilesList=null,e.agentFilesError=null,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},zs(e,m)),d==="skills"&&m&&On(e,m),d==="channels"&&xe(e,!1),d==="cron"&&e.loadCron()},onLoadFiles:d=>zs(e,d),onSelectFile:d=>{e.agentFileActive=d,m&&fp(e,m,d)},onFileDraftChange:(d,v)=>{e.agentFileDrafts={...e.agentFileDrafts,[d]:v}},onFileReset:d=>{const v=e.agentFileContents[d]??"";e.agentFileDrafts={...e.agentFileDrafts,[d]:v}},onFileSave:d=>{if(!m)return;const v=e.agentFileDrafts[d]??e.agentFileContents[d]??"";vp(e,m,d,v)},onToolsProfileChange:(d,v,b)=>{if(!p)return;const S=p.agents?.list;if(!Array.isArray(S))return;const k=S.findIndex(A=>A&&typeof A=="object"&&"id"in A&&A.id===d);if(k<0)return;const C=["agents","list",k,"tools"];v?we(e,[...C,"profile"],v):He(e,[...C,"profile"]),b&&He(e,[...C,"allow"])},onToolsOverridesChange:(d,v,b)=>{if(!p)return;const S=p.agents?.list;if(!Array.isArray(S))return;const k=S.findIndex(A=>A&&typeof A=="object"&&"id"in A&&A.id===d);if(k<0)return;const C=["agents","list",k,"tools"];v.length>0?we(e,[...C,"alsoAllow"],v):He(e,[...C,"alsoAllow"]),b.length>0?we(e,[...C,"deny"],b):He(e,[...C,"deny"])},onConfigReload:()=>ke(e),onConfigSave:()=>Fn(e),onChannelsRefresh:()=>xe(e,!1),onCronRefresh:()=>e.loadCron(),onSkillsFilterChange:d=>e.skillsFilter=d,onSkillsRefresh:()=>{m&&On(e,m)},onAgentSkillToggle:(d,v,b)=>{if(!p)return;const S=p.agents?.list;if(!Array.isArray(S))return;const k=S.findIndex(K=>K&&typeof K=="object"&&"id"in K&&K.id===d);if(k<0)return;const C=S[k],A=v.trim();if(!A)return;const T=e.agentSkillsReport?.skills?.map(K=>K.name).filter(Boolean)??[],M=(Array.isArray(C.skills)?C.skills.map(K=>String(K).trim()).filter(Boolean):void 0)??T,G=new Set(M);b?G.add(A):G.delete(A),we(e,["agents","list",k,"skills"],[...G])},onAgentSkillsClear:d=>{if(!p)return;const v=p.agents?.list;if(!Array.isArray(v))return;const b=v.findIndex(S=>S&&typeof S=="object"&&"id"in S&&S.id===d);b<0||He(e,["agents","list",b,"skills"])},onAgentSkillsDisableAll:d=>{if(!p)return;const v=p.agents?.list;if(!Array.isArray(v))return;const b=v.findIndex(S=>S&&typeof S=="object"&&"id"in S&&S.id===d);b<0||we(e,["agents","list",b,"skills"],[])},onModelChange:(d,v)=>{if(!p)return;const b=p.agents?.list;if(!Array.isArray(b))return;const S=b.findIndex(T=>T&&typeof T=="object"&&"id"in T&&T.id===d);if(S<0)return;const k=["agents","list",S,"model"];if(!v){He(e,k);return}const A=b[S]?.model;if(A&&typeof A=="object"&&!Array.isArray(A)){const T=A.fallbacks,_={primary:v,...Array.isArray(T)?{fallbacks:T}:{}};we(e,k,_)}else we(e,k,v)},onModelFallbacksChange:(d,v)=>{if(!p)return;const b=p.agents?.list;if(!Array.isArray(b))return;const S=b.findIndex(K=>K&&typeof K=="object"&&"id"in K&&K.id===d);if(S<0)return;const k=["agents","list",S,"model"],C=b[S],A=v.map(K=>K.trim()).filter(Boolean),T=C.model,M=(()=>{if(typeof T=="string")return T.trim()||null;if(T&&typeof T=="object"&&!Array.isArray(T)){const K=T.primary;if(typeof K=="string")return K.trim()||null}return null})();if(A.length===0){M?we(e,k,M):He(e,k);return}we(e,k,M?{primary:M,fallbacks:A}:{fallbacks:A})}}):h}

        ${e.tab==="skills"?xb({loading:e.skillsLoading,report:e.skillsReport,error:e.skillsError,filter:e.skillsFilter,edits:e.skillEdits,messages:e.skillMessages,busyKey:e.skillsBusyKey,onFilterChange:d=>e.skillsFilter=d,onRefresh:()=>pn(e,{clearMessages:!0}),onToggle:(d,v)=>fu(e,d,v),onEdit:(d,v)=>hu(e,d,v),onSaveKey:d=>vu(e,d),onInstall:(d,v,b)=>mu(e,d,v,b)}):h}

        ${e.tab==="nodes"?ym({loading:e.nodesLoading,nodes:e.nodes,devicesLoading:e.devicesLoading,devicesError:e.devicesError,devicesList:e.devicesList,configForm:e.configForm??e.configSnapshot?.config,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,configFormMode:e.configFormMode,execApprovalsLoading:e.execApprovalsLoading,execApprovalsSaving:e.execApprovalsSaving,execApprovalsDirty:e.execApprovalsDirty,execApprovalsSnapshot:e.execApprovalsSnapshot,execApprovalsForm:e.execApprovalsForm,execApprovalsSelectedAgent:e.execApprovalsSelectedAgent,execApprovalsTarget:e.execApprovalsTarget,execApprovalsTargetNodeId:e.execApprovalsTargetNodeId,onRefresh:()=>is(e),onDevicesRefresh:()=>Xe(e),onDeviceApprove:d=>nu(e,d),onDeviceReject:d=>su(e,d),onDeviceRotate:(d,v,b)=>iu(e,{deviceId:d,role:v,scopes:b}),onDeviceRevoke:(d,v)=>ou(e,{deviceId:d,role:v}),onLoadConfig:()=>ke(e),onLoadExecApprovals:()=>{const d=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return Xi(e,d)},onBindDefault:d=>{d?we(e,["tools","exec","node"],d):He(e,["tools","exec","node"])},onBindAgent:(d,v)=>{const b=["agents","list",d,"tools","exec","node"];v?we(e,b,v):He(e,b)},onSaveBindings:()=>Fn(e),onExecApprovalsTargetChange:(d,v)=>{e.execApprovalsTarget=d,e.execApprovalsTargetNodeId=v,e.execApprovalsSnapshot=null,e.execApprovalsForm=null,e.execApprovalsDirty=!1,e.execApprovalsSelectedAgent=null},onExecApprovalsSelectAgent:d=>{e.execApprovalsSelectedAgent=d},onExecApprovalsPatch:(d,v)=>du(e,d,v),onExecApprovalsRemove:d=>uu(e,d),onSaveExecApprovals:()=>{const d=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return cu(e,d)}}):h}

        ${e.tab==="chat"?Qv({locale:e.uiLocale,sessionKey:e.sessionKey,onSessionKeyChange:d=>{e.sessionKey=d,e.chatMessage="",e.chatAttachments=[],e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.chatQueue=[],e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:d,lastActiveSessionKey:d}),e.loadAssistantIdentity(),cn(e),fi(e)},thinkingLevel:e.chatThinkingLevel,showThinking:c,loading:e.chatLoading,sending:e.chatSending,compactionStatus:e.compactionStatus,assistantAvatarUrl:g,messages:e.chatMessages,toolMessages:e.chatToolMessages,stream:e.chatStream,streamStartedAt:e.chatStreamStartedAt,draft:e.chatMessage,queue:e.chatQueue,connected:e.connected,canSend:e.connected,disabledReason:o,error:e.lastError,sessions:e.sessionsResult,focusMode:l,onRefresh:()=>(e.resetToolStream(),Promise.all([cn(e),fi(e)])),onToggleFocusMode:()=>{e.onboarding||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})},onChatScroll:d=>e.handleChatScroll(d),onDraftChange:d=>e.chatMessage=d,attachments:e.chatAttachments,onAttachmentsChange:d=>e.chatAttachments=d,onSend:()=>e.handleSendChat(),canAbort:!!e.chatRunId,onAbort:()=>{e.handleAbortChat()},onQueueRemove:d=>e.removeQueuedMessage(d),onNewSession:()=>e.handleSendChat("/new",{restoreDraft:!0}),showNewMessages:e.chatNewMessagesBelow&&!e.chatManualRefreshInFlight,onScrollToBottom:()=>e.scrollToBottom(),sidebarOpen:e.sidebarOpen,sidebarContent:e.sidebarContent,sidebarError:e.sidebarError,splitRatio:e.splitRatio,onOpenSidebar:d=>e.handleOpenSidebar(d),onCloseSidebar:()=>e.handleCloseSidebar(),onSplitRatioChange:d=>e.handleSplitRatioChange(d),assistantName:e.assistantName,assistantAvatar:e.assistantAvatar}):h}

      </main>

      ${bb(e,{config:tm({raw:e.configRaw,originalRaw:e.configRawOriginal,valid:e.configValid,issues:e.configIssues,loading:e.configLoading,saving:e.configSaving,applying:e.configApplying,updating:e.updateRunning,connected:e.connected,schema:e.configSchema,schemaLoading:e.configSchemaLoading,uiHints:e.configUiHints,formMode:e.configFormMode,formValue:e.configForm,originalValue:e.configFormOriginal,searchQuery:e.configSearchQuery,activeSection:e.configActiveSection,activeSubsection:e.configActiveSubsection,onRawChange:d=>{e.configRaw=d},onFormModeChange:d=>e.configFormMode=d,onFormPatch:(d,v)=>we(e,d,v),onSearchChange:d=>e.configSearchQuery=d,onSectionChange:d=>{e.configActiveSection=d,e.configActiveSubsection=null},onSubsectionChange:d=>e.configActiveSubsection=d,onReload:()=>ke(e),onSave:()=>Fn(e),onApply:()=>Wc(e),onUpdate:()=>Gc(e)}),logs:bm({loading:e.logsLoading,error:e.logsError,file:e.logsFile,entries:e.logsEntries,filterText:e.logsFilterText,levelFilters:e.logsLevelFilters,autoFollow:e.logsAutoFollow,truncated:e.logsTruncated,onFilterTextChange:d=>e.logsFilterText=d,onLevelToggle:(d,v)=>{e.logsLevelFilters={...e.logsLevelFilters,[d]:v}},onToggleAutoFollow:d=>e.logsAutoFollow=d,onRefresh:()=>on(e,{reset:!0}),onExport:(d,v)=>e.exportLogs(d,v),onScroll:d=>e.handleLogsScroll(d)}),debug:dm({loading:e.debugLoading,status:e.debugStatus,health:e.debugHealth,models:e.debugModels,heartbeat:e.debugHeartbeat,eventLog:e.eventLog,callMethod:e.debugCallMethod,callParams:e.debugCallParams,callResult:e.debugCallResult,callError:e.debugCallError,onCallMethodChange:d=>e.debugCallMethod=d,onCallParamsChange:d=>e.debugCallParams=d,onRefresh:()=>Rt(e),onCall:()=>gd(e)})})}
      ${gm(e)}
      ${pm(e)}
    </div>
  `}var cy=Object.defineProperty,dy=Object.getOwnPropertyDescriptor,$=(e,t,n,s)=>{for(var i=s>1?void 0:s?dy(t,n):t,o=e.length-1,a;o>=0;o--)(a=e[o])&&(i=(s?a(t,n,i):a(i))||i);return s&&i&&cy(t,n,i),i};const ti=Fg();function uy(){if(!window.location.search)return!1;const t=new URLSearchParams(window.location.search).get("onboarding");if(!t)return!1;const n=t.trim().toLowerCase();return n==="1"||n==="true"||n==="yes"||n==="on"}let x=class extends Et{constructor(){super(...arguments),this.initialLocale=il(),this.settings=Hu(),this.password="",this.tab="chat",this.onboarding=uy(),this.uiLocale=this.initialLocale,this.connected=!1,this.theme=this.settings.theme??"system",this.themeResolved="dark",this.hello=null,this.lastError=null,this.eventLog=[],this.eventLogBuffer=[],this.toolStreamSyncTimer=null,this.sidebarCloseTimer=null,this.assistantName=ti.name,this.assistantAvatar=ti.avatar,this.assistantAgentId=ti.agentId??null,this.sessionKey=this.settings.sessionKey,this.chatLoading=!1,this.chatSending=!1,this.chatMessage="",this.chatMessages=[],this.chatToolMessages=[],this.chatStream=null,this.chatStreamStartedAt=null,this.chatRunId=null,this.compactionStatus=null,this.chatAvatarUrl=null,this.chatThinkingLevel=null,this.chatQueue=[],this.chatAttachments=[],this.chatManualRefreshInFlight=!1,this.sidebarOpen=!1,this.sidebarContent=null,this.sidebarError=null,this.splitRatio=this.settings.splitRatio,this.nodesLoading=!1,this.nodes=[],this.devicesLoading=!1,this.devicesError=null,this.devicesList=null,this.execApprovalsLoading=!1,this.execApprovalsSaving=!1,this.execApprovalsDirty=!1,this.execApprovalsSnapshot=null,this.execApprovalsForm=null,this.execApprovalsSelectedAgent=null,this.execApprovalsTarget="gateway",this.execApprovalsTargetNodeId=null,this.execApprovalQueue=[],this.execApprovalBusy=!1,this.execApprovalError=null,this.pendingGatewayUrl=null,this.configLoading=!1,this.configRaw=`{
}
`,this.configRawOriginal="",this.configValid=null,this.configIssues=[],this.configSaving=!1,this.configApplying=!1,this.updateRunning=!1,this.applySessionKey=this.settings.lastActiveSessionKey,this.configSnapshot=null,this.configSchema=null,this.configSchemaVersion=null,this.configSchemaLoading=!1,this.configUiHints={},this.configForm=null,this.configFormOriginal=null,this.configFormDirty=!1,this.configFormMode="form",this.configSearchQuery="",this.configActiveSection=null,this.configActiveSubsection=null,this.channelsLoading=!1,this.channelsSnapshot=null,this.channelsError=null,this.channelsLastSuccess=null,this.whatsappLoginMessage=null,this.whatsappLoginQrDataUrl=null,this.whatsappLoginConnected=null,this.whatsappBusy=!1,this.nostrProfileFormState=null,this.nostrProfileAccountId=null,this.presenceLoading=!1,this.presenceEntries=[],this.presenceError=null,this.presenceStatus=null,this.agentsLoading=!1,this.agentsList=null,this.agentsError=null,this.agentsSelectedId=null,this.agentsPanel="overview",this.agentFilesLoading=!1,this.agentFilesError=null,this.agentFilesList=null,this.agentFileContents={},this.agentFileDrafts={},this.agentFileActive=null,this.agentFileSaving=!1,this.agentIdentityLoading=!1,this.agentIdentityError=null,this.agentIdentityById={},this.agentSkillsLoading=!1,this.agentSkillsError=null,this.agentSkillsReport=null,this.agentSkillsAgentId=null,this.sessionsLoading=!1,this.sessionsResult=null,this.sessionsError=null,this.sessionsFilterActive="",this.sessionsFilterLimit="120",this.sessionsIncludeGlobal=!0,this.sessionsIncludeUnknown=!1,this.usageLoading=!1,this.usageResult=null,this.usageCostSummary=null,this.usageError=null,this.usageStartDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageEndDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageSelectedSessions=[],this.usageSelectedDays=[],this.usageSelectedHours=[],this.usageChartMode="tokens",this.usageDailyChartMode="by-type",this.usageTimeSeriesMode="per-turn",this.usageTimeSeriesBreakdownMode="by-type",this.usageTimeSeries=null,this.usageTimeSeriesLoading=!1,this.usageSessionLogs=null,this.usageSessionLogsLoading=!1,this.usageSessionLogsExpanded=!1,this.usageQuery="",this.usageQueryDraft="",this.usageSessionSort="recent",this.usageSessionSortDir="desc",this.usageRecentSessions=[],this.usageTimeZone="local",this.usageContextExpanded=!1,this.usageHeaderPinned=!1,this.usageSessionsTab="all",this.usageVisibleColumns=["channel","agent","provider","model","messages","tools","errors","duration"],this.usageLogFilterRoles=[],this.usageLogFilterTools=[],this.usageLogFilterHasTools=!1,this.usageLogFilterQuery="",this.usageQueryDebounceTimer=null,this.cronLoading=!1,this.cronJobs=[],this.cronStatus=null,this.cronError=null,this.cronForm={...Rg},this.cronRunsJobId=null,this.cronRuns=[],this.cronBusy=!1,this.skillsLoading=!1,this.skillsReport=null,this.skillsError=null,this.skillsFilter="",this.skillEdits={},this.skillsBusyKey=null,this.skillMessages={},this.debugLoading=!1,this.debugStatus=null,this.debugHealth=null,this.debugModels=[],this.debugHeartbeat=null,this.debugCallMethod="",this.debugCallParams="{}",this.debugCallResult=null,this.debugCallError=null,this.logsLoading=!1,this.logsError=null,this.logsFile=null,this.logsEntries=[],this.logsFilterText="",this.logsLevelFilters={...Mg},this.logsAutoFollow=!0,this.logsTruncated=!1,this.logsCursor=null,this.logsLastFetchAt=null,this.logsLimit=500,this.logsMaxBytes=25e4,this.logsAtBottom=!0,this.settingsOpen=!1,this.settingsSection="general",this.showOnboardingWizard=!0,this.onboardingStep=1,this.onboardingLocale=this.initialLocale,this.onboardingLoginStatus="idle",this.onboardingLoginDisplayName=null,this.onboardingLoginAvatarUrl=null,this.onboardingLoginEmail=null,this.onboardingLoginError=null,this.onboardingIsExistingAccount=!1,this.onboardingSelectedProvider=null,this.onboardingProviderApiKey="",this.onboardingProviderSearchQuery="",this.onboardingSelectedChannel=null,this.onboardingChannelToken="",this.client=null,this.chatScrollFrame=null,this.chatScrollTimeout=null,this.chatHasAutoScrolled=!1,this.chatUserNearBottom=!0,this.chatNewMessagesBelow=!1,this.nodesPollInterval=null,this.logsPollInterval=null,this.debugPollInterval=null,this.logsScrollFrame=null,this.toolStreamById=new Map,this.toolStreamOrder=[],this.refreshSessionsAfterChat=new Set,this.basePath="",this.popStateHandler=()=>Xu(this),this.themeMedia=null,this.themeMediaHandler=null,this.topbarObserver=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),Ps(this.uiLocale),Yg(this)}firstUpdated(){Zg(this)}disconnectedCallback(){Jg(this),super.disconnectedCallback()}updated(e){ep(this,e)}connect(){oo(this)}handleChatScroll(e){ld(this,e)}handleLogsScroll(e){cd(this,e)}exportLogs(e,t){dd(e,t)}resetToolStream(){us(this)}resetChatScroll(){ta(this)}scrollToBottom(e){ta(this),un(this,!0,!!e?.smooth)}async loadAssistantIdentity(){await $l(this)}applySettings(e){We(this,e)}setTab(e){dl(this,e)}setTheme(e,t){gi(this,e,t)}async loadOverview(){await pl(this)}async loadCron(){await qn(this)}async handleAbortChat(){await ml(this)}removeQueuedMessage(e){Tg(this,e)}async handleSendChat(e,t){await _g(this,e,t)}async handleWhatsAppStart(e){await Yc(this,e)}async handleWhatsAppWait(){await Zc(this)}async handleWhatsAppLogout(){await Jc(this)}async handleChannelConfigSave(){await Xc(this)}async handleChannelConfigReload(){await ed(this)}handleNostrProfileEdit(e,t){nd(this,e,t)}handleNostrProfileCancel(){sd(this)}handleNostrProfileFieldChange(e,t){id(this,e,t)}async handleNostrProfileSave(){await ad(this)}async handleNostrProfileImport(){await rd(this)}handleNostrProfileToggleAdvanced(){od(this)}async handleExecApprovalDecision(e){const t=this.execApprovalQueue[0];if(!(!t||!this.client||this.execApprovalBusy)){this.execApprovalBusy=!0,this.execApprovalError=null;try{await this.client.request("exec.approval.resolve",{id:t.id,decision:e}),this.execApprovalQueue=this.execApprovalQueue.filter(n=>n.id!==t.id)}catch(n){this.execApprovalError=`Exec approval failed: ${String(n)}`}finally{this.execApprovalBusy=!1}}}handleGatewayUrlConfirm(){const e=this.pendingGatewayUrl;e&&(this.pendingGatewayUrl=null,We(this,{...this.settings,gatewayUrl:e}),this.connect())}handleGatewayUrlCancel(){this.pendingGatewayUrl=null}openSettings(e){this.settingsSection=e??"general",this.settingsOpen=!0,e==="config"?(Kn(this),ke(this)):e==="logs"?(this.logsAtBottom=!0,on(this,{reset:!0})):e==="debug"&&Rt(this)}closeSettings(){this.settingsOpen=!1}setSettingsSection(e){this.settingsSection=e,e==="config"?(Kn(this),ke(this)):e==="logs"?(this.logsAtBottom=!0,on(this,{reset:!0})):e==="debug"&&Rt(this)}handleOpenSidebar(e){this.sidebarCloseTimer!=null&&(window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=null),this.sidebarContent=e,this.sidebarError=null,this.sidebarOpen=!0}handleCloseSidebar(){this.sidebarOpen=!1,this.sidebarCloseTimer!=null&&window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=window.setTimeout(()=>{this.sidebarOpen||(this.sidebarContent=null,this.sidebarError=null,this.sidebarCloseTimer=null)},200)}handleSplitRatioChange(e){const t=Math.max(.4,Math.min(.7,e));this.splitRatio=t,this.applySettings({...this.settings,splitRatio:t})}setOnboardingStep(e){this.onboardingStep=e}setUiLocale(e){this.onboardingLocale=e,this.uiLocale=e,Ps(e)}setOnboardingLocale(e){this.setUiLocale(e)}setOnboardingProvider(e){this.onboardingSelectedProvider=e,e||(this.onboardingProviderApiKey="")}setOnboardingProviderApiKey(e){this.onboardingProviderApiKey=e}setOnboardingProviderSearchQuery(e){this.onboardingProviderSearchQuery=e}setOnboardingChannel(e){this.onboardingSelectedChannel=e,e||(this.onboardingChannelToken="")}setOnboardingChannelToken(e){this.onboardingChannelToken=e}onboardingGoogleLogin(){this.onboardingLoginStatus="loading",this.onboardingLoginError=null,setTimeout(()=>{this.onboardingLoginStatus="success",this.onboardingLoginDisplayName="Google User",this.onboardingLoginEmail="user@gmail.com",this.onboardingLoginAvatarUrl=null,this.onboardingIsExistingAccount=!1},1200)}onboardingGithubLogin(){this.onboardingLoginStatus="loading",this.onboardingLoginError=null,setTimeout(()=>{this.onboardingLoginStatus="success",this.onboardingLoginDisplayName="GitHub User",this.onboardingLoginEmail="user@github.com",this.onboardingLoginAvatarUrl=null,this.onboardingIsExistingAccount=!1},1200)}onboardingLogout(){this.onboardingLoginStatus="idle",this.onboardingLoginDisplayName=null,this.onboardingLoginAvatarUrl=null,this.onboardingLoginEmail=null,this.onboardingLoginError=null,this.onboardingIsExistingAccount=!1}finishOnboarding(){this.uiLocale=this.onboardingLocale,Ps(this.onboardingLocale),localStorage.setItem("opensoul.onboarding.done","1"),this.showOnboardingWizard=!1}render(){return ly(this)}};$([w()],x.prototype,"settings",2);$([w()],x.prototype,"password",2);$([w()],x.prototype,"tab",2);$([w()],x.prototype,"onboarding",2);$([w()],x.prototype,"uiLocale",2);$([w()],x.prototype,"connected",2);$([w()],x.prototype,"theme",2);$([w()],x.prototype,"themeResolved",2);$([w()],x.prototype,"hello",2);$([w()],x.prototype,"lastError",2);$([w()],x.prototype,"eventLog",2);$([w()],x.prototype,"assistantName",2);$([w()],x.prototype,"assistantAvatar",2);$([w()],x.prototype,"assistantAgentId",2);$([w()],x.prototype,"sessionKey",2);$([w()],x.prototype,"chatLoading",2);$([w()],x.prototype,"chatSending",2);$([w()],x.prototype,"chatMessage",2);$([w()],x.prototype,"chatMessages",2);$([w()],x.prototype,"chatToolMessages",2);$([w()],x.prototype,"chatStream",2);$([w()],x.prototype,"chatStreamStartedAt",2);$([w()],x.prototype,"chatRunId",2);$([w()],x.prototype,"compactionStatus",2);$([w()],x.prototype,"chatAvatarUrl",2);$([w()],x.prototype,"chatThinkingLevel",2);$([w()],x.prototype,"chatQueue",2);$([w()],x.prototype,"chatAttachments",2);$([w()],x.prototype,"chatManualRefreshInFlight",2);$([w()],x.prototype,"sidebarOpen",2);$([w()],x.prototype,"sidebarContent",2);$([w()],x.prototype,"sidebarError",2);$([w()],x.prototype,"splitRatio",2);$([w()],x.prototype,"nodesLoading",2);$([w()],x.prototype,"nodes",2);$([w()],x.prototype,"devicesLoading",2);$([w()],x.prototype,"devicesError",2);$([w()],x.prototype,"devicesList",2);$([w()],x.prototype,"execApprovalsLoading",2);$([w()],x.prototype,"execApprovalsSaving",2);$([w()],x.prototype,"execApprovalsDirty",2);$([w()],x.prototype,"execApprovalsSnapshot",2);$([w()],x.prototype,"execApprovalsForm",2);$([w()],x.prototype,"execApprovalsSelectedAgent",2);$([w()],x.prototype,"execApprovalsTarget",2);$([w()],x.prototype,"execApprovalsTargetNodeId",2);$([w()],x.prototype,"execApprovalQueue",2);$([w()],x.prototype,"execApprovalBusy",2);$([w()],x.prototype,"execApprovalError",2);$([w()],x.prototype,"pendingGatewayUrl",2);$([w()],x.prototype,"configLoading",2);$([w()],x.prototype,"configRaw",2);$([w()],x.prototype,"configRawOriginal",2);$([w()],x.prototype,"configValid",2);$([w()],x.prototype,"configIssues",2);$([w()],x.prototype,"configSaving",2);$([w()],x.prototype,"configApplying",2);$([w()],x.prototype,"updateRunning",2);$([w()],x.prototype,"applySessionKey",2);$([w()],x.prototype,"configSnapshot",2);$([w()],x.prototype,"configSchema",2);$([w()],x.prototype,"configSchemaVersion",2);$([w()],x.prototype,"configSchemaLoading",2);$([w()],x.prototype,"configUiHints",2);$([w()],x.prototype,"configForm",2);$([w()],x.prototype,"configFormOriginal",2);$([w()],x.prototype,"configFormDirty",2);$([w()],x.prototype,"configFormMode",2);$([w()],x.prototype,"configSearchQuery",2);$([w()],x.prototype,"configActiveSection",2);$([w()],x.prototype,"configActiveSubsection",2);$([w()],x.prototype,"channelsLoading",2);$([w()],x.prototype,"channelsSnapshot",2);$([w()],x.prototype,"channelsError",2);$([w()],x.prototype,"channelsLastSuccess",2);$([w()],x.prototype,"whatsappLoginMessage",2);$([w()],x.prototype,"whatsappLoginQrDataUrl",2);$([w()],x.prototype,"whatsappLoginConnected",2);$([w()],x.prototype,"whatsappBusy",2);$([w()],x.prototype,"nostrProfileFormState",2);$([w()],x.prototype,"nostrProfileAccountId",2);$([w()],x.prototype,"presenceLoading",2);$([w()],x.prototype,"presenceEntries",2);$([w()],x.prototype,"presenceError",2);$([w()],x.prototype,"presenceStatus",2);$([w()],x.prototype,"agentsLoading",2);$([w()],x.prototype,"agentsList",2);$([w()],x.prototype,"agentsError",2);$([w()],x.prototype,"agentsSelectedId",2);$([w()],x.prototype,"agentsPanel",2);$([w()],x.prototype,"agentFilesLoading",2);$([w()],x.prototype,"agentFilesError",2);$([w()],x.prototype,"agentFilesList",2);$([w()],x.prototype,"agentFileContents",2);$([w()],x.prototype,"agentFileDrafts",2);$([w()],x.prototype,"agentFileActive",2);$([w()],x.prototype,"agentFileSaving",2);$([w()],x.prototype,"agentIdentityLoading",2);$([w()],x.prototype,"agentIdentityError",2);$([w()],x.prototype,"agentIdentityById",2);$([w()],x.prototype,"agentSkillsLoading",2);$([w()],x.prototype,"agentSkillsError",2);$([w()],x.prototype,"agentSkillsReport",2);$([w()],x.prototype,"agentSkillsAgentId",2);$([w()],x.prototype,"sessionsLoading",2);$([w()],x.prototype,"sessionsResult",2);$([w()],x.prototype,"sessionsError",2);$([w()],x.prototype,"sessionsFilterActive",2);$([w()],x.prototype,"sessionsFilterLimit",2);$([w()],x.prototype,"sessionsIncludeGlobal",2);$([w()],x.prototype,"sessionsIncludeUnknown",2);$([w()],x.prototype,"usageLoading",2);$([w()],x.prototype,"usageResult",2);$([w()],x.prototype,"usageCostSummary",2);$([w()],x.prototype,"usageError",2);$([w()],x.prototype,"usageStartDate",2);$([w()],x.prototype,"usageEndDate",2);$([w()],x.prototype,"usageSelectedSessions",2);$([w()],x.prototype,"usageSelectedDays",2);$([w()],x.prototype,"usageSelectedHours",2);$([w()],x.prototype,"usageChartMode",2);$([w()],x.prototype,"usageDailyChartMode",2);$([w()],x.prototype,"usageTimeSeriesMode",2);$([w()],x.prototype,"usageTimeSeriesBreakdownMode",2);$([w()],x.prototype,"usageTimeSeries",2);$([w()],x.prototype,"usageTimeSeriesLoading",2);$([w()],x.prototype,"usageSessionLogs",2);$([w()],x.prototype,"usageSessionLogsLoading",2);$([w()],x.prototype,"usageSessionLogsExpanded",2);$([w()],x.prototype,"usageQuery",2);$([w()],x.prototype,"usageQueryDraft",2);$([w()],x.prototype,"usageSessionSort",2);$([w()],x.prototype,"usageSessionSortDir",2);$([w()],x.prototype,"usageRecentSessions",2);$([w()],x.prototype,"usageTimeZone",2);$([w()],x.prototype,"usageContextExpanded",2);$([w()],x.prototype,"usageHeaderPinned",2);$([w()],x.prototype,"usageSessionsTab",2);$([w()],x.prototype,"usageVisibleColumns",2);$([w()],x.prototype,"usageLogFilterRoles",2);$([w()],x.prototype,"usageLogFilterTools",2);$([w()],x.prototype,"usageLogFilterHasTools",2);$([w()],x.prototype,"usageLogFilterQuery",2);$([w()],x.prototype,"cronLoading",2);$([w()],x.prototype,"cronJobs",2);$([w()],x.prototype,"cronStatus",2);$([w()],x.prototype,"cronError",2);$([w()],x.prototype,"cronForm",2);$([w()],x.prototype,"cronRunsJobId",2);$([w()],x.prototype,"cronRuns",2);$([w()],x.prototype,"cronBusy",2);$([w()],x.prototype,"skillsLoading",2);$([w()],x.prototype,"skillsReport",2);$([w()],x.prototype,"skillsError",2);$([w()],x.prototype,"skillsFilter",2);$([w()],x.prototype,"skillEdits",2);$([w()],x.prototype,"skillsBusyKey",2);$([w()],x.prototype,"skillMessages",2);$([w()],x.prototype,"debugLoading",2);$([w()],x.prototype,"debugStatus",2);$([w()],x.prototype,"debugHealth",2);$([w()],x.prototype,"debugModels",2);$([w()],x.prototype,"debugHeartbeat",2);$([w()],x.prototype,"debugCallMethod",2);$([w()],x.prototype,"debugCallParams",2);$([w()],x.prototype,"debugCallResult",2);$([w()],x.prototype,"debugCallError",2);$([w()],x.prototype,"logsLoading",2);$([w()],x.prototype,"logsError",2);$([w()],x.prototype,"logsFile",2);$([w()],x.prototype,"logsEntries",2);$([w()],x.prototype,"logsFilterText",2);$([w()],x.prototype,"logsLevelFilters",2);$([w()],x.prototype,"logsAutoFollow",2);$([w()],x.prototype,"logsTruncated",2);$([w()],x.prototype,"logsCursor",2);$([w()],x.prototype,"logsLastFetchAt",2);$([w()],x.prototype,"logsLimit",2);$([w()],x.prototype,"logsMaxBytes",2);$([w()],x.prototype,"logsAtBottom",2);$([w()],x.prototype,"settingsOpen",2);$([w()],x.prototype,"settingsSection",2);$([w()],x.prototype,"showOnboardingWizard",2);$([w()],x.prototype,"onboardingStep",2);$([w()],x.prototype,"onboardingLocale",2);$([w()],x.prototype,"onboardingLoginStatus",2);$([w()],x.prototype,"onboardingLoginDisplayName",2);$([w()],x.prototype,"onboardingLoginAvatarUrl",2);$([w()],x.prototype,"onboardingLoginEmail",2);$([w()],x.prototype,"onboardingLoginError",2);$([w()],x.prototype,"onboardingIsExistingAccount",2);$([w()],x.prototype,"onboardingSelectedProvider",2);$([w()],x.prototype,"onboardingProviderApiKey",2);$([w()],x.prototype,"onboardingProviderSearchQuery",2);$([w()],x.prototype,"onboardingSelectedChannel",2);$([w()],x.prototype,"onboardingChannelToken",2);$([w()],x.prototype,"chatNewMessagesBelow",2);x=$([Tr("opensoul-app")],x);
//# sourceMappingURL=index-CWTjIM1E.js.map
