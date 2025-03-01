import React from 'react';
import ProductCard from '../components/ProductCard';
import { useFetchProducts } from '../hooks/useFetchProducts';
import HeroSection from '../components/HeroSection';
function Shop() {
  const { data: products = [], isError, isLoading } = useFetchProducts()

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products</div>;

  return (
    <>
      <HeroSection />
      <div className="grid grid-cols-3 gap-4 p-5">
        {
          products?.content || Array.isArray(products.content) || products.content.length > 0 ? (
            products.content.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))
          ) : (
            <div>No products available</div>
          )
        }
  </div>
    </>
  );
}

export default Shop;
