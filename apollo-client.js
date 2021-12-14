import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
	uri: 'https://api-ap-northeast-1.graphcms.com/v2/ckw0nad1i4eb601xwbtqz52bv/master',
	cache: new InMemoryCache(),
});

export default client;
