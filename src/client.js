import client from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = client({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    useCdn: true,
    token: process.env.REACT_APP_SANITY_SECRET_TOKEN, // Only if you want to update content with the client
});

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
    return builder.image(source);
}
