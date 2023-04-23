import { Text, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Product from "../../type/Product";
import "../../styling/producten.css";
import { productenByBedrijfId } from "../../service/productenByBedrijfId";

export default function ProductenLijst({ bedrijfId }: { bedrijfId: number }) {
  const [producten, setProducten] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducten() {
      const productenData = await productenByBedrijfId(bedrijfId);
      setProducten(productenData);
    }
    fetchProducten();
  }, [bedrijfId]);

  if (!producten.length) {
    return <Text>No products found.</Text>;
  }

  return (
    <Flex flexWrap="wrap" justifyContent="center">
      {producten.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </Flex>
  );
}
