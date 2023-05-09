import { Box } from "@chakra-ui/react";
import WinkelmandCard from "./WinkelmandCard";
import BedrijfProducten from "../../../type/BedrijfProducten";
import TotalPrice from "../../../type/TotalPrice";

export default function WinkelmandCardHolder(props: {
  winkelmand: BedrijfProducten[] | null;
  totalPrices: TotalPrice[] | null;
}) {
  return (
    <>
      <Box id="WinkelmandCardHolder">
        {props.winkelmand === null ? (
          <WinkelmandCard
            leverancier={null}
            leverancierId={null}
            producten={null}
            totalPrice={null}
          />
        ) : (
          <>
            {props.winkelmand.map((entry) => (
              <WinkelmandCard
                leverancier={entry.bedrijfNaam}
                leverancierId={entry.bedrijfId}
                producten={entry.producten}
                totalPrice={
                  props.totalPrices!.find(
                    (prices) => prices.bedrijfId === entry.bedrijfId
                  )!
                }
              ></WinkelmandCard>
            ))}
          </>
        )}
      </Box>
    </>
  );
}