import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Sidebar from "../../../components/dashboard/Sidebar";
import Navbar from "../../../components/dashboard/Navbar";
import MiniCardArticle from "../../../components/dashboard/article/MiniCardArticle";

const ArticleDetail = () => {
    const { id } = useParams();  
    const [article, setArticle] = useState(null);  
    const [loading, setLoading] = useState(true);  

    useEffect(() => {
        
        axios.get(`http://localhost:8085/postingan/${id}`)
            .then((response) => {
                setArticle(response.data);  
                setLoading(false);  
            })
            .catch((error) => {
                console.error("Error fetching article:", error);
                setLoading(false);  
            });
    }, [id]);  

    if (loading) {
        return <div>Loading...</div>;  
    }

    if (!article) {
        return <div>Artikel tidak ditemukan</div>;  
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <Navbar />
                

                    <section className="min-h-screen mx-10 mt-10">
                        <div className="flex gap-5 relative">
                            {/* Main Article Content - Scrollable */}
                            <div className="p-8 rounded-md bg-white shadow-md w-[70%]">
                                <p className="text-2xl font-bold">{article.judul}</p>
                                <div className="flex gap-3 items-center my-3">
                                    <img
                                        className="rounded-full border-2 border-[#45c517] w-8 h-8 object-cover"
                                        src={article?.user?.avatar || '../../../../public/profile.png'} // Gunakan default avatar jika avatar kosong
                                        alt={article?.user?.nama_user || "User"}
                                    />
                                    <div>
                                        <p className="font-semibold">{article?.user?.user || "User"}</p>
                                        <span className="text-xs">                                            
                                            {new Date(article.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <img
                                        className="w-full h-80 object-cover block"
                                        src={article.filename ? article.filename[0] : "default-image.png"}  // Menampilkan gambar pertama
                                        alt={article.judul}
                                    />
                                    <p className="mt-5 text-md whitespace-pre-wrap">
                                        {article.konten}
                                    </p>
                                </div>
                            </div>

                            {/* Sticky Sidebar */}
                            <div className="w-[30%]">
                                <div className="sticky top-24 bg-white rounded-md">
                                    <MiniCardArticle />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default ArticleDetail;
