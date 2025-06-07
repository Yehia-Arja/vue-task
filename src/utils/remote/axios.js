import axios from "axios"

const api = axios.create({
    baseURL: "https://staging.ai-api.haqq.me",
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000,
})

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            const status = error.response.status;

            if (status === 401) {
                localStorage.clear();
                window.location.href="/"
            } else if (status === 403) {
                console.warn('Access Forbidden')
            } else if (status === 404) {
                console.warn("API route was not found")
            } else if (status >= 500) {
                console.error("server error")
            }
        } else if (error.request) {
            console.error("no response from server")
        } else {
            console.error("Error setting up the request",error.message)
        }
        return Promise.reject(error)
    }
)

export const request = async({
    method,
    route,
    body
}) => {
    try {
        const response = await api.request({
            method,
            url: route,
            data: method != "GET" ? body: undefined ,
        });
        return response.data
    } catch (error) {
        return {
            error: true,
            message: error.response?.data?.message || "Error"
        };
    }
}