import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ProfileData, defaultProfileData } from "@/data/profileData";

export function useProfileData() {
  const [data, setData] = useState<ProfileData>(defaultProfileData);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data: rows, error } = await supabase
        .from("profile_data")
        .select("*")
        .limit(1);

      if (error) throw error;

      if (rows && rows.length > 0) {
        const stored = rows[0].data as unknown as Partial<ProfileData>;
        setData({ ...defaultProfileData, ...stored });
      }
    } catch (err) {
      console.error("Failed to fetch profile data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, refetch: fetchData };
}

export async function saveProfileToDb(data: ProfileData) {
  // Get the first row's id
  const { data: rows, error: fetchErr } = await supabase
    .from("profile_data")
    .select("id")
    .limit(1);

  if (fetchErr) throw fetchErr;

  if (rows && rows.length > 0) {
    const { error } = await supabase
      .from("profile_data")
      .update({ data: data as unknown as Record<string, unknown>, updated_at: new Date().toISOString() })
      .eq("id", rows[0].id);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("profile_data")
      .insert({ data: data as unknown as Record<string, unknown> });
    if (error) throw error;
  }
}
