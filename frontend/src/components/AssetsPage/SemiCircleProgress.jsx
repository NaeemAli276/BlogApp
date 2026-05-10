import React, { useState, useEffect } from 'react';

const SemiCircleProgress = ({
    totalAmount,
    currentAmount,
    size = 200,
    strokeWidth = 12,
    color = '#3b82f6',
    backgroundColor = '#e5e7eb',
    children,
    }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
        setProgress(currentAmount / totalAmount);
        }, 100);
        return () => clearTimeout(timer);
    }, [totalAmount, currentAmount]);

    // Calculate dimensions for semi-circle only
    const radius = (size - strokeWidth) / 2;
    const circumference = Math.PI * radius; // Half circle circumference
    const offset = circumference - (progress) * circumference;
    
    // Height is exactly half of width for semi-circle
    const height = size / 2;
    const viewBoxHeight = height + strokeWidth;

    // Center point coordinates
    const centerX = size / 2;
    const centerY = height;

    return (
        <div className="relative inline-flex flex-col items-center justify-center">
            <svg
                width={size}
                height={height + strokeWidth}
                viewBox={`0 0 ${size} ${height + strokeWidth}`}
                className="overflow-visible"
            >
                {/* Background semi-circle arc - starts at left, ends at right */}
                <path
                d={`M ${strokeWidth / 2} ${centerY} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${centerY}`}
                fill="none"
                stroke={backgroundColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                />
                
                {/* Progress arc - grows from left to right */}
                <path
                d={`M ${strokeWidth / 2} ${centerY} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${centerY}`}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{
                    transition: 'stroke-dashoffset 0.5s ease-in-out',
                }}
                />
            </svg>
            
            {/* Center content */}
            <div
                className="absolute flex flex-col items-center justify-center text-center "
                style={{
                width: size - strokeWidth * 2,
                //   bottom: strokeWidth,
                //   left: strokeWidth,
                height: height - strokeWidth,
                }}
            >
                {children !== undefined ? children : (
                <>
                    <span className="text-2xl font-bold w-full" style={{ color }}>
                    {currentAmount}GB
                    </span>
                    <span className="text-xs text-gray-500">Total storage {totalAmount}GB</span>
                </>
                )}
            </div>
        </div>
    );
};

export default SemiCircleProgress