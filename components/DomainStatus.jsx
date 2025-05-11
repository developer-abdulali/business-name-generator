"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const DomainStatus = ({ open, setOpen, domain }) => {
  const [domainStatus, setDomainStatus] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDomainStatus = async () => {
      if (domain) {
        try {
          setLoading(true);
          const res = await fetch(
            `https://domain-availability.whoisxmlapi.com/api/v1?apiKey=${process.env.NEXT_PUBLIC_DOMAIN_STATUS_API}&domainName=${domain}&credits=DA`
          );
          if (!res.ok) throw new Error(res.statusText);
          const data = await res.json();
          setDomainStatus(data?.DomainInfo?.domainAvailability);
        } catch (error) {
          console.error(error);
          toast(error.message || "Failed to fetch domain status");
        } finally {
          setLoading(false);
        }
      }
    };

    getDomainStatus();
  }, [domain]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[95vw] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-4xl font-semibold text-center mb-3">
            Domain Status
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <p className="text-center">
            Getting status for domain: <b>{domain}</b>
          </p>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="mb-3 text-center">
              Availability status of domain: <b>{domain}</b>
            </p>

            {domainStatus === "AVAILABLE" ? (
              <span className="rounded text-xl bg-green-500 px-6 py-2 text-white">
                {domainStatus}
              </span>
            ) : (
              <span className="rounded text-xl bg-red-500 px-10 py-2 text-white">
                {domainStatus || "Unavailable"}
              </span>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DomainStatus;
