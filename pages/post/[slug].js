import React from 'react';
import { GraphQLClient } from 'graphql-request';
import { getSinglePostDetail } from '../../api';
import SideWidget from '../../components/SideWidget';
import Head from 'next/head';
import Link from 'next/link';
import { FaTwitter, FaFacebook } from 'react-icons/fa';
import AuthorCard from '../../components/AuthorCard';
const client = new GraphQLClient('https://api-ap-northeast-1.graphcms.com/v2/ckw0nad1i4eb601xwbtqz52bv/master');
import { useRouter } from 'next/router';

export async function getStaticProps({ params }) {
	// const data = await client.request(
	// 	`
	// 	query GetSinglePostDetail($slug: String!) {
	// 		post(where: {slug: $slug}) {
	// 			id
	// 			slug
	// 			title
	// 			excerpt
	// 			createdAt
	// 			categories {
	// 				id
	// 				name
	// 				slug
	// 			}
	// 			image {
	// 				url
	// 			}
	// 			content {
	// 				markdown
	// 			}
	// 			author {
	// 				id
	// 				name
	// 				bio
	// 			}
	// 		}
	// 	}
	// 		`,
	// 	{
	// 		slug: params.slug,
	// 	}
	// );

	const data = await getSinglePostDetail(params.slug);
	// console.log(data);
	if (!data.post) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			post: data.post,
		},
	};
}

export async function getStaticPaths() {
	const { posts } = await client.request(
		`
		query MyQuery {
			posts {
				id
				slug
				title
			}
		}
		
		`
	);
	return {
		paths: posts.map(({ slug }) => ({
			params: { slug },
		})),
		fallback: true,
	};
}

const singlePostPage = ({ post }) => {
	const router = useRouter();

	// If the page is not yet generated, this will be displayed
	// initially until getStaticProps() finishes running
	if (router.isFallback) {
		return <div className="container	mx-auto p-2 min-h-screen lg:p-0">Loading...</div>;
	}

	const {
		title,
		createdAt,
		categories,
		image: { url: imgUrl },
		content: { raw, markdown },
		author,
	} = post;

	const getContentFragment = (index, text, obj, type) => {
		let modifiedText = text;

		if (obj) {
			if (obj.bold) {
				modifiedText = <b key={index}>{text}</b>;
			}

			if (obj.italic) {
				modifiedText = <em key={index}>{text}</em>;
			}

			if (obj.underline) {
				modifiedText = <u key={index}>{text}</u>;
			}
		}

		switch (type) {
			case 'heading-three':
				return (
					<h3 key={index} className="text-xl font-semibold mb-4">
						{modifiedText.map((item, i) => (
							<React.Fragment key={i}>{item}</React.Fragment>
						))}
					</h3>
				);
			case 'paragraph':
				return (
					<p key={index} className="mb-8">
						{modifiedText.map((item, i) => (
							<React.Fragment key={i}>{item}</React.Fragment>
						))}
					</p>
				);
			case 'heading-four':
				return (
					<h4 key={index} className="text-md font-semibold mb-4">
						{modifiedText.map((item, i) => (
							<React.Fragment key={i}>{item}</React.Fragment>
						))}
					</h4>
				);
			case 'image':
				return <img key={index} alt={obj.title} height={obj.height} width={obj.width} src={obj.src} />;
			default:
				return modifiedText;
		}
	};
	return (
		<div className="container	mx-auto p-2 lg:p-0">
			<Head>
				<title>{title} - Game Blog</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="lg:col-span-8 col-span-1 ">
					<div className="mb-8 text-center">
						<h1 className="text-4xl font-semibold">{post.title}</h1>
						<p className="text-2xl text-gray-400">
							{new Date(createdAt).toLocaleDateString('en-us', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</p>
						{categories.map((category, index) => {
							if (index === categories.length - 1)
								return (
									<Link key={category.slug} href={`/category/${category.slug}`}>
										<span className="text-xl font-bold transition duration-300 ease-in-out hover:text-blue-500 cursor-pointer underline">{`${category.name} `}</span>
									</Link>
								);
							return (
								<Link key={category.slug} href={`/category/${category.slug}`}>
									<span className="text-xl font-bold transition duration-300 ease-in-out hover:text-blue-500 cursor-pointer underline">{`${category.name}, `}</span>
								</Link>
							);
						})}
					</div>
					<img
						src={imgUrl}
						alt={title}
						className="object-top  w-full object-cover  shadow-lg rounded-lg lg:rounded-lg mb-8"
					/>
					{/* <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} /> */}
					<div className="mb-8 ">
						{post.content.raw.children.map((typeObj, index) => {
							const children = typeObj.children.map((item, itemindex) =>
								getContentFragment(itemindex, item.text, item)
							);

							return getContentFragment(index, children, typeObj, typeObj.type);
						})}
					</div>
					<AuthorCard author={author} />
					{/* <div className="py-8 px-4 mb-8 border-2 border-blue-300 flex flex-col justify-center lg:flex-row">
						<img src={author.photo.url} alt="" className=" align-middle rounded-full h-20 w-20 mx-auto" />
						<div className="lg:ml-8 text-center lg:text-left">
							<Link href={`/author/${author.slug}`}>
								<h4 className="text-xl font-semibold mb-2 cursor-pointer ">{author.name}</h4>
							</Link>

							<p>{author.bio}</p>
							<div className="flex text-2xl text-blue-400 mt-4 justify-center ">
								<a href="http://facebook.com/" target="_blank" className="mr-4">
									<FaFacebook />
								</a>
								<a href="http://twitter.com/" target="_blank" className="mr-4">
									<FaTwitter />
								</a>
							</div>
						</div>
					</div> */}
				</div>

				<div className="lg:col-span-4 col-span-1">
					<SideWidget content="featuredPost" />
					<SideWidget />
				</div>
			</div>
		</div>
	);
};

export default singlePostPage;
