import React, { useState, useRef } from "react";

const FileUploadInput = ({ onFileUpload }) => {

  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    console.log(file)
    onFileUpload(file)
  }

  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    console.log(file)
    onFileUpload(file)
  }

  return (
    <div
      className="w-full h-fit flex"
    >
      <div
        className={`flex flex-col gap-2 w-full h-full min-h-32 rounded bg-background border-2 border-dashed border-text/50 relative items-center justify-center cursor-pointer hover:border-primary hover:bg-text/5 duration-200 ${isDragging && 'bg-text/5 border-primary'}`}
        onClick={triggerFileInput}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <svg className="bg-accent text-background rounded-full p-1" xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M13 16V7.41l4.29 4.3 1.42-1.42L12 3.59l-6.71 6.7 1.42 1.42L11 7.41V16zm-9 2h16v2H4z"></path></svg>
        <h2
          className="text-text/70 text-sm"
        >
          Upload image
        </h2>
      </div>
      <input 
        className="hidden outline-none" 
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUploadInput;
