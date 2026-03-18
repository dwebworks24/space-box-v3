import { apiUrl, ENDPOINTS } from "@/config/api";

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    image: string;
    short_description: string;
    body: string;
    tags: string;
    status: number;
    created_at: string;
    updated_at: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    category: number;
    created_by: number;
    updated_by: number;
}

export async function fetchBlogList(): Promise<BlogPost[]> {
    const res = await fetch(apiUrl(ENDPOINTS.BLOG_LIST));
    if (!res.ok) throw new Error("Failed to fetch blog list");
    return res.json();
}

export async function fetchBlogDetail(slug: string): Promise<BlogPost> {
    const res = await fetch(apiUrl(ENDPOINTS.BLOG_DETAIL(slug)));
    if (!res.ok) throw new Error("Failed to fetch blog detail");
    return res.json();
}
