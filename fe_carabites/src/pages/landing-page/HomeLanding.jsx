import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import NavbarLanding from '../../components/landingpage/NavbarLanding';
import { FaArrowRight, FaUsers, FaUtensils, FaHandshake } from 'react-icons/fa';

const HomeLanding = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroImage = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80";

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const features = [
    {
      icon: <FaUsers className="text-4xl text-[#45c517]" />,
      title: "Komunitas Luas",
      description: "Bergabung dengan ribuan mitra dan pelanggan setia"
    },
    {
      icon: <FaUtensils className="text-4xl text-[#45c517]" />,
      title: "Makanan Berkualitas",
      description: "Sajikan makanan terbaik untuk pelanggan Anda"
    },
    {
      icon: <FaHandshake className="text-4xl text-[#45c517]" />,
      title: "Kemitraan Terpercaya",
      description: "Dukungan penuh untuk kesuksesan bisnis Anda"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <NavbarLanding />

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={staggerContainer}
        className="relative h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full"
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
            <div className="absolute inset-0 bg-black opacity-50" />
          </motion.div>
        </div>

        <div className="relative z-10 text-center">
          <motion.h1
            variants={fadeIn}
            className="text-5xl md:text-7xl font-bold text-[#45c517] mb-6"
          >
            Carebites
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
          >
            Platform yang menghubungkan penyedia makanan dengan pelanggan. Tingkatkan bisnis Anda bersama kami.
          </motion.p>
          <motion.button
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#45c517] text-white px-8 py-3 rounded-full text-lg font-semibold flex items-center gap-2 mx-auto hover:bg-[#3ba614]"
          >
            Mulai Sekarang <FaArrowRight />
          </motion.button>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <motion.h2
          variants={fadeIn}
          className="text-4xl font-bold text-[#45c517] text-center mb-16"
        >
          Mengapa Memilih Kami?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all duration-300 border border-gray-100"
            >
              <div className="flex justify-center mb-6">
                <div className="text-[#45c517] text-4xl">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f1f1f1]"
      >
        <motion.h2
          variants={fadeIn}
          className="text-4xl font-bold text-[#45c517] text-center mb-16"
        >
          Program Donasi
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            {
              title: "Bantu Anak Yatim",
              description: "Donasi Anda akan disalurkan untuk membantu anak-anak yatim yang membutuhkan.",
              goal: "Rp 10.000.000",
              raised: "Rp 2.500.000"
            },
            {
              title: "Bantuan Makanan untuk Lansia",
              description: "Menyediakan makanan sehat untuk para lansia yang kurang mampu.",
              goal: "Rp 5.000.000",
              raised: "Rp 1.200.000"
            },
            {
              title: "Pendidikan untuk Generasi Muda",
              description: "Mendukung pendidikan anak-anak di daerah terpencil dengan bantuan donasi Anda.",
              goal: "Rp 8.000.000",
              raised: "Rp 3.000.000"
            }
          ].map((donation, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all duration-300 border border-gray-100"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">{donation.title}</h3>
              <p className="text-gray-600 mb-6">{donation.description}</p>
              <div className="mb-4">
                <span className="block text-sm text-gray-600">Target Donasi</span>
                <span className="text-lg font-semibold text-[#45c517]">{donation.goal}</span>
              </div>
              <div className="mb-4">
                <span className="block text-sm text-gray-600">Donasi Terkumpul</span>
                <span className="text-lg font-semibold text-[#45c517]">{donation.raised}</span>
              </div>
              <motion.a
                href="#"
                variants={fadeIn}
                className="bg-[#45c517] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#3ba614] flex justify-center items-center gap-2"
              >
                Donasi Sekarang
                <FaArrowRight />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={staggerContainer}
  className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
>
  <motion.h2
    variants={fadeIn}
    className="text-4xl font-bold text-[#45c517] text-center mb-16"
  >
    Artikel Terbaru
  </motion.h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
    {[
      {
        title: "Makanan Sehat untuk Semua Usia",
        description: "Artikel ini membahas makanan sehat yang cocok untuk semua usia dan cara memilihnya.",
        image: "https://images.unsplash.com/photo-1586202114214-cab9b2e8b888?fit=crop&w=500&h=300&q=80"
      },
      {
        title: "Tren Makanan 2024",
        description: "Apa yang akan menjadi tren makanan di tahun 2024? Temukan jawabannya di sini!",
        image: "https://images.unsplash.com/photo-1601974211627-545577efdf4c?fit=crop&w=500&h=300&q=80"
      },
      {
        title: "Cara Menjaga Kualitas Makanan",
        description: "Pentingnya menjaga kualitas makanan dalam bisnis makanan dan tips agar tetap terjaga.",
        image: "https://images.unsplash.com/photo-1579546929518-2292115ba19a?fit=crop&w=500&h=300&q=80"
      }
    ].map((article, index) => (
      <motion.div
        key={index}
        variants={fadeIn}
        whileHover={{ y: -10 }}
        className="bg-white p-6 rounded-xl shadow-lg text-center transform transition-all duration-300 border border-gray-100"
      >
        <div className="mb-6">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-48 object-cover rounded-xl"
          />
        </div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">{article.title}</h3>
        <p className="text-gray-600 mb-4">{article.description}</p>
        <motion.a
          href="#"
          variants={fadeIn}
          className="text-[#45c517] font-semibold hover:text-[#3ba614]"
        >
          Baca Selengkapnya
        </motion.a>
      </motion.div>
    ))}
  </div>
</motion.section>


      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="bg-[#45c517] py-20 px-4 sm:px-6 lg:px-8 text-white text-center"
      >
        <motion.h2
          variants={fadeIn}
          className="text-4xl font-bold mb-8 text-white"
        >
          Siap Untuk Bergabung?
        </motion.h2>
        <motion.p
          variants={fadeIn}
          className="text-xl mb-12 max-w-2xl mx-auto"
        >
          Daftar sekarang dan nikmati berbagai keuntungan menjadi mitra Carebites
        </motion.p>
        <motion.button
          variants={fadeIn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-[#45c517] px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-50"
        >
          Daftar Sekarang
        </motion.button>
      </motion.section>



    </div>
  );
};

export default HomeLanding;