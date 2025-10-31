"""
============================================================================
Python 条件判断（if/elif/else）Demo - JS/TS 转 Python 学习指南
============================================================================

📚 核心总结：
-----------
Python 的条件判断语法与 JS/TS 类似，但有几个重要区别：
1. 使用 elif 而不是 else if
2. 逻辑运算符是 and/or/not 而不是 &&/||/!
3. 不需要括号包裹条件（但可以加）
4. 使用缩进代替大括号 {}

🔑 与 JS/TS 的主要区别：
------------------------

1. 【基本语法】
   Python:   if age >= 18:
                print("成年")
   
   JS:       if (age >= 18) {
               console.log("成年");
             }

2. 【多条件判断】
   Python:   if score >= 90:
                grade = "优秀"
             elif score >= 80:    # 注意是 elif
                grade = "良好"
             else:
                grade = "及格"
   
   JS:       if (score >= 90) {
               grade = "优秀";
             } else if (score >= 80) {
               grade = "良好";
             } else {
               grade = "及格";
             }

3. 【逻辑运算符（⚠️ 重要！）】
   Python:   if age >= 18 and has_license:
                pass
             if age < 18 or age > 65:
                pass
             if not has_license:
                pass
   
   JS:       if (age >= 18 && hasLicense) { ... }
             if (age < 18 || age > 65) { ... }
             if (!hasLicense) { ... }

4. 【成员运算符】
   Python:   if "苹果" in fruits:
                pass
             if "西瓜" not in fruits:
                pass
   
   JS:       if (fruits.includes("苹果")) { ... }
             if (!fruits.includes("西瓜")) { ... }

5. 【身份运算符】
   Python:   if value is None:      # 推荐
                pass
             if a is b:              # 比较对象身份
                pass
             if a == b:              # 比较值
                pass
   
   JS:       if (value === null) { ... }
             if (a === b) { ... }   // 同时比较值和类型

6. 【三元运算符】
   Python:   status = "成年" if age >= 18 else "未成年"
   
   JS:       const status = age >= 18 ? "成年" : "未成年";

7. 【链式比较（Python 特有！）】
   Python:   if 10 <= x <= 20:
                print("在范围内")
   
   JS:       if (x >= 10 && x <= 20) {
               console.log("在范围内");
             }

8. 【空值判断】
   Python:   if not my_list:        # Pythonic 写法
                print("列表为空")
             if value is None:       # 检查 None
                pass
   
   JS:       if (myList.length === 0) { ... }
             if (value === null) { ... }

9. 【match...case（Python 3.10+）】
   Python:   match status:
                case "success":
                    print("成功")
                case _:
                    print("默认")
   
   JS:       switch (status) {
               case "success":
                 console.log("成功");
                 break;
               default:
                 console.log("默认");
             }

10. 【all() 和 any()】
    Python:   if all(score >= 60 for score in scores):
                  pass
              if any(score >= 90 for score in scores):
                  pass
    
    JS:       if (scores.every(s => s >= 60)) { ... }
              if (scores.some(s => s >= 90)) { ... }

💡 快速对比表：
--------------
┌─────────────────┬──────────────┬─────────────┐
│   功能          │   Python     │   JS/TS     │
├─────────────────┼──────────────┼─────────────┤
│ 逻辑与          │ and          │ &&          │
│ 逻辑或          │ or           │ ||          │
│ 逻辑非          │ not          │ !           │
│ else if         │ elif         │ else if     │
│ 三元运算符      │ x if y else z│ y ? x : z   │
│ 包含检查        │ in / not in  │ includes()  │
│ 空值            │ None         │ null        │
│ 布尔值          │ True/False   │ true/false  │
│ switch          │ match...case │ switch      │
│ 链式比较        │ ✅ 10<=x<=20 │ ❌ 需要 &&  │
└─────────────────┴──────────────┴─────────────┘

⚠️ 常见陷阱：
-----------
1. Python 使用 and/or/not，不是 &&/||/!
2. Python 使用 elif，不是 else if
3. 检查 None 用 is None，不是 == None
4. 布尔值首字母大写：True/False，不是 true/false

============================================================================
"""

# 条件判断演示（if/elif/else）

# ===== Python 条件判断 vs JavaScript/TypeScript =====

# ========== 1. 基本的 if 语句 ==========

print("=" * 60)
print("1. 基本的 if 语句")
print("=" * 60)

age = 18

if age >= 18:
    print("  你已经成年了！")

# 对比 JS/TS:
# if (age >= 18) {
#   console.log("你已经成年了！");
# }

print()

# ========== 2. if...else 语句 ==========

print("=" * 60)
print("2. if...else 语句")
print("=" * 60)

score = 85

if score >= 60:
    print("  及格了！")
else:
    print("  不及格")

# 对比 JS/TS:
# if (score >= 60) {
#   console.log("及格了！");
# } else {
#   console.log("不及格");
# }

