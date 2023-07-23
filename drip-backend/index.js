const Koa = require("koa");
const Router = require("@koa/router");
const Sequelize = require("sequelize");
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
const sequelize = new Sequelize("database", "username", "password", {
  dialect: "sqlite",
  storage: "database.sqlite"
});

const Restaurant = sequelize.define("restaurant", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const User = sequelize.define("user", {
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  proofOfHumanity: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
});

const Review = sequelize.define("review", {
  score: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

const Image = sequelize.define("image", {
  cid: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

User.hasMany(Review, {
  foreignKey: 'userId',
  as: 'reviews',
});

Review.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

Restaurant.hasMany(Review, {
  foreignKey: 'reviewId',
  as: 'reviews',
});

Review.belongsTo(Restaurant, {
  foreignKey: 'restaurantId',
  as: 'restaurant',
});

Review.hasMany(Image, {
  foreignKey: 'imageId',
  as: 'images',
});

Image.belongsTo(Review, {
  foreignKey: 'reviewId',
  as: 'review',
});

sequelize.sync().then(() => {
  console.log("Database synchronized");
}).catch((err) => {
  console.error("Error synchronizing database:", err);
});

router.post("/user", async (ctx) => {
  const { address } = ctx.request.body;

  try {
    const user = await User.create({address});
    ctx.body = user;
  } catch (e) {
    ctx.status = 500;
    ctx.body = 'Failed to create project with assets';
  }
});

router.put("/user/:id", async (ctx) => {
  const { address, proofOfHumanity } = ctx.request.body;

  try {
    const user = await User.update({proofOfHumanity, address}, { where: { id: ctx.params.id } });
    ctx.body = user;
  } catch (e) {
    ctx.status = 500;
    ctx.body = 'Failed to update the user';
  }
});

router.get("/user/:address", async (ctx) => {
  const user = await User.findOne({where: {address: ctx.params.address}}, {include: [Review]});

  if (!user) {
    ctx.status = 404;
    ctx.body = "User not found";
  } else {
    ctx.body = user;
  }
});


router.post("/review", async (ctx) => {
  const { score, comment, images, restaurantId, userAddress } = ctx.request.body;

  const user = await User.findOne({where: {address: userAddress}});

  console.log("user", user);

  try {
    const review = await Review.create({ score, comment, restaurantId, userId: user.id });

    const createdImages = await Promise.all(
      images.map(async (asset) => {
        const { cid } = asset;
        return await Image.create({ cid, reviewId: review.id });
      })
    );

    review.images = createdImages;

    ctx.body = review;
  } catch (e) {
    ctx.status = 500;
    ctx.body = 'Failed to create review';
  }
});

router.get("/restaurants", async (ctx) => {
  const restaurants = await Restaurant.findAll();
  ctx.body = restaurants;
});

router.get("/restaurant/:id", async (ctx) => {
  const restaurant = await Restaurant.findOne({where: {id: ctx.params.id}}, {include: [Review]});

  if (!restaurant) {
    ctx.status = 404;
    ctx.body = "Place not found";
  } else {
    ctx.body = restaurant;
  }
});

router.get("/restaurant/:id/reviews", async (ctx) => {
  const reviews = await Review.findAll({where: {restaurantId: ctx.params.id}}, {include: User});

  if (!reviews) {
    ctx.status = 404;
    ctx.body = "Reviews not found";
  } else {
    ctx.body = reviews;
  }
});

router.post("/restaurant", async (ctx) => {
  const { name, address } = ctx.request.body;

  console.log(name)
  console.log(address)

  try {
    const restaurant = await Restaurant.create({ name, address });
    ctx.body = restaurant;
  } catch (e) {
    ctx.status = 500;
    ctx.body = 'Failed to create place';
  }
});


// router.get("/projects", async (ctx) => {
//   const projects = await Project.findAll({
//     include: [Asset]
//   });
//   ctx.body = projects;
// });
//
// router.get("/projects/:id", async (ctx) => {
//   const project = await Project.findByPk(ctx.params.id, {
//     include: [Asset]
//   });
//   if (!project) {
//     ctx.status = 404;
//     ctx.body = "Project not found";
//   } else {
//     ctx.body = project;
//   }
// });
//
// router.get("/assets/:id", async (ctx) => {
//   const project = await Asset.findByPk(ctx.params.id, {
//     include: Project
//   });
//   if (!project) {
//     ctx.status = 404;
//     ctx.body = "Asset not found";
//   } else {
//     ctx.body = project;
//   }
// });
//
// router.post("/projects", async (ctx) => {
//   const { name, chain } = ctx.request.body;
//   const project = await Project.create({ name, chain });
//   ctx.body = project;
// });
//
// router.post("/projects/:id/assets", async (ctx) => {
//   const projectId = ctx.params.id;
//   const { chain, contractAddress } = ctx.request.body;
//   const asset = await Asset.create({ chain, contractAddress, projectId });
//   ctx.body = asset;
// });
//
// router.post("/projects-with-assets", async (ctx) => {
//   const { name, chain, assets } = ctx.request.body;
//
//   try {
//     const project = await Project.create({ name, chain });
//
//     const createdAssets = await Promise.all(
//       assets.map(async (asset) => {
//         const { chain, contractAddress } = asset;
//         return await Asset.create({ chain, contractAddress, projectId: project.id });
//       })
//     );
//
//     project.assets = createdAssets;
//
//     ctx.body = project;
//   } catch (error) {
//     ctx.status = 500;
//     ctx.body = 'Failed to create project with assets';
//   }
// });

router.get("/test", async (ctx) => {
  ctx.body = "Server is live!";
});

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser());
app.use(router.routes());

const port = process.env.PORT || 3003; // Use the provided PORT environment variable for production, or fallback to 3000 for development

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});