import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';
import groq from 'groq';

export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
	_createdAt,
	publishedAt,
  mainImage,
  body,
  tag,
	category,
	level,
  quiz->,
	recommendedPost[]->
}`;

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`;

export const mostRecentPostsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)[0...3]`;

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
	level?: string;
	category?: string;
	slug: Slug;
	mainImage?: ImageAsset;
	body: PortableTextBlock[];
	tag?: Tag[];
	quiz?: Quiz;
	recommendedPost?: Post[];
}