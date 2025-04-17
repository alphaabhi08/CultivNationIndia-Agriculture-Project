// import { useEffect, useState } from "react";
// import Header from "../../../components/Header/Header";
// import Navbar from "../../../components/Navbar/Navbar";
// import {
//   getCartItemsApi,
//   removeCartItemApi,
//   addToCartApi,
//   updateCartItemQuantityApi, // use this for updating quantity
// } from "../api/authService";
// import { toast } from "react-toastify";

// export default function AddToCart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchCart = async () => {
//     setIsLoading(true);
//     try {
//       const data = await getCartItemsApi();
//       setCartItems(data);
//       calculateTotal(data);
//     } catch (error) {
//       console.error("Error fetching cart", error.message);
//       toast.error("Failed to fetch cart items.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const calculateTotal = (items) => {
//     const total = items.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0
//     );
//     setTotalPrice(total);
//   };

//   const handleRemove = async (id) => {
//     try {
//       await removeCartItemApi(id);
//       const updatedItems = cartItems.filter((item) => item.id !== id);
//       setCartItems(updatedItems);
//       calculateTotal(updatedItems);
//       toast.success("Item removed from cart.");
//     } catch (error) {
//       toast.error("Failed to remove item from cart.");
//     }
//   };

//   const handleQuantityChange = async (item, newQuantity) => {
//     if (newQuantity < 1) return;

//     try {
//       setIsLoading(true);
//       await await updateCartItemQuantityApi(item.productId, newQuantity);
//       const updated = cartItems.map((cartItem) =>
//         cartItem.id === item.id
//           ? { ...cartItem, quantity: newQuantity }
//           : cartItem
//       );
//       setCartItems(updated);
//       calculateTotal(updated);
//     } catch (error) {
//       toast.error("Failed to update item quantity");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   return (
//     <>
//       <Header />
//       <Navbar />
//       <div className="max-w-6xl mx-auto py-10 px-6">
//         <h1 className="font-bold text-3xl text-gray-700">
//           🛒 Your Shopping Cart
//         </h1>
//         {cartItems.length === 0 ? (
//           <p className="mt-5 text-lg text-gray-600">Your cart is empty.</p>
//         ) : (
//           <>
//             <div className="mt-6 bg-white shadow-md rounded-lg p-6">
//               <div className="grid grid-cols-6 font-bold text-gray-700 border-b pb-3 text-sm md:text-base">
//                 <p className="col-span-2">Product</p>
//                 <p>Quantity</p>
//                 <p>MRP</p>
//                 <p>Our Price</p>
//                 <p>Action</p>
//               </div>

//               {cartItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="grid grid-cols-6 items-center gap-2 py-4 border-b text-sm md:text-base"
//                 >
//                   <div className="col-span-2 flex items-center gap-4">
//                     <img
//                       src={`data:${item.imageType};base64,${item.imageData}`}
//                       alt={item.prodName}
//                       className="w-20 h-20 object-contain rounded-md"
//                     />
//                     <p className="font-semibold text-gray-800">
//                       {item.prodName}
//                     </p>
//                   </div>

//                   <input
//                     type="number"
//                     value={item.quantity}
//                     min="1"
//                     className="w-16 border border-gray-300 rounded text-center py-1"
//                     onChange={(e) =>
//                       handleQuantityChange(item, parseInt(e.target.value))
//                     }
//                   />

//                   <p className="text-red-600 font-bold line-through">
//                     ₹{item.marketPrice}
//                   </p>

//                   <p className="text-green-600 font-bold">
//                     ₹{item.price * item.quantity}
//                   </p>

//                   <button
//                     onClick={() => handleRemove(item.id)}
//                     className="text-red-500 hover:text-red-700 font-bold"
//                   >
//                     Clear
//                   </button>
//                 </div>
//               ))}

//               {/* Total Price */}
//               <div className="flex justify-end mt-6 text-lg md:text-xl font-bold text-gray-800">
//                 Total: ₹{totalPrice}
//               </div>
//             </div>

//             {/* Checkout Button */}
//             <div className="flex justify-end mt-6">
//               <button
//                 className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition"
//                 onClick={() => alert("Proceeding to Checkout...")}
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import Navbar from "../../../components/Navbar/Navbar";
import {
  getCartItemsApi,
  removeCartItemApi,
  updateCartItemQuantityApi,
} from "../api/authService";
import { toast } from "react-toastify";

export default function AddToCart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const data = await getCartItemsApi();
      setCartItems(data);
      calculateTotal(data);
    } catch (error) {
      console.error("Error fetching cart", error.message);
      toast.error("Failed to fetch cart items.");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = (items) => {
    const total = items.reduce(
      (acc, item) => acc + parseFloat(item.price) * item.quantity,
      0
    );
    setTotalPrice(total.toFixed(2));
  };

  const handleRemove = async (id) => {
    try {
      setIsLoading(true);
      await removeCartItemApi(id);
      const updatedItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedItems);
      calculateTotal(updatedItems);
      toast.success("Item removed from cart successfully!");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = async (item, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      setIsLoading(true);
      await updateCartItemQuantityApi(item.id, newQuantity);
      const updated = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      );
      setCartItems(updated);
      calculateTotal(updated);
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <>
      <Header />
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-6">
        <h1 className="font-bold text-3xl text-gray-700">
          🛒 Your Shopping Cart
        </h1>

        {isLoading && (
          <div className="mt-5 text-lg text-gray-600">Loading...</div>
        )}

        {!isLoading && cartItems.length === 0 ? (
          <p className="mt-5 text-lg text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="mt-6 bg-white shadow-md rounded-lg p-6">
              <div className="grid grid-cols-6 font-bold text-gray-700 border-b pb-3 text-sm md:text-base">
                <p className="col-span-2">Product</p>
                <p>Quantity</p>
                <p>MRP</p>
                <p>Our Price</p>
                <p>Action</p>
              </div>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-6 items-center gap-2 py-4 border-b text-sm md:text-base"
                >
                  <div className="col-span-2 flex items-center gap-4">
                    <img
                      src={`data:${item.imageType};base64,${item.imageData}`}
                      alt={item.prodName}
                      className="w-20 h-20 object-contain rounded-md"
                    />
                    <p className="font-semibold text-gray-800">
                      {item.prodName}
                    </p>
                  </div>

                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    className="w-16 border border-gray-300 rounded text-center py-1"
                    onChange={(e) =>
                      handleQuantityChange(item, parseInt(e.target.value) || 1)
                    }
                    disabled={isLoading}
                  />

                  <p className="text-red-600 font-bold line-through">
                    ₹{item.marketPrice}
                  </p>

                  <p className="text-green-600 font-bold">
                    ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </p>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700 font-bold"
                    disabled={isLoading}
                  >
                    Clear
                  </button>
                </div>
              ))}

              <div className="flex justify-end mt-6 text-lg md:text-xl font-bold text-gray-800">
                Total: ₹{totalPrice}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition disabled:opacity-50"
                onClick={() => alert("Proceeding to Checkout...")}
                disabled={isLoading || cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
