'use client';

import React from 'react';

interface InfoCardProps {
  role: string;
  name: string;
  sector: string;
  material: string;
  baseUnit: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ role, name, sector, material, baseUnit }) => {
  return (
    <div className="w-full bg-[#E4E4E7] p-[1%] shadow-2xl relative">
      {/* Corner decorations for tech feel - Aspect preserved */}
      <div className="absolute top-0 left-0 w-[2%] min-w-[4px] aspect-square border-t-2 border-l-2 border-zinc-400"></div>
      <div className="absolute top-0 right-0 w-[2%] min-w-[4px] aspect-square border-t-2 border-r-2 border-zinc-400"></div>
      <div className="absolute bottom-0 left-0 w-[2%] min-w-[4px] aspect-square border-b-2 border-l-2 border-zinc-400"></div>
      <div className="absolute bottom-0 right-0 w-[2%] min-w-[4px] aspect-square border-b-2 border-r-2 border-zinc-400"></div>

      <div className="border border-zinc-500 flex flex-col">
        {/* Header Row */}
        <div className="border-b border-zinc-500 p-[2%] pb-[1%] bg-zinc-200/30">
          <h2 className="text-zinc-900 font-mono font-bold text-[clamp(0.6rem,2vw,1.1rem)] uppercase tracking-tight leading-none">
            {role}
          </h2>
        </div>

        {/* Content Body */}
        <div className="flex bg-[#E4E4E7]">
          {/* Left Side Info */}
          <div className="flex-1 flex flex-col font-mono text-zinc-900">
            {/* Name Row */}
            <div className="flex border-b border-zinc-500">
              <div className="flex-1 p-[1%] pl-[2%] flex flex-col justify-center">
                <span className="text-[clamp(0.4rem,1.2vw,0.56rem)] uppercase font-bold text-zinc-500 leading-tight mb-[0.2%]">Nome</span>
                <span className="text-[clamp(0.65rem,2.2vw,1.1rem)] font-bold uppercase leading-none tracking-tight">{name}</span>
              </div>
              <div className="w-[20%] min-w-[38px] p-[1%] flex flex-col justify-center pl-[2%]">
                <span className="text-[clamp(0.4rem,1.2vw,0.56rem)] uppercase font-bold text-zinc-500 leading-tight mb-[0.2%]">Exp</span>
                <span className="text-[clamp(0.65rem,2.2vw,1.1rem)] font-bold uppercase leading-none">{sector}</span>
              </div>
            </div>
            {/* Material/Unit Row */}
            <div className="flex h-[10%] min-h-[24px]">
              <div className="flex-1 p-[1%] pl-[2%] flex flex-col justify-center border-r border-zinc-500">
                <span className="text-[clamp(0.4rem,1.2vw,0.56rem)] uppercase font-bold text-zinc-500 leading-tight mb-[0.2%]">Material</span>
                <span className="text-[clamp(0.55rem,1.8vw,0.9rem)] font-bold uppercase leading-none tracking-wider">{material}</span>
              </div>
              <div className="flex-[1.2] p-[1%] pl-[2%] flex flex-col justify-center">
                <span className="text-[clamp(0.4rem,1.2vw,0.56rem)] uppercase font-bold text-zinc-500 leading-tight mb-[0.2%]">Base Unit</span>
                <span className="text-[clamp(0.55rem,1.8vw,0.9rem)] font-bold uppercase leading-none tracking-wider">{baseUnit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
