(this.webpackJsonphotel_safe_box=this.webpackJsonphotel_safe_box||[]).push([[0],{10:function(e,n,t){},19:function(e,n,t){},20:function(e,n,t){},26:function(e,n,t){},27:function(e,n,t){},28:function(e,n,t){},30:function(e,n,t){"use strict";t.r(n);var c=t(1),s=t(0),u=t.n(s),r=t(5),i=t.n(r),o=(t(19),t(20),t(10),t(3)),a={HANDLE_KEYPRESS:"KEYPRESS",SET_SCREEN_ACTIVE:"SET_SCREEN_ACTIVE",SET_SCREEN_MESSAGE:"SET_SCREEN_MESSAGE",SET_IS_LOCKED:"SET_IS_LOCKED",SET_BOX_CODE:"SET_BOX_CODE",RESET_INPUT_SEQUENCE:"RESET_INPUT_SEQUENCE",SET_SERVICE_MODE:"SET_SERVICE_MODE"},E=function(e){return{type:a.HANDLE_KEYPRESS,payload:e}},S=function(e){return{type:a.SET_SCREEN_MESSAGE,payload:e}},d=function(){return{type:a.RESET_INPUT_SEQUENCE}},f=function(e){return{type:a.SET_SERVICE_MODE,payload:e}},l=[7,8,9,4,5,6,1,2,3,"*",0,"L"],_=4815162342,p="",b="Locking...",j="Unlocking...",O="Error",T="Ready",v="Service",g=function(e){var n=e.inputSequence,t=e.isLocked,s=e.isActive,u=e.screenMessage,r=e.renderSequence;return Object(c.jsxs)("section",{className:"panel-screen ".concat(s?"panel-screen--light-on":"panel-screen--light-off"),children:[Object(c.jsx)("span",{className:"panel-screen__status",children:t?"Locked":"Unlocked"}),Object(c.jsx)("span",{className:"panel-screen__message",children:r(n)||u})]})},h=Object(o.b)((function(e){return{screenMessage:e.screenMessage,inputSequence:e.inputSequence,isLocked:e.isLocked,boxCode:e.code,isActive:e.isActive,isServiceMode:e.isServiceMode}}),(function(e){return{setScreenMessage:function(n){return e(S(n))},resetInputSequence:function(){return e(d())},setIsLocked:function(){return e({type:a.SET_IS_LOCKED})},setBoxCode:function(n){return e({type:a.SET_BOX_CODE,payload:n})},setScreenActive:function(n){return e(function(e){return{type:a.SET_SCREEN_ACTIVE,payload:e}}(n))},setServiceMode:function(n){return e(f(n))},serviceModeProcess:function(n,t,c,s){return e(function(e,n,t,c){return function(s){s(d()),s(S("Validating...")),fetch("https://9w4qucosgf.execute-api.eu-central-1.amazonaws.com/default/CR-JS_team_M02a?c\n\t\tode=".concat(e)).then((function(e){return e.json()})).then((function(e){e.sn===n?t():c(),s(f(!1))}))}}(n,t,c,s))}}}))((function(e){var n=e.screenMessage,t=e.inputSequence,s=e.isLocked,r=e.setScreenMessage,i=e.resetInputSequence,o=e.setIsLocked,a=e.setBoxCode,E=e.boxCode,S=e.setScreenActive,d=e.isActive,f=e.setServiceMode,l=e.serviceModeProcess,h=e.isServiceMode;function C(){i(),r(j),setTimeout((function(){a(""),o(),r(T),setTimeout((function(){r(p)}),500)}),3e3)}function M(){i(),r(O),setTimeout((function(){r(p)}),1e3)}return u.a.useEffect((function(){t&&!d&&S(!0);var e=setTimeout((function(){var e;t&&(s?!function(e,n){return 6===e.length&&!isNaN(+e.substring(0,6))&&e===n&&!h}(t,E)?h?l(t,_,C,M):t!==E&&"000000"===t?(i(),f(!0),r(v),setTimeout((function(){setTimeout((function(){r(p)}),500)}),700)):M():C():"L"!==(e=t)[e.length-1]||7!==e.length||isNaN(+e.substring(0,6))?M():function(){var e=t.substring(0,6);a(e),i(),r(b),setTimeout((function(){o(),r(T),setTimeout((function(){r(p)}),500)}),3e3)}())}),1200);return function(){clearTimeout(e)}}),[t]),u.a.useEffect((function(){var e=setTimeout((function(){d&&S(!1)}),5e3);return function(){return clearTimeout(e)}}),[s,d,t,n]),Object(c.jsx)(g,{isActive:d,isLocked:s,inputSequence:t,screenMessage:n,renderSequence:function(e){return e.length?(e>10&&(e=e.substring(e.length-10)),"L"!==e[e.length-1]||s?e:e.substring(0,e.length-1)):""}})})),C=(t(26),Object(o.b)((function(e){return{screenMessage:e.screenMessage,isLocked:e.isLocked,inputSequence:e.inputSequence}}),(function(e){return{handleKeyPress:function(n){return e(E(n))}}}))((function(e){var n=e.buttonValue,t=e.handleKeyPress,s=e.screenMessage,u=e.isLocked,r=e.inputSequence;return Object(c.jsx)("button",{className:"panel-button",value:n,onClick:function(e){s||!u&&"L"===r[r.length-1]||t(e.target.value)},children:n})}))),M=(t(27),Object(o.b)((function(e){return{screenMessage:e.screenMessage,inputSequence:e.inputSequence,isLocked:e.isLocked}}),(function(e){return{handleKeyPress:function(n){return e(E(n))}}}))((function(e){var n=e.handleKeyPress,t=e.screenMessage,s=e.isLocked,r=e.inputSequence,i=l;function o(e){if(!t&&(s||"L"!==r[r.length-1])){["0","1","2","3","4","5","6","7","8","9","L","*"].includes(e.key)&&n(e.key)}}return u.a.useEffect((function(){return document.addEventListener("keypress",o),function(){return document.removeEventListener("keypress",o)}}),[t,r]),Object(c.jsx)("section",{className:"panel-buttons",children:i.map((function(e,n){return Object(c.jsx)(C,{buttonValue:e},n)}))})}))),L=(t(28),function(){return Object(c.jsxs)("div",{className:"serial-number",children:["S / N: ",_]})});var N=function(){return Object(c.jsxs)("div",{className:"panel",children:[Object(c.jsx)(h,{}),Object(c.jsx)(M,{}),Object(c.jsx)(L,{})]})},m=t(4),y=(t(29),t(13)),k=t(2),x={isLocked:!1,screenMessage:"",isActive:!1,code:"",inputSequence:"",isServiceMode:!1},R=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(n.type){case a.HANDLE_KEYPRESS:return Object(k.a)(Object(k.a)({},e),{},{inputSequence:e.inputSequence+n.payload});case a.SET_SCREEN_ACTIVE:return Object(k.a)(Object(k.a)({},e),{},{isActive:n.payload});case a.SET_SCREEN_MESSAGE:return Object(k.a)(Object(k.a)({},e),{},{screenMessage:n.payload});case a.SET_IS_LOCKED:return Object(k.a)(Object(k.a)({},e),{},{isLocked:!e.isLocked});case a.SET_BOX_CODE:return Object(k.a)(Object(k.a)({},e),{},{code:n.payload});case a.RESET_INPUT_SEQUENCE:return Object(k.a)(Object(k.a)({},e),{},{inputSequence:""});case a.SET_SERVICE_MODE:return Object(k.a)(Object(k.a)({},e),{},{isServiceMode:n.payload});default:return e}},I=[y.a];var q=Object(m.c)(R,m.a.apply(void 0,I));i.a.render(Object(c.jsx)(u.a.StrictMode,{children:Object(c.jsx)(o.a,{store:q,children:Object(c.jsx)(N,{})})}),document.getElementById("root"))}},[[30,1,2]]]);
//# sourceMappingURL=main.8fe46d2f.chunk.js.map