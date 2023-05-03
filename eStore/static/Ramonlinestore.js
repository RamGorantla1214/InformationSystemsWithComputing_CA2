websiteproductslist =
    [
        {
            "id": "1",
            "name": "T Shirt 1",
            "category": "T Shirt",
            "featuredimage": "../static/product_images/img1.jpg",
            "price": "100€"
        },

        {
            "id": "2",
            "name": "T Shirt 2",
            "category": "T Shirt",
            "featuredimage": "../static/product_images/img2.jpg",
            "price": "50€"
        },

        {
            "id": "3",
            "name": "T Shirt 3",
            "category": "T Shirt",
            "featuredimage": "../static/product_images/img3.jpg",
            "price": "70€"
        },

        {
            "id": "4",
            "name": "T Shirt 4",
            "category": "Shirt",
            "featuredimage": "../static/product_images/img4.jpg",
            "price": "110€"
        },

        {
            "id": "5",
            "name": "T Shirt 5",
            "category": "T Shirt",
            "featuredimage": "../static/product_images/img5.jpg",
            "price": "150€"
        },

        {
            "id": "6",
            "name": "T Shirt 6",
            "category": "T Shirt",
            "featuredimage": "../static/product_images/img6.jpg",
            "price": "60€"
        },

        {
            "id": "7",
            "name": "T Shirt 7",
            "category": "T Shirt",
            "featuredimage": "../static/product_images/img7.jpg",
            "price": "70€"
        },

        {
            "id": "8",
            "name": "T Shirt 8",
            "category": "T Shirt",
            "featuredimage": "../static/product_images/img8.jpg",
            "price": "90€"
        },

        {
            "id": "9",
            "name": "T Shirt 9",
            "category": "T Shirt",
            "featuredimage": "../static/product_images/img9.jpg",
            "price": "80€"
        }

    ];

$("#productsearch").keyup(function (event) {
    if ($("#productsearch").val().trim() == "") {
        $(".navLinks>li>a:contains('Home')").parent().click();
        dynamichtml = "";
        websiteproductslist = [];
        websiteproductslist = JSON.parse(localStorage.getItem("json"));
        GetProductHtml(websiteproductslist);
    }

    else {
        websiteproductslist = [];
        $.each(JSON.parse(localStorage.getItem("json")), function (i, v) {
            if (v.name.toLowerCase().indexOf($("#productsearch").val().toLowerCase()) != -1 || v.category.toLowerCase().indexOf($("#productsearch").val().toLowerCase()) != -1) {
                websiteproductslist.push(v);
            }
        });
        GetProductHtml(websiteproductslist);
    }
    if($(".cards_item").length==1)
    {
        $('.cards_item').css("width","65%");
    }
});


menu_linkshtml = "";
menu_links = [];
navlink = "";

$.each(websiteproductslist, function (index, value) {
    if ($.inArray(value.category, menu_links) === -1) {
        menu_links.push(value.category);
    }
});

menu_links.splice(0, 0, "Home");

for (var i = 0; i < menu_links.length; i++) {
    if (i == 0) {
        menu_linkshtml = "<li class='active' style='cursor:pointer'> <a href='/'>" + menu_links[i] + "</a></li>";
    }
    else {
        navlink = "?cat=" + menu_links[i].trim();
        menu_linkshtml += "<li style='cursor:pointer'> <a href=" + navlink + ">" + menu_links[i] + "</a></li>";
    }
}

$(".navLinks").append(menu_linkshtml);



localStorage.setItem("json", JSON.stringify(websiteproductslist));
dynamichtml = "";
websiteproductslist = [];
websiteproductslist = JSON.parse(localStorage.getItem("json"));
GetProductHtml(websiteproductslist);

category = "";
category = getUrlParameter("cat");
if (category != "") {
    $(".navLinks>li>a:contains('" + category + "')").parent().click();
}

if($('.navLinks>li').hasClass('active'))
{
    if ($('.navLinks>li.active')[0].textContent.trim() != "Home") {
        websiteproductslist = [];
        websiteproductslist = JSON.parse(localStorage.getItem("json"));
    
        websiteproductslist = websiteproductslist.filter(function (i) {
            return i.category == $('.navLinks>li.active')[0].textContent.trim();
        });
        GetProductHtml(websiteproductslist);
    }
}



