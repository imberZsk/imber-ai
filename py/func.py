"""
============================================================================
Python 函数（Functions）Demo - JS/TS 转 Python 学习指南
============================================================================

📚 核心总结：
-----------
Python 函数使用 def 关键字定义，语法简洁。支持多种参数类型：
默认参数、关键字参数、可变参数（*args）、关键字可变参数（**kwargs）。
Python 还支持 lambda 匿名函数、类型提示（Type Hints）、装饰器等高级特性。

🔑 与 JS/TS 的主要区别：
------------------------

1. 【函数定义】
   Python:   def greet(name):
                return f"Hello, {name}!"
   
   JS:       function greet(name) {
               return `Hello, ${name}!`;
             }
             // 或箭头函数
             const greet = (name) => `Hello, ${name}!`;

2. 【默认参数】
   Python:   def greet(name, greeting="Hello"):
                return f"{greeting}, {name}!"
   
   JS:       function greet(name, greeting = "Hello") {
               return `${greeting}, ${name}!`;
             }

3. 【关键字参数】
   Python:   greet(name="Alice", greeting="Hi")  # 可以改变顺序
   
   JS:       没有直接对应，需要传对象
             function greet({name, greeting = "Hello"}) {
               return `${greeting}, ${name}!`;
             }

4. 【可变参数】
   Python:   def sum(*args):          # *args 接收多个位置参数
                return sum(args)
            sum(1, 2, 3, 4)
   
   JS:       function sum(...args) {  # rest 参数
               return args.reduce((a, b) => a + b, 0);
             }
             sum(1, 2, 3, 4);

5. 【关键字可变参数】
   Python:   def person(**kwargs):    # **kwargs 接收关键字参数
                print(kwargs)
            person(name="Alice", age=25)
   
   JS:       使用对象
             function person(options) {
               console.log(options);
             }
             person({name: "Alice", age: 25});

6. 【匿名函数】
   Python:   lambda x: x * 2          # lambda 表达式（功能有限）
            square = lambda x: x ** 2
   
   JS:       const square = (x) => x ** 2;  # 箭头函数（功能完整）

7. 【返回多个值】
   Python:   def get_name_age():
                return "Alice", 25    # 返回元组（可以解构）
            name, age = get_name_age()
   
   JS:       返回对象或数组
             function getNameAge() {
               return {name: "Alice", age: 25};
             }
             const {name, age} = getNameAge();

8. 【类型提示】
   Python:   def add(a: int, b: int) -> int:
                return a + b
   
   TypeScript: function add(a: number, b: number): number {
                  return a + b;
                }

9. 【作用域】
   Python:   函数内默认不能修改全局变量（需要 global 关键字）
   
   JS:       let/const 有块级作用域，函数内可以访问外部变量

10. 【函数是一等公民】
    Python:  可以赋值、传参、作为返回值
             def make_multiplier(n):
                 def multiplier(x):
                     return x * n
                 return multiplier
    
    JS:       同样支持（闭包）
              function makeMultiplier(n) {
                return (x) => x * n;
              }

💡 快速对比表：
--------------
┌─────────────────┬──────────────┬─────────────┐
│   功能          │   Python     │   JS/TS     │
├─────────────────┼──────────────┼─────────────┤
│ 定义关键字      │ def          │ function    │
│ 匿名函数        │ lambda       │ () => {}    │
│ 默认参数        │ =            │ =            │
│ 可变参数        │ *args        │ ...args     │
│ 关键字参数      │ **kwargs     │ 对象参数    │
│ 类型提示        │ : type ->    │ : type      │
│ 返回多个值      │ 元组解构     │ 对象/数组   │
│ global 变量     │ global 关键字│ 直接访问    │
│ 闭包            │ ✅ 支持      │ ✅ 支持     │
│ 装饰器          │ ✅ @decorator│ ❌ 不支持  │
└─────────────────┴──────────────┴─────────────┘

⚠️ 常见陷阱：
-----------
1. Python 使用 def 定义函数，不是 function
2. 匿名函数用 lambda，功能比 JS 箭头函数更受限
3. 函数内修改全局变量需要 global 关键字
4. *args 是元组，**kwargs 是字典
5. 默认参数如果是可变对象（如列表），要小心引用问题

============================================================================
"""

