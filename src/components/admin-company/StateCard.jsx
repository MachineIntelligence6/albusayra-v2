import { Check } from 'lucide-react';
import React from 'react'

const states = [
    {
        img: "",
        name: "Total Users",
        count: 50,
        color: '#01AB9C',
    },
    {
        img: "",
        name: "Active Users",
        count: 50,
        color: '#CA4F8E'
    },
    {
        img: "",
        name: "Inactive Users",
        count: 50,
        color: '#FFAC30'
    },
];
const StateCard = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[20px]">
            {states?.map((state, idx) => {
                return (
                    <div
                        className="w-[380px] flex flex-col bg-[#01AB9C] rounded-[25px] py-[20px] px-[30px]"
                        key={idx}
                        style={{ backgroundColor: state?.color }}
                    >
                        <div className="flex flex-col">
                            <div className="bg-[#FFFFFF] rounded-[6px] w-[40px] h-[40px] flex items-center justify-center">
                                <div className="rounded-full border-[1px] border-[#01AB9C] flex justify-center items-center  w-[21px] h-[21px]">
                                    <Check className='text-[#01AB9C] w-[10px] h-[10px]' />
                                </div>
                            </div>
                            <div className="text-white">{state?.name}</div>
                        </div>
                        <div className='font-bold text-[35px] leading-[41px] text-end w-full text-white'>{state.count} </div>
                    </div>
                );
            })}
        </div>
    )
}

export default StateCard
