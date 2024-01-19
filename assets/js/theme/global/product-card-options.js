import $ from 'jquery';
import utils from '@bigcommerce/stencil-utils';
import _ from 'lodash';
import Pace from 'pace-js';
import inView from 'in-view';


let context;
let len;
let id_array = new Array();
let ids = new Array();
const elem = $('[data-product-card-options]');
var cnt = 0;
var response = new Array();
export class ProductCardColorSwatches {
    constructor($scope) {
        //super($scope);
        var jsContext = this.$scope;
        this.$scope = $scope;
        this.productId = $scope.data('product-id');
        this.$content = $scope.find('[data-product-card-options-content]');
        this.$cardImg = $scope.find('.card-image').first();
        this.$cardFigure = $scope.find('.figure-content');
        this.$cardImg.on('load', () => {
            this.$cardFigure.removeClass('loading');
        });
        for (let index1 = 0; index1 <= cnt; index1++) {
            var res = response[index1];
            var products_len = res.data.site.products.edges.length;
            var attributesData = res.data.site.products.edges || {};
            const rec_data = attributesData;

            for (let index2 = 0; index2 < products_len; index2++) {

                if (attributesData[index2].node['entityId'] == this.productId) {
                    Pace.ignore(() => {
                        if (typeof attributesData.in_stock_attributes === 'object' || attributesData[index2].node['inventory']['isInStock']) {
                            Pace.ignore(() => {

                                if (attributesData[index2].node['productOptions'].edges.length > 0) {

                                    var swatch_cnt = attributesData[index2].node['productOptions'].edges.length;
                                    var swatch_val = attributesData[index2].node['productOptions'].edges;
                                    var $swatch_html = "<ul class='option_section'>";

                                    for (let index3 = 0; index3 < swatch_cnt; index3++) {
                                        var id = swatch_val[index3].node['entityId'];

                                        $swatch_html += "<input type='hidden' id='" + id + "' value='" + this.productId + "'/>";
                                        $swatch_html += "<input type='hidden' id='resp" + id + "' value='" + index1 + "'/>";
                                        if ((swatch_val[index3].node['displayName'] === 'Color' || swatch_val[index3].node['displayName'] === 'Colour') && swatch_val[index3].node['displayStyle'] == 'Swatch') {
                                            var vals_len = swatch_val[index3].node['values'].edges.length;
                                            var cnt = 0;
                                            for (let index4 = 0; index4 < vals_len; index4++) {
                                                cnt++;
                                                var col_id = swatch_val[index3].node['values'].edges[index4].node['entityId'];
                                                var label = swatch_val[index3].node['values'].edges[index4].node['label'];
                                                var col = swatch_val[index3].node['values'].edges[index4].node['hexColors'].toString();
                                                if (col.search(',') > 0) {
                                                    var temp = col.split(',');
                                                    if (temp[0] == "#000000") {

                                                        col = temp[1].toString();
                                                    }
                                                }
                                                var img_url = swatch_val[index3].node['values'].edges[index4].node['imageUrl'];
                                                if (img_url == null)
                                                    $swatch_html += "<li class='options_slide'  data-swatch-count='" + cnt + "'><a class='productCard-colorSwatch' href='javascript:void(0)' data-product-swatch-id='" + id + "' data-product-swatch-value='" + col_id + "' data-product-option-value='" + col_id + "' data-product-option-id='" + id + "' data-product-option-label='" + label + "' ><span class='productCard-colorSwatch-color' title='" + label + "' style='background-color: " + col + "'></span></a></li>";
                                                else
                                                    $swatch_html += "<li class='options_slide'  data-swatch-count='" + cnt + "'><a class='productCard-colorSwatch' href='javascript:void(0)' data-product-swatch-id='" + id + "' data-product-swatch-value='" + col_id + "' data-product-option-value='" + col_id + "' data-product-option-id='" + id + "' data-product-option-label='" + label + "'><img src='" + img_url + "' alt='" + label + "' title='" + label + "'></a></li>";


                                            }
                                        }
                                        else {
                                            if (typeof swatch_val[index3].node['values'] !== 'undefined') {
                                                var vals_len = swatch_val[index3].node['values'].edges.length;
                                                for (let index4 = 0; index4 < vals_len; index4++) {
                                                    var default_val = swatch_val[index3].node['values'].edges[index4].node['isDefault'];
                                                    if (default_val == true) {
                                                        var val_id = swatch_val[index3].node['values'].edges[index4].node['entityId'];
                                                        $swatch_html += "<span style='display:none' data-product-attribute-id='" + id + "' data-product-attribute-value='" + val_id + "'></span>";
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    $swatch_html += "</ul>";

                                    $(".grid[data-product-id='" + this.productId + "']").html($swatch_html);
                                    $(".list[data-product-id='" + this.productId + "']").html($swatch_html);

                                    this.$content.addClass('loaded');
                                    this.$content.removeClass('loading');

                                    this.$scope.parent().parent().parent().find($(".grid[data-product-id='" + this.productId + "']")).addClass('loaded');
                                    this.$scope.parent().parent().parent().find($(".grid[data-product-id='" + this.productId + "']")).removeClass('loading');
                                    this.$scope.parent().parent().parent().find(".productList .product .listItem .listItem-body .listItem-content .listItem-details .card-text[data-product-card-options-content]").addClass('loaded');
                                    this.$scope.parent().parent().parent().find(".productList .product .listItem .listItem-body .listItem-content .listItem-details .card-text[data-product-card-options-content]").removeClass('loading');
                                } else {

                                    this.$scope.parent().parent().parent().find($(".grid[data-product-id='" + this.productId + "']")).addClass('loaded');
                                    this.$scope.parent().parent().parent().find($(".grid[data-product-id='" + this.productId + "']")).removeClass('loading');
                                    this.$scope.parent().parent().parent().find(".productList .product .listItem .listItem-body .listItem-content .listItem-details .card-text[data-product-card-options-content]").addClass('loaded');
                                    this.$scope.parent().parent().parent().find(".productList .product .listItem .listItem-body .listItem-content .listItem-details .card-text[data-product-card-options-content]").removeClass('loading');
                                }
                                // Delete out-of-stock attributes
                                this.$content.find('[data-product-option-value]').each((i, a) => {
                                    const attrId = $(a).data('product-option-value');
                                    //if (typeof attributesData.in_stock_attributes === 'object' || attributesData[index2].node['inventory']['isInStock'])

                                    if (typeof attributesData.in_stock_attributes === 'object' && attributesData.in_stock_attributes.indexOf(attrId) === -1) {
                                        $(a).remove();
                                    }
                                });
                                this.$content.addClass('loaded');
                                this.$content.removeClass('loading');

                                this.$scope.parent().parent().find($(".grid[data-product-id='" + this.productId + "']")).addClass('loaded');
                                this.$scope.parent().parent().find($(".grid[data-product-id='" + this.productId + "']")).removeClass('loading');
                                $('.card-swatch-body .card-text.card-text--colorswatches').each(function () {
                                    $(this).find(".option_section .options_slide").each(function () {
                                        if ($(this).index() > 4) {
                                            if ($(this).attr('data-swatch-count') > 3) {
                                                //  $(this).hide();  
                                            }
                                        }
                                    });
                                    var timer;
                                    var li_options_slide = 0;
                                    function hide_swatches(li_prdct_lngth) {
                                        if (li_prdct_lngth > 0) {
                                            clearInterval(timer);
                                            $("li.product").each(function () {
                                                var swatch_identify = '';
                                                $(this).find("article .card-swatch-body .card-text--colorswatches").first().find("ul.option_section li.options_slide").each(function (index) {
                                                    if (index == 0) {
                                                        if ($(this).find(".productCard-colorSwatch span").length !== 0) {
                                                            swatch_identify = "color";
                                                        }
                                                        else if ($(this).find(".productCard-colorSwatch img").length !== 0) {
                                                            swatch_identify = "pattern";
                                                        }
                                                        else if ($(this).find("input.form-radio").length !== 0) {
                                                            swatch_identify = "size";
                                                        }
                                                    }
                                                    if ($(this).find(".productCard-colorSwatch span").length !== 0) {
                                                        if (swatch_identify != "color") {
                                                            $(this).css('display', 'none');
                                                        }
                                                    }
                                                    else if ($(this).find(".productCard-colorSwatch img").length !== 0) {
                                                        if (swatch_identify != "pattern") {
                                                            $(this).css('display', 'none');
                                                        }
                                                    }
                                                    else if ($(this).find("input.form-radio").length !== 0) {
                                                        if (swatch_identify != "size") {
                                                            $(this).css('display', 'none');
                                                        }
                                                    }
                                                });
                                            });
                                        }
                                    }
                                    timer = setInterval(function () {
                                        li_options_slide = $('li.options_slide').length;

                                        hide_swatches(li_options_slide);
                                    }, 3000);
                                });
                            });
                        }
                        else {
                            this.$content.addClass('loaded');
                            this.$content.removeClass('loading');
                            this.$scope.parent().parent().find($(".grid[data-product-id='" + this.productId + "']")).addClass('loaded');
                            this.$scope.parent().parent().find($(".grid[data-product-id='" + this.productId + "']")).removeClass('loading');
                            $('.card-swatch-body .card-text.card-text--colorswatches').each(function () {
                                $(this).find(".option_section .options_slide").each(function () {
                                    if ($(this).index() > 4) {
                                        if ($(this).attr('data-swatch-count') > 3) {
                                            //   $(this).hide();  
                                        }
                                    }
                                });
                                var timer;
                                var li_options_slide = 0;
                                function hide_swatches(li_prdct_lngth) {
                                    if (li_prdct_lngth > 0) {
                                        clearInterval(timer);
                                        $("li.product").each(function () {
                                            var swatch_identify = '';
                                            $(this).find("article .card-swatch-body .card-text--colorswatches").first().find("ul.option_section li.options_slide").each(function (index) {
                                                if (index == 0) {
                                                    if ($(this).find(".productCard-colorSwatch span").length !== 0) {
                                                        swatch_identify = "color";
                                                    }
                                                    else if ($(this).find(".productCard-colorSwatch img").length !== 0) {
                                                        swatch_identify = "pattern";
                                                    }
                                                    else if ($(this).find("input.form-radio").length !== 0) {
                                                        swatch_identify = "size";
                                                    }
                                                }
                                                if ($(this).find(".productCard-colorSwatch span").length !== 0) {
                                                    if (swatch_identify != "color") {
                                                        $(this).css('display', 'none');
                                                    }
                                                }
                                                else if ($(this).find(".productCard-colorSwatch img").length !== 0) {
                                                    if (swatch_identify != "pattern") {
                                                        $(this).css('display', 'none');
                                                    }
                                                }
                                                else if ($(this).find("input.form-radio").length !== 0) {
                                                    if (swatch_identify != "size") {
                                                        $(this).css('display', 'none');
                                                    }
                                                }
                                            });
                                        });
                                    }
                                }
                                timer = setInterval(function () {
                                    li_options_slide = $('li.options_slide').length;

                                    hide_swatches(li_options_slide);
                                }, 3000);
                            });
                        }
                    });
                }
            }
        }

        $scope.on('click', '[data-product-option-id]', (event) => {
            event.preventDefault();

            const $a = $(event.currentTarget);
            const id = $a.data('product-option-id');
            const val = $a.data('product-option-value');
            const lab = $a.data('product-option-label');
            var indx = 0;
            var resp_indx = document.getElementById('resp' + id).value;
            var rec_data = response[resp_indx].data.site.products.edges || {};
            this.$cardFigure.addClass('loading');
            for (let index7 = 0; index7 < rec_data.length; index7++) {
                if (rec_data[index7].node['entityId'] == this.productId) {
                    indx = index7;
                    break;
                }
            }
            var swatch_cnt = rec_data[indx].node['productOptions'].edges.length;
            var swatch_val = rec_data[indx].node['productOptions'].edges;
            var swatch_img = rec_data[indx].node['variants'].edges;
            var edg_cnt = rec_data[indx].node['variants'].edges.length;
            var t = 0;
            var cursor;
            for (let index = 0; index < edg_cnt; index++) {
                var tmp = swatch_img[index].node.options.edges.length;
                cursor = swatch_img[index].cursor;
                for (let index1 = 0; index1 < tmp; index1++) {
                    var name = swatch_img[index].node.options.edges[index1].node['values'].edges[0].node['label'];
                    if (name == lab) {
                        if (swatch_img[index].node['defaultImage'] != null)
                            swatch_img = swatch_img[index].node['defaultImage'].url;
                        else
                            swatch_img = null;
                        t = 1;
                        break;
                    }

                }

                if (t == 1)
                    break;

            }
            if (t == 0) {
                var size = 1;
                var col;
                var swatch;
                for (let index = 0; index < swatch_cnt; index++) {
                    swatch = rec_data[indx].node['productOptions'].edges[index].node['displayName'];
                    if (swatch == 'Size') {
                        size = rec_data[indx].node['productOptions'].edges[index].node['values'].edges.length

                    }
                    else if (swatch == 'Color')
                        col = rec_data[indx].node['productOptions'].edges[index].node['values'].edges.length;
                }
                size = size * col;
                if (size > 50) {

                    var cnt = 1;
                    if (size % 50 != 0)
                        cnt = (size / 50) + 1;
                    else
                        cnt = (size / 50)

                    for (let index3 = 0; index3 < cnt; index3++) {
                        var res = graphqlqueryvariants(this.productId, cursor);
                        rec_data = res.data.site.products.edges || {};
                        swatch_img = rec_data[0].node['variants'].edges;
                        edg_cnt = rec_data[0].node['variants'].edges.length;
                        for (let index = 0; index < edg_cnt; index++) {
                            var tmp = swatch_img[index].node.options.edges.length;
                            cursor = swatch_img[index].cursor;
                            for (let index1 = 0; index1 < tmp; index1++) {
                                var name = swatch_img[index].node.options.edges[index1].node['values'].edges[0].node['label'];
                                if (name == lab) {
                                    swatch_img = swatch_img[index].node['defaultImage'].url;
                                    t = 1;
                                    break;
                                }
                            }
                            if (t == 1)
                                break;
                        }
                        if (t == 1)
                            break;
                    }
                }
            }

            if (swatch_img != null) {
                const img = swatch_img.replace('1000w', "500x659");

                var $activecard = this.$scope.find('.card-image.is-active');
                var $newcard = this.$scope.find('#swatch-image');
                var $lastcard = this.$scope.find('.last');
                $activecard.removeClass("is-active");
                $lastcard.removeClass("last");
                $newcard.addClass("is-active");
                $newcard.addClass("last");


                $newcard.attr('src', img);
                $newcard.attr('srcset', img);
                $newcard.attr('data-src', img);
                this.$cardFigure.removeClass('loading');
            } else {
                this.$cardFigure.removeClass('loading');
            }
        });
    }
}

function check() {
    len = $('[data-product-card-options]').length;
    var t = 0;
    var n = 0;
    $('[data-product-card-options]').each((i, el) => {
        id_array[n] = $(el).data('product-id');
        if (n >= 49) {
            t++;
            if (n == 49)
                cnt++;
            if (t == 49) {
                t = 0;
                cnt++;
            }
        }
        if (n == 0 || t + 1 == 49 || t == 1)
            ids[cnt] = $(el).data('product-id') + ',';
        else if (n + 1 == len)
            ids[cnt] += $(el).data('product-id');
        else
            ids[cnt] += $(el).data('product-id') + ',';
        n++;
    });

    if (context.showSwatch) {
        cnt = 0;
        for (let index = 0; index <= cnt; index++) {

            response[index] = graphqlquery(ids[index]);
        }
        $('[data-product-card-options]').each((i, el) => {
            // if (!$(el).data('product-card-colorswatches-instance') && inView.is(el)) {
          
            $(el).data('product-card-colorswatches-instance', new ProductCardColorSwatches($(el)));
            // }
        });
    }
}

export function inViewCheck(localContext, eventEl = window) {

    if (localContext) {
        context = localContext;
    }

    if (!context) {
        return;
    }
    const $eventEl = $(eventEl);
    inView.offset(-200);
    if ($eventEl.data('productCardColorswatchesInViewCheckEvent')) {
        return;
    }
    check();
    const callback = _.debounce(check, 250);
    let lastUrl = window.location.href;
    let lastHtml = $(".productGrid .product .card .card-body .card-text[data-product-card-options-content]").hasClass("loaded");
    new MutationObserver(() => {
        const url = window.location.href;
        let letestHtml = $(".productGrid .product .card .card-body .card-text[data-product-card-options-content]").hasClass("loading");

        if (url !== lastUrl && lastHtml === letestHtml) {
            lastUrl = url;
            callback();
            $eventEl.data('productCardColorswatchesInViewCheckEvent', callback);
        }
    }).observe(document, { subtree: true, childList: true })
}
export function graphqlquery(prod_ids) {
    if (typeof context.bearerToken !== 'undefined') {

        var bearerToken = context.bearerToken;
        var query =
            `query ProductsWithImagesAndSwatches {
                site {
                  products(entityIds:[`+ prod_ids + `],first:50){
                    edges {
                      node {
                        entityId
                        name
                        ...productInformation
                        variants(first:50){
                            edges {
                                cursor
                                node {
                                  entityId
                                  options
                                  {
                                    edges
                                    {
                                      node
                                      {
                                          values{
                                          edges
                                          {
                                            node
                                            {
                                              label
                                            }
                                          }
                                        }
                                        displayName
                                      }
                                    }
                                  }
                                  defaultImage {
                                    url(width: 1000)
                                  }
                                }
                              }
                            }
                          productOptions {
                              edges {
                                node {
                                  entityId
                                  displayName
                                  ... on MultipleChoiceOption {
                                    displayStyle
                                    entityId
                                    values {
                                      edges {
                                        node {
                                          entityId
                                          label
                                          isDefault
                                          ... on SwatchOptionValue {
                                            hexColors
                                            imageUrl(width: 200)
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                    }
                  }
                }
              }
            }
            fragment productInformation on Product {
                        inventory{
                          isInStock
                        }
                      }`

        var graphql_query_result = $.ajax({

            url: "/graphql",
            contentType: "application/json",
            type: 'POST',
            async: false,
            headers: {
                'Authorization': 'Bearer ' + bearerToken
            },
            data: JSON.stringify({ query: query }),
            success: function (productSlickData) {



            }
        });

        return graphql_query_result.responseJSON;
    }
}
export function graphqlqueryvariants(prod_id, cur) {
    if (typeof context.bearerToken !== 'undefined') {
        var bearerToken = context.bearerToken;
        var query =
            `query ProductsWithImagesAndSwatches {
                site {
                  products(entityIds:[`+ prod_id + `]){
                    edges {
                      node {
                        entityId
                        name
                        ...productInformation
                        variants(first:50,after:"`+ cur + `"){
                            edges {
                                cursor
                                node {
                                  entityId
                                  options
                                  {
                                    edges
                                    {
                                      node
                                      {
                                          values{
                                          edges
                                          {
                                            node
                                            {
                                              label
                                            }
                                          }
                                        }
                                        displayName
                                      }
                                    }
                                  }
                                  defaultImage {
                                    url(width: 1000)
                                  }
                                }
                              }
                            }
                          productOptions {
                              edges {
                                node {
                                  entityId
                                  displayName
                                  ... on MultipleChoiceOption {
                                    displayStyle
                                    entityId
                                    values {
                                      edges {
                                        node {
                                          entityId
                                          label
                                          isDefault
                                          ... on SwatchOptionValue {
                                            hexColors
                                            imageUrl(width: 200)
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                    }
                  }
                }
              }
            }
            fragment productInformation on Product {
                        inventory{
                          isInStock
                        }
                      }`

        var graphql_query_result = $.ajax({

            url: "/graphql",
            contentType: "application/json",
            type: 'POST',
            async: false,
            headers: {
                'Authorization': 'Bearer ' + bearerToken
            },
            data: JSON.stringify({ query: query }),
            success: function (productSlickData) {

            }
        });
        return graphql_query_result.responseJSON;
    }

}
