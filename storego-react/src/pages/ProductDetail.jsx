import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { usePageTitle } from '../hooks/usePageTitle';
import { formatCLP } from '../utils/format';

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  usePageTitle(product ? product.name : 'Producto no encontrado');

  if (!product) {
    return (
      <section className="products">
        <div className="container">
          <p className="carrito-vacio">
            Producto no encontrado. <Link to="/productos">Volver a productos</Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="products">
      <div className="container">
        <p className="breadcrumb">
          <Link to="/">Inicio</Link> › <Link to="/productos">Productos</Link> › <span>{product.name}</span>
        </p>
        <div className="detail-layout">
          <div className="detail-image"><img src={product.img} alt={product.name} /></div>
          <div className="detail-info">
            <h1>{product.name}</h1>
            <p className="detail-price">{formatCLP(product.price)}</p>
            <p className="detail-desc">{product.desc}</p>
            <div className="detail-qty">
              <label htmlFor="detailQty">Cantidad</label>
              <select id="detailQty" value={qty} onChange={e => setQty(parseInt(e.target.value, 10))}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <button className="btn btn-primary" onClick={() => addToCart(product.id, qty)}>
              Añadir al carrito
            </button>
          </div>
        </div>
        <h2 className="related-title">Productos relacionados</h2>
        <ProductGrid products={PRODUCTS.filter(p => p.id !== product.id)} />
      </div>
    </section>
  );
}