print()

# ========== 3. if...elif...else 语句（多条件判断） ==========

print("=" * 60)
print("3. if...elif...else（多条件判断，类似 switch）")
print("=" * 60)

score = 92

if score >= 90:
    grade = "优秀"
    print(f"  成绩: {score}, 等级: {grade}")
elif score >= 80:
    grade = "良好"
    print(f"  成绩: {score}, 等级: {grade}")
elif score >= 60:
    grade = "及格"
    print(f"  成绩: {score}, 等级: {grade}")
else:
    grade = "不及格"
    print(f"  成绩: {score}, 等级: {grade}")

# 对比 JS/TS:
# if (score >= 90) {
#   grade = "优秀";
# } else if (score >= 80) {
#   grade = "良好";
# } else if (score >= 60) {
#   grade = "及格";
# } else {
#   grade = "不及格";
# }

print()

# ========== 4. 比较运算符 ==========

print("=" * 60)
print("4. 比较运算符（与 JS/TS 相同）")
print("=" * 60)

a, b = 10, 20

print(f"  a = {a}, b = {b}")
print(f"  a == b (等于): {a == b}")
print(f"  a != b (不等于): {a != b}")
print(f"  a < b (小于): {a < b}")
print(f"  a > b (大于): {a > b}")
print(f"  a <= b (小于等于): {a <= b}")
print(f"  a >= b (大于等于): {a >= b}")

# 注意：Python 使用 == 比较值，is 比较身份（类似 ===）
# Python 没有 ===，用 == 即可比较值

print()

# ========== 5. 逻辑运算符 ==========

print("=" * 60)
print("5. 逻辑运算符（注意：Python 用 and/or/not，不是 &&/||/!）")
print("=" * 60)

age = 25
has_license = True

# and（类似 JS 的 &&）
if age >= 18 and has_license:
    print("  可以开车")

# 对比 JS/TS:
# if (age >= 18 && hasLicense) {
#   console.log("可以开车");
# }

# or（类似 JS 的 ||）
if age < 18 or age > 65:
    print("  需要特殊照顾")

# 对比 JS/TS:
# if (age < 18 || age > 65) {
#   console.log("需要特殊照顾");
# }

# not（类似 JS 的 !）
if not has_license:
    print("  没有驾照")
else:
    print("  有驾照")

# 对比 JS/TS:
# if (!hasLicense) {
#   console.log("没有驾照");
# } else {
#   console.log("有驾照");
# }

print()

# ========== 6. 成员运算符（in 和 not in） ==========

print("=" * 60)
print("6. 成员运算符（in/not in，类似 JS 的 includes）")
print("=" * 60)

fruits = ["苹果", "香蕉", "橙子"]
favorite = "苹果"

if favorite in fruits:
    print(f"  {favorite} 在水果列表中")

# 对比 JS/TS:
# if (fruits.includes(favorite)) {
#   console.log(`${favorite} 在水果列表中`);
# }

if "西瓜" not in fruits:
    print("  西瓜不在水果列表中")

print()

# 字符串检查
text = "Hello Python"
if "Python" in text:
    print(f"  'Python' 在字符串 '{text}' 中")

# 对比 JS/TS:
# if (text.includes("Python")) {
#   console.log(`'Python' 在字符串 '${text}' 中`);
# }

print()

# ========== 7. 身份运算符（is 和 is not） ==========

print("=" * 60)
print("7. 身份运算符（is/is not，比较对象身份，类似 JS 的 ===）")
print("=" * 60)

a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(f"  a = {a}")
print(f"  b = {b}")
print(f"  c = a")

# == 比较值
print(f"  a == b (值相等): {a == b}")  # True，值相同

# is 比较身份（是否是同一个对象）
print(f"  a is b (同一个对象): {a is b}")  # False，不同对象
print(f"  a is c (同一个对象): {a is c}")  # True，同一个对象

# None 的判断应该用 is，不是 ==
value = None
if value is None:
    print("  value 是 None（推荐用 is None）")

# 对比 JS/TS:
# const a = [1, 2, 3];
# const b = [1, 2, 3];
# console.log(a === b); // false（引用不同）
# if (value === null) { ... }

print()

# ========== 8. 三元运算符（条件表达式） ==========

print("=" * 60)
print("8. 三元运算符（Python 的语法不同）")
print("=" * 60)

age = 20

# Python 三元运算符：x if condition else y
status = "成年" if age >= 18 else "未成年"
print(f"  年龄 {age}: {status}")

# 对比 JS/TS:
# const status = age >= 18 ? "成年" : "未成年";

# 可以嵌套，但不推荐
score = 85
result = "优秀" if score >= 90 else "良好" if score >= 80 else "及格" if score >= 60 else "不及格"
print(f"  分数 {score}: {result}")

print()

# ========== 9. 布尔值判断（Python 的 Truthy/Falsy） ==========

