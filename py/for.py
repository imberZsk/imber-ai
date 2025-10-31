"""
============================================================================
Python for 循环（Loops）Demo - JS/TS 转 Python 学习指南
============================================================================

📚 核心总结：
-----------
Python 的 for 循环主要用来遍历可迭代对象（列表、字符串、字典等），
使用 range() 函数来生成数字序列，代替传统的计数循环。

🔑 与 JS/TS 的主要区别：
------------------------

1. 【基础语法】
   Python:   for item in items:
                print(item)
   
   JS:        for (const item of items) {
                console.log(item);
              }

2. 【数字循环】
   Python:   for i in range(5):      # 0 到 4
   
   JS:       for (let i = 0; i < 5; i++) {
               console.log(i);
             }

3. 【获取索引】
   Python:   for index, value in enumerate(items):
                print(index, value)
   
   JS:       items.forEach((value, index) => {
               console.log(index, value);
             });

4. 【遍历字典】
   Python:   for key, value in person.items():
                print(key, value)
   
   JS:       for (const [key, value] of Object.entries(person)) {
               console.log(key, value);
             }

5. 【range() 函数】
   Python:   range(5)        # 0,1,2,3,4
             range(2, 6)     # 2,3,4,5
             range(0, 10, 2) # 0,2,4,6,8
             range(10, 0, -1) # 倒序
   
   JS:       没有内置的 range，需要自己写循环

6. 【break 和 continue】
   两者用法相同，都是跳出循环和跳过本次循环

7. 【for...else（Python 特有）】
   Python:   for i in range(3):
                 print(i)
             else:
                 print("循环正常结束")  # 没有 break 时执行
   
   JS:       没有这个特性

8. 【列表推导式】
   Python:   squares = [x**2 for x in numbers]
             evens = [x for x in numbers if x % 2 == 0]
   
   JS:       const squares = numbers.map(x => x ** 2);
             const evens = numbers.filter(x => x % 2 === 0);

9. 【zip() 函数】
   Python:   for name, age in zip(names, ages):
                print(name, age)
   
   JS:       for (let i = 0; i < names.length; i++) {
               console.log(names[i], ages[i]);
             }

10. 【倒序遍历】
    Python:   for item in reversed(items):
                  print(item)
              或 for item in items[::-1]:
   
    JS:       for (let i = items.length - 1; i >= 0; i--) {
               console.log(items[i]);
             }

💡 快速对比表：
--------------
┌─────────────────┬──────────────┬─────────────┐
│   功能          │   Python     │   JS/TS     │
├─────────────────┼──────────────┼─────────────┤
│ 遍历数组        │ for x in arr │ for...of    │
│ 数字循环        │ range(n)     │ for(i=0...) │
│ 获取索引        │ enumerate()  │ forEach()   │
│ 遍历对象        │ .items()     │ Object.entries│
│ break/continue  │ 相同         │ 相同        │
│ 列表推导式      │ [x for x...] │ map/filter  │
│ for...else      │ ✅ 支持      │ ❌ 不支持   │
└─────────────────┴──────────────┴─────────────┘

============================================================================
"""

# for 循环演示

# ===== Python for 循环 vs JavaScript/TypeScript =====

# ========== 1. 基础 for 循环（类似 JS 的 for...of） ==========

print("=" * 60)
print("1. 遍历列表（类似 JS 的 for...of array）")
print("=" * 60)

# Python
fruits = ["苹果", "香蕉", "橙子"]
for fruit in fruits:
    print(f"我喜欢吃 {fruit}")

# 对比 JS/TS:
# const fruits = ["苹果", "香蕉", "橙子"];
# for (const fruit of fruits) {
#   console.log(`我喜欢吃 ${fruit}`);
# }

print()

# ========== 2. range() 函数（类似 JS 的 for(let i=0; i<n; i++)） ==========

print("=" * 60)
print("2. 使用 range() 生成数字序列")
print("=" * 60)

# 从 0 到 4（不包括 5）
print("range(5):")
for i in range(5):
    print(f"  i = {i}")

# 对比 JS/TS:
# for (let i = 0; i < 5; i++) {
#   console.log(`i = ${i}`);
# }

print()

# 指定起始和结束值
print("range(2, 6):")
for i in range(2, 6):
    print(f"  i = {i}")

# 对比 JS/TS:
# for (let i = 2; i < 6; i++) {
#   console.log(`i = ${i}`);
# }

print()

# 指定步长
print("range(0, 10, 2):")
for i in range(0, 10, 2):
    print(f"  i = {i}")

# 对比 JS/TS:
# for (let i = 0; i < 10; i += 2) {
#   console.log(`i = ${i}`);
# }

print()

# 倒序循环
print("range(10, 0, -1):")
for i in range(10, 0, -1):
    print(f"  倒计时: {i}")

print()

# ========== 3. enumerate() - 同时获取索引和值 ==========

print("=" * 60)
print("3. enumerate() 获取索引和值（类似 JS 的 array.forEach）")
print("=" * 60)

students = ["小明", "小红", "小刚"]

# 方法1: 使用 enumerate（推荐）
for index, student in enumerate(students):
    print(f"  索引 {index}: {student}")

