/**
 * name: Chỉ kí tự chữ, không để trống
 * img: not ""
 * type: not ""
 * screen: not ""
 * frontCamera: not ""
 * backCamera: not ""
 * desc: not ""
 */

export const isValidName = (errElem, data) => {
    let reg = /^[A-Za-z0-9\s]+$/

    if (!reg.test(data)) {
        showMessage(errElem, "Chỉ kí tự chữ, không chứa kí tự đặc biệt, không để trống")
        return false
    } else {
        showMessage(errElem, "",)
        return true
    }
}

export const isValidImg = (errElem, data) => {
    let reg = /^http/

    if (!reg.test(data)) {
        showMessage(errElem, "Bắt đầu bằng 'http'")
        return false
    } else {
        showMessage(errElem, "",)
        return true
    }
}

export const isNotBlank = (errElem, data) => {
    let reg = /[\S\s]+[\S]+/
    if (!reg.test(data)) {
        showMessage(errElem, "Không được để trống")
        return false
    } else {
        showMessage(errElem, "")
        return true
    }
}

const showMessage = (errElem, message) => {
    $(`#${errElem}`)[0].innerText = message
}