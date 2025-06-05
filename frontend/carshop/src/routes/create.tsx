import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create")({
  component: Create,
});

function Create() {
  return (
    <div className="p-2">
      <h3>Create page!</h3>
    </div>
  );
}
