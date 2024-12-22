import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`}>
            <div className="hover:scale-110 transition duration-300 hover:cursor-pointer w-52 bg-white rounded-md shadow-md">
                <div className="flex items-start">
                    <div className="p-2 w-full">
                        <div className='flex gap-3 mb-3 items-center'>
                            <img src={product?.user?.avatar || '../../../../public/profile.png' } alt={product?.user?.avatar || '../../../../public/profile.png' } className="w-6 h-6 object-cover block rounded-full" />
                            <h1 className="text-xs font-semibold">{product?.user?.nama_user}</h1>
                        </div>

                        <img
                            className="rounded w-full h-28 mb-3 object-cover"
                            src={
                                Array.isArray(product?.filename) && product.filename.length > 0
                                  ? product.filename[0] // Jika filename adalah array dan memiliki elemen
                                  : '/profile.png'       // Fallback ke gambar default
                              }
                            alt={product.nama_produk}
                        />
                        <h1 className="font-bold">{product.nama_produk}</h1>
                        <h1 className="mb-2 text-xs">{product.alamat}</h1>
                        <h1 className="text-md font-bold">Rp{Number(product.harga).toLocaleString('id-ID')}</h1>

                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
