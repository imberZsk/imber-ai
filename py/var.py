"""
============================================================================
Python 变量（Variables）Demo - JS/TS 转 Python 学习指南
============================================================================

📚 核心总结：
-----------
Python 变量使用非常简单直接，不需要声明关键字，直接赋值即可创建变量。
变量类型是动态的，会根据赋值自动推断类型。

🔑 与 JS/TS 的主要区别：
------------------------

1. 【变量声明】
   Python:  直接赋值，无需关键字
            age = 25
            name = "张三"
   
   JS/TS:   需要 let/const/var
            let age = 25;
            const name = "张三";

2. 【变量命名】
   Python:  推荐使用 snake_case（下划线命名）
            user_name = "李四"
   
   JS/TS:   推荐使用 camelCase（驼峰命名）
            const userName = "李四";

3. 【类型系统】
   Python:  动态类型，运行时推断
            可以用 type() 查看类型，但不需要声明
   
   TypeScript: 静态类型，编译时检查
               const age: number = 25;

4. 【空值表示】
   Python:  使用 None（首字母大写）
            value = None
   
   JS/TS:   使用 null（全小写）
            let value = null;

5. 【布尔值】
   Python:  True/False（首字母大写）
           is_student = True
   
   JS/TS:   true/false（全小写）
           const isStudent = true;

6. 【输出语句】
   Python:  print("Hello")
   
   JS/TS:   console.log("Hello");

7. 【字符串格式化】
   Python:  f"你好，{name}！"（f-string，推荐）
           "你好，{}！".format(name)
   
   JS/TS:   模板字符串 `${name}`
           `你好，${name}！`

8. 【多重赋值】
   Python:  a, b, c = 1, 2, 3（简洁）
   
   JS/TS:   需要多行或解构
           const a = 1, b = 2, c = 3;
           // 或 [a, b, c] = [1, 2, 3];

9. 【变量作用域】
   Python:  函数内默认不能修改全局变量（需要 global 关键字）
   
   JS/TS:   let/const 有块级作用域，var 是函数作用域

10. 【类型转换】
    Python:  int("123"), str(123), float("3.14")
    
    JS/TS:   parseInt("123"), String(123), parseFloat("3.14")
            或 Number("123")

💡 快速对比表：
--------------
┌─────────────────┬──────────────┬─────────────┐
│   功能          │   Python     │   JS/TS     │
├─────────────────┼──────────────┼─────────────┤
│ 变量声明        │ 直接赋值     │ let/const   │
│ 空值            │ None         │ null        │
│ 布尔值          │ True/False   │ true/false  │
│ 输出            │ print()      │ console.log │
│ 字符串模板      │ f"{var}"     │ `${var}`    │
│ 命名风格        │ snake_case   │ camelCase   │
│ 分号            │ 不需要       │ 可选        │
└─────────────────┴──────────────┴─────────────┘

============================================================================
"""

# 变量

# ===== Python 变量基本用法 =====

# 1. 基本数据类型变量
# 整数（int）
age = 25
score = 100
count = -10

# 浮点数（float）
price = 99.99
pi = 3.14159
temperature = -5.5

# 字符串（str）
name = "张三"
city = '北京'
message = """这是
多行
字符串"""

# 布尔值（bool）
is_student = True
is_working = False

# 2. 变量命名规则
# - 只能包含字母、数字和下划线
# - 不能以数字开头
# - 区分大小写
# - 不能使用 Python 关键字

user_name = "李四"  # 使用下划线（推荐）
userName = "李四"   # 驼峰命名（也可以）
user_age = 20
_user_id = 12345    # 下划线开头（私有变量约定）

# 3. 变量赋值
x = 10
y = x               # 将 x 的值赋给 y
x = 20              # x 的值被重新赋值

# 多重赋值
a, b, c = 1, 2, 3
name1, name2 = "小王", "小李"

# 链式赋值
x = y = z = 0

# 4. 变量类型查看
print(f"age 的类型: {type(age)}")
print(f"price 的类型: {type(price)}")
print(f"name 的类型: {type(name)}")
print(f"is_student 的类型: {type(is_student)}")

# 5. 变量运算
num1 = 10
num2 = 3

# 算术运算
addition = num1 + num2      # 13
subtraction = num1 - num2   # 7
multiplication = num1 * num2 # 30
division = num1 / num2      # 3.333...
floor_division = num1 // num2 # 3
modulo = num1 % num2        # 1
power = num1 ** num2        # 1000

# 6. 字符串变量操作
first_name = "张"
last_name = "三"
full_name = first_name + last_name  # 字符串拼接
greeting = f"你好，{full_name}！"     # f-string 格式化
greeting2 = "你好，{}！".format(full_name)  # format 方法

# 7. 变量类型转换
str_num = "123"
int_num = int(str_num)      # 字符串转整数
float_num = float(str_num)  # 字符串转浮点数

num_to_str = str(123)       # 数字转字符串
bool_val = bool(1)          # 数字转布尔值（非0为True）

# 8. 常用变量操作示例
print("=" * 50)
print("变量演示输出:")
print("=" * 50)
print(f"姓名: {name}, 年龄: {age}")
print(f"价格: {price} 元")
print(f"是否为学生: {is_student}")
print(f"完整问候: {greeting}")
print(f"数学运算: {num1} + {num2} = {addition}")
print(f"字符串拼接: {first_name} + {last_name} = {full_name}")

# 9. 变量作用域示例（简要）
global_var = "我是全局变量"

def test_function():
    local_var = "我是局部变量"
    print(f"函数内访问全局变量: {global_var}")
    print(f"函数内局部变量: {local_var}")

test_function()

# 10. 特殊变量值
none_var = None           # None 表示空值
empty_str = ""            # 空字符串
empty_list = []           # 空列表
empty_dict = {}           # 空字典

