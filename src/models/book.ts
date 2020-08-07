export interface Author {
    slug: string;
    title: string;
}

export interface Book {
    slug: string;
    title: string;
    author?: Author;
    year?: number;
    magazines?: string[];
    genre?: string;
}
