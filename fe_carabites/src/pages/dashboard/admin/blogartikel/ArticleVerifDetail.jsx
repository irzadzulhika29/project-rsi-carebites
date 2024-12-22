
import Navbar from '../../../../components/dashboard/Navbar';
import SidebarAdmin from "../../../../components/dashboard/admin/SidebarAdmin";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

const ArticleVerifDetail = () => {
    const { id } = useParams();
    const location = useLocation();

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:8085/postingan/${id}`);
                const articleData = response.data;

                // Tambahkan status berdasarkan `is_verif`
                articleData.status = articleData.is_verif === "0"
                    ? "Pending"
                    : articleData.is_verif === "1"
                        ? "Approved"
                        : "Rejected";

                setArticle(articleData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    const handleVerification = (status) => {
        
        const param = {
            id: id,        
            is_verif: status  
        };    
        
        function updateArticle() {
            const url = 'http://localhost:8085/postingan-verif';  
            axios.put(url, param)  
                .then(response => {
                    setArticle(response.data);  
                    alert('Verification status updated successfully');
                    window.location.reload();
                })
                .catch(error => {
                    alert('There was an error making the request');
                });
        }
            
        updateArticle();                   
    };

    const showButtons = location.state?.showButtons ?? true;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!article) return <div>Article not found</div>;

    return (
        <div className="flex min-h-screen">
            <SidebarAdmin />
            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <Navbar />
                    <div className="mx-10 mt-5 gap-4 flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            fill="currentColor"
                            className="text-green-500 hover:cursor-pointer bi bi-arrow-left-short"
                            viewBox="0 0 16 16"
                            onClick={() => window.history.back()}
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
                            />
                        </svg>
                        <h1 className="text-2xl font-bold text-[#45c517]">Detail Article</h1>
                    </div>

                    <section className="mx-10 my-5 bg-white rounded-xl shadow-md p-6">
                        {/* Gambar Article */}
                        <img
                            src={article.filename?.[0] || "/placeholder.jpg"}
                            alt={article.judul || "Gambar tidak tersedia"}
                            className="w-full h-64 object-cover rounded-xl mb-6"
                        />

                        {/* Informasi Article */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Author
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={article.user?.avatar || "/placeholder-avatar.jpg"}
                                            alt={article.user?.nama_user || "Nama tidak tersedia"}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <span className="text-gray-800">{article.user?.nama_user || "-"}</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Title
                                    </label>
                                    <input
                                        value={article.judul || "-"}
                                        className="w-full rounded-lg border-2 border-green-200 px-4 py-2 bg-gray-50"
                                        readOnly
                                    />
                                </div>

                               
                            </div>

                            <div className="space-y-4">                                

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Tanggal Pembuatan
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            value={article.createdAt ? new Date(article.createdAt).toLocaleDateString("id-ID") : "-"}
                                            className="w-full rounded-lg border-2 border-green-200 px-4 py-2 bg-gray-50"
                                            readOnly
                                        />                                        
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Kategori
                                    </label>
                                    <input
                                        value={article.kategori || "-"}
                                        className="w-full rounded-lg border-2 border-green-200 px-4 py-2 bg-gray-50"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Deskripsi */}
                        <div className="mt-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Konten
                            </label>
                            <textarea
                                value={article.Konten || "Deskripsi tidak tersedia"}
                                className="w-full rounded-lg border-2 border-green-200 px-4 py-2 bg-gray-50 min-h-[100px]"
                                readOnly
                            />
                        </div>

                        {/* Status */}
                        <div className="mt-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Status Article
                            </label>
                            <div
                                className={`inline-block px-4 py-2 rounded-full ${article.status === "Rejected"
                                        ? "bg-red-100 text-red-600"
                                        : article.status === "Approved"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-yellow-100 text-yellow-600"
                                    }`}
                            >
                                {article.status}
                            </div>
                        </div>

                        {/* Tombol Aksi */}
                        <div className="border-t pt-6 flex justify-end space-x-4">
                                    {article.is_verif === '0' && (
                                        <>
                                            <button
                                                onClick={() => handleVerification('2')}
                                                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                            >
                                                Tolak Verifikasi
                                            </button>
                                            <button
                                                onClick={() => handleVerification('1')}
                                                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                            >
                                                Terima Verifikasi
                                            </button>
                                        </>
                                    )}                                

                            {!showButtons && (
                                <div className="text-gray-500 italic">
                                    Article ini telah ditolak
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
};


export default ArticleVerifDetail
