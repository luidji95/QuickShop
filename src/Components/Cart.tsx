import { useQuery } from "@tanstack/react-query";
import { fetchProducts, Product } from "../api/productServices";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/Slices/cartSlice";
import "../App.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { totalPrice, totalItems } = useSelector((state: any) => state.cart);

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
      {/* ✅ Dodajemo View All Items dugme u gornji desni ugao */}
      <button className="view-cart-btn">View All Items</button>

      <h1 className="cart-title">Available Products</h1>

      <div className="cart-summary">
        <h2>🛒 Cart Summary</h2>
        <p>
          Total Items: <strong>{totalItems}</strong>
        </p>
        <p>
          Total Price: <strong>${totalPrice.toFixed(2)}</strong>
        </p>
      </div>

      <div className="cart-items">
        {products?.map((product) => (
          <div key={product.id} className="cart-item">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button
              className="add-to-cart-btn"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
