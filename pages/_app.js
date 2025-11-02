import '../styles/globals.css'

import { storyblokInit, apiPlugin } from "@storyblok/react";
import Person from "../components/genericComponents/Person/Person";
import Experience from '../components/genericComponents/Experience/Experience';


const components = {
  person: Person,
  experience: Experience
};

storyblokInit({
  accessToken: "DeReSOlrmX85GW74jr6zMgtt",
  use: [apiPlugin],
  components,
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
