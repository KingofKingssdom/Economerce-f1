import apiFetch from "./ApiClient";

export function postPayVNPay(orderId) {
    return apiFetch(`/payment/checkout/vnpay/${orderId}`, {
        method: "GET"
    })
}
export function getPayVNPayResult() {
    return apiFetch(`/payment/result-vnpay`, {
        method: "GET"
    })
}

export function postPayInforVNPay(value) {
    return apiFetch("/VNPay/submitOrder", {
        method: "POST",
        body: value
    })
}