const {gql} = require('apollo-server-express');
const { model } = require('mongoose');
const {User, bookSchema}=require('../models')
const Auth =require("../utils/auth")
const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
  }
type Book {
    _id:ID
    authors:String
    description: String
    bookId: String
    image:String
    link: String
    title: String
}
type Auth {
    token: ID!
    user: User
  }

type Query {
    me: User
    users: [User]
    user(username: String!): User
    
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addBook(authors:[String],
        description: String,
        bookId: String,
        image:String,
        link: String,
        title: String): User
    removeBook(bookId:String!):User
}
`;
module.exports=typeDefs