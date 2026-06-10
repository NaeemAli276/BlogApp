import React, { useState } from 'react'
import DashboardLayout from '../../components/Layout/DashboardLayout'
import AssetsDetails from '../../components/AssetsPage/AssetsDetails'
import FileViewer from '../../components/AssetsPage/FileViewer'

const UserAssets = () => {

    const [files, setFiles] = useState([]) // the data from backend
    const [filteredFiles, setFilteredFiles] = useState(files) 

    // allows users to upload files
    const handleFileUpload = (file) => {
            if (file) {
                setFiles([
                    ...files,
                    file
                ])
            }
    }

    // filters the file based on the option
    const handleFilteringFiles = (option) => {

    }

    return (
        <DashboardLayout>
            
            {/* allows users to view the current storage, recent uploads and upload photos input */}
            <AssetsDetails
                files={files}
                handleFileUpload={handleFileUpload}
            />

            {/* view all the files and filter them */}
            <FileViewer
                handleFilteringFiles={handleFilteringFiles}
                files={files}
            />


        </DashboardLayout>
    )
}

export default UserAssets