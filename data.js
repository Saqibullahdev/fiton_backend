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
    "title": "Looking for a Personal Trainer",
    "description": "I am looking for a personal trainer to help me improve my overall fitness.",
    "budget": 500,
    "availability": "Weekends",
    "location": "San Francisco, CA",
    "durationOfTraining": "3 months",
    "fitnessLevel": "Intermediate",
    "healthConditionsOrInjuries": "None",
    "email": "client@example.com",
    "phone": "123-456-7890",
    "postDate": "2024-06-01T00:00:00.000Z",
    "expirationDate": "2024-07-01T00:00:00.000Z",
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


