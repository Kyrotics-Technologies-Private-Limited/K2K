interface ProductDetailsModalProps {
  product: {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: string;
    image: string;
  };
  onClose: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg w-80">
      <img src={product.image} alt={product.name} className="rounded-lg mb-4" />
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Stock: {product.stock}</p>
      <p>Status: {product.status}</p>
      <button
        onClick={onClose}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  </div>
);

export default ProductDetailsModal;
