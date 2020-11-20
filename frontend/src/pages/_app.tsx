import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import 'react-multi-carousel/lib/styles.css';
import GlobalStyle from '../styles/global';
import theme from '../styles/theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>   
      <ThemeProvider theme={theme}>
        
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover 
        />
        <GlobalStyle />
      </ThemeProvider>   
    </>
  );
};

export default MyApp;
