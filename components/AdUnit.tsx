import React from 'react';

const AdUnit: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-4 bg-gray-100 dark:bg-dark-card rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 min-h-[90px] text-gray-500 text-sm">
      <p className="mb-2">Google Ad Space</p>
      <div className="hidden md:block w-[728px] h-[90px] bg-gray-200 dark:bg-gray-800 flex items-center justify-center rounded">
        728 x 90 Leaderboard
      </div>
      <div className="block md:hidden w-[320px] h-[50px] bg-gray-200 dark:bg-gray-800 flex items-center justify-center rounded">
        320 x 50 Mobile Banner
      </div>
    </div>
  );
};

export default AdUnit;
