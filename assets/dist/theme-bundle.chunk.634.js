"use strict";(self.webpackChunkElevate=self.webpackChunkElevate||[]).push([[634],{61634:(t,e,r)=>{r.r(e),r.d(e,{default:()=>d});var o=r(72557),n=r(50469),i=r(54587),a=r(28426),c=r(55825);function s(t,e){return s=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},s(t,e)}var d=function(t){var e,r;function n(){return t.apply(this,arguments)||this}r=t,(e=n).prototype=Object.create(r.prototype),e.prototype.constructor=e,s(e,r);var d=n.prototype;return d.onReady=function(){(0,i.Z)(this.context.urls),c("#facetedSearch").length>0?this.initFacetedSearch():(this.onSortBySubmit=this.onSortBySubmit.bind(this),o.PT.on("sortBy-submitted",this.onSortBySubmit))},d.initFacetedSearch=function(){var t=c("#product-listing-container"),e=c("#faceted-search-container"),r={template:{productListing:"brand/product-listing",sidebar:"brand/sidebar"},config:{shop_by_brand:!0,brand:{products:{limit:this.context.brandProductsPerPage}}},showMore:"brand/show-more"};this.facetedSearch=new a.Z(r,(function(r){t.html(r.productListing),e.html(r.sidebar),c("body").triggerHandler("compareReset"),c("html, body").animate({scrollTop:0},100)}))},n}(n.Z)}}]);
//# sourceMappingURL=theme-bundle.chunk.634.js.map
