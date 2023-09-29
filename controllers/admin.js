const Product=require('../models/product')
exports.getAddProduct = (req,res,next) => {
    res.render('admin/add-product',{
        docTitle:'Add Product',
        path:'/admin/add-product'
    })
};

exports.postAddProduct = (req,res,next) => {
    prod=req.body;
    const product = new Product(prod.title,prod.price,prod.desc,prod.img);
    product.save();

    res.redirect('/');
};

exports.getProducts = (req,res,next) => {
    Product.fetchAll(products=>{
        res.render('admin/products',{
            products:products,
            docTitle:'products',
            path:'/admin/products'
        })
    })
}