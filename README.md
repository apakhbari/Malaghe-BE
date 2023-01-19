# **Malaghe™ - BackEnd**

![ascii_malaghe_be.png](ascii_malaghe_be.png)

---

<br>

## **Description** :

### BackEnd of Malaghe™ Project. Developed using Typescript, Express.js, mongodb, Docker, nginx (reverse proxy).

<br>

---

## **Links**:

## [FrontEnd github](https://github.com/apakhbari/Malaghe-FE)

## [docker](https://hub.docker.com/repository/docker/apakhbari/malaghe)

---

## **TODO**:

1- for all of code, set proper return codes

    res.status(204).json({
      status: 'success',
      data: null
    });

2- userClicks in the database model

3- nginx hardening

4- nginx custom error page

---

<br>

# **USER SERVICE**

### **ROUTES**:

- /api/v1/users/currentuser --> GET
- /api/v1/users/:id --> GET
- /api/v1/users/service/:id --> GET
- &
- /api/v1/users/signin --> POST
- /api/v1/users/signout --> POST
- /api/v1/users/signup --> POST
- &
- /api/v1/users/:id --> PUT

<br>

### **USER MODEL**:

### **- userSchema -**

Flags : d --> default

| Number |       Field        |     Type      | required |
| :----: | :----------------: | :-----------: | :------: |
|   1    |       fiName       |    String     |    ✔     |
|   2    |       laName       |    String     |    ✔     |
|   3    |       isMale       |    boolean    |    ✔     |
|   4    |       email        |    String     |          |
|   5    |       mobile       |    String     |    ✔     |
|   6    |       phone        |    String     |          |
|   7    |       photo        |    String     |          |
|   8    |     locations      | `[locations]` |          |
|   9    |        role        |    Number     |   d:0    |
|   10   |      password      |    String     |    ✔     |
|   11   |      isActive      |    Boolean    |  d:true  |
|   12   |     createdAt      |     Date      |  d:now   |
|   13   | passwordResetToken |    String     |          |

<br>

### **- locations -**

| Number |   Field    |  Type  | required |
| :----: | :--------: | :----: | :------: |
|   1    |  address   | String |          |
|   2    | postalCode | String |          |
|   3    |    lat     | String |          |
|   4    |    long    | String |          |

<br>

### **- role -**

- User = 0,
- Admin = 1993,
- Operator = 3,
- Technician = 5,
- Transporter = 7,

---

<br>

# **STORE SERVICE**

### **ROUTES**:

- /api/v1/store --> GET
- /api/v1/store/:id --> GET
- &
- /api/v1/store --> POST

<br>

### **STORE MODEL**:

### **- storeSchema -**

Flags : d --> default

| Number |       Field       |      Type      | required |
| :----: | :---------------: | :------------: | :------: |
|   1    |       title       |     String     | ✔ unique |
|   2    |    description    |     String     |          |
|   3    |      summary      |     String     |          |
|   4    |     goodKind      |     Number     |          |
|   -    |         -         |       -        |    -     |
|   5    |      madeIn       |     Number     |          |
|   6    |     material      |     String     |          |
|   7    |       width       |     Number     |          |
|   8    |      length       |     Number     |          |
|   9    |      height       |     Number     |          |
|   10   |      weight       |     Number     |          |
|   -    |         -         |       -        |    -     |
|   11   |     photoNum      |     Number     |          |
|   12   |      photos       |    [String]    |          |
|   -    |         -         |       -        |    -     |
|   13   | availableQuantity |     Number     |          |
|   14   |  ratingsAverage   |     Number     |   d:0    |
|   15   |  ratingsQuantity  |     Number     |   d:0    |
|   16   |     comments      |  `[comments]`  |          |
|   -    |         -         |       -        |    -     |
|   17   |       price       |     Number     |          |
|   18   |    hasDiscount    |    Boolean     | d:false  |
|   19   |   discountKind    |     Number     |          |
|   20   |  discountedPrice  |     Number     |          |
|   -    |         -         |       -        |    -     |
|   21   |      hasMag       |    Boolean     |          |
|   22   |      magLink      |     String     |          |
|   -    |         -         |       -        |    -     |
|   23   |     createdBy     | Types.ObjectId |          |
|   24   |     createdAt     |      Date      |  d:now   |

<br>

### **- comments -**

