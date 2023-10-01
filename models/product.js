const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p=path.join(
    __dirname,
    '../',
    'data',
    'products.json'
);

const getFromFile = (callBack)=>{
    fs.readFile(p,(err,data)=>{
        if(err){
            return callBack([]);
        }
        callBack(JSON.parse(data));
    })
}

module.exports = class Product{
    constructor(id,title,price,desc,img){
        this.id=id;
        this.title=title;
        this.price=price;
        this.desc=desc;
        this.imgLink=img;
    }

    save(){
        getFromFile(products=>{
            if(this.id){
                const existingProductIndex = products.findIndex(prod => prod.id == this.id);
                const updatedProducts = [...products];
                const oldPrice=products[existingProductIndex].price;
                const newPrice=this.price;
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p,JSON.stringify(updatedProducts),err=>{
                    if(err){
                        console.log(err);
                    }
                });
                if(oldPrice!=newPrice){
                    Cart.updatePrice(this.id,oldPrice,newPrice);
                }
            }
            else{
                this.id=Math.random();
                this.id=`${this.id}`;
                products.push(this);
                fs.writeFile(p,JSON.stringify(products),err=>{
                    if(err){
                        console.log(err);
                    }
                });
            }
        });
    }

    static fetchAll(callBack){
        getFromFile(callBack);
    }

    static deleteProduct(id){
        getFromFile(products=>{
            const productIndex=products.findIndex(prod => prod.id == id);
            const productPrice=products[productIndex].price;
            products.splice(productIndex,1);
            const productsAfterDeleting=[...products]
            fs.writeFile(p,JSON.stringify(productsAfterDeleting),err => {
                if(!err){
                    Cart.deleteFromCart(id,productPrice);
                }
            });
        });
    }

    static findById(id,callBack){
        getFromFile(products => {
            const product = products.find(prod => prod.id == id);
            callBack(product);
        });
    }
};