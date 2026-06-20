import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			author: z.string().optional(),
		}),
});

const services = defineCollection({
	loader: glob({ base: './src/content/services', pattern: '**/*.md' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			order: z.number(),
			image: z.optional(image()),
		}),
});

const areas = defineCollection({
	loader: glob({ base: './src/content/areas', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		town: z.string(),
		county: z.string(),
	}),
});

export const collections = { blog, services, areas };
