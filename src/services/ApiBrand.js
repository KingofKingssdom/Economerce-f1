import apiFetch from "./ApiClient";

export function postBrand(formdata) {
    return apiFetch("/brand", {
        method: "POST",
        body: formdata
    })
}
export function getBrand() {
    return apiFetch("/brand", {
        method: "GET"
    })
}
export function getBrandByCategoryId(id) {
    return apiFetch(`/brand/categoryId/${id}`, {
        method: "GET"
    })
}
export function putBrand(id, formdata) {
    return apiFetch(`/brand/${id}`, {
        method: "POST",
        body: formdata
    })
}