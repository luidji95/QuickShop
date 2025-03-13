import { useQuery } from "@tanstack/react-query";
import { fetchProducts, Product } from "../api/productServices";

const Cart = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error fetching products</p>;

  return (
    <div>
      <h1>Available Products</h1>
      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <img src={product.image} alt={product.title} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