| Number |   Field   |      Type      | required |
| :----: | :-------: | :------------: | :------: |
|   1    |    id     | Types.ObjectId |          |
|   2    |   name    |     String     |          |
|   3    |  message  |     String     |          |
|   4    |   rate    |     Number     |          |
|   5    | createdAt |      Date      |          |

<br>

### **- discountKind -**

- 1: percentage
- 2: exactPrice

<br>

### **- goodKind -**

- 1: dastgah
- 2: ghat'e

---

<br>

# **ORDER SERVICE**

### **ROUTES:**

- /api/v1/orders --> GET
- /api/v1/orders/:id --> GET
- /api/v1/orders/stat/:id --> GET
- /api/v1/orders/list/:mobileNumber --> GET
- /api/v1/orders/workflow/:code --> GET
- &
- /api/v1/orders/list --> GET **[OPERATOR]**
- /api/v1/orders/list/op-side --> GET **[OPERATOR]**
- &
- /api/v1/orders/service --> POST
- /api/v1/orders/cart --> POST

<br>

### **ORDER MODEL:**

### **- orderSchema -**

Flags : d --> default

| Number |      Field       |      Type      |  required  |
| :----: | :--------------: | :------------: | :--------: |
|   1    |       code       |     Number     |  ✔-unique  |
|   -    |        -         |       -        |     -      |
|   2    |      userId      | Types.ObjectId |            |
|   3    |     userName     |     String     |     ✔      |
|   4    |      isMale      |    Boolean     |     ✔      |
|   5    |      mobile      |     string     |     ✔      |
|   6    |      phone       |     string     |            |
|   7    |    postalCode    |     String     |            |
|   8    |     address      |     String     |            |
|   9    |       lat        |     String     |            |
|   10   |       long       |     String     |            |
|   11   |   description    |     String     |            |
|   -    |        -         |       -        |     -      |
|   12   |    prepayment    |     Number     |            |
|   13   |   overallPrice   |     Number     |            |
|   14   | usedDiscountCode |    Boolean     |            |
|   15   |   discountCode   |     String     |            |
|   16   |   paymentKind    |     Number     |            |
|   17   |     hasPaid      |    Boolean     |  d:false   |
|   -    |        -         |       -        |     -      |
|   18   |   orderStatus    |     Number     |     ✔      |
|   19   |   isClientSide   |    Boolean     |            |
|   20   |      isDone      |    Boolean     |  d:false   |
|   -    |        -         |       -        |     -      |
|   21   |    isExpress     |    Boolean     |            |
|   22   |    isService     |    Boolean     |     ✔      |
|   23   |   serviceKind    |     Number     |            |
|   -    |        -         |       -        |     -      |
|   24   |     workflow     |  `[workflow]`  |     ✔      |
|   -    |        -         |       -        |     -      |
|   25   |     products     |  `[products]`  |     ✔      |
|   -    |        -         |       -        |     -      |
|   26   |    createdAt     |      Date      | d:Date.now |

<br>

### **- workflow -**

| Number |    Field     |  Type  | required |
| :----: | :----------: | :----: | :------: |
|   1    |     time     |  Date  |    ✔     |
|   2    |  flowStatus  | Number |    ✔     |
|   3    | description? | String |          |
|   4    |     by?      | Number |          |
|   5    | attachment?  | String |          |

<br>

### **- products -**

| Number |    Field     |  Type  | required |
| :----: | :----------: | :----: | :------: |
|   1    |    title     | String |    ✔     |
|   2    | description  | String |          |
|   3    | initialPrice | number |          |
|   4    |    price     | number |          |
|   5    |   quantity   | number |          |

<br>

### **- serviceKind -**

- 1: t'amir,
- 2: t'aviz,

<br>

### **- paymentKind -**

- 1: dargah banki,
- 2: cart be cart,
- 3: hozoori,

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

### **- flowStatus -**

- 1: درخواست شما ایجاد شده است.

- payment = 1, در انتظار پرداخت
- transferring = 2, در حال جابجایی
- received = 3, دریافت‌شده
- cancelled = 4, مرجوع شده

- troubleshooting = 5, عیب‌یابی
- repairing = 6, تعمیر

<br>

---

### Readme.md CheatSheet -->

### ⌘K V --> split view

### ⇧⌘V --> separate view

https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#tables

---

<br>

# **© APA, 2022-2023, All Rights Reserved**

![ascii_apa.png](ascii_apa.png)
