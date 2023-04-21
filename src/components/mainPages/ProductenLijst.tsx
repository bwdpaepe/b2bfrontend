import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Product from "./Product";
import IProduct from "../../type/IProduct";
import "../../styling/producten.css";
import { productenByBedrijfId } from "../../service/productenByBedrijfId";

export default function Producten() {
  const [producten, setProducten] = useState<IProduct[]>([]); // initialize producten as an empty array

  useEffect(() => {
    async function fetchProducten() {
      const productenData = await productenByBedrijfId(2); // fetch producten from the API
      setProducten(productenData); // set the fetched producten in state
    }
    fetchProducten();
  }, []);
  // render a message if there are no products
  if (!producten.length) {
    return <Text>No products found.</Text>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {producten.map((product) => (
        <Product key={product.productId} product={product} />
      ))}
    </div>
  );
}
