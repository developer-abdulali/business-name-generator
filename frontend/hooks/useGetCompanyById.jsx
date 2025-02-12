"use client";

import { COMPANY_API_ENDPOINT } from "@/lib/constant";
import { setSingleCompany } from "@/redux/slices/companySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_ENDPOINT}/get/${companyId}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) dispatch(setSingleCompany(res.data.company));
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompanyInfo();
  }, [companyId, dispatch]);
};
export default useGetCompanyById;