else {
    websiteproductslist = [];
    websiteproductslist = JSON.parse(localStorage.getItem("json"));
    GetProductHtml(websiteproductslist);
}



$(document).ready(function () {

    $('.navLinks>li').on('click', function () {
        $('li').removeClass('active');
        $(this).toggleClass('active');
    });

    category = "";
    category = getUrlParameter("cat");

    if (category != "") {
        $(".navLinks>li>a:contains('" + category + "')").parent().click();
    }

    if($('.navLinks>li').hasClass('active'))
    {
        if ($('.navLinks>li.active')[0].textContent.trim() != "Home") {
            websiteproductslist = [];
            websiteproductslist = JSON.parse(localStorage.getItem("json"));
    
            websiteproductslist = websiteproductslist.filter(function (i) {
                return i.category == $('.navLinks>li.active')[0].textContent.trim();
            });
            GetProductHtml(websiteproductslist);
        }
    }

    else {
        websiteproductslist = [];
        websiteproductslist = JSON.parse(localStorage.getItem("json"));
        GetProductHtml(websiteproductslist);
    }


    $(".cartmsg").hide();

    cartvalue=[];
    cartval=[];
    $("#cart").hide();
    $(".modal").hide();
    websiteproductslist = JSON.parse(localStorage.getItem("json"));
    cartitemshtml = "";
    final_rating = 0;
    actual_rating = 0;
    cartitemexists=false;

    if(localStorage.getItem("cartitems")) {
      product_name = "";
      product_price = "";
      totalprice = 0; 
      cartval =  JSON.parse(localStorage.getItem("cartitems"));
      for(var i = 0; i < cartval.length; i++){
        product_name = websiteproductslist.filter(function (data) {
          return data.id == String(cartval[i].split("-")[0]);
        })[0].name;

        product_price = websiteproductslist.filter(function (data) {
          return data.id == String(cartval[i].split("-")[0]);
        })[0].price;

        cartitemshtml += "<br/><div><span><img style='height:15px;width:15px' src='./Media/bin.png'></img></span><a id='productlink' href='#'>" + product_name + " (" + cartval[i].split("-")[1] + ")</a> <span class='price'> € " + parseInt(product_price.split('€')[0].trim()) + "</span></div><br/>";
        totalprice += parseInt(product_price.split('€')[0].trim());
      }

      $("#cartitems").append(cartitemshtml);
      $('.totalprice').html("<b>Total: € "+totalprice+"</b>");

    }

    else {
      $(".row").hide();
      $(".cartmsg").show();
    }

    if(getUrlParameter("checkout") == "true") {
      $("#cart").show();
      $("#productdetail").hide();
      $('li').removeClass('active');
      $("#modal h2").text("Checkout")
      $(".copy span").text("Items reserved successfully");
    }

    else {
      GetProductDetailHtml();        
    }

});



$(window).on("load", function () {
    SetProductDetailCSS();
    $('li').removeClass('active');
  });


  function AddtoCart(itemid) {
    if(localStorage.getItem("cartitems")==null) {
        cartvalue=[];
        cartvalue[0]=itemid + "-1";
        localStorage.setItem("cartitems", JSON.stringify(cartvalue));
    }

    else {      
      cartvalue = localStorage.getItem("cartitems");
      cartvalue.push(itemid + ":1"); 
      localStorage.setItem("cartitems", JSON.stringify(cartvalue));
    }

    
   /* document.location.href = "./product?checkout=true";*/
  }



function SetProductDetailCSS() {
    $(".product-colors span").click(function () {
        $(".product-colors span").removeClass("active");
        $(this).addClass("active");
        $("body").css("background", $(this).attr("data-color"));
        $(".product-price").css("color", $(this).attr("data-color"));
        $(".product-button").css("color", $(this).attr("data-color"));
        $(".product-pic").css("background-image", $(this).attr("data-pic"));
    });
}



