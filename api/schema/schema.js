const graphql = require('graphql');

const { GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString }
 = graphql;
const _ = require('lodash')

const Author = require("../models/Author")
const Book = require("../models/Books");

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () =>({
        id: { type: GraphQLID },
        name: { type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent,args){
                //return _.find(authors,{id:parent.authorID})
            }
        },
        
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                //return _.filter(books,{authorID: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        books: {
            type: BookType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent,args){
                //return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID}
            },
            resolve(parent,args){
                //return _.find(authors,{id: args.id});
            }
        },
        books: {
            type: GraphQLList(BookType),
            resolve(parent,args){
                //return books;
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve(parent,args){
                //return authors
            }
        }
        
    } 
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt}
            },
            resolve(parent,args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                })

                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                author: {type: GraphQLString},
                authorID: {type: GraphQLString}
            },
            resolve(parent,args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    author: args.author,
                    authorID: args.authorID
                })

                return book.save();
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})