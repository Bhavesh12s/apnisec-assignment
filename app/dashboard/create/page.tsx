"use client";

export default function CreateIssue() {
  async function submit(e: any) {
    e.preventDefault();
    const form = e.target;

    await fetch("/api/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: form.title.value,
        description: form.description.value,
        type: form.type.value,
      }),
    });

    window.location.href = "/dashboard";
  }

  return (
    <form onSubmit={submit} className="p-6 space-y-3">
      <input name="title" placeholder="Title" className="border p-2 w-full" />
      <textarea name="description" placeholder="Description" className="border p-2 w-full" />
      <select name="type" className="border p-2 w-full">
        <option>Cloud Security</option>
        <option>Redteam Assessment</option>
        <option>VAPT</option>
      </select>
      <button className="bg-black text-white px-4 py-2">Create</button>
    </form>
  );
}
