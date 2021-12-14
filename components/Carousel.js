import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getFeaturedPosts } from '../api';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import SwiperCore, { Navigation, Pagination } from 'swiper';
SwiperCore.use([Navigation, Pagination]);

const Carousel = () => {
	const [carouselPost, setCarouselPost] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getFeaturedPosts()
			.then((result) => setCarouselPost(result))
			.then(() => setLoading(false));
	}, []);

	if (loading) return <div>Loading...</div>;

	return (
		<>
			<h3 className="text-center font-semibold text-4xl mb-8 ">Featured Post</h3>
			<Swiper navigation={true} pagination={true} className="mySwiper">
				{carouselPost.map((post) => {
					const { slug, image, author, categories, excerpt, createdAt } = post;
					return (
						<SwiperSlide post={post} key={post.id}>
							<div className="grid grid-cols-1 lg:grid-cols-12">
								<div className="lg:col-span-6 col-span-1 h">
									<img src={post.image.url} alt={post.title} className="carousel-img" />
								</div>
								<div className=" col-span-1 text-center lg:text-left lg:ml-8 lg:col-span-6">
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
									<div className="flex justify-center mb-12 lg:justify-start">
										<img src={author.photo.url} className="rounded-full h-12 w-12" />
										<Link href={`/author/${author.slug}`}>
											<p className="ml-4 font-bold transition-colors hover:text-blue-500 cursor-pointer">
												{author.name}
											</p>
										</Link>
									</div>
								</div>
							</div>
						</SwiperSlide>
					);
				})}

				{/* <SwiperSlide>Slide 1 </SwiperSlide>
			<SwiperSlide>Slide 2</SwiperSlide>
			<SwiperSlide>Slide 3</SwiperSlide>
			<SwiperSlide>Slide 4</SwiperSlide> */}
			</Swiper>
		</>
	);
};

export default Carousel;
