这是一个简单的示例如何使用React去创建一个表格组件. 你可以用这个组件来展示一个简单的用户列表.

```jsx
import React from 'react';

const Table = ({ users }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
```

这个Table组件接受一个属性"users",它应该是一个对象数组,每个对象都代表一个用户，至少包含用户的 id, name 和 email. 这个组件将显示一个表格，其中包含用户的名字和电子邮件.

你可以像这样使用这个组件：

```jsx
import React from 'react';
import Table from './Table';

const App = () => {
    const users = [
        { id: 1, name: 'John', email: 'john@example.com' },
        { id: 2, name: 'Jane', email: 'jane@example.com' },
        // more users here...
    ];

    return <Table users={users} />;
};

export default App;
```

注意：这是一个基础示例，并未包含复杂的表现逻辑，例如：排序、筛选或分页等。