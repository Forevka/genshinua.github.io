import Image from "./image";

export default interface Article {
    id:         number;
    attributes: Attributes;
}

export interface ArticleAuthors {
    data: ArticleAuthorMeta[];
}

export interface ArticleAuthorMeta {
    id:         number;
    attributes: ArticleAuthor;
}

export interface ArticleAuthor {
    FirstName: string;
    LastName:  string;
    createdAt: Date;
    updatedAt: Date;
    FullName:  string;
}

export interface Tags {
    data: TagsMeta[];
}

export interface TagsMeta {
    id:         number;
    attributes: Attributes;
}

export interface TagsAttributes {
    Name:      string;
    Color:     string;
    createdAt: Date;
    updatedAt: Date;
}


export interface Attributes {
    Title:               string;
    Base:                boolean;
    InCarousel:          boolean;
    Content:             string;
    LeadText:             string;
    Hero:                Image;
    Views:               number;
    authors:             ArticleAuthors;
    tags:                Tags;
    createdAt:           Date;
    updatedAt:           Date;
    publishedAt:         Date;
    vuid:                string;
    versionNumber:       number;
    isVisibleInListView: boolean;
}
