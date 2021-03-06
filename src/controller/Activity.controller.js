//aca arme mis controladores para modulisar , hago funciones para cada ruta , este va hacer de actividades(activity)

const axios = require("axios"); // requiero axios
const {Country , Activity} = require("../db");

const postActivity = async(req, res)=>{ // recibo los datos por body(el front) y lo guardo en mi base de datos Activity.js , creo la actividad
    let{
      name,
      difficulty,
      duration,
      season,
      country,
    } = req.body // traigo todo lo que viene por body con destructuring , esto lo que va traer cuando se cree la actividad
    let activityCreate = await Activity.create({ // traigo de mi models Activity.js y usa la funcion create()"de sequilize" para crear recipeCreate
        name,
        difficulty,
        duration,
        season,
    })
    let countryDb = await Country.findAll({ // busco en mi base de datos Country.js
        where: {id: country }  // busco por su id(de Country.js) por destructuring que traigo country
    })
    // console.log(countryDb)
    // for(let i=0; i < countryDb.length; i++){ // tambien se puede hacer de esta forma
    //     console.log(i);
    //     console.log(countryDb[i])
    //     await countryDb[i].addActivity(activityCreate.dataValues.id)
    // }
    for (let i of countryDb){
         console.log(i)
        console.log( await i.addActivity(activityCreate.dataValues.id))
        await i.addActivity(activityCreate.dataValues.id)
    }
    return res.send(activityCreate)
};

const getActivities = async(req , res) =>{ // funcion que trae todas las actividades
    const activities = await Activity.findAll(); // traigo todas mis actividades de la base de datos
    // console.log(activities);
    return res.status(200).send(activities); // si hay actividades las devuelvo todas
}



module.exports = {postActivity , getActivities}

