import http from "./http"

export async function getPing(){
    try {
        const response = await http.get("/health/ping")
        if (response) {
            return response.data;
        }
        else{
            return "no pong received"
        }
    } catch (error: any) {
        console.error(error)
    }
}

export async function getVersion(){
    try {
        const response = await http.get("/health/version")
        if (response) {
            return response.data;
        }
        else{
            return "no version received"
        }
    } catch (error: any) {
        console.error(error)
    }
}