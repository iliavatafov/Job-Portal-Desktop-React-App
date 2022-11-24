import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { fireDB } from "../../firebaseConfig";
import moment from "moment";

export const addNewJobPost = async (payload) => {
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    await addDoc(collection(fireDB, "jobs"), {
      ...payload,
      status: "pending",
      posterByUserId: user.id,
      posterByUserName: user.name,
      posterOn: moment().format("DD-MM-YYYY HH:mm A"),
    });
    return {
      success: true,
      message: "Job posted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong",
    };
  }
};

export const getPostedJobsByUserId = async (userId) => {
  try {
    const jobs = [];
    const qry = query(collection(fireDB, "jobs"), orderBy("posterOn", "desc"));
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      if (doc.data().posterByUserId === userId) {
        jobs.push({ id: doc.id, ...doc.data() });
      }
    });

    return {
      success: true,
      data: jobs,
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong",
    };
  }
};

export const getJobById = async (id) => {
  try {
    const docRef = doc(fireDB, "jobs", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        success: true,
        data: docSnap.data(),
      };
    } else {
      return {
        success: false,
        message: "No such job!",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong",
    };
  }
};

export const getAllJobs = async () => {
  try {
    const jobs = [];
    const qry = query(collection(fireDB, "jobs"), orderBy("posterOn", "desc"));
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() });
    });
    return {
      success: true,
      data: jobs,
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing get wrong",
    };
  }
};

export const editJobDetails = async (payload) => {
  try {
    await updateDoc(doc(fireDB, "jobs", payload.id), {
      ...payload,
      updatedOn: moment().format("DD-MM-YYYY HH:mm A"),
    });
    return {
      success: true,
      message: "Jub updated successfylly",
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong",
    };
  }
};

export const deleteJobById = async (id) => {
  try {
    await deleteDoc(doc(fireDB, "jobs", id));
    return {
      success: true,
      message: "Job delete successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong",
    };
  }
};
