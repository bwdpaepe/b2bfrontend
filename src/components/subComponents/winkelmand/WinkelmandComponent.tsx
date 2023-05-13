import { useCallback, useEffect, useState } from "react";
import Winkelmand from "../../../type/Winkelmand";
import { getWinkelmand } from "../../../service/winkelmand";
import WinkelmandCardHolder from "./WinkelmandCardHolder";
import BedrijfProducten from "../../../type/BedrijfProducten";
import WinkelmandProductenSorteerder from "../../../util/WinkelmandProductenSorteerder";
import useLoggedUser from "../../../util/useLoggedUser";
import winkelmandProduct from "../../../type/WinkelmandProduct";
import TotalPrice from "../../../type/TotalPrice";
import { Box, Center, Text } from "@chakra-ui/react";
import { addEditProductToWinkelmand } from "../../../service/winkelmand";

export default function WinkelmandComponent() {
  const [winkelmand, setWinkelmand] = useState<Winkelmand>();
  const [sortedWinkelmand, setSortedWinkelmand] =
    useState<BedrijfProducten[]>();
  const [user] = useLoggedUser();

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

  function sorteerWinkelmand() {
    const _sortedWinkelmand = WinkelmandProductenSorteerder(winkelmand!);
    setSortedWinkelmand(_sortedWinkelmand);
  }

  // update the quantity of a product in the winkelmand, this function is passed down to the WinkelmandProductEntry component
  // this is created here because the Winkelmand state is kept here
  const updateProductQuantity = async (
    productId: number,
    newQuantity: number
  ) => {
    console.log(
      "updateProductQuantity called with productId: " +
        productId +
        " and newQuantity: " +
        newQuantity
    );
    if (!winkelmand) {
      console.log("winkelmand is null");
      return;
    }

    // clone the winkelmand object before modifying it to avoid mutating state directly
    let newWinkelmand: Winkelmand = JSON.parse(JSON.stringify(winkelmand));
    const productToUpdate = newWinkelmand.winkelmandProducten.find(
      (product: winkelmandProduct) => product.product.productId === productId
    );

    if (productToUpdate) {
      const quantityDiff = newQuantity - productToUpdate.aantal; // needed to update the total price of the winkelmand in localStorage
        productToUpdate.aantal = newQuantity;
        productToUpdate.subtotal =
          productToUpdate.product.eenheidsprijs * newQuantity;

        // update totalPrice
        const priceIndex = newWinkelmand.totalPrice.findIndex(
          (item: TotalPrice) =>
            item.bedrijfId === productToUpdate.product.bedrijf.bedrijfId
        );

        if (priceIndex > -1) {
          newWinkelmand.totalPrice[priceIndex].value +=
            productToUpdate.product.eenheidsprijs * quantityDiff; // quantityDiff is used here, not newQuantity, because newQuantity is the new quantity of the product, not the difference between the old and new quantity
        }

      if (user) {
        // If the user is logged in, update the winkelmand in the database
        // TODO: uncomment this when the backend is ready, this is not yet implemented
        await addEditProductToWinkelmand(
          productToUpdate.product.productId,
          newQuantity,
          true // isUpdate, this optional parameter is true because we are updating the quantity of a product
        );
        
      } else {
        // If the user is not logged in, update the winkelmand in localStorage
        localStorage.setItem("winkelmand", JSON.stringify(newWinkelmand));
      }

      // the useEffect hook will sort the winkelmand after the winkelmand state is updated because the winkelmand state is a dependency of the useEffect hook
      setWinkelmand(newWinkelmand);
    }
  };

  // delete a product in the winkelmand, this function is passed down to the WinkelmandProductEntry component
  const deleteProduct = (productId: number) => {
    console.log("deleteProduct called with productId: " + productId);
    if (!winkelmand) {
      console.log("winkelmand is null");
      return;
    }

    const newWinkelmand: Winkelmand = JSON.parse(JSON.stringify(winkelmand));
    // newWinkelmand.winkelmandProducten =
    //   newWinkelmand.winkelmandProducten.filter(
    //     (product: winkelmandProduct) => product.product.productId !== productId
    //   );
    const productIndex = newWinkelmand.winkelmandProducten.findIndex(
      (product: winkelmandProduct) => product.product.productId === productId
    );

    if (productIndex > -1) {
      const productToDelete = newWinkelmand.winkelmandProducten[productIndex];

      if (user) {
        // If the user is logged in, delete the product from the winkelmand in the database
        // TODO: uncomment this when the backend is ready
        // await deleteProductFromWinkelmand(productId);
      } else {
        // If the user is not logged in, delete the product from the winkelmand in localStorage

        // update totalPrice
        const priceIndex = newWinkelmand.totalPrice.findIndex(
          (item: TotalPrice) =>
            item.bedrijfId === productToDelete.product.bedrijf.bedrijfId
        );

        if (priceIndex > -1) {
          newWinkelmand.totalPrice[priceIndex].value -=
            productToDelete.subtotal;
          newWinkelmand.totalPrice[priceIndex].value =
            Math.round(newWinkelmand.totalPrice[priceIndex].value * 100) / 100; // round to 2 decimals (because of floating point errors)
          // if the total price for this bedrijf is now 0, remove it from the totalPrice array
          if (newWinkelmand.totalPrice[priceIndex].value === 0) {
            newWinkelmand.totalPrice.splice(priceIndex, 1);
          }
        }

        // remove product from winkelmand
        newWinkelmand.winkelmandProducten.splice(productIndex, 1);

        localStorage.setItem("winkelmand", JSON.stringify(newWinkelmand));
      }

      // the useEffect hook will sort the winkelmand after the winkelmand state is updated because the winkelmand state is a dependency of the useEffect hook
      setWinkelmand(newWinkelmand);
    }
  };

  useEffect(() => {
    _getWinkelmand();
  }, [_getWinkelmand]);

  useEffect(() => {
    if (winkelmand) {
      sorteerWinkelmand();
      console.log("Winkelmand sorted");
    }
  }, [winkelmand]);

  return (
    <>
      {sortedWinkelmand &&
      winkelmand &&
      winkelmand.winkelmandProducten.length >= 1 ? (
        <WinkelmandCardHolder
          winkelmand={sortedWinkelmand}
          totalPrices={winkelmand.totalPrice}
          updateProductQuantity={updateProductQuantity}
          deleteProduct={deleteProduct}
        />
      ) : (
        <Box id="WinkelmandCardHolder">
          <Center>
            <Box className="WinkelmandCard">
              <Text>Je winkelmand is leeg !</Text>
            </Box>
          </Center>
        </Box>
        // <WinkelmandCardHolder
        //   winkelmand={null}
        //   totalPrices={null}
        //   updateProductQuantity={updateProductQuantity}
        //   deleteProduct={deleteProduct}
        // />
      )}
    </>
  );
}
