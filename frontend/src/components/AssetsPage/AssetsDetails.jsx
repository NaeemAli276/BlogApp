import React, { useEffect, useState } from 'react'
import SemiCircleProgress from '../AssetsPage/SemiCircleProgress'
import SmallFileCard from './SmallFileCard'
import FileUploadInput from '../inputs/FileUploadInput'

const AssetsDetails = ({ files, handleFileUpload }) => {

    const [recentFiles, setRecentFiles] = useState([
        {
            name: 'File 1',
            fileType: 'image',
            usedAmount: 2,
            size: 270
        },
        {
            name: 'File 2',
            fileType: 'image',
            usedAmount: 3,
            size: 320 
        },
        {
            name: 'File 3',
            fileType: 'image',
            usedAmount: 1,
            size: 320
        },

    ]) // gets the recent assets based on their timestamps    

    return (
        <div
            className='bg-background rounded shadow shadow-text/50 col-span-4 row-span-full col-start-13 flex flex-col gap-10 w-full h-full p-3'
        >
            
            {/* total storage */}
            <div
                className='flex flex-col gap-4 w-full h-fit'
            >
                <h2
                    className='text-text/70 text-sm'
                >
                    Storage:
                </h2>
                <SemiCircleProgress
                    currentAmount={1.5}
                    totalAmount={5}
                    strokeWidth={8}
                    color='#0a5299'
                />
            </div>

            {/* recent files */}
            <div
                className='flex flex-col gap-4 w-full h-full'
            >

                <h2
                    className='text-text/70 text-sm'
                >
                    Recent uploads:
                </h2>

                <div
                    className='flex flex-col gap-2 w-full h-full '
                >
                    {
                        recentFiles.map((file) => (
                            <SmallFileCard
                                key={file.name}
                                filetype={file.fileType}
                                name={file.name}
                                usedAmount={file.usedAmount}
                                size={file.size}
                            />
                        ))
                    }
                </div>

            </div>

            {/* import files */}
            <div
                className='w-full h-full flex items-end justify-end'
            >
                <FileUploadInput
                    onFileUpload={handleFileUpload}
                />
            </div>

        </div>
    )
}

export default AssetsDetails