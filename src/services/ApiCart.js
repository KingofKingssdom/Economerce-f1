import apiFetch from "./ApiClient";
export function postAddToCart(id, indexCurrent, selectBoxColor) {
    return apiFetch(`/cartItem/create?productId=${id}&productVariantId=${indexCurrent}&productColorId=${selectBoxColor}`, {
        method: "POST"
    })
}
export function getCartItem() {
    return apiFetch("/cartItem/all", {
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