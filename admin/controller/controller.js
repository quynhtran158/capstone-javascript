import { Product } from "../model/model.js";

export const BASE_URL = "https://64e41e8fc55563802912cf83.mockapi.io/Products"
export let PRODUCTS_LIST = []

export let fetchProductList = () => {
    toggleSpinner()
    axios.get(BASE_URL)
        .then((res) => {
            let list = res.data
            renderProductTable(list)
            console.log(res);
            toggleSpinner()
            PRODUCTS_LIST = list
        })
        .catch((err) => {
            console.log(err);
            toggleSpinner()
        });
}

export const renderProductTable = (list) => {
    let tableHtml = ""
    list.forEach(item => {
        tableHtml += `
            <tr>
                <th scope="row">${item.id}</th>
                <td>${item.name}</td>
                <td>${item.price.toLocaleString()}</td>
                <td>${item.img}</td>
                <td>${item.desc}</td>
                <td>
                    <button class="btn btn-warning mb-1" onclick="edit(${item.id})">Sửa</button>
                    <button class="btn btn-danger mb-1" onclick="deletePhone(${item.id})">Xóa</button>
                </td>
            </tr>
        `
    });
    $("#tbody")[0].innerHTML = tableHtml
}

export const getDataForm = () => {
    let id = document.getElementById("p-id").value
    let name = document.getElementById("p-name").value
    let img = document.getElementById("p-img").value
    let type = document.getElementById("p-type").value
    let screen = document.getElementById("p-screen").value
    let frontCamera = document.getElementById("p-front-camera").value
    let backCamera = document.getElementById("p-back-camera").value
    let desc = document.getElementById("p-desc").value

    return new Product(id, name, img, type, screen, frontCamera, backCamera, desc)
}
export const pushDataForm = (data) => {
    document.getElementById("p-id").value = data.id
    document.getElementById("p-name").value = data.name
    document.getElementById("p-img").value = data.img
    document.getElementById("p-type").value = data.type
    document.getElementById("p-screen").value = data.screen
    document.getElementById("p-front-camera").value = data.frontCamera
    document.getElementById("p-back-camera").value = data.backCamera
    document.getElementById("p-desc").value = data.desc
}
export const clearDataForm = () => {
    document.getElementById("p-id").value = ""
    document.getElementById("p-name").value = ""
    document.getElementById("p-img").value = ""
    document.getElementById("p-type").value = ""
    document.getElementById("p-screen").value = ""
    document.getElementById("p-front-camera").value = ""
    document.getElementById("p-back-camera").value = ""
    document.getElementById("p-desc").value = ""
}

// other feature
export let openModal = (state = true) => {
    $('#exampleModal').modal(state ? 'show' : 'hide')
}
export let openModalAdd = () => {
    disableButton("updateBtn", false)
    disableButton("addBtn", true)
    disableInputId(false)
}
export let disableInputId = (state = true) => {
    document.getElementById("p-id").disabled = state
}
export let disableButton = (id, state) => {
    if (!state) {
        $(`#${id}`)[0].classList.add("d-none")
    } else {
        $(`#${id}`)[0].classList.remove("d-none")
    }
}
export const toggleSpinner = () => {
    $('.spinner')[0].classList.toggle("d-flex")
}