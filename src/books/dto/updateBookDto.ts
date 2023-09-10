export interface UpdateBookDto {
    id: number;
    title: string;
    author?: string;
    publisher?: string;
    edition?: number;
}
