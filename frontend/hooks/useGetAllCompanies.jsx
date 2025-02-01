"use client";

import { COMPANY_API_ENDPOINT } from "@/lib/constant";
import { setCompanies } from "@/redux/slices/companySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) dispatch(setCompanies(res.data.companies));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCompanies();
  }, [dispatch]);
};

export default useGetAllCompanies;
