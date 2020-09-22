SELECT id,`name`,location,birthday,
case
when ismale = 0 then '女'
else '男'
end sex
FROM employee;



