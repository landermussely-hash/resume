import React, { Component } from "react";
import css from "./Person.module.scss";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default class Person extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { blok } = this.props;

		// ✅ Debug: check of experiences data binnenkomt
		console.log("Experiences for", blok.firstname, blok.lastname, ":", blok.experiences);

		return (
			<div {...storyblokEditable(blok)} className={css["wrapper"]}>
				<div className={css["content"]}>

					{/* Header */}
					<div className={[css["box"], css["head"]].join(" ")}>
						<h1>
							Resume {blok.title} {blok.lastname} {blok.firstname}
						</h1>
					</div>

					{/* Sidebar */}
					<div className={[css["box"], css["sidebar"]].join(" ")}>
						<div className={css["personalimage"]}>
							{blok.image ? (
								<img
									src={blok.image}
									alt={`${blok.firstname} ${blok.lastname}`}
								/>
							) : (
								<p>No image available</p>
							)}
						</div>

						<div className={css["personaldetails"]}>
							<div className={css["personaldetailitem"]}>
								{blok.title} {blok.firstname} {blok.lastname}
							</div>
							<div className={css["personaldetailitem"]}>
								{blok.dateofbirth}
							</div>
							<div className={css["personaldetailitem"]}>
								{blok.location}
							</div>
						</div>
					</div>

					{/* Experience */}
					<div className={[css["box"], css["experience"]].join(" ")}>
						<h2>Experience</h2>
						{Array.isArray(blok.experiences) && blok.experiences.length > 0 ? (
							blok.experiences.map((nestedBlok) => (
								<StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
							))
						) : (
							<p>No experience added yet.</p>
						)}
					</div>

					{/* Footer */}
					<div className={[css["box"], css["foot"]].join(" ")}>
						<div>
							&copy; {blok.firstname} {blok.lastname} {new Date().getFullYear()}
						</div>
					</div>

				</div>
			</div>
		);
	}
}
