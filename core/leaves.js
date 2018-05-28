


module.exports = {
    leaves : function leaves(){
        return new Promise(async (resolve,reject)=>{
            resolve({"leaves": [{
                "id": 1,
                "remainingLeaves": 123,
                "leaverecords": [1,2] 
                }],
                "leaverecords": [{
                "id": 1,
                "date": "2018-05-28T08:25:04.747Z",
                "reason": "foo",
                "from": "2018-05-28T08:25:04.747Z",
                "to": "2018-05-28T08:25:04.747Z",
                "status": "foo",
                "leaveType": "foo" },
                {
                    "id": 2,
                    "date": "2018-05-28T08:25:04.747Z",
                    "reason": "foo",
                    "from": "2018-05-28T08:25:04.747Z",
                    "to": "2018-05-28T08:25:04.747Z",
                    "status": "foo",
                    "leaveType": "foo" }
                ]})
        })
    }
}
 





