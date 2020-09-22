const Mock = require('mockjs')
const data = Mock.mock({
    "data|200-300":[{
        name: "@cname",
        birthday: "@date",
        "sex|1-2": true,
        phone: /1\d{10}/,
        "ClassId|1-10":0
    }]
}).data;
const Student = require('../models/Student')
Student.bulkCreate(data);