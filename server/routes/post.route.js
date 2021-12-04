const router = require('express').Router();
const { json } = require('body-parser');
const auth = require('../middleware/auth.middleware');
const Post = require('../models/post.model');

// Create post
router.post('/', auth, async(req, res) => {
    if(!req.userId)
        return res.json({message: "Cannot retrieve user id"});
    const newPost = new Post({
        ...req.body, 
        authorUID: req.userId
    });
    newPost.save((err, docs) => {
        if(!err)
            res.send(docs);
        else
            console.log(err);
    });
});

// Get all postss
//router.get('/', async(req, res) => {
//    Post.find((err, docs) => {
//        if(!err)
//            res.send(docs);
//        else
//            console.log(err);
//    });
//});

// Get paginated post
function paginate(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        const category = req.query.category;
        const query = req.query.query;
        const limit = 6;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let posts = {};
        try {
            if(query !== '' && category !== '') {
                if(category == 'All')
                    posts = await model.find({
                        $or: [{title: {$regex: query, $options: "i"}}, {tags: { $in: query}}, {author: query}]
                    }).sort({_id: -1}).limit(limit).skip(startIndex).exec();
                else if(category == 'Title')
                    posts = await model.find(
                        {title: {$regex: query, $options: "i"}}
                    ).sort({_id: -1}).limit(limit).skip(startIndex).exec();
                else if(category == 'Author')
                    posts = await model.find(
                        {author: query }
                    ).sort({_id: -1}).limit(limit).skip(startIndex).exec();
                else if(category == 'Tag')
                    posts = await model.find(
                        {tags: { $in: query }}
                    ).sort({_id: -1}).limit(limit).skip(startIndex).exec();
                else if(category == 'MyLikes')
                    posts = await model.find(
                        {likes: { $in: query }}
                    ).sort({_id: -1}).limit(limit).skip(startIndex).exec();
            }
            else
                posts = await model.find().sort({_id: -1}).limit(limit).skip(startIndex).exec();
            res.paginated = posts;
            next();
        } catch(err) {res.status(500).json({msg: err.message})}
    }
}
router.get('/', paginate(Post), async(req, res) => {
    res.json(res.paginated);
});

// Get specific post
router.get('/:id', async(req, res) => {
    Post.findById(req.params.id, (err, docs) => {
        if (!err)
            res.send(docs);
        else
            console.log(err);
    });
});

// Update post
router.put('/:id', async(req, res) => {
    Post.findByIdAndUpdate(req.params.id, 
        {$set: req.body}, 
        {new: true},
        (err, docs) => {
            if (!err)
                res.send(docs);
            else
                console.log(err);
        });
});

// Delete Post
router.delete('/:id', async(req, res) => {
    Post.findByIdAndRemove(req.params.id, 
        (err, docs) => {
            if (!err)
                res.send(docs);
            else
                console.log(err);
        });
});

// Like Post
router.put('/:id/like', auth, async(req, res) => {
    if(!req.userId)
        return res.json({message: "Cannot retrieve user id"});
    const post = await Post.findById(req.params.id);
    const inIndex = post.likes.findIndex((id) => id == String(req.userId));
    // like
    if(inIndex == -1)
        post.likes.push(req.userId);
    // unlike
    else
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    Post.findByIdAndUpdate(req.params.id, 
        post,
        {new: true},
        (err, docs) => {
            if (!err)
                res.send(docs);
            else
                console.log(err);
        });
})

// comment Post
router.put('/:id/comment', async(req, res) => {
    const id = req.params.id;
    const comment = req.body.value;
    const post = await Post.findById(id);
    post.comments.push(comment);
    Post.findByIdAndUpdate(req.params.id, 
        post,
        {new: true},
        (err, docs) => {
            if (!err)
                res.send(docs);
            else
                console.log(err);
        });
})

module.exports = router;