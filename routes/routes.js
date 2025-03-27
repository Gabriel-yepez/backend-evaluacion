const { Router }= require ("express");
const { getAllUsers, getByid, createUser, updateUser, deleteUser, getUserCount}= require("../controllers/userControllers");
const { registerUser, loginUser } = require("../controllers/auth/authControllers");
const { getEvaluacionCount } = require("../controllers/evaluacionController");
const router = Router();

    router.get("/health", (req, res) => {
        res.send("Api is Healthy!!!");
      });

    // auth
    router.post("/auth/register", registerUser)
    router.post("/auth/login", loginUser)
    
    // usuarios
    router.get("/usuarios/count", getUserCount)
    router.get("/usuarios", getAllUsers)
    router.get("/usuarios/:id", getByid)
    router.post("/usuarios", createUser)
    router.put("/usuarios/:id", updateUser)
    router.delete("/usuarios/:id", deleteUser)

    //evaluaciones
    router.get("/evaluaciones/count", getEvaluacionCount)
    module.exports= router;
