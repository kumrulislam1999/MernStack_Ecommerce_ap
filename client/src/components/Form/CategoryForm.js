import React from "react";

export default function CategoryForm({
  categoryHandleSubmit,
  value,
  setValue,
}) {
  return (
    <>
      <form onSubmit={categoryHandleSubmit}>
        <div className="categoryFormBox">
          <input
            type="text"
            placeholder="Enter New Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary">
          Add Category
        </button>
      </form>
    </>
  );
}
