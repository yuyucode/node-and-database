const Mock = require('mockjs')
const Class = require('../models/Class')

const result = Mock.mock({
    "data|10": [{
        "id|+1": 0,
        name: "前端 @id 期"
    }]
}).data;
const e = result.map(item => ({name: item.name}))
Class.bulkCreate(e)