import Head from 'next/head';
import { request, gql } from 'graphql-request';

import PostCard from '../components/PostCard';
import SideWidget from '../components/SideWidget';
import Carousel from '../components/Carousel';

export async function getStaticProps() {
	const query = gql`
		query GetPosts {
			posts(orderBy: createdAt_DESC) {
				id
				title
				slug
				excerpt
				createdAt
				content {
					markdown
				}
				author {
					id
					name
					bio
					slug
					photo {
						url
					}
				}
				categories {
					id
					name
					slug
				}
				image {
					url
				}
			}
		}
	`;

	const result = await request(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, query);

	return {
		props: {
			asd: result.posts,
		},
	};
}

// const posts = [
// 	{
// 		id: 1,
// 		title: 'New Nintendo Switch',
// 		img: 'https://images.unsplash.com/photo-1585427795543-33cf23ea2853?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
// 		excerpt:
// 			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam voluptatem, quasi accusantium deleniti consectetur fugit cumque atque praesentium magni eveniet.',
// 		categories: 'tech',
// 	},
// 	{
// 		id: 2,
// 		title: 'Playstation 5 Review',
// 		img: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
// 		excerpt:
// 			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam voluptatem, quasi accusantium deleniti consectetur fugit cumque atque praesentium magni eveniet.',
// 		categories: 'review',
// 	},
// 	{
// 		id: 3,
// 		title: 'Recommended VR Game',
// 		img: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2012&q=80',
// 		excerpt:
// 			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam voluptatem, quasi accusantium deleniti consectetur fugit cumque atque praesentium magni eveniet.',
// 		categories: 'editorial',
// 	},
// 	{
// 		id: 4,
// 		title: 'New Online Multiplayer Mode',
// 		img: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80',
// 		excerpt:
// 			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam voluptatem, quasi accusantium deleniti consectetur fugit cumque atque praesentium magni eveniet.',
// 		categories: 'news',
// 	},
// ];

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from 'swiper';
SwiperCore.use([Navigation, Pagination]);

export default function Home({ asd }) {
	return (
		<div className="container	mx-auto p-2 lg:p-0">
			<Head>
				<title>Game Blog</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Carousel />
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="lg:col-span-8 col-span-1">
					{asd.map((post) => (
						<PostCard post={post} key={post.id} />
					))}
				</div>
				<div className="lg:col-span-4 col-span-1">
					<SideWidget content="featuredPost" />
					<SideWidget content="review" />
				</div>
			</div>
		</div>
	);
}
