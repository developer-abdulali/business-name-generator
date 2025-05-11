import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { nameStyle, Randomness } from "@/helpers/constant";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useQueryContext } from "@/context/BusinessNameContext";
import { useRouter } from "next/navigation";

const QueryDialog = ({ queryDialog, setQueryDialog }) => {
  const router = useRouter();
  const { query, updateQuery } = useQueryContext();

  const handleNameStyle = (nameStyle) => {
    updateQuery({ nameStyle });
  };

  const handleRandomness = (randomness) => {
    updateQuery({ randomness });
  };

  const handleFormField = (e) => {
    updateQuery({ [e.target.name]: e.target.value });
  };

  const generateBusinessName = () => {
    router.push("/business-name");
  };

  return (
    <Dialog open={queryDialog} onOpenChange={setQueryDialog}>
      <DialogContent className="max-w-[95vw] sm:max-w-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">
            Customize Your Query
          </DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <Tabs defaultValue="NameStyle">
          <TabsList className="p-0 bg-transparent gap-3 flex-wrap mb-4">
            <TabsTrigger
              className="text-sm sm:text-md border data-[state=active]:bg-primary"
              value="NameStyle"
            >
              Name Style
            </TabsTrigger>
            <TabsTrigger
              className="text-sm sm:text-md border data-[state=active]:bg-primary"
              value="Randomness"
            >
              Randomness
            </TabsTrigger>
            <TabsTrigger
              className="text-sm sm:text-md border data-[state=active]:bg-primary"
              value="BrandInfo"
            >
              Brand Info
            </TabsTrigger>
          </TabsList>

          {/* Name Style */}
          <TabsContent value="NameStyle">
            <h4 className="text-lg font-semibold mb-4">Select Name Style</h4>
            <RadioGroup
              defaultValue="Auto"
              onValueChange={handleNameStyle}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {nameStyle.map((single) => (
                <Label
                  key={`nameStyle-${single.id}`}
                  htmlFor={`nameStyle${single.id}`}
                  className="p-3 rounded border flex gap-4 items-start sm:items-center"
                >
                  <RadioGroupItem
                    value={single.name}
                    id={`nameStyle${single.id}`}
                  />
                  <div>
                    <p className="font-semibold mb-1">{single.name}</p>
                    <p className="text-sm">{single.description}</p>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </TabsContent>

          {/* Randomness */}
          <TabsContent value="Randomness">
            <h4 className="text-lg font-semibold mb-4">Select Randomness</h4>
            <RadioGroup
              defaultValue="Medium"
              onValueChange={handleRandomness}
              className="space-y-3"
            >
              {Randomness.map((single) => (
                <Label
                  key={`randomness-${single.id}`}
                  htmlFor={`randomness${single.id}`}
                  className="p-3 rounded border flex gap-4 items-start sm:items-center"
                >
                  <RadioGroupItem
                    value={single.name}
                    id={`randomness${single.id}`}
                  />
                  <div>
                    <p className="font-semibold mb-1">{single.name}</p>
                    <p className="text-sm">{single.description}</p>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </TabsContent>

          {/* Brand Info */}
          <TabsContent value="BrandInfo">
            <h4 className="text-lg font-semibold mb-4">
              Write Brand Information
            </h4>
            <div className="space-y-4 mb-4">
              <div>
                <Label htmlFor="keyword">Keyword</Label>
                <Input
                  id="keyword"
                  name="keyword"
                  placeholder="e.g. tech, fashion..."
                  value={query?.keyword || ""}
                  onChange={handleFormField}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Short brand idea..."
                  value={query?.description || ""}
                  onChange={handleFormField}
                  className="mt-1"
                />
              </div>
            </div>
            <Button className="w-full sm:w-auto" onClick={generateBusinessName}>
              Generate
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default QueryDialog;
