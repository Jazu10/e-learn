import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import CartItem from "../components/CartItem";
import Link from "next/link";
import { getData } from "../utils/fetchData";

function cart() {
   const [state, dispatch] = useContext(DataContext);
   const { cart, auth } = state;

   const [total, setTotal] = useState(0);

   useEffect(() => {
      const getTotal = () => {
         const res = cart.reduce((prev, item) => {
            return prev + item.price * item.quantity;
         }, 0);
         setTotal(res);
      };
      getTotal();
   }, [cart]);

   useEffect(() => {
      const cartLocal = JSON.parse(
         localStorage.getItem("__next__cart01__jaseem"),
      );
      if (cartLocal.length > 0) {
         let newArr = [];
         const updateCart = async () => {
            for (const item of cartLocal) {
               const res = await getData(`product/${item._id}`);
               console.log(res);
               const { _id, title, images, price, inStock } = res.product;
               if (inStock > 0) {
                  newArr.push({
                     _id,
                     title,
                     images,
                     price,
                     inStock,
                     quantity: item.quantity > inStock ? 1 : item.quantity,
                  });
               }
            }
            dispatch({ type: "TO_CART", payload: newArr });
         };
         updateCart();
      }
   }, []);

   if (cart.length === 0) return <img src="/emptycart.jpg" />;

   return (
      <div className="bg-gray-100">
         <Head>
            <title>Cart</title>
         </Head>
         <main className="mx-auto">
            <div className="flex flex-wrap">
               <div className="md:px-5 mb-7 w-full md:w-7/12">
                  <div className="w-full mb-4">
                     <div className="flex-grow m-5 shadow-sm">
                        <div className="flex flex-col p-5 space-y-10 bg-white">
                           <h1 className="text-3xl border-b pb-4">
                              {cart.length === 0
                                 ? "Your Amazon Basket is empty"
                                 : "Shopping Basket"}
                           </h1>
                           {cart.map((item) => (
                              <CartItem
                                 key={item._id}
                                 item={item}
                                 dispatch={dispatch}
                                 cart={cart}
                              />
                           ))}
                           <h1 className="font-bold text-xl pb-5 text-green-500 text-right flex justify-end">
                              Total :
                              <p className="text-red-500 mx-2">₹ {total}</p>
                           </h1>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="px-5 mb-10 w-full md:w-5/12 md:min-h-screen">
                  <div className="w-full mb-4">
                     <div className="flex-grow mt-5 shadow-sm">
                        <div className="flex flex-col p-5 space-y-10 bg-white">
                           <h1 className="text-3xl border-b pb-4">
                              Shipping Address
                           </h1>
                           <form>
                              <div className="flex flex-wrap mb-6">
                                 <label
                                    className="label1 pt-3"
                                    htmlFor="mobile">
                                    mobile
                                 </label>
                                 <input
                                    className="input1 mb-2"
                                    type="number"
                                    placeholder="Enter mobile"
                                    name="mobile"
                                    required
                                 />
                                 <label className="label1 pt-3" htmlFor="state">
                                    state
                                 </label>
                                 <select
                                    className="input1 mb-2 cursor-pointer"
                                    type="number"
                                    placeholder="Enter state"
                                    name="state">
                                    <option value="Kerala">Kerala</option>
                                 </select>
                                 <label className="label1 pt-3" htmlFor="state">
                                    district
                                 </label>
                                 <select
                                    className="input1 mb-2 cursor-pointer"
                                    type="number"
                                    placeholder="Enter district"
                                    name="district">
                                    <option value="Alappuzhya">
                                       Alappuzhya
                                    </option>
                                    <option value="Ernakulam">Ernakulam</option>
                                    <option value="Idukki">Idukki</option>
                                    <option value="Kannur">Kannur</option>
                                    <option value="Kasargod">Kasargod</option>
                                    <option value="Kollam">Kollam</option>
                                    <option value="Kottayam">Kerala</option>
                                    <option value="Kozhikode">Kozhikode</option>
                                    <option value="Malappuram">
                                       Malappuram
                                    </option>
                                    <option value="Palakkad">Palakkad</option>
                                    <option value="Pathanamthitta">
                                       Pathanamthitta
                                    </option>
                                    <option value="Thiruvananthapuram">
                                       Thiruvananthapuram
                                    </option>
                                    <option value="Thrissur">Thrissur</option>
                                    <option value="Wayanad">Wayanad</option>
                                 </select>
                                 <label
                                    className="label1 pt-3"
                                    htmlFor="pincode">
                                    pincode
                                 </label>
                                 <input
                                    className="input1 mb-2"
                                    type="number"
                                    placeholder="Enter pincode"
                                    name="pincode"
                                    required
                                 />
                                 <label className="label1" htmlFor="address">
                                    Address
                                 </label>
                                 <textarea
                                    className="input1"
                                    type="text"
                                    placeholder="Address here"
                                    name="email"
                                 />
                              </div>
                              <Link href={auth.user ? "#" : "/login"}>
                                 <button className="bg-green-500 w-full p-3 text-white font-bold rounded-md hover:bg-green-700 mb-3 ring-2 focus:outline-none focus:ring-2 focus:ring-green-700">
                                    Proceed with payment
                                 </button>
                              </Link>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </div>
   );
}

export default cart;
