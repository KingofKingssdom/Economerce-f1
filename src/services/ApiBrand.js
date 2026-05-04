import apiFetch from "./ApiClient";

export function postBrand(data) {
    return apiFetch("/brand/create", {
        method: "POST",
        body: data
    })
}
export function getBrand() {
    return apiFetch("/brand/search/all", {
        method: "GET"
    })
}
export function getBrandByCategoryId(id) {
    return apiFetch(`/brand/categoryId/${id}`, {
        method: "GET"
    })
}