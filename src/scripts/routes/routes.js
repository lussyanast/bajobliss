import Cart from '../views/pages/cart';
import Category from '../views/pages/category';
import Faq from '../views/pages/faq';
import Home from '../views/pages/home';
import NewIn from '../views/pages/new-in';
import Products from '../views/pages/product';
import ProductDetail from '../views/pages/product-detail';
import Profile from '../views/pages/profile';
import Search from '../views/pages/search';

const routes = {
  '/': Home,
  '/new': NewIn,
  '/category': Category,
  '/products': Products,
  '/product-detail' : ProductDetail,
  '/faq': Faq,
  '/search': Search,
  '/cart': Cart,
  '/profile': Profile,
};

export default routes;
