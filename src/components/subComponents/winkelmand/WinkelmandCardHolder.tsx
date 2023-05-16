import { Box, } from "@chakra-ui/react";
import WinkelmandCard from "./WinkelmandCard";
import BedrijfProducten from "../../../type/BedrijfProducten";
import TotalPrice from "../../../type/TotalPrice";

export default function WinkelmandCardHolder(props: {
  winkelmand: BedrijfProducten[] /* | null */;
  totalPrices: TotalPrice[] | null;
  // the functions updateProductQuantity={updateProductQuantity} and deleteProduct={deleteProduct} are also passed down to the WinkelmandCard component
  // these functions take certain parameters and don't return a value (void).
  updateProductQuantity: (productId: number, newQuantity: number) => void;
  deleteProduct: (productId: number) => void;
}) {
  return (
    <>
      <Box id="WinkelmandCardHolder">
        <>
          {props.winkelmand.map((entry) => (
            <WinkelmandCard
              key={entry.bedrijfId}
              leverancier={entry.bedrijfNaam}
              leverancierId={entry.bedrijfId}
              producten={entry.producten}
              totalPrice={
                props.totalPrices!.find(
                  (prices) => prices.bedrijfId === entry.bedrijfId
                )!
              }
              updateProductQuantity={props.updateProductQuantity}
              deleteProduct={props.deleteProduct}
            ></WinkelmandCard>
          ))}
        </>
      </Box>
    </>
  );
}
