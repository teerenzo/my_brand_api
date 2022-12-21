
import Article from "../models/article"
// const express = require('express')
import { articleSchema,updateArticleSchema } from "../helpers/validation";
import User from "../models/userModel"
import {articleImage} from '../helpers/photoupload'


var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); 
var yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;

exports.getAllArticles = (req, res) => {
    Article.find()
    .then(result=>{
        res.json(result)
    })

};

exports.createNewArticle = async (req, res)  =>{
    // console.log(req.s)
    try {
        const valationResult = await articleSchema.validateAsync(req.body);
        User.findOne({
            _id:req.user.id
        }).then(async (result)=>{
        console.log("get")
     
        if(result.role.toString()=='admin')
        {
            const article= new Article({
                title:valationResult.title,
                content:valationResult.content,
                postedDate: today,
                imageUrl: '',
            })
            if(req.files) {
            const image = await articleImage(req);
            article.imageUrl = image.url
            }
        article.save()
        .then(result=>{
            res.json(result)
        })
        .catch(error=>console.log(error))
        }
        else
        {
            res.json({message:'User Not Authorized'}).status(401)
        }
    }).catch((er)=>{
        res.status(500).json(er)
    })
    }
    catch (err) {
        res.status(500).json(err)
    }

};

exports.updateArticle=async (req,res)=>{
    const {id}=req.params
    const { title,content }=req.body;
    try {
        const valationResult = await updateArticleSchema.validateAsync({article_id:id,title,content});
     
        User.findOne({
            _id:req.user.id
        }).then((user)=>{
       if(user.role.toString()=='admin')
        {
        Article.findOne({_id:id})
        .then(article=>{
            if(valationResult.title)
            article.title=valationResult.title;
            if(valationResult.content)
            article.content=valationResult.content
            article.save()
            .then(result=>res.status(200).json(result))
            .catch(error=>console.log(error))

        })
        .catch(error=>{
            res.status(404).json({error:'article doesn\'t exist!'})
        })
    }
    else
    {
        res.status(401).json({message:'User Not Authorized'})
    }
}).catch((er)=>{
    res.status(500).json({message:er})
})
    }
    catch(err){
res.json(err)
    }
}

exports.deleteArticle=(req,res)=>{
    const {id}=req.params
    User.findOne({
        _id:req.user.id
    }).then((user)=>{

  
    if(user.role.toString()=='admin')
        {
        Article.deleteOne({_id:id})
        .then(result=>{
            res.json(result)
        })
        .catch(error=>{
            res.status(404).json({error:'article doesn\'t exist!'})
        })
    }
    else
    {
        res.status(401).json({message:'User Not Authorized'})
    }
}).catch((er)=>{
    res.status(500).json({message:er})
})
}



exports.commentingOnArticle=(req,res)=>{
    const {article_id}=req.params
    const {comment}=req.body
 
    User.findOne({
        _id:req.user.id
    }).then((user)=>{
    const newComment={
        user_id:user._id,
        username:user.username,
        comment,
        postedDate: today
    }
    Article.findOne({_id:article_id})
    .then(article=>{
        if(article)
        {
            article.comments.push(newComment);
            article.save()
            .then(result=>res.json(result))
            .catch(error=>res.status(500).json({error:error.message}))
        }
        else res.status(404).json({error:"article doesn't exist"})
    })
    .catch(error=>res.status(500).json({error:error.message}))
})
}

exports.likeArticle=(req,res)=>{
    const {article_id}=req.params
    const user_id=req.user.id

    const newLike={
        user_id,
    }
    Article.findOne({_id:article_id})
    .then(article=>{
        if(article)
        {
            const found = article.likes.some(el => el.user_id.toString() === user_id.toString());
            if (found) {
               article.likes=article.likes.filter(item=>item.user_id.toString()!==user_id.toString())

            }else
            {
                 article.likes.push(newLike);
            }
            article.save()
            .then(result=>res.json(result))
            .catch(error=>res.status(500).json({error:error.message}))
        }
        else res.status(404).json({error:"article doesn't exist"})
    })
    .catch(error=>res.json({error:error.message}))
}


exports.getOneArticle=(req,res)=>{
    const {id}=req.params
    Article.findOne({_id:id})
    .then(result=>{
        if(result)
        res.json(result)
        else 
        res.status(404).json('article doesn\'t exist!')
    })
    .catch(error=>{
        res.status(500).json({error:error.message})
    })
}

