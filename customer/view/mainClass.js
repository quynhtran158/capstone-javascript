import { Cart } from "./model/Cart.js";

import { fetchPhoneList } from "./controller/controller.js";

fetchPhoneList()

// Filter
window.filterBrand = () => {
	const selectedBrand = $("#selectList")[0].value
	fetchPhoneList(selectedBrand)
}

let cartLocal = localStorage.getItem("cart")
let cart = new Cart(JSON.parse(cartLocal))

$('#exampleModalCenter').on('show.bs.modal', () => cart.render())
window.addItemCart = (id) => cart.addItem(id)
window.incQuantity = (id) => cart.incItem(id)
window.decQuantity = (id) => cart.decItem(id)
window.emptyCart = () => cart.empty()
window.payCart = () => cart.pay()
window.removeItemCart = (id) => cart.removeItem(id)
window.closeCartModal = () => cart.closeModal()