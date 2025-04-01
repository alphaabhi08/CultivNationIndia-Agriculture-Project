// import Header from "../../../components/Header/Header";
// import Navbar from "../../../components/Navbar/Navbar";

// export default function AddToCart() {
//   return (
//     <>
//       <Header />
//       <Navbar />
//       <div className="flex flex-col justify-start items-start h-30 p-8 ml-64">
//         <h1 className="font-bold text-3xl text-gray-600">Shopping Cart</h1>
//         <p className="mt-5 font-semibold text-gray-600 text-sm">
//           Your Added Item will be shown here
//         </p>

//         <div className="bg-white h-[400px] w-[600px] mt-4 p-5 shadow-md">
//           <p className="font-semibold text-gray-600 text-md">
//             Item(s) in your Shopping Cart
//           </p>

//           <div className="flex flex-row font-semibold text-sm gap-10 mt-5">
//             <p>ITEM</p>
//             <p>I</p>
//             <p>QUANTITY</p>
//             <p>MARKET PRICE</p>
//             <p>OUR PRICE</p>
//             <p>YOUR PRICE</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import Navbar from "../../../components/Navbar/Navbar";

export default function AddToCart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // ✅ Load cart items from localStorage
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedItems);
    calculateTotal(storedItems);
  }, []);

  // ✅ Update quantity in cart
  const updateQuantity = (index, newQuantity) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = newQuantity;

    if (newQuantity === 0) {
      // Remove item if quantity is zero
      updatedItems.splice(index, 1);
    }

    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    calculateTotal(updatedItems);
  };

  // ✅ Calculate total price
  const calculateTotal = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.bestPrice * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  // ✅ Remove item from cart
  const removeItem = (index) => {
    const updatedItems = [...cartItems];
    updatedItems.splice(index, 1);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    calculateTotal(updatedItems);
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-6">
        <h1 className="font-bold text-3xl text-gray-700">Shopping Cart</h1>    
        {cartItems.length === 0 ? (
          <p className="mt-5 text-lg text-gray-600">
            Your cart is empty. Start adding items!
          </p>
        ) : (
          <>
            <div className="mt-6 bg-white shadow-md rounded-lg p-6">
              <div className="flex justify-between font-bold text-gray-700 mb-4">
                <p>Item</p>
                <p>Quantity</p>
                <p>Price</p>
                <p>Action</p>
              </div>

              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b py-4"
                >
                  {/* Product Details */}
                  <div className="flex items-center gap-4">
                    <img
                      src={`data:${item.imageType};base64,${item.imageData}`}
                      alt={item.prodName}
                      className="w-16 h-16 object-contain rounded-md"
                    />
                    <p className="font-semibold text-gray-700">
                      {item.prodName}
                    </p>
                  </div>

                  {/* Quantity Input */}
                  <input
                    type="number"
                    value={item.quantity}
                    min="0"
                    className="w-16 border border-gray-300 rounded text-center"
                    onChange={(e) =>
                      updateQuantity(index, parseInt(e.target.value))
                    }
                  />

                  {/* Price */}
                  <p className="text-green-600 font-bold">
                    ₹{item.bestPrice * item.quantity}
                  </p>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    Remove
                  </button>
                </div>
              ))}

              {/* Total Price */}
              <div className="flex justify-end mt-6">
                <p className="text-xl font-bold text-gray-700">
                  Total: ₹{totalPrice}
                </p>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="flex justify-end mt-6">
              <button
                className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition"
                onClick={() => alert("Proceed to Payment!")}
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
