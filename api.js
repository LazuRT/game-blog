import { request, gql, GraphQLClient } from 'graphql-request';
// const endpoint = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT);
// Get all featured Post
export const getFeaturedPosts = async () => {
	const query = gql`
		query GetFeaturedPosts {
			posts(where: { featuredPost: true }, orderBy: createdAt_DESC) {
				id
				title
				slug
				excerpt
				createdAt
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
	// const result = await request(endpoint, query);
	const result = await client.request(query);
	return result.posts;
};

// Get all categories
export const getCategories = async () => {
	const query = gql`
		query GetCategories {
			categories {
				id
				name
				slug
			}
		}
	`;
	// const result = await request(endpoint, query);
	const result = await client.request(query);

	return result.categories;
};

// Get all post by category
export const getCategoryPost = async (categorySlug) => {
	const query = gql`
		query GetPostByCategory($slug: String!) {
			posts(where: { categories_some: { slug: $slug } }, orderBy: createdAt_DESC) {
				id
				title
				slug
				excerpt
				createdAt
				author {
					id
					name
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
	const variable = {
		slug: categorySlug,
	};

	const result = await client.request(query, variable);

	return result.posts;
};

// Get all author
export const getAuthors = async () => {
	const query = gql`
		query GetCategories {
			authors {
				id
				name
				slug
			}
		}
	`;
	// const result = await request(endpoint, query);
	const result = await client.request(query);

	return result.authors;
};

// Get all post by author
export const getAuthorPost = async (authorSlug) => {
	const query = gql`
		query GetPostByAuthor($slug: String!) {
			posts(where: { author: { slug: $slug } }, orderBy: createdAt_DESC) {
				id
				title
				slug
				excerpt
				createdAt
				author {
					id
					name
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
	const variable = {
		slug: authorSlug,
	};
	const query2 = gql`
		query GetAuthor($slug: String!) {
			author(where: { slug: $slug }) {
				photo {
					url
				}
				name
				bio
				slug
			}
		}
	`;
	const variable2 = {
		slug: authorSlug,
	};

	const result = await client.request(query, variable);
	const result2 = await client.request(query2, variable2);
	const data = {
		posts: result.posts,
		author: result2.author,
	};
	// return { result, result2 };
	return data;
};

// Get one post detail by slug
export const getSinglePostDetail = async (slug) => {
	const query = `
		query GetSinglePostDetail($slug: String!) {
			post(where: { slug: $slug }) {
				id
				slug
				title
				excerpt
				createdAt
				categories {
					id
					name
					slug
				}
				image {
					url
				}
				content {
					markdown
					raw
				}
				author {
					id
					name
					bio
					slug
					photo{
						url
					}
		
				}
			}
		}
	`;

	const variable = {
		slug: slug,
	};
	const result = await client.request(query, variable);

	return result;
};
