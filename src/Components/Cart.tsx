import { useQuery } from "@tanstack/react-query";
import { fetchProducts, Product } from "../api/productServices";
import "../App.css";

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
    <div className="cart-container">
      <h1 className="cart-title">Available Products</h1>
      <div className="cart-items">
        {products?.map((product) => (
          <div key={product.id} className="cart-item">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
