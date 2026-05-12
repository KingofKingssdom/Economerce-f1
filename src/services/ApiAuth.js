import apiFetch from "./ApiClient";
export function postLogin(Email, Password) {
    return apiFetch("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Email,
            Password
        })

    });
}

export function postRegister(FullName, PhoneNumber, Email, Password) {
    return apiFetch("/user/register/Customer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            FullName,
            PhoneNumber,
            Email,
            Password
        })
    });
}
export function getUserCurrent() {
    return apiFetch(`/user/me`, {
        method: "GET"
    })
}
export function getCountUser() {
    return apiFetch(`/user/count`, {
        method: "GET"
    })
}