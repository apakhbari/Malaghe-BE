# **Malaghe™ - BackEnd**

![ascii_malaghe_be.png](ascii_malaghe_be.png)

---

<br>

## **Description** :

## BackEnd of Malaghe™ Project. Developed using Typescript, Express.js, mongodb, Docker, nginx (reverse proxy).

<br>

---

## **Links**:

## FrontEnd github: --> https://github.com/apakhbari/Malaghe-FE

## docker --> https://hub.docker.com/repository/docker/apakhbari/malaghe

---

## **TODO**:

1- for all of code, set proper return codes

    res.status(204).json({
      status: 'success',
      data: null
    });

2- userClicks in the database model

### **production:**

gender : 0,1 instead of mard, zan
2- paymentKind : number instead of text
3- workflow description number instead of text
1- store: rendering props

### **temp todo:**

1- png favicon

admin / op:

1- admin dashboard

2- id op in new-store

3- sign in

---

### ⌘K V --> split view

### ⇧⌘V --> separate view

### code /etc/hosts

---

### Readme.md CheatSheet -->

https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#tables

---

<br>

# **USER SERVICE**

### **ToDo**:

- refactor routes/signin
- refactor routes/currentuser
- refactor routes/signout

- delete user route

<br>

### **ROUTES**:

- /api/v1/users/signin --> POST
- /api/v1/users/signout --> POST
- /api/v1/users/signup --> POST
- '/api/v1/users/currentuser --> GET

<br>

### **USER MODEL**:

<br>

### **- userSchema -**

Flags : t --> trim, l --> lowercase, d --> default, minlength --> mn, maxlength --> mx

| Number |       Field        |        Type        | required |  flags  |
| :----: | :----------------: | :----------------: | :------: | :-----: |
|   1    |       fiName       |       String       |    ✔     |    t    |
|   2    |       laName       |       String       |    ✔     |    t    |
|   3    |       gender       |       Number       |    ✔     |         |
|   4    |       email        |       String       |          |   t-l   |
|   5    |       mobile       |       String       |    ✔     |    t    |
|   6    |       photo        |       String       |          |         |
|   7    |     locations      | `[locationsAttrs]` |          |         |
|   8    |        role        |     UsersRoles     |  d:user  |         |
|   9    |      password      |       String       |    ✔     | t-mn-mx |
|   10   |      isActive      |      Boolean       |  d:true  |         |
|   11   |     createdAt      |        Date        |  d:now   |         |
|   12   | passwordResetToken |       String       |          |         |

<br>

### **- locationsAttrs -**

| Number |    Field    |        Type        |
| :----: | :---------: | :----------------: |
|   1    | coordinates | `coordinatesAttrs` |
|   2    |   address   |       String       |
|   3    | postalCode  |       Number       |

<br>

### **- coordinatesAttrs -**

| Number | Field |  Type  |
| :----: | :---: | :----: |
|   1    | long  | number |
|   2    |  lat  | number |

---

<br>

# **STORE SERVICE**

**ToDo**:

<br>

### **ROUTES**:

- index: /api/v1/store --> GET
- new: /api/v1/store --> POST
- show: /api/v1/store/:storeId --> GET
- patch: /api/v1/mag/:storeId --> PATCH
- delete: /api/v1/mag/:storeId --> DELETE

### **STORE MODEL**:

<br>

### **- storeSchema -**

Flags : t --> trim, l --> lowercase, d --> default, minlength --> mn, maxlength --> mx

