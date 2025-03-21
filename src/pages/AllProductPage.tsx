import { ProductGrid } from '../components/products/ProductGrid'
import { sampleProducts } from '../mockData/SampleProduct';



const AllProductPage = () => {
  return (
    
    <div>
       
        <div className="bg-green-800 py-8"></div>
        <ProductGrid products={sampleProducts} />
        
        </div>
  )
}

export default AllProductPage