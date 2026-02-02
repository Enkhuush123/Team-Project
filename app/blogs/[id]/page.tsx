import * as React from "react";

export default function BlogPage({ params }) {
  const { id } = React.use(params);

  return (
    <div>
      <div>{id}</div>
    </div>
  );
}
