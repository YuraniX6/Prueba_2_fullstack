import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCLP } from '../utils/format';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link to={`/producto/${product.id}`} className="product-thumb">
        <img src={product.img} alt={product.name} />
      </Link>
      <h3><Link to={`/producto/${product.id}`}>{product.name}</Link></h3>
      <p className="product-desc">{product.desc}</p>
      <div className="product-footer">
        <span className="price">{formatCLP(product.price)}</span>
        <button className="btn-add" onClick={() => addToCart(product.id)}>Añadir</button>
      </div>
    </div>
  );
}
