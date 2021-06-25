import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListSentComplimentsController } from "./controllers/ListSentComplimentsController";
import { ListReceivedComplimentsController } from "./controllers/ListReceivedComplimentsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ListTagsController } from "./controllers/ListTagsController";

const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()
const listSentComplimentsController = new ListSentComplimentsController()
const listReceivedComplimentsController = new ListReceivedComplimentsController()
const listUsersController = new ListUsersController()
const listTagsController = new ListTagsController()



router.post("/users", createUserController.handle)
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle)
router.post("/login", authenticateUserController.handle)
router.post("/compliments", ensureAuthenticated, createComplimentController.handle)
router.get("/sent-compliments", ensureAuthenticated, listSentComplimentsController.handle)
router.get("/received-compliments", ensureAuthenticated, listReceivedComplimentsController.handle)
router.get("/users", ensureAuthenticated, listUsersController.handle)
router.get("/tags", ensureAuthenticated, listTagsController.handle)

export {router}