# 对比 JS/TS:
# students.forEach((student, index) => {
#   console.log(`索引 ${index}: ${student}`);
# });

print()

# enumerate 从指定数字开始
for index, student in enumerate(students, start=1):
    print(f"  第 {index} 名学生: {student}")

print()

# ========== 4. 遍历字符串 ==========

print("=" * 60)
print("4. 遍历字符串的每个字符")
print("=" * 60)

word = "Python"
for char in word:
    print(f"  字符: {char}")

print()

# ========== 5. 遍历字典（类似 JS 的 for...in 对象） ==========

print("=" * 60)
print("5. 遍历字典（类似 JS 的 for...in object）")
print("=" * 60)

person = {
    "name": "张三",
    "age": 25,
    "city": "北京"
}

# 遍历键（默认）
print("遍历键:")
for key in person:
    print(f"  {key}")

print()

# 遍历键值对（推荐）
print("遍历键值对:")
for key, value in person.items():
    print(f"  {key}: {value}")

# 对比 JS/TS:
# for (const [key, value] of Object.entries(person)) {
#   console.log(`${key}: ${value}`);
# }

print()

# 只遍历值
print("只遍历值:")
for value in person.values():
    print(f"  {value}")

print()

# ========== 6. 嵌套循环 ==========

print("=" * 60)
print("6. 嵌套循环（九九乘法表）")
print("=" * 60)

for i in range(1, 4):  # 只显示前3行作为示例
    for j in range(1, 4):
        print(f"  {i} × {j} = {i * j}", end="  ")
    print()  # 换行

print()

# ========== 7. break 和 continue ==========

print("=" * 60)
print("7. break（跳出循环）和 continue（跳过本次循环）")
print("=" * 60)

# break 示例：找到第一个偶数就停止
print("break 示例 - 找到第一个偶数就停止:")
for num in [1, 3, 5, 8, 9, 10]:
    if num % 2 == 0:
        print(f"  找到第一个偶数: {num}")
        break
    print(f"  {num} 是奇数，继续查找...")

print()

# continue 示例：只打印偶数
print("continue 示例 - 只打印偶数:")
for num in range(1, 11):
    if num % 2 != 0:
        continue  # 跳过奇数
    print(f"  {num} 是偶数")

print()

# ========== 8. else 子句（Python 特有！） ==========

print("=" * 60)
print("8. for...else（Python 特有功能）")
print("=" * 60)

# else 在循环正常结束时执行（不是通过 break 退出）
print("示例1: 循环正常结束，执行 else")
for i in range(3):
    print(f"  执行 {i}")
else:
    print("  循环正常完成（没有 break）")

print()

print("示例2: 循环被 break 中断，不执行 else")
for i in range(5):
    if i == 3:
        print(f"  在 {i} 处 break")
        break
    print(f"  执行 {i}")
else:
    print("  这行不会执行")

print()

# ========== 9. 列表推导式（类似 JS 的 map/filter） ==========

print("=" * 60)
print("9. 列表推导式（类似 JS 的 map/filter）")
print("=" * 60)

# 传统方式
numbers = [1, 2, 3, 4, 5]
squares = []
for num in numbers:
    squares.append(num ** 2)
print(f"传统方式: {squares}")

# 列表推导式（推荐，更简洁）
squares = [num ** 2 for num in numbers]
print(f"列表推导式: {squares}")

# 对比 JS/TS:
# const squares = numbers.map(num => num ** 2);

print()

# 带条件的列表推导式（类似 filter + map）
even_squares = [num ** 2 for num in numbers if num % 2 == 0]
print(f"偶数的平方: {even_squares}")

# 对比 JS/TS:
# const evenSquares = numbers
#   .filter(num => num % 2 === 0)
#   .map(num => num ** 2);

print()

# ========== 10. 遍历多个序列（zip） ==========

print("=" * 60)
print("10. zip() 同时遍历多个序列")
print("=" * 60)

names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]

for name, age in zip(names, ages):
    print(f"  {name} 今年 {age} 岁")

# 对比 JS/TS:
# for (let i = 0; i < names.length; i++) {
#   console.log(`${names[i]} 今年 ${ages[i]} 岁`);
# }

print()

# ========== 11. 倒序遍历 ==========

print("=" * 60)
print("11. 倒序遍历列表")
print("=" * 60)

items = ["第一项", "第二项", "第三项"]

# 方法1: 使用 reversed()
print("方法1: reversed()")
for item in reversed(items):
    print(f"  {item}")

print()

# 方法2: 使用切片 [::-1]
print("方法2: 切片 [::-1]")
for item in items[::-1]:
    print(f"  {item}")

print()

# ========== 12. 实际应用示例 ==========

print("=" * 60)
print("12. 实际应用示例")
print("=" * 60)

# 示例：计算列表总和
scores = [85, 90, 78, 92, 88]
total = 0
for score in scores:
    total += score
average = total / len(scores)
print(f"成绩列表: {scores}")
print(f"总分: {total}, 平均分: {average:.2f}")

print()

# 示例：查找最大值
max_score = scores[0]
for score in scores:
    if score > max_score:
        max_score = score
print(f"最高分: {max_score}")

# 或者使用内置函数：max(scores)

print()
print("=" * 60)
print("for 循环演示完成！")
print("=" * 60)

