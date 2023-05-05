import { Text, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Product from "../../type/Product";
import "../../styling/producten.css";
import { productenByBedrijfId } from "../../service/producten";

export default function ProductenLijst({
  bedrijfId,
  isVoorradig,
  minimumPrijs,
  maximumPrijs,
  geselecteerdeCategorie,
}: {
  bedrijfId: number;
  isVoorradig: boolean;
  minimumPrijs: number;
  maximumPrijs: number;
  geselecteerdeCategorie: string;
}) {
  const [producten, setProducten] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducten() {
      const productenData = await productenByBedrijfId(bedrijfId);
      setProducten(productenData);
    }
    fetchProducten();
  }, [bedrijfId]);

  const filteredProducten = isVoorradig
    ? producten
        .filter((product) => product.voorraad > 0)
        .filter(
          (product) =>
            product.eenheidsprijs >= minimumPrijs &&
            product.eenheidsprijs <= maximumPrijs &&
            (!geselecteerdeCategorie ||
              product.categorie.naam === geselecteerdeCategorie)
        )
    : producten.filter(
        (product) =>
          product.eenheidsprijs >= minimumPrijs &&
          product.eenheidsprijs <= maximumPrijs &&
          (!geselecteerdeCategorie ||
            product.categorie.naam === geselecteerdeCategorie)
      );

  if (!producten.length || !filteredProducten.length) {
    return <Text w={"full"}>No products found.</Text>;
  }

  return (
    <SimpleGrid
      templateColumns={{
        base: "repeat(1, minmax(0, 1fr))",
        md: "repeat(1, minmax(0, 1fr))",
        lg: "repeat(5, minmax(0, 1fr))",
      }}
      gap={3}
      p={3}
    >
      {filteredProducten.map((product) => (
        <ProductCard
          key={product.productId}
          product={product}
          bedrijfId={bedrijfId}
        />
      ))}
    </SimpleGrid>
  );
}
