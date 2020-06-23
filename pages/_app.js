import App from 'next/app';
import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import stylesheet from '../styles.less';
import { mainReducer } from '../store/reducer';
import { StateProvider } from '../store/state';
import initialState from '../store/initialState';

const theme = {
  colors: {
    black: 'rgba(0, 0, 0, 0.85)',
    white: '#FFFFFF',
    primary: '#ED2024',
  },
  screen: {
    desktop: '1440px',
  },
};

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <title>Hotel list</title>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, shrink-to-fit=no"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/images/favicon.ico"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
          />
        </Head>
        <StateProvider initialState={initialState} reducer={mainReducer}>
          <Component {...pageProps} />
        </StateProvider>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <style jsx="true" global>{`
          @import url('https://fonts.googleapis.com/css?family=Roboto');
          * {
            user-select: none;
          }
          html,
          body {
            overflow-x: hidden;
          }
          body {
            position: relative;
          }
          input {
            -webkit-user-select: text;
          }
        `}</style>
      </ThemeProvider>
    );
  }
}
