import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import resolvers from './data/resolvers';
import schema from './data/schema';

const PORT = 8080;

const app = express();

app.get('/', (req, res) => {
    res.send('GraphQL is cool!');
});

const root = resolvers;

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}/graphql`);
});