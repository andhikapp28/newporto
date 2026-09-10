import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    client: z.string(),
    role: z.string(),
    period: z.string(),
    category: z.string(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()),
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string()
    })),
  }),
});

export const collections = { projects };
