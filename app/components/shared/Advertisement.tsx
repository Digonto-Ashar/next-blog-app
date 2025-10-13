'use client';

import Image from 'next/image';

const Advertisement = () => {
  return (
    <section className="sticky top-24">

      <div className="max-w-[280px] mx-auto">
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="block border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
        >
          <div className="p-2.5"> {/* Reduced padding */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-bold text-gray-700">Stellar Hosting</h3>
              <span className="text-[10px] text-gray-400">Ad</span>
            </div>
            
            <div className="relative w-full aspect-[3/2] rounded-md overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="Advertisement for a cloud hosting service"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            <p className="text-xs text-gray-600 mt-2 mb-2">
              Power your projects with the fastest and most reliable cloud infrastructure.
            </p>
            
            <div className="bg-blue-600 text-white text-center font-semibold py-1.5 px-3 text-xs rounded-md w-full transition-colors hover:bg-blue-700">
              Learn More
            </div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Advertisement;
