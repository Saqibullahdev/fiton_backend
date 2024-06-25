const Client=require('../models/client_post')
const {hashPassword}=require('../helpers/hashpassword')
const {generateToken}=require('../helpers/jwtToken')


class clientServices{
    async createClient(fullname,email,phone_number,password,date_of_birth,gender){
        try{
            const hashedPassword=await hashPassword(password);
            const client=new Client({
                fullname,
                email,
                phone_number,
                password:hashedPassword,
                date_of_birth,
                gender

            });
            await client.save();
            return client;
        }catch(error){
            console.error('Error creating client:',error);
            throw new Error('Error creating client');
        }
    }

    async LoginClient(email,password){
        try{
            const client=await Client.findOne({email});
            if(!client){
                throw new Error('Client not found');
            }
            const isValidPassword=await argon2.verify(client.password,password);
            if(!isValidPassword){
                throw new Error('Invalid password');
            }
            const token=generateToken({id:client._id,email:client.email,role:'client',username:client.fullname});
            if(!token){
                throw new Error('Error generating token');
            }
            return token;
        
        }
        catch(error){
            console.error('Error logging in client:',error);
            throw new Error('Error logging in client');
        }

    }
}

module.exports=new clientServices();