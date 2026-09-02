import { Container, Section } from "@/components/ui/section";
import { getI18n } from "@/i18n";

/** Temporary section shell — real content arrives in a later phase. */
export async function PagePlaceholder({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  const { t } = await getI18n();

  return (
    <Section>
      <Container>
        <p className="mono-eyebrow">
          <span className="text-terminal-dim">{"//"}</span> {title}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground mt-3 max-w-2xl">{description}</p>
        )}
        <div className="terminal-frame text-muted-foreground mt-10 p-6 font-mono text-sm">
          <span className="text-terminal-dim">$</span> build --section &quot;
          {title.toLowerCase()}&quot;{" "}
          <span className="text-accent">[{t.placeholder.building}]</span>
          <span className="animate-blink"> _</span>
        </div>
      </Container>
    </Section>
  );
}
