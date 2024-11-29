import React, { useContext, useState } from "react";
import styles from "./CartItem.module.css";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Context, server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
const CartItem = ({ Item, setTotal, total }) => {
  const { user, setUser } = useContext(Context);
  const [newUser, setNewUser] = useState(user);
  const HandleIncr = async Item => {
    try {
      for (const prod of newUser?.cart) {
        if (prod.title === Item.title) {
          setTotal(total + Math.round(Item.price * 40));
          prod.cnt = prod.cnt + 1;
        }
      }

      const newCart = newUser.cart.filter(d => d.cnt > 0);
      newUser.cart = newCart;

      const { data } = await axios.put(
        `${server}/api/v1/user/add/${Item.title}`,
        newUser,
        { withCredentials: true }
      );
      setUser(newUser);
      setNewUser(newUser);
      toast.success(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const HandleDecr = async Item => {
    try {
      for (const prod of newUser?.cart) {
        if (prod.title === Item.title) {
          setTotal(total - Math.round(Item.price * 40));
          prod.cnt = prod.cnt - 1;
        }
      }

      const newCart = newUser.cart.filter(d => d.cnt > 0);
      newUser.cart = newCart;

      const { data } = await axios.put(
        `${server}/api/v1/user/add/${Item.title}`,
        newUser,
        { withCredentials: true }
      );
      setUser(newUser);
      setNewUser(newUser);
      toast.success(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className={`${styles.cartItem_container}`}>
      <img src={Item.images[0]} alt="" className={`${styles.cart_img}`} />
      <div className="d-flex justify-content-between w-100">
        <div className={`${styles.metadata}`}>
          <h6>{Item.title}</h6>
          <div className={`${styles.txt} text-success`}>in stock</div>
          <div className={`${styles.txt}`}>Color</div>
          <div className={`${styles.txt} pe-5`}>{Item.description}</div>
          <div className={`${styles.btn_grp} ${styles.txt}`}>
            <button className={`btn px-1`} onClick={() => HandleDecr(Item)}>
              <FaMinus />
            </button>
            <span className={`${styles.cnt} px-1`}>{Item.cnt}</span>
            <button className={`btn px-1`} onClick={() => HandleIncr(Item)}>
              <FaPlus />
            </button>
          </div>
        </div>
        <p className={`${styles.metadata} me-3 `}>
          <div className={`${styles.pr}`}>
            &#8377;{Math.round(Item.price * 40)}
          </div>
        </p>
      </div>
    </div>
  );
};

export default CartItem;