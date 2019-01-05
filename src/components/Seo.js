// code adapted from https://themeteorchef.com/tutorials/reusable-seo-with-react-helmet

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const absoluteUrl = path => `https://blog.wunnle.com${path}`;

const getMetaTags = ({
  title, description, url, contentType, published, updated, category, tags, twitter, image,
}) => {
  const metaTags = [
    { itemprop: 'name', content: title },
    { itemprop: 'description', content: description },
    { property: 'description', content: description.substring(0, 100) },
    { property: 'twitter:site', content: '@wunnle' },
    { property: 'twitter:title', content: `${title}` },
    { property: 'twitter:description', content: description },
    { property: 'twitter:creator', content: twitter || '@wunnle' },
    { property: 'og:title', content: `${title}` },
    { property: 'og:type', content: contentType },
    { property: 'og:url', content: url },
    { property: 'og:description', content: description },
    { property: 'og:site_name', content: 'blog.wunnle.com' },
    { property: 'og:locale', content: 'en_EN' },
  ];

  if (published) metaTags.push({ name: 'article:published_time', content: published });
  if (updated) metaTags.push({ name: 'article:modified_time', content: updated });
  if (category) metaTags.push({ name: 'article:section', content: category });
  if (tags) metaTags.push({ name: 'article:tag', content: tags });
  if (image) {
    metaTags.push({ itemprop: 'image', content: image });
    metaTags.push({ property: 'twitter:image:src', content: image });
    metaTags.push({ property: 'og:image', content: image });
    metaTags.push({ property: 'twitter:card', content: 'summary_large_image' });
  } else {
    metaTags.push({ property: 'twitter:card', content: 'summary' });
  }

  return metaTags;
};

const getHtmlAttributes = ({
  schema
}) => {
  let result = {
    lang: 'en',
  };
  if (schema) {
    result = {
      ...result,
      itemscope: undefined,
      itemtype: `http://schema.org/${schema}`,
    }
  }
  return result;
}

getHtmlAttributes.propTypes = {
  schema: PropTypes.string,
};

const Seo = ({
  schema, title, description, path, contentType, published, updated, category, tags, twitter, image
}) => (
  <Helmet
    htmlAttributes={getHtmlAttributes({
      schema,
    })}
    title={` Wunnle blog | ${title} `}
    link={[
      { rel: 'canonical', href: absoluteUrl(path) },
    ]}
    meta={getMetaTags({
      title,
      description,
      contentType,
      url: absoluteUrl(path),
      published,
      updated,
      category,
      tags,
      twitter,
      image
    })}
  />
);

Seo.propTypes = {
  schema: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
  contentType: PropTypes.string,
  published: PropTypes.string,
  updated: PropTypes.string,
  category: PropTypes.string,
  tags: PropTypes.array,
  twitter: PropTypes.string,
  image: PropTypes.string,
};

export default Seo;
