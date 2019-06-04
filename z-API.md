## 路径文档
- host: `https://gy.ginmery.com/api/`

## 登录

- 登录：`/user/login?`， **POST**
  
  - ```javascript
    {code: ?}
    ```

## 首页

- 首页店铺： `shop/ShopList`
- 获取轮播图： `shop/BannerList`

## 商品

- 商品详情：`shop/GoodsDetails?` 
  
  - ```javascript
    { goods_id: ? }
    ```

- 购物车商品：**POST**， `shop/AddCart`

  ```javascript
  {
      goods_id: ?,
      quantity: 1,
      userid: ?
  }
  ```

## 购物车

- 获取购物车集合: `/shop/CartList?userid=`
  - 用户 `id`

- 删除购物车：**POST**, `/shop/DeleteShopCart`

  ```javascript
  {
      cart_id: ? // 商品id
  }
  ```

- 修改购物车商品数量: **POST**, `/shop/UpdateShopCart`

  ```javascript
  {
      cart_id: ?, // 商品id
      quantity: ? // 数量
  }
  ```

  