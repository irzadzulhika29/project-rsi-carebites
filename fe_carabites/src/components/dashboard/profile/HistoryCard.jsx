import axios from 'axios';
import { useEffect, useState } from 'react';
import NoData from './NoData';


const HistoryCard = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        axios.get('http://localhost:8085/transaksi')
            .then(response => {
                // Get user data from localStorage
                const userData = JSON.parse(localStorage.getItem('user'));
                console.log(userData);

                if (userData) {
                    const filteredTransactions = response.data.filter(transaction => transaction.user._id === userData.id);
                    setTransactions(filteredTransactions); // Set only transactions related to the current user
                }
            })
            .catch(error => {
                console.error('There was an error fetching the transaction data!', error);
            });
    }, []);

    // Return NoData component if there are no transactions
    if (transactions.length === 0) {
        return <NoData />;
    }

    return (
        <>
            {transactions.map((transaction) => {
                const { user, produk, jumlah_produk, createdAt } = transaction;
                const formattedDate = new Date(createdAt).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                });

                return (
                    <div key={transaction.id} className="mb-4">
                        <p className="font-semibold mb-2">{formattedDate}</p>
                        <div className="flex gap-2">
                            {/* Product Image */}
                            <img 
                                className="w-32 h-20 object-cover rounded-md" 
                                src={produk.filename[0]} 
                                alt={produk.nama_produk} 
                            />
                            <div className="w-full flex justify-between">
                                <div className="space-y-2">
                                    <h1>{produk.nama_produk}</h1>
                                    <p className="text-xs">{jumlah_produk} x Rp{produk.harga.toLocaleString()}</p>
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
                                    <h1>Rp{(produk.harga * jumlah_produk).toLocaleString()}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default HistoryCard;
