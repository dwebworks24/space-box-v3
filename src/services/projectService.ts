import { apiUrl, ENDPOINTS } from "@/config/api";

export interface ProjectGallery {
    id: number;
    image: string;
    label: string;
    order: number;
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    area: string;
    year: string;
    hero_image: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    category: number;
    created_by: number;
    updated_by: number;
    project_gallery?: ProjectGallery[];
}

export async function fetchProjectList(): Promise<Project[]> {
    const res = await fetch(apiUrl(ENDPOINTS.PROJECT_LIST));
    if (!res.ok) throw new Error("Failed to fetch project list");
    return res.json();
}

export async function fetchProjectDetail(id: number): Promise<Project> {
    const res = await fetch(apiUrl(ENDPOINTS.PROJECT_DETAIL(id)));
    if (!res.ok) throw new Error("Failed to fetch project detail");
    return res.json();
}
