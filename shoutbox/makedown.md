# 留言板

## 在线留言板程序的规划

### 下面是这个在线留言板程序的需求

1. 用户应该可以注册、登录、退出。
2. 用户应该可以发消息（条目）。
3. 站点的访问者可以分页浏览条目。
4. 应该有个支持认证的简单的 REST API。
针对这些需求，我们要存储数据和处理用户认证，还需要对用户的输入进行校验。

#### 必要的路由应该有以下两种

* API 路由

1. GET /api/entries： 获取条目列表`。
2. GET /api/entries/page：获取单页条目。
3. POST /api/entry：创建新的留言条目。

* Web UI 路由

1. GET /post：显示创建新条目的表单。
2. POST /post：提交新条目。
3. GET /register：显示注册表单。
4. POST /register：创建新的用户账号。
5. GET /login：显示登录表单。
6. POST /login：登录。
7. GET /logout：退出。
