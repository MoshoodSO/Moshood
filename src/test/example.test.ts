import { describe, it, expect } from "vitest";
import { defaultProfileData } from "@/data/profileData";
import { getStatValue } from "@/components/RecognitionsSection";

describe("Recognition & Impact counts", () => {
  it("shows the current number of projects", () => {
    const data = { ...defaultProfileData, projects: defaultProfileData.projects.slice(0, 2) };
    expect(getStatValue("Projects", data, "10+")).toBe("2");
  });

  it("shows the current number of certificates", () => {
    const data = { ...defaultProfileData, certificates: defaultProfileData.certificates.slice(0, 3) };
    expect(getStatValue("Certifications", data, "15+")).toBe("3");
  });

  it("shows the current number of recognitions for the awards stat", () => {
    const data = { ...defaultProfileData, recognitions: defaultProfileData.recognitions.slice(0, 4) };
    expect(getStatValue("Awards", data, "5+")).toBe("4");
  });
});
