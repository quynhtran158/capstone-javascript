import { CartItem } from "./CartItem.js";
import { toggleSpinner } from "../../admin/controller/controller.js";
import { showNoti } from "../services/toast.js";
import { BASE_URL } from "../controller/controller.js";

export class Cart {
    constructor(cartJSON) {
        this.CART = (cartJSON == null || cartJSON.length < 1)
            ? []
            : cartJSON.map(product => {
                return new CartItem(...Object.values(product))
            })
    }
    addItem(id) {
        toggleSpinner()
        let url = `${BASE_URL}/${id}`
        axios.get(url)
            .then((res) => {
                showNoti("Đã thêm vào giỏ hàng")

                let { id, name, price, screen, backCamera, frontCamera, img, desc, type } = res.data
                let product = new CartItem(id, name, price, screen, backCamera, frontCamera, img, desc, type)

                // trước khi push phải ktra xem cart đã tồn tại sp đó chưa
                let index = this.findIndex(id)

                if (index > -1) { // added
                    this.CART[index].quantity++
                } else {
                    this.CART.push(product)
                }
                this.update()
                console.log(this.CART);
                toggleSpinner()
            })
            .catch((err) => {
                showNoti("Thêm sản phẩm thất bại")
                console.log(err);
                toggleSpinner()
            });
    }
    incItem(id) {
        let index = this.findIndex(id)
        if (index > -1) {
            $(`#item-${id}-quantity`)[0].innerText = this.CART[index].quantity + 1
            this.CART[index].quantity++
            this.update()
            this.render(this.CART)
        } else {
            console.log("Lỗi không tìm thấy ID");
        }
    }
    decItem(id) {
        let index = this.findIndex(id)
        if (index > -1) {
            if (this.CART[index].quantity > 1) {
                $(`#item-${id}-quantity`)[0].innerText = this.CART[index].quantity - 1
                this.CART[index].quantity--
            } else {
                // remove item
                this.CART.splice(index, 1)
            }
            this.update()
            this.render(this.CART)
        } else {
            console.log("Lỗi không tìm thấy ID");
        }
    }
    update() {
        localStorage.setItem("cart", JSON.stringify(this.CART))
        let countItem = this.countItem()
        $(".count")[0].style.display = countItem > 0 ? "block" : "none"
        $("#cart-count")[0].innerText = countItem > 0 ? countItem : ""
    }
    empty = () => {
        this.CART = []
        this.update()
        this.render(this.CART)
        this.closeModal()
    }
    findIndex(id) {
        return this.CART.findIndex((product) => product.id == id)
    }
    render = () => {
        let contentHtml = ""
        this.CART.forEach(item => {
            contentHtml += /*html*/`
                <div class="container my-3 product">
                    <div class="row mb-3">
                        <div class="col-4">
                            <img src=${item.img}
                                alt="" />
                        </div>
                        <div class="col-8">
                            <b>${item.name}</b>
                            <p>Screen: ${item.screen}</p>
                            <p>Back Camera: ${item.backCamera}</p>
                            <p>Front Camera: ${item.frontCamera}</p>
                            <a href="#" class="text-danger" onclick="removeItemCart('${item.id}')">Remove</a>
                        </div>
                    </div>
                    <div class="quantity row mb-3">
                        <div class="col-8">
                            <span>Quantity:</span>
                            <i class="fa fa-minus-circle mx-2" onclick="decQuantity('${item.id}')"></i>
                            <span id="item-${item.id}-quantity">${item.quantity}</span>
                            <i class="fa fa-plus-circle mx-2" onclick="incQuantity('${item.id}')"></i>
                        </div>
                        <div class="col-4 text-right">
                            <span class="text-success">$${item.tinhTienSanPham().toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            `
        })
        $("#cart-items")[0].innerHTML = contentHtml

        // Render payment

        let shippingFee = 10
        let taxRate = 0.1
        let subTotal = 0
        this.CART.forEach(item => {
            subTotal = subTotal + item.tinhTienSanPham()
        });
        shippingFee = subTotal == 0 ? 0 : shippingFee
        let tax = taxRate * subTotal
        $("#cart-subtotal")[0].innerText = `$${subTotal.toLocaleString()}`
        $("#cart-shipping")[0].innerText = `$${shippingFee}`
        $("#cart-tax")[0].innerText = `$${tax.toLocaleString()}`
        $("#cart-total")[0].innerText = `$${(subTotal + tax + shippingFee).toLocaleString()}`
    }
    removeItem = (id) => {
        let index = this.findIndex(id)
        if (index > -1) {
            this.CART.splice(index, 1)
            this.update()
            this.render(this.CART)
        } else {
            console.log("Lỗi không tìm thấy ID");
        }
        if (this.CART.length < 1) {
            this.closeModal()
        }
    }
    pay = () => {
        this.empty()
        // show hiệu ứng thông báo thanh toán thành công
        showNoti("Đã thanh toán thành công!")
    }
    closeModal = () => {
        $('#exampleModalCenter').modal('hide')
    }
    countItem = () => {
        let sum = 0
        this.CART.forEach(product => sum = sum + product.quantity)
        return sum
    }
}