import React from 'react';
import { getAuthors, getAuthorPost } from '../../api';
import SideWidget from '../../components/SideWidget';
import PostCard from '../../components/PostCard';
import { FaTwitter, FaFacebook } from 'react-icons/fa';
import Head from 'next/head';
import Link from 'next/link';
import AuthorCard from '../../components/AuthorCard';

export async function getStaticProps({ params }) {
	const data = await getAuthorPost(params.slug);

	return {
		props: {
			data: data,
		},
		revalidate: 15,
	};
}

export async function getStaticPaths() {
	const authors = await getAuthors();

	return {
		paths: authors.map(({ slug }) => ({
			params: { slug },
		})),
		fallback: false,
	};
}

const singleCategoryPage = ({ data }) => {
	const { posts, author } = data;
	return (
		<div className="container	mx-auto p-2 lg:p-0">
			<Head>
				<title>Next Web App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="lg:col-span-8 col-span-1 ">
					{/* <div className="py-8 px-4 mb-8 border-2 border-blue-300 flex">
						<img src={author.photo.url} alt="" className=" align-middle rounded-full" />
						<div className="ml-8">
							<h4 className="text-xl font-semibold mb-4">{author.name}</h4>

							<p>{author.bio}</p>
							<div className="flex text-2xl text-blue-400 mt-4 ">
								<a href="http://facebook.com/" target="_blank" className="mr-4 hover:opacity-50">
									<FaFacebook />
								</a>
								<a href="http://twitter.com/" target="_blank" className="mr-4 hover:opacity-50">
									<FaTwitter />
								</a>
							</div>
						</div>
					</div> */}

					<AuthorCard author={author} />

					<h1 className="uppercase text-3xl font-semibold">Posts from {author.name}:</h1>

					{posts.map((post) => (
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
