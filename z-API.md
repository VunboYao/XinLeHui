## 路径文档
- **host**: `https://gy.ginmery.com/api/`

## 登录

- 登录：`/user/login?`， **POST**
  
  - ```javascript
    {code: ?}
    ```

## 首页

- 首页店铺： `/shop/ShopList`

- 获取轮播图： `/shop/BannerList`

- 首页新闻列表： http://gy.ginmery.com/api/shop/NewsList?page=&take= (参数省略)

  ```javascript
  {
      page: 1,
      take: 5
  }
  ```

- 首页轮播跳转链接
  - 新闻页面： news
  - 商品页面：goods
  - 店铺页面：shop

## 新闻

- 新闻信息： `/shop/NewsInfo`

  ```javascript
  {
      id: ?
  }
  ```

  

## 商品

- 商品详情：`/shop/GoodsDetails?` 
  
  - ```javascript
    { goods_id: ? }
    ```

- 添加购物车商品：**POST**， `/shop/AddCart`

  ```javascript
  {
      goods_id: ?,
      quantity: 1,
      userid: ?
  }
  ```

## 购物车

- 获取购物车集合: `/shop/CartList?`

  ```javascript
  {
      userid: ? // 用户id
  }
  ```

  

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

  

## 店铺

- 店铺详情：`/shop/ShopDeatils`

  ```javascript
  {
      id: ?
  }
  ```

- 店铺商品列表: `/shop/GoodsListData`

  ```javascript
  {
      shopid: ?,
      page: ?,
      search: ?,
      sort: ?
  }
  ```

  ![img](file:///C:\Users\YYB\Documents\Tencent Files\1136025472\Image\C2C\I@RSCOATSZFB7E`WT}N105K.png)

