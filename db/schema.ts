import { mysqlTable, serial, varchar, text, timestamp, int, json } from "drizzle-orm/mysql-core";

export const landingPages = mysqlTable("landing_pages", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  pageTitle: varchar("page_title", { length: 255 }).notNull(),
  content: json("content").$type<{
    blocks: Array<{
      type: string;
      data: any;
    }>
  }>(),
  status: varchar("status", { length: 255 }).default("draft"),
  seoTitle: varchar("seo_title", { length: 255 }),
  seoDescription: text("seo_description"),
  ogImage: varchar("og_image", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});

export const media = mysqlTable("media", {
  id: serial("id").primaryKey(),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  storagePath: varchar("storage_path", { length: 255 }).notNull(),
  mimeType: varchar("mime_type", { length: 100 }),
  size: int("size"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const siteSettings = mysqlTable("site_settings", {
  id: serial("id").primaryKey(),
  siteName: varchar("site_name", { length: 255 }).notNull().default("My Landing Page"),
  siteDescription: text("site_description"),
  baseUrl: varchar("base_url", { length: 255 }),
  seoTitleTemplate: varchar("seo_title_template", { length: 255 }).default("%s | My Site"),
  ogImageUrl: varchar("og_image_url", { length: 255 }),
  logoUrl: varchar("logo_url", { length: 255 }),
  faviconUrl: varchar("favicon_url", { length: 255 }),
  gaId: varchar("ga_id", { length: 50 }),
  fbPixelId: varchar("fb_pixel_id", { length: 50 }),
  customHeadScripts: text("custom_head_scripts"),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(), // Hashed password
  createdAt: timestamp("created_at").defaultNow(),
});