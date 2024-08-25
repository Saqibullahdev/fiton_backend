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

    async AdminById(id){
        try{
            const admin=await Admin.findById(id).select('-password');
            if(!admin){
                throw new Error('Admin not found');
            }
            
            return admin;
        }catch(error){
            throw new Error(error.message||'Error fetching admin');
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
            throw new Error(error.message || 'Error logging in admin');
        }

    }

    async UpdateProfile(id,username,email,phone_number,gender,date_of_birth){
        try{
            console.log("updating admin service");
            const admin=await Admin.findById(id);
            if(!admin){
                throw new Error('Admin not found for respective id');
            }
            let updatedAdmin={
                username:username||admin.username,
                email:email||admin.email,
                phone_number:phone_number||admin.phone_number,
                gender:gender||admin,
                date_of_birth:date_of_birth||admin.date_of_birth,

            };
            const updateAdmin=await Admin.findByIdAndUpdate(id,updatedAdmin,{new:true});
            if(!updateAdmin){
                throw new Error('Error updating admin profile');
            }
            return updateAdmin;
        }catch(error){
            throw new Error(error.message||'Error updating admin profile');
        }
    }

    async ChangePassword(id,oldPassword,newPassword){
        try{
            const admin=await Admin.findById(id);
            if(!admin){
                throw new Error('Admin not found');
            }
            const isValidPassword=await argon2.verify(admin.password,oldPassword);
            if(!isValidPassword){
                throw new Error('your old password is incorrect');
            }
            const hashedPassword=await hashPassword(newPassword);
            const updateAdmin=await Admin.findByIdAndUpdate(id,{password:hashedPassword},{new:true});
            if(!updateAdmin){
                throw new Error('Error occur while updating password');
            }
            return updateAdmin;
        }catch(error){
            throw new Error(error.message||'Error changing password');
        }
    }

 
}

module.exports=new adminServices();