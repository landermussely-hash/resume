import React, { Component } from "react";
import * as PropTypes from "prop-types";
import Head from "next/head";

function getTagElement([key, value]) {
  if (key === "title") {
    return <title key={key}>{value}</title>;
  }
  if (key === "canonicalLink") {
    return <link key={key} rel="canonical" href={value} hrefLang="nl" />;
  }
  // Opengraph uses [property], but everything else uses [name]
  if (key.indexOf("og:") === 0) {
    return <meta key={key} property={key} content={value} />;
  }
  return <meta key={key} name={key} content={value} />;
}

export default class HeadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    this.setState({
      loaded: document.readyState === "complete"
    });

    document.addEventListener("readystatechange", () => {
      this.setState({
        loaded: document.readyState === "complete"
      });
    });
  }

  render() {
    return (
      <>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
          <meta lang="en" />

          {/* ✅ Favicon correct uit public/ laden */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/favicon-180x180.png" />

          <link rel="dns-prefetch" href="https://cdn.materialdesignicons.com" />

          {/* Social tags */}
          {this.props.socialTags && Object.entries(this.props.socialTags).map(getTagElement)}

          {/* Laad styles pas als document ready is */}
          {this.state.loaded && <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@3.9.97/css/materialdesignicons.min.css" />}
          {this.state.loaded && <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Silkscreen:wght@400;700&display=swap" rel="stylesheet" />}
        </Head>
      </>
    );
  }
}

HeadComponent.propTypes = {
  socialTags: PropTypes.object
};
