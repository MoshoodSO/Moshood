import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  folder?: string;
}

const ImageUpload = ({ value, onChange, label, folder = "general" }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      toast({ title: "Invalid file", description: "Please upload an image or GIF.", variant: "destructive" });
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}.${ext}`;

    const { error } = await supabase.storage.from("portfolio-images").upload(path, file);
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("portfolio-images").getPublicUrl(path);
    onChange(urlData.publicUrl);
    setUploading(false);
    toast({ title: "Uploaded!", description: "Image uploaded successfully." });
  };

  return (
    <div>
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="mt-1 flex items-center gap-3">
        {value ? (
          <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-border">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <button
              onClick={() => onChange("")}
              className="absolute top-0.5 right-0.5 bg-destructive text-destructive-foreground rounded-full p-0.5"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <div className="w-20 h-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center text-muted-foreground">
            <ImageIcon size={24} />
          </div>
        )}
        <div>
          <input ref={fileRef} type="file" accept="image/*,.gif" className="hidden" onChange={handleUpload} />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="gap-1"
          >
            <Upload size={14} /> {uploading ? "Uploading..." : "Upload Image"}
          </Button>
          <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF supported</p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
