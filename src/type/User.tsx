import Bedrijf from "./Bedrijf"

export default interface User{
    userId: number;
    email: string;
    personeelsNr:number;
    firstname: string;
    lastname:string;
    function:string;
    soort:string;
    address:string;
    phone:string;
    bedrijf: Bedrijf;




}