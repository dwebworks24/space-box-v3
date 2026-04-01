export const API_BASE_URL = "https://api.spaceboxconcepts.com";

export function apiUrl(path: string): string {
    return `${API_BASE_URL}/${path.replace(/^\//, "")}`;
}

export function mediaUrl(path: string): string {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/* ── API Endpoints ─────────────────────────── */
export const ENDPOINTS = {
    // Blogs
    BLOG_LIST: "/api/get_blog_list/",
    BLOG_DETAIL: (slug: string) => `/api/get_blog_detail/${slug}/`,

    // Projects
    PROJECT_LIST: "/api/get_project_list/",
    PROJECT_DETAIL: (id: number) => `/api/get_project_detail/${id}/`,

    // Careers
    JOB_LIST: "/api/get_job_list/",
    JOB_DETAIL: (id: number) => `/api/get_job_detail/${id}/`,
    APPLY_JOB: "/api/apply_job/",

    // Project Inquiry
    PROJECT_INQUIRY: "/api/project-inquiry/",

    // Razorpay
    CREATE_ORDER: "/api/create-razorpay-order/",
} as const;
