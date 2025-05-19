const { Router }= require ("express");
const { getAllUsers, getByid, createUser, updateUser, deleteUser, getUserCount}= require("../controllers/userControllers");
const { registerUser, loginUser } = require("../controllers/auth/authControllers");
const { getEvaluacionCount, getAllEvaluacion, createEvaluacion } = require("../controllers/evaluacionController");
const { getAllObjetivos, getObjetivoById, createObjetivo, updateObjetivoEstado, deleteObjetivo } = require("../controllers/objetivoControllers");
const {getReport, getReportWithAI}= require("../controllers/reportControllers");

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
    router.get("/evaluaciones", getAllEvaluacion)
    router.post("/evaluaciones/completa", createEvaluacion)

    // objetivos
    router.get("/objetivos", getAllObjetivos)
    router.get("/objetivos/:id", getObjetivoById)
    router.post("/objetivos", createObjetivo)
    router.put("/objetivos/:id", updateObjetivoEstado)  
    router.delete("/objetivos/:id", deleteObjetivo)

    // reportes
    router.get("/reportes", getReport)
    router.post("/reportes", getReport)
    router.post("/reportes/ai", getReportWithAI)
    module.exports= router;
