import 'resume/styles/globals.css'

import { storyblokInit, apiPlugin } from "@storyblok/react";
import Person from "resume/components/genericComponents/Person/Person";
import Experience from 'resume/components/genericComponents/Experience/Experience';


const components = {
  person: Person,
  experience: Experience
};

storyblokInit({
  accessToken: process.env.STORYBLOK_API_KEY},
  use: [apiPlugin],
  components,
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
