import { ProductGrid } from '../components/products/ProductGrid'
import { sampleProducts } from '../mockData/SampleProduct';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const AllProductPage = () => {
  return (
    
    <div>
        <Navbar/>
        <div className="bg-green-800 py-8"></div>
        <ProductGrid products={sampleProducts} />
        <Footer/>
        </div>
  )
}

export default AllProductPage