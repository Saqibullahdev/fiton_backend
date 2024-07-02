const post={
    "title": "Sample Post Title",
    "description": "This is a sample description of the post.",
    "budget": 500,
    "availability": "Weekends",
    "location": "New York",
    "durationOfTraining": "3 months",
    "fitnessLevel": "Beginner",
    "healthConditionsOrInjuries": "None",
    "contactInformation": {
      "email": "example@example.com",
      "phone": "123-456-7890"
    },
    "postDate": "2024-06-23T00:00:00Z",
    "expirationDate": "2024-12-23T00:00:00Z",
    "client_id": "60d5ec49f72e9c23d4e6d40a",  // Replace with a valid ObjectId
    "comments": [
      {
        "comment": "This is a sample comment from a client.",
        "client_id": "60d5ec49f72e9c23d4e6d40b",  // Replace with a valid ObjectId
        "trainer_id": null, // Ensure this is null or omitted
        "replies": [
          {
            "reply": "This is a sample reply from a client.",
            "client_id": "60d5ec49f72e9c23d4e6d40d", // Replace with a valid ObjectId
            "trainer_id": null // Ensure this is null or omitted
          },
          {
            "reply": "This is a sample reply from a trainer.",
            "client_id": null, // Ensure this is null or omitted
            "trainer_id": "60d5ec49f72e9c23d4e6d40e" // Replace with a valid ObjectId
          }
        ]
      },
      {
        "comment": "This is a sample comment from a trainer.",
        "client_id": null, // Ensure this is null or omitted
        "trainer_id": "60d5ec49f72e9c23d4e6d40c", // Replace with a valid ObjectId
        "replies": [
          {
            "reply": "This is a sample reply from a client.",
            "client_id": "60d5ec49f72e9c23d4e6d40d", // Replace with a valid ObjectId
            "trainer_id": null // Ensure this is null or omitted
          }
        ]
      }
    ]
  }
  


  const Post = require('../models/Post'); // Adjust the path to your Post model

// Function to get all posts with populated comments and replies
const getAllPosts = async (req, res) => {
    try {
        // Find all posts and populate nested fields
        const posts = await Post.find()
            .populate('client_id', 'name email') // Populate client_id in the post
            .populate({
                path: 'comments',
                populate: [
                    { path: 'client_id', select: 'name email' }, // Populate client_id in comments
                    { path: 'trainer_id', select: 'name email' }, // Populate trainer_id in comments
                    {
                        path: 'replies',
                        populate: [
                            { path: 'client_id', select: 'name email' }, // Populate client_id in replies
                            { path: 'trainer_id', select: 'name email' } // Populate trainer_id in replies
                        ]
                    }
                ]
            });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllPosts,
};


//admin
{
  "username": "admin_user",
  "email": "admin@example.com",
  "password": "securePassword123",
  "role": "admin"
}



//client
{
  "fullname": "John Doe",
  "email": "john.doe@example.com",
  "phone_number": "123-456-7890",
  "password": "securePassword123",
  "gender": "male",
  "date_of_birth": "1990-01-01T00:00:00.000Z",
  "role": "client",
  "posts": []
}
//trainer
{
  "fullname": "Jane Doe",
  "email": "jane.doe@example.com",
  "phone_number": "123-456-7890",
  "password": "securePassword123",
  "gender": "female",
  "date_of_birth": "1985-05-15T00:00:00.000Z",
  "role": "trainer",
  "expertise": "Yoga",
  "certification": "Certified Yoga Instructor",
  "experience": "5 years",
  "availability": "Weekdays 9am-5pm",
  "biography": "Experienced yoga instructor with a passion for holistic wellness.",
  "training_locations": "New York, NY",
  "isVerified": false
}

//client post,{
    "client_id": "60d0fe4f5311236168a109ca",
    
    "comments": [
        {
            "comment": "This sounds interesting!",
            "client_id": "60d0fe4f5311236168a109cb",
            "replies": [
                {
                    "reply": "Thank you! Please contact me for more details.",
                    "client_id": "60d0fe4f5311236168a109cc"
                }
            ]
        }
    ]
}


//comment 
{
  "comment": "This sounds interesting!",
  "client_id": "60d0fe4f5311236168a109cb",
  "trainer_id": null,
  "replies": [
      {
          "reply": "Thank you! Please contact me for more details.",
          "client_id": "60d0fe4f5311236168a109cc",
          "trainer_id": null
      }
  ]
}


// comment reply
{
  "reply": "Thank you! Please contact me for more details.",
  "client_id": "60d0fe4f5311236168a109cc",
  "trainer_id": null
}





const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainerSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    date_of_birth: {
        type: Date,
        required: true
    },

    role: {
        type: String,
        default: 'trainer'
    },

    expertise: {
        type: String,
        required: true
    },
    
    certification: {
        type: String,
        required: true
    },

    experience: {
        type: String,
        required: true
    },

    availability: {
        type: String,
        required: true
    },
    biography:{
        type: String,
        required: true
    }
    ,

    training_locations: {
        type: String,
        required: true
    },

    isVerified: {
        type: Boolean,
        default: false
    }

},{timestamps: true});

module.exports = mongoose.model('Trainer', trainerSchema);


const {
    client_id,
    title,
    description,
    budget,
    availability,
    location,
    durationOfTraining,
    fitnessLevel,
    healthConditionsOrInjuries,
    email,
    phone,
    postDate,
    expirationDate,
    comments
  } = req.body;


  //response of pos
  {
    "success": true,
    "ok": true,
    "data": [
        {
            "_id": "667fb84166f8b0c567a78dcc",
            "client_id": {
                "_id": "667f9d1870d3d25fa47db2c6",
                "fullname": "John Doe",
                "email": "john.doe@example.com"
            },
            "title": "Personal Training Session",
            "description": "Looking for a personal trainer for weekly sessions.",
            "budget": 50,
            "availability": "Weekends",
            "location": "New York, NY",
            "durationOfTraining": "1 hour",
            "fitnessLevel": "Beginner",
            "healthConditionsOrInjuries": "None",
            "email": "client@example.com",
            "phone": "123-456-7890",
            "postDate": "2024-06-29T00:00:00.000Z",
            "expirationDate": "2024-07-29T00:00:00.000Z",
            "createdAt": "2024-06-29T07:31:13.914Z",
            "updatedAt": "2024-06-29T11:03:44.472Z",
            "__v": 1
        },
        {
           
        }
    ]
}