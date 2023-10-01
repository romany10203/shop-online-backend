const Product=require('../models/product');


exports.getAddProduct = (req,res,next) => {
    res.render('admin/edit-product',{
        docTitle:'Add Product',
        path:'/admin/add-product',
        editing:false,
    })
};

exports.postAddProduct = (req,res,next) => {
    prod=req.body;
    const product = new Product(null,prod.title,prod.price,prod.desc,prod.img);
    product.save();

    res.redirect('/');
};

exports.getEditProduct = (req,res,next) => {
    const editMode=req.query.edit;
    if(!editMode==true){
        return res.redirect('/');
    }
    Product.findById(req.params.id,prod => {
        if (!prod){
            return res.redirect('/')
        }
        res.render('admin/edit-product',{
            docTitle:'Add Product',
            path:'/admin/edit-product',
            editing:editMode,
            product:prod
        });
    });
};

exports.postEditProduct = (req,res,next) => {
    const updatedData=req.body;
    const id = updatedData.id;
    const price = updatedData.price;
    const title = updatedData.title;
    const imgLink=updatedData.img;
    const desc=updatedData.desc;
    const updatedProduct = new Product(id,title,price,desc,imgLink);
    updatedProduct.save();
    res.redirect('/admin/products');
    
};

exports.postDeleteProduct = (req,res,next) => {
    const id = req.body.id;
    Product.deleteProduct(id);
    res.redirect('/admin/products');
    
};

exports.getProducts = (req,res,next) => {
    Product.fetchAll(products=>{
        res.render('admin/products',{
            products:products,
            docTitle:'products',
            path:'/admin/products'
        });
    });
};