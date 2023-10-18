const db = require('../util/database')

const Cart = require('./cart');

module.exports = class Product{
    constructor(id,title,price,desc,img){
        this.id=id;
        this.title=title;
        this.price=price;
        this.desc=desc;
        this.imgLink=img;
    }

    save(){
        return db.execute(
            // `INSERT INTO products (title, price, desc, imgLink) VALUES (${this.title},${this.price}, ${this.desc},${this.imgLink})`
            'insert into products (products.title, products.price, products.desc, products.imgLink) values (?,?,?,?)',
            [this.title,this.price,this.desc,this.imgLink]
        );
    }

    static fetchAll(){
        return db.execute('SELECT * FROM products');
    }

    static deleteProduct(id){

    }

    static findById(id){
        return db.execute('SELECT * FROM products WHERE id = ?',[id]);
    }


};