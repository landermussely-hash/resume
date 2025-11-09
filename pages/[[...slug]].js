import { useStoryblokState, getStoryblokApi, StoryblokComponent } from "@storyblok/react";
import HeadComponent from "../components/genericComponents/HeadComponent/HeadComponent";
import { getTags } from "../functions/services/metaTagService";

export default function Page({ story, preview, socialtags }) {
  story = useStoryblokState(
    story,
    {
      resolveRelations: []
    },
    preview
  );

  if (!story) {
    return <div>Page not found</div>; // fallback voor client-side rendering
  }

  return (
    <>
      <HeadComponent socialTags={socialtags} />
      <StoryblokComponent blok={story.content} />
    </>
  );
}

export async function getStaticProps({ params }) {
  // Root / gaat naar home
  const slug = params.slug ? params.slug.join("/") : "home";

  // Voorkom fetch van statische assets zoals favicon
  if (slug === "favicon.ico" || slug === "favicon.png") {
    return { notFound: true };
  }

  const sbParams = {
    version: "draft",
    resolve_relations: []
  };

  const storyblokApi = getStoryblokApi();

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

    if (!data || !data.story) {
      // fallback content voor niet-bestaande pagina
      return {
        props: {
          story: {
            content: { component: "PageNotFound", text: "This page does not exist." }
          },
          socialtags: {}
        }
      };
    }

    const title = data.story.name;
    const description = data.story.content.tagline || title;

    const socialtags = getTags({
      storyblokSocialTag: data.story.content.socialtag,
      pageDefaults: {
        "og:title": title,
        "og:description": description,
        "og:url": `${process.env.NEXT_PUBLIC_DEPLOY_URL}${slug}`
      }
    });

    return {
      props: {
        story: data.story,
        key: data.story.id,
        socialtags
      },
      revalidate: 10
    };
  } catch (err) {
    console.error("Storyblok fetch failed for slug:", slug, err.message);
    return {
      props: {
        story: {
          content: { component: "PageNotFound", text: "This page does not exist." }
        },
        socialtags: {}
      }
    };
  }
}

export async function getStaticPaths() {
  const storyblokApi = getStoryblokApi();

  try {
    const { data } = await storyblokApi.get("cdn/links/");

    const paths = Object.keys(data.links)
      .filter(linkKey => {
        const slug = data.links[linkKey].slug;
        return !data.links[linkKey].is_folder && slug !== "favicon.ico" && slug !== "favicon.png";
      })
      .map(linkKey => ({
        params: { slug: data.links[linkKey].slug.split("/") }
      }));

    return {
      paths,
      fallback: "blocking"
    };
  } catch (err) {
    console.error("Storyblok links fetch failed", err.message);
    return {
      paths: [],
      fallback: "blocking"
    };
  }
}
