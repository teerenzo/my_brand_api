const express = require('express')
const Article = require("../models/article")


exports.getAllArticles = function(req, res) {
    Article.find()
    .then(result=>{
        res.json(result)
    })

};


exports.addArticles = function(req,res){
    
}
