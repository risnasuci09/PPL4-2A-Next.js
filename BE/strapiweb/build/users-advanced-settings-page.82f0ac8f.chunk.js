(self.webpackChunkstrapiweb=self.webpackChunkstrapiweb||[]).push([[9460],{62031:(e,t,n)=>{"use strict";e.exports=n(59525)},59525:function(e,t,n){var r,a;e.exports=(r=n(67294),a=n(78384),function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=108)}({0:function(e,t,n){e.exports=n(17)()},1:function(e,t){e.exports=r},10:function(e,t,n){var r=n(23),a=n(24),o=n(20),i=n(25);e.exports=function(e,t){return r(e)||a(e,t)||o(e,t)||i()},e.exports.default=e.exports,e.exports.__esModule=!0},108:function(e,t,n){"use strict";n.r(t),n.d(t,"Main",(function(){return h})),n.d(t,"SkipToContent",(function(){return _}));var r,a=n(5),o=n.n(a),i=n(6),u=n.n(i),s=n(3),d=n.n(s),c=n(1),l=n.n(c),f=n(0),p=n.n(f),m=n(2),g=n.n(m),v=["labelledBy"],b=g.a.main(r||(r=d()(["\n  // To prevent global outline on focus visible to force an outline when Main is focused\n  &:focus-visible {\n    outline: none;\n  }\n"]))),h=function(e){var t=e.labelledBy,n=u()(e,v),r=t||"main-content-title";return l.a.createElement(b,o()({"aria-labelledby":r,id:"main-content",tabIndex:-1},n))};h.defaultProps={labelledBy:void 0},h.propTypes={labelledBy:p.a.string};var y,x=n(4),O=g()(x.Box)(y||(y=d()(["\n  text-decoration: none;\n  position: absolute;\n  z-index: 9999;\n  left: -100%;\n  top: -100%;\n\n  &:focus {\n    left: ",";\n    top: ",";\n  }\n"])),(function(e){return e.theme.spaces[3]}),(function(e){return e.theme.spaces[3]})),_=function(e){var t=e.children;return l.a.createElement(O,{as:"a",href:"#main-content",background:"primary600",color:"neutral0",padding:3,hasRadius:!0},t)};_.propTypes={children:p.a.node.isRequired}},13:function(e,t){function n(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=n=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),n(t)}e.exports=n,e.exports.default=e.exports,e.exports.__esModule=!0},17:function(e,t,n){"use strict";var r=n(18);function a(){}function o(){}o.resetWarningCache=a,e.exports=function(){function e(e,t,n,a,o,i){if(i!==r){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:o,resetWarningCache:a};return n.PropTypes=n,n}},18:function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},19:function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r},e.exports.default=e.exports,e.exports.__esModule=!0},2:function(e,t){e.exports=a},20:function(e,t,n){var r=n(19);e.exports=function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}},e.exports.default=e.exports,e.exports.__esModule=!0},22:function(e,t){e.exports=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a},e.exports.default=e.exports,e.exports.__esModule=!0},23:function(e,t){e.exports=function(e){if(Array.isArray(e))return e},e.exports.default=e.exports,e.exports.__esModule=!0},24:function(e,t){e.exports=function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],i=!0,u=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);i=!0);}catch(e){u=!0,a=e}finally{try{i||null==n.return||n.return()}finally{if(u)throw a}}return o}},e.exports.default=e.exports,e.exports.__esModule=!0},25:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},3:function(e,t){e.exports=function(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))},e.exports.default=e.exports,e.exports.__esModule=!0},4:function(e,t,n){"use strict";n.r(t),n.d(t,"Box",(function(){return f}));var r,a=n(3),o=n.n(a),i=n(0),u=n.n(i),s=n(2),d=n.n(s),c=n(7),l={color:!0},f=d.a.div.withConfig({shouldForwardProp:function(e,t){return!l[e]&&t(e)}})(r||(r=o()(["\n  // Font\n  font-size: ",";\n\n  // Colors\n  background: ",";\n  color: ",";\n\n  // Spaces\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n  ","\n\n  // Responsive hiding\n  ","\n  ","\n  \n\n  // Borders\n  border-radius: ",";\n  border-style: ",";\n  border-width: ",";\n  border-color: ",";\n  border: ",";\n\n  // Shadows\n  box-shadow: ",";\n\n  // Handlers\n  pointer-events: ",";\n  &:hover {\n    ","\n  }\n\n  // Display\n  display: ",";\n\n  // Position\n  position: ",";\n  left: ",";\n  right: ",";\n  top: ",";\n  bottom: ",";\n  z-index: ",";\n  overflow: ",";\n  cursor: ",";\n\n  // Size\n  width: ",";\n  max-width: ",";\n  min-width: ",";\n  height: ",";\n  max-height: ",";\n  min-height: ",";\n\n  // Animation\n  transition: ",";\n  transform: ",";\n  animation: ",";\n\n  //Flexbox children props\n  flex-shrink: ",";\n  flex-grow: ",";\n  flex-basis: ",";\n  flex: ",";\n\n  // Text\n  text-align: ",";\n  text-transform: ",";\n  line-height: ",";\n\n  // Cursor\n  cursor: ",";\n"])),(function(e){var t=e.fontSize;return e.theme.fontSizes[t]||t}),(function(e){var t=e.theme,n=e.background;return t.colors[n]}),(function(e){var t=e.theme,n=e.color;return t.colors[n]}),(function(e){var t=e.theme,n=e.padding;return Object(c.a)("padding",n,t)}),(function(e){var t=e.theme,n=e.paddingTop;return Object(c.a)("padding-top",n,t)}),(function(e){var t=e.theme,n=e.paddingRight;return Object(c.a)("padding-right",n,t)}),(function(e){var t=e.theme,n=e.paddingBottom;return Object(c.a)("padding-bottom",n,t)}),(function(e){var t=e.theme,n=e.paddingLeft;return Object(c.a)("padding-left",n,t)}),(function(e){var t=e.theme,n=e.marginLeft;return Object(c.a)("margin-left",n,t)}),(function(e){var t=e.theme,n=e.marginRight;return Object(c.a)("margin-right",n,t)}),(function(e){var t=e.theme,n=e.marginTop;return Object(c.a)("margin-top",n,t)}),(function(e){var t=e.theme,n=e.marginBottom;return Object(c.a)("margin-bottom",n,t)}),(function(e){var t=e.theme;return e.hiddenS?"".concat(t.mediaQueries.tablet," { display: none; }"):void 0}),(function(e){var t=e.theme;return e.hiddenXS?"".concat(t.mediaQueries.mobile," { display: none; }"):void 0}),(function(e){var t=e.theme,n=e.hasRadius,r=e.borderRadius;return n?t.borderRadius:r}),(function(e){return e.borderStyle}),(function(e){return e.borderWidth}),(function(e){var t=e.borderColor;return e.theme.colors[t]}),(function(e){var t=e.theme,n=e.borderColor,r=e.borderStyle,a=e.borderWidth;if(n&&!r&&!a)return"1px solid ".concat(t.colors[n])}),(function(e){var t=e.theme,n=e.shadow;return t.shadows[n]}),(function(e){return e.pointerEvents}),(function(e){var t=e._hover,n=e.theme;return t?t(n):void 0}),(function(e){return e.display}),(function(e){return e.position}),(function(e){var t=e.left;return e.theme.spaces[t]||t}),(function(e){var t=e.right;return e.theme.spaces[t]||t}),(function(e){var t=e.top;return e.theme.spaces[t]||t}),(function(e){var t=e.bottom;return e.theme.spaces[t]||t}),(function(e){return e.zIndex}),(function(e){return e.overflow}),(function(e){return e.cursor}),(function(e){var t=e.width;return e.theme.spaces[t]||t}),(function(e){var t=e.maxWidth;return e.theme.spaces[t]||t}),(function(e){var t=e.minWidth;return e.theme.spaces[t]||t}),(function(e){var t=e.height;return e.theme.spaces[t]||t}),(function(e){var t=e.maxHeight;return e.theme.spaces[t]||t}),(function(e){var t=e.minHeight;return e.theme.spaces[t]||t}),(function(e){return e.transition}),(function(e){return e.transform}),(function(e){return e.animation}),(function(e){return e.shrink}),(function(e){return e.grow}),(function(e){return e.basis}),(function(e){return e.flex}),(function(e){return e.textAlign}),(function(e){return e.textTransform}),(function(e){return e.lineHeight}),(function(e){return e.cursor}));f.displayName="Box",f.defaultProps={background:void 0,borderColor:void 0,color:void 0,hiddenS:!1,hiddenXS:!1,padding:void 0,paddingTop:void 0,paddingRight:void 0,paddingBottom:void 0,paddingLeft:void 0,hasRadius:!1,shadow:void 0,children:null,shrink:void 0,grow:void 0,basis:void 0,flex:void 0,_hover:function(){}},f.propTypes={_hover:u.a.func,background:u.a.string,basis:u.a.oneOfType([u.a.string,u.a.string]),borderColor:u.a.string,children:u.a.oneOfType([u.a.node,u.a.string]),color:u.a.string,flex:u.a.oneOfType([u.a.string,u.a.string]),grow:u.a.oneOfType([u.a.string,u.a.string]),hasRadius:u.a.bool,hiddenS:u.a.bool,hiddenXS:u.a.bool,padding:u.a.oneOfType([u.a.number,u.a.arrayOf(u.a.number)]),paddingBottom:u.a.oneOfType([u.a.number,u.a.arrayOf(u.a.number)]),paddingLeft:u.a.oneOfType([u.a.number,u.a.arrayOf(u.a.number)]),paddingRight:u.a.oneOfType([u.a.number,u.a.arrayOf(u.a.number)]),paddingTop:u.a.oneOfType([u.a.number,u.a.arrayOf(u.a.number)]),shadow:u.a.string,shrink:u.a.oneOfType([u.a.string,u.a.string])}},5:function(e,t){function n(){return e.exports=n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},e.exports.default=e.exports,e.exports.__esModule=!0,n.apply(this,arguments)}e.exports=n,e.exports.default=e.exports,e.exports.__esModule=!0},6:function(e,t,n){var r=n(22);e.exports=function(e,t){if(null==e)return{};var n,a,o=r(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o},e.exports.default=e.exports,e.exports.__esModule=!0},7:function(e,t,n){"use strict";var r=n(10),a=n.n(r),o=n(13),i=n.n(o);t.a=function(e,t,n){var r=t;if(Array.isArray(t)||"object"!==i()(t)||(r=[null==t?void 0:t.desktop,null==t?void 0:t.tablet,null==t?void 0:t.mobile]),void 0!==r){if(Array.isArray(r)){var o=r,u=a()(o,3),s=u[0],d=u[1],c=u[2],l="".concat(e,": ").concat(n.spaces[s],";");return void 0!==d&&(l+="".concat(n.mediaQueries.tablet,"{\n          ").concat(e,": ").concat(n.spaces[d],";\n        }")),void 0!==c&&(l+="".concat(n.mediaQueries.mobile,"{\n          ").concat(e,": ").concat(n.spaces[c],";\n        }")),l}var f=n.spaces[r]||r;return"".concat(e,": ").concat(f,";")}}}}))},86289:(e,t,n)=>{"use strict";var r=n(95318),a=n(50008);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n(87757)),i=r(n(67154)),u=r(n(59713)),s=r(n(48926)),d=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!==typeof e)return{default:e};var n=P(t);if(n&&n.has(e))return n.get(e);var r={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if("default"!==i&&Object.prototype.hasOwnProperty.call(e,i)){var u=o?Object.getOwnPropertyDescriptor(e,i):null;u&&(u.get||u.set)?Object.defineProperty(r,i,u):r[i]=e[i]}r.default=e,n&&n.set(e,r);return r}(n(67294)),c=n(23724),l=n(97132),f=n(80831),p=n(68547),m=n(84686),g=n(62031),v=n(78862),b=n(19408),h=n(5493),y=n(9008),x=n(43808),O=n(49425),_=n(34626),w=r(n(84734)),T=r(n(94920)),j=n(26270),S=r(n(24497)),M=r(n(79022)),E=n(69416);function P(e){if("function"!==typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(P=function(e){return e?n:t})(e)}function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function A(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){(0,u.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var R=function(){var e=(0,l.useIntl)().formatMessage,t=(0,p.useNotification)(),n=(0,p.useOverlayBlocker)(),r=n.lockApp,a=n.unlockApp,u=(0,m.useNotifyAT)().notifyStatus,P=(0,c.useQueryClient)();(0,p.useFocusWhenNavigate)();var k=(0,d.useMemo)((function(){return{update:T.default.updateAdvancedSettings}}),[]),R=(0,p.useRBAC)(k),F=R.isLoading,C=R.allowedActions.canUpdate,L=(0,c.useQuery)("advanced",(function(){return(0,E.fetchData)()}),{onSuccess:function(){u(e({id:(0,j.getTrad)("Form.advancedSettings.data.loaded"),defaultMessage:"Advanced settings data has been loaded"}))},onError:function(){t({type:"warning",message:{id:(0,j.getTrad)("notification.error"),defaultMessage:"An error occured"}})}}),I=L.status,z=L.data,B=F||"success"!==I,D=(0,c.useMutation)((function(e){return(0,E.putAdvancedSettings)(e)}),{onSuccess:function(){var e=(0,s.default)(o.default.mark((function e(){return o.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P.invalidateQueries("advanced");case 2:t({type:"success",message:{id:(0,j.getTrad)("notification.success.saved"),defaultMessage:"Saved"}}),a();case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),onError:function(){t({type:"warning",message:{id:(0,j.getTrad)("notification.error"),defaultMessage:"An error occured"}}),a()},refetchActive:!0}),W=D.isLoading,H=function(){var e=(0,s.default)(o.default.mark((function e(t){var n;return o.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r(),n=t.email_confirmation?t.email_confirmation_redirection:"",e.next=4,D.mutateAsync(A(A({},t),{},{email_confirmation_redirection:n}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return B?d.default.createElement(g.Main,{"aria-busy":"true"},d.default.createElement(p.SettingsPageTitle,{name:e({id:(0,j.getTrad)("HeaderNav.link.advancedSettings"),defaultMessage:"Advanced Settings"})}),d.default.createElement(v.HeaderLayout,{title:e({id:(0,j.getTrad)("HeaderNav.link.advancedSettings"),defaultMessage:"Advanced Settings"})}),d.default.createElement(v.ContentLayout,null,d.default.createElement(p.LoadingIndicatorPage,null))):d.default.createElement(g.Main,{"aria-busy":W},d.default.createElement(p.SettingsPageTitle,{name:e({id:(0,j.getTrad)("HeaderNav.link.advancedSettings"),defaultMessage:"Advanced Settings"})}),d.default.createElement(f.Formik,{onSubmit:H,initialValues:z.settings,validateOnChange:!1,validationSchema:M.default,enableReinitialize:!0},(function(t){var n=t.errors,r=t.values,a=t.handleChange,o=t.isSubmitting;return d.default.createElement(p.Form,null,d.default.createElement(v.HeaderLayout,{title:e({id:(0,j.getTrad)("HeaderNav.link.advancedSettings"),defaultMessage:"Advanced Settings"}),primaryAction:d.default.createElement(b.Button,{loading:o,type:"submit",disabled:!C,startIcon:d.default.createElement(w.default,null),size:"L"},e({id:(0,j.getTrad)("Form.save"),defaultMessage:"Save"}))}),d.default.createElement(v.ContentLayout,null,d.default.createElement(h.Box,{background:"neutral0",hasRadius:!0,shadow:"filterShadow",paddingTop:6,paddingBottom:6,paddingLeft:7,paddingRight:7},d.default.createElement(y.Stack,{size:4},d.default.createElement(O.Typography,{variant:"delta",as:"h2"},e({id:(0,j.getTrad)("Form.title.advancedSettings"),defaultMessage:"Settings"})),d.default.createElement(_.Grid,{gap:6},d.default.createElement(_.GridItem,{col:6,s:12},d.default.createElement(x.Select,{label:e({id:(0,j.getTrad)("EditForm.inputSelect.label.role"),defaultMessage:"Default role for authenticated users"}),value:r.default_role,hint:e({id:(0,j.getTrad)("EditForm.inputSelect.description.role"),defaultMessage:"It will attach the new authenticated user to the selected role."}),onChange:function(e){return a({target:{name:"default_role",value:e}})}},z.roles.map((function(e){return d.default.createElement(x.Option,{key:e.type,value:e.type},e.name)})))),S.default.map((function(e){var t=r[e.name];return t||(t="bool"!==e.type&&""),d.default.createElement(_.GridItem,(0,i.default)({key:e.name},e.size),d.default.createElement(p.GenericInput,(0,i.default)({},e,{value:t,error:n[e.name],disabled:"email_confirmation_redirection"===e.name&&!1===r.email_confirmation,onChange:a})))})))))))})))},F=function(){return d.default.createElement(p.CheckPagePermissions,{permissions:T.default.readAdvancedSettings},d.default.createElement(R,null))};t.default=F},69416:(e,t,n)=>{"use strict";var r=n(95318);Object.defineProperty(t,"__esModule",{value:!0}),t.putAdvancedSettings=t.fetchData=void 0;var a=r(n(87757)),o=r(n(48926)),i=n(26270),u=function(){var e=(0,o.default)(a.default.mark((function e(){var t,n;return a.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.axiosInstance.get((0,i.getRequestURL)("advanced"));case 2:return t=e.sent,n=t.data,e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();t.fetchData=u;t.putAdvancedSettings=function(e){return i.axiosInstance.put((0,i.getRequestURL)("advanced"),e)}},24497:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(26270),a=[{intlLabel:{id:(0,r.getTrad)("EditForm.inputToggle.label.email"),defaultMessage:"One account per email address"},description:{id:(0,r.getTrad)("EditForm.inputToggle.description.email"),defaultMessage:"Disallow the user to create multiple accounts using the same email address with different authentication providers."},name:"unique_email",type:"bool",size:{col:12,xs:12}},{intlLabel:{id:(0,r.getTrad)("EditForm.inputToggle.label.sign-up"),defaultMessage:"Enable sign-ups"},description:{id:(0,r.getTrad)("EditForm.inputToggle.description.sign-up"),defaultMessage:"When disabled (OFF), the registration process is forbidden. No one can subscribe anymore no matter the used provider."},name:"allow_register",type:"bool",size:{col:12,xs:12}},{intlLabel:{id:(0,r.getTrad)("EditForm.inputToggle.label.email-reset-password"),defaultMessage:"Reset password page"},description:{id:(0,r.getTrad)("EditForm.inputToggle.description.email-reset-password"),defaultMessage:"URL of your application's reset password page."},placeholder:{id:(0,r.getTrad)("EditForm.inputToggle.placeholder.email-reset-password"),defaultMessage:"ex: https://youtfrontend.com/reset-password"},name:"email_reset_password",type:"text",size:{col:6,xs:12}},{intlLabel:{id:(0,r.getTrad)("EditForm.inputToggle.label.email-confirmation"),defaultMessage:"Enable email confirmation"},description:{id:(0,r.getTrad)("EditForm.inputToggle.description.email-confirmation"),defaultMessage:"When enabled (ON), new registered users receive a confirmation email."},name:"email_confirmation",type:"bool",size:{col:12,xs:12}},{intlLabel:{id:(0,r.getTrad)("EditForm.inputToggle.label.email-confirmation-redirection"),defaultMessage:"Redirection url"},description:{id:(0,r.getTrad)("EditForm.inputToggle.description.email-confirmation-redirection"),defaultMessage:"After you confirmed your email, choose where you will be redirected."},placeholder:{id:(0,r.getTrad)("EditForm.inputToggle.placeholder.email-reset-password"),defaultMessage:"ex: https://youtfrontend.com/reset-password"},name:"email_confirmation_redirection",type:"text",size:{col:6,xs:12}}];t.default=a},79022:(e,t,n)=>{"use strict";var r=n(50008);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==r(e)&&"function"!==typeof e)return{default:e};var n=i(t);if(n&&n.has(e))return n.get(e);var a={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if("default"!==u&&Object.prototype.hasOwnProperty.call(e,u)){var s=o?Object.getOwnPropertyDescriptor(e,u):null;s&&(s.get||s.set)?Object.defineProperty(a,u,s):a[u]=e[u]}a.default=e,n&&n.set(e,a);return a}(n(53209)),o=n(68547);function i(e){if("function"!==typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(i=function(e){return e?n:t})(e)}var u=new RegExp("(^$)|((https?://.*)(d*)/?(.*))"),s=a.object().shape({email_confirmation_redirection:a.mixed().when("email_confirmation",{is:!0,then:a.string().matches(u).required(),otherwise:a.string().nullable()}),email_reset_password:a.string(o.translatedErrors.string).matches(u,o.translatedErrors.regex).nullable()});t.default=s},27778:(e,t,n)=>{"use strict";var r=n(95318);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(87757)),o=r(n(48926)),i=r(n(9669)),u=n(68547),s=i.default.create({baseURL:""});s.interceptors.request.use(function(){var e=(0,o.default)(a.default.mark((function e(t){return a.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.headers={Authorization:"Bearer ".concat(u.auth.getToken()),Accept:"application/json","Content-Type":"application/json"},e.abrupt("return",t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),(function(e){Promise.reject(e)})),s.interceptors.response.use((function(e){return e}),(function(e){var t;throw 401===(null===(t=e.response)||void 0===t?void 0:t.status)&&(u.auth.clearAppStorage(),window.location.reload()),e}));var d=s;t.default=d},42539:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(96486),a=function(e){return Object.keys(e).reduce((function(t,n){var a=e[n].controllers,o=Object.keys(a).reduce((function(e,t){return(0,r.isEmpty)(a[t])||(e[t]=a[t]),e}),{});return(0,r.isEmpty)(o)||(t[n]={controllers:o}),t}),{})};t.default=a},85317:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=function(e){return e.reduce((function(e,t){return e.push({label:t,value:t}),e}),[])};t.default=n},12132:(e,t,n)=>{"use strict";var r=n(95318);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(10576)),o=function(e){return"/".concat(a.default,"/").concat(e)};t.default=o},26270:(e,t,n)=>{"use strict";var r=n(95318);Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"axiosInstance",{enumerable:!0,get:function(){return a.default}}),Object.defineProperty(t,"cleanPermissions",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"formatPolicies",{enumerable:!0,get:function(){return s.default}}),Object.defineProperty(t,"getRequestURL",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(t,"getTrad",{enumerable:!0,get:function(){return u.default}});var a=r(n(27778)),o=r(n(42539)),i=r(n(12132)),u=r(n(30078)),s=r(n(85317))}}]);