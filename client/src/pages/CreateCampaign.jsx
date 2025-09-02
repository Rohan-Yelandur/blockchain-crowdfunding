import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {ethers} from 'ethers'; // Allows for interaction with smart contract
import {money} from '../assets';
import { CustomButton, FormField, Loader } from "../components";
import {checkIfImage} from '../utils';
import { useStateContext } from "../context";

const CreateCampaign = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { createCampaign, address, connect } = useStateContext();
    const [form, setForm] = useState({
        name: '',
        title: '',
        description: '',
        target: '',
        deadline: '',
        image: ''
    });

    useEffect(() => {
        if(!address) {
            alert('Please connect your MetaMask wallet to create a campaign');
            navigate('/');
        }
    }, [address, navigate]);

    const handleFormFieldChange = (fieldName, e) => {
        setForm({...form, [fieldName]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!address) {
            alert('Please connect your MetaMask wallet to create a campaign');
            return;
        }

        checkIfImage(form.image, async(exists) => {
            if (exists) {
                setIsLoading(true);
                try {
                    await createCampaign({...form, 
                    target: ethers.utils.parseUnits(form.target, 18)});
                    setIsLoading(false);
                    navigate('/');
                } catch (error) {
                    console.log('Campaign creation error:', error);
                    alert('Something went wrong with your campaign creation. Please try again.');
                    setIsLoading(false);
                }
            } else {
                alert('Provide valid image url')
                setForm({...form, image: ''})
            }
        })
    }

    return (
        <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
            {isLoading && <Loader />}
            
            {!address ? (
                <div className="flex flex-col items-center justify-center w-full py-10">
                    <h1 className="font-epilogue font-bold text-[25px] text-white text-center mb-8">
                        Connect your wallet to create a campaign
                    </h1>
                    <CustomButton 
                        btnType="button"
                        title="Connect Wallet"
                        styles="bg-[#8c6dfd]"
                        handleClick={connect}
                    />
                </div>
            ) : (
                <>
                    <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
                        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign 🚀</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
                        <div className="flex flex-wrap gap-[40px]">
                            <FormField 
                                LabelName="Your Name *"
                                placeholder="John Doe"
                                inputType="text"
                                value={form.name}
                                handleChange={(e) => handleFormFieldChange('name', e)}
                            />
                            <FormField 
                                LabelName="Campaign Title *"
                                placeholder="Write a title"
                                inputType="text"
                                value={form.title}
                                handleChange={(e) => handleFormFieldChange('title', e)}
                            />
                        </div>

                        <FormField 
                                LabelName="Story *"
                                placeholder="Write your story"
                                isTextArea
                                value={form.description}
                                handleChange={(e) => handleFormFieldChange('description', e)}
                        />

                        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
                            <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
                            <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You get 100% of the raised amount</h4>
                        </div>

                        <div className="flex flex-wrap gap-[40px]">
                            <FormField 
                                labelName="Goal *"
                                placeholder="ETH 0.50"
                                inputType="text"
                                value={form.target}
                                handleChange={(e) => handleFormFieldChange('target', e)}
                            />
                            <FormField 
                                labelName="End Date *"
                                placeholder="End Date"
                                inputType="date"
                                value={form.deadline}
                                handleChange={(e) => handleFormFieldChange('deadline', e)}
                            />
                        </div>

                        <FormField 
                            labelName="Campaign image *"
                            placeholder="Place image URL of your campaign"
                            inputType="url"
                            value={form.image}
                            handleChange={(e) => handleFormFieldChange('image', e)}
                        />

                        <div className="flex justify-center items-center mt-[40px]">
                            <CustomButton 
                                btnType="submit"
                                title="Submit new campaign"
                                styles="bg-[#1dc071]"
                            />
                        </div>
                    </form>
                </>
            )}
        </div>
    )
}

export default CreateCampaign
