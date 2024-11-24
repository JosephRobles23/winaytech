import React from 'react';

export default function RightSidebar() {
  const ads = [
    {
      title: "Floristería Bella Rosa ",
      subtitle: "bellarosa.com",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK-32SaF66e8zPa_hdy6BBkSmqfgYOEcvXFg&s"
    },
    {
      title: "Pastelería Ernesto",
      subtitle: "ernesto.com",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF79NCEbhsH4Y2EJicKKVtf2gcyTwWjPbzaHT5YpmcktdIxG-7HWXhVfRtElAIX-hCtIU"
    }
  ];

  return (
    <div className="fixed right-0 top-16 w-64 h-[calc(100vh-4rem)] border-l border-gray-200 bg-white p-4">
      <h3 className="font-semibold text-gray-500 mb-4">Lo más destacato</h3>
      <div className="space-y-4">
        {ads.map((ad, index) => (
          <div key={index} className="rounded-lg overflow-hidden border border-gray-200">
            <img src={ad.image} alt={ad.title} className="w-full h-32 object-cover" />
            <div className="p-3">
              <h4 className="font-semibold">{ad.title}</h4>
              <p className="text-sm text-gray-500">{ad.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}