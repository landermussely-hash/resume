import React, { Component } from "react";
import css from "./Experience.module.scss";
import { storyblokEditable } from "@storyblok/react";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";

export default class Experience extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const blok = this.props.blok;

    // Check of blok bestaat
    if (!blok) {
      return <div className={css["experienceitem"]}>No experience data available</div>;
    }

    return (
      <div {...storyblokEditable(blok)} className={css["experienceitem"]}>
        <div className={css["experienceheader"]}>
          {/* Gebruik fallback text als start/enddate of title leeg is */}
          <span className={css["experiencedate"]}>
            {blok.startdate || "Start date"} - {blok.enddate || "End date"}
          </span>
          <span className={css["experiencetitle"]}>{blok.title || "Title"}</span>
        </div>
        <div className={css["experienceitemcontent"]}>
          {blok.description
            ? RichTextToHTML({ document: blok.description })
            : "No description available"}
        </div>
      </div>
    );
  }
}
