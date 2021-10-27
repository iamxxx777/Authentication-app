import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import connectDB from '../../../config/connectDB'
import Users from "../../../models/user" 
import bcrypt from "bcrypt"

connectDB();

export default NextAuth({
    session: {
        jwt: true,
    },

    providers: [
        Providers.Credentials({
            name: 'Credentials',
            async authorize(credentials) {
                try {
                    const email = credentials.email;
                    const password = credentials.password;
            
                    const user = await Users.findOne({email});
                    if(user) {
                        return logUser({user, password});
                    } 
            
                    return registerUser({email, password});

                } catch (error) {
                    const errorMessage = e.response.data.message;
                    
                    throw new Error(errorMessage + '&email=' + credentials.email);
                }
                
            }
        }),
        Providers.Facebook({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
          }),
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
            scope: "read:user"
        }),
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],

    database: process.env.DATABASE_URL,

    pages: {
        signUp: "/signup",
        error: "/signup",
        newUser: "/profile/edit",
    },

    callbacks: {
        session: async (session, user) => {
            session.userId = user.sub
            return Promise.resolve(session)
        }
    },

    debug: true,
});

const logUser = async ({ user, password }) => {
    if(!user.password) {
        throw new Error("You are not registered, please create an account");
    }

    const validated = await bcrypt.compare(password, user.password);

    if(!validated) {
        throw new Error("Password incorrect");
    }

    return user;
}


const registerUser = async ({ email, password }) => {
    let salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Users({email: email, password: hashedPassword});

    await newUser.save();

    return newUser;
}