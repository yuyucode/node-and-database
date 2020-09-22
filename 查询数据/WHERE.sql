SELECT * FROM EMPLOYEE


-- 查询 ismale 等于 0 的
WHERE ismale = 0

-- 查询 companyId ，值为1 或者 2
WHERE companyId in (1 ,2)

-- 查询 com 不是null的数据 和 null 的数据
WHERE com is not null
WHERE com is null

-- 10000-20000之间
WHERE salay BETWEEN 10000 and 20000

-- 模糊匹配 like 、  '%余%' 、 '余%' 、 '%余'  、 '余_' 2个字
SELECT * FROM employee
WHERE (`name` like '张_' and ismale = 1 or ismale = 0 and `name` like '李_') and salary >= 10000


-- 排序 ORDER BY     (desc 降序、 sec 数字顺序显示顺序号， asc 性别)
