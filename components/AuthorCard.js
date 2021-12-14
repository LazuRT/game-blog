import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaFacebook } from 'react-icons/fa';

const AuthorCard = ({ author }) => {
	return (
		<div className="py-8 px-4 mb-8 border-2 border-blue-300 flex flex-col justify-center lg:flex-row shadow-sm">
			<img src={author.photo.url} alt="" className=" align-middle rounded-full h-28 w-28 mx-auto" />
			<div className="lg:ml-8 text-center lg:text-left">
				<Link href={`/author/${author.slug}`}>
					<h4 className="text-xl font-semibold mb-2 cursor-pointer transition-colors hover:text-blue-500">
						{author.name}
					</h4>
				</Link>

				<p>{author.bio}</p>
				<div className="flex text-2xl text-blue-500 mt-4 justify-center lg:justify-start">
					<a href="http://facebook.com/" target="_blank" className="mr-4 hover:opacity-70 transition-opacity	">
						<FaFacebook />
					</a>
					<a href="http://twitter.com/" target="_blank" className="mr-4 hover:opacity-70 transition-opacity">
						<FaTwitter />
					</a>
				</div>
			</div>
		</div>
	);
};

export default AuthorCard;
