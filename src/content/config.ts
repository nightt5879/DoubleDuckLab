import { defineCollection, z } from 'astro:content';

const news = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    title: z.object({
      zh: z.string().min(1),
      en: z.string().min(1)
    }),
    contex: z
      .object({
        zh: z.string().min(1),
        en: z.string().min(1)
      })
      .optional()
  })
});

const papers = defineCollection({
  type: 'content',
  schema: z.object({
    year: z.number().int(),
    title: z.string().min(1),
    venue: z.string().min(1),
    abstract: z.string().optional(),
    links: z
      .object({
        online: z.string().min(1).optional(),
        pdf: z.string().min(1).optional(),
        project: z.string().min(1).optional(),
        code: z.string().min(1).optional()
      })
      .optional(),
    bibtex: z.string().optional()
  })
});

export const collections = { news, papers };
