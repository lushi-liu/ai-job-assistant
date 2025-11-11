"use client";
import { useState } from "react";

export default function Home() {
  const [profile, setProfile] = useState("");
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: "summary", profile, job: "", language: "English" }),
    });
    const data = await res.json();
    setResult(data.result);
  };

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Resume Assistant</h1>
      <textarea
        className="w-full border rounded p-2 mb-4"
        rows={5}
        placeholder="Paste your profile..."
        value={profile}
        onChange={(e) => setProfile(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleGenerate}
      >
        Generate
      </button>
      <pre className="mt-4 whitespace-pre-wrap">{result}</pre>
    </main>
  );
}
