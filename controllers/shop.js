const Product=require('../models/product')

exports.getProducts=(req,res,next)=>{
    Product.fetchAll(products=>{
        res.render('shop/product-list',{
            products:products,
            docTitle:'All Products',
            path:'/products'});
    });
}

exports.getCart=(req,res,next) => {
    res.render('shop/cart',{
        docTitle:'My Cart',
        path:'/cart'
    })
}

exports.getOrders=(req,res,next) => {
    res.render('shop/orders',{
        docTitle:'Orders',
        path:'/orders'
    })
}

exports.getCheckout=(req,res,next) => {
    res.render('shop/checkout',{
        path:'checkout',
        docTitle:'Checkout'
    })
}

exports.getIndex = (req,res,next) => {
    Product.fetchAll(products=>{
        res.render('shop/index',{
            products:products,
            docTitle:'Shop',
            path:'/'});
    });
}
