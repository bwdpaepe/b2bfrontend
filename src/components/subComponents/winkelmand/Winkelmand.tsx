import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../App"
import Winkelmand from "../../../type/Winkelmand";
import { getWinkelmand } from "../../../service/winkelmand";




export function Winkelmand(){
    const [winkelmand, setWinkelmand] = useState<Winkelmand>();

    const user = useContext(UserContext)


    async function _getWinkelmand(){
        if(user){
            const _winkelmand = await getWinkelmand();
        }
        else{
            const _winkelmand = localStorage.getItem("winkelmand")
            if(_winkelmand){
                const parsed_winkelmand = JSON.parse(_winkelmand)
                setWinkelmand(parsed_winkelmand)
            }
        }
    }



    useEffect(() =>{
        _getWinkelmand();
    }, [])
    return(
        <>
        </>
    )
}