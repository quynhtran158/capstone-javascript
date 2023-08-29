// [done] validation
// [done] Search product - name
// [done] Sort - price (2 ways)

import {
    BASE_URL,
    PRODUCTS_LIST,
    fetchProductList,
    renderProductTable,
    getDataForm,
    pushDataForm,
    clearDataForm,
    openModal,
    openModalAdd,
    disableInputId,
    disableButton,
    toggleSpinner,
} from "../controller/controller.js";

import { isValidName, isNotBlank } from "../validation/validate.js";

fetchProductList()

// API
window.add = () => {
    toggleSpinner()
    let newPhone = getDataForm()

    let isValid = (isValidName("name-err", newPhone.name)
        & isNotBlank("img-err", newPhone.img)
        & isNotBlank("type-err", newPhone.type)
        & isNotBlank("screen-err", newPhone.screen)
        & isNotBlank("front-camera-err", newPhone.frontCamera)
        & isNotBlank("back-camera-err", newPhone.backCamera)
        & isNotBlank("desc-err", newPhone.desc)
    )

    if (!isValid) {
        toggleSpinner()
        return
    }

    axios.post(BASE_URL, newPhone)
        .then((res) => {
            console.log(res);
            fetchProductList()
            openModal(false)
            toggleSpinner()
        })
        .catch((err) => {
            console.log(err);
            toggleSpinner()
        });
}

window.deletePhone = (id) => {
    toggleSpinner()
    let url = `${BASE_URL}/${id}`
    axios.delete(url)
        .then((res) => {
            console.log(res);
            fetchProductList()
            toggleSpinner()
        })
        .catch((err) => {
            console.log(err);
            toggleSpinner()
        });
}

window.edit = (id) => {
    toggleSpinner()
    disableInputId(true)
    let url = `${BASE_URL}/${id}`
    axios.get(url)
        .then((res) => {
            console.log(res);
            pushDataForm(res.data)
            openModal()
            disableButton("updateBtn", true)
            disableButton("addBtn", false)
            toggleSpinner()
        })
        .catch((err) => {
            console.log(err);
            toggleSpinner()
        });
}

window.update = () => {
    toggleSpinner()
    let data = getDataForm()

    let isValid = (isValidName("name-err", data.name)
        & isNotBlank("img-err", data.img)
        & isNotBlank("type-err", data.type)
        & isNotBlank("screen-err", data.screen)
        & isNotBlank("front-camera-err", data.frontCamera)
        & isNotBlank("back-camera-err", data.backCamera)
        & isNotBlank("desc-err", data.desc)
    )

    if (!isValid) {
        toggleSpinner()
        return
    }

    let url = `${BASE_URL}/${data.id}`
    axios.put(url, data)
        .then((res) => {
            console.log(res);
            fetchProductList()
            openModal(false)
            disableButton("updateBtn", false)
            disableButton("addBtn", true)
            toggleSpinner()
            disableInputId(false)
        })
        .catch((err) => {
            console.log(err);
            toggleSpinner()
        });
}

// other feature
window.openModalAdd = () => {
    openModalAdd()
    clearDataForm()
}
window.disableInputId = () => {
    disableInputId()
}

// search
let currentProductList = []
window.search = () => {
    currentProductList = [...PRODUCTS_LIST]
    let name = $("#search")[0].value.toLowerCase()
    currentProductList = PRODUCTS_LIST.filter((item) => {
        return item.name.toLowerCase().includes(name)
    })
    renderProductTable(currentProductList)
}

// sort
window.sort = (mode) => {
    if (currentProductList.length < 1) {
        currentProductList = [...PRODUCTS_LIST]
    }
    let mapIdPrice = currentProductList.map((product) => {
        return [product.id, product.price]
    })
    let sorting
    if (mode == 1) { // thấp -> cao
        $("#dropdownMenuButton")[0].innerText = "Thấp > Cao"
        sorting = mapIdPrice.sort((a, b) => a[1] - b[1])
    } else {
        $("#dropdownMenuButton")[0].innerText = "Cao > Thấp"
        sorting = mapIdPrice.sort((a, b) => b[1] - a[1])
    }

    let list = []
    for (let i = 0; i < sorting.length; i++) {
        const sort = sorting[i];
        for (let j = 0; j < currentProductList.length; j++) {
            const product = currentProductList[j];
            if (product.id === sort[0]) {
                list.push(product)
                break
            }
        }
    }
    renderProductTable(list)
}