import apiFetch from "./ApiClient";

export function getProductAll() {
    return apiFetch("/product/search/all", {
        method: "GET"
    });
}

export function getProductFeatured() {
    return apiFetch(`/product/search/featured?featured=true`, {
        method: "GET"

    })
}
export function getProductPromotional(id) {
    return apiFetch(`/product/search/promotional?promotional=true&categoryId=${id}`, {
        method: "GET"

    })
}
export function getProductPhone() {
    return apiFetch("/product/search/category?categoryId=1", {
        method: "GET"
    })
}
export function getProductByName(productName) {
    return apiFetch(`/product/search/productName?productName=${productName}`, {
        method: "GET"
    })
}

export function postProduct(value) {
    return apiFetch("/product/create", {
        method: "POST",
        body: value
    })
}

export function postProductColor(value) {
    return apiFetch("/productColor/create", {
        method: "POST",
        body: value
    })

}
export function postProductVariant(value) {
    return apiFetch("/productVariant/create", {
        method: "POST",
        body: value
    })
}

export function postProductSpecification(value) {
    return apiFetch("/productSpecification/create", {
        method: "POST",
        body: value
    })
}

export function getProductSpecificationByProductId(value) {
    return apiFetch(`/productSpecification/search?productId=${value}`, {
        method: "GET"
    })
}
export function postProductSpecificationDetail(value) {
    return apiFetch("/specificationDetail/create", {
        method: "POST",
        body: value
    })
}
export function getProductById(value) {
    return apiFetch(`/product/search?productId=${value}`, {
        method: "GET"
    })
}
export function getProductByCategoryId(id) {
    return apiFetch(`/product/search/category?categoryId=${id}&pageNumber=0`, {
        method: "GET"
    })
}
export function getProductByCategoryIdAndBrandId(categoryId, brandId) {
    return apiFetch(`/product/get/category/brand?categoryId=${categoryId}&brandId=${brandId}`, {
        method: "GET"
    })
}