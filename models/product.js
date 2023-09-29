const fs = require('fs');
const path = require('path');
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
    constructor(title,price,desc,img){
        this.title=title;
        this.price=price;
        this.desc=desc;
        this.imgLink=img;
    }
    save(){
        getFromFile(products=>{
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),err=>{
                console.log(err);
            });
        });
    }

    static fetchAll(callBack){
        getFromFile(callBack);
    }
};