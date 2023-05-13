import { useCallback, useEffect, useState } from "react";
import Winkelmand from "../../../type/Winkelmand";
import { getWinkelmand } from "../../../service/winkelmand";
import WinkelmandCardHolder from "./WinkelmandCardHolder";
import BedrijfProducten from "../../../type/BedrijfProducten";
import WinkelmandProductenSorteerder from "../../../util/WinkelmandProductenSorteerder";
import useLoggedUser from "../../../util/useLoggedUser";
import winkelmandProduct from "../../../type/WinkelmandProduct";

export default function WinkelmandComponent() {
  const [winkelmand, setWinkelmand] = useState<Winkelmand>();
  const [sortedWinkelmand, setSortedWinkelmand] = useState<BedrijfProducten[]>();
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

  // update the quantity of a product in the winkelmand, this is passed down to the WinkelmandProductEntry component
  // this is created here because the Winkelmand state is kept here
  const updateProductQuantity = (productId: number, newQuantity: number) => {
    console.log("updateProductQuantity called with productId: " + productId + " and newQuantity: " + newQuantity);
    if (!winkelmand) {
      console.log("winkelmand is null");
      return;
    }

    // clone the winkelmand object before modifying it to avoid mutating state directly
    const newWinkelmand: Winkelmand = JSON.parse(JSON.stringify(winkelmand));
    const productToUpdate = newWinkelmand.winkelmandProducten.find(
      (product: winkelmandProduct) => product.product.productId === productId
    );

    if (productToUpdate) {
      productToUpdate.aantal = newQuantity;
      setWinkelmand(newWinkelmand);
      // the useEffect hook will sort the winkelmand after the winkelmand state is updated because the winkelmand state is a dependency of the useEffect hook

      if (user) {
        // If the user is logged in, update the winkelmand in the database
        // TODO: uncomment this when the backend is ready
        //await updateProductInWinkelmand(productId, newQuantity);
      } else {
        // If the user is not logged in, update the winkelmand in localStorage
        localStorage.setItem('winkelmand', JSON.stringify(newWinkelmand));
      }
    }
  };

  // delete a product in the winkelmand, this is passed down to the WinkelmandProductEntry component
  const deleteProduct = (productId: number) => {
    console.log("deleteProduct called with productId: " + productId);
    if (!winkelmand) {
      console.log("winkelmand is null");
      return;
    }

    const newWinkelmand: Winkelmand = JSON.parse(JSON.stringify(winkelmand));
    newWinkelmand.winkelmandProducten =
      newWinkelmand.winkelmandProducten.filter(
        (product: winkelmandProduct) => product.product.productId !== productId
      );

    setWinkelmand(newWinkelmand);
    // the useEffect hook will sort the winkelmand after the winkelmand state is updated because the winkelmand state is a dependency of the useEffect hook

    if (user) {
      // If the user is logged in, delete the product from the winkelmand in the database
      // TODO: uncomment this when the backend is ready
      // await deleteProductFromWinkelmand(productId);

    } else {
      // If the user is not logged in, delete the product from the winkelmand in localStorage
      localStorage.setItem('winkelmand', JSON.stringify(newWinkelmand));
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
      {sortedWinkelmand && winkelmand ? (
        <WinkelmandCardHolder
          winkelmand={sortedWinkelmand}
          totalPrices={winkelmand.totalPrice}
          updateProductQuantity={updateProductQuantity}
          deleteProduct={deleteProduct}
        />
      ) : (
        <WinkelmandCardHolder
          winkelmand={null}
          totalPrices={null}
          updateProductQuantity={updateProductQuantity}
          deleteProduct={deleteProduct}
        />
      )}
    </>
  );
}