# ========== 1. 基本函数定义 ==========

print("=" * 60)
print("1. 基本函数定义")
print("=" * 60)

def greet(name):
    """简单的问候函数"""
    return f"你好，{name}！"

# 调用函数
result = greet("张三")
print(f"  {result}")

# 对比 JS/TS:
# function greet(name) {
#   return `你好，${name}！`;
# }
# const result = greet("张三");

print()

# ========== 2. 带返回值的函数 ==========

print("=" * 60)
print("2. 带返回值的函数")
print("=" * 60)

def add(a, b):
    """两数相加"""
    return a + b

def multiply(a, b):
    """两数相乘"""
    return a * b

print(f"  add(3, 5) = {add(3, 5)}")
print(f"  multiply(4, 6) = {multiply(4, 6)}")

# 没有 return 语句时，函数返回 None
def print_hello():
    print("    Hello!")

result = print_hello()
print(f"  print_hello() 的返回值: {result}")

print()

# ========== 3. 默认参数 ==========

print("=" * 60)
print("3. 默认参数（类似 JS 的默认参数）")
print("=" * 60)

def greet_with_default(name, greeting="你好"):
    """带默认参数的问候函数"""
    return f"{greeting}，{name}！"

print(f"  {greet_with_default('李四')}")  # 使用默认值
print(f"  {greet_with_default('李四', '早上好')}")  # 覆盖默认值

# 对比 JS/TS:
# function greetWithDefault(name, greeting = "你好") {
#   return `${greeting}，${name}！`;
# }

# ⚠️ 注意：默认参数如果是可变对象（列表、字典），要小心！
def add_item(item, items=[]):  # ❌ 不推荐这样写
    items.append(item)
    return items

