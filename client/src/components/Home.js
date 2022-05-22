import React, {useEffect, useState} from 'react';

const Home = ({plan, setAuth}) => {
    const [currentPlan, setCurrentPlan] = useState(plan);
    console.log(plan);
    const changePlan = (val) => {
        setCurrentPlan(val);
        populateQuote(val);
    };
    async function populateQuote(newplan) {
        const req = await fetch('http://localhost:3001/api/plan', {
            method: 'POST',
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({plan: newplan}),
        });

        const data = await req.json();
        console.log(data);
    }

    async function getPlan() {
        const req = await fetch('http://localhost:3001/api/plan', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        });

        const data = await req.json();
        console.log(data);
        if (data.status === 'ok') {
            setCurrentPlan(data.plan);
        } else {
            alert(data.error);
        }
    }

    useEffect(() => {
        getPlan();
    }, []);
    const signOut = () => {
        setAuth(true);
        localStorage.removeItem('token');
    };
    return (
        <>
            <div className='max-h-screen w-screen'>
                <div className='mt-10 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:mt-10'>
                    <div className='max-w-md mx-auto lg:max-w-5xl'>
                        <div className='rounded-lg bg-gray-100 px-6 py-8 sm:p-10 lg:flex lg:items-center'>
                            <div className='flex-1'>
                                <div className='text-2xl text-gray-600'>Your Current current Plan</div>
                            </div>
                            <div className='rounded-md  lg:mt-0 lg:ml-10 lg:flex-shrink-0 space-y-4'>
                                <p className='flex items-center justify-center px-5 py-3 border border-solid text-base font-medium rounded-md text-gray-900 bg-white min-w-[150px]'>{currentPlan || plan}</p>
                                <p className='flex items-center shadow-md justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-red-200 hover:bg-red-400 min-w-[150px]' onClick={() => signOut()}>
                                    Sign Out
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {['Silver', 'Gold', 'Diamond'].includes(currentPlan || plan) && (
                    <div className='max-w-5xl mx-auto py-10 px-4 bg-white sm:px-6 lg:px-8'>
                        <h2 className='text-3xl text-center uppercase font-extrabold text-gray-900 sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl'>Upgrade your current Plan</h2>

                        {/* Tiers */}

                        <div className='mt-10 space-y-12 lg:space-y-0 flex max-w-full justify-center lg:gap-x-8'>
                            {['Silver'].includes(currentPlan || plan) && (
                                <div className='relative p-8 bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col max-w-[300px] basis-[300px] '>
                                    <h3 className='text-center text-3xl font-semibold text-gray-900'>Gold</h3>

                                    <p className='bg-indigo-50 text-indigo-700 hover:text-white hover:bg-[#FFD700] mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium' onClick={() => changePlan('Gold')}>
                                        Upgrade
                                    </p>
                                </div>
                            )}
                            {['Silver', 'Gold'].includes(currentPlan || plan) && (
                                <div className='relative p-8 bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col max-w-[300px] basis-[300px]'>
                                    <h3 className='text-center text-3xl font-semibold text-gray-900'>Diamond</h3>

                                    <p className='bg-indigo-50 text-indigo-700 hover:text-white hover:bg-[#5aadff] mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium' onClick={() => changePlan('Diamond')}>
                                        Upgrade
                                    </p>
                                </div>
                            )}
                            {['Silver', 'Gold', 'Diamond'].includes(currentPlan || plan) && (
                                <div className='relative p-8 bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col max-w-[300px] basis-[300px]'>
                                    <h3 className='text-center text-3xl font-semibold text-gray-900'>Platinum</h3>

                                    <p className='bg-indigo-50 text-indigo-700 hover:text-white hover:bg-gray-400 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium' onClick={() => changePlan('Platinum')}>
                                        Upgrade
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
