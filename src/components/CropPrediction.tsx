import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import {
  Thermometer,
  Droplets,
  MapPin,
  Beaker,
  TrendingUp,
  CloudRain,
  Loader2,
  CheckCircle,
  Upload,
} from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as XLSX from "xlsx";

const API_BASE_URL = "https://crop-prediction-akfu.onrender.com";

interface PredictionResult {
  prediction: string;
  top3: { crop: string; probability: number }[];
  weather: { temperature: number; humidity: number };
  city: string;
}

const CropPrediction = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const [formData, setFormData] = useState({
    city: "",
    N: "",
    P: "",
    K: "",
    ph: "",
    rainfall: "",
  });

  // --- Scroll animation ---
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support location services",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          if (response.ok) {
            const data = await response.json();
            const cityName =
              data.address?.village ||
              data.address?.town ||
              data.address?.city ||
              data.address?.state ||
              "Unknown area";
            setFormData((prev) => ({ ...prev, city: cityName }));
            toast({ title: "Location detected!", description: `Current location: ${cityName}` });
          }
        } catch {
          setFormData((prev) => ({ ...prev, city: "Current Location" }));
          toast({ title: "Location detected!", description: "Using approximate location" });
        }
        setIsLoading(false);
      },
      () => {
        toast({
          title: "Location access denied",
          description: "Please enter your city name manually",
          variant: "destructive",
        });
        setIsLoading(false);
      },
      { timeout: 10000 }
    );
  };

  const handlePredict = async () => {
    if (!formData.city || !formData.N || !formData.P || !formData.K || !formData.ph || !formData.rainfall) {
      toast({ title: t("error") || "Missing Information", description: t("fillAllFields") || "Please fill all fields", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: formData.city,
          N: parseInt(formData.N),
          P: parseInt(formData.P),
          K: parseInt(formData.K),
          ph: parseFloat(formData.ph),
          rainfall: parseInt(formData.rainfall),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Prediction failed");

      setPrediction({ prediction: data.prediction, top3: data.top3, weather: data.weather, city: data.city });

      toast({ title: t("predictionComplete") || "Prediction Complete!", description: `${t("bestCrop") || "Best crop"}: ${data.prediction}` });
    } catch (error: any) {
      toast({ title: t("predictionFailed") || "Prediction Failed", description: error.message || "Unable to get crop prediction.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];

      const header = data[0].map((h) => h.toString().toLowerCase());
      const values = data[1];
      const newFormData: any = {};
      header.forEach((h, i) => { if (h in formData) newFormData[h] = values[i].toString(); });
      setFormData((prev) => ({ ...prev, ...newFormData }));
      toast({ title: "Soil report uploaded", description: "Nutrient values filled automatically" });
    };
    reader.readAsBinaryString(file);
  };

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants} className="container mx-auto px-4 py-8 space-y-8">
      {/* Upload Soil Report */}
      <Card className="shadow-card border-primary/20 hover:shadow-glow transition-smooth">
        <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>{t("upload Soil Report") || "Upload Soil Report"}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Input type="file" accept=".xlsx,.csv" onChange={handleFileUpload} />
        </CardContent>
      </Card>

      {/* Crop Prediction Form */}
      <Card className="shadow-card border-primary/20 hover:shadow-glow transition-smooth">
        <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>{t("cropPredictionTitle")}</span>
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Enter your location and soil parameters for AI-powered crop recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{t("location")}</span>
            </Label>
            <div className="flex gap-2">
              <Input id="location" placeholder={t("enterLocation")} value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)} className="border-primary/20 focus:border-primary flex-1" />
              <Button type="button" variant="outline" size="sm" onClick={getCurrentLocation} disabled={isLoading} className="border-primary/20 hover:bg-primary/10">
                <MapPin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Soil Nutrients: N, P, K */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["N", "P", "K"].map((el) => (
              <div key={el} className="space-y-2">
                <Label htmlFor={el} className="text-sm">
                  {t(el.toLowerCase()) || el} {el === "N" ? "(0-140 ppm)" : el === "P" ? "(5-145 ppm)" : "(5-205 ppm)"}
                </Label>
                <Input id={el} type="number" placeholder="0" value={formData[el as keyof typeof formData]} onChange={(e) => handleInputChange(el, e.target.value)} className="border-primary/20 focus:border-primary" />
              </div>
            ))}
          </div>

          {/* pH and Rainfall */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ph">{t("phLevel")}</Label>
              <Input id="ph" type="number" step="0.1" placeholder="3.5-9.9" value={formData.ph} onChange={(e) => handleInputChange("ph", e.target.value)} className="border-primary/20 focus:border-primary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rainfall" className="flex items-center space-x-2">
                <CloudRain className="w-4 h-4 text-primary" />
                <span>{t("rainfall")}</span>
              </Label>
              <Input id="rainfall" type="number" placeholder="20-300" value={formData.rainfall} onChange={(e) => handleInputChange("rainfall", e.target.value)} className="border-primary/20 focus:border-primary" />
            </div>
          </div>

          <Button onClick={handlePredict} disabled={isLoading} className="w-full bg-gradient-primary hover:shadow-glow transition-smooth animate-scale-bounce mt-4" size="lg">
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4 mr-2" /> {t("predict")}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Prediction Results */}
      {prediction && (
        <Card className="shadow-card border-success/20 hover:shadow-glow transition-smooth animate-slide-up w-full">
          <CardHeader className="bg-gradient-to-r from-success to-primary-glow text-success-foreground rounded-t-lg">
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>{t("recommendedCrop")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Weather Info */}
            <div className="bg-gradient-accent rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-accent-foreground flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{t("weatherInfo")} - {prediction.city}</span>
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-4 h-4 text-red-500" />
                  <span>{t("temperature")}: {prediction.weather.temperature}°C</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span>{t("humidity")}: {prediction.weather.humidity}%</span>
                </div>
              </div>
            </div>

            {/* Top Predictions */}
            <div className="space-y-4">
              <h4 className="font-semibold text-success">{t("topSuggestions")}</h4>
              {prediction.top3.map((crop, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${index === 0 ? "bg-success/10 border-success" : "bg-muted/50 border-muted-foreground"}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{crop.crop}</span>
                    <span className={`text-sm font-bold ${index === 0 ? "text-success" : "text-muted-foreground"}`}>{crop.probability}%</span>
                  </div>
                  <div className="mt-2 bg-background rounded-full h-2">
                    <div className={`h-full rounded-full transition-smooth ${index === 0 ? "bg-success" : "bg-muted-foreground"}`} style={{ width: `${crop.probability}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default CropPrediction;