function GetProductDetailHtml(jsonarray) {
    $("#cart").hide();
    $("#productdetail").show();
    medialist = "";
    featurelist = "";
    productimg = "";
    categorylinkhtml = "";
    final_rating = 0;
    actual_rating = 0;
    UserRating="";
    userRatingHtml="";

    /*product_data = websiteproductslist.filter(function (i) {
        return i.id == String(getUrlParameter('id'));
    });*/

    product_data=websiteproductslist;

   


    categorylinkhtml = "<a style='color:#02AAB0;text-decoration: none;font-weight:500' href='?cat=" + product_data[0].category.trim() + "'>" + product_data[0].category + "</a>";
    $("#categorylink").append(categorylinkhtml);

    medialist = "<span data-pic='url(" + product_data[0].featuredimage + ")' class='active'> <img src='" + product_data[0].featuredimage + "'></img> </span>";

    for (var i = 0; i < product_data[0].additionalimages.length; i++) {
        medialist += "<span data-pic='url(" + product_data[0].additionalimages[i].image + ")'> <img src='" + product_data[0].additionalimages[i].image + "'></img> </span>";
    }

    productimg = "<li class='product_card_images'> <div style='display:flex;flex-direction:column;'> <div class='product-pic'></div>  <div class='product-colors'>" + medialist + "</div></div></li>";


    if (product_data[0].features.length == 1) {
        productimg += "<li class='product_card_desc'> <div style='display:flex;flex-direction:column;'><b><span>" + product_data[0].description + "</span></b><br/>" + ratinghtml + " </span> <br/> <b><span style='color:brown'>" + product_data[0].price + "<div style='float:left'> <div style='align-items:center'> <label id='lblqty'>Quantity</label> <select id='productqty'></select> </div> <button id='product_add_to_cart' onclick='AddtoCart()' class='btn card_btn btn-grad'>Add to Cart</button> </div> </span></b></div></li> ";
    }

    else {

        for (var i = 0; i < product_data[0].features.length; i++) {
            if (i == 0) {
                productimg += "<li class='product_card_desc'> <div style='display:flex;flex-direction:column;'><b><span>" + product_data[0].description + "</span></b><br/>" + ratinghtml + " </span> <br/> <b><span style='color:brown'>" + product_data[0].price + " <br/> <div style='align-items:center'><label id='lblqty'>Quantity &nbsp;</label> <select id='productqty'> </select> </div> <button id='product_add_to_cart' onclick='AddtoCart()' class='btn card_btn btn-grad'>Add to Cart</button> </span></b> <ul style='padding-left:15px'><br/>";
            }

            if (i != 0 && i == product_data[0].features.length - 1) {
                productimg += "<li><span>" + product_data[0].features[i].feature + "</span></li></ul></div></li>";
            }

            if (i != 0 && i != product_data[0].features.length - 1) {
                productimg += "<li><span>" + product_data[0].features[i].feature + "</span></li>";
            }
        }
    }
    $("#product-card").append(productimg);
    $("#product_name").text(product_data[0].name);
    $(".product-pic").css("background-image", "url('" + product_data[0].featuredimage + "')");
    $(".product-pic").css("background-repeat", "no-repeat");
    $(".product-pic").css("background-position", "left center");

    for (var i = 0; i < product_data[0].stockcount; i++) {
        $('#productqty').append('<option value="">' + (i + 1) + '</option>');
    }




    $(".copy span").append(userRatingHtml);
}


function GetProductHtml(jsonarray) {
    $("#productcatalog").html("");
    dynamichtml = "";
    $.each(jsonarray, function () {
        ratinghtml = "";
        final_rating = 0;
        actual_rating = 0;

    


        dynamichtml += "<li class='cards_item'><div class='card'><a href='/product?id=" + this.id + "'><div class='card_image'><img src='" + this.featuredimage + "'></div></a><div class='card_content'><h1 class='card_title'>" + this.name + "</h1> <div class='card_price'> <span> Price: " + this.price + "</span></div><br/> <button onclick='AddtoCart(" + this.id + ")'' id='view_product_detail' class='btn card_btn btn-grad'>Buy</button> </div></div></li>";

    });
    $("#productcatalog").append(dynamichtml);
}



function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};


function ToggleMenu() {
    $(".navLinks")[0].classList.toggle("responsive");
}


function GoHome() {
    window.location.href = "/";
}

function Navigateproductdetails(itemid) {
    window.location.href = "/product?id=" + itemid;
}