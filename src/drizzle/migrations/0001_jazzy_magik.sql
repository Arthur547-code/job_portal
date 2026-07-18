CREATE TYPE "public"."currency" AS ENUM('INR', 'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'SGD');--> statement-breakpoint
CREATE TYPE "public"."job_level" AS ENUM('intern', 'entry-level', 'associate', 'mid-level', 'senior', 'lead', 'manager', 'director', 'executive');--> statement-breakpoint
CREATE TYPE "public"."job_status" AS ENUM('draft', 'published', 'closed', 'expired');--> statement-breakpoint
CREATE TYPE "public"."job_type" AS ENUM('full-time', 'part-time', 'contract', 'internship', 'temporary', 'freelance');--> statement-breakpoint
CREATE TYPE "public"."minimum_education" AS ENUM('high-school', 'diploma', 'associate-degree', 'bachelor-degree', 'master-degree', 'doctorate', 'not-required');--> statement-breakpoint
CREATE TYPE "public"."salary_period" AS ENUM('hour', 'day', 'week', 'month', 'year');--> statement-breakpoint
CREATE TYPE "public"."work_type" AS ENUM('on-site', 'remote', 'hybrid');--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "jobs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"employer_id" integer NOT NULL,
	"job_title" varchar(255) NOT NULL,
	"job_type" "job_type" NOT NULL,
	"work_type" "work_type" NOT NULL,
	"job_level" "job_level" NOT NULL,
	"min_salary" integer,
	"max_salary" integer,
	"currency" "currency" NOT NULL,
	"salary_period" "salary_period" NOT NULL,
	"minimum_education" "minimum_education",
	"expiry_date" date,
	"city" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"country" varchar(255) NOT NULL,
	"min_experience" integer,
	"max_experience" integer,
	"status" "job_status" DEFAULT 'draft' NOT NULL,
	"job_description" text NOT NULL,
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_employer_id_employers_id_fk" FOREIGN KEY ("employer_id") REFERENCES "public"."employers"("id") ON DELETE cascade ON UPDATE no action;