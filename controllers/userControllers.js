const userServices = require("../services/userServices")
const services = new userServices()

const getAllUsers = async (req, res)=>{

    try {
        const users = await services.getAllUsers()
        if (users.length === 0) return res.status(404).json({ message: "no users Found." });
        res.status(200).json(users)
      } catch (error) {
        console.log(error)
        res.stattus(500).json(error)
      }
}

const getByid = async (req, res)=>{

    try {
        const user = await services.getByid(req.params.id)
        if (!user) return res.status(404).json({ message: "user not Found." });
        res.status(200).json(user)
      } catch (error) {
        console.log(error)
        res.stattus(500).json(error)
      }
}

const createUser = async (req, res)=>{

    try {
        const newUser = req.body
        const result = await services.createUser(newUser)
        res.status(201).json(result)
      } catch (error) {
        console.log(error)
        res.status(400).json(error)
      }
}

const updateUser = async (req, res)=>{

    try {
        const user = await services.updateUser(req.params.id, req.body)
        if (!user) return res.status(404).json({ message: "user not Found." });
        res.status(200).json(user)
      } catch (error) {
        console.log(error)
        res.stattus(500).json(error)
      }
}

const deleteUser = async (req, res)=>{

    try {
        const user = await services.deleteUser(req.params.id)
        if (!user) return res.status(404).json({ message: "user not Found." });
        res.status(200).json(user)
      } catch (error) {
        console.log(error)
        res.stattus(500).json(error)
      }
}

module.exports = {
    getAllUsers,
    getByid,
    createUser,
    updateUser,
    deleteUser
};