import Product from "./Product";
import winkelmandProduct from "./WinkelmandProduct";


export default interface BedrijfProducten{
    bedrijfId : number;
    bedrijfNaam: string;
    producten: winkelmandProduct[];
}