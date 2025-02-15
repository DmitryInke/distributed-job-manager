CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"charge" integer,
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"category" text,
	"price" real,
	"stock" integer,
	"rating" real,
	"description" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX "unique_product" ON "products" USING btree ("name","category","price","stock","rating","description");