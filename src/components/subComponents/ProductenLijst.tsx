import { Text, Flex, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Product from "../../type/Product";
import "../../styling/producten.css";
import { productenByBedrijfId } from "../../service/producten";

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
    <Grid
      templateColumns={{
        base: "repeat(1, minmax(0, 1fr))",
        md: "repeat(2, minmax(0, 1fr))",
        lg: "repeat(2, minmax(0, 1fr))",
      }}
      gap={6}
      p={3}
    >
      {producten.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </Grid>
  );
}
