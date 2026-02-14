import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/layout/dashboard/DashboardLayout'
import SearchBarInput from '../components/inputs/SearchBarInput'
import AssetListCard from '../components/card/AssetListCard'
import { images } from '../assets'
import GeneralBtn from '../components/buttons/GeneralBtn'

const AssetsPage = () => {

    // state
    const [assets, setAssets] = useState(images)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedAsset, setSelectedAsset] = useState({})

    useEffect(() => {
        console.log(assets)
    }, [])

    // functions
    const handleAssetClick = (asset) => {

        setSelectedAsset(asset)

    }

    return (
        <DashboardLayout>
            
            {/* search bar and asset list */}
            <div
                className='flex flex-col gap-4 w-full h-full col-span-11 row-span-14 row-start-3 '
            >

                {/* assets */}
                <div
                    className='flex flex-col gap-4 w-full h-full'
                >
                    
                    {/* search bar */}
                    <div
                        className='w-full h-fit flex gap-4'
                    >
                        <SearchBarInput
                            value={searchQuery}
                            changeQuery={setSearchQuery}
                            placeholderText='Search an asset...'
                        />
                        <GeneralBtn
                            colour={'primary'}
                            icon={<svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M3 13h8v8h2v-8h8v-2h-8V3h-2v8H3z"></path></svg>}
                            name={'Asset'}
                        />
                    </div>

                    <span className='w-full min-h-px bg-accent dark:bg-dark-accent'></span>

                    <div
                        className='flex flex-col w-full h-full'
                    >
                        <div
                            className='flex flex-col w-full h-full overflow-y-scroll no-scrollbar pb-20'
                        >
                            {
                                assets.map((asset, index) => (
                                    <AssetListCard
                                        index={index}
                                        arrayLength={assets.length - 1}
                                        key={asset.id}
                                        name={asset.name}
                                        imagePath={asset.image_path}
                                        date={asset.date}
                                        type={asset.type}
                                        loadFile={() => handleAssetClick(asset)}
                                    />
                                ))
                            }
                        </div>
                    </div>

                </div>

            </div>

            {/* selected file */}
            <div
                className='row-start-3 row-span-14 col-span-5 pl-10 flex items-center justify-center'
            >
                {
                    selectedAsset !== null &&
                    <div
                        className='flex flex-col gap-4 w-full h-fit rounded-md'
                    >
                        <div
                            className='w-full h-fit flex justify-end'
                        >
                            <button
                                className='bg-rose-200 text-rose-800  dark:bg-rose-500 dark:text-rose-100 p-1.5 rounded-md'
                            >
                                <svg  xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill={"currentColor"} viewBox={"0 0 24 24"}><path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
                            </button>
                        </div>
                        <img    
                            src={selectedAsset.image_path} 
                            alt=""
                            className='aspect-video rounded-md' 
                        />
                        <div
                            className='flex flex-col gap-1 w-full h-fit'
                        >
                            <h3
                                className='text-text/80 dark:text-dark-text/80'
                            >
                                <span className='text-text font-medium dark:text-dark-text'>Name: </span>
                                {selectedAsset.name}
                            </h3>
                            <h3
                                className='text-text/80 dark:text-dark-text/80'
                            >
                                <span className='text-text font-medium dark:text-dark-text'>Type: </span>
                                {selectedAsset.type}
                            </h3>
                            <h3
                                className='text-text/80 dark:text-dark-text/80'
                            >
                                <span className='text-text font-medium dark:text-dark-text'>Date: </span>
                                {selectedAsset.date}
                            </h3>
                        </div>
                    </div>
                }
            </div>

        </DashboardLayout>
    )
}

export default AssetsPage