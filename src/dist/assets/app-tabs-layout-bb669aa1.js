import{m as b,r as c,k as z,B as Q,C as V,D as i,E as H,F as A,G as W,H as X,o as y,s as B,J as G,K as Y,M as Z,O as tt,T as et,z as F,j as p,P as rt,f as M}from"./index-e705403d.js";const J=b.createContext(!1);function P(){return P=Object.assign?Object.assign.bind():function(t){for(var a=1;a<arguments.length;a++){var s=arguments[a];for(var e in s)Object.prototype.hasOwnProperty.call(s,e)&&(t[e]=s[e])}return t},P.apply(this,arguments)}const K=c.forwardRef((t,a)=>{const{className:s,id:e,style:x,children:h,tabActive:j}=t,C=z(t),l=c.useRef(null),r=c.useRef(null),n=c.useContext(Q),u=c.useContext(J);let m=null;if(!r.current&&n&&n.route&&n.route.route&&n.route.route.tab&&n.route.route.tab.id===e){const{component:g,asyncComponent:w,options:E}=n.route.route.tab;if(g||w){const d=n.route.route.options&&n.route.route.options.props;m={id:V(),component:g||w,isAsync:!!w,props:{...d||{},...E&&E.props||{},f7router:n.router,f7route:n.route,...n.route.params}}}}const[o,N]=c.useState(m||null);c.useImperativeHandle(a,()=>({el:l.current})),i&&!r.current&&(r.current={setTabContent:N},H.tabs.push(r.current));const _=()=>{l.current&&m&&(l.current.f7RouterTabLoaded=!0),G(()=>{r.current?r.current.el=l.current:(r.current={el:l.current,setTabContent:N},H.tabs.push(r.current))})},S=()=>{r.current&&(H.tabs.splice(H.tabs.indexOf(r.current),1),r.current=null)};A(()=>(_(),S),[]),A(()=>{!r.current||!i||W.emit("tabRouterDidUpdate",r.current)}),X(l,t);const O=y(s,"tab",{"tab-active":j},B(t)),L=()=>{if(!o)return h;if(o.isAsync)return Y(o.component,o.props,o.id);const g=o.component;return b.createElement(g,P({key:o.id},o.props))},f=u?"swiper-slide":"div",R=u?{class:O}:{className:O};return b.createElement(f,P({id:e,style:x,ref:l},C,R),L())});K.displayName="f7-tab";const D=K;function T(){return T=Object.assign?Object.assign.bind():function(t){for(var a=1;a<arguments.length;a++){var s=arguments[a];for(var e in s)Object.prototype.hasOwnProperty.call(s,e)&&(t[e]=s[e])}return t},T.apply(this,arguments)}const U=c.forwardRef((t,a)=>{const{className:s,id:e,style:x,children:h,animated:j,swipeable:C,routable:l,swiperParams:r}=t,n=z(t),u=c.useRef(null);c.useImperativeHandle(a,()=>({el:u.current})),A(()=>{!C||!r||u.current&&(Object.assign(u.current,r),u.current.initialize())},[]);const m=y(s,B(t)),o=y({tabs:!0,"tabs-routable":l});return j?b.createElement("div",T({id:e,style:x,className:y("tabs-animated-wrap",m),ref:u},n),b.createElement("div",{className:o},h)):C?b.createElement("swiper-container",T({id:e,style:x,class:y(o,m),ref:u,init:r?"false":"true"},n),b.createElement(J.Provider,{value:!0},h)):b.createElement("div",T({id:e,style:x,className:y(o,m),ref:u},n),h)});U.displayName="f7-tabs";const nt=U;function $(){return $=Object.assign?Object.assign.bind():function(t){for(var a=1;a<arguments.length;a++){var s=arguments[a];for(var e in s)Object.prototype.hasOwnProperty.call(s,e)&&(t[e]=s[e])}return t},$.apply(this,arguments)}const k=c.forwardRef((t,a)=>{const{className:s,id:e,style:x,tabbar:h,icons:j,scrollable:C,hidden:l,outline:r=!0,position:n,topMd:u,topIos:m,top:o,bottomMd:N,bottomIos:_,bottom:S,inner:O=!0}=t,L=z(t),f=c.useRef(null),R=v=>{f.current===v&&F(t,"toolbarHide")},g=v=>{f.current===v&&F(t,"toolbarShow")},w=v=>{i&&i.toolbar.hide(f.current,v)},E=v=>{i&&i.toolbar.show(f.current,v)};c.useImperativeHandle(a,()=>({el:f.current,hide:w,show:E})),A(()=>(G(()=>{h&&i&&f.current&&i.toolbar.setHighlight(f.current),i.on("toolbarShow",g),i.on("toolbarHide",R)}),()=>{i&&(i.off("toolbarShow",g),i.off("toolbarHide",R))}));const d=Z(),q=y(s,"toolbar",{tabbar:h,"toolbar-bottom":d&&d.md&&N||d&&d.ios&&_||S||n==="bottom","toolbar-top":d&&d.md&&u||d&&d.ios&&m||o||n==="top","tabbar-icons":j,"tabbar-scrollable":C,"toolbar-hidden":l,"no-outline":!r},B(t)),I=tt(t);return b.createElement("div",$({id:e,style:x,className:q,ref:f},L),b.createElement(et.Provider,{value:{tabbarHasIcons:j}},I["before-inner"],O?b.createElement("div",{className:"toolbar-inner"},I.default):I.default,I["after-inner"]))});k.displayName="f7-toolbar";const at=k;function ot(){return p.jsxs(rt,{pageContent:!1,children:[p.jsxs(at,{bottom:!0,tabbar:!0,icons:!0,children:[p.jsx(M,{tabLink:!0,href:"/",routeTabId:"home",iconIos:"f7:house_fill",iconMd:"material:home",children:"Home"}),p.jsx(M,{tabLink:!0,href:"/battery_manufacturers",routeTabId:"batteries",iconIos:"f7:battery_25",iconMd:"material:battery_3_bar",children:"Batteries"}),p.jsx(M,{tabLink:!0,href:"/drones",routeTabId:"drones",iconIos:"f7:airplane",iconMd:"material:airplanemode_active",children:"Drones"})]}),p.jsxs(nt,{routable:!0,children:[p.jsx(D,{className:"page-content",id:"home"}),p.jsx(D,{className:"page-content",id:"batteries"}),p.jsx(D,{className:"page-content",id:"drones"})]})]})}export{ot as default};