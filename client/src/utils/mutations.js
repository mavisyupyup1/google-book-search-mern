import{gql} from "@apollo/client"

export const LOGIN_USER =gql`
mutation login($email:String!, $password: String!){
    login(email:$email,password:$password){
        token
        user{
            _id
            username
        }
    }
}
`;

export const ADD_USER =gql`
mutation addUser($username:String!, $email:String! $password:String!){
    token
    user{
        _id
        username
    }
}
`;

export const ADD_BOOK =sql`
mutation savedBooks ($authors:[String],$description:String!, $bookId:String!, $image: String, $link: String){
    savedBooks (authors: $authors, description: $description,title: $title, bookId:$bookId,image:$image, link:$link{
        _id
        username
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image 
            link
            
        }
    }
`