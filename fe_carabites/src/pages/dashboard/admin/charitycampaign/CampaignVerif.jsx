import { useState, useEffect } from "react";
import { motion } from "framer-motion"; 
import SidebarAdmin from "../../../../components/dashboard/admin/SidebarAdmin";
import NavbarAdmin from "../../../../components/dashboard/admin/NavbarAdmin";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CampaignVerif = () => {
  const [activeTab, setActiveTab] = useState("Draft");
  const [campaigns, setCampaigns] = useState({ Draft: [], Accepted: [], Rejected: [] });
  const navigate = useNavigate();

  const handleDetailClick = (campaign) => {
    navigate(`/campaign-detail-verif/${campaign._id}`, {
      state: {
        status: activeTab,
        showButtons: activeTab !== "Rejected",
      },
    });
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get("http://localhost:8085/penggalangan");
        const data = response.data;

        // Filter campaigns berdasarkan status
        const filteredCampaigns = {
          Draft: data.filter((item) => item.is_verif === '0'),
          Accepted: data.filter((item) => item.is_verif === '1'),
          Rejected: data.filter((item) => item.is_verif === '2'),
        };

        setCampaigns(filteredCampaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  const tabVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <div className="flex min-h-screen">
      <SidebarAdmin />

      <section className="bg-[#f4fef1] w-full pl-60 pt-20">
        <div className="flex-grow">
          <NavbarAdmin />
          <h1 className="mt-5 mx-10 text-2xl text-[#45c517] font-bold">
            Verifikasi Charity
          </h1>

          <motion.section
            className="min-h-screen mx-10 my-5 p-5 rounded-xl bg-white shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Tabs */}
            <div className="font-semibold flex gap-7">
              {["Draft", "Accepted", "Rejected"].map((tab) => (
                <motion.p
                  key={tab}
                  className={`cursor-pointer ${
                    activeTab === tab
                      ? "border-b-[2px] border-[#45c517] text-[#45c517]"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(tab)}
                  variants={tabVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                >
                  {tab}
                </motion.p>
              ))}
            </div>

            {/* Table */}
            <motion.div
              className="p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <table className="table-fixed w-full border-collapse">
                <thead>
                  <tr className="text-left">
                    <th className="px-4 py-2 font-semibold w-2/6">Username</th>
                    <th className="px-4 py-2 font-semibold w-1/6">ID</th>
                    <th className="px-4 py-2 font-semibold w-1/6">Kategori</th>
                    <th className="px-4 py-2 font-semibold w-1/4">
                      Judul Charity
                    </th>
                  </tr>
                </thead>
                <motion.tbody>
                  {campaigns[activeTab]?.map((campaign, index) => (
                    <motion.tr
                      key={index}
                      className="hover:bg-gray-100 border-b"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                    >
                      <td className="px-4 py-2 flex items-center gap-3">
                        <img
                          src={campaign.avatar}
                          alt="Profile"
                          className="w-10 h-10 rounded-full"
                        />
                        <span className="block truncate">{campaign.user.nama_user}</span>
                      </td>
                      <td className="px-4 py-2">{campaign._id}</td>
                      <td className="px-4 py-2">{campaign.kategori}</td>
                      <td className="px-4 py-2">
                        <span className="block truncate">
                          {campaign.namaGalangDana}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-right">
                        {activeTab !== "Rejected" ? (
                          <motion.button
                            onClick={() => handleDetailClick(campaign)}
                            className="bg-[#45c517] text-white w-32 py-2 rounded-full hover:opacity-90 text-sm font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Lihat Detail
                          </motion.button>
                        ) : (
                          <span className="text-gray-500">Rejected</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </motion.div>
          </motion.section>
        </div>
      </section>
    </div>
  );
};

export default CampaignVerif;
