import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

import Sidebar from '../../../components/dashboard/Sidebar';
import Navbar from '../../../components/dashboard/Navbar';
import CardShareMeals from '../../../components/dashboard/sharemeals/CardShareMeals';

const ShareMeals = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8085/produk');
      setProducts(response.data); // Update state with fetched data
    } catch (error) {
      console.error('Gagal memuat produk:', error);
      alert('Terjadi kesalahan saat memuat produk. Silakan coba lagi nanti.');
    }
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <section className="bg-[#f4fef1] w-full pl-60 pt-20">
        <div className="flex-grow">
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <motion.div
            className="p-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Page Title */}
            <motion.h1
              className="text-[#45c517] text-3xl font-bold mb-6"
              variants={itemVariants}
            >
              Share Meals
            </motion.h1>

            {/* Products Section */}
            <motion.section
              className="mt-6"
              variants={containerVariants}
            >
              <motion.h2
                className="text-xl font-semibold text-[#45c517] mb-6"
                variants={itemVariants}
              >
                Produk yang Anda Bagikan
              </motion.h2>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.length > 0 ? (
                  products.map((product) => (
                    <CardShareMeals
                      key={product.id}
                      product={product}
                      onDelete={fetchProducts}
                    />
                  ))
                ) : (
                  <motion.p
                    className="text-center text-gray-500 col-span-full"
                    variants={itemVariants}
                  >
                    Tidak ada produk yang tersedia.
                  </motion.p>
                )}
              </div>
            </motion.section>

            {/* Floating Button */}
            <motion.div
              className="fixed right-10 bottom-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.5,
              }}
            >
              <Link to="/share-meals/form">
                <motion.button
                  className="bg-[#47cb18] hover:bg-green-600 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 10px 25px rgba(71, 203, 24, 0.3)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Bagikan Produk
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ShareMeals;
