---
title: Table
order: 4
---

# 表格

## 默认分页 Table

使用 antd 默认有分页的表格，这种情况需要一开始获取到所有的数据，然后 antd 的 Table 会自动给你分页，自动给你截取数据。

```jsx
import React from 'react';
import { Table } from 'antd';

const columns = [
  { title: '序号', dataIndex: 'key', key: 'key'},
  { title: '姓名', dataIndex: 'name', key: 'name'},
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
];

const dataSource = [];
for (let i = 0; i < 100; i++) {
  dataSource.push({
    key: i+1,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

// 没有设置分页器，默认会分页，不过一开始要获取到所有数据，内部会进行处理
export default () => <Table columns={columns} dataSource={dataSource} />
```

## 手动分页 Table

当有时候并不是返回所有数据的情况时，服务端返回的数据是根据传入的页码和一页显示多少条, current 和 pageSize 控制时，那么就需要我们自己手动增加 pagination 选项。

这里我们做了封装，内部已经设置好了分页配置，我们直接调用 onChange 和 onShowSizeChange 方法就能对分页操作。此时我们需要配置几个关键属性：
- `columns`：Table的列名
- `dataSource`：数据
- `pageManage`：页码相关 `{current: 1, pageSize: 20, total: 0}`
- `onChange`：点击页码时的回调
- `onShowSizeChange`：点击一页显示多少条数据时的回调

```jsx
import React, { useEffect, useState } from 'react';
import { Table } from 'components';

const columns = [
  { title: '序号', dataIndex: 'key', key: 'key' },
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
];

export default () => {

  let [pageManage, setPageManage] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  let [dataSource, setDataSource] = useState([]);

  function onChange(current, pageSize) {
    setPageManage({
      ...pageManage,
      current,
    });
  }

  function onShowSizeChange(current, pageSize) {
    setPageManage({
      ...pageManage,
      pageSize,
      current
    });
  }

  // 其实这里点击 onShowSizeChange 是无效的， 因为数据其实应该是 处理好 返回的， 我这里本地没有做处理，所以点击时返回的数据是不对的, 但是就是这么一个意思，组件和方法是没问题的。
  useEffect(() => {
    const dataSource = [];
    for (let i = 0; i < 100; i++) {
      dataSource.push({
        key: i + 1,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      });
    }
    setDataSource(dataSource)
    setPageManage({
      ...pageManage,
      total: dataSource.length
    })
  }, [])

  return <Table
    columns={columns}
    dataSource={dataSource}
    // scroll={{x: 1000}}
    pageManage={pageManage}
    onChange={onChange}
    onShowSizeChange={onShowSizeChange}
  />
}
```

