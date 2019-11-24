function showProduct(){
    $("#shoppingProductInfo").removeClass("hide");
    $("#shoppingCartInfo").addClass("hide");
}

function showShoppingCart(){
    $("#shoppingProductInfo").addClass("hide");
    $("#shoppingCartInfo").removeClass("hide");

}

function addToCart(product){
    var productId = "#"+ product;
    var $target = $(productId);// $("#product")
    var pName = $target.find(".p-name").text();
    var pImg = $target.find(".p-img-link").text();
    var pPrice = $target.find(".p-price").text();
    
   
        var productRecord =  
        "<tr class='cart_item'>"+
            "<td class='product-remove'>"+
                "<a title='Remove this item' class='remove' onClick='removeProddctRecord(this)' href='#'>×</a>"+ 
            "</td>"+
            "<td class='product-thumbnail'>"+
                "<a href='single-product.html'><img width='145' height='145' alt='poster_1_up' class='shop_thumbnail' src='"+pImg+"'></a>"+
            "</td>"+
            "<td class='product-name'>"+
                    "<a href='single-product.html'>"+pName+"</a>"+
                "</td>"+
            "<td class='product-price'>"+
            "<span class='amount price'>"+pPrice+"</span>"+ 
            "</td>"+
            "<td class='product-quantity'>"+
                "<div class='quantity buttons_added'>"+
                    "<input type='number'  onChange='onChangeNumEachProduct(this)' size='4' class='input-text qty text' title='Qty' value='1' min='0' step='1'>"+
                "</div>"+
            "</td>"+
            "<td class='product-subtotal'>"+
                "<span class='amount each-product-total'>"+pPrice+"</span>"+
            "</td>"+
        "</tr>";

        $(".table-cart").append(productRecord);
        totalPriceAllProduct();

};

function totalPriceAllProduct(){
    var discountValue = parseInt($(".discount-value").text());
    var total = 0 + discountValue;
    $(".amount.each-product-total").each(function( index ) {
        total += parseFloat($(this).text());
      });


    $("#totalResult").text(total);
};

function onChangeNumEachProduct(data){
    var $self = $(data);
    var $productRecord = $self.parent().parent().parent();
    var numOfProduct = parseInt($self.val());
    var productUnit =  parseFloat($productRecord.find(".product-price .amount").text());
    var totalPriceEachProduct = productUnit * numOfProduct;

    //change value total in Product record
    $productRecord.find(".each-product-total").text(totalPriceEachProduct);

    //change value total all products
    totalPriceAllProduct();
};

function removeProddctRecord(record){
    var $self = $(record);
    $self.parent().parent().remove();
    totalPriceAllProduct();
}

function applyCoupon(){
    var discountCode = $("#coupon_code").val();
    var discountValue = -150;
    if(discountCode.toLowerCase() == "xmas"){
        $(".discount-value").text(discountValue);
        $(".invalied-coupon-code").addClass("hide");
    }else{
        $(".invalied-coupon-code").removeClass("hide");
    }
    totalPriceAllProduct();
}
