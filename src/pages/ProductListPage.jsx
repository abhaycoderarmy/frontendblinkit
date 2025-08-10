import React, { useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/summaryApi';
import { Link, useParams } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import Loading from '../components/Loading';
import CardProduct from '../components/CardProduct';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const params = useParams();
  const AllSubCategory = useSelector(state => state.product.allSubCategory);
  const [DisplaySubCategory, setDisplaySubCategory] = useState([]);

  const subCategory = params?.subCategory?.split("-");
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ");

  const categoryId = params.category.split("-").slice(-1)[0];
  const subCategoryId = params.subCategory.split("-").slice(-1)[0];

  const fetchProductdata = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 8,
        }
      });

      const { data: responseData } = response;
      console.log(responseData);

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData([...data, ...responseData.data]);
        }
        setTotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductdata();
  }, [params]);

  useEffect(() => {
    const sub = AllSubCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id == categoryId;
      });

      return filterData ? filterData : null;
    });
    setDisplaySubCategory(sub);
  }, [params, AllSubCategory]);

  return (
    <section className='container mx-auto flex gap-4 py-4'>
      <div className='w-75 min-h-screen bg-white shadow-lg p-4 overflow-y-auto'>
        {/** Subcategory Sidebar **/}
        {DisplaySubCategory.map((s, index) => {
          const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`;
          return (
            <Link to={link} key={s._id} className={`block p-3 border-b hover:bg-green-100 rounded-md ${subCategoryId === s._id ? 'bg-green-200' : ''}`}>
              <div className='flex items-center gap-4'>
                <img src={s.image} alt='subCategory' className='w-12 h-12 object-cover rounded' />
                <span className='text-sm font-medium'>{s.name}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className='flex-1'>
        {/** Product Section **/}
        <div className='bg-white shadow-md p-4 mb-4'>
          <h3 className='font-semibold'>{subCategoryName}</h3>
        </div>
        <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto relative'>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4'>
            {data.map((p, index) => (
              <CardProduct data={p} key={p._id + "productSubCategory" + index} />
            ))}
          </div>
        </div>
        {loading && <Loading />}
      </div>
    </section>
  );
};

export default ProductListPage;


