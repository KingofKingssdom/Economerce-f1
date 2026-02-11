import apiFetch from "./ApiClient";

export function postPayVNPay(amount, orderInfo, maDon) {
    return apiFetch(`/VNPay/submitOrder?amount=${amount}&orderInfo=${orderInfo}&orderId=${maDon}`, {
        method: "POST"
    })
}
export function putPayVNPay(id) {
    return apiFetch(`/order/update/payment?orderId=${id}&paymentMethod=VNPAY&paymentStatus=PAID`, {
        method: "PUT"
    })
}

export function postPayInforVNPay(value) {
    return apiFetch("/VNPay/submitOrder", {
        method: "POST",
        body: value
    })
}