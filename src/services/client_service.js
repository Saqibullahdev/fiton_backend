const Client=require('../models/client_model')
const {hashPassword}=require('../helpers/hashpassword')
const {generateToken}=require('../helpers/jwtToken')
const argon2=require('argon2');

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
            console.error('Error creating client ->:',error.message);
            throw new Error(error.message || 'Error creating client');
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
            throw new Error(error.message || 'Error logging in client');
        }

    }

    async getClientById(id){
        try{
            const client=await Client.findById(id).select('-password');
            if(!client){
                throw new Error('Client not found');
            }

            return client;
        }
        catch(error){
            throw new Error(error.message || 'Error fetching client');
        }
    }
    async deleetClient(id){
        try{
            const client=await Client.findByIdAndDelete(id);
            if(!client){
                throw new Error('Client not found');
            }
            return client;
        }
        catch(error){
            throw new Error(error.message || 'Error deleting client from database');
        }
    }
}

module.exports=new clientServices();