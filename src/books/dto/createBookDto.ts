export interface CreateBookDto {
    user_id: number;
    title: string;
    author?: string;
    publisher?: string;
    edition?: number;
}
