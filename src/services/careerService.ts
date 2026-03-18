import { apiUrl, ENDPOINTS } from "@/config/api";

export interface Job {
    id: number;
    title: string;
    location: string;
    job_type: string;
    description: string;
    Requirements: string;
    Body: string;
    deadline: string;
    status: number;
    posted_at: string;
    updated_at: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    posted_by: number;
    updated_by: number;
}

export interface ApplyJobPayload {
    full_name: string;
    email: string;
    message: string;
    resume: File;
    job_title: string;
}

export interface ApplyJobError {
    message: string;
    errors: Record<string, string[]>;
}

export async function fetchJobList(): Promise<Job[]> {
    const res = await fetch(apiUrl(ENDPOINTS.JOB_LIST));
    if (!res.ok) throw new Error("Failed to fetch job list");
    return res.json();
}

export async function fetchJobDetail(id: number): Promise<Job> {
    const res = await fetch(apiUrl(ENDPOINTS.JOB_DETAIL(id)));
    if (!res.ok) throw new Error("Failed to fetch job detail");
    return res.json();
}

export async function applyJob(data: ApplyJobPayload): Promise<{ message: string }> {
    const formData = new FormData();
    formData.append("full_name", data.full_name);
    formData.append("email", data.email);
    formData.append("message", data.message);
    formData.append("resume", data.resume);
    formData.append("job_title", data.job_title);

    const res = await fetch(apiUrl(ENDPOINTS.APPLY_JOB), {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        const errorData: ApplyJobError = await res.json();
        throw errorData;
    }

    return res.json();
}
