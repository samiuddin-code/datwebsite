import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import '@/sass/public.scss'
import { GlobalProvider } from '@/context/GlobalState';
import axios from "axios";
//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());  
NProgress.configure({ showSpinner: false });
/* axios defaults */
axios.defaults.baseURL = process.env.API_DOMAIN;
axios.defaults.headers.common['x-api-key'] = 'KHKJHSKHASD7686ASDHKSHDAKSHDKHASDAASDKH86868ASDVV';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/* render component */
function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  )
}

export default MyApp