import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '../api';
import { FaBars, FaAngleDown } from 'react-icons/fa';

// const categories = [
// 	{ name: 'News', slug: 'news' },
// 	{ name: 'Reviews', slug: 'reviews' },
// 	{ name: 'Tech', slug: 'tech' },
// 	{ name: 'Editorial', slug: 'editorial' },
// ];

const Header = () => {
	const [categories, setCategories] = useState([]);
	const [display, setDisplay] = useState(false);

	useEffect(() => {
		getCategories().then((data) => setCategories(data));
	}, []);

	const handleClick = () => {
		setDisplay(!display);
	};

	return (
		<div className="container mx-auto mb-10 ">
			<div className="flex flex-col relative md:flex-row justify-between py-6 border-b-2 items-center">
				<div className="text-4xl cursor-pointer">
					<Link href="/">NextBlog</Link>
				</div>
				<div className="md:hidden absolute right-8 top-8 cursor-pointer text-2xl" onClick={handleClick}>
					<FaBars />
				</div>
				<div className={`${display ? 'flex' : 'hidden'} md:flex flex-col mt-4 md:flex-row`}>
					{categories.map((category) => (
						<Link key={category.slug} href={`/category/${category.slug}`}>
							<span className="cursor-pointer mx-2 text-lg transition-colors hover:text-blue-500">{category.name}</span>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Header;
