import '@fancyapps/fancybox/dist/jquery.fancybox.min';
import '@fancyapps/fancybox/dist/jquery.fancybox.min.css';
import { ready } from 'jquery';
$.fancybox.defaults.hash = false;
import cookies from 'js-cookie/src/js.cookie';
import { forEach } from 'lodash';
export default (function () {

    /* Loader JS start */
    $(window).load(() => {
        $('.cust-load').fadeOut('5000');
    });
    /* Loader JS end */

    /* Fancybox JS start */

    //Don't enable Cloud Zoom (product image zoom) on touch device
    //Mouseenter/Mouseover events are not ideal for touch devices
    //for more info search for this code in /script/main.js
    if (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)) {
        $('body').addClass('touch-device');
    }
    $(document).on('click', '.fancythumb-img', function (e) {
        e.preventDefault();
    });
    $('.productView-thumbnail-link').hover(function () {
        const imgurl = $(this).data('link');
        $('.fancybox-hidden-img').removeClass('currentGalleryImage');
        $('.fancybox-hidden-img').each(function () {
            if ($(this).attr('href') == imgurl) {
                $(this).addClass('currentGalleryImage');
            }
        });
    });
    $('.productView-image-main').click(function () {
        $('.currentGalleryImage').trigger('click');
    });
    /* Fancybox JS end */

    $(document).ready(() => {

        /* List-Grid View JS start */
        function Set_Cookie(value) {
            var data_view = Get_Cookie("data-view");
            if (data_view == '') {
                document.cookie = "data-view=" + value;
            }
            else {
                Delete_Cookie("data-view");
                document.cookie = "data-view=" + value;
            }
        }
        function Delete_Cookie(name) {
            var dateObj = new Date();
            dateObj.setDate(dateObj.getDate() - 1);
            document.cookie = name + '=;expires=' + dateObj;
        }
        function Get_Cookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
        function set_list_grid() {
            var cookie_data_view = Get_Cookie("data-view");
            if (cookie_data_view == '') {
                cookie_data_view = '';
            }

            if (cookie_data_view == 'product-grid-view') {
                $('.view-button-list').removeClass('is-active');
                $('.view-button-grid').addClass('is-active');
                $('.product-view-mode .productGrid').addClass('is-open');
                $('.product-view-mode .productList').removeClass('is-open');
            }
            else if (cookie_data_view == 'product-list-view') {
                $('.view-button-grid').removeClass('is-active');
                $('.view-button-list').addClass('is-active');
                $('.product-view-mode .productList').addClass('is-open');
                $('.product-view-mode .productGrid').removeClass('is-open');
            }
        }
        set_list_grid();

        $(document).on('click', '.page .page-content .product-listing-filter-section .product-listing-filter-right .product-view-button a[data-view="product-grid-view"]', function () {
            $('.view-button-list').removeClass('is-active');
            $('.view-button-grid').addClass('is-active');
            $('.product-view-mode .productGrid').addClass('is-open');
            $('.product-view-mode .productList').removeClass('is-open');
            Set_Cookie('product-grid-view');
        });

        $(document).on('click', '.page .page-content .product-listing-filter-section .product-listing-filter-right .product-view-button a[data-view="product-list-view"]', function () {
            $('.view-button-grid').removeClass('is-active');
            $('.view-button-list').addClass('is-active');
            $('.product-view-mode .productList').addClass('is-open');
            $('.product-view-mode .productGrid').removeClass('is-open');
            Set_Cookie('product-list-view');
        });

        $(document).ajaxComplete(function () {
            set_list_grid();
        });

        /* List-Grid View JS end */

        /* Search bar closing JS start */
        $('.modal-close.custom_close').click(function () {
            $(".form-input").val("");
            $(".quickSearchResults").empty();
        });
        /* Search bar closing JS end */

        /* sticky header JS start */

        /* Get the height of all header elements */
        const TopBannerHeight = $('.custom-banners.top').outerHeight();
        const HeaderMiddleHeight = $('.main-header').outerHeight();
        const HeaderHeight = $('.header').outerHeight();
        const FullHeaderHeight = TopBannerHeight + HeaderHeight + 25;
        const lastscroll = 0;
        $(window).scroll(() => {
            const scroll = $(window).scrollTop();
            if ($('[sticky = "true"]').length && $(window).width() > 1023) {
                if (scroll >= FullHeaderHeight) {
                    $('.header').addClass('sticky-header');
                    $('.header_placeholder').css({ display: 'block' });
                } else {
                    $('.header').removeClass('sticky-header');
                    $('.header_placeholder').css({ display: 'none' });
                }
            }
            else {
                $(".product_review_count").click(function () {
                    // $('html, body').animate({
                    //      scrollTop: $(".productView-description .productView-reviewTabLink").offset().top
                    // }, 1000);
                });
            }
        });

        if ($(window).width() < 1024) {
            $('.header').css('top', TopBannerHeight);
            $('.navPages-container').css('padding-top', HeaderMiddleHeight);
            $('body').css('padding-top', (TopBannerHeight + HeaderHeight));
        }
        /* sticky header JS end */

        /* review scrolling js start */
        $(".product_review_count").click(function () {
            if ($('header').attr('sticky', 'true')) {
                $('html, body').animate({
                    scrollTop: $(".productView-description .productView-reviewTabLink").attr('href', '#tab-reviews').offset().top - 2 * ($('.header').outerHeight())
                }, 1000);
            }
            else {
                $(".product_review_count").click(function () {
                    $('html, body').animate({
                        scrollTop: $(".productView-description .productView-reviewTabLink").attr('href', '#tab-reviews').offset().top
                    }, 1000);
                });
            }
        });
        /* review scrolling js end */

        /* Account dropdown JS start */
        $('.navUser-item--account').mouseenter(function () {
            $(this).children('.account-dropdown').addClass('is-open');
            $(this).append('<div class="cross-hover"></div>');
        });
        $('.navUser-item--account').mouseleave(function () {
            $(this).children('.account-dropdown').removeClass('is-open');
            $('.cross-hover').remove();
        });
        /* Account dropdown JS end */

        /* Mega menu for mobile view JS start */
        $('.main_icon').click(function () {
            $(this).toggleClass('is-open');
            $(this).parent().toggleClass('is-open');
            $(this).parent().find('.navPage-subMenu').toggleClass('is-open');
        });
        $('.sub_icon').click(function () {
            $(this).toggleClass('is-open');
            $(this).parent().toggleClass('is-open');
            $(this).siblings('.navPage-childList').toggleClass('is-open');
        });
        /* Mega menu for mobile view JS end */

        /* For currency & account JS start */
        $('.navPages-list--user .navPages-item .navPages-action').click(function () {
            $(this).siblings('.main_icon').toggleClass('is-open');
        });
        /* For currency & account JS end */

        /* Mega menu hover for desktop view JS start */
        if ($(window).width() > 1023) {
            $('.navPages-list .navPages-item').mouseover(function () {
                $(this).children('a.navPages-action.has-subMenu').addClass('is-open');
                $(this).children('div.navPage-subMenu').addClass('is-open');
            });
            $('.navPages-list .navPages-item').mouseleave(function () {
                $(this).children('a.navPages-action.has-subMenu').removeClass('is-open');
                $(this).children('div.navPage-subMenu').removeClass('is-open');
            });
            $('.navUser-item--search .navUser-action--quickSearch').click(function () {
                $(this).parentsUntil('header-left').find('.dropdown--quickSearch.is-open').css('top', HeaderMiddleHeight);
            });
            $(".navPage-subMenu-list .navPage-subMenu-item-child").mouseover(function () {
                $(this).children('a.navPages-action.has-subMenu').addClass('is-open');
                $(this).children('div.navPage-subMenu').addClass('is-open');
            });
            $(".navPage-subMenu-list .navPage-subMenu-item-child").mouseleave(function () {
                $(this).children('a.navPages-action.has-subMenu').removeClass('is-open');
                $(this).children('div.navPage-subMenu').removeClass('is-open');
            });
        }
        /* Mega menu hover for desktop view JS end */

        /* USP slider JS start */
        if ($(window).width() < 1300) {
            $(".usp-list").slick({
                arrows: false,
                dots: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: true,
                autoplay: true,
                autoplaySpeed: 5000,
                responsive: [
                    {
                        breakpoint: 900,
                        settings: {
                            centerMode: false,
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            centerMode: false,
                            slidesToShow: 1
                        }
                    }
                ]
            });
        }
        /* USP slider JS end */

        /* Compare functionality JS start */
        if ($('body').hasClass('category') || $('body').hasClass('search') || $('body').hasClass('brand')) {
            $('.custom-compare.show').click(function () {
                $('.custom-compare').removeClass('clicked');
                $('input:checkbox:checked').each(function () {
                    $(this).parents('.custom-compare').addClass('clicked');
                });
            });
        }
        else {
            $(".custom-compare").click(function (e) {
                $(this).toggleClass("clicked");
                e.preventDefault();
                var p = $(this).closest('article').attr("data-comp");
                $(".navUser-item--compare").addClass("show");
                var old_href = $(".navUser-item--compare").attr("href");
                if (old_href.indexOf(p) < 0) {
                    $(".navUser-item--compare").attr("href", old_href + "/" + $(this).find('input').attr("value"));
                }
                else {
                    var remove = "/" + p;
                    var remove_comp = old_href.replace(remove, '');
                    $(".navUser-item--compare").attr("href", remove_comp);
                    var new_href = $(".navUser-item--compare").attr("href");
                }
                $(".navUser-action.show .countPill").text($(".navUser-item--compare").attr("href").replace(/[^/]/g, '').length - 1);
                if ($('.navUser-item--compare .show.countPill.countPill--positive.countPill--alt').text() == '0') {
                    $('.navUser-action.navUser-item--compare').removeClass('show');
                }
            });
        }

        $(document).ajaxComplete(function () {
            if ($('body').hasClass('category') || $('body').hasClass('search') || $('body').hasClass('brand')) {
                $('.custom-compare.show').click(function () {
                    $('.custom-compare').removeClass('clicked');
                    $('input:checkbox:checked').each(function () {
                        $(this).parents('.custom-compare').addClass('clicked');
                    });
                });
            }
            else {
                $(".custom-compare").click(function (e) {
                    $(this).toggleClass("clicked");
                    e.preventDefault();
                    var p = $(this).closest('article').attr("data-comp");
                    $(".navUser-item--compare").addClass("show");
                    var old_href = $(".navUser-item--compare").attr("href");
                    if (old_href.indexOf(p) < 0) {
                        $(".navUser-item--compare").attr("href", old_href + "/" + $(this).find('input').attr("value"));
                    }
                    else {
                        var remove = "/" + p;
                        var remove_comp = old_href.replace(remove, '');
                        $(".navUser-item--compare").attr("href", remove_comp);
                        var new_href = $(".navUser-item--compare").attr("href");
                    }
                    $(".navUser-action.show .countPill").text($(".navUser-item--compare").attr("href").replace(/[^/]/g, '').length - 1);
                    if ($('.navUser-item--compare .show.countPill.countPill--positive.countPill--alt').text() == '0') {
                        $('.navUser-action.navUser-item--compare').removeClass('show');
                    }
                });
            }
        });
        /* Compare functionality JS end */

        /* Product Swatches JS start */
        $('body').on('click', '.card-image-link--slider', event => {
            const $activeImg = $(event.currentTarget).find('.is-active');
            const $arrow = $(event.target).closest('.card-image-prev, .card-image-next');
            if ($arrow.hasClass('card-image-prev')) {
                event.preventDefault();
                if (!$activeImg.hasClass('first')) {
                    $activeImg.removeClass('is-active')
                        .prev()
                        .addClass('is-active');
                } else {
                    $activeImg.removeClass('is-active')
                        .siblings(".last")
                        .addClass('is-active');
                }
            } else if ($arrow.hasClass('card-image-next')) {
                event.preventDefault();
                if (!$activeImg.hasClass('last')) {
                    $activeImg.removeClass('is-active')
                        .next()
                        .addClass('is-active');
                } else {
                    $activeImg.removeClass('is-active')
                        .siblings(".first")
                        .addClass('is-active');
                }
            }
        });

        // card image slider script
        $('body').on('click', '.card-image-prev', event => {
            const $activeImg = $(event.currentTarget).parent().find('.is-active');
            event.preventDefault();
            if (!$activeImg.hasClass('first')) {
                $activeImg.removeClass('is-active')
                    .prev()
                    .addClass('is-active');
            } else {
                $activeImg.removeClass('is-active')
                    .siblings(".last")
                    .addClass('is-active');
            }

        });
        $('body').on('click', '.card-image-next', event => {
            const $activeImg = $(event.currentTarget).parent().find('.is-active');
            event.preventDefault();
            if (!$activeImg.hasClass('last')) {
                $activeImg.removeClass('is-active')
                    .next()
                    .addClass('is-active');
            } else {
                $activeImg.removeClass('is-active')
                    .siblings(".first")
                    .addClass('is-active');
            }

        });

        $(document).on('click', '.productCard-colorSwatch', function () {
            $(this).addClass("is-active");
            $(this).parents(".options_slide").siblings(".options_slide").children(".productCard-colorSwatch").removeClass("is-active");
        });

        $(document).on('click', '.productCard-colorSwatch,.form-option', function () {
            $(this).addClass("is-active");
            $(this).parents(".options_slide").siblings(".options_slide").children(".productCard-colorSwatch,.form-option").removeClass("is-active");
        });
        /* Product Swatches JS end */

        /* Instagram JS start */

        /* Turned off Instagram for now until find a better way to set it up 
        setTimeout(function() {
            $("#instafeed").slick({
                arrows: true,
                dots: false,        
                slidesToShow: 7,
                slidesToScroll: 1,
                centerMode: true,
                autoplay: true,
                autoplaySpeed: 5000,
                responsive: [
                    {
                        breakpoint: 1800,
                        settings: {
                            slidesToShow: 5
                        }
                    }
                    ,
                    {
                        breakpoint: 900,
                        settings: {
                            slidesToShow: 4
                        }
                    }
                    ,
                    {
                        breakpoint: 700,
                        settings: {
                            slidesToShow: 3
                        }
                    }
                    ,
                    {
                        breakpoint: 500,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
        }, 2000);      
        /* Instagram JS end */

        /* Category description JS start */

        $('.toggle-more').click(function () {
            $('.cat-desc-trim-content').toggleClass("is-open");
        });
        /* Category description JS end */

        /* Category Sidebar JS start */
        $(".navList-item .navList-icon").click(function () {
            $(this).toggleClass('is-open');
            $(this).siblings('.navList-childlist').toggleClass('is-open');
        });
        /* Category Sidebar JS end */

        /* Category URL with Sidebar Start */
        var pageURL = window.location.pathname;
        var url_catgries = pageURL.slice(1, -1);
        var url_catgries_arr = url_catgries.split('/');
        $(".page .page-sidebar nav .sidebarBlock").first().find('.navList .navList-item').each(function () {
            //var trimed_cat_nm = $.trim($( this ).find('.navList-action').first().text().replace(' ','-'));
            var trimed_cat_url = $.trim($(this).find('.navList-action').first().data("cate-url"));
            var trimed_cat_nwurl = trimed_cat_url.split('/');
            var trimed_cat_nwurl_len = trimed_cat_nwurl.length;
            var final_trimed_cat_nm = trimed_cat_nwurl[trimed_cat_nwurl_len - 2];
            //if(jQuery.inArray(trimed_cat_nm.toLowerCase(), url_catgries_arr) !== -1)
            if (jQuery.inArray(final_trimed_cat_nm, url_catgries_arr) !== -1) {
                $(this).addClass('is-open');
                $(this).find('.navList-action').first().addClass('is-open');
                if ($(this).find('.navList-action').first().hasClass("has-subMenu")) {
                    $(this).find(".navList-icon").first().addClass('is-open');
                    $(this).find(".navList-childlist").first().addClass('is-open');
                    $(this).find(".navList-childlist").first().find('.navList-childlist-item').each(function () {
                        var trimed_subcat_nm = $.trim($(this).find('.navList-action').first().text().replace(' ', '-'));
                        var trimed_subcat_url = $.trim($(this).find('.navList-action').first().data("cate-url"));
                        var trimed_subcat_nwurl = trimed_subcat_url.split('/');
                        var trimed_subcat_nwurl_len = trimed_subcat_nwurl.length;
                        var final_trimed_subcat_nm = trimed_subcat_nwurl[trimed_subcat_nwurl_len - 2];
                        //if(jQuery.inArray(trimed_subcat_nm.toLowerCase(), url_catgries_arr) !== -1)
                        if (jQuery.inArray(final_trimed_subcat_nm, url_catgries_arr) !== -1) {
                            $(this).addClass('is-open');
                            $(this).find('.navList-action').first().addClass('is-open');
                            $(this).parents('li.navList-childlist-item').children("i.navPages-action-moreIcon").addClass('is-open');
                            $(this).parents('li.navList-childlist-item').children("a.navList-action").addClass('is-open');
                            $(this).parents('li.navList-childlist-item').children("ul.navList-childlist").addClass('is-open');
                            if ($(this).find('.navList-action').first().hasClass("has-subMenu")) {
                                $(this).find(".navList-icon").first().addClass('is-open');
                                $(this).find(".navList-childlist").first().addClass('is-open');
                            }
                        }
                    });
                }
            }
            else {
                $(this).removeClass('is-open');
                if ($(this).find('.navList-action').first().hasClass("has-subMenu")) {
                    $(this).find(".navList-icon").first().removeClass('is-open');
                    $(this).find(".navList-childlist").first().removeClass('is-open');
                }
            }
        });

        //Faceted Search Filter open and close on responsive

        $('.facetedSearch-toggle').click(function () {
            $('.facetedSearch-navList').toggle();
        });

        $(document).ajaxComplete(function () {
            var pageURL = window.location.pathname;
            var url_catgries = pageURL.slice(1, -1);
            var url_catgries_arr = url_catgries.split('/');
            $(".page .page-sidebar nav .sidebarBlock").first().find('.navList .navList-item').each(function () {
                //var trimed_cat_nm = $.trim($( this ).find('.navList-action').first().text().replace(' ','-'));
                var trimed_cat_url = $.trim($(this).find('.navList-action').first().data("cate-url"));
                var trimed_cat_nwurl = trimed_cat_url.split('/');
                var trimed_cat_nwurl_len = trimed_cat_nwurl.length;
                var final_trimed_cat_nm = trimed_cat_nwurl[trimed_cat_nwurl_len - 2];
                if (jQuery.inArray(final_trimed_cat_nm, url_catgries_arr) !== -1)
                //if(jQuery.inArray(trimed_cat_nm.toLowerCase(), url_catgries_arr) !== -1)
                {
                    $(this).addClass('is-open');
                    $(this).find('.navList-action').first().addClass('is-open');
                    if ($(this).find('.navList-action').first().hasClass("has-subMenu")) {
                        $(this).find(".navList-icon").first().addClass('is-open');
                        $(this).find(".navList-childlist").first().addClass('is-open');
                        $(this).find(".navList-childlist").first().find('.navList-childlist-item').each(function () {
                            //var trimed_subcat_nm = $.trim($( this ).find('.navList-action').first().text().replace(' ','-'));
                            var trimed_subcat_url = $.trim($(this).find('.navList-action').first().data("cate-url"));
                            var trimed_subcat_nwurl = trimed_subcat_url.split('/');
                            var trimed_subcat_nwurl_len = trimed_subcat_nwurl.length;
                            var final_trimed_subcat_nm = trimed_subcat_nwurl[trimed_subcat_nwurl_len - 2];
                            if (jQuery.inArray(final_trimed_subcat_nm, url_catgries_arr) !== -1)
                            //if(jQuery.inArray(trimed_subcat_nm.toLowerCase(), url_catgries_arr) !== -1)
                            {
                                $(this).addClass('is-open');
                                $(this).find('.navList-action').first().addClass('is-open');
                                $(this).parents('li.navList-childlist-item').children("i.navPages-action-moreIcon").addClass('is-open');
                                $(this).parents('li.navList-childlist-item').children("a.navList-action").addClass('is-open');
                                $(this).parents('li.navList-childlist-item').children("ul.navList-childlist").addClass('is-open');
                                if ($(this).find('.navList-action').first().hasClass("has-subMenu")) {
                                    $(this).find(".navList-icon").first().addClass('is-open');
                                    $(this).find(".navList-childlist").first().addClass('is-open');
                                }
                            }
                        });
                    }
                }
                else {
                    $(this).removeClass('is-open');
                    if ($(this).find('.navList-action').first().hasClass("has-subMenu")) {
                        $(this).find(".navList-icon").first().removeClass('is-open');
                        $(this).find(".navList-childlist").first().removeClass('is-open');
                    }
                }
            });
        });
        /* Category URL with Sidebar End */

        /* blog date for home page start 
        var dt = $('.blog-date .date-format').text();
        dt = dt.replace('th','-').replace('rd','-').replace('nd','-');
        var year = dt.substr(dt.length-4, dt.length);
        var date = dt.substr(0, dt.length-9);
        var month = dt.replace(year,'').replace(date,'');
        month = month.substr(0,month.length-1)+'-';
        var update_date = month+ date + year;
        $('.blog-date .date-format').text(update_date);
        /* blog date for home page end */

        /* blog date for blog page start 
        $(".blog .blog-date").each(function(){var e=$(this).text(),t=e.substr(e.indexOf(" on ")+4,e.length).replace("th","").replace("rd","").replace("st","").replace("nd","");e=(e=e.substr(0,e.indexOf(" on ")+4))+t.replace(/[^A-z]/g,"")+"-"+(t=t.replace(/\D/g,"")).substr(0,t.length-4)+"-"+t.substr(t.length-4,t.length),$(this).text(e)});
        /* blog date for blog page end */

        /* wishlist js start */
        $(document).on('click', '.card .figure-content .card-figcaption .card-figcaption-body .card_wishlist, article.listItem .figure-content .listItem-figureBody .list_wishlist', function () {
            $(".Wishlist_card_Form").remove();
            var wishlist_URL = $(this).find('.wishlist_url').data('whslst_url');
            var form = document.createElement("form");
            document.body.appendChild(form);
            form.method = "POST";
            form.action = wishlist_URL;
            form.className = 'Wishlist_card_Form';
            var element1 = document.createElement("input");

            element1.name = "wishlist_sbmt_btn"
            element1.value = 'add to wishlist';
            element1.type = 'submit';
            element1.className = 'wishlist_submit_button';
            form.appendChild(element1);
            $(".wishlist_submit_button").click();
        });
        /* wishlist js end */

        /*
        
        $(document).ajaxComplete(function(){
            $(".view-quick-result-desktop a").click(function(){
                var form_act = $(".dropdown--quickSearch .quick-search").attr("action");
                var search_val = $(".dropdown--quickSearch .quick-search-input").val();
                var final_url = form_act+"?search_query="+search_val;
                $(this).attr("href",final_url);
            });

            $(".view-quick-result-mobile a").click(function(){
                var form_act = $(".navPages-quickSearch .quick-search").attr("action");
                var search_val = $(".navPages-quickSearch .quick-search-input").val();
                var final_url = form_act+"?search_query="+search_val;
                $(this).attr("href",final_url);
            });
        });
        
        */
        $(document).ready(function () {
            let productOptions = document.querySelectorAll('[data-product-option-change]')
            let month = ""
            let day = ""
            let year = ""

            function handleLabelUpdate(event) {
                // For Dev Purposes
                console.log(event.target.type)


                let formField = event.target.closest(".form-field");
                if (!formField) return;
                let optionValueSpan = formField.querySelector("[data-option-value]");
                if (!optionValueSpan) {
                    console.warn("Label Not Found")
                };


                //Update the Checkbox that was interacted with
                if (event.target.type === "checkbox") {

                    //Change this value to determine the message you want to see when box is checked
                    if (event.target.checked) {
                        optionValueSpan.textContent = "Test"
                    }

                    // Reset checkbox if unchecked
                    else {
                        optionValueSpan.textContent = ""
                    }
                }

                // Update any radio option that is interacted with
                else if (event.target.type === "radio") {

                    // Special logic for swatches due to different DOM formatting
                    if (event.target.getAttribute('id').includes("swatch")) {
                        optionValueSpan.textContent = event.target.nextElementSibling.querySelector('span').title
                    }

                    // All Other Radio Options
                    else {
                        optionValueSpan.textContent = event.target.nextElementSibling.textContent;
                    }
                }

                else if (event.target.type === "select-one") {

                    // Special logic for calendars to differentiate between normal dropdowns
                    if (event.target.getAttribute('class').includes("date")) {


                        // Store variables to concatenate full date, reorder to fit desired format
                        if (event.target.getAttribute('name').includes('month')) {
                            month = event.target.selectedOptions[0].textContent
                        }
                        else if (event.target.getAttribute('name').includes('day')) {
                            day = event.target.selectedOptions[0].textContent
                        }
                        else {
                            year = event.target.selectedOptions[0].textContent
                        }

                        // Concatenate all strings
                        if (month && !day && !year) {
                            optionValueSpan.textContent = `${month}`
                        }
                        if (month && day && !year) {
                            optionValueSpan.textContent = `${month} ${day}`
                        }
                        if (month && day && year) {
                            optionValueSpan.textContent = `${month} ${day}, ${year}`
                        }


                    }
                    //Normal dropdown logic
                    else {
                        optionValueSpan.textContent = event.target.selectedOptions[0].textContent
                    }
                }

                // Number Entry Logic
                else if (event.target.type === "number") {
                    optionValueSpan.textContent = event.target.value
                }

                // TextBox Logic
                else if (event.target.type === "text" || "textarea") {
                    optionValueSpan.textContent = event.target.value
                }

                // Catch missing option sets
                else {
                    console.warn("No Logic for Event Type")
                }
            }

            // Event Listener to monitor product options for changes
            $(productOptions).change(handleLabelUpdate);
        });

    });









});
