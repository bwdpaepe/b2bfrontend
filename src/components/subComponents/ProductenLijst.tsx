import { Text, SimpleGrid, Box, Select } from "@chakra-ui/react";
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
  const [sorteerOp, setSorteerOp] = useState("1");
  const [sortedProducten, setSortedProducten] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducten() {
      const productenData = await productenByBedrijfId(bedrijfId);
      setProducten(productenData);
    }
    fetchProducten();
  }, [bedrijfId]);

  useEffect(() => {
    let filteredProducten = isVoorradig
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
    switch (sorteerOp) {
      case "1":
        filteredProducten.sort((a, b) => a.eenheidsprijs - b.eenheidsprijs);
        break;
      case "2":
        filteredProducten.sort((a, b) => b.eenheidsprijs - a.eenheidsprijs);
        break;
      case "3":
        filteredProducten.sort((a, b) => a.naam.localeCompare(b.naam));
        break;
      case "4":
        filteredProducten.sort((a, b) => b.naam.localeCompare(a.naam));
        break;
      default:
        filteredProducten.sort((a, b) => a.eenheidsprijs - b.eenheidsprijs);
        break;
    }
    setSortedProducten(filteredProducten);
  }, [
    isVoorradig,
    minimumPrijs,
    maximumPrijs,
    geselecteerdeCategorie,
    producten,
    sorteerOp,
  ]);

  if (!producten.length || !sortedProducten) {
    return <Text w={"full"}>No products found.</Text>;
  }
  return (
    <Box justifySelf={"flex-start"}>
      <Select
        maxW="300px"
        p={3}
        onChange={(e) => setSorteerOp(e.target.value)}
        placeholder="Sorteren op"
      >
        <option key={1} value="1">
          Sorteer op prijs: laag naar hoog
        </option>
        <option key={2} value="2">
          Sorteer op prijs: hoog naar laag
        </option>
        <option key={3} value="3">
          Sorteer op naam: A-Z
        </option>
        <option key={4} value="4">
          Sorteer op naam: Z-A
        </option>
      </Select>
      <SimpleGrid
        templateColumns={{
          base: "repeat(1, minmax(0, 1fr))",
          md: "repeat(1, minmax(0, 1fr))",
          lg: "repeat(5, minmax(0, 1fr))",
        }}
        gap={3}
        p={3}
      >
        {sortedProducten.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
            bedrijfId={bedrijfId}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
