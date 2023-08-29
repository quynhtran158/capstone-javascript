export class Product {
    constructor (
        _id,
        _name,
        _price,
        _screen,
        _backCamera,
        _frontCamera,
        _img,
        _desc,
        _type
    ) {
        this.id =_id;  // id of the product
        this.name=_name;// name of the product
        this.price=_price// price of the product 
        this.screen= _screen ;   /// screen size of the product
        this.backCamera= _backCamera ;// back camera of the product
        this.frontCamera= _frontCamera ;    // front camera of the product
        this.img= _img ;     //// image of the product
        this.desc= _desc ;      // description about the product
        this.type= _type ;       // type of the product
    }
}