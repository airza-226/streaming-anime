import React from "react";

interface DataRenderProps<T> {
  loading: boolean;
  skeleton?: React.ReactNode;
  skeletonCount?: number;
  data: T[] | null | undefined;
  empty?: React.ReactNode;
  render: (item: T, index: number) => React.ReactNode;
}

export function DataRender<T>({
  loading,
  skeleton,
  data,
  empty = "Data tidak ditemukan",
  render,
}: DataRenderProps<T>) {
  if (loading) {
    if (!skeleton) return null;
    return (
      <>
        {Array.from({ length: 10 }).map((_, index) => (
          <React.Fragment key={index}>{skeleton}</React.Fragment>
        ))}
      </>
    );
  }

  if (!data || data.length === 0) {
    if (typeof empty === "string") {
      return <p className="text-sm text-muted">{empty}</p>;
    }
    return <>{empty}</>;
  }

  return <>{data.map((item, index) => render(item, index))}</>;
}

export default DataRender;