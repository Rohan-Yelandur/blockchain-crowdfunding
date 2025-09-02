import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import FundCard from './FundCard';
import { loader } from '../assets';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }
  
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-[20px]">
        {isLoading && (
          <div className="col-span-full flex justify-center">
            <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
          </div>
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="col-span-full font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183] text-center">
            You have not created any campaigns yet
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => (
          <div className="flex justify-center" key={uuidv4()}>
            <FundCard 
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DisplayCampaigns