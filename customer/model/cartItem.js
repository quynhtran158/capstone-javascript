import { Product } from "./Product.js";

export class CartItem extends Product {
    constructor(_id,
        _name,
        _price,
        _screen,
        _backCamera,
        _frontCamera,
        _img,
        _desc,
        _type,
        _quantity = 1) {

        super(_id,
            _name,
            _price,
            _screen,
            _backCamera,
            _frontCamera,
            _img,
            _desc,
            _type,
            _quantity)
        this.quantity = _quantity;
    }
    tinhTienSanPham = () => {
        return this.quantity * this.price
    }
}