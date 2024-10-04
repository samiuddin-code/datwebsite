import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>  
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
          <link rel="preload" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&amp;display=swap" as="style"  onLoad="this.onload=null;this.rel='stylesheet'"/> 
      </Html>
    )
  }
}

export default MyDocument
