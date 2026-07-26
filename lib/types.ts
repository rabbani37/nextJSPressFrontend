
export interface IPost {
    id: string;
    title: string;
    content: string;
    thumbnail: string;
    isFeatured: boolean;
    status: "DRAFT" | "PUBLISHED" | "ARCH";
    tags: string[];
    isPremium: boolean;
    author: IAuthor;
    _count: {
        comments: number;
    }
    createdAt: string;
    updatedAt: string;
}

export interface IComment {
    id: string;
    content: string;
    status:string;
    authorId: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
}

export interface IAuthor {
    id: string;
    name: string;
    email: string;
    active_status: string
    role: string
    created_at: string;
    updated_at: string
}