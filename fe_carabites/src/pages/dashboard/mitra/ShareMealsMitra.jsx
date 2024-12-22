import { useEffect, useState } from "react";
import SidebarMitra from "../../../components/dashboard/mitra/SidebarMitra";
import NavbarMitra from "../../../components/dashboard/mitra/NavbarMitra";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ShareMealsCardMitra from "../../../components/dashboard/mitra/ShareMealsCardMitra";
import { FaShareAlt } from "react-icons/fa"; // Contoh ikon dari react-icons
import axios from "axios";


const ShareMealsMitra = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {      
      const userData = JSON.parse(localStorage.getItem('user'));
      
      if (!userData) {
        console.error('User data tidak ditemukan di localStorage.');
        return;
      }
      
      const response = await axios.get('http://localhost:8085/produk');
      
      const filteredProducts = response.data.filter(product => product?.user?.id === userData.id);
      
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Gagal memuat produk:', error);
      alert('Terjadi kesalahan saat memuat produk. Silakan coba lagi nanti.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="flex min-h-screen">
      <SidebarMitra />

      <section className="bg-[#f4fef1] w-full pl-60 pt-20">
        <div className="flex-grow">
          <NavbarMitra />

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
            <motion.section variants={containerVariants}>
              <motion.h2
                className="text-xl font-semibold text-[#45c517] mb-6"
                variants={itemVariants}
              >
                Produk yang anda bagikan
              </motion.h2>

              <motion.div
                className="flex justify-start flex-wrap gap-8"
                variants={containerVariants}
              >
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.03,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <ShareMealsCardMitra product={product} onDelete={fetchProducts} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            {/* Floating Button */}
            <motion.div
              className="fixed right-10 bottom-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.5,
              }}
            >


              <Link to="/sharemeals-form-mitra">
                <motion.button
                  className="bg-[#47cb18] hover:bg-green-600 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl flex items-center gap-2"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(71, 203, 24, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaShareAlt /> {/* Ikon ditambahkan di sini */}
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

export default ShareMealsMitra;