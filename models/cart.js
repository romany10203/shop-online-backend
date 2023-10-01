const fs = require('fs');
const path = require('path');
const p = path.join(
    __dirname,
    '../',
    'data',
    'cart.json'
);

module.exports = class Cart{
    static addToCart(id,price){
        //Fetch the cart products
        fs.readFile(p,(err,data) => {
            let cart={products:[],totalPrice:0};
            if (!err){
                cart=JSON.parse(data);
            }
            // adding to the cart or update existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let product;
            if(existingProduct){
                product={...existingProduct};
                product.quantity++;
                cart.products[existingProductIndex]=product;
            }
            else{
                product={id:id,quantity:1};
                cart.products=[...cart.products,product];
            }
            cart.totalPrice+= +price
            fs.writeFile(p,JSON.stringify(cart),err=>{
                if(err){
                    console.log(err);
                }
            });
        })
    }

    static deleteFromCart(id,price){
        fs.readFile(p,(err,data)=>{
            if(err || !data){
                return;
            }
            const cart=JSON.parse(data);
            const updatedCart={...cart};
            const index=updatedCart.products.findIndex(prod=>prod.id === id);
            if(index==-1){
                return;
            }
            updatedCart.totalPrice-=(price*updatedCart.products[index].quantity);
            updatedCart.products.splice(index,1);
            fs.writeFile(p,JSON.stringify(updatedCart),err=>{
                if(err){
                    console.log(err);
                }
            });
        });
    }
    static updatePrice(id,oldPrice,newPrice){
        fs.readFile(p,(err,data)=>{
            if(err || !data){
                return;
            }
            const cart=JSON.parse(data);
            const updatedCart={...cart};
            const prod=updatedCart.products.find(prod => prod.id === id);
            const qty=prod.quantity;
            updatedCart.totalPrice -= (qty*oldPrice);
            updatedCart.totalPrice += (qty*newPrice);
            fs.writeFile(p,JSON.stringify(updatedCart),err=>{
                if(err){
                    console.log(err);
                }
            });
        })
    }
    static getCart(callBack){
        fs.readFile(p,(err,data)=>{
            const cart = JSON.parse(data);
            if(err){
                callBack(null);
            }
            else{
                callBack(cart)
            }
        })
    }
}