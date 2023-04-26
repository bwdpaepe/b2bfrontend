import { tryStatement } from "@babel/types"
import http from "./http"
import Notifications from "../type/Notifications"

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

export async function checkNew(){
    try {
        const response = await http.get("/notifications/new",{headers: {Authorization: "Bearer " + localStorage.getItem("Token")}})
        if (response.data) {
            return response.data.newNotificationsCountSinceLastCheck
        }
        else{
            throw Error("Kon de nieuwe notificaties niet ophalen")
        }
    } catch (error: any) {
         throw Error("Kon de nieuwe notificaties niet ophalen_")
    }
}

export async function getLimitedNotifications(){
    try {
        const response = await http.get<Notifications[]>("/notifications/",{headers: {Authorization: "Bearer " + localStorage.getItem("Token")}, params:{limit : 5}});
        if(response.status >= 200 && response.status < 300){
            return response.data;
        }
        else{
            throw Error("Kon de notificaties niet ophalen")
        }
    } catch (error : any) {
        throw Error("Kon de notificaties niet ophalen")
    }
}

export async function getNotifications(){
    try {
        const response = await http.get<Notifications[]>("/notifications/",{headers: {Authorization: "Bearer " + localStorage.getItem("Token")}});
        if(response.status >= 200 && response.status < 300){
            return response.data;
        }
        else{
            throw Error("Kon de notificaties niet ophalen, probeer opnieuw in te loggen")
        }
    } catch (error : any) {
        throw Error("Kon de notificaties niet ophalen, probeer opnieuw in te loggen")
    }
}