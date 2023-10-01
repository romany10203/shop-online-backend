const Product=require('../models/product')
const Cart = require('../models/cart')

exports.getProducts=(req,res,next)=>{
    Product.fetchAll(products=>{
        res.render('shop/product-list',{
            products:products,
            docTitle:'All Products',
            path:'/products'});
    });
}

exports.getProduct=(req,res,next)=>{
    const id=req.params.id;
    Product.findById(id, product => {
        console.log(id);
        res.render('shop/product-detail',{
            product:product,
            docTitle:product.title,
            path:'/products'
        });
    });
}

exports.getCart=(req,res,next) => {
    Cart.getCart(cart=>{
        Product.fetchAll(products=>{
            const cartProducts = [];
            for (let prod of products){
                const cartProduct = cart.products.find(prodCart => prodCart.id == prod.id);
                if(cartProduct){
                    cartProducts.push({product:prod,quantity:cartProduct.quantity});
                }
            }
            res.render('shop/cart',{
                docTitle:'My Cart',
                path:'/cart',
                products:cartProducts,
                totalPrice:cart.totalPrice
            });
        });
    });
}

exports.postCart=(req,res,next) => {
    const id=req.body.id;
    Product.findById(id,prod => {
        Cart.addToCart(id,prod.price);
        res.redirect('/cart');
    })

}

exports.postCartDeleteProduct=(req,res,next) => {
    const id=req.body.id;
    Product.findById(id, product => {
        Cart.deleteFromCart(id,product.price);
        res.redirect('/cart');
    });
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