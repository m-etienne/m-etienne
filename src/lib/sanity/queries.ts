import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';
import groq from 'groq';

export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
	_createdAt,
	publishedAt,
  excerpt,
  mainImage,
  body,
  tag,
  quiz->,
	recommendedPost[]->
}`;

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`;

export const mostRecentPostsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)[0...3]`;


// Get current, previous and next post, filtered by tags
// export const postByTag = groq `*[_type == $type && slug.current == $slug]{
// 	"current": { 
// 		"slug": slug.current, title, publicReleaseDate, "tags": tags[]->tag 
// 	},
// 	"previous": *[_type == $type && count((tags[]->tag)[@ in ^.^.tags[]->tag]) > 0 && ^.publicReleaseDate > publicReleaseDate]|order(publicReleaseDate desc)[0]{ 
// 			"slug": slug.current, title, publicReleaseDate, "tags": tags[]->tag
// 	},
// 	"next": *[_type == $type && count((tags[]->tag)[@ in ^.^.tags[]->tag]) > 0 && ^.publicReleaseDate < publicReleaseDate]|order(publicReleaseDate asc)[0]{ 
// 			"slug": slug.current, title, publicReleaseDate, "tags": tags[]->tag
// 	},
// }|order(publicReleaseDate)[0]`


// *[_type == "post" && tag.value == $tag && defined(slug.current)] | order(_createdAt desc){
//   tag
// }

// *[_type == "post" && defined(slug.current)].tag[]{
//   value, //or whatever field contains the name of the tag
//   "postByTag": *[_type == "post" && references(^._id)]
// }

export interface Tag {
	_type: 'tags';
	value: string;
	label: string;
}

export interface AnswerOption {
	_type: 'answerOption';
	answer: string;
	correct?: boolean;
}

export interface Qna {
	_type: 'qna';
	question: string;
	questionImage?: ImageAsset;
	answerOption: AnswerOption[];
	answerNotes?: string;
}

export interface Quiz {
	_type: 'quiz';
	_createdAt: string;
	publishedAt: string;
	title: string;
	qna: Qna[];
}

export interface Post {
	_type: 'post';
	_createdAt: string;
	publishedAt:string;
	title?: string;
	slug: Slug;
	excerpt?: string;
	mainImage?: ImageAsset;
	body: PortableTextBlock[];
	tag?: Tag[];
	quiz?: Quiz;
	recommendedPost?: Post[];
}