import '../styles/globals.css'
import App from "next/app";
import type { AppProps, AppContext } from 'next/app'
import {useRouter} from "next/router";

function MyApp({ Component, pageProps }: AppProps) {

  return <Component {...pageProps} base='hallo'/>
}

 MyApp.getInitialProps = async (appContext:AppContext) => {
   // calls page's `getInitialProps` and fills `appProps.pageProps`
   const appProps = await App.getInitialProps(appContext);

   return { ...appProps}

 }

export default MyApp
