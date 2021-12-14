import React from 'react';
import Link from 'next/link';

const PostCard = ({ post }) => {
	const { slug, image, author, categories } = post;
	return (
		<div className="my-8">
			<div className="mb-2 hover:cursor-pointer">
				<Link key={slug} href={`/post/${slug}`}>
					<img src={post.image.url} alt={post.title} className=" rounded-xl shadow-lg" />
				</Link>
			</div>
			<div className="mb-2">
				{post.categories.map((category, index) => {
					if (index === categories.length - 1)
						return (
							<Link key={category.slug} href={`/category/${category.slug}`}>
								<span className="text-xl font-bold transition duration-300 ease-in-out	 hover:text-blue-500 cursor-pointer">{`${category.name} `}</span>
							</Link>
						);
					return (
						<Link key={category.slug} href={`/category/${category.slug}`}>
							<span className="text-xl font-bold transition duration-300 ease-in-out	 hover:text-blue-500 cursor-pointer">{`${category.name}, `}</span>
						</Link>
					);
				})}
				<p className="text-gray-500">
					{new Date(post.createdAt).toLocaleDateString('en-us', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
				</p>
			</div>
			<Link key={slug} href={`/post/${slug}`}>
				<h3 className="font-extrabold text-3xl mb-4 transition-colors hover:text-blue-500 cursor-pointer inline-block ">
					{post.title}
				</h3>
			</Link>
			<p className="text-gray-600 mb-4 text-lg">{post.excerpt}</p>
			<div className="flex align-middle items-center mb-12  ">
				<img src={author.photo.url} className="align-middle rounded-full h-12 w-12" />
				<Link href={`/author/${author.slug}`}>
					<p className="ml-4 font-bold transition-colors hover:text-blue-500 cursor-pointer">{author.name}</p>
				</Link>
			</div>
		</div>
	);
};

export default PostCard;
