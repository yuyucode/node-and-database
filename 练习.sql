-- 登录查询
-- user  loginId admin    loginPwd 123123

SELECT * FROM user
WHERE loginId = 'admin' and loginPwd = '123123'

-- 按照员工入职的时间降序排序 并且使用分页查询
-- 查询第二页 ，每页10条

SELECT * FROM employee
ORDER BY joinDate desc
LIMIT  10,10

-- 查询工资最高的女员工

SELECT * FROM employee
WHERE ismale = 0
ORDER BY salary DESC
LIMIT 1


-- 1. 创建一张team表，记录足球队
-- 查询出对阵表

SELECT c1.city as '主场',c2.city as '客场' FROM city c1, city	c2
WHERE c1.id != c2.id
ORDER BY c1.city asc


-- 2. 显示出所有员工的姓名、性别（使用男或女显示）、入职时间、薪水、所属部门（显示部门名称）、所属公司（显示公司名称）

SELECT e.`name`,
case ismale when 1 then '男' else '女' end 性别,
e.joinDate as '入职时间',
e.salary as '薪水',
d.`name` as '所属部门',
c.`name` as '公司'
FROM employee as e
left join department as d on e.deptId = d.id
left join company as c on c.id = d.companyId



-- 3. 查询腾讯和蚂蚁金服的所有员工姓名、性别、入职时间、部门名、公司名

SELECT e.`name`,
case ismale when 1 then '男' else '女' end 性别,
joinDate,
d.`name` '部门',
c.`name` '公司名'
FROM employee as e
inner join department  as d on e.deptId = d.id
inner join company as c on c.id = d.companyId
WHERE c.`name` in ('腾讯科技','蚂蚁金服')

-- 4. 查询渡一教学部的所有员工姓名、性别、入职时间、部门名、公司名

SELECT e.`name` as '姓名',
case ismale when 1 then '男' else '女' end 性别,
joinDate '入职时间',
d.`name` '部门',
c.`name` '公司名'
FROM employee as e
inner join department  as d on e.deptId = d.id
inner join company as c on c.id = d.companyId
WHERE c.`name` like '%渡一%' and d.`name` in ('教学部')


-- 5. 列出所有公司员工居住的地址（要去掉重复）
SELECT DISTINCT location FROM employee




-- 1. 查询渡一每个部门的员工数量

SELECT d.`name` as '部门', COUNT(d.id) as 'number'
FROM employee as e
INNER JOIN department as d on e.deptId = d.id
INNER JOIN company as c on d.companyId = c.id
WHERE c.`name` like '%渡一%'
GROUP BY d.id, d.`name`


-- 2. 查询每个公司的员工数量

SELECT COUNT(e.id) as '每个公司数量', c.`name`
FROM employee as e
INNER JOIN department as d on e.deptId = d.id
INNER JOIN company as c on d.companyId = c.id
GROUP BY c.id, c.`name`


-- 3. 查询所有公司5年内入职的居住在万家湾的女员工数量

SELECT COUNT(e.id) as '员工数量'
FROM employee as e
INNER JOIN department as d on e.deptId = d.id
INNER JOIN company as c on d.companyId = c.id
WHERE ismale = 0
AND TIMESTAMPDIFF(YEAR, e.joinDate, CURRENT_TIME())>=5
AND e.location like '%万家湾%'
GROUP BY e.location


-- 4. 查询渡一所有员工分布在哪些居住地，每个居住地的数量

SELECT COUNT(e.id) as 数量, e.location as 居住地址
FROM employee as e
INNER JOIN department as d on e.deptID = d.id
INNER JOIN company as c on d.companyId = c.id
WHERE c.`name` like '%渡一%'
GROUP BY e.location

-- 5. 查询员工人数大于200的公司信息

SELECT c.`name` as '员工人数大于200的公司', c.id as '公司id'
FROM employee as e
INNER JOIN department as d on e.deptId = d.id
INNER JOIN company as c on d.companyId = c.id
GROUP BY c.id
HAVING COUNT(e.id)>=200

-- 6. 查询渡一公司里比它平均工资高的员工

SELECT e.`name`, e.salary
FROM employee as e
INNER JOIN department as d on e.deptId = d.id
INNER JOIN company as c on d.companyId = c.id
WHERE c.`name` like '%渡一%'
GROUP BY e.`name`
HAVING e.salary > AVG(e.salary)

-- 7. 查询渡一的平均薪资
SELECT ROUND(AVG(e.salary),2) as '渡一的平均薪资'
FROM employee as e
INNER JOIN department as d on e.deptId = d.id
INNER JOIN company as c on d.companyId = c.id
WHERE c.`name` like '%渡一%'
GROUP BY c.`name`


-- 7. 查询渡一所有名字为两个字和三个字的员工对应人数

SELECT CHAR_LENGTH(e.`name`) as '名字长度', COUNT(e.id) as '数量'
FROM employee as e
INNER JOIN department as d on e.deptId = d.id
INNER JOIN company as c on d.companyId = c.id
WHERE c.`name` like '%渡一%'
GROUP BY CHAR_LENGTH(e.`name`)

-- 8. 查询每个公司每个月的总支出薪水，并按照从低到高排序

SELECT c.`name`,SUM(e.id) as 总薪水
FROM employee as e
INNER JOIN department as d on e.deptId = d.id
INNER JOIN company as c on d.companyId = c.id
GROUP BY c.`name`
ORDER BY 总薪水

