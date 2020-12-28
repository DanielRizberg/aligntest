export interface image {
    id: string;
    author: string;
    width: string;
    height: string;
    url: string;
    download_url: string;
}

export interface imageRequest {
    numElements: number;
    forbiddenKeys: string[];
}
export interface imageResponse {
    images: image[];
}