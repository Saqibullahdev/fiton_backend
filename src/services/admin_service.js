const {hashPassword}=require('../helpers/hashpassword');
const Admin=require('../models/admin_model');
const {generateToken}=require('../helpers/jwtToken');
const argon2 = require('argon2');

class adminServices{
    async createAdmin(email,password,username){
        try{
            const isExistingAdmin=await Admin.findOne({ email });
            console.log('isExistingAdmin:',isExistingAdmin);  
            if(isExistingAdmin){
                console.log('exists');
                throw new Error('Admin already exists');
            }
            const hashedPassword=await hashPassword(password);
            const admin=new Admin({email,password:hashedPassword,username});
            console.log('Admin:',admin);
            await admin.save();
            return admin;
        }catch(error){
            if(error.message==='exists'){
                throw new Error('Admin already exists');
            }
            throw new Error(error.message||'Error creating admin');
        }
    }

    async LoginAdmin(email,password){
        try{
            const admin=await Admin.findOne({email});
            if(!admin){
                throw new Error('Admin not found');
            }
            const isValidPassword=await argon2.verify(admin.password,password);
            if(!isValidPassword){
                throw new Error('Invalid password');
            }
            const token=generateToken({id:admin._id,email:admin.email,role:'admin',username:admin.username});
            if(!token){
                throw new Error('Error generating token');
            }
            return token;
        
        }
        catch(error){
            console.error('Error logging in admin:',error);
            throw new Error('Error logging in admin');
        }

    }

 
}

module.exports=new adminServices();