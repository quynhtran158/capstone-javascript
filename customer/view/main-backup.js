// import JS files
import { CartItem } from "./model/CartItem.js";

import {
	BASE_URL,
	fetchPhoneList,
	renderCart,
}
	from "./controller/controller.js";

import { toggleSpinner } from "../../admin/controller/controller.js";
import { showNoti } from "./services/toast.js";

fetchPhoneList();

// Requirement 4. filter theo hãng
window.filterBrand = () => {
	const selectedBrand = $("#selectList")[0].value
	fetchPhoneList(selectedBrand);
}

let cartJSON = localStorage.getItem("cart")
let CART = (cartJSON == null)
	? []
	: JSON.parse(cartJSON).map(product => {
		return new CartItem(...Object.values(product))
	})
console.log(CART)

// Requirement 5+6+7: add product (class) to cart
window.addItemCart = (id) => {
	toggleSpinner()
	let url = `${BASE_URL}/${id}`
	axios.get(url)
		.then((res) => {
			showNoti("Đã thêm vào giỏ hàng")

			let { id, name, price, screen, backCamera, frontCamera, img, desc, type } = res.data
			let product = new CartItem(id, name, price, screen, backCamera, frontCamera, img, desc, type)

			// trước khi push phải ktra xem cart đã tồn tại sp đó chưa
			let index = findIndex(id)

			if (index > -1) { // added
				CART[index].quantity++
			} else {
				CART.push(product)
			}
			updateCart()
			console.log(CART);
			toggleSpinner()
		})
		.catch((err) => {
			showNoti("Thêm sản phẩm thất bại")
			console.log(err);
			toggleSpinner()
		});
}

function findIndex(id) {
	return CART.findIndex((product) => product.id == id)
}

// Requirement 8: render cart
// Requirement 10: tính tổng tiền
$('#exampleModalCenter').on('show.bs.modal', function (e) {
	renderCart(CART)
})

// Requirement 9: increase / decrease item's quantiy
window.incQuantity = (id) => {
	let index = findIndex(id)
	if (index > -1) {
		$(`#item-${id}-quantity`)[0].innerText = CART[index].quantity + 1
		CART[index].quantity++
		updateCart()
		renderCart(CART)
	} else {
		console.log("Lỗi không tìm thấy ID");
	}
}

window.decQuantity = (id) => {
	let index = findIndex(id)
	if (index > -1) {
		if (CART[index].quantity > 1) {
			$(`#item-${id}-quantity`)[0].innerText = CART[index].quantity - 1
			CART[index].quantity--
		} else {
			// remove item
			CART.splice(index, 1)
		}
		updateCart()
		renderCart(CART)
	} else {
		console.log("Lỗi không tìm thấy ID");
	}
}

// Requirement 11: localstorage
function updateCart() {
	localStorage.setItem("cart", JSON.stringify(CART))
}

// Requirement 12: thanh toán, clear cart
window.emptyCart = () => {
	CART = []
	updateCart()
	renderCart(CART)
	closeCartModal()
}

// Requirement 13: remove item ra khỏi cart
window.removeItemCart = (id) => {
	let index = findIndex(id)
	if (index > -1) {
		CART.splice(index, 1)
		updateCart()
		renderCart(CART)
	} else {
		console.log("Lỗi không tìm thấy ID");
	}
	if (CART.length < 1) {
		closeCartModal()
	}
}

window.payCart = () => {
	emptyCart()
	// show hiệu ứng thông báo thanh toán thành công
	showNoti("Đã thanh toán thành công!")
}

window.closeCartModal = () => {
	$('#exampleModalCenter').modal('hide')
}