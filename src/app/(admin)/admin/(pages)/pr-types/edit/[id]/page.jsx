"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPrType() {
  const { id } = useParams();
  const router = useRouter();

  const [data, setData] = useState({ name: "", credit_cost: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://api.glassworld06.com/api/pr-types/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const json = await res.json();
      setData(json);
      setLoading(false);
    };
    load();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://api.glassworld06.com/api/pr-types/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const json = await res.json();
      if (!res.ok) throw json;

      alert("Updated successfully");
      router.push("/admin/pr-types");
    } catch (err) {
      if (err.errors) {
        const be = {};
        Object.keys(err.errors).forEach(
          (k) => (be[k] = err.errors[k][0])
        );
        setErrors(be);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main className="flex-1 bg-[#ebecf0] p-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-3xl">
        <h2 className="text-lg font-semibold mb-5">Edit PR Type</h2>

        <form onSubmit={submit}>
          <input
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="w-full mb-4 border px-3 py-2 rounded"
          />
          <input
            type="number"
            value={data.credit_cost}
            onChange={(e) =>
              setData({ ...data, credit_cost: e.target.value })
            }
            className="w-full mb-6 border px-3 py-2 rounded"
          />
          <button className="px-5 py-2 bg-blue-600 text-white rounded">
            Update
          </button>
        </form>
      </div>
    </main>
  );
}
