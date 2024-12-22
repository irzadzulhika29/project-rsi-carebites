const ArticleCard = ({ article }) => {
    return (
        <div className='hover:cursor-pointer hover:scale-110 transition duration-300 bg-white p-3 shadow-md w-72 h-72 rounded-md overflow-hidden'>
            <div className="flex items-center gap-3 mb-3"> {/* Increased gap for better spacing */}
                <div className="border-2 border-[#45c517] rounded-full p-1"> {/* Added padding to avatar container */}
                    <img
                        src={article?.user?.avatar || '../../../../public/profile.png'}
                        alt={article?.user?.nama_user || 'user'}
                        className="w-10 h-10 object-cover rounded-full" 
                    />
                </div>
                <h1 className="text-xs font-semibold">{article?.user?.nama_user || 'user'}</h1>
            </div>

            <div className="relative w-full h-[45%]"> {/* Added relative container for the image */}
                <img
                    src={
                        Array.isArray(article?.filename) && article.filename.length > 0
                          ? article.filename[0] // Jika filename adalah array dan memiliki elemen
                          : '/profile.png'       // Fallback ke gambar default
                      }
                    className='rounded-md w-full h-full object-cover' 
                    alt="Gambar Artikel"
                />
            </div>

            <div className='mt-2'>
                <p className="text-xs text-[#3ca315]">{article.kategori}</p>
                <h1 className='font-semibold'>{article.kategori}</h1>
                <p
                    className='text-xs text-gray-600 mt-1'
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {article.konten}
                </p>
            </div>
        </div>
    );
}

export default ArticleCard;
