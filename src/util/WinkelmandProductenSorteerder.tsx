import BedrijfProducten from "../type/BedrijfProducten";
import Winkelmand from "../type/Winkelmand";
import winkelmandProduct from "../type/WinkelmandProduct";




export default function WinkelmandProductenSorteerder(winkelmand : Winkelmand){


    const winkelmandProducten : winkelmandProduct[] = winkelmand.winkelmandProducten;
    

    const bedrijfProducten : any = winkelmandProducten.reduce((accumulator, winkelmandProduct) => {
        const bedrijfId = winkelmandProduct.product.bedrijf.bedrijfId;
        const checkBedrijf = accumulator.find((entry) => entry.bedrijfId === bedrijfId);

        if(checkBedrijf){
            checkBedrijf.producten.push(winkelmandProduct)
        }
        else{
            accumulator.push({bedrijfId, bedrijfNaam: winkelmandProduct.product.bedrijf.naam,  producten: [winkelmandProduct]});
        }


        return accumulator;

    }, [] as BedrijfProducten[]);



    console.log("debuggiinngg");
    return bedrijfProducten;


}