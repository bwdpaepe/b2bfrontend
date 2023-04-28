import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Product from "../../type/Product";
import { productenByProductId } from "../../service/producten";

export default function ProductDetails() {
  const { bedrijfIdString, productIdString } = useParams();
  const navigate = useNavigate();
  function handleNavigate(pathname: string) {
    navigate(pathname);
  }

  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    async function fetchProduct() {
      const productData = await productenByProductId(Number(productIdString));
      setProduct(productData);
    }
    fetchProduct();
  }, [productIdString]);

  console.log(JSON.stringify(product));
  return (
    <div>
      <h1>ProductDetails van {product?.naam}</h1>
      <Text
        color="red"
        onClick={() => handleNavigate(`/producten/${bedrijfIdString}`)}
        _hover={{ cursor: "pointer", textDecoration: "underline" }}
      >{`< Terug`}</Text>
    </div>
  );
}
