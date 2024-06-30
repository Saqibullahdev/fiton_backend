const AdminServices=require('../services/admin_service');
const {StatusCodes}=require('http-status-codes')
// Function to create a new admin

const createAdmin=async(req,res)=>{
    try{
        console.log('Creating admin');
        const {email,password,username}=req.body;
        const admin=await AdminServices.createAdmin(email,password,username);
        res.status(StatusCodes.CREATED).json({
            message:'Admin created successfully',
            data:admin,
            status:'success',
            ok:true
        
        });
    }catch(error){
            return res.status(StatusCodes.CONFLICT).json({
                error:error.message||"Error creating admin. Please change the email",
                success:false,
                ok:false
            });
        }
        
    }

    



const loginAdmin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(StatusCodes.BAD_REQUEST).json({
                error:'Please provide email and password',
                success:false,
                ok:false
            });
        }
        const token=await AdminServices.LoginAdmin(email,password);
        res.cookie(
            'admin_token',
            token,
            {
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:'strict'
            }
        );
        res.status(StatusCodes.OK).json({
            message:'Admin logged in successfully',
            data:token,
            status:'success',
            ok:true
        });
    }catch(error){
        console.error('Error logging in admin:',error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error:'Error logging in admin',
            success:false
        });
    }
}


const logoutAdmin=async(req,res)=>{
    try{
        res.clearCookie('admin_token');
        res.status(StatusCodes.OK).json({
            message:'Admin logged out successfully',
            status:'success',
            ok:true
        });
    }catch(error){
        console.error('Error logging out admin:',error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error:'Error logging out admin',
            success:false
        });
    }
}

const isLoggedIn=async(req,res,next)=>{
    const admin=req.admin
    res.status(StatusCodes.OK).
    json({
        message:'Admin is logged in',
        data:admin,
        status:'success',
        ok:true
    })
}

module.exports={
    createAdmin,
    loginAdmin,
    logoutAdmin,
    isLoggedIn
}