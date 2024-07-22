export interface NewsData {
    author:      null;
    content:     string;
    description: string;
    publishedAt: Date;
    source:      Source;
    title:       string;
    url:         string;
    urlToImage:  string;
}

export interface Source {
    id:   null;
    name: string;
}
