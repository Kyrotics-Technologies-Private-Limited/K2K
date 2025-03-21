import { ProductDetail } from '../components/products/ProductDetail'
import { sampleProducts } from '../mockData/SampleProduct'
import { useParams } from 'react-router-dom'
import { Product } from '../types'

const ProductPage = () => {
    const { id } = useParams<{ id: string }>(); // Get product ID from URL

  // Find the product with the matching ID
  const Product: Product | undefined = sampleProducts.find((p) => p.id === id);

  return (
        <div>
            
            <div className="bg-green-800 py-8"></div>
            <ProductDetail product={Product}
                    relatedProducts={sampleProducts}/>
                    
                    </div>
  )
}

export default ProductPage