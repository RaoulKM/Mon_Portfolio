import { Container } from "@/components/ui/section";

export default function PublicLoading() {
  return (
    <Container className="py-24">
      <div className="animate-pulse space-y-6">
        <div className="bg-muted h-8 w-1/3 rounded" />
        <div className="bg-muted h-4 w-2/3 rounded" />
        <div className="grid gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-muted h-56 rounded-xl" />
          ))}
        </div>
      </div>
    </Container>
  );
}
