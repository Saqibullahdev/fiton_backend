const clientServices = require("../services/client_service");
const { StatusCodes } = require("http-status-codes");

//create a new client

const createClient = async (req, res) => {
  try {
    const { fullname, email, phone_number, password, date_of_birth, gender } =
      req.body;
    const client = await clientServices.createClient(
      fullname,
      email,
      phone_number,
      password,
      date_of_birth,
      gender
    );
    res.status(StatusCodes.CREATED).json({
      message: "Client created successfully",
      data: client,
      status: "success",
      ok: true,
    });
  } catch (error) {
    console.error("Error creating client:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Error creating",
      success: false,
    });
  }
};


//login a client

const loginClient = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Please provide email and password",
        success: false,
      });
    }
    const token = await clientServices.LoginClient(email, password);
    res.cookie("client_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(StatusCodes.OK).json({
      message: "Client logged in successfully",
      data: token,
      status: "success",
      ok: true,
    });
  } catch (error) {
    console.error("Error logging in client:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Error logging in client",
      success: false,
    });
  }
};


//logout a client

const logoutClient = async (req, res) => {
  try {
    res.clearCookie("client_token");
    res.status(StatusCodes.OK).json({
      message: "Client logged out successfully",
      status: "success",
      ok: true,
    });
  } catch (error) {
    console.error("Error logging out client:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Error logging out client",
      success: false,
    });
  }
};


const isLoggedIn=async(req,res,next)=>{
  const client=req.client
  res.status(StatusCodes.OK).
  json({
      message:'client is logged in',
      data:client,
      status:'success',
      ok:true
  })
}
module.exports = {
  createClient,
  loginClient,
  logoutClient,
  isLoggedIn,
};
