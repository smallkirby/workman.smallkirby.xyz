import { AppProps } from 'next/app';
import '@/styles/global.css';
import Head from 'next/head';
import { FirebaseAuthProvider } from '@/lib/firebase/auth';
import AlertProvider from '@/components/AlertProvider';
import { ConfigProvider, theme } from 'antd';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
        }}
      >
        <AlertProvider>
          <FirebaseAuthProvider>
            <Head>
              <title>workman</title>
              <link
                rel="shortcut icon"
                href="/favicon.ico?"
                type="image/x-icon"
              />
            </Head>
            <Component {...pageProps} />
          </FirebaseAuthProvider>
        </AlertProvider>
      </ConfigProvider>
    </main>
  );
}
