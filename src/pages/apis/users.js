import {
  updateDoc,
  doc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { fireDB } from "../../firebaseConfig";
import {
  SetReadNotifications,
  SetUnreadNotifications,
} from "../../redux/notifications";
import store from "../../redux/store";

export const updateUserProfile = async (payload) => {
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    await updateDoc(doc(fireDB, "users", user.id), payload);

    return {
      success: true,
      message: "Portfolio updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing get wrong",
    };
  }
};

export const getUserProfile = async (id) => {
  try {
    const docRef = doc(fireDB, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        success: true,
        data: docSnap.data(),
      };
    } else {
      return {
        success: false,
        message: "Not such document!",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong",
    };
  }
};

export const getAllUsers = async () => {
  try {
    const users = [];
    const querySnapshot = await getDocs(collection(fireDB, "users"));
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      data: users,
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong",
    };
  }
};

export const getUserNotifications = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    const notifiacions = [];
    const querySnapshot = await getDocs(
      collection(fireDB, "users", user.id, "notifications")
    );
    querySnapshot.forEach((doc) => {
      notifiacions.push({ id: doc.id, ...doc.data() });
    });

    const readNotifications = notifiacions.filter(
      (notification) => notification.status === "read"
    );

    const unreadNotifications = notifiacions.filter(
      (notification) => notification.status === "unread"
    );

    store.dispatch(SetReadNotifications(readNotifications));
    store.dispatch(SetUnreadNotifications(unreadNotifications));

    return {
      success: true,
      data: notifiacions,
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing get wrong",
    };
  }
};
