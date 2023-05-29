import {browseProducts} from "./modules/browse-products.js";
import builder from "./modules/builder.js";
import completedBuilds from "./modules/completed-builds.js";
import frontPage from "./modules/front-page.js";
import header from "./modules/header.js";
import navigateToPage from "./modules/navigate-to-page.js";

header();
frontPage();
builder();
navigateToPage();
browseProducts();
completedBuilds();