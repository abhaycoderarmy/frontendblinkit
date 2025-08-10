import React, { useEffect, useState } from "react";
import UploadCategory from "../components/UploadCategory";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import EditCategory from "../components/EditCategory";
import CofirmBox from "../components/ConfirmBox";
import { toast } from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const CategoryPage = () => {
  const [openCategoryPage, setOpenCategoryPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });
  const [openConfimBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({
    _id: "",
  });

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...summaryApi.getCategory,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        setCategoryData(responseData.data);
      }
    } catch (error) {
      console.log("error in fetch category", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...summaryApi.deleteCategory,
        data: deleteCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCategory();
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section>
      <div className="p-3 bg-white shadow-md flex items-center justify-between">
        <h2 className="text-sm font-semibold">Category</h2>
        <button
          onClick={() => setOpenCategoryPage(true)}
          className="text-sm border rounded bg-green-500 text-white hover:bg-amber-300 px-4 py-2 "
        >
          Add Category
        </button>
      </div>

      {!categoryData[0] && !loading && <NoData />}

      <div className="p-4 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {categoryData.map((category, index) => {
          return (
            <div className="w-32 h-56 p-1 rounded shadow-md" key={category._id}>
              <img
                alt={category.name}
                src={category.image}
                className="w-full object-scale-down"
              />
              <div className="items-center h-9 flex gap-2">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(category);
                  }}
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setOpenConfirmBoxDelete(true);
                    setDeleteCategory(category);
                  }}
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {loading && <Loading />}
      {openCategoryPage && (
        <UploadCategory
          fetchData={fetchCategory}
          close={() => setOpenCategoryPage(false)}
        />
      )}
      {openEdit && (
        <EditCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchCategory}
        />
      )}

      {openConfimBoxDelete && (
        <CofirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          cancel={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default CategoryPage;