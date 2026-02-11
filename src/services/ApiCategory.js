import apiFetch from "./ApiClient";
export function postCategory(categoryName) {
    return apiFetch("/category/create", {
        method: "POST",
        body: categoryName
    })
}
export function getCategory() {
    return apiFetch("/category/search/all", {
        method: "GET"
    })
}

