import type { Product } from '@/types';
import { ProductService } from '@/services/ProductService';
import ProductDetailClient from '@/components/ProductDetailClient';

export async function generateStaticParams() {
  const productService = ProductService.getInstance();
  const products: Product[] = await productService.getAllProducts();

  return products.map(product => ({
    id: product.id,
  }));
}

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const productService = ProductService.getInstance();
  const product = await productService.getProductById(params.id);

  return <ProductDetailClient initialProduct={product} />;
}