# 正确写法：使用 None
def add_item_safe(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

print()

# ========== 4. 关键字参数（命名参数） ==========

print("=" * 60)
print("4. 关键字参数（可以改变参数顺序）")
print("=" * 60)

def create_person(name, age, city):
    """创建人员信息"""
    return f"姓名: {name}, 年龄: {age}, 城市: {city}"

# 位置参数（按顺序）
person1 = create_person("王五", 25, "北京")
print(f"  位置参数: {person1}")

# 关键字参数（可以改变顺序）
person2 = create_person(city="上海", name="赵六", age=30)
print(f"  关键字参数: {person2}")

# 混合使用（位置参数必须在关键字参数之前）
person3 = create_person("孙七", city="广州", age=28)
print(f"  混合参数: {person3}")

print()

# ========== 5. *args（可变位置参数） ==========

print("=" * 60)
print("5. *args（可变位置参数，类似 JS 的 ...rest）")
print("=" * 60)

def sum_numbers(*args):
    """计算多个数字的和"""
    total = 0
    for num in args:
        total += num
    return total

print(f"  sum_numbers(1, 2, 3) = {sum_numbers(1, 2, 3)}")
print(f"  sum_numbers(10, 20, 30, 40) = {sum_numbers(10, 20, 30, 40)}")

# args 是一个元组
def show_args(*args):
    print(f"  args 类型: {type(args)}")
    print(f"  args 内容: {args}")

show_args(1, 2, 3)

# 对比 JS/TS:
# function sumNumbers(...args) {
#   return args.reduce((a, b) => a + b, 0);
# }

print()

# ========== 6. **kwargs（可变关键字参数） ==========

print("=" * 60)
print("6. **kwargs（可变关键字参数，类似 JS 的对象参数）")
print("=" * 60)

def create_profile(**kwargs):
    """创建用户资料"""
    profile = {}
    for key, value in kwargs.items():
        profile[key] = value
    return profile

# 传入多个关键字参数
profile = create_profile(name="小明", age=20, city="深圳", hobby="编程")
print(f"  用户资料: {profile}")

# kwargs 是一个字典
def show_kwargs(**kwargs):
    print(f"  kwargs 类型: {type(kwargs)}")
    print(f"  kwargs 内容: {kwargs}")

show_kwargs(a=1, b=2, c=3)

print()

# ========== 7. 混合使用各种参数 ==========

print("=" * 60)
print("7. 混合使用：位置参数、默认参数、*args、**kwargs")
print("=" * 60)

def complex_function(name, age=18, *args, **kwargs):
    """
    参数顺序规则：
    1. 位置参数（必需）
    2. 默认参数
    3. *args（可变位置参数）
    4. **kwargs（可变关键字参数）
    """
    print(f"  姓名: {name}")
    print(f"  年龄: {age}")
    print(f"  *args: {args}")
    print(f"  **kwargs: {kwargs}")

complex_function("小红", 25, "爱好1", "爱好2", city="北京", hobby="阅读")

print()

# ========== 8. 返回多个值（元组解构） ==========

print("=" * 60)
print("8. 返回多个值（Python 返回元组，可以解构）")
print("=" * 60)

def get_name_and_age():
    """返回姓名和年龄"""
    return "张三", 25  # 实际返回的是元组

name, age = get_name_and_age()  # 解构赋值
print(f"  姓名: {name}, 年龄: {age}")

# 也可以不解构，接收整个元组
result = get_name_and_age()
print(f"  完整结果（元组）: {result}")

# 对比 JS/TS:
# function getNameAndAge() {
#   return {name: "张三", age: 25};
# }
# const {name, age} = getNameAndAge();

print()

# ========== 9. Lambda 函数（匿名函数） ==========

print("=" * 60)
print("9. Lambda 函数（匿名函数，类似 JS 的箭头函数）")
print("=" * 60)

# 简单的 lambda
square = lambda x: x ** 2
print(f"  square(5) = {square(5)}")

# 多个参数的 lambda
add = lambda x, y: x + y
print(f"  add(3, 4) = {add(3, 4)}")

# 通常用于函数参数（如 map、filter）
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
print(f"  numbers: {numbers}")
print(f"  squared: {squared}")

# 过滤偶数
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(f"  evens: {evens}")

# 对比 JS/TS:
# const square = (x) => x ** 2;
# const squared = numbers.map(x => x ** 2);
# const evens = numbers.filter(x => x % 2 === 0);

# ⚠️ 注意：Python 的 lambda 只能包含表达式，不能包含语句
# 复杂逻辑应该用普通函数

print()

# ========== 10. 变量作用域 ==========

print("=" * 60)
print("10. 变量作用域（global 关键字）")
print("=" * 60)

global_var = "我是全局变量"

def read_global():
    """读取全局变量（不需要 global）"""
    print(f"  函数内读取全局变量: {global_var}")

read_global()

def modify_global():
    """修改全局变量（需要 global 关键字）"""
    global global_var
    global_var = "我已被修改"
    print(f"  函数内修改全局变量: {global_var}")

modify_global()
print(f"  全局变量最终值: {global_var}")

# 对比 JS/TS:
# let globalVar = "我是全局变量";
# function modifyGlobal() {
#   globalVar = "我已被修改";  // 直接修改，不需要 global
# }

print()

# ========== 11. 嵌套函数（闭包） ==========

print("=" * 60)
print("11. 嵌套函数和闭包（类似 JS 的闭包）")
print("=" * 60)

def make_multiplier(n):
    """创建一个倍数函数"""
    def multiplier(x):
        return x * n
    return multiplier

# 创建一个乘以 3 的函数
times_three = make_multiplier(3)
print(f"  times_three(5) = {times_three(5)}")

# 创建一个乘以 10 的函数
times_ten = make_multiplier(10)
print(f"  times_ten(7) = {times_ten(7)}")

# 对比 JS/TS:
# function makeMultiplier(n) {
#   return (x) => x * n;
# }

print()

# ========== 12. 类型提示（Type Hints） ==========

print("=" * 60)
print("12. 类型提示（类似 TypeScript 的类型注解）")
print("=" * 60)

def add_typed(a: int, b: int) -> int:
    """带类型提示的加法函数"""
    return a + b

def greet_typed(name: str, age: int = 18) -> str:
    """带类型提示的问候函数"""
    return f"{name} 今年 {age} 岁"

result1 = add_typed(5, 3)
result2 = greet_typed("小李", 25)
print(f"  add_typed(5, 3) = {result1}")
print(f"  greet_typed: {result2}")

# 注意：Python 的类型提示是可选的，不会强制类型检查
# 需要工具如 mypy 进行静态类型检查

# 对比 TypeScript:
# function addTyped(a: number, b: number): number {
#   return a + b;
# }

print()

# ========== 13. 文档字符串（Docstrings） ==========

print("=" * 60)
print("13. 文档字符串（函数的说明文档）")
print("=" * 60)

def calculate_area(length: float, width: float) -> float:
    """
    计算矩形的面积
    
    参数:
        length (float): 矩形的长度
        width (float): 矩形的宽度
    
    返回:
        float: 矩形的面积
    """
    return length * width

# 查看函数的文档字符串
print(f"  函数文档: {calculate_area.__doc__}")
print(f"  计算结果: {calculate_area(5, 3)}")

print()

# ========== 14. 高阶函数（函数作为参数） ==========

print("=" * 60)
print("14. 高阶函数（函数作为参数，类似 JS 的回调函数）")
print("=" * 60)

def apply_operation(x, y, operation):
    """应用一个操作函数到两个参数"""
    return operation(x, y)

# 定义操作函数
def add_op(a, b):
    return a + b

def multiply_op(a, b):
    return a * b

result1 = apply_operation(5, 3, add_op)
result2 = apply_operation(5, 3, multiply_op)
print(f"  apply_operation(5, 3, add_op) = {result1}")
print(f"  apply_operation(5, 3, multiply_op) = {result2}")

# 使用 lambda
result3 = apply_operation(5, 3, lambda x, y: x ** y)
print(f"  apply_operation(5, 3, lambda x, y: x ** y) = {result3}")

# 对比 JS/TS:
# function applyOperation(x, y, operation) {
#   return operation(x, y);
# }

print()

# ========== 15. 递归函数 ==========

print("=" * 60)
print("15. 递归函数（计算阶乘）")
print("=" * 60)

def factorial(n):
    """计算 n 的阶乘"""
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(f"  factorial(5) = {factorial(5)}")
print(f"  factorial(10) = {factorial(10)}")

# 对比 JS/TS:
# function factorial(n) {
#   if (n <= 1) return 1;
#   return n * factorial(n - 1);
# }

print()

# ========== 16. 实际应用示例 ==========

print("=" * 60)
print("16. 实际应用示例")
print("=" * 60)

def process_students(students, filter_func=None, sort_func=None):
    """
    处理学生列表：过滤和排序
    
    参数:
        students: 学生列表
        filter_func: 过滤函数（可选）
        sort_func: 排序函数（可选）
    """
    if filter_func:
        students = [s for s in students if filter_func(s)]
    if sort_func:
        students.sort(key=sort_func)
    return students

# 学生数据
students = [
    {"name": "张三", "score": 85, "age": 20},
    {"name": "李四", "score": 92, "age": 19},
    {"name": "王五", "score": 78, "age": 21},
]

# 过滤高分学生并按分数排序
high_scorers = process_students(
    students,
    filter_func=lambda s: s["score"] >= 80,
    sort_func=lambda s: s["score"]
)

print("  高分学生（按分数排序）:")
for student in high_scorers:
    print(f"    {student['name']}: {student['score']} 分")

print()
print("=" * 60)
print("函数演示完成！")
print("=" * 60)

