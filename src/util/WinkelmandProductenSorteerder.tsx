import BedrijfProducten from "../type/BedrijfProducten";
import Product from "../type/Product";
import Winkelmand from "../type/Winkelmand";
import winkelmandProduct from "../type/WinkelmandProduct";




export default function WinkelmandProductenSorteerder(winkelmand : Winkelmand){


    const winkelmandProducten : winkelmandProduct[] = winkelmand.winkelmandProducten;
    

    const bedrijfProducten : any = winkelmandProducten.reduce((accumulator, winkelmandProduct) => {
        const bedrijfId = winkelmandProduct.product.bedrijf.bedrijfId;
        const checkBedrijf = accumulator.find((entry) => entry.bedrijfId === bedrijfId);

        if(checkBedrijf){
            checkBedrijf.producten.push(winkelmandProduct.product)
        }
        else{
            accumulator.push({bedrijfId, producten: [winkelmandProduct.product]});
        }


        return accumulator;

    }, [] as BedrijfProducten[]);



    console.log("debuggiinngg");
    return bedrijfProducten;


}