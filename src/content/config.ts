import { defineCollection, z } from 'astro:content';

const i18nText = z.object({
  zh: z.string().min(1),
  en: z.string().min(1)
});

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
    authors: z.string().optional(),
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

const members = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string().min(1).optional(),
    name: z.union([z.string().min(1), i18nText]),
    role: z.object({
      zh: z.string().min(1),
      en: z.string().min(1)
    }),
    status: z.union([z.string().min(1), i18nText]).optional(),
    area: z.union([z.string().min(1), i18nText]),
    avatar: z.string().min(1).optional(),
    bio: z.union([z.string().min(1), i18nText]).optional(),
    links: z
      .object({
        scholar: z.string().min(1).optional(),
        github: z.string().min(1).optional(),
        homepage: z.string().min(1).optional(),
        email: z.string().min(1).optional()
      })
      .optional()
  })
});

export const collections = { news, papers, members };
