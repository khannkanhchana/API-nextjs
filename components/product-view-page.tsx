// "use-client"
// import { fakeProducts, Product } from '@/lib/data/mock-api';
// import { notFound } from 'next/navigation';
// import ProductForm from './form-product';

// type TProductViewPageProps = {
//   productId: string;
// };

// export default async function ProductViewPage({
//   productId
// }: TProductViewPageProps) {
//   let product = null;
//   let pageTitle = 'Create New Product';

//   if (productId !== 'new') {
//     const data = await fakeProducts.getProductById(Number(productId));
//     product = data.product as Product;
//     if (!product) {
//       notFound();
//     }
//     pageTitle = `Edit Product`;
//   }

//   return <ProductForm initialData={product} pageTitle={pageTitle} />;
// }



'use client';

import { fakeProducts, Product } from '@/lib/data/mock-api';
import { notFound } from 'next/navigation';
import ProductForm from './form-product';
import { useEffect, useState } from 'react';

type TProductViewPageProps = {
  productId: string;
};

export default function ProductViewPage({
  productId
}: TProductViewPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [pageTitle, setPageTitle] = useState('Create New Product');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      if (productId !== 'new') {
        const data = await fakeProducts.getProductById(Number(productId));
        const foundProduct = data.product as Product;
        if (!foundProduct) {
          notFound();
        }
        setProduct(foundProduct);
        setPageTitle('Edit Product');
      }
      setIsLoading(false);
    };
    loadProduct();
  }, [productId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <ProductForm initialData={product} pageTitle={pageTitle} />;
}


