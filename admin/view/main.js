import { BASE_URL, fetchProductList, getDataForm, pushDataForm, clearDataForm, openModal, openModalAdd, disableInputId, disableButton, toggleSpinner, } from "../controller/controller.js";

fetchProductList()

// API
window.add = () => {
    toggleSpinner()
    let newPhone = getDataForm()
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
    let url = `${BASE_URL}/${data.id}`
    axios.put(url, data)
        .then((res) => {
            console.log(res);
            fetchProductList()
            openModal(false)
            disableButton("updateBtn", false)
            disableButton("addBtn", true)
            toggleSpinner()
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