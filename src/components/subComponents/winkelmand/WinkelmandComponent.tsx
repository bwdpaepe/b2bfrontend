import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import Winkelmand from "../../../type/Winkelmand";
import { getWinkelmand } from "../../../service/winkelmand";
import WinkelmandCardHolder from "./WinkelmandCardHolder";
import BedrijfProducten from "../../../type/BedrijfProducten";
import WinkelmandProductenSorteerder from "../../../util/WinkelmandProductenSorteerder";

export default function WinkelmandComponent() {
  const [winkelmand, setWinkelmand] = useState<Winkelmand>();
  const [sortedWinkelmand, setSortedWinkelmand] = useState<BedrijfProducten[]>();

  const user = useContext(UserContext);

  const _getWinkelmand = useCallback(async () => {
    if (user) {
      const _winkelmand = await getWinkelmand();
      setWinkelmand(_winkelmand);
    } else {
      const _winkelmand = localStorage.getItem("winkelmand");
      console.log(_winkelmand);
      if (_winkelmand) {
        const parsed_winkelmand = JSON.parse(_winkelmand);
        setWinkelmand(parsed_winkelmand);
      }
    }



  }, [user]);

  function sorteerWinkelmand(){
    const _sortedWinkelmand = WinkelmandProductenSorteerder(winkelmand!);
    setSortedWinkelmand(_sortedWinkelmand)
  }


  useEffect(() => {
    _getWinkelmand();

  }, [_getWinkelmand]);

  useEffect(() => {
    if(winkelmand){
        sorteerWinkelmand();
        console.log("blub");
    }
  }, [winkelmand]);

  return (
    <>
    
      {sortedWinkelmand && winkelmand ? (
        <WinkelmandCardHolder winkelmand={sortedWinkelmand} totalPrices = {winkelmand.totalPrice} />
      ) : ( 
        <WinkelmandCardHolder winkelmand = {null} totalPrices = {null} /> 
      )}

    </>
  );
}
 