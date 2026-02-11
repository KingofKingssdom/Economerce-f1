import apiFetch from "./ApiClient";
export function postLogin(phoneNumber, password) {
    return apiFetch("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            phoneNumber,
            password
        })

    });
}

export function postRegister(fullName, phoneNumber, email, password) {
    return apiFetch("/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fullName,
            phoneNumber,
            email,
            password
        })
    });
}