"use strict";(self.webpackChunkElevate=self.webpackChunkElevate||[]).push([[234],{73609:(t,e,n)=>{n.d(e,{Z:()=>o});const o={email:function(t){return/^.+@.+\..+/.test(t)},password:function(t){return this.notEmpty(t)},notEmpty:function(t){return t.length>0}}},36234:(t,e,n)=>{n.r(e),n.d(e,{default:()=>u});var o=n(49230),r=n(40097),a=n(73609),i=n(55825);function c(t,e){return c=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},c(t,e)}var u=function(t){var e,n;function o(){return t.apply(this,arguments)||this}n=t,(e=o).prototype=Object.create(n.prototype),e.prototype.constructor=e,c(e,n);var u=o.prototype;return u.onReady=function(){this.registerContactFormValidation()},u.registerContactFormValidation=function(){var t="form[data-contact-form]",e=(0,r.Z)({submit:t+' input[type="submit"]'}),n=i(t);e.add([{selector:t+' input[name="contact_email"]',validate:function(t,e){t(a.Z.email(e))},errorMessage:this.context.contactEmail},{selector:t+' textarea[name="contact_question"]',validate:function(t,e){t(a.Z.notEmpty(e))},errorMessage:this.context.contactQuestion}]),n.on("submit",(function(t){e.performCheck(),e.areAll("valid")||t.preventDefault()}))},o}(o.Z)}}]);
//# sourceMappingURL=theme-bundle.chunk.234.js.map