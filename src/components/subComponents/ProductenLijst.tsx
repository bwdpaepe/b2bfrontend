import { Text, SimpleGrid, Box, Select, Stack } from "@chakra-ui/react";
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
        filteredProducten.sort((a, b) => {
          if (a.naam === b.naam) {
            return a.productId - b.productId;
          } else {
            return a.naam.localeCompare(b.naam);
          }
        });
        break;
      case "4":
        filteredProducten.sort((a, b) => {
          if (a.naam === b.naam) {
            return b.productId - a.productId;
          } else {
            return b.naam.localeCompare(a.naam);
          }
        });
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
      <Stack direction={"row"} alignItems={"center"} mt={3} ml={4}>
        <Text fontSize="xl" fontWeight="bold">
          Sorteren:
        </Text>
        <Select maxW="300px" onChange={(e) => setSorteerOp(e.target.value)}>
          <option key={1} value="1">
            Prijs: laag naar hoog
          </option>
          <option key={2} value="2">
            Prijs: hoog naar laag
          </option>
          <option key={3} value="3">
            Naam: A-Z
          </option>
          <option key={4} value="4">
            Naam: Z-A
          </option>
        </Select>
      </Stack>
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
