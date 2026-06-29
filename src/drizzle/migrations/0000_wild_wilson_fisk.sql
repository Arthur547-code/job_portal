CREATE TYPE "public"."company_sizes" AS ENUM('1-10', '11-50', '51-200', '201-500', '500+');--> statement-breakpoint
CREATE TYPE "public"."education" AS ENUM('none', 'high_school', 'undergraduate', 'masters', 'phd');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'other');--> statement-breakpoint
CREATE TYPE "public"."industry_types" AS ENUM('development', 'design', 'infrastructure');--> statement-breakpoint
CREATE TYPE "public"."marital_status" AS ENUM('single', 'married', 'divorced');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('applicant', 'employee');--> statement-breakpoint
CREATE TABLE "applicants" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "applicants_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"biography" text,
	"date_of_birth" timestamp,
	"nationality" varchar(100),
	"maritalStatus" "marital_status",
	"gender" "gender",
	"education" "education",
	"experience" text,
	"website_url" varchar(255),
	"location" varchar(255),
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "applicants_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "employers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "employers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"company_name" varchar(255),
	"company_website_url" varchar(255),
	"company_logo" varchar(500),
	"company_banner_url" text,
	"company_establishment_year" integer,
	"company_description" text,
	"industry_type" "industry_types",
	"company_size" "company_sizes",
	"location" varchar(255),
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "employers_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"hash_Token" varchar(255) NOT NULL,
	"user_id" integer NOT NULL,
	"user_agent" text NOT NULL,
	"ip" varchar(45) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"role" "role" DEFAULT 'applicant' NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "unique_user_username" UNIQUE("username"),
	CONSTRAINT "unique_user_email" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "applicants" ADD CONSTRAINT "applicants_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employers" ADD CONSTRAINT "employers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;