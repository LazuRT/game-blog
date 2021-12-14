import React, { useEffect, useState } from 'react';
import { getCategoryPost, getFeaturedPosts } from '../api';
import Link from 'next/link';

const SideWidget = ({ content = 'review' }) => {
	const [loading, setLoading] = useState(true);
	const [widgetPost, setWidgetPost] = useState([]);

	useEffect(() => {
		if (content === 'featuredPost') {
			getFeaturedPosts()
				.then((result) => setWidgetPost(result))
				.then(() => setLoading(false));
		} else {
			getCategoryPost(content)
				.then((result) => setWidgetPost(result))
				.then(() => setLoading(false));
		}
	}, []);

	if (loading) return <div>Loading...</div>;
	return (
		<div className="mb-8">
			<h3 className="font-bold text-2xl mb-4 py-4 border-b-4 border-double border-blue-300 capitalize">
				{content === 'featuredPost' ? 'Featured Post' : `Recent ${content}`}
			</h3>
			{widgetPost.map((post) => (
				<div className="flex mb-6 border-b-2 border-dotted" key={post.id}>
					<div className="mr-4">
						<img src={post.image.url} alt={post.title} height="60px" width="60px" className="align-middle" />
					</div>
					<div className="flex-grow">
						<p className="text-gray-500">October 10, 2021</p>
						<Link key={post.slug} href={`/post/${post.slug}`}>
							<p className="font-bold transition-colors cursor-pointer hover:text-blue-500">{post.title}</p>
						</Link>
					</div>
				</div>
			))}
		</div>
	);
};

export default SideWidget;
