import axios from "axios";
import { Link } from "react-router-dom";

const CardShareMeals = ({ product, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      const confirmation = window.confirm("Apakah Anda yakin ingin menghapus produk ini?");
      if (!confirmation) return;

      // Kirim permintaan DELETE ke API
      const response = await axios.delete(`http://localhost:8085/produk/${id}`);

      if (response.status === 200) {
        alert("Produk berhasil dihapus.");
        if (onDelete) onDelete(id); // Panggil callback untuk memperbarui daftar produk
      } else {
        alert("Gagal menghapus produk. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menghapus produk:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <div className="hover:cursor-pointer w-64 bg-white shadow-md rounded-xl overflow-hidden">
      <img 
        className="object-cover w-full h-40" 
        src={product.filename[0]} 
        alt={product.nama_produk}
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 truncate">{product.nama_produk}</h3>
        <p className="text-sm mb-4">
          Sisa Stok: <span className="text-[#45c517]">{product.jumlah_produk}</span>
        </p>
        <div className="flex justify-between gap-2">
          <Link to={`/share-meals/update/${product._id}`} className="flex-1">
            <button className="w-full duration-300 transition hover:bg-green-600 bg-[#45c517] text-white py-2 rounded-lg">
              Edit
            </button>
          </Link>
          <button
            onClick={() => handleDelete(product._id)} // Hubungkan tombol dengan handleDelete
            className="flex-1 duration-300 transition hover:bg-[#45c517] hover:text-white bg-white border border-[#45c517] text-[#45c517] py-2 rounded-lg"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardShareMeals;
