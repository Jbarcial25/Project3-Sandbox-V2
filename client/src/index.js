import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);

// ReactDOM.render(
//     <React.StrictMode>
//         <BrowserRouter>
//             <ChakraProvider>
//                 <ColorModeScript initialColorMode='dark'></ColorModeScript>
//                 <App />
//             </ChakraProvider> 
//         </BrowserRouter>
//     </React.StrictMode>,
//     document.getElementById('root')
// );

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ChakraProvider>
                <ColorModeScript initialColorMode='dark'></ColorModeScript>
                <App />
            </ChakraProvider> 
        </BrowserRouter>
    </React.StrictMode>
);