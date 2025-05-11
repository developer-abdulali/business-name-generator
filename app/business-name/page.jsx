"use client";
import DomainStatus from "@/components/DomainStatus";
import Sidebar from "@/components/Sidebar";
import { useQueryContext } from "@/context/BusinessNameContext";
import { generatePrompt } from "@/helpers/function";
import { GoogleGenAI } from "@google/genai";
import { useEffect, useRef, useState } from "react";

const BusinessNamePage = () => {
  const { query } = useQueryContext();
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);

  const [domainDialogOpen, setDomainDialogOpen] = useState(false);
  const [domain, setDomain] = useState();

  const observeDiv = useRef();

  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API });

  const fetchBusinessNames = async () => {
    try {
      setLoading(true);
      const inputs = { ...query, names };
      const prompt = generatePrompt(inputs);

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      const unfilteredJsonString = response.text;
      const jsonString = unfilteredJsonString.replace(/```json|```/g, "");
      const jsonData = JSON.parse(jsonString);

      if (jsonData?.names) {
        const newNames = jsonData.names;
        setNames((prev) => [...prev, ...newNames]);
      }
    } catch (error) {
      console.log("Error while fetching names", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessNames();
  }, [page]);

  useEffect(() => {
    setNames([]);
    fetchBusinessNames();
  }, [refresh]);

  const handleIntersection = (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "-10px",
      threshold: [0, 0.5, 1],
    });

    const currentDiv = observeDiv.current;

    if (currentDiv) observer.observe(currentDiv);

    return () => {
      if (currentDiv) observer.unobserve(currentDiv);
    };
  }, []);

  const getDomainStatus = (businessName) => {
    const domain =
      businessName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() + ".com";

    setDomain(domain);
    setDomainDialogOpen(!domainDialogOpen);
  };

  return (
    <section className="px-4 sm:px-10 md:px-16 lg:px-20">
      <h1 className="sticky top-20 bg-[#202020] text-4xl text-white font-semibold text-center border-b border-gray-500 pb-5">
        Business Names
      </h1>

      <div className="flex flex-col lg:flex-row items-start justify-center gap-4 md:gap-10 lg:mt-10">
        <div className="w-full lg:w-[25%] sticky top-44 mt-16">
          <Sidebar refresh={refresh} setRefresh={setRefresh} />
        </div>
        <div className="w-full lg:w-[75%] mt-5 sm:mt-10 md:mt-[75px] lg:mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {/* domain names */}
            {names?.map((singleName, i) => (
              <div
                key={i}
                onClick={() => getDomainStatus(singleName)}
                className="border border-gray-600 rounded p-3 cursor-pointer text-white hover:bg-primary hover:text-black"
              >
                {singleName}
              </div>
            ))}
          </div>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
              {Array.from({ length: 32 }).map((_, index) => (
                <div
                  key={index}
                  className="h-12 rounded bg-gray-700 animate-pulse"
                />
              ))}
            </div>
          )}
        </div>

        <div ref={observeDiv} className="h-2 mt-5 text-xl"></div>
      </div>

      <DomainStatus
        open={domainDialogOpen}
        setOpen={setDomainDialogOpen}
        domain={domain}
      />
    </section>
  );
};

export default BusinessNamePage;
