"use strict";

const Litable = require("../models/litable")

exports.register = (req, res, next) => {
    // Debug body
    console.log(req.body)

    res.json({'data': 'saved'});
}

//Return litable list with pagination metadata to display litable
exports.displayLitable = (req, res, next) => {
    //Pagination parameter
    let numberPages; //Number of page
    let currentPage = req.query.page ?? 1 //Page number to retrieve
    let itemsPerPage = req.query.items ?? 3 //Number of items per page


    Litable.countDocuments().then((counts)=>{
        //Calculatenumber pages
        let quotient = parseInt(counts/itemsPerPage)
        let rest = counts % itemsPerPage === 0 ? 0 : 1
        numberPages = quotient + rest

        //Apply pagination and sorting
        return Litable.find().skip((currentPage-1)*itemsPerPage).limit(itemsPerPage).sort({rent: "asc"})
    }).then(data => {
        return res.json({metadata:{
            currentPage: parseInt(currentPage),
            itemsPerPage: parseInt(itemsPerPage),
            numberPages: parseInt(numberPages)
        }, data: data});
    }).catch(e=>{
        const error = new Error("Error occured during operation")
        next(error) 
    })
}


//Update Litable
exports.updateLitable = (req, res, next) => {
    //Get data body from request
    const {id, city, street, rent, fullpath} = req.body;

    //filter params
    const filter = {_id:Object(id)}

    //filter update
    const update = {city: city, street: street, rent:rent, fullpath: fullpath }


    // update litable and return data updated for true parameter
    Litable.findOneAndUpdate(filter, update, {new: true}).then((litable) => {
        res.sendStatus(204);
    }).catch((e) => {
        const error = new Error()
        error.message = "Error occured during updating data"
        throw error
    })
}


//Delete Litable
exports.deleteLitable = (req, res, next) => {
    let id = req.query["id"] ?? null

    if(id === null){
        const error = new Error()
        error.message = "Id incorrect ou null"
        throw error
    }

    //Find litable that match with id in request
    Litable.findByIdAndDelete({_id: Object(id)}).then((_)=>{
        //Indicate no content to return
        res.sendStatus(204)
    }).catch(error => {
        res.json({
            "delete": "No data Found"
        })
    })

}


//Get Litable By ID
//Update Litable
exports.getLitableById = (req, res, next) => {
    //Get id passed as params in URL
    let byId = req.query["byId"] ?? null;

    if(byId === null){
        //Error parameter is thrown
        let error = new Error()
        error.message = "Parameter incorrect"
        throw error
    }

    Litable.findById({_id:Object(byId)} ).then((litable) => {
        res.json(litable)
    }).catch((e) => {
        let error = new Error()
        error.message = "Error occured during updating data"
        throw error
    })
}