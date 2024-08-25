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
      secure:false,
    });
    res.status(StatusCodes.OK).json({
      message: "Client logged in successfully",
      data: token,
      status: "success",
      ok: true,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Error logging in client",
      success: false,
    });
  }
};


//logout a client

const logoutClient = async (req, res) => {
  try {
   return res.clearCookie("client_token").
    status(StatusCodes.OK).json({
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

const deleteClient=async(req,res)=>{
  try{
    const {client_id}=req.body
    const client=await clientServices.deleetClient(client_id);
    res.status(StatusCodes.OK).json({
      message:'Client deleted successfully',
      data:client,
      status:'success',
      ok:true
    })
  }catch(error){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error:error.message||'Error deleting client',
      success:false
    })
  }
}

const getClientById=async(req,res)=>{
  try{
    const client=await clientServices.getClientById(req.client.id);
    res.status(StatusCodes.OK).json({
      message:'Client fetched successfully',
      data:client,
      status:'success',
      ok:true
    })
  }catch(error){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error:error.message||'Error fetching client',
      success:false
    })
  }
}
module.exports = {
  deleteClient,
  createClient,
  loginClient,
  logoutClient,
  isLoggedIn,
  getClientById
};
