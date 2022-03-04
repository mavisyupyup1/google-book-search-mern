const {AuthenticationError}= require('apollo-server-express')
const {User}=require('../models');
const bookSchema = require('../models/Book');
const {signToken} = require('../utils/auth')

const resolvers ={
   Query:{
    me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('bookSchema');
  
          return userData;
        }
    }
    },
    Mutation:{
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
          },
          login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
            return { token, user };
          },
          savedBooks: async (parent, args, context) => {
            if (context.user) {
              const updatedUser = await savedBooks.create({ ...args, username: context.user.username });
      
              await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: args} },
                { new: true , runValidators: true}
              );
      
              return updatedUser;
            }},
       removeBook: async(parent,{bookId},context)=>{
        if(context.user){
          const updatedUser =await User.findByIdAndUpdate(
            { _id:context.user._id},
            {$pull:{savedBooks:{bookId:bookId}}},
            {new:true}
          )
          return updatedUser;
        }
       }
            throw new AuthenticationError('You need to be logged in!');
          },
}

module.exports = resolvers;
