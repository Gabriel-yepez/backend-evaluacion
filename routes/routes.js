const { Router }= require ("express");
const { getAllUsers, getByid, createUser, updateUser, deleteUser}= require("../controllers/userControllers");
const { registerUser, loginUser } = require("../controllers/auth/authControllers");
const router = Router();

    router.get("/health", (req, res) => {
        res.send("Api is Healthy!!!");
      });

    // auth
    router.post("/auth/register", registerUser)
    router.post("/auth/login", loginUser)
    
    // usuarios
    router.get("/usuarios", getAllUsers);
    router.get("/usuarios/:id", getByid)
    router.post("/usuarios", createUser)
    router.put("/usuarios/:id", updateUser)
    router.delete("/usuarios/:id", deleteUser)

    module.exports= router;
