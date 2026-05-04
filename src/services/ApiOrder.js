import apiFetch from "./ApiClient";

export function getOrder() {
    return apiFetch("/order/search/all", {
        method: "GET"
    })
}
export function postOrder(userId, selectedCartItemIds, paymentMethod, receiverName, receiverPhone, shippingAddress) {
    return apiFetch(`/order/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            UserId: userId,
            SelectedCartItemIds: selectedCartItemIds,
            PaymentMethod: paymentMethod,
            ReceiverName: receiverName,
            ReceiverPhone: receiverPhone,
            ShippingAddress: shippingAddress
        })
    })
}
export function getAllOrderByUserId(userId) {
    return apiFetch(`/order/${userId}`, {
        method: "GET",
    })
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

export function getOrderItemByOrderId(orderId) {
    return apiFetch(`/order-items/orderId/${orderId}`, {
        method: "GET"
    })
}

export function deleteOrderByOrderId(selectedOrderId) {
    return apiFetch(`/order/delete?orderId=${selectedOrderId}&status=CANCELLED`, {
        method: "PUT"
    })
}