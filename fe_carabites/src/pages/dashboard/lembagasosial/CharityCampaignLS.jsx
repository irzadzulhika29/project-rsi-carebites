import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SidebarLS from '../../../components/dashboard/lembagasosial/SidebarLS';
import NavbarLS from '../../../components/dashboard/lembagasosial/NavbarLS';
import CharityCardLS from '../../../components/dashboard/lembagasosial/CharityCardLS';
import axios from 'axios'; // Import axios

const CharityCampaignLS = () => {
  // State untuk menyimpan data kampanye
  const [charityCampaigns, setCharityCampaigns] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk status loading

  // Fetch data campaign dari API
  useEffect(() => {
    axios.get('http://localhost:8085/penggalangan')
      .then(response => {
        setCharityCampaigns(response.data); // Set data ke state
        setLoading(false); // Set loading false setelah data diterima
      })
      .catch(error => {
        console.error("There was an error fetching the charity campaigns!", error);
        setLoading(false); // Set loading false jika ada error
      });
  }, []); // Empty dependency array berarti effect ini hanya dijalankan sekali setelah komponen mount

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };

  const fabVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.9
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Menampilkan loading jika data sedang dimuat
  }

  return (
    <div className="relative flex min-h-screen">
      <SidebarLS />
      <section className="pb-16 bg-[#f4fef1] w-full pl-60 pt-20">
        <div className="flex-grow">
          <NavbarLS />
          
          {/* Main Content with Scroll Animation */}
          <motion.div 
            className="p-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-2xl font-bold text-[#45c517] my-5"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Kampanye Amal
            </motion.h1>

            {/* Grid Container with Scroll Animation */}
            <motion.div 
              className="flex flex-wrap gap-20"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Map through your charity items */}
              {charityCampaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  viewport={{ once: true }}
                >
                  <CharityCardLS 
                    id={campaign._id}
                    image={campaign.filename[0]}
                    title={campaign.campaign_title}
                    isActive={campaign.status === "active"}
                    targetDonation={campaign.target}
                    collectedAmount={campaign.target}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Floating Action Button with Animation */}
            <motion.div 
              className="fixed bottom-8 right-8"
              variants={fabVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
              <Link to="/create-charity-ls">
                <button className="bg-[#45c517] hover:bg-[#3ba513] text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <motion.span 
                    className="absolute right-full mr-2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 whitespace-nowrap"
                    initial={{ opacity: 0, x: 20 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    Buat Campaign
                  </motion.span>
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CharityCampaignLS;
