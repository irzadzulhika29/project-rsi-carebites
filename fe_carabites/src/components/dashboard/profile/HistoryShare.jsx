import axios from 'axios';
import { useEffect, useState } from 'react';
import NoData from './NoData';

const HistoryShare = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        axios.get('http://localhost:8085/produk')
            .then(response => {
                // Get user data from localStorage
                const userData = JSON.parse(localStorage.getItem('user'));
                console.log(userData);

                if (userData) {
                    // Filter products related to the current user based on user ID
                    const filteredProducts = response.data.filter(product => product.user.id === userData.id);
                    setProducts(filteredProducts); // Set only products related to the current user
                }
            })
            .catch(error => {
                console.error('There was an error fetching the product data!', error);
            });
    }, []);

    if (products.length === 0) {
        return <NoData />;
    }

    return (
        <>
            {products.map((product) => {
                const { user, nama_produk, jumlah_produk, harga, filename, createdAt } = product;
                const formattedDate = new Date(createdAt).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                });

                return (
                    <div key={product._id} className="mb-4">
                        <p className="font-semibold mb-2">{formattedDate}</p>
                        <div className="flex gap-2">
                            {/* Product Image */}
                            <img 
                                className="w-32 h-20 object-cover rounded-md" 
                                src={filename[0]} 
                                alt={nama_produk} 
                            />
                            <div className="w-full flex justify-between">
                                <div className="space-y-2">
                                    <h1>{nama_produk}</h1>
                                    <p className="text-xs">{jumlah_produk} x Rp{harga.toLocaleString()}</p>
                                    <div className="flex gap-3 items-center">
                                        {/* User Avatar */}
                                        <img 
                                            className="h-5 w-5 object-cover rounded-full" 
                                            src={user.avatar} 
                                            alt={user.nama_user} 
                                        />
                                        <p>{user.nama_user}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <h1 className="text-md font-semibold">Total Harga</h1>
                                    <h1>Rp{(harga * jumlah_produk).toLocaleString()}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default HistoryShare;
