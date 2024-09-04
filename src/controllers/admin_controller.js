const AdminServices = require("../services/admin_service");
const { StatusCodes } = require("http-status-codes");
// Function to create a new admin

const createAdmin = async (req, res) => {
  try {
    console.log("Creating admin");
    const { email, password, username } = req.body;
    const admin = await AdminServices.createAdmin(email, password, username);
    res.status(StatusCodes.CREATED).json({
      message: "Admin created successfully",
      data: admin,
      status: "success",
      ok: true,
    });
  } catch (error) {
    return res.status(StatusCodes.CONFLICT).json({
      error: error.message || "Error creating admin. Please change the email",
      success: false,
      ok: false,
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    const admin = await AdminServices.AdminById(req.admin.id);
    res.status(StatusCodes.OK).json({
      message: "Admin fetched successfully",
      data: admin,
      status: "success",
      ok: true,
    });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      error: error.message || "Error fetching admin",
      success: false,
    });
  }
};
const loginAdmin = async (req, res) => {
  try {
    console.log("Logging in admin");
    const { email, password } = req.body;
    console.log("Email:", email);
    console.log("Password:", password);
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Please provide email and password",
        success: false,
        ok: false,
      });
    }
    const token = await AdminServices.LoginAdmin(email, password);
    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(StatusCodes.OK).json({
      message: "Admin logged in successfully",
      data: token,
      status: "success",
      ok: true,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Error logging in admin",
      success: false,
    });
  }
};

const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("admin_token");
    res.status(StatusCodes.OK).json({
      message: "Admin logged out successfully",
      status: "success",
      ok: true,
    });
  } catch (error) {
    console.error("Error logging out admin:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Error logging out admin",
      success: false,
    });
  }
};

const isLoggedIn = async (req, res, next) => {
  const admin = req.admin;
  res.status(StatusCodes.OK).json({
    message: "Admin is logged in",
    data: admin,
    status: "success",
    ok: true,
  });
};

const UpdateProfile = async (req, res) => {
  try {
    const { username, email, phone_number, gender, date_of_birth } = req.body;

    const admin = await AdminServices.UpdateProfile(
      req.admin.id,
      username,
      email,
      phone_number,
      gender,
      date_of_birth
    );

    res.status(StatusCodes.OK).json({
      message: "Admin profile updated successfully",
      data: admin,
      status: "success",
      ok: true,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Error updating admin profile",
      success: false,
    });
  }
};

const ChangePassword=async(req,res)=>{
    const {oldPassword,newPassword}=req.body;
    try{
        const admin=await AdminServices.ChangePassword(req.admin.id,oldPassword,newPassword);
        res.status(StatusCodes.OK).json({
            message:"Password changed successfully",
            data:admin,
            status:"success",
            ok:true
        });
    }
    catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error:error.message||"Error changing password",
            success:false
        });
    }
}

module.exports = {
  createAdmin,
  loginAdmin,
  logoutAdmin,
  isLoggedIn,
  getAdminById,
UpdateProfile,
ChangePassword
};
