const {createAdminValidator}=require('./adminvalidator')
const {createClientValidator}=require('./clientValidator')
const {isAdmin}=require('./isAdmin')
const {isClient}=require('./isClient')
const {isTrainer}=require('./isTrainer')
const {createPostValidator}=require('./postValidator')
const {createTrainerValidator}=require('./trainerValidator')


module.exports={
    createAdminValidator,
    createClientValidator,
    isAdmin,
    isClient,
    isTrainer,
    createPostValidator,
    createTrainerValidator
}





