import React, { Component } from "react";
import css from "./Experience.module.scss";
import { storyblokEditable } from "@storyblok/react";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";

export default class Experience extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { blok } = this.props;

		// Check of de blok-data bestaat
		if (!blok) {
			return <p>No experience data found.</p>;
		}

		return (
			<div {...storyblokEditable(blok)} className={css["experienceitem"]}>
				<div className={css["experienceheader"]}>
					<span className={css["experiencetitle"]}>{blok.title || "Untitled Experience"}</span>
					<span className={css["experiencedate"]}>
						{blok.startdate || "?"} - {blok.enddate || "?"}
					</span>
				</div>

				<div className={css["experienceitemcontent"]}>
					{blok.description ? (
						RichTextToHTML({ document: blok.description })
					) : (
						<p>No description available.</p>
					)}
				</div>
			</div>
		);
	}
}
