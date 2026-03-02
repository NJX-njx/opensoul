(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();const On=globalThis,Ui=On.ShadowRoot&&(On.ShadyCSS===void 0||On.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Hi=Symbol(),Ya=new WeakMap;let Cr=class{constructor(t,n,s){if(this._$cssResult$=!0,s!==Hi)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n}get styleSheet(){let t=this.o;const n=this.t;if(Ui&&t===void 0){const s=n!==void 0&&n.length===1;s&&(t=Ya.get(n)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Ya.set(n,t))}return t}toString(){return this.cssText}};const kc=e=>new Cr(typeof e=="string"?e:e+"",void 0,Hi),Sc=(e,...t)=>{const n=e.length===1?e[0]:t.reduce((s,i,a)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new Cr(n,e,Hi)},Ac=(e,t)=>{if(Ui)e.adoptedStyleSheets=t.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet);else for(const n of t){const s=document.createElement("style"),i=On.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=n.cssText,e.appendChild(s)}},Za=Ui?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let n="";for(const s of t.cssRules)n+=s.cssText;return kc(n)})(e):e;const{is:Cc,defineProperty:_c,getOwnPropertyDescriptor:Tc,getOwnPropertyNames:Lc,getOwnPropertySymbols:Ec,getPrototypeOf:Ic}=Object,is=globalThis,Ja=is.trustedTypes,Mc=Ja?Ja.emptyScript:"",Rc=is.reactiveElementPolyfillSupport,Jt=(e,t)=>e,Kn={toAttribute(e,t){switch(t){case Boolean:e=e?Mc:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},Ki=(e,t)=>!Cc(e,t),Xa={attribute:!0,type:String,converter:Kn,reflect:!1,useDefault:!1,hasChanged:Ki};Symbol.metadata??=Symbol("metadata"),is.litPropertyMetadata??=new WeakMap;let Et=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,n=Xa){if(n.state&&(n.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((n=Object.create(n)).wrapped=!0),this.elementProperties.set(t,n),!n.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,n);i!==void 0&&_c(this.prototype,t,i)}}static getPropertyDescriptor(t,n,s){const{get:i,set:a}=Tc(this.prototype,t)??{get(){return this[n]},set(o){this[n]=o}};return{get:i,set(o){const c=i?.call(this);a?.call(this,o),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Xa}static _$Ei(){if(this.hasOwnProperty(Jt("elementProperties")))return;const t=Ic(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Jt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Jt("properties"))){const n=this.properties,s=[...Lc(n),...Ec(n)];for(const i of s)this.createProperty(i,n[i])}const t=this[Symbol.metadata];if(t!==null){const n=litPropertyMetadata.get(t);if(n!==void 0)for(const[s,i]of n)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[n,s]of this.elementProperties){const i=this._$Eu(n,s);i!==void 0&&this._$Eh.set(i,n)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const n=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)n.unshift(Za(i))}else t!==void 0&&n.push(Za(t));return n}static _$Eu(t,n){const s=n.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,n=this.constructor.elementProperties;for(const s of n.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ac(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,n,s){this._$AK(t,s)}_$ET(t,n){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const a=(s.converter?.toAttribute!==void 0?s.converter:Kn).toAttribute(n,s.type);this._$Em=t,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(t,n){const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const a=s.getPropertyOptions(i),o=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:Kn;this._$Em=i;const c=o.fromAttribute(n,a.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(t,n,s,i=!1,a){if(t!==void 0){const o=this.constructor;if(i===!1&&(a=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??Ki)(a,n)||s.useDefault&&s.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,n,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,n,{useDefault:s,reflect:i,wrapped:a},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??n??this[t]),a!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(n=void 0),this._$AL.set(t,n)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(n){Promise.reject(n)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,a]of this._$Ep)this[i]=a;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[i,a]of s){const{wrapped:o}=a,c=this[i];o!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,a,c)}}let t=!1;const n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(n)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(n)}willUpdate(t){}_$AE(t){this._$EO?.forEach(n=>n.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(n=>this._$ET(n,this[n])),this._$EM()}updated(t){}firstUpdated(t){}};Et.elementStyles=[],Et.shadowRootOptions={mode:"open"},Et[Jt("elementProperties")]=new Map,Et[Jt("finalized")]=new Map,Rc?.({ReactiveElement:Et}),(is.reactiveElementVersions??=[]).push("2.1.2");const ji=globalThis,eo=e=>e,jn=ji.trustedTypes,to=jn?jn.createPolicy("lit-html",{createHTML:e=>e}):void 0,_r="$lit$",Ze=`lit$${Math.random().toFixed(9).slice(2)}$`,Tr="?"+Ze,Pc=`<${Tr}>`,vt=document,an=()=>vt.createComment(""),on=e=>e===null||typeof e!="object"&&typeof e!="function",Wi=Array.isArray,Dc=e=>Wi(e)||typeof e?.[Symbol.iterator]=="function",Ms=`[ 	
\f\r]`,Ut=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,no=/-->/g,so=/>/g,ot=RegExp(`>|${Ms}(?:([^\\s"'>=/]+)(${Ms}*=${Ms}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),io=/'/g,ao=/"/g,Lr=/^(?:script|style|textarea|title)$/i,Er=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),r=Er(1),An=Er(2),Xe=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),oo=new WeakMap,ht=vt.createTreeWalker(vt,129);function Ir(e,t){if(!Wi(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return to!==void 0?to.createHTML(t):t}const Nc=(e,t)=>{const n=e.length-1,s=[];let i,a=t===2?"<svg>":t===3?"<math>":"",o=Ut;for(let c=0;c<n;c++){const l=e[c];let u,g,p=-1,h=0;for(;h<l.length&&(o.lastIndex=h,g=o.exec(l),g!==null);)h=o.lastIndex,o===Ut?g[1]==="!--"?o=no:g[1]!==void 0?o=so:g[2]!==void 0?(Lr.test(g[2])&&(i=RegExp("</"+g[2],"g")),o=ot):g[3]!==void 0&&(o=ot):o===ot?g[0]===">"?(o=i??Ut,p=-1):g[1]===void 0?p=-2:(p=o.lastIndex-g[2].length,u=g[1],o=g[3]===void 0?ot:g[3]==='"'?ao:io):o===ao||o===io?o=ot:o===no||o===so?o=Ut:(o=ot,i=void 0);const m=o===ot&&e[c+1].startsWith("/>")?" ":"";a+=o===Ut?l+Pc:p>=0?(s.push(u),l.slice(0,p)+_r+l.slice(p)+Ze+m):l+Ze+(p===-2?c:m)}return[Ir(e,a+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};let li=class Mr{constructor({strings:t,_$litType$:n},s){let i;this.parts=[];let a=0,o=0;const c=t.length-1,l=this.parts,[u,g]=Nc(t,n);if(this.el=Mr.createElement(u,s),ht.currentNode=this.el.content,n===2||n===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=ht.nextNode())!==null&&l.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(const p of i.getAttributeNames())if(p.endsWith(_r)){const h=g[o++],m=i.getAttribute(p).split(Ze),v=/([.?@])?(.*)/.exec(h);l.push({type:1,index:a,name:v[2],strings:m,ctor:v[1]==="."?Oc:v[1]==="?"?Bc:v[1]==="@"?zc:os}),i.removeAttribute(p)}else p.startsWith(Ze)&&(l.push({type:6,index:a}),i.removeAttribute(p));if(Lr.test(i.tagName)){const p=i.textContent.split(Ze),h=p.length-1;if(h>0){i.textContent=jn?jn.emptyScript:"";for(let m=0;m<h;m++)i.append(p[m],an()),ht.nextNode(),l.push({type:2,index:++a});i.append(p[h],an())}}}else if(i.nodeType===8)if(i.data===Tr)l.push({type:2,index:a});else{let p=-1;for(;(p=i.data.indexOf(Ze,p+1))!==-1;)l.push({type:7,index:a}),p+=Ze.length-1}a++}}static createElement(t,n){const s=vt.createElement("template");return s.innerHTML=t,s}};function Rt(e,t,n=e,s){if(t===Xe)return t;let i=s!==void 0?n._$Co?.[s]:n._$Cl;const a=on(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,s)),s!==void 0?(n._$Co??=[])[s]=i:n._$Cl=i),i!==void 0&&(t=Rt(e,i._$AS(e,t.values),i,s)),t}class Fc{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:n},parts:s}=this._$AD,i=(t?.creationScope??vt).importNode(n,!0);ht.currentNode=i;let a=ht.nextNode(),o=0,c=0,l=s[0];for(;l!==void 0;){if(o===l.index){let u;l.type===2?u=new as(a,a.nextSibling,this,t):l.type===1?u=new l.ctor(a,l.name,l.strings,this,t):l.type===6&&(u=new Uc(a,this,t)),this._$AV.push(u),l=s[++c]}o!==l?.index&&(a=ht.nextNode(),o++)}return ht.currentNode=vt,i}p(t){let n=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,n),n+=s.strings.length-2):s._$AI(t[n])),n++}}let as=class Rr{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,s,i){this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Rt(this,t,n),on(t)?t===f||t==null||t===""?(this._$AH!==f&&this._$AR(),this._$AH=f):t!==this._$AH&&t!==Xe&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Dc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==f&&on(this._$AH)?this._$AA.nextSibling.data=t:this.T(vt.createTextNode(t)),this._$AH=t}$(t){const{values:n,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=li.createElement(Ir(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(n);else{const a=new Fc(i,this),o=a.u(this.options);a.p(n),this.T(o),this._$AH=a}}_$AC(t){let n=oo.get(t.strings);return n===void 0&&oo.set(t.strings,n=new li(t)),n}k(t){Wi(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let s,i=0;for(const a of t)i===n.length?n.push(s=new Rr(this.O(an()),this.O(an()),this,this.options)):s=n[i],s._$AI(a),i++;i<n.length&&(this._$AR(s&&s._$AB.nextSibling,i),n.length=i)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){const s=eo(t).nextSibling;eo(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}};class os{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,s,i,a){this.type=1,this._$AH=f,this._$AN=void 0,this.element=t,this.name=n,this._$AM=i,this.options=a,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=f}_$AI(t,n=this,s,i){const a=this.strings;let o=!1;if(a===void 0)t=Rt(this,t,n,0),o=!on(t)||t!==this._$AH&&t!==Xe,o&&(this._$AH=t);else{const c=t;let l,u;for(t=a[0],l=0;l<a.length-1;l++)u=Rt(this,c[s+l],n,l),u===Xe&&(u=this._$AH[l]),o||=!on(u)||u!==this._$AH[l],u===f?t=f:t!==f&&(t+=(u??"")+a[l+1]),this._$AH[l]=u}o&&!i&&this.j(t)}j(t){t===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}let Oc=class extends os{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===f?void 0:t}},Bc=class extends os{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==f)}},zc=class extends os{constructor(t,n,s,i,a){super(t,n,s,i,a),this.type=5}_$AI(t,n=this){if((t=Rt(this,t,n,0)??f)===Xe)return;const s=this._$AH,i=t===f&&s!==f||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,a=t!==f&&(s===f||i);i&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Uc=class{constructor(t,n,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Rt(this,t)}};const Hc={I:as},Kc=ji.litHtmlPolyfillSupport;Kc?.(li,as),(ji.litHtmlVersions??=[]).push("3.3.2");const jc=(e,t,n)=>{const s=n?.renderBefore??t;let i=s._$litPart$;if(i===void 0){const a=n?.renderBefore??null;s._$litPart$=i=new as(t.insertBefore(an(),a),a,void 0,n??{})}return i._$AI(e),i};const Gi=globalThis;let Mt=class extends Et{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const n=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=jc(n,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Xe}};Mt._$litElement$=!0,Mt.finalized=!0,Gi.litElementHydrateSupport?.({LitElement:Mt});const Wc=Gi.litElementPolyfillSupport;Wc?.({LitElement:Mt});(Gi.litElementVersions??=[]).push("4.2.2");const Pr=e=>(t,n)=>{n!==void 0?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};const Gc={attribute:!0,type:String,converter:Kn,reflect:!1,hasChanged:Ki},qc=(e=Gc,t,n)=>{const{kind:s,metadata:i}=n;let a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),s==="setter"&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),s==="accessor"){const{name:o}=n;return{set(c){const l=t.get.call(this);t.set.call(this,c),this.requestUpdate(o,l,e,!0,c)},init(c){return c!==void 0&&this.C(o,void 0,e,c),c}}}if(s==="setter"){const{name:o}=n;return function(c){const l=this[o];t.call(this,c),this.requestUpdate(o,l,e,!0,c)}}throw Error("Unsupported decorator location: "+s)};function rs(e){return(t,n)=>typeof n=="object"?qc(e,t,n):((s,i,a)=>{const o=i.hasOwnProperty(a);return i.constructor.createProperty(a,s),o?Object.getOwnPropertyDescriptor(i,a):void 0})(e,t,n)}function k(e){return rs({...e,state:!0,attribute:!1})}async function $e(e,t){if(!(!e.client||!e.connected)&&!e.channelsLoading){e.channelsLoading=!0,e.channelsError=null;try{const n=await e.client.request("channels.status",{probe:t,timeoutMs:8e3});e.channelsSnapshot=n,e.channelsLastSuccess=Date.now()}catch(n){e.channelsError=String(n)}finally{e.channelsLoading=!1}}}async function Vc(e,t){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const n=await e.client.request("web.login.start",{force:t,timeoutMs:3e4});e.whatsappLoginMessage=n.message??null,e.whatsappLoginQrDataUrl=n.qrDataUrl??null,e.whatsappLoginConnected=null}catch(n){e.whatsappLoginMessage=String(n),e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function Qc(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{const t=await e.client.request("web.login.wait",{timeoutMs:12e4});e.whatsappLoginMessage=t.message??null,e.whatsappLoginConnected=t.connected??null,t.connected&&(e.whatsappLoginQrDataUrl=null)}catch(t){e.whatsappLoginMessage=String(t),e.whatsappLoginConnected=null}finally{e.whatsappBusy=!1}}}async function Yc(e){if(!(!e.client||!e.connected||e.whatsappBusy)){e.whatsappBusy=!0;try{await e.client.request("channels.logout",{channel:"whatsapp"}),e.whatsappLoginMessage="Logged out.",e.whatsappLoginQrDataUrl=null,e.whatsappLoginConnected=null}catch(t){e.whatsappLoginMessage=String(t)}finally{e.whatsappBusy=!1}}}function mt(e){return typeof structuredClone=="function"?structuredClone(e):JSON.parse(JSON.stringify(e))}function Pt(e){return`${JSON.stringify(e,null,2).trimEnd()}
`}function Dr(e,t,n){if(t.length===0)return;let s=e;for(let a=0;a<t.length-1;a+=1){const o=t[a],c=t[a+1];if(typeof o=="number"){if(!Array.isArray(s))return;s[o]==null&&(s[o]=typeof c=="number"?[]:{}),s=s[o]}else{if(typeof s!="object"||s==null)return;const l=s;l[o]==null&&(l[o]=typeof c=="number"?[]:{}),s=l[o]}}const i=t[t.length-1];if(typeof i=="number"){Array.isArray(s)&&(s[i]=n);return}typeof s=="object"&&s!=null&&(s[i]=n)}function Nr(e,t){if(t.length===0)return;let n=e;for(let i=0;i<t.length-1;i+=1){const a=t[i];if(typeof a=="number"){if(!Array.isArray(n))return;n=n[a]}else{if(typeof n!="object"||n==null)return;n=n[a]}if(n==null)return}const s=t[t.length-1];if(typeof s=="number"){Array.isArray(n)&&n.splice(s,1);return}typeof n=="object"&&n!=null&&delete n[s]}async function Se(e){if(!(!e.client||!e.connected)){e.configLoading=!0,e.lastError=null;try{const t=await e.client.request("config.get",{});Jc(e,t)}catch(t){e.lastError=String(t)}finally{e.configLoading=!1}}}async function Wn(e){if(!(!e.client||!e.connected)&&!e.configSchemaLoading){e.configSchemaLoading=!0;try{const t=await e.client.request("config.schema",{});Zc(e,t)}catch(t){e.lastError=String(t)}finally{e.configSchemaLoading=!1}}}function Zc(e,t){e.configSchema=t.schema??null,e.configUiHints=t.uiHints??{},e.configSchemaVersion=t.version??null}function Jc(e,t){e.configSnapshot=t;const n=typeof t.raw=="string"?t.raw:t.config&&typeof t.config=="object"?Pt(t.config):e.configRaw;!e.configFormDirty||e.configFormMode==="raw"?e.configRaw=n:e.configForm?e.configRaw=Pt(e.configForm):e.configRaw=n,e.configValid=typeof t.valid=="boolean"?t.valid:null,e.configIssues=Array.isArray(t.issues)?t.issues:[],e.configFormDirty||(e.configForm=mt(t.config??{}),e.configFormOriginal=mt(t.config??{}),e.configRawOriginal=n)}async function Bn(e){if(!(!e.client||!e.connected)){e.configSaving=!0,e.lastError=null;try{const t=e.configFormMode==="form"&&e.configForm?Pt(e.configForm):e.configRaw,n=e.configSnapshot?.hash;if(!n){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.set",{raw:t,baseHash:n}),e.configFormDirty=!1,await Se(e)}catch(t){e.lastError=String(t)}finally{e.configSaving=!1}}}async function Xc(e){if(!(!e.client||!e.connected)){e.configApplying=!0,e.lastError=null;try{const t=e.configFormMode==="form"&&e.configForm?Pt(e.configForm):e.configRaw,n=e.configSnapshot?.hash;if(!n){e.lastError="Config hash missing; reload and retry.";return}await e.client.request("config.apply",{raw:t,baseHash:n,sessionKey:e.applySessionKey}),e.configFormDirty=!1,await Se(e)}catch(t){e.lastError=String(t)}finally{e.configApplying=!1}}}async function ed(e){if(!(!e.client||!e.connected)){e.updateRunning=!0,e.lastError=null;try{await e.client.request("update.run",{sessionKey:e.applySessionKey})}catch(t){e.lastError=String(t)}finally{e.updateRunning=!1}}}function ke(e,t,n){const s=mt(e.configForm??e.configSnapshot?.config??{});Dr(s,t,n),e.configForm=s,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=Pt(s))}function je(e,t){const n=mt(e.configForm??e.configSnapshot?.config??{});Nr(n,t),e.configForm=n,e.configFormDirty=!0,e.configFormMode==="form"&&(e.configRaw=Pt(n))}function td(e){const{values:t,original:n}=e;return t.name!==n.name||t.displayName!==n.displayName||t.about!==n.about||t.picture!==n.picture||t.banner!==n.banner||t.website!==n.website||t.nip05!==n.nip05||t.lud16!==n.lud16}function nd(e){const{state:t,callbacks:n,accountId:s}=e,i=td(t),a=(c,l,u={})=>{const{type:g="text",placeholder:p,maxLength:h,help:m}=u,v=t.values[c]??"",A=t.fieldErrors[c],C=`nostr-profile-${c}`;return g==="textarea"?r`
        <div class="form-field" style="margin-bottom: 12px;">
          <label for="${C}" style="display: block; margin-bottom: 4px; font-weight: 500;">
            ${l}
          </label>
          <textarea
            id="${C}"
            .value=${v}
            placeholder=${p??""}
            maxlength=${h??2e3}
            rows="3"
            style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 4px; resize: vertical; font-family: inherit;"
            @input=${S=>{const d=S.target;n.onFieldChange(c,d.value)}}
            ?disabled=${t.saving}
          ></textarea>
          ${m?r`<div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${m}</div>`:f}
          ${A?r`<div style="font-size: 12px; color: var(--danger-color); margin-top: 2px;">${A}</div>`:f}
        </div>
      `:r`
      <div class="form-field" style="margin-bottom: 12px;">
        <label for="${C}" style="display: block; margin-bottom: 4px; font-weight: 500;">
          ${l}
        </label>
        <input
          id="${C}"
          type=${g}
          .value=${v}
          placeholder=${p??""}
          maxlength=${h??256}
          style="width: 100%; padding: 8px; border: 1px solid var(--border-color); border-radius: 4px;"
          @input=${S=>{const d=S.target;n.onFieldChange(c,d.value)}}
          ?disabled=${t.saving}
        />
        ${m?r`<div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${m}</div>`:f}
        ${A?r`<div style="font-size: 12px; color: var(--danger-color); margin-top: 2px;">${A}</div>`:f}
      </div>
    `},o=()=>{const c=t.values.picture;return c?r`
      <div style="margin-bottom: 12px;">
        <img
          src=${c}
          alt="Profile picture preview"
          style="max-width: 80px; max-height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border-color);"
          @error=${l=>{const u=l.target;u.style.display="none"}}
          @load=${l=>{const u=l.target;u.style.display="block"}}
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

      ${o()}

      ${a("name","Username",{placeholder:"satoshi",maxLength:256,help:"Short username (e.g., satoshi)"})}

      ${a("displayName","Display Name",{placeholder:"Satoshi Nakamoto",maxLength:256,help:"Your full display name"})}

      ${a("about","Bio",{type:"textarea",placeholder:"Tell people about yourself...",maxLength:2e3,help:"A brief bio or description"})}

      ${a("picture","Avatar URL",{type:"url",placeholder:"https://example.com/avatar.jpg",help:"HTTPS URL to your profile picture"})}

      ${t.showAdvanced?r`
            <div style="border-top: 1px solid var(--border-color); padding-top: 12px; margin-top: 12px;">
              <div style="font-weight: 500; margin-bottom: 12px; color: var(--text-muted);">Advanced</div>

              ${a("banner","Banner URL",{type:"url",placeholder:"https://example.com/banner.jpg",help:"HTTPS URL to a banner image"})}

              ${a("website","Website",{type:"url",placeholder:"https://example.com",help:"Your personal website"})}

              ${a("nip05","NIP-05 Identifier",{placeholder:"you@example.com",help:"Verifiable identifier (e.g., you@domain.com)"})}

              ${a("lud16","Lightning Address",{placeholder:"you@getalby.com",help:"Lightning address for tips (LUD-16)"})}
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
  `}function sd(e){const t={name:e?.name??"",displayName:e?.displayName??"",about:e?.about??"",picture:e?.picture??"",banner:e?.banner??"",website:e?.website??"",nip05:e?.nip05??"",lud16:e?.lud16??""};return{values:t,original:{...t},saving:!1,importing:!1,error:null,success:null,fieldErrors:{},showAdvanced:!!(e?.banner||e?.website||e?.nip05||e?.lud16)}}async function id(e,t){await Vc(e,t),await $e(e,!0)}async function ad(e){await Qc(e),await $e(e,!0)}async function od(e){await Yc(e),await $e(e,!0)}async function rd(e){await Bn(e),await Se(e),await $e(e,!0)}async function ld(e){await Se(e),await $e(e,!0)}function cd(e){if(!Array.isArray(e))return{};const t={};for(const n of e){if(typeof n!="string")continue;const[s,...i]=n.split(":");if(!s||i.length===0)continue;const a=s.trim(),o=i.join(":").trim();a&&o&&(t[a]=o)}return t}function Fr(e){return(e.channelsSnapshot?.channelAccounts?.nostr??[])[0]?.accountId??e.nostrProfileAccountId??"default"}function Or(e,t=""){return`/api/channels/nostr/${encodeURIComponent(e)}/profile${t}`}function dd(e,t,n){e.nostrProfileAccountId=t,e.nostrProfileFormState=sd(n??void 0)}function ud(e){e.nostrProfileFormState=null,e.nostrProfileAccountId=null}function gd(e,t,n){const s=e.nostrProfileFormState;s&&(e.nostrProfileFormState={...s,values:{...s.values,[t]:n},fieldErrors:{...s.fieldErrors,[t]:""}})}function pd(e){const t=e.nostrProfileFormState;t&&(e.nostrProfileFormState={...t,showAdvanced:!t.showAdvanced})}async function hd(e){const t=e.nostrProfileFormState;if(!t||t.saving)return;const n=Fr(e);e.nostrProfileFormState={...t,saving:!0,error:null,success:null,fieldErrors:{}};try{const s=await fetch(Or(n),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t.values)}),i=await s.json().catch(()=>null);if(!s.ok||i?.ok===!1||!i){const a=i?.error??`Profile update failed (${s.status})`;e.nostrProfileFormState={...t,saving:!1,error:a,success:null,fieldErrors:cd(i?.details)};return}if(!i.persisted){e.nostrProfileFormState={...t,saving:!1,error:"Profile publish failed on all relays.",success:null};return}e.nostrProfileFormState={...t,saving:!1,error:null,success:"Profile published to relays.",fieldErrors:{},original:{...t.values}},await $e(e,!0)}catch(s){e.nostrProfileFormState={...t,saving:!1,error:`Profile update failed: ${String(s)}`,success:null}}}async function fd(e){const t=e.nostrProfileFormState;if(!t||t.importing)return;const n=Fr(e);e.nostrProfileFormState={...t,importing:!0,error:null,success:null};try{const s=await fetch(Or(n,"/import"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({autoMerge:!0})}),i=await s.json().catch(()=>null);if(!s.ok||i?.ok===!1||!i){const l=i?.error??`Profile import failed (${s.status})`;e.nostrProfileFormState={...t,importing:!1,error:l,success:null};return}const a=i.merged??i.imported??null,o=a?{...t.values,...a}:t.values,c=!!(o.banner||o.website||o.nip05||o.lud16);e.nostrProfileFormState={...t,importing:!1,values:o,error:null,success:i.saved?"Profile imported from relays. Review and publish.":"Profile imported. Review and publish.",showAdvanced:c},i.saved&&await $e(e,!0)}catch(s){e.nostrProfileFormState={...t,importing:!1,error:`Profile import failed: ${String(s)}`,success:null}}}function Br(e){const t=(e??"").trim();if(!t)return null;const n=t.split(":").filter(Boolean);if(n.length<3||n[0]!=="agent")return null;const s=n[1]?.trim(),i=n.slice(2).join(":");return!s||!i?null:{agentId:s,rest:i}}const ci=450;function pn(e,t=!1,n=!1){e.chatScrollFrame&&cancelAnimationFrame(e.chatScrollFrame),e.chatScrollTimeout!=null&&(clearTimeout(e.chatScrollTimeout),e.chatScrollTimeout=null);const s=()=>{const i=e.querySelector(".chat-thread");if(i){const a=getComputedStyle(i).overflowY;if(a==="auto"||a==="scroll"||i.scrollHeight-i.clientHeight>1)return i}return document.scrollingElement??document.documentElement};e.updateComplete.then(()=>{e.chatScrollFrame=requestAnimationFrame(()=>{e.chatScrollFrame=null;const i=s();if(!i)return;const a=i.scrollHeight-i.scrollTop-i.clientHeight,o=t&&!e.chatHasAutoScrolled;if(!(o||e.chatUserNearBottom||a<ci)){e.chatNewMessagesBelow=!0;return}o&&(e.chatHasAutoScrolled=!0);const l=n&&(typeof window>"u"||typeof window.matchMedia!="function"||!window.matchMedia("(prefers-reduced-motion: reduce)").matches),u=i.scrollHeight;typeof i.scrollTo=="function"?i.scrollTo({top:u,behavior:l?"smooth":"auto"}):i.scrollTop=u,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1;const g=o?150:120;e.chatScrollTimeout=window.setTimeout(()=>{e.chatScrollTimeout=null;const p=s();if(!p)return;const h=p.scrollHeight-p.scrollTop-p.clientHeight;(o||e.chatUserNearBottom||h<ci)&&(p.scrollTop=p.scrollHeight,e.chatUserNearBottom=!0)},g)})})}function zr(e,t=!1){e.logsScrollFrame&&cancelAnimationFrame(e.logsScrollFrame),e.updateComplete.then(()=>{e.logsScrollFrame=requestAnimationFrame(()=>{e.logsScrollFrame=null;const n=e.querySelector(".log-stream");if(!n)return;const s=n.scrollHeight-n.scrollTop-n.clientHeight;(t||s<80)&&(n.scrollTop=n.scrollHeight)})})}function vd(e,t){const n=t.currentTarget;if(!n)return;const s=n.scrollHeight-n.scrollTop-n.clientHeight;e.chatUserNearBottom=s<ci,e.chatUserNearBottom&&(e.chatNewMessagesBelow=!1)}function md(e,t){const n=t.currentTarget;if(!n)return;const s=n.scrollHeight-n.scrollTop-n.clientHeight;e.logsAtBottom=s<80}function ro(e){e.chatHasAutoScrolled=!1,e.chatUserNearBottom=!0,e.chatNewMessagesBelow=!1}function bd(e,t){if(e.length===0)return;const n=new Blob([`${e.join(`
`)}
`],{type:"text/plain"}),s=URL.createObjectURL(n),i=document.createElement("a"),a=new Date().toISOString().slice(0,19).replace(/[:T]/g,"-");i.href=s,i.download=`opensoul-logs-${t}-${a}.log`,i.click(),URL.revokeObjectURL(s)}function yd(e){if(typeof ResizeObserver>"u")return;const t=e.querySelector(".topbar");if(!t)return;const n=()=>{const{height:s}=t.getBoundingClientRect();e.style.setProperty("--topbar-height",`${s}px`)};n(),e.topbarObserver=new ResizeObserver(()=>n()),e.topbarObserver.observe(t)}async function Dt(e){if(!(!e.client||!e.connected)&&!e.debugLoading){e.debugLoading=!0;try{const[t,n,s,i]=await Promise.all([e.client.request("status",{}),e.client.request("health",{}),e.client.request("models.list",{}),e.client.request("last-heartbeat",{})]);e.debugStatus=t,e.debugHealth=n;const a=s;e.debugModels=Array.isArray(a?.models)?a?.models:[],e.debugHeartbeat=i}catch(t){e.debugCallError=String(t)}finally{e.debugLoading=!1}}}async function xd(e){if(!(!e.client||!e.connected)){e.debugCallError=null,e.debugCallResult=null;try{const t=e.debugCallParams.trim()?JSON.parse(e.debugCallParams):{},n=await e.client.request(e.debugCallMethod.trim(),t);e.debugCallResult=JSON.stringify(n,null,2)}catch(t){e.debugCallError=String(t)}}}const $d=2e3,wd=new Set(["trace","debug","info","warn","error","fatal"]);function kd(e){if(typeof e!="string")return null;const t=e.trim();if(!t.startsWith("{")||!t.endsWith("}"))return null;try{const n=JSON.parse(t);return!n||typeof n!="object"?null:n}catch{return null}}function Sd(e){if(typeof e!="string")return null;const t=e.toLowerCase();return wd.has(t)?t:null}function Ad(e){if(!e.trim())return{raw:e,message:e};try{const t=JSON.parse(e),n=t&&typeof t._meta=="object"&&t._meta!==null?t._meta:null,s=typeof t.time=="string"?t.time:typeof n?.date=="string"?n?.date:null,i=Sd(n?.logLevelName??n?.level),a=typeof t[0]=="string"?t[0]:typeof n?.name=="string"?n?.name:null,o=kd(a);let c=null;o&&(typeof o.subsystem=="string"?c=o.subsystem:typeof o.module=="string"&&(c=o.module)),!c&&a&&a.length<120&&(c=a);let l=null;return typeof t[1]=="string"?l=t[1]:!o&&typeof t[0]=="string"?l=t[0]:typeof t.message=="string"&&(l=t.message),{raw:e,time:s,level:i,subsystem:c,message:l??e,meta:n??void 0}}catch{return{raw:e,message:e}}}async function rn(e,t){if(!(!e.client||!e.connected)&&!(e.logsLoading&&!t?.quiet)){t?.quiet||(e.logsLoading=!0),e.logsError=null;try{const s=await e.client.request("logs.tail",{cursor:t?.reset?void 0:e.logsCursor??void 0,limit:e.logsLimit,maxBytes:e.logsMaxBytes}),a=(Array.isArray(s.lines)?s.lines.filter(c=>typeof c=="string"):[]).map(Ad),o=!!(t?.reset||s.reset||e.logsCursor==null);e.logsEntries=o?a:[...e.logsEntries,...a].slice(-$d),typeof s.cursor=="number"&&(e.logsCursor=s.cursor),typeof s.file=="string"&&(e.logsFile=s.file),e.logsTruncated=!!s.truncated,e.logsLastFetchAt=Date.now()}catch(n){e.logsError=String(n)}finally{t?.quiet||(e.logsLoading=!1)}}}async function ls(e,t){if(!(!e.client||!e.connected)&&!e.nodesLoading){e.nodesLoading=!0,t?.quiet||(e.lastError=null);try{const n=await e.client.request("node.list",{});e.nodes=Array.isArray(n.nodes)?n.nodes:[]}catch(n){t?.quiet||(e.lastError=String(n))}finally{e.nodesLoading=!1}}}function Cd(e){e.nodesPollInterval==null&&(e.nodesPollInterval=window.setInterval(()=>{ls(e,{quiet:!0})},5e3))}function _d(e){e.nodesPollInterval!=null&&(clearInterval(e.nodesPollInterval),e.nodesPollInterval=null)}function qi(e){e.logsPollInterval==null&&(e.logsPollInterval=window.setInterval(()=>{e.tab==="logs"&&rn(e,{quiet:!0})},2e3))}function Vi(e){e.logsPollInterval!=null&&(clearInterval(e.logsPollInterval),e.logsPollInterval=null)}function Qi(e){e.debugPollInterval==null&&(e.debugPollInterval=window.setInterval(()=>{e.tab==="debug"&&Dt(e)},3e3))}function Yi(e){e.debugPollInterval!=null&&(clearInterval(e.debugPollInterval),e.debugPollInterval=null)}async function Ur(e,t){if(!(!e.client||!e.connected||e.agentIdentityLoading)&&!e.agentIdentityById[t]){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{const n=await e.client.request("agent.identity.get",{agentId:t});n&&(e.agentIdentityById={...e.agentIdentityById,[t]:n})}catch(n){e.agentIdentityError=String(n)}finally{e.agentIdentityLoading=!1}}}async function Hr(e,t){if(!e.client||!e.connected||e.agentIdentityLoading)return;const n=t.filter(s=>!e.agentIdentityById[s]);if(n.length!==0){e.agentIdentityLoading=!0,e.agentIdentityError=null;try{for(const s of n){const i=await e.client.request("agent.identity.get",{agentId:s});i&&(e.agentIdentityById={...e.agentIdentityById,[s]:i})}}catch(s){e.agentIdentityError=String(s)}finally{e.agentIdentityLoading=!1}}}async function zn(e,t){if(!(!e.client||!e.connected)&&!e.agentSkillsLoading){e.agentSkillsLoading=!0,e.agentSkillsError=null;try{const n=await e.client.request("skills.status",{agentId:t});n&&(e.agentSkillsReport=n,e.agentSkillsAgentId=t)}catch(n){e.agentSkillsError=String(n)}finally{e.agentSkillsLoading=!1}}}async function Zi(e){if(!(!e.client||!e.connected)&&!e.agentsLoading){e.agentsLoading=!0,e.agentsError=null;try{const t=await e.client.request("agents.list",{});if(t){e.agentsList=t;const n=e.agentsSelectedId,s=t.agents.some(i=>i.id===n);(!n||!s)&&(e.agentsSelectedId=t.defaultId??t.agents[0]?.id??null)}}catch(t){e.agentsError=String(t)}finally{e.agentsLoading=!1}}}function Ji(e,t){if(e==null||!Number.isFinite(e)||e<=0)return;if(e<1e3)return`${Math.round(e)}ms`;const n=t?.spaced?" ":"",s=Math.round(e/1e3),i=Math.floor(s/3600),a=Math.floor(s%3600/60),o=s%60;if(i>=24){const c=Math.floor(i/24),l=i%24;return l>0?`${c}d${n}${l}h`:`${c}d`}return i>0?a>0?`${i}h${n}${a}m`:`${i}h`:a>0?o>0?`${a}m${n}${o}s`:`${a}m`:`${o}s`}function Xi(e,t="n/a"){if(e==null||!Number.isFinite(e)||e<0)return t;if(e<1e3)return`${Math.round(e)}ms`;const n=Math.round(e/1e3);if(n<60)return`${n}s`;const s=Math.round(n/60);if(s<60)return`${s}m`;const i=Math.round(s/60);return i<24?`${i}h`:`${Math.round(i/24)}d`}function J(e,t){if(e==null||!Number.isFinite(e))return"n/a";const s=Date.now()-e,i=Math.abs(s),a=s>=0,o=Math.round(i/1e3);if(o<60)return a?"just now":"in <1m";const c=Math.round(o/60);if(c<60)return a?`${c}m ago`:`in ${c}m`;const l=Math.round(c/60);if(l<48)return a?`${l}h ago`:`in ${l}h`;const u=Math.round(l/24);return a?`${u}d ago`:`in ${u}d`}const Td=/<\s*\/?\s*(?:think(?:ing)?|thought|antthinking|final)\b/i,Cn=/<\s*\/?\s*final\b[^<>]*>/gi,lo=/<\s*(\/?)\s*(?:think(?:ing)?|thought|antthinking)\b[^<>]*>/gi;function co(e){const t=[],n=/(^|\n)(```|~~~)[^\n]*\n[\s\S]*?(?:\n\2(?:\n|$)|$)/g;for(const i of e.matchAll(n)){const a=(i.index??0)+i[1].length;t.push({start:a,end:a+i[0].length-i[1].length})}const s=/`+[^`]+`+/g;for(const i of e.matchAll(s)){const a=i.index??0,o=a+i[0].length;t.some(l=>a>=l.start&&o<=l.end)||t.push({start:a,end:o})}return t.sort((i,a)=>i.start-a.start),t}function uo(e,t){return t.some(n=>e>=n.start&&e<n.end)}function Ld(e,t){return e.trimStart()}function Ed(e,t){if(!e||!Td.test(e))return e;let n=e;if(Cn.test(n)){Cn.lastIndex=0;const c=[],l=co(n);for(const u of n.matchAll(Cn)){const g=u.index??0;c.push({start:g,length:u[0].length,inCode:uo(g,l)})}for(let u=c.length-1;u>=0;u--){const g=c[u];g.inCode||(n=n.slice(0,g.start)+n.slice(g.start+g.length))}}else Cn.lastIndex=0;const s=co(n);lo.lastIndex=0;let i="",a=0,o=!1;for(const c of n.matchAll(lo)){const l=c.index??0,u=c[1]==="/";uo(l,s)||(o?u&&(o=!1):(i+=n.slice(a,l),u||(o=!0)),a=l+c[0].length)}return i+=n.slice(a),Ld(i)}function bt(e){return!e&&e!==0?"n/a":new Date(e).toLocaleString()}function di(e){return!e||e.length===0?"none":e.filter(t=>!!(t&&t.trim())).join(", ")}function ui(e,t=120){return e.length<=t?e:`${e.slice(0,Math.max(0,t-1))}…`}function Kr(e,t){return e.length<=t?{text:e,truncated:!1,total:e.length}:{text:e.slice(0,Math.max(0,t)),truncated:!0,total:e.length}}function Gn(e,t){const n=Number(e);return Number.isFinite(n)?n:t}function Rs(e){return Ed(e)}async function hn(e){if(!(!e.client||!e.connected))try{const t=await e.client.request("cron.status",{});e.cronStatus=t}catch(t){e.cronError=String(t)}}async function cs(e){if(!(!e.client||!e.connected)&&!e.cronLoading){e.cronLoading=!0,e.cronError=null;try{const t=await e.client.request("cron.list",{includeDisabled:!0});e.cronJobs=Array.isArray(t.jobs)?t.jobs:[]}catch(t){e.cronError=String(t)}finally{e.cronLoading=!1}}}function Id(e){if(e.scheduleKind==="at"){const n=Date.parse(e.scheduleAt);if(!Number.isFinite(n))throw new Error("Invalid run time.");return{kind:"at",at:new Date(n).toISOString()}}if(e.scheduleKind==="every"){const n=Gn(e.everyAmount,0);if(n<=0)throw new Error("Invalid interval amount.");const s=e.everyUnit;return{kind:"every",everyMs:n*(s==="minutes"?6e4:s==="hours"?36e5:864e5)}}const t=e.cronExpr.trim();if(!t)throw new Error("Cron expression required.");return{kind:"cron",expr:t,tz:e.cronTz.trim()||void 0}}function Md(e){if(e.payloadKind==="systemEvent"){const i=e.payloadText.trim();if(!i)throw new Error("System event text required.");return{kind:"systemEvent",text:i}}const t=e.payloadText.trim();if(!t)throw new Error("Agent message required.");const n={kind:"agentTurn",message:t},s=Gn(e.timeoutSeconds,0);return s>0&&(n.timeoutSeconds=s),n}async function Rd(e){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{const t=Id(e.cronForm),n=Md(e.cronForm),s=e.cronForm.sessionTarget==="isolated"&&e.cronForm.payloadKind==="agentTurn"&&e.cronForm.deliveryMode?{mode:e.cronForm.deliveryMode==="announce"?"announce":"none",channel:e.cronForm.deliveryChannel.trim()||"last",to:e.cronForm.deliveryTo.trim()||void 0}:void 0,i=e.cronForm.agentId.trim(),a={name:e.cronForm.name.trim(),description:e.cronForm.description.trim()||void 0,agentId:i||void 0,enabled:e.cronForm.enabled,schedule:t,sessionTarget:e.cronForm.sessionTarget,wakeMode:e.cronForm.wakeMode,payload:n,delivery:s};if(!a.name)throw new Error("Name required.");await e.client.request("cron.add",a),e.cronForm={...e.cronForm,name:"",description:"",payloadText:""},await cs(e),await hn(e)}catch(t){e.cronError=String(t)}finally{e.cronBusy=!1}}}async function Pd(e,t,n){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.update",{id:t.id,patch:{enabled:n}}),await cs(e),await hn(e)}catch(s){e.cronError=String(s)}finally{e.cronBusy=!1}}}async function Dd(e,t){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.run",{id:t.id,mode:"force"}),await jr(e,t.id)}catch(n){e.cronError=String(n)}finally{e.cronBusy=!1}}}async function Nd(e,t){if(!(!e.client||!e.connected||e.cronBusy)){e.cronBusy=!0,e.cronError=null;try{await e.client.request("cron.remove",{id:t.id}),e.cronRunsJobId===t.id&&(e.cronRunsJobId=null,e.cronRuns=[]),await cs(e),await hn(e)}catch(n){e.cronError=String(n)}finally{e.cronBusy=!1}}}async function jr(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("cron.runs",{id:t,limit:50});e.cronRunsJobId=t,e.cronRuns=Array.isArray(n.entries)?n.entries:[]}catch(n){e.cronError=String(n)}}const Wr="opensoul.device.auth.v1";function ea(e){return e.trim()}function Fd(e){if(!Array.isArray(e))return[];const t=new Set;for(const n of e){const s=n.trim();s&&t.add(s)}return[...t].toSorted()}function ta(){try{const e=window.localStorage.getItem(Wr);if(!e)return null;const t=JSON.parse(e);return!t||t.version!==1||!t.deviceId||typeof t.deviceId!="string"||!t.tokens||typeof t.tokens!="object"?null:t}catch{return null}}function Gr(e){try{window.localStorage.setItem(Wr,JSON.stringify(e))}catch{}}function Od(e){const t=ta();if(!t||t.deviceId!==e.deviceId)return null;const n=ea(e.role),s=t.tokens[n];return!s||typeof s.token!="string"?null:s}function qr(e){const t=ea(e.role),n={version:1,deviceId:e.deviceId,tokens:{}},s=ta();s&&s.deviceId===e.deviceId&&(n.tokens={...s.tokens});const i={token:e.token,role:t,scopes:Fd(e.scopes),updatedAtMs:Date.now()};return n.tokens[t]=i,Gr(n),i}function Vr(e){const t=ta();if(!t||t.deviceId!==e.deviceId)return;const n=ea(e.role);if(!t.tokens[n])return;const s={...t,tokens:{...t.tokens}};delete s.tokens[n],Gr(s)}const Qr={p:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffedn,n:0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3edn,h:8n,a:0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffecn,d:0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3n,Gx:0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,Gy:0x6666666666666666666666666666666666666666666666666666666666666658n},{p:pe,n:Un,Gx:go,Gy:po,a:Ps,d:Ds,h:Bd}=Qr,yt=32,na=64,zd=(...e)=>{"captureStackTrace"in Error&&typeof Error.captureStackTrace=="function"&&Error.captureStackTrace(...e)},ce=(e="")=>{const t=new Error(e);throw zd(t,ce),t},Ud=e=>typeof e=="bigint",Hd=e=>typeof e=="string",Kd=e=>e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array",et=(e,t,n="")=>{const s=Kd(e),i=e?.length,a=t!==void 0;if(!s||a&&i!==t){const o=n&&`"${n}" `,c=a?` of length ${t}`:"",l=s?`length=${i}`:`type=${typeof e}`;ce(o+"expected Uint8Array"+c+", got "+l)}return e},ds=e=>new Uint8Array(e),Yr=e=>Uint8Array.from(e),Zr=(e,t)=>e.toString(16).padStart(t,"0"),Jr=e=>Array.from(et(e)).map(t=>Zr(t,2)).join(""),We={_0:48,_9:57,A:65,F:70,a:97,f:102},ho=e=>{if(e>=We._0&&e<=We._9)return e-We._0;if(e>=We.A&&e<=We.F)return e-(We.A-10);if(e>=We.a&&e<=We.f)return e-(We.a-10)},Xr=e=>{const t="hex invalid";if(!Hd(e))return ce(t);const n=e.length,s=n/2;if(n%2)return ce(t);const i=ds(s);for(let a=0,o=0;a<s;a++,o+=2){const c=ho(e.charCodeAt(o)),l=ho(e.charCodeAt(o+1));if(c===void 0||l===void 0)return ce(t);i[a]=c*16+l}return i},el=()=>globalThis?.crypto,jd=()=>el()?.subtle??ce("crypto.subtle must be defined, consider polyfill"),ln=(...e)=>{const t=ds(e.reduce((s,i)=>s+et(i).length,0));let n=0;return e.forEach(s=>{t.set(s,n),n+=s.length}),t},Wd=(e=yt)=>el().getRandomValues(ds(e)),qn=BigInt,dt=(e,t,n,s="bad number: out of range")=>Ud(e)&&t<=e&&e<n?e:ce(s),O=(e,t=pe)=>{const n=e%t;return n>=0n?n:t+n},tl=e=>O(e,Un),Gd=(e,t)=>{(e===0n||t<=0n)&&ce("no inverse n="+e+" mod="+t);let n=O(e,t),s=t,i=0n,a=1n;for(;n!==0n;){const o=s/n,c=s%n,l=i-a*o;s=n,n=c,i=a,a=l}return s===1n?O(i,t):ce("no inverse")},qd=e=>{const t=al[e];return typeof t!="function"&&ce("hashes."+e+" not set"),t},Ns=e=>e instanceof Ce?e:ce("Point expected"),gi=2n**256n;class Ce{static BASE;static ZERO;X;Y;Z;T;constructor(t,n,s,i){const a=gi;this.X=dt(t,0n,a),this.Y=dt(n,0n,a),this.Z=dt(s,1n,a),this.T=dt(i,0n,a),Object.freeze(this)}static CURVE(){return Qr}static fromAffine(t){return new Ce(t.x,t.y,1n,O(t.x*t.y))}static fromBytes(t,n=!1){const s=Ds,i=Yr(et(t,yt)),a=t[31];i[31]=a&-129;const o=sl(i);dt(o,0n,n?gi:pe);const l=O(o*o),u=O(l-1n),g=O(s*l+1n);let{isValid:p,value:h}=Qd(u,g);p||ce("bad point: y not sqrt");const m=(h&1n)===1n,v=(a&128)!==0;return!n&&h===0n&&v&&ce("bad point: x==0, isLastByteOdd"),v!==m&&(h=O(-h)),new Ce(h,o,1n,O(h*o))}static fromHex(t,n){return Ce.fromBytes(Xr(t),n)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}assertValidity(){const t=Ps,n=Ds,s=this;if(s.is0())return ce("bad point: ZERO");const{X:i,Y:a,Z:o,T:c}=s,l=O(i*i),u=O(a*a),g=O(o*o),p=O(g*g),h=O(l*t),m=O(g*O(h+u)),v=O(p+O(n*O(l*u)));if(m!==v)return ce("bad point: equation left != right (1)");const A=O(i*a),C=O(o*c);return A!==C?ce("bad point: equation left != right (2)"):this}equals(t){const{X:n,Y:s,Z:i}=this,{X:a,Y:o,Z:c}=Ns(t),l=O(n*c),u=O(a*i),g=O(s*c),p=O(o*i);return l===u&&g===p}is0(){return this.equals(It)}negate(){return new Ce(O(-this.X),this.Y,this.Z,O(-this.T))}double(){const{X:t,Y:n,Z:s}=this,i=Ps,a=O(t*t),o=O(n*n),c=O(2n*O(s*s)),l=O(i*a),u=t+n,g=O(O(u*u)-a-o),p=l+o,h=p-c,m=l-o,v=O(g*h),A=O(p*m),C=O(g*m),S=O(h*p);return new Ce(v,A,S,C)}add(t){const{X:n,Y:s,Z:i,T:a}=this,{X:o,Y:c,Z:l,T:u}=Ns(t),g=Ps,p=Ds,h=O(n*o),m=O(s*c),v=O(a*p*u),A=O(i*l),C=O((n+s)*(o+c)-h-m),S=O(A-v),d=O(A+v),b=O(m-g*h),y=O(C*S),_=O(d*b),L=O(C*b),E=O(S*d);return new Ce(y,_,E,L)}subtract(t){return this.add(Ns(t).negate())}multiply(t,n=!0){if(!n&&(t===0n||this.is0()))return It;if(dt(t,1n,Un),t===1n)return this;if(this.equals(xt))return ou(t).p;let s=It,i=xt;for(let a=this;t>0n;a=a.double(),t>>=1n)t&1n?s=s.add(a):n&&(i=i.add(a));return s}multiplyUnsafe(t){return this.multiply(t,!1)}toAffine(){const{X:t,Y:n,Z:s}=this;if(this.equals(It))return{x:0n,y:1n};const i=Gd(s,pe);O(s*i)!==1n&&ce("invalid inverse");const a=O(t*i),o=O(n*i);return{x:a,y:o}}toBytes(){const{x:t,y:n}=this.assertValidity().toAffine(),s=nl(n);return s[31]|=t&1n?128:0,s}toHex(){return Jr(this.toBytes())}clearCofactor(){return this.multiply(qn(Bd),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let t=this.multiply(Un/2n,!1).double();return Un%2n&&(t=t.add(this)),t.is0()}}const xt=new Ce(go,po,1n,O(go*po)),It=new Ce(0n,1n,1n,0n);Ce.BASE=xt;Ce.ZERO=It;const nl=e=>Xr(Zr(dt(e,0n,gi),na)).reverse(),sl=e=>qn("0x"+Jr(Yr(et(e)).reverse())),De=(e,t)=>{let n=e;for(;t-- >0n;)n*=n,n%=pe;return n},Vd=e=>{const n=e*e%pe*e%pe,s=De(n,2n)*n%pe,i=De(s,1n)*e%pe,a=De(i,5n)*i%pe,o=De(a,10n)*a%pe,c=De(o,20n)*o%pe,l=De(c,40n)*c%pe,u=De(l,80n)*l%pe,g=De(u,80n)*l%pe,p=De(g,10n)*a%pe;return{pow_p_5_8:De(p,2n)*e%pe,b2:n}},fo=0x2b8324804fc1df0b2b4d00993dfbd7a72f431806ad2fe478c4ee1b274a0ea0b0n,Qd=(e,t)=>{const n=O(t*t*t),s=O(n*n*t),i=Vd(e*s).pow_p_5_8;let a=O(e*n*i);const o=O(t*a*a),c=a,l=O(a*fo),u=o===e,g=o===O(-e),p=o===O(-e*fo);return u&&(a=c),(g||p)&&(a=l),(O(a)&1n)===1n&&(a=O(-a)),{isValid:u||g,value:a}},pi=e=>tl(sl(e)),sa=(...e)=>al.sha512Async(ln(...e)),Yd=(...e)=>qd("sha512")(ln(...e)),il=e=>{const t=e.slice(0,yt);t[0]&=248,t[31]&=127,t[31]|=64;const n=e.slice(yt,na),s=pi(t),i=xt.multiply(s),a=i.toBytes();return{head:t,prefix:n,scalar:s,point:i,pointBytes:a}},ia=e=>sa(et(e,yt)).then(il),Zd=e=>il(Yd(et(e,yt))),Jd=e=>ia(e).then(t=>t.pointBytes),Xd=e=>sa(e.hashable).then(e.finish),eu=(e,t,n)=>{const{pointBytes:s,scalar:i}=e,a=pi(t),o=xt.multiply(a).toBytes();return{hashable:ln(o,s,n),finish:u=>{const g=tl(a+pi(u)*i);return et(ln(o,nl(g)),na)}}},tu=async(e,t)=>{const n=et(e),s=await ia(t),i=await sa(s.prefix,n);return Xd(eu(s,i,n))},al={sha512Async:async e=>{const t=jd(),n=ln(e);return ds(await t.digest("SHA-512",n.buffer))},sha512:void 0},nu=(e=Wd(yt))=>e,su={getExtendedPublicKeyAsync:ia,getExtendedPublicKey:Zd,randomSecretKey:nu},Vn=8,iu=256,ol=Math.ceil(iu/Vn)+1,hi=2**(Vn-1),au=()=>{const e=[];let t=xt,n=t;for(let s=0;s<ol;s++){n=t,e.push(n);for(let i=1;i<hi;i++)n=n.add(t),e.push(n);t=n.double()}return e};let vo;const mo=(e,t)=>{const n=t.negate();return e?n:t},ou=e=>{const t=vo||(vo=au());let n=It,s=xt;const i=2**Vn,a=i,o=qn(i-1),c=qn(Vn);for(let l=0;l<ol;l++){let u=Number(e&o);e>>=c,u>hi&&(u-=a,e+=1n);const g=l*hi,p=g,h=g+Math.abs(u)-1,m=l%2!==0,v=u<0;u===0?s=s.add(mo(m,t[p])):n=n.add(mo(v,t[h]))}return e!==0n&&ce("invalid wnaf"),{p:n,f:s}},Fs="opensoul-device-identity-v1";function fi(e){let t="";for(const n of e)t+=String.fromCharCode(n);return btoa(t).replaceAll("+","-").replaceAll("/","_").replace(/=+$/g,"")}function rl(e){const t=e.replaceAll("-","+").replaceAll("_","/"),n=t+"=".repeat((4-t.length%4)%4),s=atob(n),i=new Uint8Array(s.length);for(let a=0;a<s.length;a+=1)i[a]=s.charCodeAt(a);return i}function ru(e){return Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("")}async function ll(e){const t=await crypto.subtle.digest("SHA-256",e.slice().buffer);return ru(new Uint8Array(t))}async function lu(){const e=su.randomSecretKey(),t=await Jd(e);return{deviceId:await ll(t),publicKey:fi(t),privateKey:fi(e)}}async function aa(){try{const n=localStorage.getItem(Fs);if(n){const s=JSON.parse(n);if(s?.version===1&&typeof s.deviceId=="string"&&typeof s.publicKey=="string"&&typeof s.privateKey=="string"){const i=await ll(rl(s.publicKey));if(i!==s.deviceId){const a={...s,deviceId:i};return localStorage.setItem(Fs,JSON.stringify(a)),{deviceId:i,publicKey:s.publicKey,privateKey:s.privateKey}}return{deviceId:s.deviceId,publicKey:s.publicKey,privateKey:s.privateKey}}}}catch{}const e=await lu(),t={version:1,deviceId:e.deviceId,publicKey:e.publicKey,privateKey:e.privateKey,createdAtMs:Date.now()};return localStorage.setItem(Fs,JSON.stringify(t)),e}async function cu(e,t){const n=rl(e),s=new TextEncoder().encode(t),i=await tu(s,n);return fi(i)}async function tt(e,t){if(!(!e.client||!e.connected)&&!e.devicesLoading){e.devicesLoading=!0,t?.quiet||(e.devicesError=null);try{const n=await e.client.request("device.pair.list",{});e.devicesList={pending:Array.isArray(n?.pending)?n.pending:[],paired:Array.isArray(n?.paired)?n.paired:[]}}catch(n){t?.quiet||(e.devicesError=String(n))}finally{e.devicesLoading=!1}}}async function du(e,t){if(!(!e.client||!e.connected))try{await e.client.request("device.pair.approve",{requestId:t}),await tt(e)}catch(n){e.devicesError=String(n)}}async function uu(e,t){if(!(!e.client||!e.connected||!window.confirm("Reject this device pairing request?")))try{await e.client.request("device.pair.reject",{requestId:t}),await tt(e)}catch(s){e.devicesError=String(s)}}async function gu(e,t){if(!(!e.client||!e.connected))try{const n=await e.client.request("device.token.rotate",t);if(n?.token){const s=await aa(),i=n.role??t.role;(n.deviceId===s.deviceId||t.deviceId===s.deviceId)&&qr({deviceId:s.deviceId,role:i,token:n.token,scopes:n.scopes??t.scopes??[]}),window.prompt("New device token (copy and store securely):",n.token)}await tt(e)}catch(n){e.devicesError=String(n)}}async function pu(e,t){if(!(!e.client||!e.connected||!window.confirm(`Revoke token for ${t.deviceId} (${t.role})?`)))try{await e.client.request("device.token.revoke",t);const s=await aa();t.deviceId===s.deviceId&&Vr({deviceId:s.deviceId,role:t.role}),await tt(e)}catch(s){e.devicesError=String(s)}}function hu(e){if(!e||e.kind==="gateway")return{method:"exec.approvals.get",params:{}};const t=e.nodeId.trim();return t?{method:"exec.approvals.node.get",params:{nodeId:t}}:null}function fu(e,t){if(!e||e.kind==="gateway")return{method:"exec.approvals.set",params:t};const n=e.nodeId.trim();return n?{method:"exec.approvals.node.set",params:{...t,nodeId:n}}:null}async function oa(e,t){if(!(!e.client||!e.connected)&&!e.execApprovalsLoading){e.execApprovalsLoading=!0,e.lastError=null;try{const n=hu(t);if(!n){e.lastError="Select a node before loading exec approvals.";return}const s=await e.client.request(n.method,n.params);vu(e,s)}catch(n){e.lastError=String(n)}finally{e.execApprovalsLoading=!1}}}function vu(e,t){e.execApprovalsSnapshot=t,e.execApprovalsDirty||(e.execApprovalsForm=mt(t.file??{}))}async function mu(e,t){if(!(!e.client||!e.connected)){e.execApprovalsSaving=!0,e.lastError=null;try{const n=e.execApprovalsSnapshot?.hash;if(!n){e.lastError="Exec approvals hash missing; reload and retry.";return}const s=e.execApprovalsForm??e.execApprovalsSnapshot?.file??{},i=fu(t,{file:s,baseHash:n});if(!i){e.lastError="Select a node before saving exec approvals.";return}await e.client.request(i.method,i.params),e.execApprovalsDirty=!1,await oa(e,t)}catch(n){e.lastError=String(n)}finally{e.execApprovalsSaving=!1}}}function bu(e,t,n){const s=mt(e.execApprovalsForm??e.execApprovalsSnapshot?.file??{});Dr(s,t,n),e.execApprovalsForm=s,e.execApprovalsDirty=!0}function yu(e,t){const n=mt(e.execApprovalsForm??e.execApprovalsSnapshot?.file??{});Nr(n,t),e.execApprovalsForm=n,e.execApprovalsDirty=!0}async function ra(e){if(!(!e.client||!e.connected)&&!e.presenceLoading){e.presenceLoading=!0,e.presenceError=null,e.presenceStatus=null;try{const t=await e.client.request("system-presence",{});Array.isArray(t)?(e.presenceEntries=t,e.presenceStatus=t.length===0?"No instances yet.":null):(e.presenceEntries=[],e.presenceStatus="No presence payload.")}catch(t){e.presenceError=String(t)}finally{e.presenceLoading=!1}}}async function wt(e,t){if(!(!e.client||!e.connected)&&!e.sessionsLoading){e.sessionsLoading=!0,e.sessionsError=null;try{const n=t?.includeGlobal??e.sessionsIncludeGlobal,s=t?.includeUnknown??e.sessionsIncludeUnknown,i=t?.activeMinutes??Gn(e.sessionsFilterActive,0),a=t?.limit??Gn(e.sessionsFilterLimit,0),o={includeGlobal:n,includeUnknown:s};i>0&&(o.activeMinutes=i),a>0&&(o.limit=a);const c=await e.client.request("sessions.list",o);c&&(e.sessionsResult=c)}catch(n){e.sessionsError=String(n)}finally{e.sessionsLoading=!1}}}async function xu(e,t,n){if(!e.client||!e.connected)return;const s={key:t};"label"in n&&(s.label=n.label),"thinkingLevel"in n&&(s.thinkingLevel=n.thinkingLevel),"verboseLevel"in n&&(s.verboseLevel=n.verboseLevel),"reasoningLevel"in n&&(s.reasoningLevel=n.reasoningLevel);try{await e.client.request("sessions.patch",s),await wt(e)}catch(i){e.sessionsError=String(i)}}async function $u(e,t){if(!(!e.client||!e.connected||e.sessionsLoading||!window.confirm(`Delete session "${t}"?

Deletes the session entry and archives its transcript.`))){e.sessionsLoading=!0,e.sessionsError=null;try{await e.client.request("sessions.delete",{key:t,deleteTranscript:!0}),await wt(e)}catch(s){e.sessionsError=String(s)}finally{e.sessionsLoading=!1}}}function Nt(e,t,n){if(!t.trim())return;const s={...e.skillMessages};n?s[t]=n:delete s[t],e.skillMessages=s}function us(e){return e instanceof Error?e.message:String(e)}async function fn(e,t){if(t?.clearMessages&&Object.keys(e.skillMessages).length>0&&(e.skillMessages={}),!(!e.client||!e.connected)&&!e.skillsLoading){e.skillsLoading=!0,e.skillsError=null;try{const n=await e.client.request("skills.status",{});n&&(e.skillsReport=n)}catch(n){e.skillsError=us(n)}finally{e.skillsLoading=!1}}}function wu(e,t,n){e.skillEdits={...e.skillEdits,[t]:n}}async function ku(e,t,n){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{await e.client.request("skills.update",{skillKey:t,enabled:n}),await fn(e),Nt(e,t,{kind:"success",message:n?"Skill enabled":"Skill disabled"})}catch(s){const i=us(s);e.skillsError=i,Nt(e,t,{kind:"error",message:i})}finally{e.skillsBusyKey=null}}}async function Su(e,t){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const n=e.skillEdits[t]??"";await e.client.request("skills.update",{skillKey:t,apiKey:n}),await fn(e),Nt(e,t,{kind:"success",message:"API key saved"})}catch(n){const s=us(n);e.skillsError=s,Nt(e,t,{kind:"error",message:s})}finally{e.skillsBusyKey=null}}}async function Au(e,t,n,s){if(!(!e.client||!e.connected)){e.skillsBusyKey=t,e.skillsError=null;try{const i=await e.client.request("skills.install",{name:n,installId:s,timeoutMs:12e4});await fn(e),Nt(e,t,{kind:"success",message:i?.message??"Installed"})}catch(i){const a=us(i);e.skillsError=a,Nt(e,t,{kind:"error",message:a})}finally{e.skillsBusyKey=null}}}function Cu(){return!!window.__opensoul_bridge?.isDesktop}function Ot(){return window.__opensoul_bridge??null}function _u(){const e=Ot();e&&e.send("shell.ready",{version:"1.0"})}function bo(e){const t=Ot();t&&t.send("shell.connectionStateChanged",{state:e})}function Tu(e){const t=Ot();t&&t.send("shell.themeChanged",{theme:e})}function Lu(e,t){const n=Ot();n&&n.send("shell.tabChanged",{tab:e,title:t})}let vi=null;function Eu(e){const t=Ot();t&&(vi=e,t.on("host.init",n=>{e.onInit?.(n)}),t.on("host.themeChanged",n=>{const s=n;s?.theme&&e.onThemeChanged?.(s.theme)}),t.on("host.navigate",n=>{const s=n;s?.tab&&e.onNavigate?.(s.tab)}),t.on("host.focus",n=>{const s=n;s?.target&&e.onFocus?.(s.target)}),t.on("host.fileDrop",n=>{const s=n;s?.files&&e.onFileDrop?.(s.files)}),t.on("host.windowState",n=>{const s=n;s?.state&&e.onWindowState?.(s.state)}),t.on("host.settingsChanged",n=>{n&&typeof n=="object"&&e.onSettingsChanged?.(n)}),t.on("host.commandPalette",()=>{e.onCommandPalette?.()}),t.on("host.execApprovalResult",n=>{const s=n;s?.requestId!=null&&e.onExecApprovalResult?.(s.requestId,!!s.approved,!!s.remember)}),t.on("host.devicePairResult",n=>{const s=n;s?.requestId!=null&&e.onDevicePairResult?.(s.requestId,!!s.approved)}))}function Iu(){const e=Ot();!e||!vi||(e.off("host.init"),e.off("host.themeChanged"),e.off("host.navigate"),e.off("host.focus"),e.off("host.fileDrop"),e.off("host.windowState"),e.off("host.settingsChanged"),e.off("host.commandPalette"),e.off("host.execApprovalResult"),e.off("host.devicePairResult"),vi=null)}const cl={stepOf:(e,t)=>`Step ${e} of ${t}`,langTitle:"Welcome to OpenSoul",langSubtitle:"Choose your preferred language to get started.",langLabel:"Language",loginTitle:"Sign In",loginSubtitle:"Sign in to sync your settings and unlock all features.",loginWithGoogle:"Continue with Google",loginWithGithub:"Continue with GitHub",loginOrDivider:"or",loginSkipHint:"You can skip this step and sign in later from Settings.",loginSkip:"Skip for now",loginLogout:"Sign out",loginSuccess:"Signed in",loginError:"Sign-in failed. Please try again.",providerTitle:"Choose an AI Provider",providerSubtitle:"Select one or more AI model providers. You can always change this later in Settings.",providerSearch:"Search providers…",providerNoneSelected:"No provider selected yet.",providerSkip:"Skip for now",providerApiKeyPlaceholder:"Paste your API key…",providerConnected:"Connected",channelTitle:"Connect a Channel",channelSubtitle:"Link a messaging platform so your AI companion can chat with you. You can skip and configure this later.",channelSkip:"Skip for now",channelTokenPlaceholder:"Paste bot token…",confirmTitle:"You're All Set!",confirmSubtitle:"Review your choices and launch OpenSoul.",confirmLogin:"Account",confirmLoginNone:"Not signed in (sign in later)",confirmLanguage:"Language",confirmProvider:"AI Provider",confirmProviderNone:"None (configure later)",confirmChannel:"Channel",confirmChannelNone:"None (configure later)",confirmLaunch:"Launch OpenSoul",next:"Next",back:"Back",skip:"Skip",finish:"Finish"},Mu={stepOf:(e,t)=>`第 ${e} 步，共 ${t} 步`,langTitle:"欢迎使用 OpenSoul",langSubtitle:"选择你偏好的语言以开始设置。",langLabel:"语言",loginTitle:"登录",loginSubtitle:"登录以同步你的设置并解锁所有功能。",loginWithGoogle:"使用 Google 登录",loginWithGithub:"使用 GitHub 登录",loginOrDivider:"或者",loginSkipHint:"你可以跳过此步骤，稍后在设置中登录。",loginSkip:"暂时跳过",loginLogout:"退出登录",loginSuccess:"已登录",loginError:"登录失败，请重试。",providerTitle:"选择 AI 提供商",providerSubtitle:"选择一个或多个 AI 模型提供商。你随时可以在设置中更改。",providerSearch:"搜索提供商…",providerNoneSelected:"尚未选择提供商。",providerSkip:"暂时跳过",providerApiKeyPlaceholder:"粘贴你的 API Key…",providerConnected:"已连接",channelTitle:"连接聊天渠道",channelSubtitle:"链接一个聊天平台，让你的 AI 伙伴与你对话。你也可以稍后配置。",channelSkip:"暂时跳过",channelTokenPlaceholder:"粘贴 Bot Token…",confirmTitle:"一切就绪！",confirmSubtitle:"检查你的选择，然后启动 OpenSoul。",confirmLogin:"账号",confirmLoginNone:"未登录（稍后登录）",confirmLanguage:"语言",confirmProvider:"AI 提供商",confirmProviderNone:"无（稍后配置）",confirmChannel:"聊天渠道",confirmChannelNone:"无（稍后配置）",confirmLaunch:"启动 OpenSoul",next:"下一步",back:"上一步",skip:"跳过",finish:"完成"},Ru={stepOf:(e,t)=>`第 ${e} 步，共 ${t} 步`,langTitle:"歡迎使用 OpenSoul",langSubtitle:"選擇你偏好的語言以開始設定。",langLabel:"語言",loginTitle:"登入",loginSubtitle:"登入以同步你的設定並解鎖所有功能。",loginWithGoogle:"使用 Google 登入",loginWithGithub:"使用 GitHub 登入",loginOrDivider:"或者",loginSkipHint:"你可以跳過此步驟，稍後在設定中登入。",loginSkip:"暫時跳過",loginLogout:"登出",loginSuccess:"已登入",loginError:"登入失敗，請重試。",providerTitle:"選擇 AI 提供商",providerSubtitle:"選擇一個或多個 AI 模型提供商。你隨時可以在設定中更改。",providerSearch:"搜尋提供商…",providerNoneSelected:"尚未選擇提供商。",providerSkip:"暫時跳過",providerApiKeyPlaceholder:"貼上你的 API Key…",providerConnected:"已連接",channelTitle:"連接聊天頻道",channelSubtitle:"連結一個聊天平台，讓你的 AI 夥伴與你對話。你也可以稍後設定。",channelSkip:"暫時跳過",channelTokenPlaceholder:"貼上 Bot Token…",confirmTitle:"一切就緒！",confirmSubtitle:"檢查你的選擇，然後啟動 OpenSoul。",confirmLogin:"帳號",confirmLoginNone:"未登入（稍後登入）",confirmLanguage:"語言",confirmProvider:"AI 提供商",confirmProviderNone:"無（稍後設定）",confirmChannel:"聊天頻道",confirmChannelNone:"無（稍後設定）",confirmLaunch:"啟動 OpenSoul",next:"下一步",back:"上一步",skip:"跳過",finish:"完成"},Pu={stepOf:(e,t)=>`ステップ ${e} / ${t}`,langTitle:"OpenSoul へようこそ",langSubtitle:"お好みの言語を選択してください。",langLabel:"言語",loginTitle:"サインイン",loginSubtitle:"サインインして設定を同期し、すべての機能を利用しましょう。",loginWithGoogle:"Google で続ける",loginWithGithub:"GitHub で続ける",loginOrDivider:"または",loginSkipHint:"このステップをスキップして、後で設定からサインインできます。",loginSkip:"スキップ",loginLogout:"サインアウト",loginSuccess:"サインイン済み",loginError:"サインインに失敗しました。もう一度お試しください。",providerTitle:"AI プロバイダーを選択",providerSubtitle:"1つ以上のAIモデルプロバイダーを選択してください。設定でいつでも変更できます。",providerSearch:"プロバイダーを検索…",providerNoneSelected:"プロバイダーが選択されていません。",providerSkip:"スキップ",providerApiKeyPlaceholder:"API キーを貼り付け…",providerConnected:"接続済み",channelTitle:"チャンネルを接続",channelSubtitle:"メッセージングプラットフォームを接続して、AIコンパニオンとチャットしましょう。後で設定することもできます。",channelSkip:"スキップ",channelTokenPlaceholder:"ボットトークンを貼り付け…",confirmTitle:"準備完了！",confirmSubtitle:"設定を確認して、OpenSoul を起動します。",confirmLogin:"アカウント",confirmLoginNone:"未サインイン（後でサインイン）",confirmLanguage:"言語",confirmProvider:"AI プロバイダー",confirmProviderNone:"なし（後で設定）",confirmChannel:"チャンネル",confirmChannelNone:"なし（後で設定）",confirmLaunch:"OpenSoul を起動",next:"次へ",back:"戻る",skip:"スキップ",finish:"完了"},Du={stepOf:(e,t)=>`${t}단계 중 ${e}단계`,langTitle:"OpenSoul에 오신 것을 환영합니다",langSubtitle:"원하는 언어를 선택하세요.",langLabel:"언어",loginTitle:"로그인",loginSubtitle:"로그인하여 설정을 동기화하고 모든 기능을 잠금 해제하세요.",loginWithGoogle:"Google로 계속",loginWithGithub:"GitHub로 계속",loginOrDivider:"또는",loginSkipHint:"이 단계를 건너뛰고 나중에 설정에서 로그인할 수 있습니다.",loginSkip:"건너뛰기",loginLogout:"로그아웃",loginSuccess:"로그인됨",loginError:"로그인에 실패했습니다. 다시 시도해 주세요.",providerTitle:"AI 제공자 선택",providerSubtitle:"하나 이상의 AI 모델 제공자를 선택하세요. 설정에서 언제든지 변경할 수 있습니다.",providerSearch:"제공자 검색…",providerNoneSelected:"선택된 제공자가 없습니다.",providerSkip:"건너뛰기",providerApiKeyPlaceholder:"API 키를 붙여넣기…",providerConnected:"연결됨",channelTitle:"채널 연결",channelSubtitle:"메시징 플랫폼을 연결하여 AI 동반자와 대화하세요. 나중에 설정할 수도 있습니다.",channelSkip:"건너뛰기",channelTokenPlaceholder:"봇 토큰 붙여넣기…",confirmTitle:"모두 준비되었습니다!",confirmSubtitle:"선택 사항을 검토하고 OpenSoul을 시작하세요.",confirmLogin:"계정",confirmLoginNone:"미로그인 (나중에 로그인)",confirmLanguage:"언어",confirmProvider:"AI 제공자",confirmProviderNone:"없음 (나중에 설정)",confirmChannel:"채널",confirmChannelNone:"없음 (나중에 설정)",confirmLaunch:"OpenSoul 시작",next:"다음",back:"뒤로",skip:"건너뛰기",finish:"완료"},Nu={stepOf:(e,t)=>`Paso ${e} de ${t}`,langTitle:"Bienvenido a OpenSoul",langSubtitle:"Elige tu idioma preferido para comenzar.",langLabel:"Idioma",providerTitle:"Elige un proveedor de IA",providerSubtitle:"Selecciona uno o más proveedores de modelos de IA. Puedes cambiarlo en Configuración.",providerSearch:"Buscar proveedores…",providerNoneSelected:"Ningún proveedor seleccionado.",providerSkip:"Omitir por ahora",providerApiKeyPlaceholder:"Pega tu API key…",providerConnected:"Conectado",channelTitle:"Conectar un canal",channelSubtitle:"Vincula una plataforma de mensajería. Puedes configurarlo después.",channelSkip:"Omitir por ahora",channelTokenPlaceholder:"Pega el token del bot…",confirmTogin:"Cuenta",confirmLoginNone:"Sin iniciar sesión (iniciar sesión después)",confirmLitle:"¡Todo listo!",confirmSubtitle:"Revisa tus opciones e inicia OpenSoul.",confirmLanguage:"Idioma",confirmProvider:"Proveedor de IA",confirmProviderNone:"Ninguno (configurar después)",confirmChannel:"Canal",confirmChannelNone:"Ninguno (configurar después)",confirmLaunch:"Iniciar OpenSoul",next:"Siguiente",back:"Atrás",skip:"Omitir",finish:"Finalizar"},Fu={stepOf:(e,t)=>`Étape ${e} sur ${t}`,langTitle:"Bienvenue sur OpenSoul",langSubtitle:"Choisissez votre langue préférée pour commencer.",langLabel:"Langue",providerTitle:"Choisir un fournisseur IA",providerSubtitle:"Sélectionnez un ou plusieurs fournisseurs de modèles IA. Modifiable dans les paramètres.",providerSearch:"Rechercher…",providerNoneSelected:"Aucun fournisseur sélectionné.",providerSkip:"Passer pour l'instant",providerApiKeyPlaceholder:"Collez votre clé API…",providerConnected:"Connecté",channelTitle:"Connecter un canal",channelSubtitle:"Liez une plateforme de messagerie. Vous pouvez configurer plus tard.",channelSogin:"Compte",confirmLoginNone:"Non connecté (se connecter plus tard)",confirmLkip:"Passer pour l'instant",channelTokenPlaceholder:"Collez le token du bot…",confirmTitle:"Tout est prêt !",confirmSubtitle:"Vérifiez vos choix et lancez OpenSoul.",confirmLanguage:"Langue",confirmProvider:"Fournisseur IA",confirmProviderNone:"Aucun (configurer plus tard)",confirmChannel:"Canal",confirmChannelNone:"Aucun (configurer plus tard)",confirmLaunch:"Lancer OpenSoul",next:"Suivant",back:"Retour",skip:"Passer",finish:"Terminer"},Ou={stepOf:(e,t)=>`Schritt ${e} von ${t}`,langTitle:"Willkommen bei OpenSoul",langSubtitle:"Wähle deine bevorzugte Sprache.",langLabel:"Sprache",loginTitle:"Anmelden",loginSubtitle:"Melde dich an, um deine Einstellungen zu synchronisieren und alle Funktionen freizuschalten.",loginWithGoogle:"Weiter mit Google",loginWithGithub:"Weiter mit GitHub",loginOrDivider:"oder",loginSkipHint:"Du kannst diesen Schritt überspringen und dich später in den Einstellungen anmelden.",loginSkip:"Vorerst überspringen",loginLogout:"Abmelden",loginSuccess:"Angemeldet",loginError:"Anmeldung fehlgeschlagen. Bitte versuche es erneut.",providerTitle:"KI-Anbieter wählen",providerSubtitle:"Wähle einen oder mehrere KI-Modellanbieter. Du kannst dies jederzeit in den Einstellungen ändern.",providerSearch:"Anbieter suchen…",providerNoneSelected:"Kein Anbieter ausgewählt.",providerSkip:"Vorerst überspringen",providerApiKeyPlaceholder:"API-Schlüssel einfügen…",providerConnected:"Verbunden",channelTitle:"Kanal verbinden",channelSubtitle:"Verbinde eine Messaging-Plattform. Du kannst dies später konfigurieren.",channelSkip:"Vorerst überspringen",channelTokenPlaceholder:"Bot-Token einfügen…",confirmTitle:"Alles bereit!",confirmSubtitle:"Überprüfe deine Auswahl und starte OpenSoul.",confirmLogin:"Konto",confirmLoginNone:"Nicht angemeldet (später anmelden)",confirmLanguage:"Sprache",confirmProvider:"KI-Anbieter",confirmProviderNone:"Keiner (später konfigurieren)",confirmChannel:"Kanal",confirmChannelNone:"Keiner (später konfigurieren)",confirmLaunch:"OpenSoul starten",next:"Weiter",back:"Zurück",skip:"Überspringen",finish:"Fertig"},Bu={stepOf:(e,t)=>`Passo ${e} de ${t}`,langTitle:"Bem-vindo ao OpenSoul",langSubtitle:"Escolha seu idioma preferido para começar.",langLabel:"Idioma",loginTitle:"Entrar",loginSubtitle:"Entre para sincronizar suas configurações e desbloquear todos os recursos.",loginWithGoogle:"Continuar com Google",loginWithGithub:"Continuar com GitHub",loginOrDivider:"ou",loginSkipHint:"Você pode pular esta etapa e entrar mais tarde nas configurações.",loginSkip:"Pular por enquanto",loginLogout:"Sair",loginSuccess:"Conectado",loginError:"Falha ao entrar. Tente novamente.",providerTitle:"Escolha um provedor de IA",providerSubtitle:"Selecione um ou mais provedores de modelos de IA. Você pode alterar nas configurações.",providerSearch:"Buscar provedores…",providerNoneSelected:"Nenhum provedor selecionado.",providerSkip:"Pular por enquanto",providerApiKeyPlaceholder:"Cole sua chave API…",providerConnected:"Conectado",channelTitle:"Conectar um canal",channelSubtitle:"Vincule uma plataforma de mensagens. Você pode configurar depois.",channelSkip:"Pular por enquanto",channelTokenPlaceholder:"Cole o token do bot…",confirmTogin:"Conta",confirmLoginNone:"Não conectado (conectar depois)",confirmLitle:"Tudo pronto!",confirmSubtitle:"Revise suas escolhas e inicie o OpenSoul.",confirmLanguage:"Idioma",confirmProvider:"Provedor de IA",confirmProviderNone:"Nenhum (configurar depois)",confirmChannel:"Canal",confirmChannelNone:"Nenhum (configurar depois)",confirmLaunch:"Iniciar OpenSoul",next:"Próximo",back:"Voltar",skip:"Pular",finish:"Concluir"},zu={stepOf:(e,t)=>`Шаг ${e} из ${t}`,langTitle:"Добро пожаловать в OpenSoul",langSubtitle:"Выберите предпочитаемый язык.",langLabel:"Язык",providerTitle:"Выберите провайдера ИИ",providerSubtitle:"Выберите одного или нескольких провайдеров. Вы всегда можете изменить это в настройках.",providerSearch:"Поиск провайдеров…",providerNoneSelected:"Провайдер не выбран.",providerSkip:"Пропустить",providerApiKeyPlaceholder:"Вставьте API ключ…",providerConnected:"Подключено",channelTitle:"Подключить канал",channelSubtitle:"Подключите мессенджер. Вы можете настроить это позже.",channelSkip:"Пропустить",channelTokenPlaceholder:"Вставьте токен бота…",confirmTogin:"Аккаунт",confirmLoginNone:"Не выполнен вход (войти позже)",confirmLitle:"Всё готово!",confirmSubtitle:"Проверьте настройки и запустите OpenSoul.",confirmLanguage:"Язык",confirmProvider:"Провайдер ИИ",confirmProviderNone:"Нет (настроить позже)",confirmChannel:"Канал",confirmChannelNone:"Нет (настроить позже)",confirmLaunch:"Запустить OpenSoul",next:"Далее",back:"Назад",skip:"Пропустить",finish:"Готово"},Uu={en:cl,"zh-CN":Mu,"zh-TW":Ru,ja:Pu,ko:Du,es:Nu,fr:Fu,de:Ou,"pt-BR":Bu,ru:zu},gs=[{value:"en",label:"English",nativeLabel:"English"},{value:"zh-CN",label:"Chinese (Simplified)",nativeLabel:"简体中文"},{value:"zh-TW",label:"Chinese (Traditional)",nativeLabel:"繁體中文"},{value:"ja",label:"Japanese",nativeLabel:"日本語"},{value:"ko",label:"Korean",nativeLabel:"한국어"},{value:"es",label:"Spanish",nativeLabel:"Español"},{value:"fr",label:"French",nativeLabel:"Français"},{value:"de",label:"German",nativeLabel:"Deutsch"},{value:"pt-BR",label:"Portuguese (Brazil)",nativeLabel:"Português (Brasil)"},{value:"ru",label:"Russian",nativeLabel:"Русский"}];function nt(e){return Uu[e]??cl}function mi(){const t=(navigator.language??"en").toLowerCase();return t.startsWith("zh-tw")||t.startsWith("zh-hant")?"zh-TW":t.startsWith("zh")?"zh-CN":t.startsWith("ja")?"ja":t.startsWith("ko")?"ko":t.startsWith("es")?"es":t.startsWith("fr")?"fr":t.startsWith("de")?"de":t.startsWith("pt")?"pt-BR":t.startsWith("ru")?"ru":"en"}const dl="opensoul.ui.locale",Hu=new Set(gs.map(e=>e.value));function Qn(e){const t=String(e??"").trim();return Hu.has(t)?t:mi()}function ul(){if(typeof localStorage>"u")return mi();try{return Qn(localStorage.getItem(dl))}catch{return mi()}}function Os(e){if(typeof document<"u"&&(document.documentElement.lang=e),!(typeof localStorage>"u"))try{localStorage.setItem(dl,e)}catch{}}function Ku(e){return String(e??"").trim().toLowerCase().startsWith("zh")}function z(e,t,n){return Ku(e)?n:t}const ju=[{label:"Assist",tabs:["chat"]},{label:"Operate",tabs:["channels","instances","sessions","usage","cron"]},{label:"Build",tabs:["agents","skills","nodes"]},{label:"System",tabs:["overview"]}],gl=["config","logs","debug"],pl={agents:"/agents",overview:"/overview",channels:"/channels",instances:"/instances",sessions:"/sessions",usage:"/usage",cron:"/cron",skills:"/skills",nodes:"/nodes",chat:"/chat",config:"/config",debug:"/debug",logs:"/logs"},hl=new Map(Object.entries(pl).map(([e,t])=>[t,e]));function vn(e){if(!e)return"";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t==="/"?"":(t.endsWith("/")&&(t=t.slice(0,-1)),t)}function cn(e){if(!e)return"/";let t=e.trim();return t.startsWith("/")||(t=`/${t}`),t.length>1&&t.endsWith("/")&&(t=t.slice(0,-1)),t}function ps(e,t=""){const n=vn(t),s=pl[e];return n?`${n}${s}`:s}function la(e,t=""){const n=vn(t);let s=e||"/";n&&(s===n?s="/":s.startsWith(`${n}/`)&&(s=s.slice(n.length)));let i=cn(s).toLowerCase();return i.endsWith("/index.html")&&(i="/"),i==="/"?"chat":hl.get(i)??null}function Wu(e){let t=cn(e);if(t.endsWith("/index.html")&&(t=cn(t.slice(0,-11))),t==="/")return"";const n=t.split("/").filter(Boolean);if(n.length===0)return"";for(let s=0;s<n.length;s++){const i=`/${n.slice(s).join("/")}`.toLowerCase();if(hl.has(i)){const a=n.slice(0,s);return a.length?`/${a.join("/")}`:""}}return`/${n.join("/")}`}function fl(e){switch(e){case"agents":return"folder";case"chat":return"messageSquare";case"overview":return"barChart";case"channels":return"link";case"instances":return"radio";case"sessions":return"fileText";case"usage":return"barChart";case"cron":return"loader";case"skills":return"zap";case"nodes":return"monitor";case"config":return"settings";case"debug":return"bug";case"logs":return"scrollText";default:return"folder"}}function Gu(e,t){switch(e){case"Assist":return z(t,"Assist","助手");case"Operate":return z(t,"Operate","运维");case"Build":return z(t,"Build","构建");case"System":return z(t,"System","系统");default:return e}}function ca(e,t){switch(e){case"agents":return z(t,"Agents","代理");case"overview":return z(t,"Overview","总览");case"channels":return z(t,"Channels","渠道");case"instances":return z(t,"Instances","实例");case"sessions":return z(t,"Sessions","会话");case"usage":return z(t,"Usage","用量");case"cron":return z(t,"Cron Jobs","定时任务");case"skills":return z(t,"Skills","技能");case"nodes":return z(t,"Nodes","节点");case"chat":return z(t,"Chat","聊天");case"config":return z(t,"Config","配置");case"debug":return z(t,"Debug","调试");case"logs":return z(t,"Logs","日志");default:return z(t,"Control","控制台")}}function qu(e,t){switch(e){case"agents":return z(t,"Configure agent workspaces, tools, and personas.","配置智能体工作区、工具与人设。");case"overview":return z(t,"Quick health check and entry points at a glance.","一览系统状态与快捷入口。");case"channels":return z(t,"See which messaging channels are connected and healthy.","查看消息渠道的连接与健康状态。");case"instances":return z(t,"See which clients and nodes are currently online.","查看当前在线的客户端与节点。");case"sessions":return z(t,"Browse active conversations and fine-tune each session.","浏览活跃对话并微调每个会话。");case"usage":return z(t,"Track token usage, costs, and trends over time.","追踪 Token 用量、费用及趋势变化。");case"cron":return z(t,"Set up scheduled tasks and recurring agent runs.","设置定时任务与周期性智能体执行。");case"skills":return z(t,"Manage available skills and API keys for your agents.","管理智能体可用技能与 API Key。");case"nodes":return z(t,"Pair devices and control which commands are exposed.","配对设备并控制暴露的命令。");case"chat":return z(t,"Start a chat session and interact with your assistant directly.","开始对话，直接与助手交互。");case"config":return z(t,"Edit opensoul.json configuration with built-in validation.","编辑 opensoul.json 配置，内置校验保护。");case"debug":return z(t,"Inspect events, snapshots, and make manual RPC calls.","检查事件、快照与手动 RPC 调用。");case"logs":return z(t,"Stream live gateway logs with filtering.","实时查看网关日志并过滤。");default:return""}}function Vu(e,t){switch(e){case"chat":return z(t,"Ask and act quickly","快速提问与操作");case"channels":return z(t,"Connect apps","连接应用");case"instances":return z(t,"Live clients","在线客户端");case"sessions":return z(t,"Per-session control","会话管控");case"usage":return z(t,"Cost and tokens","费用与 Token");case"cron":return z(t,"Scheduled runs","定时执行");case"agents":return z(t,"Workspaces and tools","工作区与工具");case"skills":return z(t,"Capabilities","能力管理");case"nodes":return z(t,"Devices and approvals","设备与审批");case"overview":return z(t,"Health and quick actions","健康与快捷操作");case"config":return z(t,"Gateway config","网关配置");case"debug":return z(t,"Diagnostics","诊断工具");case"logs":return z(t,"Runtime logs","运行日志");default:return""}}const vl="opensoul.control.settings.v1";function Qu(){const t={gatewayUrl:`${location.protocol==="https:"?"wss":"ws"}://${location.host}`,token:"",sessionKey:"main",lastActiveSessionKey:"main",theme:"system",chatFocusMode:!1,chatShowThinking:!0,splitRatio:.6,navCollapsed:!1,navGroupsCollapsed:{},operateZoomLevel:1};try{const n=localStorage.getItem(vl);if(!n)return t;const s=JSON.parse(n);return{gatewayUrl:typeof s.gatewayUrl=="string"&&s.gatewayUrl.trim()?s.gatewayUrl.trim():t.gatewayUrl,token:typeof s.token=="string"?s.token:t.token,sessionKey:typeof s.sessionKey=="string"&&s.sessionKey.trim()?s.sessionKey.trim():t.sessionKey,lastActiveSessionKey:typeof s.lastActiveSessionKey=="string"&&s.lastActiveSessionKey.trim()?s.lastActiveSessionKey.trim():typeof s.sessionKey=="string"&&s.sessionKey.trim()||t.lastActiveSessionKey,theme:s.theme==="light"||s.theme==="dark"||s.theme==="system"?s.theme:t.theme,chatFocusMode:typeof s.chatFocusMode=="boolean"?s.chatFocusMode:t.chatFocusMode,chatShowThinking:typeof s.chatShowThinking=="boolean"?s.chatShowThinking:t.chatShowThinking,splitRatio:typeof s.splitRatio=="number"&&s.splitRatio>=.4&&s.splitRatio<=.7?s.splitRatio:t.splitRatio,navCollapsed:typeof s.navCollapsed=="boolean"?s.navCollapsed:t.navCollapsed,navGroupsCollapsed:typeof s.navGroupsCollapsed=="object"&&s.navGroupsCollapsed!==null?s.navGroupsCollapsed:t.navGroupsCollapsed,operateZoomLevel:typeof s.operateZoomLevel=="number"&&s.operateZoomLevel>=.5&&s.operateZoomLevel<=3?s.operateZoomLevel:t.operateZoomLevel}}catch{return t}}function Yu(e){localStorage.setItem(vl,JSON.stringify(e))}const _n=e=>Number.isNaN(e)?.5:e<=0?0:e>=1?1:e,Zu=()=>typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches??!1,Tn=e=>{e.classList.remove("theme-transition"),e.style.removeProperty("--theme-switch-x"),e.style.removeProperty("--theme-switch-y")},Ju=({nextTheme:e,applyTheme:t,context:n,currentTheme:s})=>{if(s===e)return;const i=globalThis.document??null;if(!i){t();return}const a=i.documentElement,o=i,c=Zu();if(!!o.startViewTransition&&!c){let u=.5,g=.5;if(n?.pointerClientX!==void 0&&n?.pointerClientY!==void 0&&typeof window<"u")u=_n(n.pointerClientX/window.innerWidth),g=_n(n.pointerClientY/window.innerHeight);else if(n?.element){const p=n.element.getBoundingClientRect();p.width>0&&p.height>0&&typeof window<"u"&&(u=_n((p.left+p.width/2)/window.innerWidth),g=_n((p.top+p.height/2)/window.innerHeight))}a.style.setProperty("--theme-switch-x",`${u*100}%`),a.style.setProperty("--theme-switch-y",`${g*100}%`),a.classList.add("theme-transition");try{const p=o.startViewTransition?.(()=>{t()});p?.finished?p.finished.finally(()=>Tn(a)):Tn(a)}catch{Tn(a),t()}return}t(),Tn(a)};function Xu(){return typeof window>"u"||typeof window.matchMedia!="function"||window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function da(e){return e==="system"?Xu():e}function qe(e,t){const n={...t,lastActiveSessionKey:t.lastActiveSessionKey?.trim()||t.sessionKey.trim()||"main"};e.settings=n,Yu(n),t.theme!==e.theme&&(e.theme=t.theme,hs(e,da(t.theme))),e.applySessionKey=e.settings.lastActiveSessionKey}function ml(e,t){const n=t.trim();n&&e.settings.lastActiveSessionKey!==n&&qe(e,{...e.settings,lastActiveSessionKey:n})}function eg(e){if(!window.location.search&&!window.location.hash)return;const t=new URL(window.location.href),n=new URLSearchParams(t.search),s=new URLSearchParams(t.hash.startsWith("#")?t.hash.slice(1):t.hash),i=n.get("token")??s.get("token"),a=n.get("password")??s.get("password"),o=n.get("session")??s.get("session"),c=n.get("gatewayUrl")??s.get("gatewayUrl");let l=!1;if(i!=null){const g=i.trim();g&&g!==e.settings.token&&qe(e,{...e.settings,token:g}),n.delete("token"),s.delete("token"),l=!0}if(a!=null){const g=a.trim();g&&(e.password=g),n.delete("password"),s.delete("password"),l=!0}if(o!=null){const g=o.trim();g&&(e.sessionKey=g,qe(e,{...e.settings,sessionKey:g,lastActiveSessionKey:g}))}if(c!=null){const g=c.trim();g&&g!==e.settings.gatewayUrl&&(e.pendingGatewayUrl=g),n.delete("gatewayUrl"),s.delete("gatewayUrl"),l=!0}if(!l)return;t.search=n.toString();const u=s.toString();t.hash=u?`#${u}`:"",window.history.replaceState({},"",t.toString())}function bl(e,t){if(gl.includes(t)){e.openSettings(t),dn({...e,tab:t});return}e.tab!==t&&(e.tab=t),Lu(t,ca(t,e.uiLocale)),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?qi(e):Vi(e),t==="debug"?Qi(e):Yi(e),dn(e),xl(e,t,!1)}function bi(e,t,n){Ju({nextTheme:t,applyTheme:()=>{e.theme=t,qe(e,{...e.settings,theme:t}),hs(e,da(t))},context:n,currentTheme:e.theme})}async function dn(e){if(e.tab==="overview"&&await $l(e),e.tab==="channels"&&await lg(e),e.tab==="instances"&&await ra(e),e.tab==="sessions"&&await wt(e),e.tab==="cron"&&await Yn(e),e.tab==="skills"&&await fn(e),e.tab==="agents"){await Zi(e),await Se(e);const t=e.agentsList?.agents?.map(s=>s.id)??[];t.length>0&&Hr(e,t);const n=e.agentsSelectedId??e.agentsList?.defaultId??e.agentsList?.agents?.[0]?.id;n&&(Ur(e,n),e.agentsPanel==="skills"&&zn(e,n),e.agentsPanel==="channels"&&$e(e,!1),e.agentsPanel==="cron"&&Yn(e))}e.tab==="nodes"&&(await ls(e),await tt(e),await Se(e),await oa(e)),e.tab==="chat"&&(await Tl(e),pn(e,!e.chatHasAutoScrolled)),e.tab==="config"&&(await Wn(e),await Se(e)),e.tab==="debug"&&(await Dt(e),e.eventLog=e.eventLogBuffer),e.tab==="logs"&&(e.logsAtBottom=!0,await rn(e,{reset:!0}),zr(e,!0))}function tg(){if(typeof window>"u")return"";const e=window.__OPENSOUL_CONTROL_UI_BASE_PATH__;return typeof e=="string"&&e.trim()?vn(e):Wu(window.location.pathname)}function ng(e){e.theme=e.settings.theme??"system",hs(e,da(e.theme))}function hs(e,t){if(e.themeResolved=t,typeof document>"u")return;const n=document.documentElement;n.dataset.theme=t,n.style.colorScheme=t,Tu(t)}function sg(e){if(typeof window>"u"||typeof window.matchMedia!="function")return;if(e.themeMedia=window.matchMedia("(prefers-color-scheme: dark)"),e.themeMediaHandler=n=>{e.theme==="system"&&hs(e,n.matches?"dark":"light")},typeof e.themeMedia.addEventListener=="function"){e.themeMedia.addEventListener("change",e.themeMediaHandler);return}e.themeMedia.addListener(e.themeMediaHandler)}function ig(e){if(!e.themeMedia||!e.themeMediaHandler)return;if(typeof e.themeMedia.removeEventListener=="function"){e.themeMedia.removeEventListener("change",e.themeMediaHandler);return}e.themeMedia.removeListener(e.themeMediaHandler),e.themeMedia=null,e.themeMediaHandler=null}function ag(e,t){if(typeof window>"u")return;const n=la(window.location.pathname,e.basePath)??"chat";yl(e,n),xl(e,n,t)}function og(e){if(typeof window>"u")return;const t=la(window.location.pathname,e.basePath);if(!t)return;const s=new URL(window.location.href).searchParams.get("session")?.trim();s&&(e.sessionKey=s,qe(e,{...e.settings,sessionKey:s,lastActiveSessionKey:s})),yl(e,t)}function yl(e,t){if(gl.includes(t)){e.openSettings(t),e.connected&&dn({...e,tab:t});return}e.tab!==t&&(e.tab=t),t==="chat"&&(e.chatHasAutoScrolled=!1),t==="logs"?qi(e):Vi(e),t==="debug"?Qi(e):Yi(e),e.connected&&dn(e)}function xl(e,t,n){if(typeof window>"u")return;const s=cn(ps(t,e.basePath)),i=cn(window.location.pathname),a=new URL(window.location.href);t==="chat"&&e.sessionKey?a.searchParams.set("session",e.sessionKey):a.searchParams.delete("session"),i!==s&&(a.pathname=s),n?window.history.replaceState({},"",a.toString()):window.history.pushState({},"",a.toString())}function rg(e,t,n){if(typeof window>"u")return;const s=new URL(window.location.href);s.searchParams.set("session",t),window.history.replaceState({},"",s.toString())}async function $l(e){await Promise.all([$e(e,!1),ra(e),wt(e),hn(e),Dt(e)])}async function lg(e){await Promise.all([$e(e,!0),Wn(e),Se(e)])}async function Yn(e){await Promise.all([$e(e,!1),hn(e),cs(e)])}const yo=50,cg=80,dg=12e4;function ug(e){if(!e||typeof e!="object")return null;const t=e;if(typeof t.text=="string")return t.text;const n=t.content;if(!Array.isArray(n))return null;const s=n.map(i=>{if(!i||typeof i!="object")return null;const a=i;return a.type==="text"&&typeof a.text=="string"?a.text:null}).filter(i=>!!i);return s.length===0?null:s.join(`
`)}function xo(e){if(e==null)return null;if(typeof e=="number"||typeof e=="boolean")return String(e);const t=ug(e);let n;if(typeof e=="string")n=e;else if(t)n=t;else try{n=JSON.stringify(e,null,2)}catch{n=String(e)}const s=Kr(n,dg);return s.truncated?`${s.text}

… truncated (${s.total} chars, showing first ${s.text.length}).`:s.text}function gg(e){const t=[];return t.push({type:"toolcall",name:e.name,arguments:e.args??{}}),e.output&&t.push({type:"toolresult",name:e.name,text:e.output}),{role:"assistant",toolCallId:e.toolCallId,runId:e.runId,content:t,timestamp:e.startedAt}}function pg(e){if(e.toolStreamOrder.length<=yo)return;const t=e.toolStreamOrder.length-yo,n=e.toolStreamOrder.splice(0,t);for(const s of n)e.toolStreamById.delete(s)}function hg(e){e.chatToolMessages=e.toolStreamOrder.map(t=>e.toolStreamById.get(t)?.message).filter(t=>!!t)}function yi(e){e.toolStreamSyncTimer!=null&&(clearTimeout(e.toolStreamSyncTimer),e.toolStreamSyncTimer=null),hg(e)}function fg(e,t=!1){if(t){yi(e);return}e.toolStreamSyncTimer==null&&(e.toolStreamSyncTimer=window.setTimeout(()=>yi(e),cg))}function fs(e){e.toolStreamById.clear(),e.toolStreamOrder=[],e.chatToolMessages=[],yi(e)}const vg=5e3;function mg(e,t){const n=t.data??{},s=typeof n.phase=="string"?n.phase:"";e.compactionClearTimer!=null&&(window.clearTimeout(e.compactionClearTimer),e.compactionClearTimer=null),s==="start"?e.compactionStatus={active:!0,startedAt:Date.now(),completedAt:null}:s==="end"&&(e.compactionStatus={active:!1,startedAt:e.compactionStatus?.startedAt??null,completedAt:Date.now()},e.compactionClearTimer=window.setTimeout(()=>{e.compactionStatus=null,e.compactionClearTimer=null},vg))}function bg(e,t){if(!t)return;if(t.stream==="compaction"){mg(e,t);return}if(t.stream!=="tool")return;const n=typeof t.sessionKey=="string"?t.sessionKey:void 0;if(n&&n!==e.sessionKey||!n&&e.chatRunId&&t.runId!==e.chatRunId||e.chatRunId&&t.runId!==e.chatRunId||!e.chatRunId)return;const s=t.data??{},i=typeof s.toolCallId=="string"?s.toolCallId:"";if(!i)return;const a=typeof s.name=="string"?s.name:"tool",o=typeof s.phase=="string"?s.phase:"",c=o==="start"?s.args:void 0,l=o==="update"?xo(s.partialResult):o==="result"?xo(s.result):void 0,u=Date.now();let g=e.toolStreamById.get(i);g?(g.name=a,c!==void 0&&(g.args=c),l!==void 0&&(g.output=l||void 0),g.updatedAt=u):(g={toolCallId:i,runId:t.runId,sessionKey:n,name:a,args:c,output:l||void 0,startedAt:typeof t.ts=="number"?t.ts:u,updatedAt:u,message:{}},e.toolStreamById.set(i,g),e.toolStreamOrder.push(i)),g.message=gg(g),pg(e),fg(e,o==="result")}const yg=/^\[([^\]]+)\]\s*/,xg=["WebChat","WhatsApp","Telegram","Signal","Slack","Discord","iMessage","Teams","Matrix","Zalo","Zalo Personal","BlueBubbles"],Bs=new WeakMap,zs=new WeakMap;function $g(e){return/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}Z\b/.test(e)||/\d{4}-\d{2}-\d{2} \d{2}:\d{2}\b/.test(e)?!0:xg.some(t=>e.startsWith(`${t} `))}function Us(e){const t=e.match(yg);if(!t)return e;const n=t[1]??"";return $g(n)?e.slice(t[0].length):e}function xi(e){const t=e,n=typeof t.role=="string"?t.role:"",s=t.content;if(typeof s=="string")return n==="assistant"?Rs(s):Us(s);if(Array.isArray(s)){const i=s.map(a=>{const o=a;return o.type==="text"&&typeof o.text=="string"?o.text:null}).filter(a=>typeof a=="string");if(i.length>0){const a=i.join(`
`);return n==="assistant"?Rs(a):Us(a)}}return typeof t.text=="string"?n==="assistant"?Rs(t.text):Us(t.text):null}function wl(e){if(!e||typeof e!="object")return xi(e);const t=e;if(Bs.has(t))return Bs.get(t)??null;const n=xi(e);return Bs.set(t,n),n}function $o(e){const n=e.content,s=[];if(Array.isArray(n))for(const c of n){const l=c;if(l.type==="thinking"&&typeof l.thinking=="string"){const u=l.thinking.trim();u&&s.push(u)}}if(s.length>0)return s.join(`
`);const i=kg(e);if(!i)return null;const o=[...i.matchAll(/<\s*think(?:ing)?\s*>([\s\S]*?)<\s*\/\s*think(?:ing)?\s*>/gi)].map(c=>(c[1]??"").trim()).filter(Boolean);return o.length>0?o.join(`
`):null}function wg(e){if(!e||typeof e!="object")return $o(e);const t=e;if(zs.has(t))return zs.get(t)??null;const n=$o(e);return zs.set(t,n),n}function kg(e){const t=e,n=t.content;if(typeof n=="string")return n;if(Array.isArray(n)){const s=n.map(i=>{const a=i;return a.type==="text"&&typeof a.text=="string"?a.text:null}).filter(i=>typeof i=="string");if(s.length>0)return s.join(`
`)}return typeof t.text=="string"?t.text:null}function Sg(e){const t=e.trim();if(!t)return"";const n=t.split(/\r?\n/).map(s=>s.trim()).filter(Boolean).map(s=>`_${s}_`);return n.length?["_Reasoning:_",...n].join(`
`):""}let wo=!1;function ko(e){e[6]=e[6]&15|64,e[8]=e[8]&63|128;let t="";for(let n=0;n<e.length;n++)t+=e[n].toString(16).padStart(2,"0");return`${t.slice(0,8)}-${t.slice(8,12)}-${t.slice(12,16)}-${t.slice(16,20)}-${t.slice(20)}`}function Ag(){const e=new Uint8Array(16),t=Date.now();for(let n=0;n<e.length;n++)e[n]=Math.floor(Math.random()*256);return e[0]^=t&255,e[1]^=t>>>8&255,e[2]^=t>>>16&255,e[3]^=t>>>24&255,e}function Cg(){wo||(wo=!0,console.warn("[uuid] crypto API missing; falling back to weak randomness"))}function ua(e=globalThis.crypto){if(e&&typeof e.randomUUID=="function")return e.randomUUID();if(e&&typeof e.getRandomValues=="function"){const t=new Uint8Array(16);return e.getRandomValues(t),ko(t)}return Cg(),ko(Ag())}async function un(e){if(!(!e.client||!e.connected)){e.chatLoading=!0,e.lastError=null;try{const t=await e.client.request("chat.history",{sessionKey:e.sessionKey,limit:200});e.chatMessages=Array.isArray(t.messages)?t.messages:[],e.chatThinkingLevel=t.thinkingLevel??null}catch(t){e.lastError=String(t)}finally{e.chatLoading=!1}}}function _g(e){const t=/^data:([^;]+);base64,(.+)$/.exec(e);return t?{mimeType:t[1],content:t[2]}:null}async function Tg(e,t,n){if(!e.client||!e.connected)return null;const s=t.trim(),i=n&&n.length>0;if(!s&&!i)return null;const a=Date.now(),o=[];if(s&&o.push({type:"text",text:s}),i)for(const u of n)o.push({type:"image",source:{type:"base64",media_type:u.mimeType,data:u.dataUrl}});e.chatMessages=[...e.chatMessages,{role:"user",content:o,timestamp:a}],e.chatSending=!0,e.lastError=null;const c=ua();e.chatRunId=c,e.chatStream="",e.chatStreamStartedAt=a;const l=i?n.map(u=>{const g=_g(u.dataUrl);return g?{type:"image",mimeType:g.mimeType,content:g.content}:null}).filter(u=>u!==null):void 0;try{return await e.client.request("chat.send",{sessionKey:e.sessionKey,message:s,deliver:!1,idempotencyKey:c,attachments:l}),c}catch(u){const g=String(u);return e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,e.lastError=g,e.chatMessages=[...e.chatMessages,{role:"assistant",content:[{type:"text",text:"Error: "+g}],timestamp:Date.now()}],null}finally{e.chatSending=!1}}async function Lg(e){if(!e.client||!e.connected)return!1;const t=e.chatRunId;try{return await e.client.request("chat.abort",t?{sessionKey:e.sessionKey,runId:t}:{sessionKey:e.sessionKey}),!0}catch(n){return e.lastError=String(n),!1}}function Eg(e,t){if(!t||t.sessionKey!==e.sessionKey)return null;if(t.runId&&e.chatRunId&&t.runId!==e.chatRunId)return t.state==="final"?"final":null;if(t.state==="delta"){const n=xi(t.message);if(typeof n=="string"){const s=e.chatStream??"";(!s||n.length>=s.length)&&(e.chatStream=n)}}else t.state==="final"||t.state==="aborted"?(e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null):t.state==="error"&&(e.chatStream=null,e.chatRunId=null,e.chatStreamStartedAt=null,e.lastError=t.errorMessage??"chat error");return t.state}const kl=120;function Sl(e){return e.chatSending||!!e.chatRunId}function Ig(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/stop"?!0:n==="stop"||n==="esc"||n==="abort"||n==="wait"||n==="exit"}function Mg(e){const t=e.trim();if(!t)return!1;const n=t.toLowerCase();return n==="/new"||n==="/reset"?!0:n.startsWith("/new ")||n.startsWith("/reset ")}async function Al(e){e.connected&&(e.chatMessage="",await Lg(e))}function Rg(e,t,n,s){const i=t.trim(),a=!!(n&&n.length>0);!i&&!a||(e.chatQueue=[...e.chatQueue,{id:ua(),text:i,createdAt:Date.now(),attachments:a?n?.map(o=>({...o})):void 0,refreshSessions:s}])}async function Cl(e,t,n){fs(e);const s=await Tg(e,t,n?.attachments),i=!!s;return!i&&n?.previousDraft!=null&&(e.chatMessage=n.previousDraft),!i&&n?.previousAttachments&&(e.chatAttachments=n.previousAttachments),i&&ml(e,e.sessionKey),i&&n?.restoreDraft&&n.previousDraft?.trim()&&(e.chatMessage=n.previousDraft),i&&n?.restoreAttachments&&n.previousAttachments?.length&&(e.chatAttachments=n.previousAttachments),pn(e),i&&!e.chatRunId&&_l(e),i&&n?.refreshSessions&&s&&e.refreshSessionsAfterChat.add(s),i}async function _l(e){if(!e.connected||Sl(e))return;const[t,...n]=e.chatQueue;if(!t)return;e.chatQueue=n,await Cl(e,t.text,{attachments:t.attachments,refreshSessions:t.refreshSessions})||(e.chatQueue=[t,...e.chatQueue])}function Pg(e,t){e.chatQueue=e.chatQueue.filter(n=>n.id!==t)}async function Dg(e,t,n){if(!e.connected)return;const s=e.chatMessage,i=(t??e.chatMessage).trim(),a=e.chatAttachments??[],o=t==null?a:[],c=o.length>0;if(!i&&!c)return;if(Ig(i)){await Al(e);return}const l=Mg(i);if(t==null&&(e.chatMessage="",e.chatAttachments=[]),Sl(e)){Rg(e,i,o,l);return}await Cl(e,i,{previousDraft:t==null?s:void 0,restoreDraft:!!(t&&n?.restoreDraft),attachments:c?o:void 0,previousAttachments:t==null?a:void 0,restoreAttachments:!!(t&&n?.restoreDraft),refreshSessions:l})}async function Tl(e,t){await Promise.all([un(e),wt(e,{activeMinutes:kl}),$i(e)]),t?.scheduleScroll!==!1&&pn(e)}const Ng=_l;function Fg(e){const t=Br(e.sessionKey);return t?.agentId?t.agentId:e.hello?.snapshot?.sessionDefaults?.defaultAgentId?.trim()||"main"}function Og(e,t){const n=vn(e),s=encodeURIComponent(t);return n?`${n}/avatar/${s}?meta=1`:`/avatar/${s}?meta=1`}async function $i(e){if(!e.connected){e.chatAvatarUrl=null;return}const t=Fg(e);if(!t){e.chatAvatarUrl=null;return}e.chatAvatarUrl=null;const n=Og(e.basePath,t);try{const s=await fetch(n,{method:"GET"});if(!s.ok){e.chatAvatarUrl=null;return}const i=await s.json(),a=typeof i.avatarUrl=="string"?i.avatarUrl.trim():"";e.chatAvatarUrl=a||null}catch{e.chatAvatarUrl=null}}const Bg={trace:!0,debug:!0,info:!0,warn:!0,error:!0,fatal:!0},zg={name:"",description:"",agentId:"",enabled:!0,scheduleKind:"every",scheduleAt:"",everyAmount:"30",everyUnit:"minutes",cronExpr:"0 7 * * *",cronTz:"",sessionTarget:"isolated",wakeMode:"now",payloadKind:"agentTurn",payloadText:"",deliveryMode:"announce",deliveryChannel:"last",deliveryTo:"",timeoutSeconds:""},Ug=50,Hg=200,Kg="Assistant";function So(e,t){if(typeof e!="string")return;const n=e.trim();if(n)return n.length<=t?n:n.slice(0,t)}function wi(e){const t=So(e?.name,Ug)??Kg,n=So(e?.avatar??void 0,Hg)??null;return{agentId:typeof e?.agentId=="string"&&e.agentId.trim()?e.agentId.trim():null,name:t,avatar:n}}function jg(){return wi(typeof window>"u"?{}:{name:window.__OPENSOUL_ASSISTANT_NAME__,avatar:window.__OPENSOUL_ASSISTANT_AVATAR__})}async function Ll(e,t){if(!e.client||!e.connected)return;const n=e.sessionKey.trim(),s=n?{sessionKey:n}:{};try{const i=await e.client.request("agent.identity.get",s);if(!i)return;const a=wi(i);e.assistantName=a.name,e.assistantAvatar=a.avatar,e.assistantAgentId=a.agentId??null}catch{}}function ki(e){return typeof e=="object"&&e!==null}function Wg(e){if(!ki(e))return null;const t=typeof e.id=="string"?e.id.trim():"",n=e.request;if(!t||!ki(n))return null;const s=typeof n.command=="string"?n.command.trim():"";if(!s)return null;const i=typeof e.createdAtMs=="number"?e.createdAtMs:0,a=typeof e.expiresAtMs=="number"?e.expiresAtMs:0;return!i||!a?null:{id:t,request:{command:s,cwd:typeof n.cwd=="string"?n.cwd:null,host:typeof n.host=="string"?n.host:null,security:typeof n.security=="string"?n.security:null,ask:typeof n.ask=="string"?n.ask:null,agentId:typeof n.agentId=="string"?n.agentId:null,resolvedPath:typeof n.resolvedPath=="string"?n.resolvedPath:null,sessionKey:typeof n.sessionKey=="string"?n.sessionKey:null},createdAtMs:i,expiresAtMs:a}}function Gg(e){if(!ki(e))return null;const t=typeof e.id=="string"?e.id.trim():"";return t?{id:t,decision:typeof e.decision=="string"?e.decision:null,resolvedBy:typeof e.resolvedBy=="string"?e.resolvedBy:null,ts:typeof e.ts=="number"?e.ts:null}:null}function El(e){const t=Date.now();return e.filter(n=>n.expiresAtMs>t)}function qg(e,t){const n=El(e).filter(s=>s.id!==t.id);return n.push(t),n}function Ao(e,t){return El(e).filter(n=>n.id!==t)}function Vg(e){const t=e.version??(e.nonce?"v2":"v1"),n=e.scopes.join(","),s=e.token??"",i=[t,e.deviceId,e.clientId,e.clientMode,e.role,n,String(e.signedAtMs),s];return t==="v2"&&i.push(e.nonce??""),i.join("|")}const Il={WEBCHAT_UI:"webchat-ui",CONTROL_UI:"opensoul-control-ui",WEBCHAT:"webchat",CLI:"cli",GATEWAY_CLIENT:"gateway-client",MACOS_APP:"opensoul-macos",IOS_APP:"opensoul-ios",ANDROID_APP:"opensoul-android",NODE_HOST:"node-host",TEST:"test",FINGERPRINT:"fingerprint",PROBE:"opensoul-probe"},Co=Il,Si={WEBCHAT:"webchat",CLI:"cli",UI:"ui",BACKEND:"backend",NODE:"node",PROBE:"probe",TEST:"test"};new Set(Object.values(Il));new Set(Object.values(Si));const Qg=4008;class Yg{constructor(t){this.opts=t,this.ws=null,this.pending=new Map,this.closed=!1,this.lastSeq=null,this.connectNonce=null,this.connectSent=!1,this.connectTimer=null,this.backoffMs=200,this.phase="dialing",this.reconnectAttempt=0,this.lastConnectFailure=null}start(){this.closed=!1,this.connect()}stop(){this.closed=!0,this.ws?.close(),this.ws=null,this.flushPending(new Error("gateway client stopped"))}get connected(){return this.ws?.readyState===WebSocket.OPEN}connect(){this.closed||(this.phase="dialing",this.ws=new WebSocket(this.opts.url),this.ws.addEventListener("open",()=>this.queueConnect()),this.ws.addEventListener("message",t=>this.handleMessage(String(t.data??""))),this.ws.addEventListener("close",t=>{const n=this.phase,s=this.closed?null:this.backoffMs,i=this.reconnectAttempt,a=this.lastConnectFailure??void 0;this.lastConnectFailure=null;const o=String(t.reason??"");this.ws=null,this.flushPending(new Error(`gateway closed (${t.code}): ${o}`)),this.opts.onClose?.({code:t.code,reason:o,phase:n,url:this.opts.url,reconnectInMs:s,reconnectAttempt:i,failure:a}),this.scheduleReconnect()}),this.ws.addEventListener("error",()=>{}))}scheduleReconnect(){if(this.closed)return;const t=this.backoffMs;this.phase="reconnecting",this.reconnectAttempt+=1,this.backoffMs=Math.min(this.backoffMs*1.5,1e4),window.setTimeout(()=>this.connect(),t)}flushPending(t){for(const[,n]of this.pending)n.reject(t);this.pending.clear()}async sendConnect(){if(this.connectSent)return;this.connectSent=!0,this.connectTimer!==null&&(window.clearTimeout(this.connectTimer),this.connectTimer=null);const t=typeof crypto<"u"&&!!crypto.subtle,n=["operator.admin","operator.approvals","operator.pairing"],s="operator";let i=null,a=!1,o=this.opts.token;if(t){i=await aa();const g=Od({deviceId:i.deviceId,role:s})?.token;o=g??this.opts.token,a=!!(g&&this.opts.token)}const c=o||this.opts.password?{token:o,password:this.opts.password}:void 0;let l;if(t&&i){const g=Date.now(),p=this.connectNonce??void 0,h=Vg({deviceId:i.deviceId,clientId:this.opts.clientName??Co.CONTROL_UI,clientMode:this.opts.mode??Si.WEBCHAT,role:s,scopes:n,signedAtMs:g,token:o??null,nonce:p}),m=await cu(i.privateKey,h);l={id:i.deviceId,publicKey:i.publicKey,signature:m,signedAt:g,nonce:p}}const u={minProtocol:3,maxProtocol:3,client:{id:this.opts.clientName??Co.CONTROL_UI,version:this.opts.clientVersion??"dev",platform:this.opts.platform??navigator.platform??"web",mode:this.opts.mode??Si.WEBCHAT,instanceId:this.opts.instanceId},role:s,scopes:n,device:l,caps:[],auth:c,userAgent:navigator.userAgent,locale:ul()};this.request("connect",u).then(g=>{g?.auth?.deviceToken&&i&&qr({deviceId:i.deviceId,role:g.auth.role??s,token:g.auth.deviceToken,scopes:g.auth.scopes??[]}),this.lastConnectFailure=null,this.backoffMs=200,this.reconnectAttempt=0,this.phase="connected",this.opts.onHello?.(g)}).catch(g=>{this.lastConnectFailure=g instanceof Error?g.message:String(g),a&&i&&Vr({deviceId:i.deviceId,role:s}),this.ws?.close(Qg,"connect failed")})}handleMessage(t){let n;try{n=JSON.parse(t)}catch{return}const s=n;if(s.type==="event"){const i=n;if(i.event==="connect.challenge"){const o=i.payload,c=o&&typeof o.nonce=="string"?o.nonce:null;c&&(this.connectNonce=c,this.sendConnect());return}const a=typeof i.seq=="number"?i.seq:null;a!==null&&(this.lastSeq!==null&&a>this.lastSeq+1&&this.opts.onGap?.({expected:this.lastSeq+1,received:a}),this.lastSeq=a);try{this.opts.onEvent?.(i)}catch(o){console.error("[gateway] event handler error:",o)}return}if(s.type==="res"){const i=n,a=this.pending.get(i.id);if(!a)return;this.pending.delete(i.id),i.ok?a.resolve(i.payload):a.reject(new Error(i.error?.message??"request failed"));return}}request(t,n){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)return Promise.reject(new Error("gateway not connected"));const s=ua(),i={type:"req",id:s,method:t,params:n},a=new Promise((o,c)=>{this.pending.set(s,{resolve:l=>o(l),reject:c})});return this.ws.send(JSON.stringify(i)),a}queueConnect(){this.connectNonce=null,this.connectSent=!1,this.phase="handshake",this.connectTimer!==null&&window.clearTimeout(this.connectTimer),this.connectTimer=window.setTimeout(()=>{this.sendConnect()},50)}}function Hs(e,t){const n=(e??"").trim(),s=t.mainSessionKey?.trim();if(!s)return n;if(!n)return s;const i=t.mainKey?.trim()||"main",a=t.defaultAgentId?.trim();return n==="main"||n===i||a&&(n===`agent:${a}:main`||n===`agent:${a}:${i}`)?s:n}function Zg(e,t){if(!t?.mainSessionKey)return;const n=Hs(e.sessionKey,t),s=Hs(e.settings.sessionKey,t),i=Hs(e.settings.lastActiveSessionKey,t),a=n||s||e.sessionKey,o={...e.settings,sessionKey:s||a,lastActiveSessionKey:i||a},c=o.sessionKey!==e.settings.sessionKey||o.lastActiveSessionKey!==e.settings.lastActiveSessionKey;a!==e.sessionKey&&(e.sessionKey=a),c&&qe(e,o)}function Jg(e){const t=e.failure?.toLowerCase()??"";return t.includes("unauthorized")||t.includes("token")||t.includes("password")||t.includes("pairing")||t.includes("device")||e.code===1008||e.code===4008?"auth":e.phase==="reconnecting"?"reconnecting":e.phase==="handshake"?"handshake":e.phase==="dialing"?"dns":"network"}function Xg(e){const n=[`stage=${Jg(e)}`,`url=${e.url}`];return e.reconnectInMs!==null&&n.push(`retry=${e.reconnectInMs}ms`),e.reconnectAttempt>0&&n.push(`attempt=${e.reconnectAttempt}`),e.failure&&n.push(`cause=${e.failure}`),`disconnected (${e.code}): ${e.reason||"no reason"} [${n.join(", ")}]`}function ga(e){e.lastError=null,e.hello=null,e.connected=!1,e.execApprovalQueue=[],e.execApprovalError=null,e.client?.stop(),e.client=new Yg({url:e.settings.gatewayUrl,token:e.settings.token.trim()?e.settings.token:void 0,password:e.password.trim()?e.password:void 0,clientName:"opensoul-control-ui",mode:"webchat",onHello:t=>{e.connected=!0,e.lastError=null,e.hello=t,bo("connected"),np(e,t),e.chatRunId=null,e.chatStream=null,e.chatStreamStartedAt=null,fs(e),Ll(e),Zi(e),ls(e,{quiet:!0}),tt(e,{quiet:!0}),dn(e)},onClose:t=>{const{code:n}=t;e.connected=!1,bo("disconnected"),n!==1012&&(e.lastError=Xg(t))},onEvent:t=>ep(e,t),onGap:({expected:t,received:n})=>{e.lastError=`event gap detected (expected seq ${t}, got ${n}); refresh recommended`}}),e.client.start()}function ep(e,t){try{tp(e,t)}catch(n){console.error("[gateway] handleGatewayEvent error:",t.event,n)}}function tp(e,t){if(e.eventLogBuffer=[{ts:Date.now(),event:t.event,payload:t.payload},...e.eventLogBuffer].slice(0,250),e.tab==="debug"&&(e.eventLog=e.eventLogBuffer),t.event==="agent"){if(e.onboarding)return;bg(e,t.payload);return}if(t.event==="chat"){const n=t.payload;n?.sessionKey&&ml(e,n.sessionKey);const s=Eg(e,n);if(s==="final"||s==="error"||s==="aborted"){fs(e),Ng(e);const i=n?.runId;i&&e.refreshSessionsAfterChat.has(i)&&(e.refreshSessionsAfterChat.delete(i),s==="final"&&wt(e,{activeMinutes:kl}))}s==="final"&&un(e);return}if(t.event==="presence"){const n=t.payload;n?.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence,e.presenceError=null,e.presenceStatus=null);return}if(t.event==="cron"&&e.tab==="cron"&&Yn(e),(t.event==="device.pair.requested"||t.event==="device.pair.resolved")&&tt(e,{quiet:!0}),t.event==="exec.approval.requested"){const n=Wg(t.payload);if(n){e.execApprovalQueue=qg(e.execApprovalQueue,n),e.execApprovalError=null;const s=Math.max(0,n.expiresAtMs-Date.now()+500);window.setTimeout(()=>{e.execApprovalQueue=Ao(e.execApprovalQueue,n.id)},s)}return}if(t.event==="exec.approval.resolved"){const n=Gg(t.payload);n&&(e.execApprovalQueue=Ao(e.execApprovalQueue,n.id))}}function np(e,t){const n=t.snapshot;n?.presence&&Array.isArray(n.presence)&&(e.presenceEntries=n.presence),n?.health&&(e.debugHealth=n.health),n?.sessionDefaults&&Zg(e,n.sessionDefaults)}function sp(e){e.basePath=tg(),eg(e),ag(e,!0),ng(e),sg(e),window.addEventListener("popstate",e.popStateHandler),Cu()?op(e):ga(e),Cd(e),e.tab==="logs"&&qi(e),e.tab==="debug"&&Qi(e)}function ip(e){yd(e)}function ap(e){window.removeEventListener("popstate",e.popStateHandler),_d(e),Vi(e),Yi(e),ig(e),Iu(),e.topbarObserver?.disconnect(),e.topbarObserver=null}function op(e){Eu({onInit:t=>{const n=e,s=n.settings.gatewayUrl,i=n.settings.token,a=t.gatewayUrl?.trim(),o=!!(a&&a!==s),c=typeof t.token=="string"&&t.token!==i,l={...n.settings};let u=!1;if(o&&a&&(l.gatewayUrl=a,u=!0),c&&t.token&&(l.token=t.token,u=!0),t.settings?.sessionKey){const g=t.settings.sessionKey;(g!==l.sessionKey||g!==l.lastActiveSessionKey)&&(l.sessionKey=g,l.lastActiveSessionKey=g,u=!0)}if(u&&qe(n,l),a&&(o||c||!e.connected)&&ga(e),t.theme){const g=t.theme;bi(n,g)}},onThemeChanged:t=>{bi(e,t)},onNavigate:t=>{const n=la(`/${t}`);n&&bl(e,n)},onFocus:t=>{t==="chat-input"?document.querySelector(".chat-compose textarea")?.focus():t==="search"&&document.querySelector(".search-input, .command-input")?.focus()},onFileDrop:t=>{console.log("[desktop-bridge] File drop received:",t.length,"files")},onWindowState:t=>{e._windowFocused=t==="focused"},onCommandPalette:()=>{const t=document.querySelector(".command-palette");if(t){t.remove();return}window.dispatchEvent(new CustomEvent("opensoul:command-palette"))}}),_u()}function rp(e,t){if(!(e.tab==="chat"&&e.chatManualRefreshInFlight)){if(e.tab==="chat"&&(t.has("chatMessages")||t.has("chatToolMessages")||t.has("chatStream")||t.has("chatLoading")||t.has("tab"))){const n=t.has("tab"),s=t.has("chatLoading")&&t.get("chatLoading")===!0&&!e.chatLoading;pn(e,n||s||!e.chatHasAutoScrolled)}e.tab==="logs"&&(t.has("logsEntries")||t.has("logsAutoFollow")||t.has("tab"))&&e.logsAutoFollow&&e.logsAtBottom&&zr(e,t.has("tab")||t.has("logsAutoFollow"))}}const pa={CHILD:2},ha=e=>(...t)=>({_$litDirective$:e,values:t});let fa=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,s){this._$Ct=t,this._$AM=n,this._$Ci=s}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};const{I:lp}=Hc,_o=e=>e,cp=e=>e.strings===void 0,To=()=>document.createComment(""),Ht=(e,t,n)=>{const s=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(n===void 0){const a=s.insertBefore(To(),i),o=s.insertBefore(To(),i);n=new lp(a,o,e,e.options)}else{const a=n._$AB.nextSibling,o=n._$AM,c=o!==e;if(c){let l;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(l=e._$AU)!==o._$AU&&n._$AP(l)}if(a!==i||c){let l=n._$AA;for(;l!==a;){const u=_o(l).nextSibling;_o(s).insertBefore(l,i),l=u}}}return n},rt=(e,t,n=e)=>(e._$AI(t,n),e),dp={},up=(e,t=dp)=>e._$AH=t,gp=e=>e._$AH,Ks=e=>{e._$AR(),e._$AA.remove()};const Lo=(e,t,n)=>{const s=new Map;for(let i=t;i<=n;i++)s.set(e[i],i);return s},Ml=ha(class extends fa{constructor(e){if(super(e),e.type!==pa.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,n){let s;n===void 0?n=t:t!==void 0&&(s=t);const i=[],a=[];let o=0;for(const c of e)i[o]=s?s(c,o):o,a[o]=n(c,o),o++;return{values:a,keys:i}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,s]){const i=gp(e),{values:a,keys:o}=this.dt(t,n,s);if(!Array.isArray(i))return this.ut=o,a;const c=this.ut??=[],l=[];let u,g,p=0,h=i.length-1,m=0,v=a.length-1;for(;p<=h&&m<=v;)if(i[p]===null)p++;else if(i[h]===null)h--;else if(c[p]===o[m])l[m]=rt(i[p],a[m]),p++,m++;else if(c[h]===o[v])l[v]=rt(i[h],a[v]),h--,v--;else if(c[p]===o[v])l[v]=rt(i[p],a[v]),Ht(e,l[v+1],i[p]),p++,v--;else if(c[h]===o[m])l[m]=rt(i[h],a[m]),Ht(e,i[p],i[h]),h--,m++;else if(u===void 0&&(u=Lo(o,m,v),g=Lo(c,p,h)),u.has(c[p]))if(u.has(c[h])){const A=g.get(o[m]),C=A!==void 0?i[A]:null;if(C===null){const S=Ht(e,i[p]);rt(S,a[m]),l[m]=S}else l[m]=rt(C,a[m]),Ht(e,i[p],C),i[A]=null;m++}else Ks(i[h]),h--;else Ks(i[p]),p++;for(;m<=v;){const A=Ht(e,l[v+1]);rt(A,a[m]),l[m++]=A}for(;p<=h;){const A=i[p++];A!==null&&Ks(A)}return this.ut=o,up(e,l),Xe}}),X={messageSquare:r`
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
  `};function pp(e,t){const n=ps(t,e.basePath),s=ca(t,e.uiLocale),i=Vu(t,e.uiLocale);return r`
    <a
      href=${n}
      class="nav-item ${e.tab===t?"active":""}"
      @click=${a=>{a.defaultPrevented||a.button!==0||a.metaKey||a.ctrlKey||a.shiftKey||a.altKey||(a.preventDefault(),e.setTab(t))}}
      title=${s}
    >
      <span class="nav-item__icon" aria-hidden="true">${X[fl(t)]}</span>
      <span class="nav-item__body">
        <span class="nav-item__text">${s}</span>
        ${i?r`<span class="nav-item__hint">${i}</span>`:f}
      </span>
      ${e.tab===t?r`<span class="nav-item__active-dot" aria-hidden="true"></span>`:f}
    </a>
  `}function hp(e){const t=(g,p)=>z(e.uiLocale,g,p),n=fp(e.hello,e.sessionsResult),s=vp(e.sessionKey,e.sessionsResult,n),i=e.onboarding,a=e.onboarding,o=e.onboarding?!1:e.settings.chatShowThinking,c=e.onboarding?!0:e.settings.chatFocusMode,l=r`
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
          @change=${g=>{const p=g.target.value;e.sessionKey=p,e.chatMessage="",e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:p,lastActiveSessionKey:p}),e.loadAssistantIdentity(),rg(e,p),un(e)}}
        >
          ${Ml(s,g=>g.key,g=>r`<option value=${g.key}>
                ${g.displayName??g.key}
              </option>`)}
        </select>
      </label>
      <button
        class="btn btn--sm btn--icon"
        ?disabled=${e.chatLoading||!e.connected}
        @click=${async()=>{const g=e;g.chatManualRefreshInFlight=!0,g.chatNewMessagesBelow=!1,await g.updateComplete,g.resetToolStream();try{await Tl(e,{scheduleScroll:!1}),g.scrollToBottom({smooth:!0})}finally{requestAnimationFrame(()=>{g.chatManualRefreshInFlight=!1,g.chatNewMessagesBelow=!1})}}}
        title=${t("Refresh chat data","刷新聊天数据")}
      >
        ${l}
      </button>
      <span class="chat-controls__separator">|</span>
      <button
        class="btn btn--sm btn--icon ${o?"active":""}"
        ?disabled=${i}
        @click=${()=>{i||e.applySettings({...e.settings,chatShowThinking:!e.settings.chatShowThinking})}}
        aria-pressed=${o}
        title=${i?t("Disabled during onboarding","引导期间不可用"):t("Toggle assistant thinking/working output","切换助手思考/执行输出")}
      >
        ${X.brain}
      </button>
      <button
        class="btn btn--sm btn--icon ${c?"active":""}"
        ?disabled=${a}
        @click=${()=>{a||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})}}
        aria-pressed=${c}
        title=${a?t("Disabled during onboarding","引导期间不可用"):t("Toggle focus mode (hide sidebar + page header)","切换专注模式（隐藏侧栏和页头）")}
      >
        ${u}
      </button>
    </div>
  `}function fp(e,t){const n=e?.snapshot,s=n?.sessionDefaults?.mainSessionKey?.trim();if(s)return s;const i=n?.sessionDefaults?.mainKey?.trim();return i||(t?.sessions?.some(a=>a.key==="main")?"main":null)}function js(e,t){const n=t?.label?.trim()||"",s=t?.displayName?.trim()||"";return n&&n!==e?`${n} (${e})`:s&&s!==e?`${e} (${s})`:e}function vp(e,t,n){const s=new Set,i=[],a=n&&t?.sessions?.find(c=>c.key===n),o=t?.sessions?.find(c=>c.key===e);if(n&&(s.add(n),i.push({key:n,displayName:js(n,a||void 0)})),s.has(e)||(s.add(e),i.push({key:e,displayName:js(e,o)})),t?.sessions)for(const c of t.sessions)s.has(c.key)||(s.add(c.key),i.push({key:c.key,displayName:js(c.key,c)}));return i}const mp=["system","light","dark"];function bp(e){const t=(i,a)=>z(e.uiLocale,i,a),n=Math.max(0,mp.indexOf(e.theme)),s=i=>a=>{const c={element:a.currentTarget};(a.clientX||a.clientY)&&(c.pointerClientX=a.clientX,c.pointerClientY=a.clientY),e.setTheme(i,c)};return r`
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
          ${$p()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="light"?"active":""}"
          @click=${s("light")}
          aria-pressed=${e.theme==="light"}
          aria-label=${t("Light theme","浅色主题")}
          title=${t("Light","浅色")}
        >
          ${yp()}
        </button>
        <button
          class="theme-toggle__button ${e.theme==="dark"?"active":""}"
          @click=${s("dark")}
          aria-pressed=${e.theme==="dark"}
          aria-label=${t("Dark theme","深色主题")}
          title=${t("Dark","深色")}
        >
          ${xp()}
        </button>
      </div>
    </div>
  `}function yp(){return r`
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
  `}function xp(){return r`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
      ></path>
    </svg>
  `}function $p(){return r`
    <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="14" x="2" y="3" rx="2"></rect>
      <line x1="8" x2="16" y1="21" y2="21"></line>
      <line x1="12" x2="12" y1="17" y2="21"></line>
    </svg>
  `}function Rl(e,t){if(!e)return e;const s=e.files.some(i=>i.name===t.name)?e.files.map(i=>i.name===t.name?t:i):[...e.files,t];return{...e,files:s}}async function Ws(e,t){if(!(!e.client||!e.connected||e.agentFilesLoading)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const n=await e.client.request("agents.files.list",{agentId:t});n&&(e.agentFilesList=n,e.agentFileActive&&!n.files.some(s=>s.name===e.agentFileActive)&&(e.agentFileActive=null))}catch(n){e.agentFilesError=String(n)}finally{e.agentFilesLoading=!1}}}async function wp(e,t,n,s){if(!(!e.client||!e.connected||e.agentFilesLoading)&&!Object.hasOwn(e.agentFileContents,n)){e.agentFilesLoading=!0,e.agentFilesError=null;try{const i=await e.client.request("agents.files.get",{agentId:t,name:n});if(i?.file){const a=i.file.content??"",o=e.agentFileContents[n]??"",c=e.agentFileDrafts[n],l=s?.preserveDraft??!0;e.agentFilesList=Rl(e.agentFilesList,i.file),e.agentFileContents={...e.agentFileContents,[n]:a},(!l||!Object.hasOwn(e.agentFileDrafts,n)||c===o)&&(e.agentFileDrafts={...e.agentFileDrafts,[n]:a})}}catch(i){e.agentFilesError=String(i)}finally{e.agentFilesLoading=!1}}}async function kp(e,t,n,s){if(!(!e.client||!e.connected||e.agentFileSaving)){e.agentFileSaving=!0,e.agentFilesError=null;try{const i=await e.client.request("agents.files.set",{agentId:t,name:n,content:s});i?.file&&(e.agentFilesList=Rl(e.agentFilesList,i.file),e.agentFileContents={...e.agentFileContents,[n]:s},e.agentFileDrafts={...e.agentFileDrafts,[n]:s})}catch(i){e.agentFilesError=String(i)}finally{e.agentFileSaving=!1}}}async function Pl(e,t){if(!(!e.client||!e.connected)&&!e.usageLoading){e.usageLoading=!0,e.usageError=null;try{const n=t?.startDate??e.usageStartDate,s=t?.endDate??e.usageEndDate,[i,a]=await Promise.all([e.client.request("sessions.usage",{startDate:n,endDate:s,limit:1e3,includeContextWeight:!0}),e.client.request("usage.cost",{startDate:n,endDate:s})]);i&&(e.usageResult=i),a&&(e.usageCostSummary=a)}catch(n){e.usageError=String(n)}finally{e.usageLoading=!1}}}async function Sp(e,t){if(!(!e.client||!e.connected)&&!e.usageTimeSeriesLoading){e.usageTimeSeriesLoading=!0,e.usageTimeSeries=null;try{const n=await e.client.request("sessions.usage.timeseries",{key:t});n&&(e.usageTimeSeries=n)}catch{e.usageTimeSeries=null}finally{e.usageTimeSeriesLoading=!1}}}async function Ap(e,t){if(!(!e.client||!e.connected)&&!e.usageSessionLogsLoading){e.usageSessionLogsLoading=!0,e.usageSessionLogs=null;try{const n=await e.client.request("sessions.usage.logs",{key:t,limit:500});n&&Array.isArray(n.logs)&&(e.usageSessionLogs=n.logs)}catch{e.usageSessionLogs=null}finally{e.usageSessionLogsLoading=!1}}}const Cp={bash:"exec","apply-patch":"apply_patch"},_p={"group:memory":["memory_search","memory_get"],"group:web":["web_search","web_fetch"],"group:fs":["read","write","edit","apply_patch"],"group:runtime":["exec","process"],"group:sessions":["sessions_list","sessions_history","sessions_send","sessions_spawn","session_status"],"group:ui":["browser","canvas"],"group:automation":["cron","gateway"],"group:messaging":["message"],"group:nodes":["nodes"],"group:opensoul":["browser","canvas","nodes","cron","message","gateway","agents_list","sessions_list","sessions_history","sessions_send","sessions_spawn","session_status","memory_search","memory_get","web_search","web_fetch","image"]},Tp={minimal:{allow:["session_status"]},coding:{allow:["group:fs","group:runtime","group:sessions","group:memory","image"]},messaging:{allow:["group:messaging","sessions_list","sessions_history","sessions_send","session_status"]},full:{}};function Fe(e){const t=e.trim().toLowerCase();return Cp[t]??t}function Lp(e){return e?e.map(Fe).filter(Boolean):[]}function Ep(e){const t=Lp(e),n=[];for(const s of t){const i=_p[s];if(i){n.push(...i);continue}n.push(s)}return Array.from(new Set(n))}function Ip(e){if(!e)return;const t=Tp[e];if(t&&!(!t.allow&&!t.deny))return{allow:t.allow?[...t.allow]:void 0,deny:t.deny?[...t.deny]:void 0}}function Mp(e){const t=e.host??"unknown",n=e.ip?`(${e.ip})`:"",s=e.mode??"",i=e.version??"";return`${t} ${n} ${s} ${i}`.trim()}function Rp(e){const t=e.ts??null;return t?J(t):"n/a"}function va(e){return e?`${bt(e)} (${J(e)})`:"n/a"}function Pp(e){if(e.totalTokens==null)return"n/a";const t=e.totalTokens??0,n=e.contextTokens??0;return n?`${t} / ${n}`:String(t)}function Dp(e){if(e==null)return"";try{return JSON.stringify(e,null,2)}catch{return String(e)}}function Np(e){const t=e.state??{},n=t.nextRunAtMs?bt(t.nextRunAtMs):"n/a",s=t.lastRunAtMs?bt(t.lastRunAtMs):"n/a";return`${t.lastStatus??"n/a"} · next ${n} · last ${s}`}function Dl(e){const t=e.schedule;if(t.kind==="at"){const n=Date.parse(t.at);return Number.isFinite(n)?`At ${bt(n)}`:`At ${t.at}`}return t.kind==="every"?`Every ${Xi(t.everyMs)}`:`Cron ${t.expr}${t.tz?` (${t.tz})`:""}`}function Fp(e){const t=e.payload;if(t.kind==="systemEvent")return`System: ${t.text}`;const n=`Agent: ${t.message}`,s=e.delivery;if(s&&s.mode!=="none"){const i=s.channel||s.to?` (${s.channel??"last"}${s.to?` -> ${s.to}`:""})`:"";return`${n} · ${s.mode}${i}`}return n}const Eo=[{id:"fs",label:"Files",tools:[{id:"read",label:"read",description:"Read file contents"},{id:"write",label:"write",description:"Create or overwrite files"},{id:"edit",label:"edit",description:"Make precise edits"},{id:"apply_patch",label:"apply_patch",description:"Patch files (OpenAI)"}]},{id:"runtime",label:"Runtime",tools:[{id:"exec",label:"exec",description:"Run shell commands"},{id:"process",label:"process",description:"Manage background processes"}]},{id:"web",label:"Web",tools:[{id:"web_search",label:"web_search",description:"Search the web"},{id:"web_fetch",label:"web_fetch",description:"Fetch web content"}]},{id:"memory",label:"Memory",tools:[{id:"memory_search",label:"memory_search",description:"Semantic search"},{id:"memory_get",label:"memory_get",description:"Read memory files"}]},{id:"sessions",label:"Sessions",tools:[{id:"sessions_list",label:"sessions_list",description:"List sessions"},{id:"sessions_history",label:"sessions_history",description:"Session history"},{id:"sessions_send",label:"sessions_send",description:"Send to session"},{id:"sessions_spawn",label:"sessions_spawn",description:"Spawn sub-agent"},{id:"session_status",label:"session_status",description:"Session status"}]},{id:"ui",label:"UI",tools:[{id:"browser",label:"browser",description:"Control web browser"},{id:"canvas",label:"canvas",description:"Control canvases"}]},{id:"messaging",label:"Messaging",tools:[{id:"message",label:"message",description:"Send messages"}]},{id:"automation",label:"Automation",tools:[{id:"cron",label:"cron",description:"Schedule tasks"},{id:"gateway",label:"gateway",description:"Gateway control"}]},{id:"nodes",label:"Nodes",tools:[{id:"nodes",label:"nodes",description:"Nodes + devices"}]},{id:"agents",label:"Agents",tools:[{id:"agents_list",label:"agents_list",description:"List agents"}]},{id:"media",label:"Media",tools:[{id:"image",label:"image",description:"Image understanding"}]}],Op=[{id:"minimal",label:"Minimal"},{id:"coding",label:"Coding"},{id:"messaging",label:"Messaging"},{id:"full",label:"Full"}];function Ai(e){return e.name?.trim()||e.identity?.name?.trim()||e.id}function Ln(e){const t=e.trim();if(!t||t.length>16)return!1;let n=!1;for(let s=0;s<t.length;s+=1)if(t.charCodeAt(s)>127){n=!0;break}return!(!n||t.includes("://")||t.includes("/")||t.includes("."))}function vs(e,t){const n=t?.emoji?.trim();if(n&&Ln(n))return n;const s=e.identity?.emoji?.trim();if(s&&Ln(s))return s;const i=t?.avatar?.trim();if(i&&Ln(i))return i;const a=e.identity?.avatar?.trim();return a&&Ln(a)?a:""}function Nl(e,t){return t&&e===t?"default":null}function Bp(e){if(e==null||!Number.isFinite(e))return"-";if(e<1024)return`${e} B`;const t=["KB","MB","GB","TB"];let n=e/1024,s=0;for(;n>=1024&&s<t.length-1;)n/=1024,s+=1;return`${n.toFixed(n<10?1:0)} ${t[s]}`}function ms(e,t){const n=e;return{entry:(n?.agents?.list??[]).find(a=>a?.id===t),defaults:n?.agents?.defaults,globalTools:n?.tools}}function Fl(e,t,n,s,i){const a=ms(t,e.id),c=(n&&n.agentId===e.id?n.workspace:null)||a.entry?.workspace||a.defaults?.workspace||"default",l=a.entry?.model?Xt(a.entry?.model):Xt(a.defaults?.model),u=i?.name?.trim()||e.identity?.name?.trim()||e.name?.trim()||a.entry?.name||e.id,g=vs(e,i)||"-",p=Array.isArray(a.entry?.skills)?a.entry?.skills:null,h=p?.length??null;return{workspace:c,model:l,identityName:u,identityEmoji:g,skillsLabel:p?`${h} selected`:"all skills",isDefault:!!(s&&e.id===s)}}function Xt(e){if(!e)return"-";if(typeof e=="string")return e.trim()||"-";if(typeof e=="object"&&e){const t=e,n=t.primary?.trim();if(n){const s=Array.isArray(t.fallbacks)?t.fallbacks.length:0;return s>0?`${n} (+${s} fallback)`:n}}return"-"}function Io(e){const t=e.match(/^(.+) \(\+\d+ fallback\)$/);return t?t[1]:e}function Mo(e){if(!e)return null;if(typeof e=="string")return e.trim()||null;if(typeof e=="object"&&e){const t=e;return(typeof t.primary=="string"?t.primary:typeof t.model=="string"?t.model:typeof t.id=="string"?t.id:typeof t.value=="string"?t.value:null)?.trim()||null}return null}function zp(e){if(!e||typeof e=="string")return null;if(typeof e=="object"&&e){const t=e,n=Array.isArray(t.fallbacks)?t.fallbacks:Array.isArray(t.fallback)?t.fallback:null;return n?n.filter(s=>typeof s=="string"):null}return null}function Up(e){return e.split(",").map(t=>t.trim()).filter(Boolean)}function Hp(e){const n=e?.agents?.defaults?.models;if(!n||typeof n!="object")return[];const s=[];for(const[i,a]of Object.entries(n)){const o=i.trim();if(!o)continue;const c=a&&typeof a=="object"&&"alias"in a&&typeof a.alias=="string"?a.alias?.trim():void 0,l=c&&c!==o?`${c} (${o})`:o;s.push({value:o,label:l})}return s}function Kp(e,t){const n=Hp(e),s=t?n.some(i=>i.value===t):!1;return t&&!s&&n.unshift({value:t,label:`Current (${t})`}),n.length===0?r`
      <option value="" disabled>No configured models</option>
    `:n.map(i=>r`<option value=${i.value}>${i.label}</option>`)}function jp(e){const t=Fe(e);if(!t)return{kind:"exact",value:""};if(t==="*")return{kind:"all"};if(!t.includes("*"))return{kind:"exact",value:t};const n=t.replace(/[.*+?^${}()|[\\]\\]/g,"\\$&");return{kind:"regex",value:new RegExp(`^${n.replaceAll("\\*",".*")}$`)}}function Ci(e){return Array.isArray(e)?Ep(e).map(jp).filter(t=>t.kind!=="exact"||t.value.length>0):[]}function en(e,t){for(const n of t)if(n.kind==="all"||n.kind==="exact"&&e===n.value||n.kind==="regex"&&n.value.test(e))return!0;return!1}function Wp(e,t){if(!t)return!0;const n=Fe(e),s=Ci(t.deny);if(en(n,s))return!1;const i=Ci(t.allow);return!!(i.length===0||en(n,i)||n==="apply_patch"&&en("exec",i))}function Ro(e,t){if(!Array.isArray(t)||t.length===0)return!1;const n=Fe(e),s=Ci(t);return!!(en(n,s)||n==="apply_patch"&&en("exec",s))}function Gp(e){const t=e.agentsList?.agents??[],n=e.agentsList?.defaultId??null,s=e.selectedAgentId??n??t[0]?.id??null,i=s?t.find(a=>a.id===s)??null:null;return r`
    <div class="agents-layout">
      <section class="card agents-sidebar">
        <div class="row" style="justify-content: space-between;">
          <div>
            <div class="card-title">Agents · 智能体</div>
            <div class="card-sub">${t.length} configured</div>
          </div>
          <button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Loading…":"↻ Refresh"}
          </button>
        </div>
        ${e.error?r`<div class="callout danger" style="margin-top: 12px;">${e.error}</div>`:f}
        <div class="agent-list" style="margin-top: 12px;">
          ${t.length===0?r`
                  <div class="empty-state">
                    <div class="empty-state-icon">🤖</div>
                    <div class="empty-state-title">No agents yet</div>
                    <div class="empty-state-desc">Configure an agent in your config to get started.</div>
                  </div>
                `:t.map(a=>{const o=Nl(a.id,n),c=vs(a,e.agentIdentityById[a.id]??null);return r`
                    <button
                      type="button"
                      class="agent-row ${s===a.id?"active":""}"
                      @click=${()=>e.onSelectAgent(a.id)}
                    >
                      <div class="agent-avatar">
                        ${c||Ai(a).slice(0,1)}
                      </div>
                      <div class="agent-info">
                        <div class="agent-title">${Ai(a)}</div>
                        <div class="agent-sub mono">${a.id}</div>
                      </div>
                      ${o?r`<span class="agent-pill">${o}</span>`:f}
                    </button>
                  `})}
        </div>
      </section>
      <section class="agents-main">
        ${i?r`
              ${qp(i,n,e.agentIdentityById[i.id]??null)}
              ${Vp(e.activePanel,a=>e.onSelectPanel(a))}
              ${e.activePanel==="overview"?Qp({agent:i,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[i.id]??null,agentIdentityError:e.agentIdentityError,agentIdentityLoading:e.agentIdentityLoading,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave,onModelChange:e.onModelChange,onModelFallbacksChange:e.onModelFallbacksChange}):f}
              ${e.activePanel==="files"?ah({agentId:i.id,agentFilesList:e.agentFilesList,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,onLoadFiles:e.onLoadFiles,onSelectFile:e.onSelectFile,onFileDraftChange:e.onFileDraftChange,onFileReset:e.onFileReset,onFileSave:e.onFileSave}):f}
              ${e.activePanel==="tools"?rh({agentId:i.id,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,onProfileChange:e.onToolsProfileChange,onOverridesChange:e.onToolsOverridesChange,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):f}
              ${e.activePanel==="skills"?ch({agentId:i.id,report:e.agentSkillsReport,loading:e.agentSkillsLoading,error:e.agentSkillsError,activeAgentId:e.agentSkillsAgentId,configForm:e.configForm,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configDirty,filter:e.skillsFilter,onFilterChange:e.onSkillsFilterChange,onRefresh:e.onSkillsRefresh,onToggle:e.onAgentSkillToggle,onClear:e.onAgentSkillsClear,onDisableAll:e.onAgentSkillsDisableAll,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):f}
              ${e.activePanel==="channels"?sh({agent:i,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[i.id]??null,snapshot:e.channelsSnapshot,loading:e.channelsLoading,error:e.channelsError,lastSuccess:e.channelsLastSuccess,onRefresh:e.onChannelsRefresh}):f}
              ${e.activePanel==="cron"?ih({agent:i,defaultId:n,configForm:e.configForm,agentFilesList:e.agentFilesList,agentIdentity:e.agentIdentityById[i.id]??null,jobs:e.cronJobs,status:e.cronStatus,loading:e.cronLoading,error:e.cronError,onRefresh:e.onCronRefresh}):f}
            `:r`
                <div class="card">
                  <div class="empty-state">
                    <div class="empty-state-icon">👈</div>
                    <div class="empty-state-title">Select an agent</div>
                    <div class="empty-state-desc">
                      Choose an agent from the sidebar to view its workspace, tools, and settings.
                    </div>
                  </div>
                </div>
              `}
      </section>
    </div>
  `}function qp(e,t,n){const s=Nl(e.id,t),i=Ai(e),a=e.identity?.theme?.trim()||"Agent workspace and routing.",o=vs(e,n);return r`
    <section class="card agent-header">
      <div class="agent-header-main">
        <div class="agent-avatar agent-avatar--lg">
          ${o||i.slice(0,1)}
        </div>
        <div>
          <div class="card-title">${i}</div>
          <div class="card-sub">${a}</div>
        </div>
      </div>
      <div class="agent-header-meta">
        <div class="mono">${e.id}</div>
        ${s?r`<span class="agent-pill">${s}</span>`:f}
      </div>
    </section>
  `}function Vp(e,t){return r`
    <div class="agent-tabs">
      ${[{id:"overview",label:"Overview · 概览"},{id:"files",label:"Files · 文件"},{id:"tools",label:"Tools · 工具"},{id:"skills",label:"Skills · 技能"},{id:"channels",label:"Channels · 渠道"},{id:"cron",label:"Cron · 定时任务"}].map(s=>r`
          <button
            class="agent-tab ${e===s.id?"active":""}"
            type="button"
            @click=${()=>t(s.id)}
          >
            ${s.label}
          </button>
        `)}
    </div>
  `}function Qp(e){const{agent:t,configForm:n,agentFilesList:s,agentIdentity:i,agentIdentityLoading:a,agentIdentityError:o,configLoading:c,configSaving:l,configDirty:u,onConfigReload:g,onConfigSave:p,onModelChange:h,onModelFallbacksChange:m}=e,v=ms(n,t.id),C=(s&&s.agentId===t.id?s.workspace:null)||v.entry?.workspace||v.defaults?.workspace||"default",S=v.entry?.model?Xt(v.entry?.model):Xt(v.defaults?.model),d=Xt(v.defaults?.model),b=Mo(v.entry?.model)||(S!=="-"?Io(S):null),y=Mo(v.defaults?.model)||(d!=="-"?Io(d):null),_=b??y??null,L=zp(v.entry?.model),E=L?L.join(", "):"",T=i?.name?.trim()||t.identity?.name?.trim()||t.name?.trim()||v.entry?.name||"-",G=vs(t,i)||"-",R=Array.isArray(v.entry?.skills)?v.entry?.skills:null,H=R?.length??null,q=a?"Loading…":o?"Unavailable":"",I=!!(e.defaultId&&t.id===e.defaultId);return r`
    <section class="card">
      <div class="card-title">Overview</div>
      <div class="card-sub">Workspace paths and identity metadata.</div>
      <div class="agents-overview-grid" style="margin-top: 16px;">
        <div class="agent-kv">
          <div class="label">Workspace</div>
          <div class="mono">${C}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Primary Model</div>
          <div class="mono">${S}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Name</div>
          <div>${T}</div>
          ${q?r`<div class="agent-kv-sub muted">${q}</div>`:f}
        </div>
        <div class="agent-kv">
          <div class="label">Default</div>
          <div>${I?"yes":"no"}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Identity Emoji</div>
          <div>${G}</div>
        </div>
        <div class="agent-kv">
          <div class="label">Skills Filter</div>
          <div>${R?`${H} selected`:"all skills"}</div>
        </div>
      </div>

      <div class="agent-model-select" style="margin-top: 20px;">
        <div class="label">Model Selection</div>
        <div class="row" style="gap: 12px; flex-wrap: wrap;">
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Primary model${I?" (default)":""}</span>
            <select
              .value=${_??""}
              ?disabled=${!n||c||l}
              @change=${K=>h(t.id,K.target.value||null)}
            >
              ${I?f:r`
                      <option value="">
                        ${y?`Inherit default (${y})`:"Inherit default"}
                      </option>
                    `}
              ${Kp(n,_??void 0)}
            </select>
          </label>
          <label class="field" style="min-width: 260px; flex: 1;">
            <span>Fallbacks (comma-separated)</span>
            <input
              .value=${E}
              ?disabled=${!n||c||l}
              placeholder="provider/model, provider/model"
              @input=${K=>m(t.id,Up(K.target.value))}
            />
          </label>
        </div>
        <div class="row" style="justify-content: flex-end; gap: 8px;">
          <button
            class="btn btn--sm"
            ?disabled=${c}
            @click=${g}
          >
            Reload Config
          </button>
          <button
            class="btn btn--sm primary"
            ?disabled=${l||!u}
            @click=${p}
          >
            ${l?"Saving…":"Save"}
          </button>
        </div>
      </div>
    </section>
  `}function Ol(e,t){return r`
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
  `}function Yp(e,t){const n=e.channelMeta?.find(s=>s.id===t);return n?.label?n.label:e.channelLabels?.[t]??t}function Zp(e){if(!e)return[];const t=new Set;for(const i of e.channelOrder??[])t.add(i);for(const i of e.channelMeta??[])t.add(i.id);for(const i of Object.keys(e.channelAccounts??{}))t.add(i);const n=[],s=e.channelOrder?.length?e.channelOrder:Array.from(t);for(const i of s)t.has(i)&&(n.push(i),t.delete(i));for(const i of t)n.push(i);return n.map(i=>({id:i,label:Yp(e,i),accounts:e.channelAccounts?.[i]??[]}))}const Jp=["groupPolicy","streamMode","dmPolicy"];function Xp(e,t){if(!e)return null;const s=(e.channels??{})[t];if(s&&typeof s=="object")return s;const i=e[t];return i&&typeof i=="object"?i:null}function eh(e){if(e==null)return"—";if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return String(e);try{return JSON.stringify(e)}catch{return"—"}}function th(e,t){const n=Xp(e,t);return n?Jp.flatMap(s=>s in n?[{label:s,value:eh(n[s])}]:[]):[]}function nh(e){let t=0,n=0,s=0;for(const i of e){const a=i.probe&&typeof i.probe=="object"&&"ok"in i.probe?!!i.probe.ok:!1;(i.connected===!0||i.running===!0||a)&&(t+=1),i.configured&&(n+=1),i.enabled&&(s+=1)}return{total:e.length,connected:t,configured:n,enabled:s}}function sh(e){const t=Fl(e.agent,e.configForm,e.agentFilesList,e.defaultId,e.agentIdentity),n=Zp(e.snapshot),s=e.lastSuccess?J(e.lastSuccess):"never";return r`
    <section class="grid grid-cols-2">
      ${Ol(t,"Workspace, identity, and model configuration.")}
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
                ${n.map(i=>{const a=nh(i.accounts),o=a.total?`${a.connected}/${a.total} connected`:"no accounts",c=a.configured?`${a.configured} configured`:"not configured",l=a.total?`${a.enabled} enabled`:"disabled",u=th(e.configForm,i.id);return r`
                    <div class="list-item">
                      <div class="list-main">
                        <div class="list-title">${i.label}</div>
                        <div class="list-sub mono">${i.id}</div>
                      </div>
                      <div class="list-meta">
                        <div>${o}</div>
                        <div>${c}</div>
                        <div>${l}</div>
                        ${u.length>0?u.map(g=>r`<div>${g.label}: ${g.value}</div>`):f}
                      </div>
                    </div>
                  `})}
              </div>
            `}
      </section>
    </section>
  `}function ih(e){const t=Fl(e.agent,e.configForm,e.agentFilesList,e.defaultId,e.agentIdentity),n=e.jobs.filter(s=>s.agentId===e.agent.id);return r`
    <section class="grid grid-cols-2">
      ${Ol(t,"Workspace and scheduling targets.")}
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
              ${e.status?e.status.enabled?"Yes":"No":"—"}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">Jobs</div>
            <div class="stat-value">${e.status?.jobs??"—"}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Next wake</div>
            <div class="stat-value">${va(e.status?.nextWakeAtMs??null)}</div>
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
                        <span class="chip">${Dl(s)}</span>
                        <span class="chip ${s.enabled?"chip-ok":"chip-warn"}">
                          ${s.enabled?"enabled":"disabled"}
                        </span>
                        <span class="chip">${s.sessionTarget}</span>
                      </div>
                    </div>
                    <div class="list-meta">
                      <div class="mono">${Np(s)}</div>
                      <div class="muted">${Fp(s)}</div>
                    </div>
                  </div>
                `)}
              </div>
            `}
    </section>
  `}function ah(e){const t=e.agentFilesList?.agentId===e.agentId?e.agentFilesList:null,n=t?.files??[],s=e.agentFileActive??null,i=s?n.find(l=>l.name===s)??null:null,a=s?e.agentFileContents[s]??"":"",o=s?e.agentFileDrafts[s]??a:"",c=s?o!==a:!1;return r`
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
                        `:n.map(l=>oh(l,s,()=>e.onSelectFile(l.name)))}
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
                                ?disabled=${!c}
                                @click=${()=>e.onFileReset(i.name)}
                              >
                                Reset
                              </button>
                              <button
                                class="btn btn--sm primary"
                                ?disabled=${e.agentFileSaving||!c}
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
                              .value=${o}
                              @input=${l=>e.onFileDraftChange(i.name,l.target.value)}
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
  `}function oh(e,t,n){const s=e.missing?"Missing":`${Bp(e.size)} · ${J(e.updatedAtMs??null)}`;return r`
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
  `}function rh(e){const t=ms(e.configForm,e.agentId),n=t.entry?.tools??{},s=t.globalTools??{},i=n.profile??s.profile??"full",a=n.profile?"agent override":s.profile?"global default":"default",o=Array.isArray(n.allow)&&n.allow.length>0,c=Array.isArray(s.allow)&&s.allow.length>0,l=!!e.configForm&&!e.configLoading&&!e.configSaving&&!o,u=o?[]:Array.isArray(n.alsoAllow)?n.alsoAllow:[],g=o?[]:Array.isArray(n.deny)?n.deny:[],p=o?{allow:n.allow??[],deny:n.deny??[]}:Ip(i)??void 0,h=Eo.flatMap(S=>S.tools.map(d=>d.id)),m=S=>{const d=Wp(S,p),b=Ro(S,u),y=Ro(S,g);return{allowed:(d||b)&&!y,baseAllowed:d,denied:y}},v=h.filter(S=>m(S).allowed).length,A=(S,d)=>{const b=new Set(u.map(E=>Fe(E)).filter(E=>E.length>0)),y=new Set(g.map(E=>Fe(E)).filter(E=>E.length>0)),_=m(S).baseAllowed,L=Fe(S);d?(y.delete(L),_||b.add(L)):(b.delete(L),y.add(L)),e.onOverridesChange(e.agentId,[...b],[...y])},C=S=>{const d=new Set(u.map(y=>Fe(y)).filter(y=>y.length>0)),b=new Set(g.map(y=>Fe(y)).filter(y=>y.length>0));for(const y of h){const _=m(y).baseAllowed,L=Fe(y);S?(b.delete(L),_||d.add(L)):(d.delete(L),b.add(L))}e.onOverridesChange(e.agentId,[...d],[...b])};return r`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Tool Access</div>
          <div class="card-sub">
            Profile + per-tool overrides for this agent.
            <span class="mono">${v}/${h.length}</span> enabled.
          </div>
        </div>
        <div class="row" style="gap: 8px;">
          <button
            class="btn btn--sm"
            ?disabled=${!l}
            @click=${()=>C(!0)}
          >
            Enable All
          </button>
          <button
            class="btn btn--sm"
            ?disabled=${!l}
            @click=${()=>C(!1)}
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
      ${o?r`
              <div class="callout info" style="margin-top: 12px">
                This agent is using an explicit allowlist in config. Tool overrides are managed in the Config tab.
              </div>
            `:f}
      ${c?r`
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
          <div>${a}</div>
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
          ${Op.map(S=>r`
              <button
                class="btn btn--sm ${i===S.id?"active":""}"
                ?disabled=${!l}
                @click=${()=>e.onProfileChange(e.agentId,S.id,!0)}
              >
                ${S.label}
              </button>
            `)}
          <button
            class="btn btn--sm"
            ?disabled=${!l}
            @click=${()=>e.onProfileChange(e.agentId,null,!1)}
          >
            Inherit
          </button>
        </div>
      </div>

      <div class="agent-tools-grid" style="margin-top: 20px;">
        ${Eo.map(S=>r`
            <div class="agent-tools-section">
              <div class="agent-tools-header">${S.label}</div>
              <div class="agent-tools-list">
                ${S.tools.map(d=>{const{allowed:b}=m(d.id);return r`
                    <div class="agent-tool-row">
                      <div>
                        <div class="agent-tool-title mono">${d.label}</div>
                        <div class="agent-tool-sub">${d.description}</div>
                      </div>
                      <label class="cfg-toggle">
                        <input
                          type="checkbox"
                          .checked=${b}
                          ?disabled=${!l}
                          @change=${y=>A(d.id,y.target.checked)}
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
  `}const En=[{id:"workspace",label:"Workspace Skills",sources:["opensoul-workspace"]},{id:"built-in",label:"Built-in Skills",sources:["opensoul-bundled"]},{id:"installed",label:"Installed Skills",sources:["opensoul-managed"]},{id:"extra",label:"Extra Skills",sources:["opensoul-extra"]}];function lh(e){const t=new Map;for(const a of En)t.set(a.id,{id:a.id,label:a.label,skills:[]});const n=En.find(a=>a.id==="built-in"),s={id:"other",label:"Other Skills",skills:[]};for(const a of e){const o=a.bundled?n:En.find(c=>c.sources.includes(a.source));o?t.get(o.id)?.skills.push(a):s.skills.push(a)}const i=En.map(a=>t.get(a.id)).filter(a=>!!(a&&a.skills.length>0));return s.skills.length>0&&i.push(s),i}function ch(e){const t=!!e.configForm&&!e.configLoading&&!e.configSaving,n=ms(e.configForm,e.agentId),s=Array.isArray(n.entry?.skills)?n.entry?.skills:void 0,i=new Set((s??[]).map(m=>m.trim()).filter(Boolean)),a=s!==void 0,o=!!(e.report&&e.activeAgentId===e.agentId),c=o?e.report?.skills??[]:[],l=e.filter.trim().toLowerCase(),u=l?c.filter(m=>[m.name,m.description,m.source].join(" ").toLowerCase().includes(l)):c,g=lh(u),p=a?c.filter(m=>i.has(m.name)).length:c.length,h=c.length;return r`
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
      ${a?r`
              <div class="callout info" style="margin-top: 12px">This agent uses a custom skill allowlist.</div>
            `:r`
              <div class="callout info" style="margin-top: 12px">
                All skills are enabled. Disabling any skill will create a per-agent allowlist.
              </div>
            `}
      ${!o&&!e.loading?r`
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
                ${g.map(m=>dh(m,{agentId:e.agentId,allowSet:i,usingAllowlist:a,editable:t,onToggle:e.onToggle}))}
              </div>
            `}
    </section>
  `}function dh(e,t){const n=e.id==="workspace"||e.id==="built-in";return r`
    <details class="agent-skills-group" ?open=${!n}>
      <summary class="agent-skills-header">
        <span>${e.label}</span>
        <span class="muted">${e.skills.length}</span>
      </summary>
      <div class="list skills-grid">
        ${e.skills.map(s=>uh(s,{agentId:t.agentId,allowSet:t.allowSet,usingAllowlist:t.usingAllowlist,editable:t.editable,onToggle:t.onToggle}))}
      </div>
    </details>
  `}function uh(e,t){const n=t.usingAllowlist?t.allowSet.has(e.name):!0,s=[...e.missing.bins.map(a=>`bin:${a}`),...e.missing.env.map(a=>`env:${a}`),...e.missing.config.map(a=>`config:${a}`),...e.missing.os.map(a=>`os:${a}`)],i=[];return e.disabled&&i.push("disabled"),e.blockedByAllowlist&&i.push("blocked by allowlist"),r`
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
            @change=${a=>t.onToggle(t.agentId,e.name,a.target.checked)}
          />
          <span class="cfg-toggle__track"></span>
        </label>
      </div>
    </div>
  `}const gh={env:"环境",update:"更新",agents:"代理",auth:"认证",channels:"渠道",messages:"消息",commands:"命令",hooks:"钩子",skills:"技能",tools:"工具",gateway:"网关",wizard:"引导",meta:"元数据",logging:"日志",browser:"浏览器",ui:"界面",models:"模型",bindings:"绑定",broadcast:"广播",audio:"音频",session:"会话",cron:"定时任务",web:"Web",discovery:"发现",canvasHost:"画布主机",talk:"语音",plugins:"插件"},ph={env:"传递给网关进程的环境变量",update:"自动更新配置与发布通道",agents:"代理配置、模型与身份",auth:"API 密钥与认证配置",channels:"消息渠道配置（Telegram、Discord、Slack 等）",messages:"消息处理与路由设置",commands:"自定义斜杠命令",hooks:"Webhook 与事件钩子",skills:"技能包与能力",tools:"工具配置（浏览器、搜索等）",gateway:"网关服务设置（端口、认证、绑定）",wizard:"引导状态与历史",meta:"网关元数据与版本信息",logging:"日志级别与输出配置",browser:"浏览器自动化设置",ui:"界面偏好设置",models:"AI 模型配置与提供商",bindings:"按键绑定与快捷键",broadcast:"广播与通知设置",audio:"音频输入/输出设置",session:"会话管理与持久化",cron:"计划任务与自动化",web:"Web 服务与 API 设置",discovery:"服务发现与网络配置",canvasHost:"画布渲染与显示设置",talk:"语音与对话设置",plugins:"插件管理与扩展"},hh={Authentication:"认证","API keys and authentication profiles":"API 密钥与认证配置",Cooldowns:"冷却策略","Auth Profile Order":"认证配置顺序","Auth Profiles":"认证配置","Billing Backoff (hours)":"账单退避（小时）","Billing Backoff Overrides":"账单退避覆盖","Base backoff (hours) when a profile fails due to billing/insufficient credits (default: 5).":"当认证配置因账单或余额不足失败时的基础退避时间（小时，默认：5）。","Optional per-provider overrides for billing backoff (hours).":"可选：按供应商单独覆盖账单退避时间（小时）。"};function Me(e,t,n){return z(e,t,n)}function ue(e,t){const n=t.trim(),s=hh[n];return s?Me(e,t,s):t}function Zn(e,t,n){const s=gh[t];return s?Me(e,n,s):n}function _i(e,t,n){const s=ph[t];return s?Me(e,n,s):n}function Oe(e){if(e)return Array.isArray(e.type)?e.type.filter(n=>n!=="null")[0]??e.type[0]:e.type}function Bl(e){if(!e)return"";if(e.default!==void 0)return e.default;switch(Oe(e)){case"object":return{};case"array":return[];case"boolean":return!1;case"number":case"integer":return 0;case"string":return"";default:return""}}function bs(e){return e.filter(t=>typeof t=="string").join(".")}function _e(e,t){const n=bs(e),s=t[n];if(s)return s;const i=n.split(".");for(const[a,o]of Object.entries(t)){if(!a.includes("*"))continue;const c=a.split(".");if(c.length!==i.length)continue;let l=!0;for(let u=0;u<i.length;u+=1)if(c[u]!=="*"&&c[u]!==i[u]){l=!1;break}if(l)return o}}function Qe(e){return e.replace(/_/g," ").replace(/([a-z0-9])([A-Z])/g,"$1 $2").replace(/\s+/g," ").replace(/^./,t=>t.toUpperCase())}function fh(e){const t=bs(e).toLowerCase();return t.includes("token")||t.includes("password")||t.includes("secret")||t.includes("apikey")||t.endsWith("key")}const vh=new Set(["title","description","default","nullable"]);function mh(e){return Object.keys(e??{}).filter(n=>!vh.has(n)).length===0}function bh(e){if(e===void 0)return"";try{return JSON.stringify(e,null,2)??""}catch{return""}}const gn={chevronDown:r`
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
  `};function Ve(e){const{locale:t,schema:n,value:s,path:i,hints:a,unsupported:o,disabled:c,onPatch:l}=e,u=(d,b)=>Me(t,d,b),g=e.showLabel??!0,p=Oe(n),h=_e(i,a),m=h?.label??n.title??Qe(String(i.at(-1))),v=ue(t,m),A=h?.help??n.description,C=A&&ue(t,A),S=bs(i);if(o.has(S))return r`<div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${v}</div>
      <div class="cfg-field__error">${u("Unsupported schema node. Use Raw mode.","不支持的配置节点，请使用原始模式。")}</div>
    </div>`;if(n.anyOf||n.oneOf){const b=(n.anyOf??n.oneOf??[]).filter(P=>!(P.type==="null"||Array.isArray(P.type)&&P.type.includes("null")));if(b.length===1)return Ve({...e,schema:b[0]});const y=P=>{if(P.const!==void 0)return P.const;if(P.enum&&P.enum.length===1)return P.enum[0]},_=b.map(y),L=_.every(P=>P!==void 0);if(L&&_.length>0&&_.length<=5){const P=s??n.default;return r`
        <div class="cfg-field">
          ${g?r`<label class="cfg-field__label">${v}</label>`:f}
          ${C?r`<div class="cfg-field__help">${C}</div>`:f}
          <div class="cfg-segmented">
            ${_.map(G=>r`
              <button
                type="button"
                class="cfg-segmented__btn ${G===P||String(G)===String(P)?"active":""}"
                ?disabled=${c}
                @click=${()=>l(i,G)}
              >
                ${String(G)}
              </button>
            `)}
          </div>
        </div>
      `}if(L&&_.length>5)return Do({...e,options:_,value:s??n.default});const E=new Set(b.map(P=>Oe(P)).filter(Boolean)),T=new Set([...E].map(P=>P==="integer"?"number":P));if([...T].every(P=>["string","number","boolean"].includes(P))){const P=T.has("string"),G=T.has("number");if(T.has("boolean")&&T.size===1)return Ve({...e,schema:{...n,type:"boolean",anyOf:void 0,oneOf:void 0}});if(P||G)return Po({...e,inputType:G&&!P?"number":"text"})}}if(n.enum){const d=n.enum;if(d.length<=5){const b=s??n.default;return r`
        <div class="cfg-field">
          ${g?r`<label class="cfg-field__label">${v}</label>`:f}
          ${C?r`<div class="cfg-field__help">${C}</div>`:f}
          <div class="cfg-segmented">
            ${d.map(y=>r`
              <button
                type="button"
                class="cfg-segmented__btn ${y===b||String(y)===String(b)?"active":""}"
                ?disabled=${c}
                @click=${()=>l(i,y)}
              >
                ${String(y)}
              </button>
            `)}
          </div>
        </div>
      `}return Do({...e,options:d,value:s??n.default})}if(p==="object")return xh(e);if(p==="array")return $h(e);if(p==="boolean"){const d=typeof s=="boolean"?s:typeof n.default=="boolean"?n.default:!1;return r`
      <label class="cfg-toggle-row ${c?"disabled":""}">
        <div class="cfg-toggle-row__content">
          <span class="cfg-toggle-row__label">${v}</span>
          ${C?r`<span class="cfg-toggle-row__help">${C}</span>`:f}
        </div>
        <div class="cfg-toggle">
          <input
            type="checkbox"
            .checked=${d}
            ?disabled=${c}
            @change=${b=>l(i,b.target.checked)}
          />
          <span class="cfg-toggle__track"></span>
        </div>
      </label>
    `}return p==="number"||p==="integer"?yh(e):p==="string"?Po({...e,inputType:"text"}):r`
    <div class="cfg-field cfg-field--error">
      <div class="cfg-field__label">${v}</div>
      <div class="cfg-field__error">${u(`Unsupported type: ${p}. Use Raw mode.`,`不支持的类型：${p}。请使用原始模式。`)}</div>
    </div>
  `}function Po(e){const{locale:t,schema:n,value:s,path:i,hints:a,disabled:o,onPatch:c,inputType:l}=e,u=(b,y)=>Me(t,b,y),g=e.showLabel??!0,p=_e(i,a),h=p?.label??n.title??Qe(String(i.at(-1))),m=ue(t,h),v=p?.help??n.description,A=v&&ue(t,v),C=p?.sensitive??fh(i),S=p?.placeholder??(C?"********":n.default!==void 0?u(`Default: ${String(n.default)}`,`默认：${String(n.default)}`):""),d=s??"";return r`
    <div class="cfg-field">
      ${g?r`<label class="cfg-field__label">${m}</label>`:f}
      ${A?r`<div class="cfg-field__help">${A}</div>`:f}
      <div class="cfg-input-wrap">
        <input
          type=${C?"password":l}
          class="cfg-input"
          placeholder=${S}
          .value=${d==null?"":String(d)}
          ?disabled=${o}
          @input=${b=>{const y=b.target.value;if(l==="number"){if(y.trim()===""){c(i,void 0);return}const _=Number(y);c(i,Number.isNaN(_)?y:_);return}c(i,y)}}
          @change=${b=>{if(l==="number")return;const y=b.target.value;c(i,y.trim())}}
        />
        ${n.default!==void 0?r`
          <button
            type="button"
            class="cfg-input__reset"
            title=${u("Reset to default","重置为默认值")}
            aria-label=${u("Reset to default","重置为默认值")}
            ?disabled=${o}
            @click=${()=>c(i,n.default)}
          >
            \u21ba
          </button>
        `:f}
      </div>
    </div>
  `}function yh(e){const{locale:t,schema:n,value:s,path:i,hints:a,disabled:o,onPatch:c}=e,l=e.showLabel??!0,u=_e(i,a),g=u?.label??n.title??Qe(String(i.at(-1))),p=ue(t,g),h=u?.help??n.description,m=h&&ue(t,h),v=s??n.default??"",A=typeof v=="number"?v:0;return r`
    <div class="cfg-field">
      ${l?r`<label class="cfg-field__label">${p}</label>`:f}
      ${m?r`<div class="cfg-field__help">${m}</div>`:f}
      <div class="cfg-number">
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${o}
          @click=${()=>c(i,A-1)}
        >−</button>
        <input
          type="number"
          class="cfg-number__input"
          .value=${v==null?"":String(v)}
          ?disabled=${o}
          @input=${C=>{const S=C.target.value,d=S===""?void 0:Number(S);c(i,d)}}
        />
        <button
          type="button"
          class="cfg-number__btn"
          ?disabled=${o}
          @click=${()=>c(i,A+1)}
        >+</button>
      </div>
    </div>
  `}function Do(e){const{locale:t,schema:n,value:s,path:i,hints:a,disabled:o,options:c,onPatch:l}=e,u=(b,y)=>Me(t,b,y),g=e.showLabel??!0,p=_e(i,a),h=p?.label??n.title??Qe(String(i.at(-1))),m=ue(t,h),v=p?.help??n.description,A=v&&ue(t,v),C=s??n.default,S=c.findIndex(b=>b===C||String(b)===String(C)),d="__unset__";return r`
    <div class="cfg-field">
      ${g?r`<label class="cfg-field__label">${m}</label>`:f}
      ${A?r`<div class="cfg-field__help">${A}</div>`:f}
      <select
        class="cfg-select"
        ?disabled=${o}
        .value=${S>=0?String(S):d}
        @change=${b=>{const y=b.target.value;l(i,y===d?void 0:c[Number(y)])}}
      >
        <option value=${d}>${u("Select...","请选择...")}</option>
        ${c.map((b,y)=>r`
          <option value=${String(y)}>${String(b)}</option>
        `)}
      </select>
    </div>
  `}function xh(e){const{locale:t,schema:n,value:s,path:i,hints:a,unsupported:o,disabled:c,onPatch:l}=e,u=_e(i,a),g=u?.label??n.title??Qe(String(i.at(-1))),p=ue(t,g),h=u?.help??n.description,m=h&&ue(t,h),v=s??n.default,A=v&&typeof v=="object"&&!Array.isArray(v)?v:{},C=n.properties??{},d=Object.entries(C).toSorted((L,E)=>{const T=_e([...i,L[0]],a)?.order??0,P=_e([...i,E[0]],a)?.order??0;return T!==P?T-P:L[0].localeCompare(E[0])}),b=new Set(Object.keys(C)),y=n.additionalProperties,_=!!y&&typeof y=="object";return i.length===1?r`
      <div class="cfg-fields">
        ${d.map(([L,E])=>Ve({locale:t,schema:E,value:A[L],path:[...i,L],hints:a,unsupported:o,disabled:c,onPatch:l}))}
        ${_?No({locale:t,schema:y,value:A,path:i,hints:a,unsupported:o,disabled:c,reservedKeys:b,onPatch:l}):f}
      </div>
    `:r`
    <details class="cfg-object" open>
      <summary class="cfg-object__header">
        <span class="cfg-object__title">${p}</span>
        <span class="cfg-object__chevron">${gn.chevronDown}</span>
      </summary>
      ${m?r`<div class="cfg-object__help">${m}</div>`:f}
      <div class="cfg-object__content">
        ${d.map(([L,E])=>Ve({locale:t,schema:E,value:A[L],path:[...i,L],hints:a,unsupported:o,disabled:c,onPatch:l}))}
        ${_?No({locale:t,schema:y,value:A,path:i,hints:a,unsupported:o,disabled:c,reservedKeys:b,onPatch:l}):f}
      </div>
    </details>
  `}function $h(e){const{locale:t,schema:n,value:s,path:i,hints:a,unsupported:o,disabled:c,onPatch:l}=e,u=(d,b)=>Me(t,d,b),g=e.showLabel??!0,p=_e(i,a),h=p?.label??n.title??Qe(String(i.at(-1))),m=ue(t,h),v=p?.help??n.description,A=v&&ue(t,v),C=Array.isArray(n.items)?n.items[0]:n.items;if(!C)return r`
      <div class="cfg-field cfg-field--error">
        <div class="cfg-field__label">${m}</div>
        <div class="cfg-field__error">${u("Unsupported array schema. Use Raw mode.","不支持的数组配置结构，请使用原始模式。")}</div>
      </div>
    `;const S=Array.isArray(s)?s:Array.isArray(n.default)?n.default:[];return r`
    <div class="cfg-array">
      <div class="cfg-array__header">
        ${g?r`<span class="cfg-array__label">${m}</span>`:f}
        <span class="cfg-array__count">${u(`${S.length} item${S.length!==1?"s":""}`,`${S.length} 项`)}</span>
        <button
          type="button"
          class="cfg-array__add"
          ?disabled=${c}
          @click=${()=>{const d=[...S,Bl(C)];l(i,d)}}
        >
          <span class="cfg-array__add-icon">${gn.plus}</span>
          ${u("Add","添加")}
        </button>
      </div>
      ${A?r`<div class="cfg-array__help">${A}</div>`:f}

      ${S.length===0?r`
              <div class="cfg-array__empty">${u('No items yet. Click "Add" to create one.',"还没有条目，点击“添加”创建。")}</div>
            `:r`
        <div class="cfg-array__items">
          ${S.map((d,b)=>r`
            <div class="cfg-array__item">
              <div class="cfg-array__item-header">
                <span class="cfg-array__item-index">#${b+1}</span>
                <button
                  type="button"
                  class="cfg-array__item-remove"
                  title=${u("Remove item","移除条目")}
                  ?disabled=${c}
                  @click=${()=>{const y=[...S];y.splice(b,1),l(i,y)}}
                >
                  ${gn.trash}
                </button>
              </div>
              <div class="cfg-array__item-content">
                ${Ve({locale:t,schema:C,value:d,path:[...i,b],hints:a,unsupported:o,disabled:c,showLabel:!1,onPatch:l})}
              </div>
            </div>
          `)}
        </div>
      `}
    </div>
  `}function No(e){const{locale:t,schema:n,value:s,path:i,hints:a,unsupported:o,disabled:c,reservedKeys:l,onPatch:u}=e,g=(m,v)=>Me(t,m,v),p=mh(n),h=Object.entries(s??{}).filter(([m])=>!l.has(m));return r`
    <div class="cfg-map">
      <div class="cfg-map__header">
        <span class="cfg-map__label">${g("Custom entries","自定义条目")}</span>
        <button
          type="button"
          class="cfg-map__add"
          ?disabled=${c}
          @click=${()=>{const m={...s};let v=1,A=`custom-${v}`;for(;A in m;)v+=1,A=`custom-${v}`;m[A]=p?{}:Bl(n),u(i,m)}}
        >
          <span class="cfg-map__add-icon">${gn.plus}</span>
          ${g("Add Entry","添加条目")}
        </button>
      </div>

      ${h.length===0?r`
              <div class="cfg-map__empty">${g("No custom entries.","暂无自定义条目。")}</div>
            `:r`
        <div class="cfg-map__items">
          ${h.map(([m,v])=>{const A=[...i,m],C=bh(v);return r`
              <div class="cfg-map__item">
                <div class="cfg-map__item-key">
                  <input
                    type="text"
                    class="cfg-input cfg-input--sm"
                    placeholder=${g("Key","键")}
                    .value=${m}
                    ?disabled=${c}
                    @change=${S=>{const d=S.target.value.trim();if(!d||d===m)return;const b={...s};d in b||(b[d]=b[m],delete b[m],u(i,b))}}
                  />
                </div>
                <div class="cfg-map__item-value">
                  ${p?r`
                        <textarea
                          class="cfg-textarea cfg-textarea--sm"
                          placeholder=${g("JSON value","JSON 值")}
                          rows="2"
                          .value=${C}
                          ?disabled=${c}
                          @change=${S=>{const d=S.target,b=d.value.trim();if(!b){u(A,void 0);return}try{u(A,JSON.parse(b))}catch{d.value=C}}}
                        ></textarea>
                      `:Ve({locale:t,schema:n,value:v,path:A,hints:a,unsupported:o,disabled:c,showLabel:!1,onPatch:u})}
                </div>
                <button
                  type="button"
                  class="cfg-map__item-remove"
                  title=${g("Remove entry","移除条目")}
                  aria-label=${g("Remove entry","移除条目")}
                  ?disabled=${c}
                  @click=${()=>{const S={...s};delete S[m],u(i,S)}}
                >
                  ${gn.trash}
                </button>
              </div>
            `})}
        </div>
      `}
    </div>
  `}const Fo={env:r`
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
  `},ma={env:{label:"Environment Variables",description:"Environment variables passed to the gateway process"},update:{label:"Updates",description:"Auto-update settings and release channel"},agents:{label:"Agents",description:"Agent configurations, models, and identities"},auth:{label:"Authentication",description:"API keys and authentication profiles"},channels:{label:"Channels",description:"Messaging channels (Telegram, Discord, Slack, etc.)"},messages:{label:"Messages",description:"Message handling and routing settings"},commands:{label:"Commands",description:"Custom slash commands"},hooks:{label:"Hooks",description:"Webhooks and event hooks"},skills:{label:"Skills",description:"Skill packs and capabilities"},tools:{label:"Tools",description:"Tool configurations (browser, search, etc.)"},gateway:{label:"Gateway",description:"Gateway server settings (port, auth, binding)"},wizard:{label:"Setup Wizard",description:"Setup wizard state and history"},meta:{label:"Metadata",description:"Gateway metadata and version information"},logging:{label:"Logging",description:"Log levels and output configuration"},browser:{label:"Browser",description:"Browser automation settings"},ui:{label:"UI",description:"User interface preferences"},models:{label:"Models",description:"AI model configurations and providers"},bindings:{label:"Bindings",description:"Key bindings and shortcuts"},broadcast:{label:"Broadcast",description:"Broadcast and notification settings"},audio:{label:"Audio",description:"Audio input/output settings"},session:{label:"Session",description:"Session management and persistence"},cron:{label:"Cron",description:"Scheduled tasks and automation"},web:{label:"Web",description:"Web server and API settings"},discovery:{label:"Discovery",description:"Service discovery and networking"},canvasHost:{label:"Canvas Host",description:"Canvas rendering and display"},talk:{label:"Talk",description:"Voice and speech settings"},plugins:{label:"Plugins",description:"Plugin management and extensions"}};function Oo(e){return Fo[e]??Fo.default}function wh(e,t,n){if(!n)return!0;const s=n.toLowerCase(),i=ma[e];return e.toLowerCase().includes(s)||i&&(i.label.toLowerCase().includes(s)||i.description.toLowerCase().includes(s))?!0:Yt(t,s)}function Yt(e,t){if(e.title?.toLowerCase().includes(t)||e.description?.toLowerCase().includes(t)||e.enum?.some(s=>String(s).toLowerCase().includes(t)))return!0;if(e.properties){for(const[s,i]of Object.entries(e.properties))if(s.toLowerCase().includes(t)||Yt(i,t))return!0}if(e.items){const s=Array.isArray(e.items)?e.items:[e.items];for(const i of s)if(i&&Yt(i,t))return!0}if(e.additionalProperties&&typeof e.additionalProperties=="object"&&Yt(e.additionalProperties,t))return!0;const n=e.anyOf??e.oneOf??e.allOf;if(n){for(const s of n)if(s&&Yt(s,t))return!0}return!1}function kh(e){const t=(h,m)=>Me(e.locale,h,m);if(!e.schema)return r`
      <div class="muted">${t("Schema unavailable.","配置结构不可用。")}</div>
    `;const n=e.schema,s=e.value??{};if(Oe(n)!=="object"||!n.properties)return r`
      <div class="callout danger">${t("Unsupported schema. Use Raw.","不支持的配置结构，请使用原始模式。")}</div>
    `;const i=new Set(e.unsupportedPaths??[]),a=n.properties,o=e.searchQuery??"",c=e.activeSection,l=e.activeSubsection??null,g=Object.entries(a).toSorted((h,m)=>{const v=_e([h[0]],e.uiHints)?.order??50,A=_e([m[0]],e.uiHints)?.order??50;return v!==A?v-A:h[0].localeCompare(m[0])}).filter(([h,m])=>!(c&&h!==c||o&&!wh(h,m,o)));let p=null;if(c&&l&&g.length===1){const h=g[0]?.[1];h&&Oe(h)==="object"&&h.properties&&h.properties[l]&&(p={sectionKey:c,subsectionKey:l,schema:h.properties[l]})}return g.length===0?r`
      <div class="config-empty">
        <div class="config-empty__icon">${X.search}</div>
        <div class="config-empty__text">
          ${o?t(`No settings match "${o}"`,`未找到匹配“${o}”的设置`):t("No settings in this section","这个分组没有设置")}
        </div>
      </div>
    `:r`
    <div class="config-form config-form--modern">
      ${p?(()=>{const{sectionKey:h,subsectionKey:m,schema:v}=p,A=_e([h,m],e.uiHints),C=A?.label??v.title??Qe(m),S=ue(e.locale,C),d=A?.help??v.description??"",b=d&&ue(e.locale,d),y=s[h],_=y&&typeof y=="object"?y[m]:void 0,L=`config-section-${h}-${m}`;return r`
              <section class="config-section-card" id=${L}>
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${Oo(h)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${S}</h3>
                    ${b?r`<p class="config-section-card__desc">${b}</p>`:f}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${Ve({locale:e.locale,schema:v,value:_,path:[h,m],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})():g.map(([h,m])=>{const v=ma[h]??{label:h.charAt(0).toUpperCase()+h.slice(1),description:m.description??""},A={label:Zn(e.locale,h,v.label),description:ue(e.locale,_i(e.locale,h,v.description))};return r`
              <section class="config-section-card" id="config-section-${h}">
                <div class="config-section-card__header">
                  <span class="config-section-card__icon">${Oo(h)}</span>
                  <div class="config-section-card__titles">
                    <h3 class="config-section-card__title">${A.label}</h3>
                    ${A.description?r`<p class="config-section-card__desc">${A.description}</p>`:f}
                  </div>
                </div>
                <div class="config-section-card__content">
                  ${Ve({locale:e.locale,schema:m,value:s[h],path:[h],hints:e.uiHints,unsupported:i,disabled:e.disabled??!1,showLabel:!1,onPatch:e.onPatch})}
                </div>
              </section>
            `})}
    </div>
  `}const Sh=new Set(["title","description","default","nullable"]);function Ah(e){return Object.keys(e??{}).filter(n=>!Sh.has(n)).length===0}function zl(e){const t=e.filter(i=>i!=null),n=t.length!==e.length,s=[];for(const i of t)s.some(a=>Object.is(a,i))||s.push(i);return{enumValues:s,nullable:n}}function Ul(e){return!e||typeof e!="object"?{schema:null,unsupportedPaths:["<root>"]}:tn(e,[])}function tn(e,t){const n=new Set,s={...e},i=bs(t)||"<root>";if(e.anyOf||e.oneOf||e.allOf){const c=Ch(e,t);return c||{schema:e,unsupportedPaths:[i]}}const a=Array.isArray(e.type)&&e.type.includes("null"),o=Oe(e)??(e.properties||e.additionalProperties?"object":void 0);if(s.type=o??e.type,s.nullable=a||e.nullable,s.enum){const{enumValues:c,nullable:l}=zl(s.enum);s.enum=c,l&&(s.nullable=!0),c.length===0&&n.add(i)}if(o==="object"){const c=e.properties??{},l={};for(const[u,g]of Object.entries(c)){const p=tn(g,[...t,u]);p.schema&&(l[u]=p.schema);for(const h of p.unsupportedPaths)n.add(h)}if(s.properties=l,e.additionalProperties===!0)n.add(i);else if(e.additionalProperties===!1)s.additionalProperties=!1;else if(e.additionalProperties&&typeof e.additionalProperties=="object"&&!Ah(e.additionalProperties)){const u=tn(e.additionalProperties,[...t,"*"]);s.additionalProperties=u.schema??e.additionalProperties,u.unsupportedPaths.length>0&&n.add(i)}}else if(o==="array"){const c=Array.isArray(e.items)?e.items[0]:e.items;if(!c)n.add(i);else{const l=tn(c,[...t,"*"]);s.items=l.schema??c,l.unsupportedPaths.length>0&&n.add(i)}}else o!=="string"&&o!=="number"&&o!=="integer"&&o!=="boolean"&&!s.enum&&n.add(i);return{schema:s,unsupportedPaths:Array.from(n)}}function Ch(e,t){if(e.allOf)return null;const n=e.anyOf??e.oneOf;if(!n)return null;const s=[],i=[];let a=!1;for(const c of n){if(!c||typeof c!="object")return null;if(Array.isArray(c.enum)){const{enumValues:l,nullable:u}=zl(c.enum);s.push(...l),u&&(a=!0);continue}if("const"in c){if(c.const==null){a=!0;continue}s.push(c.const);continue}if(Oe(c)==="null"){a=!0;continue}i.push(c)}if(s.length>0&&i.length===0){const c=[];for(const l of s)c.some(u=>Object.is(u,l))||c.push(l);return{schema:{...e,enum:c,nullable:a,anyOf:void 0,oneOf:void 0,allOf:void 0},unsupportedPaths:[]}}if(i.length===1){const c=tn(i[0],t);return c.schema&&(c.schema.nullable=a||c.schema.nullable),c}const o=new Set(["string","number","integer","boolean"]);return i.length>0&&s.length===0&&i.every(c=>c.type&&o.has(String(c.type)))?{schema:{...e,nullable:a},unsupportedPaths:[]}:null}function _h(e,t){let n=e;for(const s of t){if(!n)return null;const i=Oe(n);if(i==="object"){const a=n.properties??{};if(typeof s=="string"&&a[s]){n=a[s];continue}const o=n.additionalProperties;if(typeof s=="string"&&o&&typeof o=="object"){n=o;continue}return null}if(i==="array"){if(typeof s!="number")return null;n=(Array.isArray(n.items)?n.items[0]:n.items)??null;continue}return null}return n}function Th(e,t){const s=(e.channels??{})[t],i=e[t];return(s&&typeof s=="object"?s:null)??(i&&typeof i=="object"?i:null)??{}}const Lh=["groupPolicy","streamMode","dmPolicy"];function Eh(e){if(e==null)return"n/a";if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return String(e);try{return JSON.stringify(e)}catch{return"n/a"}}function Ih(e){const t=Lh.flatMap(n=>n in e?[[n,e[n]]]:[]);return t.length===0?null:r`
    <div class="status-list" style="margin-top: 12px;">
      ${t.map(([n,s])=>r`
          <div>
            <span class="label">${n}</span>
            <span>${Eh(s)}</span>
          </div>
        `)}
    </div>
  `}function Mh(e){const t=Ul(e.schema),n=t.schema;if(!n)return r`
      <div class="callout danger">Schema unavailable. Use Raw.</div>
    `;const s=_h(n,["channels",e.channelId]);if(!s)return r`
      <div class="callout danger">Channel config schema unavailable.</div>
    `;const i=e.configValue??{},a=Th(i,e.channelId);return r`
    <div class="config-form">
      ${Ve({schema:s,value:a,path:["channels",e.channelId],hints:e.uiHints,unsupported:new Set(t.unsupportedPaths),disabled:e.disabled,showLabel:!1,onPatch:e.onPatch})}
    </div>
    ${Ih(a)}
  `}function Ye(e){const{channelId:t,props:n}=e,s=n.configSaving||n.configSchemaLoading;return r`
    <div style="margin-top: 16px;">
      ${n.configSchemaLoading?r`
              <div class="muted">Loading config schema…</div>
            `:Mh({channelId:t,configValue:n.configForm,schema:n.configSchema,uiHints:n.configUiHints,disabled:s,onPatch:n.onConfigPatch})}
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
  `}function Rh(e){const{props:t,discord:n,accountCountLabel:s}=e;return r`
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
          <span>${n?.lastStartAt?J(n.lastStartAt):"n/a"}</span>
        </div>
        <div>
          <span class="label">Last probe</span>
          <span>${n?.lastProbeAt?J(n.lastProbeAt):"n/a"}</span>
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
  `}function Ph(e){const{props:t,googleChat:n,accountCountLabel:s}=e;return r`
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
          <span>${n?.lastStartAt?J(n.lastStartAt):"n/a"}</span>
        </div>
        <div>
          <span class="label">Last probe</span>
          <span>${n?.lastProbeAt?J(n.lastProbeAt):"n/a"}</span>
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
  `}function Dh(e){const{props:t,imessage:n,accountCountLabel:s}=e;return r`
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
          <span>${n?.lastStartAt?J(n.lastStartAt):"n/a"}</span>
        </div>
        <div>
          <span class="label">Last probe</span>
          <span>${n?.lastProbeAt?J(n.lastProbeAt):"n/a"}</span>
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
  `}function Bo(e){return e?e.length<=20?e:`${e.slice(0,8)}...${e.slice(-8)}`:"n/a"}function Nh(e){const{props:t,nostr:n,nostrAccounts:s,accountCountLabel:i,profileFormState:a,profileFormCallbacks:o,onEditProfile:c}=e,l=s[0],u=n?.configured??l?.configured??!1,g=n?.running??l?.running??!1,p=n?.publicKey??l?.publicKey,h=n?.lastStartAt??l?.lastStartAt??null,m=n?.lastError??l?.lastError??null,v=s.length>1,A=a!=null,C=d=>{const b=d.publicKey,y=d.profile,_=y?.displayName??y?.name??d.name??d.accountId;return r`
      <div class="account-card">
        <div class="account-card-header">
          <div class="account-card-title">${_}</div>
          <div class="account-card-id">${d.accountId}</div>
        </div>
        <div class="status-list account-card-status">
          <div>
            <span class="label">Running</span>
            <span>${d.running?"Yes":"No"}</span>
          </div>
          <div>
            <span class="label">Configured</span>
            <span>${d.configured?"Yes":"No"}</span>
          </div>
          <div>
            <span class="label">Public Key</span>
            <span class="monospace" title="${b??""}">${Bo(b)}</span>
          </div>
          <div>
            <span class="label">Last inbound</span>
            <span>${d.lastInboundAt?J(d.lastInboundAt):"n/a"}</span>
          </div>
          ${d.lastError?r`
                <div class="account-card-error">${d.lastError}</div>
              `:f}
        </div>
      </div>
    `},S=()=>{if(A&&o)return nd({state:a,callbacks:o,accountId:s[0]?.accountId??"default"});const d=l?.profile??n?.profile,{name:b,displayName:y,about:_,picture:L,nip05:E}=d??{},T=b||y||_||L||E;return r`
      <div style="margin-top: 16px; padding: 12px; background: var(--bg-secondary); border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div style="font-weight: 500;">Profile</div>
          ${u?r`
                <button
                  class="btn btn-sm"
                  @click=${c}
                  style="font-size: 12px; padding: 4px 8px;"
                >
                  Edit Profile
                </button>
              `:f}
        </div>
        ${T?r`
              <div class="status-list">
                ${L?r`
                      <div style="margin-bottom: 8px;">
                        <img
                          src=${L}
                          alt="Profile picture"
                          style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border-color);"
                          @error=${P=>{P.target.style.display="none"}}
                        />
                      </div>
                    `:f}
                ${b?r`<div><span class="label">Name</span><span>${b}</span></div>`:f}
                ${y?r`<div><span class="label">Display Name</span><span>${y}</span></div>`:f}
                ${_?r`<div><span class="label">About</span><span style="max-width: 300px; overflow: hidden; text-overflow: ellipsis;">${_}</span></div>`:f}
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

      ${v?r`
            <div class="account-card-list">
              ${s.map(d=>C(d))}
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
                  >${Bo(p)}</span
                >
              </div>
              <div>
                <span class="label">Last start</span>
                <span>${h?J(h):"n/a"}</span>
              </div>
            </div>
          `}

      ${m?r`<div class="callout danger" style="margin-top: 12px;">${m}</div>`:f}

      ${S()}

      ${Ye({channelId:"nostr",props:t})}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${()=>t.onRefresh(!1)}>Refresh</button>
      </div>
    </div>
  `}function Fh(e,t){const n=t.snapshot,s=n?.channels;if(!n||!s)return!1;const i=s[e],a=typeof i?.configured=="boolean"&&i.configured,o=typeof i?.running=="boolean"&&i.running,c=typeof i?.connected=="boolean"&&i.connected,u=(n.channelAccounts?.[e]??[]).some(g=>g.configured||g.running||g.connected);return a||o||c||u}function Oh(e,t){return t?.[e]?.length??0}function Hl(e,t){const n=Oh(e,t);return n<2?f:r`<div class="account-count">Accounts (${n})</div>`}function Bh(e){const{props:t,signal:n,accountCountLabel:s}=e;return r`
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
          <span>${n?.lastStartAt?J(n.lastStartAt):"n/a"}</span>
        </div>
        <div>
          <span class="label">Last probe</span>
          <span>${n?.lastProbeAt?J(n.lastProbeAt):"n/a"}</span>
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
  `}function zh(e){const{props:t,slack:n,accountCountLabel:s}=e;return r`
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
          <span>${n?.lastStartAt?J(n.lastStartAt):"n/a"}</span>
        </div>
        <div>
          <span class="label">Last probe</span>
          <span>${n?.lastProbeAt?J(n.lastProbeAt):"n/a"}</span>
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
  `}function Uh(e){const{props:t,telegram:n,telegramAccounts:s,accountCountLabel:i}=e,a=s.length>1,o=c=>{const u=c.probe?.bot?.username,g=c.name||c.accountId;return r`
      <div class="account-card">
        <div class="account-card-header">
          <div class="account-card-title">
            ${u?`@${u}`:g}
          </div>
          <div class="account-card-id">${c.accountId}</div>
        </div>
        <div class="status-list account-card-status">
          <div>
            <span class="label">Running</span>
            <span>${c.running?"Yes":"No"}</span>
          </div>
          <div>
            <span class="label">Configured</span>
            <span>${c.configured?"Yes":"No"}</span>
          </div>
          <div>
            <span class="label">Last inbound</span>
            <span>${c.lastInboundAt?J(c.lastInboundAt):"n/a"}</span>
          </div>
          ${c.lastError?r`
                <div class="account-card-error">
                  ${c.lastError}
                </div>
              `:f}
        </div>
      </div>
    `};return r`
    <div class="card">
      <div class="card-title">Telegram</div>
      <div class="card-sub">Bot status and channel configuration.</div>
      ${i}

      ${a?r`
            <div class="account-card-list">
              ${s.map(c=>o(c))}
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
                <span>${n?.lastStartAt?J(n.lastStartAt):"n/a"}</span>
              </div>
              <div>
                <span class="label">Last probe</span>
                <span>${n?.lastProbeAt?J(n.lastProbeAt):"n/a"}</span>
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
  `}function Hh(e){const{props:t,whatsapp:n,accountCountLabel:s}=e;return r`
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
            ${n?.lastConnectedAt?J(n.lastConnectedAt):"n/a"}
          </span>
        </div>
        <div>
          <span class="label">Last message</span>
          <span>
            ${n?.lastMessageAt?J(n.lastMessageAt):"n/a"}
          </span>
        </div>
        <div>
          <span class="label">Auth age</span>
          <span>
            ${n?.authAgeMs!=null?Xi(n.authAgeMs):"n/a"}
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
  `}function Kh(e){const t=e.snapshot?.channels,n=t?.whatsapp??void 0,s=t?.telegram??void 0,i=t?.discord??null,a=t?.googlechat??null,o=t?.slack??null,c=t?.signal??null,l=t?.imessage??null,u=t?.nostr??null,p=jh(e.snapshot).map((S,d)=>({key:S,enabled:Fh(S,e),order:d})).toSorted((S,d)=>S.enabled!==d.enabled?S.enabled?-1:1:S.order-d.order),h=Object.values(t??{}).filter(S=>!!(S&&typeof S=="object")),m=p.filter(S=>S.enabled).length,v=h.filter(S=>S.running===!0).length,A=h.filter(S=>S.connected===!0).length,C=h.filter(S=>typeof S.lastError=="string"&&S.lastError.trim().length>0).length;return r`
    <section class="card">
      <div class="section-header">
        <div>
          <div class="card-title">Channel Status · 渠道状态</div>
          <div class="card-sub">Monitor connectivity and health of all messaging channels.</div>
        </div>
        <div class="section-header__meta">
          <button class="btn btn--sm" ?disabled=${e.loading} @click=${()=>e.onRefresh(!1)}>
            ${e.loading?"Refreshing…":"↻ Refresh"}
          </button>
          <span class="muted">${e.lastSuccessAt?J(e.lastSuccessAt):"—"}</span>
        </div>
      </div>
      <div class="page-summary-grid" style="margin-top: 18px;">
        <div class="page-summary-card">
          <div class="page-summary-label">Configured · 已配置</div>
          <div class="page-summary-value">${m}</div>
          <div class="page-summary-sub">Enabled in your config</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">Running · 运行中</div>
          <div class="page-summary-value">${v}</div>
          <div class="page-summary-sub">Active services</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">Connected · 已连接</div>
          <div class="page-summary-value">${A}</div>
          <div class="page-summary-sub">Upstream links alive</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">Issues · 异常</div>
          <div class="page-summary-value ${C>0?"warn":"ok"}">${C}</div>
          <div class="page-summary-sub">Channels with errors</div>
        </div>
      </div>
      ${e.lastError?r`<div class="callout danger" style="margin-top: 14px;">${e.lastError}</div>`:f}
    </section>

    <section class="grid grid-cols-2" style="margin-top: 20px;">
      ${p.map(S=>Wh(S.key,e,{whatsapp:n,telegram:s,discord:i,googlechat:a,slack:o,signal:c,imessage:l,nostr:u,channelAccounts:e.snapshot?.channelAccounts??null}))}
    </section>

    <details class="collapsible" style="margin-top: 20px;">
      <summary>Raw Snapshot · 原始数据</summary>
      <div class="card-sub" style="margin-top: 10px;">
        Full channel diagnostic data from the gateway — useful for debugging.
      </div>
      <pre class="code-block" style="margin-top: 10px;">${e.snapshot?JSON.stringify(e.snapshot,null,2):"No data available yet."}</pre>
    </details>
  `}function jh(e){return e?.channelMeta?.length?e.channelMeta.map(t=>t.id):e?.channelOrder?.length?e.channelOrder:["whatsapp","telegram","discord","googlechat","slack","signal","imessage","nostr"]}function Wh(e,t,n){const s=Hl(e,n.channelAccounts);switch(e){case"whatsapp":return Hh({props:t,whatsapp:n.whatsapp,accountCountLabel:s});case"telegram":return Uh({props:t,telegram:n.telegram,telegramAccounts:n.channelAccounts?.telegram??[],accountCountLabel:s});case"discord":return Rh({props:t,discord:n.discord,accountCountLabel:s});case"googlechat":return Ph({props:t,googleChat:n.googlechat,accountCountLabel:s});case"slack":return zh({props:t,slack:n.slack,accountCountLabel:s});case"signal":return Bh({props:t,signal:n.signal,accountCountLabel:s});case"imessage":return Dh({props:t,imessage:n.imessage,accountCountLabel:s});case"nostr":{const i=n.channelAccounts?.nostr??[],a=i[0],o=a?.accountId??"default",c=a?.profile??null,l=t.nostrProfileAccountId===o?t.nostrProfileFormState:null,u=l?{onFieldChange:t.onNostrProfileFieldChange,onSave:t.onNostrProfileSave,onImport:t.onNostrProfileImport,onCancel:t.onNostrProfileCancel,onToggleAdvanced:t.onNostrProfileToggleAdvanced}:null;return Nh({props:t,nostr:n.nostr,nostrAccounts:i,accountCountLabel:s,profileFormState:l,profileFormCallbacks:u,onEditProfile:()=>t.onNostrProfileEdit(o,c)})}default:return Gh(e,t,n.channelAccounts??{})}}function Gh(e,t,n){const s=Vh(t.snapshot,e),i=t.snapshot?.channels?.[e],a=typeof i?.configured=="boolean"?i.configured:void 0,o=typeof i?.running=="boolean"?i.running:void 0,c=typeof i?.connected=="boolean"?i.connected:void 0,l=typeof i?.lastError=="string"?i.lastError:void 0,u=n[e]??[],g=Hl(e,n);return r`
    <div class="card">
      <div class="card-title">${s}</div>
      <div class="card-sub">Status and connectivity overview.</div>
      ${g}

      ${u.length>0?r`
            <div class="account-card-list">
              ${u.map(p=>Jh(p))}
            </div>
          `:r`
            <div class="info-grid" style="margin-top: 16px;">
              <span class="info-grid-label">Configured</span>
              <span>${a==null?"—":r`<span class="status-badge ${a?"ok":"neutral"}">
                ${a?"Yes":"No"}</span>`}</span>
              <span class="info-grid-label">Running</span>
              <span>${o==null?"—":r`<span class="status-badge ${o?"ok":"warn"}">
                ${o?"Yes":"No"}</span>`}</span>
              <span class="info-grid-label">Connected</span>
              <span>${c==null?"—":r`<span class="status-badge ${c?"ok":"danger"}">
                ${c?"Yes":"No"}</span>`}</span>
            </div>
          `}

      ${l?r`<div class="callout danger" style="margin-top: 14px;">
            ${l}
          </div>`:f}

      ${Ye({channelId:e,props:t})}
    </div>
  `}function qh(e){return e?.channelMeta?.length?Object.fromEntries(e.channelMeta.map(t=>[t.id,t])):{}}function Vh(e,t){return qh(e)[t]?.label??e?.channelLabels?.[t]??t}const Qh=600*1e3;function Kl(e){return e.lastInboundAt?Date.now()-e.lastInboundAt<Qh:!1}function Yh(e){return e.running?"Yes":Kl(e)?"Active":"No"}function Zh(e){return e.connected===!0?"Yes":e.connected===!1?"No":Kl(e)?"Active":"n/a"}function Jh(e){const t=Yh(e),n=Zh(e),s=t==="Yes"||t==="Active"?"ok":"warn",i=n==="Yes"||n==="Active"?"ok":n==="No"?"danger":"neutral";return r`
    <div class="account-card">
      <div class="account-card-header">
        <div class="account-card-title">${e.name||e.accountId}</div>
        <div class="account-card-id">${e.accountId}</div>
      </div>
      <div class="info-grid account-card-status">
        <span class="info-grid-label">Running</span>
        <span class="status-badge ${s}">${t}</span>
        <span class="info-grid-label">Configured</span>
        <span class="status-badge ${e.configured?"ok":"neutral"}">${e.configured?"Yes":"No"}</span>
        <span class="info-grid-label">Connected</span>
        <span class="status-badge ${i}">${n==="n/a"?"—":n}</span>
        <span class="info-grid-label">Last message</span>
        <span>${e.lastInboundAt?J(e.lastInboundAt):"—"}</span>
        ${e.lastError?r`
              <div class="account-card-error" style="grid-column: 1 / -1;">
                ${e.lastError}
              </div>
            `:f}
      </div>
    </div>
  `}const nn=(e,t)=>{const n=e._$AN;if(n===void 0)return!1;for(const s of n)s._$AO?.(t,!1),nn(s,t);return!0},Jn=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},jl=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),tf(t)}};function Xh(e){this._$AN!==void 0?(Jn(this),this._$AM=e,jl(this)):this._$AM=e}function ef(e,t=!1,n=0){const s=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(t)if(Array.isArray(s))for(let a=n;a<s.length;a++)nn(s[a],!1),Jn(s[a]);else s!=null&&(nn(s,!1),Jn(s));else nn(this,e)}const tf=e=>{e.type==pa.CHILD&&(e._$AP??=ef,e._$AQ??=Xh)};class nf extends fa{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,n,s){super._$AT(t,n,s),jl(this),this.isConnected=t._$AU}_$AO(t,n=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),n&&(nn(this,t),Jn(this))}setValue(t){if(cp(this._$Ct))this._$Ct._$AI(t,this);else{const n=[...this._$Ct._$AH];n[this._$Ci]=t,this._$Ct._$AI(n,this,0)}}disconnected(){}reconnected(){}}const Gs=new WeakMap,sf=ha(class extends nf{render(e){return f}update(e,[t]){const n=t!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),f}rt(e){if(this.isConnected||(e=void 0),typeof this.G=="function"){const t=this.ht??globalThis;let n=Gs.get(t);n===void 0&&(n=new WeakMap,Gs.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return typeof this.G=="function"?Gs.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});class Ti extends fa{constructor(t){if(super(t),this.it=f,t.type!==pa.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===f||t==null)return this._t=void 0,this.it=t;if(t===Xe)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}}Ti.directiveName="unsafeHTML",Ti.resultType=1;const Li=ha(Ti);const{entries:Wl,setPrototypeOf:zo,isFrozen:af,getPrototypeOf:of,getOwnPropertyDescriptor:rf}=Object;let{freeze:be,seal:Te,create:Ei}=Object,{apply:Ii,construct:Mi}=typeof Reflect<"u"&&Reflect;be||(be=function(t){return t});Te||(Te=function(t){return t});Ii||(Ii=function(t,n){for(var s=arguments.length,i=new Array(s>2?s-2:0),a=2;a<s;a++)i[a-2]=arguments[a];return t.apply(n,i)});Mi||(Mi=function(t){for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return new t(...s)});const In=ye(Array.prototype.forEach),lf=ye(Array.prototype.lastIndexOf),Uo=ye(Array.prototype.pop),Kt=ye(Array.prototype.push),cf=ye(Array.prototype.splice),Hn=ye(String.prototype.toLowerCase),qs=ye(String.prototype.toString),Vs=ye(String.prototype.match),jt=ye(String.prototype.replace),df=ye(String.prototype.indexOf),uf=ye(String.prototype.trim),Le=ye(Object.prototype.hasOwnProperty),ve=ye(RegExp.prototype.test),Wt=gf(TypeError);function ye(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,s=new Array(n>1?n-1:0),i=1;i<n;i++)s[i-1]=arguments[i];return Ii(e,t,s)}}function gf(e){return function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];return Mi(e,n)}}function V(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Hn;zo&&zo(e,null);let s=t.length;for(;s--;){let i=t[s];if(typeof i=="string"){const a=n(i);a!==i&&(af(t)||(t[s]=a),i=a)}e[i]=!0}return e}function pf(e){for(let t=0;t<e.length;t++)Le(e,t)||(e[t]=null);return e}function Ne(e){const t=Ei(null);for(const[n,s]of Wl(e))Le(e,n)&&(Array.isArray(s)?t[n]=pf(s):s&&typeof s=="object"&&s.constructor===Object?t[n]=Ne(s):t[n]=s);return t}function Gt(e,t){for(;e!==null;){const s=rf(e,t);if(s){if(s.get)return ye(s.get);if(typeof s.value=="function")return ye(s.value)}e=of(e)}function n(){return null}return n}const Ho=be(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Qs=be(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ys=be(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),hf=be(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Zs=be(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ff=be(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ko=be(["#text"]),jo=be(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Js=be(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Wo=be(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Mn=be(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),vf=Te(/\{\{[\w\W]*|[\w\W]*\}\}/gm),mf=Te(/<%[\w\W]*|[\w\W]*%>/gm),bf=Te(/\$\{[\w\W]*/gm),yf=Te(/^data-[\-\w.\u00B7-\uFFFF]+$/),xf=Te(/^aria-[\-\w]+$/),Gl=Te(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),$f=Te(/^(?:\w+script|data):/i),wf=Te(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ql=Te(/^html$/i),kf=Te(/^[a-z][.\w]*(-[.\w]+)+$/i);var Go=Object.freeze({__proto__:null,ARIA_ATTR:xf,ATTR_WHITESPACE:wf,CUSTOM_ELEMENT:kf,DATA_ATTR:yf,DOCTYPE_NAME:ql,ERB_EXPR:mf,IS_ALLOWED_URI:Gl,IS_SCRIPT_OR_DATA:$f,MUSTACHE_EXPR:vf,TMPLIT_EXPR:bf});const qt={element:1,text:3,progressingInstruction:7,comment:8,document:9},Sf=function(){return typeof window>"u"?null:window},Af=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let s=null;const i="data-tt-policy-suffix";n&&n.hasAttribute(i)&&(s=n.getAttribute(i));const a="dompurify"+(s?"#"+s:"");try{return t.createPolicy(a,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}},qo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Vl(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Sf();const t=j=>Vl(j);if(t.version="3.3.1",t.removed=[],!e||!e.document||e.document.nodeType!==qt.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e;const s=n,i=s.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:c,Element:l,NodeFilter:u,NamedNodeMap:g=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:h,trustedTypes:m}=e,v=l.prototype,A=Gt(v,"cloneNode"),C=Gt(v,"remove"),S=Gt(v,"nextSibling"),d=Gt(v,"childNodes"),b=Gt(v,"parentNode");if(typeof o=="function"){const j=n.createElement("template");j.content&&j.content.ownerDocument&&(n=j.content.ownerDocument)}let y,_="";const{implementation:L,createNodeIterator:E,createDocumentFragment:T,getElementsByTagName:P}=n,{importNode:G}=s;let R=qo();t.isSupported=typeof Wl=="function"&&typeof b=="function"&&L&&L.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:H,ERB_EXPR:q,TMPLIT_EXPR:I,DATA_ATTR:K,ARIA_ATTR:re,IS_SCRIPT_OR_DATA:le,ATTR_WHITESPACE:ne,CUSTOM_ELEMENT:ae}=Go;let{IS_ALLOWED_URI:D}=Go,N=null;const F=V({},[...Ho,...Qs,...Ys,...Zs,...Ko]);let W=null;const we=V({},[...jo,...Js,...Wo,...Mn]);let ee=Object.seal(Ei(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ae=null,se=null;const fe=Object.seal(Ei(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Be=!0,ze=!0,st=!1,Ma=!0,St=!1,bn=!0,it=!1,ws=!1,ks=!1,At=!1,yn=!1,xn=!1,Ra=!0,Pa=!1;const fc="user-content-";let Ss=!0,Bt=!1,Ct={},Re=null;const As=V({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Da=null;const Na=V({},["audio","video","img","source","image","track"]);let Cs=null;const Fa=V({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),$n="http://www.w3.org/1998/Math/MathML",wn="http://www.w3.org/2000/svg",Ue="http://www.w3.org/1999/xhtml";let _t=Ue,_s=!1,Ts=null;const vc=V({},[$n,wn,Ue],qs);let kn=V({},["mi","mo","mn","ms","mtext"]),Sn=V({},["annotation-xml"]);const mc=V({},["title","style","font","a","script"]);let zt=null;const bc=["application/xhtml+xml","text/html"],yc="text/html";let oe=null,Tt=null;const xc=n.createElement("form"),Oa=function(x){return x instanceof RegExp||x instanceof Function},Ls=function(){let x=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Tt&&Tt===x)){if((!x||typeof x!="object")&&(x={}),x=Ne(x),zt=bc.indexOf(x.PARSER_MEDIA_TYPE)===-1?yc:x.PARSER_MEDIA_TYPE,oe=zt==="application/xhtml+xml"?qs:Hn,N=Le(x,"ALLOWED_TAGS")?V({},x.ALLOWED_TAGS,oe):F,W=Le(x,"ALLOWED_ATTR")?V({},x.ALLOWED_ATTR,oe):we,Ts=Le(x,"ALLOWED_NAMESPACES")?V({},x.ALLOWED_NAMESPACES,qs):vc,Cs=Le(x,"ADD_URI_SAFE_ATTR")?V(Ne(Fa),x.ADD_URI_SAFE_ATTR,oe):Fa,Da=Le(x,"ADD_DATA_URI_TAGS")?V(Ne(Na),x.ADD_DATA_URI_TAGS,oe):Na,Re=Le(x,"FORBID_CONTENTS")?V({},x.FORBID_CONTENTS,oe):As,Ae=Le(x,"FORBID_TAGS")?V({},x.FORBID_TAGS,oe):Ne({}),se=Le(x,"FORBID_ATTR")?V({},x.FORBID_ATTR,oe):Ne({}),Ct=Le(x,"USE_PROFILES")?x.USE_PROFILES:!1,Be=x.ALLOW_ARIA_ATTR!==!1,ze=x.ALLOW_DATA_ATTR!==!1,st=x.ALLOW_UNKNOWN_PROTOCOLS||!1,Ma=x.ALLOW_SELF_CLOSE_IN_ATTR!==!1,St=x.SAFE_FOR_TEMPLATES||!1,bn=x.SAFE_FOR_XML!==!1,it=x.WHOLE_DOCUMENT||!1,At=x.RETURN_DOM||!1,yn=x.RETURN_DOM_FRAGMENT||!1,xn=x.RETURN_TRUSTED_TYPE||!1,ks=x.FORCE_BODY||!1,Ra=x.SANITIZE_DOM!==!1,Pa=x.SANITIZE_NAMED_PROPS||!1,Ss=x.KEEP_CONTENT!==!1,Bt=x.IN_PLACE||!1,D=x.ALLOWED_URI_REGEXP||Gl,_t=x.NAMESPACE||Ue,kn=x.MATHML_TEXT_INTEGRATION_POINTS||kn,Sn=x.HTML_INTEGRATION_POINTS||Sn,ee=x.CUSTOM_ELEMENT_HANDLING||{},x.CUSTOM_ELEMENT_HANDLING&&Oa(x.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ee.tagNameCheck=x.CUSTOM_ELEMENT_HANDLING.tagNameCheck),x.CUSTOM_ELEMENT_HANDLING&&Oa(x.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ee.attributeNameCheck=x.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),x.CUSTOM_ELEMENT_HANDLING&&typeof x.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ee.allowCustomizedBuiltInElements=x.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),St&&(ze=!1),yn&&(At=!0),Ct&&(N=V({},Ko),W=[],Ct.html===!0&&(V(N,Ho),V(W,jo)),Ct.svg===!0&&(V(N,Qs),V(W,Js),V(W,Mn)),Ct.svgFilters===!0&&(V(N,Ys),V(W,Js),V(W,Mn)),Ct.mathMl===!0&&(V(N,Zs),V(W,Wo),V(W,Mn))),x.ADD_TAGS&&(typeof x.ADD_TAGS=="function"?fe.tagCheck=x.ADD_TAGS:(N===F&&(N=Ne(N)),V(N,x.ADD_TAGS,oe))),x.ADD_ATTR&&(typeof x.ADD_ATTR=="function"?fe.attributeCheck=x.ADD_ATTR:(W===we&&(W=Ne(W)),V(W,x.ADD_ATTR,oe))),x.ADD_URI_SAFE_ATTR&&V(Cs,x.ADD_URI_SAFE_ATTR,oe),x.FORBID_CONTENTS&&(Re===As&&(Re=Ne(Re)),V(Re,x.FORBID_CONTENTS,oe)),x.ADD_FORBID_CONTENTS&&(Re===As&&(Re=Ne(Re)),V(Re,x.ADD_FORBID_CONTENTS,oe)),Ss&&(N["#text"]=!0),it&&V(N,["html","head","body"]),N.table&&(V(N,["tbody"]),delete Ae.tbody),x.TRUSTED_TYPES_POLICY){if(typeof x.TRUSTED_TYPES_POLICY.createHTML!="function")throw Wt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof x.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Wt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');y=x.TRUSTED_TYPES_POLICY,_=y.createHTML("")}else y===void 0&&(y=Af(m,i)),y!==null&&typeof _=="string"&&(_=y.createHTML(""));be&&be(x),Tt=x}},Ba=V({},[...Qs,...Ys,...hf]),za=V({},[...Zs,...ff]),$c=function(x){let M=b(x);(!M||!M.tagName)&&(M={namespaceURI:_t,tagName:"template"});const B=Hn(x.tagName),te=Hn(M.tagName);return Ts[x.namespaceURI]?x.namespaceURI===wn?M.namespaceURI===Ue?B==="svg":M.namespaceURI===$n?B==="svg"&&(te==="annotation-xml"||kn[te]):!!Ba[B]:x.namespaceURI===$n?M.namespaceURI===Ue?B==="math":M.namespaceURI===wn?B==="math"&&Sn[te]:!!za[B]:x.namespaceURI===Ue?M.namespaceURI===wn&&!Sn[te]||M.namespaceURI===$n&&!kn[te]?!1:!za[B]&&(mc[B]||!Ba[B]):!!(zt==="application/xhtml+xml"&&Ts[x.namespaceURI]):!1},Pe=function(x){Kt(t.removed,{element:x});try{b(x).removeChild(x)}catch{C(x)}},at=function(x,M){try{Kt(t.removed,{attribute:M.getAttributeNode(x),from:M})}catch{Kt(t.removed,{attribute:null,from:M})}if(M.removeAttribute(x),x==="is")if(At||yn)try{Pe(M)}catch{}else try{M.setAttribute(x,"")}catch{}},Ua=function(x){let M=null,B=null;if(ks)x="<remove></remove>"+x;else{const ie=Vs(x,/^[\r\n\t ]+/);B=ie&&ie[0]}zt==="application/xhtml+xml"&&_t===Ue&&(x='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+x+"</body></html>");const te=y?y.createHTML(x):x;if(_t===Ue)try{M=new h().parseFromString(te,zt)}catch{}if(!M||!M.documentElement){M=L.createDocument(_t,"template",null);try{M.documentElement.innerHTML=_s?_:te}catch{}}const ge=M.body||M.documentElement;return x&&B&&ge.insertBefore(n.createTextNode(B),ge.childNodes[0]||null),_t===Ue?P.call(M,it?"html":"body")[0]:it?M.documentElement:ge},Ha=function(x){return E.call(x.ownerDocument||x,x,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Es=function(x){return x instanceof p&&(typeof x.nodeName!="string"||typeof x.textContent!="string"||typeof x.removeChild!="function"||!(x.attributes instanceof g)||typeof x.removeAttribute!="function"||typeof x.setAttribute!="function"||typeof x.namespaceURI!="string"||typeof x.insertBefore!="function"||typeof x.hasChildNodes!="function")},Ka=function(x){return typeof c=="function"&&x instanceof c};function He(j,x,M){In(j,B=>{B.call(t,x,M,Tt)})}const ja=function(x){let M=null;if(He(R.beforeSanitizeElements,x,null),Es(x))return Pe(x),!0;const B=oe(x.nodeName);if(He(R.uponSanitizeElement,x,{tagName:B,allowedTags:N}),bn&&x.hasChildNodes()&&!Ka(x.firstElementChild)&&ve(/<[/\w!]/g,x.innerHTML)&&ve(/<[/\w!]/g,x.textContent)||x.nodeType===qt.progressingInstruction||bn&&x.nodeType===qt.comment&&ve(/<[/\w]/g,x.data))return Pe(x),!0;if(!(fe.tagCheck instanceof Function&&fe.tagCheck(B))&&(!N[B]||Ae[B])){if(!Ae[B]&&Ga(B)&&(ee.tagNameCheck instanceof RegExp&&ve(ee.tagNameCheck,B)||ee.tagNameCheck instanceof Function&&ee.tagNameCheck(B)))return!1;if(Ss&&!Re[B]){const te=b(x)||x.parentNode,ge=d(x)||x.childNodes;if(ge&&te){const ie=ge.length;for(let xe=ie-1;xe>=0;--xe){const Ke=A(ge[xe],!0);Ke.__removalCount=(x.__removalCount||0)+1,te.insertBefore(Ke,S(x))}}}return Pe(x),!0}return x instanceof l&&!$c(x)||(B==="noscript"||B==="noembed"||B==="noframes")&&ve(/<\/no(script|embed|frames)/i,x.innerHTML)?(Pe(x),!0):(St&&x.nodeType===qt.text&&(M=x.textContent,In([H,q,I],te=>{M=jt(M,te," ")}),x.textContent!==M&&(Kt(t.removed,{element:x.cloneNode()}),x.textContent=M)),He(R.afterSanitizeElements,x,null),!1)},Wa=function(x,M,B){if(Ra&&(M==="id"||M==="name")&&(B in n||B in xc))return!1;if(!(ze&&!se[M]&&ve(K,M))){if(!(Be&&ve(re,M))){if(!(fe.attributeCheck instanceof Function&&fe.attributeCheck(M,x))){if(!W[M]||se[M]){if(!(Ga(x)&&(ee.tagNameCheck instanceof RegExp&&ve(ee.tagNameCheck,x)||ee.tagNameCheck instanceof Function&&ee.tagNameCheck(x))&&(ee.attributeNameCheck instanceof RegExp&&ve(ee.attributeNameCheck,M)||ee.attributeNameCheck instanceof Function&&ee.attributeNameCheck(M,x))||M==="is"&&ee.allowCustomizedBuiltInElements&&(ee.tagNameCheck instanceof RegExp&&ve(ee.tagNameCheck,B)||ee.tagNameCheck instanceof Function&&ee.tagNameCheck(B))))return!1}else if(!Cs[M]){if(!ve(D,jt(B,ne,""))){if(!((M==="src"||M==="xlink:href"||M==="href")&&x!=="script"&&df(B,"data:")===0&&Da[x])){if(!(st&&!ve(le,jt(B,ne,"")))){if(B)return!1}}}}}}}return!0},Ga=function(x){return x!=="annotation-xml"&&Vs(x,ae)},qa=function(x){He(R.beforeSanitizeAttributes,x,null);const{attributes:M}=x;if(!M||Es(x))return;const B={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:W,forceKeepAttr:void 0};let te=M.length;for(;te--;){const ge=M[te],{name:ie,namespaceURI:xe,value:Ke}=ge,Lt=oe(ie),Is=Ke;let de=ie==="value"?Is:uf(Is);if(B.attrName=Lt,B.attrValue=de,B.keepAttr=!0,B.forceKeepAttr=void 0,He(R.uponSanitizeAttribute,x,B),de=B.attrValue,Pa&&(Lt==="id"||Lt==="name")&&(at(ie,x),de=fc+de),bn&&ve(/((--!?|])>)|<\/(style|title|textarea)/i,de)){at(ie,x);continue}if(Lt==="attributename"&&Vs(de,"href")){at(ie,x);continue}if(B.forceKeepAttr)continue;if(!B.keepAttr){at(ie,x);continue}if(!Ma&&ve(/\/>/i,de)){at(ie,x);continue}St&&In([H,q,I],Qa=>{de=jt(de,Qa," ")});const Va=oe(x.nodeName);if(!Wa(Va,Lt,de)){at(ie,x);continue}if(y&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!xe)switch(m.getAttributeType(Va,Lt)){case"TrustedHTML":{de=y.createHTML(de);break}case"TrustedScriptURL":{de=y.createScriptURL(de);break}}if(de!==Is)try{xe?x.setAttributeNS(xe,ie,de):x.setAttribute(ie,de),Es(x)?Pe(x):Uo(t.removed)}catch{at(ie,x)}}He(R.afterSanitizeAttributes,x,null)},wc=function j(x){let M=null;const B=Ha(x);for(He(R.beforeSanitizeShadowDOM,x,null);M=B.nextNode();)He(R.uponSanitizeShadowNode,M,null),ja(M),qa(M),M.content instanceof a&&j(M.content);He(R.afterSanitizeShadowDOM,x,null)};return t.sanitize=function(j){let x=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},M=null,B=null,te=null,ge=null;if(_s=!j,_s&&(j="<!-->"),typeof j!="string"&&!Ka(j))if(typeof j.toString=="function"){if(j=j.toString(),typeof j!="string")throw Wt("dirty is not a string, aborting")}else throw Wt("toString is not a function");if(!t.isSupported)return j;if(ws||Ls(x),t.removed=[],typeof j=="string"&&(Bt=!1),Bt){if(j.nodeName){const Ke=oe(j.nodeName);if(!N[Ke]||Ae[Ke])throw Wt("root node is forbidden and cannot be sanitized in-place")}}else if(j instanceof c)M=Ua("<!---->"),B=M.ownerDocument.importNode(j,!0),B.nodeType===qt.element&&B.nodeName==="BODY"||B.nodeName==="HTML"?M=B:M.appendChild(B);else{if(!At&&!St&&!it&&j.indexOf("<")===-1)return y&&xn?y.createHTML(j):j;if(M=Ua(j),!M)return At?null:xn?_:""}M&&ks&&Pe(M.firstChild);const ie=Ha(Bt?j:M);for(;te=ie.nextNode();)ja(te),qa(te),te.content instanceof a&&wc(te.content);if(Bt)return j;if(At){if(yn)for(ge=T.call(M.ownerDocument);M.firstChild;)ge.appendChild(M.firstChild);else ge=M;return(W.shadowroot||W.shadowrootmode)&&(ge=G.call(s,ge,!0)),ge}let xe=it?M.outerHTML:M.innerHTML;return it&&N["!doctype"]&&M.ownerDocument&&M.ownerDocument.doctype&&M.ownerDocument.doctype.name&&ve(ql,M.ownerDocument.doctype.name)&&(xe="<!DOCTYPE "+M.ownerDocument.doctype.name+`>
`+xe),St&&In([H,q,I],Ke=>{xe=jt(xe,Ke," ")}),y&&xn?y.createHTML(xe):xe},t.setConfig=function(){let j=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ls(j),ws=!0},t.clearConfig=function(){Tt=null,ws=!1},t.isValidAttribute=function(j,x,M){Tt||Ls({});const B=oe(j),te=oe(x);return Wa(B,te,M)},t.addHook=function(j,x){typeof x=="function"&&Kt(R[j],x)},t.removeHook=function(j,x){if(x!==void 0){const M=lf(R[j],x);return M===-1?void 0:cf(R[j],M,1)[0]}return Uo(R[j])},t.removeHooks=function(j){R[j]=[]},t.removeAllHooks=function(){R=qo()},t}var Ri=Vl();function ba(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var kt=ba();function Ql(e){kt=e}var sn={exec:()=>null};function Q(e,t=""){let n=typeof e=="string"?e:e.source,s={replace:(i,a)=>{let o=typeof a=="string"?a:a.source;return o=o.replace(me.caret,"$1"),n=n.replace(i,o),s},getRegex:()=>new RegExp(n,t)};return s}var Cf=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),me={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},_f=/^(?:[ \t]*(?:\n|$))+/,Tf=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Lf=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,mn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ef=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ya=/(?:[*+-]|\d{1,9}[.)])/,Yl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Zl=Q(Yl).replace(/bull/g,ya).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),If=Q(Yl).replace(/bull/g,ya).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),xa=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Mf=/^[^\n]+/,$a=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Rf=Q(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",$a).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Pf=Q(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ya).getRegex(),ys="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",wa=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Df=Q("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",wa).replace("tag",ys).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Jl=Q(xa).replace("hr",mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ys).getRegex(),Nf=Q(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Jl).getRegex(),ka={blockquote:Nf,code:Tf,def:Rf,fences:Lf,heading:Ef,hr:mn,html:Df,lheading:Zl,list:Pf,newline:_f,paragraph:Jl,table:sn,text:Mf},Vo=Q("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ys).getRegex(),Ff={...ka,lheading:If,table:Vo,paragraph:Q(xa).replace("hr",mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Vo).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ys).getRegex()},Of={...ka,html:Q(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",wa).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:sn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Q(xa).replace("hr",mn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Zl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Bf=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,zf=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Xl=/^( {2,}|\\)\n(?!\s*$)/,Uf=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,xs=/[\p{P}\p{S}]/u,Sa=/[\s\p{P}\p{S}]/u,ec=/[^\s\p{P}\p{S}]/u,Hf=Q(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Sa).getRegex(),tc=/(?!~)[\p{P}\p{S}]/u,Kf=/(?!~)[\s\p{P}\p{S}]/u,jf=/(?:[^\s\p{P}\p{S}]|~)/u,Wf=Q(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Cf?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),nc=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Gf=Q(nc,"u").replace(/punct/g,xs).getRegex(),qf=Q(nc,"u").replace(/punct/g,tc).getRegex(),sc="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Vf=Q(sc,"gu").replace(/notPunctSpace/g,ec).replace(/punctSpace/g,Sa).replace(/punct/g,xs).getRegex(),Qf=Q(sc,"gu").replace(/notPunctSpace/g,jf).replace(/punctSpace/g,Kf).replace(/punct/g,tc).getRegex(),Yf=Q("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ec).replace(/punctSpace/g,Sa).replace(/punct/g,xs).getRegex(),Zf=Q(/\\(punct)/,"gu").replace(/punct/g,xs).getRegex(),Jf=Q(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Xf=Q(wa).replace("(?:-->|$)","-->").getRegex(),ev=Q("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Xf).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Xn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,tv=Q(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Xn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ic=Q(/^!?\[(label)\]\[(ref)\]/).replace("label",Xn).replace("ref",$a).getRegex(),ac=Q(/^!?\[(ref)\](?:\[\])?/).replace("ref",$a).getRegex(),nv=Q("reflink|nolink(?!\\()","g").replace("reflink",ic).replace("nolink",ac).getRegex(),Qo=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Aa={_backpedal:sn,anyPunctuation:Zf,autolink:Jf,blockSkip:Wf,br:Xl,code:zf,del:sn,emStrongLDelim:Gf,emStrongRDelimAst:Vf,emStrongRDelimUnd:Yf,escape:Bf,link:tv,nolink:ac,punctuation:Hf,reflink:ic,reflinkSearch:nv,tag:ev,text:Uf,url:sn},sv={...Aa,link:Q(/^!?\[(label)\]\((.*?)\)/).replace("label",Xn).getRegex(),reflink:Q(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Xn).getRegex()},Pi={...Aa,emStrongRDelimAst:Qf,emStrongLDelim:qf,url:Q(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Qo).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Q(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Qo).getRegex()},iv={...Pi,br:Q(Xl).replace("{2,}","*").getRegex(),text:Q(Pi.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Rn={normal:ka,gfm:Ff,pedantic:Of},Vt={normal:Aa,gfm:Pi,breaks:iv,pedantic:sv},av={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Yo=e=>av[e];function Ge(e,t){if(t){if(me.escapeTest.test(e))return e.replace(me.escapeReplace,Yo)}else if(me.escapeTestNoEncode.test(e))return e.replace(me.escapeReplaceNoEncode,Yo);return e}function Zo(e){try{e=encodeURI(e).replace(me.percentDecode,"%")}catch{return null}return e}function Jo(e,t){let n=e.replace(me.findPipe,(a,o,c)=>{let l=!1,u=o;for(;--u>=0&&c[u]==="\\";)l=!l;return l?"|":" |"}),s=n.split(me.splitPipe),i=0;if(s[0].trim()||s.shift(),s.length>0&&!s.at(-1)?.trim()&&s.pop(),t)if(s.length>t)s.splice(t);else for(;s.length<t;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(me.slashPipe,"|");return s}function Qt(e,t,n){let s=e.length;if(s===0)return"";let i=0;for(;i<s&&e.charAt(s-i-1)===t;)i++;return e.slice(0,s-i)}function ov(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let s=0;s<e.length;s++)if(e[s]==="\\")s++;else if(e[s]===t[0])n++;else if(e[s]===t[1]&&(n--,n<0))return s;return n>0?-2:-1}function Xo(e,t,n,s,i){let a=t.href,o=t.title||null,c=e[1].replace(i.other.outputLinkReplace,"$1");s.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:o,text:c,tokens:s.inlineTokens(c)};return s.state.inLink=!1,l}function rv(e,t,n){let s=e.match(n.other.indentCodeCompensation);if(s===null)return t;let i=s[1];return t.split(`
`).map(a=>{let o=a.match(n.other.beginningSpace);if(o===null)return a;let[c]=o;return c.length>=i.length?a.slice(i.length):a}).join(`
`)}var es=class{options;rules;lexer;constructor(e){this.options=e||kt}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Qt(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],s=rv(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let s=Qt(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Qt(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Qt(t[0],`
`).split(`
`),s="",i="",a=[];for(;n.length>0;){let o=!1,c=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))c.push(n[l]),o=!0;else if(!o)c.push(n[l]);else break;n=n.slice(l);let u=c.join(`
`),g=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${u}`:u,i=i?`${i}
${g}`:g;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(g,a,!0),this.lexer.state.top=p,n.length===0)break;let h=a.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let m=h,v=m.raw+`
`+n.join(`
`),A=this.blockquote(v);a[a.length-1]=A,s=s.substring(0,s.length-m.raw.length)+A.raw,i=i.substring(0,i.length-m.text.length)+A.text;break}else if(h?.type==="list"){let m=h,v=m.raw+`
`+n.join(`
`),A=this.list(v);a[a.length-1]=A,s=s.substring(0,s.length-h.raw.length)+A.raw,i=i.substring(0,i.length-m.raw.length)+A.raw,n=v.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:a,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),s=n.length>1,i={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");let a=this.rules.other.listItemRegex(n),o=!1;for(;e;){let l=!1,u="",g="";if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,A=>" ".repeat(3*A.length)),h=e.split(`
`,1)[0],m=!p.trim(),v=0;if(this.options.pedantic?(v=2,g=p.trimStart()):m?v=t[1].length+1:(v=t[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,g=p.slice(v),v+=t[1].length),m&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let A=this.rules.other.nextBulletRegex(v),C=this.rules.other.hrRegex(v),S=this.rules.other.fencesBeginRegex(v),d=this.rules.other.headingBeginRegex(v),b=this.rules.other.htmlBeginRegex(v);for(;e;){let y=e.split(`
`,1)[0],_;if(h=y,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),_=h):_=h.replace(this.rules.other.tabCharGlobal,"    "),S.test(h)||d.test(h)||b.test(h)||A.test(h)||C.test(h))break;if(_.search(this.rules.other.nonSpaceChar)>=v||!h.trim())g+=`
`+_.slice(v);else{if(m||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||S.test(p)||d.test(p)||C.test(p))break;g+=`
`+h}!m&&!h.trim()&&(m=!0),u+=y+`
`,e=e.substring(y.length+1),p=_.slice(v)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(o=!0)),i.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(g),loose:!1,text:g,tokens:[]}),i.raw+=u}let c=i.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let l of i.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let g=this.lexer.inlineQueue.length-1;g>=0;g--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[g].src)){this.lexer.inlineQueue[g].src=this.lexer.inlineQueue[g].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let g={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=g.checked,i.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=g.raw+l.tokens[0].raw,l.tokens[0].text=g.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(g)):l.tokens.unshift({type:"paragraph",raw:g.raw,text:g.raw,tokens:[g]}):l.tokens.unshift(g)}}if(!i.loose){let u=l.tokens.filter(p=>p.type==="space"),g=u.length>0&&u.some(p=>this.rules.other.anyLine.test(p.raw));i.loose=g}}if(i.loose)for(let l of i.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return i}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:s,title:i}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Jo(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===s.length){for(let o of s)this.rules.other.tableAlignRight.test(o)?a.align.push("right"):this.rules.other.tableAlignCenter.test(o)?a.align.push("center"):this.rules.other.tableAlignLeft.test(o)?a.align.push("left"):a.align.push(null);for(let o=0;o<n.length;o++)a.header.push({text:n[o],tokens:this.lexer.inline(n[o]),header:!0,align:a.align[o]});for(let o of i)a.rows.push(Jo(o,a.header.length).map((c,l)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:a.align[l]})));return a}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let a=Qt(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{let a=ov(t[2],"()");if(a===-2)return;if(a>-1){let o=(t[0].indexOf("!")===0?5:4)+t[1].length+a;t[2]=t[2].substring(0,a),t[0]=t[0].substring(0,o).trim(),t[3]=""}}let s=t[2],i="";if(this.options.pedantic){let a=this.rules.other.pedanticHrefTitle.exec(s);a&&(s=a[1],i=a[3])}else i=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),Xo(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[s.toLowerCase()];if(!i){let a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return Xo(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!(!s||s[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(s[1]||s[2])||!n||this.rules.inline.punctuation.exec(n))){let i=[...s[0]].length-1,a,o,c=i,l=0,u=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+i);(s=u.exec(t))!=null;){if(a=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!a)continue;if(o=[...a].length,s[3]||s[4]){c+=o;continue}else if((s[5]||s[6])&&i%3&&!((i+o)%3)){l+=o;continue}if(c-=o,c>0)continue;o=Math.min(o,o+c+l);let g=[...s[0]][0].length,p=e.slice(0,i+s.index+g+o);if(Math.min(i,o)%2){let m=p.slice(1,-1);return{type:"em",raw:p,text:m,tokens:this.lexer.inlineTokens(m)}}let h=p.slice(2,-2);return{type:"strong",raw:p,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),s=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,s;if(t[2]==="@")n=t[0],s="mailto:"+n;else{let i;do i=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(i!==t[0]);n=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Ee=class Di{tokens;options;state;inlineQueue;tokenizer;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||kt,this.options.tokenizer=this.options.tokenizer||new es,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:me,block:Rn.normal,inline:Vt.normal};this.options.pedantic?(n.block=Rn.pedantic,n.inline=Vt.pedantic):this.options.gfm&&(n.block=Rn.gfm,this.options.breaks?n.inline=Vt.breaks:n.inline=Vt.gfm),this.tokenizer.rules=n}static get rules(){return{block:Rn,inline:Vt}}static lex(t,n){return new Di(n).lex(t)}static lexInline(t,n){return new Di(n).inlineTokens(t)}lex(t){t=t.replace(me.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let s=this.inlineQueue[n];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],s=!1){for(this.options.pedantic&&(t=t.replace(me.tabCharGlobal,"    ").replace(me.spaceLine,""));t;){let i;if(this.options.extensions?.block?.some(o=>(i=o.call({lexer:this},t,n))?(t=t.substring(i.raw.length),n.push(i),!0):!1))continue;if(i=this.tokenizer.space(t)){t=t.substring(i.raw.length);let o=n.at(-1);i.raw.length===1&&o!==void 0?o.raw+=`
`:n.push(i);continue}if(i=this.tokenizer.code(t)){t=t.substring(i.raw.length);let o=n.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+i.raw,o.text+=`
`+i.text,this.inlineQueue.at(-1).src=o.text):n.push(i);continue}if(i=this.tokenizer.fences(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.heading(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.hr(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.blockquote(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.list(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.html(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.def(t)){t=t.substring(i.raw.length);let o=n.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+i.raw,o.text+=`
`+i.raw,this.inlineQueue.at(-1).src=o.text):this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title},n.push(i));continue}if(i=this.tokenizer.table(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.lheading(t)){t=t.substring(i.raw.length),n.push(i);continue}let a=t;if(this.options.extensions?.startBlock){let o=1/0,c=t.slice(1),l;this.options.extensions.startBlock.forEach(u=>{l=u.call({lexer:this},c),typeof l=="number"&&l>=0&&(o=Math.min(o,l))}),o<1/0&&o>=0&&(a=t.substring(0,o+1))}if(this.state.top&&(i=this.tokenizer.paragraph(a))){let o=n.at(-1);s&&o?.type==="paragraph"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+i.raw,o.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):n.push(i),s=a.length!==t.length,t=t.substring(i.raw.length);continue}if(i=this.tokenizer.text(t)){t=t.substring(i.raw.length);let o=n.at(-1);o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+i.raw,o.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):n.push(i);continue}if(t){let o="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(o);break}else throw new Error(o)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let s=t,i=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(i=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)l.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(i=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,i.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let a;for(;(i=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)a=i[2]?i[2].length:0,s=s.slice(0,i.index+a)+"["+"a".repeat(i[0].length-a-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);s=this.options.hooks?.emStrongMask?.call({lexer:this},s)??s;let o=!1,c="";for(;t;){o||(c=""),o=!1;let l;if(this.options.extensions?.inline?.some(g=>(l=g.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let g=n.at(-1);l.type==="text"&&g?.type==="text"?(g.raw+=l.raw,g.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,s,c)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if(this.options.extensions?.startInline){let g=1/0,p=t.slice(1),h;this.options.extensions.startInline.forEach(m=>{h=m.call({lexer:this},p),typeof h=="number"&&h>=0&&(g=Math.min(g,h))}),g<1/0&&g>=0&&(u=t.substring(0,g+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(c=l.raw.slice(-1)),o=!0;let g=n.at(-1);g?.type==="text"?(g.raw+=l.raw,g.text+=l.text):n.push(l);continue}if(t){let g="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(g);break}else throw new Error(g)}}return n}},ts=class{options;parser;constructor(e){this.options=e||kt}space(e){return""}code({text:e,lang:t,escaped:n}){let s=(t||"").match(me.notSpaceStart)?.[0],i=e.replace(me.endingNewline,"")+`
`;return s?'<pre><code class="language-'+Ge(s)+'">'+(n?i:Ge(i,!0))+`</code></pre>
`:"<pre><code>"+(n?i:Ge(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,s="";for(let o=0;o<e.items.length;o++){let c=e.items[o];s+=this.listitem(c)}let i=t?"ol":"ul",a=t&&n!==1?' start="'+n+'"':"";return"<"+i+a+`>
`+s+"</"+i+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let i=0;i<e.header.length;i++)n+=this.tablecell(e.header[i]);t+=this.tablerow({text:n});let s="";for(let i=0;i<e.rows.length;i++){let a=e.rows[i];n="";for(let o=0;o<a.length;o++)n+=this.tablecell(a[o]);s+=this.tablerow({text:n})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+s+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ge(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let s=this.parser.parseInline(n),i=Zo(e);if(i===null)return s;e=i;let a='<a href="'+e+'"';return t&&(a+=' title="'+Ge(t)+'"'),a+=">"+s+"</a>",a}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));let i=Zo(e);if(i===null)return Ge(n);e=i;let a=`<img src="${e}" alt="${n}"`;return t&&(a+=` title="${Ge(t)}"`),a+=">",a}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ge(e.text)}},Ca=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Ie=class Ni{options;renderer;textRenderer;constructor(t){this.options=t||kt,this.options.renderer=this.options.renderer||new ts,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ca}static parse(t,n){return new Ni(n).parse(t)}static parseInline(t,n){return new Ni(n).parseInline(t)}parse(t){let n="";for(let s=0;s<t.length;s++){let i=t[s];if(this.options.extensions?.renderers?.[i.type]){let o=i,c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(o.type)){n+=c||"";continue}}let a=i;switch(a.type){case"space":{n+=this.renderer.space(a);break}case"hr":{n+=this.renderer.hr(a);break}case"heading":{n+=this.renderer.heading(a);break}case"code":{n+=this.renderer.code(a);break}case"table":{n+=this.renderer.table(a);break}case"blockquote":{n+=this.renderer.blockquote(a);break}case"list":{n+=this.renderer.list(a);break}case"checkbox":{n+=this.renderer.checkbox(a);break}case"html":{n+=this.renderer.html(a);break}case"def":{n+=this.renderer.def(a);break}case"paragraph":{n+=this.renderer.paragraph(a);break}case"text":{n+=this.renderer.text(a);break}default:{let o='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return n}parseInline(t,n=this.renderer){let s="";for(let i=0;i<t.length;i++){let a=t[i];if(this.options.extensions?.renderers?.[a.type]){let c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){s+=c||"";continue}}let o=a;switch(o.type){case"escape":{s+=n.text(o);break}case"html":{s+=n.html(o);break}case"link":{s+=n.link(o);break}case"image":{s+=n.image(o);break}case"checkbox":{s+=n.checkbox(o);break}case"strong":{s+=n.strong(o);break}case"em":{s+=n.em(o);break}case"codespan":{s+=n.codespan(o);break}case"br":{s+=n.br(o);break}case"del":{s+=n.del(o);break}case"text":{s+=n.text(o);break}default:{let c='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return s}},Zt=class{options;block;constructor(e){this.options=e||kt}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ee.lex:Ee.lexInline}provideParser(){return this.block?Ie.parse:Ie.parseInline}},lv=class{defaults=ba();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=Ie;Renderer=ts;TextRenderer=Ca;Lexer=Ee;Tokenizer=es;Hooks=Zt;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let s of e)switch(n=n.concat(t.call(this,s)),s.type){case"table":{let i=s;for(let a of i.header)n=n.concat(this.walkTokens(a.tokens,t));for(let a of i.rows)for(let o of a)n=n.concat(this.walkTokens(o.tokens,t));break}case"list":{let i=s;n=n.concat(this.walkTokens(i.items,t));break}default:{let i=s;this.defaults.extensions?.childTokens?.[i.type]?this.defaults.extensions.childTokens[i.type].forEach(a=>{let o=i[a].flat(1/0);n=n.concat(this.walkTokens(o,t))}):i.tokens&&(n=n.concat(this.walkTokens(i.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){let a=t.renderers[i.name];a?t.renderers[i.name]=function(...o){let c=i.renderer.apply(this,o);return c===!1&&(c=a.apply(this,o)),c}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let a=t[i.level];a?a.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),s.extensions=t),n.renderer){let i=this.defaults.renderer||new ts(this.defaults);for(let a in n.renderer){if(!(a in i))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;let o=a,c=n.renderer[o],l=i[o];i[o]=(...u)=>{let g=c.apply(i,u);return g===!1&&(g=l.apply(i,u)),g||""}}s.renderer=i}if(n.tokenizer){let i=this.defaults.tokenizer||new es(this.defaults);for(let a in n.tokenizer){if(!(a in i))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;let o=a,c=n.tokenizer[o],l=i[o];i[o]=(...u)=>{let g=c.apply(i,u);return g===!1&&(g=l.apply(i,u)),g}}s.tokenizer=i}if(n.hooks){let i=this.defaults.hooks||new Zt;for(let a in n.hooks){if(!(a in i))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;let o=a,c=n.hooks[o],l=i[o];Zt.passThroughHooks.has(a)?i[o]=u=>{if(this.defaults.async&&Zt.passThroughHooksRespectAsync.has(a))return(async()=>{let p=await c.call(i,u);return l.call(i,p)})();let g=c.call(i,u);return l.call(i,g)}:i[o]=(...u)=>{if(this.defaults.async)return(async()=>{let p=await c.apply(i,u);return p===!1&&(p=await l.apply(i,u)),p})();let g=c.apply(i,u);return g===!1&&(g=l.apply(i,u)),g}}s.hooks=i}if(n.walkTokens){let i=this.defaults.walkTokens,a=n.walkTokens;s.walkTokens=function(o){let c=[];return c.push(a.call(this,o)),i&&(c=c.concat(i.call(this,o))),c}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ee.lex(e,t??this.defaults)}parser(e,t){return Ie.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let s={...n},i={...this.defaults,...s},a=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&s.async===!1)return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return a(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(i.hooks&&(i.hooks.options=i,i.hooks.block=e),i.async)return(async()=>{let o=i.hooks?await i.hooks.preprocess(t):t,c=await(i.hooks?await i.hooks.provideLexer():e?Ee.lex:Ee.lexInline)(o,i),l=i.hooks?await i.hooks.processAllTokens(c):c;i.walkTokens&&await Promise.all(this.walkTokens(l,i.walkTokens));let u=await(i.hooks?await i.hooks.provideParser():e?Ie.parse:Ie.parseInline)(l,i);return i.hooks?await i.hooks.postprocess(u):u})().catch(a);try{i.hooks&&(t=i.hooks.preprocess(t));let o=(i.hooks?i.hooks.provideLexer():e?Ee.lex:Ee.lexInline)(t,i);i.hooks&&(o=i.hooks.processAllTokens(o)),i.walkTokens&&this.walkTokens(o,i.walkTokens);let c=(i.hooks?i.hooks.provideParser():e?Ie.parse:Ie.parseInline)(o,i);return i.hooks&&(c=i.hooks.postprocess(c)),c}catch(o){return a(o)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let s="<p>An error occurred:</p><pre>"+Ge(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}},$t=new lv;function Z(e,t){return $t.parse(e,t)}Z.options=Z.setOptions=function(e){return $t.setOptions(e),Z.defaults=$t.defaults,Ql(Z.defaults),Z};Z.getDefaults=ba;Z.defaults=kt;Z.use=function(...e){return $t.use(...e),Z.defaults=$t.defaults,Ql(Z.defaults),Z};Z.walkTokens=function(e,t){return $t.walkTokens(e,t)};Z.parseInline=$t.parseInline;Z.Parser=Ie;Z.parser=Ie.parse;Z.Renderer=ts;Z.TextRenderer=Ca;Z.Lexer=Ee;Z.lexer=Ee.lex;Z.Tokenizer=es;Z.Hooks=Zt;Z.parse=Z;Z.options;Z.setOptions;Z.use;Z.walkTokens;Z.parseInline;Ie.parse;Ee.lex;Z.setOptions({gfm:!0,breaks:!0});const er=["a","b","blockquote","br","code","del","em","h1","h2","h3","h4","hr","i","li","ol","p","pre","strong","table","tbody","td","th","thead","tr","ul"],tr=["class","href","rel","target","title","start"];let nr=!1;const cv=14e4,dv=4e4,uv=200,Xs=5e4,ft=new Map;function gv(e){const t=ft.get(e);return t===void 0?null:(ft.delete(e),ft.set(e,t),t)}function sr(e,t){if(ft.set(e,t),ft.size<=uv)return;const n=ft.keys().next().value;n&&ft.delete(n)}function pv(){nr||(nr=!0,Ri.addHook("afterSanitizeAttributes",e=>{!(e instanceof HTMLAnchorElement)||!e.getAttribute("href")||(e.setAttribute("rel","noreferrer noopener"),e.setAttribute("target","_blank"))}))}function Fi(e){const t=e.trim();if(!t)return"";if(pv(),t.length<=Xs){const o=gv(t);if(o!==null)return o}const n=Kr(t,cv),s=n.truncated?`

… truncated (${n.total} chars, showing first ${n.text.length}).`:"";if(n.text.length>dv){const c=`<pre class="code-block">${hv(`${n.text}${s}`)}</pre>`,l=Ri.sanitize(c,{ALLOWED_TAGS:er,ALLOWED_ATTR:tr});return t.length<=Xs&&sr(t,l),l}const i=Z.parse(`${n.text}${s}`),a=Ri.sanitize(i,{ALLOWED_TAGS:er,ALLOWED_ATTR:tr});return t.length<=Xs&&sr(t,a),a}function hv(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const fv=1500,vv=2e3,oc="Copy as markdown",mv="Copied",bv="Copy failed";async function yv(e){if(!e)return!1;try{return await navigator.clipboard.writeText(e),!0}catch{return!1}}function Pn(e,t){e.title=t,e.setAttribute("aria-label",t)}function xv(e){const t=e.label??oc;return r`
    <button
      class="chat-copy-btn"
      type="button"
      title=${t}
      aria-label=${t}
      @click=${async n=>{const s=n.currentTarget;if(!s||s.dataset.copying==="1")return;s.dataset.copying="1",s.setAttribute("aria-busy","true"),s.disabled=!0;const i=await yv(e.text());if(s.isConnected){if(delete s.dataset.copying,s.removeAttribute("aria-busy"),s.disabled=!1,!i){s.dataset.error="1",Pn(s,bv),window.setTimeout(()=>{s.isConnected&&(delete s.dataset.error,Pn(s,t))},vv);return}s.dataset.copied="1",Pn(s,mv),window.setTimeout(()=>{s.isConnected&&(delete s.dataset.copied,Pn(s,t))},fv)}}}
    >
      <span class="chat-copy-btn__icon" aria-hidden="true">
        <span class="chat-copy-btn__icon-copy">${X.copy}</span>
        <span class="chat-copy-btn__icon-check">${X.check}</span>
      </span>
    </button>
  `}function $v(e){return xv({text:()=>e,label:oc})}function rc(e){const t=e;let n=typeof t.role=="string"?t.role:"unknown";const s=typeof t.toolCallId=="string"||typeof t.tool_call_id=="string",i=t.content,a=Array.isArray(i)?i:null,o=Array.isArray(a)&&a.some(p=>{const h=p,m=(typeof h.type=="string"?h.type:"").toLowerCase();return m==="toolresult"||m==="tool_result"}),c=typeof t.toolName=="string"||typeof t.tool_name=="string";(s||o||c)&&(n="toolResult");let l=[];typeof t.content=="string"?l=[{type:"text",text:t.content}]:Array.isArray(t.content)?l=t.content.map(p=>({type:p.type||"text",text:p.text,name:p.name,args:p.args||p.arguments})):typeof t.text=="string"&&(l=[{type:"text",text:t.text}]);const u=typeof t.timestamp=="number"?t.timestamp:Date.now(),g=typeof t.id=="string"?t.id:void 0;return{role:n,content:l,timestamp:u,id:g}}function _a(e){const t=e.toLowerCase();return e==="user"||e==="User"?e:e==="assistant"?"assistant":e==="system"?"system":t==="toolresult"||t==="tool_result"||t==="tool"||t==="function"?"tool":e}function lc(e){const t=e,n=typeof t.role=="string"?t.role.toLowerCase():"";return n==="toolresult"||n==="tool_result"}const wv={icon:"puzzle",detailKeys:["command","path","url","targetUrl","targetId","ref","element","node","nodeId","id","requestId","to","channelId","guildId","userId","name","query","pattern","messageId"]},kv={bash:{icon:"wrench",title:"Bash",detailKeys:["command"]},process:{icon:"wrench",title:"Process",detailKeys:["sessionId"]},read:{icon:"fileText",title:"Read",detailKeys:["path"]},write:{icon:"edit",title:"Write",detailKeys:["path"]},edit:{icon:"penLine",title:"Edit",detailKeys:["path"]},attach:{icon:"paperclip",title:"Attach",detailKeys:["path","url","fileName"]},browser:{icon:"globe",title:"Browser",actions:{status:{label:"status"},start:{label:"start"},stop:{label:"stop"},tabs:{label:"tabs"},open:{label:"open",detailKeys:["targetUrl"]},focus:{label:"focus",detailKeys:["targetId"]},close:{label:"close",detailKeys:["targetId"]},snapshot:{label:"snapshot",detailKeys:["targetUrl","targetId","ref","element","format"]},screenshot:{label:"screenshot",detailKeys:["targetUrl","targetId","ref","element"]},navigate:{label:"navigate",detailKeys:["targetUrl","targetId"]},console:{label:"console",detailKeys:["level","targetId"]},pdf:{label:"pdf",detailKeys:["targetId"]},upload:{label:"upload",detailKeys:["paths","ref","inputRef","element","targetId"]},dialog:{label:"dialog",detailKeys:["accept","promptText","targetId"]},act:{label:"act",detailKeys:["request.kind","request.ref","request.selector","request.text","request.value"]}}},canvas:{icon:"image",title:"Canvas",actions:{present:{label:"present",detailKeys:["target","node","nodeId"]},hide:{label:"hide",detailKeys:["node","nodeId"]},navigate:{label:"navigate",detailKeys:["url","node","nodeId"]},eval:{label:"eval",detailKeys:["javaScript","node","nodeId"]},snapshot:{label:"snapshot",detailKeys:["format","node","nodeId"]},a2ui_push:{label:"A2UI push",detailKeys:["jsonlPath","node","nodeId"]},a2ui_reset:{label:"A2UI reset",detailKeys:["node","nodeId"]}}},nodes:{icon:"smartphone",title:"Nodes",actions:{status:{label:"status"},describe:{label:"describe",detailKeys:["node","nodeId"]},pending:{label:"pending"},approve:{label:"approve",detailKeys:["requestId"]},reject:{label:"reject",detailKeys:["requestId"]},notify:{label:"notify",detailKeys:["node","nodeId","title","body"]},camera_snap:{label:"camera snap",detailKeys:["node","nodeId","facing","deviceId"]},camera_list:{label:"camera list",detailKeys:["node","nodeId"]},camera_clip:{label:"camera clip",detailKeys:["node","nodeId","facing","duration","durationMs"]},screen_record:{label:"screen record",detailKeys:["node","nodeId","duration","durationMs","fps","screenIndex"]}}},cron:{icon:"loader",title:"Cron",actions:{status:{label:"status"},list:{label:"list"},add:{label:"add",detailKeys:["job.name","job.id","job.schedule","job.cron"]},update:{label:"update",detailKeys:["id"]},remove:{label:"remove",detailKeys:["id"]},run:{label:"run",detailKeys:["id"]},runs:{label:"runs",detailKeys:["id"]},wake:{label:"wake",detailKeys:["text","mode"]}}},gateway:{icon:"plug",title:"Gateway",actions:{restart:{label:"restart",detailKeys:["reason","delayMs"]},"config.get":{label:"config get"},"config.schema":{label:"config schema"},"config.apply":{label:"config apply",detailKeys:["restartDelayMs"]},"update.run":{label:"update run",detailKeys:["restartDelayMs"]}}},whatsapp_login:{icon:"circle",title:"WhatsApp Login",actions:{start:{label:"start"},wait:{label:"wait"}}},discord:{icon:"messageSquare",title:"Discord",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sticker:{label:"sticker",detailKeys:["to","stickerIds"]},poll:{label:"poll",detailKeys:["question","to"]},permissions:{label:"permissions",detailKeys:["channelId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},threadCreate:{label:"thread create",detailKeys:["channelId","name"]},threadList:{label:"thread list",detailKeys:["guildId","channelId"]},threadReply:{label:"thread reply",detailKeys:["channelId","content"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},searchMessages:{label:"search",detailKeys:["guildId","content"]},memberInfo:{label:"member",detailKeys:["guildId","userId"]},roleInfo:{label:"roles",detailKeys:["guildId"]},emojiList:{label:"emoji list",detailKeys:["guildId"]},roleAdd:{label:"role add",detailKeys:["guildId","userId","roleId"]},roleRemove:{label:"role remove",detailKeys:["guildId","userId","roleId"]},channelInfo:{label:"channel",detailKeys:["channelId"]},channelList:{label:"channels",detailKeys:["guildId"]},voiceStatus:{label:"voice",detailKeys:["guildId","userId"]},eventList:{label:"events",detailKeys:["guildId"]},eventCreate:{label:"event create",detailKeys:["guildId","name"]},timeout:{label:"timeout",detailKeys:["guildId","userId"]},kick:{label:"kick",detailKeys:["guildId","userId"]},ban:{label:"ban",detailKeys:["guildId","userId"]}}},slack:{icon:"messageSquare",title:"Slack",actions:{react:{label:"react",detailKeys:["channelId","messageId","emoji"]},reactions:{label:"reactions",detailKeys:["channelId","messageId"]},sendMessage:{label:"send",detailKeys:["to","content"]},editMessage:{label:"edit",detailKeys:["channelId","messageId"]},deleteMessage:{label:"delete",detailKeys:["channelId","messageId"]},readMessages:{label:"read messages",detailKeys:["channelId","limit"]},pinMessage:{label:"pin",detailKeys:["channelId","messageId"]},unpinMessage:{label:"unpin",detailKeys:["channelId","messageId"]},listPins:{label:"list pins",detailKeys:["channelId"]},memberInfo:{label:"member",detailKeys:["userId"]},emojiList:{label:"emoji list"}}}},Sv={fallback:wv,tools:kv},cc=Sv,ir=cc.fallback??{icon:"puzzle"},Av=cc.tools??{};function Cv(e){return(e??"tool").trim()}function _v(e){const t=e.replace(/_/g," ").trim();return t?t.split(/\s+/).map(n=>n.length<=2&&n.toUpperCase()===n?n:`${n.at(0)?.toUpperCase()??""}${n.slice(1)}`).join(" "):"Tool"}function Tv(e){const t=e?.trim();if(t)return t.replace(/_/g," ")}function dc(e){if(e!=null){if(typeof e=="string"){const t=e.trim();if(!t)return;const n=t.split(/\r?\n/)[0]?.trim()??"";return n?n.length>160?`${n.slice(0,157)}…`:n:void 0}if(typeof e=="number"||typeof e=="boolean")return String(e);if(Array.isArray(e)){const t=e.map(s=>dc(s)).filter(s=>!!s);if(t.length===0)return;const n=t.slice(0,3).join(", ");return t.length>3?`${n}…`:n}}}function Lv(e,t){if(!e||typeof e!="object")return;let n=e;for(const s of t.split(".")){if(!s||!n||typeof n!="object")return;n=n[s]}return n}function Ev(e,t){for(const n of t){const s=Lv(e,n),i=dc(s);if(i)return i}}function Iv(e){if(!e||typeof e!="object")return;const t=e,n=typeof t.path=="string"?t.path:void 0;if(!n)return;const s=typeof t.offset=="number"?t.offset:void 0,i=typeof t.limit=="number"?t.limit:void 0;return s!==void 0&&i!==void 0?`${n}:${s}-${s+i}`:n}function Mv(e){if(!e||typeof e!="object")return;const t=e;return typeof t.path=="string"?t.path:void 0}function Rv(e,t){if(!(!e||!t))return e.actions?.[t]??void 0}function Pv(e){const t=Cv(e.name),n=t.toLowerCase(),s=Av[n],i=s?.icon??ir.icon??"puzzle",a=s?.title??_v(t),o=s?.label??t,c=e.args&&typeof e.args=="object"?e.args.action:void 0,l=typeof c=="string"?c.trim():void 0,u=Rv(s,l),g=Tv(u?.label??l);let p;n==="read"&&(p=Iv(e.args)),!p&&(n==="write"||n==="edit"||n==="attach")&&(p=Mv(e.args));const h=u?.detailKeys??s?.detailKeys??ir.detailKeys??[];return!p&&h.length>0&&(p=Ev(e.args,h)),!p&&e.meta&&(p=e.meta),p&&(p=Nv(p)),{name:t,icon:i,title:a,label:o,verb:g,detail:p}}function Dv(e){const t=[];if(e.verb&&t.push(e.verb),e.detail&&t.push(e.detail),t.length!==0)return t.join(" · ")}function Nv(e){return e&&e.replace(/\/Users\/[^/]+/g,"~").replace(/\/home\/[^/]+/g,"~")}const Fv=80,Ov=2,ar=100;function Bv(e){const t=e.trim();if(t.startsWith("{")||t.startsWith("["))try{const n=JSON.parse(t);return"```json\n"+JSON.stringify(n,null,2)+"\n```"}catch{}return e}function zv(e){const t=e.split(`
`),n=t.slice(0,Ov),s=n.join(`
`);return s.length>ar?s.slice(0,ar)+"…":n.length<t.length?s+"…":s}function Uv(e){const t=e,n=Hv(t.content),s=[];for(const i of n){const a=(typeof i.type=="string"?i.type:"").toLowerCase();(["toolcall","tool_call","tooluse","tool_use"].includes(a)||typeof i.name=="string"&&i.arguments!=null)&&s.push({kind:"call",name:i.name??"tool",args:Kv(i.arguments??i.args)})}for(const i of n){const a=(typeof i.type=="string"?i.type:"").toLowerCase();if(a!=="toolresult"&&a!=="tool_result")continue;const o=jv(i),c=typeof i.name=="string"?i.name:"tool";s.push({kind:"result",name:c,text:o})}if(lc(e)&&!s.some(i=>i.kind==="result")){const i=typeof t.toolName=="string"&&t.toolName||typeof t.tool_name=="string"&&t.tool_name||"tool",a=wl(e)??void 0;s.push({kind:"result",name:i,text:a})}return s}function or(e,t){const n=Pv({name:e.name,args:e.args}),s=Dv(n),i=!!e.text?.trim(),a=!!t,o=a?()=>{if(i){t(Bv(e.text));return}const p=`## ${n.label}

${s?`**Command:** \`${s}\`

`:""}*No output — tool completed successfully.*`;t(p)}:void 0,c=i&&(e.text?.length??0)<=Fv,l=i&&!c,u=i&&c,g=!i;return r`
    <div
      class="chat-tool-card ${a?"chat-tool-card--clickable":""}"
      @click=${o}
      role=${a?"button":f}
      tabindex=${a?"0":f}
      @keydown=${a?p=>{p.key!=="Enter"&&p.key!==" "||(p.preventDefault(),o?.())}:f}
    >
      <div class="chat-tool-card__header">
        <div class="chat-tool-card__title">
          <span class="chat-tool-card__icon">${X[n.icon]}</span>
          <span>${n.label}</span>
        </div>
        ${a?r`<span class="chat-tool-card__action">${i?"View":""} ${X.check}</span>`:f}
        ${g&&!a?r`<span class="chat-tool-card__status">${X.check}</span>`:f}
      </div>
      ${s?r`<div class="chat-tool-card__detail">${s}</div>`:f}
      ${g?r`
              <div class="chat-tool-card__status-text muted">Completed</div>
            `:f}
      ${l?r`<div class="chat-tool-card__preview mono">${zv(e.text)}</div>`:f}
      ${u?r`<div class="chat-tool-card__inline mono">${e.text}</div>`:f}
    </div>
  `}function Hv(e){return Array.isArray(e)?e.filter(Boolean):[]}function Kv(e){if(typeof e!="string")return e;const t=e.trim();if(!t||!t.startsWith("{")&&!t.startsWith("["))return e;try{return JSON.parse(t)}catch{return e}}function jv(e){if(typeof e.text=="string")return e.text;if(typeof e.content=="string")return e.content}function Wv(e){const n=e.content,s=[];if(Array.isArray(n))for(const i of n){if(typeof i!="object"||i===null)continue;const a=i;if(a.type==="image"){const o=a.source;if(o?.type==="base64"&&typeof o.data=="string"){const c=o.data,l=o.media_type||"image/png",u=c.startsWith("data:")?c:`data:${l};base64,${c}`;s.push({url:u})}else typeof a.url=="string"&&s.push({url:a.url})}else if(a.type==="image_url"){const o=a.image_url;typeof o?.url=="string"&&s.push({url:o.url})}}return s}function Gv(e){return r`
    <div class="chat-group assistant">
      ${Ta("assistant",e)}
      <div class="chat-group-messages">
        <div class="chat-bubble chat-reading-indicator" aria-hidden="true">
          <span class="chat-reading-indicator__dots">
            <span></span><span></span><span></span>
          </span>
        </div>
      </div>
    </div>
  `}function qv(e,t,n,s){const i=new Date(t).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}),a=s?.name??"Assistant";return r`
    <div class="chat-group assistant">
      ${Ta("assistant",s)}
      <div class="chat-group-messages">
        ${uc({role:"assistant",content:[{type:"text",text:e}],timestamp:t},{isStreaming:!0,showReasoning:!1},n)}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${a}</span>
          <span class="chat-group-timestamp">${i}</span>
        </div>
      </div>
    </div>
  `}function Vv(e,t){const n=_a(e.role),s=t.assistantName??"Assistant",i=n==="user"?"You":n==="assistant"?s:n,a=n==="user"?"user":n==="assistant"?"assistant":"other",o=new Date(e.timestamp).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"});return r`
    <div class="chat-group ${a}">
      ${Ta(e.role,{name:s,avatar:t.assistantAvatar??null})}
      <div class="chat-group-messages">
        ${e.messages.map((c,l)=>uc(c.message,{isStreaming:e.isStreaming&&l===e.messages.length-1,showReasoning:t.showReasoning},t.onOpenSidebar))}
        <div class="chat-group-footer">
          <span class="chat-sender-name">${i}</span>
          <span class="chat-group-timestamp">${o}</span>
        </div>
      </div>
    </div>
  `}function Ta(e,t){const n=_a(e),s=t?.name?.trim()||"Assistant",i=t?.avatar?.trim()||"",a=n==="user"?"U":n==="assistant"?s.charAt(0).toUpperCase()||"A":n==="tool"?"⚙":"?",o=n==="user"?"user":n==="assistant"?"assistant":n==="tool"?"tool":"other";return i&&n==="assistant"?Qv(i)?r`<img
        class="chat-avatar ${o}"
        src="${i}"
        alt="${s}"
      />`:r`<div class="chat-avatar ${o}">${i}</div>`:r`<div class="chat-avatar ${o}">${a}</div>`}function Qv(e){return/^https?:\/\//i.test(e)||/^data:image\//i.test(e)||e.startsWith("/")}function Yv(e){return e.length===0?f:r`
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
  `}function uc(e,t,n){const s=e,i=typeof s.role=="string"?s.role:"unknown",a=lc(e)||i.toLowerCase()==="toolresult"||i.toLowerCase()==="tool_result"||typeof s.toolCallId=="string"||typeof s.tool_call_id=="string",o=Uv(e),c=o.length>0,l=Wv(e),u=l.length>0,g=wl(e),p=t.showReasoning&&i==="assistant"?wg(e):null,h=g?.trim()?g:null,m=p?Sg(p):null,v=h,A=i==="assistant"&&!!v?.trim(),C=["chat-bubble",A?"has-copy":"",t.isStreaming?"streaming":"","fade-in"].filter(Boolean).join(" ");return!v&&c&&a?r`${o.map(S=>or(S,n))}`:!v&&!c&&!u?f:r`
    <div class="${C}">
      ${A?$v(v):f}
      ${Yv(l)}
      ${m?r`<div class="chat-thinking">${Li(Fi(m))}</div>`:f}
      ${v?r`<div class="chat-text">${Li(Fi(v))}</div>`:f}
      ${o.map(S=>or(S,n))}
    </div>
  `}function Zv(e){const t=(n,s)=>z(e.locale,n,s);return r`
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
            `:e.content?r`<div class="sidebar-markdown">${Li(Fi(e.content))}</div>`:r`
                  <div class="muted">${t("No content available","暂无内容")}</div>
                `}
      </div>
    </div>
  `}var Jv=Object.defineProperty,Xv=Object.getOwnPropertyDescriptor,$s=(e,t,n,s)=>{for(var i=s>1?void 0:s?Xv(t,n):t,a=e.length-1,o;a>=0;a--)(o=e[a])&&(i=(s?o(t,n,i):o(i))||i);return s&&i&&Jv(t,n,i),i};let Ft=class extends Mt{constructor(){super(...arguments),this.splitRatio=.6,this.minRatio=.4,this.maxRatio=.7,this.isDragging=!1,this.startX=0,this.startRatio=0,this.handleMouseDown=e=>{this.isDragging=!0,this.startX=e.clientX,this.startRatio=this.splitRatio,this.classList.add("dragging"),document.addEventListener("mousemove",this.handleMouseMove),document.addEventListener("mouseup",this.handleMouseUp),e.preventDefault()},this.handleMouseMove=e=>{if(!this.isDragging)return;const t=this.parentElement;if(!t)return;const n=t.getBoundingClientRect().width,i=(e.clientX-this.startX)/n;let a=this.startRatio+i;a=Math.max(this.minRatio,Math.min(this.maxRatio,a)),this.dispatchEvent(new CustomEvent("resize",{detail:{splitRatio:a},bubbles:!0,composed:!0}))},this.handleMouseUp=()=>{this.isDragging=!1,this.classList.remove("dragging"),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}}render(){return f}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),document.removeEventListener("mousemove",this.handleMouseMove),document.removeEventListener("mouseup",this.handleMouseUp)}};Ft.styles=Sc`
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
  `;$s([rs({type:Number})],Ft.prototype,"splitRatio",2);$s([rs({type:Number})],Ft.prototype,"minRatio",2);$s([rs({type:Number})],Ft.prototype,"maxRatio",2);Ft=$s([Pr("resizable-divider")],Ft);const em=5e3;function rr(e){e.style.height="auto",e.style.height=`${e.scrollHeight}px`}function tm(e,t){if(!e)return f;const n=(s,i)=>z(t,s,i);return e.active?r`
      <div class="compaction-indicator compaction-indicator--active" role="status" aria-live="polite">
        ${X.loader} ${n("Compacting context...","正在压缩上下文...")}
      </div>
    `:e.completedAt&&Date.now()-e.completedAt<em?r`
        <div class="compaction-indicator compaction-indicator--complete" role="status" aria-live="polite">
          ${X.check} ${n("Context compacted","上下文已压缩")}
        </div>
      `:f}function nm(){return`att-${Date.now()}-${Math.random().toString(36).slice(2,9)}`}function sm(e,t){const n=e.clipboardData?.items;if(!n||!t.onAttachmentsChange)return;const s=[];for(let i=0;i<n.length;i++){const a=n[i];a.type.startsWith("image/")&&s.push(a)}if(s.length!==0){e.preventDefault();for(const i of s){const a=i.getAsFile();if(!a)continue;const o=new FileReader;o.addEventListener("load",()=>{const c=o.result,l={id:nm(),dataUrl:c,mimeType:a.type},u=t.attachments??[];t.onAttachmentsChange?.([...u,l])}),o.readAsDataURL(a)}}}function im(e){const t=e.attachments??[];return t.length===0?f:r`
    <div class="chat-attachments">
      ${t.map(n=>r`
          <div class="chat-attachment">
            <img
              src=${n.dataUrl}
              alt=${z(e.locale,"Attachment preview","附件预览")}
              class="chat-attachment__img"
            />
            <button
              class="chat-attachment__remove"
              type="button"
              aria-label=${z(e.locale,"Remove attachment","移除附件")}
              @click=${()=>{const s=(e.attachments??[]).filter(i=>i.id!==n.id);e.onAttachmentsChange?.(s)}}
            >
              ${X.x}
            </button>
          </div>
        `)}
    </div>
  `}function am(e){const t=(C,S)=>z(e.locale,C,S),n=e.connected,s=e.sending||e.stream!==null,i=!!(e.canAbort&&e.onAbort),o=e.sessions?.sessions?.find(C=>C.key===e.sessionKey)?.reasoningLevel??"off",c=e.showThinking&&o!=="off",l={name:e.assistantName,avatar:e.assistantAvatar??e.assistantAvatarUrl??null},u=(e.attachments?.length??0)>0,g=e.connected?u?t("Add a message or paste more images...","添加消息或继续粘贴图片..."):t("Message (Enter to send, Shift+Enter for line breaks, paste images)","消息（Enter 发送，Shift+Enter 换行，可粘贴图片）"):t("Connect to the gateway to start chatting...","连接网关后即可开始聊天..."),p=e.splitRatio??.6,h=!!(e.sidebarOpen&&e.onCloseSidebar),m=rm(e),v=!e.loading&&m.length===0,A=r`
    <div
      class="chat-thread"
      role="log"
      aria-live="polite"
      @scroll=${e.onChatScroll}
    >
      ${e.loading?r`
              <div class="empty-state" style="padding: 48px 0">
                <div class="empty-state-title">${t("Loading chat...","正在加载聊天...")}</div>
              </div>
            `:f}
      ${v?r`
              <div class="chat-welcome">
                <div class="chat-welcome__icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div class="chat-welcome__title">${t("Start a conversation","开始对话")}</div>
                <div class="chat-welcome__sub">
                  ${t("Type anything below to start — or pick a suggestion.","在下方输入任意内容开始，或点选一个建议。")}
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
      ${Ml(m,C=>C.key,C=>C.kind==="divider"?r`
              <div class="chat-divider" role="separator" data-ts=${String(C.timestamp)}>
                <span class="chat-divider__line"></span>
                <span class="chat-divider__label">${C.label}</span>
                <span class="chat-divider__line"></span>
              </div>
            `:C.kind==="reading-indicator"?Gv(l):C.kind==="stream"?qv(C.text,C.startedAt,e.onOpenSidebar,l):C.kind==="group"?Vv(C,{onOpenSidebar:e.onOpenSidebar,showReasoning:c,assistantName:e.assistantName,assistantAvatar:l.avatar}):f)}
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
          ${A}
        </div>

        ${h?r`
              <resizable-divider
                .splitRatio=${p}
                @resize=${C=>e.onSplitRatioChange?.(C.detail.splitRatio)}
              ></resizable-divider>
              <div class="chat-sidebar">
                ${Zv({locale:e.locale,content:e.sidebarContent??null,error:e.sidebarError??null,onClose:e.onCloseSidebar,onViewRawText:()=>{!e.sidebarContent||!e.onOpenSidebar||e.onOpenSidebar(`\`\`\`
${e.sidebarContent}
\`\`\``)}})}
              </div>
            `:f}
      </div>

      ${e.queue.length?r`
            <div class="chat-queue" role="status" aria-live="polite">
              <div class="chat-queue__title">${t("Queued","队列中")} (${e.queue.length})</div>
              <div class="chat-queue__list">
                ${e.queue.map(C=>r`
                    <div class="chat-queue__item">
                      <div class="chat-queue__text">
                        ${C.text||(C.attachments?.length?`${t("Image","图片")} (${C.attachments.length})`:"")}
                      </div>
                      <button
                        class="btn chat-queue__remove"
                        type="button"
                        aria-label=${t("Remove queued message","移除排队消息")}
                        @click=${()=>e.onQueueRemove(C.id)}
                      >
                        ${X.x}
                      </button>
                    </div>
                  `)}
              </div>
            </div>
          `:f}

      ${tm(e.compactionStatus,e.locale)}

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
        ${im(e)}
        <div class="chat-compose__row">
          <label class="field chat-compose__field">
            <span>${t("Message","消息")}</span>
            <textarea
              ${sf(C=>C&&rr(C))}
              .value=${e.draft}
              ?disabled=${!e.connected}
              @keydown=${C=>{C.key==="Enter"&&(C.isComposing||C.keyCode===229||C.shiftKey||e.connected&&(C.preventDefault(),n&&e.onSend()))}}
              @input=${C=>{const S=C.target;rr(S),e.onDraftChange(S.value)}}
              @paste=${C=>sm(C,e)}
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
  `}const ei=200;function om(e){const t=[];let n=null;for(const s of e){if(s.kind!=="message"){n&&(t.push(n),n=null),t.push(s);continue}const i=rc(s.message),a=_a(i.role),o=i.timestamp||Date.now();!n||n.role!==a?(n&&t.push(n),n={kind:"group",key:`group:${a}:${s.key}`,role:a,messages:[{message:s.message,key:s.key}],timestamp:o,isStreaming:!1}):n.messages.push({message:s.message,key:s.key})}return n&&t.push(n),t}function rm(e){const t=(o,c)=>z(e.locale,o,c),n=[],s=Array.isArray(e.messages)?e.messages:[],i=Array.isArray(e.toolMessages)?e.toolMessages:[],a=Math.max(0,s.length-ei);a>0&&n.push({kind:"message",key:"chat:history:notice",message:{role:"system",content:t(`Showing last ${ei} messages (${a} hidden).`,`仅显示最近 ${ei} 条消息（已隐藏 ${a} 条）。`),timestamp:Date.now()}});for(let o=a;o<s.length;o++){const c=s[o],l=rc(c),g=c.__opensoul;if(g&&g.kind==="compaction"){n.push({kind:"divider",key:typeof g.id=="string"?`divider:compaction:${g.id}`:`divider:compaction:${l.timestamp}:${o}`,label:t("Compaction","压缩"),timestamp:l.timestamp??Date.now()});continue}!e.showThinking&&l.role.toLowerCase()==="toolresult"||n.push({kind:"message",key:lr(c,o),message:c})}if(e.showThinking)for(let o=0;o<i.length;o++)n.push({kind:"message",key:lr(i[o],o+s.length),message:i[o]});if(e.stream!==null){const o=`stream:${e.sessionKey}:${e.streamStartedAt??"live"}`;e.stream.trim().length>0?n.push({kind:"stream",key:o,text:e.stream,startedAt:e.streamStartedAt??Date.now()}):n.push({kind:"reading-indicator",key:o})}return om(n)}function lr(e,t){const n=e,s=typeof n.toolCallId=="string"?n.toolCallId:"";if(s)return`tool:${s}`;const i=typeof n.id=="string"?n.id:"";if(i)return`msg:${i}`;const a=typeof n.messageId=="string"?n.messageId:"";if(a)return`msg:${a}`;const o=typeof n.timestamp=="number"?n.timestamp:null,c=typeof n.role=="string"?n.role:"unknown";return o!=null?`msg:${c}:${o}:${t}`:`msg:${c}:${t}`}const Oi={all:r`
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
  `},ti=[{key:"env",label:"Environment",category:"essential"},{key:"agents",label:"Agents",category:"essential"},{key:"channels",label:"Channels",category:"essential"},{key:"messages",label:"Messages",category:"essential"},{key:"auth",label:"Authentication",category:"advanced"},{key:"skills",label:"Skills",category:"advanced"},{key:"tools",label:"Tools",category:"advanced"},{key:"update",label:"Updates",category:"advanced"},{key:"commands",label:"Commands",category:"developer"},{key:"hooks",label:"Hooks",category:"developer"},{key:"gateway",label:"Gateway",category:"developer"},{key:"wizard",label:"Setup Wizard",category:"developer"}],lm={essential:{en:"Essential",zh:"基础"},advanced:{en:"Advanced",zh:"进阶"},developer:{en:"Developer",zh:"开发者"}},cr="__all__";function dr(e){return Oi[e]??Oi.default}function cm(e,t,n){const s=ma[t];if(s)return{label:Zn(e,t,s.label),description:_i(e,t,s.description)};const i=n?.title??Qe(t),a=n?.description??"";return{label:Zn(e,t,i),description:_i(e,t,a)}}function dm(e){const{locale:t,key:n,schema:s,uiHints:i}=e;if(!s||Oe(s)!=="object"||!s.properties)return[];const a=Object.entries(s.properties).map(([o,c])=>{const l=_e([n,o],i),u=l?.label??c.title??Qe(o),g=ue(t,u),p=l?.help??c.description??"",h=p&&ue(t,p),m=l?.order??50;return{key:o,label:g,description:h,order:m}});return a.sort((o,c)=>o.order!==c.order?o.order-c.order:o.key.localeCompare(c.key)),a}function um(e,t){if(!e||!t)return[];const n=[];function s(i,a,o){if(i===a)return;if(typeof i!=typeof a){n.push({path:o,from:i,to:a});return}if(typeof i!="object"||i===null||a===null){i!==a&&n.push({path:o,from:i,to:a});return}if(Array.isArray(i)&&Array.isArray(a)){JSON.stringify(i)!==JSON.stringify(a)&&n.push({path:o,from:i,to:a});return}const c=i,l=a,u=new Set([...Object.keys(c),...Object.keys(l)]);for(const g of u)s(c[g],l[g],o?`${o}.${g}`:g)}return s(e,t,""),n}function ur(e,t=40){let n;try{n=JSON.stringify(e)??String(e)}catch{n=String(e)}return n.length<=t?n:n.slice(0,t-3)+"..."}function gm(e){const t=(T,P)=>Me(e.locale,T,P),n=e.valid==null?"unknown":e.valid?"valid":"invalid",s=n==="valid"?t("valid","有效"):n==="invalid"?t("invalid","无效"):t("unknown","未知"),i=Ul(e.schema),a=i.schema?i.unsupportedPaths.length>0:!1,o=i.schema?.properties??{},c=ti.filter(T=>T.key in o),l=new Set(ti.map(T=>T.key)),u=Object.keys(o).filter(T=>!l.has(T)).map(T=>({key:T,label:T.charAt(0).toUpperCase()+T.slice(1)})),g=[...c,...u],p=e.activeSection&&i.schema&&Oe(i.schema)==="object"?i.schema.properties?.[e.activeSection]:void 0,h=e.activeSection?cm(e.locale,e.activeSection,p):null,m=e.activeSection?dm({locale:e.locale,key:e.activeSection,schema:p,uiHints:e.uiHints}):[],v=e.formMode==="form"&&!!e.activeSection&&m.length>0,A=e.activeSubsection===cr,C=e.searchQuery||A?null:e.activeSubsection??m[0]?.key??null,S=e.formMode==="form"?um(e.originalValue,e.formValue):[],d=e.formMode==="raw"&&e.raw!==e.originalRaw,b=e.formMode==="form"?S.length>0:d,y=!!e.formValue&&!e.loading&&!!i.schema,_=e.connected&&!e.saving&&b&&(e.formMode==="raw"?!0:y),L=e.connected&&!e.applying&&!e.updating&&b&&(e.formMode==="raw"?!0:y),E=e.connected&&!e.applying&&!e.updating;return r`
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
            @input=${T=>e.onSearchChange(T.target.value)}
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

        <!-- Section nav with categories -->
        <nav class="config-nav">
          <button
            class="config-nav__item ${e.activeSection===null?"active":""}"
            @click=${()=>e.onSectionChange(null)}
          >
            <span class="config-nav__icon">${Oi.all}</span>
            <span class="config-nav__label">${t("All Settings","全部设置")}</span>
          </button>
          ${["essential","advanced","developer"].map(T=>{const P=lm[T],G=g.filter(R=>{const H=ti.find(q=>q.key===R.key);return H?H.category===T:T==="developer"});return G.length===0?f:r`
              <div class="config-nav__group">
                <div class="config-nav__group-label">${Me(e.locale,P.en,P.zh)}</div>
                ${G.map(R=>r`
                    <button
                      class="config-nav__item ${e.activeSection===R.key?"active":""}"
                      @click=${()=>e.onSectionChange(R.key)}
                    >
                      <span class="config-nav__icon">${dr(R.key)}</span>
                      <span class="config-nav__label">${Zn(e.locale,R.key,R.label)}</span>
                    </button>
                  `)}
              </div>
            `})}
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
            ${b?r`
                  <span class="config-changes-badge"
                    >${e.formMode==="raw"?t("Unsaved changes","未保存更改"):t(`${S.length} unsaved change${S.length!==1?"s":""}`,`${S.length} 条未保存更改`)}</span
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
              ?disabled=${!_}
              @click=${e.onSave}
            >
              ${e.saving?t("Saving...","保存中..."):t("Save","保存")}
            </button>
            <button
              class="btn btn--sm"
              ?disabled=${!L}
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
        ${b&&e.formMode==="form"?r`
              <details class="config-diff">
                <summary class="config-diff__summary">
                  <span>${t(`View ${S.length} pending change${S.length!==1?"s":""}`,`查看 ${S.length} 条待提交更改`)}</span>
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
                  ${S.map(T=>r`
                      <div class="config-diff__item">
                        <div class="config-diff__path">${T.path}</div>
                        <div class="config-diff__values">
                          <span class="config-diff__from"
                            >${ur(T.from)}</span
                          >
                          <span class="config-diff__arrow">-></span>
                          <span class="config-diff__to"
                            >${ur(T.to)}</span
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
                  ${dr(e.activeSection??"")}
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
        ${v?r`
              <div class="config-subnav-v2">
                <button
                  class="config-subnav-v2__pill ${C===null?"active":""}"
                  @click=${()=>e.onSubsectionChange(cr)}
                >
                  ${t("All","全部")}
                </button>
                ${m.map(T=>r`
                    <button
                      class="config-subnav-v2__pill ${C===T.key?"active":""}"
                      @click=${()=>e.onSubsectionChange(T.key)}
                    >
                      ${T.label}
                      ${T.description?r`<span class="config-subnav-v2__hint">${T.description}</span>`:f}
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
                      `:kh({locale:e.locale,schema:i.schema,uiHints:e.uiHints,value:e.formValue,disabled:e.loading||!e.formValue,unsupportedPaths:i.unsupportedPaths,onPatch:e.onFormPatch,searchQuery:e.searchQuery,activeSection:e.activeSection,activeSubsection:C})}
                ${a?r`
                        <div class="callout danger" style="margin-top: 12px">
                          ${t("Form view can't safely edit some fields. Use Raw to avoid losing config entries.","表单视图无法安全编辑部分字段，请使用原始模式避免配置项丢失。")}
                        </div>
                      `:f}
              `:r`
                <label class="field config-raw-field">
                  <span>${t("Raw JSON5","原始 JSON5")}</span>
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
            </div>`:f}
      </main>
    </div>
  `}function pm(e){const t=["last",...e.channels.filter(Boolean)],n=e.form.deliveryChannel?.trim();n&&!t.includes(n)&&t.push(n);const s=new Set;return t.filter(i=>s.has(i)?!1:(s.add(i),!0))}function hm(e,t){if(t==="last")return"last";const n=e.channelMeta?.find(s=>s.id===t);return n?.label?n.label:e.channelLabels?.[t]??t}function fm(e){const t=pm(e),s=(e.runsJobId==null?void 0:e.jobs.find(a=>a.id===e.runsJobId))?.name??e.runsJobId??"(select a job)",i=e.runs.toSorted((a,o)=>o.ts-a.ts);return r`
    <section class="grid grid-cols-2">
      <div class="card">
        <div class="card-title">Scheduler · 调度器</div>
        <div class="card-sub">Current scheduler status and next wake time.</div>
        <div class="stat-grid" style="margin-top: 18px;">
          <div class="stat">
            <div class="stat-label">Status · 状态</div>
            <div class="stat-value">
              ${e.status?r`<span class="status-badge ${e.status.enabled?"ok":"warn"}">${e.status.enabled?"Enabled":"Disabled"}</span>`:"—"}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">Jobs · 任务</div>
            <div class="stat-value">${e.status?.jobs??"—"}</div>
          </div>
          <div class="stat">
            <div class="stat-label">Next wake · 下次执行</div>
            <div class="stat-value">${va(e.status?.nextWakeAtMs??null)}</div>
          </div>
        </div>
        <div class="row" style="margin-top: 14px;">
          <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Refreshing…":"↻ Refresh"}
          </button>
          ${e.error?r`<span class="muted">${e.error}</span>`:f}
        </div>
      </div>

      <div class="card">
        <div class="card-title">New Job · 新建任务</div>
        <div class="card-sub">Schedule a recurring wakeup or automated agent task.</div>
        <div class="form-grid" style="margin-top: 16px;">
          <label class="field">
            <span>Name</span>
            <input
              .value=${e.form.name}
              @input=${a=>e.onFormChange({name:a.target.value})}
            />
          </label>
          <label class="field">
            <span>Description</span>
            <input
              .value=${e.form.description}
              @input=${a=>e.onFormChange({description:a.target.value})}
            />
          </label>
          <label class="field">
            <span>Agent ID</span>
            <input
              .value=${e.form.agentId}
              @input=${a=>e.onFormChange({agentId:a.target.value})}
              placeholder="default"
            />
          </label>
          <label class="field checkbox">
            <span>Enabled</span>
            <input
              type="checkbox"
              .checked=${e.form.enabled}
              @change=${a=>e.onFormChange({enabled:a.target.checked})}
            />
          </label>
          <label class="field">
            <span>Schedule</span>
            <select
              .value=${e.form.scheduleKind}
              @change=${a=>e.onFormChange({scheduleKind:a.target.value})}
            >
              <option value="every">Every</option>
              <option value="at">At</option>
              <option value="cron">Cron</option>
            </select>
          </label>
        </div>
        ${vm(e)}
        <div class="form-grid" style="margin-top: 12px;">
          <label class="field">
            <span>Session</span>
            <select
              .value=${e.form.sessionTarget}
              @change=${a=>e.onFormChange({sessionTarget:a.target.value})}
            >
              <option value="main">Main</option>
              <option value="isolated">Isolated</option>
            </select>
          </label>
          <label class="field">
            <span>Wake mode</span>
            <select
              .value=${e.form.wakeMode}
              @change=${a=>e.onFormChange({wakeMode:a.target.value})}
            >
              <option value="now">Now</option>
              <option value="next-heartbeat">Next heartbeat</option>
            </select>
          </label>
          <label class="field">
            <span>Payload</span>
            <select
              .value=${e.form.payloadKind}
              @change=${a=>e.onFormChange({payloadKind:a.target.value})}
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
            @input=${a=>e.onFormChange({payloadText:a.target.value})}
            rows="4"
          ></textarea>
        </label>
        ${e.form.payloadKind==="agentTurn"?r`
                <div class="form-grid" style="margin-top: 12px;">
                  <label class="field">
                    <span>Delivery</span>
                    <select
                      .value=${e.form.deliveryMode}
                      @change=${a=>e.onFormChange({deliveryMode:a.target.value})}
                    >
                      <option value="announce">Announce summary (default)</option>
                      <option value="none">None (internal)</option>
                    </select>
                  </label>
                  <label class="field">
                    <span>Timeout (seconds)</span>
                    <input
                      .value=${e.form.timeoutSeconds}
                      @input=${a=>e.onFormChange({timeoutSeconds:a.target.value})}
                    />
                  </label>
                  ${e.form.deliveryMode==="announce"?r`
                          <label class="field">
                            <span>Channel</span>
                            <select
                              .value=${e.form.deliveryChannel||"last"}
                              @change=${a=>e.onFormChange({deliveryChannel:a.target.value})}
                            >
                              ${t.map(a=>r`<option value=${a}>
                                    ${hm(e,a)}
                                  </option>`)}
                            </select>
                          </label>
                          <label class="field">
                            <span>To</span>
                            <input
                              .value=${e.form.deliveryTo}
                              @input=${a=>e.onFormChange({deliveryTo:a.target.value})}
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

    <section class="card" style="margin-top: 20px;">
      <div class="card-title">Scheduled Jobs · 已调度任务</div>
      <div class="card-sub">All jobs managed by the gateway scheduler.</div>
      ${e.jobs.length===0?r`
              <div class="empty-state" style="margin-top: 16px">
                <div class="empty-state-icon">⏰</div>
                <div class="empty-state-title">No jobs scheduled yet</div>
                <div class="empty-state-desc">Use the form above to create your first scheduled task.</div>
              </div>
            `:r`
            <div class="list" style="margin-top: 16px;">
              ${e.jobs.map(a=>mm(a,e))}
            </div>
          `}
    </section>

    <section class="card" style="margin-top: 20px;">
      <div class="card-title">Run History · 执行历史</div>
      <div class="card-sub">Latest runs for ${s}.</div>
      ${e.runsJobId==null?r`
              <div class="empty-state" style="margin-top: 16px">
                <div class="empty-state-icon">📊</div>
                <div class="empty-state-title">Select a job above</div>
                <div class="empty-state-desc">Click on a scheduled job to view its execution history.</div>
              </div>
            `:i.length===0?r`
                <div class="empty-state" style="margin-top: 16px">
                  <div class="empty-state-icon">📂</div>
                  <div class="empty-state-title">No runs recorded</div>
                  <div class="empty-state-desc">This job has not been executed yet.</div>
                </div>
              `:r`
              <div class="list" style="margin-top: 12px;">
                ${i.map(a=>xm(a,e.basePath))}
              </div>
            `}
    </section>
  `}function vm(e){const t=e.form;return t.scheduleKind==="at"?r`
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
  `}function mm(e,t){const s=`list-item list-item-clickable cron-job${t.runsJobId===e.id?" list-item-selected":""}`;return r`
    <div class=${s} @click=${()=>t.onLoadRuns(e.id)}>
      <div class="list-main">
        <div class="list-title">${e.name}</div>
        <div class="list-sub">${Dl(e)}</div>
        ${bm(e)}
        ${e.agentId?r`<div class="muted cron-job-agent">Agent: ${e.agentId}</div>`:f}
      </div>
      <div class="list-meta">
        ${ym(e)}
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
  `}function bm(e){if(e.payload.kind==="systemEvent")return r`<div class="cron-job-detail">
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
  `}function gr(e){return typeof e!="number"||!Number.isFinite(e)?"—":J(e)}function ym(e){const t=e.state?.lastStatus??"—",n=t==="ok"?"cron-job-status-ok":t==="error"?"cron-job-status-error":t==="skipped"?"cron-job-status-skipped":"cron-job-status-na",s=e.state?.nextRunAtMs,i=e.state?.lastRunAtMs;return r`
    <div class="cron-job-state">
      <div class="cron-job-state-row">
        <span class="cron-job-state-key">Status</span>
        <span class=${`cron-job-status-pill ${n}`}>${t}</span>
      </div>
      <div class="cron-job-state-row">
        <span class="cron-job-state-key">Next</span>
        <span class="cron-job-state-value" title=${bt(s)}>
          ${gr(s)}
        </span>
      </div>
      <div class="cron-job-state-row">
        <span class="cron-job-state-key">Last</span>
        <span class="cron-job-state-value" title=${bt(i)}>
          ${gr(i)}
        </span>
      </div>
    </div>
  `}function xm(e,t){const n=typeof e.sessionKey=="string"&&e.sessionKey.trim().length>0?`${ps("chat",t)}?session=${encodeURIComponent(e.sessionKey)}`:null;return r`
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
  `}function $m(e){try{const t=JSON.stringify(e??{},null,2);return t.length<=420?t:`${t.slice(0,420)}
...`}catch{return String(e??"")}}function wm(e){const t=e?e.ok:void 0;return typeof t=="boolean"?t?{tone:"ok",label:"Healthy"}:{tone:"danger",label:"Issue detected"}:{tone:"muted",label:"Unknown"}}function km(e){const t=(g,p)=>z(e.locale,g,p),s=(e.status&&typeof e.status=="object"?e.status.securityAudit:null)?.summary??null,i=s?.critical??0,a=s?.warn??0,o=s?.info??0,c=i>0?"danger":a>0?"warn":"success",l=i>0?t(`${i} critical`,`${i} 个严重`):a>0?t(`${a} warnings`,`${a} 个警告`):t("No critical issues","无严重问题"),u=wm(e.health);return r`
    <section class="settings-page settings-page--debug">
      <header class="settings-page__header">
        <div>
          <h3 class="settings-page__title">${t("Diagnostics","诊断")}</h3>
          <p class="settings-page__desc">
            ${t("Check system health at a glance. Expand sections for technical details.","一览系统健康状态，展开查看技术详情。")}
          </p>
        </div>
        <button class="btn btn--sm btn--ghost" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?t("Refreshing...","刷新中..."):t("Refresh","刷新")}
        </button>
      </header>

      <!-- Status overview cards -->
      <div class="debug-status-grid">
        <div class="debug-status-card debug-status-card--${u.tone}">
          <div class="debug-status-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              ${u.tone==="ok"?r`<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>`:u.tone==="danger"?r`<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>`:r`<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>`}
            </svg>
          </div>
          <div class="debug-status-card__info">
            <div class="debug-status-card__label">${t("System Health","系统健康")}</div>
            <div class="debug-status-card__value">
              ${t(u.label,u.label==="Healthy"?"健康":u.label==="Issue detected"?"发现异常":"未知")}
            </div>
          </div>
        </div>

        <div class="debug-status-card debug-status-card--${c}">
          <div class="debug-status-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <div class="debug-status-card__info">
            <div class="debug-status-card__label">${t("Security","安全状态")}</div>
            <div class="debug-status-card__value">${l}</div>
          </div>
        </div>

        <div class="debug-status-card">
          <div class="debug-status-card__icon debug-status-card__icon--neutral">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            </svg>
          </div>
          <div class="debug-status-card__info">
            <div class="debug-status-card__label">${t("Models","模型")}</div>
            <div class="debug-status-card__value">${e.models.length} ${t("available","可用")}</div>
          </div>
        </div>

        <div class="debug-status-card">
          <div class="debug-status-card__icon debug-status-card__icon--neutral">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <div class="debug-status-card__info">
            <div class="debug-status-card__label">${t("Events","事件")}</div>
            <div class="debug-status-card__value">${e.eventLog.length} ${t("captured","已捕获")}</div>
          </div>
        </div>
      </div>

      ${s?r`<div class="debug-security-hint ${c}">
              <span>${t("Security audit","安全审计")}: ${l}${o>0?` · ${o} ${t("info","信息")}`:""}</span>
              <span class="debug-security-hint__cmd">opensoul security audit --deep</span>
            </div>`:f}

      <!-- Expandable technical sections -->
      <div class="debug-sections">
        <details class="debug-section-card">
          <summary class="debug-section-card__header">
            <div class="debug-section-card__title-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="debug-section-card__icon">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <div>
                <div class="debug-section-card__title">${t("Live Snapshots","实时快照")}</div>
                <div class="debug-section-card__desc">${t("Status, health, and heartbeat from the gateway.","网关状态、健康、心跳数据。")}</div>
              </div>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="debug-section-card__chevron"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </summary>
          <div class="debug-section-card__body">
            <div class="debug-snapshot-grid-v2">
              ${ni({title:t("Status","状态"),data:e.status,emptyLabel:t("No data","无数据")})}
              ${ni({title:t("Health","健康"),data:e.health,emptyLabel:t("No data","无数据")})}
              ${ni({title:t("Heartbeat","心跳"),data:e.heartbeat,emptyLabel:t("No data","无数据")})}
            </div>
          </div>
        </details>

        <details class="debug-section-card">
          <summary class="debug-section-card__header">
            <div class="debug-section-card__title-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="debug-section-card__icon">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
              <div>
                <div class="debug-section-card__title">${t("Event Timeline","事件时间线")}</div>
                <div class="debug-section-card__desc">${t("Recent gateway events.","最近的网关事件。")}</div>
              </div>
            </div>
            <span class="debug-section-card__badge">${e.eventLog.length}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="debug-section-card__chevron"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </summary>
          <div class="debug-section-card__body">
            ${e.eventLog.length===0?r`<div class="debug-empty-hint">${t("No events yet.","暂无事件。")}</div>`:r`
                    <div class="debug-timeline">
                      ${e.eventLog.map(g=>r`
                          <details class="debug-timeline__item">
                            <summary class="debug-timeline__summary">
                              <span class="debug-timeline__event">${g.event}</span>
                              <span class="debug-timeline__time">${new Date(g.ts).toLocaleTimeString()}</span>
                            </summary>
                            <pre class="code-block debug-timeline__payload">${Dp(g.payload)}</pre>
                          </details>
                        `)}
                    </div>
                  `}
          </div>
        </details>

        <details class="debug-section-card">
          <summary class="debug-section-card__header">
            <div class="debug-section-card__title-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="debug-section-card__icon">
                <polyline points="4 17 10 11 4 5"></polyline>
                <line x1="12" y1="19" x2="20" y2="19"></line>
              </svg>
              <div>
                <div class="debug-section-card__title">${t("RPC Console","RPC 控制台")}</div>
                <div class="debug-section-card__desc">${t("Call gateway methods directly.","直接调用网关方法。")}</div>
              </div>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="debug-section-card__chevron"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </summary>
          <div class="debug-section-card__body">
            <div class="debug-rpc-form">
              <label class="debug-rpc-field">
                <span class="debug-rpc-field__label">${t("Method","方法")}</span>
                <input
                  class="debug-rpc-field__input"
                  .value=${e.callMethod}
                  @input=${g=>e.onCallMethodChange(g.target.value)}
                  placeholder="system-presence"
                />
              </label>
              <label class="debug-rpc-field">
                <span class="debug-rpc-field__label">${t("Params (JSON)","参数 (JSON)")}</span>
                <textarea
                  class="debug-rpc-field__textarea"
                  .value=${e.callParams}
                  @input=${g=>e.onCallParamsChange(g.target.value)}
                  rows="4"
                  placeholder="{}"
                ></textarea>
              </label>
              <button class="btn btn--sm primary" @click=${e.onCall}>${t("Execute","执行")}</button>
            </div>
            ${e.callError?r`<div class="debug-rpc-result debug-rpc-result--error">${e.callError}</div>`:f}
            ${e.callResult?r`<pre class="code-block debug-rpc-result">${e.callResult}</pre>`:f}
          </div>
        </details>

        <details class="debug-section-card">
          <summary class="debug-section-card__header">
            <div class="debug-section-card__title-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="debug-section-card__icon">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              </svg>
              <div>
                <div class="debug-section-card__title">${t("Model Catalog","模型目录")}</div>
                <div class="debug-section-card__desc">${t("Raw model payload.","原始模型数据。")}</div>
              </div>
            </div>
            <span class="debug-section-card__badge">${e.models.length}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="debug-section-card__chevron"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </summary>
          <div class="debug-section-card__body">
            <pre class="code-block">${JSON.stringify(e.models??[],null,2)}</pre>
          </div>
        </details>
      </div>
    </section>
  `}function ni(e){const t=e.data!=null;return r`
    <div class="debug-snapshot-v2">
      <div class="debug-snapshot-v2__title">${e.title}</div>
      ${t?r`<pre class="code-block debug-snapshot-v2__code">${$m(e.data)}</pre>`:r`<div class="debug-snapshot-v2__empty">${e.emptyLabel}</div>`}
    </div>
  `}function Sm(e){const t=Math.max(0,e),n=Math.floor(t/1e3);if(n<60)return`${n}s`;const s=Math.floor(n/60);return s<60?`${s}m`:`${Math.floor(s/60)}h`}function lt(e,t){return t?r`<div class="exec-approval-meta-row"><span>${e}</span><span>${t}</span></div>`:f}function Am(e){const t=e.execApprovalQueue[0];if(!t)return f;const n=t.request,s=t.expiresAtMs-Date.now(),i=s>0?`expires in ${Sm(s)}`:"expired",a=e.execApprovalQueue.length;return r`
    <div class="exec-approval-overlay" role="dialog" aria-live="polite">
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">Exec approval needed</div>
            <div class="exec-approval-sub">${i}</div>
          </div>
          ${a>1?r`<div class="exec-approval-queue">${a} pending</div>`:f}
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
  `}function Cm(e){const{pendingGatewayUrl:t}=e;if(!t)return f;const n=(s,i)=>z(e.uiLocale,s,i);return r`
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
  `}function _m(e){const t=e.entries.filter(i=>typeof i.lastInputSeconds=="number"&&i.lastInputSeconds<=120).length,n=new Set(e.entries.map(i=>i.host||"unknown")),s=new Set(e.entries.map(i=>i.platform).filter(Boolean)).size;return r`
    <section class="card">
      <div class="section-header">
        <div>
          <div class="card-title">Connected Clients · 在线实例</div>
          <div class="card-sub">Live presence signals from connected clients and gateway nodes.</div>
        </div>
        <div class="section-header__meta">
          <button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Refreshing…":"↻ Refresh"}
          </button>
        </div>
      </div>

      <div class="page-summary-grid" style="margin-top: 18px;">
        <div class="page-summary-card">
          <div class="page-summary-label">Instances · 实例</div>
          <div class="page-summary-value">${e.entries.length}</div>
          <div class="page-summary-sub">Total connected clients</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">Active · 活跃</div>
          <div class="page-summary-value">${t}</div>
          <div class="page-summary-sub">Input within 2 minutes</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">Hosts · 主机</div>
          <div class="page-summary-value">${n.size}</div>
          <div class="page-summary-sub">Unique hosts</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">Platforms · 平台</div>
          <div class="page-summary-value">${s}</div>
          <div class="page-summary-sub">OS / platform types</div>
        </div>
      </div>

      ${e.lastError?r`<div class="callout danger" style="margin-top: 14px;">${e.lastError}</div>`:f}
      ${e.statusMessage?r`<div class="callout info" style="margin-top: 14px;">${e.statusMessage}</div>`:f}

      <div class="list" style="margin-top: 20px;">
        ${e.entries.length===0?r`
                <div class="empty-state">
                  <div class="empty-state-icon">📡</div>
                  <div class="empty-state-title">No clients connected yet</div>
                  <div class="empty-state-desc">Start a client session to see live presence data here.</div>
                </div>
              `:e.entries.map(i=>Tm(i))}
      </div>
    </section>
  `}function Tm(e){const t=e.lastInputSeconds!=null?`${e.lastInputSeconds}s ago`:"—",n=e.mode??"unknown",s=Array.isArray(e.roles)?e.roles.filter(Boolean):[],i=Array.isArray(e.scopes)?e.scopes.filter(Boolean):[],a=i.length>0?i.length>3?`${i.length} scopes`:i.join(", "):null;return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${e.host??"Unknown host"}</div>
        <div class="list-sub">${Mp(e)}</div>
        <div class="chip-row">
          <span class="chip">${n}</span>
          ${s.map(o=>r`<span class="chip">${o}</span>`)}
          ${a?r`<span class="chip" title="Scopes: ${i.join(", ")}">${a}</span>`:f}
          ${e.platform?r`<span class="chip">${e.platform}</span>`:f}
          ${e.deviceFamily?r`<span class="chip">${e.deviceFamily}</span>`:f}
          ${e.modelIdentifier?r`<span class="chip">${e.modelIdentifier}</span>`:f}
          ${e.version?r`<span class="chip">v${e.version}</span>`:f}
        </div>
      </div>
      <div class="list-meta">
        <div>${Rp(e)}</div>
        <div class="muted">Last input: ${t}</div>
        ${e.reason?r`<div class="muted">Reason: ${e.reason}</div>`:f}
      </div>
    </div>
  `}const pr=["trace","debug","info","warn","error","fatal"];function Lm(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?e:t.toLocaleTimeString()}function Em(e,t){return t?[e.message,e.subsystem,e.raw].filter(Boolean).join(" ").toLowerCase().includes(t):!0}function Im(e){const t={trace:0,debug:0,info:0,warn:0,error:0,fatal:0};for(const n of e)n.level&&n.level in t&&(t[n.level]+=1);return t}function Mm(e){const t=(l,u)=>z(e.locale,l,u),n=e.filterText.trim().toLowerCase(),s=pr.some(l=>!e.levelFilters[l]),i=e.entries.filter(l=>l.level&&!e.levelFilters[l.level]?!1:Em(l,n)),a=Im(e.entries),o=i.filter(l=>l.level==="warn"||l.level==="error"||l.level==="fatal").length,c=n||s?"filtered":"visible";return r`
    <section class="settings-page settings-page--logs">
      <header class="settings-page__header">
        <div>
          <h3 class="settings-page__title">${t("Runtime Logs","运行日志")}</h3>
          <p class="settings-page__desc">
            ${t("Monitor your system activity and troubleshoot issues.","监控系统运行状态，快速定位问题。")}
          </p>
        </div>
      </header>

      <!-- Compact toolbar: search + filters + actions in one row -->
      <div class="logs-toolbar-v2">
        <div class="logs-toolbar-v2__search">
          <svg class="logs-toolbar-v2__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
          <input
            class="logs-toolbar-v2__input"
            .value=${e.filterText}
            @input=${l=>e.onFilterTextChange(l.target.value)}
            placeholder=${t("Filter logs...","筛选日志...")}
          />
          ${e.filterText?r`
            <button class="logs-toolbar-v2__clear" @click=${()=>e.onFilterTextChange("")}>\u00d7</button>
          `:f}
        </div>

        <div class="logs-toolbar-v2__filters">
          ${pr.map(l=>r`
              <button
                class="logs-level-pill ${l} ${e.levelFilters[l]?"active":""}"
                @click=${()=>e.onLevelToggle(l,!e.levelFilters[l])}
                title="${l} (${a[l]})"
              >
                <span class="logs-level-pill__dot"></span>
                <span class="logs-level-pill__label">${l}</span>
                ${a[l]>0?r`<span class="logs-level-pill__count">${a[l]}</span>`:f}
              </button>
            `)}
        </div>

        <div class="logs-toolbar-v2__actions">
          <label class="logs-auto-follow">
            <input
              type="checkbox"
              .checked=${e.autoFollow}
              @change=${l=>e.onToggleAutoFollow(l.target.checked)}
            />
            <span>${t("Auto-follow","自动跟踪")}</span>
          </label>
          <button class="btn btn--sm btn--ghost" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?t("Loading...","加载中..."):t("Refresh","刷新")}
          </button>
          <button
            class="btn btn--sm btn--ghost"
            ?disabled=${i.length===0}
            @click=${()=>e.onExport(i.map(l=>l.raw),c)}
          >
            ${t("Export","导出")}
          </button>
        </div>
      </div>

      <!-- Inline summary bar -->
      <div class="logs-summary-bar">
        <span class="logs-summary-tag">
          ${t("Showing","显示")} <strong>${i.length}</strong> / <strong>${e.entries.length}</strong> ${t("entries","条")}
        </span>
        ${o>0?r`
          <span class="logs-summary-tag logs-summary-tag--warn">
            <span class="logs-summary-tag__dot"></span>
            ${o} ${t("issues","条异常")}
          </span>
        `:r`
          <span class="logs-summary-tag logs-summary-tag--ok">
            <span class="logs-summary-tag__dot"></span>
            ${t("No issues","无异常")}
          </span>
        `}
        ${e.file?r`
          <span class="logs-summary-tag logs-summary-tag--muted">
            ${e.file}
          </span>
        `:f}
      </div>

      ${e.truncated?r`
              <div class="logs-notice logs-notice--warn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="logs-notice__icon">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                ${t("Output is truncated. Showing the most recent entries.","日志已被截断，仅展示最近的条目。")}
              </div>
            `:f}
      ${e.error?r`<div class="logs-notice logs-notice--error">${e.error}</div>`:f}

      <!-- Log stream -->
      <div class="logs-stream-v2" @scroll=${e.onScroll}>
        ${i.length===0?r`
                <div class="logs-empty-v2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="logs-empty-v2__icon">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="M21 21l-4.35-4.35"></path>
                  </svg>
                  <div class="logs-empty-v2__title">${t("No matching logs","没有匹配的日志")}</div>
                  <div class="logs-empty-v2__desc">
                    ${t("Try adjusting filters or search keywords.","试试调整筛选条件或搜索关键词。")}
                  </div>
                </div>
              `:i.map(l=>r`
                  <div class="log-entry-v2 ${l.level?`log-entry-v2--${l.level}`:""}">
                    <div class="log-entry-v2__gutter">
                      <span class="log-entry-v2__time">${Lm(l.time)}</span>
                      ${l.level?r`<span class="log-entry-v2__badge ${l.level}">${l.level}</span>`:f}
                    </div>
                    <div class="log-entry-v2__body">
                      <div class="log-entry-v2__message">${l.message??l.raw}</div>
                      ${l.subsystem?r`<span class="log-entry-v2__subsystem">${l.subsystem}</span>`:f}
                    </div>
                    ${l.raw&&l.message&&l.raw!==l.message?r`
                            <details class="log-entry-v2__raw">
                              <summary>${t("Raw","原始")}</summary>
                              <pre class="code-block">${l.raw}</pre>
                            </details>
                          `:f}
                  </div>
                `)}
      </div>
    </section>
  `}function Rm(e){const t=Bm(e),n=Wm(e);return r`
    ${qm(n)}
    ${Gm(t)}
    ${Pm(e)}
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
              `:e.nodes.map(s=>sb(s))}
      </div>
    </section>
  `}function Pm(e){const t=e.devicesList??{pending:[],paired:[]},n=Array.isArray(t.pending)?t.pending:[],s=Array.isArray(t.paired)?t.paired:[];return r`
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
              ${n.map(i=>Dm(i,e))}
            `:f}
        ${s.length>0?r`
              <div class="muted" style="margin-top: 12px; margin-bottom: 8px;">Paired</div>
              ${s.map(i=>Nm(i,e))}
            `:f}
        ${n.length===0&&s.length===0?r`
                <div class="muted">No paired devices.</div>
              `:f}
      </div>
    </section>
  `}function Dm(e,t){const n=e.displayName?.trim()||e.deviceId,s=typeof e.ts=="number"?J(e.ts):"—",i=e.role?.trim()?`role: ${e.role}`:"role: -",a=e.isRepair?" · repair":"",o=e.remoteIp?` · ${e.remoteIp}`:"";return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${n}</div>
        <div class="list-sub">${e.deviceId}${o}</div>
        <div class="muted" style="margin-top: 6px;">
          ${i} · requested ${s}${a}
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
  `}function Nm(e,t){const n=e.displayName?.trim()||e.deviceId,s=e.remoteIp?` · ${e.remoteIp}`:"",i=`roles: ${di(e.roles)}`,a=`scopes: ${di(e.scopes)}`,o=Array.isArray(e.tokens)?e.tokens:[];return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${n}</div>
        <div class="list-sub">${e.deviceId}${s}</div>
        <div class="muted" style="margin-top: 6px;">${i} · ${a}</div>
        ${o.length===0?r`
                <div class="muted" style="margin-top: 6px">Tokens: none</div>
              `:r`
              <div class="muted" style="margin-top: 10px;">Tokens</div>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px;">
                ${o.map(c=>Fm(e.deviceId,c,t))}
              </div>
            `}
      </div>
    </div>
  `}function Fm(e,t,n){const s=t.revokedAtMs?"revoked":"active",i=`scopes: ${di(t.scopes)}`,a=J(t.rotatedAtMs??t.createdAtMs??t.lastUsedAtMs??null);return r`
    <div class="row" style="justify-content: space-between; gap: 8px;">
      <div class="list-sub">${t.role} · ${s} · ${i} · ${a}</div>
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
  `}const Je="__defaults__",hr=[{value:"deny",label:"Deny"},{value:"allowlist",label:"Allowlist"},{value:"full",label:"Full"}],Om=[{value:"off",label:"Off"},{value:"on-miss",label:"On miss"},{value:"always",label:"Always"}];function Bm(e){const t=e.configForm,n=eb(e.nodes),{defaultBinding:s,agents:i}=nb(t),a=!!t,o=e.configSaving||e.configFormMode==="raw";return{ready:a,disabled:o,configDirty:e.configDirty,configLoading:e.configLoading,configSaving:e.configSaving,defaultBinding:s,agents:i,nodes:n,onBindDefault:e.onBindDefault,onBindAgent:e.onBindAgent,onSave:e.onSaveBindings,onLoadConfig:e.onLoadConfig,formMode:e.configFormMode}}function fr(e){return e==="allowlist"||e==="full"||e==="deny"?e:"deny"}function zm(e){return e==="always"||e==="off"||e==="on-miss"?e:"on-miss"}function Um(e){const t=e?.defaults??{};return{security:fr(t.security),ask:zm(t.ask),askFallback:fr(t.askFallback??"deny"),autoAllowSkills:!!(t.autoAllowSkills??!1)}}function Hm(e){const t=e?.agents??{},n=Array.isArray(t.list)?t.list:[],s=[];return n.forEach(i=>{if(!i||typeof i!="object")return;const a=i,o=typeof a.id=="string"?a.id.trim():"";if(!o)return;const c=typeof a.name=="string"?a.name.trim():void 0,l=a.default===!0;s.push({id:o,name:c||void 0,isDefault:l})}),s}function Km(e,t){const n=Hm(e),s=Object.keys(t?.agents??{}),i=new Map;n.forEach(o=>i.set(o.id,o)),s.forEach(o=>{i.has(o)||i.set(o,{id:o})});const a=Array.from(i.values());return a.length===0&&a.push({id:"main",isDefault:!0}),a.sort((o,c)=>{if(o.isDefault&&!c.isDefault)return-1;if(!o.isDefault&&c.isDefault)return 1;const l=o.name?.trim()?o.name:o.id,u=c.name?.trim()?c.name:c.id;return l.localeCompare(u)}),a}function jm(e,t){return e===Je?Je:e&&t.some(n=>n.id===e)?e:Je}function Wm(e){const t=e.execApprovalsForm??e.execApprovalsSnapshot?.file??null,n=!!t,s=Um(t),i=Km(e.configForm,t),a=tb(e.nodes),o=e.execApprovalsTarget;let c=o==="node"&&e.execApprovalsTargetNodeId?e.execApprovalsTargetNodeId:null;o==="node"&&c&&!a.some(p=>p.id===c)&&(c=null);const l=jm(e.execApprovalsSelectedAgent,i),u=l!==Je?(t?.agents??{})[l]??null:null,g=Array.isArray(u?.allowlist)?u.allowlist??[]:[];return{ready:n,disabled:e.execApprovalsSaving||e.execApprovalsLoading,dirty:e.execApprovalsDirty,loading:e.execApprovalsLoading,saving:e.execApprovalsSaving,form:t,defaults:s,selectedScope:l,selectedAgent:u,agents:i,allowlist:g,target:o,targetNodeId:c,targetNodes:a,onSelectScope:e.onExecApprovalsSelectAgent,onSelectTarget:e.onExecApprovalsTargetChange,onPatch:e.onExecApprovalsPatch,onRemove:e.onExecApprovalsRemove,onLoad:e.onLoadExecApprovals,onSave:e.onSaveExecApprovals}}function Gm(e){const t=e.nodes.length>0,n=e.defaultBinding??"";return r`
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
                      @change=${s=>{const a=s.target.value.trim();e.onBindDefault(a||null)}}
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
                    `:e.agents.map(s=>Xm(s,e))}
            </div>
          `:r`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load config to edit bindings.</div>
            <button class="btn" ?disabled=${e.configLoading} @click=${e.onLoadConfig}>
              ${e.configLoading?"Loading…":"Load config"}
            </button>
          </div>`}
    </section>
  `}function qm(e){const t=e.ready,n=e.target!=="node"||!!e.targetNodeId;return r`
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

      ${Vm(e)}

      ${t?r`
            ${Qm(e)}
            ${Ym(e)}
            ${e.selectedScope===Je?f:Zm(e)}
          `:r`<div class="row" style="margin-top: 12px; gap: 12px;">
            <div class="muted">Load exec approvals to edit allowlists.</div>
            <button class="btn" ?disabled=${e.loading||!n} @click=${e.onLoad}>
              ${e.loading?"Loading…":"Load approvals"}
            </button>
          </div>`}
    </section>
  `}function Vm(e){const t=e.targetNodes.length>0,n=e.targetNodeId??"";return r`
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
              @change=${s=>{if(s.target.value==="node"){const o=e.targetNodes[0]?.id??null;e.onSelectTarget("node",n||o)}else e.onSelectTarget("gateway",null)}}
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
                    @change=${s=>{const a=s.target.value.trim();e.onSelectTarget("node",a||null)}}
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
  `}function Qm(e){return r`
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
  `}function Ym(e){const t=e.selectedScope===Je,n=e.defaults,s=e.selectedAgent??{},i=t?["defaults"]:["agents",e.selectedScope],a=typeof s.security=="string"?s.security:void 0,o=typeof s.ask=="string"?s.ask:void 0,c=typeof s.askFallback=="string"?s.askFallback:void 0,l=t?n.security:a??"__default__",u=t?n.ask:o??"__default__",g=t?n.askFallback:c??"__default__",p=typeof s.autoAllowSkills=="boolean"?s.autoAllowSkills:void 0,h=p??n.autoAllowSkills,m=p==null;return r`
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
              @change=${v=>{const C=v.target.value;!t&&C==="__default__"?e.onRemove([...i,"security"]):e.onPatch([...i,"security"],C)}}
            >
              ${t?f:r`<option value="__default__" ?selected=${l==="__default__"}>
                    Use default (${n.security})
                  </option>`}
              ${hr.map(v=>r`<option
                    value=${v.value}
                    ?selected=${l===v.value}
                  >
                    ${v.label}
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
              @change=${v=>{const C=v.target.value;!t&&C==="__default__"?e.onRemove([...i,"ask"]):e.onPatch([...i,"ask"],C)}}
            >
              ${t?f:r`<option value="__default__" ?selected=${u==="__default__"}>
                    Use default (${n.ask})
                  </option>`}
              ${Om.map(v=>r`<option
                    value=${v.value}
                    ?selected=${u===v.value}
                  >
                    ${v.label}
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
              @change=${v=>{const C=v.target.value;!t&&C==="__default__"?e.onRemove([...i,"askFallback"]):e.onPatch([...i,"askFallback"],C)}}
            >
              ${t?f:r`<option value="__default__" ?selected=${g==="__default__"}>
                    Use default (${n.askFallback})
                  </option>`}
              ${hr.map(v=>r`<option
                    value=${v.value}
                    ?selected=${g===v.value}
                  >
                    ${v.label}
                  </option>`)}
            </select>
          </label>
        </div>
      </div>

      <div class="list-item">
        <div class="list-main">
          <div class="list-title">Auto-allow skill CLIs</div>
          <div class="list-sub">
            ${t?"Allow skill executables listed by the Gateway.":m?`Using default (${n.autoAllowSkills?"on":"off"}).`:`Override (${h?"on":"off"}).`}
          </div>
        </div>
        <div class="list-meta">
          <label class="field">
            <span>Enabled</span>
            <input
              type="checkbox"
              ?disabled=${e.disabled}
              .checked=${h}
              @change=${v=>{const A=v.target;e.onPatch([...i,"autoAllowSkills"],A.checked)}}
            />
          </label>
          ${!t&&!m?r`<button
                class="btn btn--sm"
                ?disabled=${e.disabled}
                @click=${()=>e.onRemove([...i,"autoAllowSkills"])}
              >
                Use default
              </button>`:f}
        </div>
      </div>
    </div>
  `}function Zm(e){const t=["agents",e.selectedScope,"allowlist"],n=e.allowlist;return r`
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
            `:n.map((s,i)=>Jm(e,s,i))}
    </div>
  `}function Jm(e,t,n){const s=t.lastUsedAt?J(t.lastUsedAt):"never",i=t.lastUsedCommand?ui(t.lastUsedCommand,120):null,a=t.lastResolvedPath?ui(t.lastResolvedPath,120):null;return r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${t.pattern?.trim()?t.pattern:"New pattern"}</div>
        <div class="list-sub">Last used: ${s}</div>
        ${i?r`<div class="list-sub mono">${i}</div>`:f}
        ${a?r`<div class="list-sub mono">${a}</div>`:f}
      </div>
      <div class="list-meta">
        <label class="field">
          <span>Pattern</span>
          <input
            type="text"
            .value=${t.pattern??""}
            ?disabled=${e.disabled}
            @input=${o=>{const c=o.target;e.onPatch(["agents",e.selectedScope,"allowlist",n,"pattern"],c.value)}}
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
  `}function Xm(e,t){const n=e.binding??"__default__",s=e.name?.trim()?`${e.name} (${e.id})`:e.id,i=t.nodes.length>0;return r`
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
            @change=${a=>{const c=a.target.value.trim();t.onBindAgent(e.index,c==="__default__"?null:c)}}
          >
            <option value="__default__" ?selected=${n==="__default__"}>
              Use default
            </option>
            ${t.nodes.map(a=>r`<option
                  value=${a.id}
                  ?selected=${n===a.id}
                >
                  ${a.label}
                </option>`)}
          </select>
        </label>
      </div>
    </div>
  `}function eb(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(c=>String(c)==="system.run"))continue;const a=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!a)continue;const o=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():a;t.push({id:a,label:o===a?a:`${o} · ${a}`})}return t.sort((n,s)=>n.label.localeCompare(s.label)),t}function tb(e){const t=[];for(const n of e){if(!(Array.isArray(n.commands)?n.commands:[]).some(c=>String(c)==="system.execApprovals.get"||String(c)==="system.execApprovals.set"))continue;const a=typeof n.nodeId=="string"?n.nodeId.trim():"";if(!a)continue;const o=typeof n.displayName=="string"&&n.displayName.trim()?n.displayName.trim():a;t.push({id:a,label:o===a?a:`${o} · ${a}`})}return t.sort((n,s)=>n.label.localeCompare(s.label)),t}function nb(e){const t={id:"main",name:void 0,index:0,isDefault:!0,binding:null};if(!e||typeof e!="object")return{defaultBinding:null,agents:[t]};const s=(e.tools??{}).exec??{},i=typeof s.node=="string"&&s.node.trim()?s.node.trim():null,a=e.agents??{},o=Array.isArray(a.list)?a.list:[];if(o.length===0)return{defaultBinding:i,agents:[t]};const c=[];return o.forEach((l,u)=>{if(!l||typeof l!="object")return;const g=l,p=typeof g.id=="string"?g.id.trim():"";if(!p)return;const h=typeof g.name=="string"?g.name.trim():void 0,m=g.default===!0,A=(g.tools??{}).exec??{},C=typeof A.node=="string"&&A.node.trim()?A.node.trim():null;c.push({id:p,name:h||void 0,index:u,isDefault:m,binding:C})}),c.length===0&&c.push(t),{defaultBinding:i,agents:c}}function sb(e){const t=!!e.connected,n=!!e.paired,s=typeof e.displayName=="string"&&e.displayName.trim()||(typeof e.nodeId=="string"?e.nodeId:"unknown"),i=Array.isArray(e.caps)?e.caps:[],a=Array.isArray(e.commands)?e.commands:[];return r`
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
          ${i.slice(0,12).map(o=>r`<span class="chip">${String(o)}</span>`)}
          ${a.slice(0,8).map(o=>r`<span class="chip">${String(o)}</span>`)}
        </div>
      </div>
    </div>
  `}const Bi=[{id:"anthropic",label:"Anthropic",hint:"Claude Opus / Sonnet"},{id:"openai",label:"OpenAI",hint:"GPT-5 / GPT-5 Mini"},{id:"google",label:"Google",hint:"Gemini 3 Pro / Flash"},{id:"openrouter",label:"OpenRouter",hint:"Multi-model gateway"},{id:"xai",label:"xAI",hint:"Grok"},{id:"minimax",label:"MiniMax",hint:"M2.1"},{id:"moonshot",label:"Moonshot AI",hint:"Kimi K2.5"},{id:"qwen",label:"Qwen",hint:"Alibaba Cloud"},{id:"zai",label:"Z.AI",hint:"GLM 4.7"},{id:"copilot",label:"GitHub Copilot",hint:"GitHub device login"},{id:"ai-gateway",label:"Vercel AI Gateway",hint:"API key"},{id:"opencode-zen",label:"OpenCode Zen",hint:"Multi-model proxy"},{id:"xiaomi",label:"Xiaomi",hint:"API key"},{id:"qianfan",label:"Qianfan",hint:"API key"},{id:"synthetic",label:"Synthetic",hint:"Anthropic-compatible"},{id:"venice",label:"Venice AI",hint:"Privacy-focused"},{id:"cloudflare-ai-gateway",label:"Cloudflare AI Gateway",hint:"Cloudflare"}],zi=[{id:"telegram",label:"Telegram",icon:"✈️",difficulty:"easy",tokenLabel:"Bot Token",tokenHint:"Create a bot via @BotFather on Telegram and paste the token here."},{id:"discord",label:"Discord",icon:"🎮",difficulty:"easy",tokenLabel:"Bot Token",tokenHint:"Create an app at discord.com/developers, add a bot, and paste the token."},{id:"whatsapp",label:"WhatsApp",icon:"📱",difficulty:"medium",tokenLabel:"",tokenHint:"WhatsApp uses QR code pairing. You can configure this after setup."},{id:"slack",label:"Slack",icon:"💬",difficulty:"medium",tokenLabel:"Bot Token + App Token",tokenHint:"Create a Slack app with Socket Mode and paste both tokens."},{id:"signal",label:"Signal",icon:"🔒",difficulty:"advanced",tokenLabel:"",tokenHint:"Signal requires signal-cli linking. Configure after setup."},{id:"feishu",label:"Feishu",icon:"🐦",difficulty:"medium",tokenLabel:"App ID + App Secret",tokenHint:"Create a Feishu app and paste the credentials."},{id:"msteams",label:"MS Teams",icon:"🏢",difficulty:"advanced",tokenLabel:"",tokenHint:"Teams integration requires Azure Bot registration."},{id:"matrix",label:"Matrix",icon:"🌐",difficulty:"medium",tokenLabel:"Access Token",tokenHint:"Provide your Matrix homeserver URL and access token."}],vr={en:{easy:"Easy",medium:"Medium",advanced:"Advanced"},"zh-CN":{easy:"简单",medium:"中等",advanced:"高级"},"zh-TW":{easy:"簡單",medium:"中等",advanced:"進階"},ja:{easy:"簡単",medium:"普通",advanced:"上級"},ko:{easy:"쉬움",medium:"보통",advanced:"고급"},es:{easy:"Fácil",medium:"Medio",advanced:"Avanzado"},fr:{easy:"Facile",medium:"Moyen",advanced:"Avancé"},de:{easy:"Einfach",medium:"Mittel",advanced:"Fortgeschritten"},"pt-BR":{easy:"Fácil",medium:"Médio",advanced:"Avançado"},ru:{easy:"Легко",medium:"Средне",advanced:"Сложно"}};function ib(e,t){return vr[e]?.[t]??vr.en[t]??t}function ab(e){const t=nt(e.locale),n=zi.find(s=>s.id===e.selectedChannel);return r`
    <div class="onboarding-channel-grid">
      ${zi.map(s=>{const i=e.selectedChannel===s.id;return r`
          <button
            class="onboarding-channel-item ${i?"onboarding-channel-item--selected":""}"
            @click=${()=>e.onChannelSelect(i?null:s.id)}
          >
            <span class="onboarding-channel-item__icon">${s.icon}</span>
            <span class="onboarding-channel-item__name">${s.label}</span>
            <span class="onboarding-channel-item__difficulty">
              ${ib(e.locale,s.difficulty)}
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
  `}function ob(e){const t=nt(e.locale),n=gs.find(o=>o.value===e.locale)?.nativeLabel??e.locale,s=Bi.find(o=>o.id===e.selectedProvider)?.label??null,i=zi.find(o=>o.id===e.selectedChannel)?.label??null,a=e.loginStatus==="success"?e.loginDisplayName:null;return r`
    <div class="onboarding-confirm-hero">
      <div class="onboarding-confirm-hero__icon">🚀</div>
    </div>

    <div class="onboarding-confirm-list">
      <div class="onboarding-confirm-row">
        <span class="onboarding-confirm-row__label">${t.confirmLogin}</span>
        <span class="onboarding-confirm-row__value ${a?"":"onboarding-confirm-row__value--muted"}">
          ${a??t.confirmLoginNone}
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
  `}function rb(e){return nt(e.locale),r`
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
  `}const lb=r`
  <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
`,cb=r`
  <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
`,mr=r`
  <svg class="onboarding-login-spinner" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
`;function db(e){const t=nt(e.locale),n=e.loginStatus==="loading",s=e.loginStatus==="error",i=e.loginStatus==="success";return r`
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
                <span class="onboarding-login-btn__icon">${lb}</span>
                <span class="onboarding-login-btn__label">
                  ${n?mr:f}
                  ${t.loginWithGoogle}
                </span>
              </button>

              <button
                class="onboarding-login-btn onboarding-login-btn--github"
                @click=${e.onGithubLogin}
                ?disabled=${n}
              >
                <span class="onboarding-login-btn__icon">${cb}</span>
                <span class="onboarding-login-btn__label">
                  ${n?mr:f}
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
  `}const ub=r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,gb=r`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>`;function pb(e){const t=nt(e.locale),n=e.providerSearchQuery.toLowerCase().trim(),s=n?Bi.filter(i=>i.label.toLowerCase().includes(n)||(i.hint?.toLowerCase().includes(n)??!1)):Bi;return r`
    <!-- Search -->
    <div class="onboarding-search">
      <span class="onboarding-search__icon">${gb}</span>
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
      ${s.map(i=>{const a=e.selectedProvider===i.id;return r`
          <div
            class="onboarding-provider-item ${a?"onboarding-provider-item--selected":""}"
            @click=${()=>e.onProviderSelect(a?null:i.id)}
          >
            <div class="onboarding-provider-item__check">
              <span class="onboarding-provider-item__check-icon">${ub}</span>
            </div>
            <div class="onboarding-provider-item__info">
              <div class="onboarding-provider-item__name">${i.label}</div>
              ${i.hint?r`<div class="onboarding-provider-item__hint">${i.hint}</div>`:f}
              ${a?r`
                    <input
                      class="onboarding-provider-input"
                      type="password"
                      placeholder=${t.providerApiKeyPlaceholder}
                      .value=${e.providerApiKey}
                      @input=${o=>e.onProviderApiKeyChange(o.target.value)}
                      @click=${o=>o.stopPropagation()}
                    />
                  `:f}
            </div>
          </div>
        `})}
      ${s.length===0?r`<div style="text-align:center; padding:24px; color:var(--muted);">
            ${t.providerNoneSelected}
          </div>`:f}
    </div>
  `}const si=5;function hb(e){switch(e.step){case 1:return db(e);case 2:return rb(e);case 3:return pb(e);case 4:return ab(e);case 5:return ob(e)}}function fb(e){const t=nt(e.locale);switch(e.step){case 1:return t.loginTitle;case 2:return t.langTitle;case 3:return t.providerTitle;case 4:return t.channelTitle;case 5:return t.confirmTitle}}function vb(e){const t=nt(e.locale);switch(e.step){case 1:return t.loginSubtitle;case 2:return t.langSubtitle;case 3:return t.providerSubtitle;case 4:return t.channelSubtitle;case 5:return t.confirmSubtitle}}function mb(e){const t=nt(e.locale),n=e.step===1,s=e.step===si,i=e.step===1||e.step===3||e.step===4;return r`
    <div class="onboarding-wizard">
      <div class="onboarding-card">
        <!-- Progress bar -->
        <div class="onboarding-progress">
          ${Array.from({length:si},(a,o)=>{const c=o+1,l=c<e.step,u=c===e.step;return r`
              <div
                class="onboarding-progress__step ${l?"onboarding-progress__step--done":""} ${u?"onboarding-progress__step--active":""}"
              ></div>
            `})}
        </div>

        <!-- Header -->
        <div class="onboarding-header">
          <div class="onboarding-header__step-label">
            ${t.stepOf(e.step,si)}
          </div>
          <h2 class="onboarding-header__title">${fb(e)}</h2>
          <p class="onboarding-header__subtitle">${vb(e)}</p>
        </div>

        <!-- Body -->
        <div class="onboarding-body">
          ${hb(e)}
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
  `}function bb(e){const t=(p,h)=>z(e.locale,p,h),n=e.hello?.snapshot,s=n?.uptimeMs?Xi(n.uptimeMs):t("n/a","n/a"),i=n?.policy?.tickIntervalMs?`${n.policy.tickIntervalMs}ms`:t("n/a","n/a"),o=(e.hello?.features?.methods??[]).length,c=e.lastChannelsRefresh?J(e.lastChannelsRefresh):t("n/a","n/a"),l=(()=>{if(e.connected||!e.lastError)return null;const p=e.lastError.toLowerCase();if(!(p.includes("unauthorized")||p.includes("connect failed")))return null;const m=!!e.settings.token.trim(),v=!!e.password.trim();return!m&&!v?r`
        <div class="muted" style="margin-top: 8px">
          ${t("This gateway requires authentication. Add a token or password, then click Connect.","This gateway requires authentication. Add a token or password, then click Connect.")}
          <div style="margin-top: 6px">
            <span class="mono">opensoul dashboard --no-open</span>
            ${t("opens Control UI.","opens Control UI.")}
            <br />
            <span class="mono">opensoul doctor --generate-gateway-token</span>
            ${t("creates a token.","creates a token.")}
          </div>
          <div style="margin-top: 6px">
            <a
              class="session-link"
              href="https://docs.opensoul.ai/web/dashboard"
              target="_blank"
              rel="noreferrer"
            >
              ${t("Docs: Control UI auth","Docs: Control UI auth")}
            </a>
          </div>
        </div>
      `:r`
      <div class="muted" style="margin-top: 8px">
        ${t("Authentication failed. Update token or password and reconnect.","Authentication failed. Update token or password and reconnect.")}
        <div style="margin-top: 6px">
          <a
            class="session-link"
            href="https://docs.opensoul.ai/web/dashboard"
            target="_blank"
            rel="noreferrer"
          >
            ${t("Docs: Control UI auth","Docs: Control UI auth")}
          </a>
        </div>
      </div>
    `})(),u=(()=>{if(e.connected||!e.lastError||(typeof window<"u"?window.isSecureContext:!0))return null;const h=e.lastError.toLowerCase();return!h.includes("secure context")&&!h.includes("device identity required")?null:r`
      <div class="muted" style="margin-top: 8px">
        ${t("This page is running on HTTP. Use HTTPS (for example Tailscale Serve) or open","This page is running on HTTP. Use HTTPS (for example Tailscale Serve) or open")}
        <span class="mono">http://127.0.0.1:18789</span>
        ${t("on the gateway host.","on the gateway host.")}
        <div style="margin-top: 6px">
          ${t("If required, set","If required, set")}
          <span class="mono">gateway.controlUi.allowInsecureAuth: true</span>
          ${t("for token-only auth.","for token-only auth.")}
        </div>
      </div>
    `})(),g=(p,h,m)=>r`
      <button
        class="btn"
        style="justify-content: flex-start; width: 100%;"
        @click=${()=>e.onNavigate?.(p)}
      >
        ${m}
        <span>${h}</span>
      </button>
    `;return r`
    <section class="card">
      <div class="section-header">
        <div>
          <div class="card-title">${t("System Status","系统状态")}</div>
          <div class="card-sub">
            ${t("A quick glance at how your system is doing right now.","快速查看系统当前运行状况。")}
          </div>
        </div>
        <div class="section-header__meta">
          <button class="btn btn--sm" @click=${e.onRefresh}>${t("Refresh","刷新")}</button>
          <button class="btn btn--sm primary" @click=${e.onConnect}>
            ${e.connected?t("Reconnect","重连"):t("Connect","连接")}
          </button>
        </div>
      </div>

      <div class="page-summary-grid" style="margin-top: 18px;">
        <div class="page-summary-card">
          <div class="page-summary-label">${t("Gateway","网关")}</div>
          <div class="page-summary-value ${e.connected?"ok":"warn"}">
            ${e.connected?t("Online","在线"):t("Offline","离线")}
          </div>
          <div class="page-summary-sub">${t("Connection status","连接状态")}</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">${t("Clients","客户端")}</div>
          <div class="page-summary-value">${e.presenceCount}</div>
          <div class="page-summary-sub">${t("Active connections","活跃连接数")}</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">${t("Sessions","会话")}</div>
          <div class="page-summary-value">${e.sessionsCount??t("—","—")}</div>
          <div class="page-summary-sub">${t("Active conversations","进行中的对话")}</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">${t("Scheduler","定时任务")}</div>
          <div class="page-summary-value">
            ${e.cronEnabled==null?t("—","—"):e.cronEnabled?t("On","开启"):t("Off","关闭")}
          </div>
          <div class="page-summary-sub">${e.cronNext?`${t("Next run","下次执行")} ${va(e.cronNext)}`:t("No upcoming tasks","暂无待执行任务")}</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">${t("Channels","渠道")}</div>
          <div class="page-summary-value">${c}</div>
          <div class="page-summary-sub">${t("Last synced","上次同步")}</div>
        </div>
      </div>
    </section>

    <section class="grid grid-cols-2" style="margin-top: 20px;">
      <div class="card">
        <div class="card-title">${t("Connection Settings","连接设置")}</div>
        <div class="card-sub">
          ${t("Configure how this dashboard connects to your gateway.","配置面板如何连接到你的网关服务。")}
        </div>
        <div class="form-grid" style="margin-top: 18px;">
          <label class="field">
            <span>${t("Server URL","服务器地址")}</span>
            <input
              .value=${e.settings.gatewayUrl}
              @input=${p=>{const h=p.target.value;e.onSettingsChange({...e.settings,gatewayUrl:h})}}
              placeholder="ws://100.x.y.z:18789"
            />
          </label>
          <label class="field">
            <span>${t("Access Token","访问令牌")}</span>
            <input
              .value=${e.settings.token}
              @input=${p=>{const h=p.target.value;e.onSettingsChange({...e.settings,token:h})}}
              placeholder=${t("Paste your token here","在此粘贴令牌")}
            />
          </label>
          <label class="field">
            <span>${t("Password","密码")}</span>
            <input
              type="password"
              .value=${e.password}
              @input=${p=>{const h=p.target.value;e.onPasswordChange(h)}}
              placeholder=${t("Optional · not saved locally","可选 · 不会本地保存")}
            />
          </label>
          <label class="field">
            <span>${t("Default Session","默认会话")}</span>
            <input
              .value=${e.settings.sessionKey}
              @input=${p=>{const h=p.target.value;e.onSessionKeyChange(h)}}
              placeholder=${t("auto","自动")}
            />
          </label>
        </div>
        ${e.lastError?r`
                <div class="callout danger" style="margin-top: 16px;">
                  <div>${e.lastError}</div>
                  ${l??f}
                  ${u??f}
                </div>
              `:r`
                <div class="callout info" style="margin-top: 16px;">
                  ${t("Update values above and click Connect to apply.","修改上方配置后点击「连接」即可生效。")}
                </div>
              `}
      </div>

      <div class="card">
        <div class="card-title">${t("Quick Actions","快捷操作")}</div>
        <div class="card-sub">
          ${t("Jump to commonly used features.","快速跳转到常用功能。")}
        </div>
        <div style="margin-top: 18px; display: grid; gap: 8px;">
          ${g("chat",t("Open Chat","打开聊天"),X.messageSquare)}
          ${g("channels",t("Manage Channels","管理渠道"),X.link)}
          ${g("sessions",t("View Sessions","查看会话"),X.fileText)}
          ${g("usage",t("Track Usage","用量追踪"),X.barChart)}
          ${g("nodes",t("Devices & Nodes","设备与节点"),X.monitor)}
        </div>

        <details class="collapsible" style="margin-top: 18px;">
          <summary>${t("System Details","系统详情")}</summary>
          <div class="collapsible__body">
            <div style="display: grid; gap: 2px; margin-top: 8px;">
              <div class="detail-row">
                <span class="detail-row__label">${t("Protocol","协议")}</span>
                <span class="detail-row__value mono">${e.hello?.protocol??t("—","—")}</span>
              </div>
              <div class="detail-row">
                <span class="detail-row__label">${t("Uptime","运行时长")}</span>
                <span class="detail-row__value">${s}</span>
              </div>
              <div class="detail-row">
                <span class="detail-row__label">${t("Tick Interval","心跳间隔")}</span>
                <span class="detail-row__value mono">${i}</span>
              </div>
              <div class="detail-row">
                <span class="detail-row__label">${t("API Methods","API 方法数")}</span>
                <span class="detail-row__value">${o}</span>
              </div>
            </div>
          </div>
        </details>
      </div>
    </section>

    <details class="collapsible" style="margin-top: 20px;">
      <summary>${t("Raw Handshake Data","原始握手数据")}</summary>
      <div class="collapsible__body">
        <div class="card-sub" style="margin-top: 4px; margin-bottom: 10px;">
          ${t("For debugging — the full gateway handshake response.","调试用 — 完整的网关握手响应数据。")}
        </div>
        <pre class="code-block">${e.hello?JSON.stringify(e.hello,null,2):t("Not connected yet.","尚未连接。")}</pre>
      </div>
    </details>
  `}const yb=["","off","minimal","low","medium","high","xhigh"],xb=["","off","on"],$b=[{value:"",label:"inherit"},{value:"off",label:"off (explicit)"},{value:"on",label:"on"},{value:"full",label:"full"}],wb=["","off","on","stream"];function kb(e){if(!e)return"";const t=e.trim().toLowerCase();return t==="z.ai"||t==="z-ai"?"zai":t}function gc(e){return kb(e)==="zai"}function Sb(e){return gc(e)?xb:yb}function br(e,t){return t?e.includes(t)?[...e]:[...e,t]:[...e]}function Ab(e,t){return t?e.some(n=>n.value===t)?[...e]:[...e,{value:t,label:`${t} (custom)`}]:[...e]}function Cb(e,t){return!t||!e||e==="off"?e:"on"}function _b(e,t){return e?t&&e==="on"?"low":e:null}function Tb(e){const t=e.result?.sessions??[],n=t.filter(a=>a.kind==="global").length,s=t.length-n,i=t.filter(a=>!!(a.label?.trim()||a.thinkingLevel?.trim()||a.verboseLevel?.trim()||a.reasoningLevel?.trim())).length;return r`
    <section class="card">
      <div class="section-header">
        <div>
          <div class="card-title">Sessions · 会话管理</div>
          <div class="card-sub">View active conversations and customize behavior per session.</div>
        </div>
        <div class="section-header__meta">
          <button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?"Refreshing…":"↻ Refresh"}
          </button>
        </div>
      </div>

      <div class="page-summary-grid" style="margin-top: 18px;">
        <div class="page-summary-card">
          <div class="page-summary-label">Total · 总数</div>
          <div class="page-summary-value">${t.length}</div>
          <div class="page-summary-sub">Matching current filters</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">Scoped · 独立会话</div>
          <div class="page-summary-value">${s}</div>
          <div class="page-summary-sub">Click to open in chat</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">Global · 全局默认</div>
          <div class="page-summary-value">${n}</div>
          <div class="page-summary-sub">Shared default sessions</div>
        </div>
        <div class="page-summary-card">
          <div class="page-summary-label">Customized · 已自定义</div>
          <div class="page-summary-value">${i}</div>
          <div class="page-summary-sub">Has behavior overrides</div>
        </div>
      </div>

      <div class="filters" style="margin-top: 18px;">
        <label class="field">
          <span>Active within (min)</span>
          <input
            .value=${e.activeMinutes}
            @input=${a=>e.onFiltersChange({activeMinutes:a.target.value,limit:e.limit,includeGlobal:e.includeGlobal,includeUnknown:e.includeUnknown})}
          />
        </label>
        <label class="field">
          <span>Limit</span>
          <input
            .value=${e.limit}
            @input=${a=>e.onFiltersChange({activeMinutes:e.activeMinutes,limit:a.target.value,includeGlobal:e.includeGlobal,includeUnknown:e.includeUnknown})}
          />
        </label>
        <label class="field checkbox">
          <span>Show global</span>
          <input
            type="checkbox"
            .checked=${e.includeGlobal}
            @change=${a=>e.onFiltersChange({activeMinutes:e.activeMinutes,limit:e.limit,includeGlobal:a.target.checked,includeUnknown:e.includeUnknown})}
          />
        </label>
        <label class="field checkbox">
          <span>Show unknown</span>
          <input
            type="checkbox"
            .checked=${e.includeUnknown}
            @change=${a=>e.onFiltersChange({activeMinutes:e.activeMinutes,limit:e.limit,includeGlobal:e.includeGlobal,includeUnknown:a.target.checked})}
          />
        </label>
      </div>

      ${e.error?r`<div class="callout danger" style="margin-top: 14px;">${e.error}</div>`:f}

      ${e.result?.path?r`<details class="collapsible" style="margin-top: 12px;">
        <summary>Storage path</summary>
        <div class="mono" style="margin-top: 6px; font-size: 12px;">${e.result.path}</div>
      </details>`:f}

      <div class="table" style="margin-top: 20px;">
        <div class="table-head">
          <div>Session Key</div>
          <div>Label</div>
          <div>Kind</div>
          <div>Updated</div>
          <div>Tokens</div>
          <div>Thinking</div>
          <div>Verbose</div>
          <div>Reasoning</div>
          <div></div>
        </div>
        ${t.length===0?r`
                <div class="empty-state">
                  <div class="empty-state-icon">💬</div>
                  <div class="empty-state-title">No sessions found</div>
                  <div class="empty-state-desc">
                    Try adjusting the filters above, or start a conversation to create a session.
                  </div>
                </div>
              `:t.map(a=>Lb(a,e.basePath,e.onPatch,e.onDelete,e.loading))}
      </div>
    </section>
  `}function Lb(e,t,n,s,i){const a=e.updatedAt?J(e.updatedAt):"—",o=e.thinkingLevel??"",c=gc(e.modelProvider),l=Cb(o,c),u=br(Sb(e.modelProvider),l),g=e.verboseLevel??"",p=Ab($b,g),h=e.reasoningLevel??"",m=br(wb,h),v=typeof e.displayName=="string"&&e.displayName.trim().length>0?e.displayName.trim():null,A=typeof e.label=="string"?e.label.trim():"",C=!!(v&&v!==e.key&&v!==A),S=e.kind!=="global",d=S?`${ps("chat",t)}?session=${encodeURIComponent(e.key)}`:null;return r`
    <div class="table-row">
      <div class="mono session-key-cell">
        ${S?r`<a href=${d} class="session-link">${e.key}</a>`:e.key}
        ${C?r`<span class="muted session-key-display-name">${v}</span>`:f}
      </div>
      <div>
        <input
          .value=${e.label??""}
          ?disabled=${i}
          placeholder="Add label…"
          @change=${b=>{const y=b.target.value.trim();n(e.key,{label:y||null})}}
        />
      </div>
      <div>${e.kind}</div>
      <div>${a}</div>
      <div>${Pp(e)}</div>
      <div>
        <select
          ?disabled=${i}
          @change=${b=>{const y=b.target.value;n(e.key,{thinkingLevel:_b(y,c)})}}
        >
          ${u.map(b=>r`<option value=${b} ?selected=${l===b}>
                ${b||"inherit"}
              </option>`)}
        </select>
      </div>
      <div>
        <select
          ?disabled=${i}
          @change=${b=>{const y=b.target.value;n(e.key,{verboseLevel:y||null})}}
        >
          ${p.map(b=>r`<option value=${b.value} ?selected=${g===b.value}>
                ${b.label}
              </option>`)}
        </select>
      </div>
      <div>
        <select
          ?disabled=${i}
          @change=${b=>{const y=b.target.value;n(e.key,{reasoningLevel:y||null})}}
        >
          ${m.map(b=>r`<option value=${b} ?selected=${h===b}>
                ${b||"inherit"}
              </option>`)}
        </select>
      </div>
      <div>
        <button class="btn danger" ?disabled=${i} @click=${()=>s(e.key)}>
          Delete
        </button>
      </div>
    </div>
  `}const Eb=[{id:"general",icon:"settings"},{id:"config",icon:"settings"},{id:"logs",icon:"scrollText"},{id:"debug",icon:"bug"}];function yr(e,t){const n=(s,i)=>z(e.uiLocale,s,i);switch(t){case"general":return{label:n("General","通用"),description:n("Personal preferences and language.","个性化你的界面偏好和语言。")};case"config":return{label:n("Config","配置"),description:n("Organized configuration with section-based editing.","分区组织的配置，不再一屏信息压倒你。")};case"logs":return{label:n("Logs","日志"),description:n("Readable runtime logs for troubleshooting.","易于阅读的运行日志，方便快速排查问题。")};case"debug":return{label:n("Debug","调试"),description:n("System diagnostics and advanced gateway tools.","系统诊断及高级网关调试工具。")};default:return{label:t,description:""}}}function Ib(e){const t=(i,a)=>z(e.uiLocale,i,a),n=Qn(e.uiLocale),s=i=>{const a=i.currentTarget;if(!a)return;const o=Qn(a.value);e.setUiLocale(o)};return r`
    <section class="settings-page settings-page--general">
      <header class="settings-page__header settings-page__header--compact">
        <div>
          <h3 class="settings-page__title">${t("Personalization","个性化")}</h3>
          <p class="settings-page__desc">
            ${t("Tune appearance and language to match your daily workflow.","调整你的外观和语言，让工作流更加自然。")}
          </p>
        </div>
      </header>

      <div class="settings-surface">
        <h4 class="settings-section__title">${t("Appearance","外观")}</h4>
        <div class="settings-section__row">
          <div class="settings-section__row-info">
            <span class="settings-section__row-label">${t("Theme","主题")}</span>
            <span class="settings-section__row-desc">
              ${t("Choose light, dark, or follow your system preference.","可选择浅色、深色或跟随系统外观。")}
            </span>
          </div>
          <div class="settings-section__row-control">
            ${bp(e)}
          </div>
        </div>

        <h4 class="settings-section__title settings-section__title--spaced">
          ${t("Language","语言")}
        </h4>
        <div class="settings-section__row">
          <div class="settings-section__row-info">
            <span class="settings-section__row-label">${t("System language","系统语言")}</span>
            <span class="settings-section__row-desc">
              ${t("Uses the same options as onboarding and applies immediately.","与引导页保持一致，切换后立即生效。")}
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
      </div>

      <div class="settings-surface settings-surface--subtle">
        <h4 class="settings-section__title">${t("Resources","资源")}</h4>
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
    </section>
  `}function Mb(e,t){if(!e.settingsOpen)return f;const n=(c,l)=>z(e.uiLocale,c,l),s=c=>{switch(c){case"general":return n("General","通用");case"config":return n("Config","配置");case"logs":return n("Logs","日志");case"debug":return n("Debug","调试");default:return c}},i=e.settingsSection,a=yr(e,i);return r`
    <div class="settings-backdrop" @click=${()=>e.closeSettings()}></div>

    <div class="settings-panel" @keydown=${c=>{c.key==="Escape"&&(c.stopPropagation(),e.closeSettings())}} tabindex="-1">
      <div class="settings-panel__header">
        <div class="settings-panel__header-main">
          <h2 class="settings-panel__title">${n("Settings","设置")}</h2>
          <p class="settings-panel__subtitle">${a.description}</p>
        </div>
        <div class="settings-panel__header-actions">
          <span class="settings-kbd" aria-hidden="true">Esc</span>
          <button
            class="settings-panel__close"
            @click=${()=>e.closeSettings()}
            title=${n("Close settings","关闭设置")}
            aria-label=${n("Close settings","关闭设置")}
          >
            ${X.x}
          </button>
        </div>
      </div>

      <div class="settings-panel__body">
        <nav class="settings-panel__nav">
          ${Eb.map(c=>{const l=yr(e,c.id);return r`
              <button
                class="settings-nav-item ${i===c.id?"active":""}"
                @click=${()=>e.setSettingsSection(c.id)}
                title=${l.description}
              >
                <span class="settings-nav-item__icon">${X[c.icon]}</span>
                <span class="settings-nav-item__text">${s(c.id)}</span>
              </button>
            `})}
        </nav>

        <div class="settings-panel__content">
          ${i==="general"?Ib(e):f}
          ${i==="config"?t.config:f}
          ${i==="logs"?t.logs:f}
          ${i==="debug"?t.debug:f}
        </div>
      </div>
    </div>
  `}const Dn=[{id:"workspace",label:"Workspace Skills",sources:["opensoul-workspace"]},{id:"built-in",label:"Built-in Skills",sources:["opensoul-bundled"]},{id:"installed",label:"Installed Skills",sources:["opensoul-managed"]},{id:"extra",label:"Extra Skills",sources:["opensoul-extra"]}];function Rb(e){const t=new Map;for(const a of Dn)t.set(a.id,{id:a.id,label:a.label,skills:[]});const n=Dn.find(a=>a.id==="built-in"),s={id:"other",label:"Other Skills",skills:[]};for(const a of e){const o=a.bundled?n:Dn.find(c=>c.sources.includes(a.source));o?t.get(o.id)?.skills.push(a):s.skills.push(a)}const i=Dn.map(a=>t.get(a.id)).filter(a=>!!(a&&a.skills.length>0));return s.skills.length>0&&i.push(s),i}function Pb(e){const t=e.report?.skills??[],n=e.filter.trim().toLowerCase(),s=n?t.filter(a=>[a.name,a.description,a.source].join(" ").toLowerCase().includes(n)):t,i=Rb(s);return r`
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
            @input=${a=>e.onFilterChange(a.target.value)}
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
              ${i.map(a=>{const o=a.id==="workspace"||a.id==="built-in";return r`
                  <details class="agent-skills-group" ?open=${!o}>
                    <summary class="agent-skills-header">
                      <span>${a.label}</span>
                      <span class="muted">${a.skills.length}</span>
                    </summary>
                    <div class="list skills-grid">
                      ${a.skills.map(c=>Db(c,e))}
                    </div>
                  </details>
                `})}
            </div>
          `}
    </section>
  `}function Db(e,t){const n=t.busyKey===e.skillKey,s=t.edits[e.skillKey]??"",i=t.messages[e.skillKey]??null,a=e.install.length>0&&e.missing.bins.length>0,o=!!(e.bundled&&e.source!=="opensoul-bundled"),c=[...e.missing.bins.map(u=>`bin:${u}`),...e.missing.env.map(u=>`env:${u}`),...e.missing.config.map(u=>`config:${u}`),...e.missing.os.map(u=>`os:${u}`)],l=[];return e.disabled&&l.push("disabled"),e.blockedByAllowlist&&l.push("blocked by allowlist"),r`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">
          ${e.emoji?`${e.emoji} `:""}${e.name}
        </div>
        <div class="list-sub">${ui(e.description,140)}</div>
        <div class="chip-row" style="margin-top: 6px;">
          <span class="chip">${e.source}</span>
          ${o?r`
                  <span class="chip">bundled</span>
                `:f}
          <span class="chip ${e.eligible?"chip-ok":"chip-warn"}">
            ${e.eligible?"eligible":"blocked"}
          </span>
          ${e.disabled?r`
                  <span class="chip chip-warn">disabled</span>
                `:f}
        </div>
        ${c.length>0?r`
              <div class="muted" style="margin-top: 6px;">
                Missing: ${c.join(", ")}
              </div>
            `:f}
        ${l.length>0?r`
              <div class="muted" style="margin-top: 6px;">
                Reason: ${l.join(", ")}
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
          ${a?r`<button
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
  `}const Nb=new Set(["agent","channel","chat","provider","model","tool","label","key","session","id","has","mintokens","maxtokens","mincost","maxcost","minmessages","maxmessages"]),ns=e=>e.trim().toLowerCase(),Fb=e=>{const t=e.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*").replace(/\?/g,".");return new RegExp(`^${t}$`,"i")},ut=e=>{let t=e.trim().toLowerCase();if(!t)return null;t.startsWith("$")&&(t=t.slice(1));let n=1;t.endsWith("k")?(n=1e3,t=t.slice(0,-1)):t.endsWith("m")&&(n=1e6,t=t.slice(0,-1));const s=Number(t);return Number.isFinite(s)?s*n:null},La=e=>(e.match(/"[^"]+"|\S+/g)??[]).map(n=>{const s=n.replace(/^"|"$/g,""),i=s.indexOf(":");if(i>0){const a=s.slice(0,i),o=s.slice(i+1);return{key:a,value:o,raw:s}}return{value:s,raw:s}}),Ob=e=>[e.label,e.key,e.sessionId].filter(n=>!!n).map(n=>n.toLowerCase()),xr=e=>{const t=new Set;e.modelProvider&&t.add(e.modelProvider.toLowerCase()),e.providerOverride&&t.add(e.providerOverride.toLowerCase()),e.origin?.provider&&t.add(e.origin.provider.toLowerCase());for(const n of e.usage?.modelUsage??[])n.provider&&t.add(n.provider.toLowerCase());return Array.from(t)},$r=e=>{const t=new Set;e.model&&t.add(e.model.toLowerCase());for(const n of e.usage?.modelUsage??[])n.model&&t.add(n.model.toLowerCase());return Array.from(t)},Bb=e=>(e.usage?.toolUsage?.tools??[]).map(t=>t.name.toLowerCase()),zb=(e,t)=>{const n=ns(t.value??"");if(!n)return!0;if(!t.key)return Ob(e).some(i=>i.includes(n));switch(ns(t.key)){case"agent":return e.agentId?.toLowerCase().includes(n)??!1;case"channel":return e.channel?.toLowerCase().includes(n)??!1;case"chat":return e.chatType?.toLowerCase().includes(n)??!1;case"provider":return xr(e).some(i=>i.includes(n));case"model":return $r(e).some(i=>i.includes(n));case"tool":return Bb(e).some(i=>i.includes(n));case"label":return e.label?.toLowerCase().includes(n)??!1;case"key":case"session":case"id":if(n.includes("*")||n.includes("?")){const i=Fb(n);return i.test(e.key)||(e.sessionId?i.test(e.sessionId):!1)}return e.key.toLowerCase().includes(n)||(e.sessionId?.toLowerCase().includes(n)??!1);case"has":switch(n){case"tools":return(e.usage?.toolUsage?.totalCalls??0)>0;case"errors":return(e.usage?.messageCounts?.errors??0)>0;case"context":return!!e.contextWeight;case"usage":return!!e.usage;case"model":return $r(e).length>0;case"provider":return xr(e).length>0;default:return!0}case"mintokens":{const i=ut(n);return i===null?!0:(e.usage?.totalTokens??0)>=i}case"maxtokens":{const i=ut(n);return i===null?!0:(e.usage?.totalTokens??0)<=i}case"mincost":{const i=ut(n);return i===null?!0:(e.usage?.totalCost??0)>=i}case"maxcost":{const i=ut(n);return i===null?!0:(e.usage?.totalCost??0)<=i}case"minmessages":{const i=ut(n);return i===null?!0:(e.usage?.messageCounts?.total??0)>=i}case"maxmessages":{const i=ut(n);return i===null?!0:(e.usage?.messageCounts?.total??0)<=i}default:return!0}},Ub=(e,t)=>{const n=La(t);if(n.length===0)return{sessions:e,warnings:[]};const s=[];for(const a of n){if(!a.key)continue;const o=ns(a.key);if(!Nb.has(o)){s.push(`Unknown filter: ${a.key}`);continue}if(a.value===""&&s.push(`Missing value for ${a.key}`),o==="has"){const c=new Set(["tools","errors","context","usage","model","provider"]);a.value&&!c.has(ns(a.value))&&s.push(`Unknown has:${a.value}`)}["mintokens","maxtokens","mincost","maxcost","minmessages","maxmessages"].includes(o)&&a.value&&ut(a.value)===null&&s.push(`Invalid number for ${a.key}`)}return{sessions:e.filter(a=>n.every(o=>zb(a,o))),warnings:s}};function Hb(e){const t=e.split(`
`),n=new Map,s=[];for(const c of t){const l=/^\[Tool:\s*([^\]]+)\]/.exec(c.trim());if(l){const u=l[1];n.set(u,(n.get(u)??0)+1);continue}c.trim().startsWith("[Tool Result]")||s.push(c)}const i=Array.from(n.entries()).toSorted((c,l)=>l[1]-c[1]),a=i.reduce((c,[,l])=>c+l,0),o=i.length>0?`Tools: ${i.map(([c,l])=>`${c}×${l}`).join(", ")} (${a} calls)`:"";return{tools:i,summary:o,cleanContent:s.join(`
`).trim()}}const Kb=`
  .usage-page {
    --usage-accent: var(--info);
    --usage-accent-hover: color-mix(in srgb, var(--info) 86%, black);
    --usage-accent-soft: color-mix(in srgb, var(--info) 14%, transparent);
  }
  .usage-page-header {
    margin: 4px 0 12px;
  }
  .usage-page-title {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 6px;
  }
  .usage-page-subtitle {
    font-size: 13px;
    color: var(--text-muted);
    margin: 0 0 16px;
    line-height: 1.5;
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
    background: var(--usage-accent);
    color: #fff;
    border-color: var(--usage-accent);
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.12);
  }
  .btn.usage-primary-btn {
    background: var(--usage-accent) !important;
    border-color: var(--usage-accent) !important;
    color: #fff !important;
  }
  .usage-primary-btn:hover {
    background: var(--usage-accent-hover);
    border-color: var(--usage-accent-hover);
  }
  .btn.usage-primary-btn:hover {
    background: var(--usage-accent-hover) !important;
    border-color: var(--usage-accent-hover) !important;
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
    background: var(--usage-accent);
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
    background: var(--usage-accent);
    border-radius: 3px 3px 0 0;
    min-height: 2px;
    transition: all 0.15s;
    overflow: hidden;
  }
  .daily-bar-wrapper:hover .daily-bar {
    background: var(--usage-accent-hover);
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
`,jb=4;function ct(e){return Math.round(e/jb)}function U(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}K`:String(e)}function Wb(e){const t=new Date;return t.setHours(e,0,0,0),t.toLocaleTimeString(void 0,{hour:"numeric"})}function Gb(e,t){const n=Array.from({length:24},()=>0),s=Array.from({length:24},()=>0);for(const i of e){const a=i.usage;if(!a?.messageCounts||a.messageCounts.total===0)continue;const o=a.firstActivity??i.updatedAt,c=a.lastActivity??i.updatedAt;if(!o||!c)continue;const l=Math.min(o,c),u=Math.max(o,c),p=Math.max(u-l,1)/6e4;let h=l;for(;h<u;){const m=new Date(h),v=Ea(m,t),A=Ia(m,t),C=Math.min(A.getTime(),u),d=Math.max((C-h)/6e4,0)/p;n[v]+=a.messageCounts.errors*d,s[v]+=a.messageCounts.total*d,h=C+1}}return s.map((i,a)=>{const o=n[a],c=i>0?o/i:0;return{hour:a,rate:c,errors:o,msgs:i}}).filter(i=>i.msgs>0&&i.errors>0).toSorted((i,a)=>a.rate-i.rate).slice(0,5).map(i=>({label:Wb(i.hour),value:`${(i.rate*100).toFixed(2)}%`,sub:`${Math.round(i.errors)} errors · ${Math.round(i.msgs)} msgs`}))}const qb=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];function Ea(e,t){return t==="utc"?e.getUTCHours():e.getHours()}function Vb(e,t){return t==="utc"?e.getUTCDay():e.getDay()}function Ia(e,t){const n=new Date(e);return t==="utc"?n.setUTCMinutes(59,59,999):n.setMinutes(59,59,999),n}function Qb(e,t){const n=Array.from({length:24},()=>0),s=Array.from({length:7},()=>0);let i=0,a=!1;for(const c of e){const l=c.usage;if(!l||!l.totalTokens||l.totalTokens<=0)continue;i+=l.totalTokens;const u=l.firstActivity??c.updatedAt,g=l.lastActivity??c.updatedAt;if(!u||!g)continue;a=!0;const p=Math.min(u,g),h=Math.max(u,g),v=Math.max(h-p,1)/6e4;let A=p;for(;A<h;){const C=new Date(A),S=Ea(C,t),d=Vb(C,t),b=Ia(C,t),y=Math.min(b.getTime(),h),L=Math.max((y-A)/6e4,0)/v;n[S]+=l.totalTokens*L,s[d]+=l.totalTokens*L,A=y+1}}const o=qb.map((c,l)=>({label:c,tokens:s[l]}));return{hasData:a,totalTokens:i,hourTotals:n,weekdayTotals:o}}function Yb(e,t,n,s){const i=Qb(e,t);if(!i.hasData)return r`
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
    `;const a=Math.max(...i.hourTotals,1),o=Math.max(...i.weekdayTotals.map(c=>c.tokens),1);return r`
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
            ${i.weekdayTotals.map(c=>{const l=Math.min(c.tokens/o,1),u=c.tokens>0?`rgba(255, 77, 77, ${.12+l*.6})`:"transparent";return r`
                <div class="usage-daypart-cell" style="background: ${u};">
                  <div class="usage-daypart-label">${c.label}</div>
                  <div class="usage-daypart-value">${U(c.tokens)}</div>
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
            ${i.hourTotals.map((c,l)=>{const u=Math.min(c/a,1),g=c>0?`rgba(255, 77, 77, ${.08+u*.7})`:"transparent",p=`${l}:00 · ${U(c)} tokens`,h=u>.7?"rgba(255, 77, 77, 0.6)":"rgba(255, 77, 77, 0.2)",m=n.includes(l);return r`
                <div
                  class="usage-hour-cell ${m?"selected":""}"
                  style="background: ${g}; border-color: ${h};"
                  title="${p}"
                  @click=${v=>s(l,v.shiftKey)}
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
  `}function Y(e,t=2){return`$${e.toFixed(t)}`}function ii(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function pc(e){const t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!t)return null;const[,n,s,i]=t,a=new Date(Date.UTC(Number(n),Number(s)-1,Number(i)));return Number.isNaN(a.valueOf())?null:a}function hc(e){const t=pc(e);return t?t.toLocaleDateString(void 0,{month:"short",day:"numeric"}):e}function Zb(e){const t=pc(e);return t?t.toLocaleDateString(void 0,{month:"long",day:"numeric",year:"numeric"}):e}function ai(e,t,n="text/plain"){const s=new Blob([t],{type:n}),i=URL.createObjectURL(s),a=document.createElement("a");a.href=i,a.download=e,a.click(),URL.revokeObjectURL(i)}function Jb(e){return e.includes('"')||e.includes(",")||e.includes(`
`)?`"${e.replace(/"/g,'""')}"`:e}function ss(e){return e.map(t=>t==null?"":Jb(String(t))).join(",")}const Nn=()=>({input:0,output:0,cacheRead:0,cacheWrite:0,totalTokens:0,totalCost:0,inputCost:0,outputCost:0,cacheReadCost:0,cacheWriteCost:0,missingCostEntries:0}),Fn=(e,t)=>{e.input+=t.input??0,e.output+=t.output??0,e.cacheRead+=t.cacheRead??0,e.cacheWrite+=t.cacheWrite??0,e.totalTokens+=t.totalTokens??0,e.totalCost+=t.totalCost??0,e.inputCost+=t.inputCost??0,e.outputCost+=t.outputCost??0,e.cacheReadCost+=t.cacheReadCost??0,e.cacheWriteCost+=t.cacheWriteCost??0,e.missingCostEntries+=t.missingCostEntries??0},Xb=(e,t)=>{if(e.length===0)return t??{messages:{total:0,user:0,assistant:0,toolCalls:0,toolResults:0,errors:0},tools:{totalCalls:0,uniqueTools:0,tools:[]},byModel:[],byProvider:[],byAgent:[],byChannel:[],daily:[]};const n={total:0,user:0,assistant:0,toolCalls:0,toolResults:0,errors:0},s=new Map,i=new Map,a=new Map,o=new Map,c=new Map,l=new Map,u=new Map,g=new Map,p={count:0,sum:0,min:Number.POSITIVE_INFINITY,max:0,p95Max:0};for(const h of e){const m=h.usage;if(m){if(m.messageCounts&&(n.total+=m.messageCounts.total,n.user+=m.messageCounts.user,n.assistant+=m.messageCounts.assistant,n.toolCalls+=m.messageCounts.toolCalls,n.toolResults+=m.messageCounts.toolResults,n.errors+=m.messageCounts.errors),m.toolUsage)for(const v of m.toolUsage.tools)s.set(v.name,(s.get(v.name)??0)+v.count);if(m.modelUsage)for(const v of m.modelUsage){const A=`${v.provider??"unknown"}::${v.model??"unknown"}`,C=i.get(A)??{provider:v.provider,model:v.model,count:0,totals:Nn()};C.count+=v.count,Fn(C.totals,v.totals),i.set(A,C);const S=v.provider??"unknown",d=a.get(S)??{provider:v.provider,model:void 0,count:0,totals:Nn()};d.count+=v.count,Fn(d.totals,v.totals),a.set(S,d)}if(m.latency){const{count:v,avgMs:A,minMs:C,maxMs:S,p95Ms:d}=m.latency;v>0&&(p.count+=v,p.sum+=A*v,p.min=Math.min(p.min,C),p.max=Math.max(p.max,S),p.p95Max=Math.max(p.p95Max,d))}if(h.agentId){const v=o.get(h.agentId)??Nn();Fn(v,m),o.set(h.agentId,v)}if(h.channel){const v=c.get(h.channel)??Nn();Fn(v,m),c.set(h.channel,v)}for(const v of m.dailyBreakdown??[]){const A=l.get(v.date)??{date:v.date,tokens:0,cost:0,messages:0,toolCalls:0,errors:0};A.tokens+=v.tokens,A.cost+=v.cost,l.set(v.date,A)}for(const v of m.dailyMessageCounts??[]){const A=l.get(v.date)??{date:v.date,tokens:0,cost:0,messages:0,toolCalls:0,errors:0};A.messages+=v.total,A.toolCalls+=v.toolCalls,A.errors+=v.errors,l.set(v.date,A)}for(const v of m.dailyLatency??[]){const A=u.get(v.date)??{date:v.date,count:0,sum:0,min:Number.POSITIVE_INFINITY,max:0,p95Max:0};A.count+=v.count,A.sum+=v.avgMs*v.count,A.min=Math.min(A.min,v.minMs),A.max=Math.max(A.max,v.maxMs),A.p95Max=Math.max(A.p95Max,v.p95Ms),u.set(v.date,A)}for(const v of m.dailyModelUsage??[]){const A=`${v.date}::${v.provider??"unknown"}::${v.model??"unknown"}`,C=g.get(A)??{date:v.date,provider:v.provider,model:v.model,tokens:0,cost:0,count:0};C.tokens+=v.tokens,C.cost+=v.cost,C.count+=v.count,g.set(A,C)}}}return{messages:n,tools:{totalCalls:Array.from(s.values()).reduce((h,m)=>h+m,0),uniqueTools:s.size,tools:Array.from(s.entries()).map(([h,m])=>({name:h,count:m})).toSorted((h,m)=>m.count-h.count)},byModel:Array.from(i.values()).toSorted((h,m)=>m.totals.totalCost-h.totals.totalCost),byProvider:Array.from(a.values()).toSorted((h,m)=>m.totals.totalCost-h.totals.totalCost),byAgent:Array.from(o.entries()).map(([h,m])=>({agentId:h,totals:m})).toSorted((h,m)=>m.totals.totalCost-h.totals.totalCost),byChannel:Array.from(c.entries()).map(([h,m])=>({channel:h,totals:m})).toSorted((h,m)=>m.totals.totalCost-h.totals.totalCost),latency:p.count>0?{count:p.count,avgMs:p.sum/p.count,minMs:p.min===Number.POSITIVE_INFINITY?0:p.min,maxMs:p.max,p95Ms:p.p95Max}:void 0,dailyLatency:Array.from(u.values()).map(h=>({date:h.date,count:h.count,avgMs:h.count?h.sum/h.count:0,minMs:h.min===Number.POSITIVE_INFINITY?0:h.min,maxMs:h.max,p95Ms:h.p95Max})).toSorted((h,m)=>h.date.localeCompare(m.date)),modelDaily:Array.from(g.values()).toSorted((h,m)=>h.date.localeCompare(m.date)||m.cost-h.cost),daily:Array.from(l.values()).toSorted((h,m)=>h.date.localeCompare(m.date))}},ey=(e,t,n)=>{let s=0,i=0;for(const g of e){const p=g.usage?.durationMs??0;p>0&&(s+=p,i+=1)}const a=i?s/i:0,o=t&&s>0?t.totalTokens/(s/6e4):void 0,c=t&&s>0?t.totalCost/(s/6e4):void 0,l=n.messages.total?n.messages.errors/n.messages.total:0,u=n.daily.filter(g=>g.messages>0&&g.errors>0).map(g=>({date:g.date,errors:g.errors,messages:g.messages,rate:g.errors/g.messages})).toSorted((g,p)=>p.rate-g.rate||p.errors-g.errors)[0];return{durationSumMs:s,durationCount:i,avgDurationMs:a,throughputTokensPerMin:o,throughputCostPerMin:c,errorRate:l,peakErrorDay:u}},ty=e=>{const t=[ss(["key","label","agentId","channel","provider","model","updatedAt","durationMs","messages","errors","toolCalls","inputTokens","outputTokens","cacheReadTokens","cacheWriteTokens","totalTokens","totalCost"])];for(const n of e){const s=n.usage;t.push(ss([n.key,n.label??"",n.agentId??"",n.channel??"",n.modelProvider??n.providerOverride??"",n.model??n.modelOverride??"",n.updatedAt?new Date(n.updatedAt).toISOString():"",s?.durationMs??"",s?.messageCounts?.total??"",s?.messageCounts?.errors??"",s?.messageCounts?.toolCalls??"",s?.input??"",s?.output??"",s?.cacheRead??"",s?.cacheWrite??"",s?.totalTokens??"",s?.totalCost??""]))}return t.join(`
`)},ny=e=>{const t=[ss(["date","inputTokens","outputTokens","cacheReadTokens","cacheWriteTokens","totalTokens","inputCost","outputCost","cacheReadCost","cacheWriteCost","totalCost"])];for(const n of e)t.push(ss([n.date,n.input,n.output,n.cacheRead,n.cacheWrite,n.totalTokens,n.inputCost??"",n.outputCost??"",n.cacheReadCost??"",n.cacheWriteCost??"",n.totalCost]));return t.join(`
`)},sy=(e,t,n)=>{const s=e.trim();if(!s)return[];const i=s.length?s.split(/\s+/):[],a=i.length?i[i.length-1]:"",[o,c]=a.includes(":")?[a.slice(0,a.indexOf(":")),a.slice(a.indexOf(":")+1)]:["",""],l=o.toLowerCase(),u=c.toLowerCase(),g=d=>{const b=new Set;for(const y of d)y&&b.add(y);return Array.from(b)},p=g(t.map(d=>d.agentId)).slice(0,6),h=g(t.map(d=>d.channel)).slice(0,6),m=g([...t.map(d=>d.modelProvider),...t.map(d=>d.providerOverride),...n?.byProvider.map(d=>d.provider)??[]]).slice(0,6),v=g([...t.map(d=>d.model),...n?.byModel.map(d=>d.model)??[]]).slice(0,6),A=g(n?.tools.tools.map(d=>d.name)??[]).slice(0,6);if(!l)return[{label:"agent:",value:"agent:"},{label:"channel:",value:"channel:"},{label:"provider:",value:"provider:"},{label:"model:",value:"model:"},{label:"tool:",value:"tool:"},{label:"has:errors",value:"has:errors"},{label:"has:tools",value:"has:tools"},{label:"minTokens:",value:"minTokens:"},{label:"maxCost:",value:"maxCost:"}];const C=[],S=(d,b)=>{for(const y of b)(!u||y.toLowerCase().includes(u))&&C.push({label:`${d}:${y}`,value:`${d}:${y}`})};switch(l){case"agent":S("agent",p);break;case"channel":S("channel",h);break;case"provider":S("provider",m);break;case"model":S("model",v);break;case"tool":S("tool",A);break;case"has":["errors","tools","context","usage","model","provider"].forEach(d=>{(!u||d.includes(u))&&C.push({label:`has:${d}`,value:`has:${d}`})});break}return C},iy=(e,t)=>{const n=e.trim();if(!n)return`${t} `;const s=n.split(/\s+/);return s[s.length-1]=t,`${s.join(" ")} `},gt=e=>e.trim().toLowerCase(),ay=(e,t)=>{const n=e.trim();if(!n)return`${t} `;const s=n.split(/\s+/),i=s[s.length-1]??"",a=t.includes(":")?t.split(":")[0]:null,o=i.includes(":")?i.split(":")[0]:null;return i.endsWith(":")&&a&&o===a?(s[s.length-1]=t,`${s.join(" ")} `):s.includes(t)?`${s.join(" ")} `:`${s.join(" ")} ${t} `},wr=(e,t)=>{const s=e.trim().split(/\s+/).filter(Boolean).filter(i=>i!==t);return s.length?`${s.join(" ")} `:""},kr=(e,t,n)=>{const s=gt(t),a=[...La(e).filter(o=>gt(o.key??"")!==s).map(o=>o.raw),...n.map(o=>`${t}:${o}`)];return a.length?`${a.join(" ")} `:""};function he(e,t){return t===0?0:e/t*100}function oy(e){const t=e.totalCost||0;return{input:{tokens:e.input,cost:e.inputCost||0,pct:he(e.inputCost||0,t)},output:{tokens:e.output,cost:e.outputCost||0,pct:he(e.outputCost||0,t)},cacheRead:{tokens:e.cacheRead,cost:e.cacheReadCost||0,pct:he(e.cacheReadCost||0,t)},cacheWrite:{tokens:e.cacheWrite,cost:e.cacheWriteCost||0,pct:he(e.cacheWriteCost||0,t)},totalCost:t}}function ry(e,t,n,s,i,a,o,c){if(!(e.length>0||t.length>0||n.length>0))return f;const u=n.length===1?s.find(v=>v.key===n[0]):null,g=u?(u.label||u.key).slice(0,20)+((u.label||u.key).length>20?"…":""):n.length===1?n[0].slice(0,8)+"…":`${n.length} sessions`,p=u?u.label||u.key:n.length===1?n[0]:n.join(", "),h=e.length===1?e[0]:`${e.length} days`,m=t.length===1?`${t[0]}:00`:`${t.length} hours`;return r`
    <div class="active-filters">
      ${e.length>0?r`
            <div class="filter-chip">
              <span class="filter-chip-label">Days: ${h}</span>
              <button class="filter-chip-remove" @click=${i} title="Remove filter">×</button>
            </div>
          `:f}
      ${t.length>0?r`
            <div class="filter-chip">
              <span class="filter-chip-label">Hours: ${m}</span>
              <button class="filter-chip-remove" @click=${a} title="Remove filter">×</button>
            </div>
          `:f}
      ${n.length>0?r`
            <div class="filter-chip" title="${p}">
              <span class="filter-chip-label">Session: ${g}</span>
              <button class="filter-chip-remove" @click=${o} title="Remove filter">×</button>
            </div>
          `:f}
      ${(e.length>0||t.length>0)&&n.length>0?r`
            <button class="btn btn-sm filter-clear-btn" @click=${c}>
              Clear All
            </button>
          `:f}
    </div>
  `}function ly(e,t,n,s,i,a){if(!e.length)return r`
      <div class="daily-chart-compact">
        <div class="sessions-panel-title">Daily Usage</div>
        <div class="muted" style="padding: 20px; text-align: center">No data</div>
      </div>
    `;const o=n==="tokens",c=e.map(p=>o?p.totalTokens:p.totalCost),l=Math.max(...c,o?1:1e-4),u=e.length>30?12:e.length>20?18:e.length>14?24:32,g=e.length<=14;return r`
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
        <div class="card-title">Daily ${o?"Token":"Cost"} Usage</div>
      </div>
      <div class="daily-chart">
        <div class="daily-chart-bars" style="--bar-max-width: ${u}px">
          ${e.map((p,h)=>{const v=c[h]/l*100,A=t.includes(p.date),C=hc(p.date),S=e.length>20?String(parseInt(p.date.slice(8),10)):C,d=e.length>20?"font-size: 8px":"",b=s==="by-type"?o?[{value:p.output,class:"output"},{value:p.input,class:"input"},{value:p.cacheWrite,class:"cache-write"},{value:p.cacheRead,class:"cache-read"}]:[{value:p.outputCost??0,class:"output"},{value:p.inputCost??0,class:"input"},{value:p.cacheWriteCost??0,class:"cache-write"},{value:p.cacheReadCost??0,class:"cache-read"}]:[],y=s==="by-type"?o?[`Output ${U(p.output)}`,`Input ${U(p.input)}`,`Cache write ${U(p.cacheWrite)}`,`Cache read ${U(p.cacheRead)}`]:[`Output ${Y(p.outputCost??0)}`,`Input ${Y(p.inputCost??0)}`,`Cache write ${Y(p.cacheWriteCost??0)}`,`Cache read ${Y(p.cacheReadCost??0)}`]:[],_=o?U(p.totalTokens):Y(p.totalCost);return r`
              <div
                class="daily-bar-wrapper ${A?"selected":""}"
                @click=${L=>a(p.date,L.shiftKey)}
              >
                ${s==="by-type"?r`
                        <div
                          class="daily-bar"
                          style="height: ${v.toFixed(1)}%; display: flex; flex-direction: column;"
                        >
                          ${(()=>{const L=b.reduce((E,T)=>E+T.value,0)||1;return b.map(E=>r`
                                <div
                                  class="cost-segment ${E.class}"
                                  style="height: ${E.value/L*100}%"
                                ></div>
                              `)})()}
                        </div>
                      `:r`
                        <div class="daily-bar" style="height: ${v.toFixed(1)}%"></div>
                      `}
                ${g?r`<div class="daily-bar-total">${_}</div>`:f}
                <div class="daily-bar-label" style="${d}">${S}</div>
                <div class="daily-bar-tooltip">
                  <strong>${Zb(p.date)}</strong><br />
                  ${U(p.totalTokens)} tokens<br />
                  ${Y(p.totalCost)}
                  ${y.length?r`${y.map(L=>r`<div>${L}</div>`)}`:f}
                </div>
              </div>
            `})}
        </div>
      </div>
    </div>
  `}function cy(e,t){const n=oy(e),s=t==="tokens",i=e.totalTokens||1,a={output:he(e.output,i),input:he(e.input,i),cacheWrite:he(e.cacheWrite,i),cacheRead:he(e.cacheRead,i)};return r`
    <div class="cost-breakdown cost-breakdown-compact">
      <div class="cost-breakdown-header">${s?"Tokens":"Cost"} by Type</div>
      <div class="cost-breakdown-bar">
        <div class="cost-segment output" style="width: ${(s?a.output:n.output.pct).toFixed(1)}%"
          title="Output: ${s?U(e.output):Y(n.output.cost)}"></div>
        <div class="cost-segment input" style="width: ${(s?a.input:n.input.pct).toFixed(1)}%"
          title="Input: ${s?U(e.input):Y(n.input.cost)}"></div>
        <div class="cost-segment cache-write" style="width: ${(s?a.cacheWrite:n.cacheWrite.pct).toFixed(1)}%"
          title="Cache Write: ${s?U(e.cacheWrite):Y(n.cacheWrite.cost)}"></div>
        <div class="cost-segment cache-read" style="width: ${(s?a.cacheRead:n.cacheRead.pct).toFixed(1)}%"
          title="Cache Read: ${s?U(e.cacheRead):Y(n.cacheRead.cost)}"></div>
      </div>
      <div class="cost-breakdown-legend">
        <span class="legend-item"><span class="legend-dot output"></span>Output ${s?U(e.output):Y(n.output.cost)}</span>
        <span class="legend-item"><span class="legend-dot input"></span>Input ${s?U(e.input):Y(n.input.cost)}</span>
        <span class="legend-item"><span class="legend-dot cache-write"></span>Cache Write ${s?U(e.cacheWrite):Y(n.cacheWrite.cost)}</span>
        <span class="legend-item"><span class="legend-dot cache-read"></span>Cache Read ${s?U(e.cacheRead):Y(n.cacheRead.cost)}</span>
      </div>
      <div class="cost-breakdown-total">
        Total: ${s?U(e.totalTokens):Y(e.totalCost)}
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
  `}function Sr(e,t,n){return r`
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
  `}function dy(e,t,n,s,i,a,o){if(!e)return f;const c=t.messages.total?Math.round(e.totalTokens/t.messages.total):0,l=t.messages.total?e.totalCost/t.messages.total:0,u=e.input+e.cacheRead,g=u>0?e.cacheRead/u:0,p=u>0?`${(g*100).toFixed(1)}%`:"—",h=n.errorRate*100,m=n.throughputTokensPerMin!==void 0?`${U(Math.round(n.throughputTokensPerMin))} tok/min`:"—",v=n.throughputCostPerMin!==void 0?`${Y(n.throughputCostPerMin,4)} / min`:"—",A=n.durationCount>0?Ji(n.avgDurationMs,{spaced:!0})??"—":"—",C="Cache hit rate = cache read / (input + cache read). Higher is better.",S="Error rate = errors / total messages. Lower is better.",d="Throughput shows tokens per minute over active time. Higher is better.",b="Average tokens per message in this range.",y=s?"Average cost per message when providers report costs. Cost data is missing for some or all sessions in this range.":"Average cost per message when providers report costs.",_=t.daily.filter(R=>R.messages>0&&R.errors>0).map(R=>{const H=R.errors/R.messages;return{label:hc(R.date),value:`${(H*100).toFixed(2)}%`,sub:`${R.errors} errors · ${R.messages} msgs · ${U(R.tokens)}`,rate:H}}).toSorted((R,H)=>H.rate-R.rate).slice(0,5).map(({rate:R,...H})=>H),L=t.byModel.slice(0,5).map(R=>({label:R.model??"unknown",value:Y(R.totals.totalCost),sub:`${U(R.totals.totalTokens)} · ${R.count} msgs`})),E=t.byProvider.slice(0,5).map(R=>({label:R.provider??"unknown",value:Y(R.totals.totalCost),sub:`${U(R.totals.totalTokens)} · ${R.count} msgs`})),T=t.tools.tools.slice(0,6).map(R=>({label:R.name,value:`${R.count}`,sub:"calls"})),P=t.byAgent.slice(0,5).map(R=>({label:R.agentId,value:Y(R.totals.totalCost),sub:U(R.totals.totalTokens)})),G=t.byChannel.slice(0,5).map(R=>({label:R.channel,value:Y(R.totals.totalCost),sub:U(R.totals.totalTokens)}));return r`
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
            <span class="usage-summary-hint" title=${b}>?</span>
          </div>
          <div class="usage-summary-value">${U(c)}</div>
          <div class="usage-summary-sub">Across ${t.messages.total||0} messages</div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            Avg Cost / Msg
            <span class="usage-summary-hint" title=${y}>?</span>
          </div>
          <div class="usage-summary-value">${Y(l,4)}</div>
          <div class="usage-summary-sub">${Y(e.totalCost)} total</div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            Sessions
            <span class="usage-summary-hint" title="Distinct sessions in the range.">?</span>
          </div>
          <div class="usage-summary-value">${a}</div>
          <div class="usage-summary-sub">of ${o} in range</div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            Throughput
            <span class="usage-summary-hint" title=${d}>?</span>
          </div>
          <div class="usage-summary-value">${m}</div>
          <div class="usage-summary-sub">${v}</div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            Error Rate
            <span class="usage-summary-hint" title=${S}>?</span>
          </div>
          <div class="usage-summary-value ${h>5?"bad":h>1?"warn":"good"}">${h.toFixed(2)}%</div>
          <div class="usage-summary-sub">
            ${t.messages.errors} errors · ${A} avg session
          </div>
        </div>
        <div class="usage-summary-card">
          <div class="usage-summary-title">
            Cache Hit Rate
            <span class="usage-summary-hint" title=${C}>?</span>
          </div>
          <div class="usage-summary-value ${g>.6?"good":g>.3?"warn":"bad"}">${p}</div>
          <div class="usage-summary-sub">
            ${U(e.cacheRead)} cached · ${U(u)} prompt
          </div>
        </div>
      </div>
      <div class="usage-insights-grid">
        ${pt("Top Models",L,"No model data")}
        ${pt("Top Providers",E,"No provider data")}
        ${pt("Top Tools",T,"No tool calls")}
        ${pt("Top Agents",P,"No agent data")}
        ${pt("Top Channels",G,"No channel data")}
        ${Sr("Peak Error Days",_,"No error data")}
        ${Sr("Peak Error Hours",i,"No error data")}
      </div>
    </section>
  `}function uy(e,t,n,s,i,a,o,c,l,u,g,p,h,m,v){const A=I=>h.includes(I),C=I=>{const K=I.label||I.key;return K.startsWith("agent:")&&K.includes("?token=")?K.slice(0,K.indexOf("?token=")):K},S=async I=>{const K=C(I);try{await navigator.clipboard.writeText(K)}catch{}},d=I=>{const K=[];return A("channel")&&I.channel&&K.push(`channel:${I.channel}`),A("agent")&&I.agentId&&K.push(`agent:${I.agentId}`),A("provider")&&(I.modelProvider||I.providerOverride)&&K.push(`provider:${I.modelProvider??I.providerOverride}`),A("model")&&I.model&&K.push(`model:${I.model}`),A("messages")&&I.usage?.messageCounts&&K.push(`msgs:${I.usage.messageCounts.total}`),A("tools")&&I.usage?.toolUsage&&K.push(`tools:${I.usage.toolUsage.totalCalls}`),A("errors")&&I.usage?.messageCounts&&K.push(`errors:${I.usage.messageCounts.errors}`),A("duration")&&I.usage?.durationMs&&K.push(`dur:${Ji(I.usage.durationMs,{spaced:!0})??"—"}`),K},b=I=>{const K=I.usage;if(!K)return 0;if(n.length>0&&K.dailyBreakdown&&K.dailyBreakdown.length>0){const re=K.dailyBreakdown.filter(le=>n.includes(le.date));return s?re.reduce((le,ne)=>le+ne.tokens,0):re.reduce((le,ne)=>le+ne.cost,0)}return s?K.totalTokens??0:K.totalCost??0},y=[...e].toSorted((I,K)=>{switch(i){case"recent":return(K.updatedAt??0)-(I.updatedAt??0);case"messages":return(K.usage?.messageCounts?.total??0)-(I.usage?.messageCounts?.total??0);case"errors":return(K.usage?.messageCounts?.errors??0)-(I.usage?.messageCounts?.errors??0);case"cost":return b(K)-b(I);default:return b(K)-b(I)}}),_=a==="asc"?y.toReversed():y,L=_.reduce((I,K)=>I+b(K),0),E=_.length?L/_.length:0,T=_.reduce((I,K)=>I+(K.usage?.messageCounts?.errors??0),0),P=new Set(t),G=_.filter(I=>P.has(I.key)),R=G.length,H=new Map(_.map(I=>[I.key,I])),q=o.map(I=>H.get(I)).filter(I=>!!I);return r`
    <div class="card sessions-card">
      <div class="sessions-card-header">
        <div class="card-title">Sessions</div>
        <div class="sessions-card-count">
          ${e.length} shown${m!==e.length?` · ${m} total`:""}
        </div>
      </div>
      <div class="sessions-card-meta">
        <div class="sessions-card-stats">
          <span>${s?U(E):Y(E)} avg</span>
          <span>${T} errors</span>
        </div>
        <div class="chart-toggle small">
          <button
            class="toggle-btn ${c==="all"?"active":""}"
            @click=${()=>p("all")}
          >
            All
          </button>
          <button
            class="toggle-btn ${c==="recent"?"active":""}"
            @click=${()=>p("recent")}
          >
            Recently viewed
          </button>
        </div>
        <label class="sessions-sort">
          <span>Sort</span>
          <select
            @change=${I=>u(I.target.value)}
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
          @click=${()=>g(a==="desc"?"asc":"desc")}
          title=${a==="desc"?"Descending":"Ascending"}
        >
          ${a==="desc"?"↓":"↑"}
        </button>
        ${R>0?r`
                <button class="btn btn-sm sessions-action-btn sessions-clear-btn" @click=${v}>
                  Clear Selection
                </button>
              `:f}
      </div>
      ${c==="recent"?q.length===0?r`
                <div class="muted" style="padding: 20px; text-align: center">No recent sessions</div>
              `:r`
                <div class="session-bars" style="max-height: 220px; margin-top: 6px;">
                  ${q.map(I=>{const K=b(I),re=P.has(I.key),le=C(I),ne=d(I);return r`
                      <div
                        class="session-bar-row ${re?"selected":""}"
                        @click=${ae=>l(I.key,ae.shiftKey)}
                        title="${I.key}"
                      >
                        <div class="session-bar-label">
                          <div class="session-bar-title">${le}</div>
                          ${ne.length>0?r`<div class="session-bar-meta">${ne.join(" · ")}</div>`:f}
                        </div>
                        <div class="session-bar-track" style="display: none;"></div>
                        <div class="session-bar-actions">
                          <button
                            class="session-copy-btn"
                            title="Copy session name"
                            @click=${ae=>{ae.stopPropagation(),S(I)}}
                          >
                            Copy
                          </button>
                          <div class="session-bar-value">${s?U(K):Y(K)}</div>
                        </div>
                      </div>
                    `})}
                </div>
              `:e.length===0?r`
                <div class="muted" style="padding: 20px; text-align: center">No sessions in range</div>
              `:r`
                <div class="session-bars">
                  ${_.slice(0,50).map(I=>{const K=b(I),re=t.includes(I.key),le=C(I),ne=d(I);return r`
                      <div
                        class="session-bar-row ${re?"selected":""}"
                        @click=${ae=>l(I.key,ae.shiftKey)}
                        title="${I.key}"
                      >
                        <div class="session-bar-label">
                          <div class="session-bar-title">${le}</div>
                          ${ne.length>0?r`<div class="session-bar-meta">${ne.join(" · ")}</div>`:f}
                        </div>
                        <div class="session-bar-track" style="display: none;"></div>
                        <div class="session-bar-actions">
                          <button
                            class="session-copy-btn"
                            title="Copy session name"
                            @click=${ae=>{ae.stopPropagation(),S(I)}}
                          >
                            Copy
                          </button>
                          <div class="session-bar-value">${s?U(K):Y(K)}</div>
                        </div>
                      </div>
                    `})}
                  ${e.length>50?r`<div class="muted" style="padding: 8px; text-align: center; font-size: 11px;">+${e.length-50} more</div>`:f}
                </div>
              `}
      ${R>1?r`
              <div style="margin-top: 10px;">
                <div class="sessions-card-count">Selected (${R})</div>
                <div class="session-bars" style="max-height: 160px; margin-top: 6px;">
                  ${G.map(I=>{const K=b(I),re=C(I),le=d(I);return r`
                      <div
                        class="session-bar-row selected"
                        @click=${ne=>l(I.key,ne.shiftKey)}
                        title="${I.key}"
                      >
                        <div class="session-bar-label">
                          <div class="session-bar-title">${re}</div>
                          ${le.length>0?r`<div class="session-bar-meta">${le.join(" · ")}</div>`:f}
                        </div>
                  <div class="session-bar-track" style="display: none;"></div>
                        <div class="session-bar-actions">
                          <button
                            class="session-copy-btn"
                            title="Copy session name"
                            @click=${ne=>{ne.stopPropagation(),S(I)}}
                          >
                            Copy
                          </button>
                          <div class="session-bar-value">${s?U(K):Y(K)}</div>
                        </div>
                      </div>
                    `})}
                </div>
              </div>
            `:f}
    </div>
  `}function gy(){return f}function py(e){const t=e.usage;if(!t)return r`
      <div class="muted">No usage data for this session.</div>
    `;const n=o=>o?new Date(o).toLocaleString():"—",s=[];e.channel&&s.push(`channel:${e.channel}`),e.agentId&&s.push(`agent:${e.agentId}`),(e.modelProvider||e.providerOverride)&&s.push(`provider:${e.modelProvider??e.providerOverride}`),e.model&&s.push(`model:${e.model}`);const i=t.toolUsage?.tools.slice(0,6).map(o=>({label:o.name,value:`${o.count}`,sub:"calls"}))??[],a=t.modelUsage?.slice(0,6).map(o=>({label:o.model??"unknown",value:Y(o.totals.totalCost),sub:U(o.totals.totalTokens)}))??[];return r`
    ${s.length>0?r`<div class="usage-badges">${s.map(o=>r`<span class="usage-badge">${o}</span>`)}</div>`:f}
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
        <div class="session-summary-value">${Ji(t.durationMs,{spaced:!0})??"—"}</div>
        <div class="session-summary-meta">${n(t.firstActivity)} → ${n(t.lastActivity)}</div>
      </div>
    </div>
    <div class="usage-insights-grid" style="margin-top: 12px;">
      ${pt("Top Tools",i,"No tool calls")}
      ${pt("Model Mix",a,"No model data")}
    </div>
  `}function hy(e,t,n,s,i,a,o,c,l,u,g,p,h,m,v,A,C,S,d,b,y,_,L){const E=e.label||e.key,T=E.length>50?E.slice(0,50)+"…":E,P=e.usage;return r`
    <div class="card session-detail-panel">
      <div class="session-detail-header">
        <div class="session-detail-header-left">
          <div class="session-detail-title">${T}</div>
        </div>
        <div class="session-detail-stats">
          ${P?r`
            <span><strong>${U(P.totalTokens)}</strong> tokens</span>
            <span><strong>${Y(P.totalCost)}</strong></span>
          `:f}
        </div>
        <button class="session-close-btn" @click=${L} title="Close session details">×</button>
      </div>
      <div class="session-detail-content">
        ${py(e)}
        <div class="session-detail-row">
          ${fy(t,n,s,i,a,o,c,l,u)}
        </div>
        <div class="session-detail-bottom">
          ${my(g,p,h,m,v,A,C,S,d,b)}
          ${vy(e.contextWeight,P,y,_)}
        </div>
      </div>
    </div>
  `}function fy(e,t,n,s,i,a,o,c,l){if(t)return r`
      <div class="session-timeseries-compact">
        <div class="muted" style="padding: 20px; text-align: center">Loading...</div>
      </div>
    `;if(!e||e.points.length<2)return r`
      <div class="session-timeseries-compact">
        <div class="muted" style="padding: 20px; text-align: center">No timeline data</div>
      </div>
    `;let u=e.points;if(o||c||l&&l.length>0){const H=o?new Date(o+"T00:00:00").getTime():0,q=c?new Date(c+"T23:59:59").getTime():1/0;u=e.points.filter(I=>{if(I.timestamp<H||I.timestamp>q)return!1;if(l&&l.length>0){const K=new Date(I.timestamp),re=`${K.getFullYear()}-${String(K.getMonth()+1).padStart(2,"0")}-${String(K.getDate()).padStart(2,"0")}`;return l.includes(re)}return!0})}if(u.length<2)return r`
      <div class="session-timeseries-compact">
        <div class="muted" style="padding: 20px; text-align: center">No data in range</div>
      </div>
    `;let g=0,p=0,h=0,m=0,v=0,A=0;u=u.map(H=>(g+=H.totalTokens,p+=H.cost,h+=H.output,m+=H.input,v+=H.cacheRead,A+=H.cacheWrite,{...H,cumulativeTokens:g,cumulativeCost:p}));const C=400,S=80,d={top:16,right:10,bottom:20,left:40},b=C-d.left-d.right,y=S-d.top-d.bottom,_=n==="cumulative",L=n==="per-turn"&&i==="by-type",E=h+m+v+A,T=u.map(H=>_?H.cumulativeTokens:L?H.input+H.output+H.cacheRead+H.cacheWrite:H.totalTokens),P=Math.max(...T,1),G=Math.max(2,Math.min(8,b/u.length*.7)),R=Math.max(1,(b-G*u.length)/(u.length-1||1));return r`
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
          ${_?f:r`
                  <div class="chart-toggle small">
                    <button
                      class="toggle-btn ${i==="total"?"active":""}"
                      @click=${()=>a("total")}
                    >
                      Total
                    </button>
                    <button
                      class="toggle-btn ${i==="by-type"?"active":""}"
                      @click=${()=>a("by-type")}
                    >
                      By Type
                    </button>
                  </div>
                `}
        </div>
      </div>
      <svg viewBox="0 0 ${C} ${S+15}" class="timeseries-svg" style="width: 100%; height: auto;">
        <!-- Y axis -->
        <line x1="${d.left}" y1="${d.top}" x2="${d.left}" y2="${d.top+y}" stroke="var(--border)" />
        <!-- X axis -->
        <line x1="${d.left}" y1="${d.top+y}" x2="${C-d.right}" y2="${d.top+y}" stroke="var(--border)" />
        <!-- Y axis labels -->
        <text x="${d.left-4}" y="${d.top+4}" text-anchor="end" class="axis-label" style="font-size: 9px; fill: var(--text-muted)">${U(P)}</text>
        <text x="${d.left-4}" y="${d.top+y}" text-anchor="end" class="axis-label" style="font-size: 9px; fill: var(--text-muted)">0</text>
        <!-- X axis labels (first and last) -->
        ${u.length>0?An`
          <text x="${d.left}" y="${d.top+y+12}" text-anchor="start" style="font-size: 8px; fill: var(--text-muted)">${new Date(u[0].timestamp).toLocaleDateString(void 0,{month:"short",day:"numeric"})}</text>
          <text x="${C-d.right}" y="${d.top+y+12}" text-anchor="end" style="font-size: 8px; fill: var(--text-muted)">${new Date(u[u.length-1].timestamp).toLocaleDateString(void 0,{month:"short",day:"numeric"})}</text>
        `:f}
        <!-- Bars -->
        ${u.map((H,q)=>{const I=T[q],K=d.left+q*(G+R),re=I/P*y,le=d.top+y-re,ae=[new Date(H.timestamp).toLocaleDateString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),`${U(I)} tokens`];L&&(ae.push(`Output ${U(H.output)}`),ae.push(`Input ${U(H.input)}`),ae.push(`Cache write ${U(H.cacheWrite)}`),ae.push(`Cache read ${U(H.cacheRead)}`));const D=ae.join(" · ");if(!L)return An`<rect x="${K}" y="${le}" width="${G}" height="${re}" class="ts-bar" rx="1" style="cursor: pointer;"><title>${D}</title></rect>`;const N=[{value:H.output,class:"output"},{value:H.input,class:"input"},{value:H.cacheWrite,class:"cache-write"},{value:H.cacheRead,class:"cache-read"}];let F=d.top+y;return An`
            ${N.map(W=>{if(W.value<=0||I<=0)return f;const we=re*(W.value/I);return F-=we,An`<rect x="${K}" y="${F}" width="${G}" height="${we}" class="ts-bar ${W.class}" rx="1"><title>${D}</title></rect>`})}
          `})}
      </svg>
      <div class="timeseries-summary">${u.length} msgs · ${U(g)} · ${Y(p)}</div>
      ${L?r`
              <div style="margin-top: 8px;">
                <div class="card-title" style="font-size: 12px; margin-bottom: 6px;">Tokens by Type</div>
                <div class="cost-breakdown-bar" style="height: 18px;">
                  <div class="cost-segment output" style="width: ${he(h,E).toFixed(1)}%"></div>
                  <div class="cost-segment input" style="width: ${he(m,E).toFixed(1)}%"></div>
                  <div class="cost-segment cache-write" style="width: ${he(A,E).toFixed(1)}%"></div>
                  <div class="cost-segment cache-read" style="width: ${he(v,E).toFixed(1)}%"></div>
                </div>
                <div class="cost-breakdown-legend">
                  <div class="legend-item" title="Assistant output tokens">
                    <span class="legend-dot output"></span>Output ${U(h)}
                  </div>
                  <div class="legend-item" title="User + tool input tokens">
                    <span class="legend-dot input"></span>Input ${U(m)}
                  </div>
                  <div class="legend-item" title="Tokens written to cache">
                    <span class="legend-dot cache-write"></span>Cache Write ${U(A)}
                  </div>
                  <div class="legend-item" title="Tokens read from cache">
                    <span class="legend-dot cache-read"></span>Cache Read ${U(v)}
                  </div>
                </div>
                <div class="cost-breakdown-total">Total: ${U(E)}</div>
              </div>
            `:f}
    </div>
  `}function vy(e,t,n,s){if(!e)return r`
      <div class="context-details-panel">
        <div class="muted" style="padding: 20px; text-align: center">No context data</div>
      </div>
    `;const i=ct(e.systemPrompt.chars),a=ct(e.skills.promptChars),o=ct(e.tools.listChars+e.tools.schemaChars),c=ct(e.injectedWorkspaceFiles.reduce((b,y)=>b+y.injectedChars,0)),l=i+a+o+c;let u="";if(t&&t.totalTokens>0){const b=t.input+t.cacheRead;b>0&&(u=`~${Math.min(l/b*100,100).toFixed(0)}% of input`)}const g=e.skills.entries.toSorted((b,y)=>y.blockChars-b.blockChars),p=e.tools.entries.toSorted((b,y)=>y.summaryChars+y.schemaChars-(b.summaryChars+b.schemaChars)),h=e.injectedWorkspaceFiles.toSorted((b,y)=>y.injectedChars-b.injectedChars),m=4,v=n,A=v?g:g.slice(0,m),C=v?p:p.slice(0,m),S=v?h:h.slice(0,m),d=g.length>m||p.length>m||h.length>m;return r`
    <div class="context-details-panel">
      <div class="context-breakdown-header">
        <div class="card-title" style="font-size: 13px;">System Prompt Breakdown</div>
        ${d?r`<button class="context-expand-btn" @click=${s}>
                ${v?"Collapse":"Expand all"}
              </button>`:f}
      </div>
      <p class="context-weight-desc">${u||"Base context per message"}</p>
      <div class="context-stacked-bar">
        <div class="context-segment system" style="width: ${he(i,l).toFixed(1)}%" title="System: ~${U(i)}"></div>
        <div class="context-segment skills" style="width: ${he(a,l).toFixed(1)}%" title="Skills: ~${U(a)}"></div>
        <div class="context-segment tools" style="width: ${he(o,l).toFixed(1)}%" title="Tools: ~${U(o)}"></div>
        <div class="context-segment files" style="width: ${he(c,l).toFixed(1)}%" title="Files: ~${U(c)}"></div>
      </div>
      <div class="context-legend">
        <span class="legend-item"><span class="legend-dot system"></span>Sys ~${U(i)}</span>
        <span class="legend-item"><span class="legend-dot skills"></span>Skills ~${U(a)}</span>
        <span class="legend-item"><span class="legend-dot tools"></span>Tools ~${U(o)}</span>
        <span class="legend-item"><span class="legend-dot files"></span>Files ~${U(c)}</span>
      </div>
      <div class="context-total">Total: ~${U(l)}</div>
      <div class="context-breakdown-grid">
        ${g.length>0?(()=>{const b=g.length-A.length;return r`
                  <div class="context-breakdown-card">
                    <div class="context-breakdown-title">Skills (${g.length})</div>
                    <div class="context-breakdown-list">
                      ${A.map(y=>r`
                          <div class="context-breakdown-item">
                            <span class="mono">${y.name}</span>
                            <span class="muted">~${U(ct(y.blockChars))}</span>
                          </div>
                        `)}
                    </div>
                    ${b>0?r`<div class="context-breakdown-more">+${b} more</div>`:f}
                  </div>
                `})():f}
        ${p.length>0?(()=>{const b=p.length-C.length;return r`
                  <div class="context-breakdown-card">
                    <div class="context-breakdown-title">Tools (${p.length})</div>
                    <div class="context-breakdown-list">
                      ${C.map(y=>r`
                          <div class="context-breakdown-item">
                            <span class="mono">${y.name}</span>
                            <span class="muted">~${U(ct(y.summaryChars+y.schemaChars))}</span>
                          </div>
                        `)}
                    </div>
                    ${b>0?r`<div class="context-breakdown-more">+${b} more</div>`:f}
                  </div>
                `})():f}
        ${h.length>0?(()=>{const b=h.length-S.length;return r`
                  <div class="context-breakdown-card">
                    <div class="context-breakdown-title">Files (${h.length})</div>
                    <div class="context-breakdown-list">
                      ${S.map(y=>r`
                          <div class="context-breakdown-item">
                            <span class="mono">${y.name}</span>
                            <span class="muted">~${U(ct(y.injectedChars))}</span>
                          </div>
                        `)}
                    </div>
                    ${b>0?r`<div class="context-breakdown-more">+${b} more</div>`:f}
                  </div>
                `})():f}
      </div>
    </div>
  `}function my(e,t,n,s,i,a,o,c,l,u){if(t)return r`
      <div class="session-logs-compact">
        <div class="session-logs-header">Conversation</div>
        <div class="muted" style="padding: 20px; text-align: center">Loading...</div>
      </div>
    `;if(!e||e.length===0)return r`
      <div class="session-logs-compact">
        <div class="session-logs-header">Conversation</div>
        <div class="muted" style="padding: 20px; text-align: center">No messages</div>
      </div>
    `;const g=i.query.trim().toLowerCase(),p=e.map(S=>{const d=Hb(S.content),b=d.cleanContent||S.content;return{log:S,toolInfo:d,cleanContent:b}}),h=Array.from(new Set(p.flatMap(S=>S.toolInfo.tools.map(([d])=>d)))).toSorted((S,d)=>S.localeCompare(d)),m=p.filter(S=>!(i.roles.length>0&&!i.roles.includes(S.log.role)||i.hasTools&&S.toolInfo.tools.length===0||i.tools.length>0&&!S.toolInfo.tools.some(([b])=>i.tools.includes(b))||g&&!S.cleanContent.toLowerCase().includes(g))),v=i.roles.length>0||i.tools.length>0||i.hasTools||g?`${m.length} of ${e.length}`:`${e.length}`,A=new Set(i.roles),C=new Set(i.tools);return r`
    <div class="session-logs-compact">
      <div class="session-logs-header">
        <span>Conversation <span style="font-weight: normal; color: var(--text-muted);">(${v} messages)</span></span>
        <button class="btn btn-sm usage-action-btn usage-secondary-btn" @click=${s}>
          ${n?"Collapse All":"Expand All"}
        </button>
      </div>
      <div class="usage-filters-inline" style="margin: 10px 12px;">
        <select
          multiple
          size="4"
          @change=${S=>a(Array.from(S.target.selectedOptions).map(d=>d.value))}
        >
          <option value="user" ?selected=${A.has("user")}>User</option>
          <option value="assistant" ?selected=${A.has("assistant")}>Assistant</option>
          <option value="tool" ?selected=${A.has("tool")}>Tool</option>
          <option value="toolResult" ?selected=${A.has("toolResult")}>Tool result</option>
        </select>
        <select
          multiple
          size="4"
          @change=${S=>o(Array.from(S.target.selectedOptions).map(d=>d.value))}
        >
          ${h.map(S=>r`<option value=${S} ?selected=${C.has(S)}>${S}</option>`)}
        </select>
        <label class="usage-filters-inline" style="gap: 6px;">
          <input
            type="checkbox"
            .checked=${i.hasTools}
            @change=${S=>c(S.target.checked)}
          />
          Has tools
        </label>
        <input
          type="text"
          placeholder="Search conversation"
          .value=${i.query}
          @input=${S=>l(S.target.value)}
        />
        <button class="btn btn-sm usage-action-btn usage-secondary-btn" @click=${u}>
          Clear
        </button>
      </div>
      <div class="session-logs-list">
        ${m.map(S=>{const{log:d,toolInfo:b,cleanContent:y}=S,_=d.role==="user"?"user":"assistant",L=d.role==="user"?"You":d.role==="assistant"?"Assistant":"Tool";return r`
          <div class="session-log-entry ${_}">
            <div class="session-log-meta">
              <span class="session-log-role">${L}</span>
              <span>${new Date(d.timestamp).toLocaleString()}</span>
              ${d.tokens?r`<span>${U(d.tokens)}</span>`:f}
            </div>
            <div class="session-log-content">${y}</div>
            ${b.tools.length>0?r`
                    <details class="session-log-tools" ?open=${n}>
                      <summary>${b.summary}</summary>
                      <div class="session-log-tools-list">
                        ${b.tools.map(([E,T])=>r`
                            <span class="session-log-tools-pill">${E} × ${T}</span>
                          `)}
                      </div>
                    </details>
                  `:f}
          </div>
        `})}
        ${m.length===0?r`
                <div class="muted" style="padding: 12px">No messages match the filters.</div>
              `:f}
      </div>
    </div>
  `}function by(e){if(e.loading&&!e.totals)return r`
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
              <div class="card-title" style="margin: 0;">Token Usage · 加载中</div>
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
    `;const t=e.chartMode==="tokens",n=e.query.trim().length>0,s=e.queryDraft.trim().length>0,i=[...e.sessions].toSorted((D,N)=>{const F=t?D.usage?.totalTokens??0:D.usage?.totalCost??0;return(t?N.usage?.totalTokens??0:N.usage?.totalCost??0)-F}),a=e.selectedDays.length>0?i.filter(D=>{if(D.usage?.activityDates?.length)return D.usage.activityDates.some(W=>e.selectedDays.includes(W));if(!D.updatedAt)return!1;const N=new Date(D.updatedAt),F=`${N.getFullYear()}-${String(N.getMonth()+1).padStart(2,"0")}-${String(N.getDate()).padStart(2,"0")}`;return e.selectedDays.includes(F)}):i,o=(D,N)=>{if(N.length===0)return!0;const F=D.usage,W=F?.firstActivity??D.updatedAt,we=F?.lastActivity??D.updatedAt;if(!W||!we)return!1;const ee=Math.min(W,we),Ae=Math.max(W,we);let se=ee;for(;se<=Ae;){const fe=new Date(se),Be=Ea(fe,e.timeZone);if(N.includes(Be))return!0;const ze=Ia(fe,e.timeZone);se=Math.min(ze.getTime(),Ae)+1}return!1},c=e.selectedHours.length>0?a.filter(D=>o(D,e.selectedHours)):a,l=Ub(c,e.query),u=l.sessions,g=l.warnings,p=sy(e.queryDraft,i,e.aggregates),h=La(e.query),m=D=>{const N=gt(D);return h.filter(F=>gt(F.key??"")===N).map(F=>F.value).filter(Boolean)},v=D=>{const N=new Set;for(const F of D)F&&N.add(F);return Array.from(N)},A=v(i.map(D=>D.agentId)).slice(0,12),C=v(i.map(D=>D.channel)).slice(0,12),S=v([...i.map(D=>D.modelProvider),...i.map(D=>D.providerOverride),...e.aggregates?.byProvider.map(D=>D.provider)??[]]).slice(0,12),d=v([...i.map(D=>D.model),...e.aggregates?.byModel.map(D=>D.model)??[]]).slice(0,12),b=v(e.aggregates?.tools.tools.map(D=>D.name)??[]).slice(0,12),y=e.selectedSessions.length===1?e.sessions.find(D=>D.key===e.selectedSessions[0])??u.find(D=>D.key===e.selectedSessions[0]):null,_=D=>D.reduce((N,F)=>(F.usage&&(N.input+=F.usage.input,N.output+=F.usage.output,N.cacheRead+=F.usage.cacheRead,N.cacheWrite+=F.usage.cacheWrite,N.totalTokens+=F.usage.totalTokens,N.totalCost+=F.usage.totalCost,N.inputCost+=F.usage.inputCost??0,N.outputCost+=F.usage.outputCost??0,N.cacheReadCost+=F.usage.cacheReadCost??0,N.cacheWriteCost+=F.usage.cacheWriteCost??0,N.missingCostEntries+=F.usage.missingCostEntries??0),N),{input:0,output:0,cacheRead:0,cacheWrite:0,totalTokens:0,totalCost:0,inputCost:0,outputCost:0,cacheReadCost:0,cacheWriteCost:0,missingCostEntries:0}),L=D=>e.costDaily.filter(F=>D.includes(F.date)).reduce((F,W)=>(F.input+=W.input,F.output+=W.output,F.cacheRead+=W.cacheRead,F.cacheWrite+=W.cacheWrite,F.totalTokens+=W.totalTokens,F.totalCost+=W.totalCost,F.inputCost+=W.inputCost??0,F.outputCost+=W.outputCost??0,F.cacheReadCost+=W.cacheReadCost??0,F.cacheWriteCost+=W.cacheWriteCost??0,F),{input:0,output:0,cacheRead:0,cacheWrite:0,totalTokens:0,totalCost:0,inputCost:0,outputCost:0,cacheReadCost:0,cacheWriteCost:0,missingCostEntries:0});let E,T;const P=i.length;if(e.selectedSessions.length>0){const D=u.filter(N=>e.selectedSessions.includes(N.key));E=_(D),T=D.length}else e.selectedDays.length>0&&e.selectedHours.length===0?(E=L(e.selectedDays),T=u.length):e.selectedHours.length>0||n?(E=_(u),T=u.length):(E=e.totals,T=P);const G=e.selectedSessions.length>0?u.filter(D=>e.selectedSessions.includes(D.key)):n||e.selectedHours.length>0?u:e.selectedDays.length>0?a:i,R=Xb(G,e.aggregates),H=e.selectedSessions.length>0?(()=>{const D=u.filter(F=>e.selectedSessions.includes(F.key)),N=new Set;for(const F of D)for(const W of F.usage?.activityDates??[])N.add(W);return N.size>0?e.costDaily.filter(F=>N.has(F.date)):e.costDaily})():e.costDaily,q=ey(G,E,R),I=!e.loading&&!e.totals&&e.sessions.length===0,K=(E?.missingCostEntries??0)>0||(E?E.totalTokens>0&&E.totalCost===0&&E.input+E.output+E.cacheRead+E.cacheWrite>0:!1),re=[{label:"Today",days:1},{label:"7d",days:7},{label:"30d",days:30}],le=D=>{const N=new Date,F=new Date;F.setDate(F.getDate()-(D-1)),e.onStartDateChange(ii(F)),e.onEndDateChange(ii(N))},ne=(D,N,F)=>{if(F.length===0)return f;const W=m(D),we=new Set(W.map(se=>gt(se))),ee=F.length>0&&F.every(se=>we.has(gt(se))),Ae=W.length;return r`
      <details
        class="usage-filter-select"
        @toggle=${se=>{const fe=se.currentTarget;if(!fe.open)return;const Be=ze=>{ze.composedPath().includes(fe)||(fe.open=!1,window.removeEventListener("click",Be,!0))};window.addEventListener("click",Be,!0)}}
      >
        <summary>
          <span>${N}</span>
          ${Ae>0?r`<span class="usage-filter-badge">${Ae}</span>`:r`
                  <span class="usage-filter-badge">All</span>
                `}
        </summary>
        <div class="usage-filter-popover">
          <div class="usage-filter-actions">
            <button
              class="btn btn-sm"
              @click=${se=>{se.preventDefault(),se.stopPropagation(),e.onQueryDraftChange(kr(e.queryDraft,D,F))}}
              ?disabled=${ee}
            >
              Select All
            </button>
            <button
              class="btn btn-sm"
              @click=${se=>{se.preventDefault(),se.stopPropagation(),e.onQueryDraftChange(kr(e.queryDraft,D,[]))}}
              ?disabled=${Ae===0}
            >
              Clear
            </button>
          </div>
          <div class="usage-filter-options">
            ${F.map(se=>{const fe=we.has(gt(se));return r`
                <label class="usage-filter-option">
                  <input
                    type="checkbox"
                    .checked=${fe}
                    @change=${Be=>{const ze=Be.target,st=`${D}:${se}`;e.onQueryDraftChange(ze.checked?ay(e.queryDraft,st):wr(e.queryDraft,st))}}
                  />
                  <span>${se}</span>
                </label>
              `})}
          </div>
        </div>
      </details>
    `},ae=ii(new Date);return r`
    <style>${Kb}</style>

    <section class="usage-page-header">
      <div class="usage-page-title">Usage · 用量统计</div>
      <div class="usage-page-subtitle">Track token consumption, session activity, and cost breakdown over time.</div>
    </section>

    <section class="card usage-header ${e.headerPinned?"pinned":""}">
      <div class="usage-header-row">
        <div class="usage-header-title">
          <div class="card-title" style="margin: 0;">Filters</div>
          ${e.loading?r`
                  <span class="usage-refresh-indicator">Loading</span>
                `:f}
          ${I?r`
                  <span class="usage-query-hint">Select a date range and click Refresh to load your usage data.</span>
                `:f}
        </div>
        <div class="usage-header-metrics">
          ${E?r`
                <span class="usage-metric-badge">
                  <strong>${U(E.totalTokens)}</strong> tokens
                </span>
                <span class="usage-metric-badge">
                  <strong>${Y(E.totalCost)}</strong> cost
                </span>
                <span class="usage-metric-badge">
                  <strong>${T}</strong>
                  session${T!==1?"s":""}
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
            @toggle=${D=>{const N=D.currentTarget;if(!N.open)return;const F=W=>{W.composedPath().includes(N)||(N.open=!1,window.removeEventListener("click",F,!0))};window.addEventListener("click",F,!0)}}
          >
            <summary class="usage-export-button">Export ▾</summary>
            <div class="usage-export-popover">
              <div class="usage-export-list">
                <button
                  class="usage-export-item"
                  @click=${()=>ai(`opensoul-usage-sessions-${ae}.csv`,ty(u),"text/csv")}
                  ?disabled=${u.length===0}
                >
                  Sessions CSV
                </button>
                <button
                  class="usage-export-item"
                  @click=${()=>ai(`opensoul-usage-daily-${ae}.csv`,ny(H),"text/csv")}
                  ?disabled=${H.length===0}
                >
                  Daily CSV
                </button>
                <button
                  class="usage-export-item"
                  @click=${()=>ai(`opensoul-usage-${ae}.json`,JSON.stringify({totals:E,sessions:u,daily:H,aggregates:R},null,2),"application/json")}
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
          ${ry(e.selectedDays,e.selectedHours,e.selectedSessions,e.sessions,e.onClearDays,e.onClearHours,e.onClearSessions,e.onClearFilters)}
          <div class="usage-presets">
            ${re.map(D=>r`
                <button class="btn btn-sm" @click=${()=>le(D.days)}>
                  ${D.label}
                </button>
              `)}
          </div>
          <input
            type="date"
            .value=${e.startDate}
            title="Start Date"
            @change=${D=>e.onStartDateChange(D.target.value)}
          />
          <span style="color: var(--text-muted);">to</span>
          <input
            type="date"
            .value=${e.endDate}
            title="End Date"
            @change=${D=>e.onEndDateChange(D.target.value)}
          />
          <select
            title="Time zone"
            .value=${e.timeZone}
            @change=${D=>e.onTimeZoneChange(D.target.value)}
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
            @input=${D=>e.onQueryDraftChange(D.target.value)}
            @keydown=${D=>{D.key==="Enter"&&(D.preventDefault(),e.onApplyQuery())}}
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
          ${ne("agent","Agent",A)}
          ${ne("channel","Channel",C)}
          ${ne("provider","Provider",S)}
          ${ne("model","Model",d)}
          ${ne("tool","Tool",b)}
          <span class="usage-query-hint">
            Tip: use filters or click bars to filter days.
          </span>
        </div>
        ${h.length>0?r`
                <div class="usage-query-chips">
                  ${h.map(D=>{const N=D.raw;return r`
                      <span class="usage-query-chip">
                        ${N}
                        <button
                          title="Remove filter"
                          @click=${()=>e.onQueryDraftChange(wr(e.queryDraft,N))}
                        >
                          ×
                        </button>
                      </span>
                    `})}
                </div>
              `:f}
        ${p.length>0?r`
                <div class="usage-query-suggestions">
                  ${p.map(D=>r`
                      <button
                        class="usage-query-suggestion"
                        @click=${()=>e.onQueryDraftChange(iy(e.queryDraft,D.value))}
                      >
                        ${D.label}
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

    ${dy(E,R,q,K,Gb(G,e.timeZone),T,P)}

    ${Yb(G,e.timeZone,e.selectedHours,e.onSelectHour)}

    <!-- Two-column layout: Daily+Breakdown on left, Sessions on right -->
    <div class="usage-grid">
      <div class="usage-grid-left">
        <div class="card usage-left-card">
          ${ly(H,e.selectedDays,e.chartMode,e.dailyChartMode,e.onDailyChartModeChange,e.onSelectDay)}
          ${E?cy(E,e.chartMode):f}
        </div>
      </div>
      <div class="usage-grid-right">
        ${uy(u,e.selectedSessions,e.selectedDays,t,e.sessionSort,e.sessionSortDir,e.recentSessions,e.sessionsTab,e.onSelectSession,e.onSessionSortChange,e.onSessionSortDirChange,e.onSessionsTabChange,e.visibleColumns,P,e.onClearSessions)}
      </div>
    </div>

    <!-- Session Detail Panel (when selected) or Empty State -->
    ${y?hy(y,e.timeSeries,e.timeSeriesLoading,e.timeSeriesMode,e.onTimeSeriesModeChange,e.timeSeriesBreakdownMode,e.onTimeSeriesBreakdownChange,e.startDate,e.endDate,e.selectedDays,e.sessionLogs,e.sessionLogsLoading,e.sessionLogsExpanded,e.onToggleSessionLogsExpanded,{roles:e.logFilterRoles,tools:e.logFilterTools,hasTools:e.logFilterHasTools,query:e.logFilterQuery},e.onLogFilterRolesChange,e.onLogFilterToolsChange,e.onLogFilterHasToolsChange,e.onLogFilterQueryChange,e.onLogFilterClear,e.contextExpanded,e.onToggleContextExpanded,e.onClearSessions):gy()}
  `}let oi=null;const Ar=e=>{oi&&clearTimeout(oi),oi=window.setTimeout(()=>{Pl(e)},400)},yy=/^data:/i,xy=/^https?:\/\//i;function $y(e){const t=e.agentsList?.agents??[],s=Br(e.sessionKey)?.agentId??e.agentsList?.defaultId??"main",a=t.find(c=>c.id===s)?.identity,o=a?.avatarUrl??a?.avatar;if(o)return yy.test(o)||xy.test(o)?o:a?.avatarUrl}function wy(e){const t=(d,b)=>z(e.uiLocale,d,b);if(e.showOnboardingWizard){const d={step:e.onboardingStep,locale:e.onboardingLocale,loginStatus:e.onboardingLoginStatus,loginDisplayName:e.onboardingLoginDisplayName,loginAvatarUrl:e.onboardingLoginAvatarUrl,loginEmail:e.onboardingLoginEmail,loginError:e.onboardingLoginError,isExistingAccount:e.onboardingIsExistingAccount,selectedProvider:e.onboardingSelectedProvider,providerApiKey:e.onboardingProviderApiKey,providerSearchQuery:e.onboardingProviderSearchQuery,selectedChannel:e.onboardingSelectedChannel,channelToken:e.onboardingChannelToken,onLocaleChange:b=>e.setOnboardingLocale(b),onProviderSelect:b=>e.setOnboardingProvider(b),onProviderApiKeyChange:b=>e.setOnboardingProviderApiKey(b),onProviderSearchChange:b=>e.setOnboardingProviderSearchQuery(b),onChannelSelect:b=>e.setOnboardingChannel(b),onChannelTokenChange:b=>e.setOnboardingChannelToken(b),onGoogleLogin:()=>e.onboardingGoogleLogin(),onGithubLogin:()=>e.onboardingGithubLogin(),onLogout:()=>e.onboardingLogout(),onNext:()=>{if(e.onboardingStep===1&&e.onboardingIsExistingAccount&&e.onboardingLoginStatus==="success"){e.finishOnboarding();return}const b=Math.min(e.onboardingStep+1,5);e.setOnboardingStep(b)},onBack:()=>{const b=Math.max(e.onboardingStep-1,1);e.setOnboardingStep(b)},onSkip:()=>{e.onboardingStep===3?e.setOnboardingProvider(null):e.onboardingStep===4&&e.setOnboardingChannel(null);const b=Math.min(e.onboardingStep+1,5);e.setOnboardingStep(b)},onFinish:()=>e.finishOnboarding()};return mb(d)}const n=e.presenceEntries.length,s=e.sessionsResult?.count??null,i=e.cronStatus?.nextWakeAtMs??null,a=e.connected?null:t("Disconnected from gateway.","与网关断开连接。"),o=e.tab==="chat",c=o&&(e.settings.chatFocusMode||e.onboarding),l=e.onboarding?!1:e.settings.chatShowThinking,u=$y(e),g=e.chatAvatarUrl??u??null,p=e.configForm??e.configSnapshot?.config,h=vn(e.basePath??""),m=e.agentsSelectedId??e.agentsList?.defaultId??e.agentsList?.agents?.[0]?.id??null,v=ca(e.tab,e.uiLocale),A=qu(e.tab,e.uiLocale),C=X[fl(e.tab)],S=e.connected?t("Gateway online","Gateway online"):t("Gateway offline","Gateway offline");return r`
    <div class="shell ${o?"shell--chat":""} ${c?"shell--chat-focus":""} ${e.settings.navCollapsed?"shell--nav-collapsed":""} ${e.onboarding?"shell--onboarding":""}">
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
        ${ju.map(d=>{const b=e.settings.navGroupsCollapsed[d.label]??!1,y=e.settings.navCollapsed?!1:b,_=Gu(d.label,e.uiLocale);return r`
            <div class="nav-group ${y?"nav-group--collapsed":""}">
              <button
                class="nav-label"
                @click=${()=>{const L={...e.settings.navGroupsCollapsed};L[d.label]=!b,e.applySettings({...e.settings,navGroupsCollapsed:L})}}
                aria-expanded=${!y}
              >
                <span class="nav-label__text">${_}</span>
                <span class="nav-label__chevron">${y?"+":"-"}</span>
              </button>
              <div class="nav-group__items">
                ${d.tabs.map(L=>pp(e,L))}
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
      <main class="content ${o?"content--chat":""}">
        <section class="content-header">
          <div class="content-header__main">
            <div class="page-title-row">
              <span class="page-icon" aria-hidden="true">${C}</span>
              <div>
                <div class="page-title">${v}</div>
                ${A?r`<div class="page-sub">${A}</div>`:f}
              </div>
            </div>
          </div>
          <div class="page-meta">
            ${o?f:r`
                <div class="page-health-pill">
                  <span class="statusDot ${e.connected?"ok":""}"></span>
                  <span>${S}</span>
                </div>
              `}
            ${e.lastError?r`<div class="pill danger">${e.lastError}</div>`:f}
            ${o?hp(e):f}
          </div>
        </section>

        ${e.tab==="overview"?bb({locale:e.uiLocale,connected:e.connected,hello:e.hello,settings:e.settings,password:e.password,lastError:e.lastError,presenceCount:n,sessionsCount:s,cronEnabled:e.cronStatus?.enabled??null,cronNext:i,lastChannelsRefresh:e.channelsLastSuccess,onSettingsChange:d=>e.applySettings(d),onPasswordChange:d=>e.password=d,onSessionKeyChange:d=>{e.sessionKey=d,e.chatMessage="",e.resetToolStream(),e.applySettings({...e.settings,sessionKey:d,lastActiveSessionKey:d}),e.loadAssistantIdentity()},onConnect:()=>e.connect(),onRefresh:()=>e.loadOverview(),onNavigate:d=>e.setTab(d)}):f}

        ${e.tab==="channels"?Kh({connected:e.connected,loading:e.channelsLoading,snapshot:e.channelsSnapshot,lastError:e.channelsError,lastSuccessAt:e.channelsLastSuccess,whatsappMessage:e.whatsappLoginMessage,whatsappQrDataUrl:e.whatsappLoginQrDataUrl,whatsappConnected:e.whatsappLoginConnected,whatsappBusy:e.whatsappBusy,configSchema:e.configSchema,configSchemaLoading:e.configSchemaLoading,configForm:e.configForm,configUiHints:e.configUiHints,configSaving:e.configSaving,configFormDirty:e.configFormDirty,nostrProfileFormState:e.nostrProfileFormState,nostrProfileAccountId:e.nostrProfileAccountId,onRefresh:d=>$e(e,d),onWhatsAppStart:d=>e.handleWhatsAppStart(d),onWhatsAppWait:()=>e.handleWhatsAppWait(),onWhatsAppLogout:()=>e.handleWhatsAppLogout(),onConfigPatch:(d,b)=>ke(e,d,b),onConfigSave:()=>e.handleChannelConfigSave(),onConfigReload:()=>e.handleChannelConfigReload(),onNostrProfileEdit:(d,b)=>e.handleNostrProfileEdit(d,b),onNostrProfileCancel:()=>e.handleNostrProfileCancel(),onNostrProfileFieldChange:(d,b)=>e.handleNostrProfileFieldChange(d,b),onNostrProfileSave:()=>e.handleNostrProfileSave(),onNostrProfileImport:()=>e.handleNostrProfileImport(),onNostrProfileToggleAdvanced:()=>e.handleNostrProfileToggleAdvanced()}):f}

        ${e.tab==="instances"?_m({loading:e.presenceLoading,entries:e.presenceEntries,lastError:e.presenceError,statusMessage:e.presenceStatus,onRefresh:()=>ra(e)}):f}

        ${e.tab==="sessions"?Tb({loading:e.sessionsLoading,result:e.sessionsResult,error:e.sessionsError,activeMinutes:e.sessionsFilterActive,limit:e.sessionsFilterLimit,includeGlobal:e.sessionsIncludeGlobal,includeUnknown:e.sessionsIncludeUnknown,basePath:e.basePath,onFiltersChange:d=>{e.sessionsFilterActive=d.activeMinutes,e.sessionsFilterLimit=d.limit,e.sessionsIncludeGlobal=d.includeGlobal,e.sessionsIncludeUnknown=d.includeUnknown},onRefresh:()=>wt(e),onPatch:(d,b)=>xu(e,d,b),onDelete:d=>$u(e,d)}):f}

        ${e.tab==="usage"?by({loading:e.usageLoading,error:e.usageError,startDate:e.usageStartDate,endDate:e.usageEndDate,sessions:e.usageResult?.sessions??[],sessionsLimitReached:(e.usageResult?.sessions?.length??0)>=1e3,totals:e.usageResult?.totals??null,aggregates:e.usageResult?.aggregates??null,costDaily:e.usageCostSummary?.daily??[],selectedSessions:e.usageSelectedSessions,selectedDays:e.usageSelectedDays,selectedHours:e.usageSelectedHours,chartMode:e.usageChartMode,dailyChartMode:e.usageDailyChartMode,timeSeriesMode:e.usageTimeSeriesMode,timeSeriesBreakdownMode:e.usageTimeSeriesBreakdownMode,timeSeries:e.usageTimeSeries,timeSeriesLoading:e.usageTimeSeriesLoading,sessionLogs:e.usageSessionLogs,sessionLogsLoading:e.usageSessionLogsLoading,sessionLogsExpanded:e.usageSessionLogsExpanded,logFilterRoles:e.usageLogFilterRoles,logFilterTools:e.usageLogFilterTools,logFilterHasTools:e.usageLogFilterHasTools,logFilterQuery:e.usageLogFilterQuery,query:e.usageQuery,queryDraft:e.usageQueryDraft,sessionSort:e.usageSessionSort,sessionSortDir:e.usageSessionSortDir,recentSessions:e.usageRecentSessions,sessionsTab:e.usageSessionsTab,visibleColumns:e.usageVisibleColumns,timeZone:e.usageTimeZone,contextExpanded:e.usageContextExpanded,headerPinned:e.usageHeaderPinned,onStartDateChange:d=>{e.usageStartDate=d,e.usageSelectedDays=[],e.usageSelectedHours=[],e.usageSelectedSessions=[],Ar(e)},onEndDateChange:d=>{e.usageEndDate=d,e.usageSelectedDays=[],e.usageSelectedHours=[],e.usageSelectedSessions=[],Ar(e)},onRefresh:()=>Pl(e),onTimeZoneChange:d=>{e.usageTimeZone=d},onToggleContextExpanded:()=>{e.usageContextExpanded=!e.usageContextExpanded},onToggleSessionLogsExpanded:()=>{e.usageSessionLogsExpanded=!e.usageSessionLogsExpanded},onLogFilterRolesChange:d=>{e.usageLogFilterRoles=d},onLogFilterToolsChange:d=>{e.usageLogFilterTools=d},onLogFilterHasToolsChange:d=>{e.usageLogFilterHasTools=d},onLogFilterQueryChange:d=>{e.usageLogFilterQuery=d},onLogFilterClear:()=>{e.usageLogFilterRoles=[],e.usageLogFilterTools=[],e.usageLogFilterHasTools=!1,e.usageLogFilterQuery=""},onToggleHeaderPinned:()=>{e.usageHeaderPinned=!e.usageHeaderPinned},onSelectHour:(d,b)=>{if(b&&e.usageSelectedHours.length>0){const y=Array.from({length:24},(T,P)=>P),_=e.usageSelectedHours[e.usageSelectedHours.length-1],L=y.indexOf(_),E=y.indexOf(d);if(L!==-1&&E!==-1){const[T,P]=L<E?[L,E]:[E,L],G=y.slice(T,P+1);e.usageSelectedHours=[...new Set([...e.usageSelectedHours,...G])]}}else e.usageSelectedHours.includes(d)?e.usageSelectedHours=e.usageSelectedHours.filter(y=>y!==d):e.usageSelectedHours=[...e.usageSelectedHours,d]},onQueryDraftChange:d=>{e.usageQueryDraft=d,e.usageQueryDebounceTimer&&window.clearTimeout(e.usageQueryDebounceTimer),e.usageQueryDebounceTimer=window.setTimeout(()=>{e.usageQuery=e.usageQueryDraft,e.usageQueryDebounceTimer=null},250)},onApplyQuery:()=>{e.usageQueryDebounceTimer&&(window.clearTimeout(e.usageQueryDebounceTimer),e.usageQueryDebounceTimer=null),e.usageQuery=e.usageQueryDraft},onClearQuery:()=>{e.usageQueryDebounceTimer&&(window.clearTimeout(e.usageQueryDebounceTimer),e.usageQueryDebounceTimer=null),e.usageQueryDraft="",e.usageQuery=""},onSessionSortChange:d=>{e.usageSessionSort=d},onSessionSortDirChange:d=>{e.usageSessionSortDir=d},onSessionsTabChange:d=>{e.usageSessionsTab=d},onToggleColumn:d=>{e.usageVisibleColumns.includes(d)?e.usageVisibleColumns=e.usageVisibleColumns.filter(b=>b!==d):e.usageVisibleColumns=[...e.usageVisibleColumns,d]},onSelectSession:(d,b)=>{if(e.usageTimeSeries=null,e.usageSessionLogs=null,e.usageRecentSessions=[d,...e.usageRecentSessions.filter(y=>y!==d)].slice(0,8),b&&e.usageSelectedSessions.length>0){const y=e.usageChartMode==="tokens",L=[...e.usageResult?.sessions??[]].toSorted((G,R)=>{const H=y?G.usage?.totalTokens??0:G.usage?.totalCost??0;return(y?R.usage?.totalTokens??0:R.usage?.totalCost??0)-H}).map(G=>G.key),E=e.usageSelectedSessions[e.usageSelectedSessions.length-1],T=L.indexOf(E),P=L.indexOf(d);if(T!==-1&&P!==-1){const[G,R]=T<P?[T,P]:[P,T],H=L.slice(G,R+1),q=[...new Set([...e.usageSelectedSessions,...H])];e.usageSelectedSessions=q}}else e.usageSelectedSessions.length===1&&e.usageSelectedSessions[0]===d?e.usageSelectedSessions=[]:e.usageSelectedSessions=[d];e.usageSelectedSessions.length===1&&(Sp(e,e.usageSelectedSessions[0]),Ap(e,e.usageSelectedSessions[0]))},onSelectDay:(d,b)=>{if(b&&e.usageSelectedDays.length>0){const y=(e.usageCostSummary?.daily??[]).map(T=>T.date),_=e.usageSelectedDays[e.usageSelectedDays.length-1],L=y.indexOf(_),E=y.indexOf(d);if(L!==-1&&E!==-1){const[T,P]=L<E?[L,E]:[E,L],G=y.slice(T,P+1),R=[...new Set([...e.usageSelectedDays,...G])];e.usageSelectedDays=R}}else e.usageSelectedDays.includes(d)?e.usageSelectedDays=e.usageSelectedDays.filter(y=>y!==d):e.usageSelectedDays=[d]},onChartModeChange:d=>{e.usageChartMode=d},onDailyChartModeChange:d=>{e.usageDailyChartMode=d},onTimeSeriesModeChange:d=>{e.usageTimeSeriesMode=d},onTimeSeriesBreakdownChange:d=>{e.usageTimeSeriesBreakdownMode=d},onClearDays:()=>{e.usageSelectedDays=[]},onClearHours:()=>{e.usageSelectedHours=[]},onClearSessions:()=>{e.usageSelectedSessions=[],e.usageTimeSeries=null,e.usageSessionLogs=null},onClearFilters:()=>{e.usageSelectedDays=[],e.usageSelectedHours=[],e.usageSelectedSessions=[],e.usageTimeSeries=null,e.usageSessionLogs=null}}):f}

        ${e.tab==="cron"?fm({basePath:e.basePath,loading:e.cronLoading,status:e.cronStatus,jobs:e.cronJobs,error:e.cronError,busy:e.cronBusy,form:e.cronForm,channels:e.channelsSnapshot?.channelMeta?.length?e.channelsSnapshot.channelMeta.map(d=>d.id):e.channelsSnapshot?.channelOrder??[],channelLabels:e.channelsSnapshot?.channelLabels??{},channelMeta:e.channelsSnapshot?.channelMeta??[],runsJobId:e.cronRunsJobId,runs:e.cronRuns,onFormChange:d=>e.cronForm={...e.cronForm,...d},onRefresh:()=>e.loadCron(),onAdd:()=>Rd(e),onToggle:(d,b)=>Pd(e,d,b),onRun:d=>Dd(e,d),onRemove:d=>Nd(e,d),onLoadRuns:d=>jr(e,d)}):f}

        ${e.tab==="agents"?Gp({loading:e.agentsLoading,error:e.agentsError,agentsList:e.agentsList,selectedAgentId:m,activePanel:e.agentsPanel,configForm:p,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,channelsLoading:e.channelsLoading,channelsError:e.channelsError,channelsSnapshot:e.channelsSnapshot,channelsLastSuccess:e.channelsLastSuccess,cronLoading:e.cronLoading,cronStatus:e.cronStatus,cronJobs:e.cronJobs,cronError:e.cronError,agentFilesLoading:e.agentFilesLoading,agentFilesError:e.agentFilesError,agentFilesList:e.agentFilesList,agentFileActive:e.agentFileActive,agentFileContents:e.agentFileContents,agentFileDrafts:e.agentFileDrafts,agentFileSaving:e.agentFileSaving,agentIdentityLoading:e.agentIdentityLoading,agentIdentityError:e.agentIdentityError,agentIdentityById:e.agentIdentityById,agentSkillsLoading:e.agentSkillsLoading,agentSkillsReport:e.agentSkillsReport,agentSkillsError:e.agentSkillsError,agentSkillsAgentId:e.agentSkillsAgentId,skillsFilter:e.skillsFilter,onRefresh:async()=>{await Zi(e);const d=e.agentsList?.agents?.map(b=>b.id)??[];d.length>0&&Hr(e,d)},onSelectAgent:d=>{e.agentsSelectedId!==d&&(e.agentsSelectedId=d,e.agentFilesList=null,e.agentFilesError=null,e.agentFilesLoading=!1,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},e.agentSkillsReport=null,e.agentSkillsError=null,e.agentSkillsAgentId=null,Ur(e,d),e.agentsPanel==="files"&&Ws(e,d),e.agentsPanel==="skills"&&zn(e,d))},onSelectPanel:d=>{e.agentsPanel=d,d==="files"&&m&&e.agentFilesList?.agentId!==m&&(e.agentFilesList=null,e.agentFilesError=null,e.agentFileActive=null,e.agentFileContents={},e.agentFileDrafts={},Ws(e,m)),d==="skills"&&m&&zn(e,m),d==="channels"&&$e(e,!1),d==="cron"&&e.loadCron()},onLoadFiles:d=>Ws(e,d),onSelectFile:d=>{e.agentFileActive=d,m&&wp(e,m,d)},onFileDraftChange:(d,b)=>{e.agentFileDrafts={...e.agentFileDrafts,[d]:b}},onFileReset:d=>{const b=e.agentFileContents[d]??"";e.agentFileDrafts={...e.agentFileDrafts,[d]:b}},onFileSave:d=>{if(!m)return;const b=e.agentFileDrafts[d]??e.agentFileContents[d]??"";kp(e,m,d,b)},onToolsProfileChange:(d,b,y)=>{if(!p)return;const _=p.agents?.list;if(!Array.isArray(_))return;const L=_.findIndex(T=>T&&typeof T=="object"&&"id"in T&&T.id===d);if(L<0)return;const E=["agents","list",L,"tools"];b?ke(e,[...E,"profile"],b):je(e,[...E,"profile"]),y&&je(e,[...E,"allow"])},onToolsOverridesChange:(d,b,y)=>{if(!p)return;const _=p.agents?.list;if(!Array.isArray(_))return;const L=_.findIndex(T=>T&&typeof T=="object"&&"id"in T&&T.id===d);if(L<0)return;const E=["agents","list",L,"tools"];b.length>0?ke(e,[...E,"alsoAllow"],b):je(e,[...E,"alsoAllow"]),y.length>0?ke(e,[...E,"deny"],y):je(e,[...E,"deny"])},onConfigReload:()=>Se(e),onConfigSave:()=>Bn(e),onChannelsRefresh:()=>$e(e,!1),onCronRefresh:()=>e.loadCron(),onSkillsFilterChange:d=>e.skillsFilter=d,onSkillsRefresh:()=>{m&&zn(e,m)},onAgentSkillToggle:(d,b,y)=>{if(!p)return;const _=p.agents?.list;if(!Array.isArray(_))return;const L=_.findIndex(q=>q&&typeof q=="object"&&"id"in q&&q.id===d);if(L<0)return;const E=_[L],T=b.trim();if(!T)return;const P=e.agentSkillsReport?.skills?.map(q=>q.name).filter(Boolean)??[],R=(Array.isArray(E.skills)?E.skills.map(q=>String(q).trim()).filter(Boolean):void 0)??P,H=new Set(R);y?H.add(T):H.delete(T),ke(e,["agents","list",L,"skills"],[...H])},onAgentSkillsClear:d=>{if(!p)return;const b=p.agents?.list;if(!Array.isArray(b))return;const y=b.findIndex(_=>_&&typeof _=="object"&&"id"in _&&_.id===d);y<0||je(e,["agents","list",y,"skills"])},onAgentSkillsDisableAll:d=>{if(!p)return;const b=p.agents?.list;if(!Array.isArray(b))return;const y=b.findIndex(_=>_&&typeof _=="object"&&"id"in _&&_.id===d);y<0||ke(e,["agents","list",y,"skills"],[])},onModelChange:(d,b)=>{if(!p)return;const y=p.agents?.list;if(!Array.isArray(y))return;const _=y.findIndex(P=>P&&typeof P=="object"&&"id"in P&&P.id===d);if(_<0)return;const L=["agents","list",_,"model"];if(!b){je(e,L);return}const T=y[_]?.model;if(T&&typeof T=="object"&&!Array.isArray(T)){const P=T.fallbacks,G={primary:b,...Array.isArray(P)?{fallbacks:P}:{}};ke(e,L,G)}else ke(e,L,b)},onModelFallbacksChange:(d,b)=>{if(!p)return;const y=p.agents?.list;if(!Array.isArray(y))return;const _=y.findIndex(q=>q&&typeof q=="object"&&"id"in q&&q.id===d);if(_<0)return;const L=["agents","list",_,"model"],E=y[_],T=b.map(q=>q.trim()).filter(Boolean),P=E.model,R=(()=>{if(typeof P=="string")return P.trim()||null;if(P&&typeof P=="object"&&!Array.isArray(P)){const q=P.primary;if(typeof q=="string")return q.trim()||null}return null})();if(T.length===0){R?ke(e,L,R):je(e,L);return}ke(e,L,R?{primary:R,fallbacks:T}:{fallbacks:T})}}):f}

        ${e.tab==="skills"?Pb({loading:e.skillsLoading,report:e.skillsReport,error:e.skillsError,filter:e.skillsFilter,edits:e.skillEdits,messages:e.skillMessages,busyKey:e.skillsBusyKey,onFilterChange:d=>e.skillsFilter=d,onRefresh:()=>fn(e,{clearMessages:!0}),onToggle:(d,b)=>ku(e,d,b),onEdit:(d,b)=>wu(e,d,b),onSaveKey:d=>Su(e,d),onInstall:(d,b,y)=>Au(e,d,b,y)}):f}

        ${e.tab==="nodes"?Rm({loading:e.nodesLoading,nodes:e.nodes,devicesLoading:e.devicesLoading,devicesError:e.devicesError,devicesList:e.devicesList,configForm:e.configForm??e.configSnapshot?.config,configLoading:e.configLoading,configSaving:e.configSaving,configDirty:e.configFormDirty,configFormMode:e.configFormMode,execApprovalsLoading:e.execApprovalsLoading,execApprovalsSaving:e.execApprovalsSaving,execApprovalsDirty:e.execApprovalsDirty,execApprovalsSnapshot:e.execApprovalsSnapshot,execApprovalsForm:e.execApprovalsForm,execApprovalsSelectedAgent:e.execApprovalsSelectedAgent,execApprovalsTarget:e.execApprovalsTarget,execApprovalsTargetNodeId:e.execApprovalsTargetNodeId,onRefresh:()=>ls(e),onDevicesRefresh:()=>tt(e),onDeviceApprove:d=>du(e,d),onDeviceReject:d=>uu(e,d),onDeviceRotate:(d,b,y)=>gu(e,{deviceId:d,role:b,scopes:y}),onDeviceRevoke:(d,b)=>pu(e,{deviceId:d,role:b}),onLoadConfig:()=>Se(e),onLoadExecApprovals:()=>{const d=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return oa(e,d)},onBindDefault:d=>{d?ke(e,["tools","exec","node"],d):je(e,["tools","exec","node"])},onBindAgent:(d,b)=>{const y=["agents","list",d,"tools","exec","node"];b?ke(e,y,b):je(e,y)},onSaveBindings:()=>Bn(e),onExecApprovalsTargetChange:(d,b)=>{e.execApprovalsTarget=d,e.execApprovalsTargetNodeId=b,e.execApprovalsSnapshot=null,e.execApprovalsForm=null,e.execApprovalsDirty=!1,e.execApprovalsSelectedAgent=null},onExecApprovalsSelectAgent:d=>{e.execApprovalsSelectedAgent=d},onExecApprovalsPatch:(d,b)=>bu(e,d,b),onExecApprovalsRemove:d=>yu(e,d),onSaveExecApprovals:()=>{const d=e.execApprovalsTarget==="node"&&e.execApprovalsTargetNodeId?{kind:"node",nodeId:e.execApprovalsTargetNodeId}:{kind:"gateway"};return mu(e,d)}}):f}

        ${e.tab==="chat"?am({locale:e.uiLocale,sessionKey:e.sessionKey,onSessionKeyChange:d=>{e.sessionKey=d,e.chatMessage="",e.chatAttachments=[],e.chatStream=null,e.chatStreamStartedAt=null,e.chatRunId=null,e.chatQueue=[],e.resetToolStream(),e.resetChatScroll(),e.applySettings({...e.settings,sessionKey:d,lastActiveSessionKey:d}),e.loadAssistantIdentity(),un(e),$i(e)},thinkingLevel:e.chatThinkingLevel,showThinking:l,loading:e.chatLoading,sending:e.chatSending,compactionStatus:e.compactionStatus,assistantAvatarUrl:g,messages:e.chatMessages,toolMessages:e.chatToolMessages,stream:e.chatStream,streamStartedAt:e.chatStreamStartedAt,draft:e.chatMessage,queue:e.chatQueue,connected:e.connected,canSend:e.connected,disabledReason:a,error:e.lastError,sessions:e.sessionsResult,focusMode:c,onRefresh:()=>(e.resetToolStream(),Promise.all([un(e),$i(e)])),onToggleFocusMode:()=>{e.onboarding||e.applySettings({...e.settings,chatFocusMode:!e.settings.chatFocusMode})},onChatScroll:d=>e.handleChatScroll(d),onDraftChange:d=>e.chatMessage=d,attachments:e.chatAttachments,onAttachmentsChange:d=>e.chatAttachments=d,onSend:()=>e.handleSendChat(),canAbort:!!e.chatRunId,onAbort:()=>{e.handleAbortChat()},onQueueRemove:d=>e.removeQueuedMessage(d),onNewSession:()=>e.handleSendChat("/new",{restoreDraft:!0}),showNewMessages:e.chatNewMessagesBelow&&!e.chatManualRefreshInFlight,onScrollToBottom:()=>e.scrollToBottom(),sidebarOpen:e.sidebarOpen,sidebarContent:e.sidebarContent,sidebarError:e.sidebarError,splitRatio:e.splitRatio,onOpenSidebar:d=>e.handleOpenSidebar(d),onCloseSidebar:()=>e.handleCloseSidebar(),onSplitRatioChange:d=>e.handleSplitRatioChange(d),assistantName:e.assistantName,assistantAvatar:e.assistantAvatar}):f}

      </main>

      ${Mb(e,{config:gm({locale:e.uiLocale,raw:e.configRaw,originalRaw:e.configRawOriginal,valid:e.configValid,issues:e.configIssues,loading:e.configLoading,saving:e.configSaving,applying:e.configApplying,updating:e.updateRunning,connected:e.connected,schema:e.configSchema,schemaLoading:e.configSchemaLoading,uiHints:e.configUiHints,formMode:e.configFormMode,formValue:e.configForm,originalValue:e.configFormOriginal,searchQuery:e.configSearchQuery,activeSection:e.configActiveSection,activeSubsection:e.configActiveSubsection,onRawChange:d=>{e.configRaw=d},onFormModeChange:d=>e.configFormMode=d,onFormPatch:(d,b)=>ke(e,d,b),onSearchChange:d=>e.configSearchQuery=d,onSectionChange:d=>{e.configActiveSection=d,e.configActiveSubsection=null},onSubsectionChange:d=>e.configActiveSubsection=d,onReload:()=>Se(e),onSave:()=>Bn(e),onApply:()=>Xc(e),onUpdate:()=>ed(e)}),logs:Mm({locale:e.uiLocale,loading:e.logsLoading,error:e.logsError,file:e.logsFile,entries:e.logsEntries,filterText:e.logsFilterText,levelFilters:e.logsLevelFilters,autoFollow:e.logsAutoFollow,truncated:e.logsTruncated,onFilterTextChange:d=>e.logsFilterText=d,onLevelToggle:(d,b)=>{e.logsLevelFilters={...e.logsLevelFilters,[d]:b}},onToggleAutoFollow:d=>e.logsAutoFollow=d,onRefresh:()=>rn(e,{reset:!0}),onExport:(d,b)=>e.exportLogs(d,b),onScroll:d=>e.handleLogsScroll(d)}),debug:km({locale:e.uiLocale,loading:e.debugLoading,status:e.debugStatus,health:e.debugHealth,models:e.debugModels,heartbeat:e.debugHeartbeat,eventLog:e.eventLog,callMethod:e.debugCallMethod,callParams:e.debugCallParams,callResult:e.debugCallResult,callError:e.debugCallError,onCallMethodChange:d=>e.debugCallMethod=d,onCallParamsChange:d=>e.debugCallParams=d,onRefresh:()=>Dt(e),onCall:()=>xd(e)})})}
      ${Am(e)}
      ${Cm(e)}
    </div>
  `}var ky=Object.defineProperty,Sy=Object.getOwnPropertyDescriptor,w=(e,t,n,s)=>{for(var i=s>1?void 0:s?Sy(t,n):t,a=e.length-1,o;a>=0;a--)(o=e[a])&&(i=(s?o(t,n,i):o(i))||i);return s&&i&&ky(t,n,i),i};const ri=jg();function Ay(){if(!window.location.search)return!1;const t=new URLSearchParams(window.location.search).get("onboarding");if(!t)return!1;const n=t.trim().toLowerCase();return n==="1"||n==="true"||n==="yes"||n==="on"}let $=class extends Mt{constructor(){super(...arguments),this.initialLocale=ul(),this.settings=Qu(),this.password="",this.tab="chat",this.onboarding=Ay(),this.uiLocale=this.initialLocale,this.connected=!1,this.theme=this.settings.theme??"system",this.themeResolved="dark",this.hello=null,this.lastError=null,this.eventLog=[],this.eventLogBuffer=[],this.toolStreamSyncTimer=null,this.sidebarCloseTimer=null,this.assistantName=ri.name,this.assistantAvatar=ri.avatar,this.assistantAgentId=ri.agentId??null,this.sessionKey=this.settings.sessionKey,this.chatLoading=!1,this.chatSending=!1,this.chatMessage="",this.chatMessages=[],this.chatToolMessages=[],this.chatStream=null,this.chatStreamStartedAt=null,this.chatRunId=null,this.compactionStatus=null,this.chatAvatarUrl=null,this.chatThinkingLevel=null,this.chatQueue=[],this.chatAttachments=[],this.chatManualRefreshInFlight=!1,this.sidebarOpen=!1,this.sidebarContent=null,this.sidebarError=null,this.splitRatio=this.settings.splitRatio,this.nodesLoading=!1,this.nodes=[],this.devicesLoading=!1,this.devicesError=null,this.devicesList=null,this.execApprovalsLoading=!1,this.execApprovalsSaving=!1,this.execApprovalsDirty=!1,this.execApprovalsSnapshot=null,this.execApprovalsForm=null,this.execApprovalsSelectedAgent=null,this.execApprovalsTarget="gateway",this.execApprovalsTargetNodeId=null,this.execApprovalQueue=[],this.execApprovalBusy=!1,this.execApprovalError=null,this.pendingGatewayUrl=null,this.configLoading=!1,this.configRaw=`{
}
`,this.configRawOriginal="",this.configValid=null,this.configIssues=[],this.configSaving=!1,this.configApplying=!1,this.updateRunning=!1,this.applySessionKey=this.settings.lastActiveSessionKey,this.configSnapshot=null,this.configSchema=null,this.configSchemaVersion=null,this.configSchemaLoading=!1,this.configUiHints={},this.configForm=null,this.configFormOriginal=null,this.configFormDirty=!1,this.configFormMode="form",this.configSearchQuery="",this.configActiveSection=null,this.configActiveSubsection=null,this.channelsLoading=!1,this.channelsSnapshot=null,this.channelsError=null,this.channelsLastSuccess=null,this.whatsappLoginMessage=null,this.whatsappLoginQrDataUrl=null,this.whatsappLoginConnected=null,this.whatsappBusy=!1,this.nostrProfileFormState=null,this.nostrProfileAccountId=null,this.presenceLoading=!1,this.presenceEntries=[],this.presenceError=null,this.presenceStatus=null,this.agentsLoading=!1,this.agentsList=null,this.agentsError=null,this.agentsSelectedId=null,this.agentsPanel="overview",this.agentFilesLoading=!1,this.agentFilesError=null,this.agentFilesList=null,this.agentFileContents={},this.agentFileDrafts={},this.agentFileActive=null,this.agentFileSaving=!1,this.agentIdentityLoading=!1,this.agentIdentityError=null,this.agentIdentityById={},this.agentSkillsLoading=!1,this.agentSkillsError=null,this.agentSkillsReport=null,this.agentSkillsAgentId=null,this.sessionsLoading=!1,this.sessionsResult=null,this.sessionsError=null,this.sessionsFilterActive="",this.sessionsFilterLimit="120",this.sessionsIncludeGlobal=!0,this.sessionsIncludeUnknown=!1,this.usageLoading=!1,this.usageResult=null,this.usageCostSummary=null,this.usageError=null,this.usageStartDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageEndDate=(()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`})(),this.usageSelectedSessions=[],this.usageSelectedDays=[],this.usageSelectedHours=[],this.usageChartMode="tokens",this.usageDailyChartMode="by-type",this.usageTimeSeriesMode="per-turn",this.usageTimeSeriesBreakdownMode="by-type",this.usageTimeSeries=null,this.usageTimeSeriesLoading=!1,this.usageSessionLogs=null,this.usageSessionLogsLoading=!1,this.usageSessionLogsExpanded=!1,this.usageQuery="",this.usageQueryDraft="",this.usageSessionSort="recent",this.usageSessionSortDir="desc",this.usageRecentSessions=[],this.usageTimeZone="local",this.usageContextExpanded=!1,this.usageHeaderPinned=!1,this.usageSessionsTab="all",this.usageVisibleColumns=["channel","agent","provider","model","messages","tools","errors","duration"],this.usageLogFilterRoles=[],this.usageLogFilterTools=[],this.usageLogFilterHasTools=!1,this.usageLogFilterQuery="",this.usageQueryDebounceTimer=null,this.cronLoading=!1,this.cronJobs=[],this.cronStatus=null,this.cronError=null,this.cronForm={...zg},this.cronRunsJobId=null,this.cronRuns=[],this.cronBusy=!1,this.skillsLoading=!1,this.skillsReport=null,this.skillsError=null,this.skillsFilter="",this.skillEdits={},this.skillsBusyKey=null,this.skillMessages={},this.debugLoading=!1,this.debugStatus=null,this.debugHealth=null,this.debugModels=[],this.debugHeartbeat=null,this.debugCallMethod="",this.debugCallParams="{}",this.debugCallResult=null,this.debugCallError=null,this.logsLoading=!1,this.logsError=null,this.logsFile=null,this.logsEntries=[],this.logsFilterText="",this.logsLevelFilters={...Bg},this.logsAutoFollow=!0,this.logsTruncated=!1,this.logsCursor=null,this.logsLastFetchAt=null,this.logsLimit=500,this.logsMaxBytes=25e4,this.logsAtBottom=!0,this.settingsOpen=!1,this.settingsSection="general",this.showOnboardingWizard=!0,this.onboardingStep=1,this.onboardingLocale=this.initialLocale,this.onboardingLoginStatus="idle",this.onboardingLoginDisplayName=null,this.onboardingLoginAvatarUrl=null,this.onboardingLoginEmail=null,this.onboardingLoginError=null,this.onboardingIsExistingAccount=!1,this.onboardingSelectedProvider=null,this.onboardingProviderApiKey="",this.onboardingProviderSearchQuery="",this.onboardingSelectedChannel=null,this.onboardingChannelToken="",this.client=null,this.chatScrollFrame=null,this.chatScrollTimeout=null,this.chatHasAutoScrolled=!1,this.chatUserNearBottom=!0,this.chatNewMessagesBelow=!1,this.nodesPollInterval=null,this.logsPollInterval=null,this.debugPollInterval=null,this.logsScrollFrame=null,this.toolStreamById=new Map,this.toolStreamOrder=[],this.refreshSessionsAfterChat=new Set,this.basePath="",this.popStateHandler=()=>og(this),this.themeMedia=null,this.themeMediaHandler=null,this.topbarObserver=null}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),Os(this.uiLocale),sp(this)}firstUpdated(){ip(this)}disconnectedCallback(){ap(this),super.disconnectedCallback()}updated(e){rp(this,e)}connect(){ga(this)}handleChatScroll(e){vd(this,e)}handleLogsScroll(e){md(this,e)}exportLogs(e,t){bd(e,t)}resetToolStream(){fs(this)}resetChatScroll(){ro(this)}scrollToBottom(e){ro(this),pn(this,!0,!!e?.smooth)}async loadAssistantIdentity(){await Ll(this)}applySettings(e){qe(this,e)}setTab(e){bl(this,e)}setTheme(e,t){bi(this,e,t)}async loadOverview(){await $l(this)}async loadCron(){await Yn(this)}async handleAbortChat(){await Al(this)}removeQueuedMessage(e){Pg(this,e)}async handleSendChat(e,t){await Dg(this,e,t)}async handleWhatsAppStart(e){await id(this,e)}async handleWhatsAppWait(){await ad(this)}async handleWhatsAppLogout(){await od(this)}async handleChannelConfigSave(){await rd(this)}async handleChannelConfigReload(){await ld(this)}handleNostrProfileEdit(e,t){dd(this,e,t)}handleNostrProfileCancel(){ud(this)}handleNostrProfileFieldChange(e,t){gd(this,e,t)}async handleNostrProfileSave(){await hd(this)}async handleNostrProfileImport(){await fd(this)}handleNostrProfileToggleAdvanced(){pd(this)}async handleExecApprovalDecision(e){const t=this.execApprovalQueue[0];if(!(!t||!this.client||this.execApprovalBusy)){this.execApprovalBusy=!0,this.execApprovalError=null;try{await this.client.request("exec.approval.resolve",{id:t.id,decision:e}),this.execApprovalQueue=this.execApprovalQueue.filter(n=>n.id!==t.id)}catch(n){this.execApprovalError=`Exec approval failed: ${String(n)}`}finally{this.execApprovalBusy=!1}}}handleGatewayUrlConfirm(){const e=this.pendingGatewayUrl;e&&(this.pendingGatewayUrl=null,qe(this,{...this.settings,gatewayUrl:e}),this.connect())}handleGatewayUrlCancel(){this.pendingGatewayUrl=null}openSettings(e){this.settingsSection=e??"general",this.settingsOpen=!0,e==="config"?(Wn(this),Se(this)):e==="logs"?(this.logsAtBottom=!0,rn(this,{reset:!0})):e==="debug"&&Dt(this)}closeSettings(){this.settingsOpen=!1}setSettingsSection(e){this.settingsSection=e,e==="config"?(Wn(this),Se(this)):e==="logs"?(this.logsAtBottom=!0,rn(this,{reset:!0})):e==="debug"&&Dt(this)}handleOpenSidebar(e){this.sidebarCloseTimer!=null&&(window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=null),this.sidebarContent=e,this.sidebarError=null,this.sidebarOpen=!0}handleCloseSidebar(){this.sidebarOpen=!1,this.sidebarCloseTimer!=null&&window.clearTimeout(this.sidebarCloseTimer),this.sidebarCloseTimer=window.setTimeout(()=>{this.sidebarOpen||(this.sidebarContent=null,this.sidebarError=null,this.sidebarCloseTimer=null)},200)}handleSplitRatioChange(e){const t=Math.max(.4,Math.min(.7,e));this.splitRatio=t,this.applySettings({...this.settings,splitRatio:t})}setOnboardingStep(e){this.onboardingStep=e}setUiLocale(e){const t=Qn(e);this.onboardingLocale=t,this.uiLocale=t,Os(t)}setOnboardingLocale(e){this.setUiLocale(e)}setOnboardingProvider(e){this.onboardingSelectedProvider=e,e||(this.onboardingProviderApiKey="")}setOnboardingProviderApiKey(e){this.onboardingProviderApiKey=e}setOnboardingProviderSearchQuery(e){this.onboardingProviderSearchQuery=e}setOnboardingChannel(e){this.onboardingSelectedChannel=e,e||(this.onboardingChannelToken="")}setOnboardingChannelToken(e){this.onboardingChannelToken=e}onboardingGoogleLogin(){this.onboardingLoginStatus="loading",this.onboardingLoginError=null,setTimeout(()=>{this.onboardingLoginStatus="success",this.onboardingLoginDisplayName="Google User",this.onboardingLoginEmail="user@gmail.com",this.onboardingLoginAvatarUrl=null,this.onboardingIsExistingAccount=!1},1200)}onboardingGithubLogin(){this.onboardingLoginStatus="loading",this.onboardingLoginError=null,setTimeout(()=>{this.onboardingLoginStatus="success",this.onboardingLoginDisplayName="GitHub User",this.onboardingLoginEmail="user@github.com",this.onboardingLoginAvatarUrl=null,this.onboardingIsExistingAccount=!1},1200)}onboardingLogout(){this.onboardingLoginStatus="idle",this.onboardingLoginDisplayName=null,this.onboardingLoginAvatarUrl=null,this.onboardingLoginEmail=null,this.onboardingLoginError=null,this.onboardingIsExistingAccount=!1}finishOnboarding(){this.uiLocale=this.onboardingLocale,Os(this.onboardingLocale),localStorage.setItem("opensoul.onboarding.done","1"),this.showOnboardingWizard=!1}render(){return wy(this)}};w([k()],$.prototype,"settings",2);w([k()],$.prototype,"password",2);w([k()],$.prototype,"tab",2);w([k()],$.prototype,"onboarding",2);w([k()],$.prototype,"uiLocale",2);w([k()],$.prototype,"connected",2);w([k()],$.prototype,"theme",2);w([k()],$.prototype,"themeResolved",2);w([k()],$.prototype,"hello",2);w([k()],$.prototype,"lastError",2);w([k()],$.prototype,"eventLog",2);w([k()],$.prototype,"assistantName",2);w([k()],$.prototype,"assistantAvatar",2);w([k()],$.prototype,"assistantAgentId",2);w([k()],$.prototype,"sessionKey",2);w([k()],$.prototype,"chatLoading",2);w([k()],$.prototype,"chatSending",2);w([k()],$.prototype,"chatMessage",2);w([k()],$.prototype,"chatMessages",2);w([k()],$.prototype,"chatToolMessages",2);w([k()],$.prototype,"chatStream",2);w([k()],$.prototype,"chatStreamStartedAt",2);w([k()],$.prototype,"chatRunId",2);w([k()],$.prototype,"compactionStatus",2);w([k()],$.prototype,"chatAvatarUrl",2);w([k()],$.prototype,"chatThinkingLevel",2);w([k()],$.prototype,"chatQueue",2);w([k()],$.prototype,"chatAttachments",2);w([k()],$.prototype,"chatManualRefreshInFlight",2);w([k()],$.prototype,"sidebarOpen",2);w([k()],$.prototype,"sidebarContent",2);w([k()],$.prototype,"sidebarError",2);w([k()],$.prototype,"splitRatio",2);w([k()],$.prototype,"nodesLoading",2);w([k()],$.prototype,"nodes",2);w([k()],$.prototype,"devicesLoading",2);w([k()],$.prototype,"devicesError",2);w([k()],$.prototype,"devicesList",2);w([k()],$.prototype,"execApprovalsLoading",2);w([k()],$.prototype,"execApprovalsSaving",2);w([k()],$.prototype,"execApprovalsDirty",2);w([k()],$.prototype,"execApprovalsSnapshot",2);w([k()],$.prototype,"execApprovalsForm",2);w([k()],$.prototype,"execApprovalsSelectedAgent",2);w([k()],$.prototype,"execApprovalsTarget",2);w([k()],$.prototype,"execApprovalsTargetNodeId",2);w([k()],$.prototype,"execApprovalQueue",2);w([k()],$.prototype,"execApprovalBusy",2);w([k()],$.prototype,"execApprovalError",2);w([k()],$.prototype,"pendingGatewayUrl",2);w([k()],$.prototype,"configLoading",2);w([k()],$.prototype,"configRaw",2);w([k()],$.prototype,"configRawOriginal",2);w([k()],$.prototype,"configValid",2);w([k()],$.prototype,"configIssues",2);w([k()],$.prototype,"configSaving",2);w([k()],$.prototype,"configApplying",2);w([k()],$.prototype,"updateRunning",2);w([k()],$.prototype,"applySessionKey",2);w([k()],$.prototype,"configSnapshot",2);w([k()],$.prototype,"configSchema",2);w([k()],$.prototype,"configSchemaVersion",2);w([k()],$.prototype,"configSchemaLoading",2);w([k()],$.prototype,"configUiHints",2);w([k()],$.prototype,"configForm",2);w([k()],$.prototype,"configFormOriginal",2);w([k()],$.prototype,"configFormDirty",2);w([k()],$.prototype,"configFormMode",2);w([k()],$.prototype,"configSearchQuery",2);w([k()],$.prototype,"configActiveSection",2);w([k()],$.prototype,"configActiveSubsection",2);w([k()],$.prototype,"channelsLoading",2);w([k()],$.prototype,"channelsSnapshot",2);w([k()],$.prototype,"channelsError",2);w([k()],$.prototype,"channelsLastSuccess",2);w([k()],$.prototype,"whatsappLoginMessage",2);w([k()],$.prototype,"whatsappLoginQrDataUrl",2);w([k()],$.prototype,"whatsappLoginConnected",2);w([k()],$.prototype,"whatsappBusy",2);w([k()],$.prototype,"nostrProfileFormState",2);w([k()],$.prototype,"nostrProfileAccountId",2);w([k()],$.prototype,"presenceLoading",2);w([k()],$.prototype,"presenceEntries",2);w([k()],$.prototype,"presenceError",2);w([k()],$.prototype,"presenceStatus",2);w([k()],$.prototype,"agentsLoading",2);w([k()],$.prototype,"agentsList",2);w([k()],$.prototype,"agentsError",2);w([k()],$.prototype,"agentsSelectedId",2);w([k()],$.prototype,"agentsPanel",2);w([k()],$.prototype,"agentFilesLoading",2);w([k()],$.prototype,"agentFilesError",2);w([k()],$.prototype,"agentFilesList",2);w([k()],$.prototype,"agentFileContents",2);w([k()],$.prototype,"agentFileDrafts",2);w([k()],$.prototype,"agentFileActive",2);w([k()],$.prototype,"agentFileSaving",2);w([k()],$.prototype,"agentIdentityLoading",2);w([k()],$.prototype,"agentIdentityError",2);w([k()],$.prototype,"agentIdentityById",2);w([k()],$.prototype,"agentSkillsLoading",2);w([k()],$.prototype,"agentSkillsError",2);w([k()],$.prototype,"agentSkillsReport",2);w([k()],$.prototype,"agentSkillsAgentId",2);w([k()],$.prototype,"sessionsLoading",2);w([k()],$.prototype,"sessionsResult",2);w([k()],$.prototype,"sessionsError",2);w([k()],$.prototype,"sessionsFilterActive",2);w([k()],$.prototype,"sessionsFilterLimit",2);w([k()],$.prototype,"sessionsIncludeGlobal",2);w([k()],$.prototype,"sessionsIncludeUnknown",2);w([k()],$.prototype,"usageLoading",2);w([k()],$.prototype,"usageResult",2);w([k()],$.prototype,"usageCostSummary",2);w([k()],$.prototype,"usageError",2);w([k()],$.prototype,"usageStartDate",2);w([k()],$.prototype,"usageEndDate",2);w([k()],$.prototype,"usageSelectedSessions",2);w([k()],$.prototype,"usageSelectedDays",2);w([k()],$.prototype,"usageSelectedHours",2);w([k()],$.prototype,"usageChartMode",2);w([k()],$.prototype,"usageDailyChartMode",2);w([k()],$.prototype,"usageTimeSeriesMode",2);w([k()],$.prototype,"usageTimeSeriesBreakdownMode",2);w([k()],$.prototype,"usageTimeSeries",2);w([k()],$.prototype,"usageTimeSeriesLoading",2);w([k()],$.prototype,"usageSessionLogs",2);w([k()],$.prototype,"usageSessionLogsLoading",2);w([k()],$.prototype,"usageSessionLogsExpanded",2);w([k()],$.prototype,"usageQuery",2);w([k()],$.prototype,"usageQueryDraft",2);w([k()],$.prototype,"usageSessionSort",2);w([k()],$.prototype,"usageSessionSortDir",2);w([k()],$.prototype,"usageRecentSessions",2);w([k()],$.prototype,"usageTimeZone",2);w([k()],$.prototype,"usageContextExpanded",2);w([k()],$.prototype,"usageHeaderPinned",2);w([k()],$.prototype,"usageSessionsTab",2);w([k()],$.prototype,"usageVisibleColumns",2);w([k()],$.prototype,"usageLogFilterRoles",2);w([k()],$.prototype,"usageLogFilterTools",2);w([k()],$.prototype,"usageLogFilterHasTools",2);w([k()],$.prototype,"usageLogFilterQuery",2);w([k()],$.prototype,"cronLoading",2);w([k()],$.prototype,"cronJobs",2);w([k()],$.prototype,"cronStatus",2);w([k()],$.prototype,"cronError",2);w([k()],$.prototype,"cronForm",2);w([k()],$.prototype,"cronRunsJobId",2);w([k()],$.prototype,"cronRuns",2);w([k()],$.prototype,"cronBusy",2);w([k()],$.prototype,"skillsLoading",2);w([k()],$.prototype,"skillsReport",2);w([k()],$.prototype,"skillsError",2);w([k()],$.prototype,"skillsFilter",2);w([k()],$.prototype,"skillEdits",2);w([k()],$.prototype,"skillsBusyKey",2);w([k()],$.prototype,"skillMessages",2);w([k()],$.prototype,"debugLoading",2);w([k()],$.prototype,"debugStatus",2);w([k()],$.prototype,"debugHealth",2);w([k()],$.prototype,"debugModels",2);w([k()],$.prototype,"debugHeartbeat",2);w([k()],$.prototype,"debugCallMethod",2);w([k()],$.prototype,"debugCallParams",2);w([k()],$.prototype,"debugCallResult",2);w([k()],$.prototype,"debugCallError",2);w([k()],$.prototype,"logsLoading",2);w([k()],$.prototype,"logsError",2);w([k()],$.prototype,"logsFile",2);w([k()],$.prototype,"logsEntries",2);w([k()],$.prototype,"logsFilterText",2);w([k()],$.prototype,"logsLevelFilters",2);w([k()],$.prototype,"logsAutoFollow",2);w([k()],$.prototype,"logsTruncated",2);w([k()],$.prototype,"logsCursor",2);w([k()],$.prototype,"logsLastFetchAt",2);w([k()],$.prototype,"logsLimit",2);w([k()],$.prototype,"logsMaxBytes",2);w([k()],$.prototype,"logsAtBottom",2);w([k()],$.prototype,"settingsOpen",2);w([k()],$.prototype,"settingsSection",2);w([k()],$.prototype,"showOnboardingWizard",2);w([k()],$.prototype,"onboardingStep",2);w([k()],$.prototype,"onboardingLocale",2);w([k()],$.prototype,"onboardingLoginStatus",2);w([k()],$.prototype,"onboardingLoginDisplayName",2);w([k()],$.prototype,"onboardingLoginAvatarUrl",2);w([k()],$.prototype,"onboardingLoginEmail",2);w([k()],$.prototype,"onboardingLoginError",2);w([k()],$.prototype,"onboardingIsExistingAccount",2);w([k()],$.prototype,"onboardingSelectedProvider",2);w([k()],$.prototype,"onboardingProviderApiKey",2);w([k()],$.prototype,"onboardingProviderSearchQuery",2);w([k()],$.prototype,"onboardingSelectedChannel",2);w([k()],$.prototype,"onboardingChannelToken",2);w([k()],$.prototype,"chatNewMessagesBelow",2);$=w([Pr("opensoul-app")],$);
//# sourceMappingURL=index-BGA37Z-o.js.map
