import http from "./http"

export async function login(email: String, password: String){
    try {
        const response = await http.post("/auth/login", null, {headers: {Authorization: "application/JSON"}, params:{email, password}})
        if (response.data.token) {
            const {bedrijf, ...user} = response.data.user;
            localStorage.setItem("User",JSON.stringify(user));
            localStorage.setItem("Token", response.data.token)
            localStorage.setItem("Bedrijf", JSON.stringify(bedrijf))
        }
        else{
            throw Error("deze combinatie is ongeldig")
        }
    } catch (error: any) {
        throw Error("deze combinatie is ongeldig")
    }
}