import React from 'react';

const Footer = () => {
	return (
		<footer className=" bg-blue-400 text-white ">
			<div className="container mx-auto">
				<div className="py-4 flex flex-col md:flex-row mx-auto gap-4">
					<div className="border-b md:border-b-0 pb-2 text-center md:text-left md:border-r md:w-1/3">
						<h3 className="text-2xl font-semibold">Don't Miss Out</h3>
						<h4>Subscribe to our newsletter</h4>
						<div className="my-2">
							{/* <input type="text" className=" w-full h-14" />
					<button className="cursor-pointer outline-none border-none h-14">Subscribe</button> */}
							<input type="text" placeholder="Your Email..." className=" border py-2 pr-2 text-black" />
							<button className="text-sm bg-black py-3 pr-2 rounded-r-full hover:opacity-50 ">Sign Up</button>
						</div>
						<p className="text-sm">
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident libero deserunt corporis id? Fuga,
							fugit? Quaerat ipsa nostrum architecto ipsum.
						</p>
					</div>
					<div className="border-b md:border-b-0 md:border-r pb-2 flex flex-row md:w-1/3 justify-evenly ">
						<div className="flex flex-col ">
							<a href="/">About Us</a>
							<a href="/">Meet the Team</a>
							<a href="/">About Us</a>
							<a href="/"> Advertising</a>
						</div>
						<div className="flex flex-col">
							<a href="/">Privacy</a>
							<a href="/">Term and Condition</a>
							<a href="/">Advertising</a>
							<a href="/">Disclaimer</a>
						</div>
					</div>
					<div className="flex flex-col mx-auto pb-2">
						{/* <div className=''> */}
						<h3 className="text-xl font-semibold">Connect with Us</h3>
						<a href="/">Instagram</a>
						<a href="/">Facebook</a>
						<a href="/">Youtube</a>
						<a href="/">Twitter</a>
						{/* </div> */}
					</div>
				</div>
				<div className="text-center pb-2">
					© 2021 <span className="font-semibold">NextBlog</span> Built by LZRT
				</div>
			</div>
		</footer>
	);
};

export default Footer;