| Number |       Field       |      Type      | required |  flags  |
| :----: | :---------------: | :------------: | :------: | :-----: |
|   1    |       title       |     String     | ✔ unique | t-mn-mx |
|   2    |    description    |     String     |          |  t-mn   |
|   3    |      summary      |    [String]    |    ✔     | t-mn-mx |
|   4    |      volumes      |     String     |          |    t    |
|   5    |    imageCover     |     String     |    ✔     |         |
|   6    |      photos       |    [String]    |          |         |
|   7    | availableQuantity |     Number     |    ✔     |         |
|   8    |  ratingsAverage   |     Number     |   d:5    |         |
|   9    |  ratingsQuantity  |     Number     |   d:0    |         |
|   10   |       price       |     Number     |    ✔     |         |
|   11   |    hasDiscount    |    Boolean     | d:false  |         |
|   12   |   discountKind    | `discountKind` |          |         |
|   13   |  discountedPrice  |     Number     |          |         |
|   14   |     createdAt     |      Date      |  d:now   |         |
|   15   |      magData      |  `[magAttrs]`  |          |         |

<br>

### **- discountKind enum -**

- percentage
- exactPrice

<br>

---

<br>

# **ORDER SERVICE**

### **ROUTES:**

- /api/v1/orders --> GET
- /api/v1/orders/list --> GET OP
- /api/v1/orders/list/op-side --> GET OP
- /api/v1/orders/:id --> GET
- /api/v1/orders/stat/:id --> GET
- /api/v1/orders/list/:mobileNumber --> GET
- /api/v1/orders/workflow/:code --> GET

- /api/v1/orders/service --> POST
- /api/v1/orders/cart --> POST

<br>

### **ORDER MODEL:**

<br>

### **- orderSchema -**

| Number |        Field        |      Type       |  required  |
| :----: | :-----------------: | :-------------: | :--------: |
|   1    |        code         |     Number      |  ✔-unique  |
|   -    |          -          |        -        |     -      |
|   2    |       userId        | Types.ObjectId  |            |
|   3    |      userName       |     String      |     ✔      |
|   3    |       gender        |     String      |     ✔      |
|   4    |       mobile        |     Number      |     ✔      |
|   5    |        phone        |     Number      |            |
|   6    |     postalCode      |     String      |            |
|   7    |       address       |     String      |            |
|   8    |         lat         |     String      |            |
|   9    |        long         |     String      |            |
|   -    |          -          |        -        |     -      |
|   10   |     prepayment      |     Number      |            |
|   11   |    overallPrice     |     Number      |            |
|   11   | hasUsedDiscountCode |     Boolean     |            |
|   12   |    discountCode     |     String      |            |
|   13   |     paymentKind     | paymentKindEnum |            |
|   14   |       hasPaid       |     Boolean     |  d:false   |
|   -    |          -          |        -        |     -      |
|   19   |     orderStatus     |     Number      |            |
|   15   |    isClientSide     |     Boolean     |            |
|   16   |       isDone        |     Boolean     |  d:false   |
|   -    |          -          |        -        |     -      |
|   15   |      isExpress      |     Boolean     |            |
|   17   |      isService      |     Boolean     |            |
|   18   |     serviceKind     | serviceKindEnum |            |
|   20   |     [workflow]      |   [workflow]    |     ✔      |
|   21   |     [products]      |   [products]    |     ✔      |
|   22   |      createdAt      |      Date       | d:Date.now |

<br>

### **- workflow -**

| Number |    Field    |  Type  |
| :----: | :---------: | :----: |
|   1    |    time     |  Date  |
|   2    | orderStatus | Number |
|   3    | description | String |

<br>

### **- products -**

| Number |    Field    |  Type  |
| :----: | :---------: | :----: |
|   1    |    title    | String |
|   2    | description | String |
|   3    |    price    | number |
|   4    |  quantity   | number |

<br>

### **- orderStatus -**

- created = 0, ایجاد شده
- payment = 1, در انتظار پرداخت
- transferring = 2, در حال جابجایی
- received = 3, دریافت‌شده
- cancelled = 4, مرجوع شده

- troubleshooting = 5, عیب‌یابی
- repairing = 6, تعمیر

<br>

---

<br>

# **© APA, 2022-2023, all rights reserved**

![ascii_apa.png](ascii_apa.png)
