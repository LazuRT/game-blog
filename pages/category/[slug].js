import React from 'react';
import { GraphQLClient } from 'graphql-request';
import { getCategories, getCategoryPost } from '../../api';
import SideWidget from '../../components/SideWidget';
import PostCard from '../../components/PostCard';
import Head from 'next/head';
import Link from 'next/link';
const client = new GraphQLClient('https://api-ap-northeast-1.graphcms.com/v2/ckw0nad1i4eb601xwbtqz52bv/master');

export async function getStaticProps({ params }) {
	const posts = await getCategoryPost(params.slug);

	return {
		props: {
			data: posts,
			category: params.slug,
		},
	};
}

export async function getStaticPaths() {
	const categories = await getCategories();

	return {
		paths: categories.map(({ slug }) => ({
			params: { slug },
		})),
		fallback: false,
	};
}

const singleCategoryPage = ({ data, category }) => {
	// console.log(data, category);
	return (
		<div className="container	mx-auto p-2 lg:p-0">
			<Head>
				<title>Next Web App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="lg:col-span-8 col-span-1 ">
					<h1 className="uppercase text-3xl font-semibold">Post for {category}:</h1>

					{data.map((post) => (
						<PostCard post={post} key={post.id} />
					))}
				</div>

				<div className="lg:col-span-4 col-span-1">
					<SideWidget content="featuredPost" />
					<SideWidget />
				</div>
			</div>
		</div>
	);
};

export default singleCategoryPage;
