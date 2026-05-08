import apiFetch from "./ApiClient";
export function postCategory(categoryCode, categoryName) {
    return apiFetch("/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            categoryCode: categoryCode,
            categoryName: categoryName
        })
    })
}
export function getCategory() {
    return apiFetch("/categories", {
        method: "GET"
    })
}

