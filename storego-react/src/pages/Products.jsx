import ProductGrid from '../components/ProductGrid';
import { PRODUCTS } from '../data/products';
import { usePageTitle } from '../hooks/usePageTitle';

export default function Products() {
  usePageTitle('Productos');
  return (
    <section className="products">
      <div className="container">
        <h2 className="section-title">Todos los productos</h2>
        <ProductGrid products={PRODUCTS} />
      </div>
    </section>
  );
}
