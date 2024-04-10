---
title: API 设计约定
---

# API 设计约定

为了让开发者得到更好的开发体验，我们制定了以 `所见即所得` 为目标的开发约定。

## 路径约定

### 可识别的 API 路径

::: danger 约定
- 全部 API 必须以 `application/json` 的格式实现请求与响应。
- 必须遵守 `METHOD` 即 `路径` 的原则，并且禁止使用 `save` 这类有歧义的命名。
- 必须使用 `QueryString` 方式的 `路径`，禁止使用 `/api/good/10000` 这类有歧义的命名。
:::

#### 合理的 API 路径

```sh
POST    /goods/create           ✅
PUT     /goods/update?id=100    ✅
DELETE  /goods/delete           ✅
GET     /goods/list             ✅
GET     /goods/detail?id=100    ✅
```

#### 有歧义的 API 路径

```sh
POST    /good                   ❌
PUT     /good/100               ❌
DELETE  /good                   ❌
GET     /goods                  ❌
GET     /good/100               ❌
```

### CRUD

> `CRUD` 是任何系统的基本需求，在 90% 的接口都是 `CRUD` 的业务中，遵循统一的约定是十分重要的事情。

::: danger 约定
- 默认所有 `CRUD` API 均不在 `POST`, `PUT` 的 `Body` 中传入 `主键`
- `主键` 必须以 `GET`，`DELETE` 方式传入
- `CRUD` 必须以 `create`, `detail`, `update`, `delete` 作为末位路径，并且使用对应的 `Method`
  - `create` : `POST`
  - `detail` : `GET`
  - `update` : `PUT`
  - `delete` : `DELETE`
:::

#### 详情 Detail {#crud-detail}

- Path: `/api/goods/detail`
- Method: `GET`
- Query: `?id=[ID]`

```sh
GET /api/goods/detail?id=100
```

#### 列表 List {#crud-list}

> `列表` 是指 [列表类型](#list)

- Path: `/api/group/list`
- Method: `GET`
- Query: `?keyword=[value]`

```sh
GET /api/group/list?keyword=xiaoshop
```

#### 分页数据 Pages {#pages}

> `分页数据` 是指 [分页列表类型](#pagination)

- Path: `/api/goods/pages`
- Method: `GET`
- Query: `?keyword=[value]`

```sh
GET /api/goods/pages?keyword=xiaoshop
```

#### 创建 Create {#crud-create}

- Path: `/api/goods/create`
- Method: `POST`

```sh
POST /api/goods/create
```

#### 更新 Update {#crud-update}

- Path: `/api/goods/update`
- Method: `PUT`
- Query: `?id=[ID]`
- Body: `{...}`

```sh
PUT /api/goods/update?id=100
```

#### 删除 Delete {#crud-delete}

- Path: `/api/goods/update`
- Method: `DELETE`
- Body: `{"id": 100}`

```sh
DELETE /api/goods/delete
```

## API 响应体

::: danger 约定
- 所有键值为 `空值` 时，则该项不返回
- `空值` 的定义范围：`""`，`[]`，`{}`
- `分页列表类型` 的 `data` 不受 `空值` 约定影响

::: code-group
```json [文本类型]
{
  "code": 0,
  "message": "", // [!code --]
  "data": "" // [!code --]
}
```

```json [列表类型]
{
  "code": 0,
  "message": "", // [!code --]
  "data": [] // [!code --]
}
```

```json [键值对象类型]
{
  "code": 0,
  "message": "", // [!code --]
  "data": {} // [!code --]
}
```

```json [分页列表类型]
{
  "code": 0,
  "message": "", // [!code --]
  "data": {
    "result": [],
    "current": 1,
    "total": 0,
    "pageSize": 20
  }
}
```
:::

::: info 说明
- `code`: 错误码，`0` 代表 API 请求成功
- `message`: 错误消息，默认为空值 `""`
- `data`: 响应数据，根据不同的类型有具体的要求
:::

### 响应类型

> 响应类型分为: `文本`，`键值对象`，`列表`，`分页列表`

#### 文本类型 {#string}

```json
{
  "code": 0,
  "message": "",
  "data": ""
}
```

#### 键值对象类型 {#key-value}

```json
{
  "code": 0,
  "message": "",
  "data": {
    "key": "value"
  }
}
```

#### 列表类型 {#list}

```json
{
  "code": 0,
  "message": "",
  "data": [
    {
      "key": "value"
    }
  ]
}
```

#### 分页列表类型 {#pagination}

```json
{
  "code": 0,
  "message": "",
  "data": {
    "result": [
      {
        "key": "value"
      }
    ],
    "current": 1,
    "total": 1,
    "pageSize": 20
  }
}
```

### 命名方式

::: danger 约定
- 所有 `键名` 必须以 `CamelCase` 方式命名，禁止使用 `SnakeCase`, `KebabCase`

```
camelCase // [!code ++]
snake_case // [!code --]
kebab-case // [!code --]
```
:::

> 影响全部 `键名`

```json
{
  "code": 0,
  "message": "",
  "data": {
    "result": [
      {
        "key_name": "value" // [!code --]
        "keyName": "value" // [!code ++]
      }
    ],
    "current": 1,
    "total": 1,
    "pagesize": 20 // [!code --]
    "pageSize": 20 // [!code ++]
  }
}
```

## 响应错误

::: danger 约定
- `code` 为非 `0` 则表示发生错误
- `code` 为非 `0` 时， `message` 必须以终端用户的视角，填写有意义的错误提示
- 常规 `code` 必须在 [错误码速查表](/docs/quick-look/errors) 中记录
:::

### 相关内容

- [错误码速查](/docs/quick-look/errors)

## 用户鉴权

> 未完待续...
