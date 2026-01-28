import ProjectPageComponent from '@/components/work/ProjectPage';
import { getProject, getProjectSlugs, getNextProject } from '@/lib/data/projects';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Generate static params for all projects at build time
export async function generateStaticParams() {
    const slugs = getProjectSlugs();
    return slugs.map((slug) => ({
        slug: slug,
    }));
}

// Generate SEO metadata for each project page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = getProject(slug);

    if (!project) {
        return {
            title: 'Project Not Found | The Decor',
        };
    }

    return {
        title: `${project.title} | The Decor`,
        description: project.description.split('\n')[0],
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getProject(slug);
    const nextProject = getNextProject(slug);

    if (!project) {
        notFound();
    }

    return <ProjectPageComponent project={project} nextProject={nextProject} />;
}
