import apiFetch from "./ApiClient";
export function postAddToCart(cartId, productVariantId, quantity) {
    return apiFetch(`/cart-items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cartId: cartId,
            productVariantId: productVariantId,
            quantity: quantity
        })
    })
}
export function getCartItemByUserId(userId) {
    return apiFetch(`/cart-items/user/${userId}`, {
        method: "GET"
    })
}
export function getCartById(id) {
    return apiFetch(`/cart/${id}`, {
        method: "GET"
    })
}
export function getCartItemByCartId(id) {
    return apiFetch(`/cartItem/cart?cartId=${id}`,
        {
            method: "GET"
        }
    )
}