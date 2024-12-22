import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import axios from 'axios';

const DetailProduct = () => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user')) || {}; 
  
  function handleQuantityChange(currentQty, jumlah_produk, isIncrease, harga) {
    let newQty;

    if (isIncrease) {
      newQty = currentQty < jumlah_produk ? currentQty + 1 : currentQty;
    } else {
      newQty = currentQty > 1 ? currentQty - 1 : currentQty;
    }

    return {
      quantity: newQty,
      total: newQty * harga,     
    };
  }

  // React component handlers
  const handleIncrease = () => {
    const result = handleQuantityChange(quantity, product.jumlah_produk, true, product.harga);
    setQuantity(result.quantity);
    setTotal(result.total);
  };

  const handleDecrease = () => {
    const result = handleQuantityChange(quantity, product.jumlah_produk, false, product.harga);
    setQuantity(result.quantity);
    setTotal(result.total);
  };

  const handlePurchase = () => {
    navigate(`/payment/${product.id}`, { 
        state: { 
            total,
            quantity,            
            idUser:userData.id,
            idProduk:id

        } 
    });
};

  useEffect(() => {
    // Fetch product data using axios
    axios.get(`http://localhost:8085/produk/${id}`)
      .then((response) => {
        const data = response.data;        
        if (data) {
          setTotal(data.harga * quantity);
        }
        const updatedData = { 
          ...data, 
          user: userData 
        };
      
        setProduct(updatedData);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [id, quantity]); // Add `quantity` to dependencies to recalculate total when quantity changes

  if (!product) {
    return <p>Loading...</p>;
  }

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,      
      productName: product.nama_produk,
      harga: product.harga,
      quantity: quantity,
      total: total,
      image_url: product.filename[0],
      owner: product?.user?.nama_user || 'User',
      photoProfile: product?.user?.avatar || '../../../../public/profile.png'
    };
    
  
    try {
      const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItemIndex = existingCart.findIndex(item => item.id === product.id);

      if (existingItemIndex !== -1) {
        const newQuantity = existingCart[existingItemIndex].quantity + quantity;
        existingCart[existingItemIndex].quantity = newQuantity;
        existingCart[existingItemIndex].total = newQuantity * product.harga;
      } else {
        existingCart.push(cartItem);
      }

      localStorage.setItem('cart', JSON.stringify(existingCart));

      const messageElement = document.getElementById('success-message');
      if (messageElement) {
        messageElement.classList.remove('hidden');
        setTimeout(() => {
          messageElement.classList.add('hidden');
        }, 3000);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <section className="bg-[#f4fef1] w-full  pl-60 pt-20">
        <div className="mt-5 flex-grow">
          <Navbar showSearchBar={false} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="currentColor"
            className="text-green-500 hover:cursor-pointer mx-10 bi bi-arrow-left-short"
            viewBox="0 0 16 16"
            onClick={() => window.history.back()}
          >
            <path
              fillRule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
            />
          </svg>

          <section className="min-h-screen mx-10">
            <div className="flex mt-5 gap-5 justify-between">
              <div className="flex gap-10 p-5 shadow-md w-[70%] rounded-xl min-h-96 bg-white">
                {/* Product */}
                <div className="flex flex-col min-w-48 gap-5">
                  <img
                    src={product.filename[0]}
                    alt={product.nama_produk}
                    className="w-48 h-48 object-cover rounded-xl"
                  />
                  <div className="flex items-center gap-3">
                    <img
                      src={product?.user.avatar}
                      alt={product?.user?.avatar}
                      className="w-8 h-8 object-cover rounded-full"
                    />
                    <p className="text-xs font-semibold">{product?.user?.nama_user || 'User'}</p>
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{product.nama_produk}</h1>
                  <h3 className="text-2xl font-bold mb-2">
                  Rp{Number(product.harga).toLocaleString('id-ID')}
                  </h3>
                  <h1 className="bg-[#e2f7db] text-xs rounded text-center w-28 py-1 mb-4">
                    Hingga : {product.jam} WIB
                  </h1>
                  <p className="text-lg text-[#47cb18] mt-20 mb-4">Deskripsi</p>
                  <div className="flex flex-col mb-4">
                    <h1 className="font-bold text-xs">Detail Produk</h1>
                    <p className="text-xs">{product.kategori_produk}</p>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="font-bold text-xs">Deskripsi Produk</h1>
                    <p className="text-xs">{product.deskripsi_produk}</p>
                  </div>
                </div>



              </div>


              {/* Payment */}
              <div className="mt-10 flex-1 max-h-64 rounded-xl p-5 bg-white shadow-md flex flex-col">
                <h1 className="font-bold text-lg mb-4">Jumlah pembelian</h1>

                {/* Quantity Control */}
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center border rounded-lg py-1 px-3">
                    <button
                      onClick={handleDecrease}
                      className="text-green-600 text-2xl font-bold px-2"
                    >
                      -
                    </button>
                    <span className="text-green-600 text-xl font-bold mx-4">{quantity}</span>
                    <button
                      onClick={handleIncrease}
                      className="text-green-600 text-2xl font-bold px-2"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm">Sisa stok: {product.jumlah_produk}</p>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center w-full mb-4">
                  <span className="text-gray-700">Total</span>
                  <span className="text-black font-bold">
                    Rp{total.toLocaleString()}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex justify-between gap-2">
                  <button
                    onClick={handlePurchase}
                    className="bg-[#45c517] text-sm py-2 hover:bg-green-600 w-28 text-white px-3 rounded-lg"
                  >
                    Beli
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="hover:bg-green-50 text-sm border py-2 w-28 border-green-600 text-green-600 px-3 rounded-lg"
                  >
                    + Keranjang
                  </button>
                </div>
                <p
                  id="success-message"
                  className="hidden text-green-600 text-xs pt-2 mt-2 transition-all duration-300"
                >
                  Berhasil ditambahkan ke keranjang
                  Berhasil ditambahkan ke keranjang
                </p>

              </div>

            </div>

            {/* Add before the closing div */}
            <div className="mt-8 px-4">
              <h2 className="text-2xl font-semibold mb-4 text-[#45c517]">Rekomendasi Lainnya</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {randomProducts.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </section >
    </div >
  );
};

export default DetailProduct;
