import products from './products.json';
import RenderProductList from './products/RenderProductList';
import Pagination from './pagination/Pagination';
import Storage from '../js/localStorage/Storage';
import FavoriteDropdown from './favorite/FavoriteDropdown';
import FavoriteList from './favorite/FavoriteList';
import CounterStorage from './CounterStorage/CounterStorage';
import CartList from './cart/CartList';
import ProductDetails from './product-details/ProductDetails';
import { EVENTS, STORAGE_KEYS } from './constants';

export default function shop() {
  // 1. Инициализируем хранилища
  const favStorage = new Storage(
    STORAGE_KEYS.FAVORITES,
    EVENTS.FAVORITE_UPDATED,
  );
  const cartStorage = new Storage(STORAGE_KEYS.CART, EVENTS.CART_UPDATED);

  new ProductDetails('[data-product-details]', products, {
    cart: cartStorage,
    favorite: favStorage,
  });

  // 2. Каталог
  const productList = new RenderProductList(
    '[data-products-catalog]',
    products,
    { favorite: favStorage, cart: cartStorage },
  );

  // 3. Пагинация
  // Она сама вызовет productList.render() для первой страницы при создании
  new Pagination(productList, products, {
    productsPerPage: 12,
    visibleRange: 2,
  });

  // 4. Избранное и выпадающий список
  new FavoriteDropdown();
  new FavoriteList(favStorage, products, cartStorage);

  // 5. Корзина
  new CartList(cartStorage, products);

  // 6. Счетчики в шапке
  new CounterStorage(
    '[data-favorite-counter]',
    favStorage,
    EVENTS.FAVORITE_UPDATED,
  );
  new CounterStorage('[data-cart-counter]', cartStorage, EVENTS.CART_UPDATED);
}