print("=" * 60)
print("9. 布尔值判断（Python 的 Truthy/Falsy 值）")
print("=" * 60)

# Python 中为 False 的值：
# - False, None, 0, 0.0, "", [], {}, ()

# 检查列表是否为空
my_list = []

# 推荐写法（Pythonic）
if not my_list:
    print("  列表为空")

# 对比 JS/TS:
# if (myList.length === 0) { ... }
# 或 if (!myList.length) { ... }

# 检查字符串是否为空
name = ""
if not name:
    print("  姓名为空")

# 检查变量是否为 None
value = None
if value is None:
    print("  value 是 None")

# 检查数字是否为 0
count = 0
if count:
    print("  count 不为 0")
else:
    print("  count 为 0")

print()

# ========== 10. 链式比较（Python 特有！） ==========

print("=" * 60)
print("10. 链式比较（Python 特有语法）")
print("=" * 60)

x = 15

# Python 支持链式比较
if 10 <= x <= 20:
    print(f"  {x} 在 10 到 20 之间")

# 对比 JS/TS（需要分开写）:
# if (x >= 10 && x <= 20) {
#   console.log(`${x} 在 10 到 20 之间`);
# }

if 0 < x < 10:
    print(f"  {x} 在 0 到 10 之间")
else:
    print(f"  {x} 不在 0 到 10 之间")

print()

# ========== 11. 多条件判断示例 ==========

print("=" * 60)
print("11. 实际应用示例：多条件判断")
print("=" * 60)

def check_weather(temp, is_sunny, is_weekend):
    """根据多个条件判断天气"""
    print(f"  温度: {temp}°C, 晴天: {is_sunny}, 周末: {is_weekend}")
    
    if is_sunny and temp > 20 and is_weekend:
        return "完美！适合去公园玩"
    elif is_sunny and temp > 15:
        return "不错的天气，可以出门"
    elif not is_sunny or temp < 10:
        return "天气不好，建议待在家里"
    else:
        return "天气一般"

result1 = check_weather(25, True, True)
print(f"  结果1: {result1}")

result2 = check_weather(12, False, False)
print(f"  结果2: {result2}")

print()

# ========== 12. 嵌套 if 语句 ==========

print("=" * 60)
print("12. 嵌套 if 语句")
print("=" * 60)

age = 20
has_ticket = True
has_id = True

if age >= 18:
    print("  年龄符合要求")
    if has_ticket:
        print("    有门票")
        if has_id:
            print("      可以进入")
        else:
            print("      需要身份证")
    else:
        print("    需要门票")
else:
    print("  年龄不符合要求")

print()

# ========== 13. 使用 all() 和 any() ==========

print("=" * 60)
print("13. all() 和 any() 函数（类似 JS 的 every/some）")
print("=" * 60)

scores = [85, 90, 78, 92, 88]

# all() - 所有条件都为 True
if all(score >= 60 for score in scores):
    print("  所有成绩都及格了")

# 对比 JS/TS:
# if (scores.every(score => score >= 60)) {
#   console.log("所有成绩都及格了");
# }

# any() - 至少一个条件为 True
if any(score >= 90 for score in scores):
    print("  至少有一个优秀成绩")

# 对比 JS/TS:
# if (scores.some(score => score >= 90)) {
#   console.log("至少有一个优秀成绩");
# }

print()

# ========== 14. match...case（Python 3.10+，类似 switch） ==========

print("=" * 60)
print("14. match...case（Python 3.10+，类似 JS 的 switch）")
print("=" * 60)

status = "success"

match status:
    case "success":
        print("  操作成功")
    case "error":
        print("  操作失败")
    case "pending":
        print("  操作进行中")
    case _:  # 默认情况（类似 default）
        print("  未知状态")

# 对比 JS/TS:
# switch (status) {
#   case "success":
#     console.log("操作成功");
#     break;
#   case "error":
#     console.log("操作失败");
#     break;
#   default:
#     console.log("未知状态");
# }

print()

# ========== 15. 条件判断最佳实践 ==========

print("=" * 60)
print("15. 条件判断最佳实践")
print("=" * 60)

# ✅ 好的写法：直接判断布尔值
is_valid = True
if is_valid:
    print("  ✅ 推荐：直接判断布尔值")

# ❌ 不好的写法
if is_valid == True:
    print("  ❌ 不推荐：不需要 == True")

# ✅ 检查 None 用 is
value = None
if value is None:
    print("  ✅ 推荐：用 is None 检查")

# ❌ 不好的写法
if value == None:
    print("  ❌ 不推荐：用 == None（虽然能工作，但不推荐）")

# ✅ 检查空列表/字符串
items = []
if not items:
    print("  ✅ 推荐：直接判断是否为空")

# ❌ 不好的写法
if len(items) == 0:
    print("  ❌ 不推荐：用 len() == 0")

print()
print("=" * 60)
print("if 条件判断演示完成！")
print("=" * 60)

