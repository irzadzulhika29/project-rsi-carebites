import { useState, useEffect } from "react";
import SidebarAdmin from "../../../../components/dashboard/admin/SidebarAdmin";
import NavbarAdmin from "../../../../components/dashboard/admin/NavbarAdmin";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BlogArticleVerif = () => {
    const [activeTab, setActiveTab] = useState("Draft");
    const [articles, setArticles] = useState({ Draft: [], Accepted: [], Rejected: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get("http://localhost:8085/postingan");
                const data = response.data;

                // Filter articles berdasarkan status
                const groupedArticles = {
                    Draft: data.filter(article => article.is_verif === 0 || article.is_verif === '0'),
                    Accepted: data.filter(article => article.is_verif === 1 || article.is_verif === '1'),
                    Rejected: data.filter(article => article.is_verif === 2 || article.is_verif === '2'),
                };
                console.log(groupedArticles);
                

                setArticles(groupedArticles);
                setLoading(false);
            } catch (err) {
                setError("Gagal memuat data artikel");
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const handleDetailClick = (article) => {
        navigate(`/article-detail-verif/${article.id}`, {
            state: {
                status: activeTab,
                showButtons: activeTab !== "Rejected",
            },
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;    
    
    return (
        <div className="flex min-h-screen">
            <SidebarAdmin />

            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <NavbarAdmin />
                    <h1 className="mt-5 mx-10 text-2xl font-bold text-[#45c517]">
                        Verifikasi Blog & Article
                    </h1>

                    <section className="min-h-screen mx-10 my-5 p-5 rounded-md bg-white shadow-md">
                        {/* Tabs */}
                        <div className="font-semibold flex gap-7">
                            {["Draft", "Accepted", "Rejected"].map((tab) => (
                                <p
                                    key={tab}
                                    className={`cursor-pointer ${
                                        activeTab === tab
                                            ? "border-b-[2px] border-[#45c517] text-[#45c517]"
                                            : "text-gray-500"
                                    }`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </p>
                            ))}
                        </div>

                        {/* Table */}
                        <div className="p-4">
                            <table className="table-fixed w-full border-collapse">
                                <thead>
                                    <tr className="text-left">
                                        <th className="px-4 py-2 font-semibold w-2/6">Author</th>
                                        <th className="px-4 py-2 font-semibold w-1/6">ID</th>
                                        <th className="px-4 py-2 font-semibold w-1/6">Kategori</th>
                                        <th className="px-4 py-2 font-semibold w-1/4">Judul Artikel</th>
                                        <th className="px-4 py-2 font-semibold w-1/6 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {articles[activeTab].map((article, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2 flex items-center gap-3">
                                                <img
                                                    src={article?.user?.avatar || "/placeholder-avatar.jpg"}
                                                    alt="Profile"
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <span className="block truncate">{article?.user?.nama_user}</span>
                                            </td>
                                            <td className="px-4 py-2">{article.id}</td>
                                            <td className="px-4 py-2">{article.kategori}</td>
                                            <td className="px-4 py-2">
                                                <span className="block truncate">{article.judul}</span>
                                            </td>
                                            <td className="px-4 py-2 text-right">
                                                {activeTab !== "Rejected" ? (
                                                    <button
                                                        onClick={() => handleDetailClick(article)}
                                                        className="bg-[#45c517] text-white w-32 py-2 rounded-full hover:opacity-90 text-sm font-medium"
                                                    >
                                                        Lihat Detail
                                                    </button>
                                                ) : (
                                                    <span className="text-red-500">Rejected</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default BlogArticleVerif;
