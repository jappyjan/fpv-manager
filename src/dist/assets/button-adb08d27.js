import{r as m,k as Y,u as Z,l as tt,m as l,n as et,o as nt,p as at,q as ot,s as st,t as lt,v as rt,w as ut,x as it,y as dt,z as ct}from"./index-e705403d.js";function i(){return i=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var e in a)Object.prototype.hasOwnProperty.call(a,e)&&(t[e]=a[e])}return t},i.apply(this,arguments)}const y=m.forwardRef((t,n)=>{const{className:a,id:e,style:f,children:g,text:v,type:r,href:d="#",target:M,tabLink:u,tabLinkActive:A,round:N,roundIos:R,roundMd:B,fill:O,fillIos:P,fillMd:j,tonal:w,tonalIos:z,tonalMd:p,large:L,largeIos:S,largeMd:T,small:q,smallIos:H,smallMd:_,raised:$,raisedIos:D,raisedMd:F,active:G,outline:J,outlineIos:K,outlineMd:Q,disabled:U,preloader:x,preloaderSize:V,preloaderColor:W,loading:X}=t,C=Y(t),o=m.useRef(null),E=s=>{ct(t,"click",s)};m.useImperativeHandle(n,()=>({el:o.current})),Z(o,t),tt(o,t);const I=()=>nt(a,"button",{"tab-link":u||u==="","tab-link-active":A,"button-round":N,"button-round-ios":R,"button-round-md":B,"button-fill":O,"button-fill-ios":P,"button-fill-md":j,"button-tonal":w,"button-tonal-ios":z,"button-tonal-md":p,"button-large":L,"button-large-ios":S,"button-large-md":T,"button-small":q,"button-small-ios":H,"button-small-md":_,"button-raised":$,"button-raised-ios":D,"button-raised-md":F,"button-active":G,"button-outline":J,"button-outline-ios":K,"button-outline-md":Q,"button-preloader":x,"button-loading":X,disabled:U},st(t),ot(t),at(t)),c=r==="submit"||r==="reset"||r==="button"?"button":"a",h=()=>{let s=d;return d===!0&&(s="#"),(d===!1||c==="button")&&(s=void 0),lt({href:s,target:M,type:r,"data-tab":ut(u)&&u||void 0},rt(t),it(t))},k=dt(t);let b;return v&&(b=l.createElement("span",null,v)),x?l.createElement(c,i({ref:o,id:e,style:f,className:I()},h(),C,{onClick:E}),l.createElement(et,{size:V,color:W}),l.createElement("span",null,k,b,g)):l.createElement(c,i({ref:o,id:e,style:f,className:I()},h(),C,{onClick:E}),k,b,g)});y.displayName="f7-button";const mt=y;export{mt as B};