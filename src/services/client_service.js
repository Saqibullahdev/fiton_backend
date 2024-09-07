const Client = require("../models/client_model");
const { hashPassword, verifyPassword } = require("../helpers/hashpassword");
const { generateToken } = require("../helpers/jwtToken");
const { generateOTP } = require("../helpers/Otp");
const { sendEmail } = require("../utils/sendEmail");
const argon2 = require("argon2");

class clientServices {
  async createClient(
    fullname,
    email,
    phone_number,
    password,
    date_of_birth,
    gender
  ) {
    try {
      const hashedPassword = await hashPassword(password);
      const client = new Client({
        fullname,
        email,
        phone_number,
        password: hashedPassword,
        date_of_birth,
        gender,
      });
      await client.save();
      return client;
    } catch (error) {
      throw new Error(error.message || "Error creating client");
    }
  }

  async LoginClient(email, password) {
    try {
      // Find the client by email
      const client = await Client.findOne({ email });
      if (!client) {
        throw new Error("Client not found with the provided email");
      }

      // Verify the password
      const isValidPassword = await verifyPassword(password, client.password);
      if (!isValidPassword) {
        throw new Error("Invalid password! Please check your password");
      }

      // Generate JWT token
      const token = generateToken({
        id: client._id,
        email: client.email,
        role: "client",
        username: client.fullname,
      });

      if (!token) {
        throw new Error("Error generating authentication token");
      }

      // Return token and client information (excluding password)
      return token;
    } catch (error) {
      throw new Error(error.message || "Error logging in client");
    }
  }

  async getClientById(id) {
    try {
      const client = await Client.findById(id).select("-password");
      if (!client) {
        throw new Error("Client not found");
      }

      return client;
    } catch (error) {
      throw new Error(error.message || "Error fetching client");
    }
  }
  async deleetClient(id) {
    try {
      const client = await Client.findByIdAndDelete(id);
      if (!client) {
        throw new Error("Client not found");
      }
      return client;
    } catch (error) {
      throw new Error(error.message || "Error deleting client from database");
    }
  }

  async updateClient(id, fullname, email, phone_number, date_of_birth, gender) {
    try {
      const client = await Client.findById(id);
      if (!client) {
        throw new Error("Client not found");
      }
      const UpdatedClient = {
        fullname: fullname || client.fullname,
        email: email || client.email,
        phone_number: phone_number || client.phone_number,
        gender: gender || client,
        date_of_birth: date_of_birth || client.date_of_birth,
      };
      const response = await Client.findByIdAndUpdate(id, UpdatedClient, {
        new: true,
      });
      if (!response) {
        throw new Error("Error updating client");
      }
      return response;
    } catch (error) {
      throw new Error(error.message || "Error updating client");
    }
  }

  async ChangePassword(id, oldPassword, newPassword) {
    try {
      const client = await Client.findById(id);
      if (!client) {
        throw new Error("client not found");
      }
      const isValidPassword = await verifyPassword(
        oldPassword,
        client.password
      );
      if (!isValidPassword) {
        throw new Error("your old password is incorrect");
      }
      const hashedPassword = await hashPassword(newPassword);
      const updateclient = await Client.findByIdAndUpdate(
        id,
        { password: hashedPassword },
        { new: true }
      );
      if (!updateclient) {
        throw new Error("Error occur while updating password");
      }
      return updateclient;
    } catch (error) {
      throw new Error(error.message || "Error changing password");
    }
  }

  async sendOTP(email) {
    try {
      console.log("before finding client");
      const client = await Client.findOne({ email });
      console.log("after finding client");
      console.log(client);
      if (!client) {
        throw new Error("Client not found with the provided email");
      }
      const otp = generateOTP();
      const subject = "Password Reset OTP";
      const message = `Your OTP is ${otp}`;
      client.otp = otp;
      client.otpExpires = Date.now() + 360000; //mean current time + 360000ms = 6 minutes
      await client.save();

      const response = await sendEmail(email, subject, message);
      if (!response) {
        throw new Error("Error sending OTP to your email");
      }
      return otp;
    } catch (error) {
      throw new Error(error.message || "Error sending OTP to your email");
    }
  }

  async verifyOTP(email, otp, newPassword) {
    try {
      const client = await Client.findOne({ email });
      if (!client) {
        throw new Error("Client not found with the provided email");
      }
      if (otp !== client.otp || Date.now() > client.otpExpires) {
        throw new Error("Invalid OTP");
      }
      const hashedPassword = await hashPassword(newPassword);
      client.password = hashedPassword;
      client.otp = null;
      client.otpExpires = null;
      await client.save();
      return client;
    } catch (error) {
      throw new Error(error.message || "Error verifying OTP");
    }
  }
}

module.exports = new clientServices();
