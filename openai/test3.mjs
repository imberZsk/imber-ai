import fs from 'node:fs';

const res = {
    name: 'getCode',
    arguments: '{\n' +
      `"code1": "export { default as UserTable } from './UserTable';\\nexport type { UserTableProps } from './interface';\\n",\n` +
      '"code2": "interface UserTableProps {\\n    users: {\\n        name: string;\\n        age: number;\\n        email: string;\\n    }[];\\n}\\nexport type { UserTableProps };\\n",\n' +
      `"code3": "import React from 'react';\\nimport { UserTableProps } from './interface';\\nimport './styles.scss';\\n\\nconst UserTable: React.FC<UserTableProps> = ({users}) => {\\n    return (\\n        <div className='user-table'>\\n            <div className='user-table-row user-table-header'>\\n                <div className='user-table-cell'>Name</div>\\n                <div className='user-table-cell'>Age</div>\\n                <div className='user-table-cell'>Email</div>\\n            </div>\\n            {users.map((user, index) => (\\n                <div key={index} className='user-table-row'>\\n                    <div className='user-table-cell'>{user.name}</div>\\n                    <div className='user-table-cell'>{user.age}</div>\\n                    <div className='user-table-cell'>{user.email}</div>\\n                </div>\\n            ))}\\n        </div>\\n    )\\n};\\n\\nexport default UserTable;\\n",\n` +
      '"code4": ".user-table {\\n    display: flex;\\n    flex-direction: column;\\n    margin: 20px;\\n}\\n\\n.user-table-row {\\n    display: flex;\\n}\\n\\n.user-table-row.user-table-header {\\n    font-weight: bold;\\n}\\n\\n.user-table-cell {\\n    flex: 1;\\n    padding: 10px;\\n    border: 1px solid #ddd;\\n}\\n"\n' +
      '}'
  }

const codes = JSON.parse(res.arguments);

fs.mkdirSync('./Table');
fs.writeFileSync('./Table/index.ts', codes.code1);
fs.writeFileSync('./Table/interface.ts', codes.code2);
fs.writeFileSync('./Table/UserTable.tsx', codes.code3);
fs.writeFileSync('./Table/index.module.scss', codes.code4);