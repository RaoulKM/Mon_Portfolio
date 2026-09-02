import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { after } from "next/server";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

import { GithubIcon } from "@/components/icons/brand";

import { Container, Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { EntityViewTracker } from "@/components/analytics/entity-view-tracker";
import { BreadcrumbJsonLd, ProjectJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/config/site";
import {
  getProjectBySlug,
  getProjectSlugs,
  getAdjacentProjects,
  incrementProjectViews,
} from "@/lib/queries";
import { getDictionary, getLocale, getI18n } from "@/i18n";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    return { title: getDictionary(await getLocale()).project.notFound };
  }

  const title = project.seoTitle || project.title;
  const description = project.seoDescription || project.shortDescription;
  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/projects/${project.slug}`,
      images: project.coverImage ? [{ url: project.coverImage }] : undefined,
      type: "article",
    },
  };
}

const DETAIL_KEYS = [
  "problem",
  "solution",
  "architecture",
  "challenges",
  "results",
] as const;

export default async function ProjectDetailPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const [project, { t }] = await Promise.all([getProjectBySlug(slug), getI18n()]);
  if (!project) notFound();

  const { prev, next } = await getAdjacentProjects(slug);

  after(() => incrementProjectViews(project.id));

  return (
    <Section>
      <ProjectJsonLd project={project} />
      <BreadcrumbJsonLd
        items={[
          { name: t.nav.home, url: "/" },
          { name: t.nav.projects, url: "/projects" },
          { name: project.title, url: `/projects/${project.slug}` },
        ]}
      />
      <EntityViewTracker
        event="PROJECT_VIEW"
        entityId={project.id}
        path={`/projects/${project.slug}`}
      />

      <Container className="max-w-4xl">
        <Button asChild variant="link" className="mb-6 px-0">
          <Link href="/projects">
            <ArrowLeft /> {t.project.backToList}
          </Link>
        </Button>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="text-muted-foreground mt-3 text-lg text-pretty">
          {project.shortDescription}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          {project.githubUrl && (
            <TrackedLink
              href={project.githubUrl}
              event="GITHUB_CLICK"
              entityId={project.id}
              className="border-border hover:bg-muted inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium"
            >
              <GithubIcon className="size-4" /> {t.project.sourceCode}
            </TrackedLink>
          )}
          {project.liveUrl && (
            <TrackedLink
              href={project.liveUrl}
              event="LIVE_DEMO_CLICK"
              entityId={project.id}
              className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium"
            >
              <ExternalLink className="size-4" /> {t.project.liveDemo}
            </TrackedLink>
          )}
        </div>

        {project.coverImage && (
          <div className="bg-muted relative mt-10 aspect-video overflow-hidden rounded-xl">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        <article className="mt-10 space-y-4 text-[15px] leading-relaxed">
          {project.description.split(/\n{2,}/).map((p, i) => (
            <p key={i} className="text-pretty">
              {p}
            </p>
          ))}
        </article>

        {DETAIL_KEYS.map((key) => {
          const value = project[key];
          if (!value) return null;
          return (
            <section key={key} className="mt-10">
              <h2 className="text-xl font-semibold">{t.project[key]}</h2>
              <div className="mt-3 space-y-3 text-[15px] leading-relaxed">
                {value.split(/\n{2,}/).map((p, i) => (
                  <p key={i} className="text-pretty">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          );
        })}

        {project.technologies.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold">{t.project.technologies}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech.id} variant="outline">
                  {tech.name}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {project.gallery.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold">{t.project.gallery}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {project.gallery.map((src, i) => (
                <div
                  key={i}
                  className="bg-muted relative aspect-video overflow-hidden rounded-lg"
                >
                  <Image
                    src={src}
                    alt={`${project.title} — capture ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <nav className="border-border mt-16 flex justify-between gap-4 border-t pt-6 text-sm">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="hover:text-primary inline-flex items-center gap-2"
            >
              <ArrowLeft className="size-4" /> {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="hover:text-primary inline-flex items-center gap-2 text-right"
            >
              {next.title} <ArrowRight className="size-4" />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </Container>
    </Section>
  );
}
