var Post = require('./schemas/post').Post;

exports.getPostsFromDb = function(){
    var query = Post.find({}).sort({_id : 1})

    return query.exec();
}


exports.getRenderedPostsFromDb = function(callback){
    Post.find({}).sort({_id : 1}).exec(function(err, posts){
        callback(null, posts.map(function(post){ return post.render()}));
    });
}

exports.registerPostSaveMiddleware = function(poet){
    Post.schema.post('save', function(){
        poet.init();
        return;
    });
}


exports.getTags = function() {
    return Post.getAllTagsAsTextArray();
}

exports.getCategories = function() {
    return Post.getAllCategoriesAsTextArray();
}

