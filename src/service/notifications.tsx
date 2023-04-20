import http from "./http"

export async function checkUnread(){
    try {
        const response = await http.get("/notifications/unread",{headers: {Authorization: "Bearer " + localStorage.getItem("Token")}})
        if (response.data) {
            return response.data.unreadNotificationsCount
        }
        else{
            throw Error("Kon de ongelezen notificaties niet ophalen")
        }
    } catch (error: any) {
         throw Error("Kon de ongelezen notificaties niet ophalen_")
    }
}