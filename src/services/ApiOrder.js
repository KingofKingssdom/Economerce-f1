import apiFetch from "./ApiClient";

export function getOrder() {
    return apiFetch("/order/search/all", {
        method: "GET"
    })
}
export function postOrder(checkedItems) {
    return apiFetch("/order/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cartItemIds: checkedItems
        })
    })
}
export function getOrderById(id) {
    return apiFetch(`/order/search?orderId=${id}`)
}

export function postOrderPay(value) {
    return apiFetch("/order/add", {
        method: "POST",
        body: value
    })

}

export function getOrderByUser() {
    return apiFetch("/order/all", {
        method: "GET",

    })
}

export function getOrderItemByOrderId(id) {
    return apiFetch(`/orderItem/all?orderId=${id}`, {
        method: "GET"
    })
}

export function deleteOrderByOrderId(selectedOrderId) {
    return apiFetch(`/order/delete?orderId=${selectedOrderId}&status=CANCELLED`, {
        method: "PUT"
    })
}