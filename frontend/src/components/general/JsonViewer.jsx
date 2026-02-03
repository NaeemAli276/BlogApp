import React from 'react'
import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';
import { githubLightTheme } from '@uiw/react-json-view/githubLight';
import { githubDarkTheme } from '@uiw/react-json-view/githubDark';
import { useTheme } from '../../Context/ThemeContext';

const JsonViewer = ({ data }) => {

    const { isDarkMode } = useTheme()

    const darkTheme = {
        ...githubDarkTheme, // Start with original theme as base
        // Purple accent colors
        '--w-rjv-color': '#d9b8ff', // Main text color (light purple)
        '--w-rjv-key-color': '#c586c0', // Key color (muted purple)
        '--w-rjv-type-string-color': '#ce9178', // Keep original orange for strings
        '--w-rjv-type-int-color': '#b5cea8', // Keep original green for numbers
        '--w-rjv-type-boolean-color': '#569cd6', // Keep original blue for booleans
        '--w-rjv-type-null-color': '#d16969', // Keep original red for null
        '--w-rjv-arrow-color': '#bb9af7', // Collapse arrow color (purple)
        '--w-rjv-curlybraces-color': '#bb9af7', // Curly braces color
        '--w-rjv-colon-color': '#c586c0', // Colon color
        '--w-rjv-quotes-color': '#c586c0', // Quote marks color
        
        // Background and line colors with purple tint
        '--w-rjv-background-color': '#cac6fb', // Dark purple-ish background
        '--w-rjv-line-color': '#2a2438', // Line separator (darker purple)
        '--w-rjv-arrow-size': '15px', // Optional: Adjust arrow size
    };

    return (
        <JsonView
            value={data}
            style={isDarkMode ? darkTheme : githubLightTheme}
            className='w-full rounded p-3 overflow-y-scroll flex flex-col h-full pb-10'
        />
    )
}

export default JsonViewer