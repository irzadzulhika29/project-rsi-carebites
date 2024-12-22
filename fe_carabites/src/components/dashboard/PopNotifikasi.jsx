import React, { useState } from 'react';

const Notifikasi = () => {
  const notifications = [
    {
      id: 1,
      text: 'Verifikasi Akun Anda',
      date: '12 Okt',
      source: 'System',
      detail: 'Detail notifikasi: Silahkan verifikasi akun anda.',
    },
    {
      id: 4,
      text: 'Artikel anda telah diterima ...',
      date: '12 Okt',
      source: 'System',
      detail: 'Detail notifikasi: Artikel Anda sudah selesai diproses.',
    },
  ];

  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="relative w-[303px] bg-white border border-gray-300 shadow-lg rounded-lg">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`p-4 text-gray-700 text-sm border-b border-gray-200`}
        >
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleExpand(notif.id)}
          >
            <div className="flex-1">
              <p className="truncate">{notif.text}</p>
            </div>
            <div className="ml-4 text-gray-500 text-xs text-right">
              <p>{notif.date}</p>
              <p>{notif.source}</p>
            </div>
          </div>
          {/* Detail content with animation */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              expandedId === notif.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="mt-3 text-gray-600 text-xs">{notif.detail}</div>
          </div>
        </div>
      ))}
      <div className="p-4 text-center text-blue-500 text-sm cursor-pointer hover:underline">
        Lihat Semua ...
      </div>
    </div>
  );
};

export default Notifikasi;
