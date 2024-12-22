import { motion } from "framer-motion";
import Sidebar from "../../../components/dashboard/Sidebar";
import Navbar from "../../../components/dashboard/Navbar";
import CharityCard from "../../../components/dashboard/charitycampaign/CharityCard";
import { useEffect, useState } from "react";
import axios from "axios";

const CharityCampaign = () => {
  const [charityCampaigns, setCharityCampaigns] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8085/penggalangan')
      .then(response => {
        setCharityCampaigns(response.data); // Set data ke state        
      })
      .catch(error => {
        console.error("There was an error fetching the charity campaigns!", error);        
      });
  }, []);
  
  return (
    <div className="flex min-h-screen">
      <Sidebar showSearchBar={true} />

      <section className="bg-[#f4fef1] w-full pl-60 pt-20">
        <div className="flex-grow">
          <Navbar showSearchBar={false} />



          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10 text-[#45c517] mb-5 mx-10 text-2xl font-bold"
          >
            Charity Campaign
          </motion.h1>

          {/* Featured Campaign Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-10 mt-8 bg-gradient-to-r from-[#45c517] to-[#84e965] rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-center p-8 relative">
              {/* Left Section */}
              <div className="w-full md:w-1/2 text-white z-10">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs mb-3 inline-block">
                  #BerbagiMakanan
                </span>
                <h2 className="text-3xl font-extrabold leading-tight mb-3">Berbagi Makanan, Berbagi Kebahagiaan</h2>
                <p className="mb-4 text-green-50 text-base">
                  Mari bergabung dalam misi CareBites untuk mengurangi food waste dan membantu mereka yang membutuhkan makanan bergizi.
                </p>
                <div className="flex gap-4">
                  {/* Start Donation Button */}
                  <button className="bg-white text-[#45c517] px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-50 transition-colors flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Mulai Berdonasi
                  </button>
                  {/* Learn More Button */}
                  <button className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition-colors flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Pelajari Lebih Lanjut
                  </button>
                </div>
              </div>

              {/* Right Section (Image and Stats) */}
              <div className="w-full md:w-1/2 flex justify-end mt-8 md:mt-0">
                <div className="relative">
                  {/* Background Circle */}
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
                  {/* Main Image */}
                  <img
                    src="https://img.freepik.com/free-psd/horizontal-banner-template-social-activity-charity_23-2148958503.jpg?semt=ais_hybrid"
                    alt="Berbagi Makanan"
                    className="rounded-lg shadow-xl w-96 h-64 object-cover relative z-10"
                  />
                  {/* Active Donor Counter */}
                  <div className="absolute -bottom-2 right-4 bg-white rounded-lg p-3 shadow-lg z-20">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#45c517]"></div>
                      <span className="text-sm font-medium text-gray-700">1.2K+ Donatur Aktif</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>


          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-10 mt-8 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-[#e8f7e4] p-3 rounded-full">
                  <svg className="w-6 h-6 text-[#45c517]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Kampanye</p>
                  <p className="text-2xl font-bold text-gray-800">{charityCampaigns.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-[#e8f7e4] p-3 rounded-full">
                  <svg className="w-6 h-6 text-[#45c517]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Donasi</p>
                  <p className="text-2xl font-bold text-gray-800">Rp 500 Juta</p>
                </div>
              </div>
            </div>
      

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-[#e8f7e4] p-3 rounded-full">
                  <svg className="w-6 h-6 text-[#45c517]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Penerima Manfaat</p>
                  <p className="text-2xl font-bold text-gray-800">5K+</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-[#e8f7e4] p-3 rounded-full">
                  <svg className="w-6 h-6 text-[#45c517]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Tingkat Keberhasilan</p>
                  <p className="text-2xl font-bold text-gray-800">95%</p>
                </div>
              </div>
            </div>
          </motion.div>


          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="min-h-screen my-5 mx-10 rounded-md"
          >


            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-even gap-10"
            >
              {charityCampaigns.map((lembaga, index) => (
                <motion.div
                  key={lembaga.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CharityCard
                    id={lembaga._id}
                    name={lembaga.user?.nama_user}
                    location={lembaga.lokasi}
                    image_url={lembaga.user?.avatar}
                    campaign={{
                      title: lembaga.namaGalangDana,
                      collected: lembaga.target,
                      target: lembaga.target,
                      campaign_image_url: lembaga.filename[0],
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </div>
      </section>
    </div>
  );
};

export default CharityCampaign;