import React from "react"
import { Global, css } from "@emotion/react"

function EstilosGlobales(props) {
  return (
    <Global
      styles={css`
        :root {
          --color-primary: #39b94a;
          --color-accent: #32353f;
          --color-secondary: #141519;
          --color-text: #effaf0;
          --color-success: #56cc9d;
          --color-info: #6cc3d5;
          --color-warning: #ffce67;
          --color-danger: #ff7851;
          --color-dark: #010206;
          --color-light: #fff;
          --spacer: 1rem;
        }
        *{
          box-sizing: border-box;
        }
        html{
          scroll-behavior: smooth;
        }
        html,
        body,
        div,
        span,
        applet,
        object,
        iframe,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        blockquote,
        pre,
        a,
        abbr,
        acronym,
        address,
        big,
        cite,
        code,
        del,
        dfn,
        em,
        img,
        ins,
        kbd,
        q,
        s,
        samp,
        small,
        strike,
        strong,
        sub,
        sup,
        tt,
        var,
        b,
        u,
        i,
        center,
        dl,
        dt,
        dd,
        ol,
        ul,
        li,
        fieldset,
        form,
        label,
        legend,
        table,
        caption,
        tbody,
        tfoot,
        thead,
        tr,
        th,
        td,
        article,
        aside,
        canvas,
        details,
        embed,
        figure,
        figcaption,
        footer,
        header,
        hgroup,
        menu,
        nav,
        output,
        ruby,
        section,
        summary,
        time,
        mark,
        audio,
        video {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
        }
        /* HTML5 display-role reset for older browsers */
        article,
        aside,
        details,
        figcaption,
        figure,
        footer,
        header,
        hgroup,
        menu,
        nav,
        section {
          display: block;
        }
        body {
          line-height: 1;
          background-color: var(--color-dark);
          color: var(--color-text);
          font-size: 16px;
          font-family: "Open Sans";
        }
        ol,
        ul {
          list-style: none;
        }
        blockquote,
        q {
          quotes: none;
        }
        blockquote:before,
        blockquote:after,
        q:before,
        q:after {
          content: "";
          content: none;
        }
        table {
          border-collapse: collapse;
          border-spacing: 0;
        }
        h1,
        .h1 {
          font-family: "Trade Winds";
          line-height: 1.5;
          color: var(--color-primary)
        }
        h2,
        h3,
        h4,
        h5,
        h6,
        .h2,
        .h3,
        .h4,
        .h5,
        .h6 {
          font-family: "Permanent Marker";
          line-height: 1.5;
          color: var(--color-primary)
        }
        h6,
        .h6 {
          font-size: 16px;
        }
        h5,
        .h5 {
          font-size: 20px;
        }
        h4,
        .h4 {
          font-size: 24px;
        }
        h3,
        .h3 {
          font-size: 28px;
        }
        h2,
        .h2 {
          font-size: 32px;
        }
        h1,
        .h1 {
          font-size: 36px;
        }
        .container {
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          @media (min-width: 960px) {
            max-width: 960px;
          }
          @media (min-width: 1140px) {
            max-width: 1140px;
          }
          @media (min-width: 1320px) {
            max-width: 1320px;
          }
        }
      `}
    ></Global>
  )
}

export default EstilosGlobales
