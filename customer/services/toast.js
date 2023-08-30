export let showNoti = (message) => {
    Toastify({
        text: message,
        className: "info",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        gravity: "bottom"
    }).showToast();
}