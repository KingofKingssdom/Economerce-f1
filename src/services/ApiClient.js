
async function apiFetch(endpoint, options = {}) {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        credentials: 'include',
        headers: {
            ...options.headers
        },
        ...options
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "API Error");
    }
    return response.json();
}
export default apiFetch;