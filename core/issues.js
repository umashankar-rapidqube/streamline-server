
module.exports = {
    issues : function issues(){
        return new Promise(async (resolve,reject)=>{
            resolve({"issues": [{
                "id": 1,
                "issueType": "foo",
                "title": "foo",
                "date": "2018-05-28T08:25:04.747Z",
                "description": "foo",
                "comments": [1],
                "status": "foo",
                "approverEmail": "foo" }],
                "comments": [{
                "id": 1,
                "date": "2018-05-28T08:25:04.747Z",
                "postedBy": "foo",
                "commentText": "foo" }]})
        })
    }
}
 

