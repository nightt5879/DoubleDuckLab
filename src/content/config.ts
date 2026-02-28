import { defineCollection, z } from 'astro:content';

const news = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    title: z.object({
      zh: z.string().min(1),
      en: z.string().min(1)
    })
  })
});

const papers = defineCollection({
  type: 'content',
  schema: z.object({
    year: z.number().int(),
    title: z.string().min(1),
    venue: z.string().min(1)
  })
});

export const collections = { news, papers };
