import { Card } from "@/components/ui/card";
import type { SkillGroup } from "@/lib/queries";

export function SkillGroups({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {groups.map((group) => (
        <Card key={group.category} className="p-6">
          <h3 className="text-lg font-semibold">{group.label}</h3>
          <ul className="mt-4 space-y-4">
            {group.skills.map((skill) => (
              <li key={skill.id}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="bg-muted h-2 overflow-hidden rounded-full">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: `${Math.min(100, Math.max(0, skill.level))}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}
