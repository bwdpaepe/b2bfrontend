import { useCallback, useContext, useEffect, useState } from "react"
import { UserContext } from "../../../App"
import Winkelmand from "../../../type/Winkelmand";
import { getWinkelmand } from "../../../service/winkelmand";




export default function WinkelmandComponent(){
    const [winkelmand, setWinkelmand] = useState<Winkelmand>();

    const user = useContext(UserContext)


    const _getWinkelmand = useCallback(async() =>{
        if(user){
            const _winkelmand = await getWinkelmand();
            setWinkelmand(_winkelmand);
        }
        else{
            const _winkelmand = localStorage.getItem("winkelmand")
            if(_winkelmand){
                const parsed_winkelmand = JSON.parse(_winkelmand)
                setWinkelmand(parsed_winkelmand)
            }
        }
    },[])



    useEffect(() =>{
        _getWinkelmand();
    }, [])


    return(
        <>
        </>
    )
}