import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://iamadityaranjan.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://iamadityaranjan.com/projects',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://iamadityaranjan.com/cv',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ]
